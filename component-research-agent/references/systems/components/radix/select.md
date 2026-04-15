---
system: Radix UI (WorkOS)
component: Select
url: https://www.radix-ui.com/primitives/docs/components/select
last_verified: 2026-03-28
confidence: high
---

# Select

## Approach
Radix Select is a custom select component built to replace the native `<select>` element with a fully styleable, accessible dropdown. Native select elements are notoriously difficult to style cross-platform; Radix reimplements the interaction model from scratch while preserving the accessibility semantics. The component is composable: Select.Root, Select.Trigger, Select.Value, Select.Icon, Select.Portal, Select.Content, Select.Viewport, Select.Item, Select.ItemText, Select.ItemIndicator, Select.Group, Select.Label, Select.Separator, and Select.ScrollUpButton/ScrollDownButton.

## Key Decisions
1. **Custom implementation over native select** (HIGH) — Native selects can't be styled consistently across browsers/platforms. Radix builds a complete reimplementation with a popover list, preserving ARIA combobox/listbox semantics and keyboard behavior. This is a significant engineering investment justified by the universal need for custom-styled selects.
2. **Scroll buttons for long lists** (MEDIUM) — Select.ScrollUpButton and Select.ScrollDownButton appear when the option list is taller than the viewport. This handles the edge case of very long option lists without requiring a scrollbar inside the floating panel — following native select behavior.
3. **Position: "item-aligned" vs "popper"** (MEDIUM) — The `position` prop on Select.Content controls whether the dropdown aligns with the selected item (like native select) or positions as a standard popper (below the trigger). Item-aligned is the default and feels more native; popper is needed when items have icons or descriptions that would cause alignment issues.

## Notable Props
- `value` / `onValueChange`: controlled selected value
- `defaultValue`: uncontrolled initial value
- `disabled`: disables the entire select or individual items
- `Select.Content > position`: `"item-aligned" | "popper"`
- `Select.Item > disabled`: per-item disabled state

## A11y Highlights
- **Keyboard**: Enter/Space opens; Arrow Up/Down navigate options; Enter/Space selects; Escape closes; type-ahead for fast selection
- **Screen reader**: `role="combobox"` on trigger with `aria-expanded`; `role="listbox"` on content; `role="option"` on items; `aria-selected` on selected item
- **ARIA**: Full ARIA combobox pattern; type-ahead selection announced; option groups labeled via `aria-labelledby`

## Strengths & Gaps
- **Best at**: Custom styling while preserving native select behavior; type-ahead; scroll buttons for long lists
- **Missing**: No multi-select variant; no search/filter within the select; no async loading for options
