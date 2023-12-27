import { ethers } from "ethers";

export type Lien = {
    lender: string;
    borrower: string;
    collection: string;
    tokenId: string;
    amount: string;
    startTime: number;
    rate: string;
    auctionStartBlock: string;
    auctionDuration: string;
    debt: string;
    ltv: string;
    floorPrice: string;
    apy: string;
}

export type LienResponse = {
    activeLiens: Lien[],
    netAPY: string,
    tvl: string,
    passiveBalance: string,
    activeBalance: string
}