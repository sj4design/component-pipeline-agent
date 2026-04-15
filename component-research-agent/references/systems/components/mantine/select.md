---
system: Mantine
component: Select / MultiSelect / NativeSelect
url: https://mantine.dev/core/select/
last_verified: 2026-03-28
confidence: high
---

# Select / MultiSelect / NativeSelect

## Approach
Mantine provides three select variants: Select (single, custom dropdown), MultiSelect (multi-value with tags), and NativeSelect (native HTML select). The Select component is built on Mantine's Combobox primitive and supports filtering, custom option rendering, item creation, and async loading. MultiSelect renders selected values as removable badges/tags in the input. This is one of the most comprehensive select systems in any design system.

## Key Decisions
1. **Three dedicated components** (HIGH) — Separate components for each use case instead of a single configurable component. This keeps each API clean: Select has single-value logic, MultiSelect has multi-value array logic, NativeSelect has no custom rendering. Teams can import exactly what they need.
2. **Creatable options** (HIGH) — Select and MultiSelect support `creatable` mode where users can add new options by typing. This is essential for tag-style inputs (adding custom labels, creating new categories) common in SaaS dashboards.
3. **renderOption for custom items** (HIGH) — A callback that replaces the default option rendering with any ReactNode. This enables icon+label options, user avatars, color swatches, or complex option layouts without a separate "custom select" component.

## Notable Props
- `data`: `string[] | { value, label, disabled?, group? }[]` — flexible data format
- `searchable`: enables filtering (Combobox-based)
- `creatable`: allows creating new options
- `renderOption`: custom option rendering callback
- `maxDropdownHeight`: limits dropdown height
- MultiSelect: `value: string[]`, `maxValues`: cap on selections
- `clearable`: shows clear button when value is set

## A11y Highlights
- **Keyboard**: Arrow keys navigate options; Enter selects; Escape closes; Backspace removes last multi-select item
- **Screen reader**: role="combobox" with aria-expanded; listbox with options; selected items in MultiSelect have remove buttons with labels
- **ARIA**: Filter results announce count; multi-select items announce their removable state

## Strengths & Gaps
- **Best at**: Creatable options; renderOption for custom rendering; MultiSelect with tag display; async loading
- **Missing**: No grouped option headers with sticky positioning; no virtualization for very long lists (in base component)
