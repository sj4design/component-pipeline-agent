---
system: Ant Design
component: Modal
url: https://ant.design/components/modal/
last_verified: 2026-03-28
---

# Modal

## Approach
Ant Design's Modal is distinctive for offering two parallel APIs: a declarative JSX component and an imperative static method system (Modal.confirm, Modal.info, Modal.success, Modal.error, Modal.warning). This dual API exists because Ant Design powers a massive ecosystem of Chinese enterprise applications where both patterns are common — React purists prefer declarative JSX, while developers building quick admin tools prefer the imperative approach of calling `Modal.confirm()` from any event handler without managing open/close state. However, this convenience created a fundamental architectural problem: static methods execute outside the React tree, meaning they cannot access Context (themes, locales, ConfigProvider settings). Ant Design solved this with the `useModal` hook, which bridges imperative convenience with React context awareness. The evolution from static methods to hooks reflects Ant Design's broader philosophy of pragmatic developer experience — ship the easy thing first, then provide the architecturally correct version alongside it rather than removing the popular-but-flawed approach.

## Key Decisions
1. **Dual API: Declarative component + Imperative static methods** (HIGH) — The declarative `<Modal>` component is controlled via `open` prop, while `Modal.confirm()` and friends create modals imperatively from anywhere in the code. This dual approach exists because enterprise admin dashboards often need to trigger confirmations from deeply nested event handlers where threading state up to a parent component is tedious. The tradeoff: static methods cannot consume React Context, so theming, i18n, and RTL mode fail silently.

2. **useModal hook as the Context-aware bridge** (HIGH) — `Modal.useModal()` returns a `[modal, contextHolder]` tuple. The `modal` object has the same `.confirm()`, `.info()`, `.error()` methods as the static API, but modals it creates inherit all Context from where `contextHolder` is rendered. Ant built this because their community reported thousands of issues where `Modal.confirm()` ignored ConfigProvider theme/locale settings. The hook preserves the imperative convenience while fixing the architectural gap.

3. **Modal.destroyAll() for route-level cleanup** (MEDIUM) — A static method that closes every open imperative modal at once. This exists because in single-page applications, navigating to a new route should dismiss all open confirmations, but since imperative modals live outside the React tree, they persist across route changes. `destroyAll()` is a pragmatic escape hatch — architecturally inelegant but solves a real pain point that caused stale modals to linger in SPAs.

4. **Configurable footer with null override** (MEDIUM) — Setting `footer={null}` removes the footer entirely, which transforms Modal into a generic overlay container. Ant Design added this because developers were using Modal as a general-purpose overlay for custom content (image viewers, video players, multi-step wizards) where the standard OK/Cancel footer was unwanted. Rather than creating a separate "Overlay" component, they made the footer optional.

## Notable Props
- `destroyOnClose`: When true, unmounts child components when the modal closes instead of hiding them. Critical for forms that should reset state between opens.
- `maskClosable`: Controls whether clicking the backdrop closes the modal. Defaults to true, unlike many enterprise systems that default to false.
- `getContainer`: Specifies which DOM node the modal portal attaches to. Useful in micro-frontend architectures where modals need to render in a specific container.
- `afterClose`: Callback fired after the close animation completes, not when `open` becomes false. Important for cleanup logic that depends on the DOM being fully updated.
- `footer`: Accepts ReactNode or null — null removes the footer entirely, unlocking non-standard modal layouts.

## A11y Highlights
- **Keyboard**: Focus trapped within the modal. Escape closes by default (`keyboard` prop controls this). Tab cycles through focusable elements.
- **Screen reader**: Uses `role="dialog"` with `aria-modal="true"`. Title linked via `aria-labelledby`. The static method modals also set these roles, though screen reader support is less consistent than the declarative component.
- **ARIA**: `aria-labelledby` auto-linked to the title. Mask (backdrop) prevents interaction with background. Note: imperative modals created via static methods have historically had weaker ARIA support than the JSX component since they mount outside the app's accessibility tree.

## Strengths & Gaps
- **Best at**: Developer ergonomics — the imperative API lets developers trigger confirmations from anywhere with minimal boilerplate, and the hooks API fixes the Context problem without sacrificing that convenience.
- **Missing**: No semantic modal types (passive/transactional/danger as first-class variants), no adaptive mobile behavior (no tray/sheet), and the static method API still has accessibility gaps compared to the declarative component.
