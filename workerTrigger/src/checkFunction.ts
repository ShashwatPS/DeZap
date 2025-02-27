import {ethers} from "ethers";
import { getProvider } from "./utils";

export const checkFunctionCalled = async (zapID: string, zapData: any): Promise<boolean> => {
    const { network, contractAddress, functionName, fromBlock = 'latest' } = zapData;
    const provider = getProvider(network);

    try {
        const latestBlock = await provider.getBlockNumber();
        const fromBlockNumber = fromBlock === 'latest' ? Math.max(latestBlock - 10, 0) : parseInt(fromBlock);

        const logs = await provider.getLogs({
            address: contractAddress,
            fromBlock: fromBlockNumber,
            toBlock: 'latest'
        });

        const targetFunctionSig = ethers.id(functionName).slice(0, 10);

        for (const log of logs) {
            const tx = await provider.getTransaction(log.transactionHash);
            if (tx && tx.data.startsWith(targetFunctionSig)) {
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error('Error checking function calls:', error);
        return false;
    }
};