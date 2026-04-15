---
system: Material Design 3
component: Slider
url: https://m3.material.io/components/sliders/guidelines
last_verified: 2026-03-28
---

# Slider

## Approach
Material Design 3 treats the slider as a core input primitive with four distinct configurations — continuous (called "standard"), discrete (with stop indicators), centered (value measured from a midpoint), and range (dual-thumb). The decision to name the standard mode "standard" rather than "continuous" in M3 reflects a philosophy shift: continuous is the default, expected behavior, not a special mode. Google's products span music playback, brightness control, photo exposure, and map zoom — a diverse set of use cases that require both subjective (continuous) and objective (discrete, snapped) value selection. Rather than a single overloaded component, M3 distinguishes these through configuration attributes, keeping the API surface manageable while supporting every pattern. The value indicator (tooltip) is explicitly optional and styled as a Material tooltip, reinforcing that showing the value during drag is a UX choice, not a requirement — in some contexts like brightness, users judge by visual output rather than a number.

## Key Decisions
1. **Separate Slider vs. RangeSlider classes** (HIGH) — M3 on Android ships `Slider` (single thumb) and `RangeSlider` (dual thumb) as two distinct classes rather than a single component with a mode prop. This is because dual-thumb interaction — including `minSeparation` enforcement between handles and managing two synchronized values — requires fundamentally different state logic. Keeping them as separate classes avoids conditional branching in the core implementation and prevents API bloat on the single-thumb case.

2. **Value indicator as an optional tooltip** (MEDIUM) — The value label uses `@style/Widget.Material3.Tooltip` and is configured via `app:labelBehavior`. The design rationale is that not all sliders need numeric feedback during drag; for subjective controls (volume, brightness), users calibrate by outcome, not number. Making the tooltip optional avoids visual clutter in cases where it adds no value. Custom label formatting is available via `setLabelFormatter()`, enabling domain-specific strings like "$50" or "50%".

3. **Discrete mode via stop indicators** (MEDIUM) — M3 uses the term "stop indicators" for what M2 called "discrete." Setting `android:stepSize` creates snap points with visible tick marks. The UX reasoning is that tick marks communicate the finite option set to users before they interact — they can see how many steps exist and calibrate their drag accordingly. Without ticks, a stepped slider feels broken because the thumb snaps invisibly.

4. **Vertical orientation support** (MEDIUM) — M3 expressive configurations include vertical layout. Vertical sliders appear in contexts like equalizer bands, multi-channel audio mixing, and some data visualization tools. Supporting vertical is a deliberate inclusion for these professional/creative product contexts within Google's ecosystem (YouTube Studio, Google Photos exposure controls), even though the vast majority of sliders are horizontal.

5. **No paired text input in the web/Android spec** (LOW) — Unlike Carbon or Polaris, M3's slider specification does not prescribe a companion text input for direct value entry. The design philosophy here is that sliders are for approximate selection; if precision matters, a text field or number stepper is the more appropriate control. Mixing a text input into the slider widget would blur the semantic distinction between these two input patterns.

## Notable Props
- `app:labelBehavior`: Controls whether the value tooltip shows floating above the thumb, within the track, or is gone entirely — directly representing the "how much numeric feedback does this context need?" design decision.
- `app:stepSize`: Activates discrete mode; when set, stop indicator ticks render automatically.
- `app:minSeparation` (RangeSlider only): Enforces minimum distance between the two thumbs, preventing the range from collapsing to zero — a usability guard that reflects real-world use cases like date ranges or price filters needing a meaningful gap.
- `setLabelFormatter()`: Callback for custom value text, enabling formatted values like currency or percentage in the tooltip and in screen reader announcements via `contentDescription`.
- `app:values` (RangeSlider): Takes an array resource to set both thumb positions simultaneously, reflecting the dual-state nature of range selection.

## A11y Highlights
- **Keyboard**: Arrow keys (left/right for horizontal, up/down for vertical) move the thumb one step; Home and End jump to min/max values. The component follows WAI-ARIA APG slider keyboard pattern.
- **Screen reader**: Value announcements rely on `android:contentDescription` set programmatically. When `setLabelFormatter()` is used, the formatted string should be set as the content description to ensure screen readers announce "$50" rather than raw "50". There is no built-in automatic `aria-valuetext` equivalent on Android — developers must wire this manually.
- **ARIA**: On web implementations, uses `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`. `aria-valuetext` should be set whenever the numeric `aria-valuenow` would not make sense to a screen reader user without context (e.g., units, currency). The M3 web component handles this through its label formatter callback.

## Strengths & Gaps
- **Best at**: Comprehensive visual variant coverage — four configurations (standard, stop-indicator, centered, range) with extensive theming attributes covering track, thumb, tick, and gap sizing.
- **Missing**: No built-in paired text input for direct value entry; developers must build this pairing manually when precision input is needed alongside the slider.
