"use client";

import Navbar from "../beranda/components/Navbar/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Timeline from "./components/Timeline";
import OgohViewer from "./components/OgohViewer";
import CaturBrata from "./components/CaturBrata";
import Gallery from "./components/Gallery";
import References from "./components/References";
import Footer from "../beranda/components/Footer/Footer";

export default function NyepiPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Global BaliKala Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* Section 1: Hero Intro */}
        <Hero />

        {/* Section 2: About Nyepi & Card Makna */}
        <About />

        {/* Section 3: Timeline Rangkaian Hari Raya */}
        <Timeline />

        {/* Section 4: Ogoh-Ogoh 3D Viewer Showcase */}
        <OgohViewer />

        {/* Section 5: Catur Brata Penyepian Card Grid */}
        <CaturBrata />

        {/* Section 6: Image Gallery Masonry */}
        <Gallery />

        {/* Section 7: Scientific References */}
        <References />
      </main>

      {/* Global BaliKala Footer */}
      <Footer />
    </div>
  );
}