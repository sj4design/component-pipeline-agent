---
component: carousel
compiled: 2026-03-31
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Carousel — All Systems Digest

## Material Design 3
**Approach**: M3 defines Carousel as a scrollable container showing items at different sizes depending on scroll position. Three layouts: multi-browse (multiple items visible with hero item emphasized), uncontained (items peek from edges to signal scrollability), and hero (single full-width item). Items morph size as they scroll — a "large" item shrinks to "medium" or "small" as it moves out of the focal area. No auto-play by default.
**Key decisions**:
- Layout-based variants (multi-browse, uncontained, hero) rather than configuration props; each layout has fundamentally different item sizing behavior — multi-browse shows 1 large + N small items simultaneously while hero shows 1 item full-width
- Size morphing during scroll; items transition fluidly between large/medium/small sizes as they enter and exit the focal area — this communicates that more content exists without relying on pagination dots or arrows
- No auto-play by default; M3 guidelines discourage auto-advancing because it removes user agency and creates a11y barriers for motor-impaired users who cannot react quickly enough to pause
**Notable API**: `CarouselLayoutHelper` (multi-browse|uncontained|hero); `itemCount`; `setItemCountAndAdjustments()`; snap behavior via `SnapHelper`; `maskShape` (item corner radius during morphing)
**A11y**: `role="list"` with `role="listitem"` children; live region announces current item on snap; items outside viewport marked `importantForAccessibility="no"`; swipe/drag + button navigation both supported.
**Best at**: Continuous scrolling with fluid item size morphing — most visually sophisticated carousel model. **Missing**: No built-in pagination dots; no auto-play API; no fade transition.

## Spectrum (Adobe)
**Approach**: No dedicated Carousel component. Spectrum intentionally omits carousels because Adobe's a11y research found that auto-rotating content and hidden-behind-interaction content patterns consistently fail WCAG 2.1 SC 1.3.2 (Meaningful Sequence) and SC 2.2.2 (Pause, Stop, Hide). Creative Cloud surfaces that need horizontal browsing use TabList or ActionGroup with overflow, or grid layouts with pagination.
**Key decisions**:
- Intentional omission; Adobe's internal a11y audit data showed carousels have the highest interaction-failure rate among tested patterns — users miss content hidden behind navigation and auto-play creates timing barriers
- Recommended alternatives: grid with pagination for browse-heavy surfaces (Stock, Fonts); TabList for sequential content that must be compared; ActionGroup overflow for tool panels
- No plans to add; the omission is a design position, not a backlog item
**Notable API**: N/A
**A11y**: N/A (component not offered)
**Best at**: N/A. **Missing**: Entire component — Spectrum's position is that carousels are an anti-pattern.

## Carbon (IBM)
**Approach**: No dedicated Carousel component in the core library. IBM's enterprise focus means most content display uses DataTable, StructuredList, or ContentSwitcher. Carbon community patterns include a carousel-like pattern using CSS Grid with horizontal scroll for marketing pages, but it is not an official component. Carbon's guidance recommends using Tabs or ContentSwitcher for sequential content in enterprise applications.
**Key decisions**:
- Not included in core; enterprise dashboards and admin interfaces rarely benefit from carousels — data is better served by tables, lists, and structured content; carousel's "hidden content" pattern conflicts with enterprise users' need to see all options simultaneously
- Community pattern exists but not standardized; marketing/promotional contexts on ibm.com use a carousel pattern, but it remains outside the component library because it lacks the enterprise usage frequency to justify standardization
- ContentSwitcher as alternative; when content must be shown one-at-a-time, ContentSwitcher provides explicit labeled tabs rather than numbered dots — labeling what's behind each tab respects the user's time
**Notable API**: N/A (community pattern, not official component)
**A11y**: N/A (not official)
**Best at**: N/A. **Missing**: Entire component — Carbon defers to explicit navigation patterns for sequential content.

## Polaris (Shopify)
**Approach**: No dedicated Carousel component. Shopify's merchant admin interface prioritizes immediate content visibility — merchants need to see all product images, banner options, or promotional content at once. Polaris uses Thumbnail grids for product images, MediaCard for featured content, and horizontal scroll via Scrollable for overflow scenarios. The design philosophy explicitly discourages hiding content behind interaction.
**Key decisions**:
- Not included; Shopify merchant admin research showed that carousel content beyond the first slide has <1% click-through rate — merchants don't explore hidden slides, they act on what's immediately visible
- Thumbnail grid as alternative; product image galleries use a grid of thumbnails with a large preview — all images visible at once, zero hidden content
- Scrollable for overflow; when horizontal browsing is needed (e.g., app recommendations), Scrollable with visible overflow hints replaces carousel mechanics without auto-play or pagination dots
**Notable API**: N/A
**A11y**: N/A (component not offered)
**Best at**: N/A. **Missing**: Entire component — Polaris's position is that visible content outperforms hidden-behind-interaction patterns.

## Atlassian
**Approach**: No dedicated Carousel component. Atlassian products (Jira, Confluence, Trello) are productivity tools where content is structured, searchable, and list-based. The closest pattern is Confluence's image gallery which displays a grid of thumbnails expandable to a lightbox — but this is a Confluence-specific pattern, not a design system component. Atlassian's guidance directs teams to use cards in a grid or horizontal scroll containers.
**Key decisions**:
- Not included; Jira/Confluence/Trello product audit found zero carousel use cases that couldn't be better served by lists, grids, or tabs — carousel's promotional/marketing purpose doesn't align with productivity tool patterns
- Image gallery is product-specific; Confluence's gallery is a page macro with lightbox behavior, not a reusable DS component — it serves document authoring, not general carousel needs
- Horizontal scroll via native overflow; when needed, teams use CSS overflow-x with scroll snap — no DS abstraction because the pattern is simple enough to not warrant one
**Notable API**: N/A
**A11y**: N/A (component not offered)
**Best at**: N/A. **Missing**: Entire component — Atlassian considers carousels outside the scope of productivity tool design systems.

## Ant Design
**Approach**: Full-featured Carousel component built on react-slick. Supports auto-play, fade and slide transitions, dots pagination, vertical mode, multiple slides per row, and custom paging. The most complete carousel implementation among Tier 1 systems. Designed for marketing pages, dashboards with rotating announcements, and image galleries.
**Key decisions**:
- Built on react-slick; leveraging the most battle-tested React carousel library provides proven touch/swipe handling, responsive breakpoints, and edge-case coverage — rebuilding from scratch would be engineering waste for a well-solved problem
- `autoplay` + `autoplaySpeed` as first-class props; Chinese enterprise and marketing contexts use auto-rotating banners extensively — Ant Design reflects actual usage patterns rather than imposing Western a11y orthodoxy about auto-play
- `effect: 'fade'` as alternative to slide; fade transitions eliminate the directional confusion of looping carousels where "next" after the last item returns to the first — fade makes the loop transition feel intentional rather than disorienting
**Notable API**: `autoplay`; `autoplaySpeed` (ms); `dots` (boolean); `dotPosition` (top|bottom|left|right); `effect` ('scrollx'|'fade'); `slidesToShow`; `slidesToScroll`; `vertical`; `beforeChange`/`afterChange` callbacks; `goTo(slideNumber)` imperative API; `adaptiveHeight`; `centerMode`; `infinite` (loop); `speed` (transition ms)
**A11y**: `role="listbox"` with `role="option"` children; dots are focusable with arrow key navigation; auto-play pauses on hover and focus; no built-in pause button — developers must add one for WCAG 2.2.2 compliance; aria-live region not built-in for slide change announcements.
**Best at**: Feature completeness — auto-play, fade/slide transitions, multiple slides, vertical mode, imperative navigation API all built-in. **Missing**: No built-in pause button for auto-play; no aria-live announcements on slide change; react-slick dependency adds bundle weight.
