#!/usr/bin/env node
/**
 * TypeScript to JavaScript Converter
 * Converts all .tsx/.ts files to .jsx/.js while removing TypeScript-specific syntax
 */

const fs = require('fs');
const path = require('path');

const srcRoot = path.join(__dirname, '..', 'src');

// Track converted files
const converted = [];
const errors = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.isFile()) {
      if (full.endsWith('.tsx') || full.endsWith('.ts')) {
        // Skip .d.ts files
        if (full.endsWith('.d.ts')) continue;
        convertFile(full);
      }
    }
  }
}

function convertFile(filePath) {
  try {
    const original = fs.readFileSync(filePath, 'utf8');
    let out = original;

    // 1. Remove `import type { ... }` statements
    out = out.replace(/^import\s+type\s+\{[^}]*\}\s+from\s+['"][^'"]+['"];\s*\n?/gm, '');
    
    // 2. Remove `import { type X, type Y }` - keep non-type imports
    out = out.replace(/import\s+\{([^}]+)\}/g, (match, imports) => {
      const cleaned = imports
        .split(',')
        .map(i => i.trim())
        .filter(i => !i.startsWith('type '))
        .join(', ');
      if (!cleaned) return ''; // Remove entire import if only types
      return `import { ${cleaned} }`;
    });
    
    // Remove empty import statements left behind
    out = out.replace(/^import\s+\{\s*\}\s+from\s+['"][^'"]+['"];\s*\n?/gm, '');

    // 3. Remove inline type imports: import { type X } from 'y'
    out = out.replace(/,\s*type\s+\w+/g, '');
    out = out.replace(/type\s+\w+\s*,/g, '');

    // 4. Remove type annotations from function parameters
    // e.g., (param: string) -> (param)
    out = out.replace(/:\s*(?:string|number|boolean|any|void|null|undefined|never|unknown|object|symbol|bigint)(?:\s*\[\s*\])?(?=\s*[,)\]=])/g, '');
    
    // 5. Remove complex type annotations (e.g., : React.FC<Props>, : ComponentProps, etc.)
    out = out.replace(/:\s*[A-Z][a-zA-Z0-9_]*(?:<[^>]+>)?(?:\s*\|\s*[A-Z][a-zA-Z0-9_]*(?:<[^>]+>)?)*(?=\s*[,)\]=])/g, '');
    
    // 6. Remove generic type parameters from function declarations
    // e.g., function foo<T>(x) -> function foo(x)
    out = out.replace(/(<[A-Z][a-zA-Z0-9_,\s<>]*>)(?=\s*\()/g, '');
    
    // 7. Remove interface declarations
    out = out.replace(/^(?:export\s+)?interface\s+\w+(?:\s+extends\s+[^{]+)?\s*\{[^}]*\}\s*\n?/gm, '');
    
    // 8. Remove type alias declarations
    out = out.replace(/^(?:export\s+)?type\s+\w+(?:<[^>]+>)?\s*=\s*[^;]+;\s*\n?/gm, '');
    
    // 9. Remove return type annotations from arrow functions
    // e.g., (): string => -> () =>
    out = out.replace(/\):\s*[A-Za-z][a-zA-Z0-9_<>\[\]|&\s]*(?=\s*=>)/g, ')');
    
    // 10. Remove return type annotations from regular functions
    // e.g., function foo(): string { -> function foo() {
    out = out.replace(/\):\s*[A-Za-z][a-zA-Z0-9_<>\[\]|&\s]*(?=\s*\{)/g, ')');
    
    // 11. Remove 'as' type assertions
    // e.g., value as string -> value
    out = out.replace(/\s+as\s+(?:const|[A-Za-z][a-zA-Z0-9_<>\[\]|&\s]*)/g, '');
    
    // 12. Remove angle bracket type assertions
    // e.g., <string>value -> value
    out = out.replace(/<[A-Z][a-zA-Z0-9_<>\[\]|&\s]*>(?=\w)/g, '');
    
    // 13. Remove non-null assertions
    // e.g., value! -> value
    out = out.replace(/!(?=\.|\[|\)|\s|,|;)/g, '');
    
    // 14. Remove satisfies keyword
    out = out.replace(/\s+satisfies\s+[A-Za-z][a-zA-Z0-9_<>\[\]|&\s]*/g, '');
    
    // 15. Remove declare statements
    out = out.replace(/^declare\s+[^;]+;\s*\n?/gm, '');
    
    // 16. Remove namespace declarations
    out = out.replace(/^(?:export\s+)?namespace\s+\w+\s*\{[\s\S]*?\}\s*\n?/gm, '');
    
    // 17. Remove enum declarations (simple case)
    out = out.replace(/^(?:export\s+)?(?:const\s+)?enum\s+\w+\s*\{[^}]*\}\s*\n?/gm, '');
    
    // 18. Clean up React.FC, React.ComponentType, etc.
    out = out.replace(/:\s*React\.[A-Z][a-zA-Z0-9_]*(?:<[^>]+>)?/g, '');
    
    // 19. Remove JSX.Element type annotations
    out = out.replace(/:\s*JSX\.Element(?:\s*\|\s*null)?/g, '');
    
    // 20. Fix variable declarations with type annotations
    // e.g., const x: string = "val" -> const x = "val"
    out = out.replace(/(const|let|var)\s+(\w+)\s*:\s*[^=]+=/g, '$1 $2 =');
    
    // 21. Remove React.HTMLAttributes, React.ComponentProps etc.
    out = out.replace(/:\s*React\.\w+(?:<[^>]+>)?(?:\s*&\s*\{[^}]*\})?/g, '');
    
    // 22. Clean up multiple consecutive newlines
    out = out.replace(/\n{3,}/g, '\n\n');
    
    // 23. Fix imports with .tsx/.ts extensions to .jsx/.js
    out = out.replace(/(from\s+['"][^'"]+)\.tsx(['"])/g, '$1.jsx$2');
    out = out.replace(/(from\s+['"][^'"]+)\.ts(['"])/g, '$1.js$2');
    
    // Determine new file extension
    const isJsx = filePath.endsWith('.tsx') || 
                  out.includes('React') || 
                  out.includes('jsx') ||
                  /<[A-Z]/.test(out) ||
                  /<[a-z]+/.test(out);
    
    const newExt = filePath.endsWith('.tsx') ? '.jsx' : '.js';
    const newPath = filePath.replace(/\.tsx?$/, newExt);
    
    // Write converted file
    fs.writeFileSync(newPath, out, 'utf8');
    
    // Remove original TypeScript file
    if (newPath !== filePath) {
      fs.unlinkSync(filePath);
    }
    
    converted.push({ from: filePath, to: newPath });
    console.log(`✓ Converted: ${path.relative(srcRoot, filePath)} -> ${path.basename(newPath)}`);
    
  } catch (err) {
    errors.push({ file: filePath, error: err.message });
    console.error(`✗ Error converting ${filePath}: ${err.message}`);
  }
}

// Main execution
console.log('🔄 Starting TypeScript to JavaScript conversion...\n');

if (!fs.existsSync(srcRoot)) {
  console.error('❌ Source folder not found:', srcRoot);
  process.exit(1);
}

walk(srcRoot);

console.log('\n========================================');
console.log(`✅ Converted: ${converted.length} files`);
if (errors.length > 0) {
  console.log(`❌ Errors: ${errors.length} files`);
  errors.forEach(e => console.log(`   - ${e.file}: ${e.error}`));
}
console.log('========================================\n');
console.log('📝 Next steps:');
console.log('   1. Review converted files for any remaining TypeScript syntax');
console.log('   2. Run: bun run lint:fix');
console.log('   3. Run: bun run dev');
