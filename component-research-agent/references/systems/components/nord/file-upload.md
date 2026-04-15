---
system: Nord Design System (Nordhealth)
component: Not available natively
url: https://nordhealth.design/components/
last_verified: 2026-03-29
confidence: high
---

# File Upload

## Approach
Nord does not provide a File Upload component, and this absence is grounded in the regulatory and technical complexity of medical file handling. In healthcare software, "file upload" is not a generic UI operation — it encompasses DICOM medical imaging files (X-rays, MRI scans, CT scans), clinical PDF documents (lab reports, referral letters, discharge summaries), and structured clinical data formats (HL7 FHIR resources, CDA documents). Each of these file types has strict regulatory requirements: GDPR mandates for EU health data, HIPAA requirements for US patient data, medical device regulations affecting software that handles diagnostic images, and clinical workflow rules governing which files can be associated with which patient records and by which authorized personnel. A generic drag-and-drop file upload component cannot encode these requirements — it would need to be deeply customized for each clinical use case anyway, making a generic implementation more dangerous than helpful. Nord's approach is to provide the foundational form inputs (`<nord-input>`) that can include `type="file"` for simple cases, while clinical document management and medical imaging upload are handled by specialized system-level integrations outside the design system scope.

## Key Decisions
1. **Absent by design — health data regulatory requirements** (HIGH) — HIPAA and GDPR for health data impose specific requirements on file transmission, storage, and access logging that a UI component cannot satisfy. Medical file upload implementations must be integrated with compliant backend services, audit logging systems, and role-based access controls — concerns that belong at the application architecture layer, not the UI component layer.
2. **DICOM and medical imaging require specialized viewers** (HIGH) — Medical image files (DICOM format) cannot be handled by generic file upload UI — they require specialized medical imaging viewers, PACS (Picture Archiving and Communication System) integrations, and software that is often regulated as a medical device. A generic file upload component would create false expectations about DICOM handling capability.
3. **`<nord-input type="file">` for simple document attachments** (MEDIUM) — For simple non-clinical file attachments (administrative documents, correspondence), Nord's standard input supports `type="file"`, providing a minimal but functional file selection interface. This covers the minority of healthcare file needs that are genuinely generic.
4. **Audit trail requirements exceed UI scope** (MEDIUM) — Healthcare document management requires immutable audit trails: who uploaded what, when, from which device, and to which patient record. These requirements must be implemented at the API and database level — no UI component can fulfill them, making a rich upload UI misleading about the full compliance picture.

## Notable Props
- No component exists; no props applicable.

## A11y Highlights
- **Keyboard**: Not applicable — no component exists. For teams using `<nord-input type="file">`, standard browser file input keyboard behavior applies: Enter/Space to open file picker dialog.
- **Screen reader**: Not applicable — no component exists. Native `<input type="file">` with associated `<label>` provides adequate screen reader support for simple file selection use cases.
- **ARIA**: Not applicable — no component exists

## Strengths & Gaps
- **Best at**: Preventing a false sense of regulatory compliance by not providing a generic file upload widget for a domain where such widgets are inherently insufficient; keeping the surface area focused on clinical UI patterns Nord can address fully
- **Missing**: No upload progress indicator primitive, no drag-and-drop zone component, no file type validation UI, and no file list/preview component — teams building any file handling feature must source or build all of these from outside Nord, leading to inconsistent implementations across Nordhealth products
