"use client";
import Link from "next/link";import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, BookOpen, Clock } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { FESTIVALS, Festival } from "../../data/festivals";

interface CalendarProps {
  selectedFestivalId: string | null;
  onSelectFestivalId: (id: string) => void;
}

const MONTH_NAMES = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const DAYS_OF_WEEK = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

export default function Calendar({ selectedFestivalId, onSelectFestivalId }: CalendarProps) {
  // We default to Juni 2026 (since current local time is 2026 and June contains Galungan/Kuningan)
  const [currentMonth, setCurrentMonth] = useState(5); // 0-indexed (June)
  const [currentYear, setCurrentYear] = useState(2026);
  const [hoveredFestival, setHoveredFestival] = useState<Festival | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const calendarRef = useRef<HTMLDivElement>(null);

  // Sync viewed month when selectedFestivalId changes from external components (like SearchBar or Carousel)
  useEffect(() => {
    if (selectedFestivalId) {
      const festival = FESTIVALS.find(f => f.id === selectedFestivalId);
      if (festival) {
        // Map festivals to their respective months in 2026
        if (festival.id === "nyepi" || festival.id === "pengrupukan") {
          setCurrentMonth(2); // Maret
          setCurrentYear(2026);
        } else if (festival.id === "galungan" || festival.id === "kuningan") {
          setCurrentMonth(5); // Juni
          setCurrentYear(2026);
        } else if (festival.id === "saraswati" || festival.id === "pagerwesi") {
          setCurrentMonth(7); // Agustus
          setCurrentYear(2026);
        }
      }
    }
  }, [selectedFestivalId]);

  const activeFestival = FESTIVALS.find(f => f.id === selectedFestivalId) || null;

  // Calendar Helper functions
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getStartDayOffset = (month: number, year: number) => {
    const startDay = new Date(year, month, 1).getDay(); // Sun = 0, Mon = 1, etc.
    return startDay === 0 ? 6 : startDay - 1; // Align Mon as index 0
  };

  const getFestivalForDate = (day: number, month: number, year: number): Festival | undefined => {
    return FESTIVALS.find(f => {
      if (f.id === "nyepi" && day === 18 && month === 2 && year === 2026) return true;
      if (f.id === "pengrupukan" && day === 17 && month === 2 && year === 2026) return true;
      if (f.id === "galungan" && day === 17 && month === 5 && year === 2026) return true;
      if (f.id === "kuningan" && day === 27 && month === 5 && year === 2026) return true;
      if (f.id === "saraswati" && day === 22 && month === 7 && year === 2026) return true;
      if (f.id === "pagerwesi" && day === 26 && month === 7 && year === 2026) return true;
      return false;
    });
  };

  // Navigations
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  // Render Days Grid
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const startOffset = getStartDayOffset(currentMonth, currentYear);
  
  const totalCells = Math.ceil((daysInMonth + startOffset) / 7) * 7;
  const gridCells = [];

  // Prev Month padding
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const daysInPrevMonth = getDaysInMonth(prevMonth, prevYear);
  for (let i = startOffset - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    gridCells.push({ day, month: prevMonth, year: prevYear, isPadding: true });
  }

  // Current Month days
  for (let day = 1; day <= daysInMonth; day++) {
    gridCells.push({ day, month: currentMonth, year: currentYear, isPadding: false });
  }

  // Next Month padding
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  const nextPaddingCount = totalCells - gridCells.length;
  for (let day = 1; day <= nextPaddingCount; day++) {
    gridCells.push({ day, month: nextMonth, year: nextYear, isPadding: true });
  }

  // Tooltip coordinates logic
  const handleMouseMove = (e: React.MouseEvent) => {
    if (calendarRef.current) {
      const rect = calendarRef.current.getBoundingClientRect();
      setTooltipPos({
        x: e.clientX - rect.left + 15,
        y: e.clientY - rect.top + 15
      });
    }
  };

  // Color Mapping for Calendar Badges
  const getFestivalStyles = (festival: Festival) => {
    switch (festival.id) {
      case "nyepi":
        return {
          bg: "bg-primary/10 text-primary border border-primary/20",
          dot: "bg-primary",
          bgHover: "hover:bg-primary/20"
        };
      case "pengrupukan":
      case "pagerwesi":
        return {
          bg: "bg-accent/10 text-accent border border-accent/20",
          dot: "bg-accent",
          bgHover: "hover:bg-accent/20"
        };
      case "galungan":
      case "kuningan":
      case "saraswati":
      default:
        return {
          bg: "bg-secondary/15 text-[#9E731C] border border-secondary/20",
          dot: "bg-secondary",
          bgHover: "hover:bg-secondary/25"
        };
    }
  };

  return (
    <section id="calendar-section" className="py-16 md:py-24 bg-[#FFFFFF] border-y border-stone-200/40">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary bg-primary/10">
            Fitur Utama
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-black text-stone-800 tracking-tight">
            Kalender Interaktif Hari Raya
          </h2>
          <p className="mt-4 text-base text-stone-500">
            Pantau dan pelajari penanggalan hari raya besar Hindu Bali. Arahkan kursor untuk info ringkas, dan klik tanggal untuk mempelajari rangkaian upacara secara mendalam.
          </p>
        </div>

        {/* Calendar Grid & Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Column 1: Google Calendar style monthly grid */}
          <div ref={calendarRef} className="lg:col-span-7 flex flex-col relative bg-white border border-stone-200/60 rounded-3xl p-6 shadow-soft">
            
            {/* Calendar Header Controls */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <span className="p-2.5 bg-primary/5 text-primary rounded-xl">
                  <CalendarIcon size={20} />
                </span>
                <h3 className="text-xl md:text-2xl font-black text-stone-800 select-none">
                  {MONTH_NAMES[currentMonth]} {currentYear}
                </h3>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 rounded-xl border border-stone-200 hover:bg-stone-50 active:scale-95 transition-all text-stone-600"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => {
                    setCurrentMonth(5); // Reset to June 2026
                    setCurrentYear(2026);
                  }}
                  className="px-4 py-2 rounded-xl border border-stone-200 hover:bg-stone-50 active:scale-95 transition-all text-xs font-bold text-stone-600"
                >
                  Hari Ini
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-2 rounded-xl border border-stone-200 hover:bg-stone-50 active:scale-95 transition-all text-stone-600"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Days of Week Row */}
            <div className="grid grid-cols-7 gap-2 mb-4 text-center">
              {DAYS_OF_WEEK.map((day, idx) => (
                <div 
                  key={day} 
                  className={`text-xs font-bold uppercase tracking-wider py-2 select-none ${
                    idx === 5 || idx === 6 ? "text-accent" : "text-stone-400"
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Monthly Calendar Grid Cells */}
            <div className="grid grid-cols-7 gap-2 flex-1">
              {gridCells.map((cell, index) => {
                const festival = getFestivalForDate(cell.day, cell.month, cell.year);
                const isSelected = festival && selectedFestivalId === festival.id;
                const fStyles = festival ? getFestivalStyles(festival) : null;

                return (
                  <div
                    key={index}
                    onClick={() => festival && onSelectFestivalId(festival.id)}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => festival && setHoveredFestival(festival)}
                    onMouseLeave={() => setHoveredFestival(null)}
                    className={`relative min-h-[75px] md:min-h-[95px] p-2 rounded-2xl border transition-all duration-300 flex flex-col justify-between select-none ${
                      cell.isPadding 
                        ? "border-stone-100 bg-stone-50/20 text-stone-300 pointer-events-none" 
                        : "border-stone-100 hover:border-primary/20 bg-white text-stone-700"
                    } ${
                      festival ? "cursor-pointer" : "pointer-events-none"
                    } ${
                      isSelected ? "ring-2 ring-primary border-transparent bg-primary/[0.02]" : ""
                    }`}
                  >
                    {/* Day Number */}
                    <span 
                      className={`text-sm font-bold ${
                        cell.isPadding ? "text-stone-300" : "text-stone-700"
                      } ${
                        festival ? "text-primary-800" : ""
                      }`}
                    >
                      {cell.day}
                    </span>

                    {/* Festival Indicator Badge/Text (Google Calendar style) */}
                    {festival && fStyles && (
                      <div className={`mt-auto px-2 py-1 rounded-lg text-[9px] md:text-[10px] font-extrabold truncate w-full flex items-center gap-1.5 transition-colors ${fStyles.bg} ${fStyles.bgHover}`}>
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${fStyles.dot}`} />
                        <span className="truncate">{festival.name}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Floating Tooltip Hover */}
            {hoveredFestival && (
              <div
                style={{ top: tooltipPos.y, left: tooltipPos.x }}
                className="absolute z-50 p-4 w-60 rounded-xl bg-white shadow-medium border border-stone-200/40 pointer-events-none animate-fade-in-up"
              >
                <span className="text-[9px] uppercase font-bold tracking-wider text-secondary">
                  {hoveredFestival.category}
                </span>
                <h4 className="font-bold text-stone-800 text-sm mt-1">{hoveredFestival.name}</h4>
                <p className="text-[11px] text-stone-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {hoveredFestival.shortDesc}
                </p>
                <div className="flex items-center gap-1.5 mt-2.5 text-[10px] font-semibold text-primary">
                  <Clock size={11} />
                  <span>{hoveredFestival.date}</span>
                </div>
              </div>
            )}

          </div>

          {/* Column 2: Selected Festival Details Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#F8F5F0]/60 border border-stone-200/60 rounded-3xl p-8 relative overflow-hidden shadow-soft min-h-[500px]">
            
            {/* Background design accents */}
            <div className="absolute right-0 bottom-0 opacity-10 w-44 h-44 pointer-events-none translate-x-12 translate-y-12">
              <svg viewBox="0 0 100 100" fill="none" stroke="#8B5E3C" strokeWidth="1">
                <circle cx="50" cy="50" r="45" strokeDasharray="3 3" className="animate-spin-slow" />
                <circle cx="50" cy="50" r="35" />
                <circle cx="50" cy="50" r="25" strokeDasharray="1 1" />
              </svg>
            </div>

            {activeFestival ? (
              <div className="h-full flex flex-col justify-between z-10 animate-fade-in-up">
                <div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 border border-secondary/20">
                    {activeFestival.category}
                  </span>

                  <h3 className="mt-5 text-3xl font-black text-primary leading-tight">
                    {activeFestival.name}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-stone-500 font-semibold text-sm">
                    <CalendarIcon size={16} className="text-secondary" />
                    <span>{activeFestival.formattedDate}</span>
                  </div>

                  <p className="mt-6 text-stone-600 text-sm leading-relaxed border-t border-stone-200/50 pt-5">
                    {activeFestival.description}
                  </p>

                  {/* Ritual List */}
                  <div className="mt-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                      <BookOpen size={14} className="text-primary" />
                      Rangkaian Upacara Utama
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {activeFestival.rituals.map((ritual, idx) => (
                        <li key={idx} className="text-xs text-stone-600 flex items-start gap-2 leading-relaxed">
                          <span className="text-secondary shrink-0 mt-0.5 font-bold">▪</span>
                          <span>{ritual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-200/50">
                  <Link
                    href={`/${activeFestival.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-primary hover:bg-[#724D31] text-white px-6 py-4 font-bold text-sm shadow-soft transition-all duration-200 active:scale-98"
                  >
                    Pelajari Selengkapnya
                  </Link>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 z-10">
                <div className="w-16 h-16 rounded-2xl bg-white border border-stone-200/50 flex items-center justify-center text-stone-400 shadow-soft mb-6 animate-float">
                  <CalendarIcon size={28} className="text-[#C89B3C]" />
                </div>
                <h3 className="text-xl font-bold text-stone-800">
                  Detail Hari Raya
                </h3>
                <p className="text-stone-500 text-sm mt-3 max-w-xs leading-relaxed">
                  Pilih salah satu tanggal bertanda khusus pada kalender di samping untuk mempelajari rangkaian upacara dan makna budayanya secara mendetail.
                </p>
              </div>
            )}
            
          </div>

        </div>

      </div>
    </section>
  );
}
