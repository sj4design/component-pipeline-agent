---
component: Card
tier: 2
last_verified: 2026-03-28
---

# Card — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Card | Minimal container; padding variants; no header/footer structure | high |
| Salesforce Lightning | Card | Title + icon header; actions slot; body; footer; narrow/full variants | high |
| GitHub Primer | Box / ActionList (no Card) | No dedicated Card; Box with borderColor/borderRadius creates card-like containers | high |
| shadcn/ui | Card | CardHeader/CardTitle/CardDescription/CardContent/CardFooter compound; structured | high |
| Playbook | Card | Content grouping; dual React/Rails | medium |
| REI Cedar | CdrCard | Vue card; clickable card support; WCAG 2.1 AA | medium |
| Wise Design | Card | Account/recipient/balance cards | low |
| Dell Design System | Card | Enterprise dashboard summary cards | low |

## Key Decision Patterns

**Structured vs. flexible:** shadcn/ui Card provides a rich compound component API (CardHeader, CardTitle, CardDescription, CardContent, CardFooter) with defined slots for structured content. Paste's Card is a minimal padded container — maximum flexibility, minimal opinion. Lightning's Card has a defined header-body-footer structure.

**Clickable/interactive cards:** Cedar explicitly supports clickable card patterns with proper keyboard navigation and hover states. When an entire card is clickable, the link must be the card's heading (not the whole card div), or the card must use a single focusable element pattern.

**Primer's absence:** GitHub Primer has no Card component — Box primitives are used to build card-like containers. This is a gap that product teams work around with custom Box configurations.

**Header actions:** Lightning's Card has a dedicated actions slot in the header for action buttons/menus within the card. shadcn/ui relies on CardHeader children for this. Paste Cards are action-agnostic.

## A11y Highlights
- Cards are typically not interactive containers; individual elements within cards are interactive
- Clickable cards: use heading link pattern (only the title is the link); avoid wrapping entire card in anchor
- Card with primary action: heading is the link; secondary actions are separate buttons
- Card list: `<ul>` with `<li>` items for semantic list of cards

## Recommended Use
Use shadcn/ui Card for structured React card layouts with header/content/footer zones. Use Paste Card as a minimal container. Use Lightning Card in Salesforce pages for standard record card patterns. Build Cedar CdrCard for clickable card use cases with accessibility patterns.
