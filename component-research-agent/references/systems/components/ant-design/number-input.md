---
system: Ant Design
component: InputNumber
url: https://ant.design/components/input-number/
last_verified: 2026-03-28
---

# InputNumber

## Approach
Ant Design's InputNumber is the most feature-dense number input among Tier 1 design systems, reflecting Ant's origins in Alibaba's internal enterprise tooling where financial applications, inventory systems, and data-heavy admin panels are the primary use cases. The component's philosophy centers on separating the displayed representation from the internal value — a pattern made explicit through the `formatter`/`parser` prop pair, which allows arbitrary transformation between what the user sees and what the application stores. This is a more escape-hatch-oriented approach than Spectrum's `Intl.NumberFormat` integration: where Spectrum uses the browser's locale standards, Ant gives you a function and trusts you to handle the transformation yourself, which is more flexible but also more error-prone. The most architecturally distinctive feature is `stringMode`, which addresses a real and underappreciated problem in financial applications: JavaScript's IEEE 754 floating-point arithmetic cannot safely represent integers beyond `Number.MAX_SAFE_INTEGER` (2⁵³−1 ≈ 9 quadrillion) and introduces rounding errors in decimal arithmetic (0.1 + 0.2 = 0.30000000000000004). For currency and scientific use cases where exact decimal representation matters, `stringMode` stores the value as a string internally, bypassing JavaScript's numeric type entirely, and uses a big-number library for arithmetic.

## Key Decisions

1. **`formatter` / `parser` prop pair** (HIGH) — `formatter` transforms the stored value to a display string (e.g., `value => '$' + value`); `parser` does the reverse (`value => value.replace('$', '')`). The WHY is maximum display flexibility without coupling to a specific formatting standard. Teams building Chinese financial dashboards, Brazilian reais pickers, or scientific notation inputs can all use the same component with custom logic. The gap versus Spectrum is that this requires manual implementation of formatting that `Intl.NumberFormat` provides for free.

2. **`stringMode` for big numbers and floating-point precision** (HIGH) — Enabling `stringMode` stores the internal value as a string and performs arithmetic using a big-number library. This directly addresses two JavaScript numeric limitations: (a) integers exceeding `Number.MAX_SAFE_INTEGER` lose precision silently, and (b) decimal arithmetic produces floating-point rounding errors that compound in financial calculations. The WHY is that Alibaba's financial products (Alipay, Taobao) handle transactions in RMB amounts that can involve large integers and require exact decimal precision — trusting JavaScript's native `number` type is genuinely dangerous in those contexts.

3. **`precision` prop with `stringMode` compatibility** (MEDIUM) — The `precision` prop controls how many decimal places are displayed and stored. When combined with `stringMode`, precision is maintained without floating-point rounding. This is important because setting `precision={2}` for currency and then doing arithmetic on the native `number` representation would re-introduce the rounding errors that `stringMode` is meant to prevent.

4. **Keyboard modifier for accelerated stepping** (MEDIUM) — Shift+Up/Down applies a 10× step multiplier; the `keyboard` prop can disable all keyboard interaction entirely. The WHY is efficiency for power users in data-entry contexts — adjusting a value from 100 to 200 requires 10 arrow key presses at `step=10`, but only 1 Shift+Arrow press. Ctrl/Cmd+Up/Down applies a 0.1× multiplier for fine-grained adjustment.

5. **`controls` prop to hide stepper buttons** (LOW) — Setting `controls={false}` removes the stepper buttons entirely, leaving a plain input with numeric constraints. This supports use cases like mobile forms or inline table cell editing where button affordances clutter the layout but full numeric keyboard-and-validation behavior is still needed.

6. **`addonBefore` / `addonAfter` for unit/currency decoration** (MEDIUM) — Addons render within the input group frame, not as external labels. This is designed for patterns like "amount [€]" or "[https://] domain" where the unit or prefix is tightly bound to the value visually. The WHY is that separate label elements outside the input lose the visual coupling that communicates to the user that the unit is part of the value, not a field label.

## Notable Props
- `formatter`: Function `(value) => string` — transforms stored value to display representation.
- `parser`: Function `(string) => value` — inverse of `formatter`, extracts numeric value from display string.
- `stringMode`: Stores value as string and uses big-number arithmetic to bypass `Number.MAX_SAFE_INTEGER` and IEEE 754 precision limits.
- `precision`: Decimal places to display and enforce; works correctly in `stringMode`.
- `step`: Increment/decrement per stepper click or arrow key.
- `keyboard`: Set to `false` to disable all keyboard increment/decrement behavior.
- `controls`: Set to `false` to hide stepper buttons while keeping all other functionality.
- `prefix` / `suffix`: Static decorative text inside the input field (lighter-weight alternative to `addonBefore`/`addonAfter`).

## A11y Highlights
- **Keyboard**: Arrow Up increments by `step`, Arrow Down decrements. Shift+Up/Down applies 10× multiplier. Ctrl/Cmd+Up/Down applies 0.1× multiplier. All keyboard behavior is disableable via the `keyboard` prop. This is the most expressive keyboard stepping model among Tier 1 systems.
- **Screen reader**: `role="spinbutton"` is applied implicitly via `<input type="number">`. `aria-valuenow`, `aria-valuemin`, `aria-valuemax` are set from props. Stepper buttons receive accessible labels. `aria-readonly` reflects the disabled state.
- **ARIA**: Standard `spinbutton` role with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`. The component does not announce value changes to a live region beyond standard spinbutton semantics — screen readers announce the updated value through the spinbutton interaction model.

## Strengths & Gaps
- **Best at**: `stringMode` for financial precision and big-number safety, plus `formatter`/`parser` for fully custom display transformations — the most powerful feature set for data-heavy enterprise applications.
- **Missing**: No built-in `Intl.NumberFormat` integration — locale-aware formatting (grouping separators, decimal commas for European locales) requires manual `formatter` implementation rather than being automatic.
