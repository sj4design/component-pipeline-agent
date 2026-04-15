---
component: navbar
compiled: 2026-03-31
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Top App Bar (+ Navigation Bar for bottom nav)
**Approach:** M3 splits top-level navigation into two components: Top App Bar for the persistent header with title, navigation icon, and actions; and Navigation Bar for bottom tab navigation on mobile. The Top App Bar comes in four variants: Center-aligned, Small, Medium, and Large — differentiated by title placement and size. Scroll behavior is a first-class concern: the bar can compress from Large to Small on scroll, or hide entirely with `scrollBehavior`. The leading navigation icon slot handles hamburger menu or back arrow.
**Key Decisions:**
- [HIGH] Scroll behavior built-in: Top App Bar supports compress-on-scroll (Large → Small transition) and hide-on-scroll-down/show-on-scroll-up — M3's primary differentiator for this component
- [HIGH] Four size variants: CenterAligned, Small, Medium, Large — title typography and positioning change per variant; Large uses a two-line layout with prominent title below the action row
- [MED] Three slot regions: `navigationIcon` (leading — menu or back), `title` (center or start-aligned), `actions` (trailing — up to 3 icons, overflow menu for more)
- [MED] Color mapping to scroll: surface color elevates (tonal elevation) when content scrolls behind the bar, providing a visual scroll indicator without a hard shadow
**Notable API:** `scrollBehavior: "enterAlways" | "exitUntilCollapsed"`; `navigationIcon` slot; `actions` slot (max 3 visible, overflow to menu); `colors` for container/scroll color
**A11y:** Top App Bar is a landmark region. Navigation icon and action icons require content descriptions. Title serves as the page heading. No explicit `role="navigation"` — it is a header region, not a nav landmark.
**Best at:** Scroll-responsive behavior with smooth transitions between bar sizes — the most sophisticated scroll interaction model of any Tier 1 system.
**Missing:** No built-in search integration (search is a separate Search Bar component); no explicit responsive breakpoint behavior for desktop — Top App Bar is mobile/tablet-first.

---

## spectrum
**Component:** No dedicated Navbar — composed from ActionBar + header patterns
**Approach:** Spectrum does not have a single "Navbar" component. Adobe applications use a combination of a persistent header area (typically containing the Adobe logo, app name, and user avatar) with ActionBar for contextual actions. The header pattern is documented in Spectrum's page layout guidelines rather than as a standalone component. For product navigation, Spectrum relies on side navigation (SideNav) rather than top navigation links.
**Key Decisions:**
- [HIGH] Composition over component: Spectrum deliberately avoids a monolithic navbar; the header area is a layout pattern composed from existing primitives (ActionButton, Avatar, Menu, etc.)
- [HIGH] Side navigation primary: top-level page navigation lives in SideNav, not in the header — the header is reserved for global actions (user profile, notifications, app switcher)
- [MED] ActionBar for contextual actions: when items are selected in a view, ActionBar appears as a floating bar — but this is contextual, not persistent navigation
**Notable API:** No single component. Composed from: `ActionButton`, `Avatar`, `MenuTrigger` + `Menu`, `Flex` layout containers. SideNav handles navigation hierarchy.
**A11y:** Header area should use `<header>` landmark. Navigation links within the header need `<nav aria-label>`. Adobe products typically separate the global header landmark from the page-level SideNav landmark.
**Best at:** Flexible composition — teams can build exactly the header they need from primitives without fighting a rigid navbar API.
**Missing:** No turnkey navbar component; no scroll behavior; no built-in responsive hamburger collapse. Teams must implement responsive behavior manually.

---

## carbon
**Component:** UI Shell (Header + HeaderNavigation + HeaderPanel)
**Approach:** Carbon's UI Shell is a comprehensive top navigation system composed of multiple sub-components: Header (container), HeaderName (logo/app name), HeaderNavigation (top-level nav links), HeaderGlobalBar (right-side global actions), HeaderPanel (flyout side panels for notifications/switcher), and HeaderMenu (dropdown menus within nav). The SideNav can be triggered from the header's hamburger icon. Carbon treats the navbar as a shell that wraps the entire application.
**Key Decisions:**
- [HIGH] Shell architecture: the Header is not just a bar but the top layer of an application shell — it controls SideNav toggling, panel flyouts, and app-level context (product name, global actions)
- [HIGH] HeaderNavigation for top-level links: horizontal nav links in the header bar; each link can be a simple link or a HeaderMenu dropdown — this is Carbon's primary navbar navigation model
- [MED] HeaderPanel flyouts: global action icons (notifications, app switcher, user) open full-height side panels rather than dropdown menus — a unique pattern for complex enterprise workflows
- [MED] Fixed position by default: the header is always fixed at the top; no scroll-hide behavior — enterprise applications need persistent access to navigation and global actions
**Notable API:** `Header`, `HeaderName` (prefix + name), `HeaderNavigation`, `HeaderMenuItem`, `HeaderGlobalAction` (icon buttons), `HeaderPanel` (side flyout), `SideNav` (triggered from hamburger)
**A11y:** Header renders as `<header role="banner">` with skip-to-content link as the first focusable element. HeaderNavigation is `<nav aria-label>`. HeaderGlobalAction icons have `aria-label`. HeaderPanel manages focus trap when open.
**Best at:** Enterprise application shell — the most complete navbar-as-shell system with integrated side panels, app switcher, and SideNav toggling from a single header component.
**Missing:** No scroll-responsive behavior (always fixed); no compact/mobile-first variant — Carbon's header is desktop-first and collapses to hamburger + SideNav on mobile.

---

## polaris
**Component:** TopBar (within Frame)
**Approach:** Polaris's TopBar is part of the Frame component — the application shell for Shopify Admin. TopBar provides the persistent header with logo, search field, and user menu. It is not used standalone; it must be rendered as a child of Frame. The search field is integrated directly into the TopBar, making search a first-class navigation feature. The secondary menu (user avatar dropdown) handles account switching and profile actions.
**Key Decisions:**
- [HIGH] Search-first: the search field is the dominant element of the TopBar — Shopify Admin's primary navigation pattern is search (merchants search for orders, products, customers), not link-based navigation
- [HIGH] Part of Frame shell: TopBar cannot be used outside Frame — it is architecturally tied to the application shell that also manages Navigation (sidebar) and contextual save bar
- [MED] User menu: avatar + dropdown for account-level actions (profile, stores switching, logout); `userMenu` prop accepts a component
- [MED] Logo slot: `logoSuffix` for contextual branding (e.g., "Plus" badge); clicking logo navigates to admin root
**Notable API:** `searchField` (SearchField component), `userMenu` (TopBar.UserMenu), `logoSuffix`, `contextControl` (slot for additional context like store name); all rendered within `Frame`
**A11y:** TopBar renders within the Frame's landmark structure. Search field is labeled. User menu triggers a dropdown with role="menu". The Frame provides skip-navigation links that skip past TopBar.
**Best at:** Search-integrated navigation bar — the best example of making search the primary navigation affordance in the header rather than link-based navigation.
**Missing:** No horizontal navigation links in the TopBar (all nav is in the sidebar); no scroll behavior; not usable outside the Frame shell.

---

## atlassian
**Component:** AtlassianNavigation (from @atlaskit/atlassian-navigation)
**Approach:** Atlassian's navigation bar is a slot-based horizontal bar with: ProductHome (logo), PrimaryButton (top-level nav items), Search, AppSwitcher, Help, Notifications, Settings, and Profile — all as render props. The component models Atlassian's global navigation across all products (Jira, Confluence, Bitbucket). Each primary item can open a full-width dropdown panel. Custom theming matches each product's brand color.
**Key Decisions:**
- [HIGH] Slot-based render props: every region of the navbar (productHome, primaryItems, search, renderAppSwitcher, renderProfile, etc.) is a render prop — maximum composition flexibility for the diverse Atlassian product suite
- [HIGH] Product theming: `theme` prop applies product-specific colors (Jira blue, Confluence purple, Bitbucket blue) to the entire bar — the navbar is the primary brand surface
- [MED] App switcher integration: the app switcher (waffle icon) is a first-class slot that opens a panel showing all Atlassian products the user has access to — cross-product navigation from the navbar
- [MED] Full-width dropdown panels: primary nav items open full-width panels (not small menus) for content like project lists, recent items, starred items — unique to Atlassian's dense information architecture
**Notable API:** `renderProductHome`, `primaryItems`, `renderSearch`, `renderAppSwitcher`, `renderNotifications`, `renderProfile`, `renderHelp`, `renderSettings`; `theme` for product branding
**A11y:** Renders as `<header>` with `<nav>` for primary items. Skip links provided. Primary buttons are accessible as navigation links. Dropdown panels manage focus. AppSwitcher panel has aria-label.
**Best at:** Multi-product navigation with app switcher and product theming — the reference implementation for SaaS suites where users navigate between multiple products from a shared navbar.
**Missing:** No scroll behavior; no responsive hamburger collapse (Atlassian products use a separate responsive strategy with a sidebar on mobile); no built-in search field (search is a render prop, not a built-in input).

---

## ant-design
**Component:** Layout.Header + Menu (horizontal mode)
**Approach:** Ant Design does not have a dedicated navbar component. The navbar pattern is achieved by combining Layout.Header (the container with dark background) and Menu in `mode="horizontal"` (the navigation links). This is a composition pattern documented in Ant Design's layout examples rather than a standalone component. The Menu component brings dropdown sub-menus, item grouping, and keyboard navigation. Logo and additional elements are placed via custom flex layout within Header.
**Key Decisions:**
- [HIGH] Composition pattern: Header is a layout container (just a styled div with fixed height and background); Menu provides all navigation logic — no single navbar component exists
- [HIGH] Menu horizontal mode: `mode="horizontal"` renders the menu as a top nav bar with dropdown sub-menus on hover; supports `SubMenu` for nested navigation, `MenuItemGroup` for labeled sections
- [MED] Fixed header via Layout: wrapping Header in `Layout` with `style={{ position: 'fixed' }}` achieves sticky behavior — not built into the component
- [MED] Theme integration: Header inherits the Layout theme (dark/light); Menu `theme` prop can be set independently for contrast control
**Notable API:** `Layout.Header` (container), `Menu` with `mode="horizontal"`, `Menu.SubMenu`, `Menu.ItemGroup`, `Menu.Item`; `selectedKeys` / `openKeys` for controlled state; `theme: "dark" | "light"`
**A11y:** Menu renders with `role="menubar"` in horizontal mode; MenuItems have `role="menuitem"`; SubMenus have `aria-expanded`. No automatic `<nav>` landmark — developers must wrap in `<nav>` manually. No skip links by default.
**Best at:** Powerful nested menu structure within the navbar — SubMenu and MenuItemGroup enable deep, organized navigation hierarchies in the horizontal header bar.
**Missing:** No scroll behavior; no responsive collapse to hamburger (requires manual implementation with a drawer); no integrated search or user profile patterns — these are composed manually within Header.
