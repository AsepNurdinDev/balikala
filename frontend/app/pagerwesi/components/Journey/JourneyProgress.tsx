"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Step {
  id: string;
  label: string;
}

const steps: Step[] = [
  { id: "hero", label: "Hero" },
  { id: "about-pagerwesi", label: "Apa itu Pagerwesi" },
  { id: "fortress-section", label: "Benteng Diri" },
  { id: "symbols-section", label: "Makna Simbol" },
  { id: "ceremony-section", label: "Rangkaian Upacara" },
  { id: "reflection-section", label: "Refleksi Diri" },
  { id: "comments-section", label: "Komentar" },
];

export default function JourneyProgress() {
  const [activeSection, setActiveSection] = useState<string>("hero");
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
      let currentActive = "hero";

      for (const step of steps) {
        const element = document.getElementById(step.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section has scrolled past the top/middle of the viewport
          if (rect.top <= viewportMiddle) {
            currentActive = step.id;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
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
      <div className="relative w-1.5 h-56 bg-stone-200/50 rounded-full overflow-hidden self-center border border-stone-300/10">
        {/* Active progress bar inside line */}
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-secondary to-secondary shadow-[0_0_10px_#C89B3C] transition-all duration-150 ease-out"
          style={{ height: `${scrollPercentage}%` }}
        />
      </div>

      {/* Steps List */}
      <div className="flex flex-col justify-between h-64 py-1 items-end">
        {steps.map((step) => {
          const isActive = activeSection === step.id;
          return (
            <button
              key={step.id}
              onClick={() => handleStepClick(step.id)}
              className="flex flex-row-reverse items-center gap-3 text-right group cursor-pointer"
            >
              {/* Node Indicator */}
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? "bg-secondary border-secondary scale-125 shadow-[0_0_8px_#C89B3C]"
                      : "bg-white border-stone-300 group-hover:border-primary group-hover:scale-110"
                  }`}
                />
                {isActive && (
                  <span className="absolute w-5 h-5 rounded-full border border-secondary/40 animate-ping pointer-events-none" />
                )}
              </div>

              {/* Label */}
              <span
                className={`text-xs font-semibold tracking-wide uppercase transition-all duration-300 ${
                  isActive
                    ? "text-primary -translate-x-1"
                    : "text-stone-400 group-hover:text-stone-600"
                }`}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
