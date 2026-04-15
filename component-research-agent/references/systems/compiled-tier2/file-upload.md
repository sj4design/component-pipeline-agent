---
component: FileUpload
tier: 2
last_verified: 2026-03-28
---

# FileUpload — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | FileUploader | Drag-and-drop zone + file list; file validation; multiple file support | high |
| Salesforce Lightning | FileUpload | Drag-and-drop + click-to-browse; file type/size constraints; upload progress | high |
| GitHub Primer | FileUpload (not present) | Not present; native input[type=file]; no dedicated component | high |
| shadcn/ui | FileUpload (not present) | Not dedicated; native input[type=file] pattern; community recipes with react-dropzone | high |
| Playbook | FileUploader | Document upload for remodeling projects; dual React/Rails | medium |
| REI Cedar | CdrFileUpload (not present) | Not present; use native input[type=file] | medium |
| Wise Design | FileUpload | Identity document upload for KYC verification | low |
| Dell Design System | FileUpload | Enterprise document and firmware upload | low |

## Key Decision Patterns

**Drag-and-drop zone:** Paste and Lightning provide dedicated drag-and-drop upload zones (visually styled drop targets). These enhance UX but require careful accessibility — drag-and-drop cannot be the only interaction method. A browse/click button must always be available.

**Native input basis:** All implementations ultimately use input[type=file] under the hood. The styled upload zone is a visual enhancement over the native input, which retains keyboard accessibility via button trigger.

**File list management:** After selection, showing a list of selected files with individual remove buttons is standard. Files should be removable before upload confirmation.

**Progress feedback:** Lightning provides upload progress indicators. Wise likely shows progress for KYC document uploads. Paste's FileUploader shows upload states.

## A11y Consensus
- input[type=file] is the accessible foundation — always include it (may be visually hidden)
- Drag-and-drop zone: keyboard accessible via a visible button that opens file browser; drag-and-drop is enhancement only
- File list: role="list" with each file as a list item; remove button with aria-label="Remove [filename]"
- Upload progress: aria-valuenow, aria-valuemax on progress bar; aria-live announcement on completion
- Accepted file types: communicate in label or help text, not just via accept attribute

## Recommended Use
Use Paste FileUploader for drag-and-drop with file list management. Use Lightning FileUpload for Salesforce file attachment flows. Use native input[type=file] (with Primer or Cedar styling) for simple single-file selection. Always pair drag-and-drop with a keyboard-accessible browse button.
