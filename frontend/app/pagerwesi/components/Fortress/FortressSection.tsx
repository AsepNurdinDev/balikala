"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FortressDiagram from "./FortressDiagram";
import FortressInfo from "./FortressInfo";
import FortressProgress from "./FortressProgress";
import { fortressNodes } from "../../data";

export default function FortressSection() {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [clickedNodes, setClickedNodes] = useState<string[]>([]);

  const handleNodeClick = (id: string) => {
    setActiveNodeId(id);
    if (!clickedNodes.includes(id)) {
      setClickedNodes((prev) => [...prev, id]);
    }
  };

  const activeNode = fortressNodes.find((node) => node.id === activeNodeId) || null;

  return (
    <section
      id="fortress-section"
      className="py-24 bg-[#F8F5F0] relative overflow-hidden px-6 lg:px-8 scroll-mt-12"
    >
      {/* Decorative vectors */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary text-xs md:text-sm font-bold tracking-widest uppercase"
          >
            Interaktif
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary"
          >
            Membangun Benteng Diri
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-500 text-sm md:text-base leading-relaxed"
          >
            Di sekeliling Tameng Jiwa terdapat 4 pilar dharma yang memperkuat eksistensi spiritual Anda. Klik setiap pilar untuk memahami cara menerapkannya dalam keseharian.
          </motion.p>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left / Top: Interactive Diagram */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <FortressDiagram
              activeNodeId={activeNodeId || ""}
              clickedNodes={clickedNodes}
              onNodeClick={handleNodeClick}
            />
          </div>

          {/* Right / Bottom: Content details & progress */}
          <div className="lg:col-span-6 space-y-8 flex flex-col justify-between">
            <FortressInfo node={activeNode} />
            <FortressProgress clickedCount={clickedNodes.length} />
          </div>
        </div>
      </div>
    </section>
  );
}
