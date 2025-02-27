import type React from "react"
import BaseForm from "../BaseForm"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const SendSolToMultipleWalletsForm: React.FC<{ onClose: () => void, onSubmit: (data: any) => void }> = ({ onClose, onSubmit }) => {
  return (
    <BaseForm title="Send SOL to Multiple Wallets" onSubmit={onSubmit} onClose={onClose}>
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
              <SelectItem value="dev">Dev</SelectItem>
              <SelectItem value="test">Test</SelectItem>
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

export default SendSolToMultipleWalletsForm

