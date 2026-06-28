import { useState, useCallback } from "react";
import { symbolsData, OVERVIEW_CAMERA } from "../data/symbols";

export function useExplorer() {
  // null = overview mode (no symbol selected, show full figure)
  const [activeSymbolId, setActiveSymbolId] = useState<string | null>(null);
  const [exploredSymbols, setExploredSymbols] = useState<string[]>([]);

  const selectSymbol = useCallback((id: string) => {
    setActiveSymbolId(id);
    setExploredSymbols((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  }, []);

  /** Return to overview — deselects any active symbol */
  const showOverview = useCallback(() => {
    setActiveSymbolId(null);
  }, []);

  const totalSymbols = symbolsData.length;
  const exploredCount = exploredSymbols.length;
  const isCompleted = exploredCount === totalSymbols;

  const resetExplorer = useCallback(() => {
    setActiveSymbolId(null);
    setExploredSymbols([]);
  }, []);

  const activeSymbol = activeSymbolId
    ? symbolsData.find((s) => s.id === activeSymbolId) ?? null
    : null;

  // Camera driven by active symbol, or fall back to the overview camera
  const cameraTarget   = activeSymbol ? activeSymbol.cameraTarget   : OVERVIEW_CAMERA.target;
  const cameraPosition = activeSymbol ? activeSymbol.cameraPosition : OVERVIEW_CAMERA.position;

  return {
    activeSymbolId,
    activeSymbol,
    cameraTarget,
    cameraPosition,
    exploredSymbols,
    exploredCount,
    totalSymbols,
    isCompleted,
    selectSymbol,
    showOverview,
    resetExplorer,
  };
}
