---
component: switch
compiled: 2026-03-28
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Switch — All Systems Digest

## Material Design 3
**Approach**: Binary immediate-effect settings only (documented policy — not a suggestion). Optional thumb icons (checkmark ON, minus OFF) for color-independent redundant encoding. Explicit `aria-label` always required — label elements do NOT auto-associate. Single size, 48dp touch target.
**Key decisions**:
- Thumb icons built-in (`icons` prop); checkmark+minus provides second encoding channel for color-deficient users
- aria-label always required on `<md-switch>`; forces intentional labeling, surfaces unlabeled-toggle a11y failures at dev time
- Single size; density handled at layout level — compressing visual below touch target just creates missed taps
**Notable API**: `icons`; `showOnlySelectedIcon`; `selected` (named "selected" not "checked" to reinforce non-checkbox semantics); `required`; `value`
**A11y**: role="switch"+aria-checked="true|false"; on/off state announced (not checked/unchecked); thumb state text aria-hidden to prevent double-announcement; RTL auto-handled.
**Best at**: Visual affordance with redundant icon encoding + automatic RTL. **Missing**: No loading/pending state, no size variants, no built-in error state.

## Spectrum (Adobe)
**Approach**: Explicit policy: no error state (switches control immediate actions, not submitted values — errors belong in toast/inline, not on control). `isEmphasized` for visual hierarchy in dense settings panels. `isReadOnly` distinct from `isDisabled` for RBAC-heavy tools. RTL automatic.
**Key decisions**:
- No error state by design; error implies validation/submission cycle — switches have immediate effect, not submitted values
- `isEmphasized` accent color for high-priority toggles; solves "10 identical toggles in settings panel" visual flattening problem
- `isReadOnly` keeps control visible and focusable; disabled removes from interaction — critical for RBAC "view but not change" scenarios
**Notable API**: `isEmphasized`; `isReadOnly`; `defaultSelected`/`isSelected` (uncontrolled + controlled); `name`/`value` (HTML form participation)
**A11y**: role="switch" (on/off language vs. checked/unchecked); React Aria manages ARIA wiring; aria-label/aria-labelledby required when no visible label; RTL automatic.
**Best at**: Semantic separation (activation vs. selection), enterprise RBAC readOnly state, RTL support. **Missing**: No loading state, no size variants, no thumb icons.

## Carbon (IBM)
**Approach**: Called "Toggle." Default size (full label + state text required) vs. Small (labels optional, mandatory checkmark in "on" thumb for WCAG 1.4.1). Custom state text (`labelA`/`labelB`) for compliance contexts ("Active"/"Inactive" instead of "On"/"Off"). Toggle never used for form values.
**Key decisions**:
- Default requires label+state text; Small makes them optional but adds mandatory checkmark tick in "on" thumb (WCAG color independence, component-level)
- Custom state text (`labelA`/`labelB`); HIPAA-covered features may require "Active"/"Inactive" to match compliance documentation
- Explicit prohibition on Toggle for form values; mixing with checkboxes creates user confusion about which controls need saving
**Notable API**: `size` (default|sm); `labelText` (required for default); `labelA`/`labelB` (custom state text); `toggled`; `hideLabel`
**A11y**: role="switch"+aria-checked; custom state text read as part of announcement ("Notifications, Enabled" not "Notifications, On"); known a11y issue (GitHub #17525) tracked; `type="checkbox"` on input for broad browser support.
**Best at**: Structured when-to-use-vs-checkbox guidance, two-size density system, built-in WCAG-compliant state text for compliance contexts. **Missing**: No loading/pending state; no icon-in-thumb beyond small variant's fixed checkmark.

## Polaris (Shopify)
**Approach**: No visual switch component exists — deliberate. Merchants need context to avoid consequence-blind setting changes. Uses SettingToggle (deprecated, replace with Card+Badge+Button composition) for contextual on/off, or Checkbox for simple binary. SettingToggle enforces title+description+button structure.
**Key decisions**:
- No slide toggle; merchant research shows minimal toggle = accidental activation of payment/shipping/tax settings without understanding consequences
- SettingToggle card enforces title+description+labeled button; structure physically prevents context-free flipping
- SettingToggle deprecated; replaced by composing Card+Badge+Button; rigid component couldn't accommodate full range of setting complexities
**Notable API**: Deprecated SettingToggle: `action` (labeled button enforces explicit interaction); `enabled`; Modern: `<Button role="switch" ariaChecked>` + `<Badge>` for state
**A11y**: role="switch"+aria-checked on button implementation; explicit "Turn on"/"Turn off" button labels provide additional SR context; card title/description semantically available.
**Best at**: Protecting merchants from consequence-blind setting changes by requiring contextual framing. **Missing**: No compact switch widget — cannot satisfy dense preference lists without breaking out of Polaris entirely.

## Atlassian
**Approach**: Label must NOT change based on state (explicit documented rule — unique among systems). `isChecked` requires `onChange` handler (controlled-only). Two sizes (regular/large) for density vs. emphasis. Disabled state requires explanation in surrounding UI. `role="switch"` from the start (not a styled checkbox).
**Key decisions**:
- Stable label rule: changing label on toggle breaks SR navigation (user navigates by label, label shifts after flipping, can't re-find control)
- Controlled-only pattern when `isChecked` provided; prevents sync bugs between server state and UI in Jira/Confluence settings
- Disabled state documentation requires surrounding explanation; "why is this disabled?" is a usability and a11y requirement
**Notable API**: `isChecked` (requires onChange); `label`; `size` (regular|large); `isDisabled`; `id` (for external label association)
**A11y**: role="switch" from the start (not bolted on); aria-checked="true|false"; stable label explicitly documented to preserve SR navigation; focus ring meets contrast requirements.
**Best at**: Accessibility rigor — stable-label rule, controlled state enforcement, disabled-state documentation standards. **Missing**: No loading state, no thumb icon support, no deferred-action guidance.

## Ant Design
**Approach**: Most feature-complete — `loading` prop (unique among all systems) shows spinner+locks control during API calls. `checkedChildren`/`unCheckedChildren` for icon/text in thumb. Three sizes (small/default/large). Both controlled and uncontrolled. `onClick` separate from `onChange` for pre-change interception.
**Key decisions**:
- `loading` prop unique to Ant Design; prevents race conditions in enterprise apps where toggle → API call → confirmed state change takes time
- `checkedChildren`/`unCheckedChildren` for sun/moon icons or ON/OFF text in thumb; space-efficient state communication in dense dashboards
- `onClick` separate from `onChange`; intercept click before state changes for confirmation dialogs without blocking normal toggle
**Notable API**: `loading`; `checkedChildren`/`unCheckedChildren` (ReactNode); `size` (small|default); `checked`/`defaultChecked`; `onClick`
**A11y**: role="switch"+aria-checked; `loading` state removes from interaction while maintaining visibility; thumb content alone may be insufficient — external label recommended for SR; color+position dual encoding by default.
**Best at**: Most complete API — loading state, thumb content, three sizes, controlled+uncontrolled, click interception. **Missing**: No isReadOnly, no stable-label documentation, color-only default without icons can still fail WCAG 1.4.1.
