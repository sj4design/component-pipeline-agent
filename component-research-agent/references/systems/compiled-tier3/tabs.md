---
component: Tabs
tier: 3
last_verified: 2026-03-29
---

# Tabs — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Tabs | Headless: Tabs.Root / Tabs.List / Tabs.Trigger / Tabs.Content; `activationMode` ("automatic"/"manual") for async tabs; `orientation` (horizontal/vertical); `forceMount` per panel; full WAI-ARIA compliance without configuration. | high |
| Chakra UI | Tabs | Five visual variants (line/enclosed/enclosed-colored/soft-rounded/solid-rounded); `isLazy` + `lazyBehavior` for deferred panel rendering; `isFitted` for equal-width tabs; `colorScheme` integration. | high |
| GOV.UK | Tabs | Progressive enhancement: renders as anchor links without JS, ARIA tablist widget with JS; URL hash navigation; guidance recommends max 4 tabs; content always in DOM. | high |
| Base Web | Tabs / TabsMotion | Separate motion variant; `renderAll` for SEO; Overrides for TabHighlight (animated indicator) and TabBorder as independently overridable elements. | medium |
| Fluent 2 | TabList / Tab | Content panel management is fully consumer-owned (TabList is navigation only); `appearance` ("subtle"/"transparent") for surface adaptation; `size="small"` for toolbar tabs; vertical orientation. | high |
| Gestalt | Tabs | `href`-based navigation support for multi-page tab navigation; dual in-page/URL mode; `bgColor` for surface adaptation; Pinterest navigation patterns. | medium |
| Mantine | Tabs | String value API (not index-based); `inverted` prop for bottom-tabs pattern; `loop` keyboard navigation; four variants (default/outline/pills/unstyled); `activateTabWithKeyboard` for manual mode. | high |
| Orbit | Not available — mobile patterns | No tabs component; mobile booking flows use bottom navigation and card-based flow; ButtonGroup with toggle buttons for segmented switching. | medium |
| Evergreen | Tab / Tablist | Polymorphic `is` prop for rendering as router links; `isSelected` state; content panel management is consumer-owned; minimal API. | medium |
| Nord | Tab Group (nord-tab-group) | Web component for healthcare patient record sections (vitals, medications, diagnoses, notes); slot-based API; full WAI-ARIA in shadow DOM; conservative animation for clinical context. | low |

## Key Decision Patterns

The most consequential tabs API decision in the T3 set is `activationMode`. Radix exposes this as an explicit prop: `"automatic"` (arrow key focus immediately activates the tab and shows its content) versus `"manual"` (arrow key moves focus without activating; Enter or Space activates). Mantine provides the equivalent via `activateTabWithKeyboard`. The difference matters in exactly one scenario but matters enormously: when switching a tab triggers an expensive operation like an API call, network request, or heavy component mount. In automatic mode, a user pressing arrow keys to navigate through tab options triggers a data load for each tab they focus, even briefly. Manual mode separates navigation intent from activation intent, preventing these spurious loads. All other behavior is identical. Systems that don't expose this option force teams to implement their own keyboard interception to prevent the automatic-activation problem.

Fluent 2's decision to make TabList a navigation-only component (with no built-in content panel management) is the clearest architectural statement in the T3 set about the scope of a tabs component. In Microsoft's products, "tabs" often control which of several full-page views is visible — the Teams left sidebar tabs switch entire app contexts, not just a `<div>` below the tab bar. Building a tab component that includes content panels would be wrong for these use cases, because there is no contained "panel" — the "panel" is the entire application canvas. By making content management the consumer's responsibility, Fluent 2's TabList works for both the conventional panel-below-tabs pattern and the application-navigation pattern without requiring configuration. The trade-off is verbosity for simple cases.

GOV.UK's progressive enhancement approach makes tabs unique in the T3 set as the only component that is genuinely functional without JavaScript. The mechanism — rendering tab items as `<a href="#section-id">` links pointing to in-page sections, with JavaScript adding ARIA roles and hiding inactive sections — means a user with JavaScript disabled sees all tab content as a scrollable page with anchor links, while a user with JavaScript enabled sees the conventional tabs widget. This also gives deep-linking to specific tabs for free: the URL hash updates when a tab is activated, so a shared URL opens the correct tab. Most other T3 systems require custom URL state management to achieve the same result.

Chakra's `isLazy` + `lazyBehavior` combination is the most complete solution to the performance problem of tab content rendering. `isLazy` delays rendering of a tab's content until that tab is first visited — preventing data fetching and component mounting for never-visited tabs. `lazyBehavior="keepMounted"` keeps the panel in the DOM once rendered, preserving scroll position and component state when switching between tabs. `lazyBehavior="unmount"` destroys and remounts panels on each visit, which is appropriate for panels that need to re-fetch fresh data. This two-prop system gives teams fine control over the rendering lifecycle of each tab's content.

## A11y Consensus

- The WAI-ARIA Tabs pattern requires `role="tablist"` on the container, `role="tab"` on each trigger with `aria-selected`, and `role="tabpanel"` on each content panel with `aria-labelledby` pointing to its tab — this is required for screen readers to navigate the component as a tabs widget.
- The keyboard contract for tabs: Left/Right arrows (horizontal) or Up/Down arrows (vertical) navigate between tabs; Home jumps to first; End jumps to last; Tab moves focus from the tab list to the active panel. Enter and Space activate tabs in manual activation mode.
- Inactive tab panels must be hidden from assistive technologies — either `display:none`, `hidden` attribute, or `aria-hidden="true"`. Inactive panels left visible in the DOM but visually hidden cause screen readers to announce content from non-active tabs.
- When tabs are navigation links (href-based, as in Gestalt and GOV.UK's no-JS fallback), `role="tab"` on links is appropriate; `aria-current="page"` should be used instead of `aria-selected` for the active navigation tab.
- Tab triggers that contain only icons without visible labels must have `aria-label` or `aria-labelledby` — icon-only tabs are a common pattern in dense toolbars, and unlabeled icon tabs are inaccessible to screen readers.

## Recommended Use

Reference T3 tabs approaches when deciding on activation mode, lazy content loading, progressive enhancement, and content panel ownership. Radix is the reference for `activationMode="manual"` for async data-loading tabs; Chakra is the reference for `isLazy` + `lazyBehavior` for deferred panel rendering performance; GOV.UK is the reference for progressive enhancement with URL hash tab navigation that works without JavaScript; Fluent 2 is the reference for navigation-only TabList for application-context switching patterns; Mantine is the reference for the `inverted` prop for bottom-tabs and `loop` keyboard navigation.
