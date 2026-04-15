---
system: shadcn/ui
component: Checkbox
url: https://ui.shadcn.com/docs/components/checkbox
last_verified: 2026-03-28
confidence: high
---

# Checkbox

## Approach
shadcn/ui's Checkbox is built on Radix UI's Checkbox primitive, providing a fully custom-styled accessible checkbox that replaces the native checkbox. Radix manages the checked/unchecked/indeterminate states and keyboard behavior. The custom rendering enables consistent cross-browser checkbox appearance with Tailwind styling and smooth check animation via CSS.

## Key Decisions
1. **Radix Checkbox primitive** (HIGH) — Custom checkbox with Radix's accessible behavior replaces the native checkbox for visual consistency while Radix handles ARIA state management.
2. **Indicator component** (HIGH) — The check mark is a separate CheckboxIndicator component containing an icon, making the visual indicator fully customizable (could use any icon or SVG for the checked state).
3. **Form integration via Controller** (MEDIUM) — For form use, integrates with react-hook-form via Controller or the Form component system, providing error/label wiring.

## Notable Props
- `checked` / `defaultChecked`: Controlled/uncontrolled state
- `onCheckedChange`: State change callback
- `disabled`: Disabled state
- `id`: For label htmlFor association

## A11y Highlights
- **Keyboard**: Space toggles; Tab to focus; Radix manages keyboard behavior
- **Screen reader**: role="checkbox"; aria-checked manages checked/unchecked/mixed; label via htmlFor
- **ARIA**: Radix auto-wires role="checkbox"; aria-checked="true"|"false"|"mixed"; aria-disabled

## Strengths & Gaps
- **Best at**: Custom check mark visual; consistent cross-browser appearance; Radix ARIA correctness
- **Missing**: No CheckboxGroup with fieldset semantics built-in; group composition is manual
