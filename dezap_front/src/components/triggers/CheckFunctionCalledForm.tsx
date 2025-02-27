import type React from "react"
import BaseForm from "../BaseForm"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const CheckFunctionCalledForm: React.FC<{ onClose: () => void, onSubmit: (data: any) => void }> = ({ onClose, onSubmit }) => {
  return (
    <BaseForm title="Check Function Called" onSubmit={onSubmit} onClose={onClose}>
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
          <Label htmlFor="contractAddress">Contract Address</Label>
          <Input id="contractAddress" name="contractAddress" placeholder="Enter contract address" />
        </div>
        <div>
          <Label htmlFor="functionName">Function Name</Label>
          <Input id="functionName" name="functionName" placeholder="Enter function name" />
        </div>
        <div>
          <Label htmlFor="fromBlock">From Block (optional)</Label>
          <Input id="fromBlock" name="fromBlock" placeholder="Enter from block" />
        </div>
      </div>
    </BaseForm>
  )
}

export default CheckFunctionCalledForm

