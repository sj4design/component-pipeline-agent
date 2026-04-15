---
component: Checkbox
tier: 3
last_verified: 2026-03-29
---

# Checkbox — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Checkbox | Headless; `checked` accepts `boolean | "indeterminate"`; `Checkbox.Indicator` renders conditionally for per-state icon control; native form integration. | high |
| Chakra UI | Checkbox | `isIndeterminate` boolean; custom `icon` prop; `CheckboxGroup` for value array management; colorScheme integration. | high |
| GOV.UK | Checkboxes | Large touch targets; conditional reveal per option; exclusive "none of the above" option; `<fieldset>`/`<legend>` grouping. | high |
| Base Web | Checkbox | `checkmarkType` renders as toggle switch variant; `labelPlacement` at top/bottom/left/right; Override-based visual customization. | medium |
| Fluent 2 | Checkbox | `checked="mixed"` mirrors ARIA spec directly; `shape="circular"` for Office list visual patterns; `labelPosition` before/after. | high |
| Gestalt | Checkbox | `label` is required; `labelDisplay="hidden"` for table contexts; `size` sm/md for density; Pinterest red for checked state. | medium |
| Mantine | Checkbox | `Checkbox.Card` for full-card clickable checkbox (settings/plan selection); `Checkbox.Group` with orientation; custom `icon`; full size scale. | high |
| Orbit | Checkbox | Mobile-first touch targets; `info` prop for travel option explanation tooltips; `hasError` for form validation; no indeterminate state. | medium |
| Evergreen | Checkbox | Minimal B2B style; `indeterminate` for bulk-select in analytics dashboards; `isInvalid` for error state. | medium |
| Nord | nord-checkbox (Checkbox) | Healthcare consent and symptom forms; unambiguous visual state clarity for clinical decision-making; web component portability. | low |

## Key Decision Patterns

Indeterminate state handling is the most technically contested decision in T3 checkboxes. Radix uses `checked="indeterminate"` (a string union type), Fluent 2 uses `checked="mixed"` (directly matching the ARIA spec's `aria-checked="mixed"`), Chakra and Mantine use a separate `isIndeterminate` boolean, and Gestalt and Evergreen use an `indeterminate` boolean. Fluent 2's approach of mirroring the ARIA value directly in the prop is the most semantically consistent with the spec. Orbit is the only system to omit indeterminate support entirely.

Mantine's `Checkbox.Card` addresses a widely felt pattern gap. Settings and pricing UIs frequently need checkboxes where the entire option card (icon + title + description) is the click target. Most systems require consumers to compose this manually; Mantine formalizes it as a component variant. This pattern is also common in plan selection flows and feature toggle dashboards.

GOV.UK's conditional reveal is a deeply government-specific pattern with broader applicability. The ability for a checkbox selection to expand related follow-up questions is a form UX pattern useful in any multi-step form, not only government services. The exclusive "none of the above" option is similarly generalizable to any "select all that apply or none" scenario.

Base Web's toggle-as-checkbox-variant is architecturally interesting — it treats toggle and checkbox as semantically equivalent binary inputs with different visual representations, managed through a single component with a `checkmarkType` prop. Most other systems implement Toggle/Switch as a separate component. Base Web's unified approach has merit for state management consistency but makes visual differentiation depend entirely on props.

## A11y Consensus

- `aria-checked="mixed"` is the universal standard for the indeterminate state — all systems implementing indeterminate use this ARIA attribute value.
- Checkboxes must always have an associated label; GOV.UK, Gestalt, and Mantine enforce this explicitly (required prop or mandatory label slot); Orbit includes `label` in its required props.
- When multiple checkboxes are grouped (a multi-select filter), the group requires a `<fieldset>` + `<legend>` structure (or equivalent ARIA grouping) to provide context — GOV.UK and Mantine's Checkbox.Group implement this correctly.
- `aria-invalid` or `aria-errormessage` must be applied when a required checkbox is not checked on form submission — Orbit and Evergreen both support this via error props.
- Visually hidden labels (Gestalt's `labelDisplay="hidden"`) are valid for table checkboxes but the accessible name must still be meaningful (row identifier, not "select").

## Recommended Use

Reference T3 checkbox approaches when deciding on indeterminate API design (Fluent 2's ARIA-mirroring `"mixed"` string is the most spec-aligned), card-style checkbox patterns (Mantine's `Checkbox.Card`), and conditional reveal patterns (GOV.UK). Nord is the reference for clear visual state requirements in high-stakes form contexts.
