---
system: REI Cedar
component: Drawer (Bottom Sheet)
url: https://cedar.rei.com/components/drawer
last_verified: 2026-03-28
confidence: medium
---

# Drawer

## Approach
REI Cedar's Drawer is likely a bottom sheet/side drawer for mobile e-commerce interactions — filter panels, product quick-view on mobile, and navigation menus on small screens. Mobile-first sizing and gesture support are important given REI's mobile audience.

## Key Decisions
1. **Mobile filter panels** (HIGH) — Bottom or side drawer for product filter selection on mobile, replacing the desktop sidebar filter panel.
2. **Mobile-first interaction** (HIGH) — Touch swipe dismiss and large touch targets for mobile e-commerce users.
3. **Product quick-view** (MEDIUM) — Drawer for product preview without navigating to full PDP.

## Notable Props
- `isOpen`: Open state
- `position`: "bottom" | "right" | "left"
- `onClose`: Close callback

## A11y Highlights
- **Keyboard**: Focus trap; Escape closes
- **Screen reader**: role="dialog"; accessible title
- **ARIA**: dialog role; aria-labelledby; focus management

## Strengths & Gaps
- **Best at**: Mobile e-commerce filter and navigation drawers; touch interaction
- **Missing**: Medium confidence; exact Cedar implementation uncertain
