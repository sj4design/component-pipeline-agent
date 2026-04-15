---
system: Fluent 2 (Microsoft)
component: Not available natively
url: https://react.fluentui.dev/?path=/docs/components-button--docs
last_verified: 2026-03-29
confidence: high
---

# File Upload

## Approach
Fluent 2 does not include a dedicated FileUpload component in its core library. Microsoft 365 products that require file upload (OneDrive, SharePoint, Teams file sharing) handle this at the product layer using a combination of Fluent primitives: a visually styled Button component triggers a hidden `<input type="file">` element, and any drag-and-drop surface, progress feedback, or file list display is built from scratch by each product team. This pattern reflects Microsoft's architectural decision to keep Fluent 2's core library focused on atomic and compound UI primitives rather than complex, opinionated workflows. File upload behavior varies significantly across Teams (chat attachments), OneDrive (bulk folder upload), and Outlook (email attachments), making a single shared component difficult to standardize. Teams and SharePoint implement their own upload experiences using Fluent tokens and styling conventions for visual consistency without a shared component contract.

## Key Decisions
1. **No native component — intentional scope decision** (HIGH) — Fluent 2's core scope deliberately excludes workflow-heavy components that would require product-specific business logic (upload progress, error handling, file type validation, size limits); these vary too much across Microsoft 365 to generalize without becoming overly complex.
2. **Button + hidden input pattern** (HIGH) — The recommended workaround is a Fluent `Button` (typically with an attach/paperclip icon) wired to a hidden `<input type="file">` via a ref, leveraging native browser file selection dialogs and maintaining full accessibility through the native input element.
3. **Drag-and-drop at product layer** (MEDIUM) — Drop zones in Teams and SharePoint are implemented with product-owned components using Fluent's visual tokens (border color, background, typography) for visual consistency — there is no shared `DropZone` primitive in Fluent 2 core.
4. **Progress feedback via ProgressBar** (MEDIUM) — Upload progress is communicated using Fluent 2's `ProgressBar` component combined with product-level state management, rather than being encapsulated inside a file upload component.

## Notable Props
N/A — No native FileUpload component. Workaround pattern uses:
- `Button` with `icon` prop (e.g., attach icon) as the trigger
- Native `<input type="file">` with `accept`, `multiple`, `onChange` attributes
- `ProgressBar` for upload state feedback
- `Toast` or `MessageBar` for success/error notifications

## A11y Highlights
- **Keyboard**: The hidden `<input type="file">` is programmatically triggered via the Button's click handler; the native input retains full keyboard accessibility when properly associated; Tab and Enter/Space activate the Button trigger.
- **Screen reader**: Native `<input type="file">` provides correct `role="button"` or file input semantics when focused; the Fluent Button trigger should include an `aria-label` describing the upload action (e.g., "Attach file"); any resulting file list should use a `<ul>` or `role="list"` with individual file names and remove actions labeled accessibly.
- **ARIA**: No special ARIA required beyond standard Button and input labeling; drag-and-drop zones should use `aria-dropeffect` (deprecated but still used) or ARIA live regions to announce when files are dropped; high-contrast mode is handled by Fluent tokens on the Button and any status UI.

## Strengths & Gaps
- **Best at**: Leveraging native browser file input for maximum OS compatibility and inherent accessibility; using Fluent Button styling for a consistent trigger that matches the design system's visual language.
- **Missing**: No drag-and-drop DropZone primitive; no file list display component; no upload progress encapsulation; no file type validation UI; no built-in multi-file management UI — all must be built per-product, leading to inconsistency across Microsoft 365 surfaces.
