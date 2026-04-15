---
system: GOV.UK Design System
component: Spinner / Loading (not available as a formal component)
url: https://design-system.service.gov.uk/
last_verified: 2026-03-28
confidence: high
---

# Spinner / Loading Indicator

## Approach
GOV.UK Design System does not include a spinner component. Government services are designed to work without JavaScript and with reliable server-rendered responses. The need for a loading spinner implies a JavaScript-heavy, async UI pattern that GOV.UK's server-rendered, page-based architecture avoids. When loading is necessary, GOV.UK services use a page-level loading page pattern (redirect to a "We're processing your application" page).

## Key Decisions
1. **No spinner** (HIGH) — GOV.UK's progressive enhancement approach means async UI loading states are not a standard pattern. Page-based navigation handles what JavaScript apps handle with spinners.

## Notable Props
- N/A

## A11y Highlights
- N/A

## Strengths & Gaps
- **Best at**: N/A
- **Missing**: Loading indicators for JavaScript-enhanced interfaces
