---
system: Wise Design
component: Popover
url: https://wise.design/components/popover
last_verified: 2026-03-28
confidence: low
---

# Popover

## Approach
Wise's Popover provides interactive overlay panels for fee breakdowns, exchange rate details, and contextual financial information in their product. Financial product popovers explain complex information (fee structures, mid-market rates) with interactive links to learn more.

## Key Decisions
1. **Financial explanation overlays** (MEDIUM) — Explains fee and exchange rate details inline.
2. **Clean minimal styling** (MEDIUM) — Consistent with Wise's aesthetic.
3. **Link support** (LOW) — Interactive links to detailed documentation.

## Notable Props
- `trigger`, `placement`

## A11y Highlights
- **Keyboard**: Trigger opens; Escape closes
- **Screen reader**: dialog role expected
- **ARIA**: Standard popover ARIA

## Strengths & Gaps
- **Best at**: Financial explanation interactive overlays
- **Missing**: Low confidence — limited documentation
