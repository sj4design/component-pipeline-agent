---
system: Orbit (Kiwi.com)
component: Alert
url: https://orbit.kiwi/components/information/alert/
last_verified: 2026-03-29
confidence: high
---

# Alert

## Approach
Orbit's Alert is purpose-built for a travel booking context where urgency and clarity of status directly affect financial decisions. The component ships with four semantic types — info, success, warning, and critical — mapping directly to traveler-facing scenarios such as booking confirmation (success), payment failure (critical), baggage policy changes (warning), and fare information (info). A distinctive `inlineActions` slot allows action buttons (e.g., "View alternatives", "Contact support") to live inside the alert rather than requiring a separate UI layer, reducing cognitive load during stressful booking moments. The component is mobile-first and renders compactly on small viewports, which is essential given Kiwi.com's high share of mobile traffic.

## Key Decisions
1. **Four semantic types** (HIGH) — info/success/warning/critical map directly to the emotional stakes of travel: a missed connection warning needs immediate visual distinction from a routine info message.
2. **`inlineActions` slot** (HIGH) — Embeds CTAs inside the alert so users can act without dismissing it first, reducing friction during time-sensitive booking flows.
3. **Icon-first layout** (MEDIUM) — Each type ships with a contextually appropriate icon (checkmark, warning triangle, etc.) that conveys status before the user reads the copy, critical for scanning at speed.

## Notable Props
- `type`: `"info" | "success" | "warning" | "critical"` — sets color scheme and icon
- `title`: optional bold heading above the message body
- `icon`: override the default type icon
- `inlineActions`: slot for action buttons rendered inside the alert
- `closable`: renders a dismiss button

## A11y Highlights
- **Keyboard**: Dismiss button and inline actions are fully keyboard-accessible via Tab/Enter.
- **Screen reader**: Uses `role="status"` for non-critical types and `role="alert"` for critical, triggering live-region announcements.
- **ARIA**: `aria-live="polite"` for info/success/warning; `aria-live="assertive"` for critical alerts.

## Strengths & Gaps
- **Best at**: Travel-specific urgency hierarchy with inline action support; excellent mobile-first density.
- **Missing**: No built-in auto-dismiss timer; no stacking/toast queue for multiple simultaneous alerts.
