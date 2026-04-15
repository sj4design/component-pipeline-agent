---
system: Salesforce Lightning Design System
component: Tabs
url: https://lightningdesignsystem.com/components/tabs/
last_verified: 2026-03-28
confidence: high
---

# Tabs

## Approach
Lightning's Tabs are used extensively across Salesforce CRM for record page layouts, setup configuration, and app navigation. Lightning supports multiple tab variants: default (standard horizontal tabs), scoped (visually contained within a card/section), and vertical. The vertical tabs variant is particularly notable and addresses sidebar navigation patterns common in complex Salesforce configuration pages. Tab panels can contain entire page layouts including forms, tables, and related lists.

## Key Decisions
1. **Vertical tabs variant** (HIGH) — Explicit vertical tabs variant addresses complex multi-section configuration UIs where left-side navigation with content panels is the standard Salesforce UX pattern.
2. **Scoped variant** (HIGH) — Scoped tabs are visually contained within a bordered area, appropriate for embedding tab content within cards or panels on a record page without full-page tab treatment.
3. **Large content panel support** (MEDIUM) — Tab panels in Lightning are designed to contain complex CRM content (related lists, data tables, forms) not just simple content sections.

## Notable Props
- `variant`: "default" | "scoped" | "vertical"
- `selectedTab`: Controlled selected tab
- `onSelect`: Tab selection callback
- `defaultSelectedTab`: Uncontrolled default selection

## A11y Highlights
- **Keyboard**: Arrow key navigation in tablist (roving tabindex); Tab into tabpanel
- **Screen reader**: Full ARIA tablist pattern; selected state announced
- **ARIA**: role="tablist"; role="tab"; role="tabpanel"; aria-selected; aria-controls; aria-labelledby

## Strengths & Gaps
- **Best at**: Vertical tabs for complex navigation; scoped variant for embedded contexts; comprehensive CRM tab patterns
- **Missing**: No overflow/scrolling for many tabs in narrow containers
