---
system: Playbook (Power Home Remodeling)
component: TextInput[type=number]
url: https://playbook.powerapp.cloud/kits/text_input
last_verified: 2026-03-28
confidence: medium
---

# Number Input

## Approach
Playbook handles numeric input through its TextInput component with type="number". May have a dedicated stepper for quantity/count inputs used in their product ordering and scheduling contexts. Dual React/Rails.

## Key Decisions
1. **CRM quantity inputs** (MEDIUM) — Used for numeric CRM values like quantity, count, pricing.
2. **Dual React/Rails** (HIGH) — Both implementations.

## Notable Props
- `type="number"`, `min`, `max`, `step`

## A11y Highlights
- **Keyboard**: Native spinbutton behavior
- **Screen reader**: Spinbutton announced
- **ARIA**: Native number input ARIA

## Strengths & Gaps
- **Best at**: CRM numeric data entry; dual framework
- **Missing**: Medium confidence; custom stepper uncertain
