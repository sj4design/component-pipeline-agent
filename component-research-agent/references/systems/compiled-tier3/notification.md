---
component: Notification
tier: 3
last_verified: 2026-03-31
---

# Notification — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Toast (no Notification) | Radix provides Toast with `Toast.Provider` + `Toast.Viewport`; F8 hotkey for keyboard focus; no Notification Center or notification feed primitive. Teams build notification panels using Dialog/Popover + custom lists. | high |
| Chakra UI | Toaster (no Notification) | `createToaster()` factory for ephemeral notifications; `toaster.update(id)` for loading-to-outcome transitions; no notification center or persistent notification list component. | high |
| GOV.UK | Notification Banner | Persistent `Notification Banner` (blue for important, green for success); deliberately no auto-dismissing notifications; `role="alert"` for important messages. No notification center — gov services use explicit page-level banners for all system communications. | high |
| Base Web (Uber) | Notification + Toaster | `Notification` component for persistent styled messages (info/positive/warning/negative) + `Toaster` for ephemeral overlay queue. Notification is a styled container, not a notification center — used for inline status messages in ride/delivery dashboards. | high |
| Fluent 2 (Microsoft) | Toast / MessageBar / NotificationQueue | `Toast` + `Toaster` with `useToastController` for ephemeral overlay; `MessageBar` for inline persistent; Microsoft 365 uses a platform-level Activity Feed / notification center (not in public Fluent 2 component library). `politeness` prop for explicit aria-live control. | high |
| Gestalt (Pinterest) | Callout + Toast | `Callout` for persistent inline messages (info/error/warning/success/recommendation); `Toast` for ephemeral confirmations with image thumbnails; no notification center — Pinterest's activity feed is a product feature, not a DS component. | medium |
| Mantine | Notifications (@mantine/notifications) | `notifications.show()`/`update()`/`hide()`/`clean()`; `update()` for loading-to-success transitions; per-notification `autoClose`; `limit` for queue cap; `Notifications` container component with configurable position. Separate `@mantine/notifications` package. | high |
| Orbit (Kiwi.com) | Alert / CallOutBanner (no notification) | No notification overlay or notification center; travel booking uses inline Alert for critical status (booking confirmation, payment errors); ephemeral notifications considered inadequate for high-stakes travel transactions. | medium |
| Evergreen (Segment) | Toaster | `toaster.success()`/`.warning()`/`.danger()`/`.notify()`; minimal programmatic API; no notification center or feed component; analytics dashboards rely on inline alerts for persistent status. | medium |
| Nord (Nordhealth) | Notification (banner-style) | `nord-notification` web component for persistent inline notifications (info/success/warning/danger); dismissible; no auto-dismiss — clinical context requires all notifications to persist until acknowledged by healthcare professionals. | high |

## Key Decision Patterns

The most significant architectural pattern in the Tier 3 notification set is the universal absence of a Notification Center component. Every system that provides notification functionality stops at individual notification instances (ephemeral overlays via Toaster or persistent inline messages via Notification/Banner/Callout). The notification center — a collected feed of historical notifications with read/unread state, grouping, filtering, and bulk actions — is treated as a product-level feature in every case. Microsoft 365's Activity Feed, Pinterest's activity feed, and GitHub's notification inbox all exist as platform features built on top of their respective design system primitives, not as reusable DS components. This strongly suggests that the correct DS scope for "notification" is the individual notification item and its delivery mechanism (queue, positioning, dismissal), not the aggregated notification center.

Base Web's `Notification` component is the most explicit implementation of a styled notification container in Tier 3. Unlike systems that only provide Toast (ephemeral overlay), Base Web offers `Notification` as a persistent styled message with semantic variants (info/positive/warning/negative) and Overrides for deep customization. Combined with `Toaster` for the ephemeral queue, Base Web provides both halves of the notification delivery pattern — persistent inline and transient overlay — as separate components with clear semantic boundaries. This two-component pattern (persistent + ephemeral) is the practical architecture for DS notification support.

Mantine's `@mantine/notifications` package represents the most complete notification queue management in Tier 3. The `limit` prop caps the number of visible notifications (excess notifications are queued and shown as earlier ones are dismissed); `update()` enables loading-to-outcome state transitions on a single notification instance; `clean()` clears the entire queue programmatically. These queue management primitives — limit, update-in-place, bulk clear — are the building blocks that make a notification system production-ready for applications that generate high notification volume (dashboards, real-time monitoring, collaborative tools).

Nord's clinical context drives the strongest anti-auto-dismiss stance in Tier 3. The `nord-notification` web component is always persistent (no auto-dismiss option) because in healthcare applications, a dismissed notification about a medication interaction or abnormal lab value that the clinician did not read could have patient safety consequences. This domain-specific constraint aligns with GOV.UK's general rejection of auto-dismissing notifications and Orbit's rejection of ephemeral notifications for travel booking confirmations. The pattern: the higher the stakes of a missed notification, the more the system must ensure persistence and explicit acknowledgment.

GOV.UK's `Notification Banner` is the only Tier 3 component designed specifically for government/public service notification patterns. The component has two fixed modes: blue ("important" — for information users need before proceeding) and green ("success" — for confirming a completed action). There are no warning/error variants because GOV.UK uses Error Summary and Error Message components for form validation, and critical system errors render as full-page error pages (not inline notifications). This strict scoping — important information and success confirmation only — prevents notification overuse in government services where every notification competes with critical task information.

## A11y Consensus

- Notification containers (both persistent and ephemeral) must be `aria-live` regions — `role="status"` (polite) for informational and success messages; `role="alert"` (assertive) for errors and critical messages. Fluent 2's explicit `politeness` prop is the most architecturally correct implementation, allowing consumers to override the default severity-to-urgency mapping.
- Persistent notifications (Nord, GOV.UK, Base Web Notification) that remain on page must not rely solely on color to communicate severity — icons alongside color provide redundant visual encoding that survives high-contrast mode and color vision deficiencies.
- Notification queue systems (Mantine `limit`, Ant `maxCount`) must announce newly visible notifications when a queued notification replaces a dismissed one — the replacement must trigger a new aria-live announcement, not silently swap content.
- Keyboard access to notification actions (dismiss, mark as read, follow link) must work without requiring mouse interaction — Radix's F8 hotkey for focusing the toast viewport is the strongest pattern for making ephemeral notifications keyboard-reachable before they auto-dismiss.
- Auto-dismiss timing must respect WCAG 2.2.1 (minimum 5 seconds or mechanism to pause/extend) — GOV.UK and Nord reject auto-dismiss entirely; Mantine and Chakra provide per-notification `autoClose` configuration; systems that default to under 5 seconds (common: 4000ms) violate WCAG without consumer override.

## Recommended Use

Reference Base Web for the clearest two-component notification architecture (persistent `Notification` + ephemeral `Toaster`). Use Mantine for the most complete queue management primitives (`limit`, `update()`, `clean()`). Reference Fluent 2 for explicit `politeness` prop on aria-live regions. Use GOV.UK and Nord as evidence for anti-auto-dismiss patterns in high-stakes domains. Reference Radix for keyboard accessibility (F8 viewport hotkey). For notification center/feed patterns, no Tier 3 system provides a reusable component — compose from primitives (Popover/Dialog + List + Badge + ScrollArea).
