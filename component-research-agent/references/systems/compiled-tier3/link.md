---
component: Link
tier: 3
last_verified: 2026-03-29
---

# Link — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Link (Themes) | Themes-only styled wrapper; `asChild` for router integration; `underline` prop (always/hover/none); `highContrast` for colored backgrounds; no Primitive needed since native `<a>` is accessible by default. | high |
| Chakra UI | Link | `isExternal` automatically adds `target="_blank" rel="noopener noreferrer"`; full style props passthrough; v3 migrated to `asChild` pattern for router integration. | high |
| GOV.UK | Link (CSS classes) | No component — native `<a>` with CSS modifier classes; mandatory underline in body copy; preserved `:visited` purple color; explicit "(opens in new tab)" text required for external links. | high |
| Base Web | Link | Thin styled wrapper; `colors.linkText` and `colors.linkVisited` theme tokens for dark mode support; router integration via `overrides.Root` override. | high |
| Fluent 2 | Link | `inline` prop for text baseline alignment; `appearance="subtle"` for low-emphasis links; `disabled` removes href while keeping text; `aria-disabled` for screen readers; Windows high-contrast mode via token mapping. | high |
| Gestalt | Link | `externalLinkIcon` prop with automatic `aria-label` suffix ("opens in a new tab"); automatic `rel="noopener noreferrer"` on `target="_blank"`; `display` prop (inline/inlineBlock/block) for card-title link patterns. | high |
| Mantine | Anchor | Named Anchor (not Link) to avoid React Router naming collision; built on Text component, inherits full typography scale; `component` prop for router polymorphism; `truncate` for long URLs. | high |
| Orbit | TextLink | `external` boolean adds `target="_blank"` with visually hidden "(opens in new tab)" for screen readers; `type` prop (primary/secondary/white) for dark background legibility; `standAlone` for block-level link layout. | high |
| Evergreen | Link | `is` polymorphic prop for router integration; color variant tokens; minimal external link handling (must be added manually). | high |
| Nord | Not available — token-level CSS | No `<nord-link>` component; link color applied globally via CSS Custom Properties on native `<a>` elements; visited state preserved for clinical navigation orientation. | high |

## Key Decision Patterns

The Link component is the clearest T3 example of a native HTML element that design systems choose to wrap (or not) for entirely different reasons. Three systems — GOV.UK, Nord, and Radix Primitives — explicitly decline to wrap the anchor element, arguing that the native `<a>` is already the accessible primitive. Seven systems provide a styled wrapper, but none of them claim to add accessibility value over the native element; they add styling integration, router polymorphism, and convenience APIs. This is the honest explanation for Link components in design systems: they are styling and composition utilities, not accessibility primitives.

The most practically significant cross-system difference is the treatment of external links. Orbit and Gestalt both provide automatic external link handling (`rel="noopener noreferrer"`, visually hidden "(opens in new tab)" text for screen readers), treating security and disclosure as first-class concerns. Chakra's `isExternal` prop applies the security attributes but delegates the visual disclosure indicator to the consumer. Most other systems provide no external link handling at all, leaving security and disclosure entirely to the developer. GOV.UK's research-backed requirement — that new-tab links must have a visible "(opens in new tab)" warning — is the strongest documented argument for building this into the component.

Mantine's naming decision ("Anchor" rather than "Link") is the most pragmatic API design choice in the T3 set. The React ecosystem has a pervasive naming collision: every router library exports a `<Link>` component, and importing both causes aliasing boilerplate. Naming the component Anchor eliminates this entirely — it is a link (the HTML concept), not a Link (the router concept). No other T3 system addresses this naming conflict explicitly, leaving every application to handle the aliasing themselves.

GOV.UK and Nord both preserve the `:visited` link state, and both give a domain-specific reason: GOV.UK argues it helps users with memory difficulties track where they have been in a government transaction; Nord argues it helps clinicians track which patient records and lab results they have already reviewed. These parallel arguments from different domains confirm that visited state is not a cosmetic choice — it is a navigation orientation aid with real users who depend on it.

## A11y Consensus

- Native `<a href="...">` is the universal base element for links; all T3 systems that provide a Link component render a native anchor, preserving keyboard activation (Tab+Enter), browser history, right-click context menus, and screen reader link announcements.
- Link text must be descriptive; "click here," "read more," and URL strings are uniformly discouraged across T3 systems — `aria-label` or visually hidden supplementary text is required when visible text alone is insufficient.
- Links that open in a new tab must disclose this behavior visibly or via `aria-label`; Orbit and Gestalt implement this automatically; GOV.UK mandates it as a design standard.
- `rel="noopener noreferrer"` is required on `target="_blank"` links to prevent reverse tabnapping; Gestalt and Orbit apply this automatically; other systems require manual application.
- `:visited` state styling should not be suppressed without strong reason — GOV.UK and Nord both document that it serves navigation orientation needs for users with memory-related challenges.

## Recommended Use

Reference T3 link approaches when deciding on router integration patterns, external link disclosure requirements, and naming conventions. Gestalt is the reference for automatic external link handling with screen reader disclosure; GOV.UK is the reference for underline-as-mandatory and visited-state preservation arguments; Mantine's Anchor naming is the reference for resolving the React Router naming collision; Orbit is the reference for the `external` prop pattern with visually hidden screen reader text.
