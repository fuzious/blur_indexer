import { ethers } from "ethers";

export type Lien = {
    lender: string;
    borrower: string;
    collection: string;
    tokenId: string;
    amount: string;
    startTime: number;
    rate: string;
    auctionStartBlock: string; // 0 means active , non zero means auction
    auctionDuration: string;
    debt: string;
    ltv: string;
    floorPrice: string;
    apy: string;
    status: string;
}

export type LienResponse = {
    activeLiens: Lien[],
    netAPY: string,
    tvl: string,
    passiveBalance: string,
    activeBalance: string
}

export interface TokenInfo {
    tokenId: string;
    collectionAddress: string;
}

export interface NFTData {
    name: string;
    tokenURI: string;
    imageUrl: string;
}

