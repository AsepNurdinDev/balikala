"use client";

import { useState } from "react";
import { PENJOR_PARTS, PenjorPart } from "../data/penjor";

export function usePenjor() {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  const activePart = activeHotspotId 
    ? PENJOR_PARTS.find((part) => part.id === activeHotspotId) || null 
    : null;

  const selectHotspot = (id: string) => {
    setActiveHotspotId(id);
  };

  const resetHotspot = () => {
    setActiveHotspotId(null);
  };

  return {
    activeHotspotId,
    activePart,
    selectHotspot,
    resetHotspot,
  };
}
