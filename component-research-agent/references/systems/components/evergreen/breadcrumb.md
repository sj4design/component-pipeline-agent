---
system: Evergreen (Segment/Twilio)
component: Not available natively
url: https://evergreen.segment.com/components/
last_verified: 2026-03-29
confidence: high
---

# Breadcrumb

## Approach
Evergreen does not include a Breadcrumb component, and this reflects the architectural reality of Segment's product. Segment is a single-page application (SPA) built around a persistent sidebar navigation model where the current context (workspace, source, destination, audience) is always visible in the navigation structure itself. In this model, breadcrumbs would be redundant — the sidebar already communicates "you are in Workspace X > Sources > Source Y." Breadcrumbs are most valuable in multi-level content hierarchies accessed through deep linking or search (e.g., documentation sites, e-commerce category trees), neither of which describes Segment's core analytics dashboard. The SPA architecture also means that URL-based breadcrumb generation is non-trivial, as much of Segment's navigation state is application state rather than URL hierarchy, further reducing the value of a breadcrumb primitive.

## Key Decisions
1. **SPA sidebar navigation as the wayfinding model** (HIGH) — Evergreen's product context uses a persistent left-nav panel that always shows the current location hierarchy, making breadcrumbs architecturally redundant for the target use case.
2. **URL path doesn't always equal content hierarchy** (MEDIUM) — In Segment's SPA, URLs like `/sources/:id/overview` represent state transitions, not a content tree that breadcrumbs could meaningfully reflect.
3. **No secondary use cases** (MEDIUM) — Evergreen's documented scope is Segment's analytics UI; no part of that UI has a confirmed breadcrumb requirement.

## Notable Props
- N/A — component not present in Evergreen.

## A11y Highlights
- **Keyboard**: N/A
- **Screen reader**: N/A
- **ARIA**: N/A

## Strengths & Gaps
- **Best at**: N/A — component intentionally absent.
- **Missing**: A Breadcrumb component entirely. Teams using Evergreen in multi-level content apps should compose one from Evergreen's `Link` component and inline text separators, wrapping in `<nav aria-label="Breadcrumb"><ol>`.
