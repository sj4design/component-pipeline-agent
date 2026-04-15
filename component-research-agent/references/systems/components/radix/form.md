---
system: Radix UI (WorkOS)
component: Form (Radix Form primitive)
url: https://www.radix-ui.com/primitives/docs/components/form
last_verified: 2026-03-28
confidence: high
---

# Form

## Approach
Radix Form is a form primitive that provides built-in client-side validation with accessible error messages. It wires up the relationship between form fields and validation messages automatically, handling the aria-describedby connection between inputs and error messages. This is specifically designed to solve the problem of custom validation UIs that break accessibility because they don't properly link inputs to their error messages.

## Key Decisions
1. **Built-in validation message ARIA wiring** (HIGH) — Form.Message automatically connects to the Form.Field via context, setting the correct `aria-describedby` on the input. This solves the most common form accessibility error without developer effort.
2. **Matches native validation** (HIGH) — Form integrates with the browser's native constraint validation API, so `required`, `minLength`, `pattern` etc. still work and Radix Form just provides the accessible error message display.
3. **Server-side error support** (MEDIUM) — `serverInvalid` prop on Form.Message enables displaying server-returned errors alongside client-side validation messages in the same accessible pattern.

## Notable Props
- Form.Field: `name` (field identifier)
- Form.Control: renders as the actual input element
- Form.Label: for the field
- Form.Message: `match` prop for which validation type to show
- Form.ValidityState: render prop providing validation state

## A11y Highlights
- **Keyboard**: Native form submission via Enter; standard input navigation
- **Screen reader**: Error messages automatically connected to inputs via aria-describedby; live region for real-time validation feedback
- **ARIA**: Correct aria-invalid, aria-describedby wiring without manual ARIA management

## Strengths & Gaps
- **Best at**: Automatic ARIA wiring for validation messages; native validation integration; serverInvalid support
- **Missing**: No form layout; no multi-step form management; no custom validation logic beyond browser constraint API
