import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  ReactFlowProvider,
  useReactFlow,
  useKeyPress,
} from "react-flow-renderer";

import FloatingEdge from "components/react-flow/FloatingEdge.jsx";
import FloatingConnectionLine from "components/react-flow/FloatingConnectionLine.jsx";
import { createNodesAndEdges } from "components/react-flow/utils.js";

import Styles from "styles/ReactFlow.module.scss";
import DashboardLayout from "components/DashboardLayout";
import { Button, Input } from "antd";

// const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges();

// const edgeTypes = {
//   floating: FloatingEdge,
// };
const flowKey = "example-flow";

const getNodeId = () => `randomnode_${+new Date()}`;

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Car Family" },
    position: { x: 400, y: 15 },
    className: "light",
  },
  {
    id: "2",
    data: { label: "About Engine" },
    position: { x: 250, y: 180 },
    className: "light",
    style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 200, height: 400 },
  },
  {
    id: "2a",
    data: { label: "Engine Location" },
    position: { x: 20, y: 50 },
    parentNode: "2",
  },
  {
    id: "2b",
    data: { label: "Displacement" },
    position: { x: 20, y: 120 },
    parentNode: "2",
  },
  {
    id: "2c",
    data: { label: "Cylinders" },
    position: { x: 20, y: 190 },
    parentNode: "2",
  },
  {
    id: "2d",
    data: { label: "Valves per Cylinder" },
    position: { x: 20, y: 260 },
    parentNode: "2",
  },
  {
    id: "3",
    data: { label: "Car A" },
    position: { x: 500, y: 100 },
    className: "light",
  },
  {
    id: "4",
    data: { label: "About Fuel" },
    position: { x: 500, y: 180 },
    className: "light",
    style: {
      backgroundColor: "rgba(57, 84, 255, 0.2)",
      width: 300,
      height: 300,
    },
  },
  {
    id: "4a",
    data: { label: "Fuel Type" },
    position: { x: 15, y: 65 },
    className: "light",
    parentNode: "4",
    extent: "parent",
  },
  {
    id: "4b",
    data: { label: "Fuel System" },
    position: { x: 125, y: 125 },
    className: "light",
    parentNode: "4",
    extent: "parent",
  },
  {
    id: "4c",
    data: { label: "Fuel Tank Capacity" },
    position: { x: 75, y: 185 },
    className: "light",
    parentNode: "4",
    extent: "parent",
  },
];

const initialEdges = [
  { id: "e1-2", source: "3", target: "2", animated: true },
  { id: "e3-2a", source: "3", target: "2a" },
  { id: "e3-2b", source: "3", target: "2b" },
  { id: "e3-2c", source: "3", target: "2c" },
  { id: "e3-2d", source: "3", target: "2d" },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e3-4", source: "3", target: "4", animated: true },
  { id: "e3-4a", source: "3", target: "4a" },
  { id: "e3-4b", source: "3", target: "4b" },
  { id: "e3-4c", source: "3", target: "4c" },
];

const Develop = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: "Added node" },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const [nodeName, setNodeName] = useState("NodeName");
  const [nodeId, setNodeId] = useState("0");

  const onNodeClick = (e, object) => {
    setNodeId(object.id);
    setNodeName(" ");
  };

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            label: nodeName,
          };
        }

        return node;
      })
    );
  }, [nodeName, setNodes, nodeId]);
  const spacePressed = useKeyPress("Space");

  return (
    <DashboardLayout title="Plan Out your Car's Journey">
      <div className={Styles.floatingedges}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setRfInstance}
          panOnScroll={true}
          panOnDrag={spacePressed}
          onNodeClick={onNodeClick}
        >
          <div className={Styles.save__controls}>
            {/* <Button onClick={onSave}>save</Button>
            <Button onClick={onRestore}>restore</Button> */}
            <Button onClick={onAdd}>add node</Button>
          </div>
          <div className={Styles.updatenode__controls}>
            <label>Name your new Node:</label>
            <Input
              value={nodeName}
              onChange={(evt) => setNodeName(evt.target.value)}
            />
          </div>

          <Background />
        </ReactFlow>
      </div>
    </DashboardLayout>
  );
};

export default () => (
  <ReactFlowProvider>
    <Develop />
  </ReactFlowProvider>
);
