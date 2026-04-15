---
component: Spinner
tier: 2
last_verified: 2026-03-28
---

# Spinner — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Spinner | SVG-based; size variants; color variants; always requires accessible label | high |
| Salesforce Lightning | Spinner | Overlay and inline variants; size variants; blocked interaction overlay | high |
| GitHub Primer | Spinner | SVG spinner; size variants; sr-only label required | high |
| shadcn/ui | Spinner (not present) | Not dedicated; use Loader2 from lucide-react; compose with loading state | high |
| Playbook | Spinner | Loading feedback; dual React/Rails | medium |
| REI Cedar | CdrSkeleton | Skeleton loader preferred over spinner; content-shaped loading placeholders | medium |
| Wise Design | Spinner | Transfer processing states | low |
| Dell Design System | Spinner | Enterprise loading states | low |

## Key Decision Patterns

**Spinner vs. Skeleton:** Cedar prefers skeleton loaders over spinners — a current best practice. Skeletons reduce perceived loading time by showing the shape of incoming content. Spinners are appropriate for indeterminate-duration operations (button loading state, form submission).

**Accessible label requirement:** All systems require a visually-hidden text label for spinners — role="status" or aria-label. A spinner with no text is invisible to screen reader users. Paste and Primer explicitly enforce this in their APIs.

**Overlay spinner:** Lightning's Spinner has an overlay variant that blocks interaction with the page section beneath it during loading — important for preventing user interaction during async operations in Salesforce pages.

**shadcn/ui gap:** No dedicated Spinner component in shadcn/ui core. Teams use lucide-react's Loader2 icon with a CSS spin animation. The community provides custom Spinner components.

## A11y Consensus
- role="status" on the spinner container (polite live region)
- Visually hidden text: "Loading..." or more specific message like "Saving changes..."
- aria-live="polite" for non-blocking loading; aria-live="assertive" rare for critical loading
- Remove spinner from DOM when loading completes; announce completion if important
- Do not use spinner for skeleton-suitable content loading

## Recommended Use
Use Cedar skeleton loader for content loading (page sections, cards, lists). Use Spinner for button loading states, form submission feedback, and async operation indicators. Always include visually-hidden text with every Spinner.
