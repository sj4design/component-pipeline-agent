---
system: Nord Design System (Nordhealth)
component: Notification (maps to Alert)
url: https://nordhealth.design/components/notification/
last_verified: 2026-03-29
confidence: high
---

# Alert (Nord: Notification)

## Approach
Nord implements the alert pattern through its `<nord-notification>` Web Component, deliberately named "Notification" to reflect the clinical communication context of medical software. In healthcare environments, these messages carry significant weight — they may communicate prescription warnings, critical lab value alerts, or patient safety notices — so the component is designed for high-visibility, unambiguous communication. Nord provides four semantic variants (success, warning, error, highlight) that map directly to clinical signal conventions: green for confirmed/safe, yellow for caution, red for critical/dangerous, and blue/highlight for informational context. The component renders inline within page content rather than as a transient toast, ensuring critical clinical warnings are not missed by auto-dismissal. Dismiss behavior is optional, acknowledging that some medical warnings must remain visible until explicitly acknowledged by the clinician.

## Key Decisions
1. **Inline persistence over auto-dismiss** (HIGH) — Clinical contexts require that critical alerts (drug interactions, abnormal lab values) remain visible until the user takes action. Auto-dismissing a prescription warning could cause a patient safety incident.
2. **Four semantic variants matching clinical color conventions** (HIGH) — Red/warning/error/success align with established clinical color coding used in vital sign monitors, lab systems, and EHR interfaces, reducing cognitive load for healthcare professionals trained to interpret these signals.
3. **Named "Notification" not "Alert"** (MEDIUM) — The naming choice reflects that these are system communications rather than browser-level `alert()` dialogs, keeping terminology consistent with healthcare software conventions where "notification" is the standard label for in-app clinical messages.
4. **Optional dismiss action** (MEDIUM) — Not all clinical notifications should be dismissible. A drug allergy warning on a patient record, for example, should persist. The component supports both dismissible and persistent modes to serve both informational and mandatory-acknowledgment scenarios.

## Notable Props
- `variant`: Controls semantic color — `"success"` | `"warning"` | `"error"` | `"highlight"` (default: `"highlight"`)
- `dismissible`: Boolean attribute; when present, renders a close button allowing the user to dismiss the notification
- `header`: Slot or attribute for the notification headline text (e.g., "Drug Interaction Detected")
- Default slot: Body content of the notification, supporting rich text and inline links

## A11y Highlights
- **Keyboard**: Dismiss button is fully keyboard accessible; focus is managed predictably when notification is dismissed
- **Screen reader**: Component uses `role="alert"` for error/warning variants, triggering immediate announcement by screen readers — critical for clinical users relying on assistive technology in busy ward environments
- **ARIA**: `aria-live="polite"` used for informational variants; `aria-live="assertive"` used for error/warning variants to interrupt screen reader flow when patient safety information appears

## Strengths & Gaps
- **Best at**: Persistent, high-visibility clinical alerts with strong semantic color mapping; suits mandatory-acknowledgment warnings in EHR workflows; excellent accessibility for assistive technology users in clinical settings
- **Missing**: No built-in support for multi-action notifications (e.g., "View Details" + "Dismiss" CTAs in a structured layout); no animation/transition API for smooth appearance in dynamic clinical dashboards; no icon slot customization beyond variant-default icons
