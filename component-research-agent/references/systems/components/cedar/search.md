---
system: REI Cedar
component: Search Input
url: https://cedar.rei.com/components/input
last_verified: 2026-03-28
confidence: medium
---

# Search Input

## Approach
REI Cedar handles search via a specialized search input pattern used prominently in REI's product catalog search — the primary way customers discover products. The search experience on REI.com is critical to the business, so Cedar's search input is designed for the autocomplete product search pattern with suggestion dropdowns.

## Key Decisions
1. **Product catalog search** (HIGH) — Search is designed for REI's product catalog discovery, the primary search use case on REI.com.
2. **Autocomplete suggestion** (HIGH) — Search suggestions as you type are central to the REI product search experience.
3. **Mobile search prominence** (HIGH) — Search input is prominently sized and positioned for mobile product discovery.

## Notable Props
- `value`: Search query
- `onChange`: Query change handler
- `onSearch`: Search submission
- `suggestions`: Autocomplete results

## A11y Highlights
- **Keyboard**: Type; Arrow keys through suggestions; Enter to search/select; Escape to close suggestions
- **Screen reader**: Search input; suggestions list announced via aria-live
- **ARIA**: Combobox pattern for autocomplete; aria-live for suggestions

## Strengths & Gaps
- **Best at**: E-commerce product search with autocomplete; REI catalog discovery patterns
- **Missing**: Medium confidence on full Vue API; advanced filtering features uncertain
