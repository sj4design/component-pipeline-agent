---
system: Radix UI (WorkOS)
component: Alert (no dedicated primitive — Callout via Radix Themes)
url: https://www.radix-ui.com/themes/docs/components/callout
last_verified: 2026-03-28
confidence: high
---

# Alert / Callout

## Approach
Radix Themes provides a Callout component for inline alert messages. The Callout uses the full Radix Themes color + variant system and supports an icon slot. For dismissible alerts, the consumer adds a close button. The component is static and inline — not a toast/notification. It maps to the common "alert" or "banner" pattern.

## Key Decisions
1. **Callout (not "Alert")** (MEDIUM) — Named "Callout" rather than "Alert" to distinguish from the browser `alert()` function and the WAI-ARIA alert role. For urgent content, consumers add `role="alert"`.
2. **icon slot** (MEDIUM) — `Callout.Icon` for placing a status icon (info, warning, error icons) to the left of the callout text.

## Notable Props
- `color`: semantic color token
- `variant`: visual treatment
- `Callout.Icon`: icon slot
- `Callout.Text`: text content

## A11y Highlights
- **Keyboard**: Non-interactive by default; close button if added is keyboard accessible
- **Screen reader**: Consumer adds `role="alert"` for urgent content; for non-urgent, reads as static content
- **ARIA**: role="alert" triggers immediate screen reader announcement; use only for genuinely urgent messages

## Strengths & Gaps
- **Best at**: Color + variant token integration; icon slot; Radix Themes consistency
- **Missing**: No built-in dismissible behavior; no built-in icon for each variant
