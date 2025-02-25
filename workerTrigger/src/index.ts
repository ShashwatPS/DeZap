import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";
import dotenv from "dotenv";
import {executeZap} from "./zapRun";
import {checkEthBalance} from "./walletActivity";

dotenv.config();
const prismaClient = new PrismaClient();

const TOPIC_NAME = process.env.TOPIC_NAME || "trigger-events";
const KAFKA_BROKER = process.env.KAFKA_BROKER || "kafka:9092";

const kafka = new Kafka({
    clientId: 'outbox-processor-2',
    brokers: [KAFKA_BROKER]
});

const pollingManager = new Map<string, NodeJS.Timeout>();

async function startPolling(zapID: string, zapData: any, triggerName: string) {
    if (pollingManager.has(zapID)) {
        console.log(`Polling already started for ZapID: ${zapID}`);
        return;
    }

    console.log(`Starting polling for ZapID: ${zapID}`);

    const interval = setInterval(async () => {
        console.log(`Polling for ZapID: ${zapID}`);

        if( triggerName === "checkEthBalance") {
            // console.log("Check Eth Balance")
            // console.log("parsed Value in if else")
            console.log(zapData)
            await checkEthBalance(zapID, zapData);
            await executeZap(zapID, zapData);
        }

        if( triggerName === "checkEthWalletReceivesFunds") {
            console.log("Check Check Wallet Receives Funds")
        }

        if (triggerName === "checkEthWalletSendsFunds") {
            console.log("Check Wallet Sends Funds")
        }

    }, 20000);

    pollingManager.set(zapID, interval);
}

function stopPolling(zapID: string) {
    const interval = pollingManager.get(zapID);
    if (interval) {
        clearInterval(interval);
        pollingManager.delete(zapID);
        console.log(`Stopped polling for ZapID: ${zapID}`);
    }
}

async function main() {
    const consumer = kafka.consumer({ groupId: 'main-worker' });
    await consumer.connect();
    const producer = kafka.producer();
    await producer.connect();

    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });

    await consumer.run({
        autoCommit: true,
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value?.toString(),
            });

            if (!message.value?.toString()) {
                return;
            }

            const parsedValue = JSON.parse(message.value?.toString());
            const triggerId = parsedValue.triggerId;

            const zapData = await prismaClient.trigger.findFirst({
                where: { id: triggerId },
                include: { zap: true }
            });


            if (zapData) {
                // console.log("ZapID: ", zapData.zap.id);
                // console.log("ZapData", zapData.zap.metadata);
                // console.log("TriggerName", zapData)
                startPolling(zapData.zap.id, zapData.zap.metadata, zapData.triggerId);
            }

            console.log("Processing done");
        },
    });
}

main();