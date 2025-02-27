import { ethConnectionGoerli, ethConnectionMain, ethConnectionSepolia } from "./constants";

export const getProvider = (network: string) => {
    switch (network) {
        case "main": return ethConnectionMain;
        case "goerli": return ethConnectionGoerli;
        case "sepolia": return ethConnectionSepolia;
        default: throw new Error("Invalid network specified");
    }
};