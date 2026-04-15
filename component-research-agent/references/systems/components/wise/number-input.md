---
system: Wise Design
component: Number Input / Amount Input
url: https://wise.design/components/number-input
last_verified: 2026-03-28
confidence: low
---

# Number Input / Amount Input

## Approach
Wise's Number/Amount Input is critical — entering transfer amounts is the core Wise workflow. The amount input likely has currency formatting, real-time exchange rate display, and precise decimal handling for financial amounts. This goes beyond a simple number input.

## Key Decisions
1. **Transfer amount entry** (HIGH) — Primary use is entering monetary amounts for transfers, requiring precise decimal handling and currency context.
2. **Currency formatting** (HIGH) — Locale-aware currency formatting as the user types.
3. **Real-time conversion display** (MEDIUM) — Exchange rate and converted amount shown alongside the input.

## Notable Props
- `value`: Amount value
- `currency`: Currency context
- `onChange`: Change handler
- `min` / `max`: Amount bounds

## A11y Highlights
- **Keyboard**: Numeric input; formatted value accessible
- **Screen reader**: Amount and currency announced; exchange rate information accessible
- **ARIA**: aria-label with currency context; formatted value communicated

## Strengths & Gaps
- **Best at**: Financial amount entry with currency context; real-time conversion display
- **Missing**: Low confidence — limited public documentation
