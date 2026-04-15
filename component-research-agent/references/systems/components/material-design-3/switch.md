---
system: Material Design 3
component: Switch
url: https://m3.material.io/components/switch
last_verified: 2026-03-28
---

# Switch

## Approach

Material Design 3 treats the Switch as the premier control for binary settings that take effect immediately — no save button, no confirmation. The philosophical root is Google's mobile-first heritage: a switch visually maps to a physical light switch, creating a universally understood mental model before a word of label text is read. M3 deliberately separates Switch from Checkbox at the semantic level, not just the visual one. Checkbox implies "I am selecting something from a set or agreeing to a statement"; Switch implies "I am activating or deactivating a system state right now." This distinction protects users from the confusion of submitting a form and wondering why nothing happened immediately. The introduction of optional thumb icons (checkmark when on, minus/dash when off) in M3 extends the affordance further — the thumb itself carries meaning even when color rendering is unreliable, directly serving low-vision and color-blind users.

## Key Decisions

1. **Thumb icons are optional but built-in** (HIGH) — M3 includes first-class support for icons inside the switch thumb: a checkmark icon in the "on" state and a minus icon in the "off" state. The `icons` property enables both; `showOnlySelectedIcon` shows only the checkmark when on. The WHY is accessibility through redundant encoding: color alone is insufficient for users with color deficiencies, so the icon inside the thumb provides a second channel that works regardless of rendering environment.

2. **Switches require explicit aria-label — label elements are NOT auto-linked** (HIGH) — Unlike a checkbox where wrapping a `<label>` element creates automatic association, the Material Web `<md-switch>` component always requires an explicit `aria-label` attribute. This is a deliberate architectural choice that forces developers to be intentional about labeling rather than inheriting a label silently. It surfaces at the component level what accessibility audits catch later: unlabeled toggles are the most common switch a11y failure.

3. **Immediate effect is non-negotiable** (HIGH) — The M3 specification explicitly states that switch changes should take effect immediately without requiring a save action. This is not a suggestion — it is the behavioral contract of the component. If an action requires confirmation or deferred submission, M3's guidance is to use a different control. This keeps the Switch's mental model clean: flip it, something happens, flip it back, it undoes.

4. **Single size, no size variants** (MEDIUM) — Unlike Carbon (which offers default and small), M3 Switch ships in one size with a 48dp minimum touch target enforced by spacing. The rationale is that touch-first design requires a minimum reachable area regardless of visual size; compressing the visual to "fit" a dense layout without maintaining the touch target just creates missed taps. Density is handled at the layout level, not the component level.

5. **Label position is left of the switch by default (RTL-adaptive)** (MEDIUM) — The label precedes the control in the DOM and layout, following Material's reading-flow principle: tell users what something does before asking them to interact with it. For RTL languages the layout flips automatically, keeping the same logical order without developer intervention.

## Notable Props

- `icons`: Enables thumb icons (checkmark + minus). Signals that the team considered color-blind users as a first-class audience.
- `showOnlySelectedIcon`: Shows the checkmark only in the "on" state — a quieter visual treatment when the off state doesn't need additional reinforcement.
- `selected`: Boolean state prop. Named "selected" rather than "checked" to linguistically reinforce that this is not a checkbox.
- `required`: Makes the switch required for form submission — rare use case but documents that switches can participate in standard HTML form workflows.
- `value`: The string submitted with a form when the switch is selected (defaults to `"on"`).

## A11y Highlights

- **Keyboard**: Space key toggles the switch state. The switch must be focusable; if applied to a non-focusable element, `tabindex` must be set manually.
- **Screen reader**: The component announces the label plus current state ("Lights, on" / "Lights, off"). Text state indicators visible on-screen are hidden from assistive tech via `aria-hidden` to prevent double-announcement.
- **ARIA**: Uses `role="switch"` with `aria-checked="true|false"`. This correctly maps to the ARIA switch pattern (W3C APG), where "on/off" is the semantic — not "checked/unchecked" as a checkbox would use. The `aria-label` attribute is always required; `<label>` elements do not auto-associate with `<md-switch>`.

## Strengths & Gaps

- **Best at**: Communicating immediate binary state changes with strong visual affordance, built-in icon support for redundant encoding, and automatic RTL layout adaptation.
- **Missing**: No loading/pending state for async operations (when a network call must complete before the UI reflects the toggle), no size variants for dense data-heavy UIs, and no built-in error state — which means invalid switch states must be handled entirely outside the component.
