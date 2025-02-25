import { ethers } from "ethers";
import {ethConnectionGoerli, ethConnectionMain, ethConnectionSepolia} from './constants'

export const ethGasPrice = async (zapID: string, zapData: any) => {
    const network = zapData.network;
    const expectedPrice = zapData.expectedPrice;
    const provider = network === "main"
            ? ethConnectionMain
            : network === "goerli"
                ? ethConnectionGoerli
                : network === "sepolia"
                    ? ethConnectionSepolia
                    : null;

    if (!provider) {
        throw new Error("Invalid network specified");
    }
    const feeData = await provider.getFeeData();
    const gasPrice = feeData.gasPrice;
    const gasPriceInGwei = gasPrice ? ethers.formatUnits(gasPrice, 'gwei') : null;
    if (gasPriceInGwei === null) {
        throw new Error("Failed to get gas price");
    }
    console.log(`Current gas price: ${gasPriceInGwei} Gwei`);

    const gasPriceFloat = parseFloat(gasPriceInGwei);
    const expectedPriceFloat = parseFloat(expectedPrice);
    if (gasPriceFloat < expectedPriceFloat) {
        return true;
    }
}