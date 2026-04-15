---
system: Material Design 3
component: Not available natively
url: https://m3.material.io/components
last_verified: 2026-03-28
---

# Breadcrumb

## Approach
Material Design 3 does not include a standalone Breadcrumb component, and this absence is more philosophically intentional than the missing Avatar. M3 is explicitly optimized for mobile and cross-platform applications, and breadcrumbs are fundamentally a desktop/web navigation pattern. The breadcrumb's use case — communicating the user's position in a multi-level hierarchy and enabling quick navigation to ancestor levels — is solved differently on mobile. M3's Top App Bar with a back arrow, combined with the screen title, provides the equivalent wayfinding cue on mobile: users know where they are (the title) and can go back one level (the back button). Adding a breadcrumb trail on mobile would create visual clutter in the constrained screen space and would duplicate the back-navigation behavior already handled by the platform (Android back button, iOS back swipe gesture).

For teams building web applications on M3 who need breadcrumbs, the recommended approach is to compose the breadcrumb using M3's text styles and interaction states. The typical pattern uses `labelLarge` or `labelMedium` typography tokens for the crumb labels, M3's `primary` color role for links and the interactive states, and a system separator character (/ or ›) styled in the `outline` color role. The `NavigationRail` and `NavigationDrawer` components partially address hierarchy communication in M3, but they are persistent navigation elements, not contextual position indicators. This gap is widely noted by web developers adopting M3 for non-mobile contexts, where the lack of breadcrumb guidance creates inconsistent implementations across different web apps using M3 as their design foundation.

## Key Decisions
1. **Mobile-first philosophy excludes web-centric patterns** (HIGH) — M3 made the explicit choice to optimize for mobile first, which means several web navigation patterns (breadcrumbs, pagination, tabs with scroll on desktop) either don't exist or are underdeveloped. This is not an oversight but a philosophy: M3 would rather do mobile navigation exceptionally well than do both mobile and web navigation adequately.
2. **Back navigation as breadcrumb substitute** (MEDIUM) — The Top App Bar's back button + title combination covers the most common mobile wayfinding need: "where am I and how do I go back." This covers 80% of the breadcrumb use case on mobile, where users rarely need to jump 3 levels up in one click (they swipe back multiple times instead).
3. **No composition guidance** (LOW) — Unlike the Avatar absence (where M3 at least gestures at how to compose one using tokens), there is no official composition guidance for breadcrumbs in M3. Teams are completely on their own, which leads to inconsistency.

## Notable Props
- No official props — component does not exist

## A11y Highlights
- **Keyboard**: No guidance provided
- **Screen reader**: No guidance provided; W3C ARIA best practices recommend `<nav aria-label="Breadcrumb">` with `aria-current="page"` on the last item, but M3 does not document this
- **ARIA**: No standardized pattern

## Strengths & Gaps
- **Best at**: Nothing breadcrumb-specific — M3's back-navigation pattern handles the mobile equivalent effectively
- **Missing**: Entirely absent — no component, no composition guidance, no a11y guidance, and no separator token; teams building M3-based web apps must start from scratch
