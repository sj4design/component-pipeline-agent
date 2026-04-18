# Form — Research
**Date:** 2026-04-17 | **Mode:** Max | **Systems:** 24 | **Scope:** All patterns

---

## Sistemas sin componente dedicado

| Sistema | Razón | Workaround |
|---------|-------|------------|
| Material Design 3 | Per-field validation only; no form container or form-level state management | TextField with supportingText→errorText per field |
| Gestalt | Composition-first; forms assembled from field components + HTML `<form>` + Box layout | BannerSlim for form-level server errors |
| Orbit | No Form wrapper; each field owns its own label/error/help props | FieldGroup for `<fieldset>/<legend>` grouping only |
| Evergreen | All-in-one fields bundle label+input+error+hint; FormField wraps custom inputs | TextInputField/SelectField flat-prop patterns |
| Nord | No `<nord-form>`; each field component owns label/error/hint internally | Native `<form>` for browser autofill and FormData API |
| Radix UI | Form primitive exists with automatic aria-describedby wiring + browser constraint validation | Radix Form with serverInvalid prop |
| Base Web | FormControl as single-field wrapper only | Combine multiple FormControl instances |
| Chakra UI | FormControl as single-field wrapper; recommends react-hook-form for full form management | FormControl + react-hook-form |
| Mantine | useForm hook-first approach; @mantine/form package | Mantine useForm hook |
| REI Cedar | Form patterns via individual field components | WCAG 2.1 AA field patterns |

**Systems WITH dedicated Form container:** Spectrum Form, Carbon Form/FormGroup/FormItem, Polaris Form+FormLayout, Atlassian Form (Final Form), Ant Design Form, Twilio Paste (FormField wrappers), Salesforce Lightning (LightningRecordEditForm), GitHub Primer FormControl, shadcn/ui Form (react-hook-form+Zod), Playbook Form, Fluent 2 Field, GOV.UK Error Summary pattern — 12 of 24

---

## How Systems Solve It

### Atlassian Form (Final Form) — "Field-level validation co-located + server errors via onSubmit return"

Atlassian's Form is built on the Final Form library. Each field is wrapped in `<Field validate={fn}>` where the validate function owns validation and lives co-located with the field definition — clean pattern for field-specific business logic. Validation triggers on both blur and submit. Returning an object from `onSubmit` (e.g., `{ email: "Already taken" }`) injects server errors back into the corresponding fields without any additional state management.

The structured hierarchy is the most articulated form anatomy in Tier 1: `FormHeader` for title + description, `FormSection` for grouped fields (renders `<fieldset>` with `<legend>`), `FormFooter` for action buttons. This explicit anatomy makes it clear where titles, grouped fields, and actions belong — a reference for any system designing a complete form component set.

**Design Decisions:**
- **Field validate function owns validation** → Why: co-locating validation with the field definition makes the code easier to read and maintain; the validation logic for "is this a valid email?" belongs next to the email field definition → Impact: HIGH → Para tu caso: expose per-field validation as a function prop on Field components rather than a centralized schema
- **`onSubmit` return value for server errors** → Why: the cleanest mechanism for distributing server validation errors to individual fields — return `{fieldName: errorMessage}` from onSubmit, fields get the error automatically → Impact: HIGH → Para tu caso: implement server error injection via form submission callback; avoid manual field state updates for server errors
- **FormSection renders `<fieldset>` with `<legend>`** → Why: semantic grouping of related fields is required for accessibility; screen readers announce the section name when entering the group → Impact: HIGH → Para tu caso: provide a FormSection/FormGroup component that renders `<fieldset>`+`<legend>` automatically

**Notable Props:** `Field` with `validate: (value) => string|undefined|Promise`; `isRequired`; `onSubmit` return for server errors; `defaultValues`; `FormSection`, `FormHeader`, `FormFooter`

**Accessibility:** `aria-required` from `isRequired`; `aria-invalid` on validation error; `aria-describedby` linking field to ErrorMessage; FormSection renders `<fieldset>` with `<legend>`; Atlassian documentation specifies required asterisk legend text in FormHeader

---

### Ant Design Form — "Store-based selective re-rendering + cross-field dependencies + Form.List"

Ant Design's Form uses a standalone data store (`Form.useForm()` returns a `FormInstance`) separate from React component state. Only the field that changed re-renders — critical for performance in 50-field enterprise data-entry forms. The `dependencies` prop on Form.Item is the unique capability: `<Form.Item dependencies={['password']}>` re-validates the confirm-password field when the password field changes — declarative cross-field dependency mechanism.

`Form.List` manages dynamic field arrays with built-in `add`/`remove`/`move` operations. No external library needed for variable-length field groups (e.g., add multiple recipients, add line items to an invoice). `scrollToFirstError` scrolls to the first invalid field on submit failure. `validateTrigger` configures validation timing per-form or per-field.

**Design Decisions:**
- **Store-based selective re-rendering** → Why: standard React state re-renders the entire form on every keystroke; with 50+ fields this causes visible lag → Impact: HIGH → Para tu caso: for forms with >20 fields, use a form store abstraction (Final Form, react-hook-form, Ant Form) rather than React state
- **`dependencies` for cross-field validation** → Why: confirm-password, end-date-after-start-date, and conditional required fields need to re-validate when related fields change; without `dependencies`, cross-field validation is manual → Impact: HIGH → Para tu caso: implement cross-field validation support via a dependencies array or watch mechanism
- **`Form.List` for dynamic field arrays** → Why: adding/removing line items, multiple recipients, or repeated field groups is a common enterprise pattern; doing it without `Form.List` requires substantial boilerplate → Impact: HIGH → Para tu caso: implement a Form.List or field array pattern; it unlocks a wide range of complex form use cases

**Notable Props:** `Form.useForm()`; `validateTrigger: string|string[]`; `dependencies` on Form.Item; `shouldUpdate: boolean|fn`; `Form.List`; `scrollToFirstError`; `onFinish`/`onFinishFailed`; `preserve: boolean`

**Accessibility:** `aria-required` from required rule; `aria-invalid` on error; `aria-describedby` linking to error message; `scrollToFirstError` + autoFocus for post-submit focus management; ⚠️ `labelCol`/`wrapperCol` 24-column system is verbose compared to simpler layout approaches

---

### Spectrum Form — "Three validation modes: native / aria / server injection"

Spectrum's Form provides three `validationBehavior` modes: `native` (browser constraint validation — shows browser error tooltips), `aria` (React Aria-managed ARIA live regions — consistent visual styling), and server mode via `validationErrors` prop that accepts `{ email: "Address already in use" }` to inject server errors directly into corresponding fields. Focus moves to the first invalid field on failed submission. The Form propagates `labelPosition`, `isDisabled`, and `isQuiet` to all child fields automatically.

---

### Carbon Form / FormGroup — "FormGroup with required legendText enforces accessible fieldset grouping"

Carbon's FormGroup requires `legendText` as a non-optional prop — the only Tier 1 system that mandates the accessible legend text for grouped form sections. This makes it impossible to create a FormGroup without an accessible label for the group. Carbon's minority marking convention is a practical UX insight: mark required if most fields are optional; mark optional if most are required — reduces visual asterisk noise.

---

### shadcn/ui Form — "react-hook-form + Zod: type-safe validated React forms"

shadcn/ui's Form tightly integrates react-hook-form for state management and Zod for schema validation — the current React ecosystem best practice for type-safe form validation. Error messages flow from Zod schema to FormMessage automatically. `FormField`/`FormItem`/`FormLabel`/`FormMessage` sub-components follow the shadcn composition pattern.

---

### GOV.UK Error Summary — "Page-level error summary with programmatic focus on submit failure"

GOV.UK has no `<Form>` component but its Error Summary pattern is the most thoroughly researched form-level error treatment. When validation fails, a summary appears at the top of the page listing every error with anchor links to each field. The summary is focused programmatically on load — screen reader users encounter all errors before they start navigating the form. The "one thing per page" principle ensures error summaries remain manageable in length.

---

### Mantine useForm — "Hook-first with getInputProps spreading: minimal boilerplate form management"

Mantine's `useForm` hook from `@mantine/form` returns `getInputProps('fieldName')` that spreads value, onChange, onBlur, and error props onto any Mantine input in one call — eliminating per-field boilerplate. Nested object and array field paths. Built-in validation with Yup/Zod adapter support. This is the only T3 system that bundles a complete form state management solution rather than requiring a third-party library.

---

### Fluent 2 Field — "Multi-level validationState: error/warning/success/none"

Fluent 2's `Field` component with `validationState` supporting four levels (error/warning/success/none) is the most expressive T3 validation state model. The warning level — advisory feedback without blocking submission — is meaningful for enterprise forms: "this rate looks unusually high — are you sure?" The `hint` vs. `validationMessage` distinction (two distinct text slots) separates persistent context from validation feedback.

---

### Radix Form — "Automatic aria-describedby wiring on top of native browser constraint validation"

Radix's Form primitive automatically wires `aria-describedby` between inputs and validation messages, and integrates with the browser native constraint validation API. The `serverInvalid` prop handles server-returned errors. This is the lowest-level form accessibility infrastructure — Radix provides the ARIA wiring, consumers provide the validation logic.

---

## Pipeline Hints

**Archetype recommendation:** container
Rationale: Form is a container component that coordinates multiple field components, manages shared validation state, and handles submission lifecycle. The shell is `<form>` element with child fields, groups, and action buttons.

**Slot consensus:** (12/24 systems with dedicated Form container)
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| fields | container | yes | 12/12 | Main content area of the form; child field components |
| title / header | text | no | 7/12 | Form-level heading; Atlassian FormHeader, Carbon pattern |
| description | text | no | 6/12 | Supporting text below title |
| actions / footer | container | yes | 10/12 | Submit + cancel buttons; Atlassian FormFooter |
| field-group | container | no | 8/12 | Semantic group with fieldset+legend; Carbon FormGroup, Atlassian FormSection, Orbit FieldGroup |
| error-summary | container | no | 4/12 | GOV.UK pattern; list of all errors linked to fields |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| ValidationBehavior | variant | native/aria/server | 3/12 | Spectrum explicit; others implicit |
| LabelPosition | variant | top/side | 5/12 | Spectrum propagates to all fields; Ant Design labelCol/wrapperCol |
| NecessityIndicator | variant | icon(asterisk)/label(required/optional) | 4/12 | How required/optional fields are marked |
| ValidationTrigger | variant | blur/change/submit | 8/12 | When validation fires; blur is most common default |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| isDisabled | 10/12 | false | Disables entire form + all child fields |
| isReadOnly | 5/12 | false | Read-only mode; displays values, no editing |
| noValidate | 4/12 | true (recommended) | Polaris recommends; disables browser-native validation UI for visual consistency |
| implicitSubmit | 2/12 | true | Polaris; Enter in text input submits form |
| scrollToFirstError | 4/12 | false | Ant Design; Spectrum; scroll + focus on first invalid field after submit |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 12/12 | fields at rest | |
| submitting | 6/12 | submit button loading state; fields may be disabled | |
| submit-error | 10/12 | error states on invalid fields; focus to first error | |
| submit-success | 4/12 | success state or redirect | |
| server-error | 8/12 | server-injected errors on specific fields | Atlassian/Spectrum injection patterns |
| disabled | 8/12 | all fields and buttons disabled | |

**Exclusion patterns found:**
- submitting × disabled — submitting form disables submission button only; fields may remain interactive
- submit-success × submit-error — mutually exclusive outcomes

**Building block candidates:**
- FormGroup/FormSection → renders `<fieldset>` + `<legend>` — 8/12 systems have explicit grouping component
- FormHeader → title + description above form — 4/12 systems (Atlassian, Carbon, Polaris)
- FormFooter → action buttons below form — 6/12 systems (Atlassian, Polaris, Carbon)
- ErrorSummary → page-level error list on submit failure — 2/12 (GOV.UK, Spectrum concept)

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| labelPosition | top/side | 5/12 | side = horizontal label+input layout |
| validationTrigger | onBlur/onChange/onSubmit | 8/12 | blur is most common default |
| necessityIndicator | icon/label | 4/12 | asterisk vs. "(required)" text |

**A11y consensus:**
- Primary role: `<form>` element creates a form landmark; all form containers should render a `<form>` element
- Required ARIA on each field: `aria-required="true"` (not just HTML `required` — avoids browser native validation UI); `aria-invalid="true"` when invalid; `aria-describedby` linking to error message (this trio is universal)
- Field grouping: `<fieldset>` + `<legend>` for related groups (radio groups, address fields, date parts) — Carbon's required `legendText` is the enforcement reference
- Error messages: must be associated with the specific field via `aria-describedby` — position alone (above/below/beside) does not create the programmatic association
- Submit error focus: focus must move to the first invalid field or an error summary — never leave focus on the submit button after a failed submission
- GOV.UK Error Summary: focus the summary programmatically on submission failure; link each error to its field with an anchor; announce full error list at once
- `aria-required="true"` is preferred over HTML `required` — avoids browser-native validation UI inconsistency
- Required field indication: both visual asterisk AND text indication ("required" or "(optional)") for WCAG compliance; asterisk alone relies on sighted-user knowledge of convention
- APG pattern: None specific; follows WCAG form success criteria (1.1.1, 1.3.1, 2.4.3, 3.3.1, 3.3.2)

---

## What Everyone Agrees On

1. **The field accessibility trio is universal**: `aria-required="true"`, `aria-invalid="true"` when invalid, and `aria-describedby` linking to error message — every T1/T2/T3 system that provides field wrappers implements this trio automatically. It's the non-negotiable accessibility floor.

2. **`<fieldset>` + `<legend>` for grouped fields**: Radio groups, split date inputs, address fields — all require the fieldset+legend pattern for screen readers to convey that fields belong together. Carbon makes legendText required; every other system documents it as mandatory.

3. **Error messages belong after labels and before inputs**: GOV.UK user research shows error messages placed between label and input (not below the input) are noticed faster and associated more reliably with their field. Multiple systems follow this placement.

4. **Server errors should inject into individual fields**: The `onSubmit` return pattern (Atlassian) and `validationErrors` prop (Spectrum) both represent the same insight: server validation errors should arrive at the individual field they describe, not as a form-level generic message.

5. **Validation triggers on blur, not on change**: Firing validation on every keystroke interrupts users who are still typing. All systems that document validation timing default to blur (when user leaves the field) or submit (final check).

---

## Where They Disagree

**"¿Form container or per-field components only?"**
→ Form container (Atlassian, Ant Design, Spectrum, Polaris): coordinates shared props (disabled, label position) + submission lifecycle + cross-field validation → Per-field only (GOV.UK, Orbit, Evergreen, Nord): composition-first; HTML `<form>` provides the only grouping needed; field components are fully self-contained
→ Para tu caso: form container for complex forms with cross-field validation and submission state management; per-field for simple forms with 3-5 independent inputs

**"¿External form library or built-in state management?"**
→ External (shadcn/ui + react-hook-form + Zod; Chakra + react-hook-form; Atlassian + Final Form): leverage best-in-class form state library; less code to maintain → Built-in (Ant Design Form.useForm; Mantine useForm): no dependency; simpler setup; opinionated about patterns
→ Para tu caso: react-hook-form is the current ecosystem standard; integrating with it (shadcn approach) or providing an official adapter is better than re-implementing form state management

**"¿Asterisk or text for required indication?"**
→ Asterisk only (many systems): compact; visually familiar → Asterisk + "required" text or "(optional)" text (Carbon minority marking, Spectrum `necessityIndicator`): WCAG-compliant; works for users who don't know the asterisk convention → Para tu caso: always pair asterisk with a legend in FormHeader explaining its meaning, OR use explicit "(required)"/"(optional)" text — never asterisk-only in isolation

**"¿Validate on blur or on submit?"**
→ Blur (most systems): immediate field-level feedback; corrects mistakes before submitting → Submit only (simpler forms): less interruption; better for very short forms (2-3 fields) → Para tu caso: validate on blur for forms with >5 fields or complex validation; submit-only for simple 2-3 field forms

**"¿Field array (Form.List) as component or external?"**
→ Built-in (Ant Design Form.List): one package; consistent API; well-integrated with form state → External (react-hook-form `useFieldArray`): battle-tested; widely adopted; separates concerns → Para tu caso: if you use react-hook-form, `useFieldArray` is the correct field array solution; don't build a custom Field.List unless you have a form state management library of your own

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Top-aligned labels | Label above input; full-width inputs | Default for most forms | Most systems |
| Side-aligned labels | Label left, input right; two-column layout | Settings forms with many fields | Ant Design, Spectrum, Polaris horizontal |
| FormGroup/Section | Fieldset with legend for related fields | Address, date splits, radio groups | Carbon, Atlassian, Orbit |
| Inline errors | Error below input; red border on input | Standard field validation feedback | All systems |
| Error summary | List of all errors at top of page; links to fields | Long forms; GOV.UK compliance | GOV.UK, recommended by Spectrum |
| Dynamic field array | Add/remove rows for repeated field groups | Line items, recipients, filters | Ant Design Form.List, react-hook-form useFieldArray |

**Wireframe — standard form with groups:**
```
┌─────────────────────────────────────────────────────────────┐
│  Contact Information                                        │
├─────────────────────────────────────────────────────────────┤
│  Name *                                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Pedro Quinones                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Email *                                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  pedro@example.com                                  │   │
│  └─────────────────────────────────────────────────────┘   │
│  ⚠ Enter a valid email address                             │
├─────────────────────────────────────────────────────────────┤
│  <fieldset> Address (optional)                            │
│    City                    State     ZIP                    │
│    ┌────────────────┐  ┌────────┐  ┌──────────────────┐   │
│    │                │  │        │  │                  │   │
│    └────────────────┘  └────────┘  └──────────────────┘   │
│  </fieldset>                                               │
├─────────────────────────────────────────────────────────────┤
│                    [Cancel]  [Save changes]                 │
└─────────────────────────────────────────────────────────────┘
```

**Wireframe — GOV.UK error summary:**
```
┌─────────────────────────────────────────────────────────────┐
│  ⚠ There is a problem                                      │
│                                                             │
│  • Enter your date of birth → [link to field]             │
│  • Enter a UK phone number  → [link to field]             │
└─────────────────────────────────────────────────────────────┘
[... form below with errors on each field ...]
```

---

## Risks to Consider

**Missing `<fieldset>`/`<legend>` for grouped fields** (HIGH) — the most common accessible form failure; radio groups, checkbox groups, and split date inputs that don't use fieldset+legend leave screen reader users without context for what the group represents; mitigation: make fieldset+legend usage automatic in your FormGroup/Section component; never expose a group wrapper without legend support

**Form-level server errors not distributed to fields** (MEDIUM) — teams often display server validation errors in a top-level alert instead of linking them to the specific fields they describe; users must mentally match "Invalid email" at the top to the email field below; mitigation: implement Atlassian's onSubmit return pattern or Spectrum's validationErrors prop

**`aria-required` vs. HTML `required` confusion** (LOW) — HTML `required` triggers browser native validation UI that is inconsistently styled and announced; most systems recommend `aria-required` without HTML `required` when using custom validation UI; mitigation: use `aria-required="true"` for screen readers; use `required` only if you want browser-native validation as a fallback

---

## Dimension Scores

| Dimension | Atlassian | Ant Design | Spectrum | shadcn/ui | Carbon | GOV.UK (patterns) |
|-----------|-----------|-----------|----------|-----------|--------|-------------------|
| Feature coverage | 4/5 | 5/5 | 5/5 | 4/5 | 3/5 | 3/5 |
| A11y depth | 5/5 | 3/5 | 5/5 | 4/5 | 5/5 | 5/5 |
| API ergonomics | 4/5 | 4/5 | 4/5 | 5/5 | 3/5 | — |
| Cross-field validation | 3/5 | 5/5 | 4/5 | 5/5 | 1/5 | — |
| Dynamic fields | 2/5 | 5/5 | 1/5 | 5/5 | 1/5 | — |

---

## Next Steps

```
/spec form      → outputs/form-config.json
/enrich form    → a11y tokens + interaction spec
/build form     → full pipeline in one command
/build form --max  → use pre-generated config
```
