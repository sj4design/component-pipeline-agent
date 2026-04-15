---
component: Timeline
tier: 3
last_verified: 2026-03-31
---

# Timeline — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Not available — no primitive | No timeline primitive; no dedicated WAI-ARIA role for timelines exists; composition from layout primitives (Flex, Box) + `<ol>` expected; CSS-only connector lines between items. | high |
| Chakra UI | Timeline (v3) | Added in v3: vertical connector line with dot indicators; `Timeline.Root`, `Timeline.Item`, `Timeline.Connector`, `Timeline.Content` compound pattern; no horizontal mode; no built-in status colors. | medium |
| GOV.UK | Not available — different pattern scope | No timeline component; government transaction histories use summary lists and tables; GOV.UK's step-by-step navigation pattern serves journey orchestration, not activity history display. | high |
| Base Web | Not available — list-based patterns | No component; Uber's trip history and activity feeds are product-specific implementations using styled list patterns; no design system timeline abstraction. | high |
| Fluent 2 | TimeLine (preview) | Preview/experimental status; vertical activity feed for Microsoft 365 activity; items with actor avatar, timestamp, and description; connector line between items; not yet stable API. | medium |
| Gestalt | Not available — feed-based patterns | No component; Pinterest uses feed/grid patterns for content discovery; activity notifications use a flat list without timeline visual metaphor. | high |
| Mantine | Timeline | Full-featured: vertical with connector line; `active` prop sets how many items are "completed" (line fills to that point); custom bullet icons via `bullet` prop; per-item colors; `lineVariant` (solid/dashed); `reverseActive` for bottom-up fill. | high |
| Orbit | Timeline | Travel itinerary display; vertical connector with status-colored dots (success/warning/critical/info); `TimelineStep` with `label`, `subLabel`, and `type` for status; designed for flight/booking event sequences. | high |
| Evergreen | Not available — no activity pattern | No component; Segment's dashboard activity uses custom log views; timeline visual metaphor not used in analytics product context. | high |
| Nord | Not available — clinical workflow focus | No timeline component; Nord's clinical workflow patterns use Steps for sequential processes and structured data displays for patient history; activity log not a primary pattern in healthcare SaaS. | high |

## Key Decision Patterns

The central architectural distinction in T3 timeline components is active-line-fill versus status-per-item. Mantine's Timeline uses an `active` prop that determines how far down the connector line is "filled" (colored) — items at or before the active index have a filled connector, items after have an unfilled/gray connector. This creates a visual sense of progression through the timeline, making it suitable for both historical activity logs and in-progress sequences. Orbit's Timeline takes the opposite approach: each `TimelineStep` has its own `type` (success, warning, critical, info) that independently colors its dot and segment, with no concept of a global "active" position. The per-item approach is better for event histories where each event has independent status (a deployment succeeded, a test failed, a review is pending). The active-line approach is better for processes with a clear "current position" (an order moving through fulfillment stages).

Mantine's Timeline is the most design-system-complete implementation in the T3 set and one of the strongest timeline implementations across all tiers. Beyond the `active` prop, it offers `lineVariant` (solid, dashed, dotted) for visual differentiation between confirmed and tentative event connections, custom `bullet` nodes per item (icons, avatars, status indicators), configurable `bulletSize` and `lineWidth`, and a `reverseActive` prop that fills the line from the bottom up — useful for "newest first" timelines where the most recent event is at the top. The compound component pattern (`Timeline` > `Timeline.Item`) with explicit connector customization makes it the reference implementation for timeline as a design system component.

Orbit's naming and domain specificity parallel its approach to Steps. The `TimelineStep` subcomponent uses travel-domain terminology: `label` for the event name, `subLabel` for details, and `type` mapped to travel booking states (success = confirmed, warning = schedule change, critical = cancellation). The vertical connector with colored dots creates a flight itinerary visual that Kiwi.com passengers immediately understand. This domain-driven design means the component API is clean and purposeful but may need abstraction for non-travel contexts.

Chakra UI's v3 Timeline demonstrates the compound component composition approach: `Timeline.Root` > `Timeline.Item` > (`Timeline.Connector` + `Timeline.Content`). The explicit `Timeline.Connector` as a separate composable piece allows consumers to customize or omit the connector line per item — useful for timelines with logical breaks (date separators, section dividers). However, Chakra's implementation is minimal compared to Mantine: no built-in status colors, no active-line-fill, and no horizontal orientation.

The absence of timeline components in Radix, GOV.UK, Base Web, Gestalt, Evergreen, and Nord reflects the component's domain specificity. Unlike buttons, modals, or selects that appear in virtually every application, timelines are concentrated in specific product domains: CRM activity (Salesforce), developer tools (GitHub), e-commerce order tracking (Shopify/eBay), travel itineraries (Kiwi.com), and deployment logs. Systems serving products outside these domains (design tools, analytics dashboards, content discovery platforms, government services, healthcare) encounter timelines too infrequently to justify standardization.

## A11y Consensus

- The timeline container should use `<ol>` when chronological order is semantically meaningful (most cases) or `<ul>` when events are logically unordered, with a descriptive `aria-label` (e.g., "Order activity timeline", "Deployment history").
- Timestamps must use `<time datetime="ISO-8601">` elements for machine readability — screen readers and assistive technology can interpret and reformat dates when the `datetime` attribute is present.
- Status indicators (colored dots, icons) that convey event status (success, error, warning) must have text alternatives — visually-hidden text or `aria-label` on the indicator element. Color alone is insufficient per WCAG 1.4.1.
- Connector lines are decorative and should be hidden from the accessibility tree (`aria-hidden="true"` or CSS pseudo-elements) — they provide visual continuity but carry no semantic meaning.
- For dynamically-loaded timelines (infinite scroll, "load more"), new items should be announced via `aria-live="polite"` on a status region ("5 new events loaded") rather than on the list itself — announcing each individual item would be overwhelming.
- Interactive timeline items (expandable details, action buttons) follow standard interactive element patterns: `aria-expanded` for expandable items, focus management for newly revealed content.

## Recommended Use

Reference T3 timeline approaches when deciding on active-line-fill versus status-per-item architecture, connector customization, and domain-specific naming. Mantine's Timeline is the reference for the most complete design system timeline implementation with active-line progression, custom bullets, line variants, and reverse-active mode. Orbit's Timeline is the reference for domain-driven timeline design with per-item status types mapped to business states. Chakra's Timeline (v3) demonstrates the compound component composition approach with explicit connector separation. Fluent 2's experimental TimeLine is worth tracking for enterprise activity feed patterns. For systems without a timeline component, build custom using `<ol>` + CSS connector lines + status-colored dot indicators, ensuring all status information has text alternatives.
