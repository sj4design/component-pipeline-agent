---
system: shadcn/ui
component: Button
url: https://ui.shadcn.com/docs/components/button
last_verified: 2026-03-28
confidence: high
---

# Button

## Approach
shadcn/ui's Button is built on Radix UI Slot (via asChild pattern) and styled with Tailwind CSS using class-variance-authority (CVA) for variant management. The component is intentionally minimal in its base form, with developers expected to extend it. The asChild pattern allows rendering any element or component as a button while maintaining all button styling, which is particularly powerful for router link integration.

## Key Decisions
1. **asChild / Radix Slot pattern** (HIGH) — The `asChild` prop delegates rendering to the child component while applying button styles, enabling `<Button asChild><Link href="/">Home</Link></Button>` patterns for router-aware buttons without wrapper divs.
2. **class-variance-authority for variants** (HIGH) — CVA manages variant and size combinations in a type-safe, composable way that integrates naturally with Tailwind, making extension of variants straightforward.
3. **Minimal base, extension encouraged** (HIGH) — The button provides 6 variants (default, destructive, outline, secondary, ghost, link) and 4 sizes as a starting point, with full code ownership enabling any customization.

## Notable Props
- `variant`: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
- `size`: "default" | "sm" | "lg" | "icon"
- `asChild`: Boolean — renders child as the button element (Radix Slot pattern)
- `disabled`: Native disabled attribute

## A11y Highlights
- **Keyboard**: Native button keyboard behavior; Enter and Space activate
- **Screen reader**: Native button semantics; icon-only buttons require aria-label when using size="icon"
- **ARIA**: Native button ARIA; asChild preserves the child's semantics when needed

## Strengths & Gaps
- **Best at**: asChild pattern for router integration; CVA variant system for extension; full code ownership
- **Missing**: No built-in loading state; no stateful/toggle button; developers must add these themselves
