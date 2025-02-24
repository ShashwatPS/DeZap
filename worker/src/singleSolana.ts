import { Keypair, SystemProgram, Transaction, PublicKey, sendAndConfirmTransaction, Connection } from "@solana/web3.js";
import { SOL_PRIVATE_KEY, solconnectionDev, solconnectionMain, solconnectionTest } from "./constants";

export async function sendSol(to: string, amount: string, server: string) {
    try {
        if (!to || !PublicKey.isOnCurve(new PublicKey(to).toBuffer())) {
            throw new Error("Invalid recipient address");
        }

        const numberInt = parseInt(amount, 10);

        if (!numberInt || numberInt <= 0) {
            throw new Error("Invalid amount. Must be a positive integer in lamports.");
        }

        const keypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(SOL_PRIVATE_KEY)));
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
            signature = await sendAndConfirmTransaction(solconnectionMain, transferTransaction, [keypair]);
        } else if (server === "dev") {
            signature = await sendAndConfirmTransaction(solconnectionDev, transferTransaction, [keypair]);
        } else if (server === "test") {
            signature = await sendAndConfirmTransaction(solconnectionTest, transferTransaction, [keypair]);
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