---
system: Mantine
component: Autocomplete / TextInput with search
url: https://mantine.dev/core/autocomplete/
last_verified: 2026-03-28
confidence: high
---

# Search (via Autocomplete or TextInput)

## Approach
Mantine does not have a dedicated Search component but provides excellent building blocks. For search with suggestions, `Autocomplete` is purpose-built: it combines a text input with a dropdown of matching suggestions. For simple search inputs, TextInput with `leftSection` (search icon) and `rightSection` (clear button) handles the common pattern. Mantine's Spotlight (from `@mantine/spotlight`) provides a full command palette / global search overlay.

## Key Decisions
1. **Autocomplete for search suggestions** (HIGH) — Mantine's Autocomplete handles the search-with-suggestions pattern with filtering, keyboard navigation, and customizable option rendering. This is more appropriate than building search on top of Select.
2. **Spotlight for command palette** (HIGH) — A separate package provides a `Ctrl+K` style search overlay with action search, navigation, and custom result types. This is a common modern application pattern.
3. **filter function** (MEDIUM) — Autocomplete accepts a custom `filter` function for custom matching logic (fuzzy search, multi-field matching).

## Notable Props
- Autocomplete: `data`, `value`, `onChange`, `onOptionSubmit`, `filter`, `renderOption`
- TextInput: `type="search"`, `leftSection`, `rightSection`
- Spotlight: global search overlay with keyboard shortcut

## A11y Highlights
- **Keyboard**: Arrow keys navigate suggestions; Enter selects; Escape closes; clear button accessible
- **Screen reader**: role="combobox" on Autocomplete input; suggestion list announced
- **ARIA**: Autocomplete follows combobox ARIA pattern; result count announced

## Strengths & Gaps
- **Best at**: Autocomplete for search-with-suggestions; Spotlight for global search; filter function for custom matching
- **Missing**: No pre-built simple SearchInput component; Spotlight requires separate package
