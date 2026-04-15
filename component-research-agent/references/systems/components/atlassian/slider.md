---
system: Atlassian Design System
component: Range
url: https://atlassian.design/components/range/
last_verified: 2026-03-28
---

# Range

## Approach
Atlassian Design System names its slider component "Range" rather than "Slider" — a deliberate choice that aligns with the underlying HTML primitive (`<input type="range">`) and communicates the control's semantic nature: selecting a value within a range. Atlassian's product suite (Jira, Confluence, Trello, Bitbucket) primarily uses sliders in configuration contexts — sprint velocity settings, issue priority weighting, notification thresholds — where the "range" metaphor is more descriptive than the mechanical "slider" metaphor. The component is intentionally minimal. Atlassian's design system philosophy favors composability over all-in-one components; the Range component does one thing — provides a styled, accessible range input — and teams compose it with other primitives (labels, text fields, helper text) as needed. The Range component ships as a single-thumb control only; there is no dual-thumb mode built in. This is a deliberate scope decision reflecting that dual-thumb selection patterns in Atlassian's products are handled through specialized components or custom implementations in product teams rather than being baked into the base design system.

## Key Decisions
1. **Named "Range" after the HTML primitive** (HIGH) — Calling the component `Range` (not `Slider`) reflects Atlassian's stance that component names should map to their semantic HTML counterparts where possible. This makes the component's underlying implementation transparent to developers — it is fundamentally an `<input type="range">` with Atlassian's design tokens applied. It also avoids creating a mental model gap between what the component is called and what the browser understands.

2. **Single-thumb only; no dual-thumb mode** (HIGH) — Atlassian's Range component supports only single-value selection. The decision is rooted in Atlassian's product audit: the vast majority of slider use cases in Jira and Confluence involve single-value configuration (e.g., a story point estimate, a confidence percentage). Dual-thumb range selection is rare enough in Atlassian's product context that it does not warrant a standardized component — product teams implement range filtering using separate min/max inputs or dedicated filter components instead.

3. **Minimal API surface** (MEDIUM) — The component exposes `min`, `max`, `step`, `value`, `defaultValue`, and `onChange` — and little else. There is no built-in tooltip, no tick mark visualization, no paired input. This minimalism is intentional: Atlassian's design system serves a large number of engineering teams across many products, and an overly opinionated component imposes layout and behavioral choices that may conflict with product-specific needs. Composability is preferred over convenience.

4. **ADS accessibility-first culture** (HIGH) — Atlassian's design system team has a dedicated accessibility function with an explicit mandate spanning components, tooling, and design foundations. The Range component ships with built-in keyboard support and ARIA attributes as non-negotiable baseline requirements, not optional enhancements. This reflects a 2023–2025 organizational initiative that resolved over 6,000 accessibility issues across Atlassian's product suite — the Range component benefits from this systemic approach rather than case-by-case a11y bolting.

5. **No value display mechanism** (LOW) — The component does not show the current value anywhere — no tooltip, no adjacent label, no persistent display. This is consistent with the composability philosophy: if a product needs to show the current value, it should render its own value display element and update it via the `onChange` callback. Atlassian does not want to impose a value-display pattern that may conflict with the product's specific layout or design language.

## Notable Props
- `min`, `max`: Required bounds for the range — no defaults documented, reflecting the component's semantic intention that developers must explicitly define the range rather than accepting implicit 0–100 defaults.
- `step`: Controls granularity of the selection; when set, the input snaps to multiples of `step` from `min`. No tick mark visualization is rendered automatically.
- `onChange`: Fires on every value change during drag; returns the raw numeric value for the consuming component to handle display, validation, or persistence.
- `value` / `defaultValue`: Standard controlled/uncontrolled pattern consistent with Atlassian's React component conventions.
- `isDisabled`: Follows Atlassian's boolean prop naming convention (vs. `disabled` in native HTML), aligning with the design system's component API standards.

## A11y Highlights
- **Keyboard**: Arrow keys (left/right for horizontal orientation) increment/decrement the value by one step. Home and End jump to min and max respectively. The component inherits these behaviors from the native `<input type="range">` element, ensuring consistent cross-browser keyboard support without custom key handler implementation.
- **Screen reader**: The accessible name is provided via an associated `<label>` element (which must be wired by the consuming team, as the Range component does not render a built-in label). The current value is announced via `aria-valuenow` on change. Because the component uses native `<input type="range">`, screen readers read the value as the raw number — there is no `aria-valuetext` formatting mechanism built into the component.
- **ARIA**: Uses native `<input type="range">` which provides `role="slider"`, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` automatically. No custom ARIA is added beyond what the native element provides. `aria-valuetext` is not set by the component; teams needing contextual value announcements (e.g., "50 percent") must set it via a `ref` or wrapper.

## Strengths & Gaps
- **Best at**: Clean, minimal native-HTML-first implementation with guaranteed cross-browser and cross-AT keyboard support and zero behavioral surprises — composable into any product context.
- **Missing**: No `aria-valuetext` support, no value display mechanism, and no dual-thumb mode — teams with range-selection or formatted-announcement needs must build these entirely outside the component.
