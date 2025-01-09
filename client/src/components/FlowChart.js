import React, { useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";

const nodeTypes = ["Cold Email", "Wait/Delay", "Lead Source"];

const FlowChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [id, setId] = useState(1);
  const [selectedNodeType, setSelectedNodeType] = useState("");

  // Handle connection between nodes
  const onConnect = (params) => setEdges((els) => addEdge(params, els));

  // Add a new node
  const addNode = () => {
    if (!selectedNodeType) {
      alert("Please select a node type before adding!");
      return;
    }
    setNodes((prevNodes) => [
      ...prevNodes,
      {
        id: `node-${id}`,
        type: "default",
        data: { label: selectedNodeType },
        position: { x: Math.random() * 300, y: Math.random() * 300 },
      },
    ]);
    setId((prevId) => prevId + 1);
  };

  // Remove a node
  const removeNode = (nodeId) => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
    setEdges((prevEdges) =>
      prevEdges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
  };

  // Save the flowchart to localStorage
  const saveFlowchart = () => {
    const data = { nodes, edges, timestamp: new Date() };
    localStorage.setItem("flowchart", JSON.stringify(data));
    alert("Flowchart saved! Emails will be scheduled based on this data.");
  };

  // Render the flowchart and controls
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "90vh" }}>
      <div style={{ marginBottom: "10px" }}>
        <select
          value={selectedNodeType}
          onChange={(e) => setSelectedNodeType(e.target.value)}
        >
          <option value="">Select Node Type</option>
          {nodeTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button onClick={addNode} style={{ margin: "0 10px" }}>
          Add Node
        </button>
        <button onClick={saveFlowchart} style={{ margin: "0 10px" }}>
          Save Flowchart
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        style={{ flex: 1 }}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
      <div style={{ marginTop: "10px" }}>
        <h4>Node List</h4>
        {nodes.map((node) => (
          <div key={node.id}>
            <span>{node.data.label}</span>
            <button
              onClick={() => removeNode(node.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowChart;
