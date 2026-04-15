---
system: Carbon (IBM)
component: Not available natively (UI Shell Right Panel + Modal as workarounds)
url: https://carbondesignsystem.com/components/UI-shell-right-panel/usage/
last_verified: 2026-03-28
---

# Drawer

## Approach

Carbon does not have a dedicated Drawer component. This is a considered architectural decision tied to IBM's enterprise product philosophy. Carbon's design team categorizes overlay panels into two distinct use cases with different behavioral contracts: navigation/utility panels that are part of the persistent app shell infrastructure (handled by the UI Shell's left and right panel components), and temporary overlay panels for content editing or detail views (handled by Modal). A mid-category "Drawer" that is both temporary and edge-anchored is not provided as a standalone primitive because Carbon's guidance steers teams toward one of the two existing models depending on the content's nature.

The UI Shell Right Panel is the closest structural analogue to a right-anchored Drawer in enterprise tools. It is invoked by header icons, spans the full viewport height, has a consistent width, and is flush to the right edge. However, it is explicitly part of the shell architecture — designed for notifications, help panels, settings — not for arbitrary content. For temporary overlay panels that don't belong in the shell (e.g., a side panel for editing a record inline), Carbon's implicit recommendation is Modal, which may be sized and positioned as a side panel if needed. Community discussions in Carbon's GitHub repository (issue #8481) show teams requesting a dedicated Side Panel component, indicating the gap is felt in practice.

## Key Decisions

1. **No standalone Drawer — Modal is the escalation path** (HIGH) — Carbon's architectural decision to omit a Drawer forces teams to use Modal for temporary overlay panels. The reasoning: Modal provides the strongest accessibility guarantees (full focus trap, backdrop, aria-modal), and Carbon's team prioritized correctness over convenience. A partially-accessible "lightweight Drawer" was considered worse than a fully-accessible Modal that happens to be positioned on the side.

2. **UI Shell Right Panel for persistent panels** (HIGH) — For utility panels (notifications, help, search, settings) that belong to the app infrastructure, the UI Shell Right Panel is the designated solution. It is invoked from header icons, has consistent behavior across IBM products, and is designed to be part of the persistent shell rather than temporary overlay content. Teams using it for non-shell content are misusing the component.

3. **Modal can serve as a side panel** (MEDIUM) — Carbon's Modal component supports size variants and custom positioning. A "large" Modal with edge-anchored positioning and a slide animation can visually replicate a Drawer. This approach inherits all of Modal's accessibility infrastructure (focus trap, Escape dismiss, return focus, aria-modal) at the cost of being stylistically heavier than a lightweight Drawer.

4. **Side panel gap acknowledged in community** (MEDIUM) — The Carbon GitHub issue tracker shows multiple team requests for a dedicated Side Panel/Drawer component separate from both the UI Shell and Modal. This indicates that the Drawer use case exists in IBM product teams but is being served by workarounds. The absence is a real gap, not just a documentation omission.

## Notable Props

- No Drawer component; no dedicated props.
- UI Shell Right Panel: controlled visibility via the shell orchestration layer, not a standalone prop.
- Modal workaround: `size` (xs/sm/md/lg) and custom class overrides for positioning.

## A11y Highlights

- **Keyboard**: Modal (used as workaround) fully traps focus. Escape closes. Focus returns to trigger on close.
- **Screen reader**: Modal uses `role="dialog"` with `aria-modal="true"`. Background content is inerted by the modal overlay. If using UI Shell Right Panel, it does not use modal semantics since it is not a blocking overlay.
- **ARIA**: Modal approach inherits correct ARIA structure. Custom Drawer implementations built outside Carbon's component library must implement focus management independently.

## Strengths & Gaps

- **Best at**: The Modal used as a side panel has the most robust accessibility implementation in any Tier 1 system for overlay panels, since it inherits Carbon's well-tested Modal infrastructure.
- **Missing**: A dedicated Drawer component for the common use case of temporary, edge-anchored, non-blocking side panels — a real gap that the Carbon community has flagged repeatedly.
