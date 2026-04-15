---
system: GOV.UK Design System
component: Not available natively (community Accessible Autocomplete exists)
url: https://github.com/alphagov/accessible-autocomplete
last_verified: 2026-03-29
confidence: medium
---

# Combobox

## Approach
GOV.UK Design System does not include a combobox or autocomplete in its core component library, but GDS has developed and publishes the "Accessible Autocomplete" as a standalone community package. This distinction is important: core components have passed GDS's high evidence bar (multiple government services demonstrating need, extensive user research), while the autocomplete lives outside that bar as an opt-in enhancement. The core system offers a `<select>` component for bounded option sets and recommends it as the default for short lists. The Accessible Autocomplete fills the gap for longer lists — such as country selectors, local authority pickers, or NHS condition searches — where typing to filter is genuinely more usable than scrolling through hundreds of options. Even the community component follows GOV.UK's philosophy strictly: it degrades gracefully to a plain `<select>` without JavaScript, ships as a progressive enhancement wrapper, and has been tested with assistive technologies including JAWS, NVDA, VoiceOver, and TalkBack.

## Key Decisions
1. **Community component, not core** (HIGH) — The autocomplete is intentionally outside the core design system because not all services need it, and the evidence bar for core inclusion requires broad service adoption and extensive user research that the component has not yet formally completed.
2. **Progressive enhancement** (HIGH) — The Accessible Autocomplete wraps a native `<select>` element; if JavaScript fails or is disabled, users receive a fully functional native dropdown. This aligns with GOV.UK's mandatory progressive enhancement principle.
3. **No custom styling beyond GOV.UK defaults** (MEDIUM) — The community component ships with GOV.UK Frontend-compatible CSS. Teams are discouraged from restyling it, as visual deviations introduce untested accessibility states.

## Notable Props
- Community package: `accessible-autocomplete` (npm)
- `accessibleAutocomplete({ element, id, source, minLength, defaultValue, displayMenu })`
- Native `<select>` fallback is mandatory in the HTML before initialisation
- `minLength`: characters before suggestions appear (default: 0)
- `displayMenu: 'overlay' | 'inline'`

## A11y Highlights
- **Keyboard**: Arrow keys navigate suggestions; Enter selects; Escape closes and restores previous value; Tab moves focus out without selecting
- **Screen reader**: Live region announces number of results as user types; each option announced with list position ("2 of 7")
- **ARIA**: `role="combobox"` on input, `aria-expanded`, `aria-autocomplete="list"`, `aria-owns` pointing to listbox, `aria-activedescendant` tracks focused option; `role="listbox"` and `role="option"` on suggestions

## Strengths & Gaps
- **Best at**: Accessible, progressively enhanced autocomplete with extensive assistive technology testing across the range of screen readers used by UK government service users
- **Missing**: Not in core design system (no Nunjucks macro, no govuk-frontend npm export); no multi-select variant; no grouping of options; requires manual integration effort; community maintenance rather than GDS-guaranteed support
