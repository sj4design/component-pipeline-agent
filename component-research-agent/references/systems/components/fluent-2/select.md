---
system: Fluent 2 (Microsoft)
component: Dropdown / Combobox
url: https://fluent2.microsoft.design/components/web/react/dropdown/usage
last_verified: 2026-03-28
confidence: high
---

# Dropdown (Select)

## Approach
Fluent 2 provides Dropdown for single and multi-select scenarios, and Combobox for the searchable/editable variant. The Dropdown is designed for the Office and enterprise context where selects appear in toolbars, property panels, and forms. Fluent 2's Dropdown supports complex item rendering (icons, secondary text, dividers) required for Office-style option menus. The component handles both flat lists and grouped options.

## Key Decisions
1. **Dropdown vs Combobox as separate components** (HIGH) — Fluent separates the non-editable dropdown (Dropdown) from the editable/searchable input (Combobox). This is architecturally cleaner than a single component with a `searchable` flag — the two components have fundamentally different keyboard behaviors and ARIA patterns (listbox vs combobox).
2. **Multi-select with checkboxes** (HIGH) — Multi-select mode renders checkboxes next to each option item, which is more discoverable than the "Ctrl+click" pattern of native multiselect. This is important in Office's property panels where users select multiple font sizes or colors.
3. **Option icons and secondary text** (MEDIUM) — Option items support icons and secondary descriptive text in the option list. This is used in Office for format options (icon + format name + keyboard shortcut), file type selections, and permission level dropdowns.

## Notable Props
- `value` / `onOptionSelect`: controlled selection
- `multiselect`: boolean — multi-select mode
- `selectedOptions`: array for multi-select
- `placeholder`: empty state text
- `appearance`: `"outline" | "underline" | "filled-darker" | "filled-lighter"`
- `size`: `"small" | "medium" | "large"`

## A11y Highlights
- **Keyboard**: Alt+Down/Up opens/closes; Arrow keys navigate; Enter selects; Escape closes; type-ahead
- **Screen reader**: role="listbox" with role="option" items; aria-selected; aria-multiselectable for multi-select
- **ARIA**: Grouped options use role="group" with aria-label; disabled options have aria-disabled

## Strengths & Gaps
- **Best at**: Multi-select with checkboxes; Option icons/secondary text; Office toolbar patterns
- **Missing**: No async option loading in base Dropdown (use Combobox for that); complex multi-select keyboard behavior can be challenging
