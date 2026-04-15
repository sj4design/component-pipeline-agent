---
component: form
compiled: 2026-03-28
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Absent (TextField per-field validation only)
**Approach:** M3 has no Form container component. Validation and layout are per-field concerns in M3: TextField's `supportingText` swaps to `errorText` on error; the floating label indicates required fields. There is no form-level state management, no submission lifecycle, and no validation orchestration. Teams manage form state with React state or a form library alongside M3 field components.
**Key Decisions:**
- [HIGH] Per-field validation only: each TextField manages its own error state via props — no coordination layer across fields
- [MED] `supportingText` swaps to `errorText`: field-level error display is a prop toggle, not a separate component — clean but requires consumer state management
- [MED] Required asterisk manual: M3 does not manage required field indicators automatically; the asterisk in labels is added manually or via the `label` string
**Notable API:** `TextField`: `supportingText`; `errorText`; `error: boolean`; `required: boolean` (HTML attribute behavior)
**A11y:** `aria-labelledby` is documented as unsupported for grouped form sections in M3 — a notable gap. Individual TextFields get `aria-invalid` and `aria-describedby` for error text automatically.
**Best at:** Per-field validation UI — `supportingText` to `errorText` swap is clean; floating label with required handling in a single prop.
**Missing:** Form container, form-level validation lifecycle, cross-field validation, field grouping with semantic `<fieldset>` equivalents.

---

## spectrum
**Component:** Form (3-mode validation: native/aria/server)
**Approach:** Spectrum's Form component provides a `validationBehavior` prop with three modes: `native` (browser constraint validation), `aria` (React Aria-managed ARIA live regions), and a server validation mode via `validationErrors` prop that accepts an object mapping field names to server error messages. The Form propagates `labelPosition`, `isDisabled`, and `isQuiet` to all child fields automatically. Focus moves to the first invalid field on failed submission.
**Key Decisions:**
- [HIGH] Three validation modes: native/aria/server — covers client-only, SPA, and server-round-trip validation without external form libraries
- [HIGH] `validationErrors` prop for server injection: `{ email: "Address already in use" }` injects server errors directly into the corresponding field — unique among Tier 1; no manual field state updates required
- [MED] `necessityIndicator`: `"icon"` (asterisk) or `"label"` ("required"/"optional" text) — configures how required/optional fields are marked across the entire form
**Notable API:** `validationBehavior: "native" | "aria"`; `validationErrors: Record<string, string | string[]>`; `labelPosition: "top" | "side"`; `necessityIndicator: "icon" | "label"`
**A11y:** Focus management to first invalid field on submit failure; form fields with `isRequired` get `aria-required`; `aria-describedby` links fields to their error messages automatically.
**Best at:** Server-side error injection via `validationErrors` — the cleanest mechanism for distributing server validation errors to individual fields in any Tier 1 system.
**Missing:** Field array management (no Form.List equivalent); the three-mode validation setup has a learning curve compared to simple per-field validate functions.

---

## carbon
**Component:** Form / FormGroup / FormItem
**Approach:** Carbon's Form provides structural components (FormGroup with `legendText`, FormItem for individual fields) but no form-level validation lifecycle — all validation is per-field and triggered on blur. Required vs. optional indication follows the "minority marking" convention: mark what's less common. Top-aligned labels are enforced by Carbon's design guidelines. `warn` + `invalid` two-tier validation is available at field level.
**Key Decisions:**
- [HIGH] Per-field validation only, triggered on blur: Carbon's Form is a layout and grouping component, not a state manager — no `onSubmit` validation lifecycle
- [MED] Minority marking convention: if most fields are required, mark optional fields with "(optional)"; if most are optional, mark required with asterisk — reduces visual noise
- [MED] `legendText` required on FormGroup: semantic `<fieldset>` equivalent requires an accessible legend; Carbon enforces this via a required prop
**Notable API:** `FormGroup` with `legendText: string` (required); `FormItem` wrapper; no `onSubmit` validation lifecycle; per-field `invalid`/`warn` booleans
**A11y:** `FormGroup` renders a `<fieldset>` with `<legend>` for accessible grouping. Individual fields use `aria-invalid` and `aria-describedby`. No form-level ARIA management.
**Best at:** `FormGroup` with required `legendText` for accessible fieldset grouping — the only Tier 1 system that enforces `<legend>` text on grouped form sections via a required prop.
**Missing:** Form-level validation lifecycle (no `onSubmit` with validation); no cross-field validation; no Form.List for dynamic field arrays.

---

## polaris
**Component:** Form + FormLayout (separated responsibilities)
**Approach:** Polaris separates submission (Form) from layout (FormLayout). Form wraps a `<form>` element with `onSubmit`; FormLayout arranges fields with Polaris spacing. `implicitSubmit` defaults to `true` — pressing Enter in any text field submits the form. `noValidate` disables browser validation (recommended). FormLayout.Group puts fields in a horizontal row; `condensed` variant for short inputs.
**Key Decisions:**
- [HIGH] `implicitSubmit` defaults true: Enter submits from text inputs — documented keyboard accessibility feature for merchant power users
- [MED] `noValidate` standard pattern: Polaris disables browser native validation UI to maintain visual consistency with Polaris field error patterns
- [MED] FormLayout.Group for horizontal arrangement: documented for "familiar layouts" like city/state/ZIP — proximity implies relationship, so group only semantically related fields
**Notable API:** `implicitSubmit: boolean` (default true); `noValidate: boolean`; `FormLayout.Group`; `FormLayout.Group condensed` for short inputs
**A11y:** `<form>` element creates a form landmark for screen readers. Individual Polaris field components handle `aria-invalid`, `aria-required`, `aria-describedby`. No Form-level ARIA cross-referencing child fields.
**Best at:** Merchant-specific UX guidance — Polaris documents the cognitive reasoning for field grouping (proximity implies relationship) explicitly.
**Missing:** Form-level validation state management — Form does not track invalid fields, prevent submission with errors, or provide summary error messages.

---

## atlassian
**Component:** Form (Final Form based, structured hierarchy)
**Approach:** Atlassian's Form is built on the Final Form library. Each field is wrapped in `<Field validate={fn}>` where the validate function is the per-field validation source. Validation triggers on both blur and submit. `onSubmit` receives form data only after all validations pass; returning an object from `onSubmit` injects server errors back into fields. Full hierarchy: FormHeader, FormSection (renders `<fieldset>`), FormFooter, Field.
**Key Decisions:**
- [HIGH] Field validate function owns validation: co-located with the field, receives current value, returns error string or undefined — clean pattern for field-specific business logic
- [HIGH] Server error injection via `onSubmit` return: returning `{ email: "Already taken" }` from `onSubmit` distributes server errors to matching fields — simpler than Spectrum's `validationErrors` prop
- [MED] FormSection as `<fieldset>` equivalent: logical grouping with a heading; screen readers announce the section name with the grouped fields
**Notable API:** `Field` with `validate: (value) => string | undefined | Promise`; `isRequired` on Field; `onSubmit` return value for server errors; `defaultValues`; `FormSection`, `FormHeader`, `FormFooter`
**A11y:** `aria-required` from `isRequired`; `aria-invalid` when field validation fails; `aria-describedby` linking field to `ErrorMessage`. `FormSection` renders `<fieldset>` with `<legend>`. Atlassian documentation specifies required asterisk legend text in FormHeader.
**Best at:** Structured form hierarchy (FormHeader/FormSection/FormFooter) — the most articulated form anatomy in Tier 1, making it clear where titles, grouped fields, and actions belong.
**Missing:** Field array management (dynamic add/remove fields like Ant Design's Form.List); cross-field dependencies without custom validate function wiring.

---

## ant-design
**Component:** Form (store-based, most feature-rich)
**Approach:** Ant Design's Form uses a standalone data store (`Form.useForm()` returns a `FormInstance`) separate from React component state. Only the field that changed re-renders (selective updates). `validateTrigger` configures when validation fires (per form and per field). `dependencies` enables declarative cross-field validation. `shouldUpdate` controls conditional rendering. `Form.List` manages dynamic field arrays. `scrollToFirstError` scrolls to the first invalid field on submit.
**Key Decisions:**
- [HIGH] Store-based selective re-rendering: only the changed field re-renders; 50-field forms don't re-render entirely on every keystroke — critical for performance in enterprise data-entry forms
- [HIGH] `dependencies` for cross-field validation: `<Form.Item dependencies={['password']}>` re-validates the confirm-password field when the password field changes — declarative cross-field dependency mechanism unique among Tier 1
- [MED] `Form.List` for dynamic field arrays: built-in `add`/`remove`/`move` operations with integrated store tracking — no external library needed for variable-length field groups
**Notable API:** `Form.useForm()`; `validateTrigger: string | string[]`; `dependencies: string[]` on Form.Item; `shouldUpdate: boolean | fn`; `Form.List`; `scrollToFirstError`; `onFinish`/`onFinishFailed`; `preserve: boolean`
**A11y:** `aria-required` from `{ required: true }` rule; `aria-invalid` on validation error; `aria-describedby` linking to error message element. `scrollToFirstError` combined with autoFocus is the recommended post-submit focus management pattern.
**Best at:** Cross-field validation via `dependencies` and dynamic field arrays via `Form.List` — the only Tier 1 system capable of handling full enterprise form complexity without an external form library.
**Missing:** Visual layout utilities comparable to Polaris's FormLayout.Group — `labelCol`/`wrapperCol` grid system requires understanding 24-column math; no simple "put these two fields side by side" shorthand.
