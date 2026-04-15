---
system: IBM Carbon
component: Modal
url: https://carbondesignsystem.com/components/modal/usage/
last_verified: 2026-03-28
---

# Modal

## Approach
Carbon treats modals as structured interruptions with clear intent categories. Rather than a single generic modal, Carbon splits the concept into Passive and Transactional types because IBM's enterprise software research revealed that the biggest source of modal-related user errors was ambiguity about what action was expected. A passive modal is informational — read and dismiss — while a transactional modal requires a decision. This semantic distinction affects the entire component: passive modals close on outside click (low commitment), transactional modals do not (high commitment). Carbon also introduces a Danger variant of transactional modals specifically for destructive actions, replacing the primary button with a red danger button. IBM found that in enterprise contexts, accidental data deletion was a recurring support ticket category, so they made destructive confirmation visually unmistakable at the component level.

## Key Decisions
1. **Passive vs. Transactional as distinct types** (HIGH) — This is Carbon's defining modal decision. Passive modals have no footer actions and close on background click, signaling "this is informational." Transactional modals always have Cancel and a primary action, and require explicit interaction to close. The split forces designers to classify every modal's intent upfront, which IBM found reduced modal misuse across their product suite.

2. **Four explicit sizes: XS, SM, MD, LG** (HIGH) — Carbon provides four predetermined widths rather than free-form sizing. XS is for simple confirmations, SM for short forms, MD for complex content, and LG for data-heavy views like tables within modals. Predefined sizes ensure visual consistency across IBM's hundreds of products and prevent the common problem of developers making modals arbitrarily wide.

3. **Danger variant as a first-class concept** (MEDIUM) — The danger modal is not just a color override — it replaces the primary button component with a dedicated danger button, changes the visual hierarchy, and the documentation mandates specific copy patterns (explicitly stating what will be destroyed). IBM built this because enterprise users managing production infrastructure need zero ambiguity about destructive actions.

4. **Three-zone layout: Header, Body, Footer** (MEDIUM) — Every modal has exactly three structural zones. The header contains the title, optional label (for categorization), and close icon. The body holds content. The footer holds actions. This rigid structure exists because Carbon modals frequently contain complex content (forms, data tables, progress indicators) and the three-zone model ensures consistent scrolling behavior — the body scrolls while header and footer remain fixed.

## Notable Props
- `danger`: Boolean that switches the primary action button to a destructive danger variant. Simple flag with high-impact visual and semantic consequences.
- `hasScrollingContent`: Explicitly declares that body content will overflow, enabling proper scroll containment and focus management within the scrollable area.
- `preventCloseOnClickOutside`: Defaults to false for passive, true for transactional. Makes the closing behavior intentional rather than accidental.

## A11y Highlights
- **Keyboard**: Tab moves through interactive elements within the modal. Focus is trapped. Escape closes the modal (unless explicitly prevented). First focusable element receives focus on open — for forms that means the first input, for transactional modals without forms it means the primary button.
- **Screen reader**: Container has `role="dialog"`. Title is announced on open. Carbon specifies that the modal label (optional subtitle above the title) should provide additional context for screen readers.
- **ARIA**: `aria-modal="true"` with `aria-labelledby` pointing to the title. Background content is inert. Focus returns to the trigger on close.

## Strengths & Gaps
- **Best at**: Enterprise use cases — the passive/transactional/danger classification system prevents modal misuse in complex, high-stakes applications.
- **Missing**: No built-in support for full-screen modals, no adaptive mobile behavior (no tray equivalent), and no composable architecture for rendering the same content in different containers.
