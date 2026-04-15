---
system: Ant Design
component: Upload
url: https://ant.design/components/upload/
last_verified: 2026-03-28
---

# Upload

## Approach

Ant Design's Upload component is the most variant-rich file upload implementation among the Tier 1 systems, and this richness reflects the system's origin in Alibaba's enterprise product ecosystem. Chinese enterprise software — internal admin tools, e-commerce management dashboards, ERP systems — demands a wide range of file upload contexts within a single product. A product manager uploads an avatar; a logistics operator uploads a shipment manifest; a content manager uploads product images by the dozen; a developer uploads a directory of configuration files. Ant Design's answer is not to build a generic component and ask teams to style it — it is to ship distinct, purpose-built visual modes that address each common context with first-class treatment.

The Upload component unifies five distinct interaction modes under one component API: the default list-based button upload (text file list below a button), the Dragger (large drag-and-drop zone), the picture variant (file list with image thumbnails inline), the picture-card variant (a grid of image cards with add and preview states), the picture-circle variant (circular avatar-style image slots), and directory upload (selecting entire filesystem folders). This is more visual modes than any other Tier 1 system. The selection is driven by the `listType` prop (`text`, `picture`, `picture-card`, `picture-circle`) combined with the `Upload.Dragger` subcomponent for the large drop zone.

A distinctive characteristic of Ant Design's Upload is that it handles upload state management as part of its internal data model. The `fileList` prop is a controlled list of file objects, each carrying `uid`, `name`, `status` (`uploading`, `done`, `error`, `removed`), `url`, `percent`, and `response`. When `onChange` fires, the callback receives the current `fileList` with all files and their current statuses, allowing the consumer to maintain the list as React state. This is a higher-level abstraction than Carbon's approach (which delegates state to the consumer entirely) — Ant Design's Upload expects to manage the visual list and only needs the consumer to update status as upload requests complete.

## Key Decisions

1. **Multiple `listType` visual modes as first-class variants** (HIGH) — Rather than a single upload presentation that consumers customize with CSS, Ant Design ships `text` (filename list), `picture` (list with thumbnail), `picture-card` (image grid with add card), and `picture-circle` (circular slots) as official modes. The WHY is the sheer range of enterprise upload contexts in Alibaba's product portfolio. A user management panel needs circular avatar slots; a product gallery needs a picture-card grid; a document management tool needs a filename list. First-class variants ensure these are consistently implemented across products rather than reinvented each time. No other Tier 1 system offers this degree of built-in visual variety.

2. **`Upload.Dragger` as a compositional subcomponent** (HIGH) — The large drag-and-drop variant is exposed as `Upload.Dragger` rather than a prop on the base Upload component. This means teams import the visually distinct component explicitly rather than toggling a mode flag. The WHY is that the Dragger has sufficiently different layout characteristics (it fills its container, renders a large central illustration area, expects content slotted as children) that a prop-based mode switch would create awkward conditional rendering. Treating it as a subcomponent gives it a cleaner compositional API.

3. **`fileList` as a controlled prop for external state management** (HIGH) — Upload accepts `fileList` as a controlled array of file objects, and `onChange` fires with the updated list whenever a file is added, progresses, or completes. This is a "controlled component" model, consistent with how Ant Design handles other stateful components like Select and Table. The WHY is that enterprise applications integrating file upload into complex forms, wizard flows, or data-bound UIs need the file list to be part of their application state — not hidden inside the component. Consumers can persist the list, restore it on navigation, or sync it with server-validated state.

4. **Directory upload via `directory` prop** (MEDIUM) — Setting `directory={true}` enables folder selection, exposing the `webkitdirectory` browser attribute. Ant Design is one of only two Tier 1 systems (along with Spectrum's FileTrigger) to surface this capability. The use case in Alibaba's context is bulk asset import for e-commerce operators — uploading an entire product photo shoot folder rather than individually selecting dozens of images. The known limitation (documented by the community) is that drag-and-drop directory upload has inconsistent browser support and the `directory` + `multiple` combination in the Dragger can fail in some browsers.

5. **`onPreview` callback for preview delegation** (MEDIUM) — Instead of rendering file previews internally, Upload calls `onPreview` when a user clicks a file link or preview icon, passing the file object and leaving preview rendering to the consumer. For `picture-card` mode, clicking a card triggers `onPreview`. The WHY is that Ant Design's enterprise context means previews are often served from CDN URLs with authentication tokens, or need to open in a custom modal with additional metadata — behaviors that cannot be generalized. By delegating to `onPreview`, the component avoids coupling to a specific preview implementation.

## Notable Props

- `listType`: `'text' | 'picture' | 'picture-card' | 'picture-circle'` — determines the entire visual presentation of the upload list; this single prop switches between four distinct layout paradigms, making it the most influential prop in the API.
- `fileList`: Controlled array of `UploadFile` objects with `status`, `percent`, `url`, and `response` — notable because it gives consumers direct control over what the component renders, enabling restoration of upload history and server-side list population.
- `action`: String URL or async function that returns a URL — notable because the async function form allows dynamic upload endpoint selection per file, useful when different file types route to different storage services.
- `customRequest`: Override for the entire upload HTTP request — notable because enterprise applications often need to replace XMLHttpRequest with a custom SDK call (Alibaba OSS SDK, AWS S3 SDK) rather than a standard form POST.
- `transformFile`: Async function that transforms the file before upload — notable because it enables client-side image compression, format conversion, or metadata injection before the file leaves the browser.
- `beforeUpload`: Validation callback returning boolean or Promise — notable because returning `false` prevents upload without rejecting the file from the list, allowing review-before-upload workflows.
- `directory`: Enables folder selection — notable for bulk upload workflows.

## A11y Highlights

- **Keyboard**: Ant Design Upload builds on native `<input type="file">` semantics, so the trigger button inherits standard keyboard behavior (Tab to focus, Enter/Space to open file dialog). The picture-card grid renders each card as a focusable element. The Dragger variant renders its drop zone as an interactive area that can be activated by keyboard, though the specific keyboard implementation for the drag target depends on the underlying rc-upload library behavior.
- **Screen reader**: The `showUploadList` configuration and the inline list of file items are rendered as standard HTML list structures, making them navigable by screen readers. Status changes (`uploading` → `done` → `error`) within the `fileList` update the rendered list, but Ant Design does not explicitly specify ARIA live regions for these status transitions — teams must add `aria-live` regions to announce status changes to screen reader users.
- **ARIA**: Ant Design applies ARIA attributes contextually across its components, including `role`, `aria-label`, and `aria-expanded` where appropriate. For Upload specifically, the native input element carries file input semantics. The `picture-card` preview overlay includes icon buttons that should carry `aria-label` values for screen readers; the documentation does not specify whether these are provided by default or require consumer configuration.

## Strengths & Gaps

- **Best at**: Visual variant coverage — the combination of `listType` variants (`text`, `picture`, `picture-card`, `picture-circle`), the `Upload.Dragger` subcomponent, and `directory` upload makes Ant Design's Upload the most contextually versatile first-party upload component among all Tier 1 systems; no other system covers this range of upload UI paradigms with a single component.
- **Missing**: Explicit accessibility specification — despite Ant Design's general ARIA support, the Upload component lacks documented ARIA live region strategy for upload progress announcements and screen reader behavior for status transitions, making it less accessible out-of-the-box than Carbon for enterprise screen-reader users.
