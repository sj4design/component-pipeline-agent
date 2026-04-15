---
system: Fluent 2 (Microsoft)
component: Slider
url: https://fluent2.microsoft.design/components/web/react/slider/usage
last_verified: 2026-03-28
confidence: high
---

# Slider

## Approach
Fluent 2's Slider is used in Office, Teams, and Windows settings for volume control, zoom level, brightness, and configuration values. It supports vertical and horizontal orientations, step values, and marks. The slider follows Fluent's design language with the filled track in the accent color and the thumb using the neutral token system.

## Key Decisions
1. **step prop for discrete values** (HIGH) — Discrete step sliders are common in Office (font size from preset values, zoom percentages). The step prop enables this without custom quantization logic.
2. **vertical orientation** (MEDIUM) — Vertical sliders for volume-type controls (like the Teams volume slider in call controls).
3. **marks with labels** (MEDIUM) — Optional marks at specific values for labeled reference points.

## Notable Props
- `value` / `onChange`: controlled value
- `min` / `max` / `step`: configuration
- `orientation`: `"horizontal" | "vertical"`
- `size`: `"small" | "medium"`
- `marks`: optional mark positions with labels

## A11y Highlights
- **Keyboard**: Arrow keys adjust by step; Page Up/Down by larger increment; Home/End for min/max
- **Screen reader**: role="slider"; aria-valuenow, aria-valuemin, aria-valuemax, aria-valuetext
- **ARIA**: Full slider ARIA with orientation-aware keyboard behavior

## Strengths & Gaps
- **Best at**: Office/Windows control patterns; vertical orientation; step for discrete values
- **Missing**: No range (multi-thumb) slider; no built-in value tooltip
