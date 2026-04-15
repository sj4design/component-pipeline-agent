---
system: REI Cedar
component: Slider (Filter / Price Range)
url: https://cedar.rei.com/components
last_verified: 2026-03-28
confidence: medium
---

# Slider / Price Range

## Approach
REI Cedar may implement a slider specifically for price range filtering in product catalog browsing — a common e-commerce filter pattern. A dual-thumb range slider for min/max price selection is a key use case for REI's product filtering system. Confidence is medium as the specific Cedar slider component details are not fully known.

## Key Decisions
1. **Price range filter use case** (HIGH) — Primary slider use case in REI's e-commerce is the price range filter slider for product catalog browsing.
2. **Dual-thumb range** (MEDIUM) — Min and max price selection requires a dual-thumb slider.
3. **Touch-friendly thumb size** (MEDIUM) — Thumb sized for mobile touch accuracy given REI's mobile users.

## Notable Props
- `min` / `max`: Price range boundaries
- `value`: [minPrice, maxPrice] range array
- `onChange`: Range change callback

## A11y Highlights
- **Keyboard**: Arrow keys on each thumb; Tab between thumbs
- **Screen reader**: Current values announced
- **ARIA**: aria-valuemin/max/now on each thumb

## Strengths & Gaps
- **Best at**: E-commerce price range filtering; mobile touch-friendly thumbs
- **Missing**: Medium confidence; exact Cedar slider implementation uncertain
