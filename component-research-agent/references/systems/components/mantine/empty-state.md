---
system: Mantine
component: Not available natively
url: https://mantine.dev/core/
last_verified: 2026-03-29
confidence: high
---

# Empty State

## Approach
Mantine does not provide a dedicated EmptyState component. This is a deliberate scope decision: Mantine focuses on low-level and mid-level UI primitives (inputs, overlays, navigation, layout) and avoids shipping opinionated application-layer patterns like empty states, which are highly product-specific in their illustration, copy, and call-to-action design. The expected Mantine approach is to compose an empty state using existing primitives — typically `Stack` for vertical layout, `Text` for the heading and description, `ThemeIcon` or a custom SVG illustration, and `Button` for the primary action. This pattern is well-documented in community guides and Mantine templates but is not a first-party component.

## Key Decisions
1. **Intentional absence of application patterns** (HIGH) — Mantine's philosophy is to provide building blocks, not application screens. Empty states are considered app-level UI that depends too heavily on product context (tone, illustration style, action labels) to be generalized into a library component.
2. **Composition with Stack + Text + Button** (HIGH) — The recommended pattern leverages Mantine's layout primitives (`Stack`, `Center`, `Group`) with `Text`, `Title`, and `Button`, giving full control over the visual design without fighting a component's built-in opinions.
3. **ThemeIcon for iconography** (MEDIUM) — `ThemeIcon` with a large size and muted color is commonly used as a visual anchor in community-built empty state patterns, providing consistent sizing and color token usage.

## Notable Props
- N/A — no dedicated component; use `Stack`, `Center`, `Text`, `Title`, `Button`, `ThemeIcon` from `@mantine/core`

## A11y Highlights
- **Keyboard**: Depends entirely on developer implementation; action button should be keyboard accessible
- **Screen reader**: No built-in ARIA structure — developer must ensure the heading/description relationship is semantic (e.g., using proper heading levels)
- **ARIA**: No special ARIA patterns required for static empty states; live regions not needed

## Strengths & Gaps
- **Best at**: Full creative freedom in composing empty states using Mantine's design tokens, ensuring visual consistency with the rest of the app
- **Missing**: No official pattern, code snippet, or template in the Mantine docs — developers must rely on community examples or build from scratch
