---
system: Salesforce Lightning Design System
component: Select
url: https://lightningdesignsystem.com/components/select/
last_verified: 2026-03-28
confidence: high
---

# Select

## Approach
Lightning's Select wraps the native HTML select element with Lightning's form field styling for simpler, single-value selection scenarios. For more complex selection needs (searchable, multi-select, custom option rendering), Lightning's Combobox component is used instead. Lightning's Select is positioned as the simple use case, keeping the component lightweight while Combobox handles advanced scenarios.

## Key Decisions
1. **Native select for simplicity** (HIGH) — Select uses native HTML select, reserving the Combobox for custom/searchable scenarios, creating a clear decision tree for developers choosing between the two components.
2. **Form field integration** (HIGH) — Wraps in Lightning's form element structure with label, help text, and error message slots, consistent with all other Lightning form inputs.
3. **Required indicator** (MEDIUM) — Required fields show an asterisk indicator by default, consistent with Lightning's form conventions for CRM data entry.

## Notable Props
- `label`: Input label text
- `value`: Controlled selection value
- `options`: Array of {value, label} option objects
- `required`: Shows required asterisk and sets aria-required
- `disabled`: Disabled state
- `errorText`: Validation error message

## A11y Highlights
- **Keyboard**: Native browser select keyboard behavior
- **Screen reader**: Native select semantics; error text via aria-describedby
- **ARIA**: aria-required; aria-describedby for error text; native select roles

## Strengths & Gaps
- **Best at**: Simple single-value selection with Lightning form integration; clear distinction from Combobox for complex scenarios
- **Missing**: No custom option rendering; limited to native select appearance
