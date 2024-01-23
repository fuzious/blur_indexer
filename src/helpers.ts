import { ethers } from "ethers";
import { NFTData, TokenInfo } from "./types/interface";
import { ContractCallResults, Multicall } from "ethereum-multicall";
import { ERC721 } from "./ABI/ERC721";
import fetch from "node-fetch";
import { RP_VAULT_ADDRESS, TOKEN_TO_PRICE_FEED, nftCollection } from "./constants";
import { Contract, Provider } from "ethers-multicall";

async function fetchMetadata(uri: string): Promise<any> {
    // Convert IPFS links to HTTP URLs (if necessary)
    const httpUri = uri.startsWith('ipfs://') ? `https://ipfs.io/ipfs/${uri.slice(7)}` : uri;
    try {
        const response = await fetch(httpUri);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch metadata at ${uri}:`, error);
        return null; // Handle errors as needed
    }
}

export async function fetchNFTData(tokens: TokenInfo[], provider: ethers.providers.Provider): Promise<Map<string, NFTData>> {
    try {
        const multicall = new Multicall({ ethersProvider: provider });
        const contractCallContext = tokens.map(token => ({
            reference: `token-${token.collectionAddress}-${token.tokenId}`,
            contractAddress: token.collectionAddress,
            abi: ERC721,
            calls: [
                { reference: 'nameCall', methodName: 'name', methodParameters: [] },
                { reference: 'tokenURICall', methodName: 'tokenURI', methodParameters: [token.tokenId] },
            ]
        }));
        const results: ContractCallResults = await multicall.call(contractCallContext);
        const metadataFetchPromises = tokens.map(async (token, index) => {
            const result = results.results[`token-${token.collectionAddress}-${token.tokenId}`];
            const name = result.callsReturnContext.find(c => c.reference === 'nameCall')!.returnValues[0];
            let tokenURI = result.callsReturnContext.find(c => c.reference === 'tokenURICall')!.returnValues[0];
            tokenURI = tokenURI.startsWith('ipfs://') ? `https://ipfs.io/ipfs/${tokenURI.slice(7)}` : tokenURI;
            const metadata = await fetchMetadata(tokenURI);
            let imageUrl = metadata?.image ? metadata.image : '';
            imageUrl = imageUrl.startsWith('ipfs://') ? `https://ipfs.io/ipfs/${imageUrl.slice(7)}` : imageUrl;

            return { key: `${token.collectionAddress}-${token.tokenId}`, data: { name, tokenURI, imageUrl } };
        });

        const metadataResults = await Promise.all(metadataFetchPromises);
        const nftDataMap = new Map<string, NFTData>();

        metadataResults.forEach(nft => nftDataMap.set(nft.key, nft.data));
        // console.log(nftDataMap)
        return nftDataMap;
    }   catch(err) {
        console.log(err);
        return new Map();
    }
}

export async function fetchNFTBalances(provider: ethers.providers.Provider) {
    const ethcallProvider = new Provider(provider, 1);
    let calls = [];
    for (const nftAddress of nftCollection) {
        const nftContract = new Contract(nftAddress, ERC721);

        // First, get the balance (number of NFTs owned)
        calls.push(nftContract.balanceOf(RP_VAULT_ADDRESS));
    }
    const balances = await ethcallProvider.all(calls);

    let nftTokenIDs: {[key: string]: string[]} = {};
    for (let i = 0; i < balances.length; i++) {
        const nftAddress = nftCollection[i];
        const balance = balances[i].toNumber();
        const nftContract = new Contract(nftAddress, ERC721);

        let tokenIDCalls = [];
        for (let j = 0; j < balance; j++) {
            tokenIDCalls.push(nftContract.tokenOfOwnerByIndex(RP_VAULT_ADDRESS, j));
        }

        const tokenIDs = await ethcallProvider.all(tokenIDCalls);
        nftTokenIDs[nftAddress] = tokenIDs.map(id => id.toString());
    }

    return nftTokenIDs;
}
