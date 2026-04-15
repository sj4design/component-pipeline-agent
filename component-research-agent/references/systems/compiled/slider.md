---
component: slider
compiled: 2026-03-28
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Slider — All Systems Digest

## Material Design 3
**Approach**: Four configurations — continuous (standard), discrete (stop indicators/tick marks), centered (from midpoint), and range (dual-thumb as separate RangeSlider class). Value indicator (tooltip) is optional and styled as a Material tooltip. Vertical orientation supported for equalizer/mixer use cases.
**Key decisions**:
- Slider vs. RangeSlider as separate classes; dual-thumb interaction (minSeparation enforcement, two synchronized values) requires fundamentally different state logic — one component would cause API bloat and conditional branching
- Optional value tooltip; for subjective controls (brightness, volume) users calibrate by outcome not number — tooltip adds noise without value
- Stop indicator tick marks auto-render when `stepSize` is set; ticks communicate the finite option set before interaction so users know how many steps exist
**Notable API**: `app:labelBehavior` (floating|within-track|gone); `app:stepSize` (activates discrete + ticks); `app:minSeparation` (RangeSlider); `setLabelFormatter()` (custom value text + contentDescription)
**A11y**: Arrow keys ±1 step; Home/End to min/max; role="slider" + aria-valuenow/min/max; `setLabelFormatter()` must also set contentDescription for SR to announce formatted values (not automatic).
**Best at**: Comprehensive visual variant coverage — four configurations with extensive theming attributes. **Missing**: No built-in paired text input for direct value entry.

## Spectrum (Adobe)
**Approach**: Separate Slider (single number) and RangeSlider ({start, end} object) components. `formatOptions` uses Intl.NumberFormatOptions to format the visible label AND populate aria-valuetext simultaneously. `isFilled`/`fillOffset` for bipolar/centered tracks (exposure, contrast). Track gradient support for color-adjacent sliders.
**Key decisions**:
- Separate RangeSlider; value type is structurally different ({start, end} vs. number) — one component with `range` boolean would force TypeScript union types and consumers handling both value shapes
- `formatOptions` with Intl.NumberFormatOptions; browser's i18n engine formats "$50.00" or "50%" correctly across all locales AND automatically feeds aria-valuetext — a11y and i18n solved in one decision
- No paired text input; slider and NumberField are separate concerns — composing them is the developer's responsibility to avoid baking opinionated layout into the component
**Notable API**: `formatOptions` (Intl.NumberFormatOptions); `getValueLabel` (escape hatch); `isFilled`; `fillOffset`; `trackGradient`; `labelPosition` (top|side); `showValueLabel`; `orientation` (vertical)
**A11y**: Arrow keys + Page Up/Down (10% increment) + Home/End; aria-valuetext auto-populated from formatOptions/getValueLabel; label/aria-label enforced; each RangeSlider handle independently focusable.
**Best at**: Locale-aware value formatting that drives both visible label and aria-valuetext simultaneously — zero-effort internationalized accessible sliders. **Missing**: No tick mark visualization for discrete steps.

## Carbon (IBM)
**Approach**: Slider always ships with a mandatory paired number input kept in sync. Range variant (dual handle + two inputs) via `range` prop on same component. `stepMultiplier` for Shift+Arrow large increments. No tooltip during drag — persistent input is always-visible and always-editable, strictly more useful.
**Key decisions**:
- Mandatory paired input; enterprise users often know the exact value they need — typing is faster than dragging to precisely 73; the input is also an a11y fallback if drag handles cannot be operated
- No drag tooltip; the persistent input already shows the value at all times — a transient tooltip adds visual noise without benefit over an always-visible editable field
- `stepMultiplier` as configurable prop; enterprise keyboard users need to cover large ranges without holding arrow keys for dozens of presses — Shift+Arrow with 10x multiplier is the standard pattern, made explicit here
**Notable API**: `stepMultiplier` (Shift+Arrow multiplier); `value`/`min`/`max`; `invalid`/`invalidText` (for companion input validation); `disabled` (disables both handle and input simultaneously)
**A11y**: Tab: input → handle(s) → second input; Arrow keys ±1 step; Shift+Arrow ±stepMultiplier steps; both handle and input independently keyboard operable; aria-valuenow announces raw numbers (no aria-valuetext).
**Best at**: Paired number input with auto-correction — most production-ready precision-input pattern. **Missing**: No tick mark visualization; no aria-valuetext for formatted announcements.

## Polaris (Shopify)
**Approach**: Called RangeSlider even for single-handle mode — "range" communicates bounded selection rather than mechanical metaphor. Single prop `value` accepts `number` (single mode) or `[number, number]` (dual mode) with type switching behavior. Explicitly mandates text field pairing for dual-thumb (documented a11y gap). Optional `output` tooltip.
**Key decisions**:
- Single component with type-switched value; one component import and mental model vs. two — Shopify app developers typically build one or two slider instances and don't need the overhead of choosing between components
- Mandatory label even if hidden; `labelHidden` visually suppresses while preserving accessible name — Polaris enforces this at API level rather than relying on developer discipline
- Text field pairing mandatory for dual-thumb; Polaris explicitly documents that multi-thumb ARIA patterns have inconsistent AT support on mobile — most candid admission of this limitation among Tier 1 systems
**Notable API**: `value` (number|[number, number]); `output` (drag tooltip boolean); `prefix`/`suffix` (unit labels flanking the slider); `label`/`labelHidden` (required)
**A11y**: Native `<input type="range">` providing aria-valuenow/min/max automatically; no aria-valuetext or value formatting API — units in prefix/suffix not propagated to AT.
**Best at**: Honest documentation of dual-thumb a11y limitations with clear mandatory remediation. **Missing**: No aria-valuetext formatting; no Shift+Arrow large-increment behavior documented.

## Atlassian
**Approach**: Called "Range" after the HTML primitive. Intentionally minimal — single-thumb only, no dual-thumb mode, no tooltip, no tick marks, no value display. Composability over convenience: teams add labels, text fields, and value display themselves. Built on native `<input type="range">` with design tokens applied.
**Key decisions**:
- Named "Range" after HTML primitive; component names should map to semantic HTML counterparts where possible — eliminates mental model gap between component name and browser semantics
- Single-thumb only; Atlassian product audit found dual-thumb use cases are rare enough in Jira/Confluence that standardizing it doesn't justify the component complexity — range filtering uses separate min/max inputs instead
- Minimal API surface; an opinionated component would impose layout choices conflicting with product-specific needs across Jira/Confluence/Trello's diverse surfaces
**Notable API**: `min`/`max` (required, no implicit defaults); `step`; `value`/`defaultValue` (controlled/uncontrolled); `isDisabled`; `onChange`
**A11y**: Native `<input type="range">` provides role="slider" + aria-valuenow/min/max automatically; label must be wired externally by consuming team; no aria-valuetext built-in — requires ref/wrapper for formatted announcements.
**Best at**: Clean minimal native-HTML-first implementation with guaranteed cross-browser/AT keyboard support. **Missing**: No aria-valuetext, no value display, no dual-thumb — range selection built entirely outside the component.

## Ant Design
**Approach**: Most feature-complete — single component with `range` prop for dual-thumb, `marks` for labeled discrete positions (arbitrary React nodes as tick labels), `tooltip.formatter` for drag tooltip, `ariaValueTextFormatterForHandle` per-handle aria-valuetext, `onChangeComplete` for performance-optimized handlers. Vertical orientation first-class.
**Key decisions**:
- `range` as prop vs. separate component; API minimalism — one import, consistent pattern across the library; `range` accepts object form with draggableTrack/editable/minCount/maxCount for advanced behaviors
- `marks` with React node labels; enables non-linear labeled scales ("Free / 100GB / 1TB") with step={null} for purely labeled discrete selection — no other system provides this flexibility
- `ariaValueTextFormatterForHandle`; enterprise admin contexts need "from $50" / "to $200" per handle, not just raw numbers — most explicit aria-valuetext implementation among Tier 1 systems
**Notable API**: `range` (boolean|{draggableTrack, editable, minCount, maxCount}); `marks` (object mapping position→ReactNode); `tooltip.formatter`; `ariaValueTextFormatterForHandle`; `ariaLabelForHandle`; `onChangeComplete`; `reverse`; `dots`; `keyboard` (boolean)
**A11y**: Per-handle aria-valuetext via formatter; per-handle aria-label for range distinguishing "minimum handle" vs "maximum handle"; aria-orientation auto-set for vertical; keyboard prop can be disabled for embed conflicts.
**Best at**: Comprehensive aria-valuetext and per-handle ARIA labeling — most complete SR support for formatted value announcements. **Missing**: No built-in paired text input for direct value entry alongside the slider.
