---
component: tabs
compiled: 2026-03-28
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Tabs — All Systems Digest

## Material Design 3
**Approach**: Two semantic tiers — Primary (top-level navigation below app bar) and Secondary (in-page content subdivision). Fixed vs. Scrollable layout requires explicit designer choice; no auto-overflow detection to prevent jarring layout shifts.
**Key decisions**:
- Primary vs. Secondary as separate components; prevents confusion when tabs nest at multiple hierarchy levels
- Fixed vs. Scrollable must be declared upfront; auto-switching causes layout shifts (rejected)
- Icon placement on Primary tabs only (label/icon+label/icon-only); Secondary stays label-only to reduce visual clutter
**Notable API**: `PrimaryTabRow`/`SecondaryTabRow` (separate Compose components); `TabRow(indicator)` for custom active indicator; `ScrollableTabRow(edgePadding)`
**A11y**: Arrow keys navigate; Tab enters panel; Home/End jump to first/last; automatic activation default; role="tablist/tab/tabpanel" + aria-selected/controls/labelledby.
**Best at**: Clear visual hierarchy when tabs exist at multiple levels in the same view. **Missing**: No overflow "more" affordance; scrollable tabs hide destinations off-screen.

## Spectrum (Adobe)
**Approach**: Composable split — Tabs (state), TabList (labels), TabPanel (content) in separate DOM positions. Overflow collapses entire TabList into a Picker dropdown. Dual layer: React Spectrum (themed) + React Aria (headless hooks) share the same a11y core.
**Key decisions**:
- Content decoupled from container; TabList and TabPanel can render in different DOM locations
- Overflow collapses to Picker dropdown (not scroll); partial label visibility confuses users in dense panels
- `keyboardActivation="manual"` decouples focus from selection; prevents expensive re-renders on every arrow press
**Notable API**: `orientation` (horizontal|vertical with full keyboard adaptation); `keyboardActivation` (auto|manual); `isDisabled` on individual Tab
**A11y**: When collapsed to Picker, ARIA pattern switches to listbox (semantically correct for degraded layout); focus trapped in panel after selection.
**Best at**: Multi-context reuse and headless/themed dual-layer architecture. **Missing**: No closable/editable tabs or badge support.

## Carbon (IBM)
**Approach**: Line (minimal underline) vs. Contained (filled background) variants for different visual contexts. Manual vs. Automatic activation is a first-class choice to prevent expensive re-renders. Scrollable overflow uses edge arrow buttons (not collapse).
**Key decisions**:
- Line vs. Contained explicit choice; Contained for dashboards needing visual anchor between tab and panel
- Manual activation prevents API calls on every arrow-key press in data-heavy enterprise panels
- Scroll arrows aria-hidden for keyboard/SR users; arrow keys handle scroll implicitly (avoids announcing decorative controls)
**Notable API**: `type="contained"`; `activation="manual"` (rare, directly addresses render performance); `dismissable` (closable tabs with X icon)
**A11y**: Scroll arrows aria-hidden="true"; Tab key exits to panel; wrapping arrow key navigation; standard tablist/tab/tabpanel roles.
**Best at**: Enterprise data-heavy interfaces needing manual activation and strong visual anchoring. **Missing**: No vertical orientation.

## Polaris (Shopify)
**Approach**: Commerce-specific tabs purpose-built for merchant saved views with built-in badge counts, tab actions (rename/duplicate/delete), "More views" disclosure overflow, and dynamic view creation. Tightly coupled to Shopify admin patterns.
**Key decisions**:
- Built-in `badge` prop for count display; Shopify admin tabs always represent filtered lists needing counts
- Disclosure "More views" overflow (not scroll) exposes a view management interface, not just hidden tabs
- `canCreateNewView` + `onCreateNewView` turn tabs into user-generated saved-view management
**Notable API**: `fitted` (equal-width distribution); `disclosureText` (customizable overflow trigger); `canCreateNewView`; `badge` per tab
**A11y**: Badge content included in accessible name; disclosure trigger announces hidden tab count; role="menu" for management actions (distinct from tab navigation).
**Best at**: Commerce saved-view patterns with counts, actions, and dynamic creation. **Missing**: No vertical orientation, no icons, no contained variant.

## Atlassian
**Approach**: Deliberately minimal — single line-style variant, composable sub-components (Tabs/TabList/Tab/TabPanel) matching WAI-ARIA spec directly. No overflow, no badges, no actions built in. Exposes `shouldUnmountTabPanelOnChange` for performance vs. state-preservation choice.
**Key decisions**:
- Sub-component architecture matches WAI-ARIA spec; developers think in accessibility primitives, not proprietary API
- `shouldUnmountTabPanelOnChange` left to developer; both mount-preserve and unmount-free patterns common in Jira/Confluence
- Controlled mode (`selected`/`onChange`) supports URL-synced tab navigation in Confluence
**Notable API**: `shouldUnmountTabPanelOnChange`; `id` (ARIA coordination for multiple tab instances); `selected`/`onChange` (controlled mode)
**A11y**: Strict WAI-ARIA compliance; composable wrapping with Tooltip doesn't break ARIA tree; focus wraps last-to-first; automatic activation.
**Best at**: Clean spec-compliant implementation composable with other ADS components. **Missing**: No overflow handling, no vertical orientation, no badges or icons.

## Ant Design
**Approach**: Maximalist — three types (line/card/editable-card), four placement positions (top/right/bottom/left), extra content slots, fully replaceable `renderTabBar`, and dynamic tab creation/deletion. Serves browser-tab-style multi-document interfaces.
**Key decisions**:
- `editable-card` type adds add/close buttons; turns navigation component into document management interface
- Four-direction `tabPosition` eliminates need for separate navigation components in left-sidebar or bottom-nav patterns
- `renderTabBar` escape hatch for drag-reorder, context menus, or sticky behavior; no forking required
**Notable API**: `type` (line|card|editable-card); `tabPosition` (top|right|bottom|left); `tabBarExtraContent` ({left, right} slots); `destroyInactiveTabPane`
**A11y**: Arrow key direction adapts to tabPosition; editable-card close buttons use "close [Tab Name]" aria-labels; overflow scroll controls labeled for SR.
**Best at**: Universal tab component from simple switching to multi-document management. **Missing**: No built-in badge/count support; steep learning curve from API breadth.
