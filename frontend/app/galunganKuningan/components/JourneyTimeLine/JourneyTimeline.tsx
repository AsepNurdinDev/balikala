"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Calendar, BookOpen, Shield } from "lucide-react";

interface Checkpoint {
  id: string;
  name: string;
  subtitle: string;
  icon: any;
}

const CHECKPOINTS: Checkpoint[] = [
  {
    id: "penampahan-section",
    name: "Penampahan",
    subtitle: "Persiapan Suci",
    icon: Sparkles
  },
  {
    id: "galungan-section",
    name: "Galungan",
    subtitle: "Kemenangan Dharma",
    icon: Calendar
  },
  {
    id: "toward-kuningan-section",
    name: "Menuju Kuningan",
    subtitle: "10 Hari Transisi",
    icon: BookOpen
  },
  {
    id: "kuningan-section",
    name: "Kuningan",
    subtitle: "Berkah Leluhur",
    icon: Shield
  }
];

interface JourneyTimelineProps {
  activeSection: string;
  scrollProgress: number;
  onNavigate: (id: string) => void;
}

export default function JourneyTimeline({
  activeSection,
  scrollProgress,
  onNavigate
}: JourneyTimelineProps) {
  // Helper to determine if a checkpoint is active or completed
  const getCheckpointState = (id: string, index: number) => {
    const activeIndex = CHECKPOINTS.findIndex((cp) => cp.id === activeSection);
    
    if (activeSection === id) {
      return "active";
    }
    if (activeIndex > index) {
      return "completed";
    }
    return "pending";
  };

  return (
    <div
      id="journey-timeline-section"
      className="sticky top-20 z-40 w-full px-6 py-4 bg-white/70 backdrop-blur-md border-b border-stone-200/50 shadow-soft"
    >
      <div className="max-w-5xl mx-auto relative flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Track Line Background */}
        <div className="absolute top-[22px] left-8 right-8 h-1 bg-stone-200 rounded-full hidden md:block z-0">
          {/* Progress Fill */}
          <motion.div
            className="h-full bg-gradient-to-r from-[#8B5E3C] to-[#C89B3C] rounded-full"
            style={{ width: `${scrollProgress}%` }}
            layoutId="timeline-progress-bar"
          />
        </div>

        {/* Checkpoints */}
        {CHECKPOINTS.map((checkpoint, index) => {
          const state = getCheckpointState(checkpoint.id, index);
          const Icon = checkpoint.icon;

          return (
            <button
              key={checkpoint.id}
              onClick={() => onNavigate(checkpoint.id)}
              className="flex items-center gap-3 md:flex-col md:text-center w-full md:w-auto relative z-10 group cursor-pointer focus:outline-none"
            >
              {/* Checkpoint Node circle */}
              <div className="relative">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    state === "completed"
                      ? "bg-[#8B5E3C] border-[#8B5E3C] text-white shadow-soft"
                      : state === "active"
                      ? "bg-white border-[#C89B3C] text-[#C89B3C] ring-4 ring-[#C89B3C]/10 shadow-medium"
                      : "bg-white border-stone-200 text-stone-400 group-hover:border-stone-300"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {state === "completed" ? (
                    <Check size={16} strokeWidth={3} />
                  ) : (
                    <Icon size={16} />
                  )}
                </motion.div>

                {/* Pulsing halo around active node */}
                {state === "active" && (
                  <span className="absolute -inset-1 rounded-full border border-[#C89B3C] animate-ping opacity-30 pointer-events-none" />
                )}
              </div>

              {/* Texts */}
              <div className="text-left md:text-center flex flex-col">
                <span
                  className={`text-xs md:text-sm font-bold tracking-tight transition-colors duration-200 ${
                    state === "active"
                      ? "text-[#8B5E3C]"
                      : state === "completed"
                      ? "text-stone-850"
                      : "text-stone-500 group-hover:text-stone-700"
                  }`}
                >
                  {checkpoint.name}
                </span>
                <span className="text-[10px] text-stone-400 font-semibold md:mt-0.5">
                  {checkpoint.subtitle}
                </span>
              </div>
            </button>
          );
        })}

      </div>
    </div>
  );
}
