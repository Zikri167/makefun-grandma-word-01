// One Word From Grandma — make.fun bounty u-0xkianno-one-word-from-grandma-f04bed16.
//
// A deterministic program (Node 22, stdlib only, no network, no clock) that
// writes exactly one word to /output/entry.txt: the single word a grandma
// would text about AI. The word is "Doohickey" — 9 characters, warm and a
// little baffled, the way a grandma names a gadget she cannot name.
//
//   MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Two runs write the same bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The word: one word, 9 characters. A grandma's word for the clever machine
// she does not understand — she would text it to a grandchild, warm and
// baffled, and it lands funny without any caption. It beats the obvious picks
// ("Wow", "Scary", "Magic") because it is her voice, not a reaction: she
// names the thing she cannot name, and the joke is in the naming itself.
const WORD = "Doohickey";

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const word = WORD;
  // Gate: exactly one word, 1-30 characters, no whitespace at all.
  if (word.length < 1 || word.length > 30) {
    fail(`word must be 1-30 characters, got ${word.length}`);
  }
  if (/\s/.test(word) || word.trim().length === 0) {
    fail("word must be a single non-blank word with no whitespace");
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), word, "utf8");
  console.log(`wrote ${word.length} characters to ${join(outDir, "entry.txt")}`);
}

main();
