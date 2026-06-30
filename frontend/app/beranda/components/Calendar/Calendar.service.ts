"use client";

import { getFestivals } from "../../../services/api";
import type { Festival } from "../../../services/api";

export async function fetchFestivals(year: number): Promise<Festival[]> {
  return getFestivals(year);
}
