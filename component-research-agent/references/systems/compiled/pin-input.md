---
component: pin-input
compiled: 2026-03-31
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Absent — no OTP/PIN input component
**Approach:** M3 has no dedicated PIN input, OTP input, or segmented code entry component. The closest pattern is a row of individual `TextField` components styled as single-character inputs. M3's TextField documentation does not address the segmented input pattern, auto-advance focus, or one-time-code autocomplete. Teams implement this pattern ad hoc using individual TextFields with custom focus management.
**Key Decisions:**
- [HIGH] Absent: no segmented input or verification code component exists in M3's component library — teams must compose from individual TextFields
- [MED] No guidance on `autocomplete="one-time-code"`: the WebOTP API pattern for auto-filling SMS verification codes is not addressed
- [MED] No focus management spec: auto-advancing focus from one input to the next on character entry is left entirely to implementation
**Notable API:** No component. Individual `TextField` with `maxLength=1` composed in a row.
**A11y:** No M3-specific guidance. Native `<input>` semantics apply. No documented pattern for labeling a group of single-character inputs as a unified code entry field.
**Best at:** Nothing specific — no component exists.
**Missing:** Entire PIN/OTP input component: segmented input fields, auto-focus advance, paste support, masked mode, auto-submit on complete, `autocomplete="one-time-code"` integration.

---

## spectrum
**Component:** Absent — no PIN/OTP input component
**Approach:** Spectrum does not include a PIN input, OTP input, or segmented code entry component. The system's TextField is designed for general text entry and does not support segmented single-character inputs with auto-advance focus. Adobe's product suite (Creative Cloud, Document Cloud) uses verification codes during authentication, but the pattern is not part of the public design system.
**Key Decisions:**
- [HIGH] Absent: no segmented code entry component in Spectrum's component library
- [MED] No composed pattern documented: unlike NumberField which uses React Aria's useNumberField, there is no useOTPField or usePinInput hook in React Aria
**Notable API:** No component. No React Aria hook for this pattern.
**A11y:** No guidance. The segmented input pattern would need custom ARIA: `role="group"` with `aria-label` for the code entry group, individual inputs with `aria-label` for position (e.g., "Digit 1 of 6").
**Best at:** Nothing — component does not exist in Spectrum.
**Missing:** Entire PIN/OTP component, React Aria primitive hook, paste distribution across fields, masked mode, auto-submit callback.

---

## carbon
**Component:** Absent — no PIN/OTP input component
**Approach:** Carbon does not include a dedicated PIN input or OTP verification component. IBM's enterprise product suite handles multi-factor authentication at the platform level (IBM Security Verify), and the verification code UI is not abstracted into the design system. Teams needing this pattern compose it from individual TextInput components with custom JavaScript for focus management and paste handling.
**Key Decisions:**
- [HIGH] Absent: no PIN/OTP input in Carbon's component set — not on the published roadmap
- [MED] Enterprise MFA handled externally: IBM Security Verify provides its own UI for verification codes, reducing demand for a DS-level component
**Notable API:** No component. `TextInput` with `maxLength={1}` composed manually.
**A11y:** No specific guidance. Carbon's general form accessibility patterns (label association, error states via `aria-describedby`) would apply to a composed solution.
**Best at:** Nothing — component does not exist.
**Missing:** Entire PIN/OTP component with segmented inputs, auto-advance, paste support, and masked mode.

---

## polaris
**Component:** Absent — no PIN/OTP input component
**Approach:** Polaris does not include a PIN input or OTP verification component. Shopify's merchant authentication uses verification codes, but the pattern lives in the authentication platform (Shopify Identity), not in Polaris. The `TextField` component with `maxLength` could be composed into a PIN input, but no guidance or pattern exists.
**Key Decisions:**
- [HIGH] Absent: no PIN/OTP component — Shopify's auth verification UI is outside Polaris scope
- [MED] No composed pattern: no documented recipe for combining multiple TextFields into a code entry pattern
**Notable API:** No component.
**A11y:** No guidance for this pattern.
**Best at:** Nothing — component does not exist.
**Missing:** Entire PIN/OTP component. Shopify merchants entering verification codes during 2FA setup have no Polaris-native pattern.

---

## atlassian
**Component:** Absent — no PIN/OTP input component
**Approach:** Atlassian does not include a PIN input or OTP component in its design system. Atlassian's two-factor authentication (for Jira, Confluence, Bitbucket) uses verification codes, but the entry UI is implemented in the Atlassian Account authentication service, not exposed as a reusable design system component. No Atlaskit package exists for this pattern.
**Key Decisions:**
- [HIGH] Absent: no PIN/OTP component in Atlassian Design System or Atlaskit
- [MED] Auth-level pattern: verification code entry is handled by Atlassian Account, outside DS scope
**Notable API:** No component.
**A11y:** No guidance specific to segmented code entry.
**Best at:** Nothing — component does not exist.
**Missing:** Entire PIN/OTP component with segmented input, auto-advance, paste handling, and one-time-code autocomplete.

---

## ant-design
**Component:** Input.OTP (added in Ant Design v5.16.0)
**Approach:** Ant Design added `Input.OTP` as a first-class component for verification code entry. It renders a configurable number of segmented input cells (`length` prop, default 6). Supports numeric-only (`type="number"` renders numeric keyboard on mobile) or alphanumeric input. Built-in auto-focus advance: typing a character automatically moves focus to the next cell. Full paste support: pasting a complete code distributes characters across all cells. `onChange` fires with the complete string value when all cells are filled. `formatter` prop allows transforming input (e.g., uppercase). `variant` supports "outlined", "filled", and "borderless" to match other Ant form controls.
**Key Decisions:**
- [HIGH] `length` prop for configurable digit count: default 6, supports 4-8 for different verification code lengths — the primary structural prop
- [HIGH] Auto-focus advance + paste distribution: typing advances focus automatically; pasting a full code fills all cells — both are mandatory UX behaviors for OTP entry
- [MED] `formatter` for input transformation: `(value) => value.toUpperCase()` converts input to uppercase for alphanumeric codes — simple but covers the main formatting need
- [MED] `mask` prop (v5.17+): renders dots/bullets instead of characters for sensitive code entry — mirrors password masking behavior
**Notable API:** `length: number` (default 6); `onChange: (value: string) => void`; `formatter: (value: string) => string`; `type: "number" | "text"`; `mask: boolean | string`; `variant: "outlined" | "filled" | "borderless"`; `size: "small" | "middle" | "large"`; `disabled: boolean`; `status: "error" | "warning"`
**A11y:** Each cell is an `<input>` with `aria-label` indicating position. The group has a wrapping element. `autocomplete="one-time-code"` is supported for WebOTP auto-fill from SMS. Keyboard: Backspace moves focus to previous cell and clears; Arrow keys navigate between cells.
**Best at:** First-class OTP component in a major Tier 1 system with `length`, `mask`, `formatter`, paste support, and auto-focus advance — the most complete PIN input in Tier 1 because it is the only one that exists.
**Missing:** Auto-submit callback (`onComplete` that fires only when all cells are filled, distinct from `onChange`); separator/grouping support (e.g., "123-456" with a visual dash after the 3rd digit); `autoFocus` on mount for immediate entry; timer/resend integration.