import { Keypair, SystemProgram, Transaction, PublicKey, sendAndConfirmTransaction, Connection } from "@solana/web3.js";
import base58 from "bs58";

const connectionMain = new Connection("https://api.mainnet-beta.solana.com", "finalized");
const connectionDev = new Connection("https://api.devnet.solana.com", "finalized");
const connectionTest = new Connection("https://api.testnet.solana.com", "finalized");

const PRIVATE_KEY = "[203,24,37,129,152,12,225,213,216,206,82,154,8,155,208,229,150,201,138,86,113,182,10,4,98,198,14,138,154,209,159,236,202,107,55,44,164,239,39,75,173,118,92,33,164,124,143,171,76,207,254,56,230,177,120,199,68,213,206,61,70,6,185,59]"
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

        const keypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(PRIVATE_KEY)));
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

        const connection = server === "main" ? connectionMain
            : server === "dev" ? connectionDev
                : server === "test" ? connectionTest
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