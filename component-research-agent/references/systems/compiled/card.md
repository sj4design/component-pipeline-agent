---
component: card
compiled: 2026-03-28
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Card — All Systems Digest

## Material Design 3
**Approach**: Card as surface — three elevation-based variants (Elevated/Filled/Outlined) where elevation encodes meaning, not decoration. Clickable card is a first-class variant (6 total: 3 types × 2 interaction states). No built-in header/body/footer slots — anatomy defined in guidelines, implemented via composition per platform idioms.
**Key decisions**:
- Three elevation variants; wrong variant for a surface breaks Material's layering system — Elevated on colored background creates competing shadows; Filled avoids it
- Clickable card as build-time decision embedded in the variant (not a runtime prop); solves the "invisible link" problem where a card looks static but navigates
- No enforced slot API; Android/iOS/web have different layout primitives — a slot API would break one platform's idioms
**Notable API**: `elevation` (encodes variant semantics); `onClick`/`modifier.clickable()` (presence switches to interactive mode + ripple); no header/footer props
**A11y**: Interactive cards: `tabindex="0"` + Enter/Space to activate; `aria-label` required on card (no auto-generated name); correct role depends on context (article/group/none).
**Best at**: Elevation-as-meaning — most intentional use of elevation to communicate interactivity and hierarchy. **Missing**: No built-in structural slots; each team reimplements the same anatomy decisions.

## Spectrum (Adobe)
**Approach**: Purpose-built for collection browsing — media galleries, asset libraries, template pickers. Two style variants: Standard (container + border) and Quiet (no container). Selection and drag-and-drop are first-class built-in interaction modes. Preview region is the dominant anatomy slot (thumbnail-first hierarchy).
**Key decisions**:
- Quiet variant removes container; Adobe tools embed cards in dark/textured backgrounds where visible borders create visual noise — content should carry visual weight without an imposed frame
- Built-in selection (`isSelected`) and drag (`isDraggable`); Adobe products universally involve selecting items from collections for batch actions — every team would otherwise reimplement the same keyboard-handling pattern
- Action menu (three-dot overflow) instead of exposed buttons; in dense grids of 50-100 cards, multiple visible buttons per card creates cognitive overload
**Notable API**: `variant` (standard|quiet); `isSelected`; `isDraggable`; `size` (S|M|L); `orientation` (vertical|horizontal)
**A11y**: role="gridcell" or role="option" depending on selection mode; Ctrl/Cmd+Arrow for non-contiguous multi-select; action menu auto-labeled "More actions for [title]".
**Best at**: Collection-browsing with native selection and drag-and-drop — most complete selection story of any Tier 1 system. **Missing**: Not designed for general-purpose content grouping; using outside a collection context fights the component's assumptions.

## Carbon (IBM)
**Approach**: Called "Tile" — a stable, minimal primitive with four distinct interaction variants (Base/Clickable/Selectable/Expandable). "Card" is a pattern built on top of Tile. Each variant has distinct markup, ARIA, and keyboard behavior, forcing explicit semantic choice. 1px visible border added to all interactive variants for WCAG contrast.
**Key decisions**:
- Four separate variants instead of one configurable component; each solves a different interaction problem (static/navigate/select/disclose) — one component with props would enable accidental semantic misuse
- Clickable Tile is a native `<a>` element (not a wrapped button); tiles that change the URL are links — misusing role="button" on navigation is one of the most common a11y violations in enterprise software
- Selectable Tile uses role="radio"/role="checkbox" with matching visual icons; visual widget must match ARIA role for users with cognitive disabilities — the old checkmark icon on a radio-group tile created a false mental model
**Notable API**: `href` (ClickableTile, presence signals anchor semantics); `value` (SelectableTile, form participation); `expanded` (ExpandableTile, controlled/uncontrolled); `light` (surface color toggle)
**A11y**: Base: not focusable. Clickable: Enter only (link semantics, Space reserved for buttons). Selectable: Arrow keys in group, Space to select. Expandable: aria-expanded.
**Best at**: Explicit interaction semantics enforced at component level — most accessible "card" implementation in enterprise systems. **Missing**: No cover image slot, no built-in header/footer structure, no loading/skeleton state at Tile level.

## Polaris (Shopify)
**Approach**: Most opinionated general-purpose card — the foundational unit of the merchant admin interface. Underwent LegacyCard → Card redesign: removed all built-in props (title, actions, primaryFooterAction) in favor of composition with layout primitives. Only `background`, `padding`, and `roundedAbove` remain. Responsive padding/border-radius built in.
**Key decisions**:
- Composition over configuration; as Shopify Admin grew to thousands of screens, fixed slot API couldn't accommodate the variety of layouts — composition lets teams build any structure without fighting the component
- Responsive `padding` and `roundedAbove` props; merchants use Admin on mobile retail devices — cards with desktop padding on mobile waste precious screen real estate; responsiveness must be automatic
- One primary CTA per card (guidelines); merchant decision fatigue is real — multiple equally-weighted actions create paralysis when managing hundreds of products and orders
**Notable API**: `background` (semantic color tokens only); `padding` (responsive breakpoint objects); `roundedAbove` (breakpoint-aware border radius)
**A11y**: Card container has no ARIA role; semantic structure via heading hierarchy inside (`<h2>` per card); interactive elements within follow normal tab order.
**Best at**: Opinionated composition guidelines for merchant admin — header/footer/section action placement rules are more detailed than any other system. **Missing**: No clickable card variant, no selection state, no cover image slot.

## Atlassian
**Approach**: No generic layout Card component — instead provides domain-specific card types: Smart Card (URL-resolving link preview), Spotlight Card (onboarding), Profile Card (user hover card), Media Card. "Cards" in Atlassian represent specific objects (Jira issues, Confluence pages, users) with fixed meaningful anatomy, not generic containers.
**Key decisions**:
- No generic Card; across Jira/Confluence/Trello the variety of "card-like" patterns is too vast — a generic component would be too rigid or too flexible to provide real constraint; Box primitives with shared tokens achieve visual consistency without structural prescription
- Smart Card as primary pattern; Atlassian products are fundamentally about linking work — a URL that resolves into a structured preview (status, assignee, summary) is more useful than a generic container
- Spotlight Card scoped to onboarding only; misuse of generic cards for feature announcements created disruptive experiences — a narrow-scope component prevents misuse
**Notable API**: Smart Card `url` (entire data source); Smart Card `appearance` (inline|block|embed); Spotlight Card `actions` (typed array with primary/secondary); Profile Card `cloudId`+`userId`
**A11y**: Smart Cards announce as links with resolved object title; Profile Cards triggered by avatar button (not hover-only, for keyboard users); draggable Jira Board cards require aria-grabbed + keyboard drag initiation via action menu.
**Best at**: Domain-specific card representations — Smart Card's URL-to-preview resolution is unique among Tier 1 systems. **Missing**: No generic layout Card; non-domain cards must be composed from Box primitives without Card-specific guidance.

## Ant Design
**Approach**: Feature-rich built-in composition: `Card.Meta` (avatar/title/description pattern), `cover` (full-bleed media), `tabList` (multi-panel within card), `actions` (footer action bar), `loading` (skeleton placeholder), `hoverable` (shadow lift as interactive signal). Two sizes (default/small). Prioritizes richness over flexibility.
**Key decisions**:
- `Card.Meta` standardized subcomponent; "avatar + name + description" appears in an enormous proportion of enterprise cards — standardizing prevents teams from re-debating the same layout every time
- `hoverable` prop without built-in click handler; separates visual affordance (shadow signals interactivity) from click behavior (navigate/action/modal) — pragmatic for enterprise portals where the same visual pattern triggers different interaction types
- `tabList` for multi-panel content within one card; enterprise dashboards present related data views as a single conceptual unit — built-in tabs avoid a separate Tab component and a separate container
**Notable API**: `hoverable`; `loading` (skeleton placeholders); `cover`; `tabList`/`activeTabKey`/`onTabChange`; `extra` (right-aligned header slot); `size` (default|small); `bordered`
**A11y**: Card container renders as `<div>` with no implicit role; `hoverable` adds no aria-label or role automatically — teams using fully-clickable cards must add tabIndex, onClick, and aria-label themselves; significant documented gap.
**Best at**: Built-in composition patterns for common enterprise layouts — Card.Meta + cover + tabList + actions cover the majority of dashboard cards without custom composition. **Missing**: `hoverable` interactive pattern lacks built-in keyboard support and ARIA semantics.
