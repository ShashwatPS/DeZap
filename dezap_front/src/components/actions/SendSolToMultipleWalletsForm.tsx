"use client"

import { useState, useRef } from "react"
import type React from "react"
import { Plus, Trash2 } from "lucide-react"
import BaseForm from "../BaseForm"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const SendSolToMultipleWalletsForm: React.FC<{ onClose: () => void; onSubmit: (data: any) => void }> = ({
  onClose,
  onSubmit,
}) => {
  const [addresses, setAddresses] = useState<string[]>([""])
  const hiddenInputRef = useRef<HTMLInputElement>(null)

  const addAddressField = () => {
    setAddresses([...addresses, ""])
  }

  const removeAddressField = (index: number) => {
    if (addresses.length > 1) {
      const newAddresses = [...addresses]
      newAddresses.splice(index, 1)
      setAddresses(newAddresses)
    }
  }

  const updateAddress = (index: number, value: string) => {
    const newAddresses = [...addresses]
    newAddresses[index] = value
    setAddresses(newAddresses)

    // Update the hidden input value whenever addresses change
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = newAddresses.filter((addr) => addr.trim() !== "").join(" ")
    }
  }

  // Custom onSubmit to intercept and enhance the form data
  const handleFormSubmit = (data: any) => {
    // The recipients field will already be populated from the hidden input
    onSubmit(data)
  }

  return (
    <BaseForm title="Send SOL to Multiple Wallets" onSubmit={handleFormSubmit} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input id="amount" name="amount" type="number" placeholder="Enter amount" required />
        </div>
        <div>
          <Label htmlFor="server">Network</Label>
          <Select name="server" defaultValue="main">
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

        {/* Hidden input to store all addresses for form submission */}
        <input
          type="hidden"
          name="recipients"
          ref={hiddenInputRef}
          value={addresses.filter((addr) => addr.trim() !== "").join(" ")}
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Recipients</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addAddressField}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              <span>Add Address</span>
            </Button>
          </div>

          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
            {addresses.map((address, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={address}
                  onChange={(e) => updateAddress(index, e.target.value)}
                  placeholder="Enter wallet address"
                  className="flex-1"
                />
                {addresses.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAddressField(index)}
                    className="h-10 w-10 flex-shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove address</span>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseForm>
  )
}

export default SendSolToMultipleWalletsForm

