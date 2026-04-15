---
system: Base Web (Uber)
component: Form Control
url: https://baseweb.design/components/form-control/
last_verified: 2026-03-28
confidence: medium
---

# Form Control

## Approach
Base Web's FormControl wraps a single form field and provides label, caption (helper text), and error message display. Like Chakra's FormControl, it is a field-level wrapper rather than a full form component. The `error` and `caption` props are mutually exclusive in display — when error is present, it shows instead of caption.

## Key Decisions
1. **error prop as string or boolean** (HIGH) — Passing a string to `error` shows that string as the error message and applies error styling. Passing `true` applies error styling without a message. This flexible API handles both validation message display and styled-only error states.
2. **caption for helper text** (HIGH) — The `caption` prop displays helper text below the input when no error is present. It accepts a string or ReactNode for rich helper content (links, formatting).
3. **label with required indicator** (MEDIUM) — FormControl handles label rendering and can automatically append a required indicator, with the indicator text customizable via the `requiredMark` override.

## Notable Props
- `label`: field label (string or render prop)
- `caption`: helper text (hidden when error present)
- `error`: error message or boolean for error state
- `disabled`: disables the field
- `overrides`: Label, Caption, ControlContainer

## A11y Highlights
- **Keyboard**: Standard form navigation
- **Screen reader**: Label associated with child input; error/caption linked via aria-describedby
- **ARIA**: aria-invalid and aria-describedby propagated to child input

## Strengths & Gaps
- **Best at**: error/caption mutual exclusion; flexible error prop; overrides for label and caption
- **Missing**: No form-level error summary; no built-in validation; no isRequired with auto aria-required
