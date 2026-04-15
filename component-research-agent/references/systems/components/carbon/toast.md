---
system: IBM Carbon Design System
component: Notification (Toast / Inline / Actionable)
url: https://carbondesignsystem.com/components/notification/usage/
last_verified: 2026-03-28
---

# Notification

## Approach
Carbon takes a unique approach by splitting notifications into three distinct components -- ToastNotification, InlineNotification, and ActionableNotification -- each purpose-built for different interaction contexts. The philosophy is that interactivity fundamentally changes a notification's accessibility requirements, so it should be a separate component rather than a prop toggle. In v11, Carbon deliberately removed action support from Toast and Inline variants and introduced ActionableNotification with its own focus management and ARIA pattern. This separation ensures that non-interactive notifications never accidentally trap focus, while actionable ones always do.

## Key Decisions
1. **Three separate components by interactivity** (HIGH) — Toast and Inline are purely informational (no interactive elements, no focus). ActionableNotification is a distinct component that traps focus and manages ARIA specifically for interactive content. This was driven by the insight that mixing interactive and non-interactive patterns in one component led to inconsistent accessibility outcomes in v10.
2. **ActionableNotification traps focus** (HIGH) — When triggered, it grabs focus and traps it between the action button and close button until the user responds. This ensures keyboard and screen reader users cannot miss a notification that requires their input, unlike toast notifications that intentionally stay out of the focus order.
3. **Context-driven button styles** (MEDIUM) — Actionable toasts use tertiary buttons; actionable inline notifications use ghost buttons. This visual differentiation signals the notification's spatial context (overlay vs. in-page) and maintains visual hierarchy appropriate to each placement.
4. **Four semantic types across all variants** (MEDIUM) — Error, warning, success, and info are available on all notification components, providing consistent semantic vocabulary regardless of which notification pattern is used.

## Notable Props
- `kind`: `error | warning | success | info` -- consistent semantic types across all three components
- `role`: Toast/Inline use `status` (polite); Actionable uses `alertdialog` with focus trap
- `lowContrast`: Boolean toggle for low-contrast variant that works better on darker page backgrounds

## A11y Highlights
- **Keyboard**: ActionableNotification traps Tab between action and close; Toast/Inline receive no focus at all
- **Screen reader**: Toast/Inline use `role="status"` (polite); ActionableNotification uses `role="alertdialog"` which interrupts
- **ARIA**: Clear separation -- non-interactive notifications never disrupt assistive technology flow; actionable ones deliberately do

## Strengths & Gaps
- **Best at**: Cleanly separating interactive from non-interactive notification patterns at the component level, resulting in correct accessibility behavior by default rather than requiring developers to configure it.
- **Missing**: No built-in queuing or stacking system for multiple simultaneous notifications; no auto-dismiss timing controls (relies on consumer implementation); toast positioning is fixed to top-right with no configuration.
