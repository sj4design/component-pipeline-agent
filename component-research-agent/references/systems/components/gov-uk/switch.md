---
system: GOV.UK Design System
component: Toggle / Switch (not available)
url: https://design-system.service.gov.uk/
last_verified: 2026-03-28
confidence: high
---

# Switch / Toggle

## Approach
GOV.UK Design System does not include a switch/toggle component. GOV.UK's guidance would classify most toggle use cases as better served by checkboxes. A toggle/switch implies an immediate action, which is problematic in a form context where actions should happen on explicit submit. For settings that need immediate effect, GOV.UK would recommend a full page or confirmation pattern rather than an inline toggle. The absence reflects the system's conservative, research-backed approach.

## Key Decisions
1. **No switch component** (HIGH) — GOV.UK avoids patterns that create ambiguity about when an action takes effect. A toggle appearing to work immediately (like a toggle switch) but actually being inside a form that hasn't been submitted yet confuses users, particularly those with cognitive disabilities.

## Notable Props
- N/A

## A11y Highlights
- N/A

## Strengths & Gaps
- **Best at**: N/A
- **Missing**: Toggle/switch for settings UIs where immediate effect is appropriate
