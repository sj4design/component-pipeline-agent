---
system: Ant Design
component: Card
url: https://ant.design/components/card/
last_verified: 2026-03-28
---

# Card

## Approach
Ant Design's Card component reflects the system's overarching design value of "certainty" — giving enterprise users predictable, scannable layouts that reduce cognitive load in information-dense dashboards and portals. The Card is one of Ant Design's most-used components precisely because Chinese enterprise software (the primary context for Ant Design, built by Alibaba/Ant Group) relies heavily on dashboard layouts where cards are the dominant organizational unit. The component therefore prioritizes richness of built-in composition over flexibility: it ships with a `Card.Meta` subcomponent for standardized avatar/title/description patterns, a `cover` prop for full-bleed media, a `tabList` prop for multi-panel content within a single card, and an `actions` prop for a structured footer action bar. Ant Design's position is that 80% of card use cases follow a small number of well-understood patterns, so encoding those patterns directly into the component API reduces decision fatigue and ensures visual consistency across the enormous number of products built on Ant Design globally. The `hoverable` prop — which adds a shadow lift on hover — is Ant Design's answer to the "entire card is clickable" pattern, decoupling the visual affordance from click implementation. Rather than providing a `href` or `onClick` on the card, the card signals interactivity visually and leaves the interaction implementation to the developer.

## Key Decisions
1. **`hoverable` prop for interactive cards instead of a click handler** (HIGH) — Ant Design provides a `hoverable` prop that applies a CSS shadow elevation on hover, signaling that the card is interactive. There is no built-in `onClick` or `href` at the card level. The WHY: by separating visual affordance from click behavior, Ant Design avoids prescribing whether a clickable card navigates (link), triggers an action (button), or opens a modal (dialog). The `hoverable` prop is a visual contract ("this card responds to cursor"), while the actual click behavior is the developer's responsibility. This is pragmatic for enterprise use cases where the same visual card pattern might link to different types of interactions across a portal.

2. **`Card.Meta` as a standardized avatar/metadata subcomponent** (HIGH) — Card.Meta accepts `avatar`, `title`, and `description` and renders them in a fixed left-aligned layout. The WHY: the "avatar + name + description" pattern appears in an enormous proportion of enterprise cards — user profile cards, product listing cards, service catalog cards, team member cards. Standardizing this into a subcomponent creates visual consistency across all these uses without requiring teams to re-implement and re-debate the layout every time. It also creates an implicit naming convention: in Ant Design products, `Card.Meta` IS the standard way to present entity identity.

3. **`cover` prop as a first-class cover image slot** (MEDIUM) — The `cover` prop accepts any ReactNode and positions it full-bleed at the top of the card, above the header. The WHY: product gallery, content feed, and media portal use cases require image-first cards where the visual identity of the item (a product photo, an article thumbnail, a video preview) leads the layout. Making `cover` a top-level prop rather than asking teams to place an image inside the card's children ensures the image always appears in the correct position with the correct edge treatment (no internal padding, rounded corners applied at the card level).

4. **`tabList` for multi-panel content within a single card** (MEDIUM) — Cards can contain tabbed content via the `tabList` and `activeTabKey` props, turning a single card into a tabbed panel widget. The WHY: in enterprise dashboards, related metrics or data views are often presented as a single conceptual unit (e.g., "Sales Overview" with tabs for Week / Month / Year). A card with built-in tabs avoids the need to use the Tab component separately or manage a separate container, keeping the card as a self-contained widget.

5. **Two size variants (`default` and `small`) for density control** (MEDIUM) — The `size` prop switches between 24px and 12px padding. Enterprise dashboards frequently mix information-dense and more spacious cards within the same view. The two-size system lets teams signal which cards are "overview/summary" (default padding, comfortable reading) and which are "data/dense" (small padding, more information per pixel).

## Notable Props
- `hoverable`: Signals interactivity through visual affordance (shadow lift) without prescribing click behavior. This is Ant Design's explicit solution to the "entire card is clickable" design challenge.
- `loading`: Displays skeleton placeholders for all content areas when `true`. Built-in because async data loading is the norm in enterprise applications — card skeletons should look correct without developer implementation.
- `cover`: Full-bleed media slot positioned before the card header, elevating media as a first-class concern.
- `tabList` + `activeTabKey` + `onTabChange`: Complete tab management API within the card, turning it into a compound widget for multi-view content.
- `bordered` (default `true`): The border is on by default — Ant Design assumes cards need visible boundaries in information-dense layouts. Teams building image-grid cards can disable it, but the default reflects the enterprise dashboard context.
- `extra`: Right-aligned header slot for supplementary controls (a filter button, a settings icon, a "View all" link). Ant Design gives this its own prop because it appears in such a high proportion of cards that it needs to be an explicit layout slot.

## A11y Highlights
- **Keyboard**: The Card container is not focusable by default. Interactive elements inside (buttons in `actions`, tab list items) follow standard tab order. `hoverable` cards have no built-in keyboard activation — if the whole card is clickable, developers must add `tabIndex={0}` and an `onClick` with `onKeyDown` handler themselves.
- **Screen reader**: `Card.Meta` renders `title` as a heading element within the card, contributing to page heading hierarchy. The `actions` bar renders as a `<ul>` of `<li>` items, which is announced as a list by screen readers. The `loading` state disables pointer events but does not announce a loading status via `aria-live` — teams must add this themselves.
- **ARIA**: No implicit ARIA role on the card container — it renders as a `<div>`. Accessibility depends entirely on the content hierarchy inside the card. When `hoverable` is used to signal an interactive card, no `role` or `aria-label` is automatically added — this is a documented accessibility gap.

## Strengths & Gaps
- **Best at**: Providing built-in composition patterns for the most common enterprise card layouts — `Card.Meta`, `cover`, `tabList`, and `actions` together cover the majority of dashboard card patterns without requiring custom composition, which is why Ant Design Cards appear remarkably consistent across the enormous ecosystem of products built on it.
- **Missing**: The `hoverable` interactive card pattern lacks built-in keyboard support and ARIA semantics — teams using `hoverable` for fully clickable cards must implement accessibility themselves, which is a significant gap given how commonly this pattern appears in enterprise portals.
