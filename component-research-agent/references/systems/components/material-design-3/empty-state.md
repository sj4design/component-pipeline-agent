---
system: Material Design 3
component: Not available natively
url: https://m3.material.io/components
last_verified: 2026-03-28
---

# Empty State

## Approach

Material Design 3 does not provide a dedicated Empty State component. This absence extends across both M3 and M2: while M2 documented an "Empty States" pattern in its foundations and communications guidelines, M3's component library focuses on interactive building blocks and does not codify layout patterns like Empty State into components. The M3 philosophy appears to be that empty states are contextual compositions of existing primitives (Typography, Button, illustration SVGs) rather than a standalone component with a fixed structure.

The M2 pattern documentation does provide useful guidance that teams implementing M3 typically inherit: empty states occur when a list contains no items or a search produces no results, and should explain the current situation while providing a clear next step. M2 recommended using a single illustration, a heading, body text, and optionally a primary action button. Because M3 does not prescribe a component, teams building on M3 must compose this themselves or build a custom Empty State component that follows M3's typography scale, spacing system, and icon/illustration guidelines.

The workaround in M3 implementations is to compose: a `FilledTonalButton` or `OutlinedButton` for the primary action, M3 typography tokens (`headlineMedium` for heading, `bodyMedium` for description), and an appropriately-sized illustration or icon from the M3 icon system. The centered layout with ample whitespace follows M3's broader layout principles. Material UI (MUI), the de facto M3 web implementation, does not ship an EmptyState component either, reinforcing that this gap exists in the official ecosystem.

## Key Decisions

1. **No component — pattern only** (HIGH) — M3's decision not to ship an Empty State component means teams have full compositional freedom but no guard rails. The upside is flexibility: teams can use icons, illustrations, or even animation. The downside is inconsistency: without a component enforcing structure, empty states across a product may vary significantly in visual weight, heading level, and action placement.

2. **Illustration choice left to teams** (HIGH) — M3 provides an extensive icon library and guidance on illustration styles, but does not mandate what visual element appears in an empty state. This is in contrast to Spectrum (which requires SVG illustrations via IllustratedMessage), Polaris (which requires an image), and Atlassian (which provides guidance on when to use illustrations vs. not). Teams must make their own decision about visual treatment.

3. **M2 pattern guidance still relevant** (MEDIUM) — M2's empty states documentation specified that illustrations should "communicate the message at a glance" and actions should help users understand how to proceed. While M3 has not formally ported this guidance, it is still cited by M3 implementers as a practical baseline. The core recommendations — be specific about the empty condition, explain what will appear when populated, include an action if one exists — hold regardless of design system version.

## Notable Props

- No component; no props.
- Workaround typically involves: a centered layout container, `role="img"` on the illustration element, `aria-label` for illustration description, and an H2/H3 heading for the empty state message.

## A11y Highlights

- **Keyboard**: No component-level keyboard behavior. The CTA button inside a composed empty state follows standard button keyboard behavior (Tab to focus, Enter/Space to activate).
- **Screen reader**: Illustration SVGs in M3 contexts should use `aria-hidden="true"` if decorative or `role="img"` with `aria-label` if meaningful. The heading provides the semantic structure screen readers use to navigate the page.
- **ARIA**: Teams must manually apply appropriate roles. No component scaffolding enforces correct ARIA structure.

## Strengths & Gaps

- **Best at**: Flexibility — teams can implement any visual treatment, animation, or content structure for empty states without fighting a component's opinions.
- **Missing**: Any standardization of the empty state pattern, which leads to inconsistent implementations across products built on M3 and adds design work to every team that encounters an empty state scenario.
