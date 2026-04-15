---
system: shadcn/ui
component: Slider
url: https://ui.shadcn.com/docs/components/slider
last_verified: 2026-03-28
confidence: high
---

# Slider

## Approach
shadcn/ui's Slider is built on Radix UI's Slider primitive, providing a fully accessible custom slider with custom thumb and track styling. Radix's Slider supports single and range (dual-thumb) modes, full keyboard navigation, and ARIA slider semantics. The component replaces the native range input for consistent cross-browser visual while maintaining accessibility.

## Key Decisions
1. **Radix Slider primitive** (HIGH) — Custom slider thumb/track with Radix's ARIA slider implementation (role="slider", aria-valuemin/max/now/text), keyboard navigation (arrow keys, Home/End, Page Up/Down), and step support.
2. **Range selection support** (HIGH) — Radix Slider natively supports multiple thumbs (range selection) — `defaultValue={[25, 75]}` creates a dual-thumb range slider, significantly extending the native range input which only supports single thumb.
3. **Custom track fill** (MEDIUM) — Custom track fill shows selected range visually, much more customizable than native input[type=range] which has poor cross-browser track fill support.

## Notable Props
- `defaultValue` / `value`: Array of numbers (single or dual thumb)
- `onValueChange`: Change callback with array of values
- `min` / `max`: Range boundaries
- `step`: Increment step
- `disabled`: Disabled state
- `orientation`: "horizontal" | "vertical"

## A11y Highlights
- **Keyboard**: Arrow keys adjust; Page Up/Down for 10% jumps; Home/End for min/max; each thumb independently keyboard-navigable
- **Screen reader**: role="slider"; aria-valuemin/max/now/text on each thumb; orientation communicated
- **ARIA**: Radix auto-wires role="slider"; all aria-value* attributes; aria-orientation

## Strengths & Gaps
- **Best at**: Range (dual-thumb) slider; custom visual styling; vertical orientation; Radix ARIA correctness
- **Missing**: No built-in value label display; no tick/marker labels on track; developers add these
