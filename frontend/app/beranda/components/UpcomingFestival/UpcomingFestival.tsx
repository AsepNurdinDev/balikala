"use client";

import { useEffect, useState } from "react";
import { FESTIVALS, Festival } from "../../data/festivals";
import { Clock, ArrowRight, Award } from "lucide-react";

interface UpcomingFestivalProps {
  onSelectFestivalId: (id: string) => void;
}

export default function UpcomingFestival({ onSelectFestivalId }: UpcomingFestivalProps) {
  const [upcoming, setUpcoming] = useState<Festival | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);

  // Find the next upcoming festival
  useEffect(() => {
    setIsClient(true);
    const now = new Date();
    // Sort festivals by nextDate
    const sorted = [...FESTIVALS].sort((a, b) => new Date(a.nextDate).getTime() - new Date(b.nextDate).getTime());
    // Find the first festival where nextDate is in the future
    const next = sorted.find(f => new Date(f.nextDate) > now) || sorted[0]; // fallback to first if all in past
    setUpcoming(next);
  }, []);

  // Update countdown every second
  useEffect(() => {
    if (!upcoming) return;

    const targetTime = new Date(upcoming.nextDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [upcoming]);

  if (!isClient || !upcoming) {
    // Elegant loading skeletons matching design aesthetics
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="w-full h-80 rounded-3xl bg-white border border-stone-200/50 animate-pulse" />
      </div>
    );
  }

  // Action: select this festival and scroll to calendar section
  const handleExplore = () => {
    onSelectFestivalId(upcoming.id);
    const element = document.getElementById("calendar-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Render thematic festival SVGs
  const renderFestivalIllustration = (type: string) => {
    switch (type) {
      case "nyepi":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full select-none drop-shadow-soft">
            <circle cx="100" cy="100" r="80" fill="url(#nyepi-circle-grad)" />
            <path d="M120 60 C80 60 70 100 70 110 C70 140 100 150 120 140 C100 140 85 125 85 110 C85 95 100 70 120 60 Z" fill="#C89B3C" className="animate-breathe" />
            <circle cx="70" cy="70" r="1.5" fill="white" opacity="0.8" />
            <circle cx="130" cy="130" r="1.5" fill="white" opacity="0.6" />
            <circle cx="140" cy="80" r="2" fill="white" opacity="0.9" />
            <circle cx="60" cy="120" r="1" fill="white" opacity="0.5" />
            <defs>
              <linearGradient id="nyepi-circle-grad" x1="20" y1="20" x2="180" y2="180">
                <stop offset="0%" stopColor="#1E1B4B" />
                <stop offset="100%" stopColor="#312E81" />
              </linearGradient>
            </defs>
          </svg>
        );
      case "pengrupukan":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full select-none drop-shadow-soft">
            <circle cx="100" cy="100" r="80" fill="url(#prup-circle-grad)" />
            <path d="M100 40 Q115 70 100 95 Q85 120 105 160 Q80 135 85 105 Q90 75 75 60 Z" fill="#A61E2D" className="animate-float" />
            <path d="M105 60 Q120 85 110 105 Q100 125 115 155 Q95 135 100 115 Q105 95 95 80 Z" fill="#C89B3C" className="animate-float-reverse" />
            <defs>
              <linearGradient id="prup-circle-grad" x1="20" y1="20" x2="180" y2="180">
                <stop offset="0%" stopColor="#450A0A" />
                <stop offset="100%" stopColor="#881337" />
              </linearGradient>
            </defs>
          </svg>
        );
      case "galungan":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full select-none drop-shadow-soft">
            <circle cx="100" cy="100" r="80" fill="url(#gal-circle-grad)" />
            {/* Penjor bamboo curve */}
            <path d="M60 170 Q75 60 120 50 Q135 48 140 55 Q145 62 135 70 Q120 75 110 70" fill="none" stroke="#C89B3C" strokeWidth="5" strokeLinecap="round" />
            {/* Hanging decorations (sampian) */}
            <path d="M135 70 L138 95 L132 110 L135 70" fill="#EFE6DA" stroke="#8B5E3C" strokeWidth="1.5" />
            <circle cx="132" cy="110" r="3" fill="#A61E2D" />
            <defs>
              <linearGradient id="gal-circle-grad" x1="20" y1="20" x2="180" y2="180">
                <stop offset="0%" stopColor="#78350F" />
                <stop offset="100%" stopColor="#92400E" />
              </linearGradient>
            </defs>
          </svg>
        );
      case "kuningan":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full select-none drop-shadow-soft">
            <circle cx="100" cy="100" r="80" fill="url(#kun-circle-grad)" />
            {/* Tamiang (shield) */}
            <circle cx="100" cy="100" r="35" fill="none" stroke="#C89B3C" strokeWidth="4" />
            <circle cx="100" cy="100" r="25" fill="none" stroke="#C89B3C" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="10" fill="#C89B3C" />
            {/* Radiant lines */}
            <line x1="100" y1="55" x2="100" y2="145" stroke="#C89B3C" strokeWidth="2.5" />
            <line x1="55" y1="100" x2="145" y2="100" stroke="#C89B3C" strokeWidth="2.5" />
            <line x1="68" y1="68" x2="132" y2="132" stroke="#C89B3C" strokeWidth="1.5" />
            <line x1="132" y1="68" x2="68" y2="132" stroke="#C89B3C" strokeWidth="1.5" />
            <defs>
              <linearGradient id="kun-circle-grad" x1="20" y1="20" x2="180" y2="180">
                <stop offset="0%" stopColor="#713F12" />
                <stop offset="100%" stopColor="#CA8A04" />
              </linearGradient>
            </defs>
          </svg>
        );
      case "saraswati":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full select-none drop-shadow-soft">
            <circle cx="100" cy="100" r="80" fill="url(#sara-circle-grad)" />
            {/* Sacred Lotus */}
            <path d="M100 130 C75 130 65 110 65 100 C65 80 100 65 100 65 C100 65 135 80 135 100 C135 110 125 130 100 130 Z" fill="#EFE6DA" opacity="0.9" />
            <path d="M100 130 C85 130 75 115 75 105 C75 90 100 75 100 75 C100 75 125 90 125 105 C125 115 115 130 100 130 Z" fill="#8B5E3C" opacity="0.3" />
            <path d="M100 130 C90 130 85 120 85 112 C85 100 100 90 100 90 C100 90 115 100 115 112 C115 120 110 130 100 130 Z" fill="#C89B3C" className="animate-breathe" />
            {/* Sparkles of wisdom */}
            <circle cx="65" cy="75" r="2" fill="#C89B3C" className="animate-float" />
            <circle cx="135" cy="70" r="2.5" fill="#C89B3C" className="animate-float-reverse" />
            <defs>
              <linearGradient id="sara-circle-grad" x1="20" y1="20" x2="180" y2="180">
                <stop offset="0%" stopColor="#064E3B" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>
          </svg>
        );
      case "pagerwesi":
      default:
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full select-none drop-shadow-soft">
            <circle cx="100" cy="100" r="80" fill="url(#page-circle-grad)" />
            {/* Gateway / Iron fence symbol */}
            <rect x="75" y="60" width="12" height="90" rx="3" fill="#C89B3C" />
            <rect x="113" y="60" width="12" height="90" rx="3" fill="#C89B3C" />
            <rect x="65" y="80" width="70" height="8" rx="2" fill="#8B5E3C" />
            <rect x="65" y="115" width="70" height="8" rx="2" fill="#8B5E3C" />
            {/* Center diamond shield */}
            <path d="M100 75 L118 97 L100 120 L82 97 Z" fill="#A61E2D" className="animate-breathe" />
            <defs>
              <linearGradient id="page-circle-grad" x1="20" y1="20" x2="180" y2="180">
                <stop offset="0%" stopColor="#1C1917" />
                <stop offset="100%" stopColor="#44403C" />
              </linearGradient>
            </defs>
          </svg>
        );
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#F8F5F0]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-accent bg-accent/10">
              Perayaan Mendatang
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-black text-stone-800 tracking-tight">
              Hari Raya Berikutnya
            </h2>
          </div>
          <p className="text-stone-500 max-w-md text-sm md:text-base">
            Persiapkan diri menyambut perayaan adat dan spiritual Hindu Bali terdekat. Simak hitung mundur waktu pelaksanaannya.
          </p>
        </div>

        {/* Spotlight Card */}
        <div className="relative overflow-hidden rounded-3xl bg-white border border-stone-200/50 shadow-medium p-8 md:p-12">
          
          {/* Subtle patterned overlay background */}
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#8B5E3C_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Column: Text & Ticking Countdown */}
            <div className="lg:col-span-8 flex flex-col items-start">
              
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-primary bg-primary/5 border border-primary/10 mb-6">
                <Award size={13} className="text-secondary" />
                Sasih / Pawukon Terdekat
              </span>

              <h3 className="text-4xl md:text-5xl font-black text-primary leading-tight">
                {upcoming.name}
              </h3>

              <p className="text-stone-500 font-semibold mt-3 text-base flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                {upcoming.formattedDate} — <span className="text-stone-400 font-normal">{upcoming.category}</span>
              </p>

              <p className="mt-6 text-stone-600 text-base leading-relaxed max-w-2xl">
                {upcoming.shortDesc} {upcoming.description.slice(0, 150)}...
              </p>

              {/* Countdown Ticker */}
              <div className="mt-10 flex flex-wrap gap-4 w-full">
                
                {/* Days */}
                <div className="flex-1 min-w-[75px] max-w-[110px] bg-[#F8F5F0] border border-stone-200/40 rounded-2xl p-4 flex flex-col items-center justify-center shadow-soft">
                  <span className="text-3xl md:text-4xl font-extrabold text-stone-800">
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] md:text-xs uppercase tracking-wider text-stone-400 font-bold mt-1.5">
                    Hari
                  </span>
                </div>

                {/* Hours */}
                <div className="flex-1 min-w-[75px] max-w-[110px] bg-[#F8F5F0] border border-stone-200/40 rounded-2xl p-4 flex flex-col items-center justify-center shadow-soft">
                  <span className="text-3xl md:text-4xl font-extrabold text-stone-800">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] md:text-xs uppercase tracking-wider text-stone-400 font-bold mt-1.5">
                    Jam
                  </span>
                </div>

                {/* Minutes */}
                <div className="flex-1 min-w-[75px] max-w-[110px] bg-[#F8F5F0] border border-stone-200/40 rounded-2xl p-4 flex flex-col items-center justify-center shadow-soft">
                  <span className="text-3xl md:text-4xl font-extrabold text-stone-800">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] md:text-xs uppercase tracking-wider text-stone-400 font-bold mt-1.5">
                    Menit
                  </span>
                </div>

                {/* Seconds */}
                <div className="flex-1 min-w-[75px] max-w-[110px] bg-[#F8F5F0] border border-stone-200/40 rounded-2xl p-4 flex flex-col items-center justify-center shadow-soft">
                  <span className="text-3xl md:text-4xl font-extrabold text-accent">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] md:text-xs uppercase tracking-wider text-stone-400 font-bold mt-1.5">
                    Detik
                  </span>
                </div>

              </div>

              {/* Action Button */}
              <button
                onClick={handleExplore}
                className="mt-10 inline-flex items-center gap-2.5 rounded-2xl bg-primary hover:bg-[#724D31] text-white px-7 py-4 font-bold text-sm shadow-soft transition-all duration-200 active:scale-97 group"
              >
                Pelajari Hari Raya Ini
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </button>

            </div>

            {/* Right Column: Dynamic SVG Illustration */}
            <div className="lg:col-span-4 flex justify-center items-center">
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-3xl bg-[#F8F5F0] border border-stone-200/40 p-6 shadow-soft flex items-center justify-center animate-float">
                {renderFestivalIllustration(upcoming.illustrationType)}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
