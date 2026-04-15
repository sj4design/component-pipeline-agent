---
component: sidebar
compiled: 2026-03-31
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Navigation Drawer + Navigation Rail (two separate components)
**Approach:** M3 splits sidebar navigation into two distinct components. Navigation Drawer is a full-height side panel with icon+label items, available in Standard (persistent, pushes content), Modal (overlay with scrim), and Bottom (mobile) variants. Navigation Rail is a narrow vertical bar (80dp wide) showing 3-7 destinations as icon-only or icon+label, designed for tablets and compact layouts. Together they cover the full responsive sidebar spectrum: Rail on tablets, Drawer on desktop, Bottom Navigation on mobile.
**Key Decisions:**
- [HIGH] Two-component model: Navigation Drawer (full panel) and Navigation Rail (icon strip) are separate components — the rail is not a "collapsed drawer" but a distinct navigational component with its own density and interaction rules
- [HIGH] Three drawer modes: Standard (persistent, pushes content), Modal (overlay with scrim, dismissible), and Bottom (mobile variant) — each mode has different focus management and layout behavior
- [MED] Rail FAB slot: Navigation Rail has a dedicated slot for a Floating Action Button at the top, making it a navigation + primary action surface — unique among Tier 1 systems
- [MED] Active indicator: Both Drawer and Rail use a pill-shaped active indicator behind the selected item icon, providing strong visual feedback for current location
**Notable API:** `NavigationDrawer` with `selected`, `onSelect`; items via `NavigationDrawerItem` with `icon`, `label`, `badge`; `NavigationRail` with `selectedIndex`, `fabSlot`
**A11y:** `role="navigation"` on the container; `aria-label` for landmark identification; `aria-current="page"` on active item; Modal Drawer uses `role="dialog"` with focus trap; Rail items have tooltip labels when text is hidden.
**Best at:** Clearest separation between full sidebar and icon-rail patterns — the two-component model prevents ambiguity about when to use collapsed vs. expanded navigation.
**Missing:** No built-in nested navigation levels within the Drawer; no collapsible sections or tree-like hierarchy — M3 recommends separate pages or supplementary navigation for deep hierarchies.

---

## spectrum
**Component:** Side Navigation (SideNav)
**Approach:** Spectrum's SideNav is a persistent, vertical navigation list designed for application shells. It supports multi-level nesting with expandable sections, heading groups for organizing items into categories, and an "icon-only" collapsed mode for compact layouts. SideNav is always persistent (never modal) — it lives inside the application frame and does not overlay content. The component is built on React Aria's collection API for keyboard navigation.
**Key Decisions:**
- [HIGH] Always persistent: SideNav never overlays content — it is a structural layout element, not an overlay. For mobile viewports, Spectrum recommends a different navigation pattern (e.g., hamburger triggering a full-screen nav)
- [HIGH] Multi-level nesting: SideNav supports nested sections with expand/collapse — one of the few Tier 1 systems with built-in hierarchical navigation support
- [MED] Heading groups: Items can be organized under non-interactive heading labels (e.g., "Settings," "Account") — semantic grouping without collapsibility
- [MED] Icon-only collapsed mode: SideNav can collapse to show only icons with tooltips, functioning as a rail-like compact mode within the same component (unlike M3's separate component)
**Notable API:** `SideNav` with `SideNavItem` children; `isCollapsed` for icon-only mode; `SideNavHeading` for section labels; nested `SideNavItem` for hierarchy; `isSelected`, `href` on items
**A11y:** `role="navigation"` with `aria-label`; items use `role="link"` or `role="treeitem"` depending on nesting; `aria-expanded` on collapsible sections; `aria-current="page"` on active item; full keyboard navigation with Arrow keys.
**Best at:** Built-in hierarchical navigation with proper tree semantics — the strongest nested sidebar implementation in Tier 1.
**Missing:** No modal/overlay mode for mobile; no responsive breakpoint behavior built in — consumers must handle the transition from sidebar to mobile navigation externally.

---

## carbon
**Component:** UI Shell SideNav
**Approach:** Carbon's SideNav is part of the UI Shell pattern — a structural application layout component rather than a standalone widget. It supports two modes: fixed (always visible, pushes content) and rail (collapsed to 48px icon strip, expands on hover). SideNav integrates tightly with Carbon's Header component and supports nested menu items via SideNavMenu. The rail mode is distinctive: it shows icons at 48px width and smoothly expands to full width on mouse hover or focus, revealing labels.
**Key Decisions:**
- [HIGH] Rail mode with hover-expand: The 48px rail expands to full width on hover — a space-efficient pattern for IBM Cloud's data-dense dashboards where screen real estate is critical
- [HIGH] UI Shell integration: SideNav is not a standalone component but part of `UIShell` — it expects to be paired with `Header` and `Content` components for correct layout behavior
- [MED] Nested menus: `SideNavMenu` supports one level of nested items with expand/collapse — sufficient for IBM's enterprise navigation depth but limited to a single nesting level
- [MED] Fixed vs. overlay on mobile: On mobile viewports, SideNav transitions from fixed to overlay mode automatically — one of the few Tier 1 systems with built-in responsive behavior
**Notable API:** `SideNav` with `isRail`, `isFixedNav`, `isPersistent`; `SideNavItems` container; `SideNavLink` for leaf items; `SideNavMenu` + `SideNavMenuItem` for nested groups; `isSideNavExpanded` controlled state
**A11y:** `role="navigation"` with `aria-label`; `aria-expanded` on collapsible menus; rail mode items have accessible labels even when visually collapsed; focus management follows WAI-ARIA TreeView pattern for nested items.
**Best at:** Rail-to-expanded hover pattern — the most polished icon-rail implementation in Tier 1, designed for data-heavy enterprise interfaces where persistent navigation must minimize width.
**Missing:** Only one level of nesting supported; no badge/notification indicators on nav items; rail hover-expand can be problematic for users with motor impairments (accidental expansion).

---

## polaris
**Component:** Navigation (within Frame)
**Approach:** Polaris Navigation is embedded within the Frame component (the Shopify Admin app shell). It provides a vertical sidebar with sections, items with icons and badges, and secondary actions on items. On mobile, the Navigation is hidden behind a hamburger toggle and slides in as an overlay. Navigation supports a single level of sub-items per item. The component is tightly coupled to Shopify Admin's information architecture: top-level sections (e.g., "Orders," "Products") with optional sub-pages.
**Key Decisions:**
- [HIGH] Frame-coupled: Navigation only works inside Polaris Frame — it is not a standalone component, reflecting Shopify's opinionated app shell architecture
- [HIGH] Badge support on items: Items can display badges (e.g., "3" for pending orders) — a first-class feature for commerce admin UIs where notification counts on nav items are critical
- [MED] Secondary actions: Items can have secondary actions (e.g., "+" button to add a new product from the nav item) — inline actions on navigation items are uncommon in Tier 1
- [MED] Sections with separators: Navigation supports named sections with visual separators — simple grouping without collapse, keeping all items visible
**Notable API:** `Navigation` with `location` (current URL for active highlighting); `Navigation.Section` with `items` array; each item: `{url, label, icon, badge, subNavigationItems, secondaryAction}`
**A11y:** `role="navigation"` with `aria-label`; active item indicated via `aria-current="page"`; mobile overlay uses focus trap; keyboard navigation with Tab through items.
**Best at:** Commerce-specific sidebar features — badges on nav items and secondary actions are purpose-built for Shopify Admin's workflow.
**Missing:** No collapsed/rail mode; no multi-level nesting beyond one sub-level; no built-in collapse/expand behavior for the sidebar itself — it is either fully visible (desktop) or fully hidden (mobile).

---

## atlassian
**Component:** Side Navigation (@atlaskit/side-navigation)
**Approach:** Atlassian's Side Navigation is a composable sidebar built from atomic sub-components: NavigationHeader, NavigationContent, Section, LinkItem, ButtonItem, GoBackItem, NestingItem, and Footer. The NestingItem component is the standout feature — clicking it performs a slide-left animation to reveal a nested navigation level, replacing the current view with the child level and showing a back button. This "drill-down" pattern handles Jira and Confluence's deep project hierarchies.
**Key Decisions:**
- [HIGH] NestingItem drill-down: Instead of expanding items inline (which gets unwieldy for deep hierarchies), Atlassian slides to a new navigation view — this pattern scales to arbitrary depth without vertical overflow
- [HIGH] Composable sub-components: The sidebar is assembled from granular pieces (Section, LinkItem, ButtonItem, CustomItem) — maximum flexibility for Jira's diverse navigation needs (project nav, settings nav, admin nav)
- [MED] GoBackItem: A dedicated "go back" navigation item component for returning from nested views — standardizes the back-navigation pattern across all Atlassian products
- [MED] Custom items: `CustomItem` allows rendering arbitrary content as a navigation item — used for Jira's sprint boards, Confluence's page trees, and other product-specific nav content
**Notable API:** `SideNavigation` container; `NavigationHeader`, `NavigationContent`, `Footer` structure; `Section` with `title`; `LinkItem`, `ButtonItem`, `NestingItem`, `GoBackItem`, `CustomItem`; `cssFn` for style overrides
**A11y:** `role="navigation"` with `aria-label`; NestingItem manages focus on drill-down transitions; `aria-current="page"` on active item; keyboard navigation through items; Section titles serve as group labels.
**Best at:** Deep hierarchical navigation via the drill-down NestingItem pattern — the most scalable approach to multi-level sidebar navigation in Tier 1.
**Missing:** No built-in collapsed/rail mode; no responsive behavior (sidebar is always full-width or hidden via external layout control); no badge/count indicators on items.

---

## ant-design
**Component:** Menu (mode="inline") + Layout.Sider
**Approach:** Ant Design's sidebar is a composition of two components: `Layout.Sider` (the structural sidebar container with collapse behavior) and `Menu` with `mode="inline"` (the navigation items). Sider handles width, collapse/expand with trigger button, responsive breakpoints, and the "collapsed" state where it shrinks to icon-only width. Menu handles items, sub-menus (multi-level nesting), item groups, dividers, and selection state. This separation means the navigation logic (Menu) is decoupled from the layout container (Sider).
**Key Decisions:**
- [HIGH] Two-component composition: Layout.Sider (container + collapse) and Menu (items + nesting) are separate — the same Menu component works in horizontal navbars, context menus, and sidebars, maximizing API reuse
- [HIGH] Built-in collapse with breakpoint: `Sider` has `collapsible`, `collapsed`, `breakpoint` (xs/sm/md/lg/xl/xxl), and `collapsedWidth` props — the most comprehensive responsive collapse system in Tier 1
- [HIGH] Multi-level sub-menus: Menu supports arbitrary nesting depth via `SubMenu` — sub-menus expand inline (accordion-style) in the sidebar, with smooth height animation
- [MED] `collapsedWidth={0}` for mobile: Setting collapsed width to 0 with a responsive breakpoint creates a hide-on-mobile pattern with overlay trigger
**Notable API:** `Layout.Sider` with `collapsible`, `collapsed`, `breakpoint`, `collapsedWidth`, `trigger`, `onCollapse`; `Menu` with `mode="inline"`, `items` array, `selectedKeys`, `openKeys`, `onSelect`; items support `icon`, `label`, `children` (for nesting), `type: "group"` for grouping
**A11y:** Menu uses `role="menu"` with `role="menuitem"` on items; `aria-expanded` on sub-menus; keyboard navigation with Arrow keys; collapsed items show tooltips with labels; focus management on expand/collapse transitions.
**Best at:** Most feature-complete sidebar system in Tier 1 — collapse with responsive breakpoints, arbitrary nesting depth, item groups, and the separation of layout container from navigation content.
**Missing:** No drill-down navigation pattern (only inline expand); `role="menu"` is semantically debatable for page navigation (WAI-ARIA recommends `role="navigation"` for site nav); no built-in badge/notification support on menu items (requires custom rendering).
