---
component: Carousel
tier: 2
last_verified: 2026-03-31
---

# Carousel — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Not available — a11y concerns | No carousel component; Paste's strict WCAG compliance stance treats carousels as inherently problematic for auto-play timing and hidden content discovery; recommends Card grids or Tabs. | high |
| Salesforce Lightning | Carousel | Full implementation: auto-scroll with configurable interval, pagination dots, previous/next arrow buttons, image-based slides with title/description overlays. Enterprise marketing and home page use cases. | high |
| GitHub Primer | Not available — content model | No carousel component; GitHub's developer-tool context has no use case for rotating content — repositories, issues, and PRs are list/table patterns. | high |
| shadcn/ui | Carousel | Wrapper around Embla Carousel; supports horizontal/vertical orientation, loop, auto-play via plugin, multiple slides visible, responsive slides-per-view via CSS, previous/next buttons, dots via plugin. | high |
| Playbook | Carousel (not present) | Not present in component library; eBay product listings use grid-based browse patterns rather than carousels. | medium |
| REI Cedar | Not available — product focus | No carousel component; REI's outdoor retail interface uses product grids and category cards rather than rotating content. | medium |
| Wise Design | Not available — financial focus | No carousel component; financial product interfaces prioritize static, scannable content over rotating promotional patterns. | low |
| Dell Design System | Carousel | Enterprise marketing carousel for product showcase pages; image rotation with navigation controls. | low |

## Key Decision Patterns

**Adoption rate is low:** Only 3 of 8 Tier 2 systems offer a carousel (Lightning, shadcn/ui, Dell). The majority deliberately omit it, citing a11y concerns, lack of product use cases, or preference for always-visible content patterns. This is the lowest adoption rate of any common UI component across Tier 2.

**Library wrapping vs. native build:** shadcn/ui wraps Embla Carousel, a lightweight (~3KB) headless carousel engine with plugin architecture. Lightning builds its own. The wrapping approach is increasingly preferred — carousel scroll physics, touch handling, and snap behavior are complex enough that purpose-built libraries outperform from-scratch implementations. Embla's plugin system (autoplay, dots, autoheight) keeps the core minimal while allowing opt-in features.

**Auto-play divergence:** Lightning includes auto-scroll as a built-in prop with configurable interval and pause-on-hover. shadcn/ui defers auto-play to Embla's Autoplay plugin, making it explicitly opt-in rather than available by default. This reflects the tension between marketing requirements (Lightning serves Salesforce homepages) and developer caution (shadcn/ui serves developer-facing apps).

**Slide content model:** Lightning is image-focused — each slide has a src, header, and description, making it a specialized image rotator. shadcn/ui accepts arbitrary children per slide (CarouselItem), making it a generic horizontal scroll container. The generic model is more flexible but requires more composition work from developers.

## A11y Consensus
- `role="region"` with `aria-roledescription="carousel"` on the container; `aria-label` describing the carousel's purpose
- Each slide: `role="group"` with `aria-roledescription="slide"` and `aria-label="N of M"`
- Previous/Next buttons must be keyboard-accessible with clear labels ("Previous slide" / "Next slide")
- Auto-play MUST have a visible pause button (WCAG 2.2.2); pause on hover and focus is supplementary, not sufficient alone
- `aria-live="polite"` region to announce slide changes for screen reader users
- Dots/indicators: focusable with arrow key navigation; current dot marked with `aria-current="true"` or `aria-selected="true"`

## Recommended Use

Reference Lightning for enterprise marketing carousel with built-in auto-scroll and image-focused slide model. Reference shadcn/ui (Embla) for modern headless approach with plugin architecture, arbitrary slide content, and lightweight bundle. For systems that omit carousels entirely, their reasoning is instructive: evaluate whether a card grid, tabs, or paginated list better serves the actual content discovery need before defaulting to a carousel.
