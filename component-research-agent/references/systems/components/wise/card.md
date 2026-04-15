---
system: Wise Design
component: Card
url: https://wise.design/components/card
last_verified: 2026-03-28
confidence: low
---

# Card

## Approach
Wise's Card is used for account summary displays, balance overviews, and feature highlight containers in their financial product. Clean white card containers with subtle shadow, consistent with Wise's minimal aesthetic.

## Key Decisions
1. **Financial account display** (MEDIUM) — Account balance and transfer summary cards are primary use cases.
2. **Minimal visual treatment** (MEDIUM) — Clean cards with minimal decoration, emphasizing content clarity for financial data.
3. **Clickable variant** (LOW) — Feature selection and account option cards may be clickable.

## Notable Props
- Standard container props; `onClick` for interactive variant

## A11y Highlights
- **Keyboard**: Non-interactive unless explicitly interactive
- **Screen reader**: Content determines announcement
- **ARIA**: Interactive cards need explicit role

## Strengths & Gaps
- **Best at**: Financial account summary display
- **Missing**: Low confidence — limited documentation
