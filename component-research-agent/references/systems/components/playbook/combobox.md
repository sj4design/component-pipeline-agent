---
system: Power Home Remodeling Playbook
component: Typeahead / Combobox
url: https://playbook.powerapp.cloud
last_verified: 2026-03-28
confidence: medium
---

# Typeahead / Combobox

## Approach
Playbook likely includes a Typeahead or Combobox component for filterable selection in sales and service contexts — selecting service areas, product options, or customer records from searchable lists. The dual React/Rails architecture means both React and Rails ViewComponent variants exist. Used in scheduling, quoting, and appointment management flows.

## Key Decisions
1. **Sales workflow filterable selection** (MEDIUM) — Combobox supports selecting from lists that are too long for standard dropdowns, such as product catalogs or geographic service areas.
2. **Dual React/Rails support** (HIGH) — React component and Rails ViewComponent variants.

## Notable Props
- Standard combobox/typeahead props expected
- Async filtering support likely for larger datasets

## A11y Highlights
- **Keyboard**: Type to filter; arrow keys to navigate; Enter to select; Escape to close
- **Screen reader**: Combobox/autocomplete pattern announced
- **ARIA**: Standard combobox ARIA patterns expected

## Strengths & Gaps
- **Best at**: Sales and service filterable selection; dual React/Rails compatibility
- **Missing**: Medium confidence — verify specific implementation in Playbook docs
