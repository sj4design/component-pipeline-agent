---
system: shadcn/ui
component: Badge
url: https://ui.shadcn.com/docs/components/badge
last_verified: 2026-03-28
confidence: high
---

# Badge (Tag)

## Approach
shadcn/ui's Badge is a simple styled span for non-interactive labels and status indicators. It's intentionally minimal — just visual variants with no interaction semantics. For interactive removable tags/chips, developers compose their own solution or use the Command-based multi-select pattern. Badge is purely presentational with variant-based styling via CVA.

## Key Decisions
1. **Non-interactive label only** (HIGH) — Badge is a purely decorative/informational element; interactive chip patterns require developer composition with proper button semantics, preventing accidental inaccessible click handlers on badges.
2. **CVA variant system** (HIGH) — Four variants (default, secondary, destructive, outline) managed by class-variance-authority, consistent with Button's variant approach.
3. **Composable with asChild** (MEDIUM) — Badge supports asChild pattern allowing it to render as a link or button when interactive badge behavior is needed, while explicit about requiring the developer to make that choice.

## Notable Props
- `variant`: "default" | "secondary" | "destructive" | "outline"
- `className`: Tailwind extension
- `asChild`: Render as child element (link, button) when interactive

## A11y Highlights
- **Keyboard**: Non-interactive badges not in tab order
- **Screen reader**: Text content announced; color/variant conveys no semantic meaning by default
- **ARIA**: No additional ARIA needed for non-interactive display; asChild inherits child element's semantics

## Strengths & Gaps
- **Best at**: Simple status labels; CVA variant system; no over-engineering
- **Missing**: No removable chip/pill built-in; no color system for custom label colors
