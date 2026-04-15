---
system: Salesforce Lightning Design System
component: Form Layout
url: https://lightningdesignsystem.com/utilities/form-layout/
last_verified: 2026-03-28
confidence: high
---

# Form Layout

## Approach
Lightning provides both a Form component and a comprehensive form layout utility system. Lightning forms support single-column, two-column, and compound forms (horizontally grouped fields for address, date ranges, etc.). The record edit form pattern — where CRM record fields are displayed in a structured grid — is Lightning's primary form context, driving a very specific form layout system.

## Key Decisions
1. **Record edit form layout** (HIGH) — Lightning's form layout is optimized for Salesforce's "record edit" pattern where standard and custom fields are displayed in a responsive two-column grid that matches the record's page layout configuration.
2. **Compound form element** (HIGH) — Compound fields (two related inputs side by side, like First Name + Last Name, or Street + City) have a dedicated "compound" form element pattern with proper label management for the field pair.
3. **Form stacking: horizontal vs stacked labels** (MEDIUM) — Forms support horizontal labels (label left, input right — compact) and stacked labels (label above input — more spacious) via layout variant selection.

## Notable Props
- `layout`: "horizontal" | "stacked" | "compound"
- Form field grid control via utility classes
- `required`: Required field indicators
- `errorText`: Validation error messages per field

## A11y Highlights
- **Keyboard**: Tab between form fields; logical tab order in grid layout
- **Screen reader**: Fieldset/legend for compound fields; label association for all inputs; error messages via aria-describedby
- **ARIA**: Compound fields use fieldset/legend; all fields have label association; error text via aria-describedby

## Strengths & Gaps
- **Best at**: CRM record edit form layout; compound field patterns; horizontal/stacked label modes
- **Missing**: No built-in form validation library integration; form layout tightly coupled to LWC patterns
