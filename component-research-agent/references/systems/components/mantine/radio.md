---
system: Mantine
component: Radio / Radio.Group
url: https://mantine.dev/core/radio/
last_verified: 2026-03-28
confidence: high
---

# Radio / Radio.Group

## Approach
Mantine's Radio system provides Radio, Radio.Group, and Radio.Card (card-style radio). Radio.Group manages controlled state and layout orientation. Like Checkbox, the Radio component has a `description` prop for secondary text and a full size scale. The Radio.Card variant creates a full-card clickable radio option, identical to Checkbox.Card in concept.

## Key Decisions
1. **Radio.Card for settings panels** (HIGH) — Same as Checkbox.Card, creates a full-card radio option for configuration screens. Used when each option has descriptive content (plan selection, deployment region selection).
2. **description prop** (MEDIUM) — Secondary text below the label. Consistent with Mantine's TextInput description pattern across all form components.
3. **Radio.Group orientation** (MEDIUM) — Horizontal or vertical via layout Stack props. Uses Mantine's Stack/Group components internally.

## Notable Props
- `value` / `onChange`: controlled state on Radio.Group
- `defaultValue`: uncontrolled initial value
- Radio: `value`, `label`, `description`, `color`, `size`, `disabled`
- Radio.Card: full-card clickable area

## A11y Highlights
- **Keyboard**: Arrow keys navigate; roving tabindex in group
- **Screen reader**: radiogroup role; radio role; aria-checked; label and description associated
- **ARIA**: Standard radio group ARIA with description as aria-describedby

## Strengths & Gaps
- **Best at**: Radio.Card for settings; description per option; full size scale; consistent with Mantine form API
- **Missing**: No conditional reveal; no horizontal layout without composing with Stack
