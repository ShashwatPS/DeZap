

const { Alchemy, Network, NftFilters } = require("alchemy-sdk");

const alchemyAPI = "qv5hYYVTUkqsMmWwFF0DZVZBz4ZNHvpG";
const NFTFloorPrice = async (zapID: string, zapData: any) => {
    const { contractAddress, price, type } = zapData;
    const config = {
        apiKey: alchemyAPI,
        network: Network.ETH_MAINNET,
    };
    const address = contractAddress;
    const alchemy = new Alchemy(config);
    // Get floor price
    const cost = await alchemy.nft.getFloorPrice(address);
    const prices = Object.values(cost)
        .map((market: any) => market.floorPrice)
        .filter((cost) => typeof cost === "number");

    const maxmin = {
        lowest: Math.min(...prices),
        highest: Math.max(...prices),
    };
    // console.log(maxmin);
    if (type === "above") {
        if (maxmin.highest > price) {
            const res = { maxmin, cost, type, result: true };
            // console.log(res);
            return res;
        } else {
            return { maxmin, cost, type, result: false };
        }
    } else if (type === "below") {
        if (maxmin.lowest < price) {
            const res = { maxmin, cost, type, result: true };
            // console.log(res);
            return res;
        } else {
            return { maxmin, cost, type, result: false };
        }
    }
}
// print the result
// Example usage
const zapID = "exampleZapID";
const zapData = {
    contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
    price: 50,
    type: "above"
};

NFTFloorPrice(zapID, zapData).then(result => {
    console.log(result);
}).catch(error => {
    console.error("Error:", error);
});