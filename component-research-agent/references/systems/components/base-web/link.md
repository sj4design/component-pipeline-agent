---
system: Base Web (Uber)
component: Link
url: https://baseweb.design/components/link/
last_verified: 2026-03-29
confidence: high
---

# Link

## Approach
Base Web's Link component is a thin, styled wrapper around the native `<a>` element that applies the system's typography and color tokens for hyperlink text. It is intentionally minimal: its only job is to render an accessible, consistently-styled anchor that respects Base Web's theme (including dark mode link colors). The component is not a routing abstraction — it does not integrate with React Router or any SPA navigation library out of the box. Teams using client-side routing pass their router's `<Link>` component via the override system, maintaining the visual contract while swapping the DOM element.

## Key Decisions
1. **Native anchor semantics preserved** (HIGH) — Rendering a true `<a>` ensures correct browser behavior (right-click, open-in-new-tab, history navigation) and screen reader link announcements.
2. **Token-driven colors** (HIGH) — Link inherits color from `colors.linkText` and `colors.linkVisited` theme tokens, so it adapts automatically to custom themes and dark mode.
3. **Router integration via overrides** (HIGH) — Rather than bundling router adapters, Base Web lets teams pass their router's Link as the Root override, keeping the component library router-agnostic.
4. **Minimal API surface** (MEDIUM) — No variant or size props beyond what the native `<a>` provides; styling is managed at the theme level.

## Notable Props
- `href`: string — the link destination
- `target`: string — native anchor target (`_blank`, etc.)
- `rel`: string — relationship attribute (e.g., `noopener noreferrer`)
- `overrides`: object — Root element override for router integration

## A11y Highlights
- **Keyboard**: Focusable and activated with Enter; visible focus ring applied via theme.
- **Screen reader**: Native `<a>` element ensures links are announced correctly in the links list and inline.
- **ARIA**: No additional ARIA needed for standard use; `aria-label` or `aria-describedby` can be added for supplemental context.

## Strengths & Gaps
- **Best at**: Consistent, token-aware link styling with correct native semantics; easy router swapping via overrides.
- **Missing**: No icon+link compound variant; no "external link" indicator built in; no size variants for headings vs. body text.
