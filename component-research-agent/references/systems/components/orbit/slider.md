---
system: Orbit (Kiwi.com)
component: Slider / RangeSlider
url: https://orbit.kiwi/components/rangeslider/
last_verified: 2026-03-28
confidence: medium
---

# Slider / RangeSlider

## Approach
Orbit provides a RangeSlider component for price range filtering in flight search results. The slider is one of Orbit's primary filter components — users filter flights by price range, departure time range, and duration range. The RangeSlider is specifically designed for the travel search filter panel use case.

## Key Decisions
1. **RangeSlider first-class** (HIGH) — Range filtering is the primary use case in flight search. Single-value sliders are less relevant for Kiwi.com's main interface.
2. **valueDescription** (MEDIUM) — Shows a textual description of the selected range (e.g., "€50 - €200") below the slider. Essential for making the slider value clear on mobile.

## Notable Props
- `defaultValue`: array `[min, max]` for range
- `minValue` / `maxValue`: bounds
- `step`: discrete steps
- `valueDescription`: text description of current range
- `onChange`: range change callback

## A11y Highlights
- **Keyboard**: Arrow keys per thumb; range slider ARIA
- **Screen reader**: Two slider thumbs each with aria-valuenow; range context communicated
- **ARIA**: Standard range slider ARIA

## Strengths & Gaps
- **Best at**: Travel price range filtering; valueDescription; mobile-friendly design
- **Missing**: No single-value slider; no marks/labels along track
