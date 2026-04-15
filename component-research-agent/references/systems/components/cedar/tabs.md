---
system: REI Cedar
component: Tabs
url: https://cedar.rei.com/components/tabs
last_verified: 2026-03-28
confidence: medium
---

# Tabs

## Approach
REI Cedar's Tabs are used on product detail pages (Product / Reviews / Q&A tabs), category browsing, and account management sections. The Vue-based component follows Cedar's mobile-first approach with tab indicators sized appropriately for touch. Cedar's tabs use REI's design token system for active/inactive state colors and support a horizontal layout standard for their e-commerce contexts.

## Key Decisions
1. **Mobile touch target sizing** (HIGH) — Tab triggers sized for touch interaction, consistent with REI's high mobile commerce traffic.
2. **Slot-based panel content** (MEDIUM) — Vue slots for each tab panel allow rich content (product images, review lists, specifications) within panel areas.
3. **Scroll on overflow** (MEDIUM) — Horizontal scroll for tabs that overflow the viewport width on mobile, a common pattern for product detail pages with multiple tabs.

## Notable Props
- `activeTab`: Controlled active tab id
- `modifier`: Style variant modifier

## A11y Highlights
- **Keyboard**: Arrow keys between tabs; Tab into panel content
- **Screen reader**: ARIA tablist pattern; selected state announced
- **ARIA**: role="tablist"; role="tab"; role="tabpanel"; aria-selected

## Strengths & Gaps
- **Best at**: Mobile-optimized tab navigation; e-commerce product page tab patterns
- **Missing**: Medium confidence on full API; advanced features uncertain
