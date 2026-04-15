---
system: Ant Design
component: Switch
url: https://ant.design/components/switch/
last_verified: 2026-03-28
---

# Switch

## Approach

Ant Design's Switch is the most feature-complete implementation among the Tier 1 systems, reflecting the design system's origins in Alibaba's enterprise product ecosystem where complex admin dashboards, financial management tools, and developer platforms demand a toggle that can communicate more than just "on" and "off." The philosophical stance is pragmatic richness: every feature exists to solve a documented real-world problem rather than to show off flexibility. The `loading` prop — unique to Ant Design among the Tier 1 systems — exists because Ant's team observed that in backend management UIs, flipping a switch frequently triggers an API call (enabling a service, toggling a feature flag in a live system, changing a billing setting), and there is a meaningful window of time between user interaction and confirmed state change. Showing the old state silently during that window is misleading; showing a loading indicator communicates that the action is in progress. The `checkedChildren` and `unCheckedChildren` props extend the switch's communication surface into the thumb itself, allowing text or icons directly inside the track to label the two states without requiring external label text — a pattern that originated in Chinese enterprise UIs where spatial efficiency is paramount.

## Key Decisions

1. **loading prop for async operations** (HIGH) — Ant Design is the only Tier 1 system with a first-class `loading` prop on the Switch. When set to `true`, the thumb shows a spinner and the control becomes non-interactive. The WHY is data integrity in enterprise applications: if a user flips a switch and can flip it back before the first API call resolves, you risk race conditions, double state mutations, or UI inconsistency between the frontend and backend. The `loading` state locks the control until the operation completes, communicating to the user that their action is being processed without giving the illusion of immediate effect.

2. **checkedChildren / unCheckedChildren for thumb content** (HIGH) — The switch thumb can contain text or icon elements that appear inside the track depending on state: a sun icon when "on," a moon icon when "off," or text labels like "ON"/"OFF" directly in the control. The WHY is space efficiency combined with self-documentation: in dense dashboards with many toggles, an external label per toggle consumes significant vertical space. Moving the state label into the thumb creates a visually compact control that still communicates its state through text or icon rather than color alone — addressing WCAG 1.4.1 without requiring full label columns.

3. **Three size variants (small, default, large)** (MEDIUM) — Ant Design offers three sizes explicitly: `size="small"`, the default (medium), and implicitly supports larger through token customization. The WHY is the breadth of Ant's use contexts: small switches for table column action rows, default for settings forms, large for prominent feature activation in onboarding flows. Having three defined sizes prevents ad-hoc size hacking at the application level, where developers typically apply CSS overrides that break spacing and touch-target requirements.

4. **role="switch" with color-plus-position state encoding** (HIGH) — The component uses dual encoding: track color changes (primary color when on, neutral when off) AND thumb position (right when on, left when off). The WHY for dual encoding is redundancy — users with color vision deficiencies rely on position; users with low vision in bright environments rely on color contrast. However, Ant Design's documentation acknowledges a gap: color distinction alone can still be insufficient in some rendering environments, and the checkedChildren/unCheckedChildren icons are the recommended mitigation.

5. **Switch vs Checkbox distinction follows immediate-effect rule** (HIGH) — Ant Design explicitly documents that Switch should be used for cases where the effect is immediate and visible, while Checkbox is appropriate for state that is submitted in a form. The example given in the docs is: "If you need to represent the on/off of something, use Switch; if you need to confirm a selection before applying, use Checkbox." This matches the consensus across all Tier 1 systems, but Ant Design's example-driven documentation makes the distinction easier for teams to apply.

## Notable Props

- `loading`: Async pending state — a spinner in the thumb, interaction locked. Unique to Ant Design among Tier 1 systems.
- `checkedChildren` / `unCheckedChildren`: ReactNode content inside the thumb for each state — enables icon-in-thumb and text-in-thumb patterns.
- `size`: `"small"` | `"default"` — explicit size control.
- `checked` / `defaultChecked`: Controlled and uncontrolled patterns both supported.
- `onChange`: `(checked: boolean, event) => void` — receives both the new state and the event object.
- `onClick`: Separate click handler for when you need to intercept the click before state changes (e.g., for confirmation dialogs).
- `disabled`: Disables interaction entirely.

## A11y Highlights

- **Keyboard**: Tab to focus, Space or Enter to toggle. Standard ARIA switch pattern. The `loading` state removes the control from interaction while maintaining visibility and focus.
- **Screen reader**: Announces label and current state via `role="switch"` and `aria-checked`. The `checkedChildren` and `unCheckedChildren` content inside the thumb is visible but Ant Design recommends also providing an external label for screen reader context, since the thumb content alone may be insufficient for announcement.
- **ARIA**: `role="switch"` with `aria-checked="true|false"`. Focus ring is styled with CSS variables (`--ant-color-primary-border`) for consistent theming. The `title` attribute on the underlying input can provide additional description for assistive technology when the visual label is minimal.

## Strengths & Gaps

- **Best at**: The most complete API among Tier 1 systems — `loading` state for async, `checkedChildren`/`unCheckedChildren` for visual richness, three explicit sizes, and both controlled and uncontrolled patterns — making it the best choice for feature-dense enterprise dashboards with async backend operations.
- **Missing**: No `isReadOnly` prop (unlike Spectrum), no built-in guidance on stable vs. changing labels for screen readers (unlike Atlassian), and the color-only default state encoding (without enabling checkedChildren icons) can still fail WCAG 1.4.1 for users who do not read the documentation closely enough to know the icons exist.
