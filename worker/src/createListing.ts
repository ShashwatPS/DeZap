import { WALLET_ADDRESS, sdk } from './utils';

const createListing = async (tokenAddress: string, tokenId: string, listingAmount: string) => {
    const listing = {
        accountAddress: WALLET_ADDRESS,
        startAmount: listingAmount,
        asset: {
            tokenAddress: tokenAddress,
            tokenId: tokenId,
        },
    };

    try {
        const response = await sdk.createListing(listing);
        console.log("Successfully created a listing with orderHash:", response.orderHash);
    } catch (error) {
        console.error("Error in createListing:", error);
    }
}

export default createListing;