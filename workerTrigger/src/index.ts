import { PrismaClient } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";
import { Kafka } from "kafkajs";
import dotenv from "dotenv";

dotenv.config()
const prismaClient = new PrismaClient();

const TOPIC_NAME = process.env.TOPIC_NAME || "trigger-events"
const KAFKA_BROKER = process.env.KAFKA_BROKER || "kafka:9092";

const kafka = new Kafka({
    clientId: 'outbox-processor-2',
    brokers: [KAFKA_BROKER]
})

async function main() {
    const consumer = kafka.consumer({ groupId: 'main-worker' });
    await consumer.connect();
    const producer =  kafka.producer();
    await producer.connect();

    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true })

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

            console.log("ZapID: ", zapData!.zap.id);
            console.log("ZapData", zapData!.zap.metadata);
            console.log("Processing done");
        },
    });

}

main()
