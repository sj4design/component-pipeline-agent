---
system: Gestalt (Pinterest)
component: Not available natively
url: N/A
last_verified: 2026-03-29
confidence: high
---

# Segmented Control

## Approach
Gestalt has no SegmentedControl component in its public design system. While Pinterest uses a segmented control-style toggle internally in some filtering and view-switching contexts (e.g., toggling between "Grid" and "List" views, or switching between "Pins" and "Boards" on a profile), this pattern has not been generalized and published as a public Gestalt component. Teams at Pinterest implement this using Gestalt's Tabs component for view-switching contexts, or compose a toggle group using Button components with selected state management. The absence from the public system reflects that Tabs covers the most important semantic use case (view/section switching) and the remaining use cases are addressed through custom composition. Gestalt's philosophy leans toward fewer, more correct components rather than multiple components with overlapping interaction models — SegmentedControl and Tabs are too similar in behavior to justify both in the public system.

## Key Decisions
1. **Tabs covers the primary semantic use case** (HIGH) — View switching and section toggling — the most common SegmentedControl use case — are handled by Gestalt's Tabs component, which provides correct ARIA tablist/tab/tabpanel semantics. A SegmentedControl would overlap with Tabs while adding ambiguity about when to use which.
2. **Toggle compositions for binary/tertiary switches** (HIGH) — For simple 2–3 option toggles (e.g., grid vs. list view), Pinterest teams compose their own toggle using Button groups with mutual exclusion logic. This provides flexibility without encoding a pattern that is used inconsistently across the product.
3. **Mobile-first concern with segmented controls** (MEDIUM) — Segmented controls with more than 3 options become unusable on narrow mobile screens. Pinterest's mobile-first mandate discourages patterns that degrade significantly on small viewports unless there is a clear responsive strategy, which a generic SegmentedControl component would struggle to encode.
4. **Internal vs. public system scope** (MEDIUM) — Pinterest's internal product uses a SegmentedControl in specific contexts, but the pattern is sufficiently product-specific (filter layouts, feed controls) that it has not been generalized for the public Gestalt system. Public Gestalt focuses on widely applicable primitives.

## Notable Props
- N/A — Component does not exist in Gestalt. Use Tabs for view-switching; compose Button groups for binary toggles.

## A11y Highlights
- **Keyboard**: N/A for a dedicated component. Tabs provides correct keyboard navigation (arrow keys within tab list, Tab to reach tab panel); composed Button toggles require manual `aria-pressed` management.
- **Screen reader**: N/A for a dedicated component. Tabs uses `role="tablist"`, `role="tab"`, `role="tabpanel"` correctly; custom Button toggles need `aria-pressed` or `aria-selected` with `role="group"` for screen reader context.
- **ARIA**: N/A for a dedicated component.

## Strengths & Gaps
- **Best at**: N/A as a dedicated component. Tabs handles view-switching well with correct ARIA semantics.
- **Missing**: No compact, visually cohesive toggle group for non-navigational binary or tertiary choices (e.g., view density control, sort direction, unit toggle); teams building filtering interfaces or view controls must implement their own, leading to visual and behavioral inconsistency across Pinterest's product surfaces; no standard pattern for the very common "grid/list view" toggle that appears in multiple parts of the product.
