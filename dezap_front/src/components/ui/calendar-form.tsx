"use client"

import { ArrowRight, Maximize2, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CalendarForm({ onClose }) {
    return (
        <Card className="w-full max-w-xl border-purple-100">
            <CardHeader className="flex flex-row items-center justify-between border-b p-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <h2 className="text-base font-normal">1. Select the event</h2>
                        <button className="text-gray-400 hover:text-gray-600">
                            <span className="sr-only">Edit</span>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="text-gray-400 hover:text-gray-600">
                        <Maximize2 className="h-4 w-4" />
                        <span className="sr-only">Maximize</span>
                    </button>
                    <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </button>
                </div>
            </CardHeader>

            <div className="border-b bg-gray-50 px-4 py-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Setup</span>
                    <ArrowRight className="h-4 w-4" />
                    <span className="text-gray-400">Test</span>
                </div>
            </div>

            <CardContent className="space-y-6 p-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        App<span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex items-center gap-2">
                            <span>Google Calendar</span>
                        </div>
                        <Button variant="link" className="h-auto p-0 text-purple-600">
                            Change
                        </Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Trigger event<span className="text-red-500">*</span>
                    </label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose an event" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="new-event">New Event Created</SelectItem>
                            <SelectItem value="event-updated">Event Updated</SelectItem>
                            <SelectItem value="event-deleted">Event Deleted</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Account<span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center justify-between rounded-md border p-3">
                        <span className="text-gray-500">Connect Google Calendar</span>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            Sign In
                        </Button>
                    </div>
                </div>

                <div className="text-sm text-gray-600">
                    <p>
                        Google Calendar is a secure partner with Zapier.{" "}
                        <Link href="#" className="text-purple-600 hover:underline">
                            Your credentials are encrypted and can be removed at any time.
                        </Link>
                    </p>
                    <p className="mt-1">
                        You can{" "}
                        <Link href="#" className="text-purple-600 hover:underline">
                            manage all of your connected accounts here.
                        </Link>
                    </p>
                </div>
            </CardContent>

            <CardFooter className="border-t bg-gray-50 p-4">
                <p className="text-sm text-gray-600">To continue, choose an event</p>
            </CardFooter>
        </Card>
    )
}

