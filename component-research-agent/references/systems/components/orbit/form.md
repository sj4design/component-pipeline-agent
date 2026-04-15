---
system: Orbit (Kiwi.com)
component: Not available natively (FieldGroup available)
url: https://orbit.kiwi/components/
last_verified: 2026-03-29
confidence: high
---

# Form

## Approach
Orbit does not provide a Form wrapper component in the way some design systems do (e.g., a `<Form>` component that manages validation state, layout, and submission). Instead, Orbit's philosophy is to handle form concerns at the individual field level: each input component (`InputField`, `Select`, `Checkbox`, `Radio`) is self-contained with its own label, error, and help-text props. This field-level ownership model works well for Kiwi.com's booking forms, which are assembled from heterogeneous field types with varying validation rules that are simpler to manage per-field than through a centralized form state wrapper. The `FieldGroup` component provides the one form-grouping primitive that does exist — it visually and semantically groups related fields (e.g., first name + last name for a passenger, or date of birth day/month/year selects) under a shared label.

## Key Decisions
1. **Field-level validation ownership** (HIGH) — Each field component manages its own `error` and `help` props, making it easy to wire per-field validation from any form library (React Hook Form, Formik, Zod) without Orbit imposing a specific validation strategy.
2. **`FieldGroup` for logical groupings** (HIGH) — Passengers, dates, and addresses naturally form sub-groups; `FieldGroup` provides a labeled container that semantically associates related fields without requiring a full form wrapper.
3. **No form-level layout opinions** (MEDIUM) — Orbit leaves vertical/horizontal layout of form fields to the consuming team using Stack and Grid layout primitives, keeping the field components themselves layout-agnostic.

## Notable Props
- **FieldGroup**:
  - `label`: group label rendered above the fields
  - `error`: group-level error message (in addition to per-field errors)
  - `children`: the grouped field components

## A11y Highlights
- **Keyboard**: Each field component is independently keyboard-accessible; Tab order follows DOM order.
- **Screen reader**: `FieldGroup` renders a `<fieldset>` with `<legend>` for the group label, providing proper semantic grouping.
- **ARIA**: Individual fields use `aria-describedby` to associate their error/help text; `FieldGroup` uses native fieldset/legend semantics.

## Strengths & Gaps
- **Best at**: Composable field-by-field form assembly that integrates cleanly with any validation library; `FieldGroup` is excellent for passenger detail sections.
- **Missing**: No form-level submit handling, no built-in multi-step form support, no form-level error summary component.
