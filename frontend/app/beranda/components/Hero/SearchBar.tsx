"use client";

import { Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { FESTIVALS, Festival } from "../../data/festivals";

interface SearchBarProps {
  onSelectFestival?: (id: string) => void;
}

export default function SearchBar({ onSelectFestival }: SearchBarProps) {
  const [keyword, setKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = FESTIVALS.filter((festival) =>
    festival.name.toLowerCase().includes(keyword.toLowerCase()) ||
    festival.category.toLowerCase().includes(keyword.toLowerCase()) ||
    festival.shortDesc.toLowerCase().includes(keyword.toLowerCase())
  );

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (festivalId: string) => {
    setKeyword("");
    setIsOpen(false);
    if (onSelectFestival) {
      onSelectFestival(festivalId);
    }
    // Scroll to calendar smoothly
    const element = document.getElementById("calendar-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      <div className="flex overflow-hidden rounded-2xl bg-white shadow-medium border border-stone-200/50 transition-all duration-300 focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10">
        <input
          className="flex-1 px-6 py-5 outline-none text-base md:text-lg text-[#2D2D2D] placeholder-stone-400 font-medium"
          placeholder="Cari Hari Raya (misal: Nyepi, Galungan, Saraswati)..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />

        <button className="bg-primary hover:bg-[#724D31] active:scale-95 px-7 text-white transition-all duration-200 flex items-center justify-center">
          <Search size={22} className="stroke-[2.5]" />
        </button>
      </div>

      {isOpen && keyword && (
        <div className="absolute z-40 mt-3 w-full rounded-2xl bg-white/95 backdrop-blur-md shadow-medium border border-stone-200/40 max-h-96 overflow-y-auto overflow-x-hidden animate-fade-in-up">
          {filtered.length ? (
            filtered.map((festival) => (
              <div
                key={festival.id}
                onClick={() => handleSelect(festival.id)}
                className="cursor-pointer border-b border-stone-150/60 px-6 py-4 hover:bg-stone-50 transition flex justify-between items-center gap-4 group"
              >
                <div>
                  <div className="font-bold text-stone-800 group-hover:text-primary transition flex items-center gap-2">
                    {festival.name}
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-secondary px-2 py-0.5 rounded-full bg-secondary/10">
                      {festival.category.split(" ")[0]}
                    </span>
                  </div>
                  <div className="text-xs text-stone-500 mt-1 line-clamp-1">
                    {festival.shortDesc}
                  </div>
                </div>
                <div className="text-sm font-semibold text-primary/80 shrink-0 text-right">
                  {festival.date}
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-5 text-stone-400 text-center font-medium">
              Hari raya tidak ditemukan
            </div>
          )}
        </div>
      )}
    </div>
  );
}