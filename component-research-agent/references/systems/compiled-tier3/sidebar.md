---
component: Sidebar
tier: 3
last_verified: 2026-03-31
---

# Sidebar — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Not available — primitives only | No sidebar component; developers compose from NavigationMenu (horizontal focus), Collapsible, and custom layout. Community recipes exist using Radix primitives. | high |
| Chakra UI | Not available — recipe/layout pattern | No dedicated sidebar component in core; docs provide sidebar layout recipes using Box, VStack, Link, and Collapsible. Chakra focuses on atomic components. | high |
| GOV.UK | Not available — service navigation pattern | GOV.UK uses horizontal Service Navigation header; sidebar navigation is discouraged in transactional government services. Step-by-step navigation is the vertical pattern. | high |
| Base Web | Navigation (side mode) | Navigation component with `type={ALIGN.left}` renders vertical sidebar items; supports nested sub-items via `subNav`; item-level `active` state; Overrides for full customization. | medium |
| Fluent 2 | NavDrawer (Nav + Drawer composition) | NavDrawer combines Nav (navigation items) with Drawer (panel container); supports `type="inline"` (persistent, pushes content) and `type="overlay"` (modal); NavCategory for grouped items with expand/collapse. | high |
| Gestalt | SideNavigation | Dedicated component with SideNavigation.TopItem, SideNavigation.Group (collapsible sections), SideNavigation.NestedItem; built-in badge and notification dot support; counter prop for item counts; mobile-responsive. | high |
| Mantine | AppShell.Navbar | AppShell layout component with Navbar slot; Navbar provides structural sidebar container; NavLink component for items with nesting, icons, badges, active state, and description text. | high |
| Orbit | NavigationDrawer | Left-anchored navigation for travel application shells; supports NavigationDrawerItem with icons, badges, and active state; collapses to overlay on mobile. | medium |
| Evergreen | Not available — custom sidebar | No dedicated sidebar navigation component; Evergreen focuses on B2B dashboard primitives (SideSheet is for content panels, not navigation). Teams compose custom sidebar with TabNavigation or link lists. | medium |
| Nord | NavigationDrawer | Healthcare-oriented sidebar; supports NavigationGroup for sections, NavigationItem with icons and badges; designed for EHR application shells; emphasis on clear hierarchy for clinical workflows. | high |

## Key Decision Patterns

Fluent 2's NavDrawer is the most architecturally significant T3 sidebar. It composes the Nav component (items, categories, nested groups) with the Drawer component (panel behavior), supporting both `type="inline"` (persistent sidebar that pushes content) and `type="overlay"` (modal sidebar with scrim). NavCategory groups items under collapsible sections with `aria-expanded`. NavSubItem supports one level of nesting within categories. This dual-mode pattern powers Microsoft Teams' sidebar and Outlook's folder navigation.

Gestalt SideNavigation is the most feature-rich dedicated sidebar in T3. Pinterest built a component with explicit support for badges, notification dots, counters on items, collapsible groups, and nested items — all features required for a content platform's creator dashboard. The component has built-in mobile responsiveness: on small viewports it transitions from persistent sidebar to an overlay sheet. SideNavigation.Group supports the header+items collapsible pattern natively.

Mantine's approach separates the layout container (AppShell.Navbar) from the navigation items (NavLink). AppShell.Navbar provides the structural sidebar with responsive breakpoint-based visibility (`visibleFrom`, `hiddenFrom`), while NavLink handles item rendering with support for nesting (child NavLinks), icons, badges, right sections, description text, active/opened state, and click handlers. This clean separation matches the Ant Design pattern from Tier 1.

Base Web's Navigation with `ALIGN.left` is minimal — it provides vertical item layout with nested sub-items and active state, but no collapse behavior, badges, or responsive handling. It is designed for simple settings-page sidebar navigation, not full application shells.

GOV.UK and Radix/Chakra absences represent different philosophies. GOV.UK intentionally avoids sidebar navigation because it creates orientation complexity in government transactional services — users should always know where they are via a linear step-by-step flow. Radix and Chakra lack sidebars because they are primitive-level libraries; sidebar is considered an application-level composition pattern, not a reusable primitive.

Nord's NavigationDrawer is purpose-built for healthcare EHR applications. It prioritizes clear visual hierarchy and predictable navigation patterns — clinical users must navigate between patient records, orders, and results efficiently. The design avoids animations or complex nested interactions that could slow down high-urgency clinical workflows.

## A11y Consensus

- All sidebar implementations use `role="navigation"` with a descriptive `aria-label` (e.g., "Main," "Application") to create a landmark region.
- Active item is marked with `aria-current="page"` across all systems that implement a sidebar — this is universal consensus.
- Collapsible groups/sections use `aria-expanded` on the trigger element to communicate open/closed state to screen readers.
- Nested navigation items follow the disclosure pattern: parent item toggles `aria-expanded`, children are hidden/shown accordingly.
- Overlay/modal sidebar variants trap focus within the sidebar panel and support Escape to close, consistent with dialog behavior.
- Collapsed/rail mode (where items show only icons) must provide accessible labels via `aria-label` on each item or visible tooltips — icon-only without text labels is an a11y failure.

## Recommended Use

Reference Fluent 2 NavDrawer for inline vs. overlay sidebar mode decisions and Microsoft-style application shell navigation. Reference Gestalt SideNavigation for feature-rich sidebar with badges, counters, notification dots, and built-in mobile responsiveness. Reference Mantine AppShell.Navbar + NavLink for clean separation between sidebar container and navigation items. Nord NavigationDrawer is the reference for healthcare/clinical sidebar patterns where navigation clarity is safety-critical. GOV.UK's absence rationale is relevant when evaluating whether a sidebar is appropriate for linear transactional workflows.
