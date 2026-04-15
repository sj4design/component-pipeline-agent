---
system: shadcn/ui
component: Card
url: https://ui.shadcn.com/docs/components/card
last_verified: 2026-03-28
confidence: high
---

# Card

## Approach
shadcn/ui's Card is a structured container with sub-components: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter. This provides a clear content structure while remaining flexible — CardHeader, CardContent, and CardFooter can be used or omitted as needed. The component is widely used as a general-purpose content container and is one of the most commonly referenced shadcn/ui components in application development.

## Key Decisions
1. **Structured sub-components** (HIGH) — Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter provide semantic structure that guides consistent card composition without being overly rigid.
2. **Common application pattern** (HIGH) — shadcn/ui cards are commonly used as dashboard widget containers, settings form sections, and feature highlight panels, making CardHeader with title+description a very common pattern.
3. **No interactive card variant prescribed** (MEDIUM) — Interactive cards require developers to wrap or compose with appropriate interactive elements (Link, Button) rather than an opinionated interactive card component.

## Notable Props
- No complex props — components are structural wrappers with className extension
- `className`: Tailwind customization on any sub-component

## A11y Highlights
- **Keyboard**: Non-interactive; composing with interactive elements follows their keyboard patterns
- **Screen reader**: Presentational container; CardTitle as heading provides navigation landmark in some contexts
- **ARIA**: Developers control ARIA by choosing semantic elements within card slots

## Strengths & Gaps
- **Best at**: Structured header/title/description/content/footer pattern; widely understood in the React ecosystem; very flexible
- **Missing**: No built-in media/image slot; no interactive card ARIA guidance; no elevation/shadow variants beyond default
