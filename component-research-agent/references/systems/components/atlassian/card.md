---
system: Atlassian Design System
component: Card (Smart Card / specialized card types)
url: https://atlassian.design/components/
last_verified: 2026-03-28
---

# Card

## Approach
Atlassian's approach to "Card" is more fragmented and context-specific than any other Tier 1 design system, and this reveals something important about Atlassian's product philosophy. Rather than a single general-purpose Card component, Atlassian provides several specialized card types: Smart Card (URL unfurling — a link that expands into a rich preview of a Jira issue, Confluence page, or external URL), Spotlight Card (an onboarding/feature discovery container), Profile Card (user identity hover card), and Media Card (from the Atlaskit media package for file and image assets). The absence of a generic layout Card component is a philosophical statement: in Jira and Confluence, "cards" are almost always representations of specific objects (issues, pages, users, media files) rather than generic content containers. A Jira issue card has a fixed, meaningful anatomy — type icon, summary, assignee, priority, status. A Confluence page card has a title, space, last-modified date, and preview. These are not general layouts; they are domain object representations. Atlassian's position is that building a generic Card and then populating it with domain-specific content creates ambiguity about what the component represents. Instead, each object type gets its own presentation component that encodes the domain model directly.

## Key Decisions
1. **Smart Card as the primary "card" pattern** (HIGH) — The most prominent Atlassian card concept is the Smart Card — a component that takes a URL and resolves it into a rich inline preview. It is used throughout Jira and Confluence to render issue links, page links, and third-party URL previews. This is radically different from other design systems' Card components. The WHY: Atlassian products are fundamentally about linking work — Jira issues reference Confluence pages, which reference Jira epics, which reference Bitbucket commits. A URL that resolves into a structured, interactive preview (showing status, assignee, summary) is far more useful in this context than a generic content container. The Smart Card is essentially a "card-shaped hyperlink" with semantic domain awareness.

2. **No generic layout Card to avoid prescribing domain structure** (HIGH) — The ADS deliberately does not provide a generic Card component for general content grouping. Instead, teams are expected to compose layouts using Box (the ADS layout primitive) with semantic color tokens, spacing tokens, and border tokens. The WHY: over Atlassian's product portfolio (Jira, Confluence, Trello, Bitbucket, Atlas, Compass), the variety of "card-like" UI patterns is vast. A generic Card component would either be too rigid (forcing every product to use the same structure) or too flexible (providing no real design constraint). Box primitives with the shared token system achieve visual consistency without structural prescription.

3. **Spotlight Card for onboarding — a narrow, purposeful scope** (MEDIUM) — The Spotlight Card is explicitly scoped to onboarding and feature discovery flows. It provides a structured container with heading, body text, and action buttons, styled to draw attention to a new feature. The WHY: Atlassian's research showed that generic modal dialogs were being misused for feature announcements, creating disruptive, context-breaking experiences. The Spotlight Card provides a non-modal, contextual alternative that allows users to continue reading the interface while acknowledging the new feature. Scoping it to onboarding prevents misuse as a general-purpose card.

4. **Profile Card as a hover interaction, not a page layout element** (MEDIUM) — The Profile Card appears on hover over a user avatar throughout Jira and Confluence, showing name, role, team, and quick-action buttons (message, view profile). It is explicitly a hover/focus surface, not a layout component. The design decision is that user identity in productivity tools is most useful in context — when you see a name in a comment thread, hovering shows you who they are without navigating away. This is optimized for collaborative workflows where knowing who you're talking to is a frequent, micro-interaction need.

5. **Accessibility-first interactive card guidance** (HIGH) — For teams that do need an interactive layout card (e.g., a navigation card that links to a product area), Atlassian's guidance is explicit: use `<a>` when the action changes the URL, use `role="button"` with keyboard handling when the action does not. The system also mandates that draggable cards (common in Jira Board) must have a visible "More actions" button even when drag is implied by visual context, because keyboard and screen reader users cannot discover drag affordances implicitly.

## Notable Props
- Smart Card `url`: The URL is the entire data source — the component resolves the URL to the domain object and renders the appropriate card anatomy automatically.
- Smart Card `appearance` (`inline` | `block` | `embed`): Controls whether the card renders as an inline span, a block-level card, or a full embedded preview. Encodes the three common URL-to-card presentation contexts.
- Spotlight Card `actions`: Explicitly typed action array with primary/secondary distinction, enforcing the single-primary-action constraint for onboarding flows.
- Profile Card `cloudId` + `userId`: Domain-specific props that fetch the user's Atlassian account data — the component knows it is representing a real user, not generic content.

## A11y Highlights
- **Keyboard**: Interactive cards (navigation cards, Smart Cards) use native `<a>` semantics where possible. ADS guidance requires visible focus rings using the `border.width.focused` design token. The `Focusable` utility component is provided for wrapping custom interactive surfaces.
- **Screen reader**: Smart Cards announce as links with the resolved object title as the accessible name (e.g., "JIRA-1234 - Fix login bug, link"). Profile Cards are triggered by a button on the avatar (not just hover) to ensure keyboard/screen reader users can access the card.
- **ARIA**: Smart Cards use `role="link"` or native `<a>`. Draggable cards on Jira Board use `aria-grabbed` and `aria-dropeffect` with keyboard-operable drag initiation via a dedicated action menu.

## Strengths & Gaps
- **Best at**: Domain-specific card representations — the Smart Card's ability to resolve any Atlassian or third-party URL into a structured, semantically correct preview is a unique capability that no other design system's Card component matches.
- **Missing**: No general-purpose layout Card component means teams building cards that don't map to an Atlassian domain object (e.g., a feature highlight card on a landing page, a pricing plan card in an onboarding flow) must compose the layout from primitives without any Card-specific guidance or visual token shortcuts.
