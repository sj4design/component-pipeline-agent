---
system: Evergreen (Segment)
component: Toaster
url: https://evergreen.segment.com/components/toaster
last_verified: 2026-03-28
confidence: medium
---

# Toaster

## Approach
Evergreen's Toaster provides a programmatic notification API for Segment's analytics dashboard. The `toaster` object provides `success()`, `warning()`, `danger()`, `notify()` methods for imperative notification triggering — the standard pattern for notifications triggered by async operations. Toasts are positioned at the bottom of the viewport and stack when multiple are present.

## Key Decisions
1. **Simple API surface** (HIGH) — `toaster.success("Message")` is as simple as it gets. Evergreen prioritizes developer ergonomics over configurability for the common case.
2. **duration** (MEDIUM) — Per-notification duration control. Default durations per type (danger persists longer) match dashboard expectations.
3. **hasCloseButton** (MEDIUM) — Optional close button per notification for user-dismissible toasts.

## Notable Props
- `toaster.success(title, settings?)` / `.warning()` / `.danger()` / `.notify()`
- `settings.description`: secondary text
- `settings.duration`: auto-dismiss time
- `settings.hasCloseButton`: boolean
- `settings.id`: for updating/removing specific toasts

## A11y Highlights
- **Keyboard**: Close button is keyboard accessible
- **Screen reader**: role="alert" for danger; role="status" for others; aria-live region
- **ARIA**: Live region announcements managed by Toaster

## Strengths & Gaps
- **Best at**: Minimal API; semantic method names; analytics dashboard notifications
- **Missing**: No loading state transition; no action button in toast; bottom-only positioning
