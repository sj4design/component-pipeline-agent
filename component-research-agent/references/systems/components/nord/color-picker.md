---
system: Nord Design System (Nordhealth)
component: Not available natively
url: https://nordhealth.design/components/
last_verified: 2026-03-29
confidence: high
---

# Color Picker

## Approach
Nord does not provide a Color Picker component, and this absence is a deliberate, principled design decision rooted in the clinical context of healthcare software. In medical software, colors carry standardized clinical meaning: red indicates critical/danger, yellow indicates warning/caution, green indicates normal/safe, and these conventions are codified in clinical standards and trained into healthcare professionals through years of practice with vital sign monitors, lab result systems, and EHR interfaces. Allowing end users to select arbitrary colors in a clinical application would directly undermine these safety-critical conventions — a patient record field rendered in a user-chosen light red versus the system's critical-red could delay recognition of a dangerous value. Nord's design system enforces color usage through a curated set of CSS Custom Properties (`--nord-color-*`) defined in the design token system, ensuring that color assignments are controlled, semantic, and consistent across all healthcare products built on Nord. Where data visualization coloring is needed (e.g., lab trend charts), clinical product teams use Nord's token palette directly rather than exposing color selection to end users.

## Key Decisions
1. **Absent by design — clinical color coding safety** (HIGH) — Healthcare color conventions (red = critical, yellow = warning, green = normal) are safety-critical standards. User-customizable colors create risk of misinterpreting clinical signals, which can contribute to adverse patient outcomes. The absence of a color picker is a patient safety decision.
2. **CSS Custom Properties enforce color governance** (HIGH) — Nord's `--nord-color-*` token system gives development teams structured, semantically named colors (e.g., `--nord-color-status-danger`, `--nord-color-status-success`) that maintain clinical meaning while supporting institutional theming. This is the correct abstraction for healthcare software.
3. **Institutional theming over user customization** (MEDIUM) — Healthcare organizations (hospital networks, clinic chains) may need to apply their brand colors to software interfaces. Nord supports this at the institution/deployment level via CSS custom property overrides, not at the end-user level — maintaining clinical color conventions while accommodating organizational branding.

## Notable Props
- No component exists; no props applicable.

## A11y Highlights
- **Keyboard**: Not applicable — no component exists
- **Screen reader**: Not applicable — no component exists
- **ARIA**: Not applicable — no component exists. Note: Nord's color token system itself is designed with WCAG AA contrast requirements built in, ensuring all `--nord-color-*` pairings meet accessibility standards without requiring runtime color selection.

## Strengths & Gaps
- **Best at**: Enforcing safe, consistent clinical color usage through the token system — preventing the category of accessibility and patient-safety issues that unconstrained color selection would introduce
- **Missing**: No escape hatch for legitimate data visualization use cases (e.g., user-configurable chart series colors in analytics dashboards) that some clinical analytics products may need; teams building such features must implement color selection entirely outside the design system
