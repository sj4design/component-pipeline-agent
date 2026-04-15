---
system: shadcn/ui
component: File Upload (no dedicated component)
url: https://ui.shadcn.com
last_verified: 2026-03-28
confidence: high
---

# File Upload

## Approach
shadcn/ui does not have a dedicated file upload component in the official component set. File upload UI is typically composed using Input[type=file] with custom styling, or via community components available in the shadcn/ui registry. For drag-and-drop, developers use third-party libraries (react-dropzone) composed with shadcn/ui's styling system. This is a gap explicitly acknowledged by the shadcn/ui community.

## Key Decisions
1. **No official component** (HIGH) — shadcn/ui has not added a file upload component, reflecting either its complexity (drag-and-drop state management, preview, progress) or the view that it's too application-specific.
2. **react-dropzone + shadcn styling** (HIGH) — The community-standard approach is combining react-dropzone for drag-and-drop behavior with shadcn/ui styling, giving full control over the upload experience.
3. **Community registry components** (MEDIUM) — Multiple community file upload components following shadcn/ui conventions exist in third-party registries and can be added via the CLI.

## Notable Props
- Not applicable — use Input[type=file] or react-dropzone composition

## A11y Highlights
- **Keyboard**: Native input[type=file] is keyboard accessible; custom drag zones need explicit button alternatives
- **Screen reader**: Native input semantics; drag zone needs accessible label and button alternative
- **ARIA**: Developer responsibility; react-dropzone provides some ARIA; button trigger required for keyboard users

## Strengths & Gaps
- **Best at**: Maximum flexibility; react-dropzone integration; full ownership of upload UX
- **Missing**: No official component; significant assembly required; accessibility of custom drag zone must be implemented by developer
