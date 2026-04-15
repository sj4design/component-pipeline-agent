---
component: Bottom Sheet
tier: 3
last_verified: 2026-03-31
---

# Bottom Sheet — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Not available — Dialog + Vaul community library | No built-in bottom sheet; Dialog with CSS bottom-positioning for basic overlay; Vaul (community) is the standard pairing for gesture-driven bottom sheets in Radix-based apps. | high |
| Chakra UI | Drawer with `placement="bottom"` | Drawer supports `placement="bottom"` for a bottom-sliding overlay; size variants (xs to full); no drag handle or snap points — it is a positioned drawer, not a gesture-driven bottom sheet. | high |
| GOV.UK | Not available — progressive enhancement model | No overlay patterns at all; GOV.UK's transactional service model uses full-page navigation exclusively; JavaScript-dependent gesture overlays are incompatible with their progressive enhancement approach. | high |
| Base Web | Not available — Drawer with `anchor="bottom"` | Drawer supports `anchor="bottom"` for a bottom-positioned panel; Overrides API for structural customization; no drag handle or snap points — same "bottom drawer" pattern as Chakra. | medium |
| Fluent 2 | Drawer with `position="bottom"` | Drawer supports bottom positioning; `type="overlay"` for modal or `type="inline"` for push-aside; no drag handle or snap points in web implementation; Teams mobile uses native bottom sheets. | high |
| Gestalt | Sheet (responsive: bottom on mobile, side on desktop) | Sheet component automatically renders as a bottom sheet on mobile viewports and a side panel on desktop — the only T3 system that unifies both patterns in a single component. `accessibilityLabel` required. Partial-height "peek" behavior supported. | high |
| Mantine | Drawer with `position="bottom"` | Drawer supports `position="bottom"`; composable sub-components (Drawer.Root/Content/Header/Body); `withOverlay` toggle; no drag handle or snap points. | high |
| Orbit | Not available — Drawer is right-anchored only | Drawer is right-anchored for travel filter panels; mobile expansion to full-screen; no bottom placement option. | high |
| Evergreen | Not available — SideSheet is right-anchored only | SideSheet is right-anchored for B2B detail panels; no bottom placement; mobile strategy is full-screen. | high |
| Nord | Not available — overlays avoided for clinical safety | No drawer or bottom sheet; overlays risk obscuring clinical data in EHR contexts; modal and page navigation are the sanctioned patterns for healthcare. | high |

## Key Decision Patterns

**Gestalt Sheet is the Tier 3 standout:** Pinterest's Sheet is the only T3 component that bridges the mobile bottom sheet and desktop side panel in a single component. On mobile viewports (Pinterest's dominant platform), Sheet renders from the bottom with partial-height support — the user sees a "peek" of the content that can be expanded. On desktop, the same Sheet renders as a right-side panel. This responsive duality solves the "bottom sheet on mobile, side panel on desktop" problem without requiring two separate components or conditional rendering logic.

**"Bottom Drawer" is not "Bottom Sheet":** Chakra UI, Base Web, Mantine, and Fluent 2 all support `placement/position/anchor="bottom"` on their Drawer components. This creates a bottom-positioned overlay panel, but none of these provide drag handle, snap points/detents, swipe-to-dismiss, or nested scrolling — the defining interactions of a true bottom sheet. The distinction matters: a "bottom drawer" is a CSS-positioned modal; a "bottom sheet" is a gesture-driven progressive disclosure surface. Teams needing true bottom sheet behavior must pair these Drawer components with a gesture library like Vaul or build custom.

**Fluent 2 inline bottom panel:** Fluent 2's `type="inline"` Drawer with bottom position creates a push-aside bottom panel — main content shrinks upward to accommodate the panel. This non-overlay bottom panel pattern is unique in T3 and useful for persistent toolbars, media controls, or chat input areas that need to coexist with scrollable content.

**Absent systems reflect domain constraints:** GOV.UK (progressive enhancement — no JavaScript-dependent gestures), Nord (clinical safety — overlays obscure patient data), Orbit (travel booking — right-side filters only), and Evergreen (B2B SaaS — right-side detail panels) all lack bottom sheets for domain-specific reasons. Their absence is intentional, not a gap.

**Radix + Vaul is the de facto standard:** For Radix-based applications (which includes shadcn/ui from Tier 2), the Vaul library by Emil Kowalski has become the standard bottom sheet solution. Vaul provides drag handle, snap points, swipe-to-dismiss, background scaling, and nested scrolling — all the behaviors that Radix's Dialog lacks. This Radix + Vaul pairing is the most widely adopted web bottom sheet pattern in the React ecosystem.

## A11y Consensus

- All bottom-positioned drawers use `role="dialog"` with `aria-modal="true"` — a bottom sheet is semantically a dialog regardless of its position or gesture behavior.
- Background content must receive `aria-hidden="true"` when a modal bottom sheet is open, preventing virtual cursor navigation into obscured content.
- Focus must move into the bottom sheet on open, be trapped within it while open, and return to the trigger element on close — the universal dialog focus contract applies.
- Escape key must close the bottom sheet — consistent across all implementations that provide a bottom overlay.
- Drag handle requires keyboard accessibility: must be focusable, must respond to Arrow keys for resize, and must have an accessible name (e.g., `aria-label="Resize sheet"`). WCAG 2.5.1 requires that any gesture-driven interaction has a non-gesture alternative.
- Gestalt requires `accessibilityLabel` as a mandatory prop — enforcing accessible naming at the API level rather than relying on developer discipline.

## Recommended Use

Reference Gestalt Sheet for the responsive bottom-sheet-on-mobile / side-panel-on-desktop pattern — it is the most elegant single-component solution. Reference Radix + Vaul for true gesture-driven bottom sheet behavior in React applications. Use Chakra/Mantine/Base Web Drawer with bottom placement for simple bottom overlay panels that don't need drag/snap behavior. Reference Fluent 2's inline bottom Drawer for persistent non-overlay bottom panels. GOV.UK and Nord's absences are the reference for domains where bottom sheets are architecturally inappropriate.