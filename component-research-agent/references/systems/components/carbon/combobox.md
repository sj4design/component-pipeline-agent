---
system: Carbon (IBM)
component: ComboBox (explicitly distinct from Dropdown)
url: https://carbondesignsystem.com/components/combobox/usage/
last_verified: 2026-03-28
---

# ComboBox

## Approach
Carbon Design System explicitly documents ComboBox as a separate component from Dropdown, and the usage documentation draws the line between them with notable clarity. Carbon's Dropdown is for selecting from a fixed, pre-defined set of options where the user always chooses an existing value. Carbon's ComboBox is for selecting from a known list while also allowing users to type to filter options and — critically — to enter values not in the list when no matching option exists. In IBM's enterprise product context, the ComboBox use case typically appears in configuration and administration interfaces: specifying a server hostname (suggestions from known hosts, but new hostnames allowed), selecting tags from an existing taxonomy (known tags suggested, new tags creatable), or configuring a pipeline step (known step types suggested, custom types accepted). Carbon's ComboBox was built for the technical IBM administrator who benefits from suggestions but should not be constrained to a fixed vocabulary in configuration workflows.

## Key Decisions
1. **ComboBox is explicitly distinct from Dropdown in documentation and API** (HIGH) — Carbon's usage documentation states directly: "Use a dropdown when the user needs to select an item from a predefined list. Use a combo box when the user needs to choose an option from a list or enter a value that is not present in the list." This explicit disambiguation is more useful than systems that blur the line or provide only one component for both patterns. The naming uses the full "combo box" compound word, consistent with the W3C ARIA specification, which reflects Carbon's commitment to standards alignment.
2. **Built-in filtering with multiple filter modes** (HIGH) — Carbon's ComboBox handles client-side filtering automatically when the user types. The filtering is case-insensitive substring matching by default, and the `filterItems` prop allows replacing the default filter with a custom function. This is more opinionated than Spectrum (which requires external filtering) but provides more convenience for common use cases. The default substring matching covers most IBM enterprise use cases where users might type a partial hostname, service name, or tag value.
3. **`downshiftProps` escape hatch for advanced behavior** (MEDIUM) — Carbon's ComboBox is built on the Downshift library, and the `downshiftProps` prop exposes the underlying Downshift API for advanced customizations. This is an intentional architectural transparency: rather than abstracting away the underlying implementation and re-creating every possible configuration prop, Carbon exposes the underlying library's API for power users. This is practical for IBM developers who need edge-case behavior but creates a leaky abstraction that couples applications to Downshift's API.
4. **Custom value acceptance is the default, not opt-in** (HIGH) — Unlike Spectrum's `allowsCustomValue` which defaults to false, Carbon's ComboBox accepts custom values by default. When the user types a value not in the list and confirms (pressing Enter or clicking away), the typed value is accepted as the selection. This default reflects IBM's use case: in configuration UIs, blocking custom values would prevent administrators from entering new resource names that don't yet exist in the suggestions list.
5. **`invalid` and `invalidText` for validation feedback** (MEDIUM) — Carbon's ComboBox includes first-class validation props that integrate with Carbon's form validation pattern. An invalid combobox shows a red border and an error message below the field. This is more complete than Spectrum's ComboBox, which leaves validation display to the application layer.

## Notable Props
- `filterItems`: `(items, inputValue) => items[]` — Custom filter function, replacing Carbon's default substring matching.
- `downshiftProps`: Escape hatch to the underlying Downshift library for edge-case behavior — a deliberate architectural transparency decision.
- `invalid` / `invalidText`: First-class validation props integrated with Carbon's form validation visual system.
- `initialSelectedItem`: The pre-selected value — Carbon uses an "initial" pattern (uncontrolled) as an alternative to the fully controlled `selectedItem` / `onChange` pattern.
- `light`: `boolean` — Renders the lighter background variant for use on dark-background surfaces, following Carbon's surface-aware component approach.

## A11y Highlights
- **Keyboard**: Arrow Down from the input opens the listbox; Arrow Down/Up navigates options while the input retains focus via `aria-activedescendant`. Enter selects the highlighted option or confirms a custom value. Escape closes the listbox. Tab closes the listbox and moves focus to the next focusable element.
- **Screen reader**: The component uses `role="combobox"` on the input with `aria-expanded`, `aria-autocomplete="list"`, and `aria-controls` pointing to the listbox. The number of available suggestions is announced when the listbox opens. The highlighted option is tracked via `aria-activedescendant`. Downshift provides the underlying ARIA management, which is generally well-implemented.
- **ARIA**: Implements the ARIA 1.1 Combobox pattern via Downshift. `role="listbox"` on the dropdown panel with `role="option"` items. Selected options have `aria-selected="true"`. The pattern is WCAG 2.1 AA compliant in standard usage.

## Strengths & Gaps
- **Best at**: Clear, explicitly-documented separation from Dropdown with sensible defaults (custom values allowed by default, built-in substring filtering, first-class form validation integration) — the most developer-friendly Combobox in Tier 1 for enterprise configuration UIs.
- **Missing**: A formal "create new option" UI affordance (e.g., a "Create 'custom-value'" option appearing at the bottom of the filtered listbox when no match exists) — Carbon accepts custom values silently without providing a visual "create" affordance that makes the capability discoverable to users unfamiliar with the component.
