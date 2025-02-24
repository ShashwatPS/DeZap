import { Keypair, SystemProgram, Transaction, PublicKey, sendAndConfirmTransaction, Connection } from "@solana/web3.js";
import { SOL_PRIVATE_KEY, solconnectionDev, solconnectionMain, solconnectionTest } from "./constants";

export async function sendSolToMultiple(
    recipients: any,
    server: string,
    amount: number
): Promise<string> {
    try {
        console.log(recipients);

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

        const keypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(SOL_PRIVATE_KEY)));
        console.log("Sender Address:", keypair.publicKey.toBase58());

        const transaction = new Transaction();

        for (const { address } of recipients) {
            try {
                const recipientPubKey = new PublicKey(address);
                transaction.add(
                    SystemProgram.transfer({
                        fromPubkey: keypair.publicKey,
                        toPubkey: recipientPubKey,
                        lamports: amount,
                    })
                );
            } catch {
                throw new Error(`Invalid recipient address: ${address}`);
            }
        }

        const connection = server === "main" ? solconnectionMain
            : server === "dev" ? solconnectionDev
                : server === "test" ? solconnectionTest
                    : null;

        if (!connection) {
            throw new Error("Invalid server name. Use 'main', 'dev', or 'test'.");
        }

        const signature = await sendAndConfirmTransaction(connection, transaction, [keypair]);

        console.log("Batch Transaction Successful! Signature:", signature);
        return signature;
    } catch (error) {
        console.error("Batch Transaction Failed:", error);
        throw error;
    }
}