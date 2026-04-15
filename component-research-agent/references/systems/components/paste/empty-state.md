---
system: Twilio Paste
component: Empty State
url: https://paste.twilio.design/components/empty-state
last_verified: 2026-03-28
confidence: high
---

# Empty State

## Approach
Twilio Paste's Empty State component provides a standardized layout for zero-data scenarios in the console — no phone numbers, no services created, first-time onboarding views. Paste's Empty State has a specific structure: illustration/icon, heading, description, and optional action button. The system provides a set of illustrations specifically designed for empty states in the Twilio console context.

## Key Decisions
1. **Illustration + heading + description + CTA structure** (HIGH) — Standardized structure prevents ad-hoc empty state designs across the console, ensuring all zero-data scenarios have consistent visual weight and clear user direction.
2. **Twilio illustration library** (HIGH) — Paste provides purpose-built empty state illustrations that match Twilio's brand, preventing developers from using generic or off-brand imagery for onboarding moments.
3. **Focused action button** (MEDIUM) — Empty State includes a primary CTA slot for the most important next action (e.g., "Create a Phone Number"), focusing users on the recovery path.

## Notable Props
- `headingText`: Main heading for the empty state
- `imageUrl`: Empty state illustration
- `action`: Optional CTA button
- `variant`: Visual variant

## A11y Highlights
- **Keyboard**: CTA button fully accessible
- **Screen reader**: Heading provides context; description elaborates; CTA button labeled
- **ARIA**: Standard heading hierarchy; button accessible name; image with appropriate alt

## Strengths & Gaps
- **Best at**: Standardized zero-data states across console; Twilio illustration set; clear CTA pattern
- **Missing**: No variant for "no results found" vs "first-time use" distinction
