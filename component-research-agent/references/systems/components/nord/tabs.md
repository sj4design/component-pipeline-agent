---
system: Nord (Nordhealth)
component: Tabs (nord-tab-group web component)
url: https://nordhealth.design/components/tab-group/
last_verified: 2026-03-28
confidence: low
---

# Tab Group

## Approach
Nord provides a Tab Group web component (`<nord-tab-group>`) for organizing clinical information into sections. Healthcare applications frequently use tabs to separate clinical categories: vitals, medications, diagnoses, notes. The component is designed for the healthcare context where information density is high and clear organization is critical for clinical decision-making. As a web component, it integrates with Nord's overall cross-framework strategy.

## Key Decisions
1. **Web component for portability** (HIGH) — Consistent across clinical systems regardless of frontend framework.
2. **Clinical content organization** (HIGH) — Tab groups in healthcare are primarily for information organization (patient record sections) rather than navigation. The component likely defaults to behaviors appropriate for this (all content in DOM, conservative animation).

## Notable Props
- Likely: `value` or similar for active tab control
- Slot-based: tab triggers and panels defined via named slots
- Standard keyboard navigation

## A11y Highlights
- **Keyboard**: Arrow key navigation; standard tab pattern
- **Screen reader**: Full ARIA tablist/tab/tabpanel in shadow DOM
- **ARIA**: WAI-ARIA tabs pattern; verify at nordhealth.design

## Strengths & Gaps
- **Best at**: Healthcare information organization; web component portability; accessibility compliance
- **Missing**: Verify exact API; limited visual customization compared to React-based systems
