---
system: shadcn/ui
component: Skeleton
url: https://ui.shadcn.com/docs/components/skeleton
last_verified: 2026-03-28
confidence: high
---

# Skeleton

## Approach
shadcn/ui's Skeleton is a simple animated pulse placeholder div. It's one of the most minimal components in the system — a single div with Tailwind CSS pulse animation (animate-pulse) and rounded corners. Developers shape it with className (width, height, border-radius via Tailwind) to match any content shape. The pattern is to build inline skeleton layouts using multiple Skeleton divs positioned like the actual content.

## Key Decisions
1. **Tailwind animate-pulse** (HIGH) — CSS keyframe animation via Tailwind's animate-pulse class provides a smooth loading pulse without JavaScript, respects prefers-reduced-motion automatically via Tailwind's media query.
2. **Compose any layout** (HIGH) — Multiple Skeleton components are composed to build any skeleton layout (card skeleton: rectangle + two lines + button), giving maximum flexibility.
3. **Zero abstraction** (HIGH) — The component is genuinely just a styled div — one of the most minimal components in the system; anything more complex the developer writes directly.

## Notable Props
- `className`: Tailwind classes for sizing and shape (rounded-full for circles, specific w-/h- for sizing)

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: aria-hidden on individual skeletons; container aria-busy="true" and aria-label for loading context
- **ARIA**: Developer must add aria-busy and aria-hidden; shadcn/ui provides no ARIA automatically (it's just a div)

## Strengths & Gaps
- **Best at**: Tailwind-native composition; prefers-reduced-motion via Tailwind; zero abstraction; any shape/layout
- **Missing**: No ARIA built-in; developer must add aria-busy; no pre-built content-type variants
