---
system: Radix UI (WorkOS)
component: TextField (via Radix Themes)
url: https://www.radix-ui.com/themes/docs/components/text-field
last_verified: 2026-03-28
confidence: high
---

# TextField

## Approach
Radix Themes (the styled layer above primitives) provides a TextField component. At the primitives level, Radix does not have a form input primitive beyond using native HTML inputs with slot composition. The Radix Themes TextField provides styled input variants, size control, and optional icon slots. It wraps a native `<input>` element with Radix's token system. For complex form management, Radix recommends pairing with a form library like React Hook Form.

## Key Decisions
1. **Slot-based icon/addon rendering** (HIGH) — TextField.Slot allows placing icons, buttons, or addons at either end of the input inside the input border. This pattern avoids the complexity of separate prefix/suffix props and handles any content type without an explicit icon prop.
2. **variant and radius** (MEDIUM) — `variant` controls fill style (surface, classic, soft) and `radius` controls the border radius override. These align with Radix Themes' overall token architecture.
3. **Native input wrapping** (HIGH) — The component wraps a native input, preserving all native input behaviors (form submission, autofill, IME) while adding the design system styling layer.

## Notable Props
- `size`: `"1" | "2" | "3"` — density control
- `variant`: `"surface" | "classic" | "soft"`
- `radius`: border radius override
- `color`: accent color
- `TextField.Slot`: for icons, buttons, or addons

## A11y Highlights
- **Keyboard**: Native input behavior; no custom keyboard handling needed
- **Screen reader**: Native input semantics; label must be provided by consumer via `<label>` or `aria-label`
- **ARIA**: Consumer responsible for `aria-describedby` for error messages; Radix provides the input wrapper only

## Strengths & Gaps
- **Best at**: Slot pattern for flexible addons; variant system; native input behavior preservation
- **Missing**: No built-in label, error, or helper text — must be composed by consumer; no form validation integration
