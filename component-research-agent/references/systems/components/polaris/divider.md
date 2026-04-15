---
system: Polaris (Shopify)
component: Divider
url: https://polaris.shopify.com/components/divider
last_verified: 2026-03-28
---

# Divider

## Approach
Polaris provides a Divider component with a distinctive token-based approach to color control that reflects Shopify's design token philosophy. Rather than offering size or variant props, Polaris's Divider exposes a `borderColor` prop that accepts any Polaris border color token, and a `borderWidth` prop for controlling thickness. This design makes Polaris's Divider the most customizable bare divider among Tier 1 systems — but the customization is intentionally constrained to Polaris tokens, not arbitrary CSS values. The rationale is that Shopify's Admin interface is extremely dense with information and uses dividers heavily across the app (between sidebar sections, between form groups, between order line items) — so having fine control over divider visual weight is a practical necessity. The token constraint ensures that however merchants configure their Admin extensions, dividers never appear with arbitrary hex colors that break Shopify's visual consistency.

## Key Decisions
1. **Token-based color control via `borderColor` prop** (HIGH) — The `borderColor` prop accepts Polaris border tokens (e.g., `border`, `border-subdued`, `border-critical`) rather than CSS color values. This is the core architectural decision of Polaris's Divider: it expresses color through the semantic token system, meaning a "subdued" divider in light mode automatically becomes the appropriate dark mode equivalent without any conditional logic. Teams who want a less prominent separator choose `border-subdued`; those needing an attention-drawing separator in error states can use `border-critical`. The token vocabulary gives meaningful semantic choices without unlimited visual freedom.
2. **`borderWidth` prop for thickness variation** (MEDIUM) — Polaris supports `borderWidth` values of `025` (1px), `050` (2px), and `100` (4px) using Polaris's spacing notation. Like the color token approach, this constrains to a defined scale rather than arbitrary pixel values. The practical use case is administrative UIs where section-level dividers (thicker) need to be visually distinguished from item-level dividers (thinner) within the same screen.
3. **Horizontal only** (MEDIUM) — Polaris's Divider renders only horizontal dividers. Vertical separation in Polaris UIs is handled by inline stack layouts, button groups, and card/box boundaries rather than by a vertical Divider component. This reflects Shopify Admin's primarily vertical scrolling layout model where horizontal dividers dominate and vertical ones are rarely needed as standalone elements.
4. **Semantic HTML `<hr>` element** (HIGH) — Polaris's Divider renders as an `<hr>` element styled via CSS, not a `<div>`. This is the correct semantic choice — `<hr>` has native `role="separator"` semantics in HTML, meaning screen readers correctly identify it as a thematic break without additional ARIA attributes. The choice reflects Polaris's strong commitment to accessibility-first HTML foundations.

## Notable Props
- `borderColor`: Polaris border token name — the primary customization lever. Tokens include `border`, `border-subdued`, `border-transparent`, `border-critical`, `border-caution`, `border-success`.
- `borderWidth`: `'025' | '050' | '100'` — Thickness using Polaris's numeric token scale.

## A11y Highlights
- **Keyboard**: Non-interactive; no keyboard behavior required.
- **Screen reader**: Renders as `<hr>` which natively carries `role="separator"`, causing screen readers to announce a thematic break between content sections. This is semantically correct for dividers that separate meaningful content groups.
- **ARIA**: Because `<hr>` provides native semantics, no additional ARIA attributes are required. For decorative-only dividers, teams should add `aria-hidden="true"` to suppress the separator announcement — Polaris documentation addresses this distinction, which is better guidance than most Tier 1 systems provide on the semantic vs. decorative question.

## Strengths & Gaps
- **Best at**: Semantic HTML foundation (`<hr>`) with token-constrained color and width control — the clearest example in Tier 1 of a divider that is both visually customizable and accessibility-correct without requiring developers to add manual ARIA attributes.
- **Missing**: Vertical orientation support and embedded text label capability — teams building horizontal navigation separators with section labels need to compose custom solutions.
