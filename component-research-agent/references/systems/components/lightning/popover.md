---
system: Salesforce Lightning Design System
component: Popover
url: https://lightningdesignsystem.com/components/popovers/
last_verified: 2026-03-28
confidence: high
---

# Popover

## Approach
Lightning's Popover is a rich interactive overlay component used for contextual information display with actions throughout Salesforce CRM — inline editing panels, record detail previews, help content with links, and feature introduction flows. Lightning popovers feature a distinct nubbin design language and support header, body, and footer sections. The "walkthrough" popover variant is used for product tours and feature introduction.

## Key Decisions
1. **Walkthrough/product tour variant** (HIGH) — Lightning has a dedicated "walkthrough" popover style for onboarding and feature introduction tours, a notable enterprise pattern for Salesforce's complex CRM features.
2. **Nubbin direction** (HIGH) — CSS nubbin positioned to indicate the anchor relationship between popover and trigger, with full placement control for various CRM page layout contexts.
3. **Header/body/footer structure** (MEDIUM) — Structured sections with optional header title, body content, and footer action buttons for rich contextual panels.

## Notable Props
- `header`: Optional popover header title
- `footer`: Footer action buttons slot
- `nubbinPosition`: Nubbin placement direction
- `variant`: "base" | "walkthrough" | "error" | "warning" | "feature"

## A11y Highlights
- **Keyboard**: Enter/Space opens; Tab within popover; Escape closes and returns focus
- **Screen reader**: role="dialog"; aria-labelledby header; aria-haspopup on trigger; focus management
- **ARIA**: role="dialog"; aria-labelledby; aria-haspopup="dialog"; aria-expanded

## Strengths & Gaps
- **Best at**: Walkthrough/tour variant; nubbin positioning; structured header/footer; enterprise feature introduction
- **Missing**: No inline/non-anchored variant; tightly coupled to Lightning's CSS framework
