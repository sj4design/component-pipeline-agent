---
component: Navbar
tier: 2
last_verified: 2026-03-31
---

# Navbar — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Topbar + TopbarActions | Composition pattern: Topbar container with TopbarActions for right-aligned items; integrates with Sidebar via hamburger trigger; no built-in navigation links — actions only (user menu, status, help). | high |
| Salesforce Lightning | Global Header (SLDS) | Part of the Global Navigation model; persistent header with app launcher (waffle), global search, favorites, setup, notifications, and user profile; navigation tabs live below in a secondary bar. | high |
| GitHub Primer | Header / PageHeader | Header provides the dark persistent top bar (logo, search, nav links, user avatar); PageHeader is the page-level contextual header below it with breadcrumbs and actions. Two distinct layers. | high |
| shadcn/ui | No component — Navbar recipe | Documented as a layout recipe using flex containers, NavigationMenu for links, and Sheet for mobile hamburger drawer; no single Navbar primitive. | high |
| Playbook | Nav / NavItem | Horizontal or vertical nav component with NavItem children; `variant="subtle"` for subdued styling; no integrated search or user menu — purely navigation links. | medium |
| REI Cedar | CdrHeader (deprecated) → composition | Cedar deprecated its monolithic Header component in favor of composing from primitives (CdrButton, CdrLink, CdrGrid); responsive behavior requires manual implementation. | medium |
| Wise Design | Header (layout pattern) | Financial product header with logo, navigation links, CTA button, and language selector; mobile collapses to hamburger; optimized for conversion (prominent "Send money" CTA). | low |
| Dell Design System | Masthead | Enterprise masthead with logo, mega-menu navigation, search, cart, and user account; mega-menus open full-width panels for product categories — e-commerce navigation pattern. | low |

## Key Decision Patterns

**Shell integration vs. standalone:** Paste's Topbar is architecturally tied to the application shell (works with Sidebar); Lightning's Global Header is part of a rigid application frame. In contrast, Primer's Header and shadcn/ui's recipe are standalone and can be used in any layout context. The architectural choice depends on whether the design system targets a single application (shell) or diverse contexts (standalone).

**Search placement:** Lightning makes global search the dominant center element of the header — similar to Polaris (T1). Primer places search as a collapsible input in the header. shadcn/ui and Playbook have no built-in search integration. Search-first navbars are characteristic of data-heavy enterprise applications where search is the primary navigation path.

**Responsive strategy:** The dominant T2 pattern is hamburger-to-drawer: navigation links collapse behind a hamburger icon that opens a Sheet/Drawer on mobile (shadcn/ui, Wise, Dell Masthead). Paste uses its Sidebar component as the mobile target. Primer has a distinct mobile header with a slide-out menu panel. No T2 system implements scroll-responsive behavior (compress/hide on scroll) — that remains unique to M3 in T1.

**Mega-menus:** Dell's Masthead is the only T2 system with full mega-menu panels (multi-column dropdowns for product categories). Lightning's app launcher panel is functionally similar. Other T2 systems use simple dropdown menus or no sub-navigation in the header.

## A11y Consensus

- The navbar should be wrapped in a `<header>` landmark (or `role="banner"` for the global site header) — distinct from `<nav>` landmarks used for navigation link groups within it.
- Navigation link groups within the header should each be wrapped in `<nav aria-label="...">` with a descriptive label to distinguish from other nav landmarks on the page.
- Skip-to-content link should be the first focusable element within the header — Paste and Lightning implement this explicitly.
- Mobile hamburger trigger needs `aria-expanded` and `aria-controls` pointing to the drawer/panel.
- Search inputs in the header need visible labels or `aria-label`; Lightning's search uses `role="combobox"` with `aria-autocomplete`.

## Recommended Use

Reference T2 navbar approaches for shell-integrated patterns (Paste Topbar for app shells, Lightning for enterprise suites) and composition recipes (shadcn/ui for flexible React implementations). Use Primer Header as the reference for developer-tool navigation with integrated search and dark theming. Dell Masthead is the reference for e-commerce mega-menu navigation headers.
