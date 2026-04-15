---
system: GitHub Primer
component: FormControl
url: https://primer.style/components/form-control
last_verified: 2026-03-28
confidence: high
---

# FormControl

## Approach
GitHub Primer's FormControl is the central form composition pattern — it wraps any form input (TextInput, Select, Checkbox, etc.) and provides label, caption (help text), and validation message via React context. This context-based wiring is one of Primer's most elegant patterns: FormControl.Label knows to associate with the FormControl's input via React context without requiring explicit id/htmlFor management.

## Key Decisions
1. **React context-based label association** (HIGH) — FormControl uses React context to automatically wire the label's htmlFor to the input's id, eliminating the manual id management that leads to label/input association errors — a significant developer experience and accessibility improvement.
2. **FormControl.Validation for error messages** (HIGH) — Error, success, and warning messages render via FormControl.Validation with appropriate ARIA connections, centralizing form validation display in a consistent, accessible pattern.
3. **FormControl.Caption for help text** (MEDIUM) — Help text renders below the input via FormControl.Caption, automatically connected to the input via aria-describedby through the React context wiring.

## Notable Props
- `required`: Marks the field as required (adds aria-required and required indicator to label)
- `disabled`: Disables the field (applies to input and label styling)
- `id`: Optional override for the auto-generated field id
- `FormControl.Label`, `FormControl.Caption`, `FormControl.Validation`: Sub-components

## A11y Highlights
- **Keyboard**: Standard form field keyboard behavior
- **Screen reader**: Context-wired label association; validation message via aria-describedby; required via aria-required; Caption via aria-describedby
- **ARIA**: Automatic htmlFor/id pairing; aria-required; aria-invalid; aria-describedby for caption and validation

## Strengths & Gaps
- **Best at**: Context-based automatic label/id wiring — the most elegant accessible form composition pattern in this set; clean validation display
- **Missing**: No multi-column form layout utilities; no form section grouping beyond fieldset; no multi-step form state
