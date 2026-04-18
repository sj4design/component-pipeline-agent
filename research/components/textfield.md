---
component: textfield
date: 2026-04-17
mode: --max
systems: 24
scope: all
---

# TextField — Research (--max mode)

## Sistemas sin componente dedicado

All 24 systems have a text field component. No systems are missing.

---

## How Systems Solve It

### Material Design 3

MD3 provides exactly two variants — `Filled` (container with bottom indicator) and `Outlined` (full stroke border) — as architecturally separate components, not a style prop. This forces designers to make an explicit, intentional choice per context rather than using a single default everywhere. The floating label animates from placeholder position to label-above position on focus or fill, saving vertical space compared to a static label above. Character counter auto-renders when `maxlength` is set. Error text replaces (not stacks with) helper text to prevent layout shifts. Error messages include a text "Error" prefix to ensure colorblind users see the validation state without relying on color.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Two separate variant components (not style props) | Each optimizes interaction states independently; forces intentional per-context decision | M | Valid architectural choice; alternatively, a `variant` prop with the same effect |
| Floating label | Saves vertical space while maintaining label visibility; animated via ARIA regardless of visual state | H | Build floating label if density is a concern; ensure ARIA is wired regardless of animation |
| Error replaces helper text (no layout shift) | Stable layout during validation; layout shift on error is jarring | H | Error-replaces-helper is the stable pattern; document the trade-off |
| "Error" text prefix in error message | Colorblind users see validation state without relying on color | H | Required for WCAG compliance; auto-prefix "Error:" or equivalent |
| `maxlength` auto-triggers counter | Character counter is a derived display from a standard HTML attribute | M | Auto-render counter on maxlength; don't require explicit `showCount` |

**Notable Props**: `leading-icon` / `trailing-icon` slots; `error` / `error-text`; `supporting-text`; `maxlength` (auto-triggers counter)

**Accessibility**: `aria-describedby` for error messages (announced on state change); `aria-invalid` for error; "Error" text prefix as non-color validation signal; label announced on focus regardless of floating animation state.

---

### Spectrum (Adobe)

Spectrum provides three separate components: `TextField` (single-line), `TextArea` (multi-line with resize/auto-grow), and `SearchField` (search semantics with clear button). `isQuiet` removes the border for dense contexts (table cells, property panels) but documentation warns that surrounding structure is needed to maintain visual parsability. Validation is pushed to the Form level via a `validationBehavior` prop and the `FieldError` component — cross-field error consistency and automatic submit blocking are handled centrally. `necessityIndicator` supports both the asterisk convention (`label="Required"` → `"*"`) and the text convention (`"(required)"`) for teams that have different style guides.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Three separate components (TextField / TextArea / SearchField) | Each owns its behavior and semantics without multiline/search flag overloading the API | H | Separation prevents confusing mutually exclusive props |
| `isQuiet` for dense layouts | Table cells, property panels need borderless input; explicit semantic: "I know this needs surrounding structure" | M | Ship quiet/subtle variant with documentation warning |
| Form-level validation with FieldError | Consistent cross-field errors; automatic submit blocking; server-side error support | H | Best validation architecture in T1; elevate to Form pattern |
| `necessityIndicator` (asterisk vs. "(required)" text) | Both conventions exist in the wild; teams shouldn't need to override | M | Support both; document which is your DS standard |

**Notable Props**: `isQuiet`; `validationBehavior` (native|aria); `necessityIndicator` (icon|label|asterisk); `isRequired`; `isReadOnly`; `isDisabled`; `errorMessage`; `description`

**Accessibility**: Most complete validation story in T1 — `aria-live` for error announcements on state change; `aria-describedby` for both help and error; `aria-invalid`; Form handles `aria-errormessage` distribution.

---

### Carbon (IBM)

Carbon's most distinctive feature is the `Fluid` mode — a true layout mode change, not a style toggle. In Fluid mode, the field hangs into the grid gutters and helper text moves into a tooltip. This is a documented trade-off (reduced helper discoverability) accepted for density benefit in enterprise dashboards where inputs must fill available space. Three sizes: SM (32px), MD (40px), LG (48px). A `warn` / `warnText` state separate from `error` handles "unusual but allowed" values — a validation nuance no other system addresses. `inline` prop moves the label beside the field for horizontal form layouts.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Fluid layout mode | Enterprise dashboards need fill-available inputs that change grid relationship | H | Only system with true fluid mode; evaluate if your app needs it |
| Helper text moves to tooltip in Fluid | Acknowledged trade-off for density; explicit choice in the API | M | Document the trade-off when Fluid is used |
| `warn` / `warnText` state | "Unusual but allowed" vs. "invalid and blocked" are distinct feedback needs | H | Ship warning state alongside error; different semantics |
| `enableCounter` / `maxCount` | Character counter with explicit props (not auto-triggered by HTML attribute) | M | Both auto (from maxlength) and explicit are valid |
| `inline` label | Horizontal form layouts; label and field on same line | M | Common enterprise form pattern |

**Notable Props**: `size` (sm|md|lg); `warn` / `warnText`; `enableCounter` / `maxCount`; `inline`; `hideLabel`; `helperText`; `invalid` / `invalidText`; `readOnly`

**Accessibility**: `aria-describedby` for helper/error/warning; `aria-invalid` for error; label association enforced at component level; warning announced on state change.

---

### Polaris (Shopify)

Polaris's single `TextField` handles single-line, multiline, connected fields, and tag-style inputs in one component. The `connectedLeft` / `connectedRight` props are commerce-first: value+unit pairs ($50.00 USD, 2.5 kg) with border-radius merging and shared focus states built in. `prefix` / `suffix` props provide non-editable inline decorators inside the border — distinct from connected fields (interactive elements, outside the border). `verticalContent` renders tag chips above the input within the same visual field boundary — multi-value input without a separate TagInput component. `monospaced` enables code or formatted data entry.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| `connectedLeft` / `connectedRight` | Value+unit pairs with merged borders and shared focus — first-class commerce pattern | H | Best connected-field API in T1; copy for value+unit contexts |
| `prefix` / `suffix` (inside border) distinct from connected (outside border) | Decoration vs. interactive add-on are different patterns with different behaviors | H | Both slots needed; document the difference |
| `verticalContent` for tag chips | Multi-value input without a separate TagInput component | M | Useful for multi-select-as-input patterns |
| `monospaced` | Code/formatted data entry uses monospace font | L | Small but useful; prevents custom CSS override |
| `clearButton` | Inline clear button for search or filter contexts | M | Common pattern; ship as built-in |

**Notable Props**: `connectedLeft` / `connectedRight`; `prefix` / `suffix`; `verticalContent`; `clearButton`; `monospaced`; `autoComplete`; `showCharacterCount`; `align` (text alignment)

**Accessibility**: Prefix/suffix text included in accessible description (SR announces "$" before value); connected fields maintain individual labels; `label` required.

---

### Atlassian

Atlassian's TextField has three appearance modes — `standard` (bordered), `subtle` (transparent until hover/focus), `none` (completely invisible) — specifically designed for Jira issue views where dozens of fields appear inline without visual overload. The `InlineEdit` wrapper is a separate component that manages read-to-edit transitions, confirm/cancel affordances, and Enter/Escape keyboard shortcuts. `elemBeforeInput` / `elemAfterInput` slots accept any React element — not just icons, but spinners, status indicators, async-loaded data, anything. `spacing` prop: `compact` (reduced padding) or `default`.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Appearance modes (standard/subtle/none) | Jira issue views have many inline-editable fields; subtle/none avoids visual overload | H | Best inline-edit story in T1; essential for dense editing interfaces |
| `InlineEdit` as separate wrapper | Read-to-edit transition is its own interaction pattern; separation keeps TextField simple | H | Build InlineEdit as a separate wrapper if inline editing is a product requirement |
| `elemBeforeInput` / `elemAfterInput` (any element) | Not just icons; spinners, dropdowns, async content — maximum flexibility | M | More flexible than icon-only slots |
| `spacing="compact"` | Reduced padding for dense UIs without changing typography | M | Needed for tables, sidebars, dense dashboards |

**Notable Props**: `appearance` (standard|subtle|none); `spacing` (compact|default); `elemBeforeInput` / `elemAfterInput` (ReactNode); `isReadOnly`; `isDisabled`; `isInvalid`

**Accessibility**: Subtle/none appearances maintain same ARIA semantics as standard; InlineEdit announces read-to-edit transition; placeholder never replaces label (explicitly documented); `aria-invalid` for errors.

---

### Ant Design

Ant Design's Input family consists of five sub-components with tailored defaults: `Input` (single-line), `Input.TextArea` (multi-line), `Input.Search` (Enter-to-search + search icon), `Input.Password` (visibility toggle), and `Input.OTP` (auto-advance between segments). Four visual variants: `outlined` (standard), `filled`, `borderless` (for embedded inline editing), `underlined` (modern/M3-style). `addonBefore` / `addonAfter` (outside the border, attached) vs. `prefix` / `suffix` (inside the border) serve different decoration contexts — enterprise forms need both patterns simultaneously. `showCount` with `count` (custom counting logic, e.g., emoji counts as 1 character).

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Five sub-components (including OTP) | OTP auto-advances focus segment-to-segment; Password toggles visibility — behaviors too complex for flags | H | Separate sub-components for OTP and Password are the right call |
| `addonBefore`/`addonAfter` (outside) vs. `prefix`/`suffix` (inside) | Enterprise forms need outside-border attached addons AND inside-border inline decorators simultaneously | H | Both slot types are needed; document the difference clearly |
| Four visual variants | Widest visual range researched; each serves a different surface context | H | Ship at minimum outlined + borderless; evaluate filled and underlined |
| `showCount` with custom `count` function | Emoji and multibyte characters should count as 1; built-in for content creation interfaces | M | Ship character counter with customizable counting logic |
| `Input.OTP` | Auto-advances focus between segments; segmented OTP is a complex interaction pattern | H | Evaluate if your product has OTP use cases |

**Notable Props**: `addonBefore` / `addonAfter`; `prefix` / `suffix`; `variant` (outlined|filled|borderless|underlined); `showCount` / `count`; `allowClear`; `status` (error|warning); `Input.OTP`; `Input.Password` with `visibilityToggle`

**Accessibility**: A11y delegated to `Form.Item`; standalone Inputs outside Form need manual ARIA wiring; prefix/suffix available to SR as description; error/warning adds visual indicator only — Form.Item adds `aria-invalid`. Dynamic prefix/suffix can cause DOM recreation (documented bug).

---

### Tier 2 Systems

| System | Name | Key Differentiation |
|--------|------|---------------------|
| Twilio Paste | Input + FormField | Separated: Input element + FormField wrapper (label/help/error); composable ARIA pattern |
| Salesforce Lightning | lightning-input | LWC; `type` attribute for all input variants; inline validation built in |
| GitHub Primer | TextInput | `leadingVisual` / `trailingVisual` render prop slots; TextInputWithTokens for tag input |
| shadcn/ui | Input | Minimal unstyled base; paired with FormField/Label/FormMessage (react-hook-form) |
| Playbook | TextInput | Text entry; dual React/Rails |
| REI Cedar | CdrInput | Vue; `background` color variants; WCAG 2.1 AA |
| Wise Design | TextField | Financial form fields; account/transfer data entry |
| Dell Design System | TextField | Enterprise configuration form fields |

---

### Tier 3 Systems

| System | Name | Key Differentiation |
|--------|------|---------------------|
| Radix UI | TextField (Themes) | `TextField.Slot` for icons/addons; `variant` (surface/classic/soft); native form behavior preserved |
| Chakra UI | Input / InputGroup | `InputLeftElement`/`InputRightElement` (overlaid, auto-padding); `InputLeftAddon`/`InputRightAddon` (bordered sections); `flushed` for inline; Field v3 bundles label/error |
| GOV.UK | Text Input | Width-sizing as functional information (width-2 to full-width); `autocomplete` enforcement; text prefix/suffix for units; error above input with red border |
| Base Web | Input | `startEnhancer` / `endEnhancer` (any ReactNode); built-in `clearable`; Overrides for all sub-elements |
| Fluent 2 | Input / Field | Input/Field separation: Field wraps any input type; `appearance` (outline/underline/filled-darker/filled-lighter); `contentBefore`/`contentAfter` slots |
| Gestalt | TextField | Required `label` prevents unlabeled inputs; `characterCount` for content forms; error replaces helper (no layout shift); `id` required |
| Mantine | TextInput | `leftSection`/`rightSection` with auto-padding; `description` (always visible guidance) + `error` (conditional feedback) as separate props; `withAsterisk` |
| Orbit | InputField | Travel-context prefix/suffix icons; immediate inline error; mobile-optimized touch targets; `help` and `error` separate |
| Evergreen | TextInput / TextInputField | Input/Field separation; `appearance="minimal"` for bottom-border-only; `isInvalid` for error styling |
| Nord | nord-input | Web component; required `label`; `helper-text` and `error`; clinical validation; framework-portable |

---

## Pipeline Hints

### Archetype Recommendation

**Archetype: Form input (composite — input + label + validation)**

TextField is a composite component bundling: the input element, a visible label, helper text (always-visible guidance), an error message (conditional validation feedback), and optional prefix/suffix decoration. The key architectural decision is whether to bundle all of these in one component (Chakra, Mantine, Gestalt, Nord) or split into a bare Input and a FormField wrapper (Paste, Fluent 2, Evergreen, Radix). The bundled approach is the modern trend and prevents the most common errors (forgetting aria-describedby, forgetting label association). Provide both: a bundled TextInput for standard forms, and a bare Input for complex layouts.

---

### Slot Consensus

| Slot | Consensus | Notes |
|------|-----------|-------|
| label | 24/24 | Visible label above (or beside) input; always required |
| input (native element) | 24/24 | The `<input type="text">` |
| helper text / description | 20/24 | Always-visible guidance below input; shown before and after validation |
| error message | 22/24 | Conditional validation feedback; replaces or joins helper text |
| leading icon / prefix | 18/24 | Icon or text inside left of input border |
| trailing icon / suffix | 18/24 | Icon or text inside right of input border |
| addon before (outside border) | 8/24 | Attached element outside left border (Ant Design, Lightning, Base Web, Chakra InputAddon) |
| addon after (outside border) | 8/24 | Attached element outside right border |
| character counter | 12/24 | Character count display (below right or inside trailing area) |
| clear button | 10/24 | Inline × to clear value |

---

### Property Consensus

| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| label | string | 24/24 | Required by most strict systems |
| value | string | 22/24 | Controlled input value |
| defaultValue | string | 22/24 | Uncontrolled default value |
| onChange | function | 22/24 | Change handler |
| placeholder | string | 22/24 | Input placeholder text |
| disabled / isDisabled | boolean | 22/24 | Disabled state |
| readOnly / isReadOnly | boolean | 20/24 | Read-only (focusable but not editable) |
| required / isRequired | boolean | 20/24 | Required field |
| error / invalid / isInvalid | boolean | 22/24 | Error state toggle |
| errorMessage / error-text / invalidText | string | 22/24 | Error message text |
| helperText / description / supportingText | string | 20/24 | Always-visible guidance |
| size | sm, md, lg | 16/24 | Height/padding; pixel values vary |
| type | text, email, password, number, tel, url, search | 14/24 | HTML input type |
| maxLength / maxCount | number | 14/24 | Character limit |
| autoComplete | string | 12/24 | HTML autocomplete attribute |
| variant / appearance | outlined, filled, borderless, underlined, subtle, quiet | 12/24 | Visual style variant |

---

### Boolean Properties

| Property | Default | Adopters |
|----------|---------|---------|
| disabled / isDisabled | false | All |
| readOnly / isReadOnly | false | Most |
| required / isRequired | false | Most |
| invalid / isInvalid | false | Most |
| isQuiet | false | Spectrum |
| clearButton / allowClear | false | Polaris, Ant Design, Base Web |
| monospaced | false | Polaris |
| showCount / enableCounter | false | Carbon, Polaris, Gestalt, Mantine |
| withAsterisk | false | Mantine (visual required indicator) |
| isLoading | false | Some; spinner in trailing slot |
| hideLabel | false | Carbon (visually hidden label) |
| fluid | false | Carbon |

---

### State Coverage

| State | Adopters | Notes |
|-------|---------|-------|
| default | All | Base state |
| focused | All | Focus ring; label animates up for floating label variants |
| hover | All | Border/background color change |
| disabled | All | Non-interactive; reduced opacity |
| read-only | Most | Focusable; cannot edit; distinct from disabled |
| error / invalid | All | Red border + error message |
| warning | Carbon, Ant Design | "Unusual but allowed"; distinct from invalid |
| filled (has value) | MD3, most | Different visual from empty |
| success | Some | Green indicator after validation |
| loading | Some | Spinner in trailing slot during async validation |
| character count at limit | Carbon, Polaris, Mantine, Ant Design | Counter at max threshold |
| subtle (transparent until focus) | Atlassian | For dense inline-edit interfaces |

---

### Exclusion Patterns

- TextField is NOT a search field — provide `Input.Search` / `SearchField` / `clearButton` as a separate sub-component or variant
- TextField is NOT a password field — `Input.Password` with visibility toggle is distinct behavior
- TextField is NOT a textarea — `TextArea` / `Input.TextArea` is a separate component with resize and auto-grow
- TextField is NOT an OTP — `Input.OTP` with segment auto-advance is a distinct interaction
- `placeholder` is NOT a substitute for a visible label — enforced by Gestalt (required label), Nord (required label), GOV.UK guidance
- `aria-label` is a lower-quality substitute for a visible `<label>` — sighted users cannot see aria-label; always ship visible labels

---

### Building Block Candidates

- **Input**: The bare styled `<input>` element without label/helper/error wrapper. For complex layouts where label/input relationship is managed externally.
- **FormField / Field**: The wrapper component that handles label + input + helper text + error message + ARIA wiring. Fluent 2 / Paste / Evergreen pattern. Can wrap any input type.
- **TextArea**: Multi-line input with resize and auto-grow. Separate component from TextField.
- **SearchField**: Text input with clear button and search icon. Distinct semantics (`role="search"` or `type="search"`).
- **Input.Password**: Password input with visibility toggle. Distinct behavior.
- **InlineEdit**: Read-to-edit transition wrapper (Atlassian pattern). Separate from TextField.
- **Input.OTP**: Segmented OTP input with auto-advance focus. Ant Design pattern.

---

### Enum / Configuration Properties

| Property | Values | Source |
|----------|--------|--------|
| variant / appearance | `outlined`, `filled`, `borderless`, `underlined`, `subtle`, `none`, `minimal`, `flushed` | Ant Design, Atlassian, Chakra, Evergreen |
| size | `sm`, `md`, `lg` (Carbon: `sm`=32px, `md`=40px, `lg`=48px) | Most systems |
| spacing | `compact`, `default` | Atlassian |
| validationBehavior | `native`, `aria` | Spectrum |
| necessityIndicator | `icon` (asterisk), `label` ("(required)") | Spectrum |
| labelPosition | `above` (default), `beside` (inline) | Carbon `inline` prop |
| autocomplete | Any HTML autocomplete value | GOV.UK most explicit |

---

### A11y Consensus

| Topic | Consensus |
|-------|-----------|
| Label | Visible `<label>` with `htmlFor`=input `id` — required; `aria-label` is a fallback, not a replacement |
| Error state | `aria-invalid="true"` on input; `aria-describedby` pointing to error message element `id` |
| Helper text | Also in `aria-describedby` when present; when both helper and error are present, include both IDs |
| Required | `aria-required="true"` or `required` attribute (use both); visual indicator (asterisk or "(required)" text) |
| Placeholder | Never a label substitute; does not replace label in ARIA; disappears on type |
| Error announcement | `aria-live="polite"` on error container OR `aria-describedby` change causes announcement on focus |
| Autocomplete | Specify `autocomplete` attribute for name, email, address, phone fields (WCAG 1.3.5) |
| Read-only | `readonly` attribute; `aria-readonly="true"` for explicit SR announcement |
| Disabled | `disabled` attribute removes from focus order; `aria-disabled="true"` keeps in focus order but marks as non-interactive |
| APG Pattern | No specific APG pattern; follows HTML native input semantics |

---

## What Everyone Agrees On

1. **Visible label is always required** — Gestalt required `label` prop, Nord required `label`, GOV.UK's extensive research — placeholder is not a label, `aria-label` is a fallback. This is the single most important thing a text field component can enforce.
2. **Error state requires three things**: `aria-invalid="true"` on the input + `aria-describedby` pointing to the error message element + a visible error message text. All three are required; none alone is sufficient.
3. **Helper text and error message are separate concerns** — Mantine's `description` (always-visible) vs. `error` (conditional) distinction is the clearest API model. They should not be merged into a single `helperText` prop that switches meaning.
4. **prefix/suffix (inside border) vs. addon (outside border) are distinct patterns** — Ant Design, Chakra (InputElement vs. InputAddon), and Polaris (`prefix`/`suffix` vs. `connectedLeft`/`connectedRight`) all make this distinction. Teams need both; document the difference.
5. **`autocomplete` attribute should be specified** — GOV.UK's guidance is the most explicit, but it applies universally. Specifying `autocomplete` directly benefits motor-impaired users who rely on browser autofill. The component should make this easy to set.
6. **Warning state is distinct from error state** — Carbon's `warn`/`warnText` and Ant Design's `status="warning"` acknowledge a real validation nuance: "unusual but allowed" (warning) is different from "invalid and blocked" (error). Both states are needed for forms that process edge cases.

---

## Where They Disagree

### 1. Bundled component vs. Input + FormField separation
**Option A (Bundled)**: `<TextInput label="Name" error="Required" helperText="First and last name" />` — Chakra, Mantine, Gestalt, Nord, Orbit  
**Option B (Separated)**: `<FormField><Label htmlFor="name">Name</Label><Input id="name" /><FormErrorMessage>Required</FormErrorMessage></FormField>` — Paste, Fluent 2, Evergreen, Radix

- Adopters A: Chakra, Mantine, Gestalt, Nord, Orbit, Carbon, MD3, Polaris, Atlassian  
- Adopters B: Paste, Fluent 2, Evergreen, Radix  
- Upside A: Automatic ARIA wiring (aria-describedby); fewer imports; prevents label/error linking errors  
- Upside B: Flexible layouts; Field can wrap any input type (select, checkbox, custom); label in different DOM position  
- Downside A: Less flexible for complex form layouts  
- Downside B: More boilerplate; teams forget aria-describedby wiring  
- Para tu caso: Ship both. Bundled TextInput for standard forms. Bare Input + FormField wrapper for complex layouts. The trend in T3 is clearly toward bundled.

### 2. Error replaces helper vs. both shown simultaneously
**Option A (Error replaces)**: Error message takes the helper text's position — MD3, Gestalt, Orbit  
**Option B (Both shown)**: Error appears below helper (two lines) — Mantine, Spectrum FieldError  
**Option C (One slot)**: Single `helperText` prop that shows guidance or error — Carbon (via invalidText)

- Adopters A: MD3, Gestalt, Orbit, Polaris  
- Adopters B: Mantine, Spectrum  
- Adopters C: Carbon, Ant Design  
- Upside A: Layout stable (no height change on error); visually cleaner  
- Downside A: User loses access to the guidance text when the error appears  
- Upside B: User can read both the guidance ("must be at least 8 characters") and the error simultaneously  
- Para tu caso: Error-replaces-helper is the layout-stable choice for most forms; but a `description` (always visible) + separate `error` (conditional, appears below) avoids the trade-off entirely. Mantine's model is cleanest.

### 3. Floating label vs. static label
**Option A (Floating)**: Label starts inside input, animates above on focus/fill — MD3, Base Web, Fluent 2 (filled)  
**Option B (Static above)**: Label always above the input — Spectrum, Carbon, Polaris, Atlassian, GOV.UK, Mantine, most

- Adopters A: MD3, Base Web, Fluent 2 (filled-* variants)  
- Adopters B: Spectrum, Carbon, Polaris, Atlassian, GOV.UK, Mantine, Gestalt, Orbit, Nord  
- Upside A: Saves vertical space; input and label occupy the same vertical zone when empty  
- Downside A: Complex ARIA implementation (label must be announced regardless of position); reduced contrast when inside input; truncation risk on long labels  
- Upside B: Always visible; never truncated; simpler ARIA; GOV.UK user research confirms users prefer static labels  
- Downside B: Uses more vertical space  
- Para tu caso: Static label is the safer, more accessible default. GOV.UK's research is the most rigorous evidence. Floating label as an opt-in variant for density use cases.

### 4. Width as functional information (GOV.UK) vs. layout responsibility
**Option A (Functional width)**: Input width communicates expected answer length; component ships sized to the data — GOV.UK  
**Option B (Layout width)**: Input fills container; width is layout's responsibility — all other systems

- Adopters A: GOV.UK  
- Adopters B: All 23 other systems  
- Upside A: Field width creates subconscious expectation about answer length; backed by user research  
- Downside A: Requires designers to know expected answer length for every field; harder to implement in variable-width layouts  
- Para tu caso: GOV.UK's research is compelling for form-heavy applications (government, healthcare). Ship a `width` prop with documented size options (4-char, 10-char, 20-char, full). Default full-width.

### 5. Validation at field level vs. form level
**Option A (Field level)**: Error state and message managed per-field — Carbon, MD3, Atlassian, Mantine  
**Option B (Form level)**: Validation centralized in Form; FieldError distributed by form — Spectrum  
**Option C (Library)**: react-hook-form or yup integration — shadcn, Base Web

- Adopters A: Most systems  
- Adopters B: Spectrum  
- Adopters C: shadcn  
- Upside A: Simple; each field owns its validation  
- Upside B: Cross-field validation; consistent error experience; submit blocking  
- Upside C: Flexible; integrates with the most popular form libraries  
- Para tu caso: Ship field-level error state + error message props for the simple case. Document react-hook-form integration. Build a `Form` context that auto-distributes server-side errors for advanced use.

---

## Visual Patterns Found

| Pattern | Description | Best For | Adopted By |
|---------|-------------|----------|------------|
| Standard (outlined) | Full border, static label above, helper below | Default forms | Most systems |
| Filled variant | Filled background, bottom border only | MD3 Filled, Fluent filled-darker, Ant Design filled |
| Floating label | Label inside input, animates above on focus | Density-constrained forms | MD3, Base Web, Fluent 2 filled |
| Quiet / subtle | No border until hover/focus | Dense/inline editing | Spectrum isQuiet, Atlassian subtle |
| Borderless | No border; relies on surrounding structure | Table cells, embedded inputs | Ant Design borderless, Atlassian none |
| Underline only | Bottom border only; modern aesthetic | Atlassian, Fluent 2 underline, Ant Design underlined |
| Connected fields | Input + select/button sharing a border | Value+unit pairs, search+filter | Polaris connectedLeft/Right, Chakra InputAddon |
| Input with prefix | Icon or $ inside left of border | Currency, units, icons | All systems |
| Input with addon | Attached element outside border | Domain, currency code, country selector | Ant Design, Chakra, Base Web |
| Tag/token input | Chips inside the field boundary | Multi-value selection | Polaris verticalContent, Primer TextInputWithTokens |
| Character counter | Current count / max below or trailing | Content creation, message input | Carbon, Polaris, Mantine, Ant Design, Gestalt |

### ASCII Wireframes

**Standard text field with label, helper, error**
```
  First Name
  ┌─────────────────────────────┐
  │ John                        │
  └─────────────────────────────┘
  Enter your legal first name

  vs. error state:
  
  First Name
  ┌─────────────────────────────┐
  │                             │  ← red border
  └─────────────────────────────┘
  ✕ Error: First name is required
```

**Floating label (MD3 Outlined variant)**
```
  Empty:                      Focused/filled:
  ┌──────────────────────┐    ┌──────────────────────┐
  │  First Name          │    │ First Name            │  ← label above
  │                      │    │ John                  │
  └──────────────────────┘    └──────────────────────┘
  (label floats inside)       (label animates above)
```

**Input with prefix/suffix (inside border)**
```
  ┌─────────────────────────┐
  │ $ │ 1,234.00        USD │
  └─────────────────────────┘
     ↑ prefix (inside)   ↑ suffix (inside)
```

**Connected fields (Polaris pattern, outside border)**
```
  ┌────────────────────┬──────────────┐
  │ 50.00              │ USD        ▼ │
  └────────────────────┴──────────────┘
  ↑ input                ↑ connectedRight (select, outside border)
```

**Tag input (Polaris verticalContent)**
```
  ┌──────────────────────────────────┐
  │ [React ✕]  [TypeScript ✕]        │
  │ Add skill...                     │
  └──────────────────────────────────┘
```

**Character counter**
```
  Bio
  ┌──────────────────────────────────────┐
  │ I'm a software engineer...           │
  └──────────────────────────────────────┘
                                    42 / 160
```

**Quiet / subtle (Atlassian inline editing)**
```
  Normal view:              Hover / focus:
  Project name              Project name
  Acme Corp                 ┌─────────────────┐
  (no border)               │ Acme Corp       │
                            └─────────────────┘
```

**Form field size comparison**
```
  SM (32px):  ┌──────────────────────┐  (compact forms, tables)
  MD (40px):  ┌──────────────────────┐  (default)
  LG (48px):  ┌──────────────────────┐  (prominent, accessible touch)
```

---

## Risks to Consider

### 1. Missing label fails WCAG 1.3.1 and 1.1.1 — HIGH
Inputs without visible labels are the most common form accessibility failure. Placeholder-as-label (placeholder disappears on typing), `aria-label`-only (sighted users can't see it), and unlabeled inputs are all accessible failures. Gestalt and Nord both enforce label as a required prop — this is the right call.

**Mitigation**: Make `label` a required prop in TypeScript. If visual label hiding is needed for design reasons, use CSS visually-hidden (not `display:none`) and document it as a supported but exceptional pattern. Log a runtime warning if no label is provided.

### 2. aria-describedby wiring forgotten for error messages — HIGH
`aria-invalid="true"` alone does not announce the error message to screen readers. The input must have `aria-describedby` pointing to the error message element's `id`. When the error message is conditional (appears/disappears), the `aria-describedby` must also be conditional. Teams using the separate Input+FormField pattern routinely forget this.

**Mitigation**: Bundled TextField component handles aria-describedby automatically. If you ship a bare Input, provide a FormField wrapper that manages ARIA wiring. Document the required ARIA pattern in accessibility docs.

### 3. Dynamic prefix/suffix causes DOM recreation (Ant Design bug) — MEDIUM
Ant Design's known bug: switching from no prefix/suffix to a prefix/suffix (or vice versa) dynamically causes the Input DOM node to be recreated, losing focus and breaking form library state management. This affects real-time search, async-loading unit selectors, and conditional addons.

**Mitigation**: Always render prefix/suffix slots (even if empty) to prevent DOM recreation. Test with dynamic prefix/suffix changes in your implementation. Ant Design's approach of re-creating the DOM on dynamic prefix changes is the wrong pattern — maintain the input DOM node and change only the slot content.

### 4. Warning state absent from most systems — MEDIUM
The "unusual but allowed" warning state — where the value is technically valid but flagged for the user's attention — is only implemented in Carbon and Ant Design. Most teams end up using error state for warnings, which incorrectly marks valid-but-flagged inputs as `aria-invalid="true"` and blocks form submission.

**Mitigation**: Ship `warning` / `warn` state distinct from `error`. Warning: yellow/amber border + warning icon + warning message. Does NOT set `aria-invalid="true"`. Does NOT block form submission. Carbon's API (`warn` + `warnText`) is the reference.

---

## Next Steps

1. **Enforce visible label as required prop**: TypeScript required. Runtime warning if missing. This prevents the most common accessibility failure.
2. **Bundle label + input + helper + error in one component**: Auto-wire `aria-describedby` inside the component. The bundled approach prevents the most common ARIA implementation errors.
3. **Separate description (always visible) from error (conditional)**: Ship `description` + `errorMessage` as independent props following Mantine's model. Never merge them into a single `helperText` prop.
4. **Ship prefix/suffix (inside) and addon (outside border) as separate slots**: Document the difference. Always render slot containers to prevent DOM recreation on dynamic changes.
5. **Add `warn` / `warnText` state from day one**: Distinct from error; does not set `aria-invalid`; does not block submission.
6. **Expose `autocomplete` attribute**: Document recommended values for name, email, address, phone, and OTP fields. GOV.UK's guidance is the most detailed reference.
7. **Ship TextArea, SearchField, and PasswordInput as separate components**: Their interaction contracts are distinct enough to justify separate components.
