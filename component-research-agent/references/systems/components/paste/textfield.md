---
system: Twilio Paste
component: Input (Text Field)
url: https://paste.twilio.design/components/input
last_verified: 2026-03-28
confidence: high
---

# Input (Text Field)

## Approach
Twilio Paste's Input is a native text input wrapped in Paste's form field system. Always composed with Label, HelpText, and ErrorText using the FormField pattern. Paste provides separate Input, TextArea, and specialized inputs (like PasswordInput with show/hide toggle). The system emphasizes correct form accessibility patterns through composition rather than a monolithic form field component. Input supports prefix/suffix content (icons, text, dropdowns) via InputElement pattern.

## Key Decisions
1. **Prefix/suffix via InputElement** (HIGH) — Prefix and suffix content (icons, currency indicators, action buttons) are composed using Box/InputElement wrappers rather than separate props, enabling arbitrary content alongside the input without complex prop APIs.
2. **FormField composition mandatory** (HIGH) — Input is never used standalone — always with Label at minimum — enforcing accessible form patterns across all Twilio console inputs.
3. **Character count variant** (MEDIUM) — Built-in character count display with HelpText below the input, used for SMS-length-aware inputs (critical for Twilio's SMS products where character limits matter).

## Notable Props
- `type`: All HTML input types supported
- `hasError`: Error state styling with aria-describedby wiring
- `readOnly`: Read-only state with visual treatment
- `insertBefore` / `insertAfter`: Prefix/suffix content slots
- `disabled`: Disabled state

## A11y Highlights
- **Keyboard**: Native input keyboard behavior; Tab to focus; standard text editing
- **Screen reader**: Label via htmlFor/id; error text and help text via aria-describedby
- **ARIA**: aria-required; aria-invalid for error state; aria-describedby for help/error text

## Strengths & Gaps
- **Best at**: Character count for SMS inputs; flexible prefix/suffix composition; enforced accessible form patterns
- **Missing**: No built-in input masking; no floating label variant
