---
component: File Upload
tier: 3
last_verified: 2026-03-29
---

# File Upload — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Not available — use native input | No file upload primitive; native `<input type="file">` preferred; community wrappers available. | high |
| Chakra UI | FileUpload (via Ark UI) | Ark UI/Zag.js state machine; drag-and-drop dropzone + file list with preview; controlled accept/maxFiles/maxFileSize. | medium |
| GOV.UK | File upload (native input) | Native `<input type="file">` with GOV.UK label/hint/error pattern; no drag-and-drop by deliberate accessibility research decision. | high |
| Base Web | FileUploader | Drag-and-drop dropzone with hover/accept/reject states; stateless upload logic (component handles UI state only, not HTTP upload); controlled progress UI. | medium |
| Fluent 2 | Not available — Button + hidden input | No dedicated component; product-layer pattern uses Button that triggers a hidden `<input type="file">`; no dropzone in the system. | high |
| Gestalt | Not available — too domain-specific | Pin creation flow requires specialized upload pipelines; no generic file upload component exists at system level. | medium |
| Mantine | FileInput / Dropzone | Split across two packages: `FileInput` (text field + file button, `@mantine/core`) and `Dropzone` (`@mantine/dropzone`); MIME type validation; `accept` prop with helper constants. | high |
| Orbit | Not available — external verification SDKs | Document verification (passport scans, ID uploads) requires third-party identity verification services; no generic upload component. | medium |
| Evergreen | FilePicker | Button-triggered file selector for CSV/data import flows; no drag-and-drop; accepts file type restrictions; fits Segment's data pipeline context. | medium |
| Nord | Not available — regulatory requirements | HIPAA/GDPR/DICOM compliance for medical file uploads (patient records, imaging) requires certified external services; no generic component. | low |

## Key Decision Patterns

The most structurally significant T3 pattern is Base Web's explicit separation of file selection UI from upload mechanics. `FileUploader` handles drag states, file rejection feedback, and progress display — but the actual HTTP upload is entirely outside the component's responsibility. This "stateless upload logic" design is the correct architectural decision for a design system: upload mechanics (chunked transfer, retry, multipart) belong in application code or a dedicated library, not in a UI component. Chakra's Ark UI approach is similar; it manages selection state without owning upload transport.

Mantine's two-package split between `FileInput` (inline text field with file trigger) and `Dropzone` (dedicated drag-drop zone) is the most practical API decision in the T3 set. These are genuinely different UI patterns with different interaction models — combining them into one component with a "mode" prop would produce an awkward API. Separating packages also allows teams that only need a simple file button to avoid importing drag-and-drop dependencies.

GOV.UK's deliberate rejection of drag-and-drop is research-backed: their user research found that many users, particularly older users, users with motor impairments, and users on touch devices, struggle with drag-and-drop file upload. The native `<input type="file">` button with clear label and hint text performs better across the UK public than any dropzone UI. This is one of the strongest anti-feature arguments in the T3 set — and directly contradicts the "drag-and-drop is modern and better" assumption common in product design.

Nord and Orbit's absences are both regulatory rather than philosophical. Medical file uploads (patient records, DICOM imaging) and identity document uploads (passport scans) are domains where the upload pipeline itself is regulated — data residency, encryption standards, audit logging, and third-party certification requirements make a generic UI component insufficient. These are meaningful boundary conditions that inform when a design system should deliberately exclude a component.

## A11y Consensus

- Native `<input type="file">` is the most accessible base element — it receives keyboard focus, supports `aria-label`/`aria-describedby` for error messages, and works across all assistive technologies without additional ARIA.
- Drag-and-drop dropzones require keyboard-accessible alternatives; `role="button"` with Enter/Space activation is the standard fallback for users who cannot perform drag gestures.
- File rejection feedback (wrong type, too large) must be communicated via `aria-live="polite"` regions or programmatic focus management — not only via visual color change on the dropzone border.
- File lists showing selected/uploaded files should update live regions or announce file names to screen readers upon addition and removal.
- GOV.UK's native-input preference is the accessibility floor: if drag-and-drop is added, the plain file button must remain as a fallback, not be replaced.

## Recommended Use

Reference T3 file upload approaches when deciding between native-input simplicity and drag-and-drop richness, and when separating upload UI state from upload mechanics. Base Web is the reference for stateless upload architecture; Mantine is the reference for the FileInput/Dropzone split-package model; GOV.UK is the reference for accessibility arguments against mandatory drag-and-drop; Chakra's Ark UI integration is the reference for state-machine-driven upload state management.
