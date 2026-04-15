---
system: GitHub Primer
component: Box (Card)
url: https://primer.style/components/box
last_verified: 2026-03-28
confidence: high
---

# Box (Card)

## Approach
GitHub Primer does not have a dedicated "Card" component. Instead, Box — Primer's polymorphic layout primitive — is used to create card-like containers with border, borderRadius, padding, and boxShadow props. This reflects GitHub's composable approach where a versatile primitive replaces specialized components. For specific card patterns like repository cards and user cards, Primer provides more specialized components like Link (for clickable cards) composing Box styling.

## Key Decisions
1. **Box as universal container** (HIGH) — Box handles card-like containers through props (borderWidth, borderStyle, borderColor, borderRadius, p, boxShadow) rather than a separate Card component, reducing the component API surface.
2. **Interactive card as Link + Box** (HIGH) — For clickable cards (repository cards, user profile cards), Primer composes Box-styled containers with Primer's Link for correct interactive semantics.
3. **GitHub-specific card patterns** (MEDIUM) — Specific implementations like the repository card have custom components built on Box, reflecting the GitHub-specific nature of content cards in the system.

## Notable Props
- `borderWidth`, `borderStyle`, `borderColor`: Card border styling
- `borderRadius`: Rounded corners
- `p` / `padding`: Content padding
- `boxShadow`: Card elevation
- `as`: Polymorphic element type

## A11y Highlights
- **Keyboard**: Box as div is non-interactive; composed with Link/Button for interactive cards
- **Screen reader**: Structural container; composed patterns (Link cards) provide correct interactive semantics
- **ARIA**: No specific card ARIA; composed with Link provides correct link/button semantics for interactive cards

## Strengths & Gaps
- **Best at**: Flexible card composition with Primer's full styling system; no opinionated card structure
- **Missing**: No dedicated Card component with header/body/footer; no built-in card structure enforcement
