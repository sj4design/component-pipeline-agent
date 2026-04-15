---
system: Twilio Paste
component: Card
url: https://paste.twilio.design/components/card
last_verified: 2026-03-28
confidence: high
---

# Card

## Approach
Twilio Paste's Card is a simple container component providing a consistent bordered, rounded, padded surface for grouping related content. Paste's Card is intentionally minimal — it's a layout/container primitive that doesn't prescribe header/footer structure or specific content patterns. This gives maximum flexibility for the diverse content types in the Twilio console (API endpoint cards, phone number cards, service configuration panels).

## Key Decisions
1. **Minimal container primitive** (HIGH) — Card is a styled div with border, border-radius, and padding using design tokens — no prescribed sub-components — giving full flexibility for content structure while ensuring visual consistency.
2. **Token-driven styling** (HIGH) — Border color, background, border-radius, and padding all use semantic design tokens, making cards automatically adapt to dark mode and theme changes.
3. **No interactive card variant** (MEDIUM) — Paste deliberately does not provide an "interactive/clickable card" variant, as this requires careful accessible implementation. Developers who need clickable cards are guided to use a specific accessible pattern.

## Notable Props
- `padding`: Padding size override using space tokens
- `element`: Customization API for the underlying element name

## A11y Highlights
- **Keyboard**: Card itself is not focusable; interactive elements within card maintain standard focus behavior
- **Screen reader**: Card is a presentational container (div); content within determines announcement
- **ARIA**: No ARIA on card itself; interactive cards require developer to implement correct article/button/link semantics

## Strengths & Gaps
- **Best at**: Token-driven consistent container; flexible for diverse console content types; correct guidance against inaccessible clickable cards
- **Missing**: No header/footer/media sub-components; no built-in interactive/clickable variant
