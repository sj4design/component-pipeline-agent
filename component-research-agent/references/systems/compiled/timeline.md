---
component: timeline
compiled: 2026-03-31
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Absent — no timeline pattern
**Approach:** MD3 has no Timeline component. Material Design focuses on Cards and Lists for displaying chronological content. Google products handle activity feeds through product-specific implementations (Gmail activity, Google Cloud audit logs) rather than a shared timeline primitive. The closest pattern is a `List` with leading icons and timestamp metadata, but this lacks connector lines, status indicators, and the visual progression that defines a timeline.
**Key Decisions:**
- [HIGH] Absent: no generalized timeline pattern — Google's product diversity means activity feeds vary too much in density, interactivity, and content type for a single component
- [MED] List with leading icons as informal substitute: vertical list items with icon avatars and timestamp text create a pseudo-timeline, but without connector lines or status differentiation
- [MED] Card-based activity feeds in practice: Google products use Card sequences for activity history, losing the visual continuity of a connected timeline
**Notable API:** No component. `List` + `ListItem` with `leadingContent` (icon/avatar) and `supportingText` (timestamp) as informal pattern.
**A11y:** No prescribed pattern. Custom implementations should use `<ol>` for chronological order, `aria-label` on the container ("Activity timeline"), and timestamp text accessible to screen readers.
**Best at:** Nothing for this pattern — no timeline component or formal guidance exists.
**Missing:** Timeline component, connector lines, event status indicators, alternating layout, horizontal orientation, and any timeline-specific a11y guidance.

---

## spectrum
**Component:** Absent — no timeline primitive
**Approach:** Spectrum has no Timeline component. Adobe's creative tool workflows are canvas-based and layer-based rather than chronologically sequential. Version history in Creative Cloud uses product-specific list implementations. React Aria provides no timeline primitive or pattern guidance. The closest Spectrum component is a vertical `ListView` with custom row content, but this lacks the visual connector and status-per-event semantics of a true timeline.
**Key Decisions:**
- [HIGH] Absent: creative tool workflows are spatial/layer-based, not chronological — timeline is not a primary pattern in Adobe's product ecosystem
- [MED] ListView as closest primitive: vertical list with custom row rendering can display timestamped events, but provides no connector line or status indicator infrastructure
- [MED] No React Aria timeline hooks: unlike other patterns where React Aria provides primitives for custom assembly, no timeline-oriented state management or accessibility hooks exist
**Notable API:** No component. `ListView` with custom `renderItem` for timestamped content as fallback.
**A11y:** No prescribed pattern. Recommended custom approach: `<ol aria-label="Timeline">` with each event as `<li>`, timestamps as `<time datetime>` elements.
**Best at:** Nothing for this pattern — no timeline component, hooks, or guidance exists.
**Missing:** Timeline component, connector lines, event status states, alternating sides, horizontal mode, and loading/pending state for latest event.

---

## carbon
**Component:** Absent — no dedicated timeline
**Approach:** Carbon has no Timeline component despite IBM's enterprise focus where audit logs and activity histories are common. Carbon's `StructuredList` and `OrderedList` serve as the informal patterns for chronological event display. IBM product teams build custom timeline UIs for Cloud audit logs and Watson activity feeds. The `ProgressIndicator` (Carbon's Steps component) is sometimes repurposed as a vertical timeline, but its step-completion semantics differ from timeline's event-history semantics.
**Key Decisions:**
- [HIGH] Absent despite enterprise relevance: audit logs, deployment histories, and incident timelines are core IBM Cloud patterns, but no standardized timeline component exists — teams build bespoke solutions
- [MED] ProgressIndicator misuse as timeline: some IBM teams repurpose the vertical ProgressIndicator for activity logs, but its complete/current/incomplete states map poorly to timeline events that are all "past"
- [MED] StructuredList as chronological event display: column-based layout (time, event, actor) works for dense audit data but lacks the visual progression of a true timeline
**Notable API:** No component. `StructuredList` for tabular event logs; `OrderedList` for simple chronological sequences.
**A11y:** No prescribed timeline pattern. Custom implementations should follow `<ol>` semantics with `<time>` elements and descriptive `aria-label` on the container.
**Best at:** Nothing for this pattern — a notable gap given IBM's enterprise audit and activity log use cases.
**Missing:** Timeline component, connector lines, per-event status/color, custom icons per event, alternating layout, horizontal orientation, loading state for latest event.

---

## polaris
**Component:** Absent — activity feed patterns instead
**Approach:** Polaris has no Timeline component. Shopify's merchant-facing UI uses activity feeds within resource detail pages (order timeline, customer timeline) but these are product-level implementations, not design system components. The closest Polaris patterns are `ResourceList` for event sequences and `VerticalStack` with `Divider` for visual separation between chronological items. Shopify's order detail page has a prominent timeline UI, but it was never abstracted into a reusable Polaris component.
**Key Decisions:**
- [HIGH] Absent despite product usage: Shopify's order timeline is one of the most-used timeline UIs in e-commerce, but it remains a product implementation rather than a design system component — too product-specific in its event types and actions
- [MED] ResourceList as event sequence: item list with metadata (actor, timestamp, description) serves as a flat event log without visual connectors
- [MED] No connector line or status indicator patterns: Polaris provides no guidance on visual timeline affordances — each product team implements differently
**Notable API:** No component. `ResourceList` + `ResourceItem` for event sequences; `VerticalStack` + `Divider` for simple chronological separation.
**A11y:** No prescribed pattern. Shopify's internal order timeline uses `<ol>` with timestamped entries, but this is not documented as a Polaris pattern.
**Best at:** Nothing for this pattern — a notable gap given that Shopify's order timeline is a core merchant experience.
**Missing:** Timeline component, connector lines, event status colors, custom icons, alternating layout, horizontal orientation, loading/pending state.

---

## atlassian
**Component:** Absent — custom activity feeds per product
**Approach:** Atlassian has no Timeline component in the public design system, despite Jira's prominent issue activity timeline. Each Atlassian product (Jira, Confluence, Bitbucket) implements its own activity feed with product-specific event types, actions, and layouts. The closest ADS components are `Timeline` in Jira's internal component library (not part of public ADS) and the generic `Feed` pattern using `Comment` components for activity display.
**Key Decisions:**
- [HIGH] Absent from public ADS: Jira's activity timeline is internally componentized but not abstracted into the shared design system — event types and inline actions are too product-specific
- [MED] Comment component as activity item: `@atlaskit/comment` provides avatar + author + timestamp + content layout that resembles timeline items, but without connectors
- [MED] No connector or status indicator standardization: each product styles timeline connectors differently (Jira uses left-border lines, Confluence uses spacing only)
**Notable API:** No component. `@atlaskit/comment` for activity-style items with avatar, author, timestamp, and content slots.
**A11y:** No prescribed timeline pattern. Jira's internal timeline uses `role="feed"` with `aria-label`, which is semantically appropriate for dynamically-loaded activity streams.
**Best at:** Nothing for this pattern as a public component — Jira's internal implementation with `role="feed"` is a strong reference but is not part of the shared design system.
**Missing:** Public timeline component, connector lines, event status indicators, alternating layout, horizontal orientation, loading state.

---

## ant-design
**Component:** Timeline (most complete Tier 1 reference — modes, colors, custom dots)
**Approach:** Ant Design's Timeline is the only Tier 1 system with a dedicated timeline component and the most feature-complete timeline in any major design system. It supports three layout modes (left, right, alternate), custom dot icons per item, four semantic colors (blue/processing, green/success, red/error, gray/default), a `pending` prop for the latest-event loading state, and `reverse` for newest-first ordering. The component is designed for activity logs, changelogs, and event histories rather than sequential progress (which Ant handles with Steps).
**Key Decisions:**
- [HIGH] Three layout modes: `left` (default, all items on right of line), `right` (all items on left), `alternate` (items alternate sides) — alternate mode is unique in Tier 1 and provides the classic timeline visual for balanced event display
- [HIGH] Pending item with loading indicator: `pending` prop adds a final item with a loading spinner, representing an in-progress or upcoming event — unique affordance for real-time activity feeds where the latest event is still processing
- [MED] Four semantic colors per item: `blue` (processing/default), `green` (success/complete), `red` (error/failed), `gray` (inactive/future) — status communication without requiring custom icons
- [MED] Custom dot via `dot` prop: any ReactNode replaces the default circle indicator — enables brand icons, user avatars, or status-specific icons per timeline event
**Notable API:** `mode: "left" | "right" | "alternate"`; `pending: ReactNode | boolean`; `pendingDot: ReactNode`; `reverse: boolean`; per-item `color: "blue" | "green" | "red" | "gray" | string`; per-item `dot: ReactNode`; per-item `label: ReactNode` (shown on opposite side in alternate mode)
**A11y:** Renders as `<ul>` with `<li>` per item. Semantic colors rely on visual differentiation — no built-in `aria-label` per item for status. Custom implementations should add `aria-label` with status text ("Deployment succeeded", "Build failed") for screen reader users. No `<time>` element enforcement for timestamps.
**Best at:** Feature completeness — alternate mode, pending state with loading indicator, per-item semantic colors, and custom dot icons cover the full range of timeline use cases (activity logs, changelogs, deployment histories, order tracking).
**Missing:** Horizontal orientation (vertical-only); `<time datetime>` enforcement for timestamps; per-item `aria-label` for status; collapsible/expandable items for long timelines; grouping by date; virtualization for very long activity feeds.
