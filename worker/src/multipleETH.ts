import { ethers } from "ethers";

const PRIVATE_KEY = "0x1165624bcbb517df69c6b6e76456ecbee6a4530c28c13e47dcb21353a8fe43bb";

export async function sendEthToMultiple(recipients: { address: string }[], network: string, amount: string): Promise<string[]> {
    try {
        if (typeof recipients === "string") {
            try {
                recipients = JSON.parse(recipients);
            } catch {
                throw new Error("Recipients is not a valid JSON string.");
            }
        }
        if (
            !Array.isArray(recipients) ||
            recipients.length === 0 ||
            !recipients.every(r => r.address)
        ) {
            throw new Error("Invalid recipients format. Must be a JSON array of objects with 'address' field.");
        }

        const provider = network === "main"
            ? new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/6ce829e164e74c03822ca2e3dfb06598")
            : network === "goerli"
                ? new ethers.JsonRpcProvider("https://goerli.infura.io/v3/6ce829e164e74c03822ca2e3dfb06598")
                : network === "sepolia"
                    ? new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/6ce829e164e74c03822ca2e3dfb06598")
                    : null;

        if (!provider) {
            throw new Error("Invalid network. Use 'main', 'goerli', or 'sepolia'.");
        }

        const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
        console.log("Sender Address:", wallet.address);

        const transactionHashes: string[] = [];

        for (const { address } of recipients) {
            if (!ethers.isAddress(address)) {
                throw new Error(`Invalid recipient address: ${address}`);
            }

            const tx = await wallet.sendTransaction({
                to: address,
                value: ethers.parseUnits(amount, "wei"),
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