---
system: Polaris (Shopify)
component: Form + FormLayout
url: https://polaris.shopify.com/components/selection-and-input/form
last_verified: 2026-03-28
---

# Form + FormLayout

## Approach

Polaris separates form architecture into two distinct components with a precise division of responsibilities. Form handles the submission contract — it wraps content in a semantic HTML `<form>` element and manages the submission event lifecycle via `onSubmit`. FormLayout handles the spatial arrangement contract — it positions fields with standard Polaris spacing and supports both vertical stacking and horizontal grouping via FormLayout.Group. This separation is deliberate: a Polaris page might have a form whose fields need different spatial arrangements in different sections, and coupling layout tightly to the submission wrapper would make those per-section layout decisions awkward.

The design philosophy is specifically merchant-facing. Polaris forms are built for Shopify merchants — business owners, not technical users — and every form pattern is optimized for that context. This means frictionless completion is the primary goal: forms should request only what is required, group related fields logically, follow predictable field ordering (first name before last name, city before ZIP), and avoid clever patterns that might confuse non-technical users. The Polaris documentation is unusually explicit about merchant mental models, warning against grouping unrelated fields horizontally because proximity implies relationship.

## Key Decisions

1. **Form and FormLayout are separate components** (HIGH) — Form owns submission, FormLayout owns visual arrangement. They compose together but are independent. The WHY: This decoupling means FormLayout can be used for non-form contexts (e.g., arranging filter inputs in a search panel that doesn't submit as a form), and Form can be used without any specific layout tool when the team needs custom CSS. It also means FormLayout doesn't need to know about validation state, and Form doesn't need to know about column counts — each component stays focused.

2. **`implicitSubmit` defaults to true** (HIGH) — Pressing Enter in any text field within a Form will submit it by default. This is explicit in the Polaris documentation as a keyboard accessibility feature: "provides a shortcut for keyboard users." The WHY: Most Shopify admin forms are straightforward — fill in fields, submit. Power users (merchant operations teams, developers using the admin) are faster when they can hit Enter to submit without reaching for the mouse. The prop exists to disable this when a form has text areas or multi-step interactions where Enter should not submit.

3. **noValidate is the standard pattern** (MEDIUM) — Polaris recommends disabling browser native validation via the `noValidate` prop and implementing custom validation in the `onSubmit` handler. The WHY: Browser native validation UI (tooltip bubbles on invalid fields) is not visually consistent with Polaris and does not follow Polaris error patterns. By opting out of native validation, the team controls exactly how errors look and when they appear — Polaris field components (TextField, Select) have their own `error` prop that renders inline error messages in Polaris style.

4. **FormLayout.Group for horizontal field arrangement** (MEDIUM) — FormLayout.Group places multiple fields in a single horizontal row. The documentation is explicit about when to use it: "works best for familiar layouts such as a row of city, state, and zip code fields." The WHY: The mental model here is cognitive familiarity — users complete city/state/ZIP on a single line because that's how addresses appear on paper. The guidance warns against grouping unrelated fields because proximity creates an implied relationship that can mislead merchants. This is a merchant-first design decision, not a pure layout decision.

5. **Condensed variant for compact data entry** (LOW) — `FormLayout.Group condensed` reduces the width of each field in the group to create a denser arrangement. Used for short inputs like dimensions (width, height, depth) or date components. The WHY: Some data requires multiple short related inputs simultaneously — a product dimension needs three numbers, and showing three full-width stacked inputs wastes space and breaks the mental model of "these three values together define one thing."

## Notable Props/API

- `onSubmit`: The submission handler on Form. Receives the native form event. Polaris does not provide a parsed data object — the developer accesses controlled component state directly, consistent with React's controlled input pattern.
- `implicitSubmit`: Boolean on Form. Defaults `true`. Controls whether pressing Enter in a text field fires `onSubmit`. Setting to `false` is required for forms with textareas, forms with rich text editors, or multi-step wizard-style forms where Enter advances a step rather than completing the form.
- `noValidate`: Boolean on Form. Tells the browser not to run constraint validation on submission. Used alongside Polaris field-level `error` props to maintain visual consistency.
- `preventDefault`: Boolean on Form. Blocks the default form action. Relevant for server-rendered contexts where a form might submit to a URL without JavaScript — this prop controls whether the Polaris React component overrides that behavior.

## A11y Highlights

- **Keyboard**: `implicitSubmit={true}` (default) means Enter submits from text inputs — explicitly documented as a keyboard accessibility feature. Tab order follows DOM order. FormLayout.Group renders fields in a row but tab order remains left-to-right in DOM order, which is correct for the intended city/state/ZIP mental model.
- **Screen reader**: The Form wraps content in `<form>`, which creates a form landmark. Polaris's TextField and other field components handle their own `aria-describedby` for error messages. The documentation notes that wrapping in `<form>` "helps to support assistive technologies" — they rely on native HTML landmark semantics rather than explicit ARIA roles.
- **ARIA**: Form renders a native `<form>` element. Individual Polaris field components (used inside Form and FormLayout) handle `aria-invalid`, `aria-required`, and `aria-describedby` for their own error and hint text. There is no Form-level ARIA that references child fields.

## Strengths & Gaps

- **Best at**: Merchant-specific UX guidance — Polaris is the only Tier 1 system that explicitly documents the cognitive reasoning behind field grouping (proximity implies relationship) and provides concrete guidance on field ordering based on merchant mental models.
- **Missing**: Any form-level validation state management — Form does not track which fields are invalid, does not prevent submission when fields have errors, and does not provide a mechanism for summary error messages. All validation orchestration must be implemented in the `onSubmit` handler using the application's own state.
