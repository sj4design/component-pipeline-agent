---
component: Image
tier: 3
last_verified: 2026-03-31
---

# Image — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | No dedicated Image component | Headless library with no Image primitive; image handling is outside Radix's scope (interaction primitives only). Avatar has image fallback logic but no standalone Image. | high |
| Chakra UI | Image | Wraps `<img>` with `fallbackSrc` and `fallback` props for error states; `objectFit` and `borderRadius` styling; integrates with Chakra's style props. No lazy loading or preview. | high |
| GOV.UK | Image (govuk-image) | Basic responsive image within GOV.UK's content patterns; required `alt` enforcement; no preview or lazy loading — optimized for document-style government content. | high |
| Base Web (Uber) | No dedicated Image component | No Image primitive; images handled via standard HTML. The `AspectRatioBox` utility can wrap images for ratio enforcement. | medium |
| Fluent 2 | Image | `fit` prop maps to `object-fit` values (`none`, `center`, `contain`, `cover`, `default`); `shape` prop (`circular`, `rounded`, `square`) for clipping; `shadow` and `bordered` props. No preview or lazy loading. | high |
| Gestalt (Pinterest) | Image | The most image-focused Tier 3 system. `naturalWidth`/`naturalHeight` for aspect ratio; `fit` prop (`cover`, `contain`, `none`); built-in lazy loading via `loading="lazy"`; `color` prop for placeholder background matching dominant image color; role prop for a11y. Pinterest's core use case makes Image a first-class citizen. | high |
| Mantine | Image | `fallbackSrc` for error fallback; `radius` for border-radius from theme scale; `fit` for object-fit; `component` prop for polymorphic rendering (e.g., Next.js Image). No preview — use separate Lightbox component. | high |
| Orbit (Kiwi.com) | No dedicated Image component | Travel UI focuses on icons, illustrations, and structured content; no standalone Image component. Destination images handled at the product layer. | high |
| Evergreen (Segment) | No dedicated Image component | Analytics dashboard UI; images are uncommon in Segment's product context. No Image component provided. | medium |
| Nord (Nordhealth) | No dedicated Image component | Healthcare EHR context; patient images handled via specialized DICOM viewers, not generic Image components. No Image in the DS. | medium |

## Key Decision Patterns

Gestalt (Pinterest) stands apart as the Tier 3 system where the Image component receives the deepest investment. Pinterest's entire product is image-centric, so Gestalt's Image includes: `naturalWidth`/`naturalHeight` props for server-known dimensions that prevent layout shift, a `color` prop that fills the placeholder area with the image's dominant color before it loads (the "colored placeholder" pattern visible on Pinterest boards), and built-in lazy loading. This is the single strongest reference for image-heavy applications.

Chakra UI and Mantine take a practical approach with `fallbackSrc` / `fallback` props that display an alternative image or component when the primary source fails. This simple error-handling pattern adds meaningful value over native `<img>` with minimal complexity. Both systems also support polymorphic rendering (`as` / `component` props), enabling drop-in replacement with framework-specific optimized images (Next.js Image, Gatsby Image) while retaining DS styling.

Fluent 2's Image is notable for its `shape` prop (`circular`, `rounded`, `square`) which applies clipping semantically rather than via raw border-radius — similar to how Fluent handles Avatar shapes. The `bordered` and `shadow` props provide elevation control specific to images, useful in document/card layouts in Microsoft 365.

The majority of Tier 3 systems (Radix, Base Web, Orbit, Evergreen, Nord) do not provide an Image component at all, reflecting the position that image display is either too simple to warrant abstraction (Radix's headless philosophy), too domain-specific for a general DS (Nord's healthcare context), or simply outside the product's primary UI patterns (Evergreen's analytics dashboards).

No Tier 3 system provides a built-in preview/lightbox on the Image component itself. Mantine explicitly separates concerns with a standalone Lightbox component. Chakra and Gestalt expect consumers to compose image click handlers with modal/overlay components for preview behavior.

## A11y Consensus

- Gestalt is the strongest a11y reference: the `role` prop explicitly marks images as `"img"` (informative, requires alt) or `"presentation"` (decorative, hides from AT). This forced decision prevents ambiguity.
- Chakra and Mantine pass `alt` through to the underlying `<img>` but do not enforce it as required — consumer responsibility.
- Fluent 2 follows WAI guidance: informative images get `alt`, decorative images get `alt=""` plus `aria-hidden="true"`.
- GOV.UK enforces `alt` as required in its image component, consistent with government accessibility regulations (WCAG AA mandatory).
- Lazy-loaded images (Gestalt) must still have correct alt text — `loading="lazy"` is a performance concern, not an a11y exemption.
- No Tier 3 system auto-generates alt text; all require explicit authoring.

## Recommended Use

Reference Gestalt (Pinterest) for image-heavy applications requiring layout-shift prevention (`naturalWidth`/`naturalHeight`), dominant-color placeholders, and lazy loading. Use Chakra or Mantine's `fallbackSrc` pattern for simple error handling. Reference Fluent 2 for semantic shape clipping (`circular`/`rounded`/`square`). For preview/lightbox behavior, the strongest reference remains Ant Design (Tier 1) — no Tier 3 system includes built-in preview.
