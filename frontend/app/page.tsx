"use client";

import { useState } from "react";
import Navbar from "./beranda/components/Navbar/Navbar";
import Hero from "./beranda/components/Hero/Hero";
import Calendar from "./beranda/components/Calendar/Calendar";
import UpcomingFestival from "./beranda/components/UpcomingFestival/UpcomingFestival";
import FestivalSlider from "./beranda/components/FestivalSlider/FestivalSlider";
import Footer from "./beranda/components/Footer/Footer";

export default function Home() {
  const [selectedFestivalId, setSelectedFestivalId] = useState<string | null>(null);

  const handleSelectFestival = (id: string) => {
    setSelectedFestivalId(id);
  };

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero Section with Search bar */}
        <Hero onSelectFestival={handleSelectFestival} />

        {/* Dynamic Countdown of nearest upcoming festival */}
        <UpcomingFestival onSelectFestivalId={handleSelectFestival} />

        {/* Interactive Google Calendar with side information card */}
        <Calendar 
          selectedFestivalId={selectedFestivalId} 
          onSelectFestivalId={handleSelectFestival} 
        />

        {/* Netflix-style horizontal carousel explorer */}
        <FestivalSlider onSelectFestivalId={handleSelectFestival} />
      </main>

      <Footer />
    </>
  );
}