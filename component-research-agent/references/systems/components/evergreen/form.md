---
system: Evergreen (Segment/Twilio)
component: Not available natively (field-level composition)
url: https://evergreen.segment.com/components/
last_verified: 2026-03-29
confidence: high
---

# Form

## Approach
Evergreen does not provide a Form wrapper component. Instead, Evergreen's approach is to build form concerns — label, input, validation message, and help text — into each individual field component. `TextInputField`, `SelectField`, `SwitchField`, and `CheckboxField` each render a complete labeled field with validation and help text as a self-contained unit. This field-level composition model suits Segment's configuration forms, which tend to be heterogeneous: a destination configuration form might have text inputs, selects, toggle switches, and code editors all in the same form, and a top-down Form wrapper that manages layout and validation would need to accommodate all of these field types with their different validation patterns. By keeping state management responsibility at the application layer (with React Hook Form, Formik, or custom logic), Evergreen remains agnostic to form library choice.

## Key Decisions
1. **All-in-one field components** (HIGH) — `TextInputField` etc. bundle label + input + error + hint into a single component with a flat prop API, eliminating the boilerplate of manually composing these elements for each field.
2. **No validation framework coupling** (HIGH) — Evergreen exposes an `isInvalid` prop and `validationMessage` prop on each field, making it trivially easy to integrate with any validation library without Evergreen imposing a specific approach.
3. **`FormField` as the composition primitive** (MEDIUM) — For custom or non-standard inputs that don't have a dedicated Evergreen field component, `FormField` provides the label + validation wrapper into which any custom input can be slotted, extending the pattern consistently.

## Notable Props
- **TextInputField**: `label`, `description`, `hint`, `isInvalid`, `validationMessage`, `required`, plus all TextInput props
- **FormField**: `label`, `labelFor`, `description`, `hint`, `isRequired`, `validationMessage` — wrapper for custom inputs
- **SelectField**: same label/validation pattern applied to a Select component

## A11y Highlights
- **Keyboard**: Each field component is independently keyboard-accessible.
- **Screen reader**: Labels are associated with inputs via `htmlFor`/`id` pairs; validation messages use `aria-describedby`; required fields include `aria-required="true"`.
- **ARIA**: `aria-invalid="true"` set on inputs when `isInvalid` is true; `aria-describedby` links the input to its validation message.

## Strengths & Gaps
- **Best at**: Flat prop API for rapid form assembly in configuration UIs; clean integration with any validation library; `FormField` enables custom inputs to match system styling.
- **Missing**: No form-level error summary; no multi-step form navigation; no form-level submit state management; no layout opinions (teams must use Stack/Pane for spacing).
