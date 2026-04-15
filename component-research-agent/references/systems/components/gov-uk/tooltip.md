---
system: GOV.UK Design System
component: Tooltip (not available — use hint text pattern)
url: https://design-system.service.gov.uk/components/hint-text/
last_verified: 2026-03-28
confidence: high
---

# Tooltip

## Approach
GOV.UK Design System does not include a tooltip component. The GOV.UK approach is that if information is important enough to show users, it should be always visible — not hidden behind a hover interaction. Hover-only tooltips are inaccessible to touch users and users who navigate by keyboard without a mouse. Instead, GOV.UK uses "hint text" — visible secondary text below form labels and within content — to provide the contextual information that tooltips would otherwise convey. This reflects GOV.UK's principle of progressive disclosure: only hide information when you have a compelling reason.

## Key Decisions
1. **No tooltip component** (HIGH) — Intentional omission based on accessibility and usability research. Hover-only tooltips exclude mobile users, keyboard users without hover, and users with cognitive disabilities who may not know to hover. If content is needed, make it visible.
2. **Hint text as replacement** (HIGH) — Visible hint text below labels provides the same information with zero accessibility trade-offs. GOV.UK's user research shows hint text reduces form errors compared to tooltip-hidden help text.

## Notable Props
- N/A — component does not exist

## A11y Highlights
- N/A — pattern avoided on accessibility grounds

## Strengths & Gaps
- **Best at**: By avoiding tooltips, GOV.UK ensures all guidance is universally accessible
- **Missing**: No on-demand contextual information; workarounds for complex data visualizations require custom implementation
