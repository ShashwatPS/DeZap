import { ethers } from "ethers";
import {ethConnectionGoerli, ethConnectionMain, ethConnectionSepolia} from './constants'

export const checkEthBalance= async (zapID: string, zapData: any)=> {
    // const provider = new ethers.JsonRpcProvider(zapData.rpcUrl);
    // const balance = await provider.getBalance(zapData.walletAddress);
    // const balanceInEth = parseFloat(ethers.formatEther(balance));
    //
    // if (balanceInEth < zapData.threshold) {
    //     console.log(`Condition met for ZapID: ${zapID} - ETH balance below ${zapData.threshold} ETH`);
    // }
    const network = zapData.network;
    const address = zapData.walletAddress;
    const unit = zapData.unit;
    const bal = zapData.bal;
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
        const balance = await provider.getBalance(address);
        const currentBal = ethers.parseUnits(balance.toString(), unit).toString();
        console.log(`Current Balance: ${currentBal}`);
        if (currentBal < bal) {
            return true;
        } else {    
            return  false;
        }
}

export const checkWalletReceivesFunds = async (zapID: string, zapData: any) => {
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

    if (history.length > 0) {
        console.log(`Condition met for ZapID: ${zapID} - Wallet received funds`);
    }
}

export const  checkWalletSendsFunds= async (zapID: string, zapData: any)=> {
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
            console.log(`Condition met for ZapID: ${zapID} - Wallet sent funds`);
            return;
        }
    }
}