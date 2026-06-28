"use client";

import { useState } from "react";
import { KUNINGAN_SYMBOLS, KuninganSymbol } from "../../data/kuningan";
import { motion } from "framer-motion";
import { HelpCircle, RefreshCw } from "lucide-react";

export default function Kuningan() {
  // Store flipped state per card ID
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Helper to render customized inline SVG illustrations for each symbol card front
  const renderSymbolIllustration = (id: string) => {
    switch (id) {
      case "tamiang":
        return (
          <svg viewBox="0 0 100 100" className="w-20 h-20 stroke-[#C89B3C] fill-none stroke-[1.5]" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="36" />
            <circle cx="50" cy="50" r="28" strokeDasharray="4 4" />
            <circle cx="50" cy="50" r="18" />
            <line x1="50" y1="8" x2="50" y2="92" strokeWidth="1" />
            <line x1="8" y1="50" x2="92" y2="50" strokeWidth="1" />
            <line x1="20" y1="20" x2="80" y2="80" strokeWidth="0.8" />
            <line x1="20" y1="80" x2="80" y2="20" strokeWidth="0.8" />
          </svg>
        );
      case "endongan":
        return (
          <svg viewBox="0 0 100 100" className="w-20 h-20 stroke-[#8B5E3C] fill-none stroke-[1.5]" xmlns="http://www.w3.org/2000/svg">
            {/* Bag Body */}
            <path d="M25 45 C25 35 30 30 50 30 C70 30 75 35 75 45 L70 85 C70 90 65 92 50 92 C35 92 30 90 30 85 Z" fill="#8B5E3C" fillOpacity="0.08" />
            {/* Handle/Strap */}
            <path d="M50 30 C50 12 35 8 35 8 C35 8 22 10 25 35" />
            <path d="M50 30 C50 12 65 8 65 8 C65 8 78 10 75 35" />
            {/* Pattern/Line accents */}
            <line x1="30" y1="50" x2="70" y2="50" />
            <line x1="32" y1="65" x2="68" y2="65" />
            <line x1="34" y1="80" x2="66" y2="80" />
          </svg>
        );
      case "kolem":
        return (
          <svg viewBox="0 0 100 100" className="w-20 h-20 stroke-[#C89B3C] fill-none stroke-[1.5]" xmlns="http://www.w3.org/2000/svg">
            {/* Bed/Grid cushion shape */}
            <rect x="20" y="32" width="60" height="42" rx="4" fill="#C89B3C" fillOpacity="0.06" />
            <line x1="20" y1="46" x2="80" y2="46" />
            <line x1="20" y1="60" x2="80" y2="60" />
            <line x1="35" y1="32" x2="35" y2="74" />
            <line x1="50" y1="32" x2="50" y2="74" />
            <line x1="65" y1="32" x2="65" y2="74" />
            {/* Tassel accents */}
            <circle cx="20" cy="53" r="2" fill="#8B5E3C" />
            <circle cx="80" cy="53" r="2" fill="#8B5E3C" />
          </svg>
        );
      case "nasi_kuning":
        return (
          <svg viewBox="0 0 100 100" className="w-20 h-20 stroke-[#C89B3C] fill-none stroke-[1.5]" xmlns="http://www.w3.org/2000/svg">
            {/* Selanggi Base */}
            <path d="M 22 70 Q 50 82 78 70 L 84 55 Q 50 62 16 55 Z" fill="#C89B3C" fillOpacity="0.12" />
            {/* Rice Mound */}
            <path d="M 25 56 Q 50 20 75 56 Z" fill="#FFD700" fillOpacity="0.25" stroke="#C89B3C" strokeWidth="2" />
            <circle cx="50" cy="38" r="2" fill="#8B5E3C" />
          </svg>
        );
      case "gebogan":
      default:
        return (
          <svg viewBox="0 0 100 100" className="w-20 h-20 stroke-[#8B5E3C] fill-none stroke-[1.5]" xmlns="http://www.w3.org/2000/svg">
            {/* Fruit stack triangles */}
            <path d="M35 70 L65 70 L50 15 Z" fill="#8B5E3C" fillOpacity="0.06" />
            <line x1="42" y1="52" x2="58" y2="52" />
            <line x1="46" y1="34" x2="54" y2="34" />
            {/* Dulang plate base */}
            <path d="M22 75 L78 75 Q 82 86 50 86 Q 18 86 22 75 Z" fill="#8B5E3C" fillOpacity="0.12" />
            <line x1="15" y1="75" x2="85" y2="75" strokeWidth="2.5" />
            {/* Small fruits */}
            <circle cx="42" cy="62" r="3.5" fill="#C89B3C" />
            <circle cx="50" cy="62" r="3.5" fill="#8B5E3C" />
            <circle cx="58" cy="62" r="3.5" fill="#C89B3C" />
            <circle cx="50" cy="44" r="3.5" fill="#8B5E3C" />
          </svg>
        );
    }
  };

  return (
    <section
      id="kuningan-section"
      className="py-20 bg-[#FFFFFF] border-b border-stone-200/50"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center lg:text-left max-w-2xl mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#C89B3C] bg-[#C89B3C]/10">
            Fase Rangkaian 4
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-serif font-extrabold text-[#2D2D2D] tracking-tight">
            Hari Raya Kuningan & Simbolisme
          </h2>
          <p className="mt-3 text-stone-500 text-sm md:text-base leading-relaxed">
            Pada puncak Kuningan, suasana spiritual menjadi lebih bersinar terang. 
            Klik kartu simbol suci di bawah untuk membaliknya dan menyingkap nilai filosofi tersembunyi.
          </p>
        </div>

        {/* 3D Flip Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {KUNINGAN_SYMBOLS.map((symbol) => {
            const isFlipped = !!flippedCards[symbol.id];

            return (
              <div
                key={symbol.id}
                onClick={() => toggleFlip(symbol.id)}
                className="w-full min-h-[420px] cursor-pointer group"
                style={{ perspective: "1000px" }}
              >
                {/* Inner card with 3D transition */}
                <div
                  className="relative w-full h-full min-h-[420px] transition-transform duration-700 ease-in-out"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "none"
                  }}
                >
                  
                  {/* FRONT SIDE */}
                  <div
                    className="absolute inset-0 bg-[#FBF9F6] border border-stone-200/60 rounded-3xl p-5 flex flex-col justify-between items-center text-center shadow-soft hover:shadow-medium hover:border-[#C89B3C]/30 hover:-translate-y-1 transition-all duration-300 z-10 overflow-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {/* Badge */}
                    <span className="text-[9px] uppercase font-extrabold tracking-widest text-[#8B5E3C] bg-[#8B5E3C]/5 border border-stone-200 px-2.5 py-1 rounded-full">
                      Kuningan
                    </span>

                    {/* Vector illustration */}
                    <div className="my-4 text-stone-400 group-hover:scale-105 group-hover:text-[#C89B3C] transition-all duration-500">
                      {renderSymbolIllustration(symbol.id)}
                    </div>

                    {/* Title & Prompt */}
                    <div className="space-y-2">
                      <h3 className="text-base font-black text-stone-850 tracking-tight">
                        {symbol.name}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-[10px] text-stone-400 font-bold uppercase tracking-wider group-hover:text-[#8B5E3C] transition-colors mt-2">
                        <RefreshCw size={10} className="animate-spin-slow" />
                        Detail Makna
                      </span>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div
                    className="absolute inset-0 bg-white border border-[#C89B3C]/40 rounded-3xl p-5 flex flex-col gap-3 shadow-medium overflow-y-auto"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)"
                    }}
                  >
                    {/* Back Header */}
                    <div className="flex justify-between items-start shrink-0">
                      <span className="text-[8px] font-bold uppercase tracking-widest text-[#C89B3C] bg-[#C89B3C]/10 border border-[#C89B3C]/20 px-2 py-0.5 rounded-full">
                        Filosofi
                      </span>
                      <HelpCircle size={14} className="text-[#C89B3C] shrink-0" />
                    </div>

                    <h3 className="text-sm font-serif font-black text-stone-850 border-b border-stone-100 pb-2 shrink-0">
                      {symbol.name}
                    </h3>

                    <p className="text-[9px] text-[#8B5E3C] font-bold uppercase tracking-wide shrink-0">
                      {symbol.meaning}
                    </p>

                    <p className="text-[10px] text-stone-500 leading-relaxed text-justify flex-grow">
                      {symbol.description}
                    </p>

                    {/* Back Footer/Callout */}
                    <div className="bg-[#F8F5F0] p-2.5 rounded-xl border border-stone-200/50 shrink-0 mt-auto">
                      <p className="text-[9px] text-stone-600 leading-normal italic text-center">
                        &ldquo;{symbol.philosophy}&rdquo;
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
