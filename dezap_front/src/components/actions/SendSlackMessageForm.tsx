import type React from "react"
import { useState, useEffect } from "react"
import BaseForm from "../BaseForm"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { URL } from "@/constants/url"
import axios from "axios"
import { useAuth } from "@/context/AuthContext"
const SendSlackMessageForm: React.FC<{ onClose: () => void, onSubmit: (data: any) => void }> = ({ onClose, onSubmit }) => {
    const [channels, setChannels] = useState<{ id: string, name: string }[]>([])
    const { token } = useAuth()
    useEffect(() => {
        const fetchChannels = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${URL}/api/v1/user/slack/channels`,
            headers: {
                'Authorization': token,
            }
        };

        const response = await axios.request(config);
        console.log(response.data.channels);
        setChannels(response.data.channels.map((channel: any) => ({ id: channel.id, name: channel.name })));
    }
        fetchChannels()
    }, [])

    return (
        <BaseForm title="Send Slack Message" onSubmit={onSubmit} onClose={onClose}>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="channel">Channel</Label>
                    <Select name="channel">
                        <SelectTrigger>
                            <SelectValue placeholder="Select channel" />
                        </SelectTrigger>
                        <SelectContent>
                            {channels.map(channel => (
                                <SelectItem key={channel.id} value={channel.name}>
                                    {channel.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="message">Message</Label>
                    <Input id="message" name="message" placeholder="Enter your message" />
                </div>
            </div>
        </BaseForm>
    )
}

export default SendSlackMessageForm

