---
system: GitHub Primer
component: TextInput
url: https://primer.style/components/text-input
last_verified: 2026-03-28
confidence: high
---

# TextInput

## Approach
GitHub Primer's TextInput is composed within FormControl for complete accessible form field patterns. The component supports leading and trailing visual elements (icons, text, select components) as first-class features, used throughout GitHub for URL inputs, search fields, and filtered inputs. Primer provides TextInputWithTokens for tag input patterns used in GitHub's label/assignee multi-select flows.

## Key Decisions
1. **leadingVisual / trailingVisual** (HIGH) — Icon or text adornments before/after the input as React component props, used for GitHub's search inputs (magnifier icon), URL fields (https:// prefix), and action buttons (copy button on token inputs).
2. **TextInputWithTokens variant** (HIGH) — Separate TextInputWithTokens component handles multi-value tag input with token (chip) display — used for label selection, assignee picking, and topic tagging throughout GitHub.
3. **Loading state** (MEDIUM) — Input supports a loading spinner state for async autocomplete operations (searching users/repos as you type).

## Notable Props
- `leadingVisual` / `trailingVisual`: Icon/text adornment components
- `loading`: Boolean for async loading spinner in input
- `size`: "small" | "medium" | "large"
- `contrast`: Boolean for elevated contrast on gray backgrounds
- `block`: Boolean for full-width display
- `validationStatus`: "error" | "success" | "warning"

## A11y Highlights
- **Keyboard**: Native input behavior; FormControl manages label association
- **Screen reader**: Label association via FormControl; error/success status via aria-describedby
- **ARIA**: aria-required; aria-invalid; aria-describedby for help text and validation messages

## Strengths & Gaps
- **Best at**: Token/tag input variant for multi-select flows; leading/trailing visual system; GitHub's specific use cases
- **Missing**: No floating label; no input masking; limited to GitHub's component ecosystem
