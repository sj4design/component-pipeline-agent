---
system: Wise Design
component: Segmented Control
url: https://wise.design/components/segmented-control
last_verified: 2026-03-28
confidence: low
---

# Segmented Control

## Approach
Wise may use a segmented control for product type selection (Personal/Business), transfer frequency (One-time/Recurring), or view toggles in their financial product. Clean minimal styling consistent with Wise's aesthetic.

## Key Decisions
1. **Product type selection** (MEDIUM) — Personal vs Business account/feature selection.
2. **Clean visual** (MEDIUM) — Minimal pill or connected button appearance.

## Notable Props
- `value`, `onChange`, options

## A11y Highlights
- **Keyboard**: Group keyboard navigation
- **Screen reader**: Selection state announced
- **ARIA**: Appropriate group semantics

## Strengths & Gaps
- **Best at**: Financial product type and mode selection
- **Missing**: Low confidence — limited documentation
