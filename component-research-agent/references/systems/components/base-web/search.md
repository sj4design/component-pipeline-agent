---
system: Base Web (Uber)
component: Search Input (via Input with overrides)
url: https://baseweb.design/components/input/
last_verified: 2026-03-28
confidence: medium
---

# Search Input

## Approach
Base Web does not have a dedicated Search component. Search inputs are created using the Input component with a startEnhancer containing a search icon, optionally combined with a clearable prop. Uber's operational dashboards use search inputs in table headers, filter panels, and global navigation. The Input component's flexibility handles all these use cases without a dedicated search component.

## Key Decisions
1. **Input with startEnhancer** (MEDIUM) — The standard Base Web pattern: Input + search icon in startEnhancer + clearable for clear button.
2. **clearable for search inputs** (HIGH) — The built-in clear button is particularly valuable for search inputs where users need to quickly clear and retry.

## Notable Props
- Input: `type="search"`, `startEnhancer`, `clearable`

## A11y Highlights
- **Keyboard**: Escape clears (native); clear button is keyboard accessible
- **Screen reader**: Search input type semantics
- **ARIA**: role="search" on wrapping form

## Strengths & Gaps
- **Best at**: clearable for search patterns; consistent with Input API
- **Missing**: No dedicated search component; no autocomplete suggestion list
