---
system: shadcn/ui
component: Toast / Sonner
url: https://ui.shadcn.com/docs/components/sonner
last_verified: 2026-03-28
confidence: high
---

# Toast (Sonner)

## Approach
shadcn/ui originally provided a custom Toast component but now recommends Sonner (by Emil Kowalski) as the preferred toast solution. Sonner is a highly polished, opinionated toast library with smooth animations and a clean stacking/expanding interaction. The Sonner integration in shadcn/ui provides a beautifully animated, accessible toast system that has become the de facto standard for shadcn/ui applications. The original Toast component is still available but Sonner is the current recommendation.

## Key Decisions
1. **Sonner over custom implementation** (HIGH) — Recommending best-in-class external library over maintaining a custom implementation, consistent with shadcn/ui's philosophy of composing from quality primitives.
2. **Stacking with expand on hover** (HIGH) — Sonner's signature UX: toasts stack with only the top few visible; hovering expands the stack to show all, providing a tidy default state with accessible full viewing.
3. **Rich toast types** (MEDIUM) — Sonner provides success, error, warning, info, loading, and promise-based toasts (auto-transitions from loading to success/error when a Promise resolves), ideal for async operations.

## Notable Props
- `toast.success()` / `toast.error()` / `toast.loading()`: Imperative API methods
- `toast.promise()`: Handles loading→success/error transitions automatically
- `duration`: Auto-dismiss duration per toast
- `action`: Optional action button configuration `{label, onClick}`
- `position`: Toast stack position on screen

## A11y Highlights
- **Keyboard**: Dismiss button accessible; action button accessible; Escape dismisses all
- **Screen reader**: Toasts announced via aria-live; Sonner uses role="status" or "alert" based on type
- **ARIA**: aria-live regions managed by Sonner; proper live region politeness per toast type

## Strengths & Gaps
- **Best at**: Promise-based loading→success/error transitions; stacking expand-on-hover UX; rich toast type variety
- **Missing**: Less control over ARIA details vs custom implementations; Sonner is external dependency
