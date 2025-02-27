import type React from "react"
import BaseForm from "../BaseForm"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const CheckEthBalanceForm: React.FC<{ onClose: () => void, onSubmit: (data: any) => void }> = ({ onClose, onSubmit }) => {
  return (
    <BaseForm title="Check ETH Balance" onSubmit={onSubmit} onClose={onClose}>
      <div className="space-y-4">
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
          <Label htmlFor="walletAddress">Wallet Address</Label>
          <Input id="walletAddress" name="walletAddress" placeholder="Enter wallet address" />
        </div>
        <div>
          <Label htmlFor="unit">ETH Units</Label>
          <Select name="unit">
            <SelectTrigger>
              <SelectValue placeholder="Select ETH units" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wei">Wei</SelectItem>
              <SelectItem value="gwei">Gwei</SelectItem>
              <SelectItem value="ether">Ether</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="bal">Balance</Label>
          <Input id="bal" name="bal" placeholder="Enter balance" />
        </div>
      </div>
    </BaseForm>
  )
}

export default CheckEthBalanceForm

