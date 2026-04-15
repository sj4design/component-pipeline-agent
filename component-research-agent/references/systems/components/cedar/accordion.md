---
system: REI Cedar
component: Accordion
url: https://cedar.rei.com/components/accordion
last_verified: 2026-03-28
confidence: medium
---

# Accordion

## Approach
REI Cedar's Accordion is a Vue-based component used for organizing product information, FAQ sections, and feature descriptions in REI's retail context. Cedar emphasizes accessible, mobile-friendly implementations given REI's strong mobile commerce traffic. The component supports multiple simultaneous open panels, which suits product detail pages where customers want to view multiple specification sections at once. Cedar's design language gives the accordion a clean, outdoors-inspired aesthetic with clear borders and generous spacing.

## Key Decisions
1. **Multiple panels open simultaneously** (HIGH) — Default behavior allows multiple panels open at once, appropriate for product information pages where customers compare specs, sizing, and features simultaneously.
2. **Mobile-first sizing** (HIGH) — Tap targets and spacing are sized for mobile touch interaction given REI's significant mobile customer base.
3. **Slot-based content** (MEDIUM) — Vue slot pattern for header and content areas, providing flexibility for rich content (icons, badges, custom headers) within accordion items.

## Notable Props
- `opened`: Array of open panel identifiers for controlled usage
- `initialOpened`: Default open panels for uncontrolled usage
- `compact`: Boolean for reduced-spacing variant

## A11y Highlights
- **Keyboard**: Enter/Space toggles; Tab navigates between triggers
- **Screen reader**: Open/closed state announced; panel associated with trigger
- **ARIA**: aria-expanded on triggers; aria-controls linking to panels; aria-labelledby on panels

## Strengths & Gaps
- **Best at**: Product information display; mobile-optimized touch targets; Vue-native implementation
- **Missing**: Confidence medium — some specifics may differ from current Cedar documentation
