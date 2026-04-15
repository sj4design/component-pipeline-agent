---
system: Mantine
component: FileInput + Dropzone (@mantine/dropzone)
url: https://mantine.dev/core/file-input/
last_verified: 2026-03-29
confidence: high
---

# File Upload (FileInput + Dropzone)

## Approach
Mantine provides two complementary file upload solutions: `FileInput` in `@mantine/core` for a simple button-style file trigger, and `Dropzone` in the separate `@mantine/dropzone` package for a full drag-and-drop area. FileInput is a styled wrapper around `<input type="file">` that renders as a Mantine Input with a custom display value showing the selected file name(s). Dropzone provides a visually distinct drop area with drag state feedback (idle/accept/reject visual states), file type/size validation, and accepts/rejects visual indicators. The two-package split reflects Mantine's philosophy: keep `@mantine/core` lean while offering extended components as opt-in packages.

## Key Decisions
1. **FileInput for simple use cases** (HIGH) — FileInput integrates with Mantine's form system (`@mantine/form`) and renders as a standard input in a form field layout. It handles single and multiple file selection. The display value (file name) is rendered via a `valueComponent` prop for custom display, or defaults to showing the file name.
2. **Dropzone for rich upload UX** (HIGH) — Dropzone renders a dashed-border drop area with three visual states: idle, active (file being dragged over), and rejected (wrong file type). It uses `react-dropzone` under the hood and exposes all react-dropzone options. The three-state visual model clearly communicates what files are accepted.
3. **Separate package for Dropzone** (MEDIUM) — `@mantine/dropzone` is an optional package. This keeps the core bundle lean for teams that only need the simple FileInput. Teams building image upload or document import workflows install the dropzone package; forms-heavy applications that just need file fields use FileInput from core.
4. **Form integration** (MEDIUM) — Both FileInput and Dropzone integrate with `@mantine/form` for form validation. `@mantine/form`'s `getInputProps` works directly with FileInput, making validation (required, file type) part of the standard form submission flow.

## Notable Props
FileInput: `value`, `onChange`, `accept`, `multiple`, `clearable`, `valueComponent`
Dropzone: `onDrop`, `onReject`, `accept`, `maxSize`, `maxFiles`, `multiple`, `loading`, `disabled`
Dropzone.Accept, Dropzone.Reject, Dropzone.Idle: compound components for three-state content

## A11y Highlights
- **Keyboard**: FileInput: Tab to focus button, Enter/Space opens file dialog; Dropzone: focusable area, Enter/Space opens file dialog
- **Screen reader**: FileInput: labeled input with selected file name announced; Dropzone: interactive region with description
- **ARIA**: FileInput uses `<input type="file">` base with proper label association; Dropzone uses `aria-label` and communicates drag state

## Strengths & Gaps
- **Best at**: Two-tier approach covers simple and complex upload needs; form system integration; three-state Dropzone visual feedback; react-dropzone power under the hood
- **Missing**: No built-in file list with progress indicators (teams compose this with FileInput state + progress bar); Dropzone is a separate package requiring additional install
