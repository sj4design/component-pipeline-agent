---
system: Playbook (Power Home Remodeling)
component: Radio
url: https://playbook.powerapp.cloud/kits/radio
last_verified: 2026-03-28
confidence: medium
---

# Radio

## Approach
Playbook's Radio and RadioGroup are used in CRM forms for mutually exclusive selections — job types, appointment scheduling preferences, and configuration choices. Dual React/Rails implementation. Standard radio group with fieldset semantics.

## Key Decisions
1. **CRM selection patterns** (HIGH) — Designed for mutually exclusive CRM option selection.
2. **Dual React/Rails** (HIGH) — Both implementations for stack consistency.
3. **Fieldset semantics** (MEDIUM) — Proper grouping for accessible radio sets.

## Notable Props
- `value`: Controlled selection
- `onChange`: Callback
- `name`: Group binding
- `options`: Radio options array

## A11y Highlights
- **Keyboard**: Arrow keys within group; Tab exits
- **Screen reader**: Option + group label; checked state
- **ARIA**: Fieldset/legend; aria-checked

## Strengths & Gaps
- **Best at**: CRM form radio patterns; dual framework
- **Missing**: Medium confidence; visual variant uncertain
