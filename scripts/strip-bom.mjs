// scripts/strip-bom.mjs
import { readFileSync, writeFileSync, existsSync } from "node:fs";
const files = ["prisma/schema.prisma"];
for (const f of files) {
  if (!existsSync(f)) continue;
  const buf = readFileSync(f);
  // remove UTF-8 BOM if present
  const cleaned =
    buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf ? buf.slice(3) : buf;
  writeFileSync(f, cleaned);
  console.log(`[strip-bom] cleaned ${f}`);
}
