---
component: bottom-nav
tier: 3
last_verified: 2026-03-31
---

# Bottom Nav — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Not available | No bottom navigation primitive. Radix provides unstyled primitives for Tabs and NavigationMenu, but neither targets fixed-bottom mobile navigation. Teams compose from primitives. | high |
| Chakra UI | Not available | No dedicated bottom nav component. Chakra provides Tabs and general layout primitives. Community recipes exist using `Box` with `position="fixed"` + `bottom={0}` + `HStack`, but nothing official. | high |
| GOV.UK | Not available | No bottom navigation component. GOV.UK's navigation model is sequential (start page > step-by-step) and breadcrumb-based. Mobile navigation uses a collapsible menu button, not a bottom tab bar. Government services prioritize linear task flows over app-like tab switching. | high |
| Base Web (Uber) | BottomNavigation | One of the few web design systems with a dedicated bottom navigation component. Designed for Uber's rider/driver mobile web experiences. Supports 2-5 items, icon + label, active state styling. Integrates with Base Web's overrides system for deep customization. | high |
| Fluent 2 (Microsoft) | TabList (bottom placement) | No standalone bottom nav component, but TabList supports `vertical={false}` placement that can be positioned at screen bottom. Teams on Android use the native BottomNavigation from Fluent UI Android. Web implementation requires manual fixed positioning of TabList. | medium |
| Gestalt (Pinterest) | Not available | No bottom navigation component in the web library. Pinterest's mobile app uses native bottom tabs (Home/Search/Create/Shop/Profile). The web experience uses a side navigation panel, not bottom tabs. | medium |
| Mantine | Not available | No dedicated bottom nav component. Mantine provides Tabs and NavLink but neither targets fixed-bottom mobile layout. Community recipes exist but are not part of the core library. | high |
| Orbit (Kiwi.com) | NavigationBar | Mobile-focused bottom navigation for Kiwi.com's travel app. Supports 2-5 items with icon + label. Active state with color differentiation. Designed for the booking flow's primary destinations (Search/Trips/Manage/Profile). Part of Orbit's React Native + web component set. | medium |
| Evergreen (Segment) | Not available | No bottom navigation component. Evergreen is focused on Segment's desktop analytics dashboard — sidebar navigation is the primary pattern. | medium |
| Nord (Nordhealth) | Not available | No bottom navigation component. Nord serves Nordhealth's desktop-first clinical and veterinary software products where sidebar/top navigation dominates. | low |

## Key Decision Patterns

Base Web's BottomNavigation is the most significant Tier 3 finding — it's one of only two web design systems across all tiers (alongside Ant Design Mobile) to ship a dedicated bottom navigation component. This is driven directly by Uber's product needs: the rider app, driver app, and Uber Eats all have mobile-web variants where a bottom tab bar is the primary navigation pattern. Base Web's overrides architecture means the component is deeply customizable (icon rendering, active indicator shape, label visibility) without forking.

Orbit's NavigationBar is the other Tier 3 system with explicit bottom navigation support. Kiwi.com's travel booking app has the same mobile-app-like navigation needs as Uber — a small set of primary destinations (Search, Trips, Manage, Profile) that users switch between frequently. Orbit's implementation is simpler than Base Web's, without the overrides system, but covers the essential pattern.

Fluent 2's approach of repurposing TabList for bottom navigation reflects Microsoft's "one component, many placements" philosophy. Rather than building a separate BottomNavigation component, TabList can theoretically be positioned anywhere. In practice, teams building Microsoft mobile web experiences need to add fixed positioning, safe-area padding, and mobile-specific touch targets manually — the ergonomics are weaker than a purpose-built component.

The 7-out-of-10 absence rate in Tier 3 mirrors the Tier 2 pattern: bottom navigation is overwhelmingly treated as a native mobile concern, not a web design system responsibility. The two systems that do include it (Base Web, Orbit) are both products with strong mobile-web experiences where native apps coexist with progressive web apps.

GOV.UK's absence is architecturally motivated rather than just a gap — government services are designed as linear task flows (apply for a passport, renew a license), not as multi-destination apps. A bottom tab bar would imply lateral browsing that contradicts the sequential service design philosophy.

## A11y Consensus

- Base Web: renders as `<nav>` with `role="navigation"`; each item is a link; active item uses `aria-current="page"`; meets WCAG 2.1 AA touch target requirements (48x48dp minimum)
- Orbit: uses `role="navigation"` wrapper; items are buttons with `aria-selected` for active state; labels are always visible (no icon-only mode)
- Fluent 2 TabList: inherits tab pattern ARIA (`role="tablist"`, `role="tab"`, `aria-selected`); when repurposed as navigation, teams should switch to `role="navigation"` with links — the tab pattern implies content panels, not page navigation
- Cross-system: labels should always be visible (not icon-only) for bottom nav — unlike toolbars, bottom nav destinations are primary and must be immediately comprehensible
- Badge/notification counts must be part of the link's accessible name, not just visual decoration

## Recommended Use

Reference Base Web's BottomNavigation for the most complete web-targeted implementation with deep customization via overrides. Reference Orbit's NavigationBar for a simpler, travel/booking-app-oriented pattern. For systems building bottom nav from primitives, Radix NavigationMenu or Chakra Tabs provide the best unstyled foundation, but require significant composition work for mobile-specific behavior (fixed positioning, safe area, scroll hide/show, badge integration).
