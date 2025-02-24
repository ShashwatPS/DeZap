'use client';

import {
    ReactFlow, Controls, Background, applyNodeChanges,
    applyEdgeChanges, MarkerType, Handle, Position
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useState, useEffect, useRef } from 'react';
import { Zap } from 'lucide-react';
// Custom Node Component
const triggerNode = ({ data }) => {
    return (
        <div style={{ padding: 10, border: '2px dotted #000000', borderRadius: 5, background: '#fff' }}>
            <div style={{ backgroundColor: '#f0f0f0', padding: 5, borderRadius: 3, width: 'fit-content' }}>
                <Zap /> {data.label}
            </div>
            <div>
                <span style={{ fontWeight: 'bold' }}>1.</span> Select the Trigger you want
            </div>
        </div>
    );
};

const nodeTypes = {
    trigger: triggerNode,
};

function Flow() {
    const [nodes, setNodes] = useState([
        {
            id: '1',
            type: 'trigger', // Use custom node type
            data: { label: 'Trigger' }, // Replace emoji with symbol
            position: { x: 0, y: 0 },
        },
    ]);

    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            const { clientWidth, clientHeight } = containerRef.current;
            setNodes((nds) =>
                nds.map((node) => ({
                    ...node,
                    position: { x: clientWidth / 2 - 50, y: clientHeight / 2 - 25 }, // Adjust for node dimensions
                }))
            );
        }
    }, [containerRef.current]);

    const onNodesChange = (changes) => setNodes((nds) => applyNodeChanges(changes, nds));

    return (
        <div ref={containerRef} style={{ height: '100%', width: '100%' }}>
            <ReactFlow nodes={nodes} onNodesChange={onNodesChange} nodeTypes={nodeTypes}>
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default Flow;