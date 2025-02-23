import { ethers } from "ethers";

const PRIVATE_KEY = "0xf18aabc86434ee77ca07f80a704b480aaacb62eb9d64c72dd5c0b79439f07d1f";

export async function sendEth(to: string, amount: string, network: string): Promise<string> {
    try {
        if (!ethers.isAddress(to)) {
            throw new Error("Invalid recipient address");
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

        const tx = await wallet.sendTransaction({
            to,
            value: ethers.parseUnits(amount, "ether"),
        });

        console.log("Transaction Sent! Hash:", tx.hash);
        await tx.wait();
        console.log("Transaction Confirmed!");

        return tx.hash;
    } catch (error) {
        console.error("Transaction Failed:", error);
        throw error;
    }
}