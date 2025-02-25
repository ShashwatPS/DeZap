import { PrismaClient } from '@prisma/client'

const client = new PrismaClient();

export const executeZap = async (zapId: string, metadata: any) => {
    await client.$transaction(async tx => {
        const run = await tx.zapRun.create({
            data: {
                zapId: zapId,
                metadata: metadata
            }
        });

        await tx.zapRunOutbox.create({
            data: {
                zapRunId: run.id
            }
        })
    })
}
