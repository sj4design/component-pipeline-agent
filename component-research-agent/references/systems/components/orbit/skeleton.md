---
system: Orbit (Kiwi.com)
component: Loading (Skeleton)
url: https://orbit.kiwi/components/information/loading/
last_verified: 2026-03-29
confidence: high
---

# Skeleton

> **Name mapping**: Orbit calls this component `Loading` (or uses a skeleton-style loading placeholder). It serves the same purpose as a Skeleton loader in other systems.

## Approach
Orbit's Loading component (skeleton placeholder) is a critical part of the flight search experience, where results are fetched asynchronously and can take several seconds to return. Rather than displaying a spinner that gives no indication of what content is coming, Orbit uses skeleton screens that mirror the shape of the flight result cards — rectangular placeholders for airline logos, flight times, duration bars, and price tags. This approach dramatically reduces perceived loading time because users can mentally prepare for the content layout before it arrives. Given that Kiwi.com's mobile users are frequently on slower connections, the skeleton loader pattern is a meaningful performance perception optimization that the design system treats as a first-class concern.

## Key Decisions
1. **Content-shape mirroring** (HIGH) — Skeleton shapes closely match the layout of the flight result card (logo block, time block, duration line, price block), creating a smooth perceptual transition when real content loads in.
2. **Animation** (HIGH) — A shimmer/pulse animation on the skeleton elements signals that loading is in progress rather than that the page is broken — particularly important during long search queries on slow networks.
3. **Composable primitives** (MEDIUM) — Orbit provides skeleton building blocks (rectangle, circle, text-line) that teams assemble to match their specific content shape, rather than a single monolithic skeleton card, enabling reuse across different content types (search results, trip cards, passenger lists).

## Notable Props
- `width`: skeleton width (fixed or percentage)
- `height`: skeleton height
- `rowCount`: for text-line skeletons, renders multiple lines
- `variant`: `"circle" | "rect" | "text"` — shape variant

## A11y Highlights
- **Keyboard**: Not focusable; purely presentational.
- **Screen reader**: The loading region announces "Loading…" via an `aria-live="polite"` region; individual skeleton elements carry `aria-hidden="true"` to prevent announcement of meaningless placeholder content.
- **ARIA**: A wrapping `role="status"` region with appropriate live-region attributes communicates load state to assistive technology.

## Strengths & Gaps
- **Best at**: Flight search result loading states with composable shape primitives that mirror real card layouts; shimmer animation reduces perceived latency.
- **Missing**: No automatic swap from skeleton to content (managed by the consuming component); no dark-mode skeleton color variant.
