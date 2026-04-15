---
system: Nord (Nordhealth)
component: Card (nord-card web component)
url: https://nordhealth.design/components/card/
last_verified: 2026-03-28
confidence: low
---

# Card

## Approach
Nord provides a Card web component for healthcare information grouping. Patient summary cards, test result cards, and appointment cards are common patterns. Healthcare cards display structured clinical data with clear hierarchy and often include status indicators.

## Key Decisions
1. **Web component standard** (HIGH) — Framework portability.
2. **Clinical data structure** (HIGH) — Cards in healthcare need to present clinical information in a clear, scannable format for clinical staff.

## Notable Props
- Header slot, body content, footer actions
- Verify exact API at nordhealth.design

## Strengths & Gaps
- **Best at**: Healthcare clinical data cards; web component portability
- **Missing**: Verify exact API; likely limited customization
