---
system: Evergreen (Segment)
component: Date Picker (not available in core)
url: https://evergreen.segment.com/components
last_verified: 2026-03-28
confidence: medium
---

# Date Picker

## Approach
Evergreen, Segment's design system, does not include a DatePicker component in its core library. Evergreen is focused on analytics and data dashboard patterns, and for date selection, Segment's products have historically used either third-party date picker libraries (such as react-dates or react-day-picker) styled to match the Evergreen design language, or custom implementations. The absence of a DatePicker reflects Evergreen's relatively lean core component set — it provides foundations and common UI components but leaves specialized components to individual teams.

## Key Decisions
1. **No built-in DatePicker** (HIGH) — Evergreen maintains a focused component set. Date selection requirements vary significantly between Segment's different products, so a centralized DatePicker would either be too opinionated or require excessive configurability.
2. **TextInputField for simple date entry** (MEDIUM) — For simple date inputs, Evergreen's TextInputField with type="date" provides a basic native date picker, which works reasonably well for forms without the overhead of a custom component.

## Notable Props
- N/A — component does not exist in Evergreen core

## A11y Highlights
- N/A

## Strengths & Gaps
- **Best at**: N/A
- **Missing**: Date picker component entirely — teams must implement custom solutions
