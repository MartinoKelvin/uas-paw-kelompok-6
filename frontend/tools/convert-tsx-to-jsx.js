#!/usr/bin/env node
/* eslint-env node */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "src");

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.isFile() && full.endsWith(".tsx")) {
      convertFile(full);
    }
  }
}

function convertFile(filePath) {
  const original = fs.readFileSync(filePath, "utf8");
  const backupPath = filePath + ".bak";
  fs.writeFileSync(backupPath, original, "utf8");

  let out = original;

  // Remove `import type ...` lines
  out = out.replace(/^import\s+type[\s\S]*?;\n?/gm, "");

  // Remove exported interfaces and type aliases (best-effort)
  out = out.replace(/export\s+(?:interface|type)\s+[\s\S]*?(?=\n\n|$)/g, "");

  // Add a top-line TODO so reviewers know manual cleanup is likely needed
  const header = `// TODO: Autoconverted from .tsx -> .jsx.\n// Review and remove remaining TypeScript annotations, add PropTypes/defaultProps.\n`;
  if (!out.startsWith("// TODO:")) out = header + out;

  const newPath = filePath.replace(/\.tsx$/, ".jsx");
  fs.writeFileSync(newPath, out, "utf8");
  console.log(`Converted: ${filePath} -> ${newPath} (backup: ${backupPath})`);
}

if (!fs.existsSync(root)) {
  console.error("Source folder not found:", root);
  process.exit(1);
}

walk(root);
console.log("Conversion complete. Review files and run lint/build.");
