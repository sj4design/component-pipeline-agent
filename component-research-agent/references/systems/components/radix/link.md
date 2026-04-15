---
system: Radix UI
component: Link
url: https://www.radix-ui.com/themes/docs/components/link
last_verified: 2026-03-29
confidence: high
---

# Link

## Approach
Radix Themes provides a `Link` component that wraps the native `<a>` anchor element with Themes-consistent typography styling, color tokens, and underline behavior. This component lives in Radix Themes rather than Radix Primitives because a link is natively accessible — the HTML `<a>` element with an `href` attribute carries full keyboard and screen reader support without any ARIA augmentation, meaning there is no accessibility primitive to own. The Themes Link component is primarily a styling and typography convenience, ensuring links integrate seamlessly with Radix Themes' font size scale, color system, and high-contrast mode. It supports the `asChild` prop (Radix's standard composition pattern) so it can render as any element or router link component while keeping Themes styling.

## Key Decisions
1. **Themes-only, no Primitive needed** (HIGH) — The native `<a>` element is already the accessible primitive; building a Radix Primitive for it would add abstraction with no ARIA value, so Link is purely a styled convenience component in Themes.
2. **asChild for router integration** (HIGH) — The `asChild` prop allows `Link` to render as a React Router `<Link>`, Next.js `<Link>`, or any custom element, preserving Themes styling while delegating routing behavior to the application's chosen router — this is the standard Radix composition escape hatch.
3. **Underline control prop** (MEDIUM) — Radix Themes exposes an `underline` prop (`"always"` | `"hover"` | `"none"`) because underline visibility is a common design disagreement; making it a prop rather than a CSS override reduces the need for custom style injection.

## Notable Props
- `href`: the anchor URL (passed through to the underlying `<a>`)
- `underline`: `"always"` | `"hover"` | `"none"` — controls underline visibility
- `color`: maps to Radix Themes color tokens
- `size`: `"1"` through `"9"` — maps to Themes type scale
- `weight`: `"light"` | `"regular"` | `"medium"` | `"bold"`
- `highContrast`: boolean — increases contrast against the background color
- `asChild`: boolean — renders children as the root element, merging props

## A11y Highlights
- **Keyboard**: Native `<a>` keyboard behavior; Tab to focus, Enter to activate; no additional keyboard management needed.
- **Screen reader**: Announced as a link with the anchor's text content; `href` presence distinguishes it from a button in screen reader output.
- **ARIA**: No additional ARIA attributes needed for standard use; `aria-label` should be added when link text is non-descriptive (e.g., "Read more").

## Strengths & Gaps
- **Best at**: Providing typographically consistent, theme-aware links that integrate with routing libraries via `asChild` with zero accessibility overhead.
- **Missing**: No built-in external link indicator (icon + `target="_blank"` handling with `rel="noopener noreferrer"` is left to the consumer); no visited state styling through the token system.
