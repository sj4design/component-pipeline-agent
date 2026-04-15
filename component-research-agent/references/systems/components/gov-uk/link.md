---
system: GOV.UK Design System
component: Link (typography / style utility)
url: https://design-system.service.gov.uk/styles/typography/#links
last_verified: 2026-03-29
confidence: high
---

# Link

## Approach
GOV.UK Design System does not provide a standalone Link component in the sense of a Nunjucks macro or encapsulated widget — links are native HTML `<a>` elements styled through the typography system and a set of modifier CSS classes. This reflects the system's HTML-first philosophy: `<a href>` already carries full browser and assistive technology support, correct keyboard behaviour, visited-state semantics, and history integration without any abstraction layer. The design system does however document link usage extensively: default links are underlined and use the GOV.UK blue (`#1d70b8`) with a distinct `:visited` colour (`#4c2c92`) and a high-contrast yellow focus ring (`#ffdd00` outline with `#0b0c0c` offset) that satisfies WCAG 2.2 Focus Appearance criteria. Specialist modifier classes handle inverse links (on dark backgrounds), links that should not display the visited state, and links that open in a new tab (which require the external link warning convention). The system provides strong guidance that links in body text must always be underlined to distinguish them from surrounding text for users with colour vision deficiencies.

## Key Decisions
1. **No component abstraction — native `<a>` element** (HIGH) — Wrapping links in a component would add indirection without benefit; the native element provides all necessary semantics, browser behaviour, and assistive technology integration by default.
2. **Underline as mandatory visual differentiator** (HIGH) — GOV.UK requires all inline body links to be underlined because colour alone is insufficient to distinguish links from text for users with colour vision deficiencies (WCAG 1.4.1 Use of Colour). Removing underlines is only permitted in navigation contexts where the interactive nature is established by structural position.
3. **Visited state preservation** (MEDIUM) — The `:visited` colour (`#4c2c92`, purple) is deliberately maintained and not suppressed, as it helps users — particularly those with memory difficulties — track which parts of a service they have already visited.
4. **New tab warning convention** (MEDIUM) — Links opening in a new tab must include a visible warning (typically "(opens in new tab)") to comply with WCAG 3.2.2 On Input and to respect user expectations — GOV.UK research found new tabs disorient low-confidence users significantly.

## Notable Props
- No Nunjucks macro; use native `<a>` with CSS classes
- Default: `<a class="govuk-link" href="...">`
- Modifier classes:
  - `govuk-link--muted` — secondary/subdued link colour
  - `govuk-link--inverse` — white link for dark backgrounds
  - `govuk-link--no-visited-state` — suppresses visited colour (use sparingly)
  - `govuk-link--no-underline` — removes underline (only for navigation contexts)

## A11y Highlights
- **Keyboard**: Tab to focus; Enter to activate; Shift+Tab to reverse; no custom key handling; browser-native focus management
- **Screen reader**: Native `<a>` semantics; link text must be descriptive — GOV.UK strictly discourages "click here" or "read more" without context; `aria-label` or visually hidden text used when link text alone is ambiguous
- **ARIA**: Typically no ARIA needed; `aria-current="page"` used in navigation for the active link; external links may use `aria-label` to include "(opens in new tab)" for SR users who cannot see appended text

## Strengths & Gaps
- **Best at**: Accessible, consistent link styling with strong contrast, focus visibility, and visited-state support; comprehensive guidance on link text quality and new-tab warnings backed by user research
- **Missing**: No component-level API (no props, no macro); no icon link variant with alignment utilities baked in; no "button styled as link" component (teams must implement this pattern manually); no automatic external link detection or icon injection
