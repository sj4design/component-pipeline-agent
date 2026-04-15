---
system: Salesforce Lightning Design System
component: Input[type=number] / Numeric Input
url: https://lightningdesignsystem.com/components/input/
last_verified: 2026-03-28
confidence: high
---

# Numeric Input

## Approach
Lightning handles numeric input through its Input component with type="number" and through specialized currency/percentage formatters. Lightning's approach for formatted numbers (currency amounts, percentages) goes beyond a simple number input — it provides formatting and display modes that match Salesforce's CRM field types (Currency, Number, Percent). This is important for Salesforce's multi-locale, multi-currency CRM contexts.

## Key Decisions
1. **Locale-aware number formatting** (HIGH) — Lightning's numeric input handles locale-specific number formatting (thousands separators, decimal symbols vary by locale), essential for Salesforce's global enterprise deployments.
2. **Currency field type** (HIGH) — Dedicated handling for currency-type fields with currency symbol, appropriate decimal precision, and locale-aware formatting.
3. **Formatter/display mode** (MEDIUM) — Fields have both edit (input) and display (formatted text) modes matching the CRM field's data type, automatically handling the edit/view state transition.

## Notable Props
- `type`: "number" | "currency" | "percent"
- `min` / `max` / `step`: Constraints
- `formatter`: Locale format configuration
- `label`: Required field label

## A11y Highlights
- **Keyboard**: Native spinbutton behavior plus arrow keys; Tab focus
- **Screen reader**: Announced as spinbutton or text based on type; formatted value communicated
- **ARIA**: aria-valuemin/max/now for spinbutton; locale-aware aria-valuetext

## Strengths & Gaps
- **Best at**: Multi-locale numeric formatting; currency/percent types; CRM field type support
- **Missing**: No custom +/- stepper buttons; formatting tied to Lightning's locale system
