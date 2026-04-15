---
system: Fluent 2 (Microsoft)
component: Input / Field
url: https://fluent2.microsoft.design/components/web/react/input/usage
last_verified: 2026-03-28
confidence: high
---

# Input / Field

## Approach
Fluent 2 separates the Input (the actual input element) from Field (the form field wrapper with label, hint, and validation message). This matches the architectural pattern where Input is the interactive element and Field provides the form context. The separation allows Input to be used without Field for simple cases, and Field to wrap any input component (Input, Combobox, Dropdown). Fluent 2's Input supports `contentBefore` and `contentAfter` slots for prefix/suffix content, consistent with Fluent's slot-based composition approach.

## Key Decisions
1. **Input + Field separation** (HIGH) — Splitting the input element from its form context wrapper reflects Fluent's composability philosophy. A Combobox, Dropdown, or custom input can all be wrapped in Field to get consistent label/validation/hint behavior without each component duplicating that logic.
2. **appearance prop** (HIGH) — `"outline"`, `"underline"`, `"filled-darker"`, `"filled-lighter"` — these appearances encode Fluent's surface contexts. Underline is for in-page inline editing; filled variants are for light/dark backgrounds in Teams and Office.
3. **contentBefore / contentAfter slots** (MEDIUM) — Generic content slots rather than specific `icon` or `prefix` props. These accept any ReactNode, consistent with Fluent's slot-based API approach.

## Notable Props
- `appearance`: `"outline" | "underline" | "filled-darker" | "filled-lighter"`
- `size`: `"small" | "medium" | "large"`
- `contentBefore` / `contentAfter`: prefix/suffix slots
- `disabled` / `readOnly`: state props
- Field: `label`, `hint`, `validationMessage`, `validationState`, `required`

## A11y Highlights
- **Keyboard**: Native input behavior
- **Screen reader**: Field manages aria-labelledby, aria-describedby connections; validationState announces error/warning/success
- **ARIA**: Field automatically connects label, hint, and validation message to the input via ARIA attributes

## Strengths & Gaps
- **Best at**: Input/Field separation for composition; appearance variants for Office surfaces; Field validation state management
- **Missing**: No character count built-in; no masked input variant
