---
system: Material Design 3
component: File Upload (absent — no dedicated component)
url: https://m3.material.io/components
last_verified: 2026-03-28
---

# File Upload

## Approach

Material Design 3 does not include a dedicated File Upload component. This is a documented and acknowledged gap — a GitHub discussion on the material-web repository (issue #5589) shows developers explicitly requesting "a m3 style file upload input" and receiving no official resolution from the maintainers. The absence is deliberate by omission rather than by design philosophy: Google's own products handle file upload through highly contextual, product-specific UIs (Google Drive, Gmail attachments, Google Photos) that do not map neatly to a single reusable primitive. The Material Design system has historically prioritized components with broad, surface-agnostic applicability, and file upload — which demands tight coupling with server-side upload logic, progress feedback, and validation — has been considered too application-specific to standardize. The community has consequently been left to compose solutions from existing primitives: a Button to trigger the native file dialog, a TextField to display the selected filename, and the underlying `<input type="file">` element hidden visually. This approach works but lacks any token-based or interaction-specified guidance, meaning each product team invents its own patterns independently.

## Key Decisions

1. **No dedicated component shipped** (HIGH) — The material-web component library (the official web components implementation of MD3) does not include a file upload element. The maintainers have not committed to building one. This means any MD3-based product must compose its own file upload experience from scratch, with no design guidance on layout, states, or error handling. The cost is inconsistency across MD3-ecosystem products; the implicit reasoning is that file upload behavior is too varied across upload types (single vs. multi, image vs. document, inline vs. modal) to canonicalize in a general-purpose system.

2. **Composed pattern via Button + hidden input** (HIGH) — The de facto community recommendation is to wire a Material Button to a visually hidden `<input type="file">` element. This preserves MD3's visual language (elevation, ripple, typography tokens) on the trigger while delegating the actual file browsing to the native OS file picker. The upside is full platform-native accessibility for the picker itself; the downside is that there are no MD3 specs for the post-selection state — what happens after a file is chosen is entirely up to the implementer.

3. **No drag-and-drop pattern specified** (HIGH) — MD3 provides no guidance on drop zone appearance, active/hover states, or interaction. Teams building drag-and-drop file upload in MD3 products must define their own visual language, token usage (which surface color, which outline, which state layer) without a reference point. This is a meaningful gap for enterprise or content-heavy products.

4. **Progress indication deferred to LinearProgressIndicator** (MEDIUM) — MD3 does include a LinearProgressIndicator and CircularProgressIndicator component. The implicit expectation is that teams wire upload progress from their own state into these components. There is no specification for how progress should be associated with an individual file in a multi-file upload scenario.

5. **Validation entirely consumer-managed** (MEDIUM) — MD3 provides no file type or file size validation primitives. The error state on TextField can be used to surface validation messages, but the validation logic, timing, and messaging patterns are left to each product team. This is consistent with MD3's general philosophy of separating visual state from business logic, but for file upload — where MIME type and size constraints are nearly universal — it creates unnecessary reinvention.

## Notable Props

- No dedicated component exists, so no component-specific props are documented.
- `LinearProgressIndicator` has `value` (0–1) and `buffer` props relevant for showing upload progress — but this association must be wired manually.
- `Button` has `trailingIcon` and `leadingIcon` props that allow pairing an upload icon with the trigger label.

## A11y Highlights

- **Keyboard**: Because the recommended pattern uses a native `<button>` (via MD3 Button) connected to a hidden `<input type="file">`, keyboard users can Tab to the button and press Enter or Space to open the native file picker. This works without any custom keyboard handling.
- **Screen reader**: The native file input retains its built-in accessibility semantics when triggered programmatically via the button's click handler. However, there is no MD3-specified live region for announcing upload progress or completion — teams must add `aria-live` regions independently.
- **ARIA**: No ARIA guidance is provided for file upload patterns in MD3 documentation. The TextField error state uses `aria-invalid` and `aria-describedby` when in error mode, which can be repurposed for filename display with validation messages, but this requires manual composition.

## Strengths & Gaps

- **Best at**: Keeping the trigger visually consistent with MD3's button system through the composed Button + hidden input pattern — the affordance feels native to the design language even without a first-party component.
- **Missing**: Everything after the trigger — there is no specified pattern for file lists, per-file states (uploading, complete, error), drag-and-drop zones, or multi-file management. MD3 is the only Tier 1 system with no file upload component or pattern at all.
