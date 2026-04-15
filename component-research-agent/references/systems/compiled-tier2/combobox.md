---
component: Combobox
tier: 2
last_verified: 2026-03-28
---

# Combobox — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Combobox | Downshift-based; single and multi-select; grouped options; filter-as-you-type | high |
| Salesforce Lightning | Combobox | CRM record lookup; multi-select pills; server-side filtering; full-featured | high |
| GitHub Primer | Autocomplete / SelectPanel | Autocomplete (single); SelectPanel (multi, panel-based); async loading | high |
| shadcn/ui | Combobox (Command + Popover) | cmdk fuzzy search; Command in Popover; single and multi-select recipes | high |
| Playbook | Typeahead / Combobox | Filterable selection; dual React/Rails | medium |
| REI Cedar | Combobox (not present) | Not present; native select for shorter lists | medium |
| Wise Design | Combobox (not present) | Not dedicated; country/currency selectors are product-specific | low |
| Dell Design System | Combobox | Enterprise IT configuration filterable selection | low |

## Key Decision Patterns

**Library approaches:** Paste uses Downshift (battle-tested ARIA combobox). shadcn/ui uses cmdk (fuzzy search, command palette origins). Primer builds its own (Autocomplete) and a panel pattern (SelectPanel). Lightning builds its own. Each has distinct interaction character.

**Multi-select with pills:** Lightning and Paste support multi-select where selected items appear as removable pill tokens. This is the standard pattern for selecting multiple related items (tags, assignees, labels).

**Server-side filtering:** Lightning and Primer Autocomplete support async option loading (search query → API call → options). Essential for CRM record lookup where full option list cannot be loaded client-side (thousands of records).

**SelectPanel (Primer) vs. inline dropdown:** Primer's SelectPanel opens as a dialog panel — a heavier interaction than an inline dropdown but appropriate for complex multi-select with search in a dedicated UI. shadcn/ui Command is similar in concept.

## A11y Consensus
- role="combobox" on the input element
- aria-expanded="true"|"false" on the input
- aria-autocomplete="list" (filters existing options) or "none"
- aria-controls pointing to the listbox id
- aria-activedescendant pointing to the highlighted option
- role="listbox" on dropdown; role="option" on each item; aria-selected="true" for selected
- Multi-select: each selected pill has a remove button with aria-label="Remove [item]"
- Keyboard: Type to filter; Up/Down to navigate; Enter to select; Escape to close; Backspace to remove last pill (multi)

## Recommended Use
Use Paste Combobox with Downshift for Twilio Console filterable selects. Use Lightning Combobox for CRM record lookup with server-side search. Use Primer SelectPanel for multi-select label/assignee patterns. Use shadcn/ui Command+Popover for React apps with cmdk fuzzy search.
