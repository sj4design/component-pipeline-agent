---
system: Gestalt (Pinterest)
component: BannerOverlay + BannerSlim (Alert equivalents)
url: https://gestalt.pinterest.systems/web/banneroverlay | https://gestalt.pinterest.systems/web/bannerslim
last_verified: 2026-03-29
confidence: high
---

# Alert (BannerOverlay + BannerSlim)

## Approach
Gestalt does not have a component named "Alert." Instead, it provides two distinct components that together cover the alert pattern: BannerOverlay and BannerSlim. BannerOverlay is a floating overlay notification that appears above content — typically anchored to the bottom of the screen — used for non-blocking, time-sensitive messages such as confirmation toasts or action nudges. BannerSlim is an inline contextual banner that occupies full width within a layout section, used for persistent informational, warning, or error states tied to a specific area of the page. This split reflects Pinterest's mobile-first philosophy: on small screens, overlay notifications are less disruptive than inline banners that displace content, and distinct component purposes keep usage intent explicit. Both components follow Pinterest's "actionable, then dismissible" interaction model where users are always given a clear path forward.

## Key Decisions
1. **Two-component split over a single Alert** (HIGH) — Separating overlay (floating, temporary) from slim (inline, persistent) prevents misuse and keeps intent unambiguous. A single generic "Alert" component would require complex prop combinations to achieve the same clarity.
2. **BannerOverlay anchored to viewport bottom** (HIGH) — Mirrors mobile toast conventions; avoids covering primary visual content (Pins) at the top of the screen, which would interrupt the discovery experience.
3. **BannerSlim is layout-integrated** (HIGH) — Because Pinterest pages are densely visual, inline banners are explicitly scoped to sections rather than floating globally, preventing visual noise across the feed.
4. **Severity semantics via `type` prop** (MEDIUM) — Both components expose `type` (info, warning, error, success) tied to Pinterest's semantic color tokens, ensuring consistent meaning across the product surface area.
5. **Primary and secondary actions supported** (MEDIUM) — Reflects Pinterest's task-oriented nudge model (e.g., "Confirm email," "Upgrade plan") where alerts often carry a CTA rather than being purely informational.

## Notable Props
- `message`: The main text content of the banner (required)
- `type`: Semantic variant — `"info"` | `"warning"` | `"error"` | `"success"`
- `primaryAction`: Object defining a primary CTA button with `label`, `onClick`, and `href`
- `secondaryAction`: Optional secondary action link or button
- `onDismiss`: Callback for dismiss/close; if omitted, banner is non-dismissible
- `thumbnail`: BannerOverlay-specific — supports an image or icon thumbnail for richer context
- `helperLink`: BannerSlim-specific — inline link appended to the message text

## A11y Highlights
- **Keyboard**: BannerOverlay is focusable; dismiss button and action buttons are reachable via Tab. BannerSlim follows document tab order within its layout context.
- **Screen reader**: BannerOverlay uses `role="alertdialog"` when modal-like; BannerSlim uses `role="alert"` with `aria-live="polite"` for non-critical and `aria-live="assertive"` for errors.
- **ARIA**: `aria-label` on close button; action buttons include descriptive labels; color is never the sole conveyor of meaning (icons accompany type variants).

## Strengths & Gaps
- **Best at**: Clear separation of overlay vs. inline notification intent; excellent mobile-first placement for BannerOverlay; strong action affordance for task-driven alerts.
- **Missing**: No auto-dismiss timer built into BannerOverlay (must be managed by consuming code); no stacking/queue management for multiple simultaneous overlays; BannerSlim lacks a collapsible/expandable mode for verbose messages.
