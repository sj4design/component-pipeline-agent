---
component: Pin Input
tier: 2
last_verified: 2026-03-31
---

# Pin Input — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Not available | No dedicated PIN/OTP component; compose from individual Input elements with custom focus logic | high |
| Salesforce Lightning | Not available | No dedicated OTP component; Lightning Input with type="text" and maxlength=1 composed in a row; platform-level MFA handled by Salesforce Identity | high |
| GitHub Primer | Not available | No PIN input component; GitHub's 2FA verification code entry is implemented in the authentication service (github.com/sessions), not in Primer | high |
| shadcn/ui | InputOTP | Dedicated OTP component built on input-otp library (by @guilherme_rodz); pattern-based validation (digits only, alphanumeric); slot-based rendering with InputOTPGroup and InputOTPSlot; separator support via InputOTPSeparator; single hidden input for form submission | high |
| Playbook | Not available | No PIN/OTP component; not a common pattern in eBay's merchant/buyer flows | medium |
| REI Cedar | Not available | No PIN/OTP component; outdoor retail context rarely requires verification code entry | low |
| Wise Design | Not available | No dedicated PIN/OTP component publicly documented; Wise's transfer verification likely uses internal auth components | low |
| Dell Design System | Not available | No publicly documented PIN/OTP component; enterprise MFA handled at platform level | low |

## Key Decision Patterns

**Extreme scarcity across Tier 2:** Only shadcn/ui offers a dedicated PIN/OTP input component. The remaining 7 systems either lack the pattern entirely or handle verification code entry in platform-level authentication services outside the design system scope. This confirms the Tier 1 finding: PIN input is a specialized component that most design systems have not yet abstracted.

**shadcn/ui InputOTP as reference implementation:** shadcn/ui's InputOTP is built on the `input-otp` library, which uses a single hidden `<input>` element with a visual overlay of slot cells. This architectural choice solves the hardest problems of the composed-individual-inputs approach: paste handling works natively (single input receives the full paste), form submission works natively (single input has the complete value), and `autocomplete="one-time-code"` works correctly (browser autofill targets one input, not six). The visual slots are rendered via `InputOTPSlot` components that read their character from the hidden input's value by index.

**Pattern-based validation:** shadcn/ui uses `pattern` prop with regex (e.g., `REGEXP_ONLY_DIGITS` for numeric-only, `REGEXP_ONLY_CHARS` for letters-only) to restrict input at the component level rather than relying on `type="number"` or `inputMode`. This avoids the `type="number"` problems documented in the number-input digests while still constraining input.

**Separator/grouping support:** shadcn/ui's `InputOTPSeparator` component renders a visual separator (typically a dash or dot) between groups of slots (e.g., 3-3 grouping for a 6-digit code). This is a visual-only affordance that improves readability of longer codes — notably absent from Ant Design's Input.OTP.

## A11y Consensus
- Single hidden input with `autocomplete="one-time-code"` is the preferred architecture for WebOTP API compatibility and SMS auto-fill
- `aria-label` on the input describing the purpose (e.g., "Verification code") since individual slots are visual-only
- Keyboard: typing advances through slots; Backspace clears current and moves to previous; Arrow keys navigate; paste fills all slots
- Error state: `aria-invalid` and `aria-describedby` for error messages (e.g., "Incorrect code")
- The single-hidden-input approach (shadcn/ui) has inherently better accessibility than composed-individual-inputs because screen readers interact with one input, not six

## Recommended Use
Reference shadcn/ui InputOTP for the single-hidden-input architecture with visual slot rendering, pattern-based validation, and separator support. This is the most robust implementation in Tier 2 and addresses the architectural problems (paste, autofill, form submission) that composed-individual-inputs approaches struggle with.