---
system: Wise Design
component: Button
url: https://wise.design/components/button
last_verified: 2026-03-28
confidence: low
---

# Button

## Approach
Wise Design System's Button is used throughout Wise's money transfer and financial management product. The system emphasizes a clean, trustworthy aesthetic that reduces anxiety in financial decision-making contexts. Wise's buttons use their green primary brand color for primary actions and are designed to convey confidence and clarity. The system is relatively minimal compared to enterprise-scale systems.

## Key Decisions
1. **Trust-oriented primary styling** (MEDIUM) — Primary button uses Wise's brand green, chosen to convey positive action (send money, confirm transfer) in a financial context where color psychology matters.
2. **Minimal variant set** (MEDIUM) — A focused set of variants (primary, secondary, tertiary) rather than the extensive variant lists of enterprise systems, reflecting Wise's product-focused approach.
3. **Loading state** (MEDIUM) — Loading state is critical for financial operations where API calls confirm transfers and balances.

## Notable Props
- `variant`: Primary, secondary, tertiary
- `loading`: Loading state
- `disabled`: Disabled state
- `size`: Size variants

## A11y Highlights
- **Keyboard**: Standard button activation
- **Screen reader**: Standard button announcement
- **ARIA**: Standard button ARIA expected

## Strengths & Gaps
- **Best at**: Clean financial product button patterns; trust-forward primary styling
- **Missing**: Low confidence — limited public documentation; details need web verification
