---
component: image
compiled: 2026-03-31
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** No dedicated Image component
**Approach:** M3 does not formalize a standalone Image component. Image display relies on standard `<img>` elements or platform-native image widgets (Jetpack Compose `Image`, Flutter `Image.network`) styled with M3 shape and surface tokens. Aspect ratio and clipping are handled through shape tokens (`shape.corner.medium` for rounded images). Loading states are delegated to the Skeleton/Placeholder pattern at the application layer.
**Key Decisions:**
- [HIGH] Absent by design: M3 treats images as a content primitive styled with tokens, not a component with behavior — consistent with M3's philosophy of only formalizing interactive components
- [MED] Shape tokens for clipping: images use `shape.corner.*` tokens for border-radius, enabling consistent rounding across the system without a dedicated component
- [MED] No lazy loading or fallback: platform-native image loading APIs (Coil/Glide on Android, `Image.network` in Flutter) handle these concerns outside the design system
**Notable API:** Shape tokens `shape.corner.none/extraSmall/small/medium/large/extraLarge/full` for image clipping; no component-level props.
**A11y:** Relies on standard `<img alt="">` or platform-native content descriptions. No design-system-level alt text enforcement.
**Best at:** Consistent image rounding via shape tokens when used within M3's token ecosystem.
**Missing:** Entire Image component: lazy loading, placeholder/skeleton during load, error fallback, preview/lightbox, aspect ratio control, srcset/responsive, and caption.

---

## spectrum
**Component:** No dedicated Image component (Image handled via asset guidelines)
**Approach:** Spectrum does not include a standalone Image component. Adobe products rely on standard `<img>` elements with Spectrum's spacing and dimension tokens for sizing. The design system provides guidelines on image usage within cards, hero sections, and media displays, but no abstraction over the native element. React Spectrum has no `Image` export.
**Key Decisions:**
- [HIGH] Absent: image display is treated as content layout, not component behavior — Adobe's authoring tools (Experience Manager) handle image optimization at the CMS layer
- [MED] Alt text enforcement via guidelines: Spectrum's a11y documentation strongly requires meaningful alt text on all images, but enforcement is cultural, not API-level
- [MED] No lazy loading abstraction: loading strategies are delegated to the platform or build tooling (e.g., Next.js Image, native `loading="lazy"`)
**Notable API:** No Image component. Standard `<img>` with Spectrum dimension tokens for width/height constraints.
**A11y:** Spectrum's accessibility guidelines mandate non-empty `alt` for informative images and `alt=""` with `aria-hidden="true"` for decorative images. No component-level enforcement.
**Best at:** Nothing image-specific — Spectrum's gap means teams rely on platform-native or framework-specific image components.
**Missing:** Entire Image component: lazy loading, placeholder/skeleton, error fallback, preview/lightbox, aspect ratio, responsive srcset, and caption.

---

## carbon
**Component:** No dedicated Image component
**Approach:** Carbon has no Image component in its core library. Image display uses standard HTML `<img>` or the `ImageWithCaption` pattern in Carbon for IBM.com (an extension library for marketing pages). The core system focuses on structured data and form components; media-rich patterns are handled in domain-specific extensions.
**Key Decisions:**
- [HIGH] Absent from core: Carbon's enterprise/infrastructure focus means most UIs are data-dense dashboards where images are uncommon, reducing demand for a dedicated component
- [MED] `ImageWithCaption` in IBM.com extension: a specialized pattern for marketing pages that pairs an image with a heading and caption — not a general-purpose Image component
- [MED] No loading/error states: developers handle image loading, placeholders, and errors at the application layer with no Carbon guidance
**Notable API:** No core Image component. `ImageWithCaption` (IBM.com library) provides `image`, `heading`, `copy` props for marketing layouts.
**A11y:** Teams implement `alt` on `<img>` elements. IBM.com's `ImageWithCaption` requires `alt` as a prop. No core Carbon guidance specific to image a11y beyond standard web practices.
**Best at:** The `ImageWithCaption` pattern in IBM.com provides a structured media + text layout for marketing contexts.
**Missing:** A general-purpose Image component with lazy loading, fallback/placeholder, preview, aspect ratio control, and responsive behavior.

---

## polaris
**Component:** Thumbnail
**Approach:** Polaris provides `Thumbnail` rather than a generic Image component, reflecting Shopify's product-centric context where images represent products, collections, or file attachments. Thumbnail enforces a fixed aspect ratio (square) with three sizes and a fallback to a file-type icon when the image source is unavailable. It is intentionally constrained — not a general-purpose image display.
**Key Decisions:**
- [HIGH] Product-context naming: `Thumbnail` instead of `Image` signals that this component is for compact product/file previews in admin lists and cards, not for hero images or media galleries
- [HIGH] Icon fallback on error: when `source` fails, Thumbnail renders a file-type icon based on the `alt` text context, preventing broken image placeholders in product lists
- [MED] Fixed square aspect ratio: all thumbnails are square-cropped with `object-fit: cover`, optimized for product grid layouts where consistent sizing is critical
**Notable API:** `size: "extraSmall" | "small" | "medium" | "large"`; `source: string` (image URL); `alt: string` (required); `transparent: boolean` for images with alpha channel (removes background fill)
**A11y:** `alt` is a required prop — Polaris enforces that every Thumbnail has a text description. The component renders a standard `<img>` with the provided alt text.
**Best at:** Product thumbnail display with automatic icon fallback — zero-config for the most common Shopify Admin use case (product images in lists/cards).
**Missing:** General-purpose image features: lazy loading, skeleton placeholder during load, preview/lightbox on click, responsive srcset, custom aspect ratios, and caption. Not designed for hero images or media galleries.

---

## atlassian
**Component:** Image (limited) / MediaImage
**Approach:** Atlassian DS does not have a prominent standalone Image component in its core library. Image display in Jira and Confluence relies on the media components (`MediaImage`, `MediaCard`) from the Atlassian Media package, which handle file uploads, thumbnails, and previews within Jira issues and Confluence pages. These are tightly coupled to Atlassian's media services rather than being generic image components.
**Key Decisions:**
- [HIGH] Media-service coupling: Atlassian's image components are designed to work with their media upload/storage backend — not general-purpose `<img>` wrappers
- [MED] `MediaCard` for file previews: renders image, video, and document thumbnails with loading states, error states, and actions (download, delete) — a media object pattern rather than a simple image
- [MED] No standalone lightweight Image: teams use standard `<img>` for simple image display; the DS focuses on media-rich interaction patterns
**Notable API:** `MediaCard` with `identifier` (media service ID), `appearance: "image" | "horizontal" | "square"`, loading/error states built-in. Not a simple src-based API.
**A11y:** MediaCard provides accessible labels derived from file metadata (filename, upload context). Standard `<img>` usage follows platform a11y guidelines with `alt` text.
**Best at:** Rich media handling (upload, preview, download) within Atlassian's ecosystem — loading/error states are built into the media pipeline.
**Missing:** A simple, lightweight Image component for general use. No lazy loading abstraction, no srcset, no aspect ratio control, no lightbox outside the media viewer context.

---

## ant-design
**Component:** Image / Image.PreviewGroup
**Approach:** Ant Design provides the most complete Image component in Tier 1. The `Image` component wraps `<img>` with built-in preview (lightbox on click), fallback display on error, placeholder during loading (supports skeleton or blur-up), and `Image.PreviewGroup` for gallery navigation across multiple images. It is one of the few DS components that treats image display as a first-class interactive pattern.
**Key Decisions:**
- [HIGH] Built-in preview/lightbox: clicking an image opens a full-screen preview overlay with zoom, rotate, and flip controls — no additional library needed
- [HIGH] `Image.PreviewGroup` for galleries: wrapping multiple `Image` components enables left/right navigation across images in the preview overlay — a complete gallery solution
- [MED] `fallback` prop: specifies a fallback image URL when the primary `src` fails to load — prevents broken image states
- [MED] `placeholder` prop: accepts a React node (commonly `Image` with `preview={false}` for blur-up effect, or a skeleton) shown during loading
**Notable API:** `src`, `alt`, `width`, `height`, `fallback` (fallback URL), `placeholder` (loading placeholder node), `preview` (boolean or config object with `visible`, `onVisibleChange`, `mask`, `maskClassName`), `rootClassName`; `Image.PreviewGroup` wraps multiple images for gallery preview
**A11y:** Renders standard `<img>` with `alt` prop. Preview overlay provides keyboard navigation (arrow keys for gallery, Escape to close). Zoom/rotate controls are keyboard accessible. `alt` is not enforced as required — consumer responsibility.
**Best at:** Built-in preview/lightbox with gallery support — the most feature-rich image component in any Tier 1 system, handling loading, error, and preview states out of the box.
**Missing:** Lazy loading (relies on native `loading="lazy"`), responsive srcset management, aspect ratio locking, and caption/figcaption support. Alt text is not enforced as required.
