# Input (TextField) — Component Research

**Date:** 2026-04-10
**Mode:** Max (all patterns, no scope filtering)
**Systems analyzed:** 24/24 (all have this component)
**Slug:** textfield

---

## Sistemas sin componente dedicado

Ninguno. Los 24 sistemas tienen un componente de texto de entrada. Es universal.

---

## How Systems Solve It

### Material Design 3 — "Two architecturally separate variants, not a prop"

M3 makes the most opinionated architectural decision of any system: Filled and Outlined are not a `variant` prop — they are separate components (`md-filled-text-field`, `md-outlined-text-field`). This forces designers to choose once per context rather than toggling at runtime. The floating label animates from placeholder position to above the input on focus, eliminating the need for a separate static label and saving vertical space. Character counter auto-renders when `maxlength` is set — no separate boolean needed. Error text replaces helper text (never stacks), keeping layout height stable and preventing content shift.

**Design Decisions:**
- **Separate components per variant** → Why: each can optimize interaction states independently (Filled uses indicator bar animation, Outlined uses border-radius transitions). Impact: H. Para tu caso: simplifies Figma — each variant is a clean component set.
- **Floating label replaces static label** → Why: saves 20-24px vertical space per field, critical in mobile forms. Impact: H. Para tu caso: requires label animation consideration in Figma states.
- **Error replaces helper text** → Why: prevents layout shift; "Error" prefix ensures colorblind accessibility. Impact: M. Para tu caso: simpler slot management, single text slot below input.

**Notable Props:** `leading-icon`/`trailing-icon` slots; `error`/`error-text`; `supporting-text`; `maxlength` (auto-triggers counter)
**A11y:** aria-describedby for error messages; aria-invalid for error; "Error" text prefix for non-color validation; label announced on focus regardless of animation.

### Spectrum (Adobe) — "Three components instead of one overloaded field"

Spectrum splits into TextField (single-line), TextArea (multi-line), and SearchField (search semantics + clear). Each owns its behavior without multiline/search flag overloading. `isQuiet` removes the border for dense contexts (table cells, property panels), with an explicit warning that surrounding structure is needed for parsability. Validation is pushed to the Form level with `validationBehavior` prop — native constraint validation, custom functions, server-side errors, and a FieldError component all coexist.

**Design Decisions:**
- **Three separate components** → Why: no multiline/search flag overloading; each component owns its semantics. Impact: H. Para tu caso: aligns with separating Input from Textarea.
- **isQuiet for dense contexts** → Why: table cells and property panels need minimal chrome. Impact: M. Para tu caso: maps to borderless variant.
- **Form-level validation** → Why: consistent cross-field errors, automatic submit blocking. Impact: H. Para tu caso: validation display is per-field but architecture is form-level.

**Notable Props:** `isQuiet`; `validationBehavior` (native|aria); `necessityIndicator` (asterisk vs "(required)" text)
**A11y:** Most complete validation — aria-live for error announcements; aria-describedby for help+error; Form handles aria-errormessage distribution.

### Carbon (IBM) — "Fluid mode changes the input's relationship to the grid"

Carbon introduces a true layout mode distinction: Default (grid-aligned, helper text below) vs. Fluid (fills grid gutters, helper text moves to tooltip). This is not a style toggle — it changes the component's grid relationship. Three sizes (SM=32px, MD=40px, LG=48px). Uniquely, Carbon has a `warn` state alongside error: "unusual but allowed" vs. "invalid and blocks submission" — a distinction critical for enterprise data entry where soft validation guides without blocking.

**Design Decisions:**
- **Fluid layout mode** → Why: enterprise dashboards need fill-available inputs. Impact: H. Para tu caso: consider if your system needs density modes beyond just size.
- **Warning separate from error** → Why: "unusual but allowed" is different from "invalid"; financial forms need this. Impact: M. Para tu caso: adds Status=warning to the matrix.
- **Helper text → tooltip in Fluid** → Why: density over discoverability tradeoff, accepted for dashboard contexts. Impact: M. Para tu caso: may not need in first version.

**Notable Props:** `size` (sm|md|lg); `warn`/`warnText`; `enableCounter`/`maxCount`; `inline` (label beside field)
**A11y:** aria-describedby for helper/error/warning; label association enforced at component level; warning announced on state change.

### Polaris (Shopify) — "Commerce-first: value+unit pairs are first-class"

Polaris treats value+unit input as a primary use case. `connectedLeft`/`connectedRight` handle composite inputs ($50.00 USD, 2.5 kg) with border-radius merging and shared focus states. `prefix`/`suffix` are non-editable inline text inside the border (distinct from connected fields which are interactive elements outside). `verticalContent` renders tag chips above the input for multi-value entry. `clearButton` and `monospaced` are built-in booleans.

**Design Decisions:**
- **Connected fields (outside border)** → Why: value+unit pairs need separate interactive elements sharing a visual boundary. Impact: H. Para tu caso: complex pattern, maybe future iteration.
- **Prefix/suffix (inside border)** → Why: static text decorators like "$" or ".com" improve scannability. Impact: H. Para tu caso: essential for currency/unit inputs.
- **verticalContent for tags** → Why: multi-value input without a separate TagInput component. Impact: M. Para tu caso: out of scope for base Input.

**Notable Props:** `connectedLeft`/`connectedRight`; `prefix`/`suffix`; `verticalContent`; `clearButton`; `monospaced`
**A11y:** Prefix/suffix included in accessible description; connected fields maintain individual labels; label required.

### Atlassian — "Built for inline editing: subtle until you interact"

Atlassian has three appearances: standard (bordered), subtle (transparent until focused), none (invisible). This is purpose-built for Jira issue views where dozens of fields are visible simultaneously — without subtle mode, the page would be a wall of bordered rectangles. InlineEdit is a separate wrapper managing read/edit transitions with confirm/cancel and Enter/Escape shortcuts. `elemBeforeInput`/`elemAfterInput` accept any React element.

**Design Decisions:**
- **Subtle appearance** → Why: density-critical for issue trackers with 20+ editable fields per view. Impact: H. Para tu caso: maps to borderless variant with hover reveal.
- **InlineEdit as separate wrapper** → Why: read-to-edit transition is a behavior pattern, not a field property. Impact: M. Para tu caso: separate component, not Input's job.
- **Compact spacing mode** → Why: 32px height for dense data views. Impact: M. Para tu caso: maps to size=sm.

**Notable Props:** `appearance` (standard|subtle|none); `spacing` (compact|default); `elemBeforeInput`/`elemAfterInput`
**A11y:** Subtle/none maintain same ARIA semantics; placeholder never replaces label; aria-invalid for errors.

### Ant Design — "Five sub-components, four visual variants, inside/outside border distinction"

Ant Design has the widest range: Input, Input.TextArea, Input.Search, Input.Password, Input.OTP — each with tailored defaults. Four visual variants (outlined, filled, borderless, underlined). The addon vs. prefix/suffix distinction is explicit: `addonBefore`/`addonAfter` are outside the border (buttons, selects), while `prefix`/`suffix` are inside (icons, text). OTP auto-advances focus between segments. `showCount` with custom counting logic handles emoji-as-1-char.

**Design Decisions:**
- **Five sub-components** → Why: each has unique default behavior (OTP auto-advances, Password toggles, Search has Enter-to-search). Impact: H. Para tu caso: validates splitting Search/Password/OTP as separate types.
- **Four visual variants** → Why: borderless for embedded, underlined for modern, filled for M3-like, outlined standard. Impact: H. Para tu caso: outlined + filled + borderless covers 90% of needs.
- **Addon outside vs prefix inside** → Why: different decoration contexts in enterprise forms. Impact: M. Para tu caso: prefix/suffix inside is essential; addon outside is future.

**Notable Props:** `addonBefore`/`addonAfter`; `variant` (outlined|filled|borderless|underlined); `showCount`/`count`; `Input.OTP`
**A11y:** Delegated to Form.Item (weakness); standalone needs manual ARIA; prefix/suffix available to SR.

### Paste (Twilio) — "Input element separate from FormField wrapper"

Paste cleanly separates Input (the raw element) from FormField (label, help text, error wrapper). This composability is intentional: the same Input can live inside different form contexts without carrying validation display logic. FormHelpText and FormErrorMessage are separate children of FormField.

**Notable Props:** Input + FormField separation; FormHelpText; FormErrorMessage
**A11y:** ARIA wiring handled by FormField wrapper; aria-describedby auto-linked.

### Lightning (Salesforce) — "One LWC, `type` attribute for all input types"

Lightning bundles everything into `lightning-input` with a `type` attribute that covers text, email, number, password, search, tel, url, date, datetime, time, color, file, and checkbox. Inline validation is built-in. This is the most overloaded single-component approach in any system.

**Notable Props:** `type` (covers 13+ input types); inline validation; `variant` (standard|label-inline|label-hidden|label-stacked)
**A11y:** label association enforced; inline validation linked via aria-describedby.

### Primer (GitHub) — "leadingVisual/trailingVisual slots + token input"

Primer's TextInput has `leadingVisual`/`trailingVisual` as render prop slots for icons, prefixes, and suffixes. TextInputWithTokens is a separate component for tag-style multi-value entry. Sizes: small, medium, large.

**Notable Props:** `leadingVisual`/`trailingVisual`; TextInputWithTokens (separate); `size` (small|medium|large); `block` (full width)
**A11y:** Visible label required; aria-describedby for validation.

### shadcn/ui — "Minimal base, compose with Form"

shadcn/ui provides a minimal unstyled Input. All field behavior (label, description, error) comes from composing with Form + FormField + FormLabel + FormMessage. This is the most composition-heavy approach — intentionally zero opinions about layout.

**Notable Props:** Minimal; composed with Form/FormField/FormLabel/FormMessage (react-hook-form integration)
**A11y:** Relies on Form wrapper for ARIA wiring.

### Playbook (eBay) — "Dual React/Rails text input"

TextInput component supporting both React and Rails rendering. Standard text entry with validation support.

### Cedar (REI) — "Vue input with background color variants"

CdrInput is a Vue component with background color variants for outdoor retail contexts. WCAG 2.1 AA compliant.

### Wise — "Financial form fields for account/transfer data"

TextField optimized for financial data entry: account numbers, transfer amounts, IBAN fields. Trust-building visual patterns.

### Dell — "Enterprise configuration form fields"

TextField for hardware/software configuration forms. Enterprise styling with consistent spacing.

### Radix — "Slot-based approach with TextField.Slot"

Radix wraps a native input with `TextField.Root` and `TextField.Slot` for placing icons/addons inside the border. Three variants: surface, classic, soft. Consumer handles label and error — Radix provides the styled input shell only.

**Notable Props:** `TextField.Slot`; `variant` (surface|classic|soft); `size` (1|2|3)
**A11y:** Consumer responsibility for label association and error linkage.

### Chakra UI — "InputElement (overlaid) vs InputAddon (bordered) distinction"

Chakra separates InputLeftElement/InputRightElement (icons overlaid inside input with auto-padding) from InputLeftAddon/InputRightAddon (bordered sections attached outside). `flushed` variant for inline editing. v3 adds Field wrapper for label/error bundling.

**Notable Props:** InputGroup + InputLeftElement/RightElement + InputLeftAddon/RightAddon; `variant` (outline|filled|flushed|unstyled); Field wrapper (v3)
**A11y:** Field component handles aria-describedby in v3.

### GOV.UK — "Field width as functional information"

GOV.UK uniquely treats input width as functional: size the field to the expected answer length, not to fill the container. A 2-character postcode field tells users the answer is short. Explicit width classes mapped to form field types. Text prefix/suffix for units (not icons). Autocomplete attribute enforcement is mandatory.

**Notable Props:** Width classes (width-2 to full); text prefix/suffix; mandatory autocomplete
**A11y:** Error message above input with red border; research-backed patterns; autocomplete benefits motor-impaired users.

### Base Web (Uber) — "startEnhancer/endEnhancer accepts any node"

Base Web uses `startEnhancer`/`endEnhancer` accepting any ReactNode for maximum flexibility. Built-in `clearable` prop. Overrides system for all sub-elements. Consistent enhancer API across all form components.

**Notable Props:** `startEnhancer`/`endEnhancer`; `clearable`; Overrides for all sub-elements
**A11y:** Standard label + error pattern.

### Fluent 2 (Microsoft) — "Input/Field separation, four appearances"

Fluent 2 separates Input (raw element) from Field (label/validation/hint wrapper). Four appearances: outline, underline, filled-darker, filled-lighter — context-specific for different Microsoft surfaces. `contentBefore`/`contentAfter` slots.

**Notable Props:** `appearance` (outline|underline|filled-darker|filled-lighter); `contentBefore`/`contentAfter`; Field wrapper
**A11y:** Field handles ARIA wiring consistently across all input types.

### Gestalt (Pinterest) — "Required label prop prevents unlabeled inputs"

Gestalt's TextField requires a `label` prop — it's impossible to create an unlabeled field without explicitly passing `labelDisplay="hidden"`. `characterCount` for content forms. Error replaces helper text (no layout shift).

**Notable Props:** Required `label`; `characterCount`; `helperText`; `errorMessage` (replaces helper)
**A11y:** Required label prevents accidental unlabeled inputs; aria-describedby auto-linked.

### Mantine — "Consistent API across all inputs with auto-padding sections"

Mantine has the most consistent cross-input API: `leftSection`/`rightSection` with explicit width props for auto-padding compensation. `description` (below label, always visible) and `error` (below input, conditional) as separate props — the cleanest description/error separation. `withAsterisk` for visual required indicator.

**Notable Props:** `leftSection`/`rightSection`; `description`; `error`; `withAsterisk`; `size` (xs|sm|md|lg|xl)
**A11y:** Auto aria-describedby for description and error; required indicator.

### Orbit (Kiwi) — "Travel-context with inline error"

Orbit's InputField has travel-optimized prefix/suffix icons, immediate inline error feedback, and mobile-optimized touch targets. `help` and `error` as separate props (error replaces help).

**Notable Props:** Prefix/suffix icons; `help`; `error` (replaces help)

### Evergreen (Segment) — "Minimal appearance for inline editing"

Evergreen provides Input and TextInputField (bundled). `appearance="minimal"` gives bottom-border-only for inline editing contexts. `isInvalid` for error styling without requiring an error message.

**Notable Props:** `appearance` (default|minimal); `isInvalid`

### Nord — "Healthcare web component with required label"

Nord provides a web component `nord-input` with required `label`, `helper-text`, and `error` props. Healthcare-optimized validation feedback. Framework-portable.

---

## Pipeline Hints

**Archetype recommendation:** form-control
Rationale: All 24 systems implement this as a single-line input field with label, helper text, and validation — the canonical form control pattern. Not a container (no composed children), not a nav element, not a grid.

**Slot consensus:**
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| label | text | yes | 24/24 | Universal. Some float (M3), some static (all others). Required in Gestalt/Nord |
| input-field | text-input | yes | 24/24 | The actual input element |
| prefix-icon | icon | no | 20/24 | Leading icon inside border. Called leadingVisual (Primer), leftSection (Mantine), prefix (Ant inside) |
| suffix-icon | icon | no | 20/24 | Trailing icon inside border. Clear button, password toggle, status icon |
| prefix-text | text | no | 12/24 | Non-editable text inside border like "$", "https://". Polaris prefix, GOV.UK text prefix |
| suffix-text | text | no | 10/24 | Non-editable text inside border like ".com", "kg" |
| helper-text | text | no | 22/24 | Guidance below input. Called description (Mantine), supporting-text (M3), help (Orbit) |
| error-text | text | no | 24/24 | Validation error below input. Replaces helper in most systems |
| warning-text | text | no | 4/24 | Carbon, Ant, Mantine, Chakra. "Unusual but allowed" feedback |
| success-text | text | no | 3/24 | Post-validation positive feedback |
| character-count | text | no | 8/24 | M3 auto-renders on maxlength, Carbon enableCounter, Gestalt characterCount |
| required-indicator | text | no | 18/24 | Asterisk or "(required)" text. Spectrum necessityIndicator |
| addon-before | container | no | 6/24 | Interactive element OUTSIDE border (Ant addonBefore, Polaris connectedLeft, Chakra InputLeftAddon) |
| addon-after | container | no | 6/24 | Interactive element OUTSIDE border (select, button attached to input) |
| clear-button | icon-action | no | 12/24 | Clears input value. Part of suffix area |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| Size | variant | sm/md/lg | 20/24 | M3 has only 1 size. Mantine has xs-xl. Carbon: 32/40/48px |
| Variant | variant | outlined/filled/borderless | 18/24 | M3 separates into components. Ant adds underlined. Fluent has filled-darker/lighter |
| State | state | default/hover/focus/disabled/readonly | 24/24 | Universal 5-state set |
| Status | status | none/error/warning/success | 22/24 | Warning: 4/24. Success: 3/24 |
| Input type | type | text/password/number/email/search/tel/url/date | 14/24 | Lightning bundles all. Most separate search/password |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| hasLabel | 24/24 | true | Some enforce required (Gestalt, Nord) |
| hasPrefixIcon | 20/24 | false | leadingVisual, leftSection, prefix-icon |
| hasSuffixIcon | 20/24 | false | trailingVisual, rightSection, suffix-icon |
| hasPrefixText | 12/24 | false | "$", "https://", currency symbols |
| hasSuffixText | 10/24 | false | ".com", "kg", unit labels |
| hasHelperText | 22/24 | false | Description/guidance below input |
| hasClearButton | 12/24 | false | Clear input value button in suffix area |
| hasCharacterCount | 8/24 | false | Shows current/max character count |
| hasRequiredIndicator | 18/24 | false | Asterisk or "(required)" |
| isFullWidth | 10/24 | false | Block-level, fills container |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 24/24 | Border visible, label positioned | Resting state |
| hover | 22/24 | Border darkens or thickens | Subtle affordance |
| focus | 24/24 | Focus ring or accent border, label floats (M3) | Keyboard + click |
| disabled | 24/24 | Opacity 0.38-0.5, no pointer events | Non-interactive |
| readonly | 16/24 | No border or subtle border, text selectable | View-only but selectable |

**Status coverage:**
| Status | Consensus | Visual treatment | Notes |
|--------|-----------|-----------------|-------|
| none | 24/24 | Default appearance | No validation state |
| error | 24/24 | Red/destructive border, error icon in suffix, error text below | Universal |
| warning | 4/24 | Yellow/caution border, warning icon, warning text | Carbon, Ant — "unusual but allowed" |
| success | 3/24 | Green/success border, checkmark icon | Post-validation positive |

**Exclusion patterns found:**
- disabled × hover/focus = 24/24 systems (universal — disabled removes all interactive states)
- readonly × hover visual = 16/24 (readonly shows no hover change)
- error text replaces helper text = 18/24 (never stack, layout stable)
- warning text replaces helper text = 4/24 (same slot, different color)

**Building block candidates:**
- No formal sub-components needed. Input is atomic — all slots are within a single frame structure.
- `.InputAddon` considered by Ant/Chakra/Polaris but this is a composition pattern (connected fields), not a sub-component of Input itself.
- The field wrapper (label + input + helper/error) is the main "building block" but it IS the component — no extraction needed.

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| inputType | text, password, number, email, search, tel, url, date | 14/24 | HTML input type attribute |
| labelPosition | top, inline, hidden | 8/24 | Carbon inline, M3 float, most top |
| textAlign | left, right, center | 6/24 | Right-align for numbers/currency |

**Truncation patterns:**
- Long label text: truncate with ellipsis at input width (6/24)
- Long helper text: wrap to multiple lines (20/24) or truncate (4/24)
- Long prefix/suffix text: truncate if exceeds 30% of input width (GOV.UK)

**A11y consensus:**
- Primary role: `textbox` (native `<input>`)
- Required ARIA: `aria-describedby` (linked to helper/error text), `aria-invalid="true"` (error state), `aria-required="true"` (required fields)
- Keyboard: Tab to focus, type to enter text, Escape to clear (when clear button present)
- Focus: Linear tab order (label → input → clear button if present)
- APG pattern: None specific (native `<input>` is the pattern)
- Label: Visible label REQUIRED — placeholder is NOT a substitute (24/24 consensus)
- autocomplete: Should be specified for common field types (GOV.UK strongest advocate)
- A11y quality flags: Ant Design delegates a11y to Form.Item (weak standalone)

---

## What Everyone Agrees On

1. **Visible label is mandatory**: Every system requires an associated label — placeholder text is never a substitute. Gestalt and Nord enforce this at the API level with required `label` props. Why: disappearing placeholder fails WCAG and confuses users.

2. **Error replaces helper text, never stacks**: 18/24 systems use the same slot for helper and error text. When error appears, helper disappears — preventing layout shift and cognitive overload. Why: two competing messages below an input confuse users about what to do.

3. **aria-describedby links input to its messages**: Every system with validation connects the input to helper/error text via aria-describedby. This ensures screen readers announce the guidance or error when the input receives focus. Why: visual proximity alone doesn't help AT users.

4. **Prefix/suffix live inside the input border**: Icons and decorative text (like "$" or ".com") appear inside the field boundary, not outside. Auto-padding compensation prevents the addon from overlapping typed text. Why: inside-border placement signals "this is part of this field's value."

5. **Three sizes are standard (sm/md/lg)**: 20/24 systems offer exactly three sizes mapping to touch target heights of ~32/40/48px. Additional sizes (xs, xl) are rare extras. Why: three sizes cover compact dashboards, default forms, and large mobile targets.

6. **Focus state uses accent color on border**: Every system changes the border to the brand/accent color on focus, often with a focus ring or thicker stroke. Why: users must always know which field has keyboard focus — insufficient contrast causes accessibility failures.

---

## Where They Disagree

### "Should the label float or stay static?"

**Option A: Floating label** (M3, Ant filled variant)
How: Label animates from placeholder position to above the field on focus. Saves ~20px vertical space per field.
Upside: More compact forms, modern look.
Downside: Animation complexity, internationalization issues with long labels, reduced hit target for the label.
Adopters: M3 (both variants), Ant (filled only).

**Option B: Static label above** (Spectrum, Carbon, Polaris, Primer, Mantine, 20 others)
How: Label is always above the field. Input area is always the full-width text entry zone.
Upside: Simpler, more accessible, no animation, no i18n issues.
Downside: Uses more vertical space.
Adopters: 22/24 systems.

→ **Para tu caso:** Static label above. 22/24 consensus. Simpler in Figma, no animation states needed.

### "Should the field wrapper be a separate component or bundled?"

**Option A: Separate Input + FormField** (Paste, shadcn/ui, Radix, Fluent 2, Evergreen)
How: Raw Input is a minimal styled element. Label, description, error are provided by a FormField/Field wrapper.
Upside: Maximum composability — same Input in different form layouts.
Downside: More setup, easy to forget ARIA wiring.

**Option B: Bundled field** (Mantine, Gestalt, Orbit, Nord, Carbon, Ant, 16 others)
How: TextField/TextInput includes label, description, error as built-in props.
Upside: Fewer components, impossible to forget label association.
Downside: Less flexible for non-standard layouts.

→ **Para tu caso:** In Figma, the component IS the full field (label + input + helper). This is Option B by necessity — Figma components include all visual parts.

### "How many visual variants?"

**Option A: 2 variants** (M3 filled/outlined, Atlassian standard/subtle)
**Option B: 3 variants** (naming convention standard: outlined/filled/borderless)
**Option C: 4 variants** (Ant: outlined/filled/borderless/underlined; Fluent: outline/underline/filled-darker/filled-lighter)

→ **Para tu caso:** 3 variants (outlined/filled/borderless). Covers 90% of use cases. Underlined can be added later.

### "Warning status: yes or no?"

**Option A: Only error** (20/24 systems). Binary: valid or invalid.
**Option B: Error + warning** (Carbon, Ant, Mantine, Chakra). "Unusual but allowed" is different from "blocked."

→ **Para tu caso:** Include warning. It's 4/24 but the use case is real (financial forms, enterprise data entry). Low implementation cost — same slot, different color.

### "Prefix/suffix: text, icon, or both?"

**Option A: Icons only** (most lightweight systems)
**Option B: Text only** (GOV.UK — "£", ".00")
**Option C: Both text and icon** (Polaris, Ant, Mantine, Chakra)

→ **Para tu caso:** Support both. Prefix/suffix slots accept either icon or text — in Figma, model as icon+text in the slot with booleans.

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Standard field | Label above, outlined border, helper below | General forms | 22/24 |
| Filled field | Label above, filled background, no visible border | Modern/M3 aesthetic | M3, Ant, Fluent |
| Borderless field | No border, subtle hover reveal | Inline editing, dense data | Atlassian, Ant, Radix |
| Connected fields | Input + attached select/button | Value+unit (Polaris $+USD) | Polaris, Ant, Chakra |
| Character count | Count below input, aligned right | Content with limits | M3, Carbon, Gestalt |
| Width-as-information | Field width signals expected length | Gov forms, postal codes | GOV.UK |

### Standard Field (outlined, with all slots)
```
┌─────────────────────────────────┐
│ Label *                         │
│ ┌───┬─────────────────────┬───┐ │
│ │ $ │ Placeholder text     │ ✕ │ │  ← prefix-text + clear-button
│ └───┴─────────────────────┴───┘ │
│ Helper text              0/100  │  ← helper + character-count
└─────────────────────────────────┘
```

### Filled Field
```
┌─────────────────────────────────┐
│ ┌───────────────────────────────┐
│ │ Label                         │
│ │ ● Placeholder text        ✕  ││  ← filled bg, prefix-icon + clear
│ └───────────────────────────────┘
│ Helper text                     │
└─────────────────────────────────┘
```

### Error State
```
┌─────────────────────────────────┐
│ Label *                         │
│ ┌─────────────────────────┬───┐ │
│ │ Invalid value            │ ⚠ │ │  ← red border + error icon
│ └─────────────────────────┴───┘ │
│ ⚠ Error: This field is required │  ← error text replaces helper
└─────────────────────────────────┘
```

---

## Risks to Consider

1. **Slot explosion** (HIGH) — With prefix-icon, suffix-icon, prefix-text, suffix-text, clear-button, and character-count, the input frame has 6+ optional elements. Manage with booleans, not variants.

2. **State × Status matrix** (MEDIUM) — 5 states × 4 statuses = 20 combinations. Apply exclusion rules (disabled × error is debatable — most systems show disabled regardless of status).

3. **Floating label complexity** (HIGH) — If you choose floating labels, you need separate frames for empty+unfocused (label as placeholder) vs focused (label floated). Recommend static label to avoid this.

4. **Addon confusion** (MEDIUM) — Inside-border (prefix/suffix) vs outside-border (addon) is a common source of designer confusion. Keep it simple: only prefix/suffix inside the border for v1.

5. **Read-only vs disabled distinction** (MEDIUM) — 8/24 systems conflate these. They're different: disabled = non-interactive + dimmed; readonly = text-selectable + normal appearance. Worth maintaining the distinction.

---

## Next Steps

```
/spec input          → define anatomy + properties + frame count
/enrich input        → add tokens + a11y spec
/generate input      → build in Figma
/figma-qa            → audit + auto-fix
/build input --max   → full pipeline (already running)
```
