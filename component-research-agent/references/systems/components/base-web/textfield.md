---
system: Base Web (Uber)
component: Input
url: https://baseweb.design/components/input/
last_verified: 2026-03-28
confidence: medium
---

# Input

## Approach
Base Web's Input component is a styled input with the Overrides customization pattern. It provides single and multi-line input variants, prefix/suffix content (using the startEnhancer/endEnhancer pattern consistent with other Base Web components), and clear button support. The FormControl wrapper provides label, caption (helper text), and error message, mirroring the Field/InputGroup pattern seen in other systems.

## Key Decisions
1. **startEnhancer / endEnhancer** (HIGH) — Consistent with Base Web's Button, Select, and other components, the Input uses `startEnhancer` and `endEnhancer` for prefix/suffix content. These accept ReactNode (not just icons), enabling search icons, currency symbols, loading spinners, or action buttons.
2. **clearable prop** (MEDIUM) — Built-in clear button that appears when the input has content. This is a common UX pattern (search inputs, filter inputs) that Base Web provides natively rather than requiring consumer implementation.
3. **Overrides for full customization** (HIGH) — Root, Input, StartEnhancer, EndEnhancer, ClearIcon can all be replaced. This is the standard Base Web approach.

## Notable Props
- `value` / `onChange`: controlled state
- `startEnhancer` / `endEnhancer`: prefix/suffix content
- `clearable`: shows clear button
- `positive` / `error`: validation state styling
- `size`: `SIZE.mini | SIZE.compact | SIZE.default | SIZE.large`
- `overrides`: deep customization

## A11y Highlights
- **Keyboard**: Native input behavior; clear button is keyboard accessible
- **Screen reader**: Label via FormControl wrapper; error state announced
- **ARIA**: aria-invalid on error; aria-describedby for caption/error text

## Strengths & Gaps
- **Best at**: clearable prop; startEnhancer/endEnhancer flexibility; consistent enhancer API with other components
- **Missing**: No masked input; limited out-of-box styling compared to more opinionated systems
