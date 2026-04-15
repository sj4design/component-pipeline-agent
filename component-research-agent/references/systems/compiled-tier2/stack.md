---
component: Stack
tier: 2
last_verified: 2026-03-31
---

# Stack — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Stack | Vertical layout primitive with token-based spacing; orientation prop for direction; separate `Inline` component exists but is not a Stack alias | high |
| Salesforce Lightning | lightning-layout / LayoutItem | Grid-first layout system rather than stack primitive; uses `multiple-rows` and `horizontal-align` for flex-like behavior; no dedicated Stack component | medium |
| GitHub Primer | Stack | Flexbox layout component with `direction`, `gap`, `align`, `justify`, `wrap`, and `padding` props; responsive prop values via object syntax | high |
| shadcn/ui | No Stack component | Layout handled via Tailwind utility classes (`flex`, `flex-col`, `gap-*`); no abstracted Stack component — CSS-first approach | high |
| Playbook | FlexItem / Flex | Flex-based layout with `orientation`, `spacing`, and `justify` props; wraps flexbox with Playbook design tokens | medium |
| REI Cedar | CdrGrid / CdrRow / CdrCol | Grid-based layout system rather than stack; no dedicated stack primitive; uses CSS Grid under the hood | low |
| Wise Design | Stack | Vertical/horizontal stack with Wise spacing tokens; minimal API focused on direction and spacing | low |
| Dell Design System | Stack / Flex | Enterprise layout primitives with density-aware spacing; supports compact/comfortable/spacious density modes | low |

## Key Decision Patterns

**Dedicated component vs. CSS utilities:** shadcn/ui takes the most radical position — no Stack component at all, relying entirely on Tailwind's flex utilities. This trades discoverability and consistency enforcement for maximum flexibility. Primer, Paste, and Wise provide dedicated Stack components that enforce spacing tokens. Lightning and Cedar use grid-based systems rather than stack primitives, reflecting their origins in page-level layout rather than component-level composition.

**Single vs. split components:** Paste provides separate `Stack` (vertical) and `Inline` (horizontal) components, following the Polaris pattern. Primer uses a single `Stack` with a `direction` prop. Lightning has no stack at all — `lightning-layout` is a grid wrapper. The single-component approach (Primer) is simpler to learn; the split approach (Paste) prevents API confusion around alignment semantics.

**Responsive props:** Primer's Stack is the most responsive-capable in Tier 2, accepting object-syntax responsive values for `direction`, `gap`, and other props (`direction={{ narrow: 'vertical', regular: 'horizontal' }}`). Paste handles responsiveness through media query tokens rather than responsive props. Most others defer to CSS breakpoints.

**Spacing constraints:** Paste and Primer both constrain spacing to design token values, preventing arbitrary pixel values. Lightning uses a 12-column grid model. shadcn/ui allows any Tailwind spacing value, which is technically unconstrained but governed by Tailwind's configuration.

## A11y Consensus

- All Stack/Flex components are purely visual layout utilities with no ARIA semantics.
- Semantic structure is the consumer's responsibility — stacks render `<div>` by default.
- Primer's Stack supports an `as` prop for polymorphic rendering (`as="nav"`, `as="ul"`) to enable semantic HTML.
- No system applies `role` or `aria-*` attributes to the stack container itself.

## Recommended Use

Primer's Stack for the most complete responsive-aware stack API in Tier 2. Paste's Stack/Inline split for teams that prefer the two-component pattern with token-constrained spacing. shadcn/ui's CSS-utility approach as a reference for when a dedicated Stack component may not be needed — useful for evaluating whether a design system should include a Stack at all.
