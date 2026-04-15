---
system: shadcn/ui
component: Radio Group
url: https://ui.shadcn.com/docs/components/radio-group
last_verified: 2026-03-28
confidence: high
---

# Radio Group

## Approach
shadcn/ui's Radio Group is built on Radix UI's RadioGroup primitive, providing a fully custom-styled radio group with ARIA radiogroup/radio semantics and roving tabindex keyboard navigation. Like the Checkbox, the custom rendering allows consistent cross-browser visual while Radix manages all accessibility behavior.

## Key Decisions
1. **Radix RadioGroup primitive** (HIGH) — Custom radio rendering with Radix's ARIA radiogroup/radio management, roving tabindex, and keyboard navigation.
2. **RadioGroupItem as atomic unit** (HIGH) — Each radio option is RadioGroupItem with RadioGroupIndicator for the visual dot, making the visual indicator fully customizable.
3. **Form composition** (MEDIUM) — Works with react-hook-form's Controller or the Form component system for accessible form field patterns (label, error wiring).

## Notable Props
- `value` / `defaultValue`: Controlled/uncontrolled selection
- `onValueChange`: Selection callback
- `orientation`: "vertical" | "horizontal"
- `disabled`: Group-level disable

## A11y Highlights
- **Keyboard**: Arrow keys navigate within group (roving tabindex managed by Radix); Tab exits group
- **Screen reader**: role="radiogroup" on container; role="radio" on items; aria-checked
- **ARIA**: Radix auto-wires role="radiogroup" and role="radio"; aria-checked; roving tabindex

## Strengths & Gaps
- **Best at**: Custom visual radio indicator; consistent cross-browser appearance; Radix ARIA correctness
- **Missing**: No button-styled variant; fieldset/legend semantics must be added manually for group labeling
