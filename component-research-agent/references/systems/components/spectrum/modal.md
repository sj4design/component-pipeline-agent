---
system: Adobe Spectrum
component: Dialog / AlertDialog / DialogTrigger
url: https://react-spectrum.adobe.com/react-spectrum/Dialog.html
last_verified: 2026-03-28
---

# Dialog

## Approach
Spectrum takes a radically composable approach to dialogs, splitting the concept into multiple independent primitives: Dialog (the content container), DialogTrigger (the mechanism that opens it), Modal (the full-screen overlay wrapper), Popover (the positioned overlay wrapper), and Tray (the mobile-optimized bottom sheet wrapper). This decomposition exists because Adobe discovered that across products like Photoshop, Lightroom, and Experience Platform, the same dialog content needs to render differently depending on context — as a modal on desktop, a tray on mobile, or a popover near a trigger element. Rather than building one mega-component with flags for every presentation mode, Spectrum lets developers compose the right wrapper around Dialog content. The AlertDialog variant is a separate component entirely, enforcing a stricter structure (title, content, action buttons) because alert-level interruptions should never have ambiguous layouts.

## Key Decisions
1. **Dialog content is decoupled from its container** (HIGH) — A Dialog knows nothing about whether it lives in a Modal, Popover, or Tray. This separation means the same dialog content can be reused across contexts without rewriting. The tradeoff is higher initial learning curve — developers must understand three concepts instead of one — but Adobe judged this worthwhile because their products have diverse rendering contexts.

2. **DialogTrigger with `mobileType` prop** (HIGH) — The `mobileType` prop on DialogTrigger automatically switches the container type on mobile viewports. A dialog that appears as a Popover on desktop can become a Tray on mobile without any conditional rendering logic. Adobe built this because popovers are unusable on small screens, and rather than making every developer write their own responsive logic, they baked the adaptive behavior into the trigger.

3. **AlertDialog as a separate component** (MEDIUM) — Instead of adding an `alert` variant prop to Dialog, Spectrum created a distinct AlertDialog component with `role="alertdialog"`. This enforces required structure: a title, descriptive content, and explicit action buttons. The separation prevents developers from accidentally creating accessible-but-structurally-wrong alert dialogs.

4. **`isDismissable` and `isKeyboardDismissDisabled` as separate controls** (MEDIUM) — Clicking the overlay to close and pressing Escape to close are independently controllable. Adobe found that in some enterprise workflows (multi-step forms, unsaved data), you want Escape to work but not background clicks, or vice versa. Bundling both into one "closable" flag would be too coarse.

## Notable Props
- `type` (on DialogTrigger): Controls whether content renders as `"modal"`, `"popover"`, `"tray"`, or `"fullscreen"`. The architectural linchpin of the whole system.
- `mobileType`: Overrides `type` on mobile viewports. Elegant solution for responsive dialog behavior without media queries.
- `isKeyboardDismissDisabled`: Blocks Escape-to-close independently from click-outside-to-close. Rare but critical for data-loss prevention scenarios.

## A11y Highlights
- **Keyboard**: Focus moves into the dialog on mount, trapped within until closed. Escape closes by default (configurable). Focus returns to the trigger element on unmount.
- **Screen reader**: Dialog uses `role="dialog"` with `aria-labelledby` pointing to the heading. AlertDialog uses `role="alertdialog"`, which triggers more aggressive screen reader announcements.
- **ARIA**: `aria-modal="true"` on the container. Content outside the dialog is hidden from the accessibility tree while open. Dismiss button (X) gets an accessible label.

## Strengths & Gaps
- **Best at**: Composability and adaptive rendering — the cleanest architecture for apps that need modals, popovers, and trays from the same dialog content.
- **Missing**: No built-in size variants (small/medium/large) — sizing is left entirely to the consumer, which can lead to inconsistency across teams.
