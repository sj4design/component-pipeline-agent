---
system: Gestalt (Pinterest)
component: Accordion (not available — see Module/DropdownItem)
url: https://gestalt.pinterest.systems/web/overview
last_verified: 2026-03-28
confidence: medium
---

# Accordion

## Approach
Gestalt does not have a component explicitly named "Accordion." Pinterest's product surfaces — primarily image-heavy feeds, boards, and advertising dashboards — rarely use traditional accordion patterns. Collapsible content in Gestalt is typically handled by the `Module` component (a card-like container with optional expandable content) or by custom disclosure patterns. The absence of an accordion reflects Pinterest's interface philosophy: content is displayed in grids and cards, not in long-form text pages where accordions are most useful.

## Key Decisions
1. **No accordion component** (HIGH) — Pinterest's primary surfaces are visual feeds and dashboards, not document or settings pages. The lack of an accordion is an intentional product decision reflecting the visual-first nature of the platform.
2. **Module component as alternative** (MEDIUM) — The Module component provides a card with optional collapsible sections, which covers the most common Pinterest need. It's not a general-purpose accordion but a content card pattern.

## Notable Props
- N/A — component does not exist in Gestalt

## A11y Highlights
- N/A

## Strengths & Gaps
- **Best at**: N/A
- **Missing**: General-purpose accordion pattern for settings or help content use cases
