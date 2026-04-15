---
system: Base Web (Uber)
component: Combobox
url: https://baseweb.design/components/combobox/
last_verified: 2026-03-29
confidence: high
---

# Combobox

## Approach
Base Web's Combobox is a controlled, accessible text input paired with a filterable dropdown list, built to handle both freeform text entry and selection from a predefined option set. It differs from the Select component in that the user can type a value not present in the options list, which is essential for address autocomplete and search-with-suggestion patterns used across Uber products. The component renders a listbox popup that responds to keyboard navigation and closes on blur or selection. Like all Base Web components, every sub-element is accessible via the `overrides` prop, making it straightforward to inject custom option renderers for rich suggestion rows.

## Key Decisions
1. **Freeform entry allowed** (HIGH) — Unlike Select, Combobox does not restrict input to the options list, enabling autocomplete and partial-match workflows (e.g., Uber Eats restaurant search).
2. **Controlled-first API** (HIGH) — `value`, `onChange`, and `options` are all caller-managed, reflecting Base Web's preference for predictable state ownership in complex operational apps.
3. **Override system on all slots** (HIGH) — Input, Popover, ListItem, and Option are all overridable, allowing teams to inject icons, secondary text, or custom highlight logic.
4. **mapOptionToString normalization** (MEDIUM) — A mapper prop converts option objects to display strings, decoupling the data shape from the rendering layer.

## Notable Props
- `value`: string — current input value (controlled)
- `onChange`: (value: string) => void — fires on every keystroke
- `options`: array — list of option objects or strings
- `mapOptionToString`: (option) => string — derives display text from option object
- `onOptionChange`: (option) => void — fires when an option is selected from the list
- `overrides`: object — sub-element overrides

## A11y Highlights
- **Keyboard**: Arrow Down opens and navigates the listbox; Enter selects; Escape closes; Home/End jump to first/last option.
- **Screen reader**: Input has `role="combobox"` with `aria-expanded` and `aria-autocomplete="list"`.
- **ARIA**: `aria-controls` links the input to the listbox; each option has `role="option"` and `aria-selected`.

## Strengths & Gaps
- **Best at**: Autocomplete and search-suggestion patterns with full override flexibility for custom option rendering.
- **Missing**: No built-in async loading state or spinner; multi-select combobox not supported natively; grouping of options not available without custom overrides.
