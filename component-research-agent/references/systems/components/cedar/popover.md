---
system: REI Cedar
component: Popover
url: https://cedar.rei.com/components/popover
last_verified: 2026-03-28
confidence: medium
---

# Popover

## Approach
REI Cedar's Popover provides interactive overlay panels for product detail supplementary information, size guide previews, and contextual help in their e-commerce context. Vue-based with Cedar's accessibility standards.

## Key Decisions
1. **Product info overlays** (HIGH) — Used for size guide previews, product feature explanations, and contextual help.
2. **Touch-friendly dismiss** (HIGH) — Tap/click outside to dismiss for mobile e-commerce users.
3. **Placement auto-positioning** (MEDIUM) — Stays in viewport on product pages.

## Notable Props
- `trigger`: Anchor element
- `position`: Placement direction

## A11y Highlights
- **Keyboard**: Trigger opens; Escape closes; Tab within
- **Screen reader**: dialog role; focus management
- **ARIA**: aria-haspopup; focus return

## Strengths & Gaps
- **Best at**: E-commerce product information overlays; mobile dismiss
- **Missing**: Medium confidence; some API details uncertain
