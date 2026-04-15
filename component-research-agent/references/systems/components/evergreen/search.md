---
system: Evergreen (Segment)
component: SearchInput
url: https://evergreen.segment.com/components/search-input
last_verified: 2026-03-28
confidence: medium
---

# SearchInput

## Approach
Evergreen provides a SearchInput component — a TextInput pre-configured with a search icon and appropriate styling for search contexts. This is used throughout Segment's interface for filtering tables, searching connections, and finding events. The component is essentially a convenience wrapper around TextInput with a search icon baked in.

## Key Decisions
1. **Convenience component** (MEDIUM) — Pre-configured TextInput for search use cases reduces boilerplate. Consistent search input appearance across Segment's products.
2. **onChange for live filtering** (HIGH) — Search in analytics is typically live-filtering (Table.SearchHeaderCell uses this pattern), so onChange is the primary interaction event.

## Notable Props
- `value` / `onChange`: controlled
- `placeholder`: search placeholder
- `height`: size control

## A11y Highlights
- **Keyboard**: Native input behavior; type="search" semantics
- **Screen reader**: Search input semantics; label required from consumer
- **ARIA**: Standard search input

## Strengths & Gaps
- **Best at**: Consistent search styling; analytics filter patterns
- **Missing**: No autocomplete; no clear button built-in; minimal API
