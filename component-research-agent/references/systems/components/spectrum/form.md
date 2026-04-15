---
system: Spectrum (Adobe)
component: Form
url: https://react-spectrum.adobe.com/react-spectrum/Form.html
last_verified: 2026-03-28
---

# Form

## Approach

Spectrum's Form component is the most architecturally sophisticated form container among all Tier 1 systems, functioning simultaneously as a layout manager and a validation orchestrator. Its design reflects Adobe's real-world engineering needs: products like Adobe Analytics, Experience Platform, and Lightroom deal with both synchronous UI validation and asynchronous server-side validation responses. Rather than forcing teams to build server error handling from scratch every time, Spectrum encoded three explicit validation modes into the Form component itself — native browser validation, ARIA-based real-time validation, and server-side error injection. This is the only Tier 1 system that treats server-side validation as a first-class citizen at the component API level.

The Form also propagates presentation decisions — label position, label alignment, quiet mode, emphasis, disabled state, required indicator conventions — from the Form container down to every child field. This means a team configures the form once and every TextField, Select, and Checkbox inherits the same visual language. The philosophy here is strong: Spectrum wants form layout consistency to be architectural, not reliant on developers remembering to pass the same props to every field.

## Key Decisions

1. **Three-mode validation architecture** (HIGH) — Spectrum offers `validationBehavior="native"` (browser blocks submission, fires `onInvalid`), `validationBehavior="aria"` (default — real-time errors without blocking submission, delivered via ARIA), and server-side errors via the `validationErrors` prop. The WHY: Adobe's products face all three scenarios. Native validation is ideal for simple static forms. ARIA mode enables progressive disclosure of errors in complex multi-step flows where blocking submission is disruptive. Server-side mode addresses the reality that many validations (username taken, payment declined) can only be checked after server contact. Encoding all three at the Form level means the consuming team doesn't have to invent their own architecture for each case.

2. **Server-side error injection via `validationErrors` prop** (HIGH) — The `validationErrors` prop accepts an object mapping field `name` attributes to error strings: `{ email: "This email is already in use" }`. The Form distributes these to matching child fields. Errors auto-clear when users interact with the corrected field. The WHY: Without this, teams handling server errors must reach into each field component individually to set error state — fragile and verbose. The Form acting as a distribution layer means server errors can be handled with a single state update at the form level. This also ensures that server errors can be cleared per-field as users fix them, rather than all at once on re-submission.

3. **Prop propagation to children** (HIGH) — `labelPosition`, `labelAlign`, `isRequired`, `necessityIndicator`, `isDisabled`, `isQuiet`, and `isEmphasized` are set once on the Form and inherited by all field children. Individual fields can still override. The WHY: Real forms have 8–20 fields. Without propagation, every field must receive the same layout props explicitly — a maintenance burden and a consistency risk. Propagation ensures a form configured for horizontal labels stays horizontal throughout, even when fields are added later.

4. **Necessity indicator is configurable, not asterisk-defaulted** (MEDIUM) — `necessityIndicator="icon"` shows an asterisk, `necessityIndicator="label"` shows "(required)" or "(optional)" text. The default is `"icon"`. The WHY: Different Adobe products serve different audiences. Consumer-facing products often prefer label text ("required") for clarity; enterprise products frequently use asterisks as a space-efficient convention. Making this a Form-level config rather than hardcoding the asterisk means product teams can standardize across a form without per-field configuration.

5. **Focus management on validation failure** (MEDIUM) — By default, the first invalid field receives focus after a submission attempt. This is overridable: `onInvalid` can call `preventDefault()` and the team can manually focus an `InlineAlert` at the top of the form to provide a summary error before focusing a field. The WHY: Focus-to-field is correct for short forms. For long forms where the first error is out of viewport, a summary at the top with a list of errors is more efficient. Spectrum supports both patterns, but neither is the forced default.

## Notable Props/API

- `validationBehavior`: The core architectural decision prop — `"native"` or `"aria"`. Determines whether the browser intercepts submission or the application handles error state. Choosing `"aria"` means the developer owns submission gating.
- `validationErrors`: The server-side error injection point. Accepts `Record<string, string | string[]>` — supports multiple error messages per field. This is unique to Spectrum among Tier 1 systems.
- `action` / `method` / `target`: Standard HTML `<form>` attributes are exposed as props, signaling that Spectrum's Form is a genuine HTML form element, not just a styled div — important for progressive enhancement and SSR scenarios.
- `necessityIndicator`: Controls whether required/optional marking shows as an asterisk icon or text label. Set at Form level, propagates to all fields.
- `labelPosition` / `labelAlign`: Layout control at Form level. `labelPosition="side"` enables horizontal label-field layout — useful for dense enterprise forms.
- `isQuiet`: Propagates to all fields, removing border/background to reduce visual weight. Used in Adobe's inline editing contexts.

## A11y Highlights

- **Keyboard**: Tab moves through fields in DOM order. Enter submits when focus is on any field within the form (standard HTML behavior preserved). The Form renders as a true `<form>` element, so all native keyboard semantics apply. Focus is moved to the first invalid field on submission failure unless custom focus management is implemented via `onInvalid`.
- **Screen reader**: In `validationBehavior="aria"` mode, error messages are announced as users type or blur fields via ARIA live regions managed by React Aria. In `validationBehavior="native"` mode, browser native validation popups handle announcement — browser-dependent behavior. The Form must have `aria-label` or `aria-labelledby` to create a named form landmark region; without this, the form is not navigable as a landmark by screen reader users.
- **ARIA**: Child fields receive `aria-required`, `aria-invalid`, and `aria-describedby` (pointing to the error message element) automatically based on Form and field state. The `validationErrors` server-mode sets these on the targeted fields upon prop update. The Form itself supports `role="search"` or `role="presentation"` overrides via the `role` prop for non-form-landmark uses.

## Strengths & Gaps

- **Best at**: Server-side validation integration — the three-mode validation architecture with `validationErrors` prop is the most complete and explicit server error handling system of any Tier 1 design system's form component.
- **Missing**: Dynamic field arrays (Form.List equivalent) and cross-field validation rules (e.g., "confirm password must match password") are not handled at the Form level — teams must implement these in their own submission logic or use an external form library alongside Spectrum's components.
