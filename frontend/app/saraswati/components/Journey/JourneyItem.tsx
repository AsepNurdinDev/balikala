"use client";

interface JourneyItemProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function JourneyItem({ label, isActive, onClick }: JourneyItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-row-reverse items-center gap-3 text-right group cursor-pointer outline-none"
    >
      {/* Node Indicator */}
      <div className="relative flex items-center justify-center">
        <div
          className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
            isActive
              ? "bg-blue-650 border-blue-650 scale-125 shadow-[0_0_8px_#2563EB]"
              : "bg-white border-slate-300 group-hover:border-blue-600 group-hover:scale-110"
          }`}
        />
        {isActive && (
          <span className="absolute w-5 h-5 rounded-full border border-blue-650/40 animate-ping pointer-events-none" />
        )}
      </div>

      {/* Label */}
      <span
        className={`text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
          isActive
            ? "text-blue-650 -translate-x-1"
            : "text-slate-400 group-hover:text-slate-600"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
