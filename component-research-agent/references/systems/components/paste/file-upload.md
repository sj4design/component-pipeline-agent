---
system: Twilio Paste
component: File Picker
url: https://paste.twilio.design/components/file-picker
last_verified: 2026-03-28
confidence: high
---

# File Picker (File Upload)

## Approach
Twilio Paste calls this "File Picker" — a styled wrapper around the native `<input type="file">` element. Like Paste's other native input wrappers, this approach prioritizes accessibility and native behavior over a custom drag-and-drop zone. Used in the Twilio console for uploading media files, certificates, and configuration files. The native file picker opens the OS file browser reliably.

## Key Decisions
1. **Native file input foundation** (HIGH) — Wraps native input[type=file] for reliable cross-platform file selection behavior, particularly important for certificate/key file uploads where exact file selection matters.
2. **Accept attribute support** (HIGH) — The accept prop passes through to native input for file type filtering, supporting common use cases like "audio/*" for Twilio voice media uploads.
3. **Multiple file selection** (MEDIUM) — Native multiple attribute supported for batch uploads.

## Notable Props
- `accept`: File type filter (MIME types or extensions)
- `multiple`: Allow multiple file selection
- `hasError`: Error state styling
- `id`: Required for label association

## A11y Highlights
- **Keyboard**: Native button to open file dialog is keyboard accessible
- **Screen reader**: Label via htmlFor/id; selected file name announced after selection
- **ARIA**: Native file input semantics; label association; error text via aria-describedby

## Strengths & Gaps
- **Best at**: Native accessibility and OS file browser; accept filtering; straightforward file selection
- **Missing**: No drag-and-drop zone; no upload progress display; no file preview
