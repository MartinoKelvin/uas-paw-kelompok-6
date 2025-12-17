#!/usr/bin/env node
/**
 * Fix remaining TypeScript syntax after conversion
 */

const fs = require("fs");
const path = require("path");

const srcRoot = path.join(__dirname, "..", "src");
const fixed = [];
const errors = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.isFile() && (full.endsWith(".jsx") || full.endsWith(".js"))) {
      fixFile(full);
    }
  }
}

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    const original = content;

    // Fix 1: Fix broken import * statements: `import *"module"` -> `import * as X from "module"`
    content = content.replace(/import\s+\*"([^"]+)"/g, (match, module) => {
      // Extract module name for alias
      const parts = module.split("/");
      let alias = parts[parts.length - 1]
        .replace(/^@/, "")
        .replace(/-/g, "")
        .replace(/\.service$/, "Service")
        .replace(/\.js$/, "")
        .replace(/^react$/, "React")
        .replace(/^react-accordion$/, "AccordionPrimitive")
        .replace(/^react-alert-dialog$/, "AlertDialogPrimitive")
        .replace(/^react-aspect-ratio$/, "AspectRatioPrimitive")
        .replace(/^react-avatar$/, "AvatarPrimitive")
        .replace(/^react-checkbox$/, "CheckboxPrimitive")
        .replace(/^react-collapsible$/, "CollapsiblePrimitive")
        .replace(/^react-context-menu$/, "ContextMenuPrimitive")
        .replace(/^react-dialog$/, "DialogPrimitive")
        .replace(/^react-dropdown-menu$/, "DropdownMenuPrimitive")
        .replace(/^react-hover-card$/, "HoverCardPrimitive")
        .replace(/^react-label$/, "LabelPrimitive")
        .replace(/^react-menubar$/, "MenubarPrimitive")
        .replace(/^react-navigation-menu$/, "NavigationMenuPrimitive")
        .replace(/^react-popover$/, "PopoverPrimitive")
        .replace(/^react-progress$/, "ProgressPrimitive")
        .replace(/^react-radio-group$/, "RadioGroupPrimitive")
        .replace(/^react-scroll-area$/, "ScrollAreaPrimitive")
        .replace(/^react-select$/, "SelectPrimitive")
        .replace(/^react-separator$/, "SeparatorPrimitive")
        .replace(/^react-slider$/, "SliderPrimitive")
        .replace(/^react-slot$/, "SlotPrimitive")
        .replace(/^react-switch$/, "SwitchPrimitive")
        .replace(/^react-tabs$/, "TabsPrimitive")
        .replace(/^react-toggle$/, "TogglePrimitive")
        .replace(/^react-toggle-group$/, "ToggleGroupPrimitive")
        .replace(/^react-tooltip$/, "TooltipPrimitive");
      return `import * as ${alias} from "${module}"`;
    });

    // Fix 2: Remove TypeScript type annotations from function parameters
    // e.g., function foo(x: string) -> function foo(x)
    content = content.replace(
      /(\w+)\s*:\s*(?:string|number|boolean|any|void|null|undefined|never|unknown|object|symbol|bigint)(?:\s*\[\s*\])?(?=\s*[,)\]=])/g,
      "$1"
    );

    // Fix 3: Remove complex type annotations like `: ClassValue[]`
    content = content.replace(/:\s*[A-Z][a-zA-Z0-9_]*(?:<[^>]+>)?(?:\s*\[\s*\])?(?=\s*\))/g, "");

    // Fix 4: Remove remaining type annotations with generics
    content = content.replace(/\s*:\s*\{[^}]+\}\s*(?=\))/g, "");

    // Fix 5: Remove function parameter type objects like `{ children }: { children: ReactNode }`
    content = content.replace(/(\{\s*\w+(?:\s*,\s*\w+)*\s*\})\s*:\s*\{[^}]+\}/g, "$1");

    // Fix 6: Remove generic type parameters from class declarations
    content = content.replace(/class\s+(\w+)\s+extends\s+(\w+)<[^>]+>/g, "class $1 extends $2");

    // Fix 7: Remove remaining return type annotations
    content = content.replace(
      /\)\s*:\s*(?:JSX\.Element|React\.ReactNode|ReactNode|void|string|number|boolean|null|undefined|any)(?:\s*\|\s*(?:JSX\.Element|React\.ReactNode|ReactNode|void|string|number|boolean|null|undefined|any|null))*\s*(?=\{|=>)/g,
      ")"
    );

    // Fix 8: Fix the validateAuthState function pattern
    content = content.replace(
      /export const validateAuthState = \(\):\s*\{/g,
      "export const validateAuthState = () => ({"
    );

    if (content !== original) {
      fs.writeFileSync(filePath, content, "utf8");
      fixed.push(filePath);
      console.log(`✓ Fixed: ${path.relative(srcRoot, filePath)}`);
    }
  } catch (err) {
    errors.push({ file: filePath, error: err.message });
    console.error(`✗ Error fixing ${filePath}: ${err.message}`);
  }
}

console.log("🔧 Fixing remaining TypeScript syntax...\n");
walk(srcRoot);

console.log(`\n✅ Fixed: ${fixed.length} files`);
if (errors.length > 0) {
  console.log(`❌ Errors: ${errors.length} files`);
}
