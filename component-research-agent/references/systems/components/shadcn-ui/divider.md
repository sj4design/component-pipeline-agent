---
system: shadcn/ui
component: Separator
url: https://ui.shadcn.com/docs/components/separator
last_verified: 2026-03-28
confidence: high
---

# Separator (Divider)

## Approach
shadcn/ui's Separator component is built on Radix UI Separator primitive and provides a thin horizontal or vertical line for visual content separation. It maps directly to the Radix UI Separator which handles the semantic vs. decorative distinction automatically. Used throughout shadcn/ui's own documentation and example layouts to separate sections of content.

## Key Decisions
1. **Radix UI Separator primitive** (HIGH) — Built on @radix-ui/react-separator which handles role="separator" vs. role="none" (decorative) automatically based on the `decorative` prop.
2. **Horizontal and vertical** (MEDIUM) — Both orientations supported via the `orientation` prop, with vertical being useful inside flex containers to separate inline items.
3. **Semantic by default** (MEDIUM) — Not decorative by default — uses role="separator" which is announced by screen readers, appropriate for meaningful content separation.

## Notable Props
- `orientation`: "horizontal" | "vertical"
- `decorative`: Boolean — renders as role="none" if true

## A11y Highlights
- **Keyboard**: Not interactive; not in tab order
- **Screen reader**: role="separator" by default; aria-hidden if decorative
- **ARIA**: role="separator" or role="none"; aria-orientation for vertical

## Strengths & Gaps
- **Best at**: Semantic vs. decorative distinction via Radix primitive; clean implementation; both orientations
- **Missing**: No visual variants (dashed, dotted, thicker); single visual style only
