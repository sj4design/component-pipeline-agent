---
system: Radix UI
component: Not available natively
url: https://www.radix-ui.com/primitives/docs/overview/introduction
last_verified: 2026-03-29
confidence: high
---

# File Upload

## Approach
Radix Primitives does not include a FileUpload component, and Radix Themes does not add one either. This absence reflects Radix's principle of only building primitives where a meaningful accessibility or interaction pattern needs to be owned at the library level. File upload relies on the native `<input type="file">` browser element, which already carries its own OS-level file picker dialog, ARIA semantics, and keyboard access — there is limited value in wrapping it in a headless primitive when the native element handles accessibility correctly on its own. Teams building file upload UIs with Radix typically compose a styled `<label>` (acting as the visible drop zone trigger) paired with a visually hidden `<input type="file">`, optionally layered with drag-and-drop event handlers. For drag-and-drop enhancement, Radix provides no utility, so external libraries (react-dropzone, or native HTML5 drag events) are used alongside.

## Key Decisions
1. **No native FileUpload primitive** (HIGH) — The native `<input type="file">` is already accessible and semantically correct; wrapping it would add abstraction without adding ARIA value, which contradicts Radix's rationale for building a primitive in the first place.
2. **Label + hidden input composition is the standard pattern** (HIGH) — Styling a `<label>` as the interactive surface and hiding the actual input is a broadly accepted web pattern that preserves native file dialog behavior and keyboard accessibility without JavaScript workarounds.
3. **No drag-and-drop primitive** (MEDIUM) — Drag-and-drop file handling is considered a behavioral enhancement layer rather than an accessibility-critical primitive, so Radix leaves this to specialized libraries or raw browser API usage.

## Notable Props
- No component exists; no props applicable.

## A11y Highlights
- **Keyboard**: Native `<input type="file">` receives focus and opens the OS file picker on Enter/Space; the `<label>` association ensures clicking or activating the label triggers the input.
- **Screen reader**: The `<input type="file">` announces its label text and file type restrictions from the `accept` attribute; selected file names are announced after selection.
- **ARIA**: No additional ARIA needed for the native pattern; drag-and-drop drop zones should use `role="button"` or `role="region"` with `aria-label` describing the drop action.

## Strengths & Gaps
- **Best at**: Deferring entirely to the native browser file input, which is the most accessible and widely supported approach across all platforms and assistive technologies.
- **Missing**: No drag-and-drop zone component, no multi-file preview management, no upload progress integration, no file type/size validation UI patterns — teams must build or import all of this.
