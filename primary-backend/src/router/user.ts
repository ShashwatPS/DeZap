
import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SigninSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
import axios from "axios";

const router = Router();

router.post("/signup", async (req, res) => {
    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);

    if (!parsedData.success) {
        console.log(parsedData.error);
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const userExists = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username
        }
    });

    if (userExists) {
        return res.status(403).json({
            message: "User already exists"
        })
    }

    await prismaClient.user.create({
        data: {
            email: parsedData.data.username,
            password: parsedData.data.password,
            name: parsedData.data.name
        }
    })

    // await sendEmail();

    return res.json({
        message: "Successfully created account"
    });

})

router.post("/signin", async (req, res) => {
    const body = req.body;
    const parsedData = SigninSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    });

    if (!user) {
        return res.status(403).json({
            message: "Sorry credentials are incorrect"
        })
    }

    const token = jwt.sign({
        id: user.id
    }, JWT_PASSWORD);

    res.json({
        token: token,
    });
})

router.get("/", authMiddleware, async (req, res) => {
    // TODO: Fix the type
    // @ts-ignore
    const id = req.id;
    const user = await prismaClient.user.findFirst({
        where: {
            id
        },
        select: {
            name: true,
            email: true
        }
    });

    return res.json({
        user
    });
})

router.post("/slack/callback", authMiddleware, async (req, res) => {
    // @ts-ignore
    const id = req.id;
    const code = req.query.code;

    if (!code) {
        return res.status(400).json({ error: "Missing code parameter" });
    }

    const clientID = "5875039330148.8519347852739";
    const clientSecret = "236ef261106f48d29c90b0298601d07f";
    const redirectURI = "https://a8b7-2409-40d2-2c-d436-2cc1-5a28-51c0-128e.ngrok-free.app/slackRedirect";
    const tokenURL = "https://slack.com/api/oauth.v2.access";

    try {
        const response = await axios.post(tokenURL, null, {
            params: {
                code,
                client_id: clientID,
                client_secret: clientSecret,
                redirect_uri: redirectURI,
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        const result = response.data;

        if (!result.ok) {
            return res.status(401).json({ error: result.error || "Unauthorized" });
        }

        console.log("heheh", result)
        const token = result.authed_user.access_token;
        console.log("Slack token response:", token);

        await prismaClient.$transaction([
            prismaClient.user.update({
                where: { id },
                data: { slackToken: token }
            }),
            prismaClient.availableAction.upsert({
                where: { id: "slack" },
                update: {},
                create: {
                    id: "slack",
                    name: "Slack",
                    image: "data:image/png;base64,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",
                    category: "Communication"
                },
            }),
        ]);

        return res.status(200).json({ access_token: token });
    } catch (error) {
        console.error("Error requesting Slack token:", error);
        return res.status(500).json({ error: "Failed to request Slack token" });
    }
});

router.get("/slack", authMiddleware, async (req, res) => {
    // @ts-ignore
    const id = req.id;

    const user = await prismaClient.user.findFirst({
        where: { id },
        select: { slackToken: true }
    });

    if (!user || !user.slackToken) {
        return res.status(404).json({ message: "No slack token found" });
    }

    return res.json({ slackToken: user.slackToken });
});

router.post("/slack/message", authMiddleware, async (req, res) => {
    try {
        // @ts-ignore
        const id = req.id;
        const { channel, text } = req.body;

        if (!channel || !text) {
            return res.status(400).json({ error: "Channel and text are required" });
        }

        const user = await prismaClient.user.findFirst({
            where: { id },
            select: { slackToken: true }
        });

        if (!user || !user.slackToken) {
            return res.status(404).json({ error: "No Slack token found" });
        }

        const token = user.slackToken;

        const response = await axios.post("https://slack.com/api/chat.postMessage", {
            channel,
            text
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.data.ok) {
            return res.status(400).json({ error: response.data.error });
        }

        return res.status(200).json({
            message: "Successfully sent message to Slack",
            slackResponse: response.data
        });

    } catch (error) {
        console.error("Error sending Slack message:", error);
        return res.status(500).json({ error: "Failed to send Slack message" });
    }
});

router.get("/slack/channels", authMiddleware, async (req, res) => {
    try {
        // @ts-ignore
        const id = req.id;

        const user = await prismaClient.user.findFirst({
            where: { id },
            select: { slackToken: true }
        });

        if (!user || !user.slackToken) {
            return res.status(404).json({ error: "No Slack token found" });
        }

        const token = user.slackToken;

        const response = await axios.get("https://slack.com/api/conversations.list", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.data.ok) {
            return res.status(400).json({ error: response.data.error });
        }

        return res.status(200).json({
            message: "Successfully fetched Slack channels",
            channels: response.data.channels
        });

    } catch (error) {
        console.error("Error fetching Slack channels:", error);
        return res.status(500).json({ error: "Failed to fetch Slack channels" });
    }
});

export const userRouter = router;