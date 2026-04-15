---
system: Nord (Nordhealth)
component: Button (nord-button web component)
url: https://nordhealth.design/components/button/
last_verified: 2026-03-28
confidence: low
---

# Button

## Approach
Nord's Button is a web component designed for healthcare application interfaces. Healthcare UIs prioritize clarity, error prevention, and accessibility for a diverse user base including clinical staff with varying technical proficiency. The button system is intentionally conservative — clear visual hierarchy, strong focus indicators, and no decorative flourishes that might distract in clinical settings. The component supports the standard hierarchy needed for healthcare forms: primary actions (submit clinical data), secondary actions (navigate, cancel), and destructive actions (delete records).

## Key Decisions
1. **Web component for portability** (HIGH) — Same reasoning as all Nord components: multiple teams, multiple frameworks, one component implementation.
2. **variant for clinical hierarchy** (HIGH) — Primary, secondary, plain, and danger variants cover healthcare UI hierarchy. The danger variant is important for destructive actions in clinical software (deleting patient records, cancelling treatments).
3. **size for context density** (MEDIUM) — Small, medium, and large sizes support dense clinical data tables (small), standard forms (medium), and primary CTA contexts (large). Healthcare UIs often mix dense data and clear action areas.

## Notable Props
- `variant`: `"primary" | "secondary" | "plain" | "danger"`
- `size`: `"s" | "m" | "l"`
- `disabled`: standard disabled state
- `loading`: loading state indicator
- `type`: `"button" | "submit" | "reset"` — standard form semantics
- `href`: renders as anchor for link-style navigation

## A11y Highlights
- **Keyboard**: Native button/anchor behavior; strong default focus ring styling (important in healthcare for motor-impaired users)
- **Screen reader**: Standard button semantics; loading state communicated
- **ARIA**: Healthcare applications require AA/AAA compliance; Nord's focus styles exceed standard minimums

## Strengths & Gaps
- **Best at**: Framework portability; strong focus styles; clinical danger variant; conservative, error-resistant design
- **Missing**: Verify exact prop names at nordhealth.design — web component API may differ from documented; no gradient or decorative variants
