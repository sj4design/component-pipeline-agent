---
system: Atlassian Design System
component: Accordion
url: https://atlassian.design/components/
last_verified: 2026-03-28
---

# Accordion (Atlassian)

## Approach
Atlassian's Design System includes Accordion as part of its Atlaskit component library, though it is notably less documented publicly than components in peer systems like Carbon or Spectrum. The component serves Atlassian's product suite (Jira, Confluence, Bitbucket, Trello) where collapsible content sections appear in issue detail panels, settings pages, and navigation sidebars. Atlassian's overall design philosophy embeds accessibility into every component as a baseline requirement rather than an add-on -- their public stance is that ADS components ship with built-in keyboard support and sensible ARIA usage out of the box. The accordion was validated during the redesign of Atlassian's navigation system in 2024, where the team prototyped and tested accordion panel interactions in realistic environments across six Atlassian products before shipping. Atlassian's automation design guidelines explicitly discourage nested accordions within panels, favoring a flat, single-surface design for configuration contexts.

## Key Decisions
1. **Flat structure mandate -- no nested accordions** (HIGH) -- Atlassian's guidelines explicitly prohibit nesting accordions inside other accordions or inside configuration panels. WHY: Nested accordions create cognitive overload and navigation confusion, especially in complex products like Jira where issue detail views already have multiple levels of information hierarchy. By enforcing a flat structure, Atlassian prevents the "accordion-ception" anti-pattern that plagues enterprise tools with deeply nested settings.

2. **Integrated into navigation patterns** (HIGH) -- The accordion pattern was specifically validated as part of Atlassian's 2024 navigation redesign, where sidebar collapse/expand behavior was tested across products. WHY: In Jira and Confluence, sidebar navigation frequently uses accordion-like sections (project groups, space categories). Atlassian tested discoverability of sidebar collapse patterns and shipped the variant that performed best in user testing, suggesting their accordion behavior is heavily informed by real product usage data.

3. **Accessibility as non-negotiable baseline** (MEDIUM) -- ADS components ship with built-in keyboard support, focus management, and ARIA attributes without requiring additional developer configuration. WHY: Atlassian serves government and enterprise clients with strict accessibility compliance requirements (WCAG 2.1 AA). Baking a11y into the component defaults means teams cannot accidentally ship inaccessible accordions, reducing compliance risk across the entire product suite.

4. **Component-level independence with consistent tokens** (MEDIUM) -- Each Atlaskit package (including accordion) is independently versioned and published to npm, using shared design tokens from the Atlassian Design System. WHY: With hundreds of engineers across many product teams, Atlassian needs components that can be upgraded independently without cascading breaking changes. The accordion can evolve without forcing a system-wide update.

## Notable Props
- Atlassian's accordion follows standard patterns with expand/collapse state management, though specific prop documentation is less publicly detailed than peer systems.
- The component integrates with Atlassian's token system for spacing, color, and typography, ensuring visual consistency across Jira, Confluence, and other products.

## A11y Highlights
- **Keyboard**: Enter/Space toggles accordion sections. Tab navigates between accordion headers following standard focus order. Built-in, no additional configuration needed.
- **Screen reader**: Expanded/collapsed state announced automatically. Section headers participate in the heading hierarchy.
- **ARIA**: `aria-expanded` on trigger elements, `aria-controls` linking triggers to panels. Components follow WAI-ARIA accordion pattern by default.

## Strengths & Gaps
- **Best at**: Real-product-validated interaction patterns -- the accordion behavior was tested across six major products during the navigation redesign, meaning the implementation reflects actual usage data rather than theoretical best practices.
- **Missing**: Public documentation is significantly less detailed than peer systems (Carbon, Spectrum, Ant Design). Developers outside Atlassian may struggle to find comprehensive API references, prop documentation, or detailed accessibility specifications without access to internal resources.
