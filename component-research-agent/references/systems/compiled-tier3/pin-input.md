---
component: Pin Input
tier: 3
last_verified: 2026-03-31
---

# Pin Input — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Not available | No PIN/OTP primitive; would need to be composed from individual inputs or use a third-party library with Radix styling | high |
| Chakra UI | PinInput | Compound component (PinInput + PinInputField); configurable `length` via number of PinInputField children; `type="number"` or `type="alphanumeric"`; `otp` prop adds `autocomplete="one-time-code"`; `manageFocus` auto-advances on entry; `onComplete` callback when all fields filled; `mask` for password-style display; `placeholder` per field | high |
| GOV.UK | Not available — single text input recommended | GOV.UK explicitly recommends a single text input for security codes, NOT segmented inputs. Research found segmented inputs cause usability problems: users confused about which box to type in, difficulty correcting errors, and problems with paste. The recommended pattern is one `<input>` with `inputmode="numeric"` and `autocomplete="one-time-code"` | high |
| Base Web | Not available — native composition | No dedicated component; PIN/OTP pattern composed from Input components; Uber's rider/driver verification uses platform-level auth | high |
| Fluent 2 | Not available | No PIN/OTP component in Fluent 2; Microsoft Authenticator handles verification codes in its own UI outside the design system | high |
| Gestalt | Not available | No PIN/OTP component; Pinterest's authentication verification is handled outside Gestalt | high |
| Mantine | PinInput | Dedicated component; `length` prop (default 4); `type="number"` or `type="alphanumeric"` or regex pattern; `oneTimeCode` prop for `autocomplete="one-time-code"`; `mask` for password display; `onComplete` callback; `placeholder`; integrates with Mantine form via `{...form.getInputProps('pin')}`; `readOnly` and `disabled` states; gap between cells configurable via `gap` prop | high |
| Orbit | Not available | No PIN/OTP component; Kiwi.com verification handled in auth flows outside the DS | high |
| Evergreen | Not available | No PIN/OTP component; Segment's authentication is platform-level | high |
| Nord | Not available | No PIN/OTP component; Nordhealth's clinical context does not commonly require OTP entry in the patient-facing product | high |

## Key Decision Patterns

The T3 set has only two dedicated PIN input components (Chakra UI PinInput and Mantine PinInput), plus GOV.UK's explicit anti-pattern recommendation against segmented inputs. This three-way split — compound segmented component (Chakra), single-component segmented (Mantine), and single-text-input recommendation (GOV.UK) — represents the three fundamental architectural positions on verification code entry.

**Chakra UI's compound architecture** (PinInput + PinInputField children) gives maximum layout control: each PinInputField is a real `<input>` element, and the number of fields is determined by how many PinInputField children are rendered, not by a `length` prop. This means developers can insert arbitrary elements between fields (separators, grouping wrappers) without the component needing explicit separator support. The `manageFocus` prop (default true) handles auto-advance; setting it to false allows manual focus control. The `onComplete` callback fires only when all fields have values — distinct from `onChange` which fires on every keystroke. The `otp` boolean prop adds `autocomplete="one-time-code"` to all fields.

**Mantine's single-component architecture** uses a `length` prop to render the correct number of internal input cells. This is simpler to use (one component, one prop) but less flexible for custom layouts. Mantine adds `gap` as a styling prop for spacing between cells and supports regex patterns via the `type` prop for custom character restrictions beyond digits/alphanumeric. The `oneTimeCode` prop mirrors Chakra's `otp` prop. Mantine's `onComplete` matches Chakra's — fires when all cells are filled.

**GOV.UK's anti-pattern position** is backed by user research: segmented inputs caused confusion about which box to type in, made error correction difficult (users had to click into specific boxes), and broke paste workflows in testing. GOV.UK's recommendation is a single `<input>` with `inputmode="numeric"`, `autocomplete="one-time-code"`, and a `maxlength` matching the code length. This position is the strongest usability argument against the segmented pattern, though it sacrifices the visual affordance that communicates "enter exactly N digits here."

**The `onComplete` callback pattern** (present in both Chakra and Mantine) is architecturally significant: it enables auto-submit after the last character is entered, eliminating the need for a submit button in verification flows. This reduces the interaction to: receive code -> type/paste code -> automatic verification. Neither Ant Design's Input.OTP (Tier 1) nor shadcn/ui's InputOTP (Tier 2) expose an `onComplete` distinct from `onChange`.

**Mask/password mode** is consistent across Chakra (`mask`) and Mantine (`mask`): renders dots or bullets instead of the entered characters. This is used for sensitive PIN entry (bank PINs, device unlock codes) where the entered value should not be visible on screen. Both default to showing characters.

## A11y Consensus

- `autocomplete="one-time-code"` is the critical attribute for WebOTP API integration — enables browsers to auto-fill SMS verification codes; both Chakra (`otp` prop) and Mantine (`oneTimeCode` prop) support this
- Segmented inputs: each cell needs `aria-label` with position context (e.g., "Pin code digit 1 of 6"); the group needs `role="group"` with an accessible label
- GOV.UK's single-input approach has inherently simpler accessibility: one label, one input, standard text input interaction — no focus management complexity
- Keyboard contract for segmented inputs: character entry auto-advances focus; Backspace clears current cell and moves focus to previous; Arrow Left/Right navigate between cells; paste fills all cells from current position
- Error state: `aria-invalid` on the group or individual cells; error message linked via `aria-describedby`
- Screen reader announcement: segmented approach requires careful implementation to avoid announcing each cell entry as a separate form field interaction

## Recommended Use

Reference Chakra UI PinInput for the compound component architecture with `onComplete`, `manageFocus`, and `otp` props — the most flexible implementation for custom layouts. Reference Mantine PinInput for the simpler single-component API with `length`, `gap`, and regex-based type validation. Reference GOV.UK's single-input recommendation when accessibility simplicity and user research evidence outweigh the visual affordance of segmented cells. The `onComplete` callback pattern (Chakra, Mantine) is a key differentiator for auto-submit verification flows.