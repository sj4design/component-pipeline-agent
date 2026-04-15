---
system: Twilio Paste
component: SearchBox / Input[type=search]
url: https://paste.twilio.design/components/input
last_verified: 2026-03-28
confidence: medium
---

# Search (Input type=search)

## Approach
Twilio Paste handles search via its Input component with type="search", combined with a search icon prefix via the insertBefore slot pattern. A separate SearchBox or Combobox with search behavior handles the auto-suggest pattern. The search input shows a native clear button (×) on modern browsers with value, and integrates with Paste's form field system.

## Key Decisions
1. **Input type="search" for simple cases** (HIGH) — Native search input type provides the browser's clear button and semantics without additional component complexity.
2. **Combobox for searchable dropdowns** (HIGH) — Paste's Combobox component handles the search-with-suggestions pattern (autocomplete search), providing the ARIA combobox pattern rather than trying to build it into the search input.
3. **SearchBox for structured search contexts** (MEDIUM) — Paste provides SearchBox composition pattern combining Input with clear button and results container for structured search UIs in the console.

## Notable Props
- `type="search"`: Native search semantics and behavior
- `insertBefore`: Search icon slot
- Combobox `autocomplete`: Enables suggestion list pattern

## A11y Highlights
- **Keyboard**: Native search input keyboard behavior; clear button accessible; Combobox adds autocomplete list keyboard navigation
- **Screen reader**: input[type=search] announces as search field; suggestions in Combobox via aria-autocomplete
- **ARIA**: role="searchbox" on search input; aria-autocomplete for Combobox pattern

## Strengths & Gaps
- **Best at**: Clear separation of simple search (Input) vs search-with-suggestions (Combobox); native search semantics
- **Missing**: No built-in standalone SearchBox component with integrated clear/submit; requires composition
