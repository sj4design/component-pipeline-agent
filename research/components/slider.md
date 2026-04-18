---
component: slider
date: 2026-04-17
mode: --max
systems_count: 24
scope: all
---

# Slider — Research Synthesis (--max mode, all 24 systems)

## Sistemas sin componente dedicado

| System | Tier | Approach | Reason |
|--------|------|----------|--------|
| Spectrum (Adobe) | 1 | Separate `Slider` + `RangeSlider` | Different value types justify separate components |
| Twilio Paste | 2 | Not present — use NumberInput | Focus on communication/contact-center UI |
| GitHub Primer | 2 | Not present — native `input[type=range]` | Developer tools; text input for configuration values |
| REI Cedar | 2 | Not present — use Input for numeric ranges | Outdoor retail; text inputs for quantities |
| Wise Design | 2 | Not present — transfer amounts use NumberInput | Financial precision requires typed input |
| GOV.UK | 3 | Not present — motor accessibility concern | Precise drag incompatible with government's obligation to serve all motor abilities |
| Gestalt (Pinterest) | 3 | Not present — product focus | Advertising/consumer surfaces; text inputs for bid amounts |
| Evergreen (Segment) | 3 | Not present — text inputs used | Analytics dashboards use text inputs and dropdowns for config |
| Nord (Nordhealth) | 3 | Not present — clinical accuracy | Accidental drag on medication dosage field is a patient safety issue |

**Systems with dedicated component: M3 Slider + RangeSlider (T1), Carbon Slider (T1), Polaris RangeSlider (T1), Ant Design Slider (T1), Salesforce Lightning (T2), shadcn/ui Slider (T2), Playbook (T2), Dell DS (T2), Radix UI Slider (T3), Chakra UI Slider + RangeSlider (T3), Base Web Slider (T3), Fluent 2 Slider (T3), Mantine Slider + RangeSlider (T3), Orbit RangeSlider (T3)** — ~14 of 24 systems.

---

## How Systems Solve It

### Material Design 3 (Tier 1) — `Slider` + `RangeSlider`

M3 provides four slider configurations: continuous (standard), discrete (tick marks/stop indicators), centered (from midpoint for bipolar values like EQ), and range (dual-thumb as a separate `RangeSlider` class). The separate `RangeSlider` class for dual-thumb is an explicit architectural decision: dual-thumb interaction (minSeparation enforcement, two synchronized values) requires fundamentally different state logic that would cause API bloat in a unified component. Value indicator (tooltip) is optional and rendered as a Material tooltip — for subjective controls (brightness, volume), users calibrate by outcome, not number. Stop indicator tick marks auto-render when `stepSize` is set, communicating the finite option set before interaction.

**Design Decisions:**
- **`Slider` vs. `RangeSlider` as separate classes** — dual-thumb is a separate component. _Why:_ dual-thumb interaction requires minSeparation enforcement, two synchronized value outputs, and fundamentally different state. Merging them into one component with a `range` boolean would force API consumers to handle both value shapes in a union type. _Impact:_ cleaner TypeScript — `Slider` always returns `number`, `RangeSlider` always returns `Pair<number, number>`. _Para tu caso:_ adopt the same separation if type safety is a priority; use a unified API if developer simplicity matters more.
- **Optional value tooltip** — `labelBehavior: floating | within-track | gone`. _Why:_ for subjective controls (brightness, volume, opacity) users calibrate by visual outcome, not by reading a number; the tooltip adds visual noise without value for these use cases. For precise controls (percentage, price), the floating label is essential. _Impact:_ one prop controls all tooltip visibility modes. _Para tu caso:_ default to `floating` for precision inputs; default to `gone` for subjective/aesthetic inputs.
- **Tick marks auto-render when `stepSize` is set** — discrete mode activates automatically. _Why:_ if a slider has discrete stops, users need to see how many stops exist before interacting; auto-rendering communicates the finite option set. _Impact:_ no separate `showTicks` prop; discrete mode is inferred from `stepSize`. _Para tu caso:_ simplifies the API but removes the ability to have steps without ticks.
- **`setLabelFormatter()` must also set contentDescription for SR** — formatted values are not automatically announced by screen readers. _Why:_ custom label formatters like "$50" or "50%" only change the visible text; `contentDescription` must be explicitly set to announce the formatted value via screen reader. _Impact:_ known developer trap — omitting contentDescription means SR announces raw numbers despite a visible formatted label.

**Notable Props:** `app:labelBehavior` (floating|within-track|gone); `app:stepSize` (activates discrete + ticks); `app:minSeparation` (RangeSlider); `setLabelFormatter()` (custom value text + contentDescription)

**Accessibility:** Arrow keys ±1 step; Home/End to min/max; `role="slider"` + `aria-valuenow/min/max`. `setLabelFormatter()` must also set contentDescription for SR formatted value announcements.

---

### Spectrum / Adobe (Tier 1) — `Slider` + `RangeSlider`

Spectrum's defining feature is `formatOptions` using `Intl.NumberFormatOptions` — the browser's i18n formatting engine drives both the visible label AND `aria-valuetext` simultaneously. "$50.00" or "50%" formats correctly across all locales and is automatically announced by screen readers without any separate `aria-valuetext` configuration. Separate Slider (single number) and RangeSlider (`{start, end}` object) components. `isFilled`/`fillOffset` for bipolar/centered tracks (exposure, contrast controls). `trackGradient` for color-adjacent sliders (color pickers, opacity controls).

**Design Decisions:**
- **`formatOptions` with Intl.NumberFormatOptions** — locale-aware formatting that drives both visible label and aria-valuetext. _Why:_ i18n and a11y are solved in one decision; the browser's formatting engine handles currency symbols, percentage signs, and locale-specific number formats without custom code. _Impact:_ zero additional effort for internationalized accessible sliders — the most elegant value-formatting solution in Tier 1. _Para tu caso:_ use `{ style: 'percent' }` for percentage sliders; `{ style: 'currency', currency: 'USD' }` for price sliders.
- **Separate `Slider` vs. `RangeSlider`** — different value types (`number` vs. `{start, end}`) warrant separate components. _Why:_ a `range` boolean would force TypeScript union types and consumers to handle both value shapes in every event handler. Separate components provide clean type signatures. _Impact:_ consistent with M3's same architectural decision; strong consensus in Tier 1.
- **`trackGradient` for color-adjacent sliders** — the track displays a color gradient (e.g., transparent to opaque for opacity sliders). _Why:_ color picker sliders (hue, saturation, opacity) need the track to visualize the color range being selected; a single-color track has no information. _Impact:_ extends the component to color picker building blocks without requiring a custom track implementation.
- **No paired text input** — Spectrum keeps Slider and NumberField as separate concerns. _Why:_ baking an opinionated layout (slider + input side-by-side) into the component constrains how consumers arrange the UI. _Impact:_ consumer composes slider + NumberField independently. _Para tu caso:_ Carbon's mandatory paired input is the opposite trade-off; Carbon is more opinionated but requires less consumer composition.

**Notable Props:** `formatOptions` (Intl.NumberFormatOptions); `getValueLabel` (escape hatch for custom formatting); `isFilled`; `fillOffset` (center origin); `trackGradient`; `labelPosition: "top" | "side"`; `showValueLabel`; `orientation: "horizontal" | "vertical"`

**Accessibility:** Arrow keys + Page Up/Down (10% increment) + Home/End; `aria-valuetext` auto-populated from `formatOptions`/`getValueLabel`; label/aria-label enforced; each RangeSlider handle independently focusable.

---

### Carbon / IBM (Tier 1) — `Slider`

Carbon's defining feature is a mandatory paired number input kept in sync with the slider handle — the only T1 system where the input is part of the component, not composed separately. `range` prop on the same component (not a separate class) for dual-thumb with two inputs. `stepMultiplier` for Shift+Arrow large increments. No drag tooltip — the persistent input is always-visible and always-editable, strictly more informative than a transient tooltip.

**Design Decisions:**
- **Mandatory paired input** — an always-visible, always-editable number input adjacent to the slider handle. _Why:_ enterprise users often know the exact value they need; typing "73" is faster than dragging to precisely 73. The input is also an a11y fallback — if drag handles cannot be operated, users can type the value directly. _Impact:_ the most production-ready precision-input pattern in Tier 1; no consumer effort needed to add a separate input. _Para tu caso:_ the right default for enterprise contexts where exact values matter; may be overkill for subjective aesthetic controls.
- **No drag tooltip** — the persistent input already shows the value at all times. _Why:_ adding a transient tooltip over an always-visible editable field is visual redundancy; the input provides more utility (it's editable, always visible) than a tooltip (read-only, transient). _Impact:_ cleaner visual design; fewer interactive elements to maintain focus. _Para tu caso:_ if the persistent input is omitted (standalone slider), add a tooltip — it's the fallback value display.
- **`stepMultiplier` as configurable prop** — Shift+Arrow multiplies step size by this value. _Why:_ enterprise keyboard users need to cover large ranges (0–1000) without holding the arrow key for hundreds of presses; Shift+Arrow with a multiplier is the standard keyboard acceleration pattern. _Impact:_ configured explicitly rather than hardcoded to 10×; enterprise contexts need different multipliers for different range sizes. _Para tu caso:_ Carbon's most keyboard-centric feature; adopt this pattern for any enterprise-range slider.
- **`invalid`/`invalidText` for companion input** — validation error on the number input propagates to the slider. _Why:_ users can type out-of-range values in the paired input; validation feedback must appear in context, not just prevent form submission. _Impact:_ complete error flow for the slider + input combination.

**Notable Props:** `stepMultiplier` (Shift+Arrow multiplier); `value` / `min` / `max`; `invalid` / `invalidText`; `disabled` (disables both handle and input simultaneously); `range` (dual-thumb with two inputs)

**Accessibility:** Tab: input → handle(s) → second input; Arrow keys ±1 step; Shift+Arrow ±stepMultiplier steps; both handle and input independently keyboard-operable; `aria-valuenow` announces raw numbers (no `aria-valuetext`).

---

### Polaris / Shopify (Tier 1) — `RangeSlider`

Polaris names the component "RangeSlider" even for single-handle mode — "range" communicates bounded selection (a value within a range) rather than the mechanical metaphor "slider". `value` accepts `number` (single mode) or `[number, number]` (dual mode) with type-switching behavior — one component import and mental model. `prefix`/`suffix` props for unit labels flanking the slider. Optional `output` tooltip on drag. The most candid documentation of dual-thumb a11y limitations in any Tier 1 system: "multi-thumb ARIA patterns have inconsistent AT support on mobile" — with mandatory text field pairing as the documented remediation.

**Design Decisions:**
- **Single component with type-switched `value`** — `number` vs `[number, number]` determines single vs. dual mode. _Why:_ one import and mental model for both cases; Shopify app developers building one or two sliders don't benefit from choosing between two component names. _Impact:_ simpler API at the cost of less explicit typing — `value` type is a union. _Para tu caso:_ contrast with M3/Spectrum's separate component decision; the right trade-off depends on whether type safety or API simplicity is the priority.
- **Mandatory label even if hidden** — `labelHidden` visually suppresses the label while preserving the accessible name. _Why:_ accessible names are non-negotiable; hiding the label without removing it (via `display: none`) maintains the label text in the DOM for screen readers. _Impact:_ Polaris enforces this at the API level — developers must provide a label; they can choose to hide it visually. _Para tu caso:_ the correct pattern for all form controls with visual design that doesn't include a visible label.
- **Honest documentation of dual-thumb a11y gap** — explicitly states that multi-thumb ARIA patterns have inconsistent AT support on mobile. _Why:_ Polaris serves thousands of Shopify app developers; hiding this limitation would result in broken dual-thumb sliders in production apps across the ecosystem. _Impact:_ developers who read the docs pair dual-thumb sliders with text fields by default — the recommended remediation is documented alongside the limitation.

**Notable Props:** `value: number | [number, number]`; `output: boolean` (drag tooltip); `prefix` / `suffix` (unit labels); `label` / `labelHidden` (required)

**Accessibility:** Native `<input type="range">` providing `aria-valuenow/min/max` automatically. Known gap: no `aria-valuetext` formatting; units in prefix/suffix are not propagated to AT.

---

### Ant Design (Tier 1) — `Slider`

Ant Design's Slider is the most feature-complete in Tier 1. Single component with `range` prop for dual-thumb (no separate component). `marks` accepts an object mapping position (0–100) to ReactNode labels — enabling non-linear labeled scales ("Free / 100GB / 1TB") with `step={null}` for purely label-snapping discrete selection. `tooltip.formatter` for drag tooltip text. `ariaValueTextFormatterForHandle` provides per-handle `aria-valuetext` — the most explicit aria-valuetext API in Tier 1. `onChangeComplete` fires only when the user stops dragging (not on every drag event) for performance-optimized server-side update handlers. `reverse` for right-to-left fill. `keyboard` can be disabled for embed conflicts.

**Design Decisions:**
- **`range` as a prop vs. separate component** — `range` accepts boolean (basic dual-thumb) or object form (`{draggableTrack, editable, minCount, maxCount}` for advanced behaviors). _Why:_ API minimalism — one import; object form enables advanced range behaviors (draggable track, editable thumbs) without additional component variants. _Impact:_ most flexible range API in Tier 1. _Para tu caso:_ use `range={true}` for simple dual-thumb; `range={{ draggableTrack: true }}` when the track between thumbs should be draggable.
- **`marks` with ReactNode labels** — non-linear labeled scales. _Why:_ discrete labeled scales like "Free / Standard / Enterprise" or "Low / Medium / High" don't map to uniform step values; `marks` object with `step={null}` forces the thumb to snap only to labeled positions. _Impact:_ enables price-plan selectors, tier selectors, and named-position sliders without custom code. _Para tu caso:_ `marks={{ 0: 'Free', 50: 'Standard', 100: 'Enterprise' }}` with `step={null}`.
- **`ariaValueTextFormatterForHandle`** — per-handle `aria-valuetext`. _Why:_ enterprise admin contexts need "from $50" / "to $200" as the screen reader announcement, not raw numbers. The formatter accepts the handle index, enabling different text for min vs. max handles. _Impact:_ most complete SR support for formatted value announcements in Tier 1. _Para tu caso:_ always use this for monetary sliders, percentage sliders, or any value with a unit.
- **`onChangeComplete` for performance** — fires only when dragging stops. _Why:_ `onChange` fires on every drag pixel; server queries on every `onChange` event overwhelm the API. `onChangeComplete` debounces at the drag-end level rather than requiring consumer-side debouncing. _Impact:_ correct default for any slider that triggers a server request.

**Notable Props:** `range` (boolean | `{draggableTrack, editable, minCount, maxCount}`); `marks` (object mapping position → ReactNode); `tooltip.formatter`; `ariaValueTextFormatterForHandle`; `ariaLabelForHandle`; `onChangeComplete`; `reverse`; `dots`; `keyboard: boolean`

**Accessibility:** Per-handle `aria-valuetext` via formatter; per-handle `aria-label` for range ("minimum handle" / "maximum handle"); `aria-orientation` auto-set for vertical; `keyboard` can be disabled.

---

### Salesforce Lightning (Tier 2) — `Slider`

Lightning uses native `input[type=range]` with Lightning CSS styling. Simpler than custom implementations; keyboard support is automatic. `min`, `max`, `step`, `size` variants. Value display included. Used for Salesforce record page configuration fields.

---

### shadcn/ui (Tier 2) — `Slider`

Built on Radix UI Slider. Multi-thumb range via array value (`[20, 80]` = two thumbs). Fully custom visual implementation (consistent cross-browser). Separate `Range` element for independent range fill styling. `inverted` for reverse-fill direction. The go-to reference for headless Radix-based sliders with range support.

---

### Radix UI (Tier 3) — `Slider`

Headless primitive: `Slider.Root` / `Slider.Track` / `Slider.Range` / `Slider.Thumb`. Array value natively supports multi-thumb range — passing `[20, 80]` creates two independently styled thumbs. Separate `Slider.Range` element enables independent styling of the filled track portion (required for gradient fills and color picker tracks). `inverted` for right-to-left fill. All keyboard behavior and ARIA built-in. Maximum flexibility for custom styling.

---

### Chakra UI (Tier 3) — `Slider` + `RangeSlider`

Chakra splits into two components (Slider vs. RangeSlider) following the M3/Spectrum pattern. `SliderMark` for labeled tick marks at specific values — placed at arbitrary positions using `value` prop. `SliderThumb` accepts children for custom thumb content (icons, values). `colorScheme` for fill color. The `SliderMark` component is the key differentiator for labeled discrete positions.

---

### Base Web / Uber (Tier 3) — `Slider`

Single/range support via number or array value (Radix-like unified approach). `marks` prop for discrete tick positions. Overrides API for all sub-elements (track, thumb, tick, tooltip). Used for price range filtering in Uber's driver app. `onMouseLeave` explicitly supported for hover state cleanup on touch devices.

---

### Fluent 2 / Microsoft (Tier 3) — `Slider`

Office/Windows use cases: volume, zoom, brightness. Single-thumb only. `step` for discrete values. `vertical` orientation for call-control-style volume sliders. `marks` with labels. `size` prop. The reference implementation for vertical sliders in settings/call-control contexts.

---

### Mantine (Tier 3) — `Slider` + `RangeSlider`

Most complete T3 implementation. Built-in `label` prop — a formatter function (`label={(value) => `${value}%`}`) that renders a floating tooltip on the thumb during interaction. `marks` array with labeled positions. `RangeSlider` with `minRange` to prevent thumbs from crossing. Shift+Arrow for 10x step multiplier. The reference for built-in value tooltip formatter and labeled marks.

**Design Decisions:**
- **`label` prop as built-in formatter** — renders floating tooltip on drag; accepts a function. _Why:_ almost every interactive slider needs value display during drag; making this a first-class formatted prop eliminates the need for external Tooltip wiring on every slider. _Impact:_ the most practical default in T3 — teams build sliders faster with zero tooltip configuration. _Para tu caso:_ use `label={(value) => `${value}%`}` for percentage sliders; `null` to disable the tooltip.

**Notable Props:** `label: null | (value: number) => ReactNode`; `marks: {value, label}[]`; `minRange` (RangeSlider min gap); `step`; Shift+Arrow 10x multiplier built-in

---

### Orbit / Kiwi.com (Tier 3) — `RangeSlider`

Range-first slider for travel price/time/duration filtering. `valueDescription` renders a persistent text summary ("€50 – €200" or "06:00 – 22:00") below the slider that remains visible during and after interaction. Mobile-optimized. This is the reference implementation for the persistent range description pattern — superior to transient tooltips for mobile where thumbs obscure the value during drag.

---

### GOV.UK (Tier 3) — Absent (motor accessibility)

GOV.UK explicitly excludes sliders: "Sliders require precise motor control incompatible with government services' obligation to serve users with a wide range of motor abilities." Text inputs and selects are used instead. This is the strongest motor-accessibility argument against sliders in any reviewed system — government services must work for users with tremors, limited dexterity, and assistive devices for which drag interactions are unreliable.

---

### Nord (Nordhealth) — Absent (clinical safety)

Nord adds a clinical safety dimension to GOV.UK's motor accessibility argument: accidental drag on a medication dosage field is a patient safety issue. Text inputs with explicit validation are the appropriate replacement for any medical measurement or clinical parameter input.

---

## Pipeline Hints

### Archetype Recommendation

**Archetype: range-input** — A draggable control for selecting a numeric value (or pair of values) from a bounded range. Two sub-archetypes: single-thumb (one value) and range/dual-thumb (two values, min and max). The key architectural question is whether these are one component with a `range` prop or two separate components.

**Rationale:** 14 of 24 systems implement a slider. The architectural split between "single component + range prop" (Ant, Polaris, shadcn, Radix, Base Web) and "separate Slider + RangeSlider" (M3, Spectrum, Chakra, Mantine) is even. Type safety favors separate components; API simplicity favors the unified approach. GOV.UK and Nord's motor and clinical safety arguments are important context for when sliders are appropriate vs. when text inputs are the better alternative.

---

### Slot Consensus Table (systems with component: ~14)

| Slot | Description | Systems | Consensus |
|------|-------------|---------|-----------|
| `thumb` / `handle` | Draggable thumb element | All 14 | 14/14 |
| `track` | Background track line | All 14 | 14/14 |
| `range` / `fill` | Colored fill portion of track | Radix, Chakra, Spectrum, Ant | 4/14 |
| `tooltip` / `label` | Value bubble on/above thumb | M3, Ant, Polaris, Mantine | 4/14 |
| `tick` / `dot` | Step indicator marks on track | M3, Ant, Carbon, Chakra, Mantine, Orbit | 6/14 |
| `mark-label` | Text labels at tick positions | Ant, Chakra, Mantine, Fluent 2 | 4/14 |
| `prefix` | Left unit label | Polaris | 1/14 |
| `suffix` | Right unit label | Polaris | 1/14 |
| `paired-input` | Adjacent number input | Carbon | 1/14 |
| `valueDescription` | Persistent range text below track | Orbit | 1/14 |

---

### Property Consensus Table

| Property | Values Found | Systems | Consensus |
|----------|-------------|---------|-----------|
| `min` | number | All 14 | 14/14 |
| `max` | number | All 14 | 14/14 |
| `value` / `defaultValue` | number or [number, number] | All 14 | 14/14 |
| `onChange` | `(value: number) => void` | All 14 | 14/14 |
| `step` | number | All 14 | 14/14 |
| `disabled` | boolean | All 14 | 14/14 |
| `orientation` | `"horizontal" \| "vertical"` | M3, Spectrum, Ant, Fluent 2, Mantine | 5/14 |
| `marks` | boolean or `{value, label}[]` | Ant, Chakra, Base Web, Fluent 2, Mantine, Orbit | 6/14 |
| `range` | boolean or object | Ant, Polaris, Radix (array value), shadcn | 4/14 |
| `formatOptions` / `label` formatter | Intl.NumberFormatOptions / function | Spectrum, Mantine, Ant (ariaValueTextFormatterForHandle) | 3/14 |
| `labelBehavior` / `tooltip.formatter` | floating/within-track/gone or function | M3, Ant | 2/14 |
| `stepMultiplier` | number | Carbon | 1/14 |
| `reverse` / `inverted` | boolean | Ant, Radix | 2/14 |
| `onChangeComplete` | `(value) => void` | Ant | 1/14 |
| `minSeparation` / `minRange` | number | M3, Mantine | 2/14 |
| `trackGradient` | color[] | Spectrum | 1/14 |
| `prefix` / `suffix` | string/ReactNode | Polaris | 1/14 |

---

### Boolean Properties Table

| Property | Default | Systems |
|----------|---------|---------|
| `disabled` | false | All |
| `range` | false | Ant, Polaris |
| `inverted` / `reverse` | false | Radix, Ant |
| `dots` | false | Ant |
| `keyboard` | true | Ant (can disable) |
| `output` (tooltip) | false | Polaris |
| `showValueLabel` | true | Spectrum |

---

### State Coverage Table

| State | Systems | Consensus |
|-------|---------|-----------|
| default (at rest) | All 14 | 14/14 |
| hover (thumb hovered) | Most | ~12/14 |
| focused (thumb focused via keyboard) | All 14 | 14/14 |
| active / dragging | All 14 | 14/14 |
| disabled | All 14 | 14/14 |
| tooltip visible (during drag) | M3, Ant, Polaris, Mantine | 4/14 |
| at min (thumb at minimum) | All | 14/14 |
| at max (thumb at maximum) | All | 14/14 |
| invalid / error (paired input) | Carbon | 1/14 |

---

### Exclusion Patterns

- GOV.UK and Nord explicitly exclude sliders on accessibility/safety grounds — the motor accessibility argument is strongest for disability-serving or clinical contexts
- Twilio Paste, GitHub Primer, Wise, REI Cedar, Gestalt, Evergreen exclude sliders because their domains use text inputs for numeric values
- `trackGradient` for color picker tracks: only Spectrum; color picker slider fill is a building block need, not a universal slider feature
- `keyboard` disable: only Ant; needed for conflicting embed scenarios
- Mandatory paired input: only Carbon; most systems keep the input as a separate composition concern
- `ariaValueTextFormatterForHandle` per-handle: only Ant; other systems apply a single formatter

---

### Building Block Candidates

- `Thumb` — draggable handle element with `role="slider"`
- `Track` — the background rail element
- `Range` / `Fill` — the highlighted fill between origin and thumb (or between two thumbs)
- `Tick` / `Dot` — step indicator mark on track
- `MarkLabel` — text label at a specific track position
- `Tooltip` / `Bubble` — floating value display on thumb
- `NumberInput` — optional paired input for direct value entry (Carbon pattern)

---

### Enum / Configuration Properties

| Property | Options | Default |
|----------|---------|---------|
| `orientation` | `"horizontal"`, `"vertical"` | `"horizontal"` |
| `size` | `"sm"`, `"md"`, `"lg"` | `"md"` |
| `labelBehavior` / tooltip visibility | `"floating"`, `"always"`, `"gone"` | context-dependent |
| architecture | single-component (range prop), separate Slider + RangeSlider | single-component |

---

### A11y Consensus

| Aspect | Consensus |
|--------|-----------|
| **Role** | `role="slider"` on each thumb (provided by native `input[type=range]` automatically, or explicit on custom elements) |
| **ARIA** | `aria-valuenow`, `aria-valuemin`, `aria-valuemax` required; `aria-valuetext` required when value needs human-readable description (units, currency, percentage) |
| **Keyboard** | Left/Right arrows ±1 step (horizontal); Up/Down ±1 step; Page Up/Down for larger increments (~10 steps); Home/End to min/max. Shift+Arrow for large increments (Carbon `stepMultiplier`) |
| **Range thumbs** | Each thumb independently focusable; each has its own `aria-valuenow/min/max`; each should have distinct `aria-label` ("Minimum price", "Maximum price") |
| **Vertical** | `aria-orientation="vertical"` must be set on vertical sliders — without it, AT announces horizontal arrow key directions for vertical controls |
| **Tick marks** | Decorative ticks are `aria-hidden="true"`; interactive marks (click-to-snap) need click handlers but no ARIA changes |
| **Value formatting** | Spectrum's `formatOptions` + Intl.NumberFormatOptions is the gold standard — drives both visible label and `aria-valuetext` simultaneously |
| **APG Pattern** | Slider: https://www.w3.org/WAI/ARIA/apg/patterns/slider/; Slider (Multi-thumb): https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/ |
| **Motor accessibility** | GOV.UK/Nord argument: sliders are inappropriate for contexts serving users with motor disabilities; text input fallback should be available |

---

## What Everyone Agrees On

1. **`role="slider"` + `aria-valuenow/min/max` on each thumb** — the baseline ARIA contract; all 14 systems follow this (native `input[type=range]` provides it automatically).
2. **Arrow key keyboard navigation** — Left/Right for value change; Home/End for min/max — this is universal across all implementing systems.
3. **`step` prop for discrete vs. continuous** — all systems support `step` to control the increment size and discrete vs. continuous behavior.
4. **Horizontal orientation is the default** — vertical is supported by M3, Spectrum, Ant, Fluent 2, and Mantine; horizontal is the universal default.
5. **`disabled` disables both visual interaction and keyboard** — all systems honor the disabled state consistently.
6. **`aria-valuetext` is required for non-numeric values** — when the displayed value is "$50" or "50%", screen readers must announce the formatted value, not the raw number. Every system that documents `aria-valuetext` usage confirms this.
7. **Range (dual-thumb) has inherent a11y complexity** — Polaris is the only system to document this openly; the AT support inconsistency on mobile is a real limitation acknowledged across the tier research.

---

## Where They Disagree

1. **Single component with `range` prop vs. separate `Slider` + `RangeSlider`?**
   Option A (Ant, Polaris, shadcn, Radix, Base Web): `range` prop or array value on one component — simpler API, less explicit typing.
   Option B (M3, Spectrum, Chakra, Mantine): separate components — cleaner TypeScript; `Slider` always returns `number`, `RangeSlider` always returns `[number, number]`.

2. **Built-in paired number input vs. composition?**
   Option A (Carbon): mandatory paired input is part of the Slider component — most production-ready for precision entry.
   Option B (all others): paired input is composed separately by the consumer — less opinionated about layout.

3. **`formatOptions` (i18n engine) vs. formatter function?**
   Option A (Spectrum): `formatOptions: Intl.NumberFormatOptions` — browser's i18n engine formats AND drives `aria-valuetext`. Zero localization effort.
   Option B (Ant, Mantine): `formatter: (value) => string` — custom function; maximum flexibility; requires manual i18n handling.
   Option C (most): no built-in value formatting; `aria-valuetext` requires explicit consumer implementation.

4. **Tooltip visibility: optional vs. always-on vs. none?**
   Option A (M3): `labelBehavior` prop — floating, within-track, or gone.
   Option B (Carbon): no tooltip — persistent input is always more useful.
   Option C (Ant, Mantine): `tooltip.formatter` / `label` function — tooltip visible on hover/drag; off by default.

5. **Shift+Arrow acceleration: built-in or not?**
   Option A (Carbon with `stepMultiplier`, Spectrum with Page Up/Down): large-increment keyboard navigation built into the component.
   Option B (most T3): only standard ±1 step arrow navigation; Shift+Arrow acceleration not built in.

6. **Marks: boolean (auto-render at each step) vs. object (arbitrary positions) vs. array (labeled positions)?**
   Option A (M3, Ant with `dots: true`): boolean enables marks at every step.
   Option B (Ant, Mantine): `marks` object/array with custom positions and labels.
   Option C (Fluent 2): `marks` array with labeled positions at specific values.

---

## Visual Patterns Found

### Continuous slider (most common)

```
┌────────────────────────────────────────────────────────────┐
│  Volume                                        65%         │
│                                                            │
│  ──────────────────────────────●───────────────            │
│  0                             ↑                    100    │
│                              thumb (draggable)             │
└────────────────────────────────────────────────────────────┘
```

### With floating value tooltip (M3 floating, Mantine label)

```
┌────────────────────────────────────────────────────────────┐
│                              ┌─────┐                       │
│                              │ 65% │                       │
│                              └──┬──┘                       │
│  ──────────────────────────────●───────────────            │
│  0                                                   100   │
└────────────────────────────────────────────────────────────┘
```

### Discrete with tick marks

```
┌────────────────────────────────────────────────────────────┐
│  Steps                                                     │
│  ──────●───┼───┼───┼───┼───┼───┼───┼───┼────              │
│  1     2   3   4   5   6   7   8   9   10                  │
│        ↑ ticks at each step position                       │
└────────────────────────────────────────────────────────────┘
```

### Range (dual-thumb) with persistent description (Orbit pattern)

```
┌────────────────────────────────────────────────────────────┐
│  Price                                                     │
│  ────────●──────────────────────────────●────              │
│  $0      ↑ min thumb                    ↑ max thumb  $500  │
│                                                            │
│  Selected: $50 – $350   ← valueDescription (always visible)│
└────────────────────────────────────────────────────────────┘
```

### With paired input (Carbon)

```
┌────────────────────────────────────────────────────────────┐
│  ┌─────┐                                                   │
│  │  65 │  ──────────────────────────────●─────────────    │
│  └─────┘  0                                          100   │
│  ↑ number input (always editable)                          │
└────────────────────────────────────────────────────────────┘
```

### Vertical orientation (Fluent 2, M3, Ant)

```
  100 ─
       │
       │
   65  ● ← thumb
       │
       │
     0 ─
Volume (call control, equalizer)
```

### Non-linear marks scale (Ant `marks` + `step={null}`)

```
┌────────────────────────────────────────────────────────────┐
│  Storage plan                                              │
│  ●──────────────────────────────────────────────           │
│  Free         100GB          500GB          1TB            │
│  ↑ snap positions only (step={null}, marks only)           │
└────────────────────────────────────────────────────────────┘
```

---

## Risks to Consider

| Risk | Severity | Notes |
|------|----------|-------|
| Missing `aria-valuetext` for formatted values | HIGH | Screen readers announce `aria-valuenow` (raw number) by default. A price slider showing "$50" must also have `aria-valuetext="$50"` or the SR user hears "50" with no currency context. Spectrum's `formatOptions` solves this automatically; all other systems require explicit consumer implementation. |
| Range slider a11y on mobile | HIGH | Multi-thumb sliders have inconsistent AT support on mobile (documented by Polaris). Each thumb needs an independent accessible name ("Minimum price handle", "Maximum price handle") and independent keyboard operability. Test with real screen readers on iOS/Android before shipping. |
| Missing motor accessibility fallback | MEDIUM | GOV.UK and Nord's absence is a signal: for disability-serving contexts, clinical software, or any surface where motor precision cannot be assumed, provide a text input fallback. Consider whether to include a `showInput` prop (Carbon pattern) or document that consumers should compose with NumberInput. |
| `aria-valuetext` missing for vertical sliders | MEDIUM | Vertical sliders without `aria-orientation="vertical"` cause screen readers to announce "left arrow" and "right arrow" for Up/Down navigation. Set `aria-orientation="vertical"` automatically when `orientation="vertical"`. |
| Accidental value change on scroll | LOW | On mobile, scrolling a page may inadvertently change a slider value if the touch event target is the slider thumb. This is a known touch interaction problem that requires `touch-action: none` on the thumb element and `stopPropagation` on touch events. |

---

## Next Steps

1. **Decide single vs. dual component for range** — lock this in early; it affects TypeScript types, value shape, and API design. If type safety is a priority (TypeScript-first design system), use separate `Slider` + `RangeSlider`. If simplicity is the priority, use one component with array/number value switching.
2. **Implement `aria-valuetext` with a formatter prop** — follow either Spectrum's `formatOptions` (best for multi-locale) or Mantine/Ant's `label`/`formatter` function. Make it easy to pass "$50" instead of "50" to screen readers.
3. **Add Shift+Arrow acceleration** — Carbon's `stepMultiplier` pattern covers large-range sliders that would otherwise require holding the arrow key for hundreds of presses; include a sensible default multiplier (10) with a configurable prop.
4. **Decide on built-in tooltip vs. composition** — Mantine's `label` prop (formatter function → floating tooltip) is the most practical default for precision sliders; Carbon's no-tooltip + mandatory input is the most practical for enterprise. Choose based on your primary use case.
5. **Plan `marks` API** — if labeled tick marks or non-linear scales are in scope, design the `marks` prop shape early (boolean, array, or object); it affects the track rendering architecture.
