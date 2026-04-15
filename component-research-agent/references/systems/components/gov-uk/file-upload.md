---
system: GOV.UK Design System
component: File Upload
url: https://design-system.service.gov.uk/components/file-upload/
last_verified: 2026-03-29
confidence: high
---

# File Upload

## Approach
GOV.UK Design System includes a first-class File Upload component that wraps the native HTML `<input type="file">` element with consistent labelling, hint text, and error handling patterns. The component follows the same structural conventions as all GOV.UK form inputs: a `<label>` linked to the input, optional hint text in a `<div>` with `aria-describedby`, and an error message pattern that prepends the field-level error above the input when validation fails. GOV.UK explicitly favours the native file input over custom drag-and-drop interfaces because the native element works across all devices, assistive technologies, and browsers without JavaScript. This positions it as a progressively enhanced, universally accessible starting point. The design system also publishes detailed research-backed guidance on when to use single versus multiple file upload, how to communicate file type and size constraints clearly, and how to handle the "uploading" state — framing file upload as a service design pattern, not just a UI widget.

## Key Decisions
1. **Native `<input type="file">` over custom drag-and-drop** (HIGH) — Custom drag-and-drop widgets introduce JavaScript dependencies, inconsistent touch/keyboard support, and screen reader compatibility issues. The native element is guaranteed to work with all assistive technologies, satisfying the WCAG 2.2 AA mandate without additional effort.
2. **Visible hint text for constraints** (HIGH) — File type and size restrictions must be communicated as visible hint text before the input, not only in error messages after submission. Research showed users, particularly those with lower digital literacy, would not discover constraints from post-submission errors alone.
3. **Error message above input** (HIGH) — Consistent with all GOV.UK form components, validation errors are displayed in red above the input (and summarised in the Error Summary at the top of the page), not as browser-native alerts or inline tooltips. This ensures predictable tab order and screen reader announcement.

## Notable Props
- Nunjucks macro: `govukFileUpload({ id, name, label, hint, errorMessage, value, attributes })`
- `label`: object with `text` or `html` and optional `isPageHeading` boolean
- `hint`: `{ text: "Upload a PDF, CSV or PNG. Maximum 10MB." }`
- `errorMessage`: `{ text: "Select a file" }` — triggers `govuk-form-group--error` styling
- `attributes`: arbitrary HTML attributes passed to the `<input>` (e.g., `accept`, `multiple`)
- `multiple`: pass via `attributes: { multiple: true }` to allow multi-file selection

## A11y Highlights
- **Keyboard**: Tab moves focus to the input; Space/Enter activates the native file browser dialog; no custom keyboard handling required
- **Screen reader**: Label is programmatically associated via `for`/`id`; hint and error text linked via `aria-describedby`; native file input announces selected file name after selection
- **ARIA**: `aria-describedby` links hint and error message IDs; `aria-invalid="true"` applied on error state; no custom ARIA roles — relies on native input semantics throughout

## Strengths & Gaps
- **Best at**: Accessible, zero-JavaScript file selection that works on all devices and assistive technologies; clear error and hint text patterns backed by real user research with diverse populations
- **Missing**: No built-in drag-and-drop enhancement; no upload progress indicator within the component (teams must build this separately); no preview of selected image files; limited multi-file management UI (list of selected files, remove individual files)
