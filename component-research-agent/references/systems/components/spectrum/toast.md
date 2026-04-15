---
system: Adobe Spectrum
component: Toast
url: https://spectrum.adobe.com/page/toast/
last_verified: 2026-03-28
---

# Toast

## Approach
Spectrum's Toast is designed as a brief, temporary notification that should never disrupt a user's workflow or demand action. The philosophy centers on semantic clarity: four distinct variants (neutral, informative, positive, negative) each carry a dedicated color and icon so users can parse intent at a glance -- especially important for users with color vision deficiency. Spectrum invests heavily in an 8-level priority queue system, ensuring that high-severity toasts (errors, actionable items) can preempt lower-priority ones rather than being lost. The minimum 5-second display time is an accessibility-first decision reflecting WCAG timing requirements.

## Key Decisions
1. **8-level priority queue** (HIGH) — Toasts are ranked by severity and interactivity (e.g., actionable error is priority 1, auto-dismiss neutral is priority 8). Higher-priority toasts push lower ones into a queue rather than stacking. This prevents toast floods in complex creative applications like Photoshop where many async operations run concurrently.
2. **Actionable toasts never auto-dismiss** (HIGH) — When an action button is present, the toast persists until the user explicitly interacts. This is a deliberate accessibility choice: auto-dismissing an actionable toast would violate WCAG 2.2 timing requirements and risk the user missing critical recovery paths.
3. **Semantic variants with mandatory icons** (MEDIUM) — Positive (green/checkmark), negative (red/alert), informative (blue/info), and neutral (gray/no icon) each pair color with iconography. The dual-encoding ensures meaning is conveyed even without color perception.
4. **Bottom-center default with flexible placement** (LOW) — Default is bottom-center for both desktop and mobile (16px from viewport edges), but supports bottom-end, top-end, and top-center alternatives. Mobile toasts sit above bottom navigation bars.

## Notable Props
- `variant`: `neutral | informative | positive | negative` -- semantic intent drives visual treatment automatically
- `actionLabel` + `onAction`: Optional single action; presence toggles auto-dismiss off entirely
- `timeout`: Minimum 6000ms enforced; messages over 120 words get +1000ms per additional 120 words

## A11y Highlights
- **Keyboard**: Tab/Shift+Tab between action and close buttons; Space/Enter to activate; Esc to dismiss
- **Screen reader**: Auto-dismiss pauses when keyboard focus enters the toast, per WCAG 2.2
- **ARIA**: Uses live region; icons provide non-color semantic cues for variant identification

## Strengths & Gaps
- **Best at**: Handling concurrent notifications in complex creative workflows through its priority queue, plus strong accessibility with enforced minimum display times and pause-on-focus behavior.
- **Missing**: No multi-line or rich content support beyond a single message string; no built-in undo pattern; stacking is queue-based (one visible at a time) which can delay lower-priority messages.
