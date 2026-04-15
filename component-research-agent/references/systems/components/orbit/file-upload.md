---
system: Orbit (Kiwi.com)
component: Not available natively
url: https://orbit.kiwi/components/
last_verified: 2026-03-29
confidence: high
---

# File Upload

## Approach
Orbit does not include a FileUpload component. This is a considered omission rooted in Kiwi.com's booking flow architecture: document uploads (passport scans, visa documents, travel insurance certificates) are handled either through the device's native file browser via a plain `<input type="file">` or through an external document verification service (such as a third-party identity verification SDK) that brings its own UI. The Kiwi.com product team chose not to build a styled upload widget in Orbit because (a) the interaction is infrequent and appears in only a small subset of flows (primarily disruption management and insurance claims), and (b) the external verification services impose their own interface constraints that a custom Orbit component could not satisfy. For the rare cases where a simple file input is needed, teams use Orbit's `InputField` with `type="file"` directly.

## Key Decisions
1. **External service dependency** (HIGH) — Document verification integrates with third-party SDKs (e.g., Onfido, Jumio) that control their own UI, making a proprietary Orbit upload component redundant.
2. **Infrequent use in core flows** (HIGH) — File upload touches only edge-case flows (insurance claims, disruption rebooking documentation) rather than the primary booking funnel, reducing the ROI of a purpose-built component.
3. **Native input fallback** (MEDIUM) — Teams can compose a usable file input from `InputField` + `Button` without needing a dedicated abstraction, keeping Orbit lean.

## Notable Props
- N/A — component not present. Use `<input type="file">` or wrap with Orbit's `InputField`.

## A11y Highlights
- **Keyboard**: N/A (no component); native `<input type="file">` is keyboard-accessible by default.
- **Screen reader**: N/A
- **ARIA**: N/A

## Strengths & Gaps
- **Best at**: N/A — component intentionally absent.
- **Missing**: A drag-and-drop upload zone, file type validation UI, and upload progress indicator. Teams needing these should compose from primitives or use a library like react-dropzone.
