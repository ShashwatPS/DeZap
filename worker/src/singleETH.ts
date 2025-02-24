import { ethers } from "ethers";
import { ETH_PRIVATE_KEY, ethConnectionGoerli, ethConnectionMain, ethConnectionSepolia } from "./constants";

export async function sendEth(to: string, amount: string, network: string): Promise<string> {
    try {
        if (!ethers.isAddress(to)) {
            throw new Error("Invalid recipient address");
        }

        const provider = network === "main"
            ? ethConnectionMain
            : network === "goerli"
                ? ethConnectionGoerli
                : network === "sepolia"
                    ? ethConnectionSepolia
                    : null;

        if (!provider) {
            throw new Error("Invalid network. Use 'main', 'goerli', or 'sepolia'.");
        }

        const wallet = new ethers.Wallet(ETH_PRIVATE_KEY, provider);
        console.log("Sender Address:", wallet.address);

        const tx = await wallet.sendTransaction({
            to,
            value: ethers.parseUnits(amount, "wei"),
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