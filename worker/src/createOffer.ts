import { WALLET_ADDRESS, sdk} from './utils';

const createOffer = async (tokenAddress: string, tokenId: string, offerAmount: string) => {
    const offer = {
        accountAddress: WALLET_ADDRESS,
        startAmount: offerAmount,
        asset: {
            tokenAddress: tokenAddress,
            tokenId: tokenId,
        },
    };

    try {
        const response = await sdk.createOffer(offer);
        console.log("Successfully created an offer with orderHash:", response.orderHash);
    } catch (error) {
        console.error("Error in createOffer:", error);
    }
}

export default createOffer;