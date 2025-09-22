#!/usr/bin/env node
// Fetch GitHub contributions HTML and write JSON for the app to consume.
// Usage: node scripts/fetch-contrib.mjs <github-username>
import fs from "node:fs/promises";

const username = process.argv[2];
if (!username) {
  console.error("Usage: node scripts/fetch-contrib.mjs <github-username>");
  process.exit(1);
}

const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");
const to = `${yyyy}-${mm}-${dd}`;

const url = `https://github.com/users/${username}/contributions?to=${to}`;
const res = await fetch(url, { headers: { Accept: "text/html" } });
if (!res.ok) {
  console.error(`Failed to fetch contributions: ${res.status}`);
  process.exit(1);
}
const html = await res.text();

const rectRegex =
  /<rect[^>]*data-date="([^"]+)"[^>]*data-count="([^"]+)"[^>]*data-level="([^"]+)"[^>]*>/g;
const days = [];
let m;
while ((m = rectRegex.exec(html)) !== null) {
  const date = m[1];
  const count = Number(m[2] || 0);
  const level = Number(m[3] || 0);
  days.push({ date, count, level });
}
const total = days.reduce(
  (a, d) => a + (Number.isFinite(d.count) ? d.count : 0),
  0,
);

await fs.mkdir("src/content", { recursive: true });
await fs.writeFile(
  "src/content/contrib.json",
  JSON.stringify({ days, total }, null, 2),
  "utf8",
);
console.log(
  `Wrote src/content/contrib.json with ${days.length} days, total=${total}`,
);
