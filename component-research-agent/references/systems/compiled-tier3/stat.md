---
component: Stat
tier: 3
last_verified: 2026-03-31
---

# Stat — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | No dedicated component | Radix provides unstyled primitives; no Stat component. Teams compose from Text + Heading + Flex. No dashboard patterns documented. | medium |
| Chakra UI | Stat / StatLabel / StatNumber / StatHelpText / StatArrow / StatGroup | Full Stat component family with dedicated sub-components for each slot. StatArrow renders green up or red down arrow based on `type` prop. StatGroup handles responsive row layout. One of the most complete implementations across all tiers. | high |
| GOV.UK | No dedicated component (Statistic pattern) | GOV.UK Design System documents a "Statistic" content pattern (not a component) for displaying government data. Uses heading for the number + body text for context. Emphasizes plain language alongside numbers. | high |
| Base Web (Uber) | No dedicated component | No stat/metric component. Uber's ride metrics and driver earnings displays are product-level patterns, not in the public DS. | low |
| Fluent 2 (Microsoft) | No dedicated component | No standalone Stat; Power BI's KPI visual is a product-level implementation. Fluent's Card can compose metric displays. Teams dashboard uses custom metric tiles. | medium |
| Gestalt (Pinterest) | No dedicated component | Pinterest's analytics (pin performance, audience stats) use internal metric patterns. Gestalt provides no public stat component. | low |
| Mantine | No dedicated component (community template) | No official Stat component. Mantine UI has a "StatsGroup" community template that composes Paper + Text + Group for metric cards with trend indicators. Widely copied. | high |
| Orbit (Kiwi.com) | No dedicated component | Travel booking metrics (price, duration, savings) are composed from custom layouts. No reusable Stat component. | low |
| Evergreen (Segment) | No dedicated component | Segment's analytics dashboards use internal metric components not published in Evergreen. | low |
| Nord (Nordhealth) | No dedicated component | Healthcare metrics (patient counts, appointment stats) are product-level; Nord DS does not include a public Stat component. | low |

## Key Decision Patterns

Chakra UI's Stat is the clear T3 reference implementation and rivals Ant Design in completeness. The sub-component architecture (`Stat` > `StatLabel` + `StatNumber` + `StatHelpText` + `StatArrow`) makes each slot explicit and composable. `StatArrow` accepts `type="increase"` or `type="decrease"` and renders a colored directional arrow — this is the only T3 system that ships a dedicated trend direction component. `StatGroup` wraps multiple Stats in a responsive flex row. The API is simple enough to learn instantly but structured enough to enforce consistent stat displays across a product.

GOV.UK's "Statistic" pattern is notable not as a component but as a content design reference. Government statistics must be presented with context — a number alone is meaningless. GOV.UK mandates that every statistic includes: the number (formatted with commas), a descriptor ("people employed"), a time period ("April 2025 to March 2026"), and a trend description in plain English ("up 3.2% from last year"). This content structure is a valuable reference for any stat component's slot design.

Mantine's community "StatsGroup" template is the most-copied stat pattern outside of dedicated components. It uses Paper for the card container, Text with `size="xl" fw={700}` for the value, Text with `size="sm" c="dimmed"` for the label, and a flex row with an arrow icon + colored text for the trend. The pattern is simple but effective and appears in hundreds of Mantine-based dashboards.

The absence of stat components in most T3 systems (7 out of 10) confirms that Stat/Metric is still considered a "composition pattern" rather than a primitive component by most design systems. Only systems serving data-heavy products (Chakra's general-purpose dashboard market, Ant's enterprise admin panels) invest in a dedicated component.

## A11y Consensus

- Stat displays are static, non-interactive elements requiring no keyboard focus or button/link roles.
- Label-to-value association should use heading hierarchy (label as heading, value as content) or explicit aria-labelledby linking the value to its label.
- Trend arrows must include screen-reader-accessible text. Chakra's StatArrow includes visually hidden "increase" or "decrease" text alongside the icon. Arrow icons alone (without alt text) are inaccessible.
- GOV.UK explicitly requires that statistics be understandable without visual formatting — the text itself must convey the full meaning, including trend direction, in prose.
- For live-updating dashboards, the value container should use `aria-live="polite"` so screen readers announce changes without interrupting current reading.

## Recommended Use

Reference Chakra UI's Stat family as the primary T3 model for dedicated stat component architecture. Use GOV.UK's Statistic content pattern for label/value/context slot design decisions. Use Mantine's StatsGroup community template as a composition reference when building from primitives. Chakra's StatArrow is the cleanest dedicated trend indicator among all T3 systems.
