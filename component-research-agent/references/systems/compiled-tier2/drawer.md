---
component: Drawer
tier: 2
last_verified: 2026-03-28
---

# Drawer — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | SidePanel | Side panel overlay; right-anchored; focus trap; non-modal option | high |
| Salesforce Lightning | Panel / Docked Utility Bar | Right panel for record details; docked bottom utility bar | high |
| GitHub Primer | Sheet (via Dialog) | No dedicated Drawer; overlay Dialog can approximate; AnchoredOverlay | high |
| shadcn/ui | Sheet + Drawer | Sheet (any side, full Dialog); Drawer (Vaul library, bottom sheet with snap points) | high |
| Playbook | Drawer | Side content overlay; dual React/Rails | medium |
| REI Cedar | CdrDrawer (not present) | Not present; use Modal for overlay content | medium |
| Wise Design | Drawer | Mobile-first bottom sheet for actions | low |
| Dell Design System | Drawer | Enterprise side panel overlays | low |

## Key Decision Patterns

**Sheet vs. Drawer:** shadcn/ui provides two distinct components: Sheet (a Dialog variant that slides in from any side — top/right/bottom/left) and Drawer (built on Vaul, specifically for mobile-style bottom sheets with drag handles and snap points). These serve different interaction paradigms.

**Vaul library (shadcn Drawer):** Vaul provides native-feeling bottom drawer with drag-to-dismiss gesture, snap points (partially open, fully open states), and smooth spring animation — following mobile OS drawer conventions.

**Lightning's Docked Bar:** Lightning uniquely provides a Docked Utility Bar — a persistent bottom bar containing minimizable utility panels (e.g., Notes, Recent Items, Open CTI phone) for Salesforce sales workflows. Not a traditional drawer but fills a similar peripheral content need.

**Focus trap:** All implementations trap focus within the drawer panel. Focus returns to trigger on close. Escape key closes the drawer.

## A11y Consensus
- role="dialog" + aria-modal="true" on the drawer panel
- aria-labelledby pointing to drawer heading
- Focus trap within drawer; return focus to trigger on close
- Escape key closes; close button within drawer
- prefers-reduced-motion: disable slide animations for users who request reduced motion

## Recommended Use
Use shadcn/ui Sheet for side drawer panels in React apps. Use shadcn/ui Drawer (Vaul) for mobile-first bottom sheet patterns with drag handles. Use Paste SidePanel for Twilio Console side panels. Use Lightning Panel for Salesforce record detail side panels.
