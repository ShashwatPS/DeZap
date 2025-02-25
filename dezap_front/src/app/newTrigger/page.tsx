"use client"

import { ReactFlow, Controls, Background, applyNodeChanges } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useState, useEffect, useRef } from "react"
import { Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Code, Mail, Rss, Calendar, Table } from "lucide-react"
import CalendarForm from "@/components/ui/calendar-form"
import Draggable from "react-draggable"

// Custom Node Component
const triggerNode = ({ data }) => {
    return (
        <button
            onClick={data.onClick}
            style={{ padding: 10, border: "2px dotted #201515", borderRadius: 10, background: "#fff" }}
        >
            <div
                style={{
                    margin: 1,
                    backgroundColor: "#ECE9DF",
                    padding: 5,
                    borderRadius: 5,
                    width: "fit-content",
                    border: "1px solid black",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 5,
                }}
            >
                <div style={{ marginRight: 5 }}>{data.icon}</div>
                <span style={{ fontWeight: "600", fontSize: 15 }}>{data.label}</span>
            </div>
            <div className="mr-2 ml-2 mt-2 font-medium">
                <span style={{ fontWeight: "bold", marginRight: 2 }}>1.</span>
                <span style={{ color: "#88827e" }}>{data.info}</span>
            </div>
        </button>
    )
}

const ActionNode = ({ data }) => {
    return (
        <button
            onClick={data.onClick}
            style={{ padding: 10, border: "2px dotted #000000", borderRadius: 5, background: "#fff" }}
        >
            <div
                style={{
                    margin: 1,
                    backgroundColor: "#ECE9DF",
                    padding: 5,
                    borderRadius: 3,
                    width: "fit-content",
                    border: "1px solid black",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 5,
                }}
            >
                <div style={{ marginRight: 5 }}>
                    <Zap className="m-1" fill="#ECE9DF" size={15} />
                </div>
                <span style={{ fontWeight: "bold", fontSize: 15 }}>{data.label}</span>
            </div>
            <div className="m-2 font-medium">
                <span style={{ fontWeight: "bold", marginRight: 2 }}>1.</span>
                <span style={{ color: "#88827e" }}> Select the Trigger to Start the DeZap</span>
            </div>
        </button>
    )
}

const EventNode = ({ data }) => {
    return (
        <button
            onClick={data.onClick}
            style={{ padding: 10, border: "2px solid #000000", borderRadius: 5, background: "#fff" }}
        >
            <div
                style={{
                    margin: 1,
                    backgroundColor: "#ECE9DF",
                    padding: 5,
                    borderRadius: 3,
                    width: "fit-content",
                    border: "1px solid black",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 5,
                }}
            >
                <div style={{ marginRight: 5 }}>{data.icon}</div>
                <span style={{ fontWeight: "bold", fontSize: 15 }}>{data.label}</span>
            </div>
            <div className="m-2 font-medium">
                <span style={{ fontWeight: "bold", marginRight: 2 }}>1.</span>
                <span style={{ color: "#88827e" }}>{data.info}</span>
            </div>
        </button>
    )
}

const nodeTypes = {
    trigger: triggerNode,
    action: ActionNode,
    event: EventNode,
}

function Flow() {
    const handleNodeClick = (event, node) => {
        if (node && node.data) {
            if (!node.data.triggerAppSet) {
                console.log("Node Clicked", node.data.triggerAppSet)
                setIsDrawerOpen(true)
            } else {
                setFormContent(node.data)
                setIsFormOpen(true)
            }
        }
    }

    const [selectedApp, setSelectedApp] = useState(null)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [formContent, setFormContent] = useState(null)

    const handleAppSelect = (app) => {
        setSelectedApp(app)
        setNodes((nds) =>
            nds.map((node) =>
                node.id === "1"
                    ? {
                        ...node,
                        type: "event",
                        data: {
                            ...node.data,
                            label: app.name,
                            icon: app.icon,
                            info: "Select the Event",
                            triggerAppSet: true,
                        },
                    }
                    : node,
            ),
        )
        setIsDrawerOpen(false)
        console.log("App Selected:", app.name)
    }

    const [nodes, setNodes] = useState([
        {
            id: "1",
            type: "trigger", // Use custom node type
            data: {
                label: "Trigger",
                info: " Select the Trigger to Start the DeZap",
                onClick: handleNodeClick,
                icon: <Zap className="m-1" fill="#ECE9DF" size={15} />,
                triggerAppSet: false,
            }, // Replace emoji with symbol
            position: { x: 0, y: 0 },
        },
    ])

    const containerRef = useRef(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const formRef = useRef(null)

    useEffect(() => {
        if (containerRef.current) {
            const { clientWidth, clientHeight } = containerRef.current
            setNodes((nds) =>
                nds.map((node) => ({
                    ...node,
                    position: { x: clientWidth / 2 - 50, y: clientHeight / 2 - 25 }, // Adjust for node dimensions
                })),
            )
        }
    }, [containerRef.current])

    const onNodesChange = (changes) => setNodes((nds) => applyNodeChanges(changes, nds))

    return (
        <div ref={containerRef} style={{ height: "100%", width: "100%" }}>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                nodeTypes={nodeTypes}
                style={{ backgroundColor: "#f9f7f3" }}
                onNodeClick={handleNodeClick}
            >
                <Background />
                <Controls />
            </ReactFlow>
            {isFormOpen && (
                <Draggable nodeRef={formRef}>
                    <div
                        ref={formRef}
                        style={{
                            position: "absolute",
                            top: "10%",
                            right: "10%",
                            background: "#fff",
                            padding: 20,
                            borderRadius: 10,
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            width: "300px",
                            cursor: "move",
                        }}
                    >
                        <div className="max-w-xl">
                            <CalendarForm onClose={() => setIsFormOpen(false)} />
                        </div>
                    </div>
                </Draggable>
            )}
            <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-4xl p-4">
                        <DrawerHeader>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search 7,000+ apps and tools..." className="pl-8" />
                            </div>
                        </DrawerHeader>
                        <Tabs defaultValue="apps" className="mt-4">
                            <TabsList className="w-full justify-start">
                                <TabsTrigger value="apps">Apps</TabsTrigger>
                                <TabsTrigger value="zapier">Zapier products</TabsTrigger>
                                <TabsTrigger value="tools">Built-in tools</TabsTrigger>
                                <TabsTrigger value="all">All</TabsTrigger>
                            </TabsList>
                            <TabsContent value="apps" className="mt-4">
                                <h3 className="mb-4 text-sm text-muted-foreground">Your top apps</h3>
                                <div className="grid gap-2">
                                    {[
                                        { name: "Google Forms", icon: "📝" },
                                        { name: "Facebook Lead Ads", icon: "📢" },
                                        { name: "Google Calendar", icon: <Calendar className="h-4 w-4" /> },
                                        { name: "Google Drive", icon: "📁" },
                                        { name: "Gmail", icon: "📧" },
                                        { name: "Google Sheets", icon: "📊" },
                                        { name: "HubSpot", icon: "🎯" },
                                        { name: "Mailchimp", icon: "📬" },
                                        { name: "Notion", icon: "📓" },
                                        { name: "Slack", icon: "💬" },
                                    ].map((app) => (
                                        <Button
                                            key={app.name}
                                            variant="ghost"
                                            className="w-full justify-start"
                                            onClick={() => handleAppSelect(app)}
                                        >
                                            <span className="mr-2">{typeof app.icon === "string" ? app.icon : app.icon}</span>
                                            {app.name}
                                        </Button>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="tools" className="mt-4">
                                <h3 className="mb-4 text-sm text-muted-foreground">Popular built-in tools</h3>
                                <div className="grid gap-2">
                                    {[
                                        { name: "Webhooks", icon: "🔗" },
                                        { name: "Schedule", icon: "⏰" },
                                        { name: "Email", icon: <Mail className="h-4 w-4" /> },
                                        { name: "RSS", icon: <Rss className="h-4 w-4" /> },
                                        { name: "Code", icon: <Code className="h-4 w-4" /> },
                                        { name: "Email Parser", icon: "📨" },
                                        { name: "Sub-Zap", icon: "⚡" },
                                    ].map((tool) => (
                                        <Button
                                            key={tool.name}
                                            variant="ghost"
                                            className="w-full justify-start"
                                            onClick={() => handleAppSelect(tool)}
                                        >
                                            <span className="mr-2">{typeof tool.icon === "string" ? tool.icon : tool.icon}</span>
                                            {tool.name}
                                        </Button>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="zapier" className="mt-4">
                                <h3 className="mb-4 text-sm text-muted-foreground">New Zapier products</h3>
                                <div className="grid gap-2">
                                    {[
                                        { name: "Chatbots", icon: "🤖" },
                                        { name: "Interfaces", icon: "🖥️" },
                                        { name: "Tables", icon: <Table className="h-4 w-4" /> },
                                    ].map((product) => (
                                        <Button
                                            key={product.name}
                                            variant="ghost"
                                            className="w-full justify-start"
                                            onClick={() => handleAppSelect(product)}
                                        >
                                            <span className="mr-2">{typeof product.icon === "string" ? product.icon : product.icon}</span>
                                            {product.name}
                                        </Button>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="all" className="mt-4">
                                <div className="text-center text-muted-foreground">All apps and tools will be shown here</div>
                            </TabsContent>
                        </Tabs>
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button variant="outline">Close</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default Flow

