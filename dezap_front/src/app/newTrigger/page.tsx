"use client"
import { useAuth } from "@/context/AuthContext"
import { ReactFlow, Controls, Background, applyNodeChanges, addEdge, ConnectionMode, Handle, Position } from "@xyflow/react" // Import addEdge
import "@xyflow/react/dist/style.css"
import { useState, useEffect, useRef } from "react"
import { Zap, Plus, CircleAlert, AlertCircle, CircleCheck } from "lucide-react" // Import Plus, Check, and X icons
import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Code, Mail, Rss, Calendar, Table } from "lucide-react"
import CalendarForm from "@/components/ui/calendar-form"
import Draggable from "react-draggable"
import axios from "axios"
import FormSelector from "@/components/FormSelector" // Import FormSelector
import { URL } from "@/constants/url" // Import URL
import CustomEdge from "@/components/CustomEdge" // Import CustomEdge
import { useRouter } from 'next/navigation'; // Import useRouter

interface NodeData {
    label: string;
    id: string;
    info: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>, node: Node) => void;
    icon: React.ReactNode;
    triggerAppSet: boolean;
    ActionAppSet?: boolean; // Add ActionAppSet to NodeData
    triggerId: string; // Ensure triggerId is always present
    formType?: string; // Add formType to NodeData
    metadata?: any; // Add metadata to NodeData
}

interface Node {
    id: string;
    type: string;
    data: NodeData;
    position: { x: number; y: number };
}

// Custom Node Component
const triggerNode = ({ data }: { data: NodeData }) => {
    return (
        <>
            <Handle
                type="target"
                position={Position.Bottom}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={true}
            />
            <button
                onClick={(event) => data.onClick(event, { id: "", type: "", data, position: { x: 0, y: 0 } })}
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
                    <span style={{ fontWeight: "bold", marginRight: 2 }}>1. </span>
                    <span style={{ color: "#88827e" }}>{data.info}</span>
                </div>
            </button>
            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                isConnectable={true}
            />
        </>
    )
}

const ActionNode = ({ data }: { data: NodeData }) => {
    const isMetadataFilled = data.metadata && Object.keys(data.metadata).length > 0; // Check if metadata is filled
    const isAppSelected = data.ActionAppSet; // Check if app is selected

    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={true}
            />
            <button
                onClick={(event) => data.onClick(event, { id: "", type: "", data, position: { x: 0, y: 0 } })}
                style={{
                    padding: 10,
                    border: isAppSelected ? "1px solid #000000" : "2px dotted #000000",
                    borderRadius: 5,
                    background: isAppSelected ? "#fff" : "#ECE9DF",
                    width: 300
                }}
            >
                {isAppSelected && (
                    <div style={{ display: 'flex', alignItems: 'center', alignContent: 'center' }}>
                        <div style={{ padding: 2 }}>
                            {isMetadataFilled ? <CircleCheck className="h-4 w-4 text-green-500" /> : <AlertCircle className="w-5 h-5 text-yellow-600" />}
                        </div>
                        <div
                            style={{
                                backgroundColor: isAppSelected ? "#FFF" : "#ECE9DF",
                                padding: 5,
                                borderRadius: 3,
                                width: "auto",
                                border: "1px solid #ccc", // Changed border color to light
                                display: "flex",
                                alignItems: "center",
                                marginBottom: 5,
                                marginLeft: 5
                            }}>
                            <div style={{ marginRight: 5, marginLeft: 5 }}>
                                {data.icon}
                            </div>
                            <span className="" style={{ fontWeight: "bold", fontSize: 15 }}>{data.label}</span>
                        </div>
                    </div>
                )}
                <div className="font-medium w-full" style={{ display: 'flex', alignItems: 'center', alignContent: 'center', marginLeft: 5 }}>
                    <span style={{ color: "#88827e" }} className=""> {data.info}</span>

                </div>
            </button>
            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                isConnectable={true}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="b"
                isConnectable={true}
            />
        </>
    )
}

const EventNode = ({ data }: { data: NodeData }) => {
    return (
        <>

            <Handle
                type="target"
                position={Position.Bottom}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={true}
            />
            <button
                onClick={(event) => data.onClick(event, { id: "", type: "", data, position: { x: 0, y: 0 } })}
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
                    <span style={{ fontWeight: "bold", marginRight: 2 }}>{data.id}</span>
                    <span style={{ color: "#88827e" }}>{data.info}</span>
                </div>
            </button>
            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                isConnectable={true}
            />

        </>
    )
}

const AddNode = ({ data }: { data: NodeData }) => {
    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
                onConnect={(params) => console.log("handle onConnect", params)}
                isConnectable={true}
                style={{ border: "1px solid #6366f1", background: "#6366f1" }}
            />
            <div
                className="flex flex-col items-center justify-center"
                style={{
                    border: "1px solid grey",
                    borderRadius: "5px",
                    padding: "10px",
                }}
            >
                <div className="m-1 flex items-center justify-center w-6 h-6 text-indigo-600">
                    <Plus size={20} strokeWidth={2.5} />
                </div>
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                isConnectable={true}
                style={{ border: "1px solid #6366f1", background: "#6366f1" }}
            />
        </>
    )
}

const nodeTypes = {
    trigger: triggerNode,
    action: ActionNode,
    event: EventNode,
    add: AddNode, // Add new node type
}

const edgeTypes = {
    custom: CustomEdge, // Add custom edge type
}

function Flow() {
    const { token } = useAuth();
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null); // Add state for selected node id
    const router = useRouter(); // Initialize useRouter

    const handleNodeClick = (event: React.MouseEvent<HTMLButtonElement>, node: Node) => {
        if (node && node.data) {
            setSelectedNodeId(node.id); // Set selected node id
            if (node.type === "add") {
                addNewNode(node)
            }
            else if (node.data.triggerAppSet === false) {
                console.log("Node Clicked", node.data.triggerAppSet)
                setIsDrawerOpen(true)
            }
            else if (node.type === "action") {
                if (!node.data.ActionAppSet) {
                    setAvailableTriggers(availableTriggers)
                    setIsDrawerActionsOpen(true); // Open drawer when Action Node is clicked and actionApp is not set
                } else {
                    setSelectedForm(node.data.triggerId); // Set selected form type
                    setIsFormOpen(true); // Open form selector if actionApp is set
                    setFormContent(node.data.metadata); // Set form content from metadata
                }
            } else {
                setSelectedForm(node.data.triggerId) // Set selected form type
                setIsFormOpen(true)
                setFormContent(node.data.metadata); // Set form content from metadata
            }
        }
    }

    const addNewNode = (node: Node) => {
        const newNodeId = `${nodes.length + 1}`;
        const addNodeId = `add-${newNodeId}`;
        
        const newNode = {
            id: newNodeId,
            type: "action",
            data: {
                id: newNodeId,
                label: "Action",
                info: "Select the Action to Perform",
                onClick: handleNodeClick,
                icon: <Zap className="m-1" fill="#ECE9DF" size={15} />,
                triggerAppSet: true,
                ActionAppSet: false,
            },
            position: { x: node.position.x, y: node.position.y + 100 },
        };
    
        const newAddNode = {
            id: addNodeId,
            type: "add",
            data: {
                label: "Add Node",
                info: "Click to add a new node",
                onClick: handleNodeClick,
                icon: <Plus className="m-1" fill="#ECE9DF" size={15} />,
                triggerAppSet: false,
            },
            position: { x: newNode.position.x, y: newNode.position.y + 100 },
        };
    
        // Remove the old add node
        const updatedNodes = nodes.filter(n => n.id !== node.id);
        
        // Add the new action node and new add node
        setNodes([...updatedNodes, newNode, newAddNode]);
    
        // Update edges
        const sourceNodeId = edges.find(edge => edge.target === node.id)?.source;
        if (sourceNodeId) {
            setEdges([
                ...edges.filter(edge => edge.target !== node.id),
                { id: `e${sourceNodeId}-${newNodeId}`, source: sourceNodeId, target: newNodeId, type: 'custom' },
                { id: `e${newNodeId}-${addNodeId}`, source: newNodeId, target: addNodeId, type: 'custom' },
            ]);
        } else {
            setEdges([
                ...edges,
                { id: `e${newNodeId}-${addNodeId}`, source: newNodeId, target: addNodeId, type: 'custom' },
            ]);
        }
    }

    const [selectedApp, setSelectedApp] = useState<App | null>(null)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [formContent, setFormContent] = useState<NodeData | null>(null)
    const [selectedForm, setSelectedForm] = useState<string | null>(null) // Add state for selected form type
    const [edges, setEdges] = useState<{ id: string; source: string; target: string; type: string }[]>([
        { id: 'e1-add-1', source: '1', target: 'add-1', type: 'custom' }
    ]) // Initialize edges with an edge from node id 1 to node id 2
    interface App {
        id: string;
        name: string;
        image: string;
        category: string;
    }

    const [availableTriggers, setAvailableTriggers] = useState<App[]>([])
    const [availableActions, setAvailableActions] = useState<App[]>([])
    const handleAppSelect = (app: App) => {
        setSelectedApp(app)
        setNodes((nds) =>
            nds.map((node) =>
                node.id === selectedNodeId
                    ? {
                        ...node,
                        data: {
                            ...node.data,
                            label: app.category,
                            icon: <img src={app.image} alt={app.name} style={{ width: 20, height: 20 }} />,
                            info: app.name,
                            triggerId: app.id,
                            triggerAppSet: true,
                            ActionAppSet: true, // Ensure ActionAppSet is updated
                            formType: app.name, // Set form type dynamically
                            metadata: {}, // Initialize metadata
                        }
                    }
                    : node,
            ),
        )
        setIsDrawerOpen(false)
        setIsDrawerActionsOpen(false)
        console.log("App Selected:", app.name)
    }

    useEffect(() => {
        const fetchTriggers = async () => {
            try {
                const response = await axios.get(`${URL}/api/v1/trigger/available`)
                setAvailableTriggers(response.data.availableTriggers)
                console.log(response.data.availableTriggers)
            } catch (error) {
                console.error("Error fetching triggers:", error)
            }
        }
        const fetchActions = async () => {
            try {
                const response = await axios.get(`${URL}/api/v1/action/available`)
                console.log(response.data.availableActions)
                setAvailableActions(response.data.availableActions)
            } catch (error) {
                console.error("Error fetching triggers:", error)
            }
        }

        fetchTriggers()
        fetchActions()
    }, [])

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
                metadata: {}, // Initialize metadata
            }, // Replace emoji with symbol
            position: { x: 0, y: 0 },
        },
        {
            id: "add-1",
            type: "add",
            data: {
                label: "Add Node",
                info: "Click to add a new node",
                onClick: handleNodeClick,
                icon: <Plus className="m-1" fill="#ECE9DF" size={15} />,
                triggerAppSet: false,
            },
            position: { x: 0, y: 100 },
        },
    ])

    const containerRef = useRef(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isDrawerActionsOpen, setIsDrawerActionsOpen] = useState(false)
    const formRef = useRef(null)

    useEffect(() => {
        if (containerRef.current) {
            const { clientWidth, clientHeight } = containerRef.current
            setNodes((nds) =>
                nds.map((node) =>
                    node.id === "1"
                        ? {
                            ...node,
                            position: { x: clientWidth / 2 - 150, y: clientHeight / 2 - 100 }, // Adjust for node dimensions
                        }
                        : {
                            ...node,
                            position: { x: (clientWidth / 2) - 50, y: (clientHeight / 2 - 25) + 100 }, // Adjust for node dimensions
                        }
                ),
            )
        }
    }, [containerRef.current])

    const onNodesChange = (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds))

    const handleFormSubmit = (formData: any) => {
        console.log("Form Data:", formData)
        setNodes((nds) =>
            nds.map((node) =>
                node.id === selectedNodeId
                    ? {
                        ...node,
                        data: {
                            ...node.data,
                            metadata: formData, // Store form data as metadata
                        },
                    }
                    : node,
            ),
        )
        setIsFormOpen(false)
    }

    const handlePublish = async () => {
        console.log(nodes);
        const triggerNode = nodes.find(node => node.type === 'trigger');
        const actionNodes = nodes.filter(node => node.type === 'action');
        console.log(actionNodes)
        if (!triggerNode) {
            console.error("No trigger node found");
            return;
        }

        const payload = {
            availableTriggerId: triggerNode.data.triggerId,
            triggerMetadata: triggerNode.data.metadata,
            actions: actionNodes.map(node => ({
                availableActionId: node.data.triggerId,
                actionMetadata: node.data.metadata
            }))
        };

        try {
            console.log("Publishing data:", payload);

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${URL}/api/v1/zap`,
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                data: payload
            };

            const response = await axios.request(config)

            console.log("Publish response:", response.data);
            // router.push('/zaps'); // Redirect to success page
        } catch (error) {
            console.error("Error publishing data:", error);
        }
    };

    return (
        <div ref={containerRef} style={{ height: "100%", width: "100%" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges} // Add edges to ReactFlow
                onNodesChange={onNodesChange}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes} // Add edgeTypes to ReactFlow
                style={{ backgroundColor: "#f9f7f3" }}
                onNodeClick={handleNodeClick}
                attributionPosition="top-right"
                connectionMode={ConnectionMode.Loose}
            >
                <Background />
                <Controls />
            </ReactFlow>
            {isFormOpen && selectedForm && (
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
                        className="outer"
                    >
                        <div className="max-w-xl">
                            <FormSelector formType={selectedForm} onClose={() => setIsFormOpen(false)} handleSubmit={handleFormSubmit} />
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
                                <TabsTrigger value="zapier">Products</TabsTrigger>
                                <TabsTrigger value="tools">Built-in tools</TabsTrigger>
                                <TabsTrigger value="all">All</TabsTrigger>
                            </TabsList>
                            <TabsContent value="apps" className="mt-4">
                                <h3 className="mb-4 text-sm text-muted-foreground">Your top apps</h3>
                                <div className="grid gap-2">
                                    {availableTriggers.map((app) => (
                                        <Button
                                            key={app.id}
                                            variant="ghost"
                                            className="w-full justify-start"
                                            onClick={() => handleAppSelect(app)}
                                        >
                                            <span className="mr-2">
                                                <img src={app.image} alt={app.name} style={{ width: 20, height: 20 }} />
                                            </span>
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
            <Drawer open={isDrawerActionsOpen} onClose={() => setIsDrawerActionsOpen(false)}>
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
                                <TabsTrigger value="zapier">Products</TabsTrigger>
                                <TabsTrigger value="tools">Built-in tools</TabsTrigger>
                                <TabsTrigger value="all">All</TabsTrigger>
                            </TabsList>
                            <TabsContent value="apps" className="mt-4">
                                <h3 className="mb-4 text-sm text-muted-foreground">Your top apps</h3>
                                <div className="grid gap-2">
                                    {availableActions.map((app) => (
                                        <Button
                                            key={app.id}
                                            variant="ghost"
                                            className="w-full justify-start"
                                            onClick={() => handleAppSelect(app)}
                                        >
                                            <span className="mr-2">
                                                <img src={app.image} alt={app.name} style={{ width: 20, height: 20 }} />
                                            </span>
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
            <Button onClick={handlePublish} variant="primary" style={{ position: 'absolute', bottom: 20, right: 20 }}>
                Publish
            </Button>
        </div>
    )
}

export default Flow

