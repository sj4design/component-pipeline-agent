---
system: Evergreen (Segment/Twilio)
component: Alert / InlineAlert
url: https://evergreen.segment.com/components/alert
last_verified: 2026-03-29
confidence: high
---

# Alert

## Approach
Evergreen provides two alert components that serve distinct roles in a B2B analytics dashboard: `Alert` for page-level feedback messages (e.g., an integration sync error displayed at the top of a sources list), and `InlineAlert` for contextual messages embedded within forms or panels (e.g., a validation warning inside a destination configuration form). This two-tier approach reflects Segment's product reality — dashboards present both global system status and localized field-level feedback simultaneously, and blending them into a single component would force awkward size/placement compromises. Both components share the same four intent types (info, success, warning, danger) and Evergreen's minimal aesthetic, but differ in visual weight and typical placement.

## Key Decisions
1. **Two-component split: Alert vs. InlineAlert** (HIGH) — Page-level alerts need strong visual prominence and typically appear above content; inline alerts need to fit within form layouts without overwhelming adjacent fields. Separate components prevent a single component from accumulating too many placement-context props.
2. **`intent` prop over `type`** (MEDIUM) — Using "intent" as the prop name aligns with Evergreen's semantic vocabulary (also used in Button, Badge), creating a consistent mental model across the system.
3. **`hasIcon` toggle** (MEDIUM) — Allows teams to suppress the status icon when the alert appears in dense information environments where the icon adds clutter rather than signal.

## Notable Props
- `intent`: `"none" | "success" | "warning" | "danger"` — semantic color and icon
- `title`: optional bold heading
- `hasIcon`: boolean, defaults to true
- `isRemoveable`: renders a dismiss button on Alert (page-level)
- `children`: body content (rich React nodes accepted)

## A11y Highlights
- **Keyboard**: Dismiss button (when present) is keyboard-accessible; Tab/Enter activates it.
- **Screen reader**: Alert uses `role="alert"` for danger/warning intents to trigger assertive live regions; info/success use `role="status"` for polite announcements.
- **ARIA**: `aria-live` behavior derived from role; dismiss button has a descriptive `aria-label`.

## Strengths & Gaps
- **Best at**: B2B dashboard page-level and inline feedback with consistent intent vocabulary across the Evergreen system; clean minimal aesthetic suits data-heavy UIs.
- **Missing**: No auto-dismiss timer; no stacking/toast manager for multiple alerts; no action button slot within the alert body.
