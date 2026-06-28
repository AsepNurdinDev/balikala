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
  ZoomIn, 
  ZoomOut,
  HelpCircle, 
  Sparkles,
  Info,
  Compass
} from "lucide-react";
import { usePenjor } from "../../hooks/usePenjor";
import { PENJOR_PARTS } from "../../data/penjor";

// Dynamically import PenjorCanvas to prevent SSR errors with Three.js
const PenjorCanvas = dynamic(() => import("./PenjorCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#F3EFE9]/40 flex items-center justify-center text-stone-500 font-medium">
      Menyiapkan Viewer 3D...
    </div>
  )
});

export default function Galungan() {
  const { activeHotspotId, activePart, selectHotspot, resetHotspot } = usePenjor();
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [cameraResetKey, setCameraResetKey] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);

  const viewerContainerRef = useRef<HTMLDivElement>(null);
  const { active, progress } = useProgress();

  const handleResetCamera = () => {
    setCameraResetKey((prev) => prev + 1);
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  const toggleFullscreen = () => {
    if (!viewerContainerRef.current) return;

    if (!document.fullscreenElement) {
      viewerContainerRef.current.requestFullscreen().catch((err) => {
        console.error("Gagal mengaktifkan mode layar penuh:", err);
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
      id="galungan-section"
      className="py-20 bg-[#F8F5F0] border-b border-stone-200/50"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center lg:text-left max-w-2xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#8B5E3C] bg-[#8B5E3C]/10">
            Fase Rangkaian 2
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-serif font-extrabold text-[#2D2D2D] tracking-tight">
            Hari Raya Galungan & Penjor
          </h2>
          <p className="mt-3 text-stone-500 text-sm md:text-base leading-relaxed">
            Puncak kemenangan Dharma dirayakan dengan bersembahyang dan memasang Penjor yang megah di depan rumah. 
            Gunakan viewer 3D di bawah untuk mengeksplorasi setiap bagian Penjor dan membedah maknanya secara filosofis.
          </p>
        </div>

        {/* 3D Viewer Grid */}
        <div 
          ref={viewerContainerRef}
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white rounded-[2rem] p-4 md:p-6 border border-stone-200/60 shadow-soft relative ${
            isFullscreen ? "fixed inset-0 z-50 p-6 rounded-none bg-[#F8F5F0] w-screen h-screen" : ""
          }`}
        >
          
          {/* Column 1: 3D Canvas Box */}
          <div className="lg:col-span-7 h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden relative border border-stone-200 bg-[#FBF9F6]">
            
            {/* 3D Canvas dynamic component */}
            <PenjorCanvas
              autoRotate={autoRotate}
              cameraResetKey={cameraResetKey}
              zoomLevel={zoomLevel}
            />

            {/* Custom Loading Overlay */}
            <AnimatePresence>
              {active && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-[#FBF9F6] z-30 flex flex-col items-center justify-center p-6 text-center"
                >
                  <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
                    <div className="absolute inset-0 border-4 border-[#8B5E3C]/15 rounded-full" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-4 border-t-[#8B5E3C] border-r-transparent border-b-transparent border-l-transparent rounded-full"
                    />
                    <span className="font-serif font-bold text-sm text-[#8B5E3C]">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#2D2D2D] mb-1">
                    Memuat Aset 3D Penjor...
                  </h3>
                  <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                    Mengunduh detail model interaktif. Mohon tunggu beberapa saat.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Instruction Floating Info */}
            <div className="absolute top-4 left-4 z-20 hidden md:flex items-center gap-2 text-[11px] text-stone-600 bg-white/80 backdrop-blur border border-stone-250/30 px-3.5 py-2 rounded-xl shadow-sm">
              <Info className="w-3.5 h-3.5 text-[#C89B3C] shrink-0" />
              <span>
                <strong className="text-stone-800">Geser mouse</strong> untuk memutar &nbsp;|&nbsp; Pilih bagian di panel kanan
              </span>
            </div>

            {/* Float Canvas Control Panel */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-full border border-stone-200/50 shadow-soft">
              {/* Reset View */}
              <button
                onClick={handleResetCamera}
                title="Reset Kamera"
                className="p-2 hover:bg-stone-100 rounded-full text-stone-600 hover:text-[#8B5E3C] transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Auto Rotate Toggle */}
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                title={autoRotate ? "Hentikan Rotasi" : "Aktifkan Rotasi"}
                className={`p-2 rounded-full transition-all cursor-pointer ${
                  autoRotate 
                    ? "text-[#C89B3C] bg-[#C89B3C]/10" 
                    : "text-stone-600 hover:bg-stone-100 hover:text-[#8B5E3C]"
                }`}
              >
                <RotateCw className="w-4 h-4" />
              </button>

              {/* Zoom In */}
              <button
                onClick={handleZoomIn}
                title="Perbesar"
                className="p-2 hover:bg-stone-100 rounded-full text-stone-600 hover:text-[#8B5E3C] transition-all cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              {/* Zoom Out */}
              <button
                onClick={handleZoomOut}
                title="Perkecil"
                className="p-2 hover:bg-stone-100 rounded-full text-stone-600 hover:text-[#8B5E3C] transition-all cursor-pointer"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                title="Mode Layar Penuh"
                className="p-2 hover:bg-stone-100 rounded-full text-stone-600 hover:text-[#8B5E3C] transition-all cursor-pointer"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Help Panel Toggle */}
              <button
                onClick={() => setShowHelp(!showHelp)}
                title="Bantuan Navigasi"
                className={`p-2 rounded-full transition-all cursor-pointer ${
                  showHelp
                    ? "text-[#8B5E3C] bg-[#8B5E3C]/10"
                    : "text-stone-600 hover:bg-stone-100 hover:text-[#8B5E3C]"
                }`}
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>

            {/* Floating Navigation Instructions Overlay */}
            <AnimatePresence>
              {showHelp && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute bottom-16 left-4 right-4 bg-white/95 backdrop-blur p-4 rounded-2xl border border-stone-200/80 text-xs text-stone-600 max-w-sm z-20 shadow-soft mx-auto"
                >
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="font-bold text-[#8B5E3C] uppercase tracking-wider text-[10px]">Petunjuk Navigasi 3D</span>
                    <button 
                      onClick={() => setShowHelp(false)}
                      className="text-stone-400 hover:text-stone-600 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  <ul className="space-y-2">
                    <li>• <span className="text-stone-800 font-bold">Putar Sudut Pandang:</span> Klik kiri & tahan pada model lalu seret mouse (atau usap layar ponsel).</li>
                    <li>• <span className="text-stone-800 font-bold">Zoom:</span> Gunakan tombol zoom di panel bawah atau gulung roda mouse (cubit layar ponsel).</li>
                    <li>• <span className="text-stone-800 font-bold">Geser Objek:</span> Klik kanan & tahan lalu seret (atau gunakan dua jari pada ponsel).</li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Column 2: Details Panel */}
          <div className="lg:col-span-5 h-[400px] md:h-[500px] lg:h-[600px] flex flex-col justify-between overflow-y-auto bg-stone-50/50 p-6 md:p-8 rounded-2xl border border-stone-100">
            <AnimatePresence mode="wait">
              {activePart ? (
                <motion.div
                  key={activePart.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="h-full flex flex-col justify-between"
                >
                  <div className="space-y-5">
                    
                    {/* Hotspot Header */}
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#C89B3C] bg-[#C89B3C]/10 border border-[#C89B3C]/20">
                        📍 Detail Bagian Penjor
                      </span>
                      <h3 className="text-xl md:text-2xl font-serif font-black text-[#2D2D2D] mt-3">
                        {activePart.name}
                      </h3>
                      <p className="text-xs text-[#8B5E3C] font-semibold mt-1 bg-[#8B5E3C]/5 border-l-2 border-[#8B5E3C] py-1.5 px-2.5">
                        {activePart.function}
                      </p>
                    </div>

                    {/* Deskripsi */}
                    <div className="border-t border-stone-200/50 pt-4">
                      <h4 className="text-[10px] uppercase font-extrabold text-stone-400 tracking-wider">
                        Deskripsi
                      </h4>
                      <p className="text-xs md:text-sm text-stone-600 leading-relaxed mt-1">
                        {activePart.description}
                      </p>
                    </div>

                    {/* Filosofi */}
                    <div className="border-t border-stone-200/50 pt-4">
                      <h4 className="text-[10px] uppercase font-extrabold text-stone-400 tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" /> Makna Filosofis
                      </h4>
                      <p className="text-xs md:text-sm text-stone-600 leading-relaxed mt-1 italic">
                        {activePart.philosophy}
                      </p>
                    </div>

                    {/* Nilai Budaya */}
                    <div className="border-t border-stone-200/50 pt-4">
                      <h4 className="text-[10px] uppercase font-extrabold text-stone-400 tracking-wider">
                        Nilai Pendidikan & Karakter
                      </h4>
                      <p className="text-xs md:text-sm text-stone-600 leading-relaxed mt-1">
                        {activePart.culturalValue}
                      </p>
                    </div>

                  </div>

                  {/* Reset active part button */}
                  <div className="mt-8 pt-4 border-t border-stone-200/50">
                    <button
                      onClick={resetHotspot}
                      className="w-full text-center py-3 bg-[#8B5E3C] hover:bg-[#724D31] text-white text-xs font-bold rounded-xl shadow-soft hover:shadow transition duration-200 cursor-pointer"
                    >
                      Kembali ke Informasi Umum Penjor
                    </button>
                  </div>
                </motion.div>
              ) : (
                // Initial Default State
                <motion.div
                  key="default-info"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col justify-between text-center lg:text-left"
                >
                  <div className="space-y-6">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-stone-200 shadow-soft flex items-center justify-center text-[#C89B3C] mx-auto lg:mx-0 animate-float">
                      <Compass size={24} />
                    </div>
                    
                    <div>
                      <h3 className="text-xl md:text-2xl font-serif font-black text-[#2D2D2D]">
                        Eksplorasi Bagian Penjor
                      </h3>
                      <p className="mt-3 text-stone-500 text-xs md:text-sm leading-relaxed">
                        Penjor bukan sekadar hiasan bambu melengkung yang cantik di pinggir jalan Bali. Setiap jengkal ornamen penjor melambangkan anugerah kehidupan dan bernilai filosofis yang mendalam.
                      </p>
                      <p className="mt-2 text-stone-500 text-xs md:text-sm leading-relaxed">
                        Variasi pembuatan penjor di Bali sangat beragam tergantung adat desa setempat (Desa Kala Patra), namun esensi penjor sebagai bentuk syukur dan persembahan tulus tetap sama di seluruh penjuru Bali.
                      </p>
                    </div>

                    <div className="bg-white border border-stone-200/60 p-4 rounded-xl shadow-sm text-[11px] text-stone-500 leading-relaxed text-left">
                      <strong className="text-stone-850 block mb-1">💡 Cara Berinteraksi:</strong>
                      Klik salah satu nama bagian di daftar di bawah ini untuk mempelajari filosofi luhur dari setiap komponen penjor — mulai dari bambu hingga sampian di puncaknya.
                    </div>
                  </div>

                  {/* List of parts names as quick shortcuts */}
                  <div className="mt-8 border-t border-stone-200/50 pt-5">
                    <h4 className="text-[9px] uppercase font-extrabold text-stone-400 tracking-wider text-left mb-2">
                      Pintas Daftar Bagian:
                    </h4>
                    <div className="flex flex-wrap gap-1.5 justify-start">
                      {PENJOR_PARTS.map((part) => (
                        <button
                          key={part.id}
                          onClick={() => selectHotspot(part.id)}
                          className="text-[10px] bg-white hover:bg-stone-100 text-stone-600 hover:text-[#8B5E3C] border border-stone-200 px-2.5 py-1.5 rounded-lg transition duration-200 cursor-pointer"
                        >
                          {part.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
