# Variant Optimization Best Practices Across Major Design Systems

> Research compiled March 2026. Sources: Material Design 3, Carbon (IBM), Polaris (Shopify), Spectrum (Adobe), Figma official docs, Nathan Curtis, Luis Ouriach.

---

## 1. Design System Comparisons

### Material Design 3 (Google)

**Button property structure:**
- **Types (variant):** 5 — Filled, Filled Tonal, Outlined, Elevated, Text
- **States:** 5 — Default, Hover, Focus, Pressed, Disabled
- **Icons:** Boolean toggle (leading icon on/off)
- **Sizes:** Not explicitly variant-based; sizing handled through density tokens

**Estimated frame math (Button):**
- Naive: 5 types x 5 states x 2 icon configs = **50 frames**
- Optimized with component properties: 5 types x 5 states = **25 frames** (icon as boolean property, not variant)
- Further optimized: States handled via interactive components prototype, leaving **5 frames** for types only

**Key techniques:**
- Uses **component properties** (boolean for icon, text property for label) to avoid multiplying icon/no-icon variants
- Leverages **Figma variables** for theming (4 color schemes via modes, not separate variant sets)
- The M3 Design Kit with Variables + Properties consolidates all four themes into one file using Figma variable modes
- Separates FAB, Icon Button, Segmented Button as distinct component families (not variants of Button)

**Figma-to-code alignment:**
- Variant property names mirror Compose/Flutter API: `style`, `enabled`, `onClick`
- Icon presence maps to optional `icon` prop in code

---

### Carbon Design System (IBM)

**Button property structure:**
- **Types (variant):** 4 — Primary, Secondary, Tertiary, Ghost (+ Danger modifier)
- **Sizes:** 5+ — Small (sm), Medium (md), Large (lg), XL, 2XL, plus "expressive" variants
- **States:** Default, Hover, Focus, Active, Disabled
- **Icons:** Boolean toggle (with/without icon)

**Estimated frame math (Button):**
- Naive: 5 types x 5 sizes x 5 states x 2 icon = **250 frames**
- Carbon's approach: Uses component properties to collapse icon and treats Danger as a separate boolean/modifier rather than a 5th type
- Practical P0 set: 4 types x 3 core sizes (sm, md, lg) x 1 default state = **12 frames P0**

**Key techniques:**
- **Danger as modifier, not type:** Instead of adding "Danger" as a 5th button type (which multiplies everything), Carbon treats it as a cross-cutting concern
- **Size naming standardization:** Uses t-shirt sizing (sm, md, lg, xl, 2xl) consistently across all components
- **Expressive vs Productive as mode, not variant:** Rather than doubling variants for expressive/productive, they use separate contextual modes
- **Four themes via Figma variables:** White, g10, g90, g100 themes applied through variable modes, not component variants
- **Comprehensive token system:** Color tokens map directly to Figma variables, eliminating theme as a variant dimension

**Figma-to-code alignment:**
- Property names match React Carbon props: `kind="primary"`, `size="lg"`, `disabled`, `renderIcon`
- Icon is an optional render prop in code, boolean property in Figma

---

### Polaris (Shopify)

**Button property structure:**
- **Variants:** Primary, Basic (default), Plain, Monochrome
- **Sizes:** Slim, Medium, Large
- **Tone:** (modifier) Critical, Success
- **States:** Default, Hover, Active, Focus, Disabled, Loading

**Key techniques:**
- **Consolidated boolean props into single variant prop:** Polaris explicitly moved from multiple boolean props (e.g., `primary`, `plain`, `destructive`) to a single `variant` prop with enumerated values. This made logical combinations intentional and prevented impossible states
- **Variables for color, space, and size:** Updated Figma kits to use Figma variables rather than style overrides
- **Auto layout + variants:** Components built with auto layout, matching the flex behavior in React code
- **Loading as an overlay state:** Loading is handled as a separate overlay concern rather than multiplying every other combination

**Figma-to-code alignment:**
- Figma variant property `variant="primary"` maps directly to `<Button variant="primary">`
- `tone="critical"` maps to code prop `tone="critical"`
- Boolean `disabled` in Figma = `disabled` prop in React

---

### Spectrum (Adobe)

**Button property structure:**
- **Variants:** Accent, Primary, Secondary, Negative
- **Styles:** Fill, Outline
- **Sizes:** S, M, L, XL (t-shirt sizing)
- **Static color:** Boolean/variant for light/dark background overrides
- **Quiet:** Boolean property (reduces visual emphasis)
- **States:** Default, Hover, Active, Focus, Disabled

**Key techniques:**
- **Quiet as boolean, not variant type:** Instead of making "Quiet" versions of every button type, it's a single boolean toggle. This halves the variant count
- **Static color as modifier:** For buttons on colored backgrounds, uses a `staticColor` prop rather than creating dark-background variants of everything
- **Component Options Editor plugin:** Adobe built custom Figma tooling for authoring and validating component option schemas with JSON validation
- **CSS custom properties (--mod-*):** Code components expose modification hooks through CSS custom properties, keeping the variant API lean while allowing customization
- **Spectrum 2 evolution:** Introduced a more composable architecture, separating structural patterns from visual treatments

**Figma-to-code alignment:**
- `size="M"` maps to `size="M"` in React Spectrum
- `variant="accent"` maps to `variant="accent"`
- `isQuiet` boolean maps to `isQuiet` prop
- `staticColor="white"` maps to `staticColor="white"`

---

## 2. Frame Count Comparison Table

| Component | Naive (all combos) | Optimized (with properties) | P0 Only | Reduction |
|-----------|-------------------:|---------------------------:|--------:|----------:|
| **Button (M3)** | ~50 | 25 | 5 | 90% |
| **Button (Carbon)** | ~250 | ~60 | 12 | 95% |
| **Button (Polaris)** | ~144 | ~40 | 12 | 92% |
| **Button (Spectrum)** | ~192 | ~48 | 16 | 92% |
| **Input (typical)** | ~120 | ~30 | 6-10 | 92% |
| **Select (typical)** | ~180 | ~40 | 8-12 | 93% |

> P0 = minimum variants needed for design handoff (default state, core sizes/types only).

---

## 3. Decision Framework: Variant vs Boolean vs Token

### When to use a VARIANT property (multiplies frames):
- The change affects **layout or structure** (size changes padding, spacing, child arrangement)
- The change creates **visually distinct designs** that a designer must explicitly choose
- There are **3+ mutually exclusive options** (type: filled | outlined | text)
- It maps to an **enum prop** in code (`variant="primary"`)
- Examples: size, type/variant, state (for interactive components)

### When to use a BOOLEAN property (does NOT multiply frames):
- It's a **show/hide toggle** for an element (icon, label, description, close button)
- It's a **binary on/off** configuration (disabled, required, readonly)
- The structural layout doesn't change, only visibility or a simple visual flag
- It maps to a **boolean prop** in code (`disabled={true}`)
- Examples: hasIcon, hasLabel, disabled, required, loading

### When to use a TOKEN / VARIABLE (does NOT multiply frames):
- It's a **color, spacing, or typography** change that doesn't affect structure
- It applies **across themes** (light/dark mode, brand theming)
- It's a **cross-cutting concern** that shouldn't multiply per component
- It maps to **CSS custom properties** or **design tokens** in code
- Examples: theme color, border-radius, font-weight, spacing scale

### Decision tree:
```
Does this change the component's STRUCTURE or LAYOUT?
  YES --> Does it have 3+ mutually exclusive options?
            YES --> VARIANT property (multiplies frames)
            NO  --> Is it binary?
                      YES --> Could be BOOLEAN (show/hide) or VARIANT (2 visual states)
                      NO  --> VARIANT
  NO  --> Is it a VISUAL change (color, spacing, radius)?
            YES --> TOKEN / VARIABLE (via Figma variables)
            NO  --> Is it a SHOW/HIDE toggle?
                      YES --> BOOLEAN property
                      NO  --> TEXT or INSTANCE SWAP property
```

---

## 4. Optimization Techniques (Actionable)

### Technique 1: Boolean Properties for Show/Hide (saves 50% per boolean)

**Before:** Button with icon and Button without icon = 2x variants for every combination
**After:** Single component with boolean `Show Icon = true/false`

**Impact:** Each boolean you extract from variants cuts your frame count in half.
A component with 3 booleans that were previously variants: 8x reduction.

**Real example:** 160 variants reduced to 80 by converting icon presence to boolean (reported by Figma community designers).

---

### Technique 2: Instance Swap Properties (eliminates icon/avatar variant multiplication)

**Before:** 20 icon variants x 3 sizes = 60 frames
**After:** 1 instance swap slot x 3 sizes = 3 frames (designer picks any icon from library)

**Impact:** Eliminates the entire icon dimension from the variant matrix.

---

### Technique 3: Slots / Composition (the 2025-2026 paradigm shift)

**Nathan Curtis's "Configuration Collapse":** Drop props that make components fragile. Retain only behavioral and foundational visual props (state, appearance, size) as the component's essential, top-level API. Everything else becomes composable through slots.

**Principle:** "Make the common configurable, make the uncommon composable."

**Before slots:**
```
ListItem: variant(leading: icon|avatar|checkbox) x variant(trailing: text|badge|switch) x ...
= explosion of every leading/trailing combination
```

**After slots:**
```
ListItem: slot(leading) + slot(trailing) + size + state
= designer drops any component into the slot
```

**Best candidates for slots:**
- Dropdowns / Select menus (most common early-adopter use case)
- Cards (classic variant magnets)
- Modals / Dialogs
- List items
- Navigation items
- Panels

**Implementation steps (Nathan Curtis):**
1. Audit existing library: catalog each component and its instance swap props
2. Start with already-composable components (those with instance swap properties)
3. Convert instance swap props to native slots
4. Identify repeating item patterns (most common composable pattern)
5. Test with designers before rolling out

---

### Technique 4: Sub-Component Extraction

**Pattern:** Extract repeated internal structures into their own components.

**Before:** Button handles its own icon layout, label layout, loading spinner, badge
**After:** ButtonBase (structure) + IconSlot (sub-component) + LabelSlot (sub-component)

**Material Design 3 approach:** Separates FAB, Icon Button, Segmented Button, and Common Button as distinct component families. Each has fewer variants because it has a narrower scope.

**Carbon approach:** Button Group is a separate component from Button. Danger is a modifier, not a type.

**Rule of thumb:** If a "variant" of your component looks and behaves fundamentally differently, it should be its own component, not a variant.

---

### Technique 5: States via Interactive Components (prototype-level)

**Before:** 5 states x 4 types x 3 sizes = 60 frames
**After:** 4 types x 3 sizes = 12 frames (states handled via prototype interactions)

**How:** Figma Interactive Components let you define state transitions (hover, press, focus) at the prototype level. The component only needs a default frame; hover/press/focus are defined as interactions, not separate variants.

**Caveat:** You still need the state variants to exist for the interaction to work, but they can be hidden from the assets panel and don't need to be in the "P0" set designers browse.

---

### Technique 6: Theme via Variables, Not Variants

**Before:** Every component x light/dark = 2x frames
**After:** One set of frames, theme applied via Figma variable modes

**All four major systems do this:**
- M3: 4 color schemes via variable modes
- Carbon: White, g10, g90, g100 via variable modes
- Polaris: Variables for color, space, size
- Spectrum: Tokens mapped to CSS custom properties

**Impact:** Eliminates theme as a variant dimension entirely. For a system with 100 components, this alone saves 100+ frames.

---

### Technique 7: Priority Tiers (P0 / P1 / P2)

Not every combination needs a visible frame. Use a tiering system:

| Tier | What it includes | Visible in assets? | Frame exists? |
|------|-----------------|:------------------:|:-------------:|
| **P0** | Core types x core sizes x default state | YES | YES |
| **P1** | All states for P0 combinations (for interactive components) | Hidden | YES |
| **P2** | Edge cases, rare combinations | NO | NO (use overrides) |

**Formula example (Button):**
- P0: 4 types x 3 sizes = 12 frames
- P1: 12 P0 x 4 extra states = 48 frames (hidden, for prototyping)
- P2: Icon combos, loading states = handled via boolean/slot
- Total frames: 60 (but designer only sees 12)

---

### Technique 8: Figma-to-Code Naming Alignment

**Best practice from Figma's own blog ("The Shared Language of Props"):**
- Variant property names should match code prop names: `size` not `Size`, `variant` not `Type`
- Values should match enum values: `"sm" | "md" | "lg"` not `"Small" | "Medium" | "Large"`
- Prefix non-code properties with a marker: `*state` or `:state` to signal "this is Figma-only, not a code prop"
- Boolean property names should match boolean props: `disabled` = `disabled`, `hasIcon` = `hasIcon`

**Code Connect mapping:**
```javascript
// Figma variant "Type=Primary" maps to:
figma.connect(Button, figmaNodeUrl, {
  props: {
    variant: figma.enum("Type", {
      Primary: "primary",
      Secondary: "secondary",
    }),
    size: figma.enum("Size", {
      Small: "sm",
      Medium: "md",
      Large: "lg",
    }),
    disabled: figma.boolean("Disabled"),
  },
});
```

---

## 5. Luis Ouriach (Figma) Key Recommendations

1. **Staging Libraries pattern:** Create team-specific staging libraries as extensions of the global system. Components evolve: Local -> Staging -> Global. This prevents premature optimization of variants.

2. **Too many tokens:** At Converge 2025, Luis argued that teams create too many design tokens, especially for colors. Fewer tokens = fewer dimensions to vary.

3. **Multi-brand systems:** Use Figma variable collections with extended modes for multi-brand, not duplicate component sets.

4. **Simple Design System as reference:** Luis was the sole designer on Figma's Simple Design System, preloaded into every Figma account. It serves as a reference for lean component architecture.

5. **FRAILS framework:** Build components that are Flexible, Repeatable, Adoptable, Indexable, Logical, and Specific.

---

## 6. Summary: The Optimization Playbook

| # | Technique | Typical Reduction | Effort |
|---|-----------|:-----------------:|:------:|
| 1 | Boolean properties for show/hide | 50% per boolean | Low |
| 2 | Instance swap for icons/avatars | 80-95% for that dimension | Low |
| 3 | Slots for composable regions | 60-90% for complex components | Medium |
| 4 | Sub-component extraction | 40-60% (narrower scope) | Medium |
| 5 | Interactive components for states | 60-80% visible frame reduction | Medium |
| 6 | Variables for theme/mode | 50-75% (eliminates theme dimension) | Medium |
| 7 | P0/P1/P2 tiering | 70-80% visible reduction | Low |
| 8 | Naming alignment with code | 0% (but saves dev handoff time) | Low |

**Combined effect:** A naive button with 250 frames can be reduced to 12 visible P0 frames (95% reduction) while maintaining full design coverage through properties, variables, and interactive components.

---

## Sources

- [Material 3 Design Kit (Variables + Properties) | Figma Community](https://www.figma.com/community/file/1349722805300238798/material-3-design-kit-variables-properties)
- [All Buttons - Material Design 3](https://m3.material.io/components/all-buttons)
- [Carbon Design System - Button Usage](https://carbondesignsystem.com/components/button/usage/)
- [Carbon Design System Figma Kit](https://carbondesignsystem.com/designing/kits/figma/)
- [Polaris Components (Shopify) | Figma Community](https://www.figma.com/community/file/1571239587122046021/polaris-components-legacy)
- [Contributing to the Figma UI Kit - Shopify Polaris](https://polaris-react.shopify.com/contributing/figma-ui-kit)
- [Adobe Spectrum Design System | Figma Community](https://www.figma.com/community/file/1211274196563394418/adobe-spectrum-design-system)
- [React Spectrum Button](https://react-spectrum.adobe.com/react-spectrum/Button.html)
- [Introducing Spectrum 2](https://adobe.design/stories/design-for-scale/introducing-spectrum-2)
- [Creating and organizing Variants - Figma Best Practices](https://www.figma.com/best-practices/creating-and-organizing-variants/)
- [Explore component properties - Figma Help](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties)
- [Use slots to build flexible components - Figma Help](https://help.figma.com/hc/en-us/articles/38231200344599-Use-slots-to-build-flexible-components-in-Figma)
- [How to Supercharge your Design System with Slots | Figma Blog](https://www.figma.com/blog/supercharge-your-design-system-with-slots/)
- [Slots in Design Systems - Nathan Curtis](https://nathanacurtis.substack.com/p/slots-in-design-systems)
- [Configuration Collapse - Nathan Curtis](https://nathanacurtis.substack.com/p/configuration-collapse)
- [Implementing Slots in a Figma Library - Nathan Curtis](https://nathanacurtis.substack.com/p/implementing-slots-in-a-figma-library)
- [Figma Slots for Repeating Items - Nathan Curtis](https://nathanacurtis.substack.com/p/figma-slots-for-repeating-items)
- [Building Components For Consumption, Not Complexity (Part 1) - Smashing Magazine](https://www.smashingmagazine.com/2023/12/building-components-consumption-not-complexity-part1/)
- [Building Components For Consumption, Not Complexity (Part 2) - Smashing Magazine](https://www.smashingmagazine.com/2023/12/building-components-consumption-not-complexity-part2/)
- [The Shared Language of Props | Figma Blog](https://www.figma.com/blog/the-shared-language-of-props/)
- [When to use variants, component props, variables, or separate components](https://www.alicepackarddesign.com/blog/when-you-should-use-variants-vs-creating-separate-components)
- [Building complex Figma variants - Carol Chan](https://build.diligent.com/building-complex-figma-variants-e1005832c531)
- [Optimising the design system with Figma's variables | UX Collective](https://uxdesign.cc/optimising-your-design-system-with-figmas-variables-f3d9c4351bcc)
- [Connecting React components - Figma Developer Docs](https://developers.figma.com/docs/code-connect/react/)
- [Luis Ouriach - WaysConf 2025](https://www.waysconf.com/speaker/luis-ouriach)
- [Structuring and Splitting Large-Scale Figma Design Systems (2025)](https://medium.com/@claus.nisslmueller/structuring-and-splitting-large-scale-figma-design-systems-a-2025-master-guide-for-scalable-c1c3a7dabb0e)
