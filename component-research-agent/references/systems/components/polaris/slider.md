---
system: Polaris (Shopify)
component: RangeSlider
url: https://polaris.shopify.com/components/selection-and-input/range-slider
last_verified: 2026-03-28
---

# RangeSlider

## Approach
Polaris makes a distinctive naming choice: the component is called `RangeSlider` even when it has a single handle. This is not an oversight — it reflects Shopify's merchant-first philosophy. In the Shopify admin and merchant tooling context, sliders nearly always appear in settings that have a bounded range (e.g., "discount percentage: 0–100", "shipping weight: 0–50 kg"). The word "range" communicates the core concept — selecting within bounded limits — rather than the mechanical metaphor of a sliding thumb. The component supports both a `number` value (single handle) and a `[number, number]` tuple value (dual handle) through the same prop interface, using the value's type to switch modes. This unified API means merchants and developers deal with one component regardless of whether the use case is single or range selection. Polaris explicitly recommends pairing dual-thumb sliders with text field inputs to address screen reader limitations, recognizing that multi-thumb ARIA patterns are inconsistently supported across assistive technologies.

## Key Decisions
1. **Named RangeSlider for single and dual modes** (HIGH) — Shopify named this component `RangeSlider` rather than `Slider` to emphasize that all sliders in the Polaris context represent bounded-range selection. This naming decision communicates intent to developers: if you're using this, you are accepting a value within a defined range. The dual-thumb mode is activated purely by passing a `[number, number]` tuple to `value` — no separate component, no boolean prop. This keeps the import surface minimal for Shopify app developers who are typically building one or two slider instances.

2. **Required label, even if hidden** (HIGH) — Polaris mandates a `label` prop for all slider instances, even if visually hidden via `labelHidden`. The rationale is unambiguous: screen readers need a label to identify the control's purpose, and Polaris enforces this at the component API level rather than relying on developer discipline. A slider without a label is not a valid Polaris component. This reflects Shopify's strong commitment to accessible storefronts, where assistive technology users are potential customers.

3. **Optional `output` tooltip during drag** (MEDIUM) — The `output` boolean controls whether a tooltip bubble showing the current value appears above the thumb during drag. This is opt-in rather than default because Polaris's merchant interfaces tend to be form-like, where the value is likely displayed nearby in context (e.g., a price display updates as the slider moves). The tooltip is considered supplementary feedback, not the primary value display mechanism.

4. **Dual-thumb requires paired text fields** (HIGH) — Polaris documentation explicitly states that range sliders with dual thumbs "always be used with two text field components." The reason is technical and accessibility-driven: multi-thumb ARIA slider patterns are not consistently supported by screen readers, especially on mobile devices. The text fields provide an accessible fallback that is universally supported — keyboard users and screen reader users can bypass the drag handles entirely and type values directly. This is the most candid admission among Tier 1 systems of the a11y limitations of dual-thumb sliders.

5. **Track-click moves nearest thumb** (MEDIUM) — Clicking the slider track moves the nearest thumb to that position rather than requiring precise thumb targeting. For dual-thumb sliders where both thumbs might be close together, the nearest-thumb heuristic is essential — without it, clicking the track near the center would be ambiguous. This interaction detail reflects Polaris's emphasis on merchant productivity: quick, approximate adjustments should be as easy as possible.

## Notable Props
- `value`: Accepts `number` (single mode) or `[number, number]` (dual mode) — the type itself controls the rendered mode, eliminating any explicit mode prop.
- `output`: Boolean toggle for the drag tooltip; when `true`, current value displays above the thumb during interaction.
- `prefix` / `suffix`: ReactNode slots flanking the slider, typically used for unit labels ("$", "kg", "%") or icon anchors. Shopify's merchant context frequently requires currency and unit context adjacent to inputs.
- `label` / `labelHidden`: Required label; `labelHidden` allows visual suppression while preserving the accessible name for screen readers.
- `min`, `max`, `step`: Core range configuration; `step` creates discrete snap points without visual tick marks.

## A11y Highlights
- **Keyboard**: Tab and Shift+Tab manage focus. Arrow keys (up/down/left/right) move the focused thumb one step in the corresponding direction. There is no documented Shift+Arrow large-increment behavior (unlike Carbon).
- **Screen reader**: Single-thumb mode uses the standard ARIA 1.1 slider pattern; the `label` prop value is announced on focus. Dual-thumb mode is explicitly flagged as having inconsistent screen reader support, particularly on mobile — this is why text field pairing is mandatory for the range variant.
- **ARIA**: Built on native `<input type="range">`, which provides `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` automatically. Custom `aria-valuetext` is not explicitly documented, meaning screen readers announce the raw numeric `aria-valuenow` without unit context unless the developer adds it manually.

## Strengths & Gaps
- **Best at**: Honest documentation of dual-thumb a11y limitations and a clear remediation pattern (mandatory text field pairing) — the most transparent treatment of this known accessibility gap among Tier 1 systems.
- **Missing**: No `aria-valuetext` or value formatting API for screen reader announcements; units and context visible in `prefix`/`suffix` are not automatically propagated to assistive technology.
