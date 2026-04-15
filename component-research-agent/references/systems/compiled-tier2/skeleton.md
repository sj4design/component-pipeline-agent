---
component: Skeleton
tier: 2
last_verified: 2026-03-28
---

# Skeleton — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Skeleton | CSS shimmer animation; text/image/circle variants; composable layout | high |
| Salesforce Lightning | Placeholder (Skeleton) | Placeholder components for record, list, text, media content types | high |
| GitHub Primer | Skeleton (via Box pulse animation) | Pulse animation utility; no dedicated Skeleton component; custom composition | high |
| shadcn/ui | Skeleton | Single CSS animation component; minimal; no shape variants; compose freely | high |
| Playbook | Skeleton | Loading placeholders; dual React/Rails | medium |
| REI Cedar | CdrSkeleton | Vue skeleton; content-shaped placeholders; recommended over spinner | medium |
| Wise Design | Skeleton | Account and transaction loading placeholders | low |
| Dell Design System | Skeleton | Enterprise dashboard loading placeholders | low |

## Key Decision Patterns

**Content-shaped vs. generic:** Cedar emphasizes content-shaped skeleton loaders — placeholders that match the approximate shape of the content they represent (text lines, cards, avatars). This reduces perceived loading time better than a generic pulsing rectangle. Lightning's Placeholder components are also content-shaped by type.

**Shimmer vs. pulse animation:** Shimmer (scanning highlight across the skeleton, like a flash of light) and pulse (opacity fade in/out) are both common. Either is acceptable; the choice is aesthetic. Both should respect prefers-reduced-motion.

**prefers-reduced-motion:** Skeleton animations (shimmer, pulse) must be reduced or disabled for users with vestibular disorders. Use `@media (prefers-reduced-motion: reduce)` to disable the animation.

**aria-busy pattern:** Container elements can use aria-busy="true" while skeleton is shown, transitioning to aria-busy="false" when content loads, signaling to screen readers that content is updating.

## A11y Consensus
- Skeleton loading regions: aria-busy="true" on the container while loading
- Visually hidden text: "Loading..." in the skeleton region for screen readers
- Remove skeleton from DOM when content loads; do not leave hidden skeletons
- Respect prefers-reduced-motion: disable shimmer/pulse animation
- Do not read out individual skeleton shapes — one aria-busy on the container is sufficient

## Recommended Use
Use Cedar CdrSkeleton for content-shaped skeleton patterns. Use shadcn/ui Skeleton for simple pulse placeholders in React. Use Lightning Placeholder components for Salesforce record/list loading. Always use aria-busy on the container and respect prefers-reduced-motion.
