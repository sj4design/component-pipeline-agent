---
system: Fluent 2 (Microsoft)
component: Radio / RadioGroup
url: https://fluent2.microsoft.design/components/web/react/radiogroup/usage
last_verified: 2026-03-28
confidence: high
---

# Radio / RadioGroup

## Approach
Fluent 2's RadioGroup and Radio components follow the same pattern as other Fluent form components: RadioGroup as the context provider and layout container, Radio as individual items. The component uses Fluent's layout tokens and supports both horizontal and vertical orientations. In Microsoft's products (Azure VM size selection, Teams notification settings), radio groups are used for mutually exclusive configuration options.

## Key Decisions
1. **layout prop** (MEDIUM) — `layout="horizontal"` or `"vertical"` controls the arrangement of radio items. Horizontal is used for short options (Yes/No, 3 sizes); vertical for longer option labels.
2. **Field wrapper integration** (HIGH) — Like other Fluent form inputs, RadioGroup integrates with the Field component for label, hint, and validation message. This provides consistent form field structure across all Fluent input types.
3. **disabled per item or whole group** (MEDIUM) — Individual radios can be disabled (unavailable options) or the entire group can be disabled (read-only state). Both patterns are common in enterprise configuration UIs.

## Notable Props
- `value` / `onChange`: controlled selection
- `layout`: `"horizontal" | "vertical"` (default: vertical)
- `disabled`: disables entire group
- `name`: form field name
- Radio: `value`, `disabled`, `label`

## A11y Highlights
- **Keyboard**: Arrow keys navigate within group (roving tabindex); Tab enters/exits
- **Screen reader**: role="radiogroup" on group; role="radio" per item; aria-checked; label from Field
- **ARIA**: Full radio group ARIA; Field wrapper provides group label via aria-labelledby

## Strengths & Gaps
- **Best at**: Field integration for group labels; layout control; enterprise configuration patterns
- **Missing**: No description per radio item; no radio card pattern in core
