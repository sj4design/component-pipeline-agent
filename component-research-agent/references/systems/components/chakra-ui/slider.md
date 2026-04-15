---
system: Chakra UI
component: Slider
url: https://chakra-ui.com/docs/components/slider
last_verified: 2026-03-28
confidence: high
---

# Slider

## Approach
Chakra UI's Slider is a styled slider with track, thumb, and range fill. It integrates with Chakra's token system and supports SliderMark for tick marks at specific values and SliderThumb for custom thumb content. The component is controlled with a simple number value (not an array), meaning it's single-thumb only in the base component. RangeSlider is a separate component for two-thumb range selection.

## Key Decisions
1. **Separate Slider and RangeSlider** (HIGH) — Single and range sliders have different state shapes (number vs [number, number]) and are separate components in Chakra. This keeps each API clean.
2. **SliderMark for annotations** (HIGH) — Marks can be placed at specific values along the track with visible labels. This is essential for sliders where specific values have meaning (50% discount, specific price points).
3. **colorScheme** (MEDIUM) — The filled track and thumb use the colorScheme, consistent with Chakra's token-based coloring approach.

## Notable Props
- `value` / `onChange`: controlled single value
- `min` / `max` / `step`: range configuration
- `orientation`: `"horizontal" | "vertical"`
- `colorScheme`: token color for fill and thumb
- `SliderMark`: at `value` position with custom content
- `SliderThumb`: custom thumb element

## A11y Highlights
- **Keyboard**: Arrow keys; Page Up/Down; Home/End; orientation-aware arrow direction
- **Screen reader**: role="slider"; aria-valuenow, aria-valuemin, aria-valuemax, aria-valuetext
- **ARIA**: SliderThumb has correct slider role; marks are decorative

## Strengths & Gaps
- **Best at**: SliderMark for annotations; colorScheme; custom thumb content via SliderThumb
- **Missing**: RangeSlider is a separate component (not unified); no tooltip value display built-in
