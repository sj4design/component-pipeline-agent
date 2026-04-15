---
system: Base Web (Uber)
component: Select
url: https://baseweb.design/components/select/
last_verified: 2026-03-28
confidence: medium
---

# Select

## Approach
Base Web's Select is a feature-rich, custom select component that supports both single and multi-select modes with built-in search/filtering. It is one of Base Web's most-used components because Uber's operational tools frequently need filterable dropdowns for large option lists (driver categories, city names, service types). The component uses Base Web's Overrides pattern for deep customization and supports both synchronous and asynchronous option loading.

## Key Decisions
1. **Built-in search/filter** (HIGH) — The select input is searchable by default, filtering options as you type. For Uber's use cases (selecting from hundreds of cities or driver IDs), filtering is essential. This differs from most select components where search is opt-in.
2. **Multi-select as a first-class mode** (HIGH) — Single and multi-select are both well-supported, with multi-select showing selected items as removable tags/chips inside the input. Uber's filter interfaces (selecting multiple service types, multiple cities) make multi-select as important as single select.
3. **Async option loading** (HIGH) — The `onInputChange` callback combined with async `options` updating supports server-side search for very large option sets. This is critical for Uber's operations tools where option lists can be thousands of items.

## Notable Props
- `options`: array of `{ label, id }` objects
- `value`: selected value(s)
- `multi`: boolean — enables multi-select
- `onInputChange`: filter/search callback
- `isLoading`: shows loading indicator while options load
- `overrides`: customize all internal components
- `filterOption`: custom filter function

## A11y Highlights
- **Keyboard**: Arrow keys navigate options; Enter selects; Escape closes; Backspace removes last multi-select item
- **Screen reader**: role="combobox" with aria-expanded; options list is role="listbox" with role="option" items
- **ARIA**: Multi-select items have remove buttons with accessible labels; search input announces result count

## Strengths & Gaps
- **Best at**: Multi-select with tags; async loading; built-in search; Overrides for customization
- **Missing**: Documentation density can be overwhelming; some edge cases in async multi-select need workarounds
