---
component: Search
tier: 3
last_verified: 2026-03-29
---

# Search — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Not available — TextField type="search" | Native `type="search"` via TextField; TextField.Slot for search icon; no autocomplete; `role="search"` on form wrapper for landmark. | high |
| Chakra UI | Not available — InputGroup pattern | InputGroup with InputLeftElement (search icon) + Input `type="search"`; Ark UI Combobox for autocomplete search. | high |
| GOV.UK | Search (form pattern) | Form-based: `<form role="search">` + text input + "Search" button text (not icon-only); works without JavaScript; header search included; no autocomplete in core. | high |
| Base Web | Not available — Input type="search" | Standard Input with `type="search"` and search icon via enhancer; no dedicated component. | medium |
| Fluent 2 | SearchBox | Dedicated component; integrated dismiss (clear) button on content entry; `onSearch` callback for Enter/submit; appearance variants matching Input system. | high |
| Gestalt | SearchField | Dedicated component; `cancelButton` for mobile exit-search-mode pattern; required `accessibilityClearButtonLabel` enforces clear button accessibility; both `onChange` and `onSubmit` events. | medium |
| Mantine | Autocomplete / Spotlight | No dedicated SearchInput; Autocomplete for search-with-suggestions; `@mantine/spotlight` package for command palette/global search overlay (Ctrl+K pattern); custom `filter` function for fuzzy matching. | high |
| Orbit | Not available — domain-specific | Flight search uses specialized location autocomplete, not a generic search; InputField for incidental search contexts. | medium |
| Evergreen | SearchInput | Convenience wrapper around TextInput with search icon; `onChange` for live table filtering; minimal API; no clear button or autocomplete. | medium |
| Nord | Not available — nord-input type="search" | Healthcare search (patient records, medication databases) via Input web component with `type="search"`; no dedicated search component. | low |

## Key Decision Patterns

The T3 set divides cleanly into three categories: systems with a dedicated Search component (Fluent 2, Gestalt, Evergreen), systems that use an existing input with `type="search"` and icon styling (Radix, Chakra, Base Web, Nord), and systems where "search" refers to a specialized domain-specific component (Orbit's location autocomplete, Mantine's Spotlight). The dedicated component decision correlates directly with how central search is to the product: Microsoft 365 search (Fluent 2), Pinterest's core search UX (Gestalt), and Segment's table filtering (Evergreen) all warrant a first-class component.

Mantine's Spotlight package is the only T3 implementation of the command palette / global search overlay pattern (`Ctrl+K` or `⌘K` to open a floating search that returns app actions, navigation, and content). This pattern has become standard in developer tools and SaaS applications (VS Code, Linear, Vercel, Figma) but remains outside the scope of most design systems. Mantine encapsulates it in a separate package with action registration, keyboard shortcut binding, and custom result type rendering.

GOV.UK's form-based search pattern is the only T3 implementation designed to work without JavaScript. A `<form role="search">` with a text input and a labeled "Search" button submits to the server, returns a results page, and works on any device, browser, or assistive technology. The button label must be visible text ("Search") rather than an icon — GOV.UK research found that icon-only search buttons are missed by some users, particularly those using screen magnifiers who see only a portion of the screen.

The accessibility gap common to most T3 search implementations is the absence of live region announcements for search results. When a user types in a search field and results update dynamically, screen reader users receive no notification that results have changed unless the application explicitly adds an `aria-live="polite"` region that announces the result count. No T3 system handles this automatically; it is universally left to the application layer.

## A11y Consensus

- Search inputs should have `type="search"` for native Escape-to-clear behavior and correct semantic role (`searchbox`) — all T3 systems use this where a dedicated component exists.
- The search form container should have `role="search"` to create a search landmark that screen reader users can navigate to directly — this is distinct from a generic form or nav landmark.
- Clear (dismiss) buttons inside search inputs must have accessible labels (`aria-label="Clear search"`) — icon-only buttons without labels are common and incorrect; Gestalt's required `accessibilityClearButtonLabel` is the only enforcement mechanism in the T3 set.
- Dynamic search results (live filtering) should announce result counts to screen readers via `aria-live="polite"` (e.g., "12 results found"); no T3 system provides this automatically.
- GOV.UK's requirement for a visible "Search" text button (not icon-only) reflects research showing that icon-only search submit buttons are missed by screen magnifier users viewing partial screen content.

## Recommended Use

Reference T3 search approaches when deciding on dedicated component vs. composed input, autocomplete integration, and command palette patterns. Fluent 2's SearchBox is the reference for a dedicated search component with integrated clear button and `onSearch` callback; Gestalt's SearchField is the reference for mobile `cancelButton` pattern and enforced clear button accessibility; Mantine's Spotlight is the reference for command palette / global search overlay; GOV.UK is the reference for progressive-enhancement form-based search and the visible label button requirement.
