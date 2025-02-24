import express from "express";
import { PrismaClient } from "@prisma/client";
import path from "path";

const client = new PrismaClient();

const app = express();
app.use(express.json());

const POLLING_INTERVAL = 30000; // 30 seconds

async function pollData(userId: string, zapId: string, triggerId: string, metadata: any, requiredValue: string) {
    try {


        if (checkCondition(newData)) {
            await client.$transaction(async tx => {
                const run = await tx.zapRun.create({
                    data: {
                        zapId: newData.zapId,
                        metadata: newData.metadata,
                    }
                });

                await tx.zapRunOutbox.create({
                    data: {
                        zapRunId: run.id,
                        metadata: metadata
                    }
                });
            });

            console.log("Conditions met. Data polled and stored successfully");
            return true; // Stop polling
        } else {
            console.log("Conditions not met. Continuing to poll...");
            return false; // Continue polling
        }
    } catch (error) {
        console.error("Error polling data:", error);
        return false; // Continue polling in case of error
    }
}

function startPolling(userId: string, zapId: string, triggerId: string, metadata: any, requiredValue: any) {
    const poll = async () => {
        const shouldStop = await pollData(userId, zapId, triggerId, metadata, requiredValue);
        if (shouldStop) {
            clearInterval(intervalId);
        }
    };
    poll();

    // Continue polling at the specified interval
    const intervalId = setInterval(poll, POLLING_INTERVAL);
}


app.listen(3003, () => {
    console.log("Server is running on port 3002");
});