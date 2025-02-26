import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();

async function main() {
    await prismaClient.availableTrigger.upsert({
        where: { id: "webhook" },
        update: {},
        create: {
            id: "webhook",
            name: "Webhook",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIovxkR9l-OlwpjTXV1B4YNh0W_s618ijxAQ&s",
            category: "Webhooks"
        }
    });

    await prismaClient.availableTrigger.upsert({
        where: { id: "checkEthBalance" },
        update: {},
        create: {
            id: "checkEthBalance",
            name: "Check Wallet Balance Eth",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIovxkR9l-OlwpjTXV1B4YNh0W_s618ijxAQ&s",
            category: "Wallet Activity"
        }
    });

    await prismaClient.availableTrigger.upsert({
        where: { id: "checkEthWalletReceivesFunds" },
        update: {},
        create: {
            id: "checkEthWalletReceivesFunds",
            name: "Check Wallet Receives Funds Eth",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIovxkR9l-OlwpjTXV1B4YNh0W_s618ijxAQ&s",
            category: "Wallet Activity"
        }
    });

    await prismaClient.availableTrigger.upsert({
        where: { id: "checkEthWalletSendsFunds" },
        update: {},
        create: {
            id: "checkEthWalletSendsFunds",
            name: "Check Wallet Sends Funds Eth",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIovxkR9l-OlwpjTXV1B4YNh0W_s618ijxAQ&s",
            category: "Wallet Activity"
        }
    });

    await prismaClient.availableTrigger.upsert({
        where: { id: "ethGasPrice" },
        update: {},
        create: {
            id: "ethGasPrice",
            name: "Check Eth Gas Price",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIovxkR9l-OlwpjTXV1B4YNh0W_s618ijxAQ&s",
            category: "Ethereum"
        }
    });

    await prismaClient.availableAction.upsert({
        where: { id: "email" },
        update: {},
        create: {
            id: "email",
            name: "Send Email",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nd82eFk5SaBPRIeCpmwL7A4YSokA-kXSmw&s",
            category: "Communication"
        }
    });

    await prismaClient.availableAction.upsert({
        where: { id: "send-sol" },
        update: {},
        create: {
            id: "send-sol",
            name: "Send Sol to a Single Wallet",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT10458YI0Lf1-Zx4fGwhWxI_x4oPCD034xaw&s",
            category: "Solana"
        }
    });

    await prismaClient.availableAction.upsert({
        where: { id: "multiple-sol" },
        update: {},
        create: {
            id: "multiple-sol",
            name: "Send Sol to Multiple Wallets",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nd82eFk5SaBPRIeCpmwL7A4YSokA-kXSmw&s",
            category: "Solana"
        }
    });

    await prismaClient.availableAction.upsert({
        where: { id: "send-eth" },
        update: {},
        create: {
            id: "send-eth",
            name: "Send Eth to a Single Wallet",
            image: "https://w7.pngwing.com/pngs/968/208/png-transparent-ethereum-logos-brands-icon.png",
            category: "Ethereum"
        }
    });

    await prismaClient.availableAction.upsert({
        where: { id: "multiple-eth" },
        update: {},
        create: {
            id: "multiple-eth",
            name: "Send Eth to Multiple Wallets",
            image: "https://w7.pngwing.com/pngs/968/208/png-transparent-ethereum-logos-brands-icon.png",
            category: "Ethereum"
        }
    });

    await prismaClient.availableAction.upsert({
        where: { id: "create-offer" },
        update: {},
        create: {
            id: "create-offer",
            name: "Create Offer",
            image: "https://openseauserdata.com/files/015be3ac02026904d98dbfd3213ef555.svg",
            category: "NFT Marketplace"
        }
    });

    await prismaClient.availableAction.upsert({
        where: { id: "create-listing" },
        update: {},
        create: {
            id: "create-listing",
            name: "Create Listing on OpenSea",
            image: "https://openseauserdata.com/files/015be3ac02026904d98dbfd3213ef555.svg",
            category: "NFT Marketplace"
        }
    });
}

main();