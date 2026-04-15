---
system: Polaris (Shopify)
component: DropZone
url: https://polaris.shopify.com/components/selection-and-input/drop-zone
last_verified: 2026-03-28
---

# DropZone

## Approach

Shopify Polaris names its file upload component DropZone, and that naming choice is intentional and revealing. In the Shopify merchant context, the primary file upload use case is not uploading documents or data files — it is uploading product images, theme files, variant thumbnails, and custom brand assets. These are fundamentally visual uploads, where the content of the file matters immediately and where merchants benefit from spatial, drag-and-drop thinking rather than form-field thinking. The name DropZone positions the component as a target area in a visual canvas, not as a form input.

Polaris's philosophy is pragmatic and merchant-centric: provide both drag-and-drop and click-to-upload because merchants have varying levels of technical sophistication and are working across devices (desktop and mobile). The component validates files client-side immediately on drop or selection, surfacing instant rejection messages ("File type must be .gif, .jpg, .png or .svg") to reduce merchant frustration before any server round-trip occurs. The post-selection experience — showing selected file previews — is deliberately not built into DropZone itself. Instead, Polaris documents the pattern of combining DropZone with the Thumbnail component and `window.URL.createObjectURL()` for preview rendering, keeping the component's scope focused on selection and validation while giving product teams freedom over how to display the selected files.

The component's most distinctive structural feature is the FileUpload subcomponent — a composable inner element that provides customizable text and action labels. This exists because Shopify's merchant surfaces vary enormously: a store owner uploading a product image gets different guidance text than a developer uploading a theme file. Rather than exposing a proliferation of label props on DropZone itself, Polaris chose the composition approach where the inner content is a swappable component.

## Key Decisions

1. **Dual interaction model: drag-and-drop AND click** (HIGH) — DropZone activates the native file picker on click while also accepting dragged files. Critically, these are not two separate modes — the same component does both simultaneously. The WHY is that merchant device and skill diversity makes either approach alone insufficient: tablet-using merchants in physical retail cannot drag-and-drop; power users at desktops prefer dragging. Combining both into one component means Shopify doesn't have to decide which of its merchant audiences is "primary."

2. **Client-side validation with `customValidator` escape hatch** (HIGH) — DropZone validates `accept` file types and provides an `errorOverlayText` prop for rejection messaging. More importantly, it exposes a `customValidator(file: File): boolean` callback, allowing merchants (or more precisely, Shopify app developers) to implement domain-specific rules beyond MIME type — checking image resolution, validating file structure, enforcing naming conventions. The WHY is that Shopify's merchant platform is extended by thousands of third-party apps, each with their own file requirements, and a fixed validation model would force every app to display errors in an inconsistent post-selection error state rather than at the moment of selection.

3. **FileUpload subcomponent for context-specific messaging** (MEDIUM) — The inner content of the drop zone is rendered via a separate `FileUpload` component (not a prop). This means the entire visual interior — the upload icon, headline, and description — can be replaced with any React content while maintaining DropZone's behavioral wrapper. The WHY is that different Shopify surfaces need different messaging: product image upload says "Add image," theme file upload says "Upload .zip file," CSV import says "Drop your CSV here." A single `label` prop would be insufficient for these varying content structures.

4. **`dropOnPage` for whole-page drop targets** (MEDIUM) — The `dropOnPage` boolean makes the entire page a valid drop target instead of requiring users to aim at the component bounds. The WHY is in Shopify's product image gallery context: merchants frequently drag files from their desktop file browser onto what they perceive as "the product page," not at a specific bounded zone. `dropOnPage` respects this mental model by making the whole surface receptive. This prop is unique among Tier 1 systems — none of the others offer page-level drop reception as a configurable option.

5. **Nested DropZones for contextual upload in tight layouts** (MEDIUM) — DropZone supports nesting: a large outer zone can contain smaller inner zones that represent specific upload targets. The documented use case is a product variant management screen where each variant thumbnail (40×40px) is its own drop target inside a larger management panel. The WHY is that Shopify's product management UI has dozens of variant images per product; giving each image slot its own drop target — even at thumbnail size — eliminates the need for a modal or overlay upload flow per variant.

## Notable Props

- `dropOnPage`: Makes the entire page a drop target — unique to Polaris; reflects Shopify's understanding of how merchants physically interact with their desktop.
- `customValidator`: Callback `(file: File) => boolean` for domain-specific validation beyond MIME type — reflects the third-party app ecosystem's varied requirements.
- `variableHeight`: Allows the component height to be determined by its children rather than a fixed minimum — critical for post-selection file list rendering without layout shift.
- `openFileDialog`: External trigger to open the file dialog programmatically — enables decoupled trigger buttons in toolbars separate from the visual drop zone.
- `type: 'file' | 'image' | 'video'`: Semantic type hint that affects accept filtering defaults and accessible descriptions — simplifies the most common use cases without requiring explicit MIME type lists.
- `allowMultiple`: Multi-file toggle — defaults to `true`, reflecting Shopify's expectation that bulk product image upload is the norm.

## A11y Highlights

- **Keyboard**: DropZone renders a native `<input type="file">` wrapped in a visually styled container. The interactive region receives Tab focus. Enter and Space activate the file dialog. Shift+Tab navigates backward. Because the underlying element is a native input, keyboard behavior is browser-native and does not require custom event handling.
- **Screen reader**: The component uses a `<label>` element to associate descriptive text with the file input. The `labelHidden` prop allows visual omission of the label while preserving the accessible label in the DOM for screen readers — an explicit accommodation for designs where the drop zone's visual context makes a visible label redundant.
- **ARIA**: DropZone builds on native file input semantics, which carry built-in ARIA roles. The `label` prop populates the input's accessible name. Error overlay text is rendered visually on hover over rejected files, but Polaris does not specify a live region strategy for communicating rejection to screen readers — this is a documented gap where consumer teams must add `aria-live` regions for full screen reader support.

## Strengths & Gaps

- **Best at**: Merchant-context flexibility — the combination of `dropOnPage`, nested zones, `customValidator`, and the FileUpload subcomponent makes DropZone exceptionally adaptable to Shopify's varied merchant surfaces without requiring component overrides.
- **Missing**: Built-in thumbnail preview generation — Polaris documents a manual pattern using `window.URL.createObjectURL()` with the separate Thumbnail component, but there is no first-party preview rendering; teams must wire this themselves, which is a meaningful implementation burden for image-heavy upload flows.
