# Zenitho Style Guide

> Comprehensive design system documentation for Astro + React + Tailwind CSS projects

## Table of Contents

1. [Design Tokens](#design-tokens)
2. [Layout Patterns](#layout-patterns)
3. [Component Patterns](#component-patterns)
4. [Responsive Design](#responsive-design)
5. [Animation & Effects](#animation--effects)
6. [Typography](#typography)
7. [Form Components](#form-components)
8. [Icon Usage](#icon-usage)

---

## Design Tokens

### Color System (OKLCH)

The project uses OKLCH color space for perceptually uniform colors. All colors are defined in `src/styles/global.css`:

```css
:root {
  /* Core Colors */
  --background: oklch(1 0 0);           /* Pure white */
  --foreground: oklch(0.15 0 0);        /* Dark text */
  --card: oklch(1 0 0);                 /* Card background */
  --card-foreground: oklch(0.15 0 0);   /* Card text */
  
  /* Primary Colors */
  --primary: oklch(0.325 0 0);          /* Main brand color */
  --primary-foreground: oklch(0.9881 0 0);
  
  /* Semantic Colors */
  --destructive: oklch(0.5779 0.2388 25.5612);
  --destructive-foreground: oklch(1 0 0);
  
  /* UI Elements */
  --border: oklch(0.9401 0 0);
  --input: oklch(0.9401 0 0);
  --ring: oklch(0.7731 0 0);
  
  /* Muted & Accents */
  --muted: oklch(0.168 0.002 106.6177);
  --muted-foreground: oklch(0.5242 0.0116 113.1418);
  --accent: oklch(0.168 0.002 106.6177);
  --accent-foreground: oklch(0.8074 0.0142 93.0137);
  
  /* Chart Colors */
  --chart-1: oklch(0.85 0.2 145);
  --chart-2: oklch(0.75 0.2 200);
  --chart-3: oklch(0.65 0.2 280);
  --chart-4: oklch(0.8 0.15 60);
  --chart-5: oklch(0.7 0.15 340);
}

.dark {
  --background: oklch(0.1245 0 0);
  --foreground: oklch(0.9881 0 0);
  --card: oklch(0.1245 0 0);
  --card-foreground: oklch(0.9881 0 0);
  --primary: oklch(0.9881 0 0);
  --primary-foreground: oklch(0.325 0 0);
  /* ...other dark mode overrides */
}
```

### Shadow System

Consistent shadows across the design:

```css
:root {
  --shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 1px 2px -1px hsl(0 0% 0% / 0.1);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 2px 4px -1px hsl(0 0% 0% / 0.1);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 4px 6px -1px hsl(0 0% 0% / 0.1);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 8px 10px -1px hsl(0 0% 0% / 0.1);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);
}
```

### Border Radius

```css
:root {
  --radius: 0.5rem;                      /* Base radius */
}

/* Tailwind custom radii */
--radius-sm: calc(var(--radius) - 4px);  /* 0.25rem / 4px */
--radius-md: calc(var(--radius) - 2px);  /* 0.375rem / 6px */
--radius-lg: var(--radius);              /* 0.5rem / 8px */
--radius-xl: calc(var(--radius) + 4px);  /* 0.75rem / 12px */
```

### Typography

```css
:root {
  --font-sans: Abel, ui-sans-serif, sans-serif, system-ui;
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

/* Letter spacing */
--tracking-tighter: calc(var(--tracking-normal) - 0.05em);
--tracking-tight: calc(var(--tracking-normal) - 0.025em);
--tracking-normal: var(--tracking-normal);
--tracking-wide: calc(var(--tracking-normal) + 0.025em);
--tracking-wider: calc(var(--tracking-normal) + 0.05em);
--tracking-widest: calc(var(--tracking-normal) + 0.1em);
```

**Font Loading:**

```css
@font-face {
  font-family: Abel;
  src: url("/fonts/Abel-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

---

## Layout Patterns

### 1. Page Structure with Border Decorations

Full-page layout with decorative border elements:

```tsx
<main className="relative min-h-screen overflow-hidden">
  {/* Top Border */}
  <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
  
  {/* Bottom Border */}
  <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
  
  {/* Left Border */}
  <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-px bg-linear-to-b from-transparent via-primary/50 to-transparent" />
  
  {/* Right Border */}
  <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-px bg-linear-to-b from-transparent via-primary/50 to-transparent" />
  
  {/* Corner Decorations - Top Left */}
  <div className="pointer-events-none absolute left-0 top-0 z-10 h-20 w-20 border-l-2 border-t-2 border-primary/30" />
  
  {/* Corner Decorations - Top Right */}
  <div className="pointer-events-none absolute right-0 top-0 z-10 h-20 w-20 border-r-2 border-t-2 border-primary/30" />
  
  {/* Corner Decorations - Bottom Left */}
  <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-20 w-20 border-b-2 border-l-2 border-primary/30" />
  
  {/* Corner Decorations - Bottom Right */}
  <div className="pointer-events-none absolute bottom-0 right-0 z-10 h-20 w-20 border-b-2 border-r-2 border-primary/30" />
  
  {/* Main Content */}
  <div className="relative z-0 mx-auto max-w-screen-2xl p-1 md:p-8">
    {/* Your content here */}
  </div>
</main>
```

### 2. Hero Card Pattern

Featured card with decorative borders:

```tsx
<Card className="relative overflow-hidden border-2 border-primary/20 bg-linear-to-br from-background via-primary/5 to-background shadow-xl">
  {/* Corner Decorations */}
  <div className="pointer-events-none absolute left-0 top-0 h-12 w-12 border-l-2 border-t-2 border-primary/30 md:h-20 md:w-20" />
  <div className="pointer-events-none absolute right-0 top-0 h-12 w-12 border-r-2 border-t-2 border-primary/30 md:h-20 md:w-20" />
  <div className="pointer-events-none absolute bottom-0 left-0 h-12 w-12 border-b-2 border-l-2 border-primary/30 md:h-20 md:w-20" />
  <div className="pointer-events-none absolute bottom-0 right-0 h-12 w-12 border-b-2 border-r-2 border-primary/30 md:h-20 md:w-20" />
  
  <CardHeader className="p-2 md:p-6">
    <CardTitle className="flex items-center gap-2 text-xl md:text-3xl">
      <Icon className="size-4 md:size-5" />
      Title
      <Badge variant="outline" className="ml-auto rounded-full">
        <span className="mr-1.5 size-2 animate-pulse rounded-full bg-green-500" />
        Status
      </Badge>
    </CardTitle>
  </CardHeader>
  
  <CardContent className="p-2 md:p-8">
    {/* Content */}
  </CardContent>
</Card>
```

### 3. Container Padding Strategy

**Mobile-first approach:**
- Mobile: `p-1` or `p-2` for tight spacing
- Desktop: `md:p-4`, `md:p-6`, or `md:p-8` for comfortable spacing

```tsx
// Page container
<div className="p-1 md:p-8">

// Card header
<CardHeader className="p-2 md:p-6">

// Card content
<CardContent className="p-2 md:p-8">

// Section spacing
<div className="space-y-2 md:space-y-4">
```

### 4. Glass-morphism Effect

Backdrop blur with semi-transparent background:

```tsx
<div className="bg-background/95 backdrop-blur-lg supports-backdrop-filter:bg-background/60">
  {/* Content */}
</div>

// Alternative with border
<div className="border-2 border-border bg-background/80 backdrop-blur-lg shadow-xl">
  {/* Content */}
</div>
```

### 5. Grid Background Pattern

Full-page subtle grid overlay:

```css
body::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(to right, oklch(from var(--border) l c h / 0.3) 1px, transparent 1px),
    linear-gradient(to bottom, oklch(from var(--border) l c h / 0.3) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
  z-index: -1;
  opacity: 0.5;
}
```

---

## Component Patterns

### 1. Button Variants

Using `class-variance-authority` for consistent button styles:

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
  }
);
```

**Usage:**

```tsx
<Button variant="default">Click me</Button>
<Button variant="outline" size="sm">Small</Button>
<Button variant="destructive" size="icon"><Trash2 /></Button>
```

### 2. Card Component

```tsx
// Basic card
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>

// Card with gradient
<Card className="bg-linear-to-br from-background via-primary/5 to-background">

// Card with border
<Card className="border-2 border-primary/20">
```

### 3. Badge Component

```tsx
// Status badge with dot
<Badge variant="outline" className="rounded-full">
  <span className="mr-1.5 size-2 animate-pulse rounded-full bg-green-500" />
  Active
</Badge>

// Simple badge
<Badge>New</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="secondary">Info</Badge>
```

### 4. Stat Cards

Financial or metric display cards:

```tsx
<div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
  <Card className="bg-linear-to-br from-green-500/10 to-background">
    <CardContent className="p-2 md:p-6">
      <div className="flex items-center gap-2">
        <TrendingUp className="size-3 text-green-500 md:size-4" />
        <p className="text-xs text-muted-foreground md:text-sm">Total Income</p>
      </div>
      <p className="mt-1 text-lg font-bold text-green-500 md:mt-2 md:text-2xl">
        {formatCurrency(totalIncome)}
      </p>
    </CardContent>
  </Card>
  
  <Card className="bg-linear-to-br from-red-500/10 to-background">
    <CardContent className="p-2 md:p-6">
      <div className="flex items-center gap-2">
        <TrendingDown className="size-3 text-red-500 md:size-4" />
        <p className="text-xs text-muted-foreground md:text-sm">Total Expense</p>
      </div>
      <p className="mt-1 text-lg font-bold text-red-500 md:mt-2 md:text-2xl">
        {formatCurrency(totalExpense)}
      </p>
    </CardContent>
  </Card>
</div>
```

### 5. List Items with Actions

```tsx
<div className="space-y-1 md:space-y-2">
  {items.map((item) => (
    <div
      key={item.id}
      className="flex items-center justify-between rounded-lg border bg-card p-2 transition-colors hover:bg-muted/50 md:p-3"
    >
      <div className="flex items-center gap-2 md:gap-3">
        <Icon className="size-3 md:size-4" />
        <div className="flex-1">
          <p className="text-xs font-medium md:text-sm">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.detail}</p>
        </div>
      </div>
      <Button variant="ghost" size="icon-sm" className="shrink-0">
        <Trash2 className="size-3 md:size-4" />
      </Button>
    </div>
  ))}
</div>
```

---

## Responsive Design

### Breakpoint Strategy

```tsx
// Mobile first: base styles apply to mobile
// Progressive enhancement for larger screens

// Tailwind breakpoints:
// sm: 640px
// md: 768px   <- Primary breakpoint used in this project
// lg: 1024px
// xl: 1280px
// 2xl: 1536px
```

### Padding Scale

```tsx
// Mobile → Desktop
p-1       → md:p-4   // Minimal spacing
p-2       → md:p-6   // Standard spacing
p-2       → md:p-8   // Generous spacing

// Specific examples:
className="p-1 md:p-8"          // Page container
className="p-2 md:p-6"          // Card header
className="p-2 md:p-8"          // Card content
className="px-2 py-1 md:px-4 md:py-2"  // Button-like elements
```

### Text Sizing

```tsx
// Mobile → Desktop
text-xs   → md:text-sm   // Small text
text-sm   → md:text-base // Body text
text-base → md:text-lg   // Emphasized text
text-lg   → md:text-xl   // Headings
text-xl   → md:text-2xl  // Large headings
text-2xl  → md:text-3xl  // Page titles
```

### Icon Sizing

```tsx
// Mobile → Desktop
size-3    → md:size-4    // Small icons
size-4    → md:size-5    // Standard icons
size-5    → md:size-6    // Large icons

// Usage:
<Icon className="size-3 md:size-4" />
```

### Grid Layouts

```tsx
// Single column mobile, multi-column desktop
<div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3">

// Auto-fit responsive grid
<div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
```

### Visibility Control

```tsx
// Hide on mobile, show on desktop
<div className="hidden md:block">

// Show on mobile, hide on desktop
<div className="md:hidden">

// Example: Mobile navigation
<nav className="md:hidden">  // Only visible on mobile
```

---

## Animation & Effects

### Transition Classes

```tsx
// Standard transition
className="transition-colors"           // Color changes only
className="transition-all"              // All properties
className="transition-transform"        // Transform only

// With duration
className="transition-all duration-200"
className="transition-all duration-300"
```

### Hover Effects

```tsx
// Scale on hover
className="transition-transform hover:scale-110"
className="transition-transform hover:scale-105"

// Background change
className="hover:bg-accent hover:text-accent-foreground"

// Border highlight
className="hover:border-primary/50"

// Combination
className="transition-all hover:scale-105 hover:shadow-lg"
```

### Active States

```tsx
// Button active state
className={cn(
  "transition-colors",
  isActive && "bg-primary/10 text-primary"
)}

// Icon scale on active
className={cn(
  "size-5 transition-transform",
  isActive && "scale-110"
)}
```

### Pulse Animation

```tsx
// Status dot
<span className="size-2 animate-pulse rounded-full bg-green-500" />

// Loading skeleton
<div className="h-6 w-32 animate-pulse rounded bg-border/80" />
```

### Custom Animation Delays

```css
@layer utilities {
  .animation-delay-300 {
    animation-delay: 300ms;
  }
  .animation-delay-500 {
    animation-delay: 500ms;
  }
  .animation-delay-700 {
    animation-delay: 700ms;
  }
}
```

### Reduced Motion

Automatically handled in global styles:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Typography

### Font Stack

```tsx
// Sans-serif (default)
className="font-sans"

// Monospace (code)
className="font-mono"

// Font weights
className="font-normal"    // 400
className="font-medium"    // 500
className="font-semibold"  // 600
className="font-bold"      // 700
```

### Heading Hierarchy

```tsx
<h1 className="text-2xl font-bold md:text-3xl">Page Title</h1>
<h2 className="text-xl font-semibold md:text-2xl">Section Title</h2>
<h3 className="text-lg font-semibold md:text-xl">Subsection</h3>
<h4 className="text-base font-medium md:text-lg">Card Title</h4>
```

### Text Colors

```tsx
// Primary text
className="text-foreground"

// Muted text
className="text-muted-foreground"

// Semantic colors
className="text-destructive"
className="text-primary"
className="text-green-500"   // Success
className="text-red-500"     // Error
className="text-amber-500"   // Warning
```

### Text Utilities

```tsx
// Truncate
className="truncate"

// Line clamp
className="line-clamp-2"
className="line-clamp-3"

// Letter spacing
className="tracking-tight"
className="tracking-normal"
className="tracking-wide"
```

---

## Form Components

### Input Field

```tsx
<div className="space-y-1 md:space-y-2">
  <Label htmlFor="name" className="text-xs md:text-sm">
    Name
  </Label>
  <Input
    id="name"
    placeholder="Enter name"
    className="text-xs md:text-sm"
  />
</div>
```

### Select Dropdown

```tsx
<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="text-xs md:text-sm">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Form Layout

```tsx
<form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
  <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
    <div className="space-y-1 md:space-y-2">
      <Label>Field 1</Label>
      <Input />
    </div>
    <div className="space-y-1 md:space-y-2">
      <Label>Field 2</Label>
      <Input />
    </div>
  </div>
  
  <div className="flex gap-2 md:gap-3">
    <Button type="submit" className="flex-1">
      Submit
    </Button>
    <Button type="button" variant="outline">
      Cancel
    </Button>
  </div>
</form>
```

### Dialog/Modal

```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent className="max-w-md">
    <DialogHeader>
      <DialogTitle className="text-lg md:text-xl">Title</DialogTitle>
    </DialogHeader>
    <div className="space-y-2 md:space-y-4">
      {/* Content */}
    </div>
  </DialogContent>
</Dialog>
```

---

## Icon Usage

### Icon Library

Using **Lucide React** for consistent iconography:

```tsx
import {
  Timer,
  Wallet,
  Settings,
  Plus,
  Trash2,
  TrendingUp,
  TrendingDown,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";
```

### Icon Sizing

```tsx
// In buttons
<Button>
  <Plus className="size-4" />
  Add Item
</Button>

// Standalone
<TrendingUp className="size-3 md:size-4 text-green-500" />

// Large icons
<Icon className="size-6 md:size-8" />
```

### Icon with Text

```tsx
<div className="flex items-center gap-2">
  <Icon className="size-3 md:size-4" />
  <span className="text-xs md:text-sm">Label</span>
</div>
```

---

## Mobile Navigation Pattern

Bottom dock navigation for mobile devices:

```tsx
<nav className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-border bg-background/95 backdrop-blur-lg supports-backdrop-filter:bg-background/60 md:hidden">
  <div className="mx-auto flex h-16 max-w-screen-sm items-center justify-around px-2">
    <button
      onClick={() => onTabChange("tab1")}
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 transition-colors",
        activeTab === "tab1"
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon
        className={cn(
          "size-5 transition-transform",
          activeTab === "tab1" && "scale-110"
        )}
      />
      <span className="text-xs font-medium">Tab 1</span>
    </button>
    
    {/* More tabs... */}
  </div>
</nav>
```

---

## Utility Classes Reference

### Spacing

```tsx
// Margin
m-0, m-1, m-2, m-3, m-4, m-6, m-8
mt-*, mr-*, mb-*, ml-*
mx-*, my-*

// Padding
p-0, p-1, p-2, p-3, p-4, p-6, p-8
pt-*, pr-*, pb-*, pl-*
px-*, py-*

// Gap
gap-1, gap-2, gap-3, gap-4, gap-6
gap-x-*, gap-y-*

// Space between
space-x-*, space-y-*
```

### Flexbox

```tsx
flex
flex-col
flex-row
flex-1
items-start, items-center, items-end
justify-start, justify-center, justify-end, justify-between
gap-2
```

### Grid

```tsx
grid
grid-cols-1, grid-cols-2, grid-cols-3
gap-2, gap-4
```

### Positioning

```tsx
relative, absolute, fixed
top-0, right-0, bottom-0, left-0
z-0, z-10, z-50
```

### Borders

```tsx
border, border-2, border-4
border-t-*, border-r-*, border-b-*, border-l-*
border-primary, border-border
rounded, rounded-md, rounded-lg, rounded-full
```

### Background

```tsx
bg-background
bg-primary
bg-muted
bg-background/95    // With opacity
bg-linear-to-br     // Gradient
from-*, via-*, to-*
```

### Effects

```tsx
shadow, shadow-md, shadow-lg, shadow-xl
backdrop-blur-lg
opacity-50, opacity-100
pointer-events-none
overflow-hidden, overflow-auto
```

---

## Complete Component Examples

### 1. Finance Stat Card

```tsx
<Card className="bg-linear-to-br from-green-500/10 to-background">
  <CardContent className="p-2 md:p-6">
    <div className="flex items-center gap-2">
      <ArrowUpCircle className="size-3 text-green-500 md:size-4" />
      <p className="text-xs text-muted-foreground md:text-sm">
        Total Income
      </p>
    </div>
    <p className="mt-1 text-lg font-bold text-green-500 md:mt-2 md:text-2xl">
      Rp 10,000,000
    </p>
  </CardContent>
</Card>
```

### 2. Transaction List Item

```tsx
<div className="flex items-center justify-between rounded-lg border bg-card p-2 transition-colors hover:bg-muted/50 md:p-3">
  <div className="flex items-center gap-2 md:gap-3">
    <ArrowDownCircle className="size-3 text-red-500 md:size-4" />
    <div className="flex-1">
      <p className="text-xs font-medium md:text-sm">Coffee</p>
      <p className="text-xs text-muted-foreground">
        Food & Drinks • Today
      </p>
    </div>
  </div>
  <div className="flex items-center gap-2">
    <p className="text-xs font-bold text-red-500 md:text-sm">
      -Rp 25,000
    </p>
    <Button variant="ghost" size="icon-sm">
      <Trash2 className="size-3 md:size-4" />
    </Button>
  </div>
</div>
```

### 3. Settings Section

```tsx
<Card>
  <CardHeader className="p-2 md:p-6">
    <CardTitle className="text-base md:text-lg">Appearance</CardTitle>
  </CardHeader>
  <CardContent className="space-y-2 p-2 md:space-y-4 md:p-6">
    <div className="flex items-center justify-between rounded-lg border p-2 md:p-3">
      <div className="flex items-center gap-2 md:gap-3">
        <Settings className="size-3 md:size-4" />
        <div>
          <p className="text-xs font-medium md:text-sm">Theme</p>
          <p className="text-xs text-muted-foreground">
            Light or dark mode
          </p>
        </div>
      </div>
      <ModeToggle />
    </div>
  </CardContent>
</Card>
```

---

## Best Practices

### 1. Mobile-First Development

Always start with mobile styles, then enhance for desktop:

```tsx
// ✅ Good
className="p-2 md:p-6 text-sm md:text-base"

// ❌ Bad
className="md:p-2 lg:p-6 md:text-sm lg:text-base"
```

### 2. Consistent Spacing

Use the spacing scale consistently:
- Mobile: `1`, `2` (4px, 8px)
- Desktop: `4`, `6`, `8` (16px, 24px, 32px)

### 3. Icon Accessibility

Always include accessible labels:

```tsx
<Button variant="ghost" size="icon" aria-label="Delete">
  <Trash2 className="size-4" />
</Button>
```

### 4. Semantic HTML

Use appropriate HTML elements:

```tsx
<nav role="navigation" aria-label="Mobile navigation">
<button aria-current={isActive ? "page" : undefined}>
<main role="main">
```

### 5. Color Contrast

Ensure sufficient contrast for accessibility:
- Use semantic color tokens: `text-foreground`, `text-muted-foreground`
- Test with dark mode
- Use border highlights for active states

---

## Quick Reference: Common Patterns

```tsx
// Page wrapper
<div className="p-1 md:p-8">

// Card header
<CardHeader className="p-2 md:p-6">

// Card content
<CardContent className="p-2 md:p-8">

// Section spacing
<div className="space-y-2 md:space-y-4">

// Button with icon
<Button className="gap-2">
  <Icon className="size-4" />
  Label
</Button>

// Responsive text
<p className="text-xs md:text-sm text-muted-foreground">

// Active state
className={cn(
  "transition-colors",
  isActive && "bg-primary/10 text-primary"
)}

// Glass effect
className="bg-background/95 backdrop-blur-lg"

// Corner decoration
<div className="absolute left-0 top-0 h-20 w-20 border-l-2 border-t-2 border-primary/30" />
```

---

## Installation & Setup

To use this design system in a new project:

1. **Install dependencies:**

```bash
bun add tailwindcss @tailwindcss/vite
bun add class-variance-authority clsx tailwind-merge
bun add lucide-react
bun add @radix-ui/react-*  # Install needed primitives
```

2. **Copy `src/styles/global.css`** to your project

3. **Copy `src/lib/utils.ts`** for the `cn()` helper:

```tsx
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

4. **Configure Tailwind** with the theme variables

5. **Copy UI components** from `src/components/ui/` as needed

---

## Resources

- **Tailwind CSS:** https://tailwindcss.com/docs
- **Radix UI:** https://www.radix-ui.com/
- **Lucide Icons:** https://lucide.dev/
- **OKLCH Color Picker:** https://oklch.com/

---

*This style guide is maintained as part of the Zenitho project. Last updated: 2024*
