import { PrismaClient } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";
import { Kafka } from "kafkajs";
import { parse } from "./parser";
import { sendEmail } from "./email";
import { sendSol } from "./singleSolana";
import dotenv from "dotenv";
import {sendEth} from "./singleETH";
import {sendSolToMultiple} from "./multipleSolana";
import {PublicKey} from "@solana/web3.js";
import {sendEthToMultiple} from "./multipleETH";
import createOffer from "./createOffer";
import createListing from "./createListing";
import sendSlackMessage from "./slackMessage";

dotenv.config()
const prismaClient = new PrismaClient();

const TOPIC_NAME = process.env.TOPIC_NAME || "zap-events"
const KAFKA_BROKER = process.env.KAFKA_BROKER || "kafka:9092";

const kafka = new Kafka({
    clientId: 'outbox-processor-2',
    brokers: [KAFKA_BROKER]
})

async function main() {
    const consumer = kafka.consumer({ groupId: 'main-worker-2' });
    await consumer.connect();
    const producer =  kafka.producer();
    await producer.connect();

    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true })

    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            partition,
            offset: message.offset,
            value: message.value?.toString(),
          })
          if (!message.value?.toString()) {
            return;
          }

          const parsedValue = JSON.parse(message.value?.toString());
          const zapRunId = parsedValue.zapRunId;
          const stage = parsedValue.stage;

          const zapRunDetails = await prismaClient.zapRun.findFirst({
            where: {
              id: zapRunId
            },
            include: {
              zap: {
                include: {
                  actions: {
                    include: {
                      type: true
                    }
                  }
                }
              },
            }
          });
          const currentAction = zapRunDetails?.zap.actions.find(x => x.sortingOrder === stage);
          const userId = zapRunDetails?.zap.userId; 
          
          console.log(currentAction)
          console.log(userId)

          if (!currentAction) {
            console.log("Current action not found?");
            return;
          }

          const zapRunMetadata = zapRunDetails?.metadata;
          console.log(zapRunMetadata)

          if (currentAction.type.id === "email") {
            const data = currentAction.metadata as JsonObject;
            console.log(data)
            const body = parse((currentAction.metadata as JsonObject)?.body as string, zapRunMetadata);
            const to = parse((currentAction.metadata as JsonObject)?.email as string, zapRunMetadata);
            // const subject = parse((currentAction.metadata as JsonObject)?.subject as string, zapRunMetadata);

            await sendEmail(to, body, "Email From Dezap");

            console.log(`Sending out email to ${to} body is ${body}`)
          }

          if (currentAction.type.id === "create-offer") {
            const amount = parse((currentAction.metadata as JsonObject)?.amount as string, zapRunMetadata);
            const address = parse((currentAction.metadata as JsonObject)?.address as string, zapRunMetadata);
            const tokenId = parse((currentAction.metadata as JsonObject)?.tokenId as string, zapRunMetadata);
            console.log(`Creating offer of ${amount} to address ${address}`);
            await createOffer(address, tokenId, amount);
          }

          if(currentAction.type.id === "create-listing") {
            const amount = parse((currentAction.metadata as JsonObject)?.amount as string, zapRunMetadata);
            const address = parse((currentAction.metadata as JsonObject)?.address as string, zapRunMetadata);
            const tokenId = parse((currentAction.metadata as JsonObject)?.tokenId as string, zapRunMetadata);
            console.log(`Creating listing of ${amount} to address ${address}`);
            await createListing(address, tokenId, amount);
          }

          if (currentAction.type.id === "send-sol") {

            const amount = parse((currentAction.metadata as JsonObject)?.amount as string, zapRunMetadata);
            const address = parse((currentAction.metadata as JsonObject)?.address as string, zapRunMetadata);
            const server = parse((currentAction.metadata as JsonObject)?.server as string, zapRunMetadata);
            console.log(`Sending out SOL of ${amount} to address ${address}`);
            await sendSol(address, amount, server);
          }

          if (currentAction.type.id === "send-eth") {
            const amount = parse((currentAction.metadata as JsonObject)?.amount as string, zapRunMetadata);
            const address = parse((currentAction.metadata as JsonObject)?.address as string, zapRunMetadata);
            const server = parse((currentAction.metadata as JsonObject)?.server as string, zapRunMetadata);
            console.log(`Sending out ETH of ${amount} to address ${address}`);
            await sendEth(address, amount, server);
          }

          if (currentAction.type.id === "multiple-sol") {
            try {
              const amountStr = parse((currentAction.metadata as JsonObject)?.amount as string, zapRunMetadata);
              const recipientsStr = parse((currentAction.metadata as JsonObject)?.recipients as string, zapRunMetadata);
              const server = parse((currentAction.metadata as JsonObject)?.server as string, zapRunMetadata);

              const amount = parseInt(amountStr, 10);
              if (isNaN(amount) || amount <= 0) {
                throw new Error("Invalid amount. Must be a positive integer in lamports.");
              }

              const recipients = recipientsStr.trim().split(/\s+/).map(address => ({ address }));

              if (recipients.length === 0) {
                throw new Error("Recipients must contain at least one valid address.");
              }

              recipients.forEach(({ address }) => {
                if (!address || !PublicKey.isOnCurve(new PublicKey(address).toBuffer())) {
                  throw new Error(`Invalid recipient address: ${address}`);
                }
              });

              console.log(`Sending SOL of ${amount} lamports to multiple addresses`);
              await sendSolToMultiple(recipients, server, amount);

            } catch (error) {
              console.error("Error in multiple-sol transaction:", error);
              throw error;
            }
          }

          if (currentAction.type.id === "multiple-eth") {
            const amountStr = parse((currentAction.metadata as JsonObject)?.amount as string, zapRunMetadata);
            const recipientsStr = parse((currentAction.metadata as JsonObject)?.recipients as string, zapRunMetadata);
            const server = parse((currentAction.metadata as JsonObject)?.server as string, zapRunMetadata);

            const parsedAmount = parseFloat(amountStr);
            if (isNaN(parsedAmount) || parsedAmount <= 0) {
              throw new Error("Invalid amount. Must be a positive number in ETH.");
            }

            const recipients = recipientsStr.trim().split(/\s+/).map(address => ({ address }));

            if (recipients.length === 0) {
              throw new Error("Recipients must contain at least one valid address.");
            }

            console.log(`Sending ${amountStr} Wei to multiple addresses on ${server}`);
            await sendEthToMultiple(recipients, server, amountStr);
          }

          if (currentAction.type.id === "slack") {
            const channel = parse((currentAction.metadata as JsonObject)?.channel as string, zapRunMetadata);
            const message = parse((currentAction.metadata as JsonObject)?.message as string, zapRunMetadata);

            console.log(channel)
            console.log(message)

            if(!userId) {
              console.log("No user id found");
              throw new Error("No user id found");
            }

              const user = await prismaClient.user.findFirst({
                where: { id: userId },
                select: { slackToken: true }
            });    

            if(!channel || !message || !user) throw new Error("Missing channel or message");

            const token = user.slackToken;

            if(!token) throw new Error("No slack token found");

            await sendSlackMessage(channel, message, token);
          }

          await new Promise(r => setTimeout(r, 500));

          const lastStage = (zapRunDetails?.zap.actions?.length || 1) - 1; // 1
          console.log(lastStage);
          console.log(stage);
          if (lastStage !== stage) {
            console.log("pushing back to the queue")
            await producer.send({
              topic: TOPIC_NAME,
              messages: [{
                value: JSON.stringify({
                  stage: stage + 1,
                  zapRunId
                })
              }]
            })
          }

          console.log("processing done");

          await consumer.commitOffsets([{
            topic: TOPIC_NAME,
            partition: partition,
            offset: (parseInt(message.offset) + 1).toString() // 5
          }])
        },
      })

}

main()
