# File Upload — Research
**Date:** 2026-04-17 | **Mode:** Max | **Systems:** 24 | **Scope:** All patterns

---

## Sistemas sin componente dedicado

| Sistema | Razón | Workaround |
|---------|-------|------------|
| Material Design 3 | No file upload component; scope is core interaction components; file handling is OS concern | FilledButton/OutlinedButton + hidden `<input type="file">` |
| GitHub Primer | No dedicated component | Native input[type=file] |
| shadcn/ui | No dedicated component; community recipes with react-dropzone | Native input[type=file] + react-dropzone community recipes |
| REI Cedar | Not present; retail e-commerce scope | Native input[type=file] |
| Radix UI | No file upload primitive | Native `<input type="file">`; community wrappers |
| Fluent 2 | No dedicated component; pattern uses Button + hidden input | Button + hidden `<input type="file">` |
| Gestalt | Pin creation flow requires specialized upload pipelines; too domain-specific | — |
| Orbit | Document verification requires third-party identity verification services; regulatory | External verification SDKs |
| Nord | HIPAA/GDPR/DICOM compliance for medical file uploads requires certified external services | Certified external service integration |
| Evergreen | Button-triggered CSV/data import pattern (FilePicker) | FilePicker (button-only, no drag-and-drop) |

**Systems WITH dedicated component:** Carbon FileUploader, Polaris DropZone, Atlassian Media Picker, Ant Design Upload, Twilio Paste FileUploader, Salesforce Lightning FileUpload, Playbook FileUploader, Wise Design FileUpload, Dell Design FileUpload, Spectrum FileTrigger+DropZone, Chakra UI FileUpload (via Ark UI), GOV.UK File upload (native input pattern), Base Web FileUploader, Mantine FileInput/Dropzone, Evergreen FilePicker — 15 of 24

---

## How Systems Solve It

### Carbon FileUploader — "Most accessible upload: drop zone as `<button>` element, consumer-controlled upload timing"

Carbon's FileUploader is the most accessibility-complete in Tier 1. The critical decision: the drag-and-drop zone renders as a `<button>` element, not a `<div>`. This makes the drop zone keyboard-focusable and activatable via Enter/Space to open the file dialog — the only way keyboard-only users can "drag" files. Every other system uses a `<div>` with ARIA role additions; Carbon uses the native element that is inherently keyboard-operable.

Per-file state objects track individual file statuses: `uploading`, `uploaded`, `error`, `selected`. When status transitions occur (uploading → uploaded → error), the `aria-label` on each file item updates to announce the new status to screen readers — without any consumer-side ARIA management. Upload initiation is consumer-controlled: adding files to the list does NOT trigger upload, enabling review-before-submit workflows.

**Design Decisions:**
- **Drop zone as `<button>` element** → Why: keyboard-only users cannot perform drag gestures; the drop zone must be activatable via keyboard; `<button>` provides this without any additional ARIA → Impact: HIGH → Para tu caso: always implement your drop zone as a `<button>` or provide an equivalent visible keyboard target
- **Consumer-controlled upload timing** → Why: enterprise file uploads often involve review workflows — user selects multiple files, reviews the list, confirms before uploading starts → Impact: HIGH → Para tu caso: never auto-upload on selection; always require explicit user confirmation to start upload
- **Per-file status with aria-label updates** → Why: blind users need to know when individual files finish uploading or encounter errors, not just when the whole batch completes → Impact: HIGH → Para tu caso: implement per-file status with screen reader announcements for each status transition

**Notable Props:** Per-file status objects `{name, status, iconDescription, invalid, errorSubject, errorBody}`; `buttonLabel`; `labelTitle`/`labelDescription` for drop zone; `filenameStatus` for bulk status updates; `fileUploaderId` (required for label association)

**Accessibility:** Drop zone `<button>` for keyboard access; per-file items have `aria-label` including file name and status; status transitions update aria-label for SR announcement; `filenameStatus` for bulk status

---

### Ant Design Upload — "Four listType visual modes + customRequest for custom storage backends"

Ant Design's Upload is the most variant-rich file upload in Tier 1. The `listType` prop selects between four file list visual modes: `text` (filename list), `picture` (list with thumbnails), `picture-card` (image grid with add/preview cards), `picture-circle` (circular avatar-style slots). `Upload.Dragger` is the large drag-and-drop zone sub-component. `customRequest` replaces the HTTP layer — teams swap the default XHR with AWS S3, Alibaba OSS, or any custom SDK. `fileList` is controlled for external state management.

**Design Decisions:**
- **Four `listType` variants** → Why: image upload for profiles (picture-circle), product photos (picture-card), document attachment (text/picture) — distinct visual contexts need distinct treatments → Impact: HIGH → Para tu caso: implement at minimum text list + picture-card grid; these cover 90% of product upload use cases
- **`customRequest` for custom storage** → Why: most enterprise apps don't use the default XHR to a local endpoint; S3 presigned URLs, multipart uploads, and CDN uploads all need custom HTTP handling → Impact: HIGH → Para tu caso: expose a `customRequest` or `uploadHandler` prop that replaces the HTTP layer entirely
- **`fileList` controlled** → Why: wizard flows, multi-step forms, and server-side list restoration need the file list to be application state → Impact: MED → Para tu caso: make `fileList` controlled (or provide an uncontrolled default with a controlled override)

**Notable Props:** `listType: "text"|"picture"|"picture-card"|"picture-circle"`; `fileList: UploadFile[]`; `customRequest`; `transformFile`; `beforeUpload: (file) => boolean|Promise`; `directory: boolean`

**Accessibility:** Button trigger inherits native input[type=file] semantics; picture-card grid renders focusable cards; ⚠️ no explicit ARIA live regions for status transitions — teams must add aria-live for upload completion/error announcements

---

### Spectrum FileTrigger + DropZone — "Composable architecture: file selection separate from drop zone"

Spectrum separates file selection (FileTrigger — wraps any interactive element) from drag-and-drop (DropZone — independent droppable region). FileTrigger adds `<input type="file">` behavior to any Spectrum button or link without forcing a specific visual style. `acceptDirectory` enables folder upload (exposes `webkitdirectory`). Spectrum provides only the file selection mechanism — file list, upload progress, and error state are entirely the application's responsibility.

---

### Polaris DropZone — "Image-upload focused with customValidator and page-level drop target"

Polaris's DropZone reflects its origin in Shopify product photo management. `customValidator: (file: File) => boolean` runs per-file validation before acceptance. `dropOnPage` extends the drop target to the entire browser viewport — merchants drag from Finder/Explorer directly to the browser window. Nested DropZones for variant handling (main image vs. additional images). `overlayText` customizes the drag-active overlay message.

---

### Mantine FileInput + Dropzone — "Split packages separate button-trigger from drag-and-drop"

Mantine's split between `FileInput` (`@mantine/core`) and `Dropzone` (`@mantine/dropzone`) is the most practical API decision in T3. These are genuinely different UI patterns with different interaction models. Separating packages allows teams that only need a simple file button to avoid importing drag-and-drop dependencies. `Dropzone` provides MIME type validation with helper constants, drag state management (idle/accept/reject), and progress UI.

---

### Base Web FileUploader — "Stateless upload logic: UI state only, transport outside component"

Base Web's FileUploader explicitly separates file selection UI from upload mechanics. The component handles drag states, file rejection feedback, and progress display — but the actual HTTP upload is entirely outside the component's responsibility. This "stateless upload logic" design is architecturally correct: upload mechanics (chunked transfer, retry, multipart) belong in application code or a dedicated library.

---

### GOV.UK — "Research-backed rejection of drag-and-drop"

GOV.UK's deliberate use of only native `<input type="file">` with clear label and hint text is backed by user research: older users, users with motor impairments, and users on touch devices struggle significantly with drag-and-drop file upload. The native input performs better across the UK public than any dropzone UI. This is one of the strongest anti-feature arguments in any system — drag-and-drop is an enhancement, never a replacement.

---

### Atlassian Media Picker — "Multi-source: local + recent + cloud integrations"

Atlassian's Media Picker supports multiple sources: local file system, recent files, URLs, and integrated cloud services (Google Drive, Dropbox). The drag-and-drop canvas is the "preferred pathway." Grid and list view toggle for the file browser. Badge count shows selection count during multi-select. This is the most comprehensive file sourcing of any system but is heavyweight for simple form-field file inputs.

---

## Pipeline Hints

**Archetype recommendation:** composite-overlay (drop zone mode) or form-control (button-only mode)
Rationale: File upload has two primary interaction patterns: button-triggered dialog (form-control archetype) and drag-and-drop zone (composite-overlay). Both share the file list management functionality.

**Slot consensus:** (15/24 systems with file upload component)
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| trigger / button | container | yes | 15/15 | Always present; keyboard access to file dialog; hidden native input behind it |
| drop-zone | container | no | 10/15 | Drag-and-drop target area; optional but recommended for non-GOV.UK contexts |
| file-list | container | no | 10/15 | Uploaded/selected files displayed after selection |
| file-item | container | no | 10/15 | Per-file row: name + status + remove button |
| file-status | container | no | 8/15 | Upload progress bar, success checkmark, or error indicator per file |
| file-preview | media | no | 5/15 | Thumbnail preview for image files |
| remove-button | icon-action | no | 10/15 | Per-file remove from list; aria-label="Remove [filename]" |
| upload-progress | container | no | 6/15 | Upload progress bar or percentage text per file |
| drop-zone-overlay | container | no | 8/15 | Drag-active state overlay: "Drop files here" |
| header-label | text | no | 10/15 | Label above drop zone: "Upload files" |
| description | text | no | 10/15 | Accepted types, max size, count limits |
| error-message | text | no | 10/15 | Form-level or per-file error display |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| ListType / visual mode | variant | button/list/picture-card/picture-circle | 5/15 | Ant Design; most systems have 1-2 modes |
| State | state | idle/dragging/uploading/done/error | 12/15 | Drop zone state + upload state |
| Size | variant | default/compact | 4/15 | Drop zone sizing |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| allowMultiple | 12/15 | true | Multiple file selection |
| hasDragDrop | 10/15 | false | Drop zone visible in addition to button trigger |
| showPreview | 5/15 | false | Image thumbnails in file list |
| isDisabled | 12/15 | false | Standard disabled state |
| allowDirectory | 3/15 | false | Folder upload (webkitdirectory); Spectrum, Ant Design |
| autoUpload | 3/15 | false | Carbon/Paste/Base Web all recommend consumer-controlled upload |
| dropOnPage | 1/15 | false | Polaris full-page drop target |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| idle | 15/15 | button or drop zone at rest | |
| drag-over | 10/15 | drop zone border highlights, overlay appears | |
| drag-accept | 6/15 | green/positive visual; valid file type | |
| drag-reject | 6/15 | red/negative visual; invalid file type | |
| file-selected | 12/15 | file appears in list | |
| uploading | 10/15 | progress bar per file | |
| upload-complete | 10/15 | success indicator per file | |
| upload-error | 10/15 | error indicator + error message per file | |
| disabled | 12/15 | muted appearance; no interaction | |
| loading | 3/15 | while validating/checking files | |

**Exclusion patterns found:**
- drag-accept × drag-reject — mutually exclusive; a file is either accepted or rejected based on type/size rules
- uploading × disabled — can't disable during active upload without cancellation
- upload-complete × upload-error — per-file states; one file can be complete while another errors

**Building block candidates:**
- drop-zone → `.FileDropZone` — 10/15 systems have the drag-and-drop zone as a distinct visual region
- file-list → `.FileList` — 10/15 systems show an uploaded file list with per-file status
- file-item → `.FileItem` — 10/15 systems have per-file row components with name + status + remove

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| listType | text/picture/picture-card/picture-circle | 2/15 | Ant Design pattern; most systems support text list only |
| uploadTrigger | auto/manual | 6/15 | Auto-upload on selection vs. confirm before upload |
| accept | MIME types | 15/15 | Always present; communicated in label/description text too |

**A11y consensus:**
- Primary accessibility foundation: native `<input type="file">` is the accessible floor; it receives keyboard focus, supports `aria-label`/`aria-describedby`, and works across all assistive technologies
- Drop zone keyboard access: MUST implement keyboard-accessible alternative; Carbon's `<button>` drop zone is the reference; `role="button"` + Enter/Space for non-button elements
- Drop zone is NEVER the only way to select files; the plain file button must always be present
- File rejection feedback: must be via `aria-live="polite"` or programmatic focus — not just border color change
- File list: `role="list"` on container; each file as `role="listitem"`; remove button: `aria-label="Remove [filename]"` not just "Remove"
- Upload progress: `aria-valuenow`/`aria-valuemax` on progress bar; aria-live announcement on completion or error
- GOV.UK: accepted file types communicated in label or hint text (not only via accept attribute); `aria-describedby` links input to hint/error
- Status transitions: Carbon's per-file aria-label updates are the reference for announcing uploading/uploaded/error transitions

---

## What Everyone Agrees On

1. **`input[type=file]` is always present**: Every implementation uses native `<input type="file">` under the hood — it may be visually hidden, but it is always there. Drag-and-drop is a visual enhancement, not a replacement.

2. **Drag-and-drop requires keyboard alternative**: Universal agreement. GOV.UK's research makes this the strongest a11y principle in this component: many users cannot perform drag gestures. A keyboard-accessible file selection mechanism must always be available.

3. **Accepted file types must be communicated in text**: The `accept` HTML attribute prevents invalid files at the OS picker level, but it is not consistently communicated to users. Every system documents that accepted types must appear in label, description, or hint text — not just as a silent filter.

4. **Remove button must include filename in accessible label**: "Remove alpha.pdf" not "Remove". This is universal — without the file name context, screen reader users navigating a list of remove buttons cannot distinguish which file each removes.

5. **Upload mechanics are outside the component**: Base Web is most explicit, but all systems agree: the HTTP upload, multipart handling, presigned URLs, and retry logic are application-layer concerns. The component handles UI state (idle/uploading/done/error), not network transport.

---

## Where They Disagree

**"¿Drop zone or button-only?"**
→ Drop zone (Polaris, Carbon, Ant, Paste): modern UX; drag-from-finder affordance; most file uploads are images or documents → Button-only (GOV.UK, M3, Fluent 2): simpler; universally accessible; drag-and-drop is an enhancement → Para tu caso: always include the button trigger; add drop zone as progressive enhancement when your user base primarily uses desktop browsers

**"¿Auto-upload or consumer-controlled timing?"**
→ Auto-upload on selection (some community patterns): faster flow; one fewer click → Consumer-controlled (Carbon, Paste, Base Web): enterprise review-before-submit; multi-file confirmation workflows → Para tu caso: consumer-controlled is correct for most cases; never auto-upload without explicit configuration

**"¿Picture-card grid or list?"**
→ Picture-card grid (Ant Design): image management UIs need visual representation before upload; grid provides quick visual review → Text list (Carbon, Paste): document uploads need filename clarity; thumbnails add no value for PDFs/CSVs → Para tu caso: picture-card for image upload contexts (profile photo, product images); text list for document upload contexts (contracts, attachments)

**"¿Per-file validation or form-level validation?"**
→ Per-file (Polaris `customValidator`, Carbon per-file status, Ant `beforeUpload`): immediate per-file feedback → Form-level (Base Web, Paste): simpler; validation happens when the form submits → Para tu caso: per-file validation for type/size checks (immediate user feedback); form-level for business logic (quota exceeded, permission checks)

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Button-trigger only | Plain button opens file dialog | Documents, simple attachments | GOV.UK, Fluent 2 |
| Drop zone with button | Drag-and-drop area + click to browse | Image and document upload | Carbon, Polaris, Paste |
| Picture-card grid | Image upload grid with add + preview cards | Profile photos, product images | Ant Design |
| Multi-source picker | Local + recent + cloud integrations | Collaboration tools | Atlassian |
| Full-page drop target | Entire viewport is a drop target | Batch media upload | Polaris (`dropOnPage`) |

**Wireframe — drop zone with file list:**
```
┌─────────────────────────────────────────────────────────────┐
│  Upload Files                                               │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │                                                     │   │
│  │         ↑  Drop files here to upload               │   │
│  │                                                     │   │
│  │              [  Choose files  ]                    │   │
│  │         Supported formats: PDF, DOC, PNG           │   │
│  │                 Max 10MB per file                  │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  📄 report-q1.pdf                  ████████░░  80%  [×]   │
│  📄 budget.xlsx                    ██████████ Done    [×]   │
│  📄 notes.txt                      ⚠ Too large       [×]   │
└─────────────────────────────────────────────────────────────┘
```

**Wireframe — Ant Design picture-card grid:**
```
┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│ [img1]  │  │ [img2]  │  │ [img3]  │  │    +    │
│ 🗑️ 👁️  │  │ 🗑️ 👁️  │  │ 🗑️ 👁️  │  │ Upload  │
└─────────┘  └─────────┘  └─────────┘  └─────────┘
```

---

## Risks to Consider

**Drop-zone-only implementation fails keyboard users** (HIGH) — the most critical file upload a11y failure; a drag-and-drop zone styled as a div with no keyboard access blocks all keyboard-only users; mitigation: implement drop zone as `<button>` (Carbon approach) or ensure a visible "Choose files" button is always present alongside the drop zone

**Missing aria-live for status transitions** (HIGH) — without aria-live updates, blind users cannot hear when uploads complete or fail; they experience a silent form; mitigation: implement aria-live="polite" announcements for each file's status transition (selected → uploading → done/error); Carbon's per-file aria-label updates are the reference implementation

**File type restrictions not communicated** (MEDIUM) — the `accept` attribute silently rejects files at the OS picker level; users don't understand why their file didn't appear in the list; mitigation: always display accepted types as visible text in the component's description ("Supported: PDF, DOCX, PNG")

---

## Dimension Scores

| Dimension | Carbon | Ant Design | Polaris | Spectrum | Mantine | Base Web |
|-----------|--------|-----------|---------|----------|---------|---------|
| A11y depth | 5/5 | 2/5 | 3/5 | 4/5 | 4/5 | 4/5 |
| Visual variants | 2/5 | 5/5 | 4/5 | 2/5 | 4/5 | 3/5 |
| Feature coverage | 4/5 | 5/5 | 4/5 | 3/5 | 4/5 | 3/5 |
| Architecture | 4/5 | 4/5 | 4/5 | 5/5 | 5/5 | 5/5 |

---

## Next Steps

```
/spec file-upload      → outputs/file-upload-config.json
/enrich file-upload    → a11y tokens + interaction spec
/build file-upload     → full pipeline in one command
/build file-upload --max  → use pre-generated config
```
