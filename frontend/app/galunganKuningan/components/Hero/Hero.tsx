"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  onStartJourney: () => void;
}

export default function Hero({ onStartJourney }: HeroProps) {
  return (
    <section
      id="hero-section"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-6 md:px-12 bg-[#F8F5F0] overflow-hidden"
    >
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8B5E3C" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Information */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#8B5E3C] bg-[#8B5E3C]/10 border border-[#8B5E3C]/20 shadow-sm">
              ✨ Interactive Cultural Journey
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight text-[#2D2D2D] leading-[1.1]"
          >
            GALUNGAN & <br className="hidden sm:inline" />
            <span className="text-[#C89B3C] relative inline-block">
              KUNINGAN
              <span className="absolute bottom-1 left-0 w-full h-[6px] bg-[#8B5E3C]/20 rounded-full" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-stone-600 text-base md:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium"
          >
            Ikuti perjalanan spiritual suci menyambut hari kemenangan Dharma (kebenaran) melawan Adharma (keburukan). Telusuri rangkaian ritual kuno dan filosofi luhur yang diwariskan dari generasi ke generasi di Pulau Dewata.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-2"
          >
            <button
              onClick={onStartJourney}
              className="inline-flex items-center gap-3 bg-[#8B5E3C] hover:bg-[#724D31] text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-medium hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0 cursor-pointer group"
            >
              Mulai Perjalanan
              <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>

        {/* Right Column: Flat Illustration */}
        <div className="lg:col-span-6 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full max-w-[500px] aspect-square rounded-[3rem] bg-gradient-to-tr from-[#F3EFE9] via-white to-[#F9F7F4] shadow-medium border border-stone-200/50 p-6 md:p-8 flex items-center justify-center relative overflow-hidden"
          >
            {/* SVG Illustration */}
            <svg
              viewBox="0 0 500 500"
              className="w-full h-full drop-shadow-lg"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Gradients definitions */}
              <defs>
                <linearGradient id="skyGrad" x1="250" y1="0" x2="250" y2="500" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFF9E6" />
                  <stop offset="60%" stopColor="#FFF2D6" />
                  <stop offset="100%" stopColor="#F8F5F0" />
                </linearGradient>
                <linearGradient id="mountainGrad" x1="250" y1="180" x2="250" y2="400" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#A88B73" />
                  <stop offset="100%" stopColor="#8B5E3C" />
                </linearGradient>
                <linearGradient id="sawahGrad1" x1="0" y1="400" x2="500" y2="500" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#D5C5A8" />
                  <stop offset="100%" stopColor="#C2AE8B" />
                </linearGradient>
                <linearGradient id="sawahGrad2" x1="0" y1="420" x2="500" y2="500" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#C89B3C" />
                  <stop offset="100%" stopColor="#AA8029" />
                </linearGradient>
                <linearGradient id="puraGrad" x1="330" y1="200" x2="330" y2="380" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#5A4A3B" />
                  <stop offset="100%" stopColor="#3F3227" />
                </linearGradient>
              </defs>

              {/* Sky Background */}
              <rect width="500" height="500" rx="36" fill="url(#skyGrad)" />

              {/* Rising Sun */}
              <motion.circle
                cx="150"
                cy="220"
                r="45"
                fill="#C89B3C"
                opacity="0.85"
                animate={{ scale: [1, 1.05, 1], y: [0, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <circle cx="150" cy="220" r="60" fill="#C89B3C" opacity="0.15" />

              {/* Clouds */}
              <motion.path
                d="M 50 140 Q 70 120 90 140 Q 110 120 130 140 T 150 140 L 150 155 L 50 155 Z"
                fill="white"
                opacity="0.8"
                animate={{ x: [-15, 15, -15] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.path
                d="M 330 110 Q 345 95 360 110 Q 375 95 390 110 T 410 110 L 410 125 L 330 125 Z"
                fill="white"
                opacity="0.75"
                animate={{ x: [10, -10, 10] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Gunung Agung */}
              <path
                d="M 50 400 L 250 170 L 450 400 Z"
                fill="url(#mountainGrad)"
                opacity="0.9"
              />
              {/* Mountain Ridge Accent */}
              <path
                d="M 250 170 L 260 175 L 320 300 L 450 400 H 250 Z"
                fill="#775031"
                opacity="0.15"
              />

              {/* Pura Gate (Candi Bentar Split Gate) */}
              <g transform="translate(180, 250)">
                {/* Foundation base */}
                <rect x="0" y="110" width="140" height="15" rx="3" fill="#3D3025" />
                <rect x="10" y="100" width="120" height="10" fill="#4B3B2E" />

                {/* Left Gate Tower */}
                <path d="M 20 100 L 25 30 L 32 30 L 34 50 L 42 50 L 45 70 L 53 70 L 55 100 Z" fill="url(#puraGrad)" />
                <rect x="25" y="60" width="10" height="6" fill="#C89B3C" opacity="0.8" />
                <rect x="35" y="80" width="12" height="8" fill="#C89B3C" opacity="0.8" />

                {/* Right Gate Tower */}
                <path d="M 120 100 L 115 30 L 108 30 L 106 50 L 98 50 L 95 70 L 87 70 L 85 100 Z" fill="url(#puraGrad)" />
                <rect x="105" y="60" width="10" height="6" fill="#C89B3C" opacity="0.8" />
                <rect x="93" y="80" width="12" height="8" fill="#C89B3C" opacity="0.8" />
              </g>

              {/* Sawah (Rice Paddies - Layered Gradients) */}
              {/* Back sawah terrace */}
              <path
                d="M 0 380 Q 150 360 280 390 T 500 375 L 500 500 L 0 500 Z"
                fill="url(#sawahGrad1)"
              />
              <path d="M 0 380 Q 150 360 280 390 T 500 375" stroke="#E2D4BF" strokeWidth="2" />

              {/* Front sawah terrace */}
              <path
                d="M 0 420 Q 120 405 240 435 T 500 410 L 500 500 L 0 500 Z"
                fill="url(#sawahGrad2)"
              />
              <path d="M 0 420 Q 120 405 240 435 T 500 410" stroke="#FFF2D6" strokeWidth="2.5" />

              {/* Stylized Penjor */}
              <g transform="translate(100, 20)">
                {/* Bamboo Curve */}
                <path
                  d="M 40 420 Q 40 160 120 140 Q 150 135 155 165"
                  fill="none"
                  stroke="#5C4736"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                
                {/* Hanging Sampian ornament at the tip of the bend */}
                <path
                  d="M 155 165 L 157 195 Q 163 210 152 225 Q 140 210 148 195 Z"
                  fill="#C89B3C"
                />
                <circle cx="152" cy="225" r="3" fill="#8B5E3C" />

                {/* Janur decoration flags on the bamboo */}
                <path d="M 50 350 L 58 346 L 52 342 Z" fill="#C89B3C" />
                <path d="M 42 310 L 34 306 L 40 302 Z" fill="#C89B3C" />
                <path d="M 48 270 L 56 266 L 50 262 Z" fill="#C89B3C" />
                <path d="M 44 230 L 36 226 L 42 222 Z" fill="#C89B3C" />
                <path d="M 52 190 L 62 184 L 54 180 Z" fill="#C89B3C" />
                <path d="M 65 165 L 61 155 L 71 160 Z" fill="#C89B3C" />
                <path d="M 90 148 L 88 136 L 98 142 Z" fill="#C89B3C" />

                {/* Tamiang ring hanging */}
                <circle cx="95" cy="180" r="10" fill="#C89B3C" opacity="0.3" stroke="#C89B3C" strokeWidth="1.5" />
                <circle cx="95" cy="180" r="6" stroke="#8B5E3C" strokeWidth="1" strokeDasharray="2 2" />

                {/* Hanging Fruits (Pala Gantung) */}
                <path d="M 125 152 L 126 170 Q 128 178 123 182" fill="none" stroke="#3D3025" strokeWidth="1.5" />
                <circle cx="123" cy="184" r="4.5" fill="#A61E2D" />
              </g>

            </svg>

            {/* Glowing accent dots floating */}
            <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-[#C89B3C] animate-breathe" />
            <div className="absolute bottom-1/3 left-1/4 w-3.5 h-3.5 rounded-full bg-[#8B5E3C]/30 animate-float" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
