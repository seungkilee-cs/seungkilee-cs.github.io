// Load contributions from a JSON file generated at build time by scripts/fetch-contrib.mjs

export type DayContrib = { date: string; count: number; level: number };
export type ContribData = { days: DayContrib[]; total: number };

// If your TS config supports JSON imports with assertions:
import data from "../content/contrib.json" assert { type: "json" };

// If import assertions are not enabled, you can instead:
// // @ts-ignore
// import data from "../content/contrib.json";

export async function loadContributions(): Promise<ContribData> {
  // This is synchronous data, but we keep the async API for drop-in replacement later if needed.
  if (data && Array.isArray((data as any).days)) {
    return data as ContribData;
  }
  return { days: [], total: 0 };
}
