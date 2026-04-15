---
component: notification
compiled: 2026-03-31
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Notification — All Systems Digest

## Material Design 3
**Approach**: M3 has no dedicated Notification component. Snackbar covers ephemeral toasts; there is no notification center, notification list, or system-initiated message pattern. Teams needing notification feeds or persistent notification panels must compose custom solutions using M3 surfaces, Cards, and Lists. The closest guidance is Snackbar (transient) and Dialogs (blocking) — neither addresses the asynchronous notification paradigm.
**Key decisions**:
- Absent: M3 addresses only ephemeral feedback (Snackbar) and blocking alerts (Dialog); asynchronous system-initiated notifications are entirely out of scope
- No notification grouping, stacking, or center pattern documented — teams use custom List + Badge compositions
- Badge component exists for unread count indicators on icons, but has no connection to a notification delivery system
**Notable API**: No Notification component. `Snackbar` for ephemeral feedback; `Badge` for unread count overlay on navigation icons; custom Card/List for notification feeds.
**A11y**: No guidance for notification centers or feeds. Teams must implement aria-live regions for new notification arrivals and manage focus for notification panels independently.
**Best at**: Nothing for system-initiated notifications — M3 is a gap here.
**Missing**: Notification center, notification list/feed, notification grouping, priority queue, persistent notification panel, read/unread states.

## Spectrum (Adobe)
**Approach**: Spectrum separates concerns cleanly: Toast handles ephemeral transient notifications; InlineAlert handles persistent section-level status. For system-initiated notifications (async events, background task completions), Spectrum does not provide a dedicated Notification or Notification Center component. Adobe products like Creative Cloud use custom notification panels built on Spectrum primitives (Popover + List + Badge). The Toast priority queue (8 levels) is the closest pattern to notification management.
**Key decisions**:
- Toast priority queue (8 levels) is the architectural foundation for managing concurrent system-initiated messages, but only for ephemeral overlay notifications
- No notification center/feed component — Adobe products build custom notification panels using Popover + Menu/List composition
- Clear boundary: Toast = transient overlay, InlineAlert = persistent inline — neither covers the notification list/history pattern
**Notable API**: `Toast` with 8-level priority queue for ephemeral notifications; `Badge` for unread indicators; no Notification-specific component.
**A11y**: Toast uses aria-live with enforced 6000ms minimum; no guidance for notification center panels or feed accessibility (landmark, heading structure, read/unread state announcement).
**Best at**: Priority queue architecture for managing concurrent ephemeral notifications — strongest queuing model in Tier 1.
**Missing**: Notification center, notification list/feed, notification grouping, read/unread state management, notification history.

## Carbon (IBM)
**Approach**: Carbon provides three notification components by interactivity level: ToastNotification (non-interactive, ephemeral), InlineNotification (persistent, inline), and ActionableNotification (interactive, focus-trapping). These cover individual notification instances. Carbon does not provide a Notification Center or notification feed component, but documents explicit guidance on when to use each type. The `kind` prop (error/warning/success/info) with correct ARIA roles per type is the core pattern.
**Key decisions**:
- Three components by interactivity (Toast/Inline/Actionable) — the clearest separation of notification interaction models in Tier 1
- Each component gets the correct ARIA role automatically: Toast/Inline use role="status"; Actionable uses role="alertdialog"
- No notification center or aggregation pattern — each notification is an independent event, not part of a collected feed
**Notable API**: `kind` (error|warning|success|info); `role` (status vs. alertdialog per component type); `lowContrast` (boolean); `onClose` callback; `subtitle` for secondary content.
**A11y**: Cleanest ARIA separation — non-interactive Toast never enters focus order; Actionable traps focus between action and close button; correct role per interaction model by default.
**Best at**: Interaction-model-based component separation — correct a11y by default for each notification type without consumer configuration.
**Missing**: Notification center/feed, notification grouping/stacking, read/unread states, notification history, priority queue.

## Polaris (Shopify)
**Approach**: Polaris does not have a dedicated Notification component. Merchant-facing notifications are handled through Banner (persistent inline, for errors and critical status), Toast (ephemeral confirmation), and the Shopify admin notification system (not part of Polaris component library). Polaris enforces that errors must use Banner (not Toast) because missed errors in commerce = lost orders/revenue. The notification center in Shopify admin is a platform feature, not a Polaris component.
**Key decisions**:
- Errors banned from Toast; Banner persists until dismissed — commerce-critical safeguard against missed error notifications
- No Notification component in Polaris — Shopify admin's notification center is a platform concern, not a design system component
- Toast is convenience-only: any action in a Toast must also be available elsewhere on the page (Toast is never the sole path to an action)
**Notable API**: `Banner` for persistent notifications (tone: critical/warning/success/info); `Toast` for ephemeral confirmations only; no Notification-specific API.
**A11y**: Banner: role="alert" for critical/warning, role="status" for info/success. Toast: aria-live="assertive". No notification center a11y guidance.
**Best at**: Opinionated severity routing — explicit rules about which notification types go where, preventing misuse of transient patterns for critical messages.
**Missing**: Notification center, notification feed/list, notification grouping, read/unread states, notification history, system-initiated async notification pattern.

## Atlassian
**Approach**: Atlassian has the richest notification architecture in Tier 1. "Flag" (+ FlagGroup + FlagsProvider) handles transient overlay notifications with stacking and animation. Separately, Atlassian products (Jira, Confluence) use a Notification Center (bell icon + panel) — but this is a platform feature, not an open Atlassian DS component. Flag supports five appearances including "discovery" for feature education. AutoDismissFlag is a separate component (not a prop) with fixed 8s timeout.
**Key decisions**:
- Flag + FlagGroup + FlagsProvider = multi-notification architecture with stacking, animation, and app-level state management — strongest overlay notification system in Tier 1
- AutoDismissFlag as separate component from Flag; explicit separation of transient vs. persistent overlay notifications
- "discovery" appearance for feature announcements — notification system doubles as onboarding/education channel
**Notable API**: `appearance` (info|success|warning|error|discovery); `title` + `description` (structured content); `actions` (array, multiple actions per notification); `FlagGroup` manages stacking/animation; `FlagsProvider` for app-level state.
**A11y**: role="alert" for error/warning; role="status" for info/success/discovery; FlagGroup manages focus order for stacked notifications; auto-dismiss pauses on hover/focus.
**Best at**: Multi-notification architecture (FlagGroup + FlagsProvider + stacking) and discovery variant for onboarding — the most complete overlay notification system in Tier 1.
**Missing**: Open-source Notification Center component (exists in Jira/Confluence but not in the public DS); notification feed/list; read/unread state management.

## Ant Design
**Approach**: Ant Design provides two notification-level components: `message` (minimalist, top-center, single-line, imperative API) for lightweight confirmations, and `notification` (rich card with title + description + icon + actions, 6 placement positions, stacking) for system-initiated messages. `notification` is the closest to a true Notification component in Tier 1 — it supports rich content, custom icons, action buttons, and programmatic control. Both use imperative APIs (`notification.open()`, `notification.success()`). Hooks API via `App.useApp()` recommended for React Context access.
**Key decisions**:
- `message` vs. `notification` by information weight: brief confirmation (message) vs. detailed system notification (notification) — explicit two-tier pattern
- `notification` supports 6 placement positions (topLeft/topRight/bottomLeft/bottomRight/top/bottom) — most flexible positioning in Tier 1
- Stacked notifications with configurable `maxCount` for queue management; `notification.destroy()` to clear all programmatically
**Notable API**: `notification.open({ message, description, icon, btn, duration, placement, key, onClick, onClose })`; semantic methods: `.success()`, `.error()`, `.warning()`, `.info()`; `duration` (0 = persistent); `placement` (6 positions); `maxCount` for queue cap; `key` for update-in-place; unique `loading` type on `message`.
**A11y**: Weaker than Spectrum/Carbon; aria-live present but limited ARIA defaults; no enforced minimum durations; imperative API can bypass accessibility tree when called outside React lifecycle.
**Best at**: Richest notification API in Tier 1 — 6-position placement, structured content (title + description + icon + actions), update-in-place via `key`, `maxCount` queue management, and imperative API from anywhere.
**Missing**: Notification center/feed component; read/unread state management; notification grouping by category; priority queue (has maxCount but no priority ordering).
