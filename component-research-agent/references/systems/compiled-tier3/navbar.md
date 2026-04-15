---
component: Navbar
tier: 3
last_verified: 2026-03-31
---

# Navbar — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | NavigationMenu | Viewport-based mega-menu system: NavigationMenu.Content panels render inside a shared NavigationMenu.Viewport that animates between items; designed for rich dropdown content, not a full navbar shell. | high |
| Chakra UI | No dedicated Navbar — Flex + HStack composition | Chakra documents navbar as a composition recipe using Flex, HStack, IconButton (hamburger), Drawer (mobile), and Menu (user dropdown); no single component. | high |
| GOV.UK | Header + Service Navigation | Separate Header (crown logo, service name, navigation links) and Service Navigation (in-service section tabs); mobile collapses to a "Menu" button revealing links; govuk-header has strict accessibility requirements. | high |
| Base Web | HeaderNavigation | Minimal header layout component with named regions (logo, left, center, right) using overrides; no built-in navigation link handling — purely layout. Paired with StyledNavigationList for link groups. | medium |
| Fluent 2 | NavBar (not yet available) — composed from Toolbar + Menu | Fluent 2 does not ship a dedicated NavBar component; the pattern is composed from Toolbar (horizontal icon/action bar) and MenuBar (horizontal menu); Microsoft products use a bespoke ribbon/command bar pattern instead. | high |
| Gestalt | PageHeader (not a navbar) | Gestalt does not have a top navigation bar component. PageHeader provides page-level title, breadcrumbs, and actions below the navbar. Pinterest uses a custom global header not published in Gestalt. | high |
| Mantine | AppShell.Header | Part of AppShell layout system; Header is a fixed-height region at the top that integrates with Navbar (sidebar) and responsive breakpoints via AppShell; Burger component handles hamburger toggle. | high |
| Orbit | NavigationBar | Mobile-first bottom navigation bar with NavigationBarItem icons + labels; designed for Kiwi.com mobile booking flow. Not a top header — it is a bottom tab bar similar to M3's Navigation Bar. | high |
| Evergreen | No navbar component | Evergreen focuses on SPA sidebar navigation; no top header/navbar component exists. Teams using Evergreen compose headers from Pane, Heading, and IconButton primitives. | high |
| Nord | nord-header | Persistent top header for Nordhealth applications with logo, navigation links, user menu, and notification area; web component with slots for flexible content; integrates with nord-navigation (sidebar). | high |

## Key Decision Patterns

Radix UI's NavigationMenu is architecturally unique in the T3 set — and across all tiers. Rather than modeling a full navbar, it focuses exclusively on the dropdown content problem: multiple trigger items share a single animated viewport that smoothly transitions between content panels. This solves the "mega-menu jank" problem where each dropdown independently mounts/unmounts. However, NavigationMenu is not a navbar shell — it handles only the navigation links + dropdowns portion, requiring teams to compose it into a broader header layout.

Mantine's AppShell.Header is the most integrated approach in T3. The Header is not a standalone component but a layout region within AppShell that automatically coordinates with Navbar (sidebar), Aside, and Footer. Responsive breakpoints in AppShell control when the sidebar collapses and the header's Burger becomes visible. This is similar to Carbon's UI Shell (T1) but with Mantine's simpler API.

Orbit's NavigationBar is notably different from every other system's navbar — it is a bottom tab bar for mobile, not a top header. This reflects Kiwi.com's mobile-first booking flow where the primary navigation lives at the bottom of the screen (Search, Trips, Profile). This is architecturally closer to M3's Navigation Bar than to a traditional top navbar.

GOV.UK's Header has the strictest structural requirements: the crown logo and service name must follow exact placement rules, the navigation links must collapse behind a "Menu" button (not a hamburger icon) on mobile, and the component must meet WCAG 2.1 AA. The separation of Header (global identity) and Service Navigation (in-service tabs) is a meaningful architectural distinction for government services.

The "no navbar" pattern is significant in T3: Gestalt (Pinterest), Evergreen (Segment), Fluent 2, and Chakra all lack a dedicated navbar component. Each has a different reason — Pinterest's navbar is too product-specific for Gestalt, Evergreen uses sidebar navigation, Fluent 2 uses bespoke command bars, and Chakra treats it as a composition exercise. This suggests that navbars are among the most product-specific components, resistant to generic abstraction.

## A11y Consensus

- Top-level header should use `<header>` or `role="banner"` as the page banner landmark — GOV.UK, Nord, and Mantine enforce this.
- Navigation links within the header must be wrapped in `<nav aria-label="Main navigation">` (or equivalent) to distinguish from other nav landmarks.
- GOV.UK explicitly requires that the "Menu" toggle button announces its expanded/collapsed state via `aria-expanded` and that the revealed navigation is linked via `aria-controls`.
- Radix NavigationMenu provides automatic `aria-expanded` on triggers, `role="navigation"` on the root, and manages focus within the viewport content panels.
- Mobile hamburger/menu toggles must have accessible names (`aria-label="Open menu"` or `aria-label="Menu"`) and `aria-expanded` state — every T3 system that implements collapse requires this.
- Skip-to-content links should precede the navbar in DOM order — GOV.UK and Nord implement this as a mandatory pattern.

## Recommended Use

Reference T3 navbar approaches for specialized patterns: Radix NavigationMenu for animated mega-menu viewports with smooth content transitions; Mantine AppShell.Header for integrated shell layouts with responsive sidebar coordination; GOV.UK Header for government/institutional sites with strict accessibility compliance; Nord nord-header for healthcare SaaS applications with slot-based composition. Orbit NavigationBar is the reference for mobile-first bottom tab navigation in transactional flows.
