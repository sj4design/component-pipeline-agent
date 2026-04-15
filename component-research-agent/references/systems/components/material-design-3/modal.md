---
system: Material Design 3
component: Dialog
url: https://m3.material.io/components/dialogs/specs
last_verified: 2026-03-28
---

# Dialog

## Approach
Material Design 3 uses the term "Dialog" rather than "Modal" and treats it as a critical interruption mechanism. The philosophy is that dialogs should be rare, purposeful moments where the system genuinely needs the user to acknowledge or decide something before continuing. M3 deliberately limits dialog variants to just two — Basic and Full-screen — because Google's research found that excessive dialog types lead to "dialog fatigue" where users dismiss without reading. The Basic dialog handles alerts, confirmations, and simple selections with minimal footprint, while the Full-screen dialog exists specifically for complex multi-step tasks (like composing an email) where the user needs maximum workspace. This binary split forces designers to commit: either the task is simple enough for a small overlay, or complex enough to deserve the entire screen.

## Key Decisions
1. **Only two variants: Basic and Full-screen** (HIGH) — M3 intentionally avoids medium-sized or resizable dialogs. The reasoning is that "medium" dialogs create ambiguity about whether the task is simple or complex, leading to inconsistent usage across products. By forcing a binary choice, design teams must evaluate task complexity upfront. This also simplifies responsive behavior: basic dialogs stay centered overlays, full-screen dialogs are always full-screen.

2. **Scrim as a non-interactive backdrop** (MEDIUM) — The dark overlay behind dialogs serves a dual purpose: it visually communicates that background content is inaccessible, and it provides a click-to-dismiss target for basic dialogs. M3 specifies the scrim at a particular opacity to maintain context awareness — users can still see what page they were on, reducing disorientation.

3. **Actions limited to two buttons maximum** (HIGH) — Basic dialogs enforce a maximum of two action buttons (confirm/dismiss). Google found that three or more actions dramatically increase decision time and error rates. If you need more choices, M3 says to use a different component (like a bottom sheet or full-screen dialog), not to cram more buttons into a dialog.

4. **Full-screen dialog uses a top app bar** (MEDIUM) — Full-screen dialogs include a close icon in a top app bar rather than footer buttons. This is because full-screen dialogs represent workflows, not decisions. The close/save pattern mirrors document editing, making the interaction model consistent with the rest of the app.

## Notable Props
- `icon`: Optional icon slot above the title for added visual emphasis. Unique to M3 — most systems only support title text. Useful for confirmation dialogs where an icon reinforces the message severity.
- `supportingText`: Dedicated slot for explanatory text below the title, separating the "what" (title) from the "why" (supporting text) structurally rather than relying on a single content area.

## A11y Highlights
- **Keyboard**: Tab/Shift+Tab cycles through focusable elements inside the dialog. Escape closes the dialog. Focus is trapped — it cannot leave the dialog while open.
- **Screen reader**: The dialog container uses `role="dialog"` with `aria-modal="true"`. Title is linked via `aria-labelledby`, and supporting text via `aria-describedby`, giving screen readers a structured announcement.
- **ARIA**: Focus is restored to the triggering element when the dialog closes. If the trigger no longer exists in DOM, focus falls back to a logical ancestor. Background content receives `aria-hidden="true"` while the dialog is open.

## Strengths & Gaps
- **Best at**: Simplicity and consistency — the two-variant model eliminates ambiguity and scales well across Google's massive product ecosystem.
- **Missing**: No built-in concept of "non-modal" dialogs, no size variants between small and full-screen, and no native support for stacked or nested dialogs.
