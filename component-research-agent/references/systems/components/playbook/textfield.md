---
system: Playbook (Power Home Remodeling)
component: TextInput
url: https://playbook.powerapp.cloud/kits/text_input
last_verified: 2026-03-28
confidence: medium
---

# TextInput

## Approach
Playbook's TextInput is a core form component used throughout their CRM for customer data entry, job information, and scheduling fields. Follows Playbook's form field pattern with integrated label, help text, and error messaging. Supports both React and ViewComponent implementations.

## Key Decisions
1. **Integrated form field** (HIGH) — Label, help text, and error are part of the TextInput component rather than separate composition, reflecting Playbook's pragmatic all-in-one form field approach.
2. **Dual React/Rails** (HIGH) — React and ViewComponent implementations for cross-stack consistency.
3. **Icon support** (MEDIUM) — Leading/trailing icon support for common CRM input patterns (search, URL, phone).

## Notable Props
- `label`: Field label
- `value`: Controlled value
- `onChange`: Change callback
- `error`: Error message
- `helperText`: Help text
- `type`: Input type

## A11y Highlights
- **Keyboard**: Native input keyboard behavior
- **Screen reader**: Label association; error announcement
- **ARIA**: aria-required; aria-invalid; aria-describedby for error/help

## Strengths & Gaps
- **Best at**: CRM data entry; dual framework; integrated label/error pattern
- **Missing**: Medium confidence; some API details uncertain
