---
system: Gestalt (Pinterest)
component: ComboBox
url: https://gestalt.pinterest.systems/web/combobox
last_verified: 2026-03-29
confidence: high
---

# ComboBox

## Approach
Gestalt's ComboBox is a searchable single-select input that combines a text field with a filterable dropdown list. It is designed for situations where the option set is too large for a standard SelectList to be scannable, and where users benefit from typing to narrow results — such as selecting a country, category, or interest tag when setting up a Pinterest board or ad campaign. ComboBox integrates tightly with Gestalt's text field visual language, ensuring a consistent interaction model across all form inputs. Pinterest's global audience (40+ languages) informs the component's emphasis on input flexibility: users can type in their native script to filter options, making the component accessible across character sets. The component is strictly single-select; multi-select filtering uses a separate Tag + ComboBox composition pattern.

## Key Decisions
1. **Text-filtered dropdown over static select** (HIGH) — Pinterest's taxonomies (interests, categories, locations) often have hundreds of options. Filtering by typed input dramatically reduces cognitive load and interaction time, especially on mobile.
2. **Single-select only** (HIGH) — Keeping ComboBox single-select simplifies the mental model and ARIA implementation. Multi-select requires a different interaction pattern (tokenized tags) that is handled via composition rather than a single bloated component.
3. **Controlled input state** (HIGH) — The component exposes `inputValue` and `onInputChange` as controlled props, giving consuming code full authority over filtering logic. This supports async search (server-side filtering) which is common in Pinterest's large-dataset contexts.
4. **No creatable option** (MEDIUM) — Unlike some combobox implementations, Gestalt's ComboBox does not support "create new option" from typed input. Pinterest's taxonomies are curated, and free-form option creation would undermine data integrity for recommendations.
5. **Dropdown anchoring and z-index managed internally** (MEDIUM) — Gestalt handles portal rendering for the dropdown to avoid overflow clipping issues in Pinterest's complex masonry layouts.

## Notable Props
- `id`: Required unique identifier for the input element
- `label`: Visible label text (required for accessibility)
- `options`: Array of `{ label: string, value: string }` option objects
- `inputValue`: Controlled value of the text input field
- `onInputChange`: Callback `({ event, value })` fired on every keystroke
- `selectedOption`: The currently selected option object
- `onSelect`: Callback `({ event, item })` fired when an option is chosen
- `placeholder`: Placeholder text for the empty input state
- `size`: `"md"` | `"lg"` — input height variant
- `disabled`: Disables interaction
- `errorMessage`: Inline validation error text displayed below the input
- `helperText`: Supplementary guidance text below the input
- `noResultText`: Text displayed when the filtered list is empty (required)

## A11y Highlights
- **Keyboard**: Arrow keys navigate options in the open dropdown; Enter selects the focused option; Escape closes the dropdown and returns focus to the input; typing filters options in real time.
- **Screen reader**: Follows the ARIA combobox pattern — input has `role="combobox"`, listbox has `role="listbox"`, each option has `role="option"`. `aria-expanded` reflects open/closed state. `aria-activedescendant` tracks the focused option.
- **ARIA**: `aria-autocomplete="list"` on the input; `aria-controls` links the input to the listbox; `aria-selected` on active option; `aria-invalid` and `aria-describedby` for error states.

## Strengths & Gaps
- **Best at**: Large filterable option sets with server-side search support; consistent text-field visual language; strong ARIA combobox implementation; internationalization-friendly typed filtering.
- **Missing**: No multi-select variant (requires custom composition); no "creatable" option for free-form entries; no option grouping headers within the dropdown; limited built-in loading/async state indicator while fetching options.
