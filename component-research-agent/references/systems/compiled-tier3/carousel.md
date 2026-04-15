---
component: Carousel
tier: 3
last_verified: 2026-03-31
---

# Carousel — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Not available — headless scope | No carousel primitive; Radix focuses on accessible interactive primitives (Dialog, Popover, Select) — carousel's scroll-snap behavior is better served by CSS scroll-snap or dedicated libraries like Embla (which shadcn/ui uses). | high |
| Chakra UI | Not available — omitted | No carousel component; Chakra's utility-first approach leaves carousel to third-party libraries; their docs suggest using Embla or Swiper with Chakra's Box/Flex primitives. | high |
| GOV.UK | Not available — a11y | No carousel; UK government digital service explicitly discourages carousels in all government services — research showed users ignore rotating content, auto-play fails multiple WCAG criteria, and sequential dot navigation is incomprehensible to many users. | high |
| Base Web (Uber) | Not available — product model | No carousel component; Uber's rider/driver/eater interfaces use map-centric and list-centric patterns — restaurant browsing uses vertical scroll lists, not horizontal carousels. | medium |
| Fluent 2 (Microsoft) | Carousel | Full implementation for Office/Windows: slide navigation with previous/next buttons, pagination dots, auto-play with pause, circular navigation (loop), and announcement banner mode. Used in Outlook email campaigns, SharePoint hero webparts, and Teams app galleries. | high |
| Gestalt (Pinterest) | Carousel | Pin-browsing carousel for horizontal content exploration; supports multiple visible items, peek (partial next item visible), responsive items-per-row, arrow navigation, and scroll-snap. No auto-play — Pinterest's model is user-driven exploration, not promotional rotation. | high |
| Mantine | Carousel | Built on Embla Carousel; supports loop, auto-play via Autoplay plugin, drag-to-scroll, multiple slides visible, responsive breakpoints for slides-per-view, vertical orientation, slide gaps, custom indicators, and slide-change callbacks. Most complete T3 implementation. | high |
| Orbit (Kiwi.com) | Not available — travel focus | No carousel component; Kiwi.com's travel booking interface uses card lists and search results rather than rotating content; destination suggestions use horizontal scroll containers without carousel mechanics. | medium |
| Evergreen (Segment) | Not available — analytics focus | No carousel; Segment's analytics dashboard context has no use case for rotating content — data is presented in tables, charts, and card grids. | medium |
| Nord (Nordhealth) | Not available — clinical UX | No carousel; clinical software requires all information to be immediately visible and scannable — hiding content behind navigation or auto-rotation is unacceptable in healthcare contexts where missed information can affect patient outcomes. | medium |

## Key Decision Patterns

The carousel is the most controversial component across Tier 3: only 3 of 10 systems offer it (Fluent 2, Gestalt, Mantine), matching the low adoption pattern seen in Tier 2. The 7 systems that omit it cite a11y concerns (GOV.UK, Radix), product model misalignment (Base Web, Orbit, Evergreen), clinical safety (Nord), or deliberate deferral to third-party libraries (Chakra). This makes carousel the component with the highest intentional-omission rate across all tiers.

Gestalt's carousel is the most instructive design decision in this tier. Pinterest explicitly disables auto-play and optimizes for user-driven horizontal exploration — the carousel is a browse pattern, not a promotional rotation pattern. The `peek` behavior (showing a partial next item at the edge) communicates scrollability without arrows or dots, leveraging a mobile-native scroll affordance. This represents the strongest counter-argument to "carousels are bad" — when the carousel serves content discovery (not promotional rotation) and the user controls the pace, the pattern works.

Mantine's Embla-based implementation is the most feature-complete in Tier 3, mirroring shadcn/ui's approach in Tier 2. Both wrap Embla Carousel, confirming Embla as the de facto standard carousel engine for React component libraries. Mantine adds Mantine-specific styling, responsive breakpoint configuration for slides-per-view, and integrates with Mantine's theme system. The plugin architecture (Autoplay, ClassNames, AutoHeight) keeps the base bundle small while supporting advanced use cases.

Fluent 2's carousel serves a different purpose than Gestalt or Mantine — it's built for announcement banners and content showcase in enterprise productivity tools (SharePoint hero webparts, Outlook campaign previews, Teams app galleries). Auto-play is supported because these are passive-consumption contexts where users are scanning, not actively browsing. Fluent 2 includes a proper pause button and `aria-live` announcements, addressing the a11y gaps that cause other systems to reject auto-play entirely.

GOV.UK's rejection is the most thoroughly documented: their research found that (1) users almost never interact with carousel controls, (2) auto-play content is invisible to screen reader users unless an `aria-live` region is properly configured (which most implementations fail to do), and (3) pagination dots provide no information about what content is behind each dot. Their recommendation is a static featured-content block showing the single most important item, with remaining items in a visible list below.

## A11y Consensus

- Container: `role="region"` with `aria-roledescription="carousel"` and `aria-label` describing purpose — this is the WAI-ARIA carousel pattern adopted by Fluent 2 and Mantine.
- Each slide: `role="group"` with `aria-roledescription="slide"` and `aria-label="Slide N of M"` — required so screen readers announce slide boundaries.
- Auto-play MUST include a visible, focusable pause/play button (WCAG 2.2.2 Pause, Stop, Hide); pause on hover/focus is supplementary, not sufficient. Fluent 2 is the only T3 system implementing this correctly with a dedicated button.
- `aria-live="polite"` on the slide container so screen readers announce content changes; "polite" (not "assertive") to avoid interrupting the user's current task.
- Arrow navigation: previous/next buttons labeled "Previous slide" / "Next slide"; keyboard-operable via Enter/Space; arrow keys on dots for indicator navigation.
- Hidden slides (outside viewport) should be `aria-hidden="true"` and `tabindex="-1"` on all focusable children — prevents tab-into-invisible-content, a common carousel implementation bug.
- Gestalt's no-auto-play approach sidesteps most a11y concerns entirely — if the user controls all navigation, WCAG 2.2.2 does not apply.

## Recommended Use

Reference Fluent 2 for enterprise announcement/showcase carousels with proper auto-play, pause button, and aria-live announcements — the most WCAG-compliant auto-play implementation. Reference Gestalt for user-driven browse carousels with peek affordance and no auto-play — the strongest "carousels done right" example. Reference Mantine (Embla) for the most complete developer-facing implementation with plugin architecture and responsive breakpoints. Reference GOV.UK for the most thorough evidence-based argument against carousels — essential reading before deciding to use a carousel at all.
