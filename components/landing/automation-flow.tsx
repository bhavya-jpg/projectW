'use client';

import React, { useEffect, useState } from 'react';
import {
  ReactFlow,
  Controls,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  BaseEdge,
  EdgeProps,
  getBezierPath
} from '@xyflow/react';
import dagre from '@dagrejs/dagre';
import '@xyflow/react/dist/style.css';
import {
  MessageCircle,
  Database,
  Sparkles,
  Tag,
  HelpCircle,
  Package,
  Reply,
  Headset,
  CalendarCheck,
  Check,
  PlayCircle,
  Clock,
  Send,
  CircleDot
} from 'lucide-react';
import { Reveal } from './reveal';

// --- Helpers ---
const hashCode = (s: string) => s.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
const randomOffset = (id: string, maxOffset: number) => {
  const hash = Math.abs(hashCode(id));
  const pseudoRandom = (hash % 100) / 100; // 0.0 to 0.99
  return (pseudoRandom * maxOffset * 2) - maxOffset;
};

// --- Custom Node Component ---
const CustomNode = ({ data, targetPosition, sourcePosition }: any) => {
  const Icon = data.icon;
  const status = data.status || 'pending'; // 'completed', 'running', 'pending'
  
  const statusStyles: Record<string, string> = {
    completed: 'border-emerald-500 dark:border-emerald-500/50',
    running: 'border-blue-500 dark:border-blue-500/50',
    pending: 'border-border dark:border-zinc-800',
  };

  const statusBadge: Record<string, {text: string, icon: any, className: string} | null> = {
    completed: { 
      text: 'Completed', 
      icon: Check, 
      className: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' 
    },
    running: { 
      text: 'Running', 
      icon: CircleDot, 
      className: 'text-zinc-600 bg-white dark:bg-zinc-800 dark:text-zinc-300 border-border dark:border-zinc-700 shadow-sm' 
    },
    pending: null,
  };
  
  const iconBg: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
    yellow: 'bg-amber-50 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400',
    green: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
    rose: 'bg-rose-50 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400',
    sky: 'bg-sky-50 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400',
    orange: 'bg-orange-50 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400',
  };

  const selectedIconBg = iconBg[data.iconColor] || iconBg.blue;

  return (
    <div className="relative pt-[20px] w-[280px] group">
      <Handle 
        type="target" 
        position={targetPosition} 
        className="!w-2 !h-2 !bg-muted-foreground/30 !border-0 opacity-0" 
      />
      
      {/* Floating Top Label (Krea Style) */}
      <div className="absolute top-0 left-4 z-10 pointer-events-none">
        <span className="text-[10px] tracking-widest font-semibold text-muted-foreground uppercase">{data.stepType}</span>
      </div>

      {/* Main Node Card */}
      <div className="bg-card dark:bg-[#111111] border border-black/5 dark:border-white/5 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-black/10 dark:hover:border-white/10">
        <div className="p-5 flex flex-col gap-4">
          
          {/* Top Row: Icon, Title, Category */}
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-inner ${selectedIconBg}`}>
              <Icon className="w-4 h-4" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="font-medium text-[14px] text-foreground dark:text-zinc-200 truncate tracking-wide">
                {data.label}
              </div>
            </div>
            
            {data.category && (
              <div className="bg-muted/50 dark:bg-white/5 text-muted-foreground dark:text-zinc-400 text-[10px] font-medium px-2 py-1 rounded-md shrink-0 border border-black/5 dark:border-white/5">
                {data.category}
              </div>
            )}
          </div>
          
          {/* Subtext */}
          <div className="text-[13px] text-muted-foreground dark:text-zinc-500 leading-snug">
            {data.subtext}
          </div>
          
        </div>
      </div>

      <Handle 
        type="source" 
        position={sourcePosition} 
        className="!w-2 !h-2 !bg-muted-foreground/30 !border-0 opacity-0" 
      />
    </div>
  );
};

// --- Clean Curved Edge ---
const CleanEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  id,
}: EdgeProps) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const delayId = parseInt(id.replace(/\D/g, '')) || 0;
  const delay = (delayId % 5) * 0.4;

  return (
    <>
      <BaseEdge path={edgePath} style={{ strokeWidth: 1.5, stroke: '#10b981', opacity: 0.6 }} className="dark:opacity-80" />
      
      <path id={`path-${id}`} d={edgePath} fill="none" stroke="none" />
      
      <circle r="3" fill="#10b981" className="drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]">
        <animateMotion
          dur="2s"
          repeatCount="indefinite"
          begin={`${delay}s`}
          calcMode="linear"
        >
          <mpath href={`#path-${id}`} />
        </animateMotion>
      </circle>
    </>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  clean: CleanEdge,
};

// --- Node Data Setup ---
const initialNodes = [
  { id: '1', data: { label: 'When Deal updated', subtext: 'Trigger when Deal stage updated.', icon: Tag, iconColor: 'blue', category: 'Deals', stepType: 'Trigger', status: 'completed' }, type: 'custom', draggable: true, position: { x: 0, y: 0 } },
  { id: '2', data: { label: 'CRM Contact Lookup', subtext: 'Search CRM for matching record.', icon: Database, iconColor: 'sky', category: 'HubSpot', stepType: 'Action', status: 'completed' }, type: 'custom', draggable: true, position: { x: 0, y: 0 } },
  { id: '3', data: { label: 'AI Intent Detection', subtext: 'Analyze intent of the recent interaction.', icon: Sparkles, iconColor: 'purple', category: 'AI', stepType: 'Action', status: 'completed' }, type: 'custom', draggable: true, position: { x: 0, y: 0 } },
  { id: '4', data: { label: 'Delay', subtext: 'Wait for 5 seconds.', icon: Clock, iconColor: 'yellow', category: 'Delays', stepType: 'Action', status: 'completed' }, type: 'custom', draggable: true, position: { x: 0, y: 0 } },
  { id: '5', data: { label: 'Enroll in sequence', subtext: 'Enroll person in "Upsell" sequence.', icon: Send, iconColor: 'blue', category: 'Sequences', stepType: 'Action', status: 'running' }, type: 'custom', draggable: true, position: { x: 0, y: 0 } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'clean' },
  { id: 'e2-3', source: '2', target: '3', type: 'clean' },
  { id: 'e3-4', source: '3', target: '4', type: 'clean' },
  { id: 'e4-5', source: '4', target: '5', type: 'clean' },
];

const getLayoutedElements = (nodes: any[], edges: any[], direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const isHorizontal = direction === 'LR';
  
  // Clean, rigid spacing for the minimal structured look
  dagreGraph.setGraph({ 
    rankdir: direction,
    nodesep: direction === 'LR' ? 40 : 40,
    ranksep: direction === 'LR' ? 120 : 80,
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 280, height: 120 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    
    // Asymmetrical staggering
    const offsetX = randomOffset(node.id + 'x', 30); 
    const offsetY = randomOffset(node.id + 'y', 50);
    
    return {
      ...node,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      position: {
        x: nodeWithPosition.x - 280 / 2 + (isHorizontal ? 0 : offsetX),
        y: nodeWithPosition.y - 120 / 2 + (isHorizontal ? offsetY : 0),
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

export function AutomationFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Use vertical flow (TB) for mobile AND tablet to prevent horizontal squishing.
      // Use horizontal flow (LR) only for desktop and above.
      const direction = width < 1024 ? 'TB' : 'LR';
      
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        initialNodes,
        initialEdges,
        direction
      );
      
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
      setIsLayoutReady(true);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setNodes, setEdges]);

  return (
    <section className="py-10 sm:py-20 md:py-24 w-full relative z-10">
      <div className="absolute inset-0 z-[-1] bg-[#fafafa] dark:bg-black" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-4">
              How We Build
            </span>
          </Reveal>
          <Reveal>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">
              See automation in action
            </h2>
          </Reveal>
          <Reveal>
            <p className="max-w-2xl text-lg text-muted-foreground">
              A real example of how we automate WhatsApp lead response for our clients — drag the nodes around and see how it connects.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="h-[450px] sm:h-[500px] lg:h-[600px] w-full">
          {isLayoutReady && (
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              nodesDraggable={true}
              nodesConnectable={false}
              elementsSelectable={true}
              zoomOnScroll={false}
              panOnScroll={false}
              preventScrolling={false}
              zoomOnPinch={true}
              panOnDrag={true}
              minZoom={0.1}
              maxZoom={1.5}
              fitView
              fitViewOptions={{ padding: 0.1, minZoom: 0.1, maxZoom: 1 }}
              proOptions={{ hideAttribution: true }} 
              className="react-flow-custom-theme"
            >
              <Controls 
                className="!bg-background !border-border !shadow-lg [&>button]:!border-border [&>button]:!text-foreground [&>button:hover]:!bg-muted !rounded-xl overflow-hidden mb-4 ml-4" 
                showInteractive={false} 
              />
            </ReactFlow>
          )}
        </div>
      </div>
    </section>
  );
}
