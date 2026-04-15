---
component: Form
tier: 2
last_verified: 2026-03-28
---

# Form — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Form (via FormField wrappers) | FormField + FormLabel + FormHelpText + FormErrorMessage; no validation library | high |
| Salesforce Lightning | Form (via Lightning record form) | LightningRecordEditForm, LightningRecordForm for CRM record editing | high |
| GitHub Primer | FormControl | React context-based auto label/id wiring; FormControl.Label, Validation | high |
| shadcn/ui | Form | react-hook-form + Zod integration; FormField/FormItem/FormLabel/FormMessage | high |
| Playbook | Form | Multi-field data collection; dual React/Rails | medium |
| REI Cedar | CdrForm (not present as entity) | Form patterns via individual field components; WCAG 2.1 AA | medium |
| Wise Design | Form | Financial data entry forms; KYC and transfer forms | low |
| Dell Design System | Form | Enterprise IT configuration forms | low |

## Key Decision Patterns

**React Hook Form + Zod (shadcn/ui):** shadcn/ui's Form is the most opinionated — it tightly integrates react-hook-form for state management and Zod for schema validation. This is the current React ecosystem best practice for type-safe form validation. Error messages flow from Zod schema to FormMessage automatically.

**FormControl auto-wiring (Primer):** Primer's FormControl uses React context to automatically associate labels with form inputs without requiring manual htmlFor/id management — the label and input connect via context when nested inside FormControl. Reduces ID management overhead.

**Lightning Record Forms:** Lightning's primary form pattern is LightningRecordEditForm — a form bound directly to a Salesforce object type (Account, Opportunity) that auto-generates fields from the object schema. Not a generic form but a data-driven CRM form.

**Validation timing:** All systems support field-level validation (on blur) and form-level validation (on submit). shadcn/ui/react-hook-form supports all modes. Timing matters for UX — immediate validation can be frustrating; validate after first blur.

## A11y Consensus
- All form fields require a visible, associated label (htmlFor + id or wrapping label)
- Error messages: aria-describedby linking field to error text; aria-invalid="true" on field
- Required fields: aria-required="true" + required attribute; indicate required in label
- Form submit errors: inject error summary at top of form; move focus to summary
- Fieldset + legend for related field groups (checkbox groups, address fields)

## Recommended Use
Use shadcn/ui Form with react-hook-form + Zod for type-safe validated React forms. Use Primer FormControl for automatic label/id association. Use Lightning RecordEditForm for Salesforce CRM object forms. Always implement proper error linking with aria-describedby.
