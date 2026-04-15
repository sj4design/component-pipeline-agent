---
system: Atlassian Design System
component: Flag / FlagGroup
url: https://atlassian.design/components/flag/
last_verified: 2026-03-28
---

# Flag

## Approach
Atlassian uses the term "Flag" rather than "Toast" or "Snackbar," reflecting a conceptual model where notifications are metaphorical flags raised to get attention. The system is built around composition: individual Flag components are managed by a FlagGroup that handles stacking, entry/exit animations, and ordering. A dedicated FlagsProvider manages state at the application level, making flag lifecycle a first-class architectural concern rather than an imperative API call. The auto-dismiss variant is a separate component (AutoDismissFlag) rather than a prop, following the principle that different timing behaviors warrant different components.

## Key Decisions
1. **Separate AutoDismissFlag component** (HIGH) — Rather than adding an `autoDismiss` prop, Atlassian created a distinct component with a fixed 8-second timeout. This makes the dismissal behavior explicit in code and prevents accidental auto-dismissal of important messages. Developers must consciously choose which flag type to use.
2. **FlagGroup for stacking and animation** (HIGH) — Flags are never rendered alone; they must be wrapped in a FlagGroup that manages stacking order and coordinated entry/exit animations. This architectural decision ensures consistent stacking behavior across all Atlassian products (Jira, Confluence, Bitbucket) without per-team implementation variance.
3. **FlagsProvider for state management** (MEDIUM) — A context provider manages flag lifecycle at the app level, providing `showFlag` and `dismissFlag` methods. This moves notification state management out of individual components and into a centralized pattern, which is critical for complex apps like Jira where multiple subsystems may raise flags simultaneously.
4. **Five semantic appearances** (MEDIUM) — Information, success, warning, error (danger), and discovery. The "discovery" type is unique to Atlassian and used for feature announcements and onboarding tips, reflecting their product-led growth strategy where the notification system doubles as a feature education channel.

## Notable Props
- `appearance`: `info | success | warning | error | discovery` -- "discovery" is unique for feature education
- `title` + `description`: Structured content with explicit title, unlike single-message toasts
- `actions`: Array of action objects allowing multiple actions per flag (unlike M3's single action limit)

## A11y Highlights
- **Keyboard**: Flags are focusable; Tab navigates between actions and close button within a flag
- **Screen reader**: Uses `role="alert"` for error/warning; `role="status"` for info/success
- **ARIA**: FlagGroup manages focus order for stacked flags; auto-dismiss pauses on hover/focus

## Strengths & Gaps
- **Best at**: Managing complex multi-notification scenarios through the FlagGroup + FlagsProvider architecture, plus the unique "discovery" variant that serves product education alongside standard notifications.
- **Missing**: Fixed 8-second auto-dismiss with no duration customization; no priority queue system for competing flags; no built-in placement options (always appears top-right); limited mobile-specific adaptations.
