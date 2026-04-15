---
component: Toast
tier: 3
last_verified: 2026-03-29
---

# Toast — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Toast | `Toast.Provider` + `Toast.Viewport` + individual toasts; F8 hotkey focuses viewport for keyboard users; `Toast.Action > altText` required for screen reader action context; `swipeDirection` for gesture dismiss. | high |
| Chakra UI | Toaster | `createToaster()` factory + programmatic `toaster.create()`; `toaster.update(id)` for loading→success state transitions; `type` ("success"/"error"/"warning"/"info"/"loading"); `placement` and `overlap` configuration. | high |
| GOV.UK | Notification Banner (no toast) | No auto-dismissing toasts; persistent Notification Banner (blue for important, green for success); `role="alert"` for important messages; success banner for post-form submission confirmation. | high |
| Base Web | Toast | Semantic method names: `toaster.positive()`/`.negative()`/`.warning()`/`.info()`; `autoHideDuration: 0` for persistent error toasts; `closeable` prop; Overrides for customization. | medium |
| Fluent 2 | Toast / Toaster | `useToastController` hook with `dispatchToast()`/`dismissToast()`; explicit `politeness` prop ("assertive"/"polite"/"off"); `intent` maps to Fluent semantic color system; `timeout: -1` for persistent. | high |
| Gestalt | Toast | Image thumbnail for visual confirmation of pin-specific actions; `helperLink` for action text; consumer-facing, auto-dismiss; no programmatic API; no intent/type system. | medium |
| Mantine | Notifications (@mantine/notifications) | `notifications.show()`/`update()`/`hide()`/`clean()`; `update()` for loading→success/error transitions; per-notification `autoClose` duration; `limit` prop for queue cap; separate package. | high |
| Orbit | Not available — Alert/page-level used | No toast; travel booking uses inline Alert and page-level success/error for high-stakes transactions; floating transient notifications inadequate for booking confirmation. | medium |
| Evergreen | Toaster | `toaster.success()`/`.warning()`/`.danger()`/`.notify()`; `description` for secondary text; `duration`; `hasCloseButton`; minimal API; analytics dashboard patterns. | medium |
| Nord | Not available or via Alert | No confirmed dedicated toast; critical clinical information must not auto-dismiss; persistent Alert preferred for medication alerts and lab value notifications; low confidence. | low |

## Key Decision Patterns

The most important toast API pattern in the T3 set is the programmatic notification API — and all systems that provide toasts implement it. `toaster.create()` (Chakra), `dispatchToast()` (Fluent 2), `notifications.show()` (Mantine), `toaster.positive()` (Base Web), and `toaster.success()` (Evergreen) all serve the same purpose: triggering a notification from event handlers, async callbacks, and service layers that live outside the React component tree. Gestalt is the only system that requires rendering toast JSX, which prevents triggering from non-component code. The programmatic API is not a convenience — it is the correct architecture for notifications, which are inherently decoupled from the UI that triggered them.

Mantine's `notifications.update()` and Chakra's `toaster.update()` implement the loading-state-to-outcome toast pattern that most other systems leave to consumers. The pattern — show a loading notification with a spinner, then update it to success or error when the async operation completes — is the correct UX for long-running operations where users need feedback that work is in progress and then what the result was. Without `update()`, teams implement this as two separate notifications (show loading, hide loading, show result), which creates a flash of two toasts and disrupts screen reader announcement continuity. Both Mantine and Chakra provide `update()` natively, making this a first-class pattern.

Fluent 2's explicit `politeness` prop ("assertive" / "polite" / "off") is the most architecturally correct accessibility API in the T3 toast set. The `aria-live` region politeness level determines how urgently a notification is announced to screen readers: `assertive` interrupts whatever is currently being read, which is appropriate for errors and critical alerts; `polite` waits for a natural pause, appropriate for success and informational messages. Most T3 systems internally manage this mapping (`role="alert"` for errors, `role="status"` for others) without exposing it as a consumer prop. Fluent 2 exposing `politeness` directly allows teams to override the default mapping when a specific notification warrants different urgency — for example, a financial transaction success that a trader needs to hear immediately despite being informational.

GOV.UK's deliberate rejection of transient toasts is the most consequential absence in the T3 set. The core argument — auto-dismissing notifications may be missed by users who need more time to read, users with cognitive disabilities, or users who are not looking at the screen when the notification appears — applies directly to any service where the notification contains actionable information (a reference number, a deadline, a required next step). GOV.UK's Notification Banner stays visible on the page until the user navigates away, and crucially provides the information at the top of the page where users expect to read it, not as a floating overlay in a corner of the screen. Orbit makes a related domain-specific argument: in travel booking, the stakes of a missed notification (payment confirmed, booking failed) are high enough that page-level feedback is required.

## A11y Consensus

- Toast containers must be `aria-live` regions — `role="status"` (maps to `aria-live="polite"`) for informational and success notifications; `role="alert"` (maps to `aria-live="assertive"`) for errors and critical notifications. Using the wrong live region politeness for an error causes the announcement to be delayed until the user finishes reading other content.
- Auto-dismissing toasts must not dismiss in under 5 seconds for short messages (WCAG 2.2.1 requires at least 5 seconds or a way to pause/extend) — most T3 systems default to 4000-5000ms; error toasts should either persist or have a significantly longer timeout.
- Interactive toast actions (undo, view, retry) must be keyboard-accessible — Radix's F8 hotkey for focusing the viewport is the strongest implementation; other systems require that the toast container be focusable via Tab when actions are present.
- `Toast.Action > altText` (Radix's pattern) is the only T3 system that requires accessible context for toast actions — "Undo" is ambiguous without context; "Undo [pin save]" or "View [booking]" gives screen reader users the full context without visual reference.
- Toast content must be readable in high-contrast and forced-color modes — background-color-only differentiation between toast types (success = green background) fails in Windows High Contrast mode; icons alongside color coding provide redundant visual information.

## Recommended Use

Reference T3 toast approaches when deciding on programmatic API design, loading-state transitions, live region politeness, and keyboard accessibility. Radix is the reference for keyboard viewport focus hotkey and required `altText` for action context; Mantine and Chakra are the references for `update()` for loading→success/error state transitions; Fluent 2 is the reference for explicit `politeness` prop for aria-live region urgency control; Evergreen is the reference for the minimal programmatic API with semantic method names; GOV.UK is the reference for the research-backed argument against auto-dismissing toasts in favor of persistent notifications.
