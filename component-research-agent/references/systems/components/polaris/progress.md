---
system: Polaris (Shopify)
component: ProgressBar
url: https://polaris.shopify.com/components/progress-bar
last_verified: 2026-03-28
---

# ProgressBar

## Approach
Shopify Polaris designs its ProgressBar to serve a specific, constrained merchant context: showing completion of background operations that merchants need to monitor but cannot directly control — bulk product imports, CSV uploads, theme publishing, order syncing. The philosophy is deliberately scoped. Polaris does not try to be a general-purpose progress solution; the component's documentation explicitly positions it as appropriate for "tasks with moderate load times" where a skeleton screen would be premature but a full loading state would be excessive. This context-awareness shapes every API decision: the prop surface is intentionally small, and the component does not expose low-level customization because Shopify's merchants see a consistent, predictable admin UI — not a customized experience per merchant app.

Polaris makes semantic color a first-class feature through its `tone` prop. Progress bars in the admin carry meaning: a green tone signals successful completion or a positive metric, a critical red tone signals a problem, and highlight/primary tones handle neutral progress. This reflects Shopify's merchant-facing design principle that color should communicate, not just decorate. The `animated` prop acknowledges that not all progress bar instances are live — sometimes you show a snapshot of progress after the fact (e.g., showing last month's fulfillment rate), and animation in that context would be misleading, implying the value is still changing.

## Key Decisions
1. **Four semantic tones** (HIGH) — `highlight`, `primary`, `success`, `critical`. Rather than exposing raw color customization, Polaris maps colors to intent. The WHY: merchant-facing UIs need color to communicate state, not brand. An app developer should not be able to make a progress bar magenta; they should choose from meanings. This constrains the design space in exchange for semantic consistency across all merchant apps in the Shopify ecosystem. It also prevents accessibility failures from arbitrary color choices.

2. **`animated` prop defaults to true** (MEDIUM) — The fill animates in by default. The prop exists as an explicit opt-out rather than opt-in. The WHY: most progress bar use cases in Shopify's admin involve live, changing values where animation communicates dynamism. But static display cases exist (analytics summaries, reporting dashboards showing historical data), and in those contexts, animation is misleading — it implies the metric is currently changing when it's not. Making animation opt-out rather than opt-in reflects the primary use case while acknowledging the edge case.

3. **Three sizes** (MEDIUM) — `small`, `medium` (default), `large`. The size controls the track height, which in turn controls visual prominence. Small fits into dense data tables alongside text and numbers; large is appropriate for full-width page-level progress (e.g., a setup checklist). The WHY: Shopify's admin has extreme layout density variation — from simple storefront setup flows to multi-column analytics views — and a single size would either overwhelm data-dense views or be invisible in spacious ones.

4. **`ariaLabelledBy` instead of a label prop** (HIGH) — Polaris provides `ariaLabelledBy` (accepting a DOM element ID) rather than a `label` text prop. This forces the progress bar to be associated with an existing label element in the surrounding layout, rather than rendering its own label. The WHY: Shopify admin pages always have descriptive section headings or accompanying text near a progress bar. Rather than duplicating that text as a hidden label inside the component, the approach references the already-visible label. This avoids redundant announcements for screen reader users who would otherwise hear the same text twice.

5. **Determinate-only** (MEDIUM) — Polaris ProgressBar does not have an indeterminate state. If you need to show unknown-duration loading, Polaris expects you to use a Spinner component instead. The WHY: Shopify made a deliberate component split between "we know the progress" (ProgressBar) and "we don't know the progress" (Spinner). Combining both in one component was rejected because the indeterminate animation is perceptually very different from a filling bar, and conflating them encourages lazy use of indeterminate when a determinate bar could be used.

## Notable Props
- `progress` (number, default 0): The completion percentage (0–100). The only required data prop.
- `size` ('small' | 'medium' | 'large'): Track height / visual prominence.
- `tone` ('highlight' | 'primary' | 'success' | 'critical'): Semantic color — the most distinctive Polaris-specific prop.
- `animated` (boolean, default true): Whether the fill transition animates. Set to false for static snapshots.
- `ariaLabelledBy` (string): ID of an existing label element. Required for screen reader accessibility.

## A11y Highlights
- **Keyboard**: Not interactive; never receives focus. No keyboard behavior defined or needed.
- **Screen reader**: Uses `role="progressbar"` with `aria-valuenow` derived from the `progress` prop, and standard `aria-valuemin="0"` / `aria-valuemax="100"`. The `ariaLabelledBy` prop connects the progressbar to an existing visible label element, ensuring the screen reader announces "Import progress: 45%" rather than just "45%". This approach avoids hidden-label anti-patterns by requiring a real visible label in the DOM.
- **ARIA**: No indeterminate state means `aria-valuenow` is always present. The `tone` prop changes visual color only and has no ARIA representation — semantic status (e.g., "critical") is communicated visually but not to screen readers, which is a gap.

## Strengths & Gaps
- **Best at**: Semantic color intent through the `tone` system — the cleanest mapping of visual color to design meaning of any Tier 1 system, with zero risk of arbitrary color misuse.
- **Missing**: No indeterminate state and no built-in label rendering — the component assumes a label already exists in the surrounding layout, which requires more careful page composition from developers.
