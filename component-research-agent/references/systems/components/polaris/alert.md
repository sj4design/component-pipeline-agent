---
system: Shopify Polaris
component: Banner
url: https://polaris.shopify.com/components/feedback-indicators/banner
last_verified: 2026-03-28
---

# Banner

## Approach

Shopify Polaris calls its inline persistent notification component a "Banner" — a naming choice that reflects its use case: communicating important changes or persistent conditions to merchants within the context of their store management workflow. Banners occupy a specific position in Polaris's messaging hierarchy, sitting between field-level inline validation errors (which appear next to form inputs) and global toast notifications (which are ephemeral overlays). The Banner is the middle tier: persistent, contextual, placed at page or section level, and requiring explicit acknowledgment or action before it disappears.

The Toast vs. Banner distinction in Polaris is explicit and rules-based. Toast notifications are for transient success confirmations — "your changes were saved," "email sent" — that auto-dismiss and require no further action. Banners are for conditions that persist: an unresolved problem, a required action, a warning about the current state of the merchant's store. The Polaris documentation includes a specific rule: success messages "should default to toasts," meaning a Banner with `tone="success"` is appropriate only for persistent success conditions (e.g., a trial period that has been activated and remains active), not for transient confirmations. This nuance prevents the common mistake of using persistent success banners for one-time actions.

Polaris is unique in explicitly designing Banners for two different spatial contexts: full-page/section placement (where visual density can be higher) and constrained contexts like cards and modals (where visual density must be reduced). The same Banner component adjusts its visual weight based on its container, preventing the jarring experience of a full-weight alert inside a compact card.

## Key Decisions

1. **Four tones with differentiated ARIA roles** (HIGH) — Polaris uses `info`, `success`, `warning`, and `critical` as its four tone levels. Critically, these tones map to different ARIA roles: `critical` and `warning` use `role="alert"` (assertive, interrupting), while `info` and `success` use `role="status"` (polite, queued). This differential treatment mirrors Carbon's approach and is the correct accessibility strategy — not every notification is equally urgent, and forcing all of them to assertively interrupt the screen reader creates announcement fatigue. The visual signal (color + icon) corresponds directly to the cognitive urgency, and the ARIA role matches that urgency.

2. **Dismissibility enforced for non-critical tones** (HIGH) — Polaris has an opinionated rule: non-critical banners (info, success, warning) should always include an `onDismiss` handler, making them dismissible. Critical banners may be non-dismissible because the critical condition requires resolution, not dismissal. This is the inverse of what many designers assume — you might expect only critical alerts to need a dismiss button, but Polaris reasons that non-critical banners should always give merchants control over their information density, while critical ones should stay visible until the problem is actually fixed. This rule prevents the anti-pattern of persistent informational banners that merchants can never clear from their screens.

3. **One primary action maximum** (HIGH) — Banners support one primary action and one secondary action. The single primary action constraint is philosophically important: a notification is a signal, not a decision point. If a situation requires choosing between multiple responses, it warrants a modal dialog, not a banner. Limiting the primary action to one keeps the banner focused on its purpose: draw attention and provide one clear resolution path. The secondary action is typically a "learn more" or "dismiss and remember" option, not a competing primary choice.

4. **Context-adaptive visual density** (MEDIUM) — The same Banner component is intentionally designed to reduce its visual footprint when placed inside constrained containers (cards, modals, sidebars). This means the icon can be hidden (`hideIcon` prop), padding is reduced, and the layout adapts. Most systems define banner behavior for full-page use and leave card/modal placement as an afterthought. Polaris explicitly designing for both contexts reflects Shopify's product reality: admin workflows frequently embed status messages inside panel-like containers, not just at the top of full pages.

5. **`stopAnnouncements` prop for live region control** (MEDIUM) — Polaris provides an explicit escape hatch to disable ARIA live region updates for specific banners. This is useful in scenarios where a banner's content updates frequently (e.g., a live sync status) and would create announcement noise. Most systems do not offer this control, leaving developers to work around it with custom code. This prop reflects Polaris's pragmatic approach: provide the right default, but give developers a documented way to override it when the default causes problems.

## Notable Props

- `tone`: `'success' | 'info' | 'warning' | 'critical'` — Controls color, icon, and (critically) the ARIA role assigned to the container. This is not just a visual prop; it has direct accessibility implications.
- `onDismiss`: Making this required (or at least strongly expected) for non-critical tones is the key design rule. Its absence from a critical banner is intentional; its absence from an info/success/warning banner is a defect.
- `action` / `secondaryAction`: The one-primary-action constraint is enforced through the API shape. The `action` prop takes a single action object, not an array.
- `hideIcon`: Used in space-constrained contexts. The icon is part of the meaning-redundancy strategy (color + icon + text), so hiding it requires ensuring the text alone is sufficient.
- `stopAnnouncements`: Disables live region updates. Use only when the banner updates frequently enough to create announcement noise.

## A11y Highlights

- **Keyboard**: Banner containers have `tabindex="0"` and a visible focus indicator, allowing programmatic focus to be moved to the banner on render when needed. The dismiss button (when present) is in the Tab order. Action buttons are standard focusable elements.
- **Screen reader**: Critical and warning tones use `role="alert"` (assertive announcement — interrupts current screen reader output). Info and success tones use `role="status"` (polite announcement — queued until user is idle). All banners announce content updates via `aria-live` unless `stopAnnouncements` is set. This is one of the most complete ARIA implementations across all six systems.
- **ARIA**: `role="alert"` for critical/warning; `role="status"` for info/success. `aria-describedby` links the banner's purpose to its title or content. Icon meaning is conveyed redundantly through text to avoid color-only communication.

## Strengths & Gaps

- **Best at**: The explicit, rules-based guidance on when to use Banner vs. Toast vs. Badge, the tone-differentiated ARIA live region strategy (alert vs. status), and the enforced dismissibility rule for non-critical tones.
- **Missing**: No built-in banner stacking or prioritization strategy when multiple banners appear simultaneously, and the `tone="success"` vs. Toast guidance creates a gray zone that can confuse teams building multi-page workflows.
