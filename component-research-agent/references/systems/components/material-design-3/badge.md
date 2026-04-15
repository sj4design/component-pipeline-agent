---
system: Material Design 3
component: Badge (NavigationBar context only — not a standalone component)
url: https://m3.material.io/components/navigation-bar/specs
last_verified: 2026-03-28
---

# Badge

## Approach
Material Design 3 does not include a standalone Badge component. This is a deliberate philosophical choice rooted in M3's mobile-first, context-driven design methodology. In M3, badges are tightly coupled to NavigationBar items — they exist exclusively to surface notification counts or status signals on navigation destinations. The rationale is that in mobile applications, the badge's primary job is to direct attention to a navigation destination, not to annotate arbitrary UI elements. Rather than abstracting a universal Badge primitive that could be misused or placed anywhere, M3 scopes its badge pattern to the single context where it provides the most unambiguous value. Teams building on M3 who need a general-purpose badge must compose their own using M3's color tokens and shape tokens (the "extra small" shape token maps to a fully rounded pill).

## Key Decisions
1. **Navigation-scoped existence** (HIGH) — The badge only appears on NavigationBar and NavigationDrawer items, not as a general component. This prevents misuse of badges as decoration, keeping their semantic meaning clear: "there is new activity at this destination." The constraint forces intentionality — if you're placing a badge, it must mean something actionable.
2. **Small vs. Large badge variants** (HIGH) — M3 distinguishes between a dot badge (no count, just a presence indicator) and a number badge (displays a count). The dot variant communicates "something new exists" without quantifying it, which is deliberately chosen for cases where the exact count is irrelevant or anxiety-inducing. This follows research showing that vague indicators reduce count-anxiety compared to specific numbers.
3. **Color using Error token** (MEDIUM) — Badges use the `error` color role by default. This is not accidental — M3 treats badge counts as alerts requiring attention, and aligning them with the error color role means they automatically adapt across light/dark themes and dynamic color schemes without custom overrides.
4. **99+ overflow pattern** (MEDIUM) — When counts exceed 99, M3 specifies displaying "99+" rather than the actual number. This caps label width to 3 characters, preserving the circular badge shape and preventing layout jank in NavigationBar items with long destination labels.

## Notable Props
- `count`: Controls dot vs. number display — passing 0 or undefined renders the dot form, any positive integer renders the count form
- No `position` prop: Positioning is hardcoded to top-end of the NavigationBar icon; general-purpose positioning is not supported

## A11y Highlights
- **Keyboard**: No direct keyboard interaction — badges are decorative indicators, not interactive targets
- **Screen reader**: Count is announced as part of the NavigationBar item label (e.g., "Inbox, 5 notifications")
- **ARIA**: No standalone ARIA role; the count is integrated into the parent item's accessible name via `aria-label` on the NavigationBar button

## Strengths & Gaps
- **Best at**: Providing a semantically constrained, themeable badge for mobile navigation contexts with minimal configuration
- **Missing**: No standalone badge component for use on buttons, avatars, or list items — teams must build their own general-purpose badge using M3 tokens
