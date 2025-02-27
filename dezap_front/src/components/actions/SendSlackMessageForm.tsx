import type React from "react"
import BaseForm from "../BaseForm"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const SendSlackMessageForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <BaseForm title="Send Slack Message" onSubmit={console.log} onClose={onClose}>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="channel">Channel</Label>
                    <Select name="channel">
                        <SelectTrigger>
                            <SelectValue placeholder="Select channel" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="general">general</SelectItem>
                            <SelectItem value="random">random</SelectItem>
                            <SelectItem value="project-x">project-x</SelectItem>
                            <SelectItem value="announcements">announcements</SelectItem>
                            <SelectItem value="help">help</SelectItem>
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

