---
system: Evergreen (Segment/Twilio)
component: Link
url: https://evergreen.segment.com/components/link
last_verified: 2026-03-29
confidence: high
---

# Link

## Approach
Evergreen's Link component is a styled anchor that integrates with Evergreen's color token system, providing consistent inline link styling across Segment's dashboards and documentation surfaces. The component is used for navigational links within the SPA (connecting to different sections of the product), external links to documentation and third-party destinations, and contextual links within data tables (e.g., linking a source name to its detail view). Evergreen's Link is intentionally minimal — it handles color, hover state, and focus ring, and delegates routing integration to the consuming application (via Next.js Link wrapping or React Router's component prop pattern).

## Key Decisions
1. **Color-system integration** (HIGH) — Link color is derived from Evergreen's color tokens (blue by default, matching the system's interactive element color), ensuring links are consistent with buttons and other interactive elements in Segment's visual hierarchy.
2. **`is` prop for router integration** (HIGH) — Evergreen's polymorphic `is` prop allows the Link to render as any component (e.g., `is={RouterLink}` for React Router, `is={NextLink}` for Next.js), making it router-agnostic without requiring a custom router-specific link component.
3. **`color` prop for variant contexts** (MEDIUM) — Supports neutral, muted, and themed color variants for links that appear in different background contexts (e.g., a white link in a dark navigation header vs. a blue link in body copy).

## Notable Props
- `href`: destination URL
- `is`: polymorphic render target (default: `"a"`) — use for router integration
- `color`: color variant token
- `size`: text size (inherits from Evergreen's text size scale)
- `target`: forwarded to the underlying `<a>` element
- `rel`: forwarded for security attributes on external links

## A11y Highlights
- **Keyboard**: Focusable via Tab; Enter activates navigation; visible focus ring uses Evergreen's focus token.
- **Screen reader**: Renders as a native `<a>`; `href` presence makes it a link (not a button); external links should have visually hidden context added by the consuming app.
- **ARIA**: No ARIA overrides; relies on native anchor semantics for full screen reader compatibility.

## Strengths & Gaps
- **Best at**: Clean inline links with color-system integration; router-agnostic via `is` prop; composable with Evergreen's typography scale.
- **Missing**: No built-in external link indicator or "opens in new tab" announcement; no icon-with-link variant out of the box; visited state not styled by default.
