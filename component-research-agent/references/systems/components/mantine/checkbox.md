---
system: Mantine
component: Checkbox
url: https://mantine.dev/core/checkbox/
last_verified: 2026-03-28
confidence: high
---

# Checkbox

## Approach
Mantine's Checkbox is feature-rich and visually customizable. It supports all three states (checked, unchecked, indeterminate), custom check icons, color system integration, and the `Checkbox.Group` component for managing multiple checkboxes with a controlled value array. The component can also render as a card-style checkbox using `Checkbox.Card`, which gives checkboxes a full-card clickable area for settings or configuration UIs.

## Key Decisions
1. **Checkbox.Card for large clickable areas** (HIGH) — `Checkbox.Card` renders the entire card as the checkbox click target, used for settings panels where each option is a descriptive card (feature toggles, plan selection). This is a common pattern that Mantine formalizes.
2. **icon prop** (MEDIUM) — Custom check icon for the checked state. Enables minus icons for indeterminate, custom brand icons, or emoji checkmarks. The flexibility accommodates diverse visual needs.
3. **Checkbox.Group for managed arrays** (HIGH) — Groups checkboxes with a `value: string[]` and `onChange: (string[]) => void`. This is the standard multi-select checkbox pattern. The Group can be oriented horizontally or vertically.

## Notable Props
- `checked` / `defaultChecked` / `onChange`: controlled/uncontrolled state
- `indeterminate`: boolean for three-state
- `color`: token color for checked fill
- `icon`: custom check icon component
- `size`: `"xs" | "sm" | "md" | "lg" | "xl"`
- Checkbox.Group: `value`, `onChange`, `orientation`
- Checkbox.Card: full-card checkbox pattern

## A11y Highlights
- **Keyboard**: Space toggles; Tab focuses
- **Screen reader**: aria-checked="mixed" for indeterminate; label in same element via wrapper
- **ARIA**: Checkbox.Group uses fieldset/legend equivalent; aria-required for required groups

## Strengths & Gaps
- **Best at**: Checkbox.Card for settings panels; icon customization; Checkbox.Group; full size scale
- **Missing**: No tree-checkbox (nested indeterminate) guidance built-in
