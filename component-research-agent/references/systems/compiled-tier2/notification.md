---
component: Notification
tier: 2
last_verified: 2026-03-31
---

# Notification — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Toaster + Notification (custom) | Paste provides Toaster for ephemeral overlay notifications but no dedicated Notification Center or notification feed component; teams compose notification lists using Paste primitives (List, Badge, Popover). | medium |
| Salesforce Lightning | Notification / Utility Bar | Lightning Experience has a platform-level notification bell + notification panel in the Utility Bar; `lightning-notification` for system notifications; `force:showToast` for ephemeral; notification settings API for preference management. | high |
| GitHub Primer | Flash + custom Notification Center | Primer's Flash handles inline notification variants (info/success/warning/danger); GitHub's notification center (bell icon + inbox panel with read/unread, filters, grouping by repo) is a product feature, not an open Primer component. | high |
| shadcn/ui | Sonner (Toaster) + custom | shadcn/ui provides Sonner for ephemeral toasts; no notification center or notification list component; teams build notification feeds using Card, ScrollArea, and Badge primitives. | medium |
| Playbook | Message (kit) | Message kit for user feedback notifications; no notification center or persistent notification panel component. | low |
| REI Cedar | CdrBanner (no notification) | Cedar provides CdrBanner for inline alerts; no notification center, notification overlay, or system-initiated notification component. | low |
| Wise Design | Notification (custom) | Payment status notifications and transfer updates use custom notification patterns; no public Notification component in the DS. | low |
| Dell DS | Notification / Alert | Enterprise notification patterns for system alerts and status updates; notification panel for IT management dashboards. | low |

## Key Decision Patterns

**Platform vs. component library:** The most significant pattern across Tier 2 is that notification centers are platform features, not design system components. Salesforce Lightning and GitHub are the clearest examples — both have sophisticated notification systems (Lightning's Utility Bar notifications with API-level settings management; GitHub's notification inbox with filters, grouping, and read/unread tracking) that exist as product-level features, not as reusable components in their respective design systems. This suggests that a DS should provide notification primitives (individual notification items, badges, grouping patterns) rather than a fully assembled notification center.

**Ephemeral vs. persistent notification split:** Every Tier 2 system that addresses notifications separates ephemeral overlay notifications (toasts/flashes) from persistent notification feeds. Lightning is the most explicit: `force:showToast` for ephemeral feedback vs. the notification bell + panel for persistent system notifications with read/unread state. Paste and shadcn/ui only cover the ephemeral side and leave persistent notification patterns to consumers.

**Notification as composition pattern:** Where Tier 2 systems lack a dedicated Notification component, teams compose notification UIs from existing primitives: List + Card + Badge + Popover (shadcn/ui); List + Badge + Callout (Primer). This composition approach is the practical pattern for DS teams that need notification feeds — provide the building blocks and a documented composition recipe rather than a monolithic Notification Center component.

**Notification preferences and settings:** Salesforce Lightning is the only Tier 2 system with API-level notification preference management (notification types, delivery channels, mute/unmute). This is a critical pattern for enterprise applications where users need control over notification volume and routing — most DS components stop at display and do not address settings.

## A11y Consensus
- New notifications arriving in a feed should use `aria-live="polite"` to announce without interrupting current screen reader activity
- Notification center toggle (bell icon) should announce unread count: `aria-label="Notifications, 3 unread"`
- Read/unread state should be communicated via `aria-label` or visually hidden text, not color alone
- Notification list should use `role="list"` with individual notifications as `role="listitem"`
- Dismiss/mark-as-read actions must be keyboard accessible within each notification item
- Notification panel (popover/drawer) should trap focus when opened and return focus to trigger on close

## Recommended Use
Reference Lightning for the most complete platform-level notification architecture (bell + panel + settings API). Use Primer/GitHub as inspiration for notification inbox patterns (grouping by source, filters, bulk actions). Use shadcn/ui's composition approach (Sonner for toasts + Card/List for feeds) as a pragmatic implementation pattern. For ephemeral notifications, Paste's Toaster with role-based ARIA is the most accessible Tier 2 implementation.
