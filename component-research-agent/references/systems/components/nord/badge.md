---
system: Nord (Nordhealth)
component: Badge (nord-badge web component)
url: https://nordhealth.design/components/badge/
last_verified: 2026-03-28
confidence: low
---

# Badge

## Approach
Nord's Badge web component handles status labels in healthcare. Clinical status badges (Active, Critical, Discharged) are displayed on patient records, medication lists, and appointment summaries. Healthcare badges must communicate meaning through text, not color alone.

## Key Decisions
1. **Text-first design** (HIGH) — Clinical status must be understandable regardless of color perception.

## Notable Props
- `variant` / `color`: semantic status variants
- Text content via slot
- Verify at nordhealth.design

## Strengths & Gaps
- **Best at**: Healthcare status labels; text-first accessibility
- **Missing**: Verify exact API at nordhealth.design
