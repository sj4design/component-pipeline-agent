---
component: Slider
tier: 3
last_verified: 2026-03-29
---

# Slider — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Slider | Headless primitive: Slider.Root / Slider.Track / Slider.Range / Slider.Thumb; array value natively supports multi-thumb range; separate Range element for independent styling; `inverted` for reverse-fill direction. | high |
| Chakra UI | Slider / RangeSlider | Split into two components (number vs. [number, number]); `SliderMark` for labeled tick marks at specific values; `SliderThumb` for custom thumb content; `colorScheme` for fill color. | high |
| GOV.UK | Not available — motor accessibility | No slider component; sliders require precise motor control incompatible with government services' obligation to serve users with a wide range of motor abilities; text inputs or selects used instead. | high |
| Base Web | Slider | Single/range support via number or array value; `marks` prop for discrete tick positions; Overrides for all sub-elements; used for price range filtering in Uber's driver app. | medium |
| Fluent 2 | Slider | Office/Windows use cases: volume, zoom, brightness; single-thumb only; `step` for discrete values; `vertical` orientation for call-control-style volume sliders; `marks` with labels; `size` prop. | high |
| Gestalt | Not available — product focus | Pinterest's advertising and consumer surfaces don't require slider inputs; text inputs used for bid amounts and budget configuration. | medium |
| Mantine | Slider / RangeSlider | Most complete T3 implementation: built-in `label` formatter for floating tooltip on thumb; `marks` array with labels; `RangeSlider` with `minRange`; Shift+Arrow for 10x step. | high |
| Orbit | RangeSlider | Range-first for travel price/time/duration filtering; `valueDescription` renders text summary of selected range (e.g., "€50 – €200") below the slider; mobile-optimized. | medium |
| Evergreen | Not available — text inputs used | Segment analytics dashboards use text inputs and dropdowns for configuration values; sliders not required. | medium |
| Nord | Not available — clinical accuracy | Motor accessibility and clinical data accuracy concerns; accidental value change via drag is unsafe for clinical measurements; text inputs with validation are the appropriate alternative. | low |

## Key Decision Patterns

The single most differentiating feature across T3 slider components is the multi-thumb (range) decision. Radix and Base Web support range natively via an array value — passing `[20, 80]` creates two thumbs. Chakra and Mantine split single and range into separate components (Slider vs. RangeSlider), arguing that different state shapes (number vs. [number, number]) warrant separate APIs rather than overloaded behavior. Fluent 2 provides only single-thumb. Orbit provides only range. The split-component approach (Chakra, Mantine) keeps each component's API clean at the cost of requiring consumers to import the right component; the unified approach (Radix, Base Web) is more flexible but requires API consumers to understand that array vs. number value has structural implications.

Mantine's built-in `label` prop is the most practical default behavior in the T3 set. The `label` prop accepts a formatter function — `label={(value) => `${value}%`}` — that renders a floating tooltip above the thumb showing the current value during interaction. Most other T3 systems omit this (Radix, Fluent 2, Base Web) and require custom implementation via an external Tooltip component attached to the thumb. For sliders where users need to see the precise current value (price sliders, zoom controls, opacity settings), omitting the value tooltip forces teams to build their own. Mantine making this a first-class `label` prop that accepts a formatter reflects the reality that almost all interactive sliders need value display.

Orbit's `valueDescription` prop addresses the range slider's persistent UX problem: how do you show the selected range in context? Most T3 range sliders show the current values only in the thumb tooltip during interaction. When the user is not dragging, the selected range is only visible from thumb positions on the track. Orbit's `valueDescription` renders a persistent text summary (typically formatted as "€50 – €200" or "06:00 – 22:00") below the slider that remains visible whether or not the user is interacting. This is especially important on mobile where thumb tooltips may be obscured by a finger during drag.

GOV.UK and Nord's absences both cite the same root cause: sliders require precise motor control that cannot be guaranteed across the intended user populations. GOV.UK's argument is user diversity — government services must work for users with limited dexterity, tremors, and assistive devices for which a drag-to-select interaction is unreliable. Nord's argument adds clinical safety — an accidental drag on a medication dosage field is a patient safety issue. Both arrive at the same conclusion: for contexts where data accuracy and inclusive access are paramount, text inputs with explicit validation are the correct replacement for sliders.

## A11y Consensus

- Each slider thumb must have `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and — when the displayed value includes units or formatting — `aria-valuetext` to provide a human-readable description (e.g., "50 percent," "120 pixels").
- Arrow key interaction is required: Left/Right arrows adjust single-thumb sliders by one step; Up/Down arrows also work; Page Up/Down adjust by a larger increment (typically 10 steps); Home/End jump to min/max. This full keyboard contract is implemented by Radix, Chakra, Mantine, and Fluent 2.
- For range sliders with two thumbs, each thumb must be independently keyboard-accessible and independently announce its value — a common implementation error is to give the container a single `role="slider"` instead of each thumb its own.
- Tick marks and track labels are decorative — they must be `aria-hidden="true"` or rendered outside the tab order; interactive marks that snap the thumb to a value on click are a separate behavior that needs click handlers, not ARIA changes.
- `aria-orientation` must be set on vertical sliders — without it, screen readers may announce horizontal arrow key directions for vertical sliders, confusing keyboard navigation.

## Recommended Use

Reference T3 slider approaches when deciding on single vs. range component architecture, built-in value display, and marks. Radix is the reference for a headless multi-thumb primitive with separate Range element for custom gradient fills; Mantine is the reference for built-in `label` tooltip formatter and labeled `marks` array — the most complete single-package implementation; Orbit is the reference for the `valueDescription` pattern for persistent range display below the track; Fluent 2 is the reference for vertical orientation in call-control/settings use cases; GOV.UK and Nord are the references for the motor accessibility and clinical safety arguments against sliders in favor of text inputs.
