---
system: Playbook (Power Home Remodeling)
component: Checkbox
url: https://playbook.powerapp.cloud/kits/checkbox
last_verified: 2026-03-28
confidence: medium
---

# Checkbox

## Approach
Playbook's Checkbox is used in CRM forms for feature selection, task completion tracking, and permission settings. Dual React/Rails support is present. Standard checkbox with group support for related option sets in forms.

## Key Decisions
1. **CRM form integration** (HIGH) — Checkbox designed for task tracking and feature selection in CRM workflows.
2. **Dual React/Rails** (HIGH) — Consistent implementation across frameworks.
3. **Group support** (MEDIUM) — CheckboxGroup or similar for related option sets.

## Notable Props
- `checked`: Controlled state
- `onChange`: Change callback
- `label`: Checkbox label
- `indeterminate`: Partial state support

## A11y Highlights
- **Keyboard**: Space toggles; Tab focus
- **Screen reader**: Checked state announced; label associated
- **ARIA**: aria-checked; label association

## Strengths & Gaps
- **Best at**: CRM task and permission checkboxes; dual framework
- **Missing**: Medium confidence; some details uncertain
