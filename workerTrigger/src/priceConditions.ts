import { ethers } from "ethers";
import {ethConnectionGoerli, ethConnectionMain, ethConnectionSepolia, alchemyAPI} from './constants'

export const ethGasPrice = async (zapID: string, zapData: any): Promise<boolean> => {
    const { network, expectedPrice } = zapData;
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
    return gasPriceFloat < expectedPriceFloat
}