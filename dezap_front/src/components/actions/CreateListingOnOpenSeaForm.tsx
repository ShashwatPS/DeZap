import type React from "react"
import BaseForm from "../BaseForm"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const CreateListingOnOpenSeaForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <BaseForm title="Create Listing on OpenSea" onSubmit={console.log} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="tokenAddress">Token Address</Label>
          <Input id="tokenAddress" name="tokenAddress" placeholder="Enter token address" />
        </div>
        <div>
          <Label htmlFor="tokenId">Token ID</Label>
          <Input id="tokenId" name="tokenId" placeholder="Enter token ID" />
        </div>
        <div>
          <Label htmlFor="listingAmount">Listing Amount</Label>
          <Input id="listingAmount" name="listingAmount" type="number" placeholder="Enter listing amount" />
        </div>
      </div>
    </BaseForm>
  )
}

export default CreateListingOnOpenSeaForm

