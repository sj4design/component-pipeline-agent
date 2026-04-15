---
system: Salesforce Lightning Design System
component: Slider
url: https://lightningdesignsystem.com/components/slider/
last_verified: 2026-03-28
confidence: high
---

# Slider

## Approach
Salesforce Lightning's Slider is a range input component used in CRM for configuring numeric values within a defined range — setting percentage weights, configuring thresholds, and adjusting numeric settings. Lightning wraps the native input[type=range] with consistent styling and integrates with Lightning's form field system (label, help text, error). The component shows the current value alongside the slider.

## Key Decisions
1. **Native range input foundation** (HIGH) — Native input[type=range] for accessibility and keyboard behavior, with CSS styling for consistent cross-browser visual.
2. **Value display** (HIGH) — Current value shown alongside the slider track, important for CRM configuration where users need to see the exact numeric value being set (not just relative position).
3. **Size variants** (MEDIUM) — Small, medium, large sizes for different form layout contexts.

## Notable Props
- `min` / `max`: Range boundaries
- `step`: Increment step size
- `value`: Controlled value
- `onChange`: Value change callback
- `label`: Required form label
- `size`: "x-small" | "small" | "medium" | "large"
- `disabled`: Disabled state

## A11y Highlights
- **Keyboard**: Arrow keys adjust value; Page Up/Down for larger increments; Home/End for min/max
- **Screen reader**: Current value announced; label provides context; min/max communicated
- **ARIA**: Native range input aria; aria-valuemin, aria-valuemax, aria-valuenow; aria-valuetext for meaningful labels

## Strengths & Gaps
- **Best at**: CRM numeric configuration with value display; native accessibility; form field integration
- **Missing**: No range selection (dual handle); no custom track markers or labels
