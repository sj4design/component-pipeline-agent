---
system: Evergreen (Segment/Twilio)
component: EmptyState
url: https://evergreen.segment.com/components/empty-state
last_verified: 2026-03-29
confidence: high
---

# Empty State

## Approach
Evergreen's EmptyState component handles the pervasive no-data states in Segment's analytics dashboards. New workspaces start with no sources, no destinations, no audiences, and no data — the empty state is often the very first screen a new user sees after onboarding. This makes it a critical activation and conversion touchpoint: a well-designed empty state explains the value of the absent content and provides a clear CTA to create or connect the first item. Evergreen's EmptyState supports an illustration, a title, a description, a primary CTA, and optionally a secondary link, giving teams the full content hierarchy needed for both "no data yet" and "no results from filters" scenarios.

## Key Decisions
1. **Illustration slot** (HIGH) — Visual illustration differentiates empty states by context (empty source list, empty audience, no matching results) and communicates the product's capability rather than just showing a blank area. Segment's illustration library provides on-brand visuals for each major entity type.
2. **Primary action + secondary link** (HIGH) — Segment's onboarding funnel depends on users completing setup steps; the EmptyState's built-in action slots drive activation by making the next step obvious and immediately accessible.
3. **Anchor and description for context** (MEDIUM) — The `anchorCta` prop adds an explanatory text link (e.g., "Learn about sources") for users who want to understand the concept before acting, supporting Segment's education-focused onboarding approach.

## Notable Props
- `title`: required heading summarizing the empty state
- `description`: supporting explanation text
- `illustration`: React node for the illustration (Evergreen illustration components or custom SVGs)
- `primaryCta`: `{ label, onClick }` for the main action button
- `anchorCta`: `{ label, href }` for a secondary text link
- `background`: `"dark" | "light"` — adjusts styling for different panel backgrounds

## A11y Highlights
- **Keyboard**: Action buttons and links are keyboard-accessible; illustration is decorative.
- **Screen reader**: Title and description are read in sequence; illustration carries `aria-hidden="true"`; CTA buttons have descriptive labels.
- **ARIA**: No special landmark roles needed; content is self-describing within its section.

## Strengths & Gaps
- **Best at**: Onboarding activation empty states with dual CTA support (action + learn more); excellent for first-use states in Segment's data pipeline setup flows.
- **Missing**: No built-in handling for "no search results" vs. "no data yet" visual differentiation beyond illustration swapping; no animation/progress state for "data incoming."
