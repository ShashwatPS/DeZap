import { ethers } from "ethers";

const PRIVATE_KEY = "0x1165624bcbb517df69c6b6e76456ecbee6a4530c28c13e47dcb21353a8fe43bb";

// {
//     privateKey: '0x1165624bcbb517df69c6b6e76456ecbee6a4530c28c13e47dcb21353a8fe43bb',
//         publicKey: '0x02aa278d54c64af0ebbae8c9296e3f4b58cbe60d8255d7124bda015a07b0680b9a',
//     address: '0xE8C528968752A8baB599285aEf124c3f261627C9'
// }

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