---
system: Gestalt (Pinterest)
component: TextField
url: https://gestalt.pinterest.systems/web/textfield
last_verified: 2026-03-28
confidence: medium
---

# TextField

## Approach
Gestalt's TextField is a complete form input component with built-in label, helper text, and error message. It follows Gestalt's philosophy of bundling form fields with their labels and feedback — the component is always a labeled input, not a bare input element. This reduces the cognitive overhead of assembling form fields from primitives. TextField supports both standard text input and multiline (textarea) via a separate TextArea component.

## Key Decisions
1. **Always labeled** (HIGH) — The `label` prop is required on TextField. Gestalt enforces that every input has a visible label, preventing the common accessibility mistake of input-only forms.
2. **helperText and errorMessage** (HIGH) — Both helper text and error message are first-class props. The error message replaces the helper text when shown, ensuring the total height of the field doesn't expand and cause layout shift.
3. **characterCount** (MEDIUM) — Built-in character count display. Pinterest's content forms (pin descriptions, board names) have character limits, making character count a commonly needed feature.

## Notable Props
- `id`: required for accessibility
- `label`: required visible label
- `value` / `onChange`: controlled state
- `helperText`: secondary descriptive text
- `errorMessage`: validation error (replaces helperText)
- `type`: input type
- `maxLength` / `characterCount`: character limit + counter

## A11y Highlights
- **Keyboard**: Native input behavior
- **Screen reader**: Required label ensures accessible name; errorMessage linked via aria-describedby
- **ARIA**: aria-invalid on error state; aria-describedby for helper/error text

## Strengths & Gaps
- **Best at**: Required label enforcement; character count for content forms; error replacing helper (no layout shift)
- **Missing**: No prefix/suffix addon support; no masked input; no number formatting
