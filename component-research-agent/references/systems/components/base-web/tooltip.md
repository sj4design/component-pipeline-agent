---
system: Base Web (Uber)
component: Tooltip
url: https://baseweb.design/components/tooltip/
last_verified: 2026-03-28
confidence: medium
---

# Tooltip

## Approach
Base Web's Tooltip follows the same Overrides pattern as all Base Web components. It provides hover/focus triggered informational tooltips with configurable placement and delay. Base Web also provides a Popover component for richer interactive overlays, with Tooltip being the simplified non-interactive variant. The component adapts to Uber's light and dark themes via the token system.

## Key Decisions
1. **Tooltip vs Popover distinction** (HIGH) — Base Web clearly separates Tooltip (non-interactive, hover-only, role="tooltip") from Popover (interactive content, click-triggered). This prevents the common mistake of putting interactive content in a tooltip.
2. **Overrides for content customization** (MEDIUM) — The tooltip content and arrow can be replaced via overrides, allowing rich content without needing a full Popover.
3. **showArrow** (LOW) — Boolean to show/hide the directional arrow. Simple but commonly needed.

## Notable Props
- `content`: tooltip content (string or ReactNode)
- `placement`: position enum
- `showArrow`: boolean
- `overrides`: content/body/inner customization

## A11y Highlights
- **Keyboard**: Opens on trigger focus; Escape closes
- **Screen reader**: role="tooltip"; aria-describedby on trigger
- **ARIA**: Standard tooltip ARIA pattern

## Strengths & Gaps
- **Best at**: Clear Tooltip vs Popover separation; Overrides for content
- **Missing**: No configurable delay; limited built-in styling options
