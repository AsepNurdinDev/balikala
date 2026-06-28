"use client";

import { useEffect, useState } from "react";
import JourneyItem from "./JourneyItem";

interface Step {
  id: string;
  label: string;
}

const steps: Step[] = [
  { id: "hero-section", label: "Hero" },
  { id: "about-section", label: "Pengenalan" },
  { id: "explorer-section", label: "Simbol" },
  { id: "ceremony-section", label: "Prosesi" },
  { id: "philosophy-section", label: "Makna" },
  { id: "comments-section", label: "Komentar" },
];

export default function JourneyTimeline() {
  const [activeSection, setActiveSection] = useState<string>("hero-section");
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll percentage of the total page
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollPercentage(scrolled);

      // Determine active section based on viewport position
      const viewportMiddle = window.innerHeight / 3;
      let currentActive = "hero-section";

      for (const step of steps) {
        const element = document.getElementById(step.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= viewportMiddle) {
            currentActive = step.id;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStepClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden 2xl:flex flex-row-reverse items-center gap-4 select-none">
      {/* Vertical line container */}
      <div className="relative w-1 h-56 bg-slate-200/50 rounded-full overflow-hidden self-center border border-slate-300/10">
        {/* Active progress bar inside line */}
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-600 via-blue-500 to-amber-400 shadow-[0_0_8px_#2563EB] transition-all duration-150 ease-out"
          style={{ height: `${scrollPercentage}%` }}
        />
      </div>

      {/* Steps List */}
      <div className="flex flex-col justify-between h-64 py-1 items-end">
        {steps.map((step) => (
          <JourneyItem
            key={step.id}
            id={step.id}
            label={step.label}
            isActive={activeSection === step.id}
            onClick={() => handleStepClick(step.id)}
          />
        ))}
      </div>
    </div>
  );
}
