---
system: Mantine
component: Card
url: https://mantine.dev/core/card/
last_verified: 2026-03-28
confidence: high
---

# Card

## Approach
Mantine's Card is a surface container with Card.Section for full-bleed sections (images, header bands, footer bands). The Card.Section allows images and media to extend to the card edges without padding, while the Card body maintains its padding. This is one of Mantine's most practical design decisions — the pattern of "image goes to edges, content has padding" is extremely common but poorly handled by most card components.

## Key Decisions
1. **Card.Section for full-bleed content** (HIGH) — `<Card.Section>` removes padding from its content area, allowing images to span the full card width. The `inheritPadding` prop gives a Section the card's horizontal padding. This is more flexible than a fixed image slot.
2. **withBorder on Card.Section** (MEDIUM) — Adds a border between sections and the card body. Used for header/footer sections with visual separation.
3. **Component/renderRoot for interactive cards** (MEDIUM) — `component="a"` or `component={Link}` makes the entire card an interactive element. Combined with Mantine's polymorphic rendering, this covers link cards cleanly.

## Notable Props
- `shadow`: shadow size token
- `padding`: inner padding
- `radius`: border radius
- `withBorder`: adds outer card border
- Card.Section: `withBorder`, `inheritPadding`, `component`
- `component`: polymorphic (render as `a`, link, button)

## A11y Highlights
- **Keyboard**: Interactive cards via component prop use correct keyboard behavior
- **Screen reader**: Card content is read in order; interactive cards announced as links/buttons
- **ARIA**: Polymorphic rendering preserves correct role semantics

## Strengths & Gaps
- **Best at**: Card.Section for full-bleed images; polymorphic rendering; practical edge-to-edge image pattern
- **Missing**: No predefined header/body/footer structure (more flexible but less opinionated than Chakra)
