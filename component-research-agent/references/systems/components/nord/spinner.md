---
system: Nord (Nordhealth)
component: Spinner (nord-spinner web component)
url: https://nordhealth.design/components/spinner/
last_verified: 2026-03-28
confidence: low
---

# Spinner

## Approach
Nord provides a Spinner web component for loading states in healthcare applications. Loading states appear during patient data fetching, clinical calculation processing, and report generation. Healthcare spinners should have accessible loading messages.

## Notable Props
- `size`: spinner size
- Accessible label via aria-label or slot

## A11y Highlights
- role="progressbar"; accessible label required for clinical context

## Strengths & Gaps
- **Best at**: Healthcare loading states; web component portability
- **Missing**: Verify exact API at nordhealth.design
