import { ethers } from "ethers";
import { getProvider } from "./utils";

const GENERIC_ABI = [
    "event Transfer(address indexed from, address indexed to, uint256 value)",
    "event Mint(address indexed to, uint256 tokenId)",
    "function balanceOf(address owner) view returns (uint256)",
    "function ownerOf(uint256 tokenId) view returns (address)",
    "event FunctionCalled(address indexed caller, string functionName)",
];

export const checkNFTMinted = async (zapID: string, zapData: any): Promise<boolean> => {
    const { network, contractAddress, fromBlock = 'latest' } = zapData;
    const provider = getProvider(network);
    const contract = new ethers.Contract(contractAddress, GENERIC_ABI, provider);

    try {
        const latestBlock = await provider.getBlockNumber();
        const fromBlockNumber = fromBlock === 'latest' ? Math.max(latestBlock - 10, 0) : parseInt(fromBlock);

        const events = await contract.queryFilter(contract.filters.Mint(), fromBlockNumber, 'latest');

        return events.length > 0;
    } catch (error) {
        console.error('Error checking NFT mints:', error);
        return false;
    }
};


export const checkContractEvent = async (zapID: string, zapData: any): Promise<boolean> => {
    const { network, contractAddress, eventName, fromBlock = 'latest' } = zapData;
    const provider = getProvider(network);
    const contract = new ethers.Contract(contractAddress, GENERIC_ABI, provider);

    try {
        const latestBlock = await provider.getBlockNumber();
        const fromBlockNumber = fromBlock === 'latest' ? Math.max(latestBlock - 10, 0) : parseInt(fromBlock);

        const eventFragment = contract.interface.getEvent(eventName);
        if (!eventFragment) throw new Error(`Event ${eventName} not found in ABI`);

        const events = await contract.queryFilter(contract.filters[eventFragment.name](), fromBlockNumber, 'latest');

        return events.length > 0;
    } catch (error) {
        console.error('Error checking contract events:', error);
        return false;
    }
};