---
system: Mantine
component: Progress / RingProgress
url: https://mantine.dev/core/progress/
last_verified: 2026-03-28
confidence: high
---

# Progress / RingProgress

## Approach
Mantine provides Progress (linear) and RingProgress (circular ring with segment support). Progress supports both single-color and multi-section bars (showing multiple values stacked). RingProgress shows a circular progress ring with multiple colored sections, plus a center label slot. The multi-section feature of both components is particularly distinctive.

## Key Decisions
1. **Multi-section Progress** (HIGH) — Multiple `sections` with different colors and values can be stacked in a single Progress bar. Used for showing composition (budget spent + reserved + available) or multi-step completion tracking.
2. **RingProgress with center label** (HIGH) — The circular RingProgress accepts a center label (number, icon, text) in the middle of the ring. Used for donut-style KPI displays in dashboards.
3. **animated prop** (MEDIUM) — CSS transition animation on value changes, smooth for real-time progress updates.

## Notable Props
- Progress: `value` (0-100) or `sections: [{value, color, tooltip?}]`
- `animated`: boolean for smooth transitions
- `size`: thickness
- `radius`: corner rounding
- RingProgress: `sections`, `label` (center ReactNode), `rootColor`

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: role="progressbar"; multi-section values are in aria
- **ARIA**: Total value communicated; individual sections accessible via tooltip

## Strengths & Gaps
- **Best at**: Multi-section Progress; RingProgress center label; animated transitions; one of the best progress systems in T3
- **Missing**: No step-based progress indicator; no timeline progress
