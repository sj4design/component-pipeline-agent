---
system: Gestalt (Pinterest)
component: Toast
url: https://gestalt.pinterest.systems/web/toast
last_verified: 2026-03-28
confidence: medium
---

# Toast

## Approach
Gestalt's Toast reflects Pinterest's consumer-facing notification needs: saving a pin, following a user, completing a board action. The toasts are visually distinctive — they often include a pin thumbnail image to confirm the action (saved this pin image). This image-centric toast pattern is unique to Pinterest's visual platform. The component supports a dismissal button and optional action link.

## Key Decisions
1. **Image thumbnail support** (HIGH) — Toast can show a small image thumbnail, representing the pin or content the action was performed on. This provides clear visual confirmation of which pin was saved/reacted to, reducing ambiguity in Pinterest's infinite scroll context.
2. **Action text link** (MEDIUM) — Toasts can include an action link (e.g., "Undo", "View board") as a text button. Pinterest's undo patterns (unsave a pin) use this pattern.
3. **Auto-dismiss timing** (MEDIUM) — Toasts auto-dismiss after a few seconds. Pinterest's context is consumer UX where notification persistence would clutter the visual feed.

## Notable Props
- `text`: notification message
- `thumbnail`: image source for pin thumbnail
- `helperLink`: `{ text, href, onClick }` action link
- `dissmissButton`: show close button

## A11y Highlights
- **Keyboard**: Action link is keyboard accessible
- **Screen reader**: Toast text announced via live region; image thumbnail has alt text
- **ARIA**: role="status" for non-critical notifications; aria-live="polite"

## Strengths & Gaps
- **Best at**: Image thumbnail for visual confirmation; consumer-friendly notification pattern
- **Missing**: No programmatic API (must be rendered in JSX); no notification type/intent system
