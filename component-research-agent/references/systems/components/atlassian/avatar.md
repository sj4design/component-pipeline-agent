---
system: Atlassian Design System
component: Avatar + AvatarGroup
url: https://atlassian.design/components/avatar
last_verified: 2026-03-28
---

# Avatar

## Approach
Atlassian Design System has the most complete and thoughtfully designed Avatar implementation in Tier 1, providing both a standalone Avatar component and an AvatarGroup component for stacked displays. This thoroughness is entirely justified by Atlassian's product context: Jira and Confluence are fundamentally collaborative tools where user identity is visible everywhere — issue assignees, page editors, watchers, @mention chips, and team member lists are core interface patterns. Atlassian couldn't afford gaps in their avatar system because user representation is a first-class UI concern across their entire product suite. The Avatar component handles image display, a name-based initials fallback, and a generic person icon fallback. AvatarGroup handles the stacking/overlap pattern with configurable max visible count and an overflow count indicator.

## Key Decisions
1. **AvatarGroup as a first-class component** (HIGH) — Atlassian ships AvatarGroup as a separate, fully specified component rather than expecting teams to compose it. The group handles the overlap stacking (each avatar overlaps the previous by 50%), the `max` count limit, and the overflow "+N" indicator that appears when the group is truncated. This is justified because the stacked avatar pattern appears in dozens of places across Jira and Confluence and must behave identically everywhere. If it were a consumer responsibility, it would be implemented inconsistently.
2. **Presence indicator integration** (HIGH) — Avatar supports a `presence` prop (`online`, `busy`, `focus`, `offline`) that renders a colored status dot in the avatar's bottom-right corner. This is tightly coupled to Atlassian's collaboration context: knowing whether a teammate is online or in focus mode before sending them a message is valuable in Jira. The presence indicator is built into the component because it always appears in the same position relative to the avatar and needs to maintain contrast across all fallback states (image, initials, icon).
3. **Size system: xxsmall through xxlarge** (MEDIUM) — Atlassian provides 6 size steps (xxsmall: 16px, xsmall: 24px, small: 32px, medium: 40px, large: 48px, xlarge: 96px). This range is driven by the full spectrum of use cases in Jira/Confluence: the 16px size is for inline avatar chips in @mentions within text; 96px is for user profile pages. Having all 6 in the system prevents teams from ad-hoc sizing.
4. **`onClick` on Avatar for routing to profile** (MEDIUM) — Avatar supports click interaction to navigate to a user's profile, with a tooltip showing the full name on hover. This is not a generic interactive affordance — it's specifically designed for the "click avatar to see user profile" pattern that is universal across Atlassian products.

## Notable Props
- `presence`: online | busy | focus | offline — presence status dot
- `size`: xxsmall | xsmall | small | medium | large | xlarge (6 sizes)
- `onClick`: Enables profile navigation — click handler with hover tooltip
- `label` (AvatarGroup): Custom label for the overflow "+N" button for screen readers
- `maxCount` (AvatarGroup): Controls how many avatars show before overflow

## A11y Highlights
- **Keyboard**: Interactive Avatar (with `onClick`) is a button that can be focused and activated with Enter/Space; non-interactive Avatar is not focusable
- **Screen reader**: Avatar's `name` prop populates both `alt` text on the image and the tooltip text; AvatarGroup's overflow button announces the count and has a customizable `label` prop
- **ARIA**: Image renders with `alt`; interactive variant renders as `<button>` with `aria-label`; presence dots have visually hidden text announcing the status

## Strengths & Gaps
- **Best at**: The most complete Avatar system in Tier 1 — AvatarGroup, presence indicators, 6 size steps, interactive mode, and robust a11y make this the reference implementation for collaboration-focused products
- **Missing**: No loading/skeleton state while image fetches, and no built-in tooltip customization beyond the name display
