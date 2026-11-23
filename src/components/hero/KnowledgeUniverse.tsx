import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TechCategory } from '../../types';

interface KnowledgeUniverseProps {
  onSelectCategory?: (category: TechCategory) => void;
}

interface NodeData {
  id: string;
  name: TechCategory;
  shortLabel: string;
  iconText: string;
  angle: number; // in radians
  distance: number;
  speed: number;
  color: string;
  glowColor: string;
  snippet: string;
  metrics: string;
}

const NODES_CONFIG: NodeData[] = [
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    shortLabel: 'DSA',
    iconText: 'O(log N)',
    angle: 0.2,
    distance: 145,
    speed: 0.003,
    color: '#7C5CFC',
    glowColor: 'rgba(124, 92, 252, 0.4)',
    snippet: 'Trees, Graphs, DP',
    metrics: '42 Visual Guides',
  },
  {
    id: 'docker',
    name: 'Docker & DevOps',
    shortLabel: 'DevOps',
    iconText: 'cgroups',
    angle: 0.95,
    distance: 195,
    speed: 0.002,
    color: '#20D9E8',
    glowColor: 'rgba(32, 217, 232, 0.4)',
    snippet: 'OverlayFS & Pods',
    metrics: '31 Visual Guides',
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    shortLabel: 'AI / ML',
    iconText: 'Q·K^T',
    angle: 1.8,
    distance: 160,
    speed: 0.0028,
    color: '#B5F36A',
    glowColor: 'rgba(181, 243, 106, 0.4)',
    snippet: 'Attention & Tensors',
    metrics: '27 Visual Guides',
  },
  {
    id: 'sys',
    name: 'System Design',
    shortLabel: 'System Design',
    iconText: 'LB / API',
    angle: 2.6,
    distance: 215,
    speed: 0.0018,
    color: '#FF8C66',
    glowColor: 'rgba(255, 140, 102, 0.4)',
    snippet: 'Consensus & Scale',
    metrics: '38 Visual Guides',
  },
  {
    id: 'cloud',
    name: 'Cloud Computing',
    shortLabel: 'Cloud',
    iconText: 'VPC / S3',
    angle: 3.4,
    distance: 155,
    speed: 0.0032,
    color: '#20D9E8',
    glowColor: 'rgba(32, 217, 232, 0.4)',
    snippet: 'Serverless Runtimes',
    metrics: '21 Visual Guides',
  },
  {
    id: 'net',
    name: 'Computer Networks',
    shortLabel: 'Networks',
    iconText: 'SYN/ACK',
    angle: 4.2,
    distance: 200,
    speed: 0.0022,
    color: '#7C5CFC',
    glowColor: 'rgba(124, 92, 252, 0.4)',
    snippet: 'TCP, DNS & TLS 1.3',
    metrics: '29 Visual Guides',
  },
  {
    id: 'dbms',
    name: 'DBMS',
    shortLabel: 'Databases',
    iconText: 'B+ Tree',
    angle: 5.0,
    distance: 170,
    speed: 0.0026,
    color: '#FF8C66',
    glowColor: 'rgba(255, 140, 102, 0.4)',
    snippet: 'WAL Logs & MVCC',
    metrics: '26 Visual Guides',
  },
  {
    id: 'web',
    name: 'Web Development',
    shortLabel: 'Web Arch',
    iconText: 'DOM Tree',
    angle: 5.8,
    distance: 220,
    speed: 0.0019,
    color: '#B5F36A',
    glowColor: 'rgba(181, 243, 106, 0.4)',
    snippet: 'V8 Engine & Web APIs',
    metrics: '35 Visual Guides',
  },
];

export const KnowledgeUniverse: React.FC<KnowledgeUniverseProps> = ({ onSelectCategory }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);
  const [activeCoords, setActiveCoords] = useState<{ x: number; y: number } | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle subtle mouse parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (e.clientY - rect.top - rect.height / 2) / 25;
    setMousePos({ x, y });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 560);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 560);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle background
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.6 + 0.2,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
    }));

    // Local animated node angles
    const nodes = NODES_CONFIG.map((n) => ({ ...n }));

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      time += 0.01;

      // Draw faint background floating particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(163, 174, 194, ${p.alpha * 0.4})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Orbital Rings
      [145, 175, 205].forEach((radius, idx) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = idx === 1 ? 'rgba(32, 217, 232, 0.15)' : 'rgba(124, 92, 252, 0.12)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.restore();
      });

      // Central Nexus Core Ambient Glow
      const glowGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 80);
      glowGrad.addColorStop(0, 'rgba(124, 92, 252, 0.45)');
      glowGrad.addColorStop(0.5, 'rgba(32, 217, 232, 0.15)');
      glowGrad.addColorStop(1, 'rgba(11, 16, 32, 0)');

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
      ctx.fill();

      // Update & draw each orbiting knowledge satellite node
      nodes.forEach((node) => {
        node.angle += node.speed;
        const x = centerX + Math.cos(node.angle) * node.distance;
        const y = centerY + Math.sin(node.angle) * node.distance * 0.85; // Slight isometric perspective

        const isHovered = hoveredNode?.id === node.id;

        // Draw dynamic connection beam from center core to node
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = isHovered ? node.color : 'rgba(42, 51, 72, 0.35)';
        ctx.lineWidth = isHovered ? 1.8 : 0.8;
        if (isHovered) {
          ctx.setLineDash([3, 3]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.stroke();

        // Node Glow Halo
        if (isHovered) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y, 24, 0, Math.PI * 2);
          ctx.fillStyle = node.glowColor;
          ctx.fill();
          ctx.restore();
        }

        // Outer Node Circle
        ctx.beginPath();
        ctx.arc(x, y, isHovered ? 16 : 12, 0, Math.PI * 2);
        ctx.fillStyle = '#171D32';
        ctx.strokeStyle = isHovered ? '#F8FAFC' : node.color;
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();

        // Center Node Dot
        ctx.beginPath();
        ctx.arc(x, y, isHovered ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Node label
        ctx.font = '500 10px "JetBrains Mono", monospace';
        ctx.fillStyle = isHovered ? '#F8FAFC' : '#A3AEC2';
        ctx.textAlign = 'center';
        ctx.fillText(node.shortLabel, x, y + 26);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [hoveredNode]);

  // Click & hover hit-test on canvas
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    NODES_CONFIG.forEach((node) => {
      // Find current position approximate
      const x = centerX + Math.cos(node.angle) * node.distance;
      const y = centerY + Math.sin(node.angle) * node.distance * 0.85;
      const dist = Math.hypot(mouseX - x, mouseY - y);
      if (dist < 30) {
        onSelectCategory?.(node.name);
      }
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full aspect-square max-w-[540px] mx-auto flex items-center justify-center select-none"
    >
      {/* Background ambient lighting */}
      <div 
        className="absolute inset-0 bg-hero-glow rounded-full blur-3xl pointer-events-none -z-10 transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px)`,
        }}
      />

      {/* HTML / Canvas interactive rendering */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full h-full cursor-pointer z-10"
      />

      {/* Central High-Tech Nexus Core (SVG Layer with animated central geometry) */}
      <div 
        className="absolute pointer-events-none z-20 flex flex-col items-center justify-center"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          transition: 'transform 0.15s ease-out'
        }}
      >
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Animated concentric rings */}
          <div className="absolute inset-0 rounded-full border border-brand/40 animate-spin-slow" />
          <div className="absolute inset-2 rounded-full border border-dashed border-cyan-electric/40 animate-orbit-2" />
          <div className="absolute inset-4 rounded-full border border-accent-lime/20 animate-spin-slow" />

          {/* Central Core Sphere */}
          <div className="w-16 h-16 rounded-2xl bg-surface-card border-2 border-brand shadow-glow-brand flex items-center justify-center rotate-45 group">
            <div className="-rotate-45 flex flex-col items-center justify-center">
              <span className="font-heading font-black text-xs tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-content-primary via-cyan-electric to-brand">
                NEXUS
              </span>
              <span className="font-mono text-[8px] text-content-secondary mt-0.5">
                v2.4 CORE
              </span>
            </div>
          </div>
        </div>

        {/* Core Status Pill */}
        <div className="mt-2 px-2.5 py-1 rounded-full bg-surface-card/90 border border-border text-[10px] font-mono text-cyan-electric flex items-center gap-1.5 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-electric animate-ping" />
          <span>INTERCONNECTED KNOWLEDGE</span>
        </div>
      </div>

      {/* Interactive Node Spotlight Tooltip */}
      <AnimatePresence>
        {hoveredNode && activeCoords && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            className="absolute z-30 pointer-events-none p-3.5 rounded-xl bg-surface-elevated/95 border border-brand/40 shadow-card-elevated backdrop-blur-md max-w-[220px]"
            style={{
              left: `${activeCoords.x}px`,
              top: `${activeCoords.y - 70}px`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: hoveredNode.color }} 
              />
              <span className="font-heading font-bold text-xs text-content-primary">
                {hoveredNode.name}
              </span>
            </div>
            <p className="font-sans text-[11px] text-content-secondary mb-2">
              {hoveredNode.snippet}
            </p>
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-cyan-electric">{hoveredNode.metrics}</span>
              <span className="text-accent-lime font-bold">Explore →</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Node Pills around perimeter for easy tap/click on Mobile/Desktop */}
      <div className="absolute inset-0 pointer-events-none z-20 hidden md:block">
        {NODES_CONFIG.map((node, i) => {
          // Positions calculated for button triggers
          const angle = (i * (2 * Math.PI)) / NODES_CONFIG.length;
          const leftPercent = 50 + Math.cos(angle) * 42;
          const topPercent = 50 + Math.sin(angle) * 38;

          return (
            <button
              key={node.id}
              onClick={() => onSelectCategory?.(node.name)}
              onMouseEnter={() => {
                setHoveredNode(node);
                setActiveCoords({
                  x: (leftPercent / 100) * 540,
                  y: (topPercent / 100) * 540,
                });
              }}
              onMouseLeave={() => setHoveredNode(null)}
              className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-surface-card/80 hover:bg-surface-elevated border border-border hover:border-brand text-[10px] font-mono text-content-secondary hover:text-content-primary transition-all duration-200 hover:scale-110 flex items-center gap-1.5 shadow-sm group"
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
              }}
            >
              <span 
                className="w-1.5 h-1.5 rounded-full transition-transform group-hover:scale-125" 
                style={{ backgroundColor: node.color }} 
              />
              <span>{node.shortLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
