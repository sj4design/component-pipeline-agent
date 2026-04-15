---
system: Base Web (Uber)
component: Checkbox
url: https://baseweb.design/components/checkbox/
last_verified: 2026-03-28
confidence: medium
---

# Checkbox

## Approach
Base Web's Checkbox follows the Overrides pattern for customization. It provides standard checkbox functionality with checked, unchecked, and indeterminate states. Base Web's checkbox supports a `toggle` variant which renders the checkbox as a toggle switch, acknowledging the overlap between these two selection patterns. The component also supports a `checkmarkType` prop to differentiate between standard checkbox and toggle appearance within the same component.

## Key Decisions
1. **Toggle as a checkbox variant** (HIGH) — The `checkmarkType=STYLE_TYPE.toggle` makes the checkbox render as a toggle switch. This reflects the semantic overlap between toggle and checkbox — both represent binary on/off states. Having one component with two presentations enforces consistent state management for both.
2. **Overrides for custom checkmark** (MEDIUM) — The checkmark visual can be replaced via overrides, allowing custom icons or SVGs for the checked state.
3. **labelPlacement** (MEDIUM) — `"right"`, `"left"`, `"top"`, `"bottom"` — the label can appear at any position relative to the checkbox. Left placement is less common but needed in specific right-aligned layouts.

## Notable Props
- `checked` / `onChange`: controlled state
- `isIndeterminate`: three-state support
- `checkmarkType`: `STYLE_TYPE.default | STYLE_TYPE.toggle | STYLE_TYPE.toggle_round`
- `labelPlacement`: label position
- `overrides`: visual customization

## A11y Highlights
- **Keyboard**: Space toggles; native checkbox behavior
- **Screen reader**: aria-checked="mixed" for indeterminate; label association via adjacent label element
- **ARIA**: Toggle variant uses role="switch" when appropriate

## Strengths & Gaps
- **Best at**: Toggle variant sharing checkbox semantics; label placement flexibility; Overrides
- **Missing**: No CheckboxGroup component (must be managed by consumer); limited visual distinctiveness vs other systems
