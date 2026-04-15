---
component: banner
compiled: 2026-03-31
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Absent — no dedicated Banner component
**Approach:** M3 has no page-level Banner component. The closest patterns are Snackbar (ephemeral, not persistent) and Top App Bar (navigation, not messaging). For system-wide announcements or persistent page-level banners, teams must compose a custom full-width surface using M3 color roles (`primaryContainer`, `errorContainer`, `tertiaryContainer`). There is no guidance on sticky positioning, stacking, or dismissibility for banners.
**Key Decisions:**
- [HIGH] Absent: M3 does not address page-level persistent messaging — system-wide announcements, maintenance notices, and cookie consent are entirely out of scope
- [MED] No sticky/fixed guidance: M3 provides no layout patterns for fixed-position elements at the top of page, leaving banner positioning to teams
- [MED] Snackbar is not a substitute: Snackbar is transient and bottom-positioned — using it for persistent page-level messaging violates its intended ephemeral semantics
**Notable API:** No Banner component. Teams compose custom full-width containers with M3 color role tokens.
**A11y:** No guidance. Teams must implement `role="alert"` or `role="banner"` and manage focus for dismissible banners independently.
**Best at:** Nothing for page-level banners — M3 is a gap here.
**Missing:** Persistent page-level banner for system announcements, maintenance notices, promotional messages, and cookie consent.

---

## spectrum
**Component:** Absent — no dedicated Banner; InlineAlert is section-level only
**Approach:** Spectrum has no full-width page-level Banner component. InlineAlert is designed for section-level persistent feedback within content areas, not for sticky top-of-page announcements. Toast is transient and not suitable for persistent banners. For page-level system announcements, teams must build custom implementations. Spectrum's design philosophy focuses alerts at the content level rather than the page/app level.
**Key Decisions:**
- [HIGH] Absent: Spectrum explicitly scopes InlineAlert to section-level content feedback; page-level banners are not addressed
- [MED] No sticky positioning pattern: Spectrum provides no guidance for fixed/sticky elements outside the normal content flow
- [MED] Toast is ephemeral: cannot serve as a persistent page-level banner since it auto-dismisses
**Notable API:** No Banner component. `InlineAlert` exists but is scoped to inline/section-level feedback only.
**A11y:** No banner-specific guidance. InlineAlert's `role="alert"`/`role="status"` distinction applies only to section-level alerts.
**Best at:** Nothing for page-level banners — Spectrum focuses on section-level InlineAlert.
**Missing:** Full-width page-level banner for system announcements, maintenance windows, and promotional messaging.

---

## carbon
**Component:** Inline Notification (no dedicated page-level Banner)
**Approach:** Carbon does not have a distinct page-level Banner component. Inline Notification and Actionable Notification serve persistent in-page alerts but are designed for content-flow placement, not fixed/sticky top-of-page banners. Carbon's documentation explicitly differentiates Inline (persistent, in content) from Toast (transient, floating) but does not address the full-width page-level banner pattern for system announcements or maintenance notices. Teams needing a sticky banner must compose one from Carbon primitives.
**Key Decisions:**
- [HIGH] No page-level banner: Carbon scopes notifications to content-level inline placement; system-wide announcements must be custom-built
- [MED] High-contrast variant as partial solution: `high-contrast` Inline Notification increases visual prominence but still lives within content flow, not at page top
- [MED] No sticky/fixed guidance: no documentation on positioning notifications outside normal content flow
**Notable API:** `InlineNotification` with `kind`, `lowContrast`; no banner-specific props or positioning modes.
**A11y:** Inline Notification's `role="alert"` for error/warning applies but lacks page-level banner landmark guidance.
**Best at:** Nothing specific to page-level banners — Carbon's strength is content-level inline notifications.
**Missing:** Dedicated full-width page-level banner for maintenance notices, system-wide announcements, and cookie consent.

---

## polaris
**Component:** Banner (4 tones, page-level and inline)
**Approach:** Polaris Banner is the most complete page-level banner in Tier 1. It supports both page-level placement (full-width at top of page) and inline placement within content areas. Four tones: `critical`, `warning`, `success`, `info`. Critical banners are non-dismissible by design — merchants must resolve the issue. Non-critical banners are dismissible with `onDismiss`. Supports primary and secondary action buttons for CTAs. `stopAnnouncements` suppresses live region updates for dynamic content.
**Key Decisions:**
- [HIGH] Dual placement: Banner works both as page-level (full-width, prominent) and inline (within card/section) — a single component covers both scopes
- [HIGH] Tone-based dismissibility: critical = non-dismissible (forces resolution); warning/success/info = dismissible — prevents merchants from hiding critical system problems
- [MED] `stopAnnouncements` prop: prevents screen reader spam when banner content updates programmatically (timers, countdowns)
- [MED] Action slots: primary and secondary action buttons enable in-banner CTAs without custom composition
**Notable API:** `tone: "critical" | "warning" | "success" | "info"`; `onDismiss`; `action` + `secondaryAction`; `stopAnnouncements: boolean`
**A11y:** `role="alert"` for critical/warning; `role="status"` for info/success. Dismiss button has `aria-label`. Action buttons receive proper accessible names.
**Best at:** Complete page-level banner with tone-based dismissibility enforcement, dual placement modes, and built-in action slots — the most feature-complete Banner in Tier 1.
**Missing:** No sticky/fixed positioning built in (layout responsibility); no heading prop (body text is primary content).

---

## atlassian
**Component:** Banner (page-level, sticky) + SectionMessage (section-level)
**Approach:** Atlassian has a dedicated `Banner` component for page-level announcements, separate from `SectionMessage` (section-level) and `InlineMessage` (element-level). Banner is designed to be sticky at the top of the page, spanning full width, with three appearances: `warning`, `error`, and `announcement`. It is intentionally limited — no dismiss, no action buttons — to maintain urgency and ensure users see critical system messages. The `announcement` appearance is unique for non-error system-wide notices (maintenance, feature changes).
**Key Decisions:**
- [HIGH] Dedicated page-level component: Banner is explicitly scoped to page-top system messages; SectionMessage handles section-level alerts — prevents scope confusion
- [HIGH] Non-dismissible by design: Banner cannot be dismissed — it represents system-level conditions that persist until resolved; this enforces visibility of critical messages
- [MED] `announcement` appearance: unique variant for non-error system notices (maintenance windows, product changes) — no other Tier 1 system has a neutral announcement variant at the page level
- [MED] Minimal API: no action buttons, no body text, just a single-line message with icon — forces brevity and urgency
**Notable API:** `appearance: "warning" | "error" | "announcement"`; `icon` element; single-line text content only
**A11y:** `role="alert"` for warning/error; `aria-live="polite"` for announcement. Banner is a landmark element at page top with appropriate ARIA semantics.
**Best at:** Clearest page-level banner scope — dedicated component with intentional constraints (non-dismissible, single-line, no actions) that enforce appropriate urgency for system-wide messages.
**Missing:** No dismissibility, no action buttons, no multi-line content — intentionally constrained but limiting for promotional banners or cookie consent.

---

## ant-design
**Component:** Alert with `banner` prop
**Approach:** Ant Design does not have a separate Banner component. Instead, the Alert component has a `banner` boolean prop that switches it to full-width banner mode: removes border-radius, removes the left border, and optionally hides the icon. When `banner` is true, the Alert is intended to be placed at the top of the page for system-wide announcements. All Alert features (type, closable, action, description) remain available in banner mode, making it the most flexible banner implementation in Tier 1.
**Key Decisions:**
- [HIGH] Banner as Alert mode: single component with `banner` prop rather than a separate component — reduces API surface but blurs the semantic distinction between page-level and section-level alerts
- [MED] Full Alert API in banner mode: `type`, `closable`, `action`, `description`, `showIcon` all work in banner mode — teams can build cookie consent, maintenance notices, and promotional banners from one component
- [MED] `closable` is independent of type: any banner can be made dismissible or non-dismissible regardless of severity — unlike Polaris which enforces critical = non-dismissible
**Notable API:** `banner: boolean`; `type: "success" | "info" | "warning" | "error"`; `closable: boolean`; `action: ReactNode`; `description: ReactNode`; `showIcon: boolean`
**A11y:** In banner mode, `role="alert"` is applied automatically. No severity-differentiated ARIA urgency (warning/error and success/info all get `role="alert"` in banner mode). Teams should manually adjust to `role="status"` for non-critical banners.
**Best at:** Maximum flexibility — full Alert API available in banner mode with `action` ReactNode slot, `closable` toggle, and `description` for multi-line content. Most versatile banner in Tier 1.
**Missing:** No severity-differentiated ARIA live region semantics in banner mode (all types get `role="alert"`); no `stopAnnouncements` equivalent; no enforcement of critical = non-dismissible.
