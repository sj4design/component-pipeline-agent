---
system: Nord (Nordhealth)
component: Table (nord-table web component)
url: https://nordhealth.design/components/table/
last_verified: 2026-03-28
confidence: low
---

# Table

## Approach
Nord provides a Table web component for displaying clinical data — patient lists, test results, medication schedules, appointment records. Healthcare tables have specific requirements: clear row identification, status indicators for abnormal values, and careful handling of dense numerical data. Nord's table is designed for legibility in clinical settings where misreading a value could have patient safety implications. The web component approach ensures this critical component works consistently across all platforms in a healthcare organization.

## Key Decisions
1. **Web component for portability** (HIGH) — Clinical data needs to display consistently across legacy and modern systems in a hospital's technology ecosystem.
2. **Clinical data legibility** (HIGH) — Typography, spacing, and color choices in the table are calibrated for clinical data reading, with attention to numerical value readability and status communication.

## Notable Props
- Standard HTML table slot structure (thead, tbody, tfoot)
- Likely: `condensed` or `dense` mode for high-information displays
- `sortable` on column headers

## A11y Highlights
- **Keyboard**: Standard table navigation
- **Screen reader**: Semantic table structure with proper th/td elements; scope attributes
- **ARIA**: Minimal ARIA needed due to semantic HTML; verify at nordhealth.design

## Strengths & Gaps
- **Best at**: Clinical data display; web component portability; healthcare-appropriate design
- **Missing**: Verify exact API; likely no virtualization; limited compared to feature-rich data table systems
