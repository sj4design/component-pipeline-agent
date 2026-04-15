---
system: Ant Design
component: Tabs
url: https://ant.design/components/tabs/
last_verified: 2026-03-28
---

# Tabs

## Approach
Ant Design takes a maximalist, kitchen-sink approach to tabs, offering more configuration options than any other major system. The component supports three visual types (line, card, editable-card), four placement positions (top, right, bottom, left), centered alignment, extra content slots in the tab bar, a fully replaceable tab bar renderer, and dynamic tab creation/deletion. This breadth exists because Ant Design serves the Chinese enterprise market where applications like ERP systems, admin dashboards, and internal tools routinely use tabs as a primary application-level navigation metaphor -- similar to browser tabs. A single Ant Design app might have dozens of open "tabs" representing different pages, and users expect to add, close, reorder, and manage them. Rather than building a separate component for this, Ant Design extended Tabs to handle everything from simple content switching to full multi-document interfaces.

## Key Decisions
1. **Three distinct type variants: line, card, editable-card** (HIGH) — Line tabs are the default for simple content switching. Card tabs add a visible container border, making each tab look like a physical card or folder tab -- this suits interfaces where tabs represent distinct documents or entities. Editable-card extends card with add/close buttons, enabling dynamic tab management. Ant Design created three types because Chinese enterprise software conventions expect card-style tabs for document-like contexts and line tabs for settings/configuration, and the editable variant is necessary for multi-document interfaces that are prevalent in this market.

2. **Four-direction placement** (MEDIUM) — The `tabPosition` prop accepts top, right, bottom, and left values, rotating the entire tab bar and panel layout accordingly. Most systems support only horizontal tabs or at most horizontal+vertical. Ant Design supports all four because Chinese enterprise apps frequently use left-positioned tabs for sidebar navigation and bottom-positioned tabs for mobile-style navigation within desktop views. This flexibility eliminates the need for separate navigation components.

3. **Fully replaceable tab bar via renderTabBar** (HIGH) — The `renderTabBar` prop accepts a function that receives the default tab bar props and component, returning a custom React element. This is a power-user escape hatch that Ant Design provides because the diversity of enterprise use cases means no single tab bar design can cover all needs. Teams can add drag-to-reorder, right-click context menus, or sticky positioning without forking the component. The risk is that custom renderers can break accessibility if not implemented carefully.

4. **tabBarExtraContent with left/right slots** (MEDIUM) — The tab bar supports injecting arbitrary React content on the left and/or right side of the tab row. Ant Design added this because enterprise dashboards commonly place action buttons ("Add", "Refresh", "Export") adjacent to tabs, and without dedicated slots, developers were hacking these in with absolute positioning, creating alignment and overflow issues.

## Notable Props
- `type="editable-card"`: Enables add/close buttons on tabs, turning a navigation component into a document management interface -- uniquely suited for multi-document or IDE-like applications.
- `tabPosition`: Accepts "top", "right", "bottom", "left" for full directional flexibility, with automatic keyboard arrow key adaptation.
- `centered`: Boolean to horizontally center the tab bar, useful when a small number of tabs looks unbalanced left-aligned in a wide container.
- `tabBarExtraContent`: Accepts a ReactNode or `{left, right}` object for injecting content alongside tabs -- solving the common "buttons next to tabs" layout challenge.
- `destroyInactiveTabPane`: When true, unmounts inactive panels to free memory -- critical for applications with many heavy tab panels.
- `addIcon`: Customizable add-tab icon for editable-card mode, allowing teams to match their icon system.

## A11y Highlights
- **Keyboard**: Arrow keys navigate between tabs (direction adapts to `tabPosition`). Tab key exits into panel. Enter/Space activate in manual mode. Scroll buttons appear for overflow and are keyboard-accessible.
- **Screen reader**: Tab labels announced with selected state. Panel associated via `aria-labelledby`. Editable-card mode announces add/close actions. Extra content is part of the tab bar landmark.
- **ARIA**: Standard `role="tablist"`, `role="tab"`, `role="tabpanel"`. The close button on editable cards uses `aria-label` to distinguish "close Tab Name" for each tab. Overflow scroll controls are labeled for screen reader users.

## Strengths & Gaps
- **Best at**: Serving as a universal tab component that can handle everything from simple content switching to full multi-document management with dynamic creation, closure, and custom rendering -- no other system matches this breadth.
- **Missing**: No built-in badge/count support on tab labels (must be composed manually), no collapse-to-dropdown overflow (uses scroll arrows only), and the sheer number of props creates a steep learning curve for teams that only need basic tabs.
