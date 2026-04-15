---
system: Spectrum (Adobe)
component: Switch
url: https://react-spectrum.adobe.com/react-spectrum/Switch.html
last_verified: 2026-03-28
---

# Switch

## Approach

Adobe Spectrum's Switch is built around a sharp philosophical boundary: a switch communicates *activation*, while a checkbox communicates *selection*. This is not just a visual distinction — it is a semantic contract that Spectrum enforces at the component level by deliberately omitting error states from the Switch. Error states belong to form inputs and checkboxes because those controls participate in validation cycles; a switch, by contrast, is an immediate toggle whose outcome is visible right away. If something goes wrong after a switch is flipped, that feedback belongs in the adjacent UI, not on the control itself. Spectrum's audience — Creative Cloud applications, enterprise analytics, and data tools — constantly surfaces settings panels where users need to activate and deactivate features without triggering a full form save. The `isEmphasized` prop exists precisely because in those dense panels, certain toggles matter more than others, and Spectrum wanted a native way to signal hierarchy without requiring a custom override. The RTL-first layout system means that Spectrum's Switch works correctly across Adobe's global products without per-locale developer effort.

## Key Decisions

1. **No error state by design** (HIGH) — Spectrum is the only Tier 1 system that explicitly documents the absence of an error state on Switch. The WHY: error states imply that a value can be invalid, which in turn implies that validation happens — which only makes sense for form inputs where a value is "submitted." A switch controls an immediate action, not a submitted value, so treating it as something that can be "wrong" misrepresents its semantic role. This forces product teams to put error feedback (e.g., "we couldn't save that setting") into a toast or inline message rather than on the toggle itself.

2. **isEmphasized prop for visual hierarchy** (MEDIUM) — Spectrum provides a filled/colored track in the on state via `isEmphasized` to distinguish high-priority toggles from ambient settings. The WHY: in Adobe's tool UIs (Lightroom, Analytics, Experience Platform) a settings panel might contain ten or more toggles. Visual flattening — every toggle looking identical — makes it impossible to read priority at a glance. The emphasized variant uses the accent color to pull that toggle forward visually without changing its behavior.

3. **isReadOnly separates "view" from "interact"** (MEDIUM) — The `isReadOnly` prop allows a switch to be visible but not changeable. The WHY is role-based interfaces: a read-only user in an enterprise tool sees the current state of a feature (enabled/disabled) without being able to change it. This is meaningfully different from `isDisabled` — a disabled switch implies the action is unavailable; a read-only switch implies it is visible but controlled elsewhere.

4. **Switch vs Checkbox distinction is explicit in documentation** (HIGH) — Spectrum explicitly documents the guidance: "Switches are best used for communicating activation (e.g. on/off states), while checkboxes are best used for communicating selection." This explicit policy matters because it gives teams a documented rationale to cite when product managers ask for checkboxes-as-toggles.

5. **RTL layout is automatic** (LOW) — The component flips its layout for right-to-left locales automatically. The WHY is Adobe's global product footprint — tools like Experience Platform are deployed across Arabic-, Hebrew-, and Farsi-speaking markets. Automating this at the component level removes an entire class of locale-specific bugs.

## Notable Props

- `isEmphasized`: Visual hierarchy for high-priority toggles — solves the "settings panel of 10 identical toggles" problem.
- `isReadOnly`: Non-editable visible state — critical distinction from disabled in RBAC-heavy enterprise tools.
- `defaultSelected` / `isSelected`: Supports both uncontrolled and controlled patterns, accommodating different state management architectures.
- `name` / `value`: HTML form integration — allows the switch to participate in standard form submissions despite its immediate-action nature.
- `onChange`: Single callback; the simplicity reflects the binary nature of the control.

## A11y Highlights

- **Keyboard**: Space key toggles the switch. The component inherits React Aria's keyboard management, which follows the W3C ARIA Authoring Practices Guide for the switch pattern.
- **Screen reader**: Announces the component label and state ("On" / "Off"). Spectrum uses `role="switch"` — not `role="checkbox"` — so screen readers that support the switch role announce "on/off" rather than "checked/unchecked," aligning semantic language with the user's mental model.
- **ARIA**: `role="switch"` with `aria-checked="true|false"`. When no visible label is provided, `aria-label` or `aria-labelledby` is required. Spectrum's React Aria layer manages the association automatically when a label child is provided.

## Strengths & Gaps

- **Best at**: Clean semantic separation of activation vs selection, enterprise-grade role-based read-only state, and RTL-automatic layout — making it one of the safest Switch implementations for global, multi-role products.
- **Missing**: No loading/pending state for async toggles, no size variants beyond the single default size, and no thumb icons (checkmark/X) — meaning Spectrum relies entirely on track color and thumb position for state communication without redundant encoding.
