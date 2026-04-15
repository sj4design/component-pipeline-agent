---
system: Carbon Design System (IBM)
component: Slider
url: https://carbondesignsystem.com/components/slider/usage/
last_verified: 2026-03-28
---

# Slider

## Approach
Carbon's Slider is designed around a core principle that differentiates it from most other design systems: the slider is never presented alone. Every default slider ships with a paired number input that shows the current value and accepts direct keyboard entry. IBM's enterprise product context is the driver here — data-heavy dashboards, configuration panels, and analytics tools require precision that a slider handle alone cannot guarantee. When users need to set a value of 73 in a 0–100 range, dragging to exactly 73 is frustrating; typing it is instant. The pairing makes sliders a genuinely productive input rather than just a visual affordance. Carbon also offers a range variant with two handles and two paired inputs, and the tab order — input → handle → handle → input — is carefully specified to ensure keyboard users can operate both the coarse (drag) and precise (type) modes in a logical sequence. Carbon explicitly decided against a stepper-integrated range slider after internal design discussion concluded that steppers were suboptimal for broadly varied data sets.

## Key Decisions
1. **Mandatory paired number input** (HIGH) — Carbon's slider always ships with a number input companion, and the two are kept in sync: moving the slider updates the input, and typing in the input moves the slider. The reasoning is IBM's enterprise users often know the exact value they need, making direct text entry faster than dragging. The input also serves as an accessibility fallback — if a user cannot operate a drag handle, they can tab to the input and type. This is one of the strongest input-companion implementations across all Tier 1 systems.

2. **Range variant as a prop, not a separate component** (HIGH) — Carbon offers a `range` variant (sometimes described as a "range slider" in docs) within the same component rather than splitting into two components. Two handles define minimum and maximum bounds, with two corresponding number inputs. This approach was chosen for consistency — one component import, one mental model — though it does mean the API handles two value states simultaneously, making the prop interface slightly more complex than Spectrum's separate-component approach.

3. **`stepMultiplier` for keyboard power users** (MEDIUM) — Pressing Shift + Arrow key changes the value by `stepMultiplier` steps rather than one. The recommended default is a tenth of the total range (e.g., 10 for a 0–100 slider). This reflects Carbon's awareness that enterprise users frequently navigate with keyboards and need a way to cover large ranges without holding arrow keys for dozens of presses. No other Tier 1 system documents this pattern as prominently.

4. **No tooltip during drag** (MEDIUM) — Carbon displays the value in the persistent number input rather than showing a tooltip bubble above the thumb during drag. This is a deliberate trade — a tooltip is transient, visible only while dragging, and adds visual noise. The persistent input is always readable and also editable, making it strictly more useful. The tooltip-during-drag pattern (common in Material Design and Ant Design) was bypassed in favor of this always-visible, always-editable approach.

5. **Auto-correction for out-of-range input values** (LOW) — When a user types a value outside the slider's min/max in the companion input, Carbon automatically corrects it to the nearest allowed value. This is a forgiving UX pattern — rather than throwing a hard validation error, the system silently clamps the value. However, if the value is invalid for other reasons (e.g., non-numeric), an error message does display alongside the input.

## Notable Props
- `stepMultiplier`: Defines the Shift+Arrow increment — unique among Tier 1 systems in explicitly surfacing this as a configurable prop rather than hardcoding 10x step.
- `value` / `min` / `max`: Core range definition; when range variant is used, value becomes a two-element tuple.
- `disabled`: Disables both the slider handle and the companion input simultaneously, ensuring consistent state.
- `invalid` / `invalidText`: Validation state for the number input companion — recognizes that the input can receive text entries that violate range constraints.

## A11y Highlights
- **Keyboard**: Tab moves focus to the number input first, then the slider handle (range: both handles in order), then the second input. Arrow keys change the slider value by one step. Shift + Arrow changes by `stepMultiplier` steps. Both the handle and the input are independently keyboard operable.
- **Screen reader**: The slider handle announces its current value via `aria-valuenow`. The companion number input provides an alternative way to hear and set values without relying solely on the slider's ARIA live region. Both controls are labeled via `aria-labelledby` pointing to the slider label element.
- **ARIA**: `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` on the handle. Carbon's documentation notes that no additional accessibility annotations are needed for standard usage — the baked-in keyboard behavior and paired input together satisfy WCAG 2.1 AA requirements. `aria-valuetext` is not explicitly documented; numeric values are announced as raw numbers via `aria-valuenow`.

## Strengths & Gaps
- **Best at**: The paired number input implementation — keeping slider and input in perfect sync with auto-correction and range validation is the most production-ready precision-input pattern among Tier 1 systems.
- **Missing**: No tick mark visualization for discrete steps — `stepMultiplier` handles keyboard ergonomics but there are no visual indicators on the track to communicate available snap points to sighted users.
