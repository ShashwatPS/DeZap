import type React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface BaseFormProps {
    title: string
    children: React.ReactNode
    onSubmit: (data: any) => void
    onClose: () => void
}

const BaseForm: React.FC<BaseFormProps> = ({ title, children, onSubmit, onClose }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(formData)
        onSubmit(data)
    }

    return (
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent>{children}</CardContent>
                <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">Submit</Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export default BaseForm

