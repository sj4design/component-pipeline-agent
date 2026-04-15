---
system: Playbook (Power Home Remodeling)
component: FileUpload
url: https://playbook.powerapp.cloud/kits/file_upload
last_verified: 2026-03-28
confidence: medium
---

# FileUpload

## Approach
Playbook's FileUpload is used for attaching job photos, documents, and contracts to CRM records in their home improvement business context. Dual React/Rails. Supports file selection with preview and drag-and-drop.

## Key Decisions
1. **CRM document attachment** (HIGH) — Attaching job photos and contracts to records.
2. **Drag-and-drop + button** (MEDIUM) — Both interaction methods for accessibility.
3. **Dual React/Rails** (HIGH) — Both implementations.

## Notable Props
- `accept`: File type filter
- `multiple`: Multiple files
- `onUpload`: Upload handler
- `maxSize`: Size limit

## A11y Highlights
- **Keyboard**: Button trigger accessible; keyboard file selection
- **Screen reader**: Selected files announced; error messages
- **ARIA**: Button trigger aria-label; file list

## Strengths & Gaps
- **Best at**: CRM document attachment workflows; dual framework
- **Missing**: Medium confidence; drag-and-drop details uncertain
