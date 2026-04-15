---
component: Search
tier: 2
last_verified: 2026-03-28
---

# Search — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | SearchBar | role="searchbox" + search form; submit button; no autocomplete suggestions | high |
| Salesforce Lightning | Global Search / Search Input | Global search with autocomplete; scoped search; MRU suggestions | high |
| GitHub Primer | SearchInput | input[type=search]; leading magnifier icon; role="searchbox" | high |
| shadcn/ui | Command (Search) | cmdk library; fuzzy search; Command Menu pattern; keyboard navigation | high |
| Playbook | SearchBar | Search in sales workflows; dual React/Rails | medium |
| REI Cedar | CdrSearchBar | Vue search; autocomplete option; WCAG 2.1 AA | medium |
| Wise Design | Search | Recipient/account search in transfer flows | low |
| Dell Design System | Search | Enterprise IT resource search | low |

## Key Decision Patterns

**Input-only vs. autocomplete:** Primer's SearchInput is a simple input[type=search] with magnifier icon — no built-in autocomplete. Paste's SearchBar adds a submit button. Lightning and Cedar offer autocomplete/suggestion dropdowns. shadcn/ui's Command provides a completely different search paradigm — an app-level command palette.

**Command pattern (shadcn/ui):** shadcn/ui's primary search story is the Command component (cmdk) — a keyboard-first command/search palette, more like Spotlight or VS Code's Command Palette than a traditional search input. Best for filtering a known set of items in-app.

**Global vs. scoped search:** Lightning distinguishes global search (across all CRM objects) from scoped search (within a specific object type or section). This is unique to Salesforce's multi-object CRM context.

**Role semantics:** role="searchbox" or role="search" (on the form/landmark) are the correct ARIA patterns. input[type=search] browsers may automatically expose searchbox role.

## A11y Consensus
- role="searchbox" on input or input[type=search]
- Landmark: `<search>` element (HTML5) or role="search" on wrapping form
- Submit: Enter key or search button; both must work
- Autocomplete suggestions: role="listbox" with role="option"; aria-expanded; aria-activedescendant
- Clear button: aria-label="Clear search"

## Recommended Use
Use Primer SearchInput for simple search fields. Use shadcn/ui Command for in-app command/search palettes. Use Lightning Global Search for CRM-style entity search with autocomplete. Use role="search" landmark on the form wrapping any search input.
