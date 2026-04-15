---
system: GOV.UK Design System
component: Card (not a formal component — see Summary Card / Service Card patterns)
url: https://design-system.service.gov.uk/components/summary-card/
last_verified: 2026-03-28
confidence: high
---

# Card

## Approach
GOV.UK has a Summary Card component designed for displaying a summary of information with optional action links. It is not a generic "card" but a specific pattern for government service summaries (application summaries, booking confirmations, user record summaries). The Summary Card has a heading, content section, and action links. Generic card layouts in GOV.UK services are typically built from the base typography and layout components rather than a pre-made card component.

## Key Decisions
1. **Summary Card for structured data display** (HIGH) — The Summary Card is used to summarize application or record data, with a title and optionally grouped rows of key-value pairs. Each group can have actions (Change, Remove).
2. **Actions on summary card sections** (HIGH) — The pattern of "Change" links next to each summary section is a signature GOV.UK pattern for reviewing and editing form-collected data before final submission.

## Notable Props
- `title.text`: card heading
- `card.actions[].text`: action link text (e.g., "Change name")
- `rows[]`: key-value summary rows

## A11y Highlights
- **Keyboard**: Action links are keyboard navigable
- **Screen reader**: Card title heads each card section; action links have visible and accessible text
- **ARIA**: Standard heading and link structure; "Change name" links are descriptive (not generic "Change")

## Strengths & Gaps
- **Best at**: Government data summary patterns; action links on summary sections; review-before-submit pattern
- **Missing**: No generic visual card component; no image card; no clickable card pattern
