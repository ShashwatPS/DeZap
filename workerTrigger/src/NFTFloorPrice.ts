import { Alchemy, Network } from "alchemy-sdk";
import { alchemyAPI } from "./constants";

export const NFTFloorPrice = async (zapID: string, zapData: any) => {
    const { contractAddress, price, type } = zapData;
    const config = {
        apiKey: alchemyAPI,
        network: Network.ETH_MAINNET,
    };

    const alchemy = new Alchemy(config);

    try {
        const cost = await alchemy.nft.getFloorPrice(contractAddress);

        if (!cost) {
            return { error: "No floor price data available", result: false };
        }

        const prices = Object.values(cost)
            .map((market: any) => market?.floorPrice)
            .filter((value): value is number => typeof value === "number");

        if (prices.length === 0) {
            return { error: "No valid floor prices found", result: false };
        }

        const maxmin = {
            lowest: Math.min(...prices),
            highest: Math.max(...prices),
        };

        const isAbove = type === "above" && maxmin.highest > price;
        const isBelow = type === "below" && maxmin.lowest < price;

        return { maxmin, cost, type, result: isAbove || isBelow };
    } catch (error) {
        return { error: error, result: false };
    }
};