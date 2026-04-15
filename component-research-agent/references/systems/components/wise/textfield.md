---
system: Wise Design
component: Input
url: https://wise.design/components/input
last_verified: 2026-03-28
confidence: low
---

# Input (Text Field)

## Approach
Wise's Input is used for financial data entry — transfer amounts, recipient details, account numbers, and personal information. Financial input context demands clear validation states, appropriate input types, and formatting guidance. Wise's clean aesthetic produces minimal, focused input fields.

## Key Decisions
1. **Financial data entry** (MEDIUM) — Inputs designed for common financial data: amounts (numeric), IBAN/account numbers, recipient names, and address fields.
2. **Clear validation states** (MEDIUM) — Error and success states clearly communicated for the validation-heavy financial form flows.
3. **Prefix/suffix for amounts** (MEDIUM) — Currency symbol prefix and unit suffix likely supported for amount inputs.

## Notable Props
- `value`: Controlled value
- `onChange`: Change handler
- `error`: Error message
- `label`: Field label

## A11y Highlights
- **Keyboard**: Native input behavior
- **Screen reader**: Label and error associations
- **ARIA**: Standard form field ARIA

## Strengths & Gaps
- **Best at**: Financial data entry patterns; clear validation feedback
- **Missing**: Low confidence — limited public documentation
