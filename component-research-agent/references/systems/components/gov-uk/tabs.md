---
system: GOV.UK Design System
component: Tabs
url: https://design-system.service.gov.uk/components/tabs/
last_verified: 2026-03-28
confidence: high
---

# Tabs

## Approach
GOV.UK's Tabs component is progressively enhanced — it renders as a linked list of in-page anchor links without JavaScript, and becomes an ARIA tabs widget when JavaScript is available. This is the GOV.UK way: every component must work without JavaScript, and enhanced behavior is added on top. The component is recommended for presenting related content where a user needs to compare sections, such as guidance split by topic. GOV.UK is explicit about when NOT to use tabs: for sequential content (use a stepper), for content that needs to be seen simultaneously, or when there are more than four tabs.

## Key Decisions
1. **Progressive enhancement** (HIGH) — Without JavaScript, tabs render as anchor links to sections visible on the page. The JavaScript layer hides the non-active content and adds ARIA roles. This ensures the content is always accessible.
2. **URL hash navigation without JS** (HIGH) — The non-JS fallback uses `href="#section-id"` anchors, so users can link to specific tabs. With JS, the hash is still updated when tabs change, making deep-linking to a specific tab work naturally.
3. **Limited tab count guidance** (MEDIUM) — GOV.UK explicitly recommends no more than four tabs. User research showed that more tabs overwhelm users and the component becomes unwieldy on mobile. This usage guidance is part of the component documentation.

## Notable Props
- `items[].id`: anchor ID for in-page navigation
- `items[].label`: tab heading text
- `items[].panel.html`: tab content HTML
- No JavaScript props — behavior is JavaScript-enhanced

## A11y Highlights
- **Keyboard**: Arrow keys navigate tabs when JS-enhanced; anchor behavior when not
- **Screen reader**: Fallback to link/section structure without JS; ARIA tablist/tab/tabpanel with JS
- **ARIA**: `role="tablist"`, `role="tab"`, `role="tabpanel"`; `aria-selected`, `aria-controls` applied by JavaScript enhancement

## Strengths & Gaps
- **Best at**: Progressive enhancement; URL-based tab navigation; clear usage guidance on when not to use
- **Missing**: No visual variants; limited to simple text tabs; no icon or badge support in tabs
