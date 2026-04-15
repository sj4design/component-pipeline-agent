---
system: Mantine
component: Combobox
url: https://mantine.dev/core/combobox/
last_verified: 2026-03-29
confidence: high
---

# Combobox

## Approach
Mantine v7 introduced a low-level `Combobox` primitive that powers all higher-level select components (`Select`, `MultiSelect`, `Autocomplete`, `TagsInput`). The Combobox exposes composable sub-components — `Combobox.Target`, `Combobox.Dropdown`, `Combobox.Options`, `Combobox.Option`, `Combobox.Search`, and `Combobox.Footer` — giving developers full control over the dropdown structure. This architectural shift from v6 moved away from opinionated all-in-one selects toward a headless-style primitive that can be assembled into any filtering, searching, or multi-select pattern. The store hook `useCombobox()` manages open state, keyboard navigation, and option selection logic.

## Key Decisions
1. **Composable primitive architecture** (HIGH) — By exposing sub-components rather than a monolithic select, Mantine allows custom option renderers, grouped options, virtualized lists, and async search without forking the component — reflecting the library's v7 maturity and shift toward flexibility.
2. **useCombobox store** (HIGH) — The `useCombobox()` hook encapsulates keyboard navigation state (highlighted index, open/close) so developers get accessible behavior without managing it manually.
3. **Powers higher-level components** (MEDIUM) — Select, MultiSelect, Autocomplete, and TagsInput are all built on Combobox, ensuring consistent behavior and reducing duplicate ARIA logic across the library.

## Notable Props
- `store`: Result of `useCombobox()` — manages open state and navigation
- `onOptionSubmit`: Callback when an option is selected
- `withinPortal`: Renders dropdown in a portal to avoid z-index conflicts
- `Combobox.Option value`: Each option must have a `value` prop

## A11y Highlights
- **Keyboard**: Arrow keys navigate options; Enter selects; Escape closes dropdown
- **Screen reader**: `role="combobox"` on the input, `role="listbox"` on the dropdown, `role="option"` on each item
- **ARIA**: `aria-expanded`, `aria-activedescendant`, `aria-selected` are managed automatically by the store

## Strengths & Gaps
- **Best at**: Building highly customized select/autocomplete UIs with full control over rendering while retaining accessible keyboard and ARIA behavior
- **Missing**: No built-in virtualization for very large option lists — developers must integrate a library like `react-window` themselves
