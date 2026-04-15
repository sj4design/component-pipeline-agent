---
system: Atlassian Design System
component: Button, IconButton, LinkButton
url: https://atlassian.design/components/button/
last_verified: 2026-03-28
---

# Atlassian Button

## Approach

Atlassian's button system underwent a major architectural rethink in early 2025, splitting what was a single overloaded Button component into three purpose-built components: Button (for actions), IconButton (for icon-only compact actions), and LinkButton (for navigation that looks like a button). The original monolithic button was trying to handle actions, navigation, and icon-only modes through a single API, which led to accessibility violations (links semantically rendered as buttons), performance overhead (loading link logic for action buttons), and API confusion (when to use href vs. onClick). The refactored system aligns with web standards: buttons trigger actions, links navigate. Atlassian also takes a strong stance against disabling buttons, recommending that teams keep buttons interactive and use validation messages to explain what prevents progress, because disabled buttons are invisible to some screen readers and frustrate users who cannot figure out why they cannot proceed.

## Key Decisions

1. **Splitting Button into three components** (HIGH) — Atlassian separated Button, IconButton, and LinkButton to enforce semantic correctness. The old single Button with an href prop was rendering anchor elements with button-like behavior, which broke screen reader expectations and keyboard interaction patterns (buttons activate with Space, links with Enter). The split ensures each component uses the correct HTML element (button vs. a), correct ARIA semantics, and correct keyboard model. This is a principled accessibility-first architectural decision that costs more in migration effort but eliminates an entire category of a11y bugs.

2. **Discouraging disabled buttons** (HIGH) — Atlassian's documentation explicitly recommends against disabling buttons, especially in forms. Their research found that disabled buttons without explanation are one of the top sources of user frustration in products like Jira and Confluence. Instead, they advocate keeping buttons enabled and using inline validation to explain blockers. This is a bold philosophical stance that most design systems avoid because it requires more implementation effort (validation logic vs. a simple disabled prop), but it produces measurably better user outcomes.

3. **Appearance-based variant naming** (MEDIUM) — Atlassian uses "appearance" (default, primary, subtle, warning, danger) rather than "kind" or "variant." Each appearance maps to a visual treatment and an intent: primary for the main CTA (limited to one per area), subtle for secondary actions that should not compete with primary, warning for actions requiring caution, and danger for irreversible destructive actions. The "subtle" naming is intentional over "secondary" because Atlassian wanted to emphasize that these buttons should recede visually, not just rank second.

4. **IconButton as a dedicated component** (MEDIUM) — Rather than adding an iconOnly prop to Button, Atlassian created a separate IconButton component that requires a label prop for accessibility. This forces developers to provide an accessible name at the component API level rather than hoping they remember to add aria-label. The structural enforcement means icon buttons cannot be created without accessibility; it is literally a required prop.

## Notable Props

- `appearance` (default | primary | subtle | warning | danger): Intent-mapped visual treatment. "Subtle" deliberately chosen over "secondary" to signal visual receding.
- `isSelected`: Allows buttons to show a selected/active state for toolbar-like contexts without needing a separate toggle component.
- `iconBefore` / `iconAfter`: Explicit slot naming that communicates placement rather than generic "icon" prop.
- `label` (on IconButton, required): Structurally enforced accessibility. Cannot create an icon button without providing a screen reader label.

## A11y Highlights

- **Keyboard**: Tab to focus, Enter/Space to activate. Focus indicators were updated in 2025 to improve contrast on primary, warning, and danger appearances where the old focus ring blended with the button background color.
- **Screen reader**: IconButton requires the label prop (not optional). LinkButton renders as an anchor element with proper link semantics so screen readers announce "link" rather than "button." Disabled state is discouraged; when used, aria-disabled keeps the button in focus order.
- **ARIA**: Button uses role="button," LinkButton uses implicit link role from the anchor element. Warning and danger appearances rely on clear label text rather than ARIA roles to communicate risk, because color alone is not accessible.

## Strengths & Gaps

- **Best at**: Enforcing semantic correctness through component architecture (three components instead of one) and structurally requiring accessibility through mandatory props.
- **Missing**: No built-in FAB, segmented button, or toggle button component; teams needing floating or grouped toggle actions must compose from available primitives.
