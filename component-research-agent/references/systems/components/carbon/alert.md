---
system: IBM Carbon
component: Inline Notification / Actionable Notification
url: https://carbondesignsystem.com/components/notification/usage/
last_verified: 2026-03-28
---

# Inline Notification (and Actionable Notification)

## Approach

Carbon is the most architecturally explicit of all Tier 1 systems when it comes to separating persistent inline notifications from temporary toast notifications. Carbon ships both as distinct, named, officially specified components — not as usage variants of a single component, but as genuinely separate components with different APIs, behaviors, and ARIA strategies. The documentation includes explicit decision criteria for choosing one over the other, making it the most opinionated system on this question.

The core Toast vs. Inline distinction in Carbon is: **Toast is for system-generated messages that do not correspond to a specific section of the UI, auto-dismiss after five seconds, and slide in as overlays from the top-right corner.** Inline Notification is for messages that occur within the task flow, correspond to a specific content area, and persist until the user dismisses them. If a notification relates to something specific on the page — a form, a section, an operation the user just triggered — it belongs as an Inline Notification. If it is a background system event (e.g., "new data available", "sync completed"), it belongs as a Toast. This is the clearest explicit decision tree of any Tier 1 system.

Carbon further distinguishes between basic Inline Notification (read-only, dismissible) and Actionable Notification (with a ghost button action). This two-tier inline system reflects IBM enterprise product reality: sometimes you just need to inform (basic inline), and sometimes you need to give the user a direct path to resolve the issue (actionable inline). The action is intentionally constrained to one ghost button, keeping the notification focused.

## Key Decisions

1. **Explicit Toast vs. Inline decision criteria in official docs** (HIGH) — Carbon is the only Tier 1 system that publishes explicit, rule-based guidance for when to use Inline vs. Toast Notification. The criteria: if the message corresponds to a specific UI element or task flow, use Inline. If it is a system-generated message with no specific UI anchor, use Toast. This prevents the most common anti-pattern — using toasts for errors — because errors almost always correspond to a specific action the user took, meaning they qualify as Inline by definition. This guidance alone is the most practically useful notification design decision documented across all six systems.

2. **Actionable vs. Basic Inline as separate variants** (HIGH) — Carbon splits inline notifications into basic (informational, optional dismiss only) and actionable (with a single ghost button action adjacent to the message content). The action button in actionable notifications is constrained to one action intentionally: notifications are not dialogs. One action keeps the notification focused on a single resolution path rather than presenting a mini-decision surface inside the notification. The action typically navigates the user to a flow where they can resolve the issue rather than resolving it in-place.

3. **Two visual contrast styles: high-contrast and low-contrast** (MEDIUM) — Carbon offers both a high-contrast and a low-contrast visual style for inline notifications. High-contrast (dark background, white text) is more visually disruptive and is used for urgent or critical notifications that need to compete with dense content for attention. Low-contrast (light tinted background) is for supplemental or lower-priority messages. This is unique among Tier 1 systems — most use only one contrast level, relying on color alone (red/yellow/green/blue) to communicate severity. Carbon's approach allows the same `kind="error"` notification to be displayed at different visual intensity levels depending on context.

4. **Four severity kinds: error/warning/success/info** (MEDIUM) — Carbon uses the standard four-kind tetrad (`error`, `warning`, `success`, `info`) that has become the de facto consensus across Tier 1 systems. The `kind` prop controls both the icon and the color treatment. Error and warning notifications use `role="alert"` by default (assertive announcement). Info and success notifications use `aria-live="polite"` (queued announcement). This differential ARIA treatment based on severity is the most nuanced accessibility implementation across all six systems.

5. **Content constraint: two lines maximum** (MEDIUM) — Carbon explicitly limits inline notification content to a maximum of two lines of text. This is an enforced design constraint, not just guidance. The rationale: notifications are signaling mechanisms, not content containers. If you need more than two lines to communicate the issue, the problem belongs in a dialog, a dedicated error page, or an in-context help section. This constraint prevents notification fatigue from verbose alert text and keeps the scanning cost of each notification low.

6. **Dismissibility is optional** (MEDIUM) — The close button on Carbon's inline notification is optional. Some notifications should not be dismissible (e.g., a critical system error that requires resolution before proceeding). Others should be dismissible to give users control over their information environment. The decision of whether to include a close button is left to the implementer based on context — Carbon provides the mechanism without mandating it.

## Notable Props

- `kind`: `'error' | 'warning' | 'success' | 'info'` — Controls icon, color treatment, and ARIA live region behavior. The automatic ARIA differentiation based on kind (assertive for error/warning, polite for success/info) is the standout accessibility decision.
- `lowContrast`: Boolean toggle between the two visual contrast styles. This prop represents a unique design decision not found in other systems.
- `hasFocus` / dismiss handling: The close button uses `aria-label="close"` with `aria-hidden="true"` on the icon. Tab moves focus to the close button; Space/Enter activates it.
- `actionButtonLabel` (Actionable variant): The single allowed action label. Constraint to one action is enforced by the API.
- `subtitle`: Separate from `title`, providing the two-level information hierarchy (heading + detail) consistent across all five systems that have inline alert components.

## A11y Highlights

- **Keyboard**: Close button is reachable via Tab. Space or Enter activates dismiss. For actionable notifications, the action button is also in the Tab order. Focus is not moved to the notification on render; it is announced by the live region without focus interruption.
- **Screen reader**: Error and warning kinds use `role="alert"` (equivalent to `aria-live="assertive"`) — screen readers announce immediately and interrupt current reading. Info and success kinds use `aria-live="polite"` — announcements are queued until the user is idle. This is the most precisely calibrated ARIA live region strategy of all six systems.
- **ARIA**: `role="alert"` for error/warning; `aria-live="polite"` for success/info. Close button icon uses `aria-hidden="true"` with a text label provided separately via `aria-label="close"`.

## Strengths & Gaps

- **Best at**: Explicit Toast vs. Inline decision criteria, severity-differentiated ARIA live region behavior (assertive for critical, polite for non-critical), and the two-contrast-level system for visual urgency tuning.
- **Missing**: No built-in stacking or management strategy for multiple simultaneous inline notifications, and no guidance for inline notifications in mobile-constrained layouts where two-line content limits may need relaxation.
