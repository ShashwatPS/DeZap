import { ethers } from "ethers";
import {ethConnectionGoerli, ethConnectionMain, ethConnectionSepolia} from './constants'

export const checkEthBalance = async (zapID: string, zapData: any): Promise<boolean> => {
    const { network, walletAddress, unit, bal } = zapData;

    const provider =
        network === "main"
            ? ethConnectionMain
            : network === "goerli"
                ? ethConnectionGoerli
                : network === "sepolia"
                    ? ethConnectionSepolia
                    : null;

    if (!provider) {
        throw new Error("Invalid network specified");
    }

    const balance = await provider.getBalance(walletAddress);
    const currentBal = parseFloat(ethers.formatUnits(balance, unit));
    const balFloat = parseFloat(bal);
    return currentBal < balFloat;
};

export const checkEthWalletReceivesFunds = async (zapID: string, zapData: any): Promise<boolean> => {
    const { network } = zapData;
    const provider = network === "main"
            ? ethConnectionMain
            : network === "goerli"
                ? ethConnectionGoerli
                : network === "sepolia"
                    ? ethConnectionSepolia
                    : null;
    if (!provider) {
        throw new Error("Invalid network specified");
    }
    const latestBlock = await provider.getBlockNumber();
    const history = await provider.getLogs({
        address: zapData.walletAddress,
        fromBlock: latestBlock - 10,
        toBlock: "latest",
    });

    return history.length > 0;
}

export const  checkEthWalletSendsFunds= async (zapID: string, zapData: any): Promise<boolean>=> {
    const network = zapData.network;
    const provider = network === "main"
            ? ethConnectionMain
            : network === "goerli"
                ? ethConnectionGoerli
                : network === "sepolia"
                    ? ethConnectionSepolia
                    : null;
    if (!provider) {
        throw new Error("Invalid network specified");
    }
    const latestBlock = await provider.getBlockNumber();
    const history = await provider.getLogs({
        address: zapData.walletAddress,
        fromBlock: latestBlock - 10,
        toBlock: "latest",
    });

    for (const tx of history) {
        const transaction = await provider.getTransaction(tx.transactionHash);

        if (!transaction) {
            console.log(`Skipping transaction ${tx.transactionHash} as it is null`);
            continue;
        }

        if (transaction.from?.toLowerCase() === zapData.walletAddress.toLowerCase()) {
            return true;
        }
    }
    return false;
}