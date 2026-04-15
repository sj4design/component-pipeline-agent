---
system: Gestalt (Pinterest)
component: DatePicker (calendar via DatePicker component)
url: https://gestalt.pinterest.systems/web/datepicker
last_verified: 2026-03-28
confidence: medium
---

# Calendar (via DatePicker)

## Approach
Gestalt does not have a standalone Calendar component. The calendar grid is part of the DatePicker component. For inline calendar use cases, Pinterest's product teams use the DatePicker with inline display configuration. The calendar within DatePicker supports Pinterest's two-month range view for ad campaign date selection.

## Key Decisions
1. **No standalone Calendar** (MEDIUM) — Calendar functionality is integrated into DatePicker. Pinterest's use cases are all date-picker style, not inline calendar grids.

## Notable Props
- Via DatePicker configuration

## A11y Highlights
- Via DatePicker implementation

## Strengths & Gaps
- **Best at**: Range view via DatePicker
- **Missing**: Standalone calendar grid; scheduling/availability display patterns
