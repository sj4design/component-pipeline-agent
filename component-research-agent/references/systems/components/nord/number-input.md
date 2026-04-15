---
system: Nord Design System (Nordhealth)
component: Input (type="number" via nord-input)
url: https://nordhealth.design/components/input/
last_verified: 2026-03-29
confidence: high
---

# Number Input

## Approach
Nord does not provide a dedicated `<nord-number-input>` component with increment/decrement stepper buttons — numeric value entry is handled by `<nord-input type="number">` using the native browser number input. This decision is specifically motivated by patient safety concerns in clinical software. Stepper buttons (+ / - increment controls) on number inputs create a category of accidental-change risk in clinical settings: a clinician entering a medication dosage of "250mg" should not be able to accidentally increment it to "260mg" with a misplaced tap on a clinical tablet or an inadvertent scroll event over the field. For clinical values — dosages, lab reference ranges, vital sign thresholds, BMI values, creatinine levels — each digit matters and must be entered deliberately via keyboard. Nord's `<nord-input type="number">` strips browser-default spinner controls via CSS and relies on direct text entry, combined with clear unit labels and input constraints (`min`, `max`, `step`) to guide accurate clinical data entry without offering a stepper shortcut.

## Key Decisions
1. **No stepper buttons — clinical dosing accuracy** (HIGH) — In medication management, a single accidental stepper increment on a dosage field can mean the difference between a therapeutic and toxic dose. Removing stepper UI entirely eliminates this class of input error from Nord-based clinical applications.
2. **Scroll-to-change disabled** (HIGH) — Native `<input type="number">` allows scroll wheel to change the value when focused. Nord neutralizes this behavior via CSS/event handling — in a scrollable clinical record, a scroll action should never silently change a numeric medical value.
3. **`min`, `max`, `step` constraints for clinical range validation** (MEDIUM) — Nord's `<nord-input>` passes these attributes to the underlying native input, enabling browser-level range enforcement that can catch obviously incorrect clinical values (e.g., a heart rate of 0 or 1000 bpm) before form submission.
4. **Explicit unit labeling** (MEDIUM) — Clinical numeric values always have units (mg, mL, mmHg, bpm, °C). Nord supports suffix/prefix slots on `<nord-input>` to display unit labels adjacent to numeric fields, reducing ambiguity about what unit the number represents — critical in medication dosing and vital sign documentation.

## Notable Props
- `type="number"`: Renders numeric input behavior; use on `<nord-input type="number">`
- `min`: Minimum allowed value; maps to native `min` attribute for browser-level range enforcement
- `max`: Maximum allowed value; maps to native `max` attribute
- `step`: Increment step for validity checking (does not add stepper UI); useful for clinical values that must be whole numbers or specific fractions
- `label`: Required label text — must include unit context for clinical numeric fields (e.g., "Dosage (mg)")
- `error`: Error message string displayed when value is out of range or invalid
- `hint`: Helper text slot for clinical range guidance (e.g., "Normal range: 60–100 bpm")

## A11y Highlights
- **Keyboard**: Full keyboard entry; Tab to focus, type digits directly; arrow key increment/decrement is native browser behavior on number inputs (cannot be fully suppressed) — teams should be aware and test for accidental arrow-key changes in clinical contexts
- **Screen reader**: Announced as "number field" or "spin button" by screen readers with `min`, `max`, and `step` values communicated; label association via Shadow DOM internal label provides correct accessible name; unit suffix in the label or hint text is read to screen reader users
- **ARIA**: `role="spinbutton"` is the native ARIA role for `<input type="number">`; `aria-valuemin`, `aria-valuemax`, `aria-valuenow` are natively managed; `aria-describedby` links hint/error text to the field

## Strengths & Gaps
- **Best at**: Safe, deliberate numeric entry for clinical values where stepper shortcuts are a liability; range constraint support; unit label association for clinical field clarity; consistent with Nord's broader form component pattern
- **Missing**: No dedicated component for clinical numeric patterns like dose calculators (weight-based dosing: mg/kg); no formatted display mode (showing "1,250 mg" with comma formatting in view mode vs. raw number in edit mode); no specialized clinical vital signs input combining value + unit + normal range indication in one compound component
