---
system: Salesforce Lightning Design System
component: Checkbox
url: https://lightningdesignsystem.com/components/checkbox/
last_verified: 2026-03-28
confidence: high
---

# Checkbox

## Approach
Lightning provides multiple checkbox variants: standard checkbox, checkbox group (for sets of related choices), checkbox-button (styled as a button-like toggle), and checkbox-button-group (horizontal or vertical button group). This range addresses Lightning's diverse CRM use cases from simple boolean toggles to multi-option selection in filtered list views. The toggle/button variants are notable departures from the standard checkbox visual.

## Key Decisions
1. **Checkbox-button variant** (HIGH) — Button-styled checkbox provides a more prominent toggle option for scenarios where checkboxes need more visual weight, common in Lightning filter panels and action configuration.
2. **Checkbox group with fieldset** (HIGH) — Correct semantic fieldset/legend grouping for related checkbox sets, consistent with Lightning's form accessibility standards.
3. **Indeterminate for table select-all** (MEDIUM) — Indeterminate state supports the select-all pattern in Lightning's Data Table component where partial row selection is represented.

## Notable Props
- `variant`: "standard" | "button" — standard checkbox or button-styled variant
- `indeterminate`: Partial selection state
- `checked`: Controlled state
- `required`: Required field indicator
- `errorText`: Validation error

## A11y Highlights
- **Keyboard**: Space toggles; Tab to focus; button variant gets full button keyboard behavior
- **Screen reader**: Checked/unchecked announced; group label via fieldset/legend; indeterminate as aria-checked="mixed"
- **ARIA**: aria-checked; fieldset/legend; aria-required; aria-describedby for error

## Strengths & Gaps
- **Best at**: Button-styled checkbox variant; integration with Lightning Data Table select-all; comprehensive variants
- **Missing**: Limited visual customization of the check mark style
