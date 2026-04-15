---
system: GOV.UK Design System
component: Tag
url: https://design-system.service.gov.uk/components/tag/
last_verified: 2026-03-28
confidence: high
---

# Tag

## Approach
GOV.UK's Tag component is a status indicator for communicating the state of a service, application, or task. It is used primarily in service lists and case management tools to show status categories: "Active", "Inactive", "Pending", "Archived". The component provides a standard set of semantic colors (blue for "In progress", green for "Complete", red for "Rejected") with guidance on which color to use for which status type. Tags are always non-interactive display labels in GOV.UK's design language.

## Key Decisions
1. **Semantic color guidance** (HIGH) — GOV.UK provides explicit guidance on which tag color maps to which type of status. This prevents teams from arbitrarily assigning colors and ensures status colors are consistent across government services, which users encounter across multiple services.
2. **No interactive tags** (HIGH) — GOV.UK tags are display-only. No removable tags or clickable tags. This reflects the use case: case status indicators and service state labels don't need interactivity in government workflows.

## Notable Props
- `colour`: `"grey" | "green" | "turquoise" | "blue" | "light-blue" | "purple" | "pink" | "red" | "orange" | "yellow"` plus default blue
- Text content via macro `text` property

## A11y Highlights
- **Keyboard**: Non-interactive; no keyboard behavior
- **Screen reader**: Reads as inline text; color meaning is supplemented by text content (never color alone)
- **ARIA**: No special ARIA; GOV.UK guidance ensures text always conveys meaning, not just color

## Strengths & Gaps
- **Best at**: Status color standardization; guidance on semantic color usage; government status patterns
- **Missing**: No interactive/removable tags; no size variants; very specific to status use case
