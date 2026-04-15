---
system: Base Web (Uber)
component: FileUploader
url: https://baseweb.design/components/file-uploader/
last_verified: 2026-03-29
confidence: high
---

# File Upload (FileUploader)

## Approach
Base Web's FileUploader component provides a drag-and-drop upload zone with a hidden file input fallback, designed to handle document and image uploads in Uber's internal tooling (e.g., driver onboarding, compliance document submissions). The component manages its own drag-state visuals (idle, hover, reject) and delegates actual upload logic entirely to the consumer via callbacks, keeping the component stateless with respect to upload progress. This separation of concerns is consistent with Base Web's philosophy: provide the interaction surface and visual feedback, but leave network and state management to the application layer.

## Key Decisions
1. **Stateless upload logic** (HIGH) — FileUploader emits `onDrop` with the File objects and exposes `progressAmount` and `progressMessage` as controlled props, so teams wire their own upload APIs without being constrained by an opinionated upload abstraction.
2. **Drag-state visual feedback** (HIGH) — The component handles `dragenter`, `dragover`, and `dragleave` internally, updating visual state (border color, background) to guide users, which reduces boilerplate for teams.
3. **Accept and multiple props** (MEDIUM) — Passes through native `accept` MIME restrictions and `multiple` to the underlying file input, matching HTML file input semantics.
4. **Override system** (MEDIUM) — FileDragAndDrop, FileInput, ContentMessage, and ProgressBar slots are all overridable for custom branding.

## Notable Props
- `onDrop`: (acceptedFiles, rejectedFiles) => void — called with File arrays after selection
- `accept`: string — MIME type filter (e.g., `'image/*'`)
- `multiple`: boolean — allow multiple file selection
- `progressAmount`: number — 0–100 for progress bar display
- `progressMessage`: string — label shown during upload
- `errorMessage`: string — displayed when upload fails
- `overrides`: object — sub-element overrides

## A11y Highlights
- **Keyboard**: The drop zone is focusable; Enter/Space opens the native file dialog.
- **Screen reader**: Drop zone has `role="button"` with descriptive `aria-label`; progress is surfaced via live region.
- **ARIA**: `aria-live="polite"` on the status region for progress and error messages.

## Strengths & Gaps
- **Best at**: Drag-and-drop zones with visual feedback; controlled progress display; clean integration with custom upload APIs.
- **Missing**: No built-in file list with remove buttons; no chunked upload or retry logic; preview thumbnails not provided.
