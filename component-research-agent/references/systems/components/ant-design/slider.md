---
system: Ant Design
component: Slider
url: https://ant.design/components/slider/
last_verified: 2026-03-28
---

# Slider

## Approach
Ant Design's Slider is the most feature-complete slider implementation among Tier 1 systems, reflecting its enterprise-grade Chinese tech ecosystem origins where data-dense admin interfaces demand flexible, highly configurable components. The component supports single value, range (dual handle), vertical orientation, discrete marks with custom labels, tooltip formatting, draggable track ranges, and even dynamic handle count — all within a single component. The `range` prop is a boolean that activates dual-thumb mode, following the "one component, mode via props" pattern that Ant Design applies consistently across its library. The `marks` prop is one of the most differentiated features across Tier 1 systems — it enables labeled tick marks at arbitrary positions with custom React nodes, supporting use cases like "Low / Medium / High" text labels on a slider rather than just numeric steps. Ant Design also provides explicit per-handle accessibility props (`ariaLabelForHandle`, `ariaLabelledByForHandle`, `ariaValueTextFormatterForHandle`), making it the most thorough in documented `aria-valuetext` support — a notable contrast to systems that leave formatted announcements entirely to the developer.

## Key Decisions
1. **`range` as a prop on a single component** (HIGH) — Ant Design activates dual-thumb mode via `range={true}` rather than shipping a separate `RangeSlider` component (unlike Spectrum). The rationale is API minimalism within a feature-rich system: Ant Design's developer base expects a familiar, consistent pattern across components. Adding `range` as a prop keeps the import surface small and avoids the cognitive overhead of choosing between two components. The `range` prop can further accept an object with `draggableTrack`, `editable`, `minCount`, and `maxCount` sub-options, enabling advanced range behaviors without additional component variants.

2. **`marks` for labeled discrete positions** (HIGH) — The `marks` prop accepts an object where keys are numeric values and values are either strings or React nodes displayed as tick labels. Combined with `step={null}`, the slider snaps only to marked positions, creating a purely discrete selection of labeled options. This is a powerful pattern for non-linear scales — for example, a storage plan selector showing "Free / 100GB / 1TB / 10TB" at specific positions. No other Tier 1 system provides this degree of discrete labeling flexibility within a slider component.

3. **Tooltip with `formatter` callback** (MEDIUM) — The `tooltip.formatter` prop accepts a function that receives the numeric value and returns a React node for the tooltip bubble shown during drag. Returning `null` hides the tooltip entirely. This approach gives full control over the value display during interaction — enabling currency, units, or even icons — while keeping the tooltip as the primary value feedback mechanism during drag. The tooltip configuration was formalized into its own `tooltip` object prop in v4.23.0, consolidating earlier fragmented tooltip-related props.

4. **`ariaValueTextFormatterForHandle`** (HIGH) — This per-handle callback accepts the current numeric value and returns a formatted string for `aria-valuetext`. For a range slider, each handle gets its own formatter — for example, the minimum handle might announce "from $50" and the maximum handle "to $200". This is the most explicit and complete `aria-valuetext` implementation in any Tier 1 system, reflecting Ant Design's recognition that numeric values alone are often insufficient for screen reader users in enterprise admin contexts where values represent prices, dates, percentages, or quantities with units.

5. **`onChangeComplete` vs. `onChange` separation** (MEDIUM) — `onChange` fires on every value update during drag; `onChangeComplete` fires only on `mouseup` or `keyup`. This distinction is critical for performance in data-intensive dashboards — expensive operations like API calls, chart re-renders, or complex calculations should be triggered on `onChangeComplete`, while lightweight UI updates (updating a displayed value label) use `onChange`. No other Tier 1 system documents this callback separation as clearly, though the pattern is common in implementations.

## Notable Props
- `range`: `boolean | { draggableTrack, editable, minCount, maxCount }` — activates dual-thumb mode; the object form enables advanced behaviors like dragging the entire range segment and dynamically adding/removing handles.
- `marks`: Object mapping numeric positions to string or ReactNode labels — enables fully labeled discrete sliders beyond simple step indicators.
- `tooltip.formatter`: Custom React node formatter for the drag tooltip; `null` hides it.
- `ariaValueTextFormatterForHandle`: Per-handle callback for `aria-valuetext` — the most explicit screen reader value formatting API in any Tier 1 system.
- `ariaLabelForHandle` / `ariaLabelledByForHandle`: Per-handle labeling for range sliders, important because each handle needs a distinct accessible name.
- `orientation`: `"horizontal" | "vertical"` — replaces the deprecated `vertical` boolean prop as of v5; vertical is a first-class orientation, not a workaround.
- `reverse`: Inverts the value direction (right-to-left or bottom-to-top) for RTL interfaces or inverted scales.
- `onChangeComplete`: Fires only on interaction end, enabling performance-optimized handlers for expensive downstream operations.
- `keyboard`: Boolean (default `true`, added v5.2.0) — can disable keyboard interaction for embedding contexts where keyboard control conflicts with a parent container.
- `dots`: Boolean that restricts the thumb to `marks` positions and renders visible dot indicators — a visual enforcement of discrete-only mode.

## A11y Highlights
- **Keyboard**: Arrow keys move the handle one step per keypress; Shift + Arrow moves by a larger increment (browser/OS dependent for native range inputs). Home and End jump to min and max. The `keyboard` prop (default `true`) can be set to `false` to suppress keyboard interaction when needed.
- **Screen reader**: `ariaValueTextFormatterForHandle` provides a per-handle callback that populates `aria-valuetext` with human-readable values — e.g., "50 percent" or "$1,200". When not set, `aria-valuenow` announces the raw number. For range sliders, `ariaLabelForHandle` distinguishes each handle with a unique label so screen readers can identify "minimum handle" vs. "maximum handle" rather than two anonymous sliders.
- **ARIA**: `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax` on each handle. `aria-valuetext` set via `ariaValueTextFormatterForHandle`. `aria-orientation` is set to `"vertical"` automatically when `orientation="vertical"`. Each range handle can have its own `aria-label` or `aria-labelledby` via dedicated props.

## Strengths & Gaps
- **Best at**: Comprehensive `aria-valuetext` and per-handle ARIA labeling — the most complete screen reader support for formatted value announcements and labeled range handles among all Tier 1 systems.
- **Missing**: No built-in paired text input for direct value entry alongside the slider (Carbon's strongest differentiator); input companion must be composed manually.
