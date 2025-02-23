// import { Connection, Keypair, PublicKey } from "@solana/web3.js";
// import {Metaplex, keypairIdentity, SOL} from "@metaplex-foundation/js";
// import { solconnectionDev,solconnectionTest, solconnectionMain, SOL_PRIVATE_KEY } from "./constants";
//
// export async function listNFT(nftMintAddress, price: string, server: string) {
//     try {
//         const keypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(SOL_PRIVATE_KEY)));
//         console.log("Lister Address:", keypair.publicKey.toBase58());
//
//         let connection;
//         if (server === "main") {
//             connection = solconnectionMain;
//         } else if (server === "dev") {
//             connection = solconnectionDev;
//         } else if (server === "test") {
//             connection = solconnectionTest;
//         } else {
//             throw new Error("Invalid server name. Use 'main', 'dev', or 'test'.");
//         }
//
//         const metaplex = Metaplex.make(connection).use(keypairIdentity(keypair));
//         const mintPublicKey = new PublicKey(nftMintAddress);
//
//         const auctionHouse = metaplex.auctionHouse().findByAddress({
//             address: new PublicKey("<YOUR_AUCTION_HOUSE_ADDRESS>")
//         });
//
//         const listing = await metaplex
//             .auctionHouse()
//             .list({
//                 auctionHouse,
//                 mintAccount: mintPublicKey,
//                 price: SOL(price),
//                 seller: keypair,
//             });
//
//         console.log("NFT Listed Successfully! Listing ID:", listing);
//         return listing;
//     } catch (error) {
//         console.error("Listing Failed:", error);
//         throw error;
//     }
// }
