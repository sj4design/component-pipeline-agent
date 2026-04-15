---
system: Base Web (Uber)
component: Badge (not available as standalone — use Tag or custom)
url: https://baseweb.design/components/
last_verified: 2026-03-28
confidence: medium
---

# Badge

## Approach
Base Web does not have a dedicated Badge component for status labels. The Tag component covers some badge use cases (status labels with remove functionality). For simple non-removable status badges, teams typically use custom styled spans or the Tag component without the remove button.

## Key Decisions
1. **No dedicated Badge** (MEDIUM) — Base Web's Tag covers interactive tags; static badges are built from primitives.

## Notable Props
- N/A — use Tag without onActionClick for static display

## A11y Highlights
- N/A

## Strengths & Gaps
- **Best at**: N/A
- **Missing**: Dedicated static badge component; notification dot pattern
