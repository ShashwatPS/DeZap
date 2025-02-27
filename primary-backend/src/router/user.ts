
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

router.post("/slack/callback", authMiddleware , async (req, res) => {
    // @ts-ignore
    const id = req.id;
    const code = req.query.code;

    if (!code) {
        return res.status(400).json({ error: "Missing code parameter" });
    }

    const clientID = "5875039330148.8519347852739";
    const clientSecret = "236ef261106f48d29c90b0298601d07f";
    const redirectURI = "https://64c9-2409-40d2-2c-d436-8ceb-83a0-361c-676b.ngrok-free.app/slackRedirect";
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
                    image: "https://i.imgur.com/6f0l5tE.png",
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