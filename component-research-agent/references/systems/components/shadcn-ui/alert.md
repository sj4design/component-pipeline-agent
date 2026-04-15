---
system: shadcn/ui
component: Alert
url: https://ui.shadcn.com/docs/components/alert
last_verified: 2026-03-28
confidence: high
---

# Alert

## Approach
shadcn/ui's Alert is a simple inline notification component with AlertTitle and AlertDescription sub-components. Unlike some systems, it's a purely presentational component — no ARIA live region by default (developers must add role="alert" when needed for dynamic alerts). The component provides "default" and "destructive" variants via CVA.

## Key Decisions
1. **Presentational by default** (HIGH) — Alert does not add role="alert" or aria-live automatically, placing responsibility on developers to add these when the alert renders dynamically. This is deliberate — static informational alerts don't need live regions.
2. **AlertTitle + AlertDescription structure** (HIGH) — Compound components for title (renders as h5) and description provide semantic structure without prescribing the full layout.
3. **Icon support via children** (MEDIUM) — Icons are passed as children of the Alert (typically Lucide icons), positioned via CSS, giving full control over icon choice.

## Notable Props
- `variant`: "default" | "destructive"
- `AlertTitle`: Heading sub-component
- `AlertDescription`: Content sub-component
- Developers add `role="alert"` when dynamic

## A11y Highlights
- **Keyboard**: Non-interactive; dismiss requires developer implementation
- **Screen reader**: No automatic announcement — developers must add role="alert" for dynamic alerts
- **ARIA**: Developer responsibility; AlertTitle renders as h5 for semantic structure

## Strengths & Gaps
- **Best at**: Flexible inline status display; clean destructive/default variants; full icon flexibility
- **Missing**: No automatic live region role; no built-in dismiss; developers must know to add role="alert" for screen reader announcements
