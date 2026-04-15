---
component: Select
tier: 3
last_verified: 2026-03-29
---

# Select — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Select | Custom replacement for native `<select>`; `position` prop (item-aligned vs. popper); ScrollUpButton/ScrollDownButton for long lists; type-ahead; no multi-select. | high |
| Chakra UI | Select / NativeSelect | Both variants: NativeSelect for mobile/simple cases, custom Select via Ark UI for styled rich rendering; recommendation is context-dependent. | high |
| GOV.UK | Select | Native `<select>` always; research-backed: custom dropdowns perform worse for government audiences on mobile and with assistive technology; error/hint integration. | high |
| Base Web | Select | Built-in search/filter by default; multi-select with tags; async option loading via `onInputChange`; Overrides pattern. | medium |
| Fluent 2 | Dropdown / Combobox | Separate components: Dropdown (non-editable, single/multi) vs. Combobox (editable/searchable); multi-select with visible checkboxes; option icons and secondary text. | high |
| Gestalt | SelectList / Dropdown | SelectList (native) for simple forms; Dropdown (custom) for rich option rendering; mirrors two-variant pattern. | medium |
| Mantine | Select / MultiSelect / NativeSelect | Three separate components; `creatable` mode for user-created options; `renderOption` for custom item rendering; MultiSelect with `maxValues`; async loading. | high |
| Orbit | Select | Native `<select>` wrapper; prefix icon slot for travel context (cabin class icon, passenger icon); small finite option sets suit native behavior on mobile. | medium |
| Evergreen | Select / SelectMenu | SelectMenu is multi-select with built-in search filter for analytics filtering (hundreds of event types/properties); `isMultiSelect` with checkboxes. | medium |
| Nord | Select (nord-select) | Native `<select>` web component; healthcare form integration with error/helper-text; reliability and accessibility over visual customization. | low |

## Key Decision Patterns

The most fundamental divide in T3 select components is native `<select>` versus custom replacement. GOV.UK, Orbit, Nord, and Gestalt's SelectList all wrap the native element; Radix, Fluent 2, Mantine's Select, Base Web, and Evergreen's SelectMenu all build a custom replacement. The justification for native is consistent: mobile platform behavior (iOS wheel picker, Android dropdown), no-JavaScript operation, and universal assistive technology support. The justification for custom is also consistent: native `<select>` options cannot be styled, cannot contain icons or secondary text, and cannot be filtered/searched on large lists. The T3 pattern is: native for simple small-list selects, especially mobile-first; custom for rich option rendering, search, and multi-select.

Fluent 2's Dropdown vs. Combobox separation is the most architecturally clean approach. Most systems build a single Select component with a `searchable` flag that changes the interaction model — but a non-editable dropdown (close on selection, arrow keys cycle through options) and an editable combobox (type to filter, Tab completes) have fundamentally different keyboard behaviors and ARIA patterns (`role="listbox"` vs. `role="combobox"`). Making them separate components prevents the API awkwardness of conditionally applying different keyboard handlers and ARIA attributes in the same component.

Mantine's `creatable` mode is the only T3 system that allows users to create new options by typing a value that doesn't exist in the list. This pattern — common in tagging interfaces, category creation, and label management — typically requires a separate "TagsInput" or "Combobox" component in other systems. Mantine implements it as a prop on Select and MultiSelect, using the same dropdown UI with a "Create [value]" option injected when the typed text doesn't match any existing option.

Base Web's built-in search-by-default is the strongest design decision in T3 for operational tooling. Most T3 systems make search opt-in (`searchable={true}` or a separate `Combobox`); Base Web makes filtering the default behavior. For Uber's internal tools with hundreds of cities, driver categories, or service types, an unfiltered dropdown is never what teams want — making search default reduces the chance of teams forgetting to enable it and shipping an unusable long dropdown.

## A11y Consensus

- Custom select components must implement `role="combobox"` on the trigger with `aria-expanded`, `role="listbox"` on the options panel, and `role="option"` with `aria-selected` on each item — this is the WAI-ARIA pattern for custom selects.
- Native `<select>` elements are more accessible on mobile platforms and with some assistive technologies than custom implementations; the preference for native in GOV.UK and healthcare contexts is evidence-backed, not conservative.
- Multi-select removable tags must have accessible buttons with labels describing what will be removed ("Remove Python from selection") — icon-only remove buttons without labels are common accessibility failures.
- Type-ahead (pressing a letter key to jump to options starting with that letter) is part of the ARIA listbox keyboard pattern and must be implemented in custom selects; Radix and Fluent 2 implement it.
- Async loading states must communicate loading to screen readers — a visible spinner inside the trigger without an `aria-live` announcement or `aria-busy` attribute leaves screen reader users unaware that options are loading.

## Recommended Use

Reference T3 select approaches when deciding between native and custom implementations, Dropdown vs. Combobox separation, and creatable options. Radix is the reference for custom select with type-ahead and scroll buttons for long lists; Fluent 2 is the reference for Dropdown/Combobox separation and multi-select with checkboxes; Mantine is the reference for creatable options, `renderOption` for custom item rendering, and three dedicated components for different use cases; GOV.UK is the reference for the research-backed argument for native select in public-facing services.
