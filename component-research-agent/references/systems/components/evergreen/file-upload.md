---
system: Evergreen (Segment/Twilio)
component: FilePicker
url: https://evergreen.segment.com/components/file-picker
last_verified: 2026-03-29
confidence: high
---

# File Upload

> **Name mapping**: Evergreen calls this component `FilePicker`. It serves the same purpose as a FileUpload component in other systems.

## Approach
Evergreen's FilePicker is a styled file selection trigger used in Segment for data import flows: uploading CSV files for user ID lists, importing JSON configuration files, and attaching schema definition files. The component uses a button-style trigger rather than a drag-and-drop zone, reflecting that Segment's file upload use cases are discrete import actions (click, select file, confirm) rather than continuous multi-file drag operations. The FilePicker wraps a native `<input type="file">` with Evergreen's visual styling, providing a consistent look with the rest of the component system while delegating actual upload mechanics (progress, chunking, error handling) to the consuming application.

## Key Decisions
1. **Button-trigger over drag-and-drop** (HIGH) — Segment's import flows are infrequent, single-file actions triggered by explicit user intent; a drag-and-drop zone would be visually dominant relative to the frequency and importance of the action.
2. **Delegate upload mechanics** (HIGH) — FilePicker's scope is file selection only; it fires `onChange` with the `FileList` and lets the application handle upload (via XHR, fetch, or a service like AWS S3 presigned URLs). This keeps the component simple and unopinionated about upload infrastructure.
3. **Accept filter** (MEDIUM) — The `accept` prop limits selectable file types (e.g., `.csv`, `.json`), reducing user error before upload begins and aligning with Segment's specific import format requirements.

## Notable Props
- `onChange`: callback receiving the `FileList` from the native input
- `accept`: file type filter string (e.g., `".csv,.json"`)
- `multiple`: boolean allowing multiple file selection
- `disabled`: disables the trigger button
- `inputProps`: passed through to the underlying `<input>` for additional native attributes
- `placeholder`: text shown when no file is selected

## A11y Highlights
- **Keyboard**: The styled trigger button is keyboard-focusable; Enter/Space opens the OS file picker (via the native input).
- **Screen reader**: The button label and the selected file name are announced; the native input is visually hidden but remains in the accessibility tree.
- **ARIA**: `aria-labelledby` connects the visible button label to the hidden input; selected file name updated via an adjacent text element.

## Strengths & Gaps
- **Best at**: Simple file selection for import flows with file-type filtering; clean integration with Evergreen's button styling and form layout components.
- **Missing**: No drag-and-drop zone; no upload progress indicator; no file list management for multi-file selections; no file size validation UI.
