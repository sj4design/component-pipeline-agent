---
system: Evergreen (Segment)
component: TextInput / TextInputField
url: https://evergreen.segment.com/components/text-input
last_verified: 2026-03-28
confidence: medium
---

# TextInput / TextInputField

## Approach
Evergreen provides both TextInput (bare input element) and TextInputField (input with label, description, and validation message). The separation allows TextInput to be used inside custom form layouts while TextInputField covers the complete field pattern. This mirrors Fluent's Input/Field separation. Evergreen's inputs are styled for analytics dashboard aesthetics — clean borders, subtle focus rings, neutral color palette.

## Key Decisions
1. **TextInput + TextInputField separation** (HIGH) — Allows the bare input to be used in complex layouts (search bars, inline editing) while the full field is used in forms. Standard pattern that provides flexibility.
2. **appearance: default vs minimal** (MEDIUM) — `appearance="minimal"` renders a bottom-border-only input for inline editing contexts in Segment's dashboard (renaming sources, editing pipeline names).
3. **isInvalid** (MEDIUM) — Triggers error styling (red border) without requiring a separate error message. TextInputField accepts `validationMessage` for the full error pattern.

## Notable Props
- `value` / `onChange`: controlled state
- `appearance`: `"default" | "minimal"`
- `isInvalid`: error state styling
- `size`: `"small" | "medium" | "large"`
- TextInputField: `label`, `description`, `validationMessage`, `isRequired`

## A11y Highlights
- **Keyboard**: Native input behavior
- **Screen reader**: TextInputField manages label/description/error associations
- **ARIA**: aria-invalid; aria-describedby for description and error

## Strengths & Gaps
- **Best at**: minimal appearance for inline editing; TextInputField for complete form fields; clean B2B aesthetic
- **Missing**: No prefix/suffix addon system; no character count; no masked input
