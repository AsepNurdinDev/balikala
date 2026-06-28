"use client";

import { motion } from "framer-motion";
import FortressNode from "./FortressNode";

interface FortressDiagramProps {
  activeNodeId: string;
  clickedNodes: string[];
  onNodeClick: (id: string) => void;
}

export default function FortressDiagram({
  activeNodeId,
  clickedNodes,
  onNodeClick,
}: FortressDiagramProps) {
  // Calculate dynamic glow size based on progress
  const clickCount = clickedNodes.length;
  const glowOpacity = clickCount * 0.25; // 0, 0.25, 0.5, 0.75, 1.0
  const shieldScale = 1 + clickCount * 0.03; // scale up slightly as understanding grows

  return (
    <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] mx-auto flex items-center justify-center select-none">
      {/* Background SVG Connective Lines & Arrows */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Glowing track circle */}
        <circle cx="200" cy="200" r="110" stroke="#C89B3C" strokeWidth="1" strokeDasharray="4 8" className="animate-spin-slow" />

        {/* Top to Center line/arrow */}
        <line x1="200" y1="50" x2="200" y2="120" stroke={clickedNodes.includes("kebijaksanaan") ? "#C89B3C" : "#E6E1DA"} strokeWidth="2" strokeDasharray="2 2" />
        <path d="M196 115 L200 125 L204 115" stroke={clickedNodes.includes("kebijaksanaan") ? "#C89B3C" : "#E6E1DA"} strokeWidth="2" fill="none" />

        {/* Right to Center line/arrow */}
        <line x1="350" y1="200" x2="280" y2="200" stroke={clickedNodes.includes("kejujuran") ? "#C89B3C" : "#E6E1DA"} strokeWidth="2" strokeDasharray="2 2" />
        <path d="M285 196 L275 200 L285 204" stroke={clickedNodes.includes("kejujuran") ? "#C89B3C" : "#E6E1DA"} strokeWidth="2" fill="none" />

        {/* Left to Center line/arrow */}
        <line x1="50" y1="200" x2="120" y2="200" stroke={clickedNodes.includes("disiplin") ? "#C89B3C" : "#E6E1DA"} strokeWidth="2" strokeDasharray="2 2" />
        <path d="M115 196 L125 200 L115 204" stroke={clickedNodes.includes("disiplin") ? "#C89B3C" : "#E6E1DA"} strokeWidth="2" fill="none" />

        {/* Bottom to Center line/arrow */}
        <line x1="200" y1="350" x2="200" y2="280" stroke={clickedNodes.includes("kesabaran") ? "#C89B3C" : "#E6E1DA"} strokeWidth="2" strokeDasharray="2 2" />
        <path d="M196 285 L200 275 L204 285" stroke={clickedNodes.includes("kesabaran") ? "#C89B3C" : "#E6E1DA"} strokeWidth="2" fill="none" />
      </svg>

      {/* Central Interactive Shield (Tameng) */}
      <motion.div
        animate={{ scale: shieldScale }}
        transition={{ type: "spring", stiffness: 100 }}
        className="relative w-36 h-36 md:w-48 md:h-48 rounded-full flex items-center justify-center z-10"
      >
        {/* Dynamic Glow Ring */}
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-secondary/40 to-primary/40 filter blur-xl transition-all duration-700"
          style={{ opacity: glowOpacity, transform: `scale(${1 + glowOpacity * 0.2})` }}
        />

        {/* SVG Shield Drawing */}
        <svg
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-24 h-24 md:w-32 md:h-32 drop-shadow-md z-10"
        >
          <defs>
            <linearGradient id="shieldFill" x1="80" y1="10" x2="80" y2="150">
              <stop offset="0%" stopColor="#FFF2D4" />
              <stop offset="50%" stopColor="#C89B3C" />
              <stop offset="100%" stopColor="#8B5E3C" />
            </linearGradient>
            <linearGradient id="shieldCore" x1="80" y1="10" x2="80" y2="150">
              <stop offset="0%" stopColor="#8B5E3C" />
              <stop offset="100%" stopColor="#5C3D2E" />
            </linearGradient>
          </defs>

          {/* Outer Shield Outline */}
          <path
            d="M30 40 C30 40 80 25 80 25 C80 25 130 40 130 40 C130 85 118 125 80 145 C42 125 30 85 30 40 Z"
            fill="url(#shieldFill)"
            stroke="#8B5E3C"
            strokeWidth="3.5"
          />

          {/* Inner Shield Layer */}
          <path
            d="M40 50 C40 50 80 37 80 37 C80 37 120 50 120 50 C120 88 110 122 80 137 C50 122 40 88 40 50 Z"
            fill="url(#shieldCore)"
            stroke="#C89B3C"
            strokeWidth="1.5"
            opacity="0.9"
          />

          {/* Traditional Carving Symbol inside Shield */}
          <circle cx="80" cy="88" r="16" fill="#FFF2D4" opacity="0.85" />
          <path d="M80 66 L80 110 M58 88 L102 88 M64 72 L96 104 M64 104 L96 72" stroke="#8B5E3C" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="80" cy="88" r="8" fill="#C89B3C" />
          <circle cx="80" cy="88" r="3" fill="#FFFDFC" />
        </svg>

        {/* Small percentage badge inside the shield */}
        <div className="absolute bottom-6 bg-white border border-stone-200 text-primary font-bold text-xxs md:text-xs px-2.5 py-0.5 rounded-full z-20 shadow-sm font-sans tracking-wide">
          {clickCount * 25}% Paham
        </div>
      </motion.div>

      {/* Nodes (Mapped around Center) */}
      <FortressNode
        id="kebijaksanaan"
        name="Kebijaksanaan"
        position="top"
        isActive={activeNodeId === "kebijaksanaan"}
        isClicked={clickedNodes.includes("kebijaksanaan")}
        onClick={() => onNodeClick("kebijaksanaan")}
      />
      <FortressNode
        id="kejujuran"
        name="Kejujuran"
        position="right"
        isActive={activeNodeId === "kejujuran"}
        isClicked={clickedNodes.includes("kejujuran")}
        onClick={() => onNodeClick("kejujuran")}
      />
      <FortressNode
        id="disiplin"
        name="Disiplin"
        position="left"
        isActive={activeNodeId === "disiplin"}
        isClicked={clickedNodes.includes("disiplin")}
        onClick={() => onNodeClick("disiplin")}
      />
      <FortressNode
        id="kesabaran"
        name="Kesabaran"
        position="bottom"
        isActive={activeNodeId === "kesabaran"}
        isClicked={clickedNodes.includes("kesabaran")}
        onClick={() => onNodeClick("kesabaran")}
      />
    </div>
  );
}
