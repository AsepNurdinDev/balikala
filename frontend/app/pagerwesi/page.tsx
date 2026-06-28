"use client";

import Navbar from "../beranda/components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import JourneyProgress from "./components/Journey/JourneyProgress";
import AboutSection from "./components/AboutSection";
import FortressSection from "./components/Fortress/FortressSection";
import SymbolGrid from "./components/Symbols/SymbolGrid";
import CeremonyTimeline from "./components/Ceremony/CeremonyTimeline";
import Reflection from "./components/Reflection/Reflection";
import CommentSection from "./components/Comment/CommentSection";
import Footer from "../beranda/components/Footer/Footer";

export default function PagerwesiPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Global BaliKala Navbar */}
      <Navbar />

      {/* Floating Scroll Progress Tracker (Desktop Sidebar) */}
      <JourneyProgress />

      <main className="flex-grow">
        {/* Section 1: Hero */}
        <div id="hero">
          <Hero />
        </div>

        {/* Section 2: Apa itu Pagerwesi */}
        <AboutSection />

        {/* Section 3: Benteng Diri Interactive */}
        <FortressSection />

        {/* Section 4: Makna Simbol Flip Cards */}
        <SymbolGrid />

        {/* Section 5: Rangkaian Upacara Timeline */}
        <CeremonyTimeline />

        {/* Section 6: Refleksi Diri */}
        <Reflection />

        {/* Section 8: Kolom Komentar */}
        <CommentSection />
      </main>

      {/* Global BaliKala Footer */}
      <Footer />
    </div>
  );
}
