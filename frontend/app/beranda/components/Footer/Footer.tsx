"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-stone-200/40 relative overflow-hidden mt-auto">
      {/* Decorative Gold line accent */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-accent" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo and Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link
              href="/"
              className="text-xl font-extrabold tracking-wide text-primary flex items-center gap-2"
            >
              <span className="bg-primary text-white w-8 h-8 rounded-lg flex items-center justify-center font-serif text-base shadow-sm border border-secondary/20">B</span>
              <span className="font-sans font-extrabold text-primary">Bali<span className="text-secondary">Kala</span></span>
            </Link>
            <p className="mt-3 text-xs text-stone-400 max-w-xs leading-relaxed">
              Platform Informasi & Edukasi Hari Raya Besar Hindu di Bali. Media pelestarian adat dan budaya leluhur Bali.
            </p>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3">
            <Link href="/" className="text-xs font-semibold text-stone-500 hover:text-primary transition">
              Beranda
            </Link>
            <Link href="/nyepi" className="text-xs font-semibold text-stone-500 hover:text-primary transition">
              Nyepi
            </Link>
            <Link href="/galunganKuningan" className="text-xs font-semibold text-stone-500 hover:text-primary transition">
              Galungan & Kuningan
            </Link>
            <Link href="/pagerwesi" className="text-xs font-semibold text-stone-500 hover:text-primary transition">
              Pagerwesi
            </Link>
            <Link href="/saraswati" className="text-xs font-semibold text-stone-500 hover:text-primary transition">
              Saraswati
            </Link>
            <Link href="/#calendar-section" className="text-xs font-semibold text-stone-500 hover:text-primary transition">
              Kalender
            </Link>
            <Link href="/blog" className="text-xs font-semibold text-stone-500 hover:text-primary transition">
              Blog
            </Link>
            <Link href="/admin/login" className="text-xs font-semibold text-stone-500 hover:text-primary transition">
              Admin Panel
            </Link>
          </nav>

          {/* Socials / Admin Link */}
          <div className="text-xs font-semibold text-stone-400">
            © {new Date().getFullYear()} BaliKala. Hak Cipta Dilindungi.
          </div>

        </div>
      </div>
    </footer>
  );
}
