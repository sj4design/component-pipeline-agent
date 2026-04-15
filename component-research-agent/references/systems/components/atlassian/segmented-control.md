---
system: Atlassian Design System
component: Not available natively
url: https://atlassian.design/components
last_verified: 2026-03-28
---

# Segmented Control (Atlassian)

## Approach
Atlassian Design System does not include a dedicated segmented control or equivalent component. Unlike Polaris's absence (which is strategic simplicity), Atlassian's gap appears to be a coverage issue rather than a deliberate philosophical stance — the component type simply has not been prioritized in their public component library. Atlassian products do use segmented control-like patterns internally (Jira's board view switcher between Board, Backlog, and Timeline is a prominent example, and Confluence's editor toolbar uses grouped toggle buttons extensively), but these implementations are product-specific rather than part of the public design system. Teams building on the Atlassian Design System are directed to use either ButtonGroup (for connected visual appearance) or Toggle Button patterns (for binary state switching). For the Jira and Confluence platforms specifically, internal teams use a private component that has not been promoted to the public system. This creates an inconsistency: Atlassian's own flagship products use this pattern heavily, but external developers building on the Atlassian platform cannot access a standardized component.

## Key Decisions
1. **Absence as a coverage gap, not a design stance** (HIGH) — Atlassian's missing segmented control differs fundamentally from Polaris's absence in that Atlassian products demonstrably use the pattern while Polaris products genuinely avoid it. This means teams building Atlassian Forge apps who need a view switcher (common in project management tooling that integrates with Jira) have no guidance and must implement from scratch or use a third-party component.
2. **ButtonGroup as visual workaround** (MEDIUM) — Atlassian's ButtonGroup component provides a connected visual appearance for grouped buttons. Using ButtonGroup with controlled selection state and `isSelected` on individual buttons creates a passable segmented control approximation. However, like Polaris's ButtonGroup approach, this lacks roving tabindex keyboard navigation and proper ARIA group semantics.
3. **Toggle buttons in editor toolbars** (MEDIUM) — Atlassian's editor components (used in Confluence) do implement connected toggle button groups for formatting options (bold/italic/underline groupings). These use the correct `aria-pressed` pattern and roving tabindex within the toolbar's overall keyboard navigation. However, this implementation is scoped to the editor component and is not available as a general-purpose segmented control.

## Notable Props
- No dedicated component. The ButtonGroup component from `@atlaskit/button` provides visual grouping.
- Individual buttons within a group support `isSelected` prop to indicate active state.
- No group-level ARIA semantics provided automatically.

## A11y Highlights
- **Keyboard**: ButtonGroup workaround does not implement roving tabindex — each button is an individual Tab stop. This is the main functional shortcoming compared to a purpose-built implementation.
- **Screen reader**: Individual buttons announce with `aria-pressed` if `isSelected` is mapped correctly. No automatic `role="group"` wrapper — teams must compose this manually.
- **ARIA**: No prescribed pattern from the design system. Teams implementing a segmented control pattern with Atlassian primitives must define their own ARIA structure, which leads to inconsistent implementations across the Atlassian app ecosystem.

## Strengths & Gaps
- **Best at**: Nothing — this is a genuine and acknowledged gap in Atlassian's component coverage, particularly notable because Atlassian's own products heavily use the pattern they have not standardized.
- **Missing**: A proper segmented control component with roving tabindex keyboard navigation, `role="group"` with `aria-label`, overflow handling, and size variants — essentially the full feature set that all four other systems with this component provide.
