---
component: Number Input
tier: 3
last_verified: 2026-03-29
---

# Number Input — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Not available — native input | No primitive; native `<input type="number">` carries `role="spinbutton"` natively; custom steppers composed from Themes IconButton + text input; no clamping utilities. | high |
| Chakra UI | NumberInput | Compound architecture (NumberInput/NumberInputField/NumberInputStepper/NumberIncrementStepper/NumberDecrementStepper); string-based value with `valueAsNumber` in onChange; `clampValueOnBlur`; custom `format`/`parse` props. | high |
| GOV.UK | Text Input (numeric variant) | `inputmode="numeric"` with `pattern="[0-9]*"` instead of `type="number"`; no stepper controls by design; field width communicates expected value length; multiple separate inputs for compound numbers. | high |
| Base Web | Not available — native `type="number"` | Browser-native stepper via Input component; no custom stepper buttons; `endEnhancer` slot as escape hatch for custom stepper icons. | high |
| Fluent 2 | SpinButton | Named SpinButton; `type="text"` not `type="number"` for cross-browser consistency; `displayValue` prop for unit annotation ("100%"); `stepPage` for Page Up/Down larger jumps; Office toolbar lineage. | high |
| Gestalt | Not available — TextField with inputMode | `inputMode="numeric"` on TextField; stepper pattern excluded as mobile-unfriendly; SelectList/RadioGroup used for small discrete integer choices. | high |
| Mantine | NumberInput | Most feature-complete in T3: `prefix`/`suffix` for units; `thousandSeparator` for large numbers; `allowNegative`/`allowDecimal` boolean controls; `clampBehavior` (blur vs. strict); no external dependencies. | high |
| Orbit | Not available — domain-specific stepper only | Free-form numeric via InputField; passenger count stepper is domain-specific with complex adult/infant ratio rules; no general-purpose NumberInput exposed. | high |
| Evergreen | Not available — native `type="number"` | Configuration numeric values (API limits, thresholds) have wide ranges; stepper impractical; native `type="number"` via TextInput. | high |
| Nord | Input type="number" (nord-input) | No stepper buttons by design — clinical dosing accuracy; scroll-to-change disabled; unit labeling via prefix/suffix slots; `min`/`max`/`step` for clinical range enforcement. | high |

## Key Decision Patterns

The T3 set reveals a fundamental split on stepper controls between productivity/form-tool systems (Chakra, Fluent 2, Mantine) and product-domain systems (GOV.UK, Gestalt, Orbit, Evergreen, Nord). The three systems with dedicated NumberInput components all target use cases where stepper controls are genuinely useful: financial form entry (Chakra), Office toolbar font size/zoom controls (Fluent 2), and SaaS admin forms with bounded ranges (Mantine). The five systems without steppers all serve use cases where steppers are practically useless or actively harmful: large free-form values (Gestalt's ad budgets, Evergreen's API limits, Orbit's numeric identifiers), mobile-first interfaces where steppers are hard to tap accurately (Gestalt), or clinical contexts where accidental stepper increments are a patient safety risk (Nord).

The `type="number"` vs. `type="text"` debate is resolved consistently across T3: GOV.UK, Fluent 2, and Nord all prefer `type="text"` with `inputmode="numeric"` or numeric validation, explicitly rejecting `type="number"`. The reasons are consistent across all three: scroll-to-change behavior that accidentally alters values, inconsistent browser-native spinner buttons that conflict with system-designed buttons, inconsistent locale number formatting, and poor handling of formatted values (leading zeros, currency symbols). This is a cross-domain consensus that the native `<input type="number">` has serious UX problems beyond simple integer entry.

Mantine's NumberInput is the most feature-complete implementation in the T3 set. The `prefix`/`suffix` props, `thousandSeparator`, and `allowNegative`/`allowDecimal` boolean controls cover the full range of numeric input types: currency ($1,234.56), percentages (95%), units (250mg), large integers (1,000,000 events). These are typically handled by third-party libraries (react-number-format, imask) in other systems, but Mantine builds them in without external dependencies.

Nord's deliberate removal of stepper UI is the strongest patient safety argument in the T3 set. Stepper buttons (and scroll-to-change) on a dosage field in a medication management interface represent an accidental edit risk that could cause clinical harm. The decision to disable both steppers and scroll-to-change on numeric inputs — making clinical data entry exclusively deliberate keyboard input — is an example of a design system encoding safety constraints that go beyond standard accessibility requirements.

## A11y Consensus

- Custom spinbutton implementations (non-native `type="number"`) must have `role="spinbutton"` with `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` — this is required for screen readers to announce the current value and allowed range.
- Increment/decrement buttons must have accessible `aria-label` values ("Increment value," "Decrement value") — icon-only buttons without labels are the most common accessibility failure in custom number inputs.
- `aria-valuetext` is required when the displayed value includes units or formatting ("100 percent," "250 milligrams") that differs from the raw numeric value — Fluent 2 supports this via `displayValue`.
- Keyboard requirements for spinbutton: Up/Down arrows increment/decrement by step; Page Up/Down increment/decrement by a larger amount (typically 10× step); Home/End jump to min/max — Chakra and Fluent 2 implement the full keyboard contract.
- Scroll-to-change behavior on focused number inputs is a common accessibility problem — it modifies values when users intend to scroll the page; Nord disabling this for clinical safety is aligned with WCAG 2.5.1 (Pointer Gestures) intent.

## Recommended Use

Reference T3 number input approaches when deciding on stepper vs. plain-input design, `type="number"` vs. `type="text"` with numeric inputmode, and built-in formatting. Mantine's NumberInput is the reference for the most complete stepper implementation with formatting, units, and integer/decimal control; Fluent 2's SpinButton is the reference for `displayValue` unit annotation and the `type="text"` rationale; GOV.UK is the reference for `inputmode="numeric"` over `type="number"` with research backing; Nord is the reference for the patient safety argument against stepper controls on clinical numeric fields.
