---
component: Drawer
tier: 3
last_verified: 2026-03-29
---

# Drawer — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Not available — Dialog + CSS positioning | Drawer is Dialog with CSS positioning to a viewport edge; vaul community library adds gesture/snap support. | high |
| Chakra UI | Drawer | Dedicated component with `placement` prop (top/right/bottom/left); size variants from xs to full; shared Modal infrastructure. | high |
| GOV.UK | Not available — full-page navigation model | Linear transactional service model has no place for side-panel overlays; page-to-page navigation is the pattern. | high |
| Base Web | Drawer | `anchor` prop (left/right/top/bottom); shared Modal layer; Overrides for all structural elements; no built-in header/footer sub-components. | medium |
| Fluent 2 | Drawer | `type="overlay"` vs `type="inline"` (pushes content aside); `modalType` controls focus trap intensity; `position="start|end"` for RTL support. | high |
| Gestalt | Sheet | Named "Sheet" not "Drawer"; bottom sheet on mobile, side panel on desktop in one component; `accessibilityLabel` required. | high |
| Mantine | Drawer | Composable sub-components (Drawer.Root/Content/Header/Body); `withOverlay` and `trapFocus` as explicit props; four-directional positioning. | high |
| Orbit | Drawer | Right-anchored for travel filter panels; `fixedFooter` for action buttons; mobile full-screen expansion; `title` for header text. | high |
| Evergreen | SideSheet | Named "SideSheet"; flexible `width` prop for varying detail density (400px status view to 800px schema editor); right-anchored over-list pattern for B2B. | high |
| Nord | Not available — modal and page navigation preferred | Drawers risk obscuring critical clinical data; modal is the sanctioned overlay; page navigation handles hierarchical EHR contexts. | high |

## Key Decision Patterns

Naming variation is significant: Gestalt uses "Sheet," Evergreen uses "SideSheet," Orbit and others use "Drawer" — reflecting genuine disagreement about whether this pattern is a "drawer" (furniture metaphor), a "sheet" (paper overlay metaphor), or a "side panel" (positional description). Gestalt's "Sheet" framing is the most product-honest: the component behaves like a sheet of paper placed over the current view, which is more accurate than a furniture drawer metaphor.

Fluent 2's `type="inline"` is the most distinctive T3 drawer feature. Inline drawers push the main content aside rather than overlaying it, creating a split-panel layout without requiring a separate layout component. This pattern powers Teams' persistent sidebar and Office's file-browser panel — contexts where the panel and main content must be simultaneously visible and interactive. No other T3 system supports this non-modal side panel mode natively.

Gestalt's responsive behavior — bottom sheet on mobile, side panel on desktop — is the only T3 system that handles the two-platform drawer problem in a single component. On mobile (Pinterest's dominant platform), a side drawer is physically difficult to activate and wastes screen width; a bottom sheet is the correct native pattern. Managing this dual behavior in one component is the most practical mobile-first drawer design in the set.

Nord and GOV.UK's absences represent two distinct philosophical positions. GOV.UK's absence is about avoiding JavaScript complexity in a progressive enhancement model. Nord's absence is a patient safety argument: overlays that partially obscure clinical data create attention and cross-reference problems that page navigation avoids entirely.

## A11y Consensus

- All drawer implementations use `role="dialog"` with `aria-modal="true"` — drawers are semantically dialogs with edge-anchored CSS positioning.
- Background content must receive `aria-hidden="true"` when a modal drawer is open, preventing virtual cursor escape into obscured content.
- Focus must move into the drawer on open, be trapped within it while open, and return to the trigger element on close — this is the universal focus management contract.
- Escape key must close all overlay drawers — this is consistent across all T3 implementations that provide a drawer.
- The drawer's heading (title) must be linked to the dialog role via `aria-labelledby` — all systems with a structured header sub-component implement this automatically.

## Recommended Use

Reference T3 drawer approaches when deciding on overlay vs. inline panel type (Fluent 2 is the reference for push-aside inline panels), mobile bottom-sheet vs. side-panel behavior (Gestalt's unified Sheet), and naming convention (the "Sheet" framing more accurately communicates the overlay behavior than "Drawer"). Nord's absence rationale is the reference for healthcare and clinical contexts where overlay patterns have workflow implications.
