---
component: modal
compiled: 2026-03-28
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Modal — All Systems Digest

## Material Design 3
**Approach**: Two variants only — Basic (small overlay for decisions) and Full-screen (complex workflows). Deliberate binary to prevent "medium dialog" ambiguity and dialog fatigue. Full-screen uses top app bar + close icon, not footer buttons.
**Key decisions**:
- Only Basic + Full-screen; eliminates medium-size ambiguity and forces upfront complexity assessment
- Max 2 action buttons in Basic; 3+ options drive decision paralysis (use different component instead)
- Scrim at specific opacity maintains page context awareness while blocking background interaction
**Notable API**: `icon` (optional above title, unique to M3); `supportingText` (structural slot for "why" copy)
**A11y**: role="dialog" + aria-modal="true"; aria-labelledby + aria-describedby; focus trapped + returns to trigger; background gets aria-hidden.
**Best at**: Simple, consistent model scaling across large ecosystems. **Missing**: No medium size, no non-modal dialogs, no nested dialog support.

## Spectrum (Adobe)
**Approach**: Radically composable — Dialog content decoupled from container (Modal/Popover/Tray). Same content renders differently per context. AlertDialog is a separate strict component for alert-level interruptions.
**Key decisions**:
- Dialog knows nothing about its container; reuse same content as modal, popover, or tray without rewriting
- `mobileType` prop on DialogTrigger auto-switches container on mobile; no consumer media query logic needed
- `isDismissable` and `isKeyboardDismissDisabled` independently controllable for granular data-loss prevention
**Notable API**: `type` on DialogTrigger (modal|popover|tray|fullscreen); `mobileType` for adaptive rendering
**A11y**: AlertDialog uses role="alertdialog" for more aggressive announcements; aria-modal + aria-labelledby; focus trapped + returns to trigger.
**Best at**: Composable multi-context rendering (desktop modal → mobile tray). **Missing**: No built-in size variants; sizing left entirely to consumers.

## Carbon (IBM)
**Approach**: Passive (informational, dismiss-only) vs. Transactional (decision-required, action buttons) as distinct modal types. Danger variant is first-class, not just a color. Rigid three-zone layout (Header/Body/Footer) ensures consistent scroll behavior.
**Key decisions**:
- Passive closes on outside click; Transactional does not — semantic type drives interaction model
- Danger modal replaces primary button component, not just color; mandates explicit destruction copy
- Four fixed widths (XS/SM/MD/LG); prevents arbitrary sizing across IBM's hundreds of products
**Notable API**: `danger` (boolean, high-impact switch); `hasScrollingContent` (enables proper scroll containment); `preventCloseOnClickOutside`
**A11y**: First focusable element auto-focused on open (first input for forms, primary button otherwise); focus trapped; Escape closes.
**Best at**: Enterprise semantic classification (passive/transactional/danger prevents misuse). **Missing**: No full-screen variant, no adaptive mobile container, no composable architecture.

## Polaris (Shopify)
**Approach**: In active deprecation transition — original React Modal deprecated Jan 2026 in favor of App Bridge modals rendered by the Shopify admin host shell, solving the iframe centering problem. Original model: strict 2-button max, built-in async loading state, sectioned layout.
**Key decisions**:
- Moved to platform-rendered modal (App Bridge) to fix iframe viewport centering; less customization in exchange
- Strict 2-button action model (primary + cancel) prevents merchant decision paralysis
- `loading` prop shows spinner overlay for async data fetches ubiquitous in e-commerce modals
**Notable API**: `primaryAction`/`secondaryActions` accept config objects (enforces hierarchy at API level); `sectioned` (standardized padding/dividers); `large` (width toggle)
**A11y**: role="dialog" + aria-labelledby; focus trapped; Escape closes; focus returns to trigger.
**Best at**: E-commerce async workflows with built-in loading + strict action model. **Missing**: Deprecated; App Bridge replacement limits customization; only default/large sizes.

## Atlassian
**Approach**: Width-based sizing (small/medium/large/x-large/numeric) with content-driven height (grows until body scrolls). Composable sub-components (ModalHeader/Body/Footer/Title). Auto full-screen below 480px viewport. Custom focus lock handles browser extensions.
**Key decisions**:
- Content-driven height accommodates Jira's range from 2-line confirmations to 20-field issue forms
- Auto full-screen below 480px removes responsive modal decision from every developer
- Focus lock has `data-atlas-extension` escape hatch for Atlassian Companion and browser extensions
**Notable API**: `width` (preset strings or numeric px); `shouldScrollInViewport`; `shouldCloseOnEscapePress`; `shouldCloseOnOverlayClick`
**A11y**: role="dialog" + aria-modal + aria-labelledby; label prop fallback if no visual title; inert background; focus returns to previously focused element.
**Best at**: Flexible content accommodation across tiny confirmations to large forms. **Missing**: No semantic typing, no danger variant, no tray/sheet for mobile.

## Ant Design
**Approach**: Dual API — declarative JSX component and imperative static methods (Modal.confirm/info/error). `useModal` hook bridges imperative convenience with React Context. `footer={null}` turns it into generic overlay container.
**Key decisions**:
- Imperative static methods allow confirmation dialogs without state management, but break Context (themes/i18n)
- `useModal()` hook returns context-aware modal API; fixes theming/locale failures of static methods
- `Modal.destroyAll()` cleans up stale imperative modals on route changes in SPAs
**Notable API**: `destroyOnClose` (unmounts children, resets form state); `maskClosable` (defaults true); `getContainer` (for micro-frontend portals); `afterClose` (post-animation callback)
**A11y**: role="dialog" + aria-modal + aria-labelledby; static method modals have weaker ARIA support than JSX component; imperative modals mount outside accessibility tree.
**Best at**: Developer ergonomics — imperative API + hook bridge handles virtually any architectural context. **Missing**: No semantic modal types, no adaptive mobile behavior, static method ARIA gaps.
