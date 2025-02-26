import { ethers } from "ethers";
import axios from "axios";
import { getProvider } from "./utils";
import { alchemyAPI } from "./constants";

const fetchABIFromAlchemy = async (network: string, contractAddress: string): Promise<any[]> => {
    try {
        const url = `https://eth-${network}.g.alchemy.com/v2/${alchemyAPI}`;
        const data = {
            jsonrpc: "2.0",
            method: "alchemy_getContractMetadata",
            params: [contractAddress],
            id: 1
        };

        const response = await axios.post(url, data);
        if (!response.data.result || !response.data.result.abi) {
            throw new Error("Failed to fetch ABI from Alchemy");
        }
        return response.data.result.abi;
    } catch (error) {
        console.error("Error fetching ABI from Alchemy:", error);
        throw new Error("Could not fetch contract ABI");
    }
};

export const checkNFTMinted = async (zapID: string, zapData: any): Promise<boolean> => {
    const { network, contractAddress, fromBlock = "latest" } = zapData;
    const provider = getProvider(network);

    try {
        const abi = await fetchABIFromAlchemy(network, contractAddress);
        const contract = new ethers.Contract(contractAddress, abi, provider);

        const latestBlock = await provider.getBlockNumber();
        const fromBlockNumber = fromBlock === "latest" ? Math.max(latestBlock - 10, 0) : parseInt(fromBlock);

        const events = await contract.queryFilter(contract.filters.Mint(), fromBlockNumber, "latest");
        return events.length > 0;
    } catch (error) {
        console.error("Error checking NFT mints:", error);
        return false;
    }
};

// export const checkContractEvent = async (zapID: string, zapData: any): Promise<boolean> => {
//     const { network, contractAddress, eventName, fromBlock = 'latest' } = zapData;
//     const provider = getProvider(network);
//
//     try {
//         const abi = await fetchABIFromAlchemy(network, contractAddress);
//         const contract = new ethers.Contract(contractAddress, abi, provider);
//
//         const latestBlock = await provider.getBlockNumber();
//         const fromBlockNumber = fromBlock === 'latest' ? Math.max(latestBlock - 10, 0) : parseInt(fromBlock);
//
//         const eventFragment = contract.interface.getEvent(eventName);
//         if (!eventFragment) throw new Error(`Event ${eventName} not found in ABI`);
//
//         const eventSignature = eventFragment.format(ethers.utils.FormatTypes.full);
//         const eventTopic = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(eventSignature));
//
//         const logs = await provider.getLogs({
//             address: contractAddress,
//             topics: [eventTopic],
//             fromBlock: fromBlockNumber,
//             toBlock: 'latest',
//         });
//
//         return logs.length > 0;
//     } catch (error) {
//         console.error('Error checking contract events:', error);
//         return false;
//     }
// };