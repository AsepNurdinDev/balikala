"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const menus = [
  { title: "Beranda", href: "/" },
  { title: "Hari Raya", href: "/hari-raya" },
  { title: "Kalender", href: "/kalender" },
  { title: "Tentang", href: "/tentang" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-stone-200/40 py-4 shadow-soft"
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
          {menus.map((menu) => (
            <Link
              key={menu.title}
              href={menu.href}
              className="font-medium text-stone-600 hover:text-primary transition relative group py-2"
            >
              {menu.title}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        
      </div>
    </header>
  );
}