---
system: Adobe Spectrum
component: Not available natively
url: https://spectrum.adobe.com/page/avatar/
last_verified: 2026-03-28
---

# Avatar

## Approach
Adobe Spectrum does not include a native Avatar component in its core design system library. Note that Spectrum does have an `Avatar` page in its newer documentation (spectrum.adobe.com/page/avatar/), but this describes a limited, early-stage component that is available in React Spectrum only, not in all Spectrum implementations. The component, where it does exist in React Spectrum, is focused narrowly on rendering a circular profile image — it is significantly less mature than the Avatar implementations in Atlassian or Ant Design, lacking AvatarGroup, initials fallback, and size variants beyond basic sizing.

Spectrum's primary enterprise focus (creative tools, analytics platforms, document management) means that avatar-heavy UIs are not a dominant pattern in Adobe's product portfolio. Adobe Analytics doesn't have a "user list." Photoshop doesn't display teammate avatars. The contexts where avatars appear in Adobe products (collaboration features in Creative Cloud, shared documents in Adobe XD) are handled with custom implementations or the basic React Spectrum Avatar where available. Teams building on Spectrum who need a robust avatar system typically look to the React Spectrum `Avatar` for simple cases and build their own for AvatarGroup, fallback sequences, and interactive states.

## Key Decisions
1. **Image-only focus in the limited implementation** (HIGH) — Where Spectrum's Avatar exists, it renders a circular `<img>` with appropriate `alt` text. There is no built-in fallback to initials or an icon when the image fails to load. This is consistent with Spectrum's philosophy of doing one thing well, but it leaves the fallback problem entirely to the consumer.
2. **No AvatarGroup** (HIGH) — Spectrum provides no group/stack pattern for displaying multiple avatars together. In Adobe's collaboration contexts (e.g., "5 people are viewing this document"), teams build custom stacking with manual overlap CSS. The absence is notable given how common this pattern is in collaborative software — precisely the domain where Adobe products operate.
3. **Sizing through the provider pattern** (MEDIUM) — Where the React Spectrum Avatar exists, sizing follows Spectrum's provider-based density system rather than explicit size props, keeping size consistent with surrounding content density context.

## Notable Props
- `src`: Image URL
- `alt`: Required alt text — Spectrum enforces this, which is a positive a11y decision
- No `fallback`, `initials`, `size`, or `group` props in the basic implementation

## A11y Highlights
- **Keyboard**: Non-interactive avatar has no keyboard behavior; interactive avatar (e.g., wrapped in ActionButton) inherits button keyboard semantics
- **Screen reader**: `alt` prop is enforced — Spectrum's linting rules flag missing alt text on Avatar, which is among the better a11y enforcement approaches in Tier 1
- **ARIA**: Renders as `<img>` with alt; no additional ARIA roles unless consumer wraps in an interactive element

## Strengths & Gaps
- **Best at**: Enforcing alt text as a required prop — the one a11y decision that is better than most peers
- **Missing**: No initials fallback, no icon fallback, no AvatarGroup, no size scale, no loading/error states — one of the least complete Avatar implementations across Tier 1 systems
