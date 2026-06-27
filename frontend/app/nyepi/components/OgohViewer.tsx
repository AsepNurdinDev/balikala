"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { 
  RotateCcw, 
  RotateCw, 
  Maximize2, 
  Minimize2, 
  HelpCircle, 
  Layers, 
  Ruler, 
  MapPin, 
  Sparkles,
  Info
} from "lucide-react";
import ogohData from "../data/ogoh";

// Dynamically import OgohCanvas with SSR disabled
const OgohCanvas = dynamic(() => import("./OgohCanvas"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#1F1F1F] flex items-center justify-center text-stone-400">Menyiapkan WebGL...</div>
});

export default function OgohViewer() {
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [cameraResetKey, setCameraResetKey] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  
  const viewerRef = useRef<HTMLDivElement>(null);
  
  // useProgress returns loading state from React Three Fiber loader
  const { active, progress } = useProgress();

  const handleReset = () => {
    setCameraResetKey((prev) => prev + 1);
  };

  const toggleFullscreen = () => {
    if (!viewerRef.current) return;

    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen().catch((err) => {
        console.error("Error enabling fullscreen:", err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <section
      id="ogoh-3d-section"
      className="bg-[#2B2B2B] py-20 lg:py-32 text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-12 lg:mb-16 text-center lg:text-left flex flex-col lg:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-[#D4AF37] font-semibold tracking-wider text-xs uppercase mb-3 block">
              SOROTAN KARYA INTERAKTIF
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
              Visualisasi Ogoh-Ogoh 3D
            </h2>
            <p className="mt-4 text-stone-400 text-sm md:text-base leading-relaxed">
              Jelajahi setiap sudut karya seni patung raksasa Bali secara interaktif. 
              Putar, perbesar, dan pahami makna filosofis di balik representasi Bhuta Kala.
            </p>
          </div>
          
          {/* Quick instructions indicator for desktop */}
          <div className="hidden lg:flex items-center gap-4 text-xs text-stone-400 border border-stone-800 rounded-2xl p-4 bg-stone-900/30">
            <Info className="w-4 h-4 text-[#D4AF37]" />
            <div>
              <p><span className="text-white font-medium">Klik & Geser</span> untuk memutar kamera</p>
              <p><span className="text-white font-medium">Scroll Mouse</span> untuk memperbesar (Zoom)</p>
            </div>
          </div>
        </div>

        {/* Main Viewer Area */}
        <div 
          ref={viewerRef}
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#181818] rounded-3xl p-4 md:p-6 border border-stone-800/80 shadow-2xl relative ${
            isFullscreen ? "fixed inset-0 z-50 p-6 rounded-none bg-[#181818] w-screen h-screen" : ""
          }`}
        >
          
          {/* 3D Canvas Box */}
          <div className="lg:col-span-8 h-[350px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden relative border border-stone-800 bg-[#1F1F1F]">
            
            {/* 3D Canvas Component */}
            <OgohCanvas autoRotate={autoRotate} cameraResetKey={cameraResetKey} />

            {/* Custom Loading Overlay */}
            <AnimatePresence>
              {active && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-[#181818] z-30 flex flex-col items-center justify-center p-6 text-center"
                >
                  {/* Decorative Spinning Ring */}
                  <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                    <div className="absolute inset-0 border-4 border-[#C67C4E]/20 rounded-full" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-4 border-t-[#C67C4E] border-r-transparent border-b-transparent border-l-transparent rounded-full"
                    />
                    <span className="font-serif font-bold text-lg text-white">
                      {Math.round(progress)}%
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-white mb-2">
                    Memuat Karya Seni 3D...
                  </h3>
                  <p className="text-xs text-stone-400 max-w-xs leading-relaxed">
                    Sedang mengunduh aset detail model 3D Ogoh-Ogoh. Mohon tunggu beberapa saat.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Float Canvas Control Panel */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap justify-center items-center gap-3">
              <div className="flex gap-2 bg-[#181818]/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/5 shadow-lg">
                {/* Reset View */}
                <button
                  onClick={handleReset}
                  title="Reset Kamera"
                  className="p-2 hover:bg-white/10 rounded-full text-stone-300 hover:text-white transition duration-200 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Auto Rotate Toggle */}
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  title={autoRotate ? "Matikan Rotasi" : "Aktifkan Rotasi"}
                  className={`p-2 rounded-full transition duration-200 cursor-pointer ${
                    autoRotate 
                      ? "text-[#D4AF37] bg-[#D4AF37]/10" 
                      : "text-stone-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                {/* Fullscreen Toggle */}
                <button
                  onClick={toggleFullscreen}
                  title="Mode Layar Penuh"
                  className="p-2 hover:bg-white/10 rounded-full text-stone-300 hover:text-white transition duration-200 cursor-pointer"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                {/* Help Panel Toggle */}
                <button
                  onClick={() => setShowHelp(!showHelp)}
                  title="Petunjuk Kontrol"
                  className={`p-2 rounded-full transition duration-200 cursor-pointer ${
                    showHelp
                      ? "text-[#C67C4E] bg-[#C67C4E]/10"
                      : "text-stone-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Floating Gesture Controls Help overlay */}
            <AnimatePresence>
              {showHelp && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute top-4 left-4 right-4 bg-[#181818]/90 backdrop-blur-md p-4 rounded-xl border border-white/5 text-xs text-stone-300 max-w-sm z-20"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-[#D4AF37] uppercase tracking-wide">Navigasi Interaksi 3D</span>
                    <button 
                      onClick={() => setShowHelp(false)}
                      className="text-stone-500 hover:text-white font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  <ul className="space-y-2">
                    <li>• <span className="text-white font-medium">Orbit:</span> Klik tombol kiri mouse & seret (atau satu jari pada layar sentuh) untuk memutar sudut pandang.</li>
                    <li>• <span className="text-white font-medium">Zoom:</span> Putar scroll roda mouse (atau cubit layar sentuh) untuk memperbesar/memperkecil visual.</li>
                    <li>• <span className="text-white font-medium">Pan:</span> Klik tombol kanan mouse & seret (atau dua jari pada layar sentuh) untuk menggeser objek.</li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Sidebar Information Panel */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full overflow-y-auto pr-1">
            <div className="space-y-6">
              
              {/* Creator & Title Info */}
              <div>
                <span className="text-xs bg-[#C67C4E]/20 text-[#C67C4E] border border-[#C67C4E]/20 px-3 py-1 rounded-full font-medium tracking-wide">
                  Karakter Demonologi Bali
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mt-3">
                  {ogohData.name}
                </h3>
                <div className="flex items-start gap-2 mt-2.5 text-xs text-stone-400">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Karya dari {ogohData.creator} ({ogohData.banjar})</span>
                </div>
              </div>

              {/* Physical specifications */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-stone-800/80">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-[#C67C4E]" />
                  <div>
                    <p className="text-[10px] text-stone-500 uppercase tracking-widest">Tinggi Patung</p>
                    <p className="text-sm font-semibold text-stone-200">{ogohData.height}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#C67C4E]" />
                  <div>
                    <p className="text-[10px] text-stone-500 uppercase tracking-widest">Status Aset</p>
                    <p className="text-sm font-semibold text-stone-200">Format GLB 3D</p>
                  </div>
                </div>
              </div>

              {/* Detailed Descriptions */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs text-stone-400 font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#C67C4E]" /> Deskripsi Karya
                  </h4>
                  <p className="text-stone-300 text-xs md:text-sm leading-relaxed">
                    {ogohData.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs text-stone-400 font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Simbolisme & Filosofi
                  </h4>
                  <p className="text-stone-300 text-xs md:text-sm leading-relaxed">
                    {ogohData.symbolism}
                  </p>
                </div>
              </div>

              {/* Material Composition List */}
              <div>
                <h4 className="text-xs text-stone-400 font-semibold uppercase tracking-wider mb-3">
                  Komposisi Bahan Pembuatan
                </h4>
                <div className="flex flex-wrap gap-2">
                  {ogohData.materials.map((material, index) => (
                    <span 
                      key={index}
                      className="text-[11px] bg-stone-900 border border-stone-800 text-stone-300 px-3 py-1.5 rounded-full"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
