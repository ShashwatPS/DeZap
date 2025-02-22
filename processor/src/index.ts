import { PrismaClient } from "@prisma/client";
import {Kafka} from "kafkajs";
import dotenv from "dotenv";

dotenv.config();
const client = new PrismaClient();

const KAFKA_BROKER = process.env.KAFKA_BROKER || "kafka:9092";
const TOPIC_NAME = process.env.TOPIC_NAME || "zap-events";

const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: [KAFKA_BROKER]
})

async function main() {
    const producer =  kafka.producer();
    await producer.connect();

    while(1) {
        const pendingRows = await client.zapRunOutbox.findMany({
            where :{},
            take: 10
        })
        console.log(pendingRows);

        producer.send({
            topic: TOPIC_NAME,
            // @ts-ignore
            messages: pendingRows.map(r => {
                return {
                    value: JSON.stringify({ zapRunId: r.zapRunId, stage: 0 })
                }
            })
        })  

        await client.zapRunOutbox.deleteMany({
            where: {
                id: {
                    // @ts-ignore
                    in: pendingRows.map(x => x.id)
                }
            }
        })

        await new Promise(r => setTimeout(r, 3000));
    }
}

main();