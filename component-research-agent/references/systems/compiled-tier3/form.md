---
component: Form
tier: 3
last_verified: 2026-03-29
---

# Form — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Form | Form primitive with automatic `aria-describedby` wiring between inputs and validation messages; integrates with browser native constraint validation API; `serverInvalid` prop for server errors. | high |
| Chakra UI | FormControl | Single-field wrapper; `isInvalid` toggles error/helper message display; `isRequired` adds asterisk and `aria-required`; recommends react-hook-form for full form management. | high |
| GOV.UK | Form + Error Summary | No `<Form>` component; Error Summary pattern at top of page lists all errors with anchor links to fields; "one thing per page" principle; field error messages placed between label and input. | high |
| Base Web | FormControl | Single-field wrapper; `error` prop as string or boolean (string shows message, boolean applies styling only); `caption` for helper text; mutual exclusion of caption and error. | medium |
| Fluent 2 | Field | `validationState` prop (error/warning/success/none) coordinates visual state across label, message, and input border; `hint` vs. `validationMessage` are distinct slots; `orientation` for horizontal layout. | high |
| Gestalt | Not available — composition-first | No Form wrapper; forms assembled from individual field components + HTML `<form>` + Box layout; field-level `errorMessage` props; BannerSlim for form-level server errors. | high |
| Mantine | useForm (@mantine/form) | Hook-first approach; `useForm` returns `getInputProps('fieldName')` that spreads value/onChange/error onto any Mantine input; built-in validation with Yup/Zod adapter support; nested object and array field paths. | high |
| Orbit | Not available — FieldGroup only | No Form wrapper; each field owns its own label/error/help props; `FieldGroup` renders `<fieldset>/<legend>` for grouped fields (passenger details, date of birth splits). | high |
| Evergreen | Not available — all-in-one fields | No Form wrapper; `TextInputField`/`SelectField`/etc. bundle label+input+error+hint as flat-prop all-in-one components; `FormField` wraps custom inputs in the same pattern. | high |
| Nord | Not available — individual field components | No `<nord-form>`; each field component (`<nord-input>`, `<nord-select>`, etc.) owns label/error/hint internally; native `<form>` for browser autofill and FormData API compatibility with EHR backends. | high |

## Key Decision Patterns

The T3 set reveals three distinct approaches to what "form" means in a design system: a validation-ARIA wiring layer (Radix), a single-field context wrapper (Chakra, Base Web, Fluent 2), and a no-wrapper composition philosophy (Gestalt, Orbit, Evergreen, Nord). The majority position is no dedicated form container — six of ten systems provide no `<Form>` component at all. The rationale is consistent: form structures vary too much across product surfaces to justify a prescriptive wrapper, and field-level components are more composable than a top-down container.

Fluent 2's `validationState` with four levels (error/warning/success/none) is the most expressive T3 validation state model. Most systems support only error and success. The warning level is meaningful for form UX — it allows advisory feedback ("this looks unusual — are you sure?") without blocking submission, a pattern relevant to settings forms and enterprise data entry where soft validation is appropriate.

GOV.UK's Error Summary pattern is the most thoroughly researched form-level error treatment in the T3 set. When validation fails, a summary appears at the top of the page — focused programmatically on load — listing every error with anchor links to the fields. This is research-backed: users, especially screen reader users, need to encounter errors before navigating to them. The "one thing per page" principle further ensures that error summaries are manageable in length. These decisions are absent from all other T3 systems, which handle errors only at the field level.

Mantine's `useForm` hook is the only T3 system that bundles a complete form state management solution rather than relying on a third-party library. The `getInputProps` helper is the practical innovation: it spreads value, onChange, onBlur, and error props onto any Mantine input component in one call, eliminating per-field boilerplate. The separate `@mantine/form` package allows teams to use any validation library with Mantine's visual components if preferred.

## A11y Consensus

- The universal minimum for form field accessibility is: label associated via `htmlFor`/`id`, error message linked via `aria-describedby`, and `aria-invalid="true"` on the input when invalid — all T3 systems that provide field wrappers implement this trio automatically.
- `aria-required="true"` (rather than HTML `required`) is preferred by most T3 systems because it does not trigger browser-native validation UI, which is inconsistently styled and announced.
- Error messages must be associated with the specific field via `aria-describedby`, not only rendered visually — placement above, below, or beside the field does not create the accessibility association.
- GOV.UK's Error Summary pattern — focusing the summary on page load and linking to each errored field — is the reference for form-level error announcements for long or multi-field forms.
- Orbit's `FieldGroup` using `<fieldset>/<legend>` is the correct semantic pattern for groups of related fields (radio groups, split date inputs, address fields) — this grouping is required for screen readers to convey that fields belong together.

## Recommended Use

Reference T3 form approaches when deciding between field-level wrappers and form-level containers, multi-level validation state design, and error summary patterns. GOV.UK is the reference for page-level error summary and error message placement; Fluent 2 is the reference for multi-level `validationState` (error/warning/success); Mantine is the reference for hook-first form state management with minimal boilerplate; Radix is the reference for automatic validation ARIA wiring on top of native browser constraint validation; Orbit's `FieldGroup` is the reference for `<fieldset>/<legend>` grouping of related fields.
