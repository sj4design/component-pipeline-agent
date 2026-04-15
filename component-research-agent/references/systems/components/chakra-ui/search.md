---
system: Chakra UI
component: Search (no dedicated component — use Input with InputGroup)
url: https://chakra-ui.com/docs/components/input
last_verified: 2026-03-28
confidence: high
---

# Search Input

## Approach
Chakra UI does not have a dedicated Search component. The standard pattern is to use InputGroup with InputLeftElement containing a search icon, wrapping an Input with `type="search"`. This follows Chakra's composition philosophy. For autocomplete search, Chakra v3 recommends using Ark UI's Combobox as the foundation.

## Key Decisions
1. **No dedicated Search** (MEDIUM) — The InputGroup + icon pattern handles most search UI needs without a specialized component.
2. **type="search" for semantics** (MEDIUM) — Using the native search input type provides browser clear-on-escape behavior and proper search semantics.

## Notable Props
- Input: `type="search"`, standard input props
- InputLeftElement: search icon placement

## A11y Highlights
- **Keyboard**: Escape clears (native); standard input navigation
- **Screen reader**: `role="search"` on wrapping form element
- **ARIA**: Wrapping form with role="search" creates search landmark

## Strengths & Gaps
- **Best at**: Consistent with InputGroup patterns; no additional dependencies
- **Missing**: No autocomplete suggestion list; no result count announcement
