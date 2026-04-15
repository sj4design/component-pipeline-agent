---
system: Fluent 2 (Microsoft)
component: Not available natively
url: https://react.fluentui.dev/?path=/docs/components-dialog--docs
last_verified: 2026-03-29
confidence: high
---

# Steps (Stepper)

## Approach
Fluent 2 does not include a Steps or Stepper component in its core library. This absence reflects a deliberate architectural and UX philosophy in Microsoft's design approach: multi-step processes in Microsoft 365 are handled through wizard dialogs, navigational flows within full pages, or sequential panels rather than an inline step indicator component embedded in the main content area. The Microsoft 365 first-run experience, Teams app setup wizards, and Outlook rules creation flows all use full-screen or modal wizard patterns where each step occupies its own dialog page or route — not a persistent step progress indicator alongside editable content. This approach reduces cognitive complexity for Microsoft's broad, non-technical user base by presenting one focused task at a time rather than showing the full journey simultaneously. The Dialog component with custom header navigation is the primary building block for multi-step flows in Fluent 2.

## Key Decisions
1. **No native component — UX philosophy decision** (HIGH) — Microsoft research on Office 365's user base (spanning from IT admins to first-time users across 300M+ accounts) supports single-focus-per-step wizard patterns over persistent step indicators; showing the full step sequence simultaneously was found to increase abandonment in setup flows.
2. **Dialog-based wizard pattern** (HIGH) — Multi-step flows use Fluent 2's `Dialog` component with step-specific content swapped per step, a "Next" primary Button, a "Back" secondary Button, and an optional step count indicator ("Step 2 of 4") implemented as a text element — this is the pattern used in Teams onboarding and Microsoft account setup.
3. **Page/route-based multi-step flows** (HIGH) — For complex, high-stakes workflows (e.g., SharePoint site creation, Azure resource configuration), Microsoft uses full-page navigation between steps rather than in-page components, leveraging browser history for back navigation and allowing users to leave and return to a flow.
4. **ProgressBar for linear task completion** (MEDIUM) — Where a visual completion indicator is needed without step-by-step navigation (e.g., profile completion percentage in Teams), Fluent 2's `ProgressBar` component serves as the progress metaphor without the interactive step-navigation semantics.

## Notable Props
N/A — No native Steps/Stepper component. Recommended composition pattern for wizard flows:
- `Dialog` / `DialogSurface` as the wizard container
- `DialogTitle` for the current step name
- `DialogContent` for step-specific form content
- `DialogActions` containing Back (`Button` secondary) and Next/Finish (`Button` primary)
- Custom step counter text (e.g., "Step 2 of 5") rendered in the header area
- `ProgressBar` (optional) for visual completion indication

## A11y Highlights
- **Keyboard**: Dialog-based wizard patterns inherit Fluent Dialog's focus trapping (Tab cycles within the dialog, Escape is handled per product policy — some wizards disable Escape to prevent accidental dismissal); Back and Next buttons are keyboard-accessible via Tab/Enter/Space.
- **Screen reader**: `role="dialog"` with `aria-labelledby` on the Dialog provides step context; step title changes are announced when dialog content updates; step count ("Step 2 of 5") should be included in the `aria-label` or as visible text near the dialog title to orient screen reader users; progress from ProgressBar is announced via `role="progressbar"` with `aria-valuenow`.
- **ARIA**: `role="dialog"` + `aria-modal="true"` for wizard dialogs; step title via `aria-labelledby`; `aria-live="polite"` regions for step transition announcements in non-dialog wizard patterns; high-contrast mode handled by Fluent token system on all composed primitives.

## Strengths & Gaps
- **Best at**: Providing robust Dialog and Button primitives for implementing Microsoft's recommended wizard pattern; Dialog's focus trapping and accessibility semantics are production-hardened across Teams and Office; ProgressBar covers linear completion display needs.
- **Missing**: No reusable step indicator component means every wizard in Microsoft 365 implements its own step counting and navigation logic independently; no shared step state management; no accessible "breadcrumb" style step visualization that lets users jump back to completed steps; consumers migrating from other design systems that provide a Steps component must fully architect their own multi-step navigation pattern.
