---
system: Radix UI (WorkOS)
component: Card (via Radix Themes)
url: https://www.radix-ui.com/themes/docs/components/card
last_verified: 2026-03-28
confidence: high
---

# Card

## Approach
Radix Themes provides a Card component as a styled surface container. The Card is a semantic container (renders as `<div>` with surface styling) with variant options. It integrates with Radix Themes' token system for surface colors, border radius, and shadow. Card is a presentational container — Radix doesn't prescribe what goes inside beyond the visual surface.

## Key Decisions
1. **Simple container, no slots** (HIGH) — Radix Card is a `<div>` with styling, nothing more. No header/body/footer slots. This keeps it maximally flexible — consumers structure content freely.
2. **variant for fill/outline** (MEDIUM) — `"surface"` (filled), `"classic"` (shadowed), `"ghost"` (no border or shadow). These cover the main card visual treatments.
3. **asChild for semantic variation** (MEDIUM) — The `asChild` pattern allows Card to render as a link or button when the entire card is interactive.

## Notable Props
- `variant`: `"surface" | "classic" | "ghost"`
- `size`: padding density scale
- `asChild`: render as another element (link, button) for interactive cards

## A11y Highlights
- **Keyboard**: Non-interactive by default; with asChild as link/button, uses standard link/button keyboard behavior
- **Screen reader**: No special ARIA; content structure determines accessibility
- **ARIA**: Interactive cards need appropriate role (link or button) via asChild

## Strengths & Gaps
- **Best at**: Maximal content flexibility; asChild for interactive card patterns
- **Missing**: No header/body/footer structure; no image slot; no card-specific interactions
