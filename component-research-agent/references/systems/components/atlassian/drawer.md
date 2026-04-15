---
system: Atlassian Design System
component: Drawer (planned for deprecation)
url: https://atlassian.design/components/drawer
last_verified: 2026-03-28
---

# Drawer

## Approach

Atlassian provides a Drawer component — a panel that slides in from the left side of the screen — but has flagged it for deprecation in favor of Modal, particularly for teams using the modern Navigation system. This mirrors Polaris's trajectory with Sheet, though for slightly different reasons. Atlassian's products (Jira, Confluence, Trello) have mature usage of the Drawer pattern, which means the component exists and is widely deployed, but the design system team has concluded that the modern Navigation architecture makes Modal a better fit for the overlay panel use case going forward.

The Drawer's design is responsive: it uses `width: min(90%, 20pc)` — a responsive constraint that limits it to 90% of the viewport on small screens and a fixed panel width (approximately 320px) on larger screens. This prevents the common drawer antipattern where a fixed-width drawer occupies most of a small screen, effectively becoming a full-page overlay without the accessibility contract of a modal. The slide-in animation comes from the left edge using CSS transitions with cubic-bezier easing, matching the motion principles in Atlassian's design language. A backdrop (blanket) is rendered behind the panel at z-index 600 to indicate that background content is temporarily deprioritized.

## Key Decisions

1. **Left-only slide direction** (MEDIUM) — Unlike Ant Design (which supports all four edges) or M3 Side Sheets (which support the trailing/right edge), Atlassian's Drawer always enters from the left. This is an intentional consistency decision: Atlassian products use the left edge for navigation infrastructure (sidebar, project navigation), and Drawer extends that spatial convention by entering from the same direction. Users build a spatial memory model where "left edge = navigation and context."

2. **Responsive width via min()** (MEDIUM) — The `min(90%, 20pc)` width calculation prevents the Drawer from behaving like a full-screen takeover on mobile while maintaining a usable fixed width on desktop. This is technically more sophisticated than most systems' simple fixed-width drawers and demonstrates awareness that the same component must work across breakpoints without a separate mobile implementation.

3. **Planned deprecation in favor of Modal** (HIGH) — The documentation warns that Drawer is planned for deprecation with the modern Navigation system. The reasoning aligns with Shopify's: when the new Navigation system is in use, Modal provides a better interaction contract for overlay content. The deprecation timeline has not been published, but teams starting new features are directed to Modal instead of Drawer.

4. **Persistent z-index at 600** (LOW) — Drawer sits at z-index 600, placing it in a specific layer within Atlassian's stacking context. This is part of a larger layering system that governs how tooltips (z-index ~700), modals (z-index ~510), and navigation panels interact. Having this layer explicitly defined prevents stacking conflicts between Drawer and other Atlassian DS components in multi-panel layouts.

5. **Sizing modes** (MEDIUM) — Atlassian's Drawer supports `narrow`, `medium`, `wide`, `full`, and `extended` sizes. These named sizes correspond to fixed widths appropriate for different content densities: narrow for simple lists or settings, wide for forms or detail content, full for immersive tasks. Named sizes rather than arbitrary pixel values ensure consistency across products and reduce design negotiation overhead.

## Notable Props

- `width`: `'narrow' | 'medium' | 'wide' | 'full' | 'extended'` — named sizes that map to specific pixel values in the design token system.
- `onClose`: Required callback for dismissal. The Drawer does not self-dismiss; the consumer controls closure state.
- `isOpen`: Controlled open state. Atlassian does not provide an uncontrolled Drawer.

## A11y Highlights

- **Keyboard**: Escape should close the Drawer and return focus to the trigger. Focus should be trapped within the Drawer while open.
- **Screen reader**: The Drawer uses overlay semantics and should present as a dialog region to screen readers while open. Background content behind the backdrop should be inerted.
- **ARIA**: `aria-label` is required on the Drawer for accessible naming (the ESLint plugin `use-drawer-label` enforces this). Without a label, screen reader users cannot identify the purpose of the overlay they have entered.

## Strengths & Gaps

- **Best at**: Named size variants with spatial consistency (left-entry matches navigation infrastructure) make Atlassian's Drawer the most ergonomically consistent drawer in any Tier 1 system for products with left-side navigation.
- **Missing**: The planned deprecation without a clear timeline creates uncertainty for teams choosing whether to use Drawer in new features, and the left-only direction is limiting for RTL layout scenarios.
