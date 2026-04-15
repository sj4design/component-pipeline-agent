---
system: Polaris (Shopify)
component: Card
url: https://polaris.shopify.com/components/layout-and-structure/card
last_verified: 2026-03-28
---

# Card

## Approach
Polaris Card is the most opinionated general-purpose card in any major design system, and intentionally so. Shopify's merchant-facing admin interface is built almost entirely from Cards — every piece of merchant-visible content lives inside one. The Card in Polaris is not a "nice-to-have UI pattern"; it is the foundational unit of the merchant experience, grouping related data, settings, and actions into digestible chunks within page layouts. Because of this ubiquity, Polaris has extensive guidance on when and how to use cards correctly — header action placement, footer action placement, section hierarchy, when a card needs a title versus when a title is implied. The Polaris Card underwent a significant redesign (LegacyCard → Card) that shifted from a prescriptive, opinionated component with built-in title/section/footer APIs to a more composable container. The new Card is intentionally minimal — a styled surface with responsive padding and border radius — with all content structure delegated to composition with BlockStack, InlineGrid, and Text components. This reflects Shopify's broader move toward composition-over-configuration as their design system matured and the number of edge-case card layouts in the admin multiplied beyond what a fixed slot API could accommodate.

## Key Decisions
1. **Composition-over-configuration shift (LegacyCard → Card)** (HIGH) — The legacy Card component had built-in props for `title`, `actions`, `primaryFooterAction`, `secondaryFooterActions`, `sectioned`, and `subdued`. The new Card removes all of these, providing only `background`, `padding`, and `roundedAbove`. Content structure is now built with layout primitives (BlockStack, InlineGrid, Text, Bleed). The WHY: as the Shopify Admin grew to thousands of screens, the LegacyCard's fixed slot API couldn't accommodate the variety of layouts needed — custom headers, multi-column content areas, conditional sections. Composition lets teams build any card layout without fighting the component.

2. **Responsive padding and border radius as built-in props** (HIGH) — `padding` and `roundedAbove` both accept responsive objects (e.g., `padding={{ xs: '200', sm: '400' }}`). The reason: Shopify Admin must be fully functional on mobile devices used by merchants on the floor of a retail store or on a phone in their pocket. Cards that have desktop-appropriate padding (16–24px) at mobile sizes waste precious screen real estate. Building responsiveness directly into the Card API means every team automatically gets mobile-appropriate layouts without needing to write media queries.

3. **Only one primary call-to-action per card** (HIGH) — Polaris guidelines mandate that a card should have at most one primary action. This is an e-commerce UX principle: merchant decision fatigue is real. When a merchant is managing hundreds of products, orders, and settings, card layouts that present multiple equally-weighted actions create paralysis. The single-primary-action rule funnels attention toward the most important next step in each card context.

4. **Header actions represent the whole card; section actions represent a section** (MEDIUM) — Polaris distinguishes between card-level actions (placed in the card header, representing the entire card's content — typically "Edit") and section-level actions (placed in the section header, representing only that section). The rationale is information architecture: a merchant reading "Edit" in a card header understands they can edit everything in the card; "Edit" in a section header means they can edit only that section. This distinction matters in complex cards like Product details where multiple independent sections coexist.

5. **`roundedAbove` for breakpoint-based border radius control** (MEDIUM) — Cards are full-bleed (no border radius) on mobile by default and rounded on larger breakpoints. This is deliberate: on mobile, full-bleed cards with no gap to the screen edge maximize content area and match native mobile conventions (no floating card). On desktop, rounded corners create visual grouping in multi-column layouts. The `roundedAbove` prop makes this breakpoint-aware behavior explicit and configurable.

## Notable Props
- `background`: Accepts semantic color tokens (e.g., `bg-surface`, `bg-surface-secondary`) rather than raw colors. Forces all card backgrounds to use the design system's surface color vocabulary, preventing one-off color decisions that break theming.
- `padding`: Responsive spacing that accepts breakpoint objects. The card is the primary entry point for responsive layout density in Polaris pages.
- `roundedAbove`: Controls at which breakpoint the card shows border radius. Encodes the mobile-to-desktop visual shift as a component API decision.

## A11y Highlights
- **Keyboard**: Card itself is not focusable. Interactive elements within the card (buttons, links) receive focus normally. The `Text` component with `as="h2"` provides document heading structure for screen reader navigation.
- **Screen reader**: Card headers rendered as `<h2>` elements allow screen reader users to navigate the admin page by headings — each card's heading appears in the heading landmark list, enabling quick scanning of the page's information architecture.
- **ARIA**: No ARIA role applied to the card container itself. Semantic structure comes from the heading hierarchy inside the card. Buttons within cards require accessible labels via `accessibilityLabel` prop when icon-only.

## Strengths & Gaps
- **Best at**: Providing a comprehensive, opinionated pattern library for how cards should be composed in a merchant admin context — the guidelines around header/footer/section action placement are more detailed and reasoned than any other Tier 1 design system.
- **Missing**: No native interactive/clickable card variant; no built-in selection state; no cover image slot. Polaris Cards are content containers, not interaction surfaces — if you need the entire card to be a link, you must compose that pattern yourself.
