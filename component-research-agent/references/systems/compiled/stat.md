---
component: stat
compiled: 2026-03-31
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Stat — All Systems Digest

## Material Design 3
**Approach**: No dedicated Stat/Metric component. Dashboard-style numeric displays are built by composing Card + Typography tokens. M3 focuses on atomic primitives; the assumption is that teams compose metric displays from existing building blocks (headline typography for value, body for label, color tokens for semantic meaning).
**Key decisions**:
- No dedicated component; M3's philosophy is that stat displays are product-specific compositions — a shopping app's revenue card differs structurally from a fitness tracker's step count, so prescribing one layout would be too opinionated
- Typography scale handles hierarchy; Display/Headline for the big number, Body for label, Label for secondary metadata — the type system IS the stat component's visual hierarchy
- Color tokens for semantic trend; M3's color roles (primary, error, tertiary) can encode positive/negative trends without a dedicated trend API
**Notable API**: No component API — teams compose using Card, Typography (displayLarge/headlineMedium/bodySmall), and color role tokens
**A11y**: No specific stat guidance; relies on semantic HTML heading hierarchy and meaningful content ordering within composed cards.
**Best at**: Flexible composition from a robust token system that adapts to any metric display need. **Missing**: No stat component, no trend indicator, no built-in number formatting or animation.

## Spectrum (Adobe)
**Approach**: No dedicated Stat/Metric component. Adobe's analytics products (Analytics, Target) use internal metric display patterns not published in Spectrum. Closest public primitive is Meter (bar fill for known-range values) combined with custom headline typography for the number. StatusLight can supplement trend indication.
**Key decisions**:
- Meter covers bounded metrics (0-100%); Adobe's analytics tools need bounded KPIs (conversion rate, page load score) more often than unbounded counts — Meter handles this natively
- No unbounded stat display; Adobe's public DS doesn't prescribe how to show "1.2M page views" because each product contextualizes that number differently (comparison periods, segmentation, attribution models)
- StatusLight for trend semantics; positive/negative/notice variants can sit alongside a custom metric display to communicate direction
**Notable API**: Meter `value`, `variant` (positive|warning|critical), `label`; no stat-specific props
**A11y**: Meter uses `role="meter"` with aria-valuenow/min/max; no stat-specific ARIA pattern documented.
**Best at**: Bounded metric visualization via Meter with semantic variants. **Missing**: No stat component, no trend arrow, no prefix/suffix, no number formatting, no comparison period display.

## Carbon (IBM)
**Approach**: No dedicated Stat component but provides a well-documented "Metric" pattern within its dashboard layout guidance. IBM recommends composing stats using the Tile component (clickable or static) containing structured content: a label, a prominent number, and optional trend/sparkline. The Data Visualization library includes number formatting utilities.
**Key decisions**:
- Tile-based composition; IBM's enterprise dashboards need metric cards that can be clickable (drill-down to detail) or static — Tile variants handle both interaction models without a new component
- Dashboard layout patterns prescribe metric grouping; Carbon's grid system defines a "metric row" pattern with 2/3/4-up configurations that handle responsive breakpoints for dashboard KPI strips
- Data visualization utilities for formatting; large numbers get abbreviated (1.2K, 3.4M) via shared formatting functions used by both charts and stat displays — consistency across visualizations
**Notable API**: Tile `light`/`clickable` props; no stat-specific API; formatting via @carbon/charts utilities
**A11y**: Clickable tiles use `role="button"`; static tiles are semantic `<div>` with heading hierarchy; no `role="status"` for live-updating metrics.
**Best at**: Enterprise dashboard composition patterns with Tile + grid layout guidance for metric rows. **Missing**: No dedicated stat component, no trend indicator, no prefix/suffix props, no loading skeleton for stat values.

## Polaris (Shopify)
**Approach**: No dedicated Stat component but Shopify's admin extensively uses metric displays. The recommended pattern uses Card + vertical stack with Text components for label/value. Polaris provides the `Text` component with `variant="headingXl"` for prominent numbers and `tone` (success/critical/caution) for trend coloring. IndexTable summary rows show aggregated stats.
**Key decisions**:
- Merchant metrics are always contextual; Shopify decided against a generic Stat component because every merchant metric (revenue, orders, conversion rate) needs unique formatting, comparison logic, and drill-down behavior that a generic component couldn't capture
- `tone` on Text handles trend semantics; success=positive trend, critical=negative trend — reuses the same semantic system as alerts and badges rather than introducing stat-specific color logic
- Sparkline via Polaris Viz; trend visualization is handled by the separate Polaris Viz library (SparkLineChart, SparkBarChart) which can be composed inside Cards alongside metric text
**Notable API**: Text `variant` (headingXl for value, bodySm for label), `tone` (success|critical|caution); SparkLineChart from @shopify/polaris-viz
**A11y**: Text components render semantic HTML; no stat-specific ARIA; Polaris Viz charts include alt text descriptions for trend data.
**Best at**: E-commerce metric patterns with tone-based trend semantics and dedicated SparkLine visualization library. **Missing**: No stat component, no built-in trend arrow, no comparison period pattern, no number abbreviation utility.

## Atlassian
**Approach**: No dedicated Stat component. Jira/Confluence dashboards compose metrics using a combination of Heading (the number), Text (label), and Lozenge or Badge for supplementary indicators. The "Dashboard gadget" pattern in Atlassian's product guidelines describes metric card layouts but no reusable component is published in the DS.
**Key decisions**:
- Dashboard gadgets are product-level patterns, not DS components; Jira's "Assigned to Me" count and Confluence's "Page Views" metric have fundamentally different interaction models — Atlassian keeps these as product patterns rather than abstracting prematurely
- Lozenge for trend/status context; a Lozenge ("moved" appearance for increase, "removed" for decrease) sits beside the metric value to communicate change direction using the existing status vocabulary
- Badge for counts; when the stat IS a count (unresolved issues, unread notifications), Atlassian's Badge component with configurable `max` handles the display directly
**Notable API**: Heading `level`/`size` for metric value; Lozenge `appearance` for trend context; Badge `max` for count display
**A11y**: Heading hierarchy provides semantic structure; Lozenge text announces trend; no live region for real-time metric updates.
**Best at**: Leveraging existing Badge/Lozenge system to add context to metric values without a new component. **Missing**: No stat component, no trend percentage, no sparkline, no metric grouping pattern, no number formatting.

## Ant Design
**Approach**: The most feature-complete stat component among all Tier 1 systems. `Statistic` is a dedicated first-class component with `title` (label), `value` (number or string), `prefix`/`suffix` (icons or text), `precision` (decimal places), `formatter` (custom number formatting), `groupSeparator`, and a `Statistic.Countdown` sub-component for time-based metrics. Pairs with Card for visual containment.
**Key decisions**:
- Dedicated component with rich formatting API; Ant Design serves Chinese enterprise dashboards where KPI displays are a primary pattern — every admin panel has a stat row, so a first-class component eliminates repeated composition
- `prefix`/`suffix` slots for trend indicators; a trend arrow icon in prefix + percentage in suffix creates the standard "↑ 12.5%" trend pattern without custom layout — Ant prescribes the pattern through slot composition
- `Statistic.Countdown` sub-component; time-limited promotions and deadline tracking are core e-commerce patterns — countdown shares the same visual language as Statistic but adds `onFinish` callback and automatic value updates
- `formatter` prop for localization; number formatting varies dramatically across locales (1,234.56 vs 1.234,56) — formatter prop gives full control without breaking the component's layout assumptions
**Notable API**: `title`; `value` (number|string); `prefix`; `suffix`; `precision`; `formatter`; `groupSeparator`; `valueStyle`; `loading`; `Statistic.Countdown` with `onFinish`
**A11y**: No dedicated ARIA roles; title renders as label text above value; no `role="status"` for live updates; Countdown has no aria-live announcement on completion — a11y responsibility is on the implementing team.
**Best at**: Most complete stat implementation — formatting, prefix/suffix, countdown, loading state, precision control. The reference implementation for any DS building a Stat component. **Missing**: No built-in trend component (must compose with icons), no comparison period display, no sparkline, no semantic color for positive/negative trends.
