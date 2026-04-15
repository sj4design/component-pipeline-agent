---
system: Salesforce Lightning Design System
component: Panel (Drawer)
url: https://lightningdesignsystem.com/components/panels/
last_verified: 2026-03-28
confidence: high
---

# Panel (Drawer)

## Approach
Lightning's Panel component is a sliding side panel used for contextual help, record detail previews, and filter panels in Salesforce CRM. The right-side panel is Lightning's primary pattern for showing supplementary information without leaving the current context — essential for CRM workflows where comparing a detail view while working on a record is common.

## Key Decisions
1. **Right-side default** (HIGH) — Panel slides in from the right, which in CRM layout positions it adjacent to the record detail page without obscuring the list view that triggered the selection.
2. **Header + scrollable body** (HIGH) — Panel has fixed header with title and close button; body is independently scrollable for long detail content without scrolling the main page.
3. **Docked vs overlay mode** (HIGH) — Panel can either dock (push main content) or overlay (float over), addressing different screen size contexts and use cases within CRM.

## Notable Props
- `docked`: Boolean for docked vs overlay mode
- `heading`: Panel title
- `onClose`: Close callback
- `size`: Panel width variant

## A11y Highlights
- **Keyboard**: Focus moves to panel; Tab within; Escape closes; close button always accessible
- **Screen reader**: role="dialog"; aria-labelledby heading; focus management
- **ARIA**: role="dialog"; aria-labelledby; aria-modal; focus trap

## Strengths & Gaps
- **Best at**: CRM record context preservation; docked vs overlay modes; right-side placement convention
- **Missing**: No bottom drawer/sheet variant; left-side panel not standard
