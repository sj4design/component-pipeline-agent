---
system: GitHub Primer
component: FileInput / FileUpload
url: https://primer.style/components/file-input
last_verified: 2026-03-28
confidence: medium
---

# FileInput (File Upload)

## Approach
GitHub Primer provides a FileInput component for file selection, primarily used for profile picture uploads, repository file uploads, and attachment workflows throughout GitHub. The component wraps native input[type=file] with Primer's styling and FormControl integration. For GitHub's primary file upload use case (uploading files to a repository via the web UI), a more complex drag-and-drop interface exists but as a feature-specific implementation rather than a design system component.

## Key Decisions
1. **Native file input foundation** (HIGH) — Styled native input[type=file] for reliable browser behavior, consistent with Primer's use of native elements where sufficient.
2. **FormControl integration** (HIGH) — FileInput works within FormControl for consistent label/caption/error association patterns.
3. **Button variant** (MEDIUM) — FileInput renders as a button-styled element (the file input trigger), consistent with Primer's Button visual style for the upload trigger.

## Notable Props
- `accept`: File type filter
- `multiple`: Multiple file selection
- `size`: Visual size variant

## A11y Highlights
- **Keyboard**: Native button-like activation; Enter/Space triggers file dialog
- **Screen reader**: Label via FormControl; selected files announced
- **ARIA**: Native file input semantics; FormControl manages label association

## Strengths & Gaps
- **Best at**: FormControl integration; consistent with Primer form patterns
- **Missing**: No drag-and-drop zone; medium confidence on full API; no upload progress
