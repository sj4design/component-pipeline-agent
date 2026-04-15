---
system: GOV.UK Design System
component: Checkboxes
url: https://design-system.service.gov.uk/components/checkboxes/
last_verified: 2026-03-28
confidence: high
---

# Checkboxes

## Approach
GOV.UK Checkboxes are designed for government forms where users select from a list of options. They are larger than typical checkbox implementations (44px touch targets), use the classic checkbox appearance (not custom styled), and include extensive guidance on when to use checkboxes vs radios. GOV.UK's checkboxes support hint text per option, exclusive "None of the above" options with conditional reveal, and small checkboxes for non-form contexts like table filters.

## Key Decisions
1. **Large touch targets** (HIGH) — GOV.UK checkboxes use a larger checkbox and a full-width clickable label area. The click target includes the entire label row, not just the checkbox box. This is critical for users with motor impairments and older users with less precise cursor control.
2. **Conditional reveal per checkbox** (HIGH) — A checkbox can expand a hidden section when checked (for follow-up questions). This pattern is built into the component with JavaScript and is a signature GOV.UK pattern for progressive disclosure in forms.
3. **"None of the above" exclusive option** (HIGH) — The `exclusive` attribute on a checkbox item makes it mutually exclusive with all other options in the group — checking it unchecks all others, and checking any other unchecks it. This handles the common "select all that apply, or none" government form pattern.

## Notable Props
- `items[].text`: label text
- `items[].hint.text`: per-option hint
- `items[].exclusive`: makes option exclusive with others
- `items[].conditional.html`: content revealed when checked
- `small`: smaller checkbox variant for filters/settings

## A11y Highlights
- **Keyboard**: Space toggles; Tab moves between options; native fieldset/legend structure
- **Screen reader**: `<fieldset>` and `<legend>` group labels; each checkbox has its own `<label>`; hint text associated via `aria-describedby`
- **ARIA**: `aria-controls` on exclusive checkboxes; conditional reveal sections use `aria-expanded`

## Strengths & Gaps
- **Best at**: Large touch targets; conditional reveal; exclusive "none" option; fieldset/legend grouping
- **Missing**: No indeterminate state guidance; no checkbox tree/hierarchy pattern; small size only for compact contexts
