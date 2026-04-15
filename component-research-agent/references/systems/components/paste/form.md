---
system: Twilio Paste
component: Form (FormGroup / FormSection)
url: https://paste.twilio.design/components/form
last_verified: 2026-03-28
confidence: high
---

# Form

## Approach
Twilio Paste's Form provides layout containers for organizing form fields — Form (HTML form element), FormGroup (groups related fields with a shared label), and FormSection (visually separates large forms into sections with headings). Paste doesn't wrap form validation — that's left to external libraries. The system focuses on form layout, accessible grouping, and visual organization.

## Key Decisions
1. **FormGroup for related field grouping** (HIGH) — FormGroup renders a fieldset with legend for groups of related inputs (address fields, date/time pairs), providing the correct semantic structure for associating grouped fields.
2. **FormSection for visual organization** (HIGH) — FormSection provides headings that divide long forms into scannable sections, improving usability for complex CRM configuration forms without affecting form semantics.
3. **External validation library agnostic** (MEDIUM) — Paste's form doesn't prescribe a validation library, keeping the form layout components compatible with react-hook-form, Formik, Yup, or native validation.

## Notable Props
- `FormGroup[groupLegend]`: The fieldset legend text for grouped fields
- `FormSection[sectionHeadingText]`: Section heading text
- Integrates with individual Paste form components (Input, Select, Checkbox, etc.)

## A11y Highlights
- **Keyboard**: Standard form keyboard behavior; Tab between fields
- **Screen reader**: FormGroup fieldset/legend provides group context; FormSection headings provide navigation landmarks
- **ARIA**: fieldset/legend via FormGroup; heading hierarchy via FormSection; individual field ARIA managed by each component

## Strengths & Gaps
- **Best at**: Semantic form grouping with fieldset; form section organization; composable with all Paste form components
- **Missing**: No built-in validation feedback coordination; no multi-step form state management
