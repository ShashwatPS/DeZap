import { Chain, OpenSeaSDK } from "opensea-js";
import { AlchemyProvider, ethers } from "ethers";
import { alchemyAPI, openSeaAPI, ETH_PRIVATE_KEY } from "./constants";

let provider = new AlchemyProvider("homestead", alchemyAPI)

export const walletMainnet = new ethers.Wallet(
    ETH_PRIVATE_KEY as string,
    provider
);

export const WALLET_ADDRESS = walletMainnet.address;

export const sdk = new OpenSeaSDK(
    walletMainnet,
    {
        chain: Chain.Mainnet,
        apiKey: openSeaAPI,
    },
    (line: any) => console.info(`MAINNET: ${line}`),
);