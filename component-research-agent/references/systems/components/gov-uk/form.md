---
system: GOV.UK Design System
component: Form / Error Summary
url: https://design-system.service.gov.uk/components/error-summary/
last_verified: 2026-03-28
confidence: high
---

# Form / Error Summary

## Approach
GOV.UK does not have a single "Form" component but provides a comprehensive form pattern with Error Summary, individual field components, and strict guidance on form structure. The Error Summary component is a key form-level pattern: it appears at the top of the page when validation fails, listing all errors with anchor links to the corresponding fields. GOV.UK's "one thing per page" principle means most forms consist of a single question per page.

## Key Decisions
1. **Error Summary at top of page** (HIGH) — When a form page has validation errors, an Error Summary appears at the top of the `<main>` content area with links to each errored field. This is a researched pattern proven to help users find and fix errors, especially for screen reader users who encounter errors before navigating to fields.
2. **One thing per page** (HIGH) — GOV.UK's most important form guidance: each page asks one question or presents one decision. This reduces cognitive load and allows targeted error handling. Complex multi-field forms are split into wizard-style flows.
3. **Error message directly under label** (MEDIUM) — Field-level error messages appear between the label and the input (not below the input), following research showing this placement is more likely to be noticed and read before the user interacts with the field.

## Notable Props
- Error Summary: `titleText`, `errorList` (array of `{ text, href }`), `disableAutoFocus`
- Field-level: `errorMessage: { text }` on each input component
- `formGroup` wrapper classes for group states

## A11y Highlights
- **Keyboard**: Error Summary links jump to errored fields; Tab moves through error links
- **Screen reader**: Error Summary auto-focused on page load so errors are announced immediately; each field's error linked via aria-describedby
- **ARIA**: aria-describedby links field to error message; Error Summary gets focus on submission failure

## Strengths & Gaps
- **Best at**: Error Summary with field links; error message placement; one-thing-per-page pattern; extensive research backing
- **Missing**: No client-side validation framework; no inline real-time validation guidance (intentionally avoided per GOV.UK research)
