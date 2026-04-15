---
system: Atlassian Design System
component: Form
url: https://atlassian.design/components/form/
last_verified: 2026-03-28
---

# Form

## Approach

Atlassian's Form component occupies the richest middle ground among Tier 1 systems — it is simultaneously a layout container, a validation coordinator, and an accessibility enforcement layer. Unlike Carbon (which leaves validation entirely to field-level code) or M3 (which has no form container at all), Atlassian's Form provides structured composition: it expects fields to be wrapped in a Field sub-component, which holds a `validate` function prop. The Form collects these per-field validation functions and orchestrates them during submission and on blur. This architecture reflects Atlassian's context — Jira, Confluence, and Bitbucket have complex forms (issue creation, permission schemas, pipeline configuration) where validation rules are business-logic-heavy but must still result in a consistent, accessible error presentation.

The component is built on top of Final Form (the `final-form` library) under the hood, which provides the data store, validation lifecycle, and subscription model. This is a notable implementation choice: Atlassian chose an external battle-tested form library as the engine and built their design system layer on top of it, rather than building form state management from scratch. The benefit is that the Atlassian Form component inherits Final Form's proven patterns for async validation, form state subscriptions, and field arrays. The cost is that the API surface is shaped by Final Form's mental model, which can feel unfamiliar to developers who haven't used it.

The Form also provides a structured component hierarchy: FormHeader (title and description), FormSection (logical grouping with header), FormFooter (action buttons), and Field (individual field wrapper). This is the most articulated structural vocabulary of any Tier 1 system.

## Key Decisions

1. **Field wrapper owns the validate function** (HIGH) — Each field in an Atlassian Form must be wrapped in a `<Field name="fieldName" validate={validateFn}>` component. The `validate` prop is a function that receives the current value and returns either an error string (if invalid) or `undefined` (if valid). The Form collects these functions and calls them during the validation lifecycle. The WHY: This approach keeps validation logic co-located with the field it applies to, making it easy to reason about. It also allows async validation functions (returning a Promise that resolves to an error string or undefined), which is essential for server-round-trip validations like checking username availability. The tradeoff is that cross-field validation (validate field B based on field A's value) requires accessing form state through the validate function's second parameter.

2. **Validation triggers on both blur and submit** (HIGH) — Fields validate when they lose focus (onBlur) and again when the form is submitted. The WHY: Validating only on submit creates a frustrating experience where users fill out a long form and discover all their errors at the end. Validating only on blur can create confusing flash states for async validations. The dual trigger (blur + submit) mirrors the pattern used by most enterprise form libraries and aligns with Atlassian's own usage in Jira's issue creation forms, where fields are validated progressively as users complete them.

3. **Required field marked with RequiredAsterisk component** (MEDIUM) — The recommended pattern for required fields is to add a `<RequiredAsterisk />` component next to the field's Label. If the form contains required fields, the form header should include a legend explaining that asterisk indicates required. The WHY: Externalizing the asterisk as a component (rather than a prop on Field or Label) keeps the Label component generic and allows the asterisk to be placed exactly where the visual design requires. It also means the `isRequired` prop on Field controls validation behavior while the visual indicator is separately controlled — a separation that accommodates cases where a field is required without showing an asterisk (e.g., a visually implicit required field in a settings panel).

4. **onSubmit receives form data only after validation passes** (MEDIUM) — The `onSubmit` prop on Form receives a data object containing all field values and is only called if all field `validate` functions return `undefined`. If any validation fails, submission is blocked and errors are displayed per-field. The WHY: This prevents the common bug pattern where `onSubmit` is called with invalid data and the developer must re-check validity. The tradeoff is that sometimes a form needs to submit despite validation warnings (draft saving, partial submissions) — this pattern doesn't support that directly.

5. **FormSection for logical grouping** (MEDIUM) — FormSection groups related fields under a heading without creating a separate submission scope. It renders a `<fieldset>` equivalent grouping. The WHY: Long forms (Jira issue creation, Confluence page settings, Bitbucket pipeline config) have distinct logical sections — "Basic details," "Advanced options," "Notifications." FormSection provides a named boundary for these sections that is both visually clear and semantically meaningful (the section heading communicates that the grouped fields belong together).

## Notable Props/API

- `validate` (on Field): The per-field validation function. Receives the field's current value and can return a string error or `undefined` for valid. Supports async: return a Promise resolving to string or undefined. This is the primary validation mechanism.
- `isRequired` (on Field): Controls the accessible `aria-required` attribute and triggers required-field validation. Separate from the visual `RequiredAsterisk` component — a field can be required without the asterisk for screen-reader-only contexts.
- `onSubmit` (on Form): Called with form data object when all validations pass. The return value matters: if `onSubmit` returns an object, it is treated as server-side validation errors (field name keys, error message values) and distributed to matching fields. This is Atlassian's server-side error injection mechanism.
- `defaultValues` (on Form): Pre-populates field values on initial render. Separate from Final Form's `initialValues` concept — used for edit forms where existing data is loaded.
- `isDisabled` (on Field): Disables the wrapped field control. Can also be set at form level via context.

## A11y Highlights

- **Keyboard**: Tab order follows DOM order through FormSection and Field wrappers. Enter submits when focus is inside a text input (standard HTML behavior). FormSection renders as a `<fieldset>` variant, which is announced by screen readers as a group with its heading as the accessible name.
- **Screen reader**: Errors rendered by the `ErrorMessage` component are associated with their field via `aria-describedby`. The `Field` component manages this link automatically — developers do not need to manually wire `aria-describedby`. Atlassian documentation specifies that the form header must include a legend for required field convention (e.g., "Fields marked with * are required") so that the asterisk meaning is communicated at the form entry point.
- **ARIA**: Fields receive `aria-required` from the `isRequired` prop. `aria-invalid` is set to `true` when the `validate` function returns an error. `aria-describedby` on each field points to the `ErrorMessage` element ID when an error is present. The `Field` component adds the `aria-describedby` attribute type explicitly (noted in changelog as a specific a11y improvement), ensuring it is not accidentally omitted.

## Strengths & Gaps

- **Best at**: Structured composition and named form sections — Atlassian's Form, FormHeader, FormSection, FormFooter hierarchy is the most articulated form anatomy of any Tier 1 system, making it clear where titles, fields, sections, and actions belong in a complex enterprise form.
- **Missing**: Field array management (dynamic add/remove fields like Ant Design's Form.List) and cross-field dependencies (validating one field based on another without custom workarounds through the validate function's form state access).
