---
system: Shopify Polaris
component: Toast
url: https://polaris.shopify.com/components/internal-only/toast
last_verified: 2026-03-28
---

# Toast

## Approach
Polaris takes a deliberately conservative stance on toasts: they exist solely for brief, non-critical confirmations of completed actions. The system explicitly discourages using toasts for errors, pushing developers toward the Banner component for anything requiring persistent attention. This reflects Shopify's merchant-first philosophy -- in a commerce context, missing an error notification could mean lost orders or revenue, so errors must use a persistent, in-page pattern. The Toast component defaults to 5000ms but Polaris guidelines recommend 10000ms minimum for accessibility, revealing a tension between the default and the guidance that is worth noting.

## Key Decisions
1. **Errors must use Banner, not Toast** (HIGH) — Polaris explicitly bans error messages from toasts. The rationale is that merchants working in high-stakes commerce environments should never have critical error information auto-dismiss. Banners persist on the page until explicitly dismissed, ensuring errors stay visible until addressed.
2. **Assertive live region** (HIGH) — Unlike most systems that use polite announcements, Polaris toasts use `aria-live="assertive"`, meaning they interrupt current screen reader announcements. This is a strong choice that ensures the confirmation is heard immediately, appropriate for transient content that will disappear.
3. **Action only if duplicated elsewhere** (MEDIUM) — Toast actions are permitted only when the same action is available elsewhere on the page. This ensures that if a user misses the toast, they can still find the action in the persistent UI. The toast action becomes a convenience shortcut, not a sole interaction path.
4. **Default 5000ms with 10000ms recommendation** (MEDIUM) — The prop defaults to 5000ms but accessibility guidelines recommend 10000ms. This gap reflects the reality of embedded app constraints where Polaris must balance merchant experience with Shopify's app bridge architecture.

## Notable Props
- `content`: String message -- no rich content, icons, or custom rendering allowed
- `duration`: Default 5000ms; recommended 10000ms for accessibility compliance
- `error`: Boolean that applies error styling (red) -- exists despite guidance against using toast for errors
- `action`: Optional `{content, onAction}` -- limited to one action with a text label

## A11y Highlights
- **Keyboard**: Close button is focusable; action button receives focus when present
- **Screen reader**: Uses `aria-live="assertive"` -- interrupts current announcements immediately
- **ARIA**: Rendered as live region; assertive politeness chosen because content auto-dismisses

## Strengths & Gaps
- **Best at**: Providing clear, opinionated guidance on when NOT to use toast (errors, complex messages), pushing developers toward more appropriate patterns like Banner for persistent notifications.
- **Missing**: No semantic variants (success/info/warning); no queuing or stacking for multiple toasts; the `error` prop contradicts the design guidance to avoid error toasts; recently deprecated in favor of new patterns, signaling architectural evolution.
