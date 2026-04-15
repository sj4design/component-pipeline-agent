---
component: Bottom Sheet
tier: 2
last_verified: 2026-03-31
---

# Bottom Sheet — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Not available — Modal as alternative | No bottom sheet or bottom-positioned overlay; Modal serves all overlay content needs; mobile views use full-screen Modal. | high |
| Salesforce Lightning | Not available — Docked Utility Bar as closest | Docked Utility Bar at viewport bottom contains minimizable utility panels (phone, notes, history); not a bottom sheet but fills "persistent bottom panel" role in Salesforce CRM. | high |
| GitHub Primer | Not available — Dialog or ActionSheet | No bottom sheet; Dialog handles overlay content; ActionSheet (mobile) provides a bottom-positioned action list on mobile viewports — closest to bottom sheet. | high |
| shadcn/ui | Drawer (via Vaul library) | True bottom sheet with drag handle, snap points, swipe-to-dismiss, and spring animations. Built on Vaul — the most complete web bottom sheet implementation in Tier 2. Supports `shouldScaleBackground` for iOS-style scaling effect. | high |
| Playbook | Not available — Drawer as alternative | No bottom-specific component; Drawer provides side panel overlays; no bottom placement option documented. | medium |
| REI Cedar | Not available — Modal as alternative | No drawer or bottom sheet; Modal serves all overlay content needs; Cedar's outdoor retail context is desktop-first. | medium |
| Wise Design | Drawer (bottom-positioned) | Mobile-first bottom drawer for actions and confirmations; designed for Wise's money transfer mobile flows; simplified bottom overlay without full snap point behavior. | low |
| Dell Design System | Not available — Drawer/Modal as alternative | Enterprise desktop focus; no mobile-specific bottom sheet pattern; Drawer and Modal handle overlay needs. | low |

## Key Decision Patterns

**shadcn/ui Drawer (Vaul) is the Tier 2 reference:** shadcn/ui's Drawer, built on Emil Kowalski's Vaul library, is the only Tier 2 system with a true bottom sheet implementation featuring drag handle, snap points (detents), swipe-to-dismiss, nested scrolling, and background scaling. It provides the `snapPoints` prop for defining detent heights (e.g., `["148px", "355px", 1]`), `fadeFromIndex` for scrim opacity transitions between snap points, and `shouldScaleBackground` for the iOS-style background push-back effect. This is the web standard for mobile-native bottom sheet behavior.

**Lightning Docked Utility Bar — unique persistent bottom panel:** Salesforce Lightning's Docked Utility Bar is not a bottom sheet but solves a related problem — persistent bottom-anchored panels for CRM utilities (softphone, notes, recent items). Panels are minimizable to a tab bar at the viewport bottom and expandable to a fixed-height panel. This "always-available bottom tools" pattern is distinct from a dismissible bottom sheet but relevant for enterprise "bottom panel" research.

**Primer ActionSheet — mobile action list from bottom:** GitHub Primer's ActionSheet is a bottom-anchored action menu on mobile viewports. It provides a list of actions that slide up from the bottom — closer to iOS Action Sheet than a content-rich bottom sheet. No drag handle or snap points, but it establishes that Primer uses bottom-positioned overlays specifically for action selection on mobile.

**Most Tier 2 systems lack bottom sheets entirely:** 5 of 8 systems have no bottom sheet or bottom-positioned component. This reflects the enterprise/desktop focus of most Tier 2 systems — bottom sheets are a mobile-native pattern that desktop-first design systems have not prioritized.

## A11y Consensus

- shadcn/ui Drawer (Vaul): `role="dialog"` via underlying Dialog primitive; `aria-labelledby` for drawer title; Escape to close; focus management on open/close
- Drag handle must have accessible label (`aria-label="Drag to resize"` or equivalent) and keyboard alternative for expand/collapse
- Snap points must be reachable via keyboard — drag-only interaction excludes keyboard and assistive technology users
- Background content receives `aria-hidden="true"` when modal bottom sheet is open
- Swipe-to-dismiss must have a visible close button alternative — gesture-only dismiss fails WCAG 2.5.1 (Pointer Gestures)

## Recommended Use

Use shadcn/ui Drawer (Vaul) as the primary reference for web bottom sheet implementation — it is the most complete open-source web bottom sheet with gesture support, snap points, and accessible dismiss. Reference Lightning's Docked Utility Bar for persistent bottom panel patterns in enterprise CRM contexts. Reference Primer's ActionSheet for bottom-anchored action lists on mobile. For systems without a bottom sheet, the common alternative is full-screen Modal on mobile viewports.