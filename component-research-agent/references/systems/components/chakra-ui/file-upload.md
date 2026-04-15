---
system: Chakra UI
component: FileUpload (v3) / Not available natively (v2)
url: https://chakra-ui.com/docs/components/file-upload
last_verified: 2026-03-29
confidence: medium
---

# File Upload

## Approach
Chakra UI v2 did not include a native file upload component. Teams built their own using a hidden `<input type="file">` with a styled Button trigger — a common pattern but without standardized accessibility or drag-and-drop handling. Chakra UI v3 introduced a FileUpload component with a visible dropzone area, file trigger button, drag-and-drop support, file list display, and validation states. Like other v3 components, it is built on Ark UI's FileUpload primitive, which handles the complex interaction model (drag events, file acceptance/rejection logic, file list state management) while Chakra provides the visual design layer.

## Key Decisions
1. **Dropzone + trigger combined** (HIGH) — The v3 FileUpload presents a dropzone area (dashed border container) that also contains a visible trigger button. This "click or drag" affordance covers both mouse users (click the button) and power users (drag files from the file system). The dropzone area is keyboard-accessible — it can receive focus and trigger the file dialog via Enter/Space.
2. **File list with remove controls** (HIGH) — The component renders a list of selected files below the dropzone, each with a name, size, and remove button. This is part of the component contract — teams get the full upload UI, not just the input. This design decision prioritizes completeness over minimalism.
3. **Accept and maxFiles constraints** (MEDIUM) — The `accept` prop (MIME types or file extensions) and `maxFiles` prop are enforced visually — rejected files are shown in an error state rather than silently ignored. This gives users clear feedback about why certain files weren't accepted.
4. **v2 workaround pattern** (MEDIUM) — For v2 teams, the established workaround is: visually hidden `<input type="file" id="file-input">`, a `<Button as="label" htmlFor="file-input">` for the clickable area, and manual state management for the file list. This pattern works but requires manual accessibility wiring.

## Notable Props
- `maxFiles`: maximum number of files
- `maxFileSize`: maximum size in bytes per file
- `accept`: MIME types or extensions to accept
- `multiple`: boolean — allow multiple file selection
- `onFileChange`: callback with accepted and rejected files
- `disabled`: disables the upload area

## A11y Highlights
- **Keyboard**: Dropzone area focusable; Enter/Space opens file dialog; file remove buttons are keyboard accessible
- **Screen reader**: Dropzone region labeled; file list items announced with name and size; error/rejection messages announced
- **ARIA**: `role="presentation"` on decorative elements; live region for file list updates; remove buttons have `aria-label` with file name

## Strengths & Gaps
- **Best at**: Complete upload UI out of the box in v3; drag-and-drop + click combined; Ark UI accessibility foundation; file validation feedback
- **Missing**: Not available in v2 core (requires custom implementation); no built-in upload progress indicator (teams must wire this to their own upload logic); no chunked/resumable upload support
