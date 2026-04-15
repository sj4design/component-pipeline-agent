---
component: Sidebar
tier: 2
last_verified: 2026-03-31
---

# Sidebar — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Sidebar (+ SidebarNavigation) | Composable sidebar with SidebarHeader, SidebarBody, SidebarFooter, SidebarNavigation; collapsed icon-only mode; hierarchical items with SidebarNavigationDisclosure | high |
| Salesforce Lightning | Global Navigation / Vertical Navigation | App Launcher + vertical nav in utility bar; Vertical Navigation component for standalone sidebar lists with sections and nested items | high |
| GitHub Primer | NavList (within PageLayout.Pane) | NavList component with NavList.Item, NavList.Group, NavList.Divider; placed in PageLayout.Pane for sidebar positioning; supports leading/trailing visuals and sub-items | high |
| shadcn/ui | Sidebar | Full sidebar system with SidebarProvider, SidebarTrigger, SidebarContent, SidebarMenu, SidebarGroup; collapsible modes (offcanvas, icon, none); built on Radix primitives | high |
| Playbook | Nav | Vertical navigation list with Nav.Item; supports icons and active state; simple flat list without built-in nesting or collapse | medium |
| REI Cedar | Not available — custom layout | No dedicated sidebar navigation component; applications use custom layout with link lists | low |
| Wise Design | Navigation | Left-anchored navigation for dashboard applications; supports icons and badges; mobile collapses to bottom navigation | low |
| Dell DS | SideNav | Enterprise sidebar navigation with collapsible sections, icon+label items, and rail mode for compact views | low |

## Key Decision Patterns

**shadcn/ui Sidebar is the most comprehensive T2 implementation.** It provides a full sidebar architecture: `SidebarProvider` manages open/collapsed state with keyboard shortcut (Ctrl+B), `SidebarTrigger` toggles it, and `SidebarContent` houses the navigation. Three collapse modes — `offcanvas` (slides out completely), `icon` (shrinks to icon-only rail), and `none` (always expanded) — cover the full sidebar behavior spectrum. It also supports `side="left"|"right"` and `variant="sidebar"|"floating"|"inset"` for visual presentation.

**Paste Sidebar is the strongest enterprise-grade T2 sidebar.** Twilio's Sidebar is a dedicated component family (not a layout primitive) with SidebarNavigation providing hierarchical navigation items, badges, external link indicators, and a collapsed icon-only mode. SidebarNavigationDisclosure enables nested item groups with expand/collapse. The sidebar is responsive: it collapses to a compact overlay on smaller viewports.

**Primer NavList within PageLayout is GitHub's composable approach.** Rather than a monolithic sidebar component, GitHub composes NavList (the navigation items) within PageLayout.Pane (the structural sidebar container). NavList supports leading/trailing visuals (icons, counters, badges), sub-items via NavList.SubNav, and dividers. This separation mirrors Ant Design's Menu + Layout.Sider pattern from Tier 1.

**Lightning Vertical Navigation is form-based.** Salesforce's Vertical Navigation is structured as a list of links within named sections — optimized for settings pages and admin panels rather than app-level navigation. The global app navigation uses the App Launcher and horizontal tabs, not a sidebar.

## A11y Consensus

- `role="navigation"` on the sidebar container with a descriptive `aria-label` (e.g., "Main navigation")
- `aria-current="page"` on the active navigation item to communicate current location
- `aria-expanded` on collapsible groups/sections to indicate open/closed state
- Collapsed/rail mode items must retain accessible labels via `aria-label` or tooltips
- Keyboard navigation: Arrow keys to move between items, Enter/Space to activate, Tab to move between sidebar sections
- Mobile overlay sidebar must trap focus and support Escape to close

## Recommended Use

Use shadcn/ui Sidebar for React applications needing a full-featured collapsible sidebar with multiple collapse modes and responsive behavior. Use Paste Sidebar as reference for enterprise dashboard sidebar patterns with hierarchical navigation. Use Primer NavList + PageLayout.Pane as reference for composable sidebar architecture where navigation items and layout container are separate concerns. Lightning Vertical Navigation is relevant only for settings/admin page sidebars within Salesforce-style applications.
