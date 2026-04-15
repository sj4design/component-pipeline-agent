---
system: Chakra UI
component: Form
url: https://chakra-ui.com/docs/components/form-control
last_verified: 2026-03-28
confidence: high
---

# Form / FormControl

## Approach
Chakra UI uses FormControl as the primary form field wrapper (not a full form component). FormControl provides context for label association, required indicators, helper text, and error messages. It wraps a single field with FormLabel, FormHelperText, and FormErrorMessage. For full forms, Chakra recommends pairing with react-hook-form or similar.

## Key Decisions
1. **isInvalid drives error display** (HIGH) — `<FormControl isInvalid>` shows FormErrorMessage and applies error styling to the child input. This single prop toggle prevents manually managing error class application on multiple elements.
2. **isRequired adds visual and semantic indicators** (HIGH) — `isRequired` adds an asterisk to FormLabel and sets `aria-required` on the child input automatically via context, ensuring both visual and accessible required field marking.
3. **FormErrorMessage and FormHelperText are mutually exclusive in display** (MEDIUM) — When `isInvalid` is true, FormHelperText is hidden and FormErrorMessage is shown. This prevents both messages appearing simultaneously, which confuses users.

## Notable Props
- `isInvalid`: triggers error state across all child components
- `isRequired`: required indicator + aria-required
- `isDisabled`: disables child inputs
- `isReadOnly`: readonly state propagation
- `FormLabel`: associated label with auto htmlFor
- `FormErrorMessage`: error text (shown when isInvalid)
- `FormHelperText`: helper text (hidden when isInvalid)

## A11y Highlights
- **Keyboard**: Standard form field navigation
- **Screen reader**: FormLabel auto-associates with child input via id/htmlFor; FormErrorMessage linked via aria-describedby; aria-required from isRequired
- **ARIA**: aria-invalid, aria-describedby, aria-required propagated automatically to child inputs

## Strengths & Gaps
- **Best at**: Automatic ARIA propagation; isInvalid/isRequired context; error/helper message management
- **Missing**: No full form submission handling; no field-level validation built-in; no form-level error summary
