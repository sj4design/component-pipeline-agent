---
component: bottom-nav
compiled: 2026-03-31
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Bottom Nav — All Systems Digest

## Material Design 3
**Approach**: Called "Navigation Bar" — the primary mobile navigation pattern. Displays 3-5 destinations at the screen bottom, each with icon + label. Active destination gets a pill-shaped indicator behind the icon. Supports badge (dot or count) on destinations. Disappears on scroll-down, reappears on scroll-up. Replaced M2's BottomNavigationView with a more opinionated, animation-rich implementation.
**Key decisions**:
- [HIGH] 3-5 destination hard limit; fewer than 3 should use tabs or a different pattern, more than 5 creates touch-target issues on small screens — this is the most opinionated constraint among all systems
- [HIGH] Active indicator pill shape; replaces M2's color-tint-on-icon approach — the pill provides a larger, more visible active state that works across dynamic color themes without relying on color alone
- [MED] Icon-only mode discouraged but supported; labels improve comprehension by 75% per Google's research — when labels are hidden, they reappear on the active item
- [MED] Hide-on-scroll behavior built into spec; preserves content space during vertical scrolling — reappears immediately on any upward scroll or bottom-reach
**Notable API**: `NavigationBarItem` with `icon`, `selectedIcon`, `label`, `badge` (BadgedBox wrapping icon); `NavigationBar` container; no explicit `maxItems` enforcement at API level but guidelines mandate 3-5
**A11y**: Each destination is a navigation link with `role="tab"` semantics in Android; `aria-selected` marks active; badge count announced as part of destination label ("Home, 3 new notifications"); entire bar is `role="navigation"` landmark.
**Best at**: Most complete mobile bottom nav specification — active indicator animation, badge integration, scroll behavior, and strict destination count guidance. **Missing**: No responsive breakpoint behavior (switches to NavigationRail at medium/expanded widths — separate component).

## Spectrum (Adobe)
**Approach**: No bottom navigation component. Spectrum is desktop-first — Adobe's creative tools (Photoshop, Illustrator, XD) use side navigation, top tabs, and panel-based layouts. Mobile apps like Lightroom Mobile use platform-native navigation patterns rather than Spectrum components. The closest equivalent is TabBar for horizontal tab switching, but it's positioned contextually (not screen-bottom-fixed).
**Key decisions**:
- [HIGH] Intentional omission; Adobe's product portfolio is overwhelmingly desktop/tablet — building a bottom nav component would serve very few products and risk encouraging inappropriate mobile-first patterns in desktop tools
- [MED] TabBar covers horizontal switching but lacks fixed-bottom positioning, badge support, and mobile-specific touch targets
**Notable API**: N/A — no bottom nav component exists
**A11y**: N/A
**Best at**: N/A. **Missing**: Entire bottom navigation pattern — teams building Adobe mobile experiences must compose from primitives or use platform-native components.

## Carbon (IBM)
**Approach**: No bottom navigation component. Carbon is enterprise-desktop-focused — IBM products use the UI Shell (left-rail sidebar navigation with hamburger collapse) as the primary navigation pattern. Mobile layouts in Carbon rely on the collapsed hamburger menu or simplified top navigation. No fixed-bottom mobile tab bar exists in the component library.
**Key decisions**:
- [HIGH] Enterprise desktop navigation model; IBM's products (Cloud, Watson, Security) are complex multi-level apps where sidebar navigation with hierarchy is essential — a bottom nav with 3-5 flat destinations doesn't map to these information architectures
- [MED] Mobile handled via responsive collapse of sidebar to hamburger; Carbon treats mobile as a compressed version of desktop nav, not a separate paradigm
**Notable API**: N/A — no bottom nav component exists
**A11y**: N/A
**Best at**: N/A. **Missing**: Entire bottom navigation pattern — no mobile-first fixed-bottom tab bar.

## Polaris (Shopify)
**Approach**: No dedicated bottom navigation component in the public component library. Shopify's mobile admin app uses a platform-native bottom tab bar (iOS TabBar / Android BottomNavigation) rather than a web component. The web admin uses top-bar + sidebar navigation. Polaris focuses on the merchant admin web experience where bottom nav is not the pattern.
**Key decisions**:
- [HIGH] Platform-native mobile navigation; Shopify's mobile apps are native iOS/Android — using system bottom tabs gives merchants familiar, performant navigation that respects OS conventions (swipe gestures, haptics)
- [MED] Web admin uses Navigation component (sidebar) which handles deep hierarchical merchant navigation (Orders > Drafts, Products > Collections) that bottom nav's flat 3-5 destinations cannot express
**Notable API**: N/A — no bottom nav component exists in Polaris web
**A11y**: N/A
**Best at**: N/A. **Missing**: Entire bottom navigation pattern — deferred to native platform components.

## Atlassian
**Approach**: No bottom navigation component. Atlassian products (Jira, Confluence) use top navigation bar + side navigation for desktop. Mobile apps (Jira Mobile, Confluence Mobile) implement platform-native bottom tab bars through their native codebases, not through the Atlassian Design System web components. The DS focuses on web-first enterprise tooling.
**Key decisions**:
- [HIGH] Web-first enterprise navigation model; Jira and Confluence have deep navigation hierarchies (projects, boards, spaces, pages) — these require expandable side nav, not flat bottom destinations
- [MED] Mobile apps are native implementations; Atlassian's mobile strategy separates the web DS from native mobile patterns, letting each platform use its own idiom
**Notable API**: N/A — no bottom nav component exists
**A11y**: N/A
**Best at**: N/A. **Missing**: Entire bottom navigation pattern — native mobile apps handle this independently.

## Ant Design
**Approach**: Called "TabBar" — a mobile-focused bottom navigation component available in Ant Design Mobile (not the main antd library). Supports 2-5 tabs with icon + label. Active tab distinguished by color change. Badge integration via `badge` prop on each TabBar.Item. Supports safe-area inset handling for notched devices (iPhone). Part of the `antd-mobile` package specifically.
**Key decisions**:
- [HIGH] Separate mobile library (`antd-mobile`); Ant Design recognizes that bottom nav is fundamentally a mobile pattern — keeping it out of the main `antd` desktop library prevents misuse and keeps the desktop bundle clean
- [HIGH] Badge prop on TabBar.Item; notification counts on navigation destinations are a first-class concern — avoids the composition complexity of wrapping icons in Badge components
- [MED] Safe-area handling built-in; modern phones with notches and gesture bars need bottom padding — `safeArea` prop prevents content from hiding behind system UI
- [MED] Supports custom icon render via function receiving `active` boolean; enables animated or swapped icons for active state without maintaining two icon sets
**Notable API**: `TabBar` with `activeKey`, `onChange`; `TabBar.Item` with `key`, `icon` (ReactNode or (active: boolean) => ReactNode), `title`, `badge` (Badge props passthrough); `safeArea` boolean for notch handling
**A11y**: Renders as list of buttons; active state communicated via `aria-selected`; badge count not automatically announced — requires manual aria-label on the tab item; no `role="navigation"` wrapper by default.
**Best at**: Practical mobile bottom nav with badge integration and safe-area handling in a dedicated mobile library. **Missing**: No active indicator shape/pill animation (just color change); a11y announcement of badge counts requires manual work; limited to `antd-mobile` ecosystem.
