---
system: Polaris (Shopify)
component: N/A — No dedicated Switch component
url: https://polaris.shopify.com/components/selection-and-input/setting-toggle
last_verified: 2026-03-28
---

# Switch / Toggle (Absence Documentation)

## Approach

Polaris does not have a dedicated Switch or Toggle UI control — no sliding thumb, no track, no binary toggle widget of the kind found in Material Design 3, Carbon, Spectrum, Atlassian, or Ant Design. This is a deliberate product philosophy decision, not an oversight. Shopify's merchant base is predominantly non-technical: small business owners managing their stores, not enterprise IT administrators toggling feature flags. Polaris's core UX principle for settings is that every configurable option must be accompanied by enough context for the merchant to make an informed decision. A minimal sliding toggle satisfies the developer's desire for a compact control, but it provides almost zero context — the merchant sees "on" or "off" without understanding what that means for their business. Polaris instead routes through two patterns: the **Checkbox** for simple binary selections, and the now-deprecated **SettingToggle** (superseded by composition with layout primitives) for contextual on/off settings. The SettingToggle pattern enforces a card structure with a title, a description, a status badge ("On"/"Off"), and a labeled button ("Turn on"/"Turn off") — communicating not just state but consequence.

## Key Decisions

1. **SettingToggle over a switch widget: context is mandatory** (HIGH) — The SettingToggle component requires a title, supporting description, and explicit button labels. The WHY is merchant cognition: in user research Shopify found that toggle switches in merchant-facing settings often led to accidental activation of high-consequence features (payment processors, shipping rules, tax settings) because the control's minimal footprint gave no indication of what "on" meant. Forcing a title-plus-description structure prevents thoughtless flipping of consequential settings.

2. **The button-based interaction model uses role="switch" internally** (HIGH) — Even without a visual sliding toggle, the modern SettingToggle implementation uses a `<button>` with `role="switch"` and `aria-checked` toggling between "true" and "false". The WHY is ARIA correctness: the semantic contract of "this is a binary state control, not a form submission button" must still be communicated to assistive technology, even when the visual implementation looks like a card with a button rather than a thumb-on-track widget.

3. **Checkbox is the recommended alternative for simple settings** (MEDIUM) — For settings that are truly simple ("enable email notifications"), Polaris recommends Checkbox. The WHY is that merchants are familiar with checkboxes from paper forms and web forms; they carry an understood metaphor of "tick this box to include this option." When a setting depends on other settings, uses progressive disclosure, or has more than two states, Polaris directs teams to Checkbox or Radio Button rather than any toggle pattern.

4. **SettingToggle was deprecated in favor of composition** (MEDIUM) — The original `<SettingToggle>` component has been deprecated. The current Polaris recommendation is to build setting cards by composing layout primitives (Card, Text, Badge, Button) rather than using a dedicated component. The WHY is flexibility: the rigid component imposed a layout that didn't accommodate the range of setting complexities across Shopify's Admin surface. Composition gives teams the same UX pattern with room to adapt.

5. **No visual sliding toggle protects against misuse** (MEDIUM) — By not providing a sliding toggle widget, Polaris removes the temptation to use it for non-immediate settings, ambiguous states, or settings that require explanation. The absence enforces the pattern: if you need a toggle, you build the SettingToggle card pattern, which by its structure forces you to provide context. This is system design as guardrail rather than pure component provision.

## Notable Props

The deprecated `SettingToggle` component had:
- `action`: The button action (label + onAction handler) — enforces a labeled interaction rather than an anonymous toggle.
- `enabled`: Boolean state that drives the badge and button label.

Modern composition approach uses:
- `<Badge tone="success">On</Badge>` / `<Badge>Off</Badge>` for state communication.
- A `<Button>` with `role="switch"` and `ariaChecked` for semantic correctness.

## A11y Highlights

- **Keyboard**: The button-based implementation is keyboard accessible via Tab and Space/Enter — standard button interaction patterns that all screen reader users know.
- **Screen reader**: `role="switch"` with `aria-checked="true|false"` announces the setting name and its current enabled state. The explicit button label ("Turn on" / "Turn off") provides additional context in announcements.
- **ARIA**: `role="switch"` on the button element, toggling `aria-checked`. The card's title and description are available to screen readers via normal heading and text semantics, providing full context that a bare toggle widget never could.

## Strengths & Gaps

- **Best at**: Protecting merchants from consequence-blind setting changes by requiring contextual framing around every on/off control — making it the safest approach for high-stakes e-commerce settings.
- **Missing**: No visual toggle component means Polaris cannot satisfy UI patterns where a compact switch is the right answer (e.g., dense preference lists, mobile settings screens with many options) without breaking out of the Polaris system entirely.
