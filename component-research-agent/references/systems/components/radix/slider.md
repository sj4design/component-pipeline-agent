---
system: Radix UI (WorkOS)
component: Slider
url: https://www.radix-ui.com/primitives/docs/components/slider
last_verified: 2026-03-28
confidence: high
---

# Slider

## Approach
Radix Slider is a headless slider primitive with full keyboard accessibility and multi-thumb support. It composes as Slider.Root, Slider.Track, Slider.Range, and Slider.Thumb — each a separately styleable element. This composable approach allows precise CSS control over the track (the background line), the range (the filled portion between thumbs), and the thumb(s) (the drag handles). Multi-thumb range sliders are natively supported.

## Key Decisions
1. **Multi-thumb support** (HIGH) — `defaultValue={[20, 80]}` creates two thumbs for range selection. The range filled area automatically spans between the thumbs. This is built into the core primitive, not an addon.
2. **Separate Range element** (HIGH) — Slider.Range is the filled portion of the track. Having it as a separate element allows it to be styled independently (gradient fills, custom colors) without CSS hacks.
3. **step and inverted** (MEDIUM) — `step` for discrete values; `inverted` for right-to-left or top-to-bottom sliders (used in vertical sliders where higher values are at the bottom).

## Notable Props
- `value` / `onValueChange`: controlled value array (array supports multi-thumb)
- `min` / `max`: range bounds
- `step`: discrete step size
- `orientation`: `"horizontal" | "vertical"`
- `inverted`: flip the fill direction
- `minStepsBetweenThumbs`: minimum gap between range thumbs

## A11y Highlights
- **Keyboard**: Arrow keys adjust value; Page Up/Down for larger steps; Home/End for min/max
- **Screen reader**: `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext` for non-numeric displays
- **ARIA**: Each thumb has its own ARIA slider role; range is communicated via two thumbs

## Strengths & Gaps
- **Best at**: Multi-thumb range sliders; Separate Range for custom styling; step control; orientation support
- **Missing**: No tooltip value display (must be added); no marks/tick marks at specific values
