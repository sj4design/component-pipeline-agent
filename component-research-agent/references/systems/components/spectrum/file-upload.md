---
system: Spectrum (Adobe)
component: FileTrigger
url: https://react-spectrum.adobe.com/react-spectrum/FileTrigger.html
last_verified: 2026-03-28
---

# FileTrigger

## Approach

Adobe Spectrum's answer to file upload is architecturally unusual: instead of building a drop zone or a dedicated upload widget, they built a behavior wrapper called FileTrigger. The core idea is that file selection is a trigger behavior — not a visual component — so it should be composable onto any pressable element. This means a designer can use FileTrigger around an ActionButton, a Button, an IconButton, or theoretically any element that accepts press events, and that element gains the ability to open the native OS file picker when activated. The philosophical driver behind this decision is Adobe's product context: tools like Lightroom, Adobe Express, and Firefly need file selection to originate from highly specific, already-designed UI elements — an "Open" button in a specific toolbar, a custom upload tile, a camera icon in a mobile panel — not from a generic drop zone widget. If Adobe shipped a standalone FileUpload component with fixed visual structure, product teams would spend significant effort overriding or wrapping it to match their surface. By inverting the model — the trigger is the behavior, and the visual is whatever the product supplies — Spectrum avoids that friction entirely.

It is important to note what FileTrigger does NOT provide: there is no drop zone, no file list, no upload progress, and no per-file state management. For drag-and-drop, Spectrum provides a separate `DropZone` component. The expectation is that products compose FileTrigger + DropZone + their own state management into a full upload experience. This is a higher composition burden than Carbon or Ant Design, but it grants total visual flexibility.

## Key Decisions

1. **Wrapper pattern over standalone widget** (HIGH) — FileTrigger wraps any pressable child rather than rendering its own interactive element. This is why the API accepts `children` as its primary prop and places no constraints on the visual appearance of the trigger. The WHY is Adobe's product diversity: a single visual component could not serve the needs of Lightroom's dark-mode import button, Firefly's drag target tile, and Express's mobile upload sheet. The wrapper model costs consumers more composition effort but eliminates the need for extensive visual customization props.

2. **Drop zone is a completely separate component** (HIGH) — Spectrum separates `FileTrigger` (button-based trigger) from `DropZone` (drag-and-drop target). This mirrors their Calendar/DatePicker split pattern. The reasoning is that drag-and-drop upload and click-to-upload are genuinely different interaction models with different visual requirements, ARIA structures, and keyboard behaviors. Coupling them into one component would force every product to render drag-and-drop chrome even when they only need a button trigger. The cost is that teams building a full upload experience must wire two components together.

3. **No upload state management built in** (HIGH) — FileTrigger fires `onSelect` with the selected `FileList` and then steps back. It does not track uploading state, progress, success, or error. This is a deliberate boundary: upload state is determined by the consumer's network request, server response, and business logic — none of which a UI component can reasonably own. Spectrum's position is that the component's job ends at file selection; everything after is the product's responsibility.

4. **Platform-aware media capture via `defaultCamera`** (MEDIUM) — The `defaultCamera` prop accepts `"user"` (front-facing) or `"environment"` (rear-facing) to activate the device camera directly on mobile. On desktop it degrades gracefully to the standard file picker. This reflects Spectrum's awareness that Adobe's mobile products (Lightroom Mobile, Adobe Scan) need camera-first upload flows, not file-picker-first flows. The prop maps directly to the HTML `capture` attribute but is surfaced with a named, semantic API.

5. **`acceptDirectory` for folder-level upload** (MEDIUM) — The prop exposes the `webkitdirectory` browser attribute, which allows users to select an entire folder rather than individual files. Adobe's use case is bulk asset import (importing a whole photo shoot folder into Lightroom). The prop is opt-in because the UX implications (the user may not realize they're selecting thousands of files) are significant and should be a conscious product decision.

## Notable Props

- `acceptedFileTypes`: Array of MIME type strings for client-side type filtering — notable because it runs validation before `onSelect` fires, not after, reducing unnecessary state updates downstream.
- `allowsMultiple`: Boolean that maps to the native `multiple` attribute — notable because the default is single-file, which is intentionally conservative; multi-file is opt-in complexity.
- `defaultCamera`: `"user" | "environment"` — notable because no other Tier 1 system exposes camera capture at this level of control within the file-selection component API.
- `acceptDirectory`: Boolean that enables folder selection — notable because it unlocks a fundamentally different selection model (folder vs. file) that most systems do not address at all.
- `children`: The composable trigger element — the entire architectural distinctiveness of FileTrigger lives here.

## A11y Highlights

- **Keyboard**: FileTrigger inherits keyboard behavior from whichever pressable child component it wraps. If the child is a Spectrum Button, it receives all of Spectrum's keyboard handling (Enter/Space to activate, full focus ring, Tab navigation) automatically via React Aria's `usePress` hook. No additional keyboard implementation is needed at the FileTrigger level.
- **Screen reader**: The native file input is hidden visually but retained in the DOM, so screen readers receive the browser's built-in file input announcement when the trigger is activated. Spectrum's documentation requires `aria-label` or `aria-labelledby` on the trigger child when no visible label is present, ensuring the file selection purpose is announced.
- **ARIA**: FileTrigger does not add ARIA roles of its own — it delegates entirely to the child component's accessibility semantics and to the hidden native input. This is consistent with Spectrum's React Aria foundation, which treats accessibility as a behavior layer separate from visual structure. Upload progress, if implemented, requires the product team to add `aria-live` regions manually.

## Strengths & Gaps

- **Best at**: Maximum visual flexibility — because FileTrigger imposes no visual structure, it can serve any design surface from a minimal icon button to a complex custom tile without fighting the component's defaults.
- **Missing**: Everything post-selection is the consumer's problem — no drop zone integration, no file list management, no progress feedback, no error-per-file states. Teams building a full upload UI must compose FileTrigger + DropZone + custom state, which is significantly more work than Carbon or Ant Design's all-in-one approaches.
