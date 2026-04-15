---
system: Adobe Spectrum
component: InlineAlert
url: https://react-spectrum.adobe.com/react-spectrum/InlineAlert.html
last_verified: 2026-03-28
---

# InlineAlert

## Approach

Spectrum's InlineAlert was introduced as an explicit, named component precisely to solve the Toast vs. inline persistent notification distinction. Adobe's product suite — including Analytics, Experience Platform, and Experience Manager — frequently surfaces validation feedback, form-level errors, and status messages that must remain visible in the page layout until the underlying issue is resolved. Routing these through a Toast (Spectrum calls it a "toast notification") was architecturally wrong: Toasts auto-dismiss, float above content as overlays, and are designed for ephemeral confirmations ("Your file was saved"). InlineAlert is the opposite: it is embedded in the document flow, non-modal, persistent until the problem is resolved, and connected to specific page content rather than floating independently.

The fundamental philosophy distinguishing InlineAlert from Toast in Spectrum is: InlineAlert is part of the page, Toast is above the page. InlineAlert does not auto-dismiss; Toast does (or offers a dismiss button). InlineAlert is contextually anchored; Toast is position-agnostic. This explicit split was a deliberate architectural decision that prevents the common anti-pattern of using auto-dismissing toasts for errors that require user action to resolve — a pattern that fails accessibility because the error disappears before a screen reader user or slow-moving user has time to read it.

InlineAlert is specifically designed to aggregate form validation feedback in one location rather than scattering error messages inline at individual field level. This aggregation pattern is common in Adobe's complex, multi-section forms where dozens of fields might surface errors simultaneously.

## Key Decisions

1. **Persistent by design — no dismiss mechanism** (HIGH) — InlineAlert intentionally has no close/dismiss button. This is a philosophical stance: if information belongs in an InlineAlert, it belongs there until the underlying condition changes. This contrasts with Carbon's InlineNotification (optional dismiss) and Polaris Banner (required dismiss for non-critical). Spectrum's reasoning is that allowing premature dismissal of validation or status messages lets users hide problems without resolving them, which degrades form completion quality and creates support burden. The tradeoff is less user control over their information density.

2. **Five severity variants instead of four** (MEDIUM) — Spectrum uses `neutral`, `info`, `positive`, `notice`, and `negative` rather than the more common success/info/warning/error tetrad. The distinction matters: `notice` is specifically for warnings that are not yet errors but require attention, while `negative` means the thing has gone wrong. `positive` maps to success. This finer granularity reflects Adobe's B2B product contexts where "this might become a problem" (notice) is meaningfully different from "this is already a problem" (negative), and collapsing them into a single "warning" loses that distinction. Neutral/info variants have no icon by default; non-neutral variants include contextual icons.

3. **Form validation aggregation pattern** (HIGH) — The component is explicitly designed as an aggregation point for form-level feedback, not field-level inline errors. The pattern is: individual fields show inline validation on blur, and InlineAlert at the top of the form summarizes all blocking errors on submit. This prevents users from having to scroll through a long form hunting for red-bordered fields after a failed submission. The `autoFocus` prop exists specifically to support this: when the InlineAlert renders after failed submission, focus can be programmatically moved to it so screen reader users hear the summary immediately.

4. **Heading + Content as mandatory structure** (MEDIUM) — InlineAlert requires both a `Heading` child and a `Content` child. This enforced structure prevents lazy implementations that dump a wall of text into a single unstructured container. The heading provides a scannable summary; the content provides detail. This is the same cognitive hierarchy pattern used by Carbon (title + subtitle), Polaris (title + content), and Ant Design (message + description) — a consensus across all systems that two-level information hierarchy in alerts improves scannability.

5. **Separation from Toast is architecturally enforced** (HIGH) — Toast and InlineAlert are different components with different APIs and different rendering models. This is not just a usage guideline — it is enforced by the component structure. You cannot accidentally use InlineAlert as a toast or vice versa. This architectural enforcement is Spectrum's strongest statement on the persistent vs. transient notification distinction.

## Notable Props

- `variant`: `'neutral' | 'info' | 'positive' | 'notice' | 'negative'` — The five-way severity split is unique among Tier 1 systems; most use four levels. The `notice` variant filling the "warning-but-not-error" gap is particularly thoughtful for complex B2B workflows.
- `autoFocus`: Enables programmatic focus management when the alert renders, which is critical for form submission error aggregation flows — the screen reader immediately announces the error summary without the user having to navigate to it.
- Children (`Heading` + `Content`): Structural enforcement rather than a flat text prop — this is an architectural decision, not just API convenience.

## A11y Highlights

- **Keyboard**: No dismiss button means no keyboard dismiss path. Focus management via `autoFocus` prop allows the alert to receive focus programmatically on render, which is the correct pattern for form submission error feedback. RTL layouts are automatically mirrored.
- **Screen reader**: Uses `role="alert"`, which is equivalent to `aria-live="assertive"`. This means screen readers announce the content immediately and interrupt whatever they are currently reading. This is appropriate for form-level errors on submit but may be too aggressive for informational messages. The decision to use `role="alert"` universally (across all five variants including neutral/info) may over-trigger assertive announcements for low-urgency content.
- **ARIA**: `role="alert"` on the container. The Heading child provides a labeled structure. No `aria-live="polite"` alternative for lower-severity variants — all variants use the assertive alert role.

## Strengths & Gaps

- **Best at**: Making the persistent-vs-transient architectural distinction explicit and enforced, and the five-variant severity system covering nuanced B2B workflow states that a four-level system misses.
- **Missing**: No dismiss mechanism (intentional but limiting for low-priority informational messages), no action button support documented, and no guidance for multiple simultaneous InlineAlerts on the same page.
