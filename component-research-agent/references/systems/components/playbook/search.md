---
system: Playbook (Power Home Remodeling)
component: SearchBar
url: https://playbook.powerapp.cloud/kits/search_bar
last_verified: 2026-03-28
confidence: medium
---

# SearchBar

## Approach
Playbook's SearchBar is used in their CRM for searching customer records, job entries, and product information. Dual React/Rails implementation. Includes search icon, input, and clear/submit patterns suited to CRM lookup workflows.

## Key Decisions
1. **CRM record search** (HIGH) — Optimized for searching CRM records with fast lookup patterns.
2. **Dual React/Rails** (HIGH) — Cross-stack consistent implementation.
3. **Clear button** (MEDIUM) — Quick clear for resetting search state.

## Notable Props
- `value`: Search value
- `onChange`: Change callback
- `onSubmit`: Search submission handler
- `placeholder`: Search placeholder

## A11y Highlights
- **Keyboard**: Type; Enter to search; clear button accessible
- **Screen reader**: Search input role; results announced
- **ARIA**: role="searchbox"; aria-label

## Strengths & Gaps
- **Best at**: CRM record search; dual framework
- **Missing**: Medium confidence; autocomplete feature uncertain
