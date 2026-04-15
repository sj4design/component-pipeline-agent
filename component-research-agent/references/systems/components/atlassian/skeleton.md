---
system: Atlassian Design System
component: Skeleton
url: https://atlassian.design/components/skeleton/
last_verified: 2026-03-28
---

# Skeleton

## Approach

Atlassian's Skeleton component is classified as "Early Access" — a signal that the design system team treats it as a maturing primitive that may still evolve. The component acts as a content placeholder during loading, with its primary purpose being layout stability: showing users where content will appear prevents cumulative layout shift (CLS), which is particularly important in Atlassian's dense, information-heavy products like Jira and Confluence. Unlike a spinner that occupies a neutral space, a skeleton communicates both "something is loading" and "it will be approximately this big, in this location."

Atlassian's approach sits between Carbon's strict building-block philosophy and Spectrum's wrapper approach. The Skeleton component is a single, flexible component that matches the typography system: heights inherit from Atlassian's heading and body text scale (xxsmall through xxlarge), allowing developers to create text-mirroring skeletons without manually specifying pixel heights. The border radius defaults to a "large" value (8px) but is configurable — an acknowledgment that different content types (images, text, avatars) have different shape conventions.

The system's guidance on skeleton versus spinner follows a structural-vs-operational distinction: use Skeleton when the content structure is known and multiple pieces load simultaneously (card feeds, dashboards, list views); use Spinner when structure is unknown, space is constrained, or a single discrete operation is happening. This is a cleaner articulation of the distinction than some systems provide.

## Key Decisions

1. **Typography scale integration for automatic height** (HIGH) — Atlassian's Skeleton inherits sizing from the design system's heading and body text scale rather than requiring manual height specification. WHY: Atlassian's products use a consistent typography system, so text content always occupies predictable vertical space. By making the Skeleton aware of those scales, developers can say "this will be a medium heading" rather than "this will be 24px tall." This is more semantically meaningful and automatically stays correct if the type scale changes — the skeleton updates without any developer intervention.

2. **`aria-hidden="true"` strategy for screen readers** (HIGH) — Atlassian's documented accessibility approach wraps Skeleton elements in `aria-hidden="true"` so assistive technology ignores the placeholder entirely. WHY: a screen reader announcing a skeleton would say something meaningless like "rectangle" or skip to describing visual properties — neither conveys useful information to the user. By hiding the skeleton from assistive tech and instead relying on `aria-busy="true"` on the parent container, the loading state is communicated at the semantic level (the region is busy) without forcing screen readers to describe placeholder shapes. This is considered current best practice in the accessibility community.

3. **Configurable border radius** (MEDIUM) — The Skeleton's border radius defaults to `large` (8px) but can be adjusted. WHY: Atlassian products render many content shapes — circular avatars, image thumbnails (square or rounded), text lines (pill-shaped ends), rectangular panels (sharp corners). A skeleton with the wrong border radius can actually mislead about content shape. Making border radius configurable lets developers match the Skeleton to the exact geometry of the content it represents.

4. **Early Access status preserving API flexibility** (MEDIUM) — Keeping the component in Early Access means the API can change without a major version bump. WHY: Atlassian is actively learning how their product teams use skeleton loading across Jira, Confluence, and Trello. Patterns that seem correct in theory sometimes fail in practice at product scale. The Early Access designation signals honesty: the system is investing in this component but hasn't yet hardened all the decisions. Teams adopting it accept some migration risk in exchange for getting the component earlier.

5. **Motion token alignment** (LOW) — The Skeleton's animation (shimmer or pulse) is specified to use Atlassian's motion token durations (fast 100ms through slowest 600ms) with ease-in-out curves. WHY: loading animations that use non-system timing can feel "off" — too fast creates anxiety, too slow creates impatience. Anchoring to Atlassian's motion tokens ensures the skeleton's perceived pace matches the product's overall motion personality.

## Notable Props
- `size`: Maps to Atlassian typography scale (`"xxsmall"` through `"xxlarge"`) — semantically specifies the content type being represented without manual height configuration
- `borderRadius`: Configurable to match content shape; the default large radius suits most card/panel content but should be changed for circular avatars or image thumbnails
- `width`: Accepts a percentage or fixed value; for text skeletons, using percentages (e.g., `"100%"`, `"70%"`) creates natural text-line variation without custom CSS

## A11y Highlights
- **Keyboard**: Not interactive; no keyboard behavior
- **Screen reader**: Skeleton elements use `aria-hidden="true"` so screen readers do not announce them. Loading state is communicated by setting `aria-busy="true"` on the container element that holds the skeleton group — screen readers interpret `aria-busy` as "this region is updating, wait for the announcement." When content loads, `aria-busy` is removed and the screen reader announces the newly available content
- **ARIA**: `aria-hidden="true"` on skeleton nodes (recommended); `aria-busy="true"` on the container (recommended); no built-in `aria-live` region — developers add a visually hidden `<span aria-live="polite">Loading...</span>` if they need explicit loading announcements. The Atlassian guidance explicitly advises against adding `aria-label` to individual skeleton elements

## Strengths & Gaps
- **Best at**: Clean aria-hidden + aria-busy strategy that follows current a11y best practice; typography scale integration for semantically-sized skeletons; clear spinner vs skeleton decision criteria
- **Missing**: Still in Early Access with potential breaking changes; animation type (shimmer vs pulse) is not explicitly documented as a choice; no built-in `prefers-reduced-motion` handling confirmed; no explicit timeout/error guidance
