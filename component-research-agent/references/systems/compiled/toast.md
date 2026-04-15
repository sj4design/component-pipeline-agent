---
component: toast
compiled: 2026-03-28
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Toast — All Systems Digest

## Material Design 3
**Approach**: "Snackbar" — lightweight non-blocking feedback at bottom of screen. Single optional action max. Three fixed durations (SHORT/LONG/INDEFINITE). No semantic variants, no stacking/queuing. Bottom-center only.
**Key decisions**:
- Single action max; multiple actions = use dialog or banner instead; tightly scoped role for lightweight acknowledgment
- THREE fixed durations (SHORT=2s/LONG=3.5s/INDEFINITE); eliminates arbitrary timing that could violate a11y floors
- INDEFINITE required when action present; ensures users have time to interact
**Notable API**: `duration` (SHORT|LONG|INDEFINITE enum); `action` (single text button, auto-dismisses on click); `dismissBehavior` (swipe gesture integration)
**A11y**: aria-live="polite" + aria-atomic="true"; does not interrupt current speech; role is implicit live region (not role="alert"); action button focusable.
**Best at**: Consistent non-intrusive feedback with spatial predictability across all M3 apps. **Missing**: No semantic variants (success/error/warning), no icons, no stacking/queuing.

## Spectrum (Adobe)
**Approach**: 8-level priority queue ensures high-severity toasts preempt low-priority ones — prevents toast floods during concurrent async operations. Actionable toasts never auto-dismiss. Minimum 5–6s display enforced. Four semantic variants with mandatory icons.
**Key decisions**:
- 8-level priority queue; higher-priority toasts push lower ones to queue instead of stacking (solves Photoshop concurrent-operation flood problem)
- Actionable toasts never auto-dismiss; violating WCAG 2.2 timing + risking missed critical recovery paths
- Auto-dismiss pauses when keyboard focus enters toast; WCAG 2.2 compliance
**Notable API**: `variant` (neutral|informative|positive|negative); `actionLabel`+`onAction` (presence disables auto-dismiss); `timeout` (min 6000ms enforced, scales with word count)
**A11y**: Auto-dismiss pauses on focus; mandatory icon+color dual encoding; aria-live region; 6000ms minimum enforced in API.
**Best at**: Priority queue for concurrent notifications + WCAG-compliant timing enforcement. **Missing**: No multi-line/rich content; queue shows one at a time (delays low-priority messages).

## Carbon (IBM)
**Approach**: Three components by interactivity — ToastNotification (hover/focus, no interaction), InlineNotification (in-page banner), ActionableNotification (focus-trapping, click/Enter). Non-interactive notifications never touch focus order. Interactive ones use role="alertdialog".
**Key decisions**:
- Three components by interactivity; mixing interactive + non-interactive in one component caused inconsistent a11y in v10
- ActionableNotification traps focus between action + close; keyboard/SR users cannot miss required input
- role="status" for Toast/Inline (polite); role="alertdialog" for Actionable (interrupting) — semantically correct for each
**Notable API**: `kind` (error|warning|success|info); `role` (status vs. alertdialog, chosen per component); `lowContrast` (boolean for darker backgrounds)
**A11y**: Cleanest ARIA separation — non-interactive never disrupts AT flow; actionable deliberately interrupts; correct role per interaction model.
**Best at**: Cleanly separating interactive from non-interactive notifications at component level — correct a11y by default. **Missing**: No queuing/stacking system; no auto-dismiss timing controls; fixed top-right position.

## Polaris (Shopify)
**Approach**: Errors must use Banner (not Toast) — commerce context means missed error = lost orders/revenue. Assertive live region (interrupts SR immediately). Toast action only permitted if duplicated elsewhere on page (toast is convenience shortcut, not sole path).
**Key decisions**:
- Errors banned from Toast; Banner persists until dismissed — critical for high-stakes commerce errors
- aria-live="assertive" (interrupts); transient content that will disappear needs immediate announcement
- Toast action must exist elsewhere on page; prevents situations where missing the toast loses a critical action
**Notable API**: `content` (string only, no rich content); `duration` (default 5000ms, recommended 10000ms for a11y — documented tension); `error` (boolean, contradicts no-error-toast guidance); `action`
**A11y**: aria-live="assertive"; close/action buttons focusable; 10000ms recommended but not enforced.
**Best at**: Opinionated guidance on when NOT to use toast — pushes errors to Banner. **Missing**: No semantic variants; no queuing; `error` prop contradicts design guidance; recently deprecated.

## Atlassian
**Approach**: Called "Flag" — individual Flag + FlagGroup (stacking/animation) + FlagsProvider (app-level state). AutoDismissFlag is a separate component (not a prop) with fixed 8s timeout. Five appearances including unique "discovery" for feature education.
**Key decisions**:
- AutoDismissFlag as separate component; dismissal behavior is explicit in code, prevents accidental auto-dismiss of important messages
- FlagGroup manages stacking and animations; ensures consistent behavior across Jira/Confluence/Bitbucket
- "discovery" appearance unique to Atlassian; notification system doubles as feature education channel for product-led growth
**Notable API**: `appearance` (info|success|warning|error|discovery); `title`+`description` (structured, unlike single-message toasts); `actions` (array, allows multiple actions per flag)
**A11y**: role="alert" for error/warning; role="status" for info/success; FlagGroup manages focus order for stacked flags; auto-dismiss pauses on hover/focus.
**Best at**: Multi-notification architecture (FlagGroup+FlagsProvider) + unique discovery variant for onboarding. **Missing**: Fixed 8s auto-dismiss with no customization; no priority queue; always top-right.

## Ant Design
**Approach**: Two components — `message` (minimalist, top-center, single-line, imperative) and `notification` (rich card with title + description + icon, 6 placement positions, stacking). Both historically use static methods; now recommends hooks via `App.useApp()` for Context access.
**Key decisions**:
- `message` vs. `notification` by weight; brief confirmation vs. detailed alert have different spatial/informational needs
- Static methods (`message.success()`) work from anywhere without component tree access; cost = no React Context for theming/i18n
- Stacked notifications collapse into compact stack on hover for notification fatigue management in data-heavy dashboards
**Notable API**: `type` (success|error|warning|info|loading — `loading` unique for async operations); `duration` (ms, 0=persistent); `placement` (6 positions for notification); `config()` global defaults
**A11y**: Weaker than Spectrum/Carbon; aria-live present but limited ARIA defaults; no enforced minimum durations; static methods bypass accessibility tree.
**Best at**: Developer ergonomics (imperative API from anywhere) + unique `loading` type + 6-position placement. **Missing**: Weak built-in a11y; static methods can't consume Context; no priority queue.
