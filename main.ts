// office-joke-laugh-off — writes one original one-line office joke to entry.txt.
//
// The joke is held in a single constant so the entry is easy to read and to
// audit. Validation runs before any file is written: the line must be a real
// one-liner (1-200 characters, exactly one line, not blank), matching the
// gate the sealed scorer applies to /output/entry.txt.
//
// Runtime: Node.js 22.18+ (the grader runs Node 22.23.4). No dependencies.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line. Fresh and self-contained, no setup to explain: office
// printers really do seem to pick the worst possible moment to jam, and the
// twist — blaming management — is where the laugh comes from. Deliberately
// kept short (76 characters) so every word earns its place.
const ENTRY_LINE =
  "The printer only jams when the deadline is near; I think it's in management.";

// The output directory is overridable for local runs; the grader sets
// MAKEFUN_OUTPUT_DIR=/output.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

function validateLine(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(
      `entry must be 1-200 characters, got ${line.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
}

validateLine(ENTRY_LINE);

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, ENTRY_LINE, "utf8");

console.log(`wrote ${outputPath} (${ENTRY_LINE.length} characters)`);
