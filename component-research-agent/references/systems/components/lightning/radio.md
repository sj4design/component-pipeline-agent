---
system: Salesforce Lightning Design System
component: Radio Group
url: https://lightningdesignsystem.com/components/radio-group/
last_verified: 2026-03-28
confidence: high
---

# Radio Group

## Approach
Lightning provides standard Radio Group and Radio Button Group (button-styled). Lightning's radio button group is widely used in CRM for selecting record types, filter modes, and layout options. The system also provides a Visual Picker variant — a larger card-style radio selection for onboarding flows and setup wizards where options need icons and descriptions, not just text labels.

## Key Decisions
1. **Visual Picker variant** (HIGH) — Card-style radio selection with icon and description text, used in Salesforce setup wizards and onboarding where options need visual differentiation beyond a text label (e.g., choosing CRM edition features).
2. **Radio Button Group** (HIGH) — Button-styled radio group (segmented control-like) for compact mutually exclusive selection in record action bars and filter panels.
3. **Fieldset semantics** (HIGH) — Correct fieldset/legend grouping for all radio variants, consistent with Lightning's form accessibility standards.

## Notable Props
- `options`: Array of {value, label} for radio group
- `value`: Controlled selection
- `onChange`: Selection callback
- `required`: Required indicator
- `disabled`: Entire group or per-option disabled

## A11y Highlights
- **Keyboard**: Arrow keys within group; Tab exits
- **Screen reader**: Option + group label announced; checked state
- **ARIA**: fieldset/legend; role="radio"; aria-checked; roving tabindex

## Strengths & Gaps
- **Best at**: Visual Picker for rich onboarding selection; button group for compact UI; comprehensive variants
- **Missing**: No further icon customization on standard radio
