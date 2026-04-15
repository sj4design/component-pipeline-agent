---
system: shadcn/ui
component: Spinner (no built-in)
url: https://ui.shadcn.com/docs/components
last_verified: 2026-03-28
confidence: high
---

# Spinner

## Approach
shadcn/ui notably does not include a built-in Spinner component in its core component set. Instead, loading states are typically handled by: adding a Lucide icon (Loader2) with an animate-spin Tailwind class, adding an animate-spin class to any SVG, or using the loading prop on Button. This reflects shadcn/ui's minimal approach — a spinner is simple enough that a standard pattern suffices without a dedicated component.

## Key Decisions
1. **Lucide Loader2 + animate-spin pattern** (HIGH) — The community standard for shadcn/ui loading is `<Loader2 className="animate-spin" />` — a single icon with Tailwind animation class, no component needed.
2. **No dedicated component by design** (HIGH) — shadcn/ui explicitly takes the position that some very simple utilities (like a spinning loader icon) don't need to be formalized into a component with its own API.
3. **Developer adds aria-label** (MEDIUM) — Since there's no component, the developer is responsible for adding aria-label or aria-hidden to the spinner icon depending on context.

## Notable Props
- Not applicable — use `<Loader2 className="h-4 w-4 animate-spin" aria-label="Loading" />`

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: Developer must provide aria-label or use aria-hidden + separate status text
- **ARIA**: No automated ARIA — full developer responsibility; aria-label or sr-only text needed

## Strengths & Gaps
- **Best at**: Zero-friction implementation via Lucide icon + Tailwind class; no unnecessary abstraction
- **Missing**: No standardized accessible spinner; ARIA handling left entirely to developer; no size system
