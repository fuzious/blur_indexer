import { BigNumber, ethers } from "ethers";
import { ETHPriceFeedABI } from "./src/ABI/ETHPriceFeedABI";
import { RangeProtocolBlurVaultABI } from "./src/ABI/RangeProtocolBlurVaultABI";
import { TOKEN_TO_PRICE_FEED, RP_VAULT_ADDRESS, BLUR_POOL_ADDRESS, TOKEN_TO_OPENSEA_NAME } from "./src/constants";
import { Lien, LienResponse, NFTData, TokenInfo } from "./src/types/interface";
import fetch from "node-fetch";
import { ERC20ABI } from "./src/ABI/ERC20";
import cron from "node-cron";
import express from "express";
import { calculateNetAPY, fetchNFTBalances, fetchNFTData, sumFloorPriceByTag } from "./src/helpers";
import cors from 'cors';

const app = express();
app.use(cors({
    origin: '*' // Allows all origins
  }));
const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/cc3e9d61dd4348d6956e0da87bef4d9b');
const rpvault = new ethers.Contract(RP_VAULT_ADDRESS, RangeProtocolBlurVaultABI, provider);
const blurPool = new ethers.Contract(BLUR_POOL_ADDRESS, ERC20ABI, provider);

let allData: LienResponse = {
    activeLiens: [],
    netAPY: "",
    tvl: "",
    passiveBalance: "",
    activeBalance: "",
    nftsPossessedBalance: ""
};

async function queryData() {
    try {
        // Start all independent promises
        let currentBlockPromise = provider.getBlockNumber();
        let floorPricesPromise = getFloorPrices();
        let blurPoolBalancePromise = blurPool.balanceOf(RP_VAULT_ADDRESS); // passive Balance
        let totalCurrentlyOwnedDebtPromise = rpvault.getCurrentlyOwnedDebt(); // active balance
        let underlyingBalancePromise = await rpvault.getUnderlyingBalance();
        // Wait for all the independent promises to resolve
        let [currentBlock, floorPrices, blurPoolBalance, totalCurrentlyOwnedDebt, underlyingBalance] = await Promise.all([
            currentBlockPromise,
            floorPricesPromise,
            blurPoolBalancePromise,
            totalCurrentlyOwnedDebtPromise,
            underlyingBalancePromise
        ]);

        // Now fetch liens with debts as it depends on the resolution of floorPrices and currentBlock
        let lienData = await fetchLiensWithDebts(floorPrices, currentBlock);

        let activeLiens = lienData.liens;

        // Fetch previous week currently owned debt
        // let previousWeekCurrentlyOwnedDebt = await rpvault.getUnderlyingBalance({blockTag: currentBlock - 46523});
        /*

        TODO: REVISIT THIS APY CALCULATION
        */
        let netAPY = lienData.netAPY;
        // Calculations
        // let netAPY = (totalCurrentlyOwnedDebt.sub(previousWeekCurrentlyOwnedDebt)).mul(5200).div(lienData.totalAmount);
        let tvl = (underlyingBalance).mul(floorPrices.get(ethers.constants.AddressZero)).div(ethers.utils.parseEther("1").mul(ethers.BigNumber.from("100000000")));
        // Updating allData object
        allData.nftsPossessedBalance = sumFloorPriceByTag(activeLiens, 'possessed');
        allData.activeBalance = (ethers.BigNumber.from(totalCurrentlyOwnedDebt).sub(lienData.totalPossessedNotUnseized)).toString();
        allData.activeLiens = activeLiens;
        allData.tvl = tvl.toString();
        allData.passiveBalance = blurPoolBalance.toString();
        allData.netAPY = netAPY.toString();
    } catch (error) {
        console.error("Error querying data:", error);
    }
}


async function fetchLiensWithDebts(floorPrices: Map<string,BigNumber>, currentBlock: number): Promise<{liens: Lien[], totalPossessedNotUnseized: string, netAPY: number}> {
    const toIndex = await rpvault.liensCount();
    const liensData: [Lien, ethers.BigNumber][] = await rpvault.getLiensByIndex(0, toIndex);
    let totalAmount = ethers.BigNumber.from(0); // Initialize the total amount
    let totalPossessedNotUnseized = ethers.BigNumber.from(0);
    // console.log('liensdata',JSON.stringify(liensData));
    const settledPromises = await Promise.allSettled(
        liensData.map(async ([lien, lienId]) => {
            try {
                let convertedLien = {
                    lender: lien.lender, // Assuming lender is an address (string)
                    borrower: lien.borrower, // Assuming borrower is an address (string)
                    collection: lien.collection, // Assuming collection is an address (string)
                    tokenId: ethers.BigNumber.from(lien.tokenId).toString(), // Convert to BigNumber, then to string
                    amount: ethers.BigNumber.from(lien.amount).toString(), // Convert to BigNumber, then to string
                    startTime: ethers.BigNumber.from(lien.startTime).toString(), // Convert to BigNumber, then to string
                    rate: ethers.BigNumber.from(lien.rate).toString(), // Convert to BigNumber, then to string
                    auctionStartBlock: ethers.BigNumber.from(lien.auctionStartBlock).toString(), // Convert to BigNumber, then to string
                    auctionDuration: ethers.BigNumber.from(lien.auctionDuration).toString() // Convert to BigNumber, then to string
                };
        
                // Convert lienId to BigNumber and then to string
                let convertedLienId = ethers.BigNumber.from(lienId).toString();
                // console.log(JSON.stringify(convertedLien),convertedLienId);

                const currentDebt = await rpvault.getCurrentDebtByLien(convertedLien, convertedLienId, { gasPrice: ethers.utils.parseUnits('100', 'gwei'), gasLimit: ethers.BigNumber.from('10000000') });
                // console.log(lienId.toString(),currentDebt.toString(), convertedLien.startTime.toString())
                const currentTime = Math.floor(new Date().getTime()/1000);
                let apy: string;
                if ((lien.startTime) >= (currentTime - 24*7*3600)) {
                    let closestBlock = await fetchClosestBlock(Number(lien.startTime));                   
                    const firstDebt = await rpvault.getCurrentDebtByLien(convertedLien, convertedLienId, { blockTag: closestBlock+1 });
                    
                    apy = (((ethers.BigNumber.from(currentDebt).sub(ethers.BigNumber.from(firstDebt))).mul(3153600000).div(currentTime-lien.startTime).div(lien.amount))).toString();
                } else {
                    const firstDebt = await rpvault.getCurrentDebtByLien(lien, lienId, { blockTag: (currentBlock-46523) }); // 1 week back debt
                    apy = (((ethers.BigNumber.from(currentDebt).sub(ethers.BigNumber.from(firstDebt)))).mul(5200).div(lien.amount)).toString();
                }
                // totalAmount = totalAmount.add(ethers.BigNumber.from(lien.amount));

                const floorPrice = floorPrices.get(lien.collection.toLowerCase())!;
                const ltv = ethers.BigNumber.from(currentDebt).mul(100).div(floorPrice);

                // Clone the lien object into a new extensible object
                const extensibleLien: Lien = {
                    lender: lien.lender,
                    borrower: lien.borrower,
                    collection: lien.collection,
                    tokenId: lien.tokenId.toString(),
                    amount: lien.amount.toString(),
                    startTime: ethers.BigNumber.from(lien.startTime).toNumber(),
                    rate: lien.rate.toString(),
                    auctionStartBlock: lien.auctionStartBlock.toString(),
                    auctionDuration: lien.auctionDuration.toString(),
                    debt: currentDebt.toString(),
                    ltv: ltv.toString(),
                    floorPrice: floorPrice.toString(), // debt/floorPrice*100
                    apy: apy,
                    status: Number(lien.auctionStartBlock) == 0 ? "active" : (Number(lien.auctionStartBlock) + Number(lien.auctionDuration) < currentBlock ? "possessed" : "auction"), // 0=>active, [c,c+auctioDuration]->auction, [c+auctioDuration, inf]->"nfts in possession" 
                    name: '',
                    tokenURI: '',
                    imageURL: ''
                };
                return extensibleLien;
            } catch (error) {
                console.log(JSON.stringify(error));
                // Error handling or logging can be done here
                throw error;
            }
        })
    );

    const successfulLiens = settledPromises
        .filter((result): result is PromiseFulfilledResult<Lien> => result.status === 'fulfilled')
        .map(result => result.value);
    // console.log(JSON.stringify(successfulLiens))
    const nftBalances = await fetchNFTBalances(provider); // Make sure to define this function as shown earlier
    for (const [collectionAddress, tokenIds] of Object.entries(nftBalances)) {
        const floorPrice = floorPrices.get(collectionAddress.toLowerCase());
    
        tokenIds.forEach((tokenId: any) => {
            const newLien: Lien = {
                lender: '', // Assign appropriate values
                borrower: '', // Assign appropriate values
                collection: collectionAddress,
                tokenId: tokenId,
                amount: '', // Assign if applicable
                startTime: 0, // Assign if applicable
                rate: '', // Assign if applicable
                auctionStartBlock: '', // Assign if applicable
                auctionDuration: '', // Assign if applicable
                debt: '', // Set to empty or a specific value if required
                ltv: floorPrice ? ethers.BigNumber.from('0').mul(100).div(floorPrice).toString() : '0', // Assuming balance is not available here
                floorPrice: floorPrice ? floorPrice.toString() : '0',
                apy: '', // Set to empty or calculate if applicable
                status: 'possessed',
                name: '', // Assign if applicable
                tokenURI: '', // Assign if applicable
                imageURL: '' // Assign if applicable
            };
    
            successfulLiens.push(newLien);
        });
    }
    
        
    const tokens = successfulLiens.map(lien => ({
        collectionAddress: lien.collection,
        tokenId: lien.tokenId
    }));

    // Fetch NFT metadata
    const nftDataMap = await fetchNFTData(tokens, provider);

    // Add NFT metadata to each lien
    const liensWithNFTData = successfulLiens.map(lien => {
        const nftKey = `${lien.collection}-${lien.tokenId}`;
        const nftData = nftDataMap.get(nftKey);

        return {
            ...lien, // Spread existing lien data
            tokenURI: nftData?.tokenURI ?? '',
            imageURL: nftData?.imageUrl ?? '',
            name: nftData?.name ?? ''
        };
    });
    let netAPY = calculateNetAPY(liensWithNFTData);
    return {
        liens: liensWithNFTData,
        totalPossessedNotUnseized: totalPossessedNotUnseized.toString(),
        netAPY: netAPY
        // totalAmount: totalAmount.toString() // Convert the total amount to string for return
    };
}

async function getFloorPrices() {
    let promises = [];
    let floorPrices = new Map();

    for (const [nftAddress, name] of Object.entries(TOKEN_TO_OPENSEA_NAME)) {
        if (nftAddress == ethers.constants.AddressZero) {
            // Chainlink Price Feed
            const contract = new ethers.Contract(name, ETHPriceFeedABI, provider);
            promises.push(
                contract.latestAnswer().then((floorPrice: any) => {
                    floorPrices.set(nftAddress, ethers.BigNumber.from(floorPrice).toString());
                }).catch((error: any) => {
                    console.error(`Error fetching price for ${nftAddress} from Chainlink:`, error);
                })
            );
        } else {
            // OpenSea API
            const url = `https://api.opensea.io/api/v2/listings/collection/${name}/best`;
            promises.push(
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'x-api-key': 'c124e29f53824e6a92a74a67eb137c72' // Replace with your OpenSea API Key
                    }
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                }).then((data) => {
                    if (data && data.listings && data.listings.length > 0) {
                        const priceInfo = data.listings[0].price.current;
                        // const priceInEther = ethers.utils.formatEther(priceInfo.value);
                        floorPrices.set(nftAddress, priceInfo.value);
                    }
                }).catch((error) => {
                    console.error(`Error fetching price for ${nftAddress} from OpenSea:`, error);
                })
            );
        }
    }
    await Promise.all(promises);
    return floorPrices;
}

async function fetchClosestBlock(timestamp: number): Promise<number> {
    const response = await fetch(`https://coins.llama.fi/block/ethereum/${timestamp}`);
    const data: any = await response.json();
    return data.height; // return the block height
}



async function scheduledQueryData() {
    queryData(); // call your existing function
}


cron.schedule('* * * * *', async() => {
    console.log('Running a task every minute');
    try {
        await scheduledQueryData();
        console.log(JSON.stringify(allData));
    } catch (err) {
        console.log('error$',JSON.stringify(err));
    }
});

// Your existing async function queryData() remains the same

// GET API to serve allData object
app.get('/data', (req: any, res: { json: (arg0: LienResponse) => void; }) => {
    res.json(allData);
});

// Start the server
const PORT = 3000; // Use your preferred port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});