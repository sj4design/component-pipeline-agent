---
system: Material Design 3
component: Snackbar
url: https://m3.material.io/components/snackbar/guidelines
last_verified: 2026-03-28
---

# Snackbar

## Approach
Material Design 3 treats the Snackbar as a lightweight, non-blocking feedback mechanism positioned at the bottom of the screen. The philosophy is minimal disruption: snackbars communicate a process outcome without requiring user action, preserving focus on the primary task. M3 deliberately limits snackbars to a single optional action (never "Dismiss" or "Cancel") because the component is meant for confirmation, not decision-making. By defaulting to auto-dismiss and bottom positioning, M3 ensures snackbars sit below the user's active work area and disappear before becoming stale.

## Key Decisions
1. **Single action maximum** (HIGH) — M3 restricts snackbars to one text action to prevent cognitive overload in a transient surface. If multiple actions are needed, the guidance pushes developers toward dialogs or banners instead, keeping the snackbar's role tightly scoped to lightweight acknowledgment.
2. **Three fixed durations** (MEDIUM) — SHORT (2s), LONG (3.5s), and INDEFINITE are the only options. This eliminates arbitrary timing that could violate accessibility norms. INDEFINITE exists specifically for snackbars with actions, ensuring users have adequate time to interact.
3. **Bottom-center positioning only** (MEDIUM) — Snackbars always appear at the bottom to avoid competing with app bars and FABs. On larger screens they align to the leading edge. This rigid placement creates spatial predictability across all M3 apps.
4. **Single-line text preferred** (LOW) — M3 strongly prefers single-line messages and caps at two lines. This forces concise copy and prevents the snackbar from visually expanding into banner territory.

## Notable Props
- `duration`: Enum of SHORT/LONG/INDEFINITE rather than arbitrary ms -- enforces accessible timing floors
- `action`: Single optional text button; when clicked, automatically dismisses the snackbar
- `dismissBehavior`: Controls swipe-to-dismiss on mobile, integrating with gesture navigation patterns

## A11y Highlights
- **Keyboard**: Action button receives focus when present; Tab navigates between action and close
- **Screen reader**: Uses `aria-live="polite"` with `aria-atomic="true"` so announcements do not interrupt current speech
- **ARIA**: Role is implicit live region (not `role="alert"`); polite politeness ensures non-disruptive announcement

## Strengths & Gaps
- **Best at**: Providing consistent, non-intrusive post-action feedback with strong cross-platform predictability through rigid constraints on timing, positioning, and action count.
- **Missing**: No semantic variants (success/error/warning), no support for icons or rich content, and no built-in stacking or queuing mechanism for multiple simultaneous snackbars.
