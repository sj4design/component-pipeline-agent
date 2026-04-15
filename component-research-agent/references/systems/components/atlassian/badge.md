---
system: Atlassian Design System
component: Badge + Lozenge (two distinct badge-like components)
url: https://atlassian.design/components/badge
last_verified: 2026-03-28
---

# Badge

## Approach
Atlassian Design System takes the most architecturally rigorous approach to badges among the Tier 1 systems by explicitly splitting the concept into two separate components: Badge and Lozenge. This separation is a direct response to Atlassian's product complexity — in Jira and Confluence, teams need both notification counts (issue counts, mentions, unread items) and status labels (issue status: "In Progress," "Done," "Blocked"). Conflating these two into one component would create a component that does too many things poorly. Badge handles numeric counts; Lozenge handles categorical status labels. Each is optimized for its specific job. Badge displays a number (or "99+" for overflow), sits in a fixed-size container, and is designed for anchoring to other elements like avatars or icons. Lozenge displays a short text label with a semantic color fill and is designed for inline use within issue detail views, table cells, and cards.

## Key Decisions
1. **Badge vs. Lozenge split** (HIGH) — The decision to maintain two separate components prevents the "Swiss Army knife" problem where a single Badge component accumulates props for every possible use case and becomes impossible to use correctly. Jira needs to show "47 unresolved issues" on a project card (Badge) and "In Progress" on an issue row (Lozenge) — these have completely different visual and semantic requirements. Splitting them means each is simpler, better documented, and harder to misuse.
2. **Badge max value prop** (HIGH) — Atlassian's Badge supports a `max` prop that controls where the overflow clamp kicks in (default 99). This is more flexible than M3 and Ant Design's hardcoded 99+ limit. The justification: in Jira projects, teams sometimes have 500+ open issues and want to show "499+" rather than "99+" to convey actual scale. The `max` prop lets teams tune the overflow threshold for their context.
3. **Lozenge appearance system** (HIGH) — Lozenge uses named appearances (`default`, `inprogress`, `moved`, `new`, `removed`, `success`) that map to Jira's canonical issue states. This is a domain-specific decision: by naming appearances after Jira workflow states, the design system enforces that status labels match the product's conceptual model rather than generic success/error semantics.
4. **Bold vs. subtle Lozenge** (MEDIUM) — Lozenge supports `isBold` to switch between a subtle tint and a full-color fill. Subtle is for contexts where the status label is one of many pieces of information competing for attention; bold is for cases where status is the primary signal. This gives teams control over visual hierarchy without needing custom overrides.

## Notable Props
- `max` (Badge): Configurable overflow threshold — more flexible than competitors
- `appearance` (Lozenge): Domain-specific appearance names tied to Jira workflow states
- `isBold` (Lozenge): Controls visual weight of the status label

## A11y Highlights
- **Keyboard**: Neither Badge nor Lozenge is keyboard-interactive; they are display elements
- **Screen reader**: Badge count is announced as a number; teams are instructed to include the count in the parent element's accessible name (e.g., the button wrapping the badge should have `aria-label="Notifications, 5 new"`)
- **ARIA**: Badge renders as `<span>` with no special role; Lozenge similarly renders as `<span>`; no live-region behavior

## Strengths & Gaps
- **Best at**: The Badge/Lozenge split is the cleanest architectural approach in Tier 1 — each component has a single clear job, and the `max` prop on Badge is the most flexible overflow handling
- **Missing**: No built-in anchor/position system for overlaying Badge on other components (no `anchorOrigin` or equivalent) — teams must handle CSS positioning themselves
