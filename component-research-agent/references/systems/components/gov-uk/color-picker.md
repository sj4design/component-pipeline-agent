---
system: GOV.UK Design System
component: Not available natively
url: https://design-system.service.gov.uk/styles/colour/
last_verified: 2026-03-29
confidence: high
---

# Color Picker

## Approach
GOV.UK Design System has no color picker component, and this absence is deeply intentional. Government digital services operate within a strictly defined brand palette — GOV.UK blue, black, white, focus yellow, error red, and a small set of secondary tones — all prescribed by the Government Digital Service (GDS) brand guidelines. Citizens interacting with HMRC, DVLA, or the Home Office never need to choose a color; the visual language is fixed to communicate trust, authority, and consistency across all public-facing services. The design system's color documentation exists solely to guide designers and developers building services, not to expose color choice to end users. Introducing a color picker would also raise significant accessibility concerns: users with color vision deficiencies, cognitive disabilities, or low digital literacy form a substantial portion of the GOV.UK audience, and free color selection would create unpredictable contrast and readability issues impossible to validate under the mandatory WCAG 2.2 AA standard.

## Key Decisions
1. **Fixed brand palette** (HIGH) — The GOV.UK color palette is mandated by GDS brand guidelines, not configurable. This ensures consistent, accessible contrast ratios across all services without per-service variation.
2. **No user-facing color selection** (HIGH) — Government services do not present scenarios requiring users to pick colors. Forms collect structured data (names, dates, references); aesthetic personalization is out of scope for transactional public services.
3. **Accessibility by construction** (HIGH) — By controlling all color combinations centrally, GDS guarantees every foreground/background pairing meets WCAG 2.2 AA (4.5:1 for normal text, 3:1 for large text). A color picker would undermine this guarantee entirely.

## Notable Props
- No component exists
- Color usage documented at: https://design-system.service.gov.uk/styles/colour/
- CSS custom properties: `--govuk-colour-*` variables used internally (not a public API)

## A11y Highlights
- **Keyboard**: Not applicable — no interactive component exists
- **Screen reader**: Not applicable
- **ARIA**: Not applicable; color documentation only

## Strengths & Gaps
- **Best at**: Providing a legally compliant, accessible, consistently branded color system for government services without requiring any runtime color selection
- **Missing**: No capability for any user-facing color selection whatsoever; teams needing color input for non-GOV.UK services must build entirely custom solutions outside the design system
