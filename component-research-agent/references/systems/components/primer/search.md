---
system: GitHub Primer
component: SearchInput
url: https://primer.style/components/search-input
last_verified: 2026-03-28
confidence: high
---

# SearchInput

## Approach
GitHub Primer's SearchInput is a specialized Input variant with built-in search icon, clear button, and keyboard shortcut hint. It's used throughout GitHub for filtering repository contents, searching issues, and filtering user lists. The component is optimized for GitHub's ubiquitous filter-as-you-type pattern (real-time list filtering on keystroke rather than form submission search).

## Key Decisions
1. **Filter-as-you-type optimization** (HIGH) — SearchInput is designed for client-side filtering rather than full-page search submission, matching GitHub's common pattern of filtering lists of issues, PRs, files as you type.
2. **Built-in clear button** (HIGH) — Clear button appears when there is input value, enabling quick clearing of filter state without manual text selection/deletion.
3. **Keyboard shortcut display** (MEDIUM) — Can display a keyboard shortcut hint (e.g., "/") in the input to surface GitHub's "/" to focus search keyboard shortcuts, reinforcing keyboard navigation culture.

## Notable Props
- `value`: Controlled input value
- `onChange`: Change handler for filter-as-you-type
- `onClear`: Clear button callback
- `loading`: Loading indicator for async search
- `placeholder`: Search placeholder text

## A11y Highlights
- **Keyboard**: Type to filter; Escape clears; clear button keyboard accessible; "/" shortcut to focus
- **Screen reader**: Search input role; clear button labeled; loading state communicated
- **ARIA**: role="searchbox" or input[type="search"]; aria-label for search context; clear button aria-label

## Strengths & Gaps
- **Best at**: Filter-as-you-type; built-in clear button; keyboard shortcut integration; GitHub patterns
- **Missing**: No suggestion/autocomplete list built-in; full search autocomplete requires Combobox
