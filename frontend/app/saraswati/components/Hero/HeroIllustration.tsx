"use client";

import { motion } from "framer-motion";
import { BookOpen, Music, Sparkles } from "lucide-react";

export default function HeroIllustration() {
  return (
    <div className="relative w-full aspect-square max-w-[450px] mx-auto flex items-center justify-center">
      {/* Decorative dashed outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute w-[95%] h-[95%] rounded-full border border-blue-200/30 border-dashed"
      />

      {/* Decorative solid inner ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        className="absolute w-[80%] h-[80%] rounded-full border border-amber-300/20"
      />

      {/* Glowing aura */}
      <motion.div
        animate={{
          scale: [1, 1.06, 0.96, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[65%] h-[65%] rounded-full bg-gradient-to-tr from-blue-500/10 to-amber-400/20 blur-2xl"
      />

      {/* Central Glassmorphism Card (Representing Goddess Saraswati) */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-72 h-72 flex flex-col items-center justify-center bg-white/40 backdrop-blur-md rounded-full shadow-lg border border-white/60 p-6 text-center"
      >
        <span className="text-6xl mb-4 filter drop-shadow-md select-none">🪷</span>
        
        {/* Halo sparkle */}
        <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center mb-3">
          <Sparkles className="w-5 h-5 text-amber-500" />
        </div>

        <h3 className="font-serif font-extrabold text-slate-800 text-lg leading-tight">
          Dewi Saraswati
        </h3>
        <p className="text-[10px] uppercase tracking-widest text-blue-600 font-bold mt-1">
          Manifestasi Kebijaksanaan
        </p>
      </motion.div>

      {/* Floating Elements (Books, Veena, Genitri, Swan) */}
      {/* 1. Book (Kitab) */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        className="absolute top-[12%] left-[12%] p-3.5 bg-white border border-slate-100 rounded-2xl shadow-md text-blue-600 flex items-center justify-center"
      >
        <BookOpen className="w-5 h-5" />
      </motion.div>

      {/* 2. Veena (Wina) */}
      <motion.div
        animate={{ y: [0, 8, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        className="absolute bottom-[20%] left-[8%] p-3.5 bg-white border border-slate-100 rounded-2xl shadow-md text-amber-500 flex items-center justify-center"
      >
        <Music className="w-5 h-5" />
      </motion.div>

      {/* 3. Tasbih (Genitri) */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="absolute top-[20%] right-[10%] p-3.5 bg-white border border-slate-100 rounded-2xl shadow-md flex items-center justify-center select-none"
      >
        <span className="text-xl">📿</span>
      </motion.div>

      {/* 4. Swan (Angsa) */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-[16%] right-[12%] p-3.5 bg-white border border-slate-100 rounded-2xl shadow-md flex items-center justify-center select-none"
      >
        <span className="text-xl">🦢</span>
      </motion.div>
    </div>
  );
}
