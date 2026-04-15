---
component: file-upload
compiled: 2026-03-28
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Absent — Button + hidden input pattern
**Approach:** M3 has no file upload component. The standard pattern is a `FilledButton` or `OutlinedButton` that triggers a visually-hidden `<input type="file">` via a label or programmatic `.click()`. There is no drag-and-drop guidance, no file list component, and no upload progress indicator in M3's component set.
**Key Decisions:**
- [HIGH] Absent: M3's scope is core interaction components; file handling is treated as a system/OS concern, not a design system component
- [MED] Button triggers hidden input: standard web pattern — button styled with M3 tokens, hidden input with `accept` attribute for file type restriction
- [MED] No drag-and-drop guidance: teams must implement drop zones entirely custom with no M3 reference for styling or interaction pattern
**Notable API:** No component. `<input type="file">` with `<label>` association; `accept` attribute for type restriction; `multiple` for multi-file selection.
**A11y:** Native `<input type="file">` provides keyboard activation (Space/Enter on the associated button label) and screen reader support. No additional ARIA needed for the button-trigger pattern.
**Best at:** Nothing specific — native `<input type="file">` with standard HTML semantics works anywhere.
**Missing:** Drag-and-drop zone, upload progress, file list display, per-file error states, and any upload UI management.

---

## spectrum
**Component:** FileTrigger + DropZone (separate composable components)
**Approach:** Spectrum separates file selection (FileTrigger) from drag-and-drop (DropZone) into distinct components. FileTrigger wraps any interactive element (Button, Link) and adds `<input type="file">` behavior to it. DropZone is an independent droppable region that fires `onDrop`. `acceptDirectory` on FileTrigger enables folder selection. `defaultCamera` targets mobile camera input.
**Key Decisions:**
- [HIGH] FileTrigger as a behavior wrapper: any Spectrum interactive element becomes a file trigger — no forced visual style, composable with any button variant
- [MED] `acceptDirectory` for folder upload: exposes `webkitdirectory` attribute on the hidden input — one of two Tier 1 systems with first-class folder upload support
- [MED] No state management: Spectrum provides no file list component or upload progress — state management (selected files, upload progress, errors) is entirely the application's responsibility
**Notable API:** `FileTrigger`: `acceptedFileTypes`, `allowsMultiple`, `acceptDirectory`, `defaultCamera`; `DropZone`: `onDrop`, `isDisabled`, `getDropOperation`
**A11y:** FileTrigger preserves the trigger element's accessibility — keyboard and screen reader users interact with the original button/link and get its semantics. DropZone has `role="region"` with `aria-label`.
**Best at:** Composability — FileTrigger adds file selection to any Spectrum button without forcing a specific visual treatment.
**Missing:** File list display, per-file status, upload progress indicator — Spectrum provides only the file selection mechanism, not the upload management UI.

---

## carbon
**Component:** FileUploader (most a11y-complete Tier 1)
**Approach:** Carbon's FileUploader is the most complete in Tier 1 for accessible upload state management. Two visual variants: button (triggers file dialog) and drop zone. Per-file states: `uploading`, `uploaded`, `error`, `selected`. The drop zone renders as a `<button>` rather than a `<div>` — the key accessibility decision that makes the zone keyboard-operable without additional ARIA. Upload initiation is consumer-controlled (Carbon does not auto-upload).
**Key Decisions:**
- [HIGH] Drop zone as `<button>` element: the drag-and-drop zone is keyboard-focusable and activatable (Enter/Space opens file dialog) because it is a `<button>` — critical for keyboard-only users who cannot drag files
- [HIGH] Consumer-controlled upload initiation: adding files to the list does not trigger upload; the consumer decides when to start the HTTP request — enables review-before-submit workflows
- [MED] `fileUploaderId` required: each file upload instance needs a unique ID for proper label association — enforces accessibility label wiring
**Notable API:** Per-file status objects with `{ name, status, iconDescription, invalid, errorSubject, errorBody }`; `buttonLabel`; `labelTitle` / `labelDescription` for drop zone labels; `filenameStatus` for bulk status updates
**A11y:** Drop zone `<button>` provides keyboard access; per-file items have `aria-label` including file name and status; status transitions (uploading → uploaded → error) update `aria-label` for screen reader announcement.
**Best at:** Accessibility — the `<button>` drop zone, per-file status aria-labels, and consumer-controlled upload timing are the most complete accessible upload implementation in Tier 1.
**Missing:** Image preview thumbnails; picture-grid upload mode; folder/directory upload.

---

## polaris
**Component:** DropZone (image-upload focused)
**Approach:** Polaris's DropZone reflects its origin as an image upload solution for Shopify's product photo management. Dual interaction: drag-and-drop and click-to-select. `customValidator` callback for file type/size validation. `dropOnPage` enables whole-page drop targeting. Nested DropZones create inner vs. outer zones for variant handling (e.g., an image zone inside a product form). `openFileDialog` triggers the dialog programmatically from external controls.
**Key Decisions:**
- [HIGH] `customValidator` callback: `(file: File) => boolean` — per-file validation run before any file is accepted; returns false to reject the file with an error state
- [MED] `dropOnPage` prop: extends the drop target to the entire browser viewport — merchant photo uploading by dragging from Finder/Explorer to the browser window
- [MED] Nested DropZones for variant handling: outer zone accepts all files; inner zone in a specific position accepts a subset (e.g., main image vs. additional images) — used in Shopify Admin's product image upload UI
**Notable API:** `accept` for MIME type restriction; `customValidator`; `dropOnPage: boolean`; `openFileDialog: boolean`; `allowMultiple: boolean`; `overlay` and `overlayText` for the drag-active state display
**A11y:** The drop zone renders as an interactive region; click activates the hidden file input. No explicit `role="button"` on the drop zone by default — the interactive behavior is present but the ARIA role may not be. No `role="status"` live region for upload progress announcements.
**Best at:** `customValidator` for per-file validation and `dropOnPage` for full-page drop targets — practical for Shopify Admin's product photo workflows.
**Missing:** Per-file upload progress, per-file error states beyond the validator callback, and `<button>` drop zone semantics (Carbon's key a11y advantage).

---

## atlassian
**Component:** Media Picker (pattern — multi-source)
**Approach:** Atlassian uses a Media Picker pattern rather than a simple file upload component. It supports multiple sources: local file system, recent files, URLs, and integrated cloud services (Google Drive, Dropbox). The drag-and-drop canvas is the "preferred pathway." Grid and list view toggle for the file browser. Badge count shows selection count during multi-select. Used in Confluence page editors for file attachment and media insertion.
**Key Decisions:**
- [HIGH] Multi-source architecture: local/recent/cloud — Atlassian's collaboration tools need to pull files from wherever team members store them, not just the local file system
- [MED] Canvas drag as preferred pathway: Confluence and Jira encourage dragging files directly onto the editor canvas rather than through a file dialog — the picker is a secondary affordance
- [MED] Grid/list view toggle: file browser shows uploaded/recent media in both thumbnail grid and filename list view — users choose the browsing mode that matches the file type (grid for images, list for documents)
**Notable API:** Source-based architecture (local, recent, URL, cloud integrations); `fileTypes` restriction; `maxNumberOfFiles`; `maxFileSize`; `MediaPicker.popup()` and `MediaPicker.dropzone()` API surfaces
**A11y:** Grid view uses `role="grid"` with keyboard navigation; list view uses standard list semantics. Upload progress is announced via `aria-live`. The multi-source nature means a11y quality varies by source integration.
**Best at:** Multi-source file selection covering local/recent/cloud for collaborative enterprise tools — the most comprehensive file sourcing of any Tier 1 system.
**Missing:** Simple button-trigger file upload (overkill for basic upload needs); the Media Picker pattern is heavyweight for simple form-field file input contexts.

---

## ant-design
**Component:** Upload (5 listType variants + Dragger + directory)
**Approach:** Ant Design's Upload is the most variant-rich file upload in Tier 1. The `listType` prop selects between four file list visual modes: `text` (filename list), `picture` (list with thumbnails), `picture-card` (image grid with add/preview cards), `picture-circle` (circular avatar-style slots). `Upload.Dragger` is the large drag-and-drop zone subcomponent. `customRequest` replaces the HTTP layer entirely. `fileList` is controlled for external state management.
**Key Decisions:**
- [HIGH] Four `listType` variants: text/picture/picture-card/picture-circle are first-class visual modes; no other Tier 1 system matches this visual variety in one component
- [HIGH] `fileList` controlled prop: upload history is application state, not component state — enables wizard flows, multi-step forms, and server-side list restoration
- [MED] `customRequest` replaces HTTP: teams swap the default XMLHttpRequest with any SDK (AWS S3, Alibaba OSS) — no re-implementation needed for custom storage backends
**Notable API:** `listType: "text" | "picture" | "picture-card" | "picture-circle"`; `fileList: UploadFile[]`; `customRequest`; `transformFile` (pre-upload transform); `beforeUpload: (file) => boolean | Promise`; `directory: boolean`
**A11y:** Button trigger inherits native `<input type="file">` semantics. Picture-card grid renders each card as a focusable element. No explicit ARIA live regions for status transitions (uploading → done → error) — teams must add `aria-live` for screen reader announcement of status changes.
**Best at:** Visual variant coverage — four `listType` modes, `Upload.Dragger`, and `directory` upload make Ant Design's Upload the most contextually versatile upload component in Tier 1.
**Missing:** ARIA live region for status transitions — screen readers do not automatically hear upload completion or errors without consumer-added `aria-live` regions.
