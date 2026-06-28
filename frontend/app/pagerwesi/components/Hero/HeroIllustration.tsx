"use client";

import { motion } from "framer-motion";

export default function HeroIllustration() {
  return (
    <div className="relative w-full aspect-square max-w-[480px] mx-auto flex items-center justify-center">
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 to-primary/20 rounded-full filter blur-3xl opacity-60 animate-breathe" />

      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-medium"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="skyGrad" x1="250" y1="0" x2="250" y2="500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFDFC" />
            <stop offset="45%" stopColor="#F9F5EE" />
            <stop offset="75%" stopColor="#F5EFE3" />
            <stop offset="100%" stopColor="#EADEC9" />
          </linearGradient>

          <linearGradient id="sunGrad" x1="250" y1="120" x2="250" y2="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FCE082" />
            <stop offset="100%" stopColor="#C89B3C" />
          </linearGradient>

          <linearGradient id="mountainGrad" x1="250" y1="180" x2="250" y2="350" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A27B5C" />
            <stop offset="100%" stopColor="#5C3D2E" />
          </linearGradient>

          <linearGradient id="shieldGrad" x1="250" y1="280" x2="250" y2="440" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FAD961" />
            <stop offset="50%" stopColor="#F76B1C" />
            <stop offset="100%" stopColor="#8B5E3C" />
          </linearGradient>

          <linearGradient id="goldGrad" x1="250" y1="280" x2="250" y2="440" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF2D4" />
            <stop offset="50%" stopColor="#C89B3C" />
            <stop offset="100%" stopColor="#8B5E3C" />
          </linearGradient>

          <linearGradient id="puraGrad" x1="250" y1="160" x2="250" y2="350" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4A3428" />
            <stop offset="100%" stopColor="#25160E" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base Circle Mask / Background */}
        <circle cx="250" cy="250" r="230" fill="url(#skyGrad)" stroke="#8B5E3C" strokeWidth="2" strokeDasharray="6 4" className="opacity-80" />

        {/* Sun (Matahari) */}
        <motion.circle
          cx="250"
          cy="180"
          r="65"
          fill="url(#sunGrad)"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Mountain Silhouette (Gunung Agung representation) */}
        <path
          d="M60 380 L180 200 L270 300 L320 240 L440 380 Z"
          fill="url(#mountainGrad)"
          opacity="0.85"
        />
        <path
          d="M100 380 L230 150 L310 260 L380 180 L420 380 Z"
          fill="url(#mountainGrad)"
          opacity="0.95"
        />

        {/* Traditional Pura (Balinese Gateway/Meru Shrine Silhouette) */}
        <g opacity="0.95">
          {/* Left Gateway pillar */}
          <path d="M190 380 L190 220 L175 220 L175 240 L165 240 L165 270 L175 270 L175 380 Z" fill="url(#puraGrad)" />
          <path d="M175 220 L182 205 L190 220 Z" fill="#C89B3C" />
          <rect x="170" y="270" width="10" height="110" fill="#25160E" opacity="0.3" />

          {/* Right Gateway pillar */}
          <path d="M310 380 L310 220 L325 220 L325 240 L335 240 L335 270 L325 270 L325 380 Z" fill="url(#puraGrad)" />
          <path d="M325 220 L318 205 L310 220 Z" fill="#C89B3C" />
          <rect x="320" y="270" width="10" height="110" fill="#25160E" opacity="0.3" />

          {/* Meru Tower (Pura Centre Roof levels) */}
          {/* Level 1 Roof */}
          <path d="M215 300 L285 300 L275 285 L225 285 Z" fill="url(#puraGrad)" />
          {/* Level 2 Roof */}
          <path d="M222 280 L278 280 L270 265 L230 265 Z" fill="url(#puraGrad)" />
          {/* Level 3 Roof */}
          <path d="M230 260 L270 260 L263 245 L237 245 Z" fill="url(#puraGrad)" />
          {/* Shrine Base */}
          <rect x="235" y="300" width="30" height="80" fill="url(#puraGrad)" />
        </g>

        {/* Floating Clouds (Awan) */}
        <motion.path
          d="M80 150 Q105 130 130 150 Q155 135 170 160 L70 160 Z"
          fill="#FFFFFF"
          opacity="0.75"
          initial={{ x: -20 }}
          animate={{ x: 10 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.path
          d="M340 180 Q360 165 380 180 Q400 165 415 190 L330 190 Z"
          fill="#FFFFFF"
          opacity="0.8"
          initial={{ x: 20 }}
          animate={{ x: -10 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />

        {/* Golden Shield (Tameng) in front representing the Fortress (Benteng Diri) */}
        <motion.g
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 60 }}
          filter="url(#glow)"
        >
          {/* Outer Shield Shadow/Glow base */}
          <path
            d="M190 280 C190 280 250 260 250 260 C250 260 310 280 310 280 C310 340 295 400 250 430 C205 400 190 340 190 280 Z"
            fill="url(#goldGrad)"
            stroke="#8B5E3C"
            strokeWidth="3"
          />

          {/* Inner Shield */}
          <path
            d="M202 292 C202 292 250 277 250 277 C250 277 298 292 298 292 C298 342 285 390 250 417 C215 390 202 342 202 292 Z"
            fill="url(#shieldGrad)"
            opacity="0.9"
          />

          {/* Shield Details / Balinese Carvings representations */}
          {/* Vertical core line */}
          <line x1="250" y1="277" x2="250" y2="417" stroke="#FFF2D4" strokeWidth="2.5" opacity="0.6" strokeDasharray="4 4" />
          
          {/* Inner shield borders */}
          <path
            d="M210 298 C210 298 250 287 250 287 C250 287 290 298 290 298"
            stroke="#FFFDFC"
            strokeWidth="1.5"
            opacity="0.7"
            fill="none"
          />

          {/* Central Sun/Flower emblem inside shield */}
          <circle cx="250" cy="335" r="14" fill="#FFF2D4" opacity="0.8" />
          <path d="M250 315 L250 355 M230 335 L270 335 M236 321 L264 349 M236 349 L264 321" stroke="#8B5E3C" strokeWidth="2" />
          <circle cx="250" cy="335" r="7" fill="#C89B3C" />
          
          {/* Lower accent paths inside shield */}
          <path
            d="M220 350 Q250 380 250 405"
            stroke="#FFF2D4"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M280 350 Q250 380 250 405"
            stroke="#FFF2D4"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
          />
        </motion.g>

        {/* Foreground flowers/leaves decorations to root the illustration */}
        <g opacity="0.9">
          {/* Left leaf cluster */}
          <path d="M40 450 C30 420 70 400 90 420 C100 430 90 450 40 450 Z" fill="#8B5E3C" />
          <path d="M50 460 C42 435 75 420 95 435 C102 442 95 460 50 460 Z" fill="#C89B3C" opacity="0.8" />
          {/* Right leaf cluster */}
          <path d="M460 450 C470 420 430 400 410 420 C400 430 410 450 460 450 Z" fill="#8B5E3C" />
          <path d="M450 460 C458 435 425 420 405 435 C398 442 405 460 450 460 Z" fill="#C89B3C" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
}
