import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// Midnight Fridge Roast: one funny single line, at most 200 characters.
// The roast is a concrete human scene: 3 a.m. in the kitchen, the fridge
// humming like it works overtime while producing only a light and a
// judgmental stare at the leftovers.
const LINE =
  "At 3 a.m. my fridge hums like it works overtime, but the only thing it ever produces is a light and a judgmental stare at my leftovers.";
const MAX_CHARS = 200;

function main(): void {
  // Revision: also reject line breaks and blank text, matching the sealed gate exactly.
  if (LINE.includes("\n") || LINE.trim().length === 0) {
    throw new Error("entry must be a single non-empty line");
  }
  // Revision 2: the line must name the 3 a.m. fridge, so a generic roast
  // cannot slip through as this entry.
  if (!LINE.toLowerCase().includes("3 a.m.") || !LINE.toLowerCase().includes("fridge")) {
    throw new Error("entry must name the 3 a.m. fridge");
  }
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(`entry is ${LINE.length} characters, outside 1-${MAX_CHARS}`);
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
}

main();
