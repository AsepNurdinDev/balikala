"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SymbolData } from "../../types";
import { Flower, Flame, Sparkles, Droplets, Leaf } from "lucide-react";

interface SymbolCardProps {
  symbol: SymbolData;
}

export default function SymbolCard({ symbol }: SymbolCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Icon mapping helper
  const getIcon = (id: string) => {
    switch (id) {
      case "canang":
        return <Flower className="w-10 h-10 text-secondary" />;
      case "dupa":
        return <Flame className="w-10 h-10 text-primary" />;
      case "banten":
        return <Sparkles className="w-10 h-10 text-secondary" />;
      case "tirta":
        return <Droplets className="w-10 h-10 text-primary" />;
      case "bunga":
        return <Leaf className="w-10 h-10 text-secondary" />;
      default:
        return <Sparkles className="w-10 h-10 text-primary" />;
    }
  };

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="w-full h-64 md:h-72 cursor-pointer group"
      style={{ perspective: "1200px" }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-out"
        style={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 w-full h-full bg-white border border-stone-200/40 rounded-3xl p-6 flex flex-col justify-between items-center text-center shadow-soft hover:shadow-medium transition-shadow backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Top aesthetic element */}
          <div className="w-full flex justify-end">
            <span className="text-stone-300 font-serif text-sm">#MaknaSimbol</span>
          </div>

          {/* Core Icon & Title */}
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-16 h-16 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-sm">
              {getIcon(symbol.id)}
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-800">
              {symbol.name}
            </h3>
          </div>

          {/* Footer instruction */}
          <span className="text-xxs font-bold uppercase tracking-wider text-stone-400 group-hover:text-primary transition">
            Klik untuk balik &gt;
          </span>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary to-[#5C3D2E] rounded-3xl p-6 flex flex-col justify-between items-center text-center text-white shadow-medium backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Top label */}
          <div className="w-full flex justify-start">
            <span className="text-secondary/70 font-semibold text-xxs tracking-wider uppercase">Makna Filosofis</span>
          </div>

          {/* Meaning Content */}
          <div className="flex flex-col justify-center items-center py-4 px-2 my-auto">
            <p className="text-xs md:text-sm leading-relaxed font-medium font-sans">
              {symbol.meaning}
            </p>
          </div>

          {/* Back click to return */}
          <span className="text-xxs font-bold uppercase tracking-wider text-secondary/80 hover:text-white transition">
            &lt; Klik untuk kembali
          </span>
        </div>
      </div>
    </div>
  );
}
