---
component: pin-input
date: 2026-04-17
mode: --max
systems_count: 24
scope: all
---

# Pin Input — Research Synthesis (--max mode, all 24 systems)

## Sistemas sin componente dedicado

| System | Tier | Approach | Notes |
|--------|------|----------|-------|
| Material Design 3 | 1 | Individual TextField per digit, manual focus management | No guidance on auto-advance or one-time-code |
| Spectrum (Adobe) | 1 | No component, no React Aria hook | No usePinInput or useOTPField |
| Carbon (IBM) | 1 | TextInput maxLength=1 composed in row | Enterprise MFA handled by IBM Security Verify |
| Polaris (Shopify) | 1 | No component | Auth verification in Shopify Identity, not Polaris |
| Atlassian | 1 | No component, no Atlaskit package | 2FA handled by Atlassian Account service |
| Twilio Paste | 2 | Compose from individual Input elements | No guidance on focus management |
| Salesforce Lightning | 2 | Lightning Input type="text" maxlength=1 in row | Platform MFA via Salesforce Identity |
| GitHub Primer | 2 | No component | 2FA entry in github.com/sessions, not Primer |
| Playbook (eBay) | 2 | Not a common pattern in merchant/buyer flows | — |
| REI Cedar | 2 | No component | Retail context rarely needs verification codes |
| Wise Design | 2 | No public component | Transfer verification uses internal auth |
| Dell Design System | 2 | No component | Enterprise MFA at platform level |
| Radix UI | 3 | No primitive | Would compose from individual inputs or third-party lib |
| GOV.UK | 3 | Single text input recommended — ANTI-PATTERN ruling | User research: segmented inputs cause confusion |
| Base Web (Uber) | 3 | No component | Platform-level auth for rider/driver verification |
| Fluent 2 (Microsoft) | 3 | No component | Microsoft Authenticator has its own UI |
| Gestalt (Pinterest) | 3 | No component | Pinterest auth is platform-level |
| Orbit (Kiwi.com) | 3 | No component | Auth flows handled outside DS |
| Evergreen (Segment) | 3 | No component | Platform-level authentication |
| Nord (Nordhealth) | 3 | No component | Clinical context rarely requires OTP entry |

**Systems with dedicated component: Ant Design (T1), shadcn/ui (T2), Chakra UI (T3), Mantine (T3)** — 4 out of 24 systems.

---

## How Systems Solve It

### Ant Design (Tier 1) — `Input.OTP`

Added in Ant Design v5.16.0, `Input.OTP` is the first major design system to ship a production-ready OTP component. It renders a configurable number of segmented input cells via the `length` prop (default 6), supporting both numeric-only (triggers numeric keyboard on mobile with `type="number"`) and alphanumeric input. Auto-focus advance is mandatory behavior — typing a character automatically moves focus to the next cell, and pasting a complete code distributes characters across all cells. The `onChange` handler fires with the complete string value each keystroke, while Ant does not expose a separate `onComplete` for the filled state. A `formatter` prop allows transforming input inline (e.g., uppercase conversion for alphanumeric codes), and the `mask` prop (v5.17+) renders bullets instead of characters for sensitive PIN entry.

**Design Decisions:**
- **`length` as primary structural prop** — configurable digit count (default 6) supports 4-8 for different code lengths; the primary axis of component configuration. _Why:_ OTP codes vary by system (4-digit PIN vs. 6-digit TOTP vs. 8-digit backup code). _Impact:_ single prop controls the entire segmented layout. _Para tu caso:_ use 4 for short PINs, 6 for TOTP, 8 for backup codes.
- **Auto-focus advance + paste distribution both mandatory** — typing advances focus; pasting fills all cells. _Why:_ These two behaviors define the entire UX contract of OTP entry; without them, the component provides no value over a plain text input. _Impact:_ eliminates the most common implementation error (paste-breaking composed inputs). _Para tu caso:_ if auto-advance is undesirable (custom flow), this may be a constraint.
- **`formatter` for input transformation** — `(value) => value.toUpperCase()` for alphanumeric codes. _Why:_ server validation is case-insensitive for most OTP codes; transform at entry prevents case mismatch errors. _Impact:_ prevents user errors silently. _Para tu caso:_ use with alphanumeric license keys or backup codes.
- **`mask` prop for sensitive code entry** — renders dots/bullets like a password field. _Why:_ PIN entry (banking, device unlock) must not display characters on screen. _Impact:_ extends the component beyond OTP into secure PIN entry use cases.

**Notable Props:** `length: number` (default 6); `onChange: (value: string) => void`; `formatter: (value: string) => string`; `type: "number" | "text"`; `mask: boolean | string`; `variant: "outlined" | "filled" | "borderless"`; `size: "small" | "middle" | "large"`; `disabled: boolean`; `status: "error" | "warning"`

**Accessibility:** Each cell is a real `<input>` with `aria-label` indicating position. `autocomplete="one-time-code"` supported for WebOTP/SMS auto-fill. Keyboard: Backspace moves focus to previous cell and clears it; Arrow keys navigate between cells. Missing: no `onComplete` distinct from `onChange`; no separator/grouping support.

---

### shadcn/ui (Tier 2) — `InputOTP`

shadcn/ui's `InputOTP` is built on the `input-otp` library by @guilherme_rodz and uses a fundamentally different architecture: a single hidden `<input>` element with a visual overlay of slot cells rendered by `InputOTPSlot` components. This solves the hardest problems of composed-individual-inputs: paste handling works natively (single input receives the paste), form submission works natively (single input has the value), and `autocomplete="one-time-code"` targets one input. Visual slots read their character from the hidden input's value by index — each `InputOTPSlot` renders independently as presentation-only, not actual inputs. `InputOTPSeparator` renders visual dashes or dots between groups (e.g., 3-3 grouping for "XXX-XXX" codes). Pattern-based validation via regex (`REGEXP_ONLY_DIGITS`, `REGEXP_ONLY_CHARS`) restricts input at the library level rather than using `type="number"`.

**Design Decisions:**
- **Single hidden input architecture** — visual slots are overlays, not real inputs. _Why:_ native paste, native autofill, native form submission — all the hard problems of composed-individual-inputs are eliminated. _Impact:_ the most robust architecture for production verification code flows. _Para tu caso:_ preferred when form library integration (React Hook Form, etc.) is required.
- **`InputOTPSeparator` as explicit slot component** — separator is a child element, not a prop. _Why:_ enables arbitrary elements between groups without the component needing to enumerate separator patterns. _Impact:_ supports "123-456", "123 456", and "12.34.56" layouts with the same component. _Para tu caso:_ useful for formatted codes (license keys, redemption codes).
- **Pattern-based validation** — regex patterns rather than `type="number"`. _Why:_ `type="number"` has documented UX problems (leading zeros stripped, no paste support on some browsers). Regex validation at input handles both digits-only and alphanumeric without those issues. _Para tu caso:_ always prefer `REGEXP_ONLY_DIGITS` over `type="number"` for numeric OTPs.

**Notable Props:** `value`, `onChange`, `maxLength` (total length); `pattern` (regex); `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator` compound components; `disabled`; `className`

**Accessibility:** Single input with `autocomplete="one-time-code"` has inherently simpler accessibility — one label, one input, standard text input interaction. Slot cells are aria-hidden (visual only). Missing: no explicit `onComplete`; no built-in error state announcements.

---

### Chakra UI (Tier 3) — `PinInput` (compound component)

Chakra UI's `PinInput` uses a compound component architecture: `PinInput` as the controller wrapping an arbitrary number of `PinInputField` children. The number of fields is determined by how many `PinInputField` children are rendered — not a `length` prop — giving maximum layout control. Any element can be inserted between fields (separators, grouping spans) because each `PinInputField` is a real `<input>`. The `manageFocus` prop (default true) handles auto-advance; setting it to false enables manual focus control for custom flows. `otp` boolean adds `autocomplete="one-time-code"` to all fields. `onComplete` callback fires only when all fields have values — distinct from `onChange` which fires on every keystroke. `mask` renders dots/bullets for sensitive entry.

**Design Decisions:**
- **Compound component = consumer-controlled length** — field count is child count, not a prop. _Why:_ maximum flexibility for custom layouts, separators, and grouping without needing the component to anticipate every separator pattern. _Impact:_ more verbose JSX, but zero constraints on layout. _Para tu caso:_ when separator rendering or non-uniform grouping is required.
- **`onComplete` as distinct from `onChange`** — fires only when all fields are filled. _Why:_ auto-submit on complete is the most common OTP flow; polling `onChange` for full string length is error-prone and doesn't handle paste correctly. _Impact:_ enables zero-button OTP verification (enter code → auto-submit). _Para tu caso:_ key pattern for streamlined 2FA flows.
- **`manageFocus: false` escape hatch** — consumers can disable auto-advance. _Why:_ some use cases need manual focus control (accessibility override, custom keyboard handling). _Impact:_ makes the component usable in non-standard entry flows.

**Notable Props:** `PinInput` (controller): `type: "number" | "alphanumeric"`; `otp: boolean`; `mask: boolean`; `manageFocus: boolean`; `onComplete: (value: string) => void`; `onChange: (value: string) => void`; `value`; `defaultValue`; `size`; `isDisabled`; `isInvalid`; `PinInputField`: standard input props

**Accessibility:** Each `PinInputField` is a real `<input>` with `aria-label` indicating position ("Pin code digit 1 of 6"). Group wraps in a container. `otp` prop adds `autocomplete="one-time-code"`. Keyboard: Backspace clears and moves to previous; Arrow keys navigate.

---

### Mantine (Tier 3) — `PinInput`

Mantine's `PinInput` is a single-component API using `length` prop (default 4) to render internal input cells. Simpler to use than Chakra's compound approach, less flexible for custom layouts. Supports `type="number"`, `type="alphanumeric"`, or a custom regex pattern for character restriction. `oneTimeCode` prop (mirrors Chakra's `otp`) adds `autocomplete="one-time-code"`. `mask` for password display. `onComplete` fires when all cells filled — same pattern as Chakra. `gap` prop controls spacing between cells as a Mantine style prop. Integrates with Mantine Form via `{...form.getInputProps('pin')}`. `readOnly` state for display-only PIN entry confirmation.

**Design Decisions:**
- **`length` prop over compound children** — simpler API at the cost of layout flexibility. _Why:_ the common case (uniform segmented inputs, no separator) benefits from a one-prop API. _Impact:_ faster to implement for standard OTP flows. _Para tu caso:_ prefer over Chakra when no custom separators are needed.
- **Regex `type` prop** — accepts `"number"`, `"alphanumeric"`, or a regex object. _Why:_ custom character sets (hex codes, uppercase-only codes) need validation beyond the two standard types. _Impact:_ extends to license key entry and custom code formats without extra configuration. _Para tu caso:_ use regex for hex-based activation codes.
- **`gap` as style prop** — controls spacing between cells. _Why:_ visual grouping (tight vs. spaced cells) affects readability and perception of code length. _Impact:_ supports visual grouping without `InputOTPSeparator` boilerplate. _Para tu caso:_ adjust gap to match brand density.

**Notable Props:** `length: number` (default 4); `type: "number" | "alphanumeric" | RegExp`; `oneTimeCode: boolean`; `mask: boolean`; `onComplete: (value: string) => void`; `onChange: (value: string) => void`; `value`; `defaultValue`; `gap`; `size`; `disabled`; `readOnly`; `error`; `placeholder`

**Accessibility:** Compound internal inputs, each with positional aria-label. `oneTimeCode` adds `autocomplete="one-time-code"`. Keyboard contract matches Chakra. Form library integration via `form.getInputProps`.

---

## Pipeline Hints

### Archetype Recommendation

**Archetype: compound-input** — The component consists of N synchronized input cells that behave as a single logical field. The key architectural decision is single-hidden-input (shadcn/ui pattern) vs. multiple-real-inputs (Ant Design, Chakra, Mantine). The single-hidden-input architecture is superior for form integration and accessibility simplicity; multiple-real-inputs is superior for per-cell visual customization and independent cell error states.

**Rationale:** 4 of 24 systems implement this component, confirming it is a specialized rather than foundational primitive. The `onComplete` callback (Chakra, Mantine) is the most impactful architectural differentiator — it enables auto-submit flows that define the primary OTP UX pattern. GOV.UK's anti-pattern ruling (use single input) should inform the decision when accessibility simplicity outweighs visual affordance.

---

### Slot Consensus Table (systems with component: 4)

| Slot | Description | Systems | Consensus |
|------|-------------|---------|-----------|
| `cell` / `slot` | Individual character input cell | Ant, shadcn, Chakra, Mantine | 4/4 |
| `separator` | Visual separator between groups | shadcn (InputOTPSeparator) | 1/4 |
| `group` | Grouping container for cell subsets | shadcn (InputOTPGroup) | 1/4 |
| `error-message` | Error text below the input group | Mantine (error prop) | 1/4 |

---

### Property Consensus Table

| Property | Values Found | Systems | Consensus |
|----------|-------------|---------|-----------|
| `length` / cell count | 4, 6, 8 (default varies: 4 Mantine, 6 Ant) | Ant, Mantine; Chakra uses child count | 3/4 |
| `type` | `"number"`, `"alphanumeric"`, `RegExp` | Ant (`"number"\|"text"`), Chakra, Mantine | 3/4 |
| `mask` | `boolean`, `string` (custom mask char) | Ant, Chakra, Mantine | 3/4 |
| `value` | `string` | Ant, shadcn, Chakra, Mantine | 4/4 |
| `onChange` | `(value: string) => void` | Ant, shadcn, Chakra, Mantine | 4/4 |
| `onComplete` | `(value: string) => void` | Chakra, Mantine | 2/4 |
| `disabled` | `boolean` | Ant, Chakra, Mantine | 3/4 |
| `size` | `"small"\|"middle"\|"large"` (Ant), `"sm"\|"md"\|"lg"` (Mantine) | Ant, Mantine | 2/4 |
| `status` / `isInvalid` / `error` | error/warning state | Ant, Chakra, Mantine | 3/4 |
| `autocomplete="one-time-code"` | via `otp` (Chakra), `oneTimeCode` (Mantine), native (Ant) | Ant, Chakra, Mantine | 3/4 |
| `pattern` | regex validation | shadcn | 1/4 |
| `readOnly` | boolean | Mantine | 1/4 |
| `placeholder` | string (per-cell) | Ant, Mantine | 2/4 |

---

### Boolean Properties Table

| Property | Default | Systems |
|----------|---------|---------|
| `mask` | false | Ant, Chakra, Mantine |
| `disabled` | false | Ant, Chakra, Mantine |
| `manageFocus` (auto-advance) | true | Chakra |
| `otp` / `oneTimeCode` | false | Chakra, Mantine |
| `readOnly` | false | Mantine |
| `autoFocus` | false | Ant, Mantine |

---

### State Coverage Table

| State | Systems | Consensus |
|-------|---------|-----------|
| default (empty) | Ant, shadcn, Chakra, Mantine | 4/4 |
| focused (active cell) | Ant, shadcn, Chakra, Mantine | 4/4 |
| partial (some cells filled) | Ant, shadcn, Chakra, Mantine | 4/4 |
| complete (all cells filled) | Ant, shadcn, Chakra, Mantine | 4/4 |
| error / invalid | Ant (status="error"), Chakra (isInvalid), Mantine (error) | 3/4 |
| disabled | Ant, Chakra, Mantine | 3/4 |
| masked (PIN mode) | Ant, Chakra, Mantine | 3/4 |
| readOnly (display) | Mantine | 1/4 |
| loading / verifying | — | 0/4 |

---

### Exclusion Patterns

- 20 of 24 systems do NOT implement this component — it is strictly optional in design systems
- GOV.UK explicitly recommends against the segmented pattern based on user research
- Auth-tier vs. DS-tier: most enterprise systems (Carbon, Salesforce, IBM, Atlassian) handle OTP at the platform authentication layer, not as a design system component
- Ant Design is the only Tier 1 system with a dedicated component
- The "compose from TextField + custom JS" fallback is the majority approach (16+ systems)

---

### Building Block Candidates

- `InputGroup` / `Group` — wrapping container with role="group" and aria-label
- `Input` (single character, maxLength=1) — base cell for the composed approach
- `VisualCell` — presentation-only cell slot (shadcn/ui single-hidden-input architecture)
- `HiddenInput` — single hidden native input for form/autofill integration
- `Separator` — visual divider between cell groups

---

### Enum / Configuration Properties

| Property | Options | Default |
|----------|---------|---------|
| `type` | `"number"`, `"alphanumeric"` | `"number"` |
| `size` | `"sm"`, `"md"`, `"lg"` | `"md"` |
| `variant` | `"outlined"`, `"filled"`, `"borderless"` | `"outlined"` |
| `mask` | `false`, `true`, custom mask char string | `false` |
| architecture | single-hidden-input, multiple-real-inputs | multiple-real-inputs (most) |

---

### A11y Consensus

| Aspect | Consensus |
|--------|-----------|
| **Role** | `role="group"` on container; individual cells are `<input type="text">` (not role="spinbutton") |
| **ARIA** | `aria-label` per cell ("Pin code digit N of M"); `aria-label` or `aria-labelledby` on group; `autocomplete="one-time-code"` for WebOTP |
| **Keyboard** | Character entry → auto-advance to next cell; Backspace → clear current + move to previous; Arrow Left/Right → navigate between cells; Paste → fill all cells from first empty |
| **Focus** | Roving managed focus: only the active cell is in the normal tab flow; Tab exits group |
| **APG Pattern** | No official APG pattern for OTP input; closest is "Spinbutton" (incorrect) or "Group of textboxes" |
| **Error** | `aria-invalid` on cell or group; `aria-describedby` pointing to error message element |
| **Single-input advantage** | shadcn/ui architecture: one `aria-label`, one `autocomplete`, one `aria-invalid` — far simpler SR interaction |

---

## What Everyone Agrees On

1. **Auto-focus advance is mandatory** — typing a character must automatically move focus to the next cell; without this, the UX advantage over a plain `<input>` disappears entirely.
2. **Paste must distribute across cells** — pasting "123456" must fill all 6 cells; breaking paste is the most common implementation failure in hand-rolled PIN inputs.
3. **`autocomplete="one-time-code"` is required for OTP use cases** — enables browser WebOTP API / SMS auto-fill; every system that has a component exposes this as a prop.
4. **Backspace navigates backward** — clearing a cell and returning focus to the previous cell is the universal keyboard contract for PIN input correction.
5. **`onComplete` / completion callback is the primary value** — firing a callback when all cells are filled (distinct from every-keystroke onChange) enables auto-submit flows that are the defining UX pattern of verification code entry.
6. **`mask` mode is needed for PIN entry** — rendering bullets instead of characters is required for sensitive PIN inputs; every implementing system includes it.
7. **Error state must be visible at the group level** — a single error message below the group, not per-cell errors, is the standard pattern for invalid codes.

---

## Where They Disagree

1. **Single hidden input vs. multiple real inputs?**
   Option A (shadcn/ui): single hidden `<input>` + visual-only slot cells. Native paste, native autofill, native form submission. Simpler a11y.
   Option B (Ant, Chakra, Mantine): each cell is a real `<input>`. Native per-cell focus, per-cell validation, per-cell aria-label. More complex focus management required.

2. **`length` prop vs. compound children for cell count?**
   Option A (Ant, Mantine): `length` number prop. Simpler API, standard case covered with one prop.
   Option B (Chakra): PinInputField children determine count. Maximum layout flexibility, custom separators trivial to add.

3. **Separator support: built-in or composition?**
   Option A (shadcn/ui): `InputOTPSeparator` as an explicit compound component.
   Option B (others): no built-in separator — consumers insert their own elements between groups.

4. **`onComplete` distinct from `onChange`?**
   Option A (Chakra, Mantine): `onComplete` fires only when all fields filled — enables auto-submit.
   Option B (Ant): only `onChange` fires with the accumulated string — consumer checks string length to detect completion.

5. **Segmented input vs. single text input at all?**
   Option A (Ant, Chakra, Mantine, shadcn): segmented cells communicate "enter exactly N digits" visually.
   Option B (GOV.UK): single `<input inputmode="numeric" maxlength="6">` is simpler, has better accessibility, avoids paste/focus complexity. Backed by user research.

6. **`type="number"` vs. `inputmode="numeric"` for numeric restriction?**
   Option A (Ant): `type="number"` renders numeric keyboard on mobile.
   Option B (shadcn, Mantine with regex): inputmode + pattern. Avoids type="number" issues (leading zeros stripped, spinner UI).

---

## Visual Patterns Found

### Standard 6-digit OTP (most common)

```
┌─────────────────────────────────────────────────────────────────┐
│  Enter verification code                                        │
│  ┌───┐ ┌───┐ ┌───┐  ┌───┐ ┌───┐ ┌───┐                         │
│  │ 1 │ │ 2 │ │ 3 │  │   │ │   │ │   │                         │
│  └───┘ └───┘ └───┘  └───┘ └───┘ └───┘                         │
│             ↑ focused cell (cursor visible)                     │
│  Didn't receive a code? Resend (0:45)                           │
└─────────────────────────────────────────────────────────────────┘
```

### With separator (shadcn/ui `InputOTPSeparator`)

```
┌─────────────────────────────────────────────────────────────────┐
│  ┌───┐ ┌───┐ ┌───┐ ─ ┌───┐ ┌───┐ ┌───┐                        │
│  │ X │ │ X │ │ X │   │   │ │   │ │   │                        │
│  └───┘ └───┘ └───┘   └───┘ └───┘ └───┘                        │
└─────────────────────────────────────────────────────────────────┘
```

### Error state

```
┌─────────────────────────────────────────────────────────────────┐
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐                          │
│  │ 1 │ │ 2 │ │ 3 │ │ 4 │ │ 5 │ │ 6 │  ← all cells red border  │
│  └───┘ └───┘ └───┘ └───┘ └───┘ └───┘                          │
│  ✕ Incorrect code. Please try again.                            │
└─────────────────────────────────────────────────────────────────┘
```

### Masked PIN input (bank/device)

```
┌─────────────────────────────────────────────────────────────────┐
│  Enter PIN                                                      │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐                                       │
│  │ ● │ │ ● │ │ ● │ │   │                                       │
│  └───┘ └───┘ └───┘ └───┘                                       │
└─────────────────────────────────────────────────────────────────┘
```

### GOV.UK single-input alternative

```
┌─────────────────────────────────────────────────────────────────┐
│  Enter the 6-digit security code                                │
│  ┌──────────────────────────────────────────┐                  │
│  │  1 2 3 4 5 6                             │                  │
│  └──────────────────────────────────────────┘                  │
│  The code was sent to your mobile phone                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Risks to Consider

| Risk | Severity | Notes |
|------|----------|-------|
| Paste-breaking on composed inputs | HIGH | Multiple real inputs fragment the paste event; each input receives only 1 character. Requires explicit paste handler that reads event.clipboardData.getData('text') and distributes across cells. Native paste on single hidden input (shadcn) eliminates this entirely. |
| `autocomplete="one-time-code"` incorrect targeting | HIGH | On composed inputs, the browser's WebOTP API targets the first input; autofill may not distribute across cells. Single hidden input has native correct behavior. Required on every OTP implementation for SMS auto-fill compliance. |
| GOV.UK usability evidence ignored | MEDIUM | User research documented: segmented inputs caused confusion, error correction difficulty, and paste failures. For high-stakes flows (2FA, banking), the single-input approach may actually convert better. Consider A/B testing against your user base before committing to the segmented pattern. |
| `type="number"` stripping leading zeros | MEDIUM | A 6-digit code starting with "0" (e.g., "012345") becomes "12345" when stored as a number. Always use `type="text"` with `inputmode="numeric"` or regex validation. Ant Design's `type="number"` is the only system with this potential issue. |
| Missing `onComplete` requires polling onChange | LOW | Ant Design's absence of a dedicated `onComplete` requires consumers to check `value.length === length` inside `onChange` to detect completion. This pattern fails for paste scenarios if the onChange fires before all cells are visually updated. |

---

## Next Steps

1. **Decide architecture first:** single-hidden-input (shadcn/ui pattern, best for forms and autofill) vs. multiple-real-inputs (Chakra/Mantine, best for per-cell visual customization). This choice drives all downstream API decisions.
2. **Implement `onComplete`** as distinct from `onChange` — this is the most impactful missing feature in Ant Design's implementation and directly enables auto-submit OTP flows.
3. **Add `autocomplete="one-time-code"`** — expose as a boolean prop (name it `otp` or `oneTimeCode` per Chakra/Mantine convention); required for SMS auto-fill.
4. **Decide on separator support** — if grouped codes (license keys, formatted codes) are in scope, plan the separator API before finalizing the slot structure.
5. **Consider GOV.UK evidence** — evaluate whether the single-input alternative is better for your user base, especially on mobile where paste behavior and focus management are most error-prone.
