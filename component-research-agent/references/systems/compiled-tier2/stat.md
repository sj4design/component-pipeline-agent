---
component: Stat
tier: 2
last_verified: 2026-03-31
---

# Stat — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | No dedicated component | Metric displays composed with Card + Heading + Paragraph; no stat-specific component in Paste's library. | medium |
| Salesforce Lightning | No dedicated component (Metric in reports) | Lightning Report components include metric summaries; no standalone Stat/Metric component in the base DS. Dashboards use custom metric tiles. | medium |
| GitHub Primer | No dedicated component | Primer has no stat/metric component; GitHub's repo stats (stars, forks, issues count) use custom CounterLabel for small counts but no full metric display. | medium |
| shadcn/ui | No dedicated component (community recipe) | No official Stat component. Community examples compose Card + CardHeader + CardContent with large number text and trend indicators. The "dashboard" example in shadcn blocks includes metric cards. | high |
| Playbook | Stat / StatChange / StatValue | Dedicated Stat component family with StatValue (the number), StatChange (trend percentage with up/down indicator), and grouping via StatGroup. One of the few T2 systems with a first-class stat component. | high |
| REI Cedar | No dedicated component | Cedar focuses on e-commerce product UI; metric/KPI displays are not part of the public component set. | low |
| Wise Design | No dedicated component | Transfer status displays use custom metric patterns; no reusable Stat component published. | low |
| Dell Design System | No dedicated component | Enterprise dashboard patterns exist in Dell's guidelines but no standalone Stat component in the public DS. | low |

## Key Decision Patterns

**Playbook is the standout:** PowerBI/eBay's Playbook is the only T2 system with a dedicated, structured Stat component family. `Stat` wraps `StatValue` (the number) and `StatChange` (trend with direction arrow and percentage). `StatGroup` handles horizontal/vertical grouping with consistent spacing. This mirrors Ant Design's approach but with explicit sub-components for each slot rather than props.

**Card composition is the dominant pattern:** Paste, Lightning, shadcn/ui, and Dell all recommend composing stat displays from Card + Typography primitives. The shadcn/ui dashboard example is the most referenced community pattern — it uses Card with a title (label), a `text-2xl font-bold` value, and a `text-xs text-muted-foreground` comparison line (e.g., "+20.1% from last month").

**Trend indicators are ad hoc:** Outside Playbook's StatChange, no T2 system provides a dedicated trend component. Teams typically compose an arrow icon (ArrowUpRight/ArrowDownRight) + percentage text + semantic color (green for positive, red for negative). This is the most common gap that a Stat component would fill.

**Number formatting is absent:** No T2 system provides stat-specific number formatting (abbreviation, locale-aware separators, precision control). Teams rely on Intl.NumberFormat or utility libraries. This contrasts with Ant Design's built-in `formatter` and `groupSeparator` props.

**Grouping patterns:** Playbook's StatGroup and shadcn's dashboard grid are the two grouping references. Stats almost always appear in groups of 3-4 in a horizontal row (KPI strip pattern). Responsive behavior typically goes from 4-across on desktop to 2x2 on tablet to stacked on mobile.

## A11y Consensus
- Stat displays are non-interactive; no keyboard focus or ARIA roles required for static display
- The label (title) should be programmatically associated with the value — either via heading hierarchy or aria-labelledby
- Trend indicators (up/down arrows) need visually hidden text equivalents ("increased by 12%") since arrow icons alone are not accessible
- Live-updating stats (real-time dashboards) should use aria-live="polite" on the value container to announce changes to screen readers
- Color used for trend direction (green/red) must be supplemented with icon or text direction indicator

## Recommended Use
Reference Playbook's Stat/StatValue/StatChange architecture as the most complete T2 model for building a dedicated stat component. Use shadcn/ui's dashboard card pattern as the composition reference when a dedicated component is not available. Always include non-color trend direction indicators (arrows + text) for accessibility.
