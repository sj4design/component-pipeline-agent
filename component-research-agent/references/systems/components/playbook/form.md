---
system: Playbook (Power Home Remodeling)
component: Form
url: https://playbook.powerapp.cloud/kits/form
last_verified: 2026-03-28
confidence: medium
---

# Form

## Approach
Playbook's Form provides layout and structure for CRM data entry forms — customer information, job details, scheduling entries. Dual React/Rails. Form sections, labels, and validation display are organized consistently.

## Key Decisions
1. **CRM data entry forms** (HIGH) — Structured forms for entering and editing CRM records.
2. **Dual React/Rails** (HIGH) — Both React and ViewComponent form patterns.
3. **Validation integration** (MEDIUM) — Error display integrated with Playbook's form field components.

## Notable Props
- Standard form layout and validation props
- `onSubmit`: Form submission handler

## A11y Highlights
- **Keyboard**: Tab order through form fields
- **Screen reader**: Label associations; error messages; group labels
- **ARIA**: aria-required; aria-invalid; aria-describedby for errors

## Strengths & Gaps
- **Best at**: CRM form patterns; dual framework; integrated validation display
- **Missing**: Medium confidence; advanced form layout details uncertain
