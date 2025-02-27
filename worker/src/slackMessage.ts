import axios from "axios";

export default async function sendSlackMessage(channel: string, text: string, token: string) {
    try {
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
            console.log(response.data.error);
            throw new Error(response.data.error);
        }
        console.log(response.data);
        } catch (error) {
        console.error("Transaction Failed:", error);
        throw error;
    }
}