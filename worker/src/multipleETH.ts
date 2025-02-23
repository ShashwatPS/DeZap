import { ethers } from "ethers";

const PRIVATE_KEY = "0xf18aabc86434ee77ca07f80a704b480aaacb62eb9d64c72dd5c0b79439f07d1f";

export async function sendEthToMultiple(recipients: { address: string }[], network: string, amount: string): Promise<string[]> {
    try {
        if (!Array.isArray(recipients) || recipients.length === 0) {
            throw new Error("Recipients list must be a non-empty array.");
        }

        const provider = network === "main"
            ? new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY")
            : network === "goerli"
                ? new ethers.JsonRpcProvider("https://goerli.infura.io/v3/YOUR_INFURA_API_KEY")
                : network === "sepolia"
                    ? new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY")
                    : null;

        if (!provider) {
            throw new Error("Invalid network. Use 'main', 'goerli', or 'sepolia'.");
        }

        const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
        console.log("Sender Address:", wallet.address);

        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            throw new Error("Invalid amount. Must be a positive number in ETH.");
        }

        const transactionHashes: string[] = [];

        for (const { address } of recipients) {
            if (!ethers.isAddress(address)) {
                throw new Error(`Invalid recipient address: ${address}`);
            }

            const tx = await wallet.sendTransaction({
                to: address,
                value: ethers.parseUnits(amount, "ether"),
            });

            console.log(`Transaction Sent to ${address}! Hash:`, tx.hash);
            transactionHashes.push(tx.hash);
        }

        console.log("All Transactions Sent!");
        return transactionHashes;
    } catch (error) {
        console.error("Batch Transaction Failed:", error);
        throw error;
    }
}