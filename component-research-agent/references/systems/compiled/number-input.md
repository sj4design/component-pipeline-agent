---
component: number-input
compiled: 2026-03-28
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Absent — TextField type="number" (no stepper spec)
**Approach:** M3 has no NumberInput or stepper component. The standard is `TextField` with `type="number"` or `inputmode="numeric"`. M3 documents the ambiguity between `type="number"` (browser stepper arrows, inconsistent between browsers) and `inputmode="numeric"` (numeric keyboard on mobile, no format restrictions) but does not resolve it with a component.
**Key Decisions:**
- [HIGH] Absent: M3's TextField covers the number input visual; stepper increment/decrement buttons are not specified as a component feature
- [MED] `type="number"` vs. `inputmode="numeric"` tension: documented ambiguity — `type="number"` adds browser stepper UI; `inputmode="numeric"` triggers mobile numeric keyboard without format enforcement
- [MED] No min/max/step component-level API: teams use HTML attributes on the underlying `<input>` directly
**Notable API:** `TextField` with `type="number"` or `inputmode="numeric"` and HTML `min`, `max`, `step` attributes.
**A11y:** Native `<input type="number">` has `role="spinbutton"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow` automatically. No M3-specific guidance on accessible number input patterns.
**Best at:** Nothing specific — native `<input type="number">` with M3 TextField styling works, but no stepper affordance or custom increment behavior.
**Missing:** Stepper buttons with consistent cross-browser behavior, `formatter`/`parser` pair for formatted display, and guidance on the `type="number"` vs. `inputmode="numeric"` decision.

---

## spectrum
**Component:** NumberField (most internationally complete)
**Approach:** Spectrum's NumberField uses `Intl.NumberFormat` via the `formatOptions` prop — the same API as JavaScript's built-in number formatter. This means NumberField natively supports currency symbols, percentage display, measurement units, and three different numeral systems (Latin, Arabic-Indic, Devanagari). Step anchoring snaps to multiples of `step` from `minValue`, not from 0. Clamping happens on blur, not on each keystroke.
**Key Decisions:**
- [HIGH] `formatOptions` using `Intl.NumberFormat`: one prop covers currency, percentage, units, and numeral systems — no separate `prefix`/`suffix` props needed; internationalization is automatic
- [HIGH] Raw numeric value for form submission: the displayed value may be "€1,234.56" but the submitted value is `1234.56` — display and data are correctly separated
- [MED] Step anchoring to `minValue`: `minValue=2, step=5` → valid values are 2, 7, 12, 17 — not 0, 5, 10, 15; anchoring to min is mathematically correct for bounded ranges
**Notable API:** `formatOptions: Intl.NumberFormatOptions`; `minValue`; `maxValue`; `step`; `hideStepper: boolean` (text field only, no buttons)
**A11y:** `role="spinbutton"` with `aria-valuemin/max/now`; stepper buttons have `aria-label`; formatted display value is announced; raw numeric value is in `aria-valuenow`. Best-in-class spinbutton implementation.
**Best at:** International number formatting via `Intl.NumberFormat` — currency, percentage, unit display without external formatting libraries; handles multiple numeral systems automatically.
**Missing:** `formatter`/`parser` pair for custom display formats not covered by `Intl.NumberFormat`; `stringMode` for BigNumber/decimal precision beyond JavaScript's float limits.

---

## carbon
**Component:** NumberInput
**Approach:** Carbon's NumberInput has a distinctive mobile layout: on narrow viewports, the decrement button moves to the left of the input and increment to the right (split layout). Desktop uses stacked up/down chevrons inside the input. Two validation tiers: `warn` (yellow, non-blocking) and `invalid` (red, blocking). Stepper buttons are outside the Tab order — Tab skips the buttons and focuses only the input; steppers are Arrow-key-operated.
**Key Decisions:**
- [HIGH] Mobile split layout (minus-left / plus-right): on small screens, wider tap targets on each side of the input improve touch usability — unique among Tier 1 systems
- [MED] `warn` vs. `invalid` two-tier validation: warn shows a warning state that doesn't block form submission; invalid blocks — Carbon's dual validation tier covers the "soft warning" use case
- [MED] Stepper buttons outside Tab order: Arrow keys increment/decrement the focused input; stepper buttons are clickable but not Tab-focusable — reduces Tab stops in dense forms
**Notable API:** `size: "sm" | "md" | "lg"`; `warn: boolean` / `warnText`; `invalid: boolean` / `invalidText`; `min` / `max` / `step`; `allowEmpty: boolean`
**A11y:** `role="spinbutton"` with `aria-valuemin/max/now`; stepper buttons have `aria-label="Increment"/"Decrement"`; `aria-live` for value changes. Outside-Tab-order buttons: accessible via Arrow keys on the input.
**Best at:** Mobile split layout for touch usability and two-tier validation (warn + invalid) for enterprise form workflows where non-blocking warnings are needed.
**Missing:** Formatted number display (no `formatter`/`parser`); no `stringMode` for large number precision.

---

## polaris
**Component:** TextField type="number" (with stepper enhancements)
**Approach:** Polaris handles number input through `TextField` with `type="number"`. The `largeStep` prop adds Page Up/Down support for large increments. Stepper buttons are `aria-hidden="true"` — a documented intentional decision to prevent double-announcing the same value change (Arrow keys in the input + stepper button click). Native browser stepper behavior is relied upon for min/max/step.
**Key Decisions:**
- [HIGH] `largeStep` for Page Up/Down: large increments (e.g., quantity adjustments by 10 or 100) are accessible via Page Up/Page Down — practical for merchants adjusting inventory quantities
- [MED] Stepper buttons `aria-hidden` intentional: prevents screen readers from announcing the increment twice (once for the input value change, once for the button activation) — a deliberate and correct a11y trade-off
- [MED] `min`/`max` as HTML attribute mirrors: passed directly to the `<input>` element for browser-native validation — Polaris doesn't add custom validation logic
**Notable API:** `type="number"`; `min`, `max`, `step`; `largeStep: number`; no formatter/parser; stepper buttons rendered but `aria-hidden`
**A11y:** Native `role="spinbutton"` from `<input type="number">`; `aria-valuemin/max/now` from HTML attributes. Stepper buttons `aria-hidden` prevents duplicate announcements. `largeStep` with Page Up/Down is a well-documented keyboard enhancement.
**Best at:** `largeStep` for Page Up/Down large increments and the `aria-hidden` stepper decision for clean screen reader experience.
**Missing:** Custom number formatting (`formatter`/`parser`), non-integer precision control, and `stringMode` for BigNumber.

---

## atlassian
**Component:** Absent (confirmed gap)
**Approach:** Atlassian's design system has no dedicated NumberInput or stepper component. Atlassian's own documentation acknowledges the gap between `type="number"` (browser spinbutton UI, locale-specific decimal separator issues) and `inputmode="numeric"` (numeric keyboard without format control). A Range slider is recommended as an alternative for bounded numeric input where approximate values are acceptable.
**Key Decisions:**
- [HIGH] Absent: confirmed gap in Atlassian Design System — no NumberInput component exists or is on the near-term roadmap
- [MED] `type="number"` vs. `inputmode` tension documented: Atlassian provides guidance on the trade-offs without resolving them with a component
- [MED] Range slider alternative: for bounded numeric ranges where approximate values work (e.g., setting a threshold from 0-100), the Atlassian Slider is the recommended substitute
**Notable API:** No component. `@atlaskit/textfield` with `type="number"` for basic numeric input.
**A11y:** No custom ARIA — native `<input type="number">` spinbutton semantics. Teams add `aria-valuemin/max/now` explicitly if needed.
**Best at:** Nothing for numeric input with stepper behavior — acknowledged gap.
**Missing:** Entire NumberInput/stepper component with increment/decrement controls, formatted display, and proper spinbutton ARIA.

---

## ant-design
**Component:** InputNumber (most feature-rich)
**Approach:** Ant Design's InputNumber has a `formatter`/`parser` pair for bidirectional value transformation (display "$ 1,000" while storing `1000`), `stringMode` for BigNumber and high-precision floating-point values (bypasses JavaScript's float64 limitations), `precision` for decimal places, and `Shift+Arrow` for a 10× step modifier. `addonBefore`/`addonAfter` slots integrate units or currency symbols. `controls={false}` removes the stepper buttons.
**Key Decisions:**
- [HIGH] `formatter`/`parser` pair: display value and stored value are independently controlled — format as "50%" while storing `0.5`, or format with thousands separators while storing the raw number
- [HIGH] `stringMode` for precision: uses string representation to avoid float64 precision loss for accounting, scientific, and financial applications — unique in Tier 1
- [MED] `Shift+Arrow` for 10× step: pressing Shift while using Arrow keys multiplies the step by 10 — power user affordance for quick large adjustments
**Notable API:** `formatter: (value) => string`; `parser: (displayValue) => number`; `stringMode: boolean`; `precision: number`; `step`; `controls: boolean`; `addonBefore`/`addonAfter`
**A11y:** `role="spinbutton"` with `aria-valuemin/max/now`; stepper buttons have `aria-label`; `Shift+Arrow` modifier is not announced to screen readers (keyboard shortcut only). `formatter` display value requires that `parser` correctly recovers the numeric value for `aria-valuenow`.
**Best at:** `formatter`/`parser` pair and `stringMode` for precision-sensitive applications — the most capable NumberInput for financial and scientific use cases in Tier 1.
**Missing:** Mobile split layout (Carbon's wide touch target feature); `largeStep` Page Up/Down support (Polaris feature); no built-in `warn` validation tier.
