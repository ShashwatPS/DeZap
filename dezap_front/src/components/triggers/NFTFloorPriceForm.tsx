import type React from "react"
import BaseForm from "../BaseForm"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const NFTFloorPriceForm: React.FC<{ onClose: () => void, onSubmit: (data: any) => void }> = ({ onClose, onSubmit }) => {
  return (
    <BaseForm title="NFT Floor Price" onSubmit={onSubmit} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="contractAddress">Contract Address</Label>
          <Input id="contractAddress" name="contractAddress" placeholder="Enter contract address" />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input id="price" name="price" type="number" placeholder="Enter price" />
        </div>
        <div>
          <Label htmlFor="type">Type</Label>
          <Select name="type">
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="above">Above</SelectItem>
              <SelectItem value="below">Below</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </BaseForm>
  )
}

export default NFTFloorPriceForm

