---
system: Salesforce Lightning Design System
component: File Upload
url: https://lightningdesignsystem.com/components/file-upload/
last_verified: 2026-03-28
confidence: high
---

# File Upload

## Approach
Lightning's File Upload component provides both a drag-and-drop zone and a button-triggered file selection, making it one of the more comprehensive file upload implementations. Used in Salesforce CRM for attaching files to records — uploading documents, images, and other attachments to Accounts, Contacts, Cases, and Opportunities. The component shows file type restrictions and displays file previews/names after selection.

## Key Decisions
1. **Drag-and-drop + button** (HIGH) — Dual input method (drag zone + "Upload Files" button) accommodates both mouse-drag and keyboard/button workflows, critical for accessibility where drag-and-drop alone would be insufficient.
2. **File type and size restriction display** (HIGH) — Displays accepted file types and size limits in the UI, informing users before they attempt to upload an incompatible file — particularly important for Salesforce's Salesforce Files storage restrictions.
3. **Multiple file queue** (MEDIUM) — Shows a list of files queued for upload with file names, giving users visibility into their upload batch.

## Notable Props
- `acceptedFormats`: Array of accepted file extensions
- `multiple`: Allow multiple simultaneous uploads
- `maxFileSize`: Maximum file size in bytes (displayed to user)
- `onFilesChange`: Callback with file selection

## A11y Highlights
- **Keyboard**: Upload button fully keyboard accessible; drag zone has keyboard-accessible button alternative
- **Screen reader**: File selection announced; file count and names communicated; error messages for invalid files
- **ARIA**: Button trigger aria-label; file list with file names; error messages via live region

## Strengths & Gaps
- **Best at**: Drag + button dual method; file type/size restriction display; CRM attachment workflows
- **Missing**: No upload progress bar; no image preview; list shows files queued but not upload status
