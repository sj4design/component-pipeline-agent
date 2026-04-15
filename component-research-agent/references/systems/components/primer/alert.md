---
system: GitHub Primer
component: Banner / Flash
url: https://primer.style/components/banner
last_verified: 2026-03-28
confidence: high
---

# Banner / Alert

## Approach
GitHub Primer's Banner (and Flash for legacy) is an inline alert component used throughout GitHub for form validation feedback, feature announcements, deprecation notices, and error alerts. Primer's banner supports full-width edge-to-edge styling for page-level alerts and contained styling for inline contextual alerts. The Banner component in newer Primer versions supersedes Flash.

## Key Decisions
1. **Variant set for all alert types** (HIGH) — info, success, warning, critical variants covering the full spectrum of alert severity, with appropriate icon indicators for immediate visual scanning.
2. **Action button within banner** (HIGH) — Banner supports an action button or link within the alert content, enabling "Upgrade your plan," "Fix the issue," and "Learn more" patterns within alert context.
3. **Dismissible via onDismiss** (MEDIUM) — Optional close button for user-dismissible banners, important for informational alerts that users don't always need to see.

## Notable Props
- `variant`: "info" | "success" | "warning" | "critical" | "upsell"
- `onDismiss`: Optional dismiss handler
- `actions`: Action button/link configuration
- `fullWidth`: Edge-to-edge display for page-level alerts

## A11y Highlights
- **Keyboard**: Action links/buttons accessible; dismiss button accessible
- **Screen reader**: role="alert" for critical; role="status" for informational; content announced on render
- **ARIA**: Appropriate live region role per urgency; dismiss button labeled; action buttons labeled

## Strengths & Gaps
- **Best at**: Upsell/upgrade variant for GitHub's feature promotion pattern; action button support; full/contained width
- **Missing**: No structured multi-section content in banner; single message + optional action pattern
