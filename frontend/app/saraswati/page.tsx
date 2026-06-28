"use client";

import Navbar from "../beranda/components/Navbar/Navbar";
import Footer from "../beranda/components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import JourneyTimeline from "./components/Journey/JourneyTimeline";
import AboutSaraswati from "./components/About/AboutSaraswati";
import GoddessExplorer from "./components/GoddessExplorer/GoddessExplorer";
import CeremonyTimeline from "./components/Ceremony/CeremonyTimeline";
import Philosophy from "./components/Philosophy/Philosophy";
import CommentSection from "./components/Comment/CommentSection";

export default function SaraswatiPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Global BaliKala Navbar */}
      <Navbar />

      {/* Floating Scroll Progress Tracker (Desktop Sidebar) */}
      <JourneyTimeline />

      <main className="flex-grow">
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Apa itu Hari Raya Saraswati */}
        <AboutSaraswati />

        {/* Section 3: Explore Dewi Saraswati (3D Museum) */}
        <GoddessExplorer />

        {/* Section 4: Prosesi Hari Raya */}
        <CeremonyTimeline />

        {/* Section 5: Makna & Nilai */}
        <Philosophy />

        {/* Section 6: Komentar */}
        <CommentSection />
      </main>

      {/* Global BaliKala Footer */}
      <Footer />
    </div>
  );
}
