---
system: Atlassian Design System
component: Tabs
url: https://atlassian.design/components/tabs/
last_verified: 2026-03-28
---

# Tabs

## Approach
Atlassian takes a deliberately minimal approach to tabs, offering a single visual style (line tabs with a bottom indicator) and focusing on simplicity and composability. The philosophy is that tabs should organize content by grouping related information on the same page, not serve as a primary navigation mechanism. Atlassian keeps the API surface small because their products (Jira, Confluence, Bitbucket) use tabs for in-page content switching -- settings panels, issue detail views, project boards -- where a lightweight, predictable component is more valuable than a feature-rich one. The system exposes composable sub-components (Tabs, TabList, Tab, TabPanel) following the WAI-ARIA tabs pattern directly, which allows teams to wrap tabs with other ADS components like Tooltip. This composability-over-configuration philosophy means Atlassian does not build in badges, actions, or overflow -- teams compose those from other ADS primitives when needed.

## Key Decisions
1. **Single visual style -- line tabs only** (MEDIUM) — Atlassian offers only one tab variant: a horizontal line with a colored bottom-border indicator on the active tab. There are no contained, card, or pill variants. This constraint exists because Atlassian's products use a consistent visual language where tabs always appear the same way, reducing cognitive load across Jira, Confluence, and Trello. The downside is that teams needing a contained or card style must build it themselves.

2. **Composable sub-component architecture** (HIGH) — The component is split into `Tabs`, `TabList`, `Tab`, and `TabPanel`, matching the WAI-ARIA specification directly. This is intentional: Atlassian wants developers to think in terms of the accessibility spec rather than a proprietary API. It also enables wrapping individual `Tab` elements with `Tooltip` or other components without breaking the ARIA relationship, which is important in Jira where tabs often need tooltips explaining what truncated labels mean.

3. **Panel mounting control via shouldUnmountTabPanelOnChange** (MEDIUM) — Atlassian exposes a prop to control whether inactive tab panels remain in the DOM or are unmounted. This matters for performance in Jira and Confluence where tab panels can contain heavy content (rich text editors, file lists, comment threads). Keeping panels mounted preserves scroll position and form state; unmounting them frees memory. Atlassian surfaces this as a developer choice rather than defaulting to one behavior because both patterns are common in their product suite.

## Notable Props
- `shouldUnmountTabPanelOnChange`: Controls whether inactive panels are destroyed or kept in the DOM -- a performance-vs-state-preservation tradeoff that Atlassian wisely leaves to the developer.
- `id`: Explicit ID for the tabs container, used to coordinate ARIA relationships when multiple tab instances exist on the same page (common in Jira issue detail views).
- `selected` / `onChange`: Controlled mode props that allow parent components to manage tab state externally, important for URL-synced tab navigation in Confluence pages.

## A11y Highlights
- **Keyboard**: Tabbing into the tablist places focus on the currently active tab. Arrow keys move between tabs with automatic activation (focus = select). Tab key exits the tablist into the panel content. Focus wraps from last tab to first.
- **Screen reader**: Active tab is announced with "selected" state. Panel content is associated via `aria-labelledby`. Tab count is communicated through the tablist role (e.g., "tab 2 of 5").
- **ARIA**: Strict adherence to WAI-ARIA tabs pattern: `role="tablist"`, `role="tab"` with `aria-selected`, `role="tabpanel"` with `aria-labelledby`. The composable architecture means the ARIA tree is always correct even when tabs are wrapped with tooltips or other decorators.

## Strengths & Gaps
- **Best at**: Providing a clean, specification-compliant tabs implementation that composes well with other Atlassian Design System components, especially in complex UIs like Jira where tabs are nested alongside many other interactive elements.
- **Missing**: No overflow handling (scrollable or disclosure), no vertical orientation, no built-in badge or icon support, and no contained/card variant -- teams with more than 5-6 tabs or needing richer tab features must build custom solutions.
