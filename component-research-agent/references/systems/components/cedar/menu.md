---
system: REI Cedar
component: Popover (Menu)
url: https://cedar.rei.com/components/popover
last_verified: 2026-03-28
confidence: medium
---

# Popover / Menu

## Approach
REI Cedar uses its Popover component for dropdown menu patterns in e-commerce contexts — account navigation menus, sort/filter action menus, and contextual options on product cards. Cedar's menu pattern focuses on the common e-commerce navigation and action scenarios.

## Key Decisions
1. **Popover-based menus** (HIGH) — Popover serves as the container for menu content, consistent with Cedar's overlay system.
2. **E-commerce action patterns** (MEDIUM) — Menu items address sort, filter, and account action patterns common in retail.
3. **Touch-friendly sizing** (HIGH) — Menu items sized for touch interaction on mobile devices.

## Notable Props
- `trigger`: Trigger element
- `position`: Popover/menu placement

## A11y Highlights
- **Keyboard**: Arrow keys for navigation; Escape to close
- **Screen reader**: Menu role; items announced
- **ARIA**: role="menu" pattern expected

## Strengths & Gaps
- **Best at**: Mobile-friendly menu sizing; e-commerce action patterns
- **Missing**: Medium confidence; exact Cedar menu component API uncertain
