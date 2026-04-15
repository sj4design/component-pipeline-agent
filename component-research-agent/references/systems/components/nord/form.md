---
system: Nord Design System (Nordhealth)
component: Not available natively (form field components exist individually)
url: https://nordhealth.design/components/
last_verified: 2026-03-29
confidence: high
---

# Form

## Approach
Nord does not provide a `<nord-form>` wrapper component — clinical forms are composed from Nord's individual field components (`<nord-input>`, `<nord-select>`, `<nord-checkbox>`, `<nord-radio>`, `<nord-textarea>`) placed within a standard HTML `<form>` element. This composable approach reflects the complexity and variability of healthcare data entry: clinical forms range from simple appointment booking fields to complex multi-section patient intake forms with conditional logic, medication dosing calculations, and regulatory-required fields. A prescriptive form wrapper would impose layout and validation constraints that cannot accommodate this diversity. Instead, Nord invests deeply in the individual field component quality — each field component handles its own label association, error state display, help text, and disabled state — so the form-level experience emerges from composing high-quality primitives. CSS Custom Properties (`--nord-stack-*`, layout utilities) and Nord's Stack layout component handle form layout without requiring a form wrapper component.

## Key Decisions
1. **No form wrapper — maximum composability** (HIGH) — Clinical forms have wildly variable structures: a prescription form has different layout needs than a patient demographics form than a clinical assessment checklist. A form wrapper that enforces layout, validation strategy, or submission behavior would need to be bypassed or overridden for most real clinical forms, making it net-negative complexity.
2. **Each field owns its own label, error, and help text** (HIGH) — Nord's field components (`<nord-input>`, `<nord-select>`, etc.) each accept `label`, `error`, and `hint` props/slots directly. This means the label is always semantically associated with its field by the component itself — there is no risk of form layout changes breaking label-for associations, which is a common accessibility failure in healthcare data entry forms.
3. **Native `<form>` for submission semantics** (HIGH) — Using a standard HTML `<form>` element for wrapping preserves native form submission behavior, `FormData` API compatibility, and browser-level autofill/autocomplete — all important in clinical contexts where form data may integrate with EHR backend APIs using standard HTTP form submission patterns.
4. **Validation at the field component level** (MEDIUM) — Individual Nord field components expose error states via the `error` prop/attribute. Clinical validation logic (e.g., dosage range checks, required fields for clinical coding) lives at the application layer, where it can access clinical rules, patient context, and regulatory requirements — not in a generic form wrapper.

## Notable Props
- No `<nord-form>` component exists; the following individual components compose forms:
- `<nord-input>`: Text, number, date, email, and other text-based fields; accepts `label`, `error`, `hint`, `required`, `disabled`
- `<nord-select>`: Dropdown selection; accepts `label`, `error`, `hint`, `required`, `disabled`
- `<nord-checkbox>`: Boolean toggle; accepts `label`, `error`, `hint`, `required`, `disabled`
- `<nord-textarea>`: Multi-line text; accepts `label`, `error`, `hint`, `required`, `disabled`, `rows`
- `<nord-radio>` / `<nord-radio-group>`: Radio button group; `<nord-radio-group>` handles group labeling and error state

## A11y Highlights
- **Keyboard**: Each field component is independently keyboard accessible; Tab order follows DOM order; clinical form layout should ensure logical top-to-bottom, left-to-right tab flow matching visual order
- **Screen reader**: Each field component handles its own `<label>` association via `for`/`id` or Shadow DOM label association internally; `aria-describedby` links hint and error text to the field; no risk of label-field disconnection from layout changes
- **ARIA**: `aria-required="true"` exposed on required fields; `aria-invalid="true"` and associated error message via `aria-describedby` when `error` prop is set; `<fieldset>` + `<legend>` used within grouped components (radio groups, checkbox groups) for proper group labeling

## Strengths & Gaps
- **Best at**: Composable, flexible form construction for diverse clinical data entry needs; each field is accessibility-complete independently; no risk of form wrapper imposing incompatible layout constraints on complex clinical forms; integrates with native HTML form submission and browser autofill
- **Missing**: No form-level validation orchestration utility (teams must implement their own validation run-all-fields logic); no form layout component (teams use CSS Grid/Flexbox directly, leading to inconsistent spacing); no form-level loading/submitting state management primitive; no structured approach for complex multi-column clinical form layouts
