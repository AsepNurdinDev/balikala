"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FortressNodeData } from "../../types";
import { Sparkles, HelpCircle, CheckCircle2 } from "lucide-react";

interface FortressInfoProps {
  node: FortressNodeData | null;
}

export default function FortressInfo({ node }: FortressInfoProps) {
  return (
    <div className="bg-white rounded-3xl border border-stone-200/40 p-6 md:p-8 min-h-[350px] flex flex-col justify-center relative overflow-hidden shadow-medium">
      {/* Decorative background logo */}
      <div className="absolute -right-8 -bottom-8 text-stone-100 w-32 h-32 pointer-events-none" />

      <AnimatePresence mode="wait">
        {node ? (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Title / Heading */}
            <div>
              <div className="text-secondary text-xs font-bold tracking-widest uppercase mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Pilar Benteng Diri
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-primary">
                {node.title}
              </h3>
            </div>

            {/* Meaning Block */}
            <div className="space-y-2">
              <h4 className="text-stone-800 font-bold text-sm md:text-base flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                Makna Spiritual
              </h4>
              <p className="text-stone-600 text-sm md:text-base leading-relaxed pl-3.5">
                {node.meaning}
              </p>
            </div>

            {/* Application Block */}
            <div className="space-y-2">
              <h4 className="text-stone-800 font-bold text-sm md:text-base flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                Penerapan Sehari-hari
              </h4>
              <p className="text-stone-600 text-sm md:text-base leading-relaxed pl-3.5">
                {node.action}
              </p>
            </div>

            {/* Example Block */}
            <div className="bg-stone-50 border border-stone-200/50 rounded-2xl p-4 flex gap-3 items-start">
              <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-xs md:text-sm text-stone-700 mb-0.5">Contoh Konkret</h5>
                <p className="text-stone-500 text-xs md:text-sm leading-relaxed">
                  {node.example}
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center space-y-4 py-8"
          >
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 border border-stone-200/50">
              <HelpCircle className="w-8 h-8" />
            </div>
            <div className="max-w-xs space-y-1">
              <h4 className="font-bold text-stone-700 font-serif text-lg">Mulai Eksplorasi</h4>
              <p className="text-stone-500 text-sm leading-relaxed">
                Klik salah satu dari 4 pilar di sekeliling tameng untuk membuka makna filosofis Benteng Diri.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
