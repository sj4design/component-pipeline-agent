---
component: alert
compiled: 2026-03-28
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Absent — Snackbar (Toast only); no persistent inline alert
**Approach:** M3 has no persistent inline Alert component. M3's Snackbar is ephemeral (Toast-equivalent). For persistent contextual messages, teams use a styled Card or a custom surface with M3 color roles (`errorContainer` / `onErrorContainer` for errors, `tertiaryContainer` for info). There is no Banner component in M3's current spec.
**Key Decisions:**
- [HIGH] Absent: M3 addresses only ephemeral notifications (Snackbar); persistent status messages are out of scope for the component spec
- [MED] Color roles as workaround: `errorContainer`, `primaryContainer`, `tertiaryContainer` provide semantic surface colors for custom alert implementations
- [MED] No `role="alert"` guidance: M3 provides no documentation on ARIA live regions for persistent inline alerts, leaving a11y implementation entirely to teams
**Notable API:** No Alert component. `Snackbar` for transient messages; custom Card with `errorContainer` fill for persistent error messages.
**A11y:** No guidance. Teams implement `role="alert"` or `aria-live="polite"` on custom alert containers.
**Best at:** Nothing for persistent inline alerts — M3 provides only ephemeral toasts.
**Missing:** Persistent inline alert for form validation summaries, system status banners, and contextual warnings.

---

## spectrum
**Component:** InlineAlert
**Approach:** Spectrum's InlineAlert is persistent (no dismiss), non-interactive (no actions), and focused purely on status communication. Five variants: neutral, informative, positive, notice, warning. The `autoFocus` prop moves focus to the alert on render — enabling the form validation aggregation pattern where users are scrolled to a summary of errors at the top of a long form.
**Key Decisions:**
- [HIGH] No dismiss: InlineAlert is persistent content, not a transient notification — Spectrum draws a clear line between Alert (permanent status information) and Toast (transient notification)
- [HIGH] `autoFocus` for form validation: focus can be moved to the alert on render, making it the first thing screen reader users encounter after a failed form submission
- [MED] Five semantic variants: neutral/informative/positive/notice/negative each have distinct icon and color treatment; `notice` (warning) and `negative` (error) use `role="alert"` for immediate announcement; others use `role="status"`
**Notable API:** `variant: "neutral" | "informative" | "positive" | "notice" | "negative"`; `autoFocus: boolean`; `heading` slot
**A11y:** `role="alert"` for notice/negative variants (announced immediately by screen readers); `role="status"` for neutral/informative/positive (announced politely). This semantic distinction is unique among Tier 1.
**Best at:** Semantic ARIA role distinction — `role="alert"` vs. `role="status"` based on severity is the most accurate accessibility implementation for inline alerts in Tier 1.
**Missing:** Dismissible variant and action slot — InlineAlert is content-only; teams need Toast for dismissible alerts and must compose custom solutions for alerts with action buttons.

---

## carbon
**Component:** Inline Notification / Actionable Notification (+ explicit distinction from Toast)
**Approach:** Carbon documents explicit criteria for when to use Inline Notification vs. Toast: inline is for page-level persistent messages; Toast is for process completion notifications. `Actionable Notification` extends Inline with action buttons. Carbon differentiates ARIA urgency by severity: error/warning use `role="alert"` for immediate screen reader announcement; success/info use `aria-live="polite"` for polite announcement.
**Key Decisions:**
- [HIGH] Explicit Toast vs. Inline criteria: documentation states directly which cases warrant each pattern — prevents teams from using Toast for persistent errors or Inline for transient successes
- [HIGH] Severity-differentiated ARIA: error/warning use `role="alert"` (assertive); success/info use `aria-live="polite"` — the most precise ARIA urgency mapping in Tier 1
- [MED] Two contrast styles: `low-contrast` (default, subtle background) and `high-contrast` (strong border and background) — high-contrast for critical messages on complex page backgrounds
**Notable API:** `kind: "error" | "warning" | "success" | "info"`; `lowContrast: boolean`; `ActionableNotification` subcomponent for action buttons; `subtitle` for secondary message
**A11y:** `role="alert"` for error/warning; `aria-live="polite"` for success/info. Close button has `aria-label="close"`. Action buttons in `ActionableNotification` have descriptive accessible names.
**Best at:** ARIA urgency differentiation by severity — the most precise live region semantics for inline alerts in any Tier 1 system.
**Missing:** Two-line max body text constraint (documented); longer descriptions require a different pattern.

---

## polaris
**Component:** Banner (4 tones)
**Approach:** Polaris uses `Banner` for inline alerts with four tones: `critical`, `warning`, `success`, `info`. Critical and warning banners automatically get `role="alert"` (assertive announcement); success and info get `role="status"` (polite announcement). Non-critical banners are dismissible by default; critical banners cannot be dismissed. A `stopAnnouncements` prop suppresses the live region announcement for programmatic updates.
**Key Decisions:**
- [HIGH] Tone-based ARIA role: critical/warning = `role="alert"`; info/success = `role="status"` — consistent with Carbon's approach and correct for merchant-facing severity
- [HIGH] Dismissibility enforced by tone: critical banners cannot be dismissed (merchants must resolve the issue); non-critical banners are dismissible — prevents merchants from hiding critical system problems
- [MED] `stopAnnouncements` prop: suppresses live region announcements when the banner content changes programmatically (e.g., countdown timers updating) — prevents announcement spam
**Notable API:** `tone: "critical" | "warning" | "success" | "info"`; `onDismiss` (non-critical only); `stopAnnouncements: boolean`; `action` and `secondaryAction` for inline CTAs
**A11y:** `role="alert"` for critical/warning; `role="status"` for info/success. Dismiss button has `aria-label`. Action buttons within Banner are styled links or buttons.
**Best at:** Tone-based dismissibility enforcement (critical = non-dismissible) and `stopAnnouncements` for dynamic content — merchant-appropriate safeguards against hiding critical issues.
**Missing:** No `heading` prop — Banner body text is the primary content; headings within Banners require custom composition.

---

## atlassian
**Component:** Three-tier hierarchy: Banner (page), SectionMessage (section), InlineMessage (element)
**Approach:** Atlassian defines three alert components at different scope levels: `Banner` (page-level, sticky at top, used for critical/system-wide messages), `SectionMessage` (section-level, within page content), and `InlineMessage` (element-level, inline with text or icons). Additionally, 5 severity levels including a `discovery` variant unique to Atlassian — for announcing new features or changes rather than errors.
**Key Decisions:**
- [HIGH] Three-tier scope hierarchy: page/section/element — each tier has different size, placement, and ARIA urgency appropriate to its scope; using the wrong tier creates mismatched visual weight
- [MED] `discovery` variant (unique): for onboarding, new feature announcements, and change notifications — no other Tier 1 system has a first-class "new feature" alert variant
- [MED] `Flag` is separate: Atlassian's Flag component handles Toast-style transient notifications — the three alert components are all persistent
**Notable API:** `Banner` with `appearance: "warning" | "error" | "announcement"`; `SectionMessage` with `appearance: "information" | "warning" | "error" | "success" | "discovery"`; `actions` array for CTA buttons
**A11y:** `SectionMessage` and `Banner` use `role="alert"` for error/warning appearances; `aria-live="polite"` for info/success/discovery. Three-tier placement ensures the correct element is visible in the right viewport region.
**Best at:** Three-tier scope hierarchy and the `discovery` variant — the clearest scope differentiation for inline alerts and the only Tier 1 system with a dedicated new feature announcement appearance.
**Missing:** Customizable heading level for `SectionMessage` (heading is fixed `h2`); no `stopAnnouncements` equivalent for programmatically updating content.

---

## ant-design
**Component:** Alert (4 types + explicit separation from Message)
**Approach:** Ant Design's Alert is persistent inline; `message` (global ephemeral notifications) and `notification` (global persistent notifications) are explicitly separate. The `action` prop slot accepts any ReactNode for custom CTAs. `banner` prop switches the Alert to a full-width top-of-page mode without border-radius. `closable` is opt-in rather than forced by type.
**Key Decisions:**
- [HIGH] Explicit separation from Message/Notification: documentation states that Alert is for page-local persistent status; Message is for global ephemeral toasts — prevents conflation of the three patterns
- [MED] `action` ReactNode slot: accepts any React content (buttons, links, complex UI) — more flexible than Carbon's ActionableNotification which limits to a single action button
- [MED] `banner` prop: switches Alert to a full-width banner mode with no border-radius and no icon — used for site-wide announcements at the top of page layouts
**Notable API:** `type: "success" | "info" | "warning" | "error"`; `action: ReactNode`; `banner: boolean`; `closable: boolean`; `closeIcon` for custom close trigger
**A11y:** `role="alert"` for warning/error types; no automatic `aria-live` on success/info types — unlike Carbon and Polaris, Ant Design does not differentiate ARIA urgency by severity for all types. Teams should add `aria-live="polite"` to success/info alerts manually.
**Best at:** `action` ReactNode slot for rich in-alert CTAs and `banner` mode for site-wide announcements without additional layout wrappers.
**Missing:** Severity-differentiated ARIA live region urgency (all non-error types default to no live region without consumer addition); no scope hierarchy equivalent to Atlassian's Banner/SectionMessage/InlineMessage tiers.
