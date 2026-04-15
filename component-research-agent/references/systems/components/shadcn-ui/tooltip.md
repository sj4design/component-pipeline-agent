---
system: shadcn/ui
component: Tooltip
url: https://ui.shadcn.com/docs/components/tooltip
last_verified: 2026-03-28
confidence: high
---

# Tooltip

## Approach
shadcn/ui's Tooltip is built on Radix UI's Tooltip primitive, providing hover/focus-triggered tooltip with automatic positioning and focus management. The compound component pattern (TooltipProvider, Tooltip, TooltipTrigger, TooltipContent) requires wrapping the app with TooltipProvider for shared delay/skip-delay configuration across all tooltips. This global provider pattern enables consistent hover delay behavior across an entire application.

## Key Decisions
1. **TooltipProvider global configuration** (HIGH) — Global provider controls hover delay and skipDelayDuration (time to skip delay when cursor moves between tooltips), ensuring consistent tooltip timing behavior throughout the app.
2. **Radix Tooltip primitive** (HIGH) — Radix handles positioning (auto-flip), pointer events, show/hide on hover/focus, and ARIA role="tooltip" / aria-describedby wiring automatically.
3. **TooltipContent portal** (MEDIUM) — Tooltip content renders in a portal, preventing z-index and overflow clipping issues when tooltips are inside overflow:hidden containers.

## Notable Props
- `delayDuration`: Custom delay in milliseconds (on TooltipProvider or individual Tooltip)
- `skipDelayDuration`: Provider-level skip delay for cursor-moving-between-tooltips UX
- `side`: "top" | "bottom" | "left" | "right" on TooltipContent
- `sideOffset`: Offset from trigger in pixels

## A11y Highlights
- **Keyboard**: Shows on focus of trigger; Escape dismisses; does not trap focus
- **Screen reader**: role="tooltip" on content; aria-describedby on trigger; Radix auto-wires the relationship
- **ARIA**: Radix auto-wires role="tooltip" and aria-describedby trigger-content relationship

## Strengths & Gaps
- **Best at**: Global delay configuration via Provider; portal rendering; Radix ARIA correctness; auto-flip positioning
- **Missing**: No label vs description type distinction (Primer's strength); no rich HTML validation warnings
