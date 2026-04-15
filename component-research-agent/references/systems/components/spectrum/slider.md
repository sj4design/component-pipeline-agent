---
system: Spectrum (Adobe)
component: Slider + RangeSlider
url: https://react-spectrum.adobe.com/react-spectrum/Slider.html
last_verified: 2026-03-28
---

# Slider (+ RangeSlider)

## Approach
Spectrum makes the architecturally significant choice of splitting slider functionality into two completely separate components: `Slider` (single handle) and `RangeSlider` (dual handle). This is not a matter of convenience — it reflects the React Spectrum philosophy that components with fundamentally different value models should have different APIs. A `Slider` manages a single `number`; a `RangeSlider` manages `{ start: number, end: number }`. If these were collapsed into one component via a `range` boolean prop, every consumer would need to handle both value shapes, and TypeScript types would be complex union types. Adobe's products span Creative Cloud, Analytics, and Experience Platform, many of which need range selection (date ranges, exposure brackets, audio trim points) as a first-class concept — so the `RangeSlider` justifies its own documented API surface. The `Slider` itself is designed around locale-aware value formatting as a core feature, not an afterthought, reflecting Adobe's global product footprint.

## Key Decisions
1. **Separate RangeSlider component** (HIGH) — `RangeSlider` is its own component rather than a `range` prop on `Slider`. The value object `{ start, end }` is structurally different from a plain `number`, and treating them as one component would produce a fragile API where `onChange` returns different types depending on a boolean flag. This follows the React Spectrum principle of separating clearly distinct interaction models into separate components (as also seen with `Calendar` vs `DatePicker`, `ComboBox` vs `Select`).

2. **`formatOptions` for locale-aware value formatting** (HIGH) — Instead of a raw `formatValue` callback, Spectrum uses `Intl.NumberFormatOptions` via the `formatOptions` prop. This means formatting is handled by the browser's internationalization engine, guaranteeing that values like "$50.00", "50%", or "50 kg" are formatted correctly across all locales without custom code. Critically, this formatted string also feeds `aria-valuetext` automatically, so screen readers announce "50 percent" rather than "0.5" — a11y and i18n solved in one decision.

3. **No paired text input** (MEDIUM) — Spectrum's Slider explicitly does not bundle a text field for direct value entry. Adobe's stance is that the slider and number field are separate concerns; if a product needs both, it should compose them with the `NumberField` component explicitly. This avoids baking an opinionated layout into the slider itself, which would conflict with Adobe's wide range of product surfaces and layout densities.

4. **`isFilled` and `fillOffset` for bipolar/centered use cases** (MEDIUM) — These props enable the track to be visually filled from an arbitrary offset point (e.g., center for exposure from 0, or from a threshold). This directly reflects Adobe's photo/video editing use cases where sliders often represent values centered at 0 (exposure, contrast) rather than a unidirectional range. It is a domain-specific feature that most other design systems don't need to address.

5. **Vertical orientation as a first-class option** (LOW) — The `orientation` prop supports `"vertical"` as an equal citizen, not a workaround. This exists because Creative Cloud tools frequently use vertical sliders for mixer-style controls (opacity layers, audio tracks). The component auto-adjusts layout, label placement, and keyboard behavior for vertical mode.

## Notable Props
- `formatOptions`: Accepts `Intl.NumberFormatOptions` — this is the primary mechanism for custom value display AND screen reader announcements simultaneously, eliminating the need for a separate `aria-valuetext` callback in most cases.
- `getValueLabel`: Escape hatch for formatting that `Intl.NumberFormat` cannot handle; returns a string used for both the visible label and `aria-valuetext`.
- `isFilled`: Fills the track from min to thumb (or from `fillOffset`), essential for bidirectional scales common in Creative Cloud tools.
- `fillOffset`: Defines the visual origin of the fill, enabling centered/bipolar track visualization.
- `trackGradient`: Accepts a CSS gradient for the track background, supporting color-picker-adjacent sliders (e.g., hue or opacity).
- `labelPosition`: `"top"` or `"side"` — reflects the need to accommodate both compact and expanded layout contexts across Adobe's product range.
- `showValueLabel`: When `false`, hides the visible value but `aria-valuetext` remains set, satisfying a11y while enabling a cleaner UI for subjective controls.

## A11y Highlights
- **Keyboard**: Arrow keys move the thumb one step; Page Up/Down move by a larger increment (typically 10% of range); Home/End jump to min/max. For `RangeSlider`, each handle is independently focusable via Tab.
- **Screen reader**: When `formatOptions` is set, the formatted value string is announced on every change — e.g., "50 percent" rather than "50". When `getValueLabel` is used, that return value is announced. The `showValueLabel={false}` option hides visual display while preserving screen reader announcements.
- **ARIA**: `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`. `aria-valuetext` is automatically populated from `formatOptions` or `getValueLabel`, ensuring formatted announcements without developer wiring. Requires `label`, `aria-label`, or `aria-labelledby` — enforced by React Spectrum's accessibility linter.

## Strengths & Gaps
- **Best at**: Locale-aware value formatting that simultaneously drives visible label and `aria-valuetext`, making internationalized accessible sliders nearly zero-effort.
- **Missing**: No built-in discrete tick mark visualization — `step` controls snapping behavior but there is no prop to render visible tick marks on the track.
