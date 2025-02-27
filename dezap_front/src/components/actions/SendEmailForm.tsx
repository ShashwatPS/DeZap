import type React from "react"
import BaseForm from "../BaseForm"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const SendEmailForm: React.FC<{ onClose: () => void, onSubmit: (data: any) => void }> = ({ onClose, onSubmit }) => {
  return (
    <BaseForm title="Send Email" onSubmit={onSubmit} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="to">To</Label>
          <Input id="to" name="to" type="email" placeholder="Enter recipient email" />
        </div>
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" name="subject" placeholder="Enter email subject" />
        </div>
        <div>
          <Label htmlFor="body">Body</Label>
          <Textarea id="body" name="body" placeholder="Enter email body" />
        </div>
      </div>
    </BaseForm>
  )
}

export default SendEmailForm

