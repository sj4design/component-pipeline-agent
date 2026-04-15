---
system: Gestalt (Pinterest)
component: RadioGroup
url: https://gestalt.pinterest.systems/web/radiogroup
last_verified: 2026-03-28
confidence: medium
---

# RadioGroup

## Approach
Gestalt provides a RadioGroup component for exclusive selection in Pinterest's advertising and settings forms. The component manages state for multiple radio buttons and provides consistent styling. It supports direction control and per-item sub-text for describing options in detail — important for advertising configuration where options need explanation.

## Key Decisions
1. **direction prop** (MEDIUM) — `"column"` (default) or `"row"` for orientation control.
2. **subtext per item** (HIGH) — Each radio item can have secondary descriptive text. In Pinterest's ad campaign creation, radio options like targeting strategies need explanation.
3. **Required label enforcement** (HIGH) — Same pattern as other Gestalt components: label is required for accessibility.

## Notable Props
- `id`: required
- `legend`: group label text
- `options[]`: `{ label, value, subtext?, disabled? }`
- `value` / `onChange`: controlled state
- `direction`: `"column" | "row"`

## A11y Highlights
- **Keyboard**: Arrow keys navigate; roving tabindex
- **Screen reader**: fieldset/legend pattern; each option has accessible label + subtext
- **ARIA**: Standard radiogroup ARIA

## Strengths & Gaps
- **Best at**: subtext per option; legend for group label; advertising configuration patterns
- **Missing**: No radio card variant; no conditional reveal
