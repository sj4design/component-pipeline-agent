---
system: Wise Design
component: File Upload
url: https://wise.design/components/file-upload
last_verified: 2026-03-28
confidence: low
---

# File Upload

## Approach
Wise's File Upload is used for identity verification document uploads (passport, ID card, utility bills) — a critical financial product workflow. Document upload UX must be clear and reassuring given the sensitive nature of identity verification.

## Key Decisions
1. **Identity document upload** (HIGH) — Primary use for KYC/identity verification document submission.
2. **Clear file requirements** (HIGH) — File type and size requirements prominently displayed for identity documents.
3. **Reassuring UX** (MEDIUM) — Security indicators and clear feedback during sensitive document upload.

## Notable Props
- `accept`, `onUpload`, `maxSize`

## A11y Highlights
- **Keyboard**: File selection accessible
- **Screen reader**: Upload requirements and status announced
- **ARIA**: Button trigger; status announcements

## Strengths & Gaps
- **Best at**: Identity verification document upload with clear requirements
- **Missing**: Low confidence — limited public documentation
