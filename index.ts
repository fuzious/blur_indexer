import { BigNumber, ethers } from "ethers";
import { ETHPriceFeedABI } from "./src/ABI/ETHPriceFeedABI";
import { RangeProtocolBlurVaultABI } from "./src/ABI/RangeProtocolBlurVaultABI";
import { TOKEN_TO_PRICE_FEED, RP_VAULT_ADDRESS, BLUR_POOL_ADDRESS } from "./src/constants";
import { Lien, LienResponse, NFTData, TokenInfo } from "./src/types/interface";
import fetch from "node-fetch";
import { ERC20ABI } from "./src/ABI/ERC20";
import cron from "node-cron";
import express from "express";
import { ContractCallResults, Multicall } from "ethereum-multicall";
import { ERC721 } from "./src/ABI/ERC721";
import { fetchNFTData } from "./src/helpers";

const app = express();
const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/cc3e9d61dd4348d6956e0da87bef4d9b');
const rpvault = new ethers.Contract(RP_VAULT_ADDRESS, RangeProtocolBlurVaultABI, provider);
const blurPool = new ethers.Contract(BLUR_POOL_ADDRESS, ERC20ABI, provider);

let allData: LienResponse = {
    activeLiens: [],
    netAPY: "",
    tvl: "",
    passiveBalance: "",
    activeBalance: ""
};

async function queryData() {
    try {
        // Start all independent promises
        let currentBlockPromise = provider.getBlockNumber();
        let floorPricesPromise = getFloorPrices();
        let blurPoolBalancePromise = blurPool.balanceOf(RP_VAULT_ADDRESS); // passive Balance
        let totalCurrentlyOwnedDebtPromise = rpvault.getCurrentlyOwnedDebt(); // active balance

        // Wait for all the independent promises to resolve
        let [currentBlock, floorPrices, blurPoolBalance, totalCurrentlyOwnedDebt] = await Promise.all([
            currentBlockPromise,
            floorPricesPromise,
            blurPoolBalancePromise,
            totalCurrentlyOwnedDebtPromise
        ]);

        // Now fetch liens with debts as it depends on the resolution of floorPrices and currentBlock
        let lienData = await fetchLiensWithDebts(floorPrices, currentBlock);

        let activeLiens = lienData.liens;

        // Fetch previous week currently owned debt
        let previousWeekCurrentlyOwnedDebt = await rpvault.getCurrentlyOwnedDebt({blockTag: currentBlock - 46523});

        // Calculations
        let netAPY = (totalCurrentlyOwnedDebt.sub(previousWeekCurrentlyOwnedDebt)).mul(5200).div(lienData.totalAmount);
        let tvl = (blurPoolBalance.add(totalCurrentlyOwnedDebt)).mul(floorPrices.get(ethers.constants.AddressZero)).div(ethers.utils.parseEther("1").mul(ethers.BigNumber.from("100000000")));

        // Updating allData object
        allData.activeBalance = totalCurrentlyOwnedDebt.toString();
        allData.activeLiens = activeLiens;
        allData.tvl = tvl.toString();
        allData.passiveBalance = blurPoolBalance.toString();
        allData.netAPY = netAPY.toString();
    } catch (error) {
        console.error("Error querying data:", error);
    }
}


async function fetchLiensWithDebts(floorPrices: Map<string,BigNumber>, currentBlock: number): Promise<{liens: Lien[], totalAmount: string}> {
    const toIndex = await rpvault.liensCount();
    const liensData: [Lien, ethers.BigNumber][] = await rpvault.getLiensByIndex(0, toIndex);
    let totalAmount = ethers.BigNumber.from(0); // Initialize the total amount

    const settledPromises = await Promise.allSettled(
        liensData.map(async ([lien, lienId]) => {
            try {
                const currentDebt = await rpvault.getCurrentDebtByLien(lien, lienId);
                const currentTime = new Date().getTime();
                let apy: string;
                if (lien.startTime >= (currentTime - 24*7*3600)) {
                    let closestBlock = await fetchClosestBlock(lien.startTime);
                    const firstDebt = await rpvault.getCurrentDebtByLien(lien, lienId, { blockTag: closestBlock });
                    apy = (((ethers.BigNumber.from(currentDebt).sub(ethers.BigNumber.from(firstDebt))).mul(3153600000).div(currentTime-lien.startTime).div(lien.amount))).toString();
                } else {
                    const firstDebt = await rpvault.getCurrentDebtByLien(lien, lienId, { blockTag: (currentBlock-46523) }); // 1 week back debt
                    apy = (((ethers.BigNumber.from(currentDebt).sub(ethers.BigNumber.from(firstDebt)))).mul(5200).div(lien.amount)).toString();
                }
                totalAmount = totalAmount.add(ethers.BigNumber.from(lien.amount));

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
                    status: Number(lien.auctionStartBlock) == 0 ? "active" : "auction",
                    name: '',
                    tokenURI: '',
                    imageURL: ''
                };
                return extensibleLien;
            } catch (error) {
                // console.log(error);
                // Error handling or logging can be done here
                throw error;
            }
        })
    );

    const successfulLiens = settledPromises
        .filter((result): result is PromiseFulfilledResult<Lien> => result.status === 'fulfilled')
        .map(result => result.value);
    
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
            tokenUri: nftData?.tokenURI ?? '',
            imageUrl: nftData?.imageUrl ?? '',
            name: nftData?.name ?? ''
        };
    });
    
    return {
        liens: liensWithNFTData,
        totalAmount: totalAmount.toString() // Convert the total amount to string for return
    };
}

async function getFloorPrices(): Promise<Map<string, ethers.BigNumber>> {
    let promises: Promise<void>[] = [];
    let floorPrices: Map<string, ethers.BigNumber> = new Map<string, ethers.BigNumber>();
  
    for (const [nftAddress, priceFeedAddress] of Object.entries(TOKEN_TO_PRICE_FEED)) {
      if (priceFeedAddress) {
        // Create a contract instance
        const contract = new ethers.Contract(priceFeedAddress, ETHPriceFeedABI, provider);
  
        // Push the async operation into the promises array
        promises.push(
          contract.latestAnswer().then((floorPrice: { div: (arg0: BigNumber) => any; }) => {
            // const adjustedFloorPrice = floorPrice.div(ethers.BigNumber.from("1000000"));
            floorPrices.set(nftAddress, ethers.BigNumber.from(floorPrice));
          }).catch((error: any) => {
            console.error(`Error fetching price for ${nftAddress}:`, error);
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


cron.schedule('*/15 * * * * *', async() => {
    console.log('Running a task every 15 seconds');
    await scheduledQueryData();
    console.log(JSON.stringify(allData));
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