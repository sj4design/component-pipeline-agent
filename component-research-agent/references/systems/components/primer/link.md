---
system: GitHub Primer
component: Link
url: https://primer.style/components/link
last_verified: 2026-03-28
confidence: high
---

# Link

## Approach
GitHub Primer's Link component provides styled anchor element with GitHub's link styling (color, underline behavior, hover states). Used throughout GitHub for repository names, username links, file paths, and documentation references. Primer's Link supports polymorphic rendering for Next.js/React Router Link composition. The "inline-children" pattern allows rich content within links.

## Key Decisions
1. **as prop for router integration** (HIGH) — Link's `as` prop allows rendering as a router Link component (Next.js Link, React Router Link) while maintaining Primer's link styling, solving the common SPA navigation integration challenge.
2. **Underline configuration** (MEDIUM) — `underline` prop controls whether the link always shows underline or only on hover, addressing GitHub's style convention of underline-on-hover for inline links.
3. **muted variant** (MEDIUM) — Muted links (gray rather than blue) for secondary navigation and metadata links in GitHub's information-dense interfaces.

## Notable Props
- `href`: Link URL
- `as`: Element/component to render as (for router integration)
- `underline`: Boolean for always-underlined vs hover-only
- `muted`: Boolean for muted/secondary link color

## A11y Highlights
- **Keyboard**: Native anchor activation; router Link preserves keyboard behavior
- **Screen reader**: Native link semantics; link text content as accessible name
- **ARIA**: Native anchor ARIA; meaningful text required

## Strengths & Gaps
- **Best at**: Router Link integration via `as` prop; muted variant for secondary links; GitHub's specific link pattern
- **Missing**: No automatic external link indicator; external link handling is manual
