---
system: GOV.UK Design System
component: Text Input (numeric variant)
url: https://design-system.service.gov.uk/patterns/
last_verified: 2026-03-29
confidence: high
---

# Number Input

## Approach
GOV.UK Design System has no dedicated Number Input component with increment/decrement spinners. Instead, numeric data entry is handled by the standard Text Input component with specific HTML attributes and guidance patterns applied. The core guidance recommends `inputmode="numeric"` (which displays a numeric keypad on mobile without restricting input to numbers only) combined with `pattern="[0-9]*"` for integer-only fields, rather than `type="number"`. This decision is backed by GDS research: `type="number"` introduces scroll-to-change behaviour that accidentally alters values, shows browser-native up/down spinners that are difficult to use on touch devices, and has inconsistent handling of leading zeros and formatted numbers (such as account numbers) across browsers. The GOV.UK patterns library provides tailored guidance for specific number types: asking for age, asking for a year, asking for currency amounts, and asking for quantities — each with field width recommendations, label copy guidance, and input attribute combinations.

## Key Decisions
1. **`inputmode="numeric"` over `type="number"`** (HIGH) — `type="number"` is explicitly avoided in GOV.UK guidance due to scroll-wheel accidental changes, browser inconsistencies with formatted values, and poor handling of leading zeros in reference numbers. `inputmode="numeric"` provides the numeric keyboard on mobile while keeping the input as a plain text field.
2. **No spinner controls** (HIGH) — Increment/decrement buttons are absent by design. Government services ask for precise, known values (age, year, quantity) rather than exploratory numeric selection. Spinners encourage guessing and introduce motor accessibility challenges for users with tremors or limited dexterity.
3. **Field width communicates expected length** (MEDIUM) — GOV.UK recommends sizing the input field to match the expected value length (e.g., a 2-character-wide input for age, 4-character for year). This provides a strong affordance about the expected format without requiring placeholder text.
4. **Separate inputs for compound numbers** (MEDIUM) — For dates, times, and other compound numeric values, GOV.UK uses multiple discrete text inputs (day/month/year; hour/minute) rather than a single complex input or date/time picker.

## Notable Props
- Nunjucks macro: `govukInput({ id, name, inputmode: "numeric", pattern: "[0-9]*", label, hint, errorMessage, classes, width })`
- `inputmode`: `"numeric"` for integers; `"decimal"` for decimal numbers
- `pattern`: `"[0-9]*"` for positive integers; `"[0-9.]*"` for decimals
- `classes`: `govuk-input--width-2` (2 chars), `govuk-input--width-4` (year), `govuk-input--width-10` (currency) — communicates expected length
- `spellcheck: false` recommended for numeric fields to suppress browser spell-check underlines
- `autocomplete` attribute should be set appropriately (e.g., `"bday-year"`, `"postal-code"`)

## A11y Highlights
- **Keyboard**: Standard text input keyboard behaviour; no custom key handling; no arrow-key increment; Tab/Shift+Tab for navigation
- **Screen reader**: Label announced on focus; hint and error text linked via `aria-describedby`; `inputmode` does not affect SR announcements; input type is announced as "text" (not "number"), avoiding SR quirks with `type="number"`
- **ARIA**: `aria-describedby` for hint/error IDs; `aria-invalid="true"` on error state; no `role` override needed; `aria-label` used only when visible label is absent (rare in GOV.UK patterns)

## Strengths & Gaps
- **Best at**: Reliable cross-browser, cross-device numeric text entry without `type="number"` pitfalls; strong guidance on field sizing, label copy, and mobile keyboard optimisation backed by real government service research
- **Missing**: No stepper/spinner variant for quantity selection; no currency formatting or input masking built in; no automatic comma-separation for large numbers; teams needing range-based numeric input (sliders) must build entirely custom components
