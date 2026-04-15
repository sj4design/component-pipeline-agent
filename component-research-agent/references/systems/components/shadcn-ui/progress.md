---
system: shadcn/ui
component: Progress
url: https://ui.shadcn.com/docs/components/progress
last_verified: 2026-03-28
confidence: high
---

# Progress

## Approach
shadcn/ui's Progress is built on Radix UI's Progress primitive, providing a determinate progress bar with role="progressbar" and aria-value semantics. The component animates the fill using CSS transforms, with a smooth transition driven by the value prop. Like most shadcn/ui components, it's intentionally simple with full customization via Tailwind.

## Key Decisions
1. **Radix Progress primitive** (HIGH) — Radix handles the ARIA progressbar semantics and value communication; Tailwind handles the visual styling.
2. **CSS transform animation** (HIGH) — Smooth fill animation using CSS transform: scaleX() or translateX(), providing polished progress feedback without JavaScript animation libraries.
3. **Simple single-segment** (MEDIUM) — Single progress fill only; multi-segment or complex progress patterns require developer composition.

## Notable Props
- `value`: Current progress (0-100)
- `className`: Tailwind customization for bar styling

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: role="progressbar"; aria-valuemin/max/now; aria-label required (developer must provide via aria-label prop)
- **ARIA**: Radix auto-wires role="progressbar" and aria-value* attributes

## Strengths & Gaps
- **Best at**: Clean simple progress bar; smooth CSS animation; Radix ARIA correctness; full Tailwind customization
- **Missing**: No multi-segment; no circular variant; developer must provide aria-label for accessible naming
