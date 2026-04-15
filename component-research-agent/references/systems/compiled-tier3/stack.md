---
component: Stack
tier: 3
last_verified: 2026-03-31
---

# Stack — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Flex | Headless flexbox primitive with typed props for all flexbox properties; part of Radix Themes layout system; supports `as` polymorphism and responsive prop objects. | high |
| Chakra UI | Stack / VStack / HStack | Three named components: `Stack` (configurable direction), `VStack` (vertical shorthand), `HStack` (horizontal shorthand); `divider` prop inserts elements between children; responsive direction. | high |
| GOV.UK | No Stack component | Layout handled via GOV.UK Frontend grid classes (`govuk-grid-row`, `govuk-grid-column-*`); no flexbox stack primitive — grid-first approach for government page layouts. | high |
| Base Web (Uber) | FlexGrid / Block | No dedicated Stack; `Block` component with `display="flex"` and flexbox overrides serves as the primitive; `FlexGrid` handles responsive column layouts. Override-based customization model. | medium |
| Fluent 2 (Microsoft) | Stack (v8) → removed in v9 | Fluent v8 had a full-featured `Stack` with tokens; Fluent v9 intentionally removed it, recommending CSS flexbox/grid directly. Teams migrating from v8 must replace Stack with native CSS. | high |
| Gestalt (Pinterest) | Flex / Box | `Flex` is the primary layout primitive with `direction`, `gap`, `alignItems`, `justifyContent`, `wrap`; `Box` provides lower-level control. Flex constrains props to Gestalt's spacing scale. | high |
| Mantine | Stack / Group / Flex | Three components: `Stack` (vertical), `Group` (horizontal with alignment), `Flex` (full flexbox control). Stack/Group use Mantine spacing scale. Group has `grow` prop to distribute children equally. | high |
| Orbit (Kiwi.com) | Stack | Travel-UI stack with `direction`, `spacing`, `wrap`, `align`, `justify`; supports `mediumMobile`/`largeMobile`/`tablet`/`desktop`/`largeDesktop` responsive breakpoint props for direction and spacing. | high |
| Evergreen (Segment) | Pane (with flex props) | No dedicated Stack; `Pane` component with `display="flex"` and flexbox utility props serves as the layout primitive; minimal abstraction over CSS. | medium |
| Nord (Nordhealth) | nord-stack (web component) | Healthcare-focused web component; `direction`, `gap`, `wrap`, `align-items`, `justify-content` as HTML attributes; framework-portable via custom element standard. | medium |

## Key Decision Patterns

The T3 systems reveal the strongest divergence of any tier on whether Stack should exist as a component at all. Fluent 2's deliberate removal of Stack in v9 is the most significant data point — Microsoft concluded that a Stack component adds abstraction cost without sufficient benefit over native CSS flexbox/grid, especially with modern CSS gap support. GOV.UK, Base Web, and Evergreen similarly lack a dedicated Stack, each preferring lower-level primitives (grid classes, Block, Pane). This "anti-Stack" position represents a meaningful minority across all tiers.

Systems that do provide Stack split into two camps on component naming. Chakra's `VStack`/`HStack` shorthand pattern prioritizes developer ergonomics — less typing and immediately readable direction in the component name. Mantine's `Stack`/`Group` pattern uses semantically distinct names (`Group` implies horizontal peer elements, not just "horizontal stack"). Orbit, Gestalt, and Nord use the standard `Stack`/`Flex` naming. No system in T3 uses the Polaris-style logical property names (`InlineStack`/`BlockStack`).

Responsive behavior is handled in notably different ways. Orbit provides the most granular responsive API with five named breakpoint props (`mediumMobile` through `largeDesktop`) for direction and spacing overrides. Radix uses responsive prop objects like Primer. Chakra supports responsive arrays (`direction={['column', 'row']}`). GOV.UK and Fluent v9 delegate entirely to CSS media queries.

The divider/separator pattern appears in Chakra (`divider` prop accepting a `StackDivider` component) but is absent from most T3 systems. This contrasts with T1 where three of six systems support dividers, suggesting it is a feature that mature/opinionated systems add while younger or headless systems skip.

## A11y Consensus

- All Stack/Flex components are presentational layout utilities with no ARIA semantics — consistent with T1 and T2.
- Radix Flex and Mantine Flex support polymorphic `as` / `component` props for semantic element rendering.
- Nord's web component approach means the stack renders as a custom element (`<nord-stack>`) with shadow DOM — screen readers traverse the light DOM children normally.
- No system adds `role`, `aria-label`, or other ARIA attributes to the stack container.
- Fluent v9's removal of Stack means layout semantics are handled entirely through native HTML elements and CSS, which is inherently the most accessible approach.

## Recommended Use

Reference T3 stack approaches when deciding whether to include a Stack component at all (Fluent v9's removal rationale is essential reading). Chakra's VStack/HStack for the most developer-friendly naming pattern with divider support. Orbit for the most granular responsive breakpoint API. Mantine's three-component architecture (Stack/Group/Flex) for progressive disclosure of layout complexity. GOV.UK and Fluent v9 as evidence that modern CSS may eliminate the need for a Stack component entirely.
