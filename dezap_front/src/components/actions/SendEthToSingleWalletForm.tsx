import type React from "react"
import BaseForm from "../BaseForm"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const SendSolToSingleWalletForm: React.FC<{ onClose: () => void, onSubmit: (data: any) => void }> = ({ onClose, onSubmit }) => {
    return (
        <BaseForm title="Send ETH to Single Wallet" onSubmit={onSubmit} onClose={onClose}>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" name="amount" type="number" placeholder="Enter amount" />
                </div>
                <div>
                    <Label htmlFor="server">Network</Label>
                    <Select name="server">
                        <SelectTrigger>
                            <SelectValue placeholder="Select network" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="main">Main</SelectItem>
                            <SelectItem value="goerli">Goerli</SelectItem>
                            <SelectItem value="sepolia">Sepolia</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="recipient">Recipient</Label>
                    <Input id="recipient" name="recipient" placeholder="Enter recipient address" />
                </div>
            </div>
        </BaseForm>
    )
}

export default SendSolToSingleWalletForm

