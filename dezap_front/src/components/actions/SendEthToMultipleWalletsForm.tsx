import type React from "react"
import BaseForm from "../BaseForm"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const SendEthToMultipleWalletsForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <BaseForm title="Send ETH to Multiple Wallets" onSubmit={console.log} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input id="amount" name="amount" type="number" placeholder="Enter amount" />
        </div>
        <div>
          <Label htmlFor="network">Network</Label>
          <Select name="network">
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
          <Label htmlFor="recipients">Recipients</Label>
          <Textarea id="recipients" name="recipients" placeholder="Enter recipient addresses, one per line" />
        </div>
      </div>
    </BaseForm>
  )
}

export default SendEthToMultipleWalletsForm

