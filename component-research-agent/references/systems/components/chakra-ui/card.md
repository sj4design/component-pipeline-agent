---
system: Chakra UI
component: Card
url: https://chakra-ui.com/docs/components/card
last_verified: 2026-03-28
confidence: high
---

# Card

## Approach
Chakra UI's Card is a structured surface component with Card, CardHeader, CardBody, and CardFooter sub-components. This predefined structure reflects the most common card layout pattern in applications. The component uses Chakra's surface tokens for background and border, and supports variant and size control. Unlike Radix's minimal card, Chakra's card is opinionated about internal structure.

## Key Decisions
1. **Header/Body/Footer structure** (HIGH) — Predefined slots enforce consistent card layouts across an application. This is a deliberate design system decision: prescribing structure prevents the inconsistency that emerges when teams freestyle card content.
2. **variant system** (MEDIUM) — `"outline"` (border), `"filled"` (background), `"elevated"` (shadow). Three of the most common card visual styles, all token-integrated.
3. **CardHeader with action** (MEDIUM) — CardHeader accepts any content, commonly a heading + action button (three-dot menu, close button) side by side.

## Notable Props
- `variant`: `"outline" | "filled" | "elevated" | "unstyled"`
- `size`: `"sm" | "md" | "lg"`
- `align`: text alignment

## A11y Highlights
- **Keyboard**: Interactive cards need button or link wrapper; non-interactive cards are static
- **Screen reader**: Header content establishes card topic; footer actions are standard buttons
- **ARIA**: No special ARIA for static cards; interactive cards need appropriate roles

## Strengths & Gaps
- **Best at**: Header/Body/Footer structure; three practical variants; colorScheme integration
- **Missing**: No image hero slot; no card group/grid component; no selection state
