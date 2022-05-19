import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  ReactFlowProvider,
  useReactFlow,
} from "react-flow-renderer";

import FloatingEdge from "components/react-flow/FloatingEdge.jsx";
import FloatingConnectionLine from "components/react-flow/FloatingConnectionLine.jsx";
import { createNodesAndEdges } from "components/react-flow/utils.js";

import Styles from "styles/components/react-flow/ReactFlow.module.css";
import DashboardLayout from "components/DashboardLayout";

const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges();

const edgeTypes = {
  floating: FloatingEdge,
};
const flowKey = "example-flow";

const getNodeId = () => `randomnode_${+new Date()}`;

const Develop = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();

  const onConnect = (params) =>
    setEdges((eds) =>
      addEdge(
        { ...params, type: "floating", markerEnd: { type: MarkerType.Arrow } },
        eds
      )
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

  return (
    <DashboardLayout title="Plan Out your Car">
      <div className={Styles.floatingedges}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          edgeTypes={edgeTypes}
          connectionLineComponent={FloatingConnectionLine}
        >
          <Background />
          <div className="save__controls">
            <button onClick={onSave}>save</button>
            <button onClick={onRestore}>restore</button>
            <button onClick={onAdd}>add node</button>
          </div>
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
