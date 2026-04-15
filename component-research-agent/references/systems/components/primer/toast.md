---
system: GitHub Primer
component: Flash / Toast
url: https://primer.style/components/flash
last_verified: 2026-03-28
confidence: medium
---

# Flash (Toast/Banner)

## Approach
GitHub Primer uses "Flash" as its notification component, which serves both inline alert/banner and toast notification roles. Flash is used throughout GitHub for form validation feedback, operation success/error messages, and system status alerts. Primer provides Flash as an inline banner component; transient toast notifications may be handled separately or via the Toast component added in more recent Primer versions. The Flash component is a mature, well-established pattern in GitHub's UI.

## Key Decisions
1. **Inline + dismissible** (HIGH) — Flash is primarily an inline component (not floating overlay) placed contextually near the relevant content, which is appropriate for GitHub's server-rendered page patterns.
2. **Full variant set** (HIGH) — default, success, warning, danger variants with icon indicators for clear visual categorization of notification type.
3. **Action button slot** (MEDIUM) — Flash supports action buttons within the banner for "Fix it", "Dismiss", or "Learn more" patterns common in GitHub's alert contexts.

## Notable Props
- `variant`: "default" | "success" | "warning" | "danger"
- `full`: Boolean for full-width edge-to-edge flash banner
- `dismissButton`: Boolean to show dismiss control
- `onDismiss`: Dismiss callback

## A11y Highlights
- **Keyboard**: Dismiss button focusable; action links/buttons within flash accessible
- **Screen reader**: role="alert" or role="status" depending on urgency; announced on render
- **ARIA**: Appropriate live region; icon variants use aria-hidden icons with sr-only text for variant announcement

## Strengths & Gaps
- **Best at**: Inline contextual notifications; full-width system alerts; GitHub's server-rendered page patterns
- **Missing**: Medium confidence on current Toast vs Flash distinction in latest Primer; floating toast queue management less developed
