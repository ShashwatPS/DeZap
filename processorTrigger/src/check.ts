import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";
import dotenv from "dotenv";

dotenv.config();
const prismaClient = new PrismaClient();

const TOPIC_NAME = process.env.TOPIC_NAME || "trigger-events";
const KAFKA_BROKER = process.env.KAFKA_BROKER || "kafka:9092";

const kafka = new Kafka({
    clientId: 'outbox-processor-2',
    brokers: [KAFKA_BROKER]
});

const pollingManager = new Map<string, NodeJS.Timeout>();

async function startPolling(zapID: string, zapData: any) {
    const interval = setInterval(async () => {
        console.log(`Polling for ZapID: ${zapID}`);
        // Add your polling logic here
        // If a certain condition is met, stop polling and return a result
        const conditionMet = Math.random() > 0.8; // Example condition
        if (conditionMet) {
            console.log(`Condition met for ZapID: ${zapID}`);
            stopPolling(zapID);
        }
    }, 5000); // Poll every 5 seconds

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
                console.log("ZapID: ", zapData.zap.id);
                console.log("ZapData", zapData.zap.metadata);
                startPolling(zapData.zap.id, zapData.zap.metadata);
            }

            console.log("Processing done");
        },
    });
}

main();