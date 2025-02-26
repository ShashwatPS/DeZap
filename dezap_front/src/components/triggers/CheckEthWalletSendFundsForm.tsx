import type React from "react"
import BaseForm from "../BaseForm"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const CheckEthWalletSendFundsForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <BaseForm title="Check ETH Wallet Send Funds" onSubmit={console.log} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="network">Network</Label>
          <Select name="network">
            <SelectTrigger>
              <SelectValue placeholder="Select network" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="main">Main</SelectItem>
              <SelectItem value="gorilla">Gorilla</SelectItem>
              <SelectItem value="sepolia">Sepolia</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="walletAddress">Wallet Address</Label>
          <Input id="walletAddress" name="walletAddress" placeholder="Enter wallet address" />
        </div>
      </div>
    </BaseForm>
  )
}

export default CheckEthWalletSendFundsForm

