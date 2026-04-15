---
system: Mantine
component: Slider / RangeSlider
url: https://mantine.dev/core/slider/
last_verified: 2026-03-28
confidence: high
---

# Slider / RangeSlider

## Approach
Mantine provides both Slider (single thumb) and RangeSlider (two thumbs) with matching APIs. Both support marks with labels, a floating value tooltip, and color customization. The mark system is particularly useful — marks can have labels that appear below the track, creating labeled reference points without custom implementation.

## Key Decisions
1. **Slider + RangeSlider separation** (HIGH) — Like Chakra, separate components for different state shapes.
2. **label tooltip on thumb** (HIGH) — The `label` prop accepts a formatter function that creates a floating tooltip showing the current value. `label={(value) => value + "px"}` shows a formatted value tooltip during drag. This is a common need that Mantine handles natively.
3. **marks with labels** (HIGH) — `marks={[{ value: 20, label: '20%' }]}` renders tick marks with labels at specific positions. Essential for sliders where specific values have meaning.

## Notable Props
- `value` / `onChange`: controlled value
- `min` / `max` / `step`: configuration
- `label`: value formatter for thumb tooltip (null = no tooltip)
- `marks`: array of `{ value, label }` for tick marks
- `color`: fill color token
- `size`: track thickness
- RangeSlider: `minRange` — minimum gap between thumbs

## A11y Highlights
- **Keyboard**: Arrow keys; Shift+Arrow for 10x step; Home/End for min/max
- **Screen reader**: role="slider"; aria-valuenow, valuemin, valuemax, valuetext
- **ARIA**: Marks are decorative; aria-valuetext uses label formatter for human-readable value

## Strengths & Gaps
- **Best at**: Built-in label tooltip; labeled marks; RangeSlider with minRange; Shift+Arrow for 10x
- **Missing**: No vertical orientation; no custom thumb content
