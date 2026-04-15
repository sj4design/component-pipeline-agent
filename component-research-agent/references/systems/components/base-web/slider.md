---
system: Base Web (Uber)
component: Slider
url: https://baseweb.design/components/slider/
last_verified: 2026-03-28
confidence: medium
---

# Slider

## Approach
Base Web's Slider follows the Overrides customization pattern. It supports single and range (multi-thumb) sliders with marks and labels. Uber's products use sliders for price range filters in the driver app and for configuration sliders in internal tools.

## Key Decisions
1. **Range support** (HIGH) — Array value for multi-thumb range selection, used for price range filtering.
2. **marks prop** (MEDIUM) — Discrete marks at specific values along the track.
3. **Overrides pattern** (HIGH) — Full customization of track, fill, thumb, mark, and tick elements.

## Notable Props
- `value`: number or [number, number] for range
- `min` / `max` / `step`: configuration
- `marks`: boolean or array of mark positions
- `overrides`

## A11y Highlights
- **Keyboard**: Arrow keys adjust value; each thumb has role="slider"
- **Screen reader**: aria-valuenow, aria-valuemin, aria-valuemax per thumb
- **ARIA**: Standard slider ARIA

## Strengths & Gaps
- **Best at**: Range support; marks; Overrides customization
- **Missing**: No built-in value tooltip; limited documentation
