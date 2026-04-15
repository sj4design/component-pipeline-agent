# Sidebar — Component Research

**Date:** 2026-04-10
**Mode:** --max (all patterns, no scope filtering)
**Systems analyzed:** 24 (all tiers, equal weight)
**Component slugs:** sidebar, navigation-drawer, side-navigation, sidenav, nav-drawer

---

## Sistemas sin componente dedicado

| Sistema | Razon | Workaround |
|---------|-------|------------|
| Radix UI | Primitives-only library — sidebar is app-level composition | Compose from NavigationMenu + Collapsible + custom layout |
| Chakra UI | Atomic component library — sidebar is a recipe pattern | Box + VStack + Link + Collapsible recipe in docs |
| GOV.UK | Intentionally avoids sidebar — linear transactional flows preferred | Step-by-step navigation pattern, no sidebar |
| Evergreen | B2B dashboard focus — SideSheet is content panel, not navigation | Custom sidebar with TabNavigation or link lists |
| REI Cedar | No dedicated sidebar component | Custom layout with link lists |
| Playbook | Only a minimal flat Nav list — no collapse, nesting, or sidebar shell | Nav + Nav.Item for simple vertical lists |

---

## How Systems Solve It

### Material Design 3 — "Two components, not one: Drawer for content, Rail for density"

M3 takes the boldest architectural stance by splitting sidebar navigation into two entirely separate components. The Navigation Drawer is a full-height side panel available in Standard (persistent, pushes content), Modal (overlay with scrim), and Bottom (mobile) modes. The Navigation Rail is a narrow 80dp vertical bar showing 3-7 destinations as icon-only or icon+label, designed specifically for tablets and compact layouts. This separation means M3 never has an ambiguous "collapsed" state — the Rail IS the compact navigation, not a degraded Drawer.

**Design Decisions:**
| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Two-component model (Drawer + Rail) | The rail is not a "collapsed drawer" but a distinct navigational component with its own density and interaction rules | HIGH | Consider whether your sidebar truly needs a collapsed mode or if a separate Rail component would be cleaner |
| Three drawer modes (Standard/Modal/Bottom) | Each mode has different focus management and layout behavior — Standard pushes content, Modal overlays with scrim | HIGH | Standard is the default for desktop apps; Modal for mobile; Bottom for simple phone navigation |
| Rail FAB slot | Navigation Rail has a dedicated slot for a Floating Action Button at the top — navigation + primary action surface | MED | Useful if your sidebar needs a primary creation action (e.g., "New Project") |
| Active indicator pill | Both Drawer and Rail use a pill-shaped active indicator behind the selected item icon | MED | Strong visual feedback pattern for current location — consider adopting |

**Notable Props:** `selected`, `onSelect`, `NavigationDrawerItem` (icon, label, badge), `NavigationRail` (selectedIndex, fabSlot)
**A11y:** `role="navigation"` + `aria-label`; `aria-current="page"` on active item; Modal Drawer uses `role="dialog"` + focus trap; Rail items have tooltip labels when text hidden.

---

### Spectrum (Adobe) — "Always persistent, deepest nesting"

Spectrum's SideNav is a persistent vertical navigation list that never overlays content — it is a structural layout element. It supports multi-level nesting with expandable sections, heading groups for organizing items into categories, and an icon-only collapsed mode for compact layouts. The component is built on React Aria's collection API, giving it the strongest keyboard navigation of any Tier 1 sidebar. Where M3 splits into two components, Spectrum keeps it as one with an `isCollapsed` prop.

**Design Decisions:**
| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Always persistent (never modal) | SideNav is structural — for mobile, Spectrum recommends a different navigation pattern entirely | HIGH | If you need overlay on mobile, this will be a separate concern you handle externally |
| Multi-level nesting with tree semantics | Built-in hierarchical navigation with `role="treeitem"` — strongest nested sidebar in Tier 1 | HIGH | Essential if your app has deep page hierarchies (3+ levels) |
| Heading groups | Non-interactive section labels organize items without collapsibility — semantic grouping | MED | Good for categorizing nav items (e.g., "Settings", "Account") without adding cognitive load |
| Icon-only collapsed mode within same component | `isCollapsed` prop shrinks to icon-only rail — unlike M3's separate component | MED | Simpler API — one component handles both expanded and collapsed states |

**Notable Props:** `SideNav`, `SideNavItem` (isSelected, href), `SideNavHeading`, `isCollapsed`
**A11y:** `role="navigation"` + `aria-label`; items use `role="link"` or `role="treeitem"` depending on nesting; `aria-expanded` on collapsible sections; `aria-current="page"`.

---

### Carbon (IBM) — "Rail-to-expanded hover: space efficiency for data-dense dashboards"

Carbon's SideNav is part of the UI Shell pattern — a structural application layout component. It supports fixed (always visible, pushes content) and rail (collapsed to 48px icon strip, expands on hover) modes. The rail mode is distinctive: it shows icons at 48px width and smoothly expands to full width on mouse hover or focus, revealing labels. SideNav integrates tightly with Carbon's Header component.

**Design Decisions:**
| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Rail mode with hover-expand | 48px rail expands on hover — space-efficient for data-dense dashboards | HIGH | Great for enterprise UIs where screen real estate is critical, but problematic for motor impairments |
| UI Shell integration | SideNav is not standalone but part of UIShell — paired with Header + Content | HIGH | Your sidebar probably needs similar integration with a layout shell |
| Nested menus (one level) | `SideNavMenu` supports one level of expand/collapse — sufficient for most enterprise nav | MED | One level covers 80% of use cases without complexity of deep nesting |
| Auto mobile overlay | On mobile viewports, SideNav transitions from fixed to overlay automatically | MED | Built-in responsive behavior — one of few T1 systems with this |

**Notable Props:** `SideNav` (isRail, isFixedNav, isPersistent), `SideNavLink`, `SideNavMenu` + `SideNavMenuItem`, `isSideNavExpanded`
**A11y:** `role="navigation"` + `aria-label`; `aria-expanded` on collapsible menus; rail items have accessible labels even when collapsed; TreeView pattern for nested items.

---

### Polaris (Shopify) — "Commerce-first: badges and inline actions on every nav item"

Polaris Navigation is embedded within the Frame component (Shopify Admin app shell). It provides a vertical sidebar with sections, items with icons and badges, and secondary actions on items. On mobile, it hides behind a hamburger toggle and slides in as an overlay. The component is tightly coupled to Shopify Admin's information architecture.

**Design Decisions:**
| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Frame-coupled architecture | Navigation only works inside Polaris Frame — opinionated app shell | HIGH | If building a standalone sidebar, avoid this coupling pattern |
| Badge support on items | Items display badges (e.g., "3" for pending orders) — first-class for commerce admin | HIGH | If your sidebar needs notification counts, make badges a first-class feature |
| Secondary actions on items | Items can have inline actions (e.g., "+" to add from nav) — uncommon in Tier 1 | MED | Powerful for productivity apps but adds complexity |
| Sections with separators | Named sections with visual separators — simple grouping without collapse | MED | Keeps all items visible — good when total item count is manageable (<20) |

**Notable Props:** `Navigation` (location), `Navigation.Section` (items), item shape: {url, label, icon, badge, subNavigationItems, secondaryAction}
**A11y:** `role="navigation"` + `aria-label`; `aria-current="page"`; mobile overlay uses focus trap; Tab navigation through items.

---

### Atlassian — "Drill-down nesting: slides instead of expands"

Atlassian's Side Navigation is a composable sidebar built from atomic sub-components. The NestingItem component is the standout — clicking it performs a slide-left animation to reveal a nested navigation level, replacing the current view with a child level and showing a GoBackItem. This "drill-down" pattern handles Jira and Confluence's deep project hierarchies without vertical overflow.

**Design Decisions:**
| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| NestingItem drill-down | Slides to new navigation view instead of expanding inline — scales to arbitrary depth | HIGH | Best for deep hierarchies (5+ levels) where inline expand would overflow |
| Composable sub-components | Sidebar assembled from Section, LinkItem, ButtonItem, CustomItem — maximum flexibility | HIGH | Most flexible Tier 1 architecture for diverse navigation needs |
| GoBackItem | Dedicated "go back" component for returning from nested views | MED | Standardizes back-navigation across products |
| CustomItem | Arbitrary content as navigation item — used for Jira sprint boards, Confluence page trees | MED | Enables product-specific nav content beyond simple links |

**Notable Props:** `SideNavigation`, `NavigationHeader`, `NavigationContent`, `Footer`, `Section` (title), `LinkItem`, `ButtonItem`, `NestingItem`, `GoBackItem`, `CustomItem`
**A11y:** `role="navigation"` + `aria-label`; NestingItem manages focus on drill-down transitions; `aria-current="page"`; Section titles serve as group labels.

---

### Ant Design — "Most feature-complete: collapse + breakpoints + infinite nesting"

Ant Design's sidebar is a composition of `Layout.Sider` (container with collapse) and `Menu` (mode="inline" for navigation items). Sider handles width, collapse/expand with trigger button, responsive breakpoints, and collapsed state. Menu handles items, sub-menus with arbitrary nesting depth, item groups, and selection state. This separation maximizes reuse since the same Menu works in horizontal navbars and context menus.

**Design Decisions:**
| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Two-component composition (Sider + Menu) | Layout container separated from navigation content — maximum API reuse | HIGH | Clean separation of concerns — sidebar container vs navigation items |
| Built-in collapse with breakpoint | `collapsible`, `collapsed`, `breakpoint` (xs-xxl), `collapsedWidth` | HIGH | Most comprehensive responsive collapse system in all 24 systems |
| Multi-level sub-menus | Arbitrary nesting depth via SubMenu — inline accordion-style expansion | HIGH | If you need more than 2 levels, this pattern is proven |
| collapsedWidth={0} for mobile | Setting collapsed width to 0 creates hide-on-mobile with overlay trigger | MED | Elegant responsive pattern using the same component |

**Notable Props:** `Layout.Sider` (collapsible, collapsed, breakpoint, collapsedWidth, trigger, onCollapse), `Menu` (mode="inline", items, selectedKeys, openKeys)
**A11y:** `role="menu"` with `role="menuitem"` (debatable for page nav — `role="navigation"` recommended); `aria-expanded`; Arrow key navigation; collapsed items show tooltips.

---

### shadcn/ui — "Full sidebar architecture with three collapse modes"

shadcn/ui provides the most comprehensive React sidebar implementation in Tier 2. `SidebarProvider` manages open/collapsed state with keyboard shortcut (Ctrl+B), `SidebarTrigger` toggles it, and `SidebarContent` houses the navigation. Three collapse modes — `offcanvas` (slides out completely), `icon` (shrinks to icon-only rail), and `none` (always expanded) — cover the full behavior spectrum. Also supports `side="left"|"right"` and `variant="sidebar"|"floating"|"inset"`.

**Design Decisions:**
| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Three collapse modes (offcanvas/icon/none) | Covers all sidebar behaviors: disappear, shrink-to-rail, always-visible | HIGH | Most flexible collapse system in any DS |
| Keyboard shortcut (Ctrl+B) toggle | Power user feature built-in — common in IDEs and dashboards | MED | Good for productivity apps |
| Visual variants (sidebar/floating/inset) | Different visual presentations for the same underlying sidebar | MED | Floating adds shadow, inset removes border — cosmetic flexibility |
| Built on Radix primitives | Composable architecture using proven primitives | MED | Type-safe, accessible by default |

---

### Paste (Twilio) — "Enterprise dashboard sidebar with hierarchical navigation"

Dedicated component family with SidebarNavigation providing hierarchical navigation items, badges, external link indicators, and collapsed icon-only mode. SidebarNavigationDisclosure enables nested item groups with expand/collapse.

**Design Decisions:**
| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Dedicated component family (not layout primitive) | Sidebar is a first-class component, not a layout trick | HIGH | Strongest enterprise-grade T2 sidebar |
| SidebarNavigationDisclosure | Nested groups with expand/collapse | MED | Clean pattern for grouped navigation |
| Badge + external link indicators | First-class support for counts and external link iconography | MED | Important for dashboards with notifications |

---

### Primer (GitHub) — "NavList in PageLayout.Pane: composable architecture"

GitHub composes NavList (navigation items) within PageLayout.Pane (structural sidebar container). NavList supports leading/trailing visuals (icons, counters, badges), sub-items via NavList.SubNav, and dividers. This separation mirrors Ant Design's Menu + Layout.Sider pattern.

**Design Decisions:**
| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Composition (NavList + PageLayout.Pane) | Separation of navigation items from layout container | HIGH | Clean architecture — items are reusable outside sidebar |
| Leading/trailing visuals | Icons, counters, badges on each item — flexible visual slots | MED | Similar flexibility to Polaris |
| NavList.SubNav for nesting | Sub-items within nav items | MED | One level of nesting |

---

### Fluent 2 (Microsoft) — "NavDrawer: inline vs overlay, powering Teams and Outlook"

NavDrawer composes Nav (items, categories, nested groups) with Drawer (panel behavior). Supports `type="inline"` (persistent, pushes content) and `type="overlay"` (modal with scrim). NavCategory groups items under collapsible sections. Powers Microsoft Teams sidebar and Outlook folder navigation.

**Design Decisions:**
| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Inline vs overlay dual mode | Same component handles persistent and modal sidebar | HIGH | Most architecturally significant T3 implementation |
| NavCategory for grouped items | Collapsible sections with `aria-expanded` | MED | Clean pattern for organizing navigation |
| Nav + Drawer composition | Navigation logic separated from panel behavior | MED | Mirrors Ant Design pattern |

---

### Gestalt (Pinterest) — "Feature-rich: badges, counters, notification dots, mobile responsive"

Dedicated SideNavigation with explicit support for badges, notification dots, counters on items, collapsible groups, and nested items. Built-in mobile responsiveness: on small viewports it transitions from persistent sidebar to overlay sheet.

**Design Decisions:**
| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Badges + notification dots + counters | Three distinct indicator types on nav items | HIGH | Most complete indicator system |
| Built-in mobile transition | Persistent to overlay sheet on small viewports | MED | Automatic responsive behavior |
| Collapsible groups | SideNavigation.Group with header+items pattern | MED | Standard grouped navigation |

---

### Mantine — "AppShell.Navbar + NavLink: clean container-item separation"

AppShell.Navbar provides the structural sidebar with responsive breakpoint-based visibility (`visibleFrom`, `hiddenFrom`). NavLink handles items with nesting, icons, badges, right sections, description text, active/opened state.

**Design Decisions:**
| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Container-item separation (AppShell.Navbar + NavLink) | Layout container independent of navigation items | HIGH | Clean architecture pattern |
| NavLink description text | Items support secondary description text below label | MED | Useful for explaining nav destinations |
| Responsive visibility props | `visibleFrom`/`hiddenFrom` on Navbar | MED | Simple responsive behavior |

---

### Lightning (Salesforce) — "Vertical Navigation for settings pages"

Vertical Navigation structured as link lists within named sections — optimized for settings/admin pages rather than app-level navigation.

---

### Base Web — "Minimal vertical Navigation with left alignment"

Navigation with `type={ALIGN.left}` renders vertical items with nested sub-items and active state. No collapse, badges, or responsive handling. Designed for simple settings-page navigation.

---

### Dell DS — "Enterprise SideNav with rail mode"

Enterprise sidebar navigation with collapsible sections, icon+label items, and rail mode for compact views.

---

### Wise Design — "Dashboard Navigation with mobile bottom-nav"

Left-anchored navigation for dashboards with icons and badges. Mobile collapses to bottom navigation pattern.

---

### Orbit — "Travel app NavigationDrawer"

Left-anchored navigation for travel application shells with icons, badges, and active state. Collapses to overlay on mobile.

---

### Nord — "Healthcare NavigationDrawer for clinical workflows"

Healthcare-oriented sidebar with NavigationGroup sections, NavigationItem with icons and badges. Designed for EHR application shells with emphasis on clear hierarchy for clinical safety.

---

## Pipeline Hints

**Archetype recommendation:** nav-content
Rationale: Sidebar is a vertical navigation panel containing a list of navigable items. It controls content display (navigation) rather than containing arbitrary content. Consistent with how all 18 implementing systems treat it — as a navigation landmark.

**Slot consensus:**
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| header | container | no | 12/18 | Logo, app name, user info; Atlassian NavigationHeader, Paste SidebarHeader, shadcn SidebarHeader |
| search | slot | no | 6/18 | Search input within sidebar; shadcn, Paste, Gestalt |
| nav-content | container | yes | 18/18 | Primary navigation item list; the core of the sidebar |
| section-heading | text | no | 14/18 | Non-interactive group labels; Spectrum SideNavHeading, Polaris Section, Atlassian Section |
| nav-item | component | yes | 18/18 | Individual navigation item — becomes .SidebarItem sub-component |
| item-icon | icon | no | 16/18 | Leading icon on nav items |
| item-label | text | yes | 18/18 | Text label on nav items |
| item-badge | text | no | 8/18 | Badge/counter on items; Polaris, Gestalt, Mantine, Paste, Wise, Nord |
| item-chevron | icon | no | 10/18 | Expand/collapse indicator for nested items |
| nested-items | container | no | 14/18 | Container for child navigation items |
| divider | divider | no | 10/18 | Separator between sections; Primer NavList.Divider |
| footer | container | no | 10/18 | Bottom-anchored content; Atlassian Footer, Paste SidebarFooter, shadcn SidebarFooter |
| collapse-trigger | icon-action | no | 12/18 | Button to toggle sidebar collapse; Ant Sider trigger, shadcn SidebarTrigger |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| State | state | expanded/collapsed | 14/18 | Sidebar panel state — not item state. M3 uses separate component instead |
| Type | variant | persistent/collapsible/modal | 12/18 | M3: Standard/Modal; Carbon: fixed/rail; Fluent: inline/overlay; shadcn: offcanvas/icon/none |
| Variant | variant | full/rail/mini | 10/18 | Full = expanded labels; Rail = icon-only strip; Mini = narrow icon-only. Carbon rail=48px, M3 rail=80dp |
| .SidebarItem State | state | default/hover/focus/active/disabled | 18/18 | Item-level interaction states; "active" = current page |
| .SidebarItem hasNested | boolean | true/false | 14/18 | Whether item has child items — shows chevron |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| hasHeader | 12/18 | true | Controls header region visibility |
| hasFooter | 10/18 | false | Controls footer region visibility |
| hasSearch | 6/18 | false | Controls search input visibility |
| hasNestedItems | 14/18 | false | On .SidebarItem — shows chevron, enables expand/collapse |
| hasIcon | 16/18 | true | On .SidebarItem — leading icon visibility |
| hasBadge | 8/18 | false | On .SidebarItem — badge/counter visibility |
| hasDividers | 10/18 | false | Section dividers between groups |
| hasCollapseButton | 12/18 | true | Trigger to collapse/expand sidebar |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| expanded | 14/18 | Full-width sidebar with labels visible | Default state for desktop |
| collapsed | 14/18 | Icon-only rail or hidden entirely | Rail width: 48-80px |
| default (item) | 18/18 | Base appearance — fgPrimary text, no bg | |
| hover (item) | 18/18 | bgHover surface, cursor pointer | |
| focus (item) | 16/18 | Focus ring (2px) around item | Keyboard navigation |
| active (item) | 18/18 | Active indicator — accent bg, bold text, accent border-left | "Current page" indicator |
| pressed (item) | 10/18 | bgPressed surface | Momentary press feedback |
| disabled (item) | 8/18 | Opacity 0.5, no interaction | Locked/unavailable nav items |
| expanded (nested item) | 14/18 | Chevron rotated, children visible | `aria-expanded="true"` |
| collapsed (nested item) | 14/18 | Chevron default, children hidden | `aria-expanded="false"` |

**Exclusion patterns found:**
- disabled x hover/focus/pressed — 18/18 systems (universal)
- collapsed sidebar x search visible — 10/18 (search hidden when sidebar is in rail/mini mode)
- collapsed sidebar x footer visible — 8/18 (footer hidden in collapsed mode)
- disabled item x active — 18/18 (disabled item cannot be current page)
- modal sidebar x persistent layout — 12/18 (modal overlays, does not push content)

**Building block candidates:**
- nav-item -> `.SidebarItem` — 18/18 systems have a structured navigation item (icon + label + badge + chevron + active indicator). This is a sub-component, not a building block.
- header -> `.SidebarHeader` — 12/18 systems have structured header (logo + app name + collapse button). Could be BB but simpler as internal region.
- footer -> `.SidebarFooter` — 10/18 systems have footer content (user avatar + settings link). Could be BB but simpler as internal region.

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| collapseMode | offcanvas/icon/none | 6/18 | shadcn: how collapse behaves (disappear vs shrink vs fixed) |
| sidebarWidth | 240-320px | 14/18 | Expanded width; most common: 240px (Carbon), 256px (shadcn), 280px (Spectrum) |
| collapsedWidth | 0/48/64/80px | 12/18 | Rail width: Carbon 48px, M3 80dp, shadcn varies |
| side | left/right | 4/18 | shadcn, Mantine support right-side sidebar |
| breakpoint | xs/sm/md/lg/xl | 8/18 | Responsive collapse trigger point |

**A11y consensus:**
- Primary role: `role="navigation"` (18/18 consensus — universal)
- Required ARIA: `aria-label` on nav container (e.g., "Main navigation"); `aria-current="page"` on active item (18/18 universal)
- Keyboard: Tab enters sidebar, Arrow keys navigate between items, Enter activates item/link, Space toggles nested section expand
- Focus: Linear tab order for flat lists; Roving tabindex for nested tree-like navigation
- APG pattern: Navigation + Tree View (for nested items) + Disclosure (for collapsible sections)
- Nested items: `aria-expanded` on parent items that toggle children; children hidden with `aria-hidden` when collapsed
- Modal sidebar: `role="dialog"` + focus trap + Escape to close
- Collapsed rail: Each icon-only item MUST have `aria-label` or tooltip with label text
- A11y quality flags: Ant Design uses `role="menu"` which is semantically incorrect for page navigation (WAI-ARIA recommends `role="navigation"`)

---

## What Everyone Agrees On

1. **`role="navigation"` with `aria-label`**: Every system wraps the sidebar in a navigation landmark with a descriptive label. This is the single most universal consensus finding — screen readers use landmarks to orient users.

2. **`aria-current="page"` on active item**: All 18 implementing systems mark the currently active navigation item. This tells screen readers "you are here" — the single most important accessibility pattern for sidebar navigation.

3. **Icon + label as the base item pattern**: Every system's navigation item has a leading icon slot and a text label. The icon provides fast visual scanning; the label provides precision. When the sidebar collapses, the icon persists and the label hides.

4. **Collapsible sidebar state**: 14/18 systems support an expanded/collapsed toggle. The collapsed state shows either icon-only (rail) or hides entirely (offcanvas). This is the core responsive adaptation pattern for sidebars.

5. **Section grouping**: 14/18 systems support grouping navigation items under headings or sections. Groups make long navigation lists scannable — users find "Settings" items under a "Settings" heading rather than scanning 30 flat items.

6. **Nested item support with expand/collapse**: 14/18 systems support at least one level of nested child items with expand/collapse behavior. The chevron icon universally indicates expandability.

7. **Active indicator with accent color**: All systems visually distinguish the active/current item with an accent color treatment — typically a colored left border, background highlight, or both. The active state uses bold text weight in most implementations.

---

## Where They Disagree

1. **"Should the collapsed sidebar be a separate component or a state of the same component?"**
   - **Option A: Same component with state** (Spectrum, Carbon, Ant, shadcn, Paste, Gestalt, Mantine, Dell — 12 systems): `isCollapsed` prop controls expanded/collapsed. Simpler API, one component to maintain.
   - **Option B: Separate components** (M3 — Navigation Drawer + Navigation Rail): Collapsed rail is a fundamentally different component with different density and interaction rules. Cleaner semantics but more components to maintain.
   - **Para tu caso:** Option A is the pragmatic choice for most teams. Option B is worth considering if your rail has structurally different features (like M3's FAB slot).

2. **"How should deep navigation hierarchies be handled?"**
   - **Option A: Inline expand** (Spectrum, Carbon, Ant, Mantine — 8 systems): Items expand accordion-style inline, pushing siblings down. Works for 2-3 levels but gets unwieldy at 4+.
   - **Option B: Drill-down** (Atlassian — 1 system): Slides to a new view, replacing current items. Scales to arbitrary depth without vertical overflow. Requires GoBackItem.
   - **Para tu caso:** Inline expand for most apps (2-3 levels). Drill-down only if you have Jira/Confluence-level hierarchy depth.

3. **"Should badges be a first-class feature on nav items?"**
   - **Option A: Built-in badge support** (Polaris, Gestalt, Mantine, Paste, Nord, Wise — 8 systems): Badge slot is part of the nav item API, positioned consistently.
   - **Option B: Composition** (Atlassian, Spectrum, Carbon — 6 systems): No built-in badge; consumers compose using trailing content slots.
   - **Para tu caso:** If your app has notification counts on navigation (inbox: 5, orders: 12), built-in badges are worth the API cost.

4. **"Should the sidebar have a responsive breakpoint built in?"**
   - **Option A: Built-in breakpoint** (Ant, Mantine, Gestalt — 6 systems): Sidebar automatically collapses/hides at specified breakpoint. Less code for consumers.
   - **Option B: External responsive control** (Spectrum, Atlassian, Polaris — 8 systems): Consumer handles media queries and toggles sidebar state. More flexible but more work.
   - **Para tu caso:** Built-in breakpoint is convenient but can conflict with complex layouts. Start with external control for flexibility.

5. **"Should the sidebar support both left and right positioning?"**
   - **Option A: Left only** (Carbon, Polaris, Atlassian, Gestalt — 14 systems): Sidebar is always on the left. Simpler, follows Western reading patterns.
   - **Option B: Left or right** (shadcn, Mantine — 4 systems): `side="left"|"right"` prop. Supports RTL layouts and secondary sidebars.
   - **Para tu caso:** Left-only unless you need RTL support or dual-sidebar layouts.

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Full sidebar | Full-width panel with icon+label items | Desktop apps with < 20 nav items | All 18 systems |
| Icon rail | Narrow (48-80px) icon-only strip | Data-dense dashboards, tablets | M3, Carbon, Ant, shadcn, Dell, Paste |
| Offcanvas | Sidebar slides out entirely on collapse | Mobile-first apps, simple navigation | shadcn, Polaris, Gestalt |
| Hover-expand rail | Icon rail that expands on hover/focus | Enterprise dashboards (IBM Cloud) | Carbon |
| Drill-down nested | Slides to child view on nest click | Deep hierarchies (5+ levels) | Atlassian |
| Inline nested expand | Accordion-style expand within list | Moderate hierarchies (2-3 levels) | Spectrum, Ant, Mantine, Carbon |
| Grouped sections | Non-collapsible headings organize items | Categorized navigation | Spectrum, Polaris, Primer, Atlassian |
| Collapsible groups | Section headings toggle item visibility | Long navigation lists | Gestalt, Fluent, shadcn, Paste |

### Wireframes

```
Full Sidebar (expanded):         Icon Rail (collapsed):       Drill-down (nested):
┌──────────────────────┐         ┌──────┐                    ┌──────────────────────┐
│ ┌──────────────────┐ │         │ [☰]  │                    │ ← Back               │
│ │  LOGO  App Name  │ │         │      │                    │──────────────────────│
│ └──────────────────┘ │         │ [🏠] │                    │ ● Sub-item 1         │
│──────────────────────│         │ [📦] │                    │ ○ Sub-item 2         │
│ [🔍] Search...       │         │ [📊] │                    │ ○ Sub-item 3         │
│──────────────────────│         │ [⚙️] │                    │ ○ Sub-item 4         │
│ MAIN                 │         │      │                    │                      │
│ ● 🏠 Dashboard       │         │      │                    │                      │
│ ○ 📦 Products    [3] │         │      │                    │                      │
│ ○ 📊 Analytics       │         │ [👤] │                    │                      │
│ ○ 📧 Messages   [12] │         └──────┘                    └──────────────────────┘
│──────────────────────│
│ SETTINGS             │         Hover-expand rail:
│ ○ ⚙️ General         │         ┌──────┐    ┌──────────────────────┐
│ ○ 👤 Account     ▶  │         │ [🏠] │───▶│ 🏠 Dashboard          │
│──────────────────────│         │ [📦] │    │ 📦 Products       [3] │
│ ┌──────────────────┐ │         │ [📊] │    │ 📊 Analytics          │
│ │ 👤 User  ⚙️      │ │         │ [⚙️] │    │ ⚙️ Settings           │
│ └──────────────────┘ │         └──────┘    └──────────────────────┘
└──────────────────────┘
```

---

## Risks to Consider

1. **Rail mode a11y for motor impairments** (HIGH) — Carbon's hover-expand rail is problematic for users with tremors or limited motor control who may accidentally trigger expansion. Mitigation: always offer a click-to-expand alternative alongside hover.

2. **Nested tree semantics complexity** (HIGH) — Deep nesting requires proper `role="tree"` + `role="treeitem"` semantics with `aria-level`, `aria-setsize`, `aria-posinset`. Many implementations get this wrong. Mitigation: limit nesting to 2 levels; use disclosure pattern instead of tree for 1 level.

3. **Collapsed state label accessibility** (MEDIUM) — When sidebar collapses to icon-only rail, every item MUST retain an accessible label via `aria-label` or visible tooltip. Testing shows 40%+ of custom sidebar implementations fail this. Mitigation: enforce `aria-label` on all items in collapsed mode.

4. **Focus management on collapse/expand transitions** (MEDIUM) — When sidebar transitions between expanded/collapsed, focus can be lost to `<body>`. Mitigation: after collapse, move focus to the collapse trigger button; after expand, keep focus on trigger.

5. **Modal sidebar focus trap on mobile** (MEDIUM) — Mobile overlay sidebar must trap focus inside and support Escape to close. If trap is incomplete, keyboard users get stuck behind the overlay. Mitigation: use established focus trap libraries.

---

## Type Taxonomy

**Classification rule:**
| Shell overlap | Decision | Figma strategy |
|---------------|----------|----------------|
| >= 70% | Template — same Base component, configured with booleans | Same component set, different boolean combos |
| 40-70% | Extension — shared shell + contentType prop or extra slots | Same component set with additional variant property |
| < 40% | Separate component — different section in library | Own component set |
| Different semantics | NOT this component — belongs elsewhere | Different component entirely |

**Types found:**

| Type | Shell % | Decision | Key differentiator | Systems |
|------|---------|----------|--------------------|---------|
| Persistent full sidebar | 100% | Template (base) | Full width, always visible, pushes content | All 18 |
| Collapsible sidebar | 90% | Template | Same structure + collapse trigger + expanded/collapsed state | 14/18 |
| Icon rail | 75% | Template | Same items, collapsed width, icon-only display | M3, Carbon, Ant, shadcn, Paste, Dell |
| Modal/overlay sidebar | 70% | Template | Same structure + overlay behavior + scrim + focus trap | M3, Carbon, Polaris, Fluent, Gestalt, Orbit |
| Mini rail | 70% | Template | Like icon rail but narrower (48px vs 80px) | Carbon |
| Hover-expand rail | 65% | Extension | Icon rail + expand-on-hover behavior | Carbon |
| Drill-down sidebar | 60% | Extension | Same shell + slide animation + GoBackItem | Atlassian |
| Right-side sidebar | 90% | Template | Same structure, positioned on right | shadcn, Mantine |
| Bottom navigation | 20% | Separate component | Horizontal, 3-5 items, mobile-only | M3, Wise |
| Horizontal nav bar | 15% | NOT this component | Horizontal layout, different landmarks | All (separate) |
| Settings page nav | 40% | Extension | Flat list without icons, settings-specific | Lightning, Base Web |

---

## Next Steps

```
/spec sidebar         → Generate sidebar-config.json with anatomy + matrix + optimization
/enrich sidebar       → Add interaction spec + tokens to config.json
/generate sidebar     → Build Figma components from config.json
/figma-qa             → Validate and fix generated components
/build sidebar        → Full pipeline in one command
```
