---
component: Container
tier: 3
last_verified: 2026-03-31
---

# Container — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Box / Container (Themes) | Radix Primitives has no Container; Radix Themes provides Container with size variants (1-4) mapping to max-widths (448px/688px/880px/1136px); responsive display prop; padding inherited from Section parent. | high |
| Chakra UI | Container | Dedicated Container component; `maxW` prop with T-shirt sizes (sm/md/lg/xl) or custom values; `centerContent` boolean for flex centering; default horizontal padding via theme; polymorphic `as` prop. | high |
| GOV.UK | govuk-width-container (CSS class) | CSS class that applies `max-width: 960px` and `margin: 0 auto`; used inside `govuk-main-wrapper`; deliberate single width for government service consistency; no component abstraction. | high |
| Base Web | Block (no Container) | No dedicated Container; Block component with `maxWidth`, `margin`, and `padding` overrides serves as the generic layout primitive; teams compose containment manually. | high |
| Fluent 2 | No Container component | No dedicated Container in Fluent UI React; layout containment handled by application shell patterns and CSS Grid/Flexbox; `makeStyles` utility for custom container styling with Fluent tokens. | high |
| Gestalt | Container | Dedicated Container component; single max-width (800px) for narrow reading content; no size variants — intentionally opinionated for Pinterest's content-first layouts. | high |
| Mantine | Container | Feature-rich Container; `size` prop with xs/sm/md/lg/xl (540px-1320px) or custom pixel value; `fluid` boolean for full-width; responsive `sizes` customization via theme; horizontal padding via `px` prop tied to theme spacing. | high |
| Orbit | No Container component | No dedicated Container; layout achieved through Stack, Grid, and custom CSS; Kiwi.com booking flows use full-width patterns that don't require centered containment. | high |
| Evergreen | Pane (no Container) | No dedicated Container; Pane component serves as the generic box with elevation; teams apply `maxWidth` and `marginX="auto"` manually for containment. | high |
| Nord | nord-layout (Layout) | Layout component provides page-level containment with `max-inline-size` CSS property; `padding` attribute for horizontal gutters; used as the outermost wrapper in Nordhealth's clinical application UI. | high |

## Key Decision Patterns

Container is where the design system philosophy divide is most visible. Systems fall into three clear camps: dedicated Container component (Chakra, Mantine, Gestalt, Radix Themes), no Container by design (Fluent 2, Orbit, Evergreen), and CSS-only approach (GOV.UK). The dedicated-component camp believes containment is common enough to warrant a first-class abstraction. The no-component camp argues that containment is too context-dependent for a one-size-fits-all component and that Box/Block primitives with manual styling are more appropriate.

Mantine's Container is the most feature-complete in the entire Tier 3 set. It supports 5 named sizes (xs through xl), a `fluid` mode, custom pixel values, theme-level size customization, and responsive padding — covering virtually every containment scenario. Chakra's Container is similarly flexible but delegates size to the `maxW` prop rather than a dedicated `size` scale.

Gestalt's single-width Container (800px) is the most opinionated approach. Pinterest's design philosophy prioritizes content readability over layout flexibility — 800px keeps body text within comfortable reading line lengths (roughly 75 characters at 16px). There are no size variants because Pinterest decided that if you need a different width, you should use Box with explicit maxWidth rather than stretching the Container concept.

GOV.UK's 960px fixed width reflects institutional design: every government service page must have the same content width for consistency and accessibility compliance. The deliberate absence of variants ensures that no team can create a wider or narrower layout that breaks the uniform government experience.

Radix Themes' Container is notable for deriving its padding from a parent `Section` component rather than managing its own padding. This creates a composition pattern: `Section` controls vertical spacing and horizontal padding, while `Container` controls only max-width. This separation of concerns is unique in Tier 3.

## A11y Consensus

- Container is a presentational layout component with no ARIA semantics — it renders as a `<div>` (or polymorphic element via `as` prop in Chakra).
- Max-width containment directly supports WCAG 1.4.8 (Visual Presentation): line length should not exceed 80 characters for readability — Container components enforce this by constraining content width.
- Container does not need `role`, `aria-label`, or any ARIA attributes — landmark semantics belong on the content within the container (`<main>`, `<article>`, `<section>`).
- Fluid containers that span full viewport width should ensure content remains readable at extreme widths — Mantine's `fluid` mode and Chakra's unconstrained `maxW` can create accessibility issues if text line length is not separately controlled.
- GOV.UK's single-width approach is the most accessibility-conscious: 960px ensures comfortable reading width across all services without relying on teams to choose appropriate sizes.

## Recommended Use

Reference Mantine's Container for the most complete API (size scale, fluid mode, theme customization). Use Chakra's Container for polymorphic element support and `centerContent` convenience. Reference Gestalt's single-width philosophy when arguing for opinionated containment. Use GOV.UK's approach for institutional/government contexts requiring uniform layouts. For headless/unstyled systems, Radix Themes' Container + Section composition pattern provides clean separation of width vs. spacing concerns.
