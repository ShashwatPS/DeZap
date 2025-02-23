import { Keypair, SystemProgram, Transaction, PublicKey, sendAndConfirmTransaction, Connection } from "@solana/web3.js";

const connectionMain = new Connection("https://api.mainnet-beta.solana.com", "finalized");
const connectionDev = new Connection("https://api.devnet.solana.com", "finalized");
const connectionTest = new Connection("https://api.testnet.solana.com", "finalized");

const PRIVATE_KEY = "[203,24,37,129,152,12,225,213,216,206,82,154,8,155,208,229,150,201,138,86,113,182,10,4,98,198,14,138,154,209,159,236,202,107,55,44,164,239,39,75,173,118,92,33,164,124,143,171,76,207,254,56,230,177,120,199,68,213,206,61,70,6,185,59]";

export async function sendSol(to: string, amount: string, server: string) {
    try {
        if (!to || !PublicKey.isOnCurve(new PublicKey(to).toBuffer())) {
            throw new Error("Invalid recipient address");
        }

        const numberInt = parseInt(amount, 10);

        if (!numberInt || numberInt <= 0) {
            throw new Error("Invalid amount. Must be a positive integer in lamports.");
        }

        const keypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(PRIVATE_KEY)));
        console.log("Sender Address:", keypair.publicKey.toBase58());

        const transferTransaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: keypair.publicKey,
                toPubkey: new PublicKey(to),
                lamports: numberInt,
            })
        );

        let signature;
        if (server === "main") {
            signature = await sendAndConfirmTransaction(connectionMain, transferTransaction, [keypair]);
        } else if (server === "dev") {
            signature = await sendAndConfirmTransaction(connectionDev, transferTransaction, [keypair]);
        } else if (server === "test") {
            signature = await sendAndConfirmTransaction(connectionTest, transferTransaction, [keypair]);
        } else {
            throw new Error("Invalid server name. Use 'main', 'dev', or 'test'.");
        }

        console.log("Transaction Successful! Signature:", signature);
        return signature;
    } catch (error) {
        console.error("Transaction Failed:", error);
        throw error;
    }
}