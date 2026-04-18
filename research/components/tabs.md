---
component: tabs
date: 2026-04-17
mode: --max
systems: 24
scope: all
---

# Tabs — Research (--max mode)

## Sistemas sin componente dedicado

| System | Reason | Workaround |
|--------|--------|------------|
| Orbit (Kiwi.com) | Mobile booking flows use bottom navigation and card-based flow rather than tabs | ButtonGroup with toggle buttons for segmented switching |

---

## How Systems Solve It

### Material Design 3

MD3 provides two separate tab components for explicit hierarchy control: `PrimaryTabRow` (top-level navigation below the app bar — scrollable or fixed) and `SecondaryTabRow` (in-page content subdivision — always fixed). They are not variants of the same component because mixing icons with text on Secondary tabs was found to create visual clutter in user testing. Fixed vs. scrollable layout must be declared upfront — no auto-detection — because runtime layout shifts when a new tab is added were deemed more disruptive than requiring designer intent upfront. Tab icons are only supported on Primary tabs (label, icon+label, or icon-only); Secondary stays text-only.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Primary vs. Secondary as separate components | Prevents hierarchy confusion when tabs exist at multiple levels in one view | H | Necessary for apps with nested tabs; confusing if you only have one level |
| Fixed vs. Scrollable declared upfront | Auto-switching on tab addition causes layout shifts (rejected by testing) | M | Document the choice requirement; inform designers of the decision |
| Icon-only on Primary | Secondary text-only reduces visual clutter in content-subdivision contexts | L | Icons in Secondary tabs: evaluate by use case |
| Custom `indicator` via TabRow slot | Active indicator is replaceable; brand expression on the active state | L | Ship indicator customization |

**Notable API**: `PrimaryTabRow` / `SecondaryTabRow`; `TabRow(indicator)` for custom active indicator; `ScrollableTabRow(edgePadding)`; separate Compose components

**Accessibility**: Arrow keys navigate; Tab enters panel; Home/End jump to first/last; automatic activation default; `role="tablist"/"tab"/"tabpanel"` + `aria-selected`/`aria-controls`/`aria-labelledby`.

---

### Spectrum (Adobe)

Spectrum's Tabs are architecturally the most composable in Tier 1: `Tabs` (state container), `TabList` (tab buttons), and `TabPanel` (content panels) can be placed at different positions in the DOM — the label row and content panel are completely decoupled. Overflow handling collapses the entire `TabList` into a Picker dropdown (not horizontal scroll) because partial label visibility in scroll was found to confuse users about how many tabs exist. `keyboardActivation="manual"` decouples focus traversal from panel switching, preventing expensive re-renders on every arrow key press. Dual-layer architecture: React Spectrum (themed) and React Aria (headless hooks) share the same a11y core.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| TabList and TabPanel decoupled from Tabs container | TabList and content can render in completely different DOM positions | H | Essential for app-shell patterns where tabs control full-page views |
| Overflow → Picker dropdown (not scroll) | Partial label visibility confuses users about total tab count | M | Alternative to scroll; evaluate for dense tab lists |
| `keyboardActivation="manual"` | Prevents re-renders on arrow-key focus without activation intent | H | Required for async-loading tabs; build this in |
| React Aria headless layer | Same a11y core between themed and unstyled | H | Best architecture for DS that needs themed + headless variants |

**Notable API**: `orientation` (horizontal|vertical); `keyboardActivation` (auto|manual); `isDisabled` per Tab; `items` for dynamic tab list

**Accessibility**: Picker overflow switches ARIA pattern to listbox (semantically correct for degraded layout); focus returns to active tab after panel interaction.

---

### Carbon (IBM)

Carbon provides two visual variants: `Line` (minimal underline indicator) for lightweight content contexts and `Contained` (filled background block) for dashboards needing strong visual anchoring between tabs and their panel. `activation="manual"` is a first-class API prop, directly addressing the render-performance problem in data-heavy enterprise panels. Scrollable overflow uses edge arrow buttons (not collapse) — the arrows are `aria-hidden="true"` because arrow key keyboard navigation handles the scroll implicitly. `dismissable` enables closable tabs with an X button. No vertical orientation.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Line vs. Contained variants | Different visual contexts require different visual anchoring | M | Contained for dashboard/data contexts; Line for editorial contexts |
| `activation="manual"` | Directly prevents API calls on every arrow press in data-heavy interfaces | H | Build `keyboardActivation="manual"` — industry consensus on name |
| Scroll arrows aria-hidden | Arrow keys handle scroll; announcing decorative scroll controls creates noise | M | Correct AT pattern for scrollable tab lists |
| `dismissable` (closable tabs) | Tab-as-document management pattern | M | Include if your app has multi-document patterns |

**Notable API**: `type="contained"`; `activation="manual"`; `dismissable`; `tabIndex` per tab; scroll arrow configuration

**Accessibility**: Scroll arrows `aria-hidden="true"`; Tab key exits to panel; wrapping arrow key navigation; standard tablist/tab/tabpanel roles.

---

### Polaris (Shopify)

Polaris Tabs are purpose-built for commerce admin saved views and are the most feature-complete out-of-the-box tabs in Tier 1 for this specific use case. Built-in `badge` prop shows counts per tab. Built-in tab actions (rename, duplicate, delete) via a disclosure UI. `"More views"` overflow disclosure reveals a view management interface. `canCreateNewView` + `onCreateNewView` turn the component into a user-generated saved-view management system. `fitted` distributes tabs equally across available width.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Built-in `badge` per tab | Commerce tabs always represent filtered lists needing counts | H | Copy badge prop if your tabs show content counts |
| Tab actions (rename/duplicate/delete) | Saved views need management affordances | M | Only needed for user-generated tab patterns |
| `canCreateNewView` + `onCreateNewView` | Turns tabs into view management | M | Niche; only for saved-view patterns |
| `fitted` for equal-width distribution | Consistent tab widths on fixed-width containers | L | Common administrative interface pattern |

**Notable API**: `badge` per tab (count badge); `fitted`; `disclosureText`; `canCreateNewView`; `onCreateNewView`; `onAction` for tab management

**Accessibility**: Badge content included in accessible name; disclosure trigger announces hidden tab count; `role="menu"` for management actions (distinct from tab navigation ARIA).

---

### Atlassian

Atlassian's Tabs are deliberately minimal — single line-style variant, sub-components matching WAI-ARIA spec naming exactly (`Tabs`/`TabList`/`Tab`/`TabPanel`). No overflow, no badges, no actions built in — all out of scope. The key architectural props: `shouldUnmountTabPanelOnChange` controls whether inactive panels stay mounted (for state preservation) or unmount (for performance/fresh data). Controlled mode via `selected`/`onChange` supports URL-synced tab navigation in Confluence.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Sub-component names match WAI-ARIA spec | Developers think in accessibility primitives directly | M | Reduces ARIA confusion; clean mental model |
| `shouldUnmountTabPanelOnChange` | Both mount-preserve and unmount-free patterns are common; don't choose for developers | H | Expose this as `unmountOnHide` or `lazyBehavior` — critical for performance |
| Controlled mode (selected/onChange) | URL-synced navigation; router integration | H | Required for deep-linking to specific tabs |
| Multiple instance `id` coordination | Multiple tab groups on the same page; ARIA IDs must not collide | M | Implement ARIA ID coordination in the component |

**Notable API**: `shouldUnmountTabPanelOnChange`; `id` (ARIA coordination); `selected`/`onChange` (controlled); tab-level `isDisabled`

**Accessibility**: Strict WAI-ARIA compliance; composable with Tooltip without breaking ARIA tree; focus wraps last-to-first; automatic activation.

---

### Ant Design

Ant Design's Tabs are maximalist — three types (line/card/editable-card), four tab positions (top/right/bottom/left), extra content slots (left and right of the tab bar), fully replaceable `renderTabBar`, and dynamic tab creation/deletion. The `editable-card` type adds add-tab and close-tab buttons, transforming the component from navigation to document management. Four-direction `tabPosition` eliminates the need for separate left-sidebar or bottom-nav components. `destroyInactiveTabPane` is the Ant equivalent of `shouldUnmountTabPanelOnChange`. `renderTabBar` escape hatch enables drag-to-reorder, sticky headers, and context menus without forking the component.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| `editable-card` type | Add/close buttons; document management interface | H | Use for multi-document/multi-session patterns |
| Four `tabPosition` options (top/right/bottom/left) | Covers all navigation positions without separate navigation components | H | Vertical tabs (left/right) for settings/sidebar navigation |
| `renderTabBar` escape hatch | Drag-reorder, sticky, context menus — any custom tab bar | M | Ship this escape hatch; it eliminates the most common reason to fork |
| `tabBarExtraContent` (left + right slots) | Action buttons or search adjacent to tab bar | M | Useful for "Add" button or search in the tab bar |

**Notable API**: `type` (line|card|editable-card); `tabPosition` (top|right|bottom|left); `tabBarExtraContent` ({left, right}); `renderTabBar`; `destroyInactiveTabPane`; `onEdit` for add/remove

**Accessibility**: Arrow key direction adapts to `tabPosition`; close buttons use "close [Tab Name]" aria-labels; overflow scroll controls labeled for SR.

---

### Tier 2 Systems

| System | Name | Key Differentiation |
|--------|------|---------------------|
| Twilio Paste | Tabs | Reakit-based; horizontal/vertical/inverse variants; fitted option |
| Salesforce Lightning | Tabs | Scoped vs. default variants; overflow dropdown for many tabs |
| GitHub Primer | TabNav / UnderlineNav | TabNav for URL-routing tabs; UnderlineNav with count badges |
| shadcn/ui | Tabs | Radix UI primitives; keyboard-managed tablist; controlled/uncontrolled |
| Playbook | Tabs | Section navigation; dual React/Rails |
| REI Cedar | CdrTabs | Vue tabs; full-width/compact sizes; WCAG 2.1 AA |
| Wise Design | Tabs | Section switching in account/transfer views |
| Dell Design System | Tabs | Enterprise dashboard section navigation |

---

### Tier 3 Systems

| System | Name | Key Differentiation |
|--------|------|---------------------|
| Radix UI | Tabs.Root / Tabs.List / Tabs.Trigger / Tabs.Content | Headless; `activationMode` (automatic/manual); `orientation`; `forceMount` per panel; full WAI-ARIA |
| Chakra UI | Tabs | Five visual variants; `isLazy` + `lazyBehavior`; `isFitted`; `colorScheme`; `variant` |
| GOV.UK | Tabs | Progressive enhancement: anchor links without JS → ARIA widget with JS; URL hash; max 4 tabs guidance |
| Base Web | Tabs / TabsMotion | Separate motion variant; `renderAll` for SEO; Overrides for TabHighlight/TabBorder |
| Fluent 2 | TabList / Tab | Navigation-only (no content management); `appearance` (subtle/transparent); `size="small"` for toolbars; vertical |
| Gestalt | Tabs | `href`-based navigation; dual in-page/URL mode; `bgColor` for surface adaptation |
| Mantine | Tabs | String value API (not index-based); `inverted` for bottom-tabs; `loop` keyboard nav; 4 variants (default/outline/pills/unstyled); `activateTabWithKeyboard` |
| Orbit | — | No tabs; ButtonGroup with toggles instead |
| Evergreen | Tab / Tablist | Polymorphic `is` for router links; `isSelected`; consumer-owned content panels |
| Nord | nord-tab-group | Web component for healthcare patient records; slot-based; full WAI-ARIA in shadow DOM |

---

## Pipeline Hints

### Archetype Recommendation

**Archetype: Navigation pattern (composite — state + list + panels)**

Tabs is a composite component pattern, not a single element. The minimum viable architecture is three logical pieces: a state container (Tabs root), a tab trigger list (TabList), and one or more content panels (TabPanel). The key architectural decision is whether to bundle all three (Chakra, Carbon) or split them into separate DOM-position-independent sub-components (Spectrum, Atlassian, Radix). Split architecture is the correct choice for apps where the tab list and content are in different DOM positions (app shell, sidebar navigation).

---

### Slot Consensus

| Slot | Consensus | Notes |
|------|-----------|-------|
| tab trigger (label) | 23/23 | The clickable tab label; text and optionally icon |
| tab panel (content) | 23/23 | The content panel shown when tab is active |
| icon (in trigger) | 15/23 | Optional icon before/after label in trigger |
| badge / count | 8/23 | Count indicator; Polaris, Primer, Lightning, Paste |
| close button (dismissable) | 5/23 | Per-tab close; Carbon, Ant Design, custom |
| tabBarExtraContent | 4/23 | Content adjacent to tab bar (search, add button); Ant Design |
| custom tab bar | 3/23 | Fully replace the tab bar; Ant Design renderTabBar |

---

### Property Consensus

| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| defaultValue / defaultIndex | string or number | 18/23 | Which tab is active by default (uncontrolled) |
| value / selectedKey | string or number | 18/23 | Controlled selected tab |
| onChange / onSelectionChange | function | 18/23 | Selection change callback |
| orientation | horizontal, vertical | 14/23 | Axis of tab list layout |
| keyboardActivation / activationMode | auto, manual | 12/23 | Whether focus triggers activation |
| isDisabled / disabled | boolean (per tab) | 14/23 | Disable individual tab |
| type / variant | line, card, editable-card, pills, outline | 12/23 | Visual style variant |
| tabPosition / placement | top, right, bottom, left | 6/23 | Tab list position relative to content |

---

### Boolean Properties

| Property | Default | Adopters |
|----------|---------|---------|
| shouldUnmountTabPanelOnChange | false | Atlassian |
| destroyInactiveTabPane | false | Ant Design |
| lazyBehavior / isLazy | false | Chakra |
| fitted / isFitted | false | Polaris, Chakra |
| dismissable | false | Carbon |
| canCreateNewView | false | Polaris |
| loop | true | Mantine |
| inverted | false | Mantine (bottom-tabs) |
| forceMount | false | Radix (per panel) |
| renderAll | false | Base Web (for SEO) |

---

### State Coverage

| State | Adopters | Notes |
|-------|---------|-------|
| default (uncontrolled) | All | `defaultValue` or `defaultIndex` |
| active / selected | All | Active tab and visible panel |
| focused | All | Focus ring on tab trigger |
| hover | All | Hover state on tab trigger |
| disabled (per tab) | Most | Grayed out; not interactive |
| loading (panel) | Chakra, Spectrum | Deferred panel rendering |
| dismissable (closable) | Carbon, Ant Design | Per-tab close button |
| editable (add/close) | Ant Design | editable-card type |
| overflow (too many tabs) | Spectrum (Picker), Carbon (scroll arrows), Lightning (dropdown), Polaris (More views) | Multiple overflow strategies |

---

### Exclusion Patterns

- Tabs are NOT for routing between pages without URL management — implement URL hash sync or use router-aware tabs (GOV.UK pattern, Primer TabNav)
- Tabs are NOT a substitute for a Disclosure/Accordion — tabs always show exactly one panel; accordion can show multiple
- Tabs with only 1 tab are a degenerate case — document minimum 2 tabs requirement
- Do NOT use `display: none` alone to hide inactive panels; must also apply `hidden` attribute or `aria-hidden="true"` to prevent SR from announcing hidden content
- Icon-only tabs are NOT accessible without `aria-label` on each tab trigger

---

### Building Block Candidates

- **Tabs.Root**: State container; manages selected value; provides context; uncontrolled (defaultValue) and controlled (value + onChange)
- **Tabs.List**: The row/column of tab triggers; manages arrow key navigation; `role="tablist"`; overflow strategy (scroll or collapse)
- **Tabs.Trigger / Tab**: Individual tab button; `role="tab"`; `aria-selected`; `aria-controls`
- **Tabs.Panel / TabPanel**: Content panel; `role="tabpanel"`; `aria-labelledby`; unmount vs. hide behavior
- **Tabs.Badge**: Count badge composable into tab trigger (Polaris pattern)

---

### Enum / Configuration Properties

| Property | Values | Source |
|----------|--------|--------|
| keyboardActivation | `"automatic"`, `"manual"` | Spectrum, Radix (activationMode) |
| orientation | `"horizontal"`, `"vertical"` | Most systems |
| tabPosition | `"top"`, `"right"`, `"bottom"`, `"left"` | Ant Design |
| type / variant | `"line"`, `"card"`, `"editable-card"`, `"pills"`, `"outline"`, `"soft-rounded"`, `"solid-rounded"` | Ant Design, Chakra |
| lazyBehavior | `"keepMounted"`, `"unmount"` | Chakra |
| appearance | `"subtle"`, `"transparent"` | Fluent 2 |

---

### A11y Consensus

| Topic | Consensus |
|-------|-----------|
| Roles | `role="tablist"` on container; `role="tab"` on each trigger; `role="tabpanel"` on each panel |
| Selected state | `aria-selected="true"` on active tab; `aria-selected="false"` on inactive tabs |
| ARIA wiring | `aria-controls` on tab → panel `id`; `aria-labelledby` on panel → tab `id` |
| Keyboard | Left/Right (horizontal) or Up/Down (vertical) navigate tabs; Home/End jump to first/last; Tab enters active panel; Enter/Space activate in manual mode |
| Inactive panels | `display:none`, `hidden` attribute, or `aria-hidden="true"` — must be hidden from AT |
| Navigation tabs | If href-based, use `aria-current="page"` instead of `aria-selected` |
| Icon-only tabs | `aria-label` on tab trigger required; no visible label means no accessible name |
| Count badges | Include count in tab's accessible name ("Issues, 12 results") |
| APG Pattern | WAI-ARIA Tabs Pattern (https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) |

---

## What Everyone Agrees On

1. **Three-part architecture is universal**: Tablist (container) + Tab (triggers) + TabPanel (content). Every system, regardless of naming, implements these three roles. WAI-ARIA pattern is universally followed.
2. **Keyboard navigation contract is consistent**: Arrow keys navigate between tabs; Tab enters the active panel; Home/End jump to first/last tab. This contract is the same across all 23 systems with tabs.
3. **Inactive panels must be hidden from AT**: `display:none` or `hidden` attribute on inactive panels is required — panels left in DOM but visually hidden cause screen readers to announce non-active tab content.
4. **`keyboardActivation="manual"` is required for async tabs**: When switching a tab triggers a network request, automatic activation causes a fetch on every arrow key press. Manual mode separates navigation from activation intent. All modern systems expose this.
5. **Controlled mode is required for URL integration**: `value` + `onChange` enables router-synced tab state. Deep-linking to specific tabs is a requirement for most web applications. Uncontrolled-only tabs are not production-viable.
6. **Panel mount/unmount strategy is developer's choice**: Both `keepMounted` (preserve state/scroll) and `unmount` (fresh data each visit) are valid. Atlassian's `shouldUnmountTabPanelOnChange` and Chakra's `lazyBehavior` both expose this explicitly.

---

## Where They Disagree

### 1. Separate sub-components vs. bundled component
**Option A (Sub-components)**: `<Tabs.Root>` + `<Tabs.List>` + `<Tabs.Trigger>` + `<Tabs.Content>` — Radix, Spectrum, Atlassian, Mantine  
**Option B (Bundled with `items` prop)**: `<Tabs items={[{label, content}]} />` — Carbon, many T2 systems

- Adopters A: Radix, Spectrum, Atlassian, Mantine, GOV.UK  
- Adopters B: Carbon, Polaris, Lightning  
- Upside A: TabList and panels can render at different DOM positions; headless-compatible; matches WAI-ARIA mental model  
- Downside A: More verbose for simple cases; four imports instead of one  
- Upside B: Simple; less boilerplate for standard cases  
- Downside B: Hard to render tabs and content in different DOM positions; less flexible  
- Para tu caso: Sub-component architecture is the right choice. Provide a convenience `<Tabs>` with `items` prop as a shorthand for the simple case.

### 2. Overflow strategy: scroll vs. collapse vs. dropdown
**Option A (Scroll)**: Arrow buttons or drag-to-scroll — Carbon, Radix (native scroll), GOV.UK  
**Option B (Collapse to Picker/dropdown)**: Entire overflowing TabList collapses — Spectrum  
**Option C (Disclosure "More" button)**: Hidden tabs accessible via "More" popup — Polaris, Lightning  
**Option D (No overflow handling)**: Consumer's responsibility — Atlassian, most T3

- Adopters A: Carbon, MD3 (ScrollableTabRow), Mantine (loop)  
- Adopters B: Spectrum  
- Adopters C: Polaris, Lightning, Primer UnderlineNav  
- Adopters D: Atlassian, Radix, shadcn  
- Upside A: All tabs always visible (just scrolled); no information hiding  
- Upside B: Partial label visibility confuses users; Picker shows full label for all tabs  
- Upside C: "More" is familiar and works for user-generated tabs  
- Para tu caso: Build scroll overflow for horizontal tabs (most universal); add "More" disclosure for user-generated tab lists.

### 3. Automatic vs. manual keyboard activation
**Option A (Auto)**: Arrow key focus immediately activates tab and shows panel — most systems  
**Option B (Manual)**: Arrow key moves focus; Enter/Space activates — Spectrum (keyboardActivation="manual"), Radix (activationMode="manual"), Carbon (activation="manual"), Mantine (activateTabWithKeyboard)

- All adopters: Full cross-tier consensus that BOTH should be available  
- Upside A: Simpler mental model; fewer keypresses for most users  
- Downside A: Triggers API calls/data fetches on every arrow press — unacceptable for async-loading tabs  
- Upside B: Separates navigation intent from activation; essential for expensive operations  
- Para tu caso: Default to `"automatic"` but expose `keyboardActivation="manual"` as a prop. Name it `activationMode` per Radix consensus.

### 4. Panel rendering strategy
**Option A (Stay mounted, hidden)**: Inactive panels stay in DOM, visibility toggled — Atlassian default, GOV.UK  
**Option B (Unmount on hide)**: Inactive panels are removed from DOM — Carbon, some defaults  
**Option C (Lazy + keep)**: Never mount until first visit, then keep mounted — Chakra `lazyBehavior="keepMounted"`  
**Option D (Lazy + unmount)**: Never mount until visited, unmount when leaving — Chakra `lazyBehavior="unmount"`

- Para tu caso: Expose as `unmountOnHide` (boolean) for simple cases; expose `lazyBehavior` (enum) for fine-grained control. Default to stay-mounted (Option A) for most use cases.

### 5. Vertical tabs as variant vs. separate component
**Option A (Variant/prop)**: `orientation="vertical"` on the same component — Spectrum, Atlassian, Radix, Mantine, Ant Design, Fluent 2  
**Option B (tabPosition)**: `tabPosition="left"/"right"` — Ant Design (covers both vertical + position)  
**Option C (Separate component)**: Separate left-nav or sidebar component — Evergreen

- Adopters A: Spectrum, Atlassian, Radix, Mantine, Fluent 2, Paste  
- Adopters B: Ant Design (additional granularity over A)  
- Para tu caso: `orientation="vertical"` is the clear consensus. Add `tabPosition` if you need right-side tabs. Keyboard contract must adapt (Up/Down arrows for vertical).

---

## Visual Patterns Found

| Pattern | Description | Best For | Adopted By |
|---------|-------------|----------|------------|
| Line tabs (underline) | Minimal underline active indicator; no background change | Editorial, content sections | MD3 Secondary, Carbon Line, Atlassian, Mantine default |
| Filled / Contained tabs | Active tab has filled background matching panel | Dashboards, data-heavy interfaces | Carbon Contained, MD3 Primary, Ant Design card |
| Pills tabs | Rounded background on active tab | Settings, filter groups | Mantine pills, Chakra soft-rounded/solid-rounded |
| Icon tabs | Tab triggers with icons (with or without label) | Compact toolbars, icon-heavy UIs | MD3 Primary, Fluent 2 small, custom |
| Tab with badge | Count badge next to tab label | Filtered lists, inbox, issues | Polaris, Primer, Lightning |
| Editable tabs (add/close) | Add tab button + close per tab | Multi-document, browser-like interfaces | Ant Design editable-card, Carbon dismissable |
| Bottom tabs (inverted) | Tab list below the content panel | Mobile-style navigation in web | Mantine `inverted`, custom |
| Vertical tabs | Tab list on left or right side | Settings navigation, sidebar navigation | Spectrum, Ant Design tabPosition, Fluent 2 |

### ASCII Wireframes

**Line tabs (horizontal, standard)**
```
┌─────────────────────────────────────────────┐
│  Overview │ Analytics │ Settings │ Billing   │
│  ─────────                                   │  ← active underline
├─────────────────────────────────────────────┤
│                                             │
│   [Active tab content]                      │
│                                             │
└─────────────────────────────────────────────┘
```

**Contained tabs (Carbon pattern)**
```
┌──────────┬──────────┬──────────┬────────────┐
│ Overview │Analytics │ Settings │  Billing   │  ← tab list (filled bg)
├──────────┴──────────┴──────────┴────────────┤  ← joined border
│                                             │
│   [Active tab content — anchored visually]  │
│                                             │
└─────────────────────────────────────────────┘
```

**Tabs with badge counts (Polaris pattern)**
```
┌──────────────────────────────────────────────────┐
│  All ●37 │ Active ●12 │ Draft ●8 │ Archived ●17  │
│  ─────────                                        │
├──────────────────────────────────────────────────┤
│  [All orders content]                            │
└──────────────────────────────────────────────────┘
```

**Vertical tabs (Settings navigation)**
```
┌─────────────────────────────────────────────────┐
│  ┌──────────────┬──────────────────────────────┐│
│  │  Overview    │                              ││
│  ├──────────────┤  [Selected tab content]      ││
│  │▶ Account     │                              ││  ← active
│  ├──────────────┤                              ││
│  │  Privacy     │                              ││
│  ├──────────────┤                              ││
│  │  Billing     │                              ││
│  └──────────────┴──────────────────────────────┘│
└─────────────────────────────────────────────────┘
```

**Editable tabs (Ant Design editable-card)**
```
┌───────────┬───────────┬───────────┬────┐
│ Tab 1  ✕ │ Tab 2  ✕ │ Tab 3  ✕ │  + │  ← close per tab + add button
├───────────┴───────────┴───────────┴────┤
│  [Active tab content]                  │
└────────────────────────────────────────┘
```

**Overflow patterns**
```
Scroll:  ← Overview │ Analytics │ Settings │ Billing │ Reports → →
Collapse: Overview │ Analytics │ Settings │ ▼ More (3)
```

---

## Risks to Consider

### 1. Inactive panels accessible to screen readers — HIGH
Inactive tab panels left in the DOM without `display:none`, `hidden` attribute, or `aria-hidden="true"` will be read by screen readers, causing users to encounter content from tabs they haven't activated. This is one of the most common ARIA implementation errors in custom tab components. The WAI-ARIA pattern is explicit: inactive panels must be hidden from AT.

**Mitigation**: Hide inactive panels with `hidden` attribute (not just CSS visibility). Audit implementation with a screen reader. Test that tabbing through the page does not reach content in inactive panels.

### 2. Missing `keyboardActivation="manual"` causes spurious data fetches — HIGH
In automatic activation mode, pressing the Right arrow key to browse tab labels triggers a panel switch on every tab. If the panel fetches data on mount, this causes N network requests for a user merely browsing the tab options. Most teams discover this bug only in production under slow network conditions.

**Mitigation**: Default to `activationMode="manual"` when panels fetch data on mount. Document the choice clearly. If your tabs are content-switching only (no async), `"automatic"` is fine. Expose the prop from day one.

### 3. URL state not managed → broken back button / lost deep links — HIGH
Tabs that manage selection only in local component state break browser history (back button doesn't return to the previous tab), prevent deep-linking to specific tabs in URLs, and cannot be bookmarked or shared. Most system defaults are local state only.

**Mitigation**: Document URL sync as a required pattern for navigation tabs. Provide a controlled mode (`value` + `onChange`). Show an example with React Router or Next.js URL state management in the documentation.

### 4. ARIA ID collisions with multiple tab instances — MEDIUM
Tabs components that generate ARIA IDs (`aria-controls` on tabs, `id` on panels) using sequential integers will produce duplicate IDs when multiple tab components exist on the same page. Duplicate IDs break the ARIA relationship and cause screen readers to announce the wrong panel for a given tab.

**Mitigation**: Generate unique IDs per Tabs instance using a unique prefix (uuid, React useId, or an incrementing instance counter). Never use globally sequential integers. Atlassian's `id` prop for ARIA coordination is the reference pattern.

---

## Next Steps

1. **Sub-component architecture first**: Implement Tabs.Root + Tabs.List + Tabs.Trigger + Tabs.Panel. Provide a convenience `<Tabs items={[...]} />` shorthand for simple cases.
2. **Expose `activationMode` from day one**: Default `"automatic"`; document when to use `"manual"`. This prop is missed in initial implementations and very hard to retrofit without API breaking changes.
3. **Implement `lazyBehavior` / `unmountOnHide`**: Both `keepMounted` and `unmount` strategies are needed. Default to `keepMounted` (safer); expose `unmount` for data-freshness cases.
4. **Generate unique ARIA IDs per instance**: Use React `useId` or a counter. Never rely on global sequential integers.
5. **Support controlled mode**: `value` + `onChange` from day one. Required for URL integration.
6. **Design overflow strategy**: Choose scroll (simplest), "More" disclosure (best for user-generated), or none (simplest — consumer handles). Avoid collapse-to-Picker unless you have Spectrum's headless architecture.
7. **Test with screen reader before shipping**: Tab role, panel visibility, keyboard contract, and badge accessible names are the four most common failures.
