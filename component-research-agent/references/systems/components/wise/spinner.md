---
system: Wise Design
component: Spinner / Loader
url: https://wise.design/components/spinner
last_verified: 2026-03-28
confidence: low
---

# Spinner / Loader

## Approach
Wise's Spinner is used for financial operation loading states — transfer processing, exchange rate calculation, and account data loading. Financial loading states carry user anxiety so the spinner should be paired with informative text about what's happening.

## Key Decisions
1. **Financial operation loading** (MEDIUM) — Used during transfer processing where user expectation management is critical.
2. **Contextual text pairing** (MEDIUM) — Spinner likely paired with status text in financial contexts.
3. **Clean minimal animation** (LOW) — Consistent with Wise's aesthetic.

## Notable Props
- `size`, `label`

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: Loading state announced
- **ARIA**: aria-label or live region

## Strengths & Gaps
- **Best at**: Financial operation loading communication
- **Missing**: Low confidence — limited documentation
