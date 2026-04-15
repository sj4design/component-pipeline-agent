---
component: Divider
tier: 3
last_verified: 2026-03-29
---

# Divider — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Separator | Named to match ARIA `role="separator"`; `decorative` prop sets `role="none"` for purely visual uses; both orientations; Primitives is headless, Themes adds tokens. | high |
| Chakra UI | Divider / Separator | `<hr>` base element; style-props passthrough for color/thickness/style; v3 renamed to Separator; solid and dashed variants. | high |
| GOV.UK | Not available — use section-break utility | No component; `govuk-section-break` utility class with size modifiers for long-form content; spacing + semantic HTML preferred over decorative lines. | high |
| Base Web | Divider | Semantic `<hr>`; theme border token integration; Override system for the rare custom case; horizontal only. | high |
| Fluent 2 | Divider | Label-in-line as first-class feature (for "Or", "Today" date separators in chat); `alignContent` for label position; `appearance` variants (subtle/strong/brand); high-contrast token support. | high |
| Gestalt | Divider | Zero-prop component; always horizontal; token-based color; `<hr>` semantics; consumers manage spacing externally via Box. | high |
| Mantine | Divider | Label with `labelPosition` (left/center/right); both orientations; `variant` (solid/dashed/dotted); `size` for thickness; color token integration. | high |
| Orbit | Separator | `spaceAfter` prop for built-in spacing control; `type` for solid/dashed; horizontal only; `<hr>` semantics. | high |
| Evergreen | Not available — use Box with border props | Spacing-first philosophy; `Box borderBottom` as escape hatch; `Menu.Divider` within Menu component only. | high |
| Nord | nord-divider (Divider) | Minimal clinical interface divider; CSS custom properties for token-based styling; `vertical` attribute for toolbar contexts; no decorative variants by design. | high |

## Key Decision Patterns

Divider is where naming variation is most pronounced in the T3 set. Radix and Orbit use "Separator" (following the ARIA role name), while Chakra, Mantine, Base Web, and Nord use "Divider." GOV.UK's utility is called "section-break." This naming fragmentation reflects the component's ambiguity — it sits between semantic HTML (`<hr>` = thematic break), ARIA role (`separator`), and visual design ("divider" = decorative line) — and different systems prioritize different framings.

Fluent 2's label-in-line feature is the most functionally distinctive approach in the T3 set. The pattern of embedding "Or", "Today", or date-stamp text centered on a dividing line is extremely common in real products (authentication flows, chat history) but almost never codified as a first-class feature. Mantine also supports labels, but without the Teams-/Outlook-informed default positioning logic that Fluent 2 includes.

Gestalt's zero-prop design is the most opinionated minimalism. By removing all configuration from the divider, Gestalt ensures every divider in Pinterest's product looks identical — there are no mismatched dividers in different shades, weights, or orientations. The tradeoff is that any variation requires manual composition, which is intentional: variations should be deliberate design decisions, not casual prop changes.

GOV.UK and Evergreen's spacing-first philosophy shares an important accessibility insight: explicit divider lines can be avoided if spacing and semantic HTML structure communicate grouping clearly enough. This is particularly relevant for users with cognitive disabilities and low-vision users where additional visual clutter can increase cognitive load.

## A11y Consensus

- Divider/Separator components should use `<hr>` as the underlying HTML element — this provides implicit `role="separator"` without additional ARIA attributes.
- Purely decorative dividers (used only for visual spacing, not marking a semantic section boundary) should have `role="none"` or `aria-hidden="true"` to avoid cluttering screen reader output — Radix's `decorative` prop is the most explicit implementation of this pattern.
- When a divider carries a text label (Fluent 2, Mantine), the label text is announced by screen readers as part of the separator, providing meaningful context.
- Vertical dividers must include `aria-orientation="vertical"` since `<hr>` defaults to horizontal semantics — Radix and Nord explicitly handle this.
- Mantine flags that vertical dividers used purely for visual column separation in toolbars may warrant `role="none"` to avoid superfluous screen reader announcements.

## Recommended Use

Reference T3 divider approaches when deciding on the decorative/semantic distinction (`role="none"` for ornamental lines), label-in-divider patterns (Fluent 2 for chat/auth "Or" separators), spacing-control strategy (Orbit's `spaceAfter` vs. external Box management), and whether to omit a dedicated component entirely (GOV.UK and Evergreen's rationale for spacing-first approaches).
