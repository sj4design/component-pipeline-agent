---
system: Spectrum (Adobe)
component: NumberField
url: https://react-spectrum.adobe.com/react-spectrum/NumberField.html
last_verified: 2026-03-28
---

# NumberField

## Approach
Spectrum's NumberField is the most architecturally sophisticated number input among major design systems, built around a foundational principle: global creative tools cannot afford to treat number formatting as an afterthought. Adobe's products — Lightroom for photo editing, Adobe Analytics for data dashboards, Adobe Commerce for international retail — all operate in multi-locale environments where numbers carry different meanings. A currency value displayed to a French user must show "1 234,50 €" while the same value shown to a US user must render "$1,234.50", and both must submit the same underlying numeric value to the server. Spectrum solves this by delegating all display logic to the browser's native `Intl.NumberFormat` API through the `formatOptions` prop, which accepts standard `Intl.NumberFormatOptions` objects directly. This means the component inherits the full power of ECMA-402 — currency, percentage, units, scientific notation, significant digits — without any custom formatting code. The result is a component that separates the concern of "what number is stored" from "how that number is displayed", with the raw numeric value always submitted to forms regardless of how it appears on screen.

## Key Decisions

1. **Intl.NumberFormat via `formatOptions`** (HIGH) — Rather than inventing a custom formatting API, Spectrum passes `Intl.NumberFormatOptions` objects directly to the browser's `Intl.NumberFormat`. This means any format the browser supports — `{style: "currency", currency: "JPY"}`, `{style: "percent"}`, `{style: "unit", unit: "kilometer-per-hour"}` — works automatically. The WHY is pragmatic: Adobe ships to every market; maintaining a custom number formatting library would duplicate what browsers already do reliably and would lag behind new locale data.

2. **Raw numeric form submission regardless of display** (HIGH) — When `formatOptions` shows "$1,234.50", the HTML form receives `1234.5`, not the display string. This prevents server-side parsing failures across locales where decimal separators differ (comma vs. period). The design explicitly decouples presentation from data, a principle that matters enormously in internationalized enterprise software.

3. **Step anchoring to `minValue`** (MEDIUM) — When `minValue={2}` and `step={3}`, valid stepping values are 2, 5, 8, 11 — not 0, 3, 6, 9. Steps are calculated relative to the minimum, not absolute zero. This prevents the common situation where a "quantity starts at 5" field steps to values like 6, 7 instead of 5, 10, 15. The WHY is that business constraints define valid values, and the stepper should respect those constraints rather than the mathematical origin.

4. **Clamping on blur, not on keystroke** (HIGH) — Out-of-range values typed by the user are allowed to persist during typing but snap to the nearest valid value on blur. Stepper buttons additionally disable within one `step` of bounds to prevent stepping past the limit. This respects typing intent — users often type intermediate values while building a final number — while still enforcing constraints at the right moment.

5. **Three numeral system support for input parsing** (LOW) — The component accepts Latin (0–9), Arabic-Indic (٠–٩), and Han numerals in the input field, regardless of the active locale. Display renders in the locale's native system. This was motivated by the reality that users operating in Arabic or East Asian locales may physically type characters that belong to their native numeral system, and refusing those inputs creates a jarring accessibility failure.

6. **`hideStepper` prop to remove buttons while keeping keyboard control** (MEDIUM) — Stepper buttons can be hidden via `hideStepper` without disabling arrow-key increment/decrement. This supports contexts like inline editing in dense data tables where buttons add visual noise but keyboard users still need step control. The design recognizes that the UI affordance (buttons) and the interaction model (keyboard stepping) are separable concerns.

## Notable Props
- `formatOptions`: Accepts any `Intl.NumberFormatOptions` object — the key to locale-aware currency, percent, and unit formatting without custom code.
- `isWheelDisabled`: Defaults to false (scroll wheel adjusts value). Can be disabled on scrollable pages to prevent accidental value changes while scrolling.
- `hideStepper`: Removes the visual stepper buttons while preserving keyboard arrow-key behavior.
- `minValue` / `maxValue`: Establish the valid range; also serve as the baseline for step calculation and disable stepper buttons near bounds.
- `step`: Increment size; automatically defaults to 0.01 when `formatOptions.style === "percent"` to match the display scale.
- `isReadOnly`: Field remains focusable and its value copyable — distinct from `isDisabled`, which removes the field from the tab order entirely.

## A11y Highlights
- **Keyboard**: Arrow Up/Down increment/decrement by `step`. Home jumps to `minValue`, End jumps to `maxValue`. Page Up/Down behavior is inherited from ARIA spinbutton specification (large step). All keyboard controls work even when `hideStepper` removes buttons.
- **Screen reader**: `aria-valuenow` reflects the current numeric value, `aria-valuemin` and `aria-valuemax` reflect the range. The label for stepper buttons uses `incrementAriaLabel` and `decrementAriaLabel` props, allowing context-specific overrides (e.g., "Increase quantity" rather than generic "Increment"). A `necessityIndicator="label"` prop appends a localized "(required)" or "(optional)" string to the visible label.
- **ARIA**: `role="spinbutton"` is applied to the input. `aria-valuenow`, `aria-valuemin`, `aria-valuemax` are set automatically from props. The spinner buttons are separate focusable elements outside the spinbutton role, each with their own labels.

## Strengths & Gaps
- **Best at**: Locale-aware number formatting with zero custom code — currency, percent, and unit formats that work globally out of the box.
- **Missing**: No explicit documentation on Page Up/Down step magnitude, and no built-in pattern for a currency-selector dropdown adjacent to the field (common in e-commerce contexts where the user also chooses the currency).
