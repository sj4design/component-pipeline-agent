---
system: Wise Design
component: Tag / Badge
url: https://wise.design/components/tag
last_verified: 2026-03-28
confidence: low
---

# Tag / Badge

## Approach
Wise's Tag/Badge is used for transaction status indicators, account type labels, and feature tags in their financial product. Status communication is important in financial contexts (pending, completed, failed transactions). Clean minimal styling consistent with Wise's aesthetic.

## Key Decisions
1. **Transaction status** (MEDIUM) — Primary use for financial transaction status (pending, completed, cancelled, failed).
2. **Semantic color coding** (MEDIUM) — Colors communicate transaction status with appropriate semantics.
3. **Non-interactive** (LOW) — Likely primarily non-interactive status labels.

## Notable Props
- `label`: Tag text
- `status` / `variant`: Status type

## A11y Highlights
- **Keyboard**: Non-interactive; not in tab order
- **Screen reader**: Text announced; status not color-only
- **ARIA**: Status text communicated textually

## Strengths & Gaps
- **Best at**: Financial transaction status labels
- **Missing**: Low confidence — limited documentation
