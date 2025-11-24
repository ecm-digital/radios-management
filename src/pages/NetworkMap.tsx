import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Network } from 'vis-network/standalone';
import type { Data, Options } from 'vis-network/standalone';
import 'vis-network/styles/vis-network.css';

const nodes = [
  { id: 'router', label: 'Main Router', color: { background: '#1089ff', border: '#1d4ed8', highlight: { background: '#60a5fa', border: '#1d4ed8' } }, font: { color: 'white' }, shape: 'box' },
  { id: 'switch-1', label: 'Core Switch', shape: 'box' },
  { id: 'ap-1', label: 'AP-Floor1-East', shape: 'ellipse' },
  { id: 'ap-2', label: 'AP-Floor1-West', shape: 'ellipse' },
  { id: 'ap-3', label: 'AP-Floor2-Center', shape: 'ellipse' },
];

const edges = [
  { from: 'router', to: 'switch-1', arrows: 'to', color: { color: '#1089ff', highlight: '#60a5fa' } },
  { from: 'switch-1', to: 'ap-1', arrows: 'to' },
  { from: 'switch-1', to: 'ap-2', arrows: 'to' },
  { from: 'switch-1', to: 'ap-3', arrows: 'to' },
];

const data: Data = {
  nodes: nodes,
  edges: edges,
};

const options: Options = {
  layout: {
    hierarchical: false,
  },
  edges: {
    color: '#a1a1aa',
    smooth: { 
      enabled: true,
      type: 'dynamic', 
      roundness: 0.5 
    },
  },
  nodes: {
    shape: 'dot',
    size: 20,
    font: { size: 14, color: '#09090b' }, // zinc-950
    borderWidth: 2,
    color: {
      border: '#a1a1aa', // zinc-400
      background: '#e4e4e7', // zinc-200
      highlight: {
        border: '#1089ff',
        background: '#dbeafe',
      },
    },
  },
  physics: {
    enabled: true,
    barnesHut: {
      gravitationalConstant: -3000,
      centralGravity: 0.25,
      springLength: 120,
      springConstant: 0.05,
      damping: 0.1,
      avoidOverlap: 0.15,
    },
    solver: 'barnesHut',
  },
  interaction: {
    dragNodes: true,
    dragView: true,
    zoomView: true,
  },
};

export default function NetworkMap() {
  const visJsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visJsRef.current) {
      const network = new Network(visJsRef.current, data, options);
      // You can add event listeners to the network instance here if needed
      // e.g., network.on('click', (params) => { ... });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Network Map - Radiance Network Management</title>
      </Helmet>
      <div className="space-y-6 h-full flex flex-col">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Network Map</h1>
          <p className="text-muted-foreground">
            Dynamic, physics-based visualization of your network devices.
          </p>
        </div>
        <div ref={visJsRef} className="glass-card h-[600px] overflow-hidden" />
      </div>
    </>
  );
}