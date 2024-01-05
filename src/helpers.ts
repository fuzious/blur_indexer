import { ethers } from "ethers";
import { NFTData, TokenInfo } from "./types/interface";
import { ContractCallResults, Multicall } from "ethereum-multicall";
import { ERC721 } from "./ABI/ERC721";
import fetch from "node-fetch";

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

async function fetchNFTData(tokens: TokenInfo[], provider: ethers.providers.Provider): Promise<Map<string, NFTData>> {
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
        console.log('results')
        console.log(results)
        const metadataFetchPromises = tokens.map(async (token, index) => {
            const result = results.results[`token-${token.collectionAddress}-${token.tokenId}`];
            const name = result.callsReturnContext.find(c => c.reference === 'nameCall')!.returnValues[0];
            const tokenURI = result.callsReturnContext.find(c => c.reference === 'tokenURICall')!.returnValues[0];
            const metadata = await fetchMetadata(tokenURI);
            const imageUrl = metadata?.image ? metadata.image : '';

            return { key: `${token.collectionAddress}-${token.tokenId}`, data: { name, tokenURI, imageUrl } };
        });

        const metadataResults = await Promise.all(metadataFetchPromises);
        const nftDataMap = new Map<string, NFTData>();

        metadataResults.forEach(nft => nftDataMap.set(nft.key, nft.data));
        console.log(nftDataMap)
        return nftDataMap;
    }   catch(err) {
        console.log(err);
        return new Map();
    }
}