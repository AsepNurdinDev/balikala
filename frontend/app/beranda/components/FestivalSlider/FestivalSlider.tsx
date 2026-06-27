"use client";

import { useRef, useState } from "react";
import { FESTIVALS, Festival } from "../../data/festivals";
import { ChevronLeft, ChevronRight, Compass, ArrowUpRight } from "lucide-react";

interface FestivalSliderProps {
  onSelectFestivalId: (id: string) => void;
}

export default function FestivalSlider({ onSelectFestivalId }: FestivalSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const handleScroll = () => {
    if (sliderRef.current) {
      setShowLeftArrow(sliderRef.current.scrollLeft > 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 320 * 2; // Scroll two cards at a time
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleCardClick = (id: string) => {
    onSelectFestivalId(id);
    const element = document.getElementById("calendar-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Render miniature SVGs for cards
  const renderCardIllustration = (type: string) => {
    switch (type) {
      case "nyepi":
        return (
          <svg viewBox="0 0 100 100" className="w-12 h-12 stroke-[1.5]" fill="none" stroke="currentColor">
            <path d="M70 30 C50 30 40 50 40 60 C40 80 60 85 70 80 C60 80 50 70 50 60 C50 50 60 35 70 30 Z" fill="currentColor" opacity="0.2" />
            <circle cx="25" cy="30" r="1" fill="currentColor" />
            <circle cx="80" cy="70" r="1.5" fill="currentColor" />
            <circle cx="75" cy="40" r="1" fill="currentColor" />
          </svg>
        );
      case "pengrupukan":
        return (
          <svg viewBox="0 0 100 100" className="w-12 h-12 stroke-[1.5]" fill="none" stroke="currentColor">
            <path d="M50 20 Q60 40 50 60 Q40 80 55 90 Q35 75 40 55 Q45 35 35 25 Z" fill="currentColor" opacity="0.2" />
            <path d="M55 35 Q65 50 60 65 Q55 80 65 85 Q50 75 52 60 Q55 45 47 35 Z" fill="currentColor" opacity="0.3" />
          </svg>
        );
      case "galungan":
        return (
          <svg viewBox="0 0 100 100" className="w-12 h-12 stroke-[1.5]" fill="none" stroke="currentColor">
            <path d="M30 85 Q40 25 70 20" fill="none" strokeWidth="2.5" />
            <path d="M70 20 L72 35 L68 45 L70 20" fill="currentColor" opacity="0.3" />
            <circle cx="68" cy="45" r="2" fill="currentColor" />
          </svg>
        );
      case "kuningan":
        return (
          <svg viewBox="0 0 100 100" className="w-12 h-12 stroke-[1.5]" fill="none" stroke="currentColor">
            <circle cx="50" cy="50" r="22" />
            <circle cx="50" cy="50" r="15" strokeDasharray="3 3" />
            <line x1="50" y1="20" x2="50" y2="80" />
            <line x1="20" y1="50" x2="80" y2="50" />
          </svg>
        );
      case "saraswati":
        return (
          <svg viewBox="0 0 100 100" className="w-12 h-12 stroke-[1.5]" fill="none" stroke="currentColor">
            <path d="M50 75 C35 75 28 62 28 55 C28 42 50 30 50 30 C50 30 72 42 72 55 C72 62 65 75 50 75 Z" fill="currentColor" opacity="0.2" />
            <path d="M50 75 C42 75 38 65 38 60 C38 50 50 40 50 40 C50 40 62 50 62 60 C62 65 58 75 50 75 Z" fill="currentColor" opacity="0.3" />
          </svg>
        );
      case "pagerwesi":
      default:
        return (
          <svg viewBox="0 0 100 100" className="w-12 h-12 stroke-[1.5]" fill="none" stroke="currentColor">
            <rect x="35" y="30" width="8" height="50" rx="1.5" />
            <rect x="57" y="30" width="8" height="50" rx="1.5" />
            <rect x="25" y="45" width="50" height="6" rx="1" fill="currentColor" opacity="0.3" />
            <rect x="25" y="65" width="50" height="6" rx="1" fill="currentColor" opacity="0.3" />
          </svg>
        );
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-stone-200/40 relative overflow-hidden group/slider">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary bg-primary/10">
              Jelajah Budaya
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-black text-stone-800 tracking-tight">
              Festival Explorer
            </h2>
          </div>
          <p className="text-stone-500 max-w-md text-sm md:text-base">
            Jelajahi seluruh hari raya besar Hindu Bali. Arahkan kursor ke kartu untuk pratinjau ringkas, dan klik untuk melihat ritual secara lengkap.
          </p>
        </div>

        {/* Carousel Window */}
        <div className="relative">
          
          {/* Left Arrow Controller */}
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-2 top-1/2 z-30 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur border border-stone-200 shadow-medium flex items-center justify-center text-stone-700 hover:text-primary hover:scale-105 active:scale-95 transition opacity-0 group-hover/slider:opacity-100"
            >
              <ChevronLeft size={22} className="stroke-[2.5]" />
            </button>
          )}

          {/* Right Arrow Controller */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 z-30 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur border border-stone-200 shadow-medium flex items-center justify-center text-stone-700 hover:text-primary hover:scale-105 active:scale-95 transition opacity-0 group-hover/slider:opacity-100"
          >
            <ChevronRight size={22} className="stroke-[2.5]" />
          </button>

          {/* Scrolling Container */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide py-4 px-2 snap-x scroll-smooth"
          >
            {FESTIVALS.map((festival) => (
              <div
                key={festival.id}
                onClick={() => handleCardClick(festival.id)}
                className={`snap-start shrink-0 w-[280px] md:w-[320px] aspect-[4/5] rounded-3xl p-8 relative flex flex-col justify-between overflow-hidden cursor-pointer bg-gradient-to-b ${festival.gradient} text-white shadow-medium transition-all duration-300 hover:scale-[1.04] hover:shadow-xl group`}
              >
                
                {/* Netflix-style Glassmorphism Blur Backdrop on Hover */}
                <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                {/* Card Top: Category and Icon */}
                <div className="flex justify-between items-start z-20">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/10 text-white/90">
                    {festival.category}
                  </span>
                  
                  <div className="text-white/40 group-hover:text-secondary group-hover:rotate-6 transition duration-300">
                    {renderCardIllustration(festival.illustrationType)}
                  </div>
                </div>

                {/* Card Bottom: Static View */}
                <div className="z-20 transition-all duration-300 group-hover:-translate-y-2 group-hover:opacity-0">
                  <span className="text-xs font-semibold text-white/60">
                    {festival.date}
                  </span>
                  <h3 className="text-2xl font-black mt-2 leading-tight tracking-tight">
                    {festival.name}
                  </h3>
                </div>

                {/* Card Hover Detail Slide Up (Netflix-style) */}
                <div className="absolute inset-x-6 bottom-6 z-20 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex flex-col gap-3 pointer-events-none bg-black/25 backdrop-blur-xl rounded-[2rem] p-4">
                  <p className="text-xs text-stone-200 leading-relaxed line-clamp-3">
                    {festival.shortDesc}
                  </p>
                  
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-secondary uppercase tracking-wider mt-1">
                    Lihat Rangkaian Ritual
                    <ArrowUpRight size={13} />
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
