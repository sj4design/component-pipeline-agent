---
system: Chakra UI
component: Checkbox
url: https://chakra-ui.com/docs/components/checkbox
last_verified: 2026-03-28
confidence: high
---

# Checkbox

## Approach
Chakra UI's Checkbox is a styled, accessible checkbox with complete state coverage. It supports the indeterminate state for partial selection, custom icon content, and the colorScheme token system for the checked/indeterminate fill color. The component provides CheckboxGroup for managing multiple related checkboxes with a shared controlled value array. Chakra's checkbox is visually polished by default with smooth hover/focus states and adapts to light/dark modes via semantic tokens.

## Key Decisions
1. **isIndeterminate prop** (HIGH) — Explicit indeterminate prop (separate from checked) for the three-state checkbox pattern. Used in Chakra's table patterns where a "select all" header checkbox shows indeterminate when some (but not all) rows are selected.
2. **icon prop for custom check icon** (MEDIUM) — Accepts a custom ReactElement as the check icon, allowing teams to use a minus symbol for indeterminate, a star for favoriting, or any custom SVG while keeping Chakra's checkbox styling and behavior.
3. **CheckboxGroup for value management** (HIGH) — Manages an array of checked values for multiple checkboxes, providing a controlled `value` and `onChange` that tracks which options are selected. This is the standard pattern for multi-select filter groups.

## Notable Props
- `isChecked` / `onChange`: controlled state
- `isIndeterminate`: boolean (separate from isChecked)
- `colorScheme`: token palette for checked fill color
- `icon`: custom check icon ReactElement
- `iconColor` / `iconSize`: icon customization
- CheckboxGroup: `value`, `onChange` with string[] for multi-select management

## A11y Highlights
- **Keyboard**: Space toggles; Tab focuses; native checkbox behavior
- **Screen reader**: `aria-checked="mixed"` for indeterminate; label association via `<label>` wrapper or `aria-label`
- **ARIA**: `aria-invalid` when in error state; `aria-required` for required checkboxes

## Strengths & Gaps
- **Best at**: Icon customization; CheckboxGroup for multi-select management; colorScheme integration
- **Missing**: No click-outside handler for dropdown checkbox lists; no tree-select pattern (nested checkboxes)
