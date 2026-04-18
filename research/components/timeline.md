---
component: timeline
date: 2026-04-17
mode: --max
systems: 24
scope: all
---

# Timeline — Research Synthesis (--max)

## Sistemas sin componente dedicado

| System | Reason | Workaround |
|--------|--------|------------|
| Material Design 3 | Consumer-focused; product diversity makes a single timeline infeasible | `List` + `ListItem` with leading icon + timestamp text |
| Spectrum (Adobe) | Creative tools are canvas/layer-based, not chronological | `ListView` with custom `renderItem` for timestamped events |
| Carbon (IBM) | No standardized component despite enterprise relevance | `StructuredList` for tabular logs; `OrderedList` for sequences |
| Polaris (Shopify) | Order timeline is product-specific, never abstracted | `ResourceList` + `VerticalStack` + `Divider` |
| Atlassian | Jira timeline is internal; too product-specific for shared system | `@atlaskit/comment` for activity-style items; internal `role="feed"` pattern |
| Twilio Paste | Not present; activity logs use ChatLog or custom list patterns | Custom list patterns |
| shadcn/ui | Not in core library; community Tailwind implementations exist | Community `<ol>` + Tailwind connector lines |
| REI Cedar | Not present; outdoor retail context has limited timeline use | Standard list |
| Wise Design | Not present; financial transaction history uses status-badge lists | Flat list with status badges |
| Dell Design System | Not present; enterprise IT uses custom activity log patterns | Custom bespoke implementation |
| Radix UI | No timeline primitive; no dedicated WAI-ARIA role exists | Layout primitives (Flex, Box) + `<ol>` + CSS connector lines |
| GOV.UK | Government transactions use summary lists and tables; Step-by-step is journey orchestration, not history | Summary list / table |
| Base Web (Uber) | Trip history is product-specific; no design system abstraction | Styled list pattern |
| Gestalt (Pinterest) | Feed/grid patterns; activity notifications use flat list | Flat list |
| Evergreen (Segment) | Dashboard activity uses custom log views; timeline metaphor not used | Custom log view |
| Nord (Nordhealth) | Clinical workflows use Steps for sequential processes; activity log not primary | Steps component |

---

## How Systems Solve It

### Ant Design (Tier 1)

Ant Design's Timeline is the only Tier 1 system with a dedicated component and serves as the primary reference. It separates timeline from Steps by intent: Timeline records what happened (history), Steps guides what comes next (future progression). The `mode` prop offers three layout modes—left, right, and alternate—with alternate being unique in Tier 1, creating the classic mirrored newspaper column effect for balanced event display. A `pending` prop adds a terminal item with a loading spinner, designed explicitly for real-time activity feeds where the latest event is still processing. Per-item semantic colors (blue/green/red/gray) communicate event status without requiring custom icons, and the `dot` prop accepts any ReactNode for full icon replacement.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Three layout modes (left/right/alternate) | Alternate is the visual identity of a "true" timeline; left-only suits compact audit logs; right-only suits RTL/alternative designs | H | Choose `left` for dense audit logs, `alternate` for marketing/story-driven timelines |
| `pending` prop with loading spinner | Real-time feeds have an in-progress latest event; this renders it distinctly without app-level composition | H | Essential for deployment status, order tracking, live activity feeds |
| Per-item semantic colors (4 values) | Status communication without custom icons reduces per-event complexity | M | Sufficient for 80% of use cases; use `dot` override only when brand icons are required |
| `reverse` prop (newest-first) | Activity logs default to newest-last chronologically, but UX often demands most-recent-first | M | Default to newest-first for activity logs; chronological for changelogs and order history |
| `<ul>/<li>` DOM without `<time>` enforcement | Semantic simplicity but misses machine-readable timestamp accessibility | L | Always wrap timestamp text in `<time datetime="ISO">` manually |

**Notable Props:** `mode: "left" | "right" | "alternate"` · `pending: ReactNode | boolean` · `pendingDot: ReactNode` · `reverse: boolean` · per-item: `color: "blue" | "green" | "red" | "gray" | string` · `dot: ReactNode` · `label: ReactNode`

**Accessibility:** Renders `<ul>/<li>`; per-item status relies on color alone (WCAG 1.4.1 violation without additional text). Add `aria-label` with status text per item ("Deployment succeeded") and use `<time datetime>` for all timestamps. No prescribed `aria-live` for dynamic loading.

---

### Salesforce Lightning ActivityTimeline (Tier 2)

Lightning's ActivityTimeline is purpose-built for CRM record detail pages — every record (opportunity, case, account) has an activity timeline showing calls, emails, tasks, and events. Each activity type has a distinct icon and color. Items are expandable to show full activity details inline. This is the most mature product-specific timeline implementation in Tier 2, optimized for the "mixed-type event feed" use case that is common in CRM and project management contexts.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Per-type icon + color (call, email, task, event) | CRM events have explicit types; visual differentiation reduces the time to scan a busy activity feed | H | Use typed icons when your events have a defined taxonomy (fewer than ~8 types) |
| Expandable items | Activity details are verbose; inline expand preserves list density while revealing full content on demand | H | Expandable items are essential when event bodies exceed 2–3 lines |
| Right-aligned timestamps | Aligns with CRM convention; separates "what" (left) from "when" (right) for fast scanning | M | Right-align only if your timeline is already CRM/record-oriented |

**Notable Props:** Activity type mapping per item · expandable inline detail · right-aligned timestamp slot

**Accessibility:** Part of Salesforce's accessible component library; expandable items use `aria-expanded`; icon + text for activity type (not icon-only).

---

### GitHub Primer TimelineItem (Tier 2)

Primer's Timeline is optimized for GitHub's issue and PR activity feeds—high-volume mixed-event streams where noise reduction matters. The `TimelineItem.Condensed` variant groups related events (multiple label additions, assignment changes) into compact single-line items, reducing visual clutter in long threads. The `TimelineItem.Badge` provides the colored icon circle that visually separates event types (comment, commit, review, label change). The condensed/full duality is the key unique pattern: not every event deserves the same visual weight.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| `Condensed` variant for grouped events | Multiple low-signal events (bot comments, label changes) overwhelm full-weight items if treated equally | H | Use condensed for system-generated events; full weight for human contributions |
| `Badge` icon circle per event type | GitHub's ~10 event types (comment, commit, review, etc.) need color-coded visual anchors | M | Use a badge icon taxonomy only when you have a defined event type system |
| Left-border connector line | Minimal visual connector; less visually dominant than a centered dot-and-line layout | L | Use left-border for developer tool / repository contexts; center connector for consumer timelines |

**Notable Props:** `TimelineItem.Condensed` · `TimelineItem.Badge` · `TimelineItem.Avatar`

**Accessibility:** `<ol>` with `aria-label`; `<time datetime>` for timestamps; icon badges use visually-hidden text for event type.

---

### Playbook Timeline (Tier 2)

Playbook groups timeline items by date, providing natural visual breaks in long activity histories. This date-grouping pattern is particularly effective for eBay's listing and order activity where events span days or weeks. Each date group has a heading and items within the group share a connecting vertical line. Date headers act as implicit section dividers without requiring explicit separator components.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Date-grouped items | Long timelines spanning days/weeks are disorienting without natural anchors; date groups provide orientation | H | Use date groups for any timeline spanning more than 24 hours |
| Vertical connector within groups only | Connector between dates would imply false continuity; grouping makes gaps explicit | M | Do not connect across date groups; whitespace communicates temporal gaps |

**Notable Props:** Date group header · per-item custom icon · connector within group

**Accessibility:** Group headers as `<h3>` or equivalent; items as `<li>` within group `<ol>`.

---

### Chakra UI Timeline (Tier 3)

Chakra v3 introduced a compound Timeline component: `Timeline.Root` > `Timeline.Item` > (`Timeline.Connector` + `Timeline.Content`). The explicit `Timeline.Connector` as a separate composable piece allows consumers to omit or customize the connector per item—useful for timelines with logical breaks like date separators. Minimal implementation: no built-in status colors, no active-line-fill, no horizontal orientation.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Explicit `Timeline.Connector` as compound child | Allows per-item connector customization or omission without breaking the layout | M | Useful when date separators need a different visual treatment than event connectors |
| No global status or active-line | Intentionally minimal; status is left to consumers via slot content | L | Add status via `dot` content rather than expecting a built-in system |

**Notable Props:** `Timeline.Root` · `Timeline.Item` · `Timeline.Connector` · `Timeline.Content`

**Accessibility:** `<ol>` + `<li>` pattern; no special ARIA by default.

---

### Mantine Timeline (Tier 3)

Mantine's Timeline is the most design-system-complete implementation across all tiers outside Ant Design. The `active` prop sets a "current position" index—items at or before `active` have a filled connector, items after have an unfilled/gray connector, creating visual progression. `lineVariant` (solid/dashed/dotted) differentiates confirmed from tentative event connections. Custom `bullet` accepts any ReactNode per item (icons, avatars, status indicators). `reverseActive` fills the line from the bottom up for newest-first timelines.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| `active` prop for line fill progression | Creates visual "current position" on a timeline with in-progress state; better than per-item status for process-oriented timelines | H | Use `active` for order fulfillment, pipeline stages, or any process with a "where are we now" concept |
| `lineVariant` (solid/dashed/dotted) | Dashed connector communicates "not yet confirmed" or "tentative" events; solid = fact, dashed = scheduled | M | Use dashed for future/planned events in a mixed-state timeline |
| `reverseActive` | Fills from bottom up; useful for newest-first timelines where item 0 is most recent | M | Enable when displaying newest events at top of list |
| Custom `bullet` per item | Replaces dot with any icon, avatar, or status indicator without wrapper composition | H | Use avatars for "who did this" feeds; use status icons for process pipelines |

**Notable Props:** `active: number` · `lineVariant: "solid" | "dashed" | "dotted"` · `reverseActive: boolean` · `bulletSize: number` · `lineWidth: number` · per-item `bullet: ReactNode` · `color: string`

**Accessibility:** `<ol>` + `<li>` pattern; `<time datetime>` usage encouraged; connector lines hidden from AT via CSS pseudo-elements.

---

### Orbit Timeline (Tier 3)

Orbit's Timeline is domain-driven, designed for travel itinerary display (flight/booking event sequences). Each `TimelineStep` has a `type` (success/warning/critical/info) that independently colors its dot and connector segment. No global "active" position—every event is independently status-coded. `label` and `subLabel` use travel terminology but the pattern is reusable for any status-per-event timeline.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Per-item `type` status (success/warning/critical/info) | Travel events have independent states; a flight can be confirmed while a hotel is still processing | H | Use per-item status for event histories where each event has an independent outcome |
| No global `active` position | Travel itineraries do not have a single "current" point; multiple events may be in different states simultaneously | M | Choose per-item status over active-line-fill for event histories with heterogeneous states |
| `subLabel` slot | Flight itineraries need two levels of info per step (route vs. duration details) | M | Use a two-level label pattern for events with primary + supporting info |

**Notable Props:** `TimelineStep` with `type: "success" | "warning" | "critical" | "info"` · `label: string` · `subLabel: string`

**Accessibility:** Status dot uses text alternative per type; container follows `<ol>` semantics.

---

### Fluent 2 TimeLine (Tier 3 — Preview)

Fluent 2's TimeLine is in preview/experimental status as of research date. Designed for Microsoft 365 activity feeds, it features actor avatars, timestamps, and description slots per item with a connector line. API not yet stable—treat as directional signal rather than implementation reference.

---

## Pipeline Hints

### Archetype Recommendation

**Archetype: Compound — `Timeline` > `Timeline.Item`**

Rationale: Events are structurally heterogeneous (different icons, labels, statuses, content). Compound components allow per-item customization without a sprawling prop API on the parent. Every mature implementation (Ant Design, Mantine, Chakra, Orbit) uses this pattern. The alternative—data-driven `items` array—is viable (Mantine supports it) but limits per-item slot customization that is universally needed in production.

---

### Slot Consensus Table

| Slot | Consensus | Notes |
|------|-----------|-------|
| `dot` / `bullet` | 5/8 systems | The circle indicator at the event origin point; accepts ReactNode for icon/avatar override |
| `connector` | 6/8 systems | The vertical line linking dots; decorative, `aria-hidden` |
| `label` / `title` | 8/8 systems | Primary event text; required |
| `subLabel` / `description` | 6/8 systems | Secondary descriptive text below label |
| `timestamp` | 7/8 systems | Event time; should use `<time datetime>` |
| `icon` / `badge` | 5/8 systems | Typed event icon (commit, email, task); separate from generic dot |
| `content` / `children` | 7/8 systems | Rich expandable content area; arbitrary ReactNode |
| `actions` | 3/8 systems | CTA buttons or links within the event item |
| `avatar` | 3/8 systems | Actor avatar (who triggered the event) |
| `dateGroupHeader` | 2/8 systems | Date separator for grouped timelines (Playbook, custom patterns) |

---

### Property Consensus Table

| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| `mode` / `layout` | `"left"` \| `"right"` \| `"alternate"` | 2/8 | Ant Design exclusive feature; alternate mode is the differentiator |
| `pending` | `boolean \| ReactNode` | 1/8 | Ant Design; terminal item with loading state |
| `pendingDot` | `ReactNode` | 1/8 | Ant Design; custom loading indicator |
| `reverse` | `boolean` | 2/8 | Newest-first ordering |
| `active` | `number` | 2/8 | Mantine; index of last "completed" item |
| `reverseActive` | `boolean` | 1/8 | Mantine; fill line from bottom up |
| `lineVariant` | `"solid" \| "dashed" \| "dotted"` | 1/8 | Mantine; connector line style |
| `lineWidth` | `number` | 1/8 | Mantine; connector line thickness |
| `bulletSize` | `number` | 1/8 | Mantine; dot size |
| `color` (per-item) | `"blue" \| "green" \| "red" \| "gray" \| string` | 2/8 | Ant Design + Mantine; event status color |
| `type` (per-item) | `"success" \| "warning" \| "critical" \| "info"` | 2/8 | Orbit + Chakra-like status |
| `dot` (per-item) | `ReactNode` | 3/8 | Custom dot replacement per event |
| `label` (per-item) | `ReactNode` | 8/8 | Required; primary event text |
| `subLabel` (per-item) | `ReactNode` | 4/8 | Secondary event description |
| `expandable` (per-item) | `boolean` | 2/8 | Lightning-style inline detail expansion |

---

### Boolean Properties Table

| Property | Default | Systems |
|----------|---------|---------|
| `reverse` | `false` | Ant Design, Mantine |
| `reverseActive` | `false` | Mantine |
| `pending` (as boolean) | `false` | Ant Design |
| `expandable` | `false` | Lightning ActivityTimeline |
| `showLine` | `true` | Ant Design, Mantine |
| `checkable` | `false` | Not applicable (timeline-specific) |
| `condensed` | `false` | Primer (`TimelineItem.Condensed` variant) |

---

### State Coverage Table

| State | Systems | Notes |
|-------|---------|-------|
| `default` | 8/8 | Standard rendered event |
| `active` / `current` | 4/8 | Currently processing event (loading spinner, highlighted dot) |
| `pending` | 2/8 | In-progress final event (Ant: `pending` prop; Mantine: `active` index) |
| `success` / `complete` | 5/8 | Past completed event; green/filled dot |
| `error` / `failed` | 4/8 | Failed event; red dot |
| `warning` | 3/8 | Warning state; yellow/orange dot |
| `info` / `neutral` | 5/8 | Informational event; blue/gray dot |
| `disabled` | 1/8 | Non-interactive event; gray styling |
| `condensed` | 1/8 | Primer; collapsed grouped events |
| `loading` (per-item) | 2/8 | Async-loading event detail (Lightning expand; Fluent 2 preview) |

---

### Exclusion Patterns

- **Do not use Timeline for future sequential processes**: Use Steps (Wizard) instead. Timeline = history; Steps = future progression. Ant Design explicitly separates these.
- **Do not use Timeline for tabular audit data**: Dense event logs with many columns (time, actor, IP, event type, payload) belong in a DataGrid or StructuredList, not a Timeline.
- **Do not use Timeline for a single isolated event**: A card or alert suffices; timeline visual metaphor requires at least 3+ events to justify the connector overhead.
- **Do not use alternating layout in compact viewports**: Alternate mode requires horizontal space for two content columns; degrades to single-column on mobile without explicit handling.

---

### Building Block Candidates

- `TimelineConnector` — the vertical line between dots (CSS pseudo-element or explicit element)
- `TimelineDot` / `TimelineBullet` — the circle indicator (pure presentation, `aria-hidden`)
- `TimelineItem` — compound child for a single event
- `TimelineContent` — the text/action area beside the dot
- `DateGroupHeader` — separator for date-grouped timelines

---

### Enum / Configuration Properties

| Property | Values |
|----------|--------|
| `mode` | `"left"` \| `"right"` \| `"alternate"` |
| `lineVariant` | `"solid"` \| `"dashed"` \| `"dotted"` |
| `color` (per-item) | `"blue"` \| `"green"` \| `"red"` \| `"gray"` \| custom string |
| `type` (per-item, Orbit-style) | `"success"` \| `"warning"` \| `"critical"` \| `"info"` \| `"default"` |
| `size` | `"sm"` \| `"md"` \| `"lg"` |
| `orientation` | `"vertical"` (universal) \| `"horizontal"` (not supported by any system; custom only) |

---

### A11y Consensus

| Attribute | Value | Rationale |
|-----------|-------|-----------|
| Container element | `<ol>` (chronological) or `<ul>` (unordered events) | `<ol>` communicates sequence; use when order matters |
| Container label | `aria-label="[Context] timeline"` e.g. "Order activity" | Identifies purpose without reading all items |
| Event timestamp | `<time datetime="ISO-8601">` | Machine-readable; AT can reformat dates |
| Status dot | `aria-hidden="true"` + visually-hidden text for status | Color alone fails WCAG 1.4.1 |
| Connector line | `aria-hidden="true"` or CSS `::before`/`::after` | Decorative; no semantic meaning |
| Expandable item | `aria-expanded` on trigger; `id` link to revealed region | Standard disclosure pattern |
| Dynamic loading | `aria-live="polite"` on status region (not the list) | Announce count ("5 new events"), not each item |
| APG pattern | No dedicated APG timeline pattern; use `<ol>` + standard disclosure | Closest: Feed pattern (`role="feed"`) for infinite-scroll activity feeds |

---

## What Everyone Agrees On

1. **Timeline = history; Steps = future.** All systems with both components use Timeline for past events and Steps/ProgressIndicator for future sequential tasks. This semantic distinction should be reflected in the component name and documentation.
2. **Connector line is decorative.** Every implementation hides the connector from the accessibility tree (via `aria-hidden` or CSS pseudo-elements). The line communicates visual continuity but carries zero semantic meaning.
3. **Timestamps need machine-readable format.** The `<time datetime="ISO-8601">` element is the universal recommendation. Display the human-readable string in content; put the ISO date in the `datetime` attribute.
4. **Status requires text alternative, not just color.** Colored dots for success/error/warning fail WCAG 1.4.1. Every a11y-aware system (Primer, Mantine, Orbit) adds visually-hidden text or `aria-label` to the status indicator.
5. **Custom dot/bullet per item is essential for production use.** Every production implementation (Ant Design, Lightning, Mantine, Primer) allows a custom icon, avatar, or status indicator per event. Plain circle-only timelines are demo artifacts.
6. **Vertical orientation is the universal default.** No system provides horizontal timeline as a first-class feature; horizontal layouts are custom implementations for specific contexts (Gantt-adjacent timelines, roadmaps).
7. **Date grouping improves usability for multi-day timelines.** Playbook and Lightning both group by date. Without grouping, timelines spanning weeks become disorienting scrolling lists.

---

## Where They Disagree

### 1. Active-line-fill vs. per-item status
- **Option A — Active-line-fill (Mantine):** A single `active` index controls which portion of the connector line is "filled". Clean visual progression for process-oriented timelines.
  - Adopters: Mantine
  - Upside: Creates a clear "current position" visual; works well for order fulfillment, pipelines
  - Downside: Implies a linear process; fails when events have independent statuses
  - Para tu caso: Use if your timeline represents a single entity moving through states (order status, onboarding progress)

- **Option B — Per-item status (Ant Design, Orbit, Primer):** Each event independently declares its color/type. No global "current" position.
  - Adopters: Ant Design, Orbit, Primer, Lightning
  - Upside: Accurate for heterogeneous event histories (deployment logs, CRM activity)
  - Downside: No visual "current position"; users must interpret each event independently
  - Para tu caso: Use if your timeline shows mixed-state historical events (some succeeded, some failed)

### 2. Layout orientation: left-only vs. alternate
- **Option A — Left-only (Primer, Carbon-adjacent, most systems):** All events on the right side of a left connector line.
  - Adopters: Primer, Orbit, Chakra, Mantine (default)
  - Upside: Consistent reading direction; better for long content; works at all viewport widths
  - Downside: Less visually distinctive; looks like a decorated list
  - Para tu caso: Default choice for activity logs, audit trails, changelogs

- **Option B — Alternate mode (Ant Design):** Events alternate between left and right sides of the connector.
  - Adopters: Ant Design
  - Upside: Visual identity of a "classic timeline"; balanced for short content on each side
  - Downside: Requires significant horizontal space; degrades on narrow viewports; harder to read
  - Para tu caso: Use for marketing/story timelines or company history pages; avoid for dense data

### 3. Pending/in-progress terminal item
- **Option A — Explicit `pending` prop (Ant Design):** The final item has a loading spinner and special treatment.
  - Adopters: Ant Design
  - Upside: Built-in affordance for real-time feeds; no custom composition needed
  - Downside: Single prop cannot express all possible in-progress states
  - Para tu caso: Essential for deployment logs, order tracking, and live activity feeds

- **Option B — Consumer-composed pending state:** The application renders a custom final item.
  - Adopters: All other systems
  - Upside: Full flexibility in how in-progress state is communicated
  - Downside: Every team reimplements the same pattern; no consistency
  - Para tu caso: Acceptable only if your in-progress state is highly custom

### 4. Data-driven array vs. compound component
- **Option A — Data-driven `items` array (Mantine supports, Base Web):** Pass an array of event objects; the component renders.
  - Upside: Easy server-driven rendering; simpler for CMS-backed timelines
  - Downside: Limited per-item slot customization without a `renderItem` escape hatch
  - Para tu caso: Good for data-heavy lists with uniform item structure

- **Option B — Compound component composition (Ant Design, Chakra, Orbit):** `<Timeline><Timeline.Item /></Timeline>` composition.
  - Upside: Full per-item slot customization; heterogeneous item types in one timeline
  - Downside: More verbose JSX; requires iteration code from consumer
  - Para tu caso: Default choice for most applications where items differ in content or actions

### 5. Date grouping as built-in vs. consumer responsibility
- **Option A — Built-in date groups (Playbook):** The component accepts events with dates and renders group headers automatically.
  - Upside: Consistent date formatting; no consumer layout code needed
  - Downside: Opinionated date formatting and group header styling
  - Para tu caso: Use when timeline spans multiple days/weeks and grouping is the primary navigation aid

- **Option B — Consumer-composed date separators:** Render a `Timeline.Item` with custom content as a date divider.
  - Adopters: All other systems
  - Upside: Full control over date header appearance; can include counts, filters, or other metadata
  - Downside: Every team builds the same date-grouping logic
  - Para tu caso: Acceptable; compose a `dateHeader` item slot in the spec

---

## Visual Patterns Found

| Pattern | Description | Best For | Adopted By |
|---------|-------------|----------|------------|
| Left-connector with dots | Single vertical line on left; dot at each event origin; content on right | Audit logs, activity feeds, changelogs | Primer, Mantine, Chakra, Orbit |
| Alternate mode | Events alternate left/right of center connector | Story timelines, company history, roadmaps | Ant Design |
| Status-colored dot | Dot color communicates event status (green/red/yellow/blue) | Deployment logs, order tracking, CRM activity | Ant Design, Orbit, Mantine |
| Date group headers | Separator between events grouped by date | Multi-day activity feeds | Playbook, Lightning (implicit) |
| Expandable items | Click to reveal full event detail inline | CRM activity logs with long body text | Lightning ActivityTimeline |
| Condensed/full weight | Low-signal events condensed to single line; high-signal events full weight | Developer tool activity feeds (GitHub PRs) | Primer |
| Pending terminal item | Final item with loading spinner for in-progress event | Real-time feeds, deployment status | Ant Design |
| Avatar-enriched dot | Actor's avatar replaces the circle dot | "Who did what" social activity feeds | Lightning, custom patterns |

### ASCII Wireframes

**Left-connector (default) — Audit Log:**
```
┌─────────────────────────────────────┐
│  Timeline                           │
│                                     │
│  ●─────────────────────────────     │
│  │  Deployment started             │
│  │  2026-04-17 · 14:23             │
│  │                                 │
│  ●─────────────────────────────     │
│  │  Tests passed (42/42)          │
│  │  2026-04-17 · 14:31             │
│  │                                 │
│  ▶─────────────────────────────     │
│     Build in progress...           │
│     2026-04-17 · 14:35             │
│                                     │
└─────────────────────────────────────┘
  ● = completed dot
  ▶ = pending/loading indicator
```

**Alternate mode — Story/Roadmap:**
```
┌─────────────────────────────────────────────┐
│                                             │
│  Q1 Launch ──────●──────── Announced        │
│                  │                          │
│            Beta ─●                          │
│                  │     ── API release       │
│                  ●─────                     │
│                  │  GA Launch               │
│                  ○ ← pending                │
│                                             │
└─────────────────────────────────────────────┘
  Content alternates left and right of center ●
```

**Date-grouped timeline:**
```
┌──────────────────────────────────────┐
│  ── April 17, 2026 ──────────────    │
│  ●  Order placed · 09:12            │
│  │                                   │
│  ●  Payment confirmed · 09:13       │
│  │                                   │
│  ── April 18, 2026 ──────────────    │
│  ●  Shipped · 11:05                 │
│  │                                   │
│  ○  Out for delivery · pending      │
│                                      │
└──────────────────────────────────────┘
```

**Status-coded per-item (process log):**
```
┌──────────────────────────────────────┐
│                                      │
│  ●  Clone repository      [success] │
│  │                                   │
│  ●  Install dependencies  [success] │
│  │                                   │
│  ▣  Run tests              [failed]  │
│  │                                   │
│  ○  Deploy                [skipped] │
│                                      │
│  ● = green  ▣ = red  ○ = gray       │
└──────────────────────────────────────┘
```

---

## Risks to Consider

**RISK 1 — Color-only status communication (HIGH)**
Most timeline implementations rely on dot color to communicate event status (green = success, red = error). This fails WCAG 1.4.1 (Use of Color) for users with color vision deficiency and is invisible to screen reader users. Every event's status must have a text alternative—either visually-hidden text within the dot element or an `aria-label` on the item. Adding this retroactively is harder than building it in.
*Mitigation:* Define a `status` enum (success/error/warning/info/default) that drives both color AND an aria-label or visually-hidden text string. Never derive status from color alone.

**RISK 2 — Scalability: Long timelines without virtualization (MEDIUM)**
Activity logs can grow to thousands of events. Rendering all items in the DOM causes layout reflow, memory pressure, and slow initial paint. No system in any tier provides built-in virtualization for timeline; they all assume short-to-medium event counts. Infinite scroll or "load more" pagination is required for production activity feeds.
*Mitigation:* Build pagination/load-more into the spec from day one. Add an `aria-live="polite"` region to announce when new events are loaded ("5 new events loaded"). Do not virtualize the connected-line rendering without explicit measurement—the CSS connector lines break with virtual offset rendering.

**RISK 3 — Alternating layout on mobile (MEDIUM)**
The alternate layout mode (events alternating left/right) requires significant horizontal space for two content columns. On viewports under ~600px, it degrades to a confusing collision of content. Ant Design's alternate mode has no built-in responsive fallback.
*Mitigation:* Implement a `responsiveMode` or `mobileMode` prop that overrides `alternate` → `left` below a breakpoint. Or restrict alternate mode to desktop-only use cases in documentation.

**RISK 4 — Missing `<time datetime>` on timestamps (LOW)**
Almost every implementation displays timestamps as plain text strings. Machine-readable `datetime` attributes on `<time>` elements allow screen readers, search engines, and localization tools to interpret and reformat dates correctly. Omitting this is technically invisible but degrades AT support.
*Mitigation:* Add a `timestamp` slot typed as `{ displayText: string; isoDate: string }` in the spec so the component always renders `<time datetime={isoDate}>{displayText}</time>`. Do not accept a plain string timestamp.

---

## Next Steps

1. **Decide on status model (active-line-fill vs. per-item):** This is the most consequential architectural decision. Query product owners about whether the timeline shows a single entity progressing through states, or a heterogeneous event history. The answer determines whether `active: number` (Mantine pattern) or `color/type` per item (Ant Design/Orbit pattern) is correct.
2. **Define event type taxonomy:** If events have distinct types (comment, deploy, error, commit), define the type enum and per-type icon/color mapping before spec. This drives the `dot` slot shape.
3. **Specify pagination/load-more behavior:** Determine maximum initial item count and whether infinite scroll or explicit "load more" is the pattern.
4. **Determine alternate mode requirements:** If only vertical-left is needed, eliminate alternate mode and simplify the spec significantly.
5. **Write `<time datetime>` into the timestamp slot spec:** This is a zero-cost accessibility improvement that must be built in from day one.
