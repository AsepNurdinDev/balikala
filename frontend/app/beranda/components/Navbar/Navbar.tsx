"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hariRayaOptions = [
    { title: "Nyepi", href: "/nyepi" },
    { title: "Galungan dan Kuningan", href: "/galunganKuningan" },
    { title: "Pagerwesi", href: "/pagerwesi" },
    { title: "Saraswati", href: "/saraswati" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-stone-200/40 py-4 shadow-soft"
          : "bg-transparent py-6 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-wide text-primary transition-transform duration-300 hover:scale-[1.02] flex items-center gap-2"
        >
          <span className="bg-primary text-white w-9 h-9 rounded-xl flex items-center justify-center font-serif text-lg shadow-sm border border-secondary/20">B</span>
          <span className="font-sans font-extrabold text-primary">Bali<span className="text-secondary">Kala</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="font-medium text-stone-600 hover:text-primary transition relative group py-2"
          >
            Beranda
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Hari Raya Dropdown */}
          <div 
            className="relative group py-2"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className="font-medium text-stone-600 hover:text-primary transition flex items-center gap-1 cursor-pointer py-1"
            >
              Hari Raya
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            
            <div
              className={`absolute left-0 mt-2 w-56 rounded-2xl bg-white border border-stone-200/60 shadow-lg py-2 transition-all duration-200 origin-top-left z-50 ${
                dropdownOpen 
                  ? "opacity-100 scale-100 translate-y-0 visible" 
                  : "opacity-0 scale-95 -translate-y-2 invisible"
              }`}
            >
              {hariRayaOptions.map((option) => (
                <Link
                  key={option.title}
                  href={option.href}
                  className="block px-4 py-3 text-sm text-stone-600 hover:text-primary hover:bg-stone-50 transition-colors font-semibold"
                >
                  {option.title}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/#calendar-section"
            className="font-medium text-stone-600 hover:text-primary transition relative group py-2"
          >
            Kalender
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
      </div>
    </header>
  );
}