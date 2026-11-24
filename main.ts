import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One tired-engineer approval, carrying its dread quietly: the approval
// stays explicit up front, and the dread sits in the second half, where
// the universe has only postponed its objection until after lunch.
const comment =
  "LGTM. The tests pass, the diff is clean, and entropy has agreed to wait until after lunch.";

function validate(text: string): void {
  if (text.length < 1 || text.length > 140) {
    throw new Error(`comment must be 1-140 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("comment must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("comment must be a single line");
  }
}

validate(comment);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), comment, "utf8");
