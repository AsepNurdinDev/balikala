import SearchBar from "./SearchBar";
import HeroBackground from "./HeroBackground";

interface HeroProps {
  onSelectFestival?: (id: string) => void;
}

export default function Hero({ onSelectFestival }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Background gradients and glows */}
      <HeroBackground />

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Context, Titles, Search, & Badges */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-secondary bg-secondary/10 border border-secondary/20 shadow-soft">
              Platform Edukasi Budaya Bali
            </span>

            <h1 className="mt-6 text-6xl md:text-8xl font-black tracking-tight text-primary leading-none">
              BaliKala
            </h1>

            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-stone-800 leading-tight">
              Jelajahi Hari Raya Besar Hindu di Bali secara Interaktif.
            </h2>

            <p className="mt-6 text-base md:text-lg leading-relaxed text-stone-600 max-w-xl">
              BaliKala adalah media edukasi digital yang merayakan dan melestarikan budaya Bali. Temukan filosofi, kalender rincian ritual, dan makna mendalam di balik hari-hari suci kami.
            </p>

            <div className="mt-8 w-full">
              <SearchBar onSelectFestival={onSelectFestival} />
            </div>

            {/* Checkmarked Feature Badges */}
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-stone-700">
              <span className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold">✓</span>
                Kalender Interaktif
              </span>
              <span className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold">✓</span>
                Informasi Terpercaya
              </span>
              <span className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold">✓</span>
                Edukasi & Pelestarian
              </span>
            </div>
          </div>

          {/* Right Column: Custom Balinese Flat Illustration */}
          <div className="lg:col-span-5 flex justify-center items-center relative animate-float">
            <div className="relative w-full max-w-md md:max-w-lg aspect-square">
              {/* Outer Glow behind the illustration */}
              <div className="absolute inset-0 rounded-full bg-secondary/15 blur-3xl -z-10 scale-90" />
              
              <svg 
                viewBox="0 0 600 500" 
                className="w-full h-auto drop-shadow-medium filter select-none" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Sky Sun Glow */}
                <circle cx="300" cy="220" r="130" fill="url(#sun-grad)" className="animate-breathe" />
                
                {/* Background clouds */}
                <path d="M80 180 C80 165 110 155 125 165 C132 155 150 155 158 165 C165 160 178 165 178 178 L178 180 Z" fill="white" opacity="0.3" className="animate-float" />
                <path d="M440 140 C440 128 464 120 476 128 C482 120 496 120 502 128 C508 124 518 128 518 138 L518 140 Z" fill="white" opacity="0.25" className="animate-float-reverse" />
                
                {/* Gunung Agung Peak (Back) */}
                <path d="M120 420 L320 160 L520 420 Z" fill="url(#mount-back)" />
                <path d="M320 160 L290 220 L330 250 L300 310 L330 360 L320 160" fill="rgba(255,255,255,0.08)" />

                {/* Gunung Agung Peak (Front-Left) */}
                <path d="M50 420 L210 230 L370 420 Z" fill="url(#mount-front)" opacity="0.85" />
                
                {/* Midground clouds */}
                <path d="M260 260 C260 250 280 240 292 248 C298 240 310 240 315 248 C320 245 330 248 330 258 L330 260 Z" fill="white" opacity="0.45" className="animate-float" />

                {/* Traditional Balinese Meru Shrine (Temple) */}
                <g transform="translate(320, 150)">
                  {/* Base/Foundation */}
                  <rect x="50" y="240" width="100" height="30" rx="4" fill="#724D31" />
                  <rect x="60" y="225" width="80" height="15" rx="3" fill="#8B5E3C" />
                  <rect x="70" y="215" width="60" height="10" rx="2" fill="#C89B3C" />
                  
                  {/* Meru Roof Tiers */}
                  {/* Tier 1 */}
                  <path d="M40 215 L100 180 L160 215 Z" fill="#202020" stroke="#C89B3C" strokeWidth="1" />
                  <rect x="85" y="174" width="30" height="8" fill="#724D31" />
                  
                  {/* Tier 2 */}
                  <path d="M50 174 L100 148 L150 174 Z" fill="#202020" stroke="#C89B3C" strokeWidth="1" />
                  <rect x="88" y="142" width="24" height="8" fill="#724D31" />

                  {/* Tier 3 */}
                  <path d="M60 142 L100 120 L140 142 Z" fill="#202020" stroke="#C89B3C" strokeWidth="1" />
                  <rect x="90" y="115" width="20" height="7" fill="#724D31" />

                  {/* Tier 4 */}
                  <path d="M70 115 L100 98 L130 115 Z" fill="#202020" stroke="#C89B3C" strokeWidth="1" />
                  <rect x="93" y="93" width="14" height="6" fill="#724D31" />

                  {/* Tier 5 */}
                  <path d="M80 93 L100 80 L120 93 Z" fill="#202020" stroke="#C89B3C" strokeWidth="1" />
                  
                  {/* Top Pinnacle / Murda */}
                  <circle cx="100" cy="74" r="5" fill="#C89B3C" />
                  <line x1="100" y1="74" x2="100" y2="60" stroke="#C89B3C" strokeWidth="1.5" />
                </g>

                {/* Palms and foliage in foreground */}
                {/* Palm Left */}
                <path d="M80 430 Q105 340 135 290" stroke="#724D31" strokeWidth="8" strokeLinecap="round" />
                <path d="M135 290 Q160 270 190 280" stroke="#8B5E3C" strokeWidth="4" strokeLinecap="round" />
                <path d="M135 290 Q170 300 195 320" stroke="#8B5E3C" strokeWidth="4" strokeLinecap="round" />
                <path d="M135 290 Q120 250 125 230" stroke="#8B5E3C" strokeWidth="4" strokeLinecap="round" />
                <path d="M135 290 Q100 270 85 260" stroke="#8B5E3C" strokeWidth="4" strokeLinecap="round" />

                {/* Palm Right */}
                <path d="M510 430 Q490 350 455 295" stroke="#724D31" strokeWidth="9" strokeLinecap="round" />
                <path d="M455 295 Q420 275 390 290" stroke="#8B5E3C" strokeWidth="4" strokeLinecap="round" />
                <path d="M455 295 Q415 315 395 345" stroke="#8B5E3C" strokeWidth="4" strokeLinecap="round" />
                <path d="M455 295 Q470 255 450 235" stroke="#8B5E3C" strokeWidth="4" strokeLinecap="round" />
                <path d="M455 295 Q490 270 515 260" stroke="#8B5E3C" strokeWidth="4" strokeLinecap="round" />

                {/* Traditional gold Balinese patterns floating/accentuating */}
                <path d="M30 60 Q50 30 70 60 T110 60" stroke="#C89B3C" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                <path d="M570 60 Q550 30 530 60 T490 60" stroke="#C89B3C" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />

                {/* Ground */}
                <rect x="0" y="415" width="600" height="85" fill="#F8F5F0" />
                <path d="M0 425 C150 415 450 435 600 425 L600 500 L0 500 Z" fill="#EFE6DA" />
                <path d="M0 435 C200 430 400 440 600 435 L600 500 L0 500 Z" fill="#D7C1A3" opacity="0.5" />

                {/* Gradients */}
                <defs>
                  <linearGradient id="sun-grad" x1="300" y1="90" x2="300" y2="350" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#C89B3C" stopOpacity="0.55" />
                    <stop offset="60%" stopColor="#EFE6DA" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#F8F5F0" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="mount-back" x1="320" y1="160" x2="320" y2="420" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#D7C1A3" />
                    <stop offset="100%" stopColor="#8B5E3C" />
                  </linearGradient>
                  <linearGradient id="mount-front" x1="210" y1="230" x2="210" y2="420" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor ="#EFE6DA" />
                    <stop offset="100%" stopColor="#724D31" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}