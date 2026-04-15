---
system: Wise Design
component: Skeleton
url: https://wise.design/components/skeleton
last_verified: 2026-03-28
confidence: low
---

# Skeleton

## Approach
Wise's Skeleton provides loading placeholders for balance displays, transaction history loading, and account data fetching in their financial product.

## Key Decisions
1. **Financial data loading** (MEDIUM) — Placeholders for balance and transaction data loading.
2. **Minimal animation** (LOW) — Consistent with Wise's aesthetic.

## Notable Props
- `width`, `height`

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: aria-hidden; aria-busy on container
- **ARIA**: Standard skeleton ARIA

## Strengths & Gaps
- **Best at**: Financial data loading states
- **Missing**: Low confidence — limited documentation
