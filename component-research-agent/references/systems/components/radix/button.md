---
system: Radix UI (WorkOS)
component: Button (no dedicated primitive — use native <button> or Slot)
url: https://www.radix-ui.com/primitives/docs/utilities/slot
last_verified: 2026-03-28
confidence: high
---

# Button (via Slot utility)

## Approach
Radix UI does not provide a Button component in its primitives library. This is intentional: a button is a native HTML element with no accessibility complexity that requires a library abstraction. The Radix team recommends using the native `<button>` element directly and composing it with their `Slot` utility when a component needs to accept a custom render element (e.g., a Next.js `<Link>` as the visual button). The `asChild` pattern — pervasive across all Radix primitives — is the mechanism for polymorphic rendering without sacrificing accessibility.

## Key Decisions
1. **No Button primitive** (HIGH) — Radix's philosophy is to only abstract what browsers cannot provide natively. A `<button>` already has correct role, keyboard behavior, and disabled semantics. Adding a wrapper would only introduce surface area for bugs.
2. **`asChild` for polymorphism** (HIGH) — Instead of a `component` or `as` prop pattern, Radix uses `asChild` on any interactive primitive. When `asChild` is passed, the component merges its props onto the child element rather than rendering its own DOM node. This keeps the rendered HTML clean.
3. **Consumer owns styling** (MEDIUM) — No visual variants, sizes, or loading states exist at this layer. Those are design-system-level concerns that Radix intentionally leaves to consuming systems like shadcn/ui or Radix Themes.

## Notable Props
- `Slot`: merges Radix event handlers and aria props onto a consumer-provided element
- `asChild`: available on all Radix trigger elements (e.g., Dialog.Trigger, Popover.Trigger) to avoid wrapper DOM nodes

## A11y Highlights
- **Keyboard**: Native `<button>` handles Enter/Space, focus outline, disabled state
- **Screen reader**: Native button semantics; no additional ARIA needed for basic cases
- **ARIA**: Consumer adds `aria-label` when button has icon-only content; Radix primitives auto-wire `aria-expanded`, `aria-controls` on trigger variants

## Strengths & Gaps
- **Best at**: Zero-overhead button pattern; `asChild` is uniquely powerful for router link integration
- **Missing**: No design-level button component (variants, sizes, loading) — must be built on top
