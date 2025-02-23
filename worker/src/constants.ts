import {Connection} from "@solana/web3.js";
import {ethers} from "ethers";

export const ETH_PRIVATE_KEY = "0x1165624bcbb517df69c6b6e76456ecbee6a4530c28c13e47dcb21353a8fe43bb";
export const SOL_PRIVATE_KEY = "[203,24,37,129,152,12,225,213,216,206,82,154,8,155,208,229,150,201,138,86,113,182,10,4,98,198,14,138,154,209,159,236,202,107,55,44,164,239,39,75,173,118,92,33,164,124,143,171,76,207,254,56,230,177,120,199,68,213,206,61,70,6,185,59]"
export const solconnectionMain = new Connection("https://api.mainnet-beta.solana.com", "finalized");
export const solconnectionDev = new Connection("https://api.devnet.solana.com", "finalized");
export const solconnectionTest = new Connection("https://api.testnet.solana.com", "finalized");
export const ethConnectionSepolia = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/6ce829e164e74c03822ca2e3dfb06598");
export const ethConnectionGoerli = new ethers.JsonRpcProvider("https://goerli.infura.io/v3/6ce829e164e74c03822ca2e3dfb06598");
export const ethConnectionMain = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/6ce829e164e74c03822ca2e3dfb06598")

// {
//     privateKey: '0x1165624bcbb517df69c6b6e76456ecbee6a4530c28c13e47dcb21353a8fe43bb',
//         publicKey: '0x02aa278d54c64af0ebbae8c9296e3f4b58cbe60d8255d7124bda015a07b0680b9a',
//     address: '0xE8C528968752A8baB599285aEf124c3f261627C9'
// }


// const provider = network === "main"
//     ? new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/6ce829e164e74c03822ca2e3dfb06598")
//     : network === "goerli"
//         ? new ethers.JsonRpcProvider("https://goerli.infura.io/v3/6ce829e164e74c03822ca2e3dfb06598")
//         : network === "sepolia"
//             ? new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/6ce829e164e74c03822ca2e3dfb06598")
//             : null;
