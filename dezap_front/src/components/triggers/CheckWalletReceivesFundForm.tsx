import type React from "react"
import BaseForm from "../BaseForm"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const CheckWalletReceivesFundForm: React.FC<{ onClose: () => void, onSubmit: (data: any) => void }> = ({ onClose, onSubmit }) => {
  const handleSubmit = (data: any) => {
    // Save form data as metadata
    const metadata = {
      network: data.network,
      walletAddress: data.walletAddress,
    }
    onSubmit(metadata)
  }

  return (
    <BaseForm title="Check Wallet Receives Fund" onSubmit={handleSubmit} onClose={onClose}>
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

export default CheckWalletReceivesFundForm

