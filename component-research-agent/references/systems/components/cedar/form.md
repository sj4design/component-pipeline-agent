---
system: REI Cedar
component: FormGroup / Form
url: https://cedar.rei.com/components/form-group
last_verified: 2026-03-28
confidence: medium
---

# Form / FormGroup

## Approach
REI Cedar's Form and FormGroup components organize e-commerce forms — checkout, account creation, product review submission. Vue-based with Cedar's accessibility standards ensuring proper label/field associations and validation display.

## Key Decisions
1. **Checkout form focus** (HIGH) — Forms designed for checkout completion with clear validation feedback.
2. **FormGroup with fieldset** (HIGH) — Related fields grouped with fieldset/legend for accessibility.
3. **WCAG 2.1 AA compliance** (HIGH) — Cedar's accessibility commitment applied to form patterns.

## Notable Props
- `label`: Form section/group label
- Standard Vue form field composition

## A11y Highlights
- **Keyboard**: Tab through fields in logical order
- **Screen reader**: Label associations; group labels; error messages
- **ARIA**: aria-required; aria-invalid; fieldset/legend for groups

## Strengths & Gaps
- **Best at**: E-commerce checkout forms; accessible grouping; Cedar accessibility compliance
- **Missing**: Medium confidence; some API details uncertain
