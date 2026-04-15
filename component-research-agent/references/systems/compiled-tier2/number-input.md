---
component: NumberInput
tier: 2
last_verified: 2026-03-28
---

# NumberInput — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | NumberInput (not present) | Not dedicated; use Input type="number" or Input with validation | high |
| Salesforce Lightning | NumberInput (via Input type="number") | Native input[type=number] with Lightning styling; formatter support | high |
| GitHub Primer | NumberInput (not present) | Not dedicated; TextInput with type="number" | high |
| shadcn/ui | NumberInput (not present) | Not dedicated; Input type="number" or compose with +/- buttons | high |
| Playbook | Number Input | Quantity/numeric entry; dual React/Rails | medium |
| REI Cedar | CdrInputNumber (InputNumber) | Vue number input with +/- stepper buttons; min/max/step | medium |
| Wise Design | NumberInput | Transfer amount input; currency-aware | low |
| Dell Design System | NumberInput | Enterprise numeric configuration | low |

## Key Decision Patterns

**Native input[type=number] issues:** Native input[type=number] has browser inconsistencies (especially in non-English locales), shows browser-native spinner buttons, and accepts scientific notation. Many teams use input[type=text] with numeric validation instead of input[type=number].

**Stepper buttons (+/-):** Cedar's CdrInputNumber uniquely provides +/- increment/decrement buttons alongside the text field — appropriate for small integer quantities (seat count, item quantity). Stepper buttons are not appropriate for large number ranges or precise decimal values.

**Currency/amount inputs:** Wise's transfer amount input is a specialized pattern — must handle locale-appropriate decimal separators, currency display, and large number formatting. This goes beyond a standard NumberInput.

**inputmode attribute:** For mobile-optimized numeric keyboards on text inputs, `inputmode="numeric"` or `inputmode="decimal"` provides the numeric keyboard without the drawbacks of input[type=number].

## A11y Consensus
- Use inputmode="numeric" (integers) or inputmode="decimal" (floats) with input[type=text] for best mobile keyboard + accessibility
- Or use input[type=number] with pattern attribute for browser validation
- Stepper buttons: +/- buttons with aria-label="Increase" / "Decrease" or "Increment quantity"
- Min/max constraints: communicate in label or help text, not only via HTML attributes
- Error for invalid input: aria-invalid + aria-describedby to error message

## Recommended Use
Use Cedar CdrInputNumber for quantity stepper with +/- buttons. Use input[type=text] with inputmode="decimal" for financial amount fields. Use input[type=number] only for simple integer inputs where browser native behavior is acceptable.
