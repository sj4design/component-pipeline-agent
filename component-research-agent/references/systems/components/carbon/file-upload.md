---
system: Carbon (IBM)
component: FileUploader
url: https://carbondesignsystem.com/components/file-uploader/usage/
last_verified: 2026-03-28
---

# FileUploader

## Approach

Carbon's FileUploader is the most fully-featured first-party file upload component among the Tier 1 systems, and the breadth of what it covers reflects IBM's enterprise product context. IBM products — data platforms, cloud consoles, AI tools — regularly require users to upload configuration files, datasets, certificates, and documents as part of complex multi-step workflows. A component that only opens a file picker and hands off a FileList would leave every product team to independently invent progress states, error states, file list management, and removal interactions. Carbon's decision was to build those capabilities directly into the component.

The component ships two distinct variants: the standard button-triggered FileUploader and the drag-and-drop FileUploaderDropContainer. These are not just visual skins — they represent different interaction models for different contexts. The button variant is designed for forms and dialogs where upload is one step among many; the drop zone variant is designed for surfaces where file upload is the primary action (import flows, data ingestion screens). Both variants share the same state model for individual files once selected: each file moves through loading, uploaded (success), and error states, each with its own visual treatment and ARIA communication.

A critical aspect of Carbon's approach is that file state management is explicit and consumer-driven. The component displays the file list and state badges, but the consumer is responsible for updating each file's status as their upload requests resolve. This is the right boundary: Carbon knows how to display "uploading" and "complete", but only the application knows when the server has actually accepted the file.

## Key Decisions

1. **Two variants with distinct use-case rationales** (HIGH) — Carbon offers a button-triggered variant and a drag-and-drop drop container variant rather than a single unified component. The WHY is contextual appropriateness: in a dense enterprise form (a Cloud account setup wizard, a certificate management panel), a compact "Upload files" button fits the layout; in an import-focused surface (a data pipeline setup, a model training job), a large drop zone communicates that file upload is the primary interaction. Forcing one visual pattern on both contexts would result in either an overscaled button or an undersized drop zone. The cost is that teams must choose between variants, which requires understanding their users' context.

2. **Per-file state management with four explicit states** (HIGH) — Each file in the uploaded file list is tracked through four states: loading (upload in progress), uploaded (complete, checkmark), error (failed, with single or multi-line error message), and a fourth implicit state of selected-but-not-yet-uploading. Carbon renders these states with distinct icons and colors. The WHY is that enterprise users uploading multiple large files (CSVs, model weights, SSL certificates) need to know the status of each file independently — a single "uploading" spinner for a batch of 10 files is insufficient. This per-file granularity is a meaningful differentiator from Polaris and Ant Design, which require more consumer wiring to achieve the same result.

3. **Drop zone built as a button for keyboard accessibility** (HIGH) — The drag-and-drop container is implemented as a `<button>` element (not a `<div>`), meaning keyboard users can Tab to the drop zone and press Enter or Space to open the file picker, receiving the same behavior as mouse users who drag and drop. The WHY is that making drag-and-drop the only interaction mechanism would create an accessibility violation — keyboard users and users on touch devices cannot drag and drop. Carbon's position is that the drop zone affordance should be visually optimized for pointer users who know about drag-and-drop, while being fully operable for keyboard users through button semantics.

4. **File removal via per-file delete button** (MEDIUM) — After a file is added to the list, each file entry has an × button to remove it. The delete button is programmatically associated with the filename via accessible labeling (the button's accessible name includes the file name) so screen reader users understand which file they are removing. The WHY is that in multi-file scenarios, a single "Clear all" action is too destructive — users who accidentally selected the wrong one of five files should not have to re-select all five. Per-file removal is standard UX for multi-file upload lists.

5. **Consumer-controlled upload initiation** (MEDIUM) — Carbon's FileUploader does not initiate any network requests. The component calls `onChange` when files are selected and expects the consumer to handle the actual upload and then update the file state props. This is the correct architecture for enterprise products where upload may be deferred (all files selected, then submitted as part of a form), asynchronous (files uploaded as selected), or conditional (validation must pass before upload begins). A component that auto-uploaded on selection would be unusable in form-submission contexts.

## Notable Props

- `accept`: MIME type filter for valid file types — maps to the native input `accept` attribute; worth noting because Carbon surfaces this as a primary prop rather than burying it.
- `multiple`: Controls whether multi-file selection is permitted — defaults to allowing multiple, which is notable because it reflects IBM's enterprise context where batch upload is the norm.
- `buttonText` / `labelTitle` / `labelDescription`: Separate text props for the trigger button label, the drop zone title, and the drop zone description — notable because they acknowledge that different product contexts need different messaging without requiring component forking.
- `fileUploaderId`: Required ID for associating the label with the input — explicit ID management surfaces the accessibility pattern so it cannot be accidentally omitted.
- `size` / `fileItemSize`: Separate size props for the trigger and the file list items — notable because they can be configured independently, useful in dense layouts where the button and list may need different density.

## A11y Highlights

- **Keyboard**: The drop zone is constructed as a `<button>`, so it receives Tab focus and activates with Enter or Space — no custom keyboard event handling required. File list × buttons are individually focusable with Tab and activatable with Enter or Space. Keyboard users can fully manage the upload flow without a mouse.
- **Screen reader**: Each file's delete button has its accessible name composed to include the filename (e.g., "Remove document.pdf"), so screen reader users understand exactly what will be deleted. Error messages for individual files must be associated with an `aria-live` region or placed inline so they are announced when the state changes.
- **ARIA**: Carbon's accessibility documentation specifies that error states must be surfaced to assistive technology — `aria-live` regions are the recommended pattern for announcing upload progress changes. The component's use of native `<button>` elements for the trigger and delete actions means default ARIA roles (`button`) apply without additional annotation.

## Strengths & Gaps

- **Best at**: Full-coverage upload state management — Carbon is the only Tier 1 system that provides per-file loading/success/error state visualization out of the box, making it the strongest choice for enterprise bulk-upload workflows.
- **Missing**: Upload progress percentage — Carbon shows that a file is "loading" but does not provide a built-in progress bar for individual files; teams that need byte-level progress must integrate a ProgressBar component separately alongside each file item.
