---
system: Fluent 2 (Microsoft)
component: Field (Form equivalent)
url: https://fluent2.microsoft.design/components/web/react/field/
last_verified: 2026-03-28
confidence: high
---

# Field (Form equivalent)

## Approach
Fluent 2 uses a Field component as the form field wrapper (not a full form). Field provides label, hint (helper text), validation message, and validation state for any form control child. It is a wrapper that propagates context to supported Fluent input components. The validationState prop drives error/warning/success styling and messaging.

## Key Decisions
1. **validationState drives message appearance** (HIGH) — `validationState="error | warning | success | none"` changes the validation message icon and color. This single prop coordinates the visual state of the label, message, and input border color without manual class management.
2. **hint vs validationMessage** (HIGH) — `hint` provides persistent helper text; `validationMessage` provides state-dependent feedback. When validationState is set, the validationMessage is shown with the appropriate icon; when not set, hint shows. These are mutually exclusive in prominence.
3. **required prop with asterisk** (MEDIUM) — `required` adds a visible asterisk to the label and propagates `aria-required` to the child input. Required field indication is built into the field wrapper.

## Notable Props
- `label`: field label
- `hint`: helper text
- `validationMessage`: state-dependent feedback text
- `validationState`: `"error" | "warning" | "success" | "none"`
- `required`: required field indicator
- `orientation`: `"horizontal" | "vertical"`

## A11y Highlights
- **Keyboard**: Standard form navigation
- **Screen reader**: Label associated via htmlFor; validationMessage linked via aria-describedby; aria-required from required prop
- **ARIA**: aria-invalid from error validationState; aria-describedby for messages

## Strengths & Gaps
- **Best at**: validationState for multi-level feedback; hint/validationMessage distinction; orientation control; required propagation
- **Missing**: No form-level wrapper; no submission handling; teams use react-hook-form or similar
