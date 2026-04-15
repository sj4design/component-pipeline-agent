---
system: Mantine
component: Breadcrumbs
url: https://mantine.dev/core/breadcrumbs/
last_verified: 2026-03-29
confidence: high
---

# Breadcrumb

## Approach
Mantine provides a `Breadcrumbs` component that renders a horizontal list of navigation links separated by a configurable separator. Children are passed as an array of React nodes (typically `Anchor` components or plain strings), and the separator is automatically inserted between each item. The separator defaults to `/` but accepts any React node, enabling icon-based separators. The component is a thin wrapper that handles separator injection and flexbox layout. It is polymorphic and integrates with React Router or Next.js Link by using Mantine's `Anchor` with a `component` prop override.

## Key Decisions
1. **Children-as-items pattern** (HIGH) — Rather than an items array prop, Mantine accepts children directly. This gives developers full control over each breadcrumb item's rendering (plain text, anchor, custom component) without enforcing a data schema.
2. **Configurable separator** (MEDIUM) — The `separator` prop accepts any React node, meaning icons from any library or custom SVGs can be used as dividers — consistent with Mantine's icon-agnostic philosophy.
3. **No truncation built in** (MEDIUM) — Mantine does not provide automatic collapsing of long breadcrumb trails. This is intentional; complex truncation is left to application-level logic to keep the component lightweight.

## Notable Props
- `separator`: React node rendered between items (default: `"/"`)
- `separatorMargin`: Spacing around the separator
- Children: Any React nodes, typically `Anchor` or `Text` components

## A11y Highlights
- **Keyboard**: Each `Anchor` child is keyboard-navigable; Tab moves between links
- **Screen reader**: Wrap in `<nav aria-label="breadcrumb">` manually — the component itself does not add the nav landmark
- **ARIA**: The last item should have `aria-current="page"` applied by the developer; not automatic

## Strengths & Gaps
- **Best at**: Lightweight, flexible separator-injecting breadcrumb for apps already using Mantine's Anchor and routing integrations
- **Missing**: No automatic `<nav>` landmark wrapping or `aria-current` on the last item — accessibility scaffolding must be added manually
