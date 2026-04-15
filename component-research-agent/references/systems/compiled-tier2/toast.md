---
component: Toast
tier: 2
last_verified: 2026-03-28
---

# Toast — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Toast | aria-live region; ToastContainer for stacking; success/error/warning/neutral | high |
| Salesforce Lightning | Toast | role="status"; page-level and scoped; success/info/warning/error; close button | high |
| GitHub Primer | Flash | role="alert"\|"status"; info/success/warning/danger variants; inline dismissible | high |
| shadcn/ui | Toaster (Sonner) | Sonner library; stacked toasts with expand; promise toast; rich colors | high |
| Playbook | Toast | User feedback notifications; dual React/Rails | medium |
| REI Cedar | CdrBanner | Vue alert/banner; info/success/warning/error; aria-live; WCAG 2.1 AA | medium |
| Wise Design | Toast | Payment confirmation and error feedback | low |
| Dell Design System | Toast / Notification | Enterprise action feedback | low |

## Key Decision Patterns

**role="alert" vs. role="status":** role="alert" triggers immediate screen reader announcement (assertive). role="status" is polite (waits for user to finish current task). Errors should use role="alert"; success confirmations should use role="status". Lightning and Primer make this explicit. Paste uses aria-live="polite" for non-critical toasts.

**Sonner (shadcn/ui):** shadcn/ui's recommended Toaster is now Sonner — a third-party library providing stacked/expanded toast UX, promise-based toasts (pending → success/error), and rich visual styling. More opinionated than a simple aria-live region but widely used.

**Positioning:** Toasts universally appear at corners (top-right most common). Lightning supports page-level (top of page) vs. scoped (within components). Cedar's Banner is inline, not floating.

**Auto-dismiss timing:** Most systems use ~4-5 second auto-dismiss for success toasts. Error toasts often remain until dismissed. Toasts should not auto-dismiss if they contain interactive elements.

## A11y Consensus
- Non-critical feedback: aria-live="polite" or role="status"
- Critical errors: aria-live="assertive" or role="alert"
- Do not auto-dismiss toasts with interactive content (links, buttons)
- Provide close button for persistent toasts
- Keyboard access to dismiss: close button must be focusable
- Avoid conveying critical information solely via transient toast

## Recommended Use
Use Sonner (shadcn/ui) for rich React toast UX with promise states. Use Paste Toast for Twilio Console patterns. Use role="alert" only for errors requiring immediate attention — use role="status" for success confirmations.
