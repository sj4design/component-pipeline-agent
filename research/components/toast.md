---
component: toast
date: 2026-04-17
mode: --max
systems: 24
scope: all
---

# Toast — Research Synthesis (--max)

## Sistemas sin componente dedicado

| System | Reason | Workaround |
|--------|--------|------------|
| GOV.UK | Auto-dismissing toasts are inaccessible for users needing more time; content on public services may be missed; policy-driven absence | Persistent Notification Banner (`role="alert"`; green for success, blue for important) |
| Orbit (Kiwi.com) | Travel booking stakes too high for floating transient notifications; payment/booking confirmation must be persistent | Inline Alert and page-level success/error notifications |
| Nord (Nordhealth) | Critical clinical information must not auto-dismiss; medication and lab value alerts must persist | Persistent Alert; no confirmed dedicated toast component |

---

## How Systems Solve It

### Material Design 3 — Snackbar (Tier 1)

MD3 calls this component "Snackbar" rather than Toast. It is a lightweight non-blocking feedback pattern at the bottom of the screen, intentionally scoped to the most minimal use case: a single text message with at most one action. Three fixed durations (SHORT=2s, LONG=3.5s, INDEFINITE) eliminate arbitrary developer timing. INDEFINITE is required when an action is present, ensuring users have time to interact. No semantic variants, no stacking—deliberate minimalism for consumer mobile contexts.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Single action max | Multiple actions = use dialog or banner instead; tightly scoped role for lightweight acknowledgment | H | If you need two actions in a notification, reconsider whether a toast is the right component |
| THREE fixed durations (SHORT/LONG/INDEFINITE enum) | Eliminates arbitrary timing that could violate a11y floors; developer cannot set 1500ms by mistake | H | Adopt the enum pattern; do not accept arbitrary millisecond values from developers |
| INDEFINITE required when action present | Users must have time to interact; auto-dismissing an actionable notification violates intent | H | Enforce: if `action` is provided, duration must be INDEFINITE or explicitly long |
| Bottom-center position only | Spatial predictability; MD3 apps all share the same toast origin point | M | Positions other than bottom-center must be justified; consistency has value across an app suite |
| No semantic variants | MD3 consumer apps have less variance in notification type than enterprise tools; plain snackbars cover most feedback | M | If you need semantic variants (success/error), you are outside MD3's opinionated scope |

**Notable Props:** `duration` (SHORT | LONG | INDEFINITE enum) · `action` (single text button, auto-dismisses on click) · `dismissBehavior` (swipe gesture)

**Accessibility:** `aria-live="polite"` + `aria-atomic="true"`. Does not interrupt current speech. Action button is focusable.

---

### Spectrum / Adobe (Tier 1)

Spectrum's toast system solves the notification flood problem specific to Adobe's creative application context: multiple concurrent async operations (render, export, upload, analysis) all triggering notifications simultaneously. An 8-level priority queue ensures high-severity toasts preempt low-priority ones. Actionable toasts never auto-dismiss—this is an API constraint, not a guideline. A minimum 5–6 second display time is enforced. Auto-dismiss pauses when keyboard focus enters the toast area for WCAG 2.2 compliance.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| 8-level priority queue | Concurrent async operations in Photoshop overwhelmed users with simultaneous toasts; priority queue defers low-priority messages | H | Implement a priority queue if your product has concurrent async operations that all produce notifications |
| Actionable toasts never auto-dismiss | WCAG 2.2 timing + no risk of missing critical recovery actions | H | If `onAction` is provided, enforce persistent display; no auto-dismiss |
| 5–6s minimum enforced in API | Developer cannot set under 5000ms even by mistake; WCAG 2.2.1 compliance | H | Enforce minimum display time in API, not just in documentation |
| Auto-dismiss pauses on keyboard focus | WCAG 2.2 compliance; keyboard users have more time to act | H | This is a non-negotiable a11y requirement when actions are present |
| Four semantic variants + mandatory icons | Dual encoding (color + icon) required for WCAG 1.4.1; positive/negative/informative/neutral | H | Always pair color with an icon; never rely on color alone |

**Notable Props:** `variant` (neutral | informative | positive | negative) · `actionLabel` + `onAction` (presence disables auto-dismiss) · `timeout` (min 6000ms enforced, scales with word count)

**Accessibility:** Best in class. Auto-dismiss pauses on focus; mandatory icon+color dual encoding; `aria-live` region; 6000ms minimum enforced in API.

---

### Carbon / IBM (Tier 1)

Carbon solves the interactive/non-interactive ambiguity problem by creating three separate components instead of one. `ToastNotification` is purely informational (hover/focus only, no interaction). `InlineNotification` is an in-page banner. `ActionableNotification` is a focus-trapping interactive alert using `role="alertdialog"`. This separation means the correct ARIA role is determined by the component chosen, not by configuration—accessibility is correct by default without requiring developer knowledge of ARIA roles.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Three components by interactivity | Mixing interactive + non-interactive in one component caused inconsistent a11y in v10; split enforces correct semantics at component level | H | Consider whether to expose interactivity as a prop or as separate component variants |
| `ActionableNotification` traps focus | Keyboard/SR users cannot miss required input; `role="alertdialog"` is semantically correct | H | Any toast requiring user action (confirm, retry, undo) should trap focus |
| `role="status"` for non-interactive, `role="alertdialog"` for actionable | Semantically correct roles per interaction model | H | Map role to interactivity, not to severity |
| `lowContrast` boolean for dark backgrounds | Accessibility on dark UIs requires variant; not a severity indicator | M | Provide contrast variants, not just semantic variants |
| `kind: error | warning | success | info` | Semantic variant system | M | Four semantic variants is the minimum; maps to standard notification taxonomy |

**Notable Props:** `kind` (error | warning | success | info) · `role` (status vs. alertdialog, chosen per component) · `lowContrast: boolean` · `subtitle` + `caption` slots

**Accessibility:** Cleanest ARIA separation in Tier 1. Non-interactive never disrupts AT flow. Actionable deliberately interrupts. Correct role per interaction model.

---

### Polaris / Shopify (Tier 1)

Polaris's most important toast decision is what NOT to use it for: errors must use Banner (not Toast) because in commerce contexts, a missed error notification means a lost order or failed payment. Toasts use `aria-live="assertive"` (interrupts screen reader immediately) because transient content that disappears must be announced urgently. Toast actions must also exist elsewhere on the page—toast is a convenience shortcut, not the sole interaction path.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Errors banned from Toast; Banner persists | Commerce errors (payment failure, inventory issue) are high-stakes; a missed toast means a missed problem | H | Define which severity levels are allowed in toast vs. persistent notification in your design system docs |
| `aria-live="assertive"` | Transient content that disappears must be announced immediately | H | Always use assertive for auto-dismissing content; polite risks missing the window |
| Toast action must exist elsewhere on page | Prevents situations where missing the toast loses a critical action permanently | H | Design principle: toast action is always a shortcut, never the only path |
| 10000ms recommended but not enforced | Documented tension: default 5000ms, but 10000ms recommended for a11y; the gap reveals an API enforcement problem | M | Enforce minimum duration through API, not documentation |

**Notable Props:** `content` (string only, no rich content) · `duration` (ms, default 5000) · `error` (boolean — contradicts no-error-toast guidance) · `action`

**Accessibility:** `aria-live="assertive"`. Close/action buttons focusable. 10000ms recommended but not enforced—a documented inconsistency.

---

### Atlassian (Tier 2)

Atlassian calls the component "Flag" and separates auto-dismiss behavior into a distinct component (`AutoDismissFlag`) rather than a prop. The FlagGroup manages stacking and animations across all Atlassian products (Jira/Confluence/Bitbucket). The unique "discovery" appearance serves feature education—notification channels doubled as product-led onboarding signals.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| `AutoDismissFlag` as separate component | Dismissal behavior is explicit in code, preventing accidental auto-dismiss of important messages | H | Separating persistent vs. auto-dismiss at component level is a valid alternative to a prop |
| FlagGroup manages stacking and animations | Consistent behavior across 4 Atlassian products; application-level state via FlagsProvider | H | An app-level provider pattern (FlagsProvider) is the correct architecture for multi-notification management |
| `actions: []` (array, multiple actions allowed) | Atlassian's Flags can have multiple actions per notification—unlike MD3's one-action limit | M | Multiple actions per notification is appropriate for enterprise; one action is appropriate for consumer/mobile |
| "discovery" appearance | Feature education via notification system (product-led growth) | M | Consider "discovery" or "announcement" as a variant if your system uses notifications for feature onboarding |
| Fixed 8s auto-dismiss on AutoDismissFlag | No customization; eliminates arbitrary developer timing decisions | M | Fixed durations are defensible; let severity and content type drive the choice |

**Notable Props:** `appearance` (info | success | warning | error | discovery) · `title` + `description` (structured) · `actions: []` · AutoDismissFlag fixed 8s timeout

**Accessibility:** `role="alert"` for error/warning; `role="status"` for info/success. FlagGroup manages focus order for stacked flags. Auto-dismiss pauses on hover/focus.

---

### Ant Design (Tier 1)

Ant Design distinguishes two separate components by weight: `message` (minimalist, top-center, single-line, imperative API) and `notification` (rich card with title + description + icon, 6 placement positions, stacking). Both historically use static methods (`message.success()`); current recommendation is hooks via `App.useApp()` for Context access. The unique `loading` type in `message` supports async operation feedback (pending → success/error) without a separate component.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| `message` vs. `notification` by weight | Brief confirmation vs. detailed alert have different spatial/informational needs; one component for both creates design compromise | H | Consider separating lightweight (single-line) from rich (title + description + action) toasts |
| Static methods `message.success()` work from anywhere | Can be called from event handlers, interceptors, service layers without component tree access | H | Static/imperative API is architecturally important for notifications triggered outside React components |
| `type: "loading"` unique in Tier 1 | Shows a spinner while async operation is pending; update to success/error on completion | H | Implement loading-state toast as a first-class feature, not an afterthought |
| 6-position placement for `notification` | `topRight`/`topLeft`/`bottomRight`/`bottomLeft`/`top`/`bottom`; not all positions are equal for all content | M | Define a default position and restrict developer choice to prevent inconsistency |
| Stacked notifications collapse on hover | Notification fatigue management for data-heavy dashboards | M | Collapse/expand stack is a useful pattern for high-frequency notification contexts |

**Notable Props:** `message`: `type` (success | error | warning | info | loading) · `duration` (ms, 0=persistent) · `config()` global defaults. `notification`: `placement` (6 positions) · `title` + `description` + `icon` · `onClose` · `closeIcon`

**Accessibility:** Weaker than Spectrum/Carbon. `aria-live` present but limited defaults. No enforced minimum duration. Static methods bypass accessibility tree when called before React mount.

---

### shadcn/ui — Sonner (Tier 2)

shadcn/ui's recommended toast is Sonner (third-party library). Stacked/expanded toast UX—multiple toasts stack and expand on hover. Promise-based toasts (`toast.promise()`): show pending state, automatically transitions to success or error. Rich visual styling. Programmatic API from anywhere.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Stack and expand on hover | Visual stacking with collapse/expand prevents notification overwhelming while preserving access to all notifications | H | Stack-and-expand is the best pattern for high-frequency notification contexts |
| `toast.promise()` for async operations | First-class pattern for pending → success/error transition; Mantine/Chakra's `update()` solves the same problem | H | Implement promise-based or `update()` pattern for any async operation feedback |

**Notable Props:** `toast.promise()` · `toast.loading()` · `toast.success()` / `.error()` / `.warning()` · `position` · `richColors: boolean`

**Accessibility:** Inherits Radix Toast primitives; `aria-live` regions.

---

### Radix UI (Tier 3)

Radix provides the most keyboard-accessible toast structure: `Toast.Provider` + `Toast.Viewport` + individual Toasts. F8 hotkey focuses the Viewport, allowing keyboard users to access any toast that might otherwise be inaccessible. `Toast.Action` requires an `altText` prop providing context without visual reference ("Undo [pin save]" rather than just "Undo"). `swipeDirection` for gesture dismiss.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| F8 hotkey focuses Toast Viewport | Keyboard users can always access toasts, even auto-dismissing ones, via the hotkey | H | The F8 pattern is the strongest keyboard toast accessibility implementation; adopt it |
| `Toast.Action > altText` required | "Undo" is ambiguous without context; `altText` provides full action context for AT ("Undo move to archive") | H | Require `altText` on all action buttons in toast; enforce via TypeScript if possible |
| `Toast.Viewport` as the container | Explicit viewport placement control; aria-live region is the viewport, not individual toasts | H | Provider/Viewport architecture is the correct React pattern for toast infrastructure |
| `swipeDirection` | Touch dismiss direction matches platform conventions (iOS = right, some Android = down) | M | Expose swipe direction as configuration for platform variants |

**Notable Props:** `Toast.Provider` · `Toast.Viewport` · `Toast.Root` · `Toast.Title` · `Toast.Description` · `Toast.Action altText` · `Toast.Close` · `swipeDirection`

**Accessibility:** Most explicit keyboard toast pattern in any tier. F8 to focus viewport. `altText` required on actions.

---

### Chakra UI (Tier 3)

Chakra's `createToaster()` factory + `toaster.create()` programmatic API. Key differentiator: `toaster.update(id)` enables loading-to-outcome state transitions—show a loading spinner, then update to success or error without two separate toasts. `type: "loading"` maps to spinner display. `placement` and `overlap` configuration for visual stacking.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| `toaster.update(id)` for state transitions | Eliminates loading→success flash of two toasts; continuous user feedback without disruption | H | Loading-state update is a required feature for any product with async operations |
| `createToaster()` factory | Allows multiple toast regions with different configurations (e.g., bottom-right for success, top-center for errors) | M | Factory pattern enables multiple independent toast regions in a complex application |
| `type: "loading"` | First-class spinner type; not just a success/error variant | M | Match Ant Design's approach; `loading` is a legitimate notification state |

**Notable Props:** `createToaster()` · `toaster.create()` · `toaster.update(id)` · `type` (success | error | warning | info | loading) · `placement` · `overlap: boolean`

**Accessibility:** `aria-live` regions. Factory creates a11y-compliant containers.

---

### Fluent 2 / Microsoft (Tier 3)

Fluent 2's `useToastController` hook with `dispatchToast()`/`dismissToast()`. The most architecturally correct accessibility API in T3: an explicit `politeness` prop ("assertive" / "polite" / "off") allows overriding the default role-to-urgency mapping when a specific notification warrants different urgency. `intent` maps to Fluent's semantic color system. `timeout: -1` for persistent toasts.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Explicit `politeness: "assertive" | "polite" | "off"` | Most systems internally map role → aria-live without consumer visibility; Fluent exposes this for cases where the default mapping is wrong | H | Expose `politeness` as a prop for power users; provide sensible defaults per `intent` type |
| `useToastController` hook | Hook-based API is idiomatic modern React; `dispatchToast` from anywhere with Context access | H | Hook pattern is the modern alternative to static methods; provides Context access |
| `timeout: -1` for persistent | Explicit value for persistent (not just `0` or `Infinity`) | L | Use a clear sentinel value for "persistent" rather than `0` (which may mean "default") |

**Notable Props:** `useToastController` · `dispatchToast()` · `dismissToast()` · `intent` · `politeness: "assertive" | "polite" | "off"` · `timeout` (-1 = persistent)

**Accessibility:** Most explicit `aria-live` politeness control in any tier.

---

### Mantine (Tier 3)

Mantine `notifications.show()` / `.update()` / `.hide()` / `.clean()`. The `update()` pattern for loading→success/error is a first-class feature. `limit` prop caps the notification queue. Per-notification `autoClose` duration. Separate `@mantine/notifications` package.

**Design Decisions**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| `notifications.update()` | Loading→success state transition without two separate toasts | H | Match Chakra; this is the correct pattern for async feedback |
| `limit` prop for queue cap | Prevents notification flooding; automatically queues new notifications when at limit | H | Always cap the visible notification count; `limit: 3` is a common default |
| `notifications.clean()` | Programmatically dismiss all notifications; useful for navigation events that make prior notifications irrelevant | M | Expose a `dismissAll()` method on the notification service |

**Notable Props:** `notifications.show()` · `notifications.update()` · `notifications.hide()` · `notifications.clean()` · `autoClose` per notification · `limit: number`

**Accessibility:** `aria-live` regions on the Notifications portal.

---

## Pipeline Hints

### Archetype Recommendation

**Archetype: Provider + programmatic imperative API**

Rationale: Notifications are inherently decoupled from the UI that triggered them—async callbacks, service layers, error interceptors all need to trigger toasts without component tree access. A `ToastProvider` at app root + an imperative `toast.show()` / `toast.update()` / `toast.dismiss()` API is the correct architecture. This is the consensus pattern across Radix, Chakra, Mantine, Fluent 2, Ant Design, and Sonner. The provider establishes the aria-live region; the imperative API allows invocation from anywhere.

---

### Slot Consensus Table

| Slot | Consensus | Notes |
|------|-----------|-------|
| `title` | 8/13 systems | Primary message text; required for `notification`/rich variants |
| `description` | 7/13 systems | Secondary supporting text; not all systems provide this |
| `icon` | 8/13 systems | Semantic icon (success checkmark, error X, warning triangle, info i) |
| `action` | 10/13 systems | Primary action button (undo, view, retry) |
| `closeButton` | 10/13 systems | Dismiss button; required for persistent toasts |
| `badge` / `indicator` | 3/13 systems | Small colored dot or badge for type indication |
| `progressBar` | 2/13 systems | Remaining time indicator (Mantine, some Sonner themes) |

---

### Property Consensus Table

| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| `type` / `variant` / `intent` / `kind` | `"success"` \| `"error"` \| `"warning"` \| `"info"` \| `"neutral"` \| `"loading"` | 13/13 | Semantic notification type |
| `duration` / `timeout` / `autoClose` | `number` (ms) \| `false` \| `0` \| `-1` | 12/13 | Auto-dismiss delay; false/0/-1 = persistent |
| `action` / `actionLabel` | `string` or `ReactNode` | 10/13 | Primary action in the toast |
| `onAction` | `() => void` | 8/13 | Action callback |
| `title` | `string` \| `ReactNode` | 9/13 | Primary heading text |
| `description` | `string` \| `ReactNode` | 7/13 | Secondary body text |
| `icon` | `ReactNode` | 8/13 | Custom icon override |
| `closable` / `dismissible` | `boolean` | 9/13 | Show close button |
| `onClose` | `() => void` | 9/13 | Close callback |
| `position` / `placement` | `"top"` \| `"topRight"` \| `"topLeft"` \| `"bottom"` \| `"bottomRight"` \| `"bottomLeft"` | 8/13 | Toast position on screen |
| `id` | `string` | 7/13 | Unique ID for programmatic update/dismiss |
| `politeness` | `"assertive"` \| `"polite"` \| `"off"` | 2/13 | Explicit aria-live politeness (Fluent 2) |
| `altText` (action) | `string` | 1/13 | Radix; required context for AT action announcements |
| `limit` | `number` | 3/13 | Max visible notifications |
| `swipeDirection` | `"right"` \| `"left"` \| `"up"` \| `"down"` | 2/13 | Gesture dismiss direction |

---

### Boolean Properties Table

| Property | Default | Systems |
|----------|---------|---------|
| `closable` / `dismissible` | `true` | Most systems |
| `richColors` | `false` | Sonner |
| `expand` (stack expand on hover) | `false` | Sonner |
| `lowContrast` | `false` | Carbon |
| `showIcon` | `true` | Spectrum, Atlassian |
| `overlap` | `false` | Chakra |

---

### State Coverage Table

| State | Systems | Notes |
|-------|---------|-------|
| `success` | 13/13 | |
| `error` / `danger` | 13/13 | |
| `warning` | 12/13 | GOV.UK Notification Banner has "important" instead |
| `info` / `informative` | 12/13 | |
| `neutral` | 5/13 | Spectrum, Twilio Paste, Radix |
| `loading` | 4/13 | Ant Design `message`, Chakra, Mantine, Sonner |
| `discovery` | 1/13 | Atlassian only |
| `persistent` (no auto-dismiss) | 10/13 | Triggered by `duration: false/0/-1` or by `onAction` presence |
| `auto-dismissing` | 12/13 | Default behavior |
| `stacked` | 5/13 | Multiple toasts visible simultaneously |
| `queued` | 3/13 | Spectrum, Mantine, Sonner |
| `paused` (auto-dismiss pause on focus/hover) | 5/13 | Spectrum, Atlassian, Radix, Mantine, Sonner |

---

### Exclusion Patterns

- **Do not use Toast for errors in high-stakes transactional contexts.** Orders, payments, reservations—errors must use persistent notifications (Polaris: Banner, Orbit: page-level Alert).
- **Do not auto-dismiss a toast that contains the only path to a critical action.** If the user cannot undo/retry/confirm via another UI element, the toast must not auto-dismiss. The action must exist elsewhere.
- **Do not use Toast for complex multi-step confirmation.** Use a Modal or Dialog instead.
- **Do not use Toast for persistent system status.** System health, connection status, and ongoing processes belong in a StatusBar or Banner, not a Toast.
- **Do not use Toast for form validation feedback.** Inline field errors + a summary banner at the top of the form are the correct patterns; toasts are invisible when users are focused on the form.
- **Do not use `role="alert"` for success confirmations.** `role="alert"` interrupts screen readers immediately; success messages should use `role="status"` (polite). Using assertive for success messages is noisy and disrespectful of AT user workflow.

---

### Building Block Candidates

- `ToastProvider` — establishes the aria-live region; renders the `ToastViewport`
- `ToastViewport` — the DOM container that holds all toasts; explicit position
- `Toast` / `ToastRoot` — individual notification item
- `ToastTitle` — primary heading
- `ToastDescription` — supporting text
- `ToastAction` — action button with `altText` prop
- `ToastClose` — dismiss button
- `ToastIcon` — semantic icon slot
- `toaster` / notification service — the programmatic API object

---

### Enum / Configuration Properties

| Property | Values |
|----------|--------|
| `type` / `variant` / `intent` | `"success"` \| `"error"` \| `"warning"` \| `"info"` \| `"neutral"` \| `"loading"` |
| `position` / `placement` | `"top"` \| `"topRight"` \| `"topLeft"` \| `"bottom"` \| `"bottomRight"` \| `"bottomLeft"` |
| `politeness` | `"assertive"` \| `"polite"` \| `"off"` |
| `swipeDirection` | `"right"` \| `"left"` \| `"up"` \| `"down"` |
| `duration` enum (MD3 pattern) | `"short"` \| `"long"` \| `"indefinite"` |

---

### A11y Consensus

| Attribute | Value | Rationale |
|-----------|-------|-----------|
| Non-critical (success, info) | `role="status"` / `aria-live="polite"` | Waits for natural pause before announcement |
| Critical (error, warning) | `role="alert"` / `aria-live="assertive"` | Interrupts immediately; user needs to act |
| `aria-atomic` | `"true"` | Announces entire toast content, not just changed parts |
| Action button | `altText` or descriptive `aria-label` with context | "Undo" alone is ambiguous; "Undo file delete" is actionable |
| Close button | `aria-label="Dismiss notification"` | Icon-only button needs label |
| Auto-dismiss pause | Pause on focus AND hover | WCAG 2.2.1; users must be able to pause, stop, or extend timing |
| Minimum duration | 5000ms minimum for non-persistent | WCAG 2.2.1 timing requirement |
| Keyboard access | Toast viewport focusable via Tab or hotkey (F8, Radix pattern) | Keyboard users must be able to reach and interact with toast actions |
| APG pattern | ARIA Live Regions + Dialog (for actionable) | WAI-ARIA Authoring Practices; no "Toast" APG pattern; use live region + dialog pattern combination |

---

## What Everyone Agrees On

1. **Programmatic/imperative API is the correct architecture.** All modern implementations (Chakra, Mantine, Fluent 2, Radix, Sonner, Ant Design, Evergreen) provide a programmatic API (`toast.show()`, `notifications.show()`, `dispatchToast()`). Requiring JSX rendering for notifications is architecturally incorrect because notifications are triggered from async callbacks and service layers that live outside the component tree.
2. **Persistent toasts when action is present.** Spectrum, Radix, Atlassian, and Carbon all agree: if the toast contains an action button, it must not auto-dismiss. WCAG 2.2 timing requirements and user experience both demand this.
3. **Auto-dismiss must pause on keyboard focus.** Spectrum, Atlassian, Mantine, Sonner, and Radix (via F8 viewport focus) all implement this. WCAG 2.2 compliance requires users to be able to pause, stop, or extend timing for auto-dismissing content.
4. **Error and success require different `aria-live` urgency.** Errors = `role="alert"` (assertive); success = `role="status"` (polite). Lightning, Carbon, Atlassian, GOV.UK, and Fluent 2 all make this mapping explicit. Using assertive for success notifications interrupts AT users unnecessarily.
5. **Color alone cannot communicate type.** Spectrum (mandatory icons), Carbon (icon + label), and every accessible system pair color with an icon for semantic variants. Color-only success/error/warning differentiation fails WCAG 1.4.1.
6. **A maximum visible count prevents notification flooding.** Mantine (`limit`), Spectrum (priority queue), Sonner (stacking), and Atlassian (FlagGroup) all manage notification volume. An unmanaged notification queue is a UX failure mode.
7. **Toast is not for errors in high-stakes contexts.** GOV.UK (Notification Banner), Orbit (page-level), and Polaris (Banner) all deliberately exclude or restrict toast for error scenarios where missing the notification has serious consequences.

---

## Where They Disagree

### 1. Auto-dismiss timing: fixed enum vs. arbitrary milliseconds
- **Option A — Fixed enum durations (MD3: SHORT/LONG/INDEFINITE):** Developer cannot set arbitrary timing.
  - Adopters: Material Design 3
  - Upside: Eliminates 800ms developer errors; floor is enforced
  - Downside: Inflexible; cannot match word count to reading time
  - Para tu caso: Use if consistency across app is more important than per-message optimization

- **Option B — Arbitrary milliseconds with minimum enforcement (Spectrum ≥6000ms):** Developer can set any value ≥ minimum.
  - Adopters: Spectrum, Mantine, Chakra, Sonner
  - Upside: Calibrate to message length; some messages need more time
  - Downside: Developer must know and respect minimums
  - Para tu caso: Better for products with variable-length messages; enforce minimum via API

### 2. Single component vs. separate components by interactivity
- **Option A — Single component with `type` / `variant` prop (Ant Design, Mantine, Sonner, Chakra):** One component covers all cases.
  - Upside: Simple API; one thing to learn
  - Downside: Requires developer to set correct role based on type; easy to get wrong
  - Para tu caso: Provide sensible role defaults per variant; document the mapping

- **Option B — Separate components by interactivity (Carbon: ToastNotification/ActionableNotification):** Different components for different interaction models.
  - Adopters: Carbon, Atlassian (Flag/AutoDismissFlag)
  - Upside: Correct a11y semantics by construction; developer cannot choose wrong role
  - Downside: More components to learn; migration path if requirements change
  - Para tu caso: Valuable if developer a11y knowledge is low or if actionable notifications are common

### 3. Position: single vs. configurable
- **Option A — Single fixed position (MD3 bottom-center, Carbon top-right):** No developer choice.
  - Upside: Spatial predictability across app; users always know where notifications appear
  - Downside: May conflict with fixed UI elements (FABs, navigation bars)
  - Para tu caso: Lock position per design; expose only a very limited set of validated positions

- **Option B — 6 configurable positions (Ant Design):** Developer chooses any corner or edge.
  - Upside: Flexibility for different UI compositions
  - Downside: Different positions appear in different pages; inconsistency degrades user trust
  - Para tu caso: Allow 2–4 validated positions maximum; not all 6 combinations are equally useful

### 4. Loading-state toast: dedicated type vs. consumer composition
- **Option A — `type: "loading"` as first-class type (Ant Design `message`, Chakra, Mantine):** Loading spinner built into the notification system.
  - Adopters: Ant Design, Chakra, Mantine, Sonner (`toast.promise()`)
  - Upside: Async feedback is a primary use case; first-class support prevents boilerplate
  - Downside: Adds a type that some products never need
  - Para tu caso: Include `loading` type if your product has significant async operations

- **Option B — Consumer composes loading state:** Use a custom icon or neutral toast while async operation runs.
  - Adopters: Polaris, MD3, Spectrum
  - Upside: Simpler component API
  - Downside: Every team reimplements loading→success/error toast transitions
  - Para tu caso: Only acceptable if async feedback is truly rare in your product

### 5. Stack behavior: one-at-a-time vs. stacked
- **Option A — One toast visible at a time (Spectrum):** Priority queue; next shows when current dismisses.
  - Upside: Never overwhelms; each notification gets full attention
  - Downside: Low-priority messages may be significantly delayed in high-frequency contexts

- **Option B — Stacked with collapse on hover (Sonner, Atlassian FlagGroup):** Multiple toasts visible; collapsed stack expands on hover.
  - Upside: All notifications accessible; no queue delay
  - Downside: Stacks can overwhelm; hover to expand is not keyboard-accessible without additional implementation
  - Para tu caso: Stacked is better for products where multiple simultaneous notifications are routine (monitoring dashboards, social feeds)

---

## Visual Patterns Found

| Pattern | Description | Best For | Adopted By |
|---------|-------------|----------|------------|
| Single toast, bottom-center | Minimalist; one message, one action, fixed position | Consumer mobile apps | MD3 Snackbar |
| Stacked toasts, top-right | Multiple notifications with stacking animation | Enterprise/desktop apps | Atlassian, Carbon, Ant Design notification |
| Stack collapse on hover | Multiple toasts collapse to compact stack; expand on hover | High-frequency notification contexts | Sonner, Atlassian |
| Priority queue (one visible) | Only highest-priority toast visible; others queued | Concurrent async operation apps | Spectrum |
| Loading → success/error transition | Single toast transitions from spinner to outcome | Any async operation feedback | Ant Design message, Chakra, Mantine, Sonner |
| Rich card with title + description | Full notification card with title, body, icon, action(s) | Enterprise notifications | Atlassian Flag, Carbon, Ant Design notification |
| Persistent Notification Banner | Page-level; not floating; no auto-dismiss | High-stakes errors, government services | GOV.UK, Polaris Banner |
| Single-line message | Top-center; no title; minimal | Quick confirmations, inline feedback | MD3 Snackbar, Ant Design message |

### ASCII Wireframes

**Standard toast (success, top-right):**
```
                     ┌──────────────────────────────┐
                     │ ✓  File saved successfully   │
                     │                         [×]  │
                     └──────────────────────────────┘
```

**Rich notification card (with action):**
```
                     ┌──────────────────────────────────┐
                     │ ●  New comment on Issue #42      │
                     │    "This looks good to me..."    │
                     │    [View comment]    [Dismiss]   │
                     └──────────────────────────────────┘
```

**Stacked toasts (Sonner style):**
```
                     ┌──────────────────────────────┐
                     │ ✓  Export complete       [×] │ ← top
                     └──────────────────────────────┘
                      ┌────────────────────────────┐
                      │ ⚠  Low storage         [×] │ ← behind (2)
                      └────────────────────────────┘
                       ┌──────────────────────────┐
                       │ ●  Update available  [×] │ ← behind (3)
                       └──────────────────────────┘
               ← Hover to expand all; click × on each to dismiss
```

**Loading → success transition:**
```
  BEFORE                         AFTER
  ┌──────────────────────────┐   ┌──────────────────────────┐
  │ ⟳  Uploading file...    │   │ ✓  Upload complete!      │
  └──────────────────────────┘   └──────────────────────────┘
  (same toast ID, updated via
   toaster.update(id))
```

**Provider/Viewport architecture:**
```
┌─────────────────────────────────────────────────────────┐
│  App (ToastProvider wraps entire app)                   │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Page content                                    │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ToastViewport (aria-live region, top-right corner)     │
│  ┌───────────────────────────┐                          │
│  │  Toast[0] (visible)       │                          │
│  │  Toast[1] (queued/hidden) │                          │
│  └───────────────────────────┘                          │
└─────────────────────────────────────────────────────────┘
```

---

## Risks to Consider

**RISK 1 — Missing minimum display time enforcement (HIGH)**
Spectrum enforces ≥6000ms in its API. Most other systems document a minimum but do not enforce it. A developer can set `duration: 800` and create a notification that disappears before screen reader users can hear it, violating WCAG 2.2.1. This is a systematic risk if the API accepts arbitrary millisecond values.
*Mitigation:* Enforce a minimum duration (5000ms) in the `show()` / `create()` API. If the consumer passes a lower value, clamp to minimum and optionally emit a warning in development mode. Alternatively, use MD3's enum approach to prevent arbitrary values entirely.

**RISK 2 — Actions missing elsewhere on the page (HIGH)**
Toast actions (undo, retry, view) that are the sole path to a critical operation create permanent data loss or UX dead-ends when the toast dismisses. This is Polaris's central design principle. Without this constraint in the spec, teams will build toasts where the action is the only way to accomplish a task.
*Mitigation:* Document explicitly: "Toast action buttons must be shortcuts, not the only path. Any action available in a toast must also be accessible from another location in the UI." Enforce with design review checkpoints.

**RISK 3 — Wrong `aria-live` role for toast type (MEDIUM)**
Using `role="alert"` (assertive) for success confirmations is the most common toast ARIA error. It interrupts screen reader users mid-sentence to announce "File saved"—disrespectful and disruptive. Most systems auto-map role to type, but if the consumer can override the role, this error is easy to introduce.
*Mitigation:* Auto-map: `type="error"` or `type="warning"` → `role="alert"`; `type="success"` or `type="info"` or `type="neutral"` → `role="status"`. Expose `politeness` as an override only for advanced cases (Fluent 2 pattern).

**RISK 4 — Icon-only close and action buttons (MEDIUM)**
A [×] button without an `aria-label` fails WCAG 1.1.1 (non-text content). An "Undo" button without context fails AT users who cannot see what is being undone. Both are common in quick toast implementations.
*Mitigation:* Make `aria-label` on the close button default to "Dismiss notification" in the component. Require `altText` on action buttons (Radix pattern); use TypeScript to enforce this at compile time.

---

## Next Steps

1. **Design the programmatic API first:** Decide the API shape (`toaster.show()` / `notifications.show()` / `dispatchToast()`) before the visual component. The provider and API surface are more architecturally significant than the visual design.
2. **Implement `update(id)` for loading states:** Design the loading→success/error state transition as a first-class feature from day one. Adding it later requires API changes.
3. **Decide on position strategy:** Choose whether to lock position, offer 2–3 validated positions, or expose all 6. Lock the default position in the design system spec; changing it later is a breaking change for brand consistency.
4. **Define severity-to-persistence rules:** Document which types auto-dismiss (success, info, neutral) vs. persist until dismissed (error) vs. persist until actioned (actionable). Enforce in the API.
5. **Implement auto-dismiss pause on focus:** Required for WCAG 2.2.1 compliance; build it in from the start, not as a retrofit.
