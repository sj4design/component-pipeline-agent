---
system: Carbon (IBM)
component: Number Input
url: https://carbondesignsystem.com/components/number-input/usage/
last_verified: 2026-03-28
---

# Number Input

## Approach
Carbon's Number Input reflects IBM's enterprise software heritage: the component is designed for dense data-entry interfaces, control panels, and configuration forms where numeric precision matters and the user is typically sitting at a desktop workstation. The component ships stepper buttons as first-class affordances rather than an optional overlay, reflecting Carbon's philosophy that numeric fields in enterprise contexts are almost always bounded and stepped — quantity fields, port numbers, retry counts, timeout values. IBM's design team made an explicit and documented decision about stepper button placement based on device context: on desktop, the buttons sit stacked vertically on the right edge of the input, matching the browser's native `<input type="number">` affordance; on mobile, the layout splits the buttons to opposite ends of the field (minus on the left, plus on the right) to achieve a 40px tap target that meets accessibility tap-target guidelines. The 20×10px original stepper buttons were documented as below industry standard for mobile, and the split-button layout was the deliberate fix. Carbon also maintains two distinct states for out-of-range feedback — warning and error — allowing a nuanced validation experience where amber warnings can precede red errors, appropriate for configuration interfaces where exceeding a soft limit should not feel as alarming as exceeding a hard limit.

## Key Decisions

1. **Mobile stepper split-layout (minus-left / plus-right)** (HIGH) — On desktop, up/down chevrons stack vertically on the right. On mobile, the minus button moves to the left end and the plus button to the right end of the full input width. The WHY is tap-target physics: stacked vertical steppers on a standard 40px Carbon input height produce 20×10px tap targets per button, half the minimum recommended size. Spreading the buttons across the full input width expands each tap target to 40×40px minimum. This was a documented contribution-driven improvement to address real mobile usability failures.

2. **Chevron icons, not ± symbols** (MEDIUM) — Carbon uses up/down chevron (caret) icons rather than plus/minus symbols for the stepper buttons. The WHY is visual consistency — Carbon's other components (Select, Accordion) use chevrons as directional affordances, so using plus/minus here would introduce a visual inconsistency in the icon vocabulary. The tradeoff is that chevrons are less universally recognizable as increment/decrement for first-time users than ±.

3. **Warning state separate from error state** (HIGH) — The component supports both `warn` (amber) and `invalid` (red) states with independent helper text. This two-tier validation model acknowledges that in enterprise configuration UIs, some numeric violations are soft (approaching a limit, unusual but not illegal) and others are hard (exceeding a system maximum). Combining both into a single "error" state would force UX teams to either under-communicate soft warnings or over-alarm users on recoverable states.

4. **Stepper buttons outside the tab order** (MEDIUM) — The +/− stepper buttons are not included in the keyboard tab sequence. Users reach the input with Tab, then use arrow keys to increment. This decision keeps keyboard navigation efficient in dense forms — tabbing through a form would otherwise require two extra key presses per number field. Power users who know arrow-key behavior are served; mouse users have visible click targets.

5. **Direct numeric typing always allowed** (MEDIUM) — The input accepts free-form numeric typing at all times; the stepper buttons are a secondary convenience. This reflects Carbon's enterprise users who often need to enter specific values (e.g., port 8443) faster by typing than by stepping. Validation happens on blur or form submit, not on keystroke.

## Notable Props
- `step`: Increment/decrement value for stepper buttons and arrow keys.
- `min` / `max`: Valid range boundaries; enforce clamping and disable stepper buttons at bounds.
- `invalid` + `invalidText`: Triggers the red error state with helper text below.
- `warn` + `warnText`: Triggers the amber warning state — unique to Carbon among Tier 1 systems.
- `helperText`: Neutral guidance text shown below the input in non-error states.
- `hideSteppers`: Removes stepper buttons (field becomes a text input with numeric constraints).
- `size`: `sm`, `md`, `lg` — affects height and stepper button area.

## A11y Highlights
- **Keyboard**: Arrow Up/Down increment/decrement by `step` when the input has focus. Stepper buttons are excluded from the tab order — keyboard users rely entirely on arrow keys. Home/End behavior follows ARIA spinbutton specification for jumping to min/max.
- **Screen reader**: Uses ARIA `spinbutton` role. `aria-valuenow` reflects the current value, `aria-valuemin` and `aria-valuemax` reflect `min` and `max` props. Invalid and warning states toggle `aria-invalid="true"` and provide accessible descriptions via the error/warning text elements.
- **ARIA**: `role="spinbutton"` on the input element. `aria-invalid` set on error state. Helper text, warning text, and error text are associated via `aria-describedby`. The carbon implementation replicates standard HTML `<input type="number">` semantics with enhanced styling and validation states.

## Strengths & Gaps
- **Best at**: Two-tier validation (warn + error) for enterprise configuration forms, and the mobile split-stepper layout that solves tap-target sizing without hiding controls.
- **Missing**: No built-in locale-aware number formatting — displaying `1,234.50` vs `1.234,50` based on user locale requires external formatting logic.
