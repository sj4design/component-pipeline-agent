---
system: Orbit (Kiwi.com)
component: InputField (type="search") — no dedicated Search component
url: https://orbit.kiwi/components/inputfield/
last_verified: 2026-03-28
confidence: medium
---

# Search

## Approach
Orbit does not have a dedicated Search component. However, flight search is Kiwi.com's core product, implemented through specialized flight search components (origin/destination inputs with location autocomplete) rather than a generic search input. General search uses Orbit's InputField with a search icon prefix. The specialized nature of travel search means a generic SearchField component would not cover Kiwi.com's primary search pattern.

## Key Decisions
1. **No generic Search** (HIGH) — Kiwi.com's search is domain-specific (flight routes, airports, cities) and handled by custom location autocomplete components, not a generic search input.

## Notable Props
- InputField with prefix search icon for non-flight search contexts

## A11y Highlights
- **Keyboard**: Standard input behavior
- **Screen reader**: Native input semantics

## Strengths & Gaps
- **Best at**: Travel-specific search handled by specialized components
- **Missing**: Generic search component for non-flight search use cases
