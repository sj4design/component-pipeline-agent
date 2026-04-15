# Figma-to-Code Alignment: How Design Systems Bridge the Gap

## 1. Common Mismatches Between Design and Dev

### 1.1 Properties That Exist in One Side But Not the Other

**Figma-only properties (no code equivalent):**
- Visual arrangement helpers (padding overrides, layout direction toggles) that exist purely for Figma auto-layout but have no semantic meaning in code.
- "Show/hide" booleans for optional sub-layers (e.g., `Show Icon = true/false`) that in code are handled by the presence or absence of a child prop (`icon={<SearchIcon />}` vs omitting the prop entirely).
- Variant combinations created for documentation purposes (e.g., a "Docs Only" variant showing all states side by side).

**Code-only properties (no Figma equivalent):**
- Event handlers: `onClick`, `onChange`, `onBlur` -- no Figma representation.
- Accessibility props: `aria-label`, `aria-describedby`, `role` -- invisible in design.
- Behavioral logic: `autoFocus`, `tabIndex`, `form`, `name` -- purely runtime concerns.
- Data binding: `value`, `defaultValue`, `checked` -- Figma shows static snapshots.
- Ref forwarding, render props, polymorphic `as` prop -- React composition patterns with no visual analog.

**Nathan Curtis's "Code-Only Props" pattern:** A technique where hidden Figma layers (0.01px, clipped) carry TEXT and VARIANT props that correspond to code-only props like `aria-label` or `htmlType`. This makes the component API visible in Dev Mode even though it has no visual effect. The layer is named "Code only props" and sits at (0,0) inside the component root.

### 1.2 Disabled State: Figma vs React/CSS

| Aspect | Figma | React/CSS |
|--------|-------|-----------|
| **Modeling** | 9/10 design systems model `disabled` as a **variant value** (e.g., `State = Disabled`) | React uses a **separate boolean prop** (`disabled` or `isDisabled`) |
| **Combination** | Cannot combine `disabled + hover` or `disabled + focus` in most Figma setups because State is a single enum | Code handles combinations freely: a disabled button still receives focus in some implementations (`aria-disabled` vs HTML `disabled`) |
| **Interaction** | Static -- Figma does not natively animate opacity/cursor changes | CSS applies `opacity: 0.5; cursor: not-allowed; pointer-events: none` |
| **Accessibility** | No representation | `aria-disabled="true"` vs native `disabled` attribute have different behaviors: `aria-disabled` keeps the element focusable and in tab order |
| **Notable exception** | Atlassian ADS treats `isDisabled` as a **separate boolean property**, not a state variant, aligning better with React's model |

**The core problem:** Figma forces states into a single-axis enum (`State = default | hover | focus | disabled | error`), making combinations impossible. Code treats `disabled` as an orthogonal boolean that coexists with any other state. This leads to incomplete design specs and missing edge cases.

### 1.3 Loading/Skeleton States

| Aspect | Figma Approach | Code Approach |
|--------|---------------|---------------|
| **Representation** | Separate variant (`State = Loading`) or separate Skeleton component with static gray shapes | `isLoading` boolean prop that conditionally renders a Skeleton or spinner |
| **Granularity** | Usually one loading state per component | Can show partial loading (e.g., header loaded, body still loading) |
| **Animation** | Figma prototyping or "Smart Animate" to simulate shimmer; community plugins for animated skeletons | CSS `@keyframes` shimmer animation on `::before` pseudo-element, or libraries like `react-loading-skeleton` |
| **Composition** | Skeleton is often a separate, manually maintained component that must be kept in sync | Best practice: keep `ComponentSkeleton` in the same file as `Component` and export via dot-notation (`Component.Skeleton`) |
| **Token mapping** | Skeleton uses `surface-skeleton` and `surface-skeleton-subtle` color tokens | Same tokens resolved to CSS custom properties |

**Key gap:** Figma cannot express "progressive loading" where parts of a component load at different times. Designers create a single skeleton state; developers must handle multiple loading phases.

### 1.4 Icon Handling: Instance Swap vs Prop

| Figma (Instance Swap) | React (Prop) |
|----------------------|--------------|
| Designer drags an icon component from the library into an instance-swap slot | Developer passes `icon={<SearchIcon />}` or `icon="search"` |
| Constrained to components in the same library or enabled libraries | Can accept any React element, SVG, or icon string |
| Swap preserves size constraints set by the parent auto-layout | Developer must handle sizing via `size` prop or CSS |
| No "null" option -- must use a "Placeholder/Empty" icon component to hide | Simply omit the `icon` prop or pass `icon={null}` |

**Code Connect mapping:**
```jsx
props: {
  icon: figma.instance("Icon Instance"),  // returns JSX
  hasIcon: figma.boolean("Show Icon"),
}
// Usage: hasIcon && <Button icon={icon}>Label</Button>
```

**Common mismatch:** Some teams do not have individual React components per icon. Instead they use `<Icon name="search" />` with a string enum, while Figma uses individual icon component instances. Code Connect bridges this with `figma.instance()` mapping to a lookup table.

---

## 2. Code-to-Design Alignment Patterns

### 2.1 Figma Component Properties --> React Props Mapping

| Figma Property Type | Code Connect Helper | React Equivalent | Example |
|--------------------|--------------------|-----------------| --------|
| **Text** | `figma.string('Label')` | `label: string` | Button label, tooltip text |
| **Boolean** | `figma.boolean('Disabled')` | `disabled: boolean` | Show/hide icon, disabled state |
| **Instance Swap** | `figma.instance('Icon')` | `icon: ReactNode` | Icon slot, avatar slot |
| **Variant** | `figma.enum('Size', { Small: 'sm', Large: 'lg' })` | `size: 'sm' \| 'md' \| 'lg'` | Size, variant, type |

**Key insight:** In most cases, design and code props do NOT match 1:1. Code Connect exists specifically to handle the translation layer. You configure mappings so that the code shown in Figma Dev Mode accurately reflects what a developer would write.

### 2.2 Design Tokens as the Bridge

Design tokens are the contract between Figma and code:

```
Figma Variable                    -->  CSS Custom Property
────────────────────────────────       ─────────────────────
color/semantic/text-primary       -->  --color-semantic-text-primary
spacing/scale/4                   -->  --spacing-scale-4
border-radius/medium              -->  --border-radius-medium
```

**Token flow:**
1. Define tokens in Figma Variables (or Tokens Studio plugin)
2. Export as JSON (via Tokens Studio sync to Git, or Style Dictionary)
3. Transform to CSS custom properties, Tailwind config, or platform-specific formats
4. Reference in code: `color: var(--color-semantic-text-primary)`

**Token categories used across DS:**
- **Primitive tokens:** Raw values (`blue-500: #3B82F6`)
- **Semantic tokens:** Intent-based aliases (`text-primary: {blue-500}`)
- **Component tokens:** Scoped to component (`button-bg-primary: {blue-500}`)

**Ant Design** classifies tokens as Seed, Map, and Alias -- mapping directly from Figma Variables to `antd` theme config. Some tokens (like `zIndex`, motion) are omitted from Figma because they have no visual representation.

### 2.3 The "Design API" Concept

Treating a Figma component as having an API that mirrors code:

**Nathan Curtis's "Crafting Component API, Together" framework:**
1. **Anatomy** -- Establish the hierarchy of elements/groups that maps to web markup, Figma layers, AND object composition in code.
2. **Properties** -- Define props collaboratively (designer + developer) using a shared prop table with columns: Name, Type, Default, Description.
3. **Layout** -- Specify spacing, alignment, and responsiveness using tokens, not magic numbers.

**Key behaviors of aligned teams:**
- Developers invite designers to collaborate on property definitions
- Design specs use API constructs: sections for "Anatomy" and "Variants" instead of just screenshots
- Figma component property names match code prop names (`variant` not `Style`, `size` not `Scale`)
- Documentation shows Figma and code side by side

**Figma Code Connect** formalizes this by letting teams define `.figma.tsx` files that explicitly map every Figma property to its code counterpart. When a developer inspects a component in Dev Mode, they see real production code, not Figma-generated pseudo-code.

---

## 3. Specific Design System Approaches

### 3.1 Atlassian (ADS --> @atlaskit)

- **Unique approach to states:** Uses `isDisabled` as a **separate boolean property** rather than a state variant, aligning with React's model.
- **Token-driven:** Figma library uses Figma Variables with auto-layout, designed to match `@atlaskit` implementation.
- **Modern workflow (2025-2026):** Connected Figma MCP + ADS MCP + Rovo Dev CLI into a single pipeline: Figma design --> AI interpretation --> ADS-compliant code --> tested output.
- **ADS MCP** provides accessibility guidance alongside component APIs -- generated code includes ARIA labels, heading hierarchy, and keyboard navigation patterns.
- **Spacing alignment:** Major recent work on refining spacing logic across components to match code specs.

### 3.2 MUI (Material UI --> React)

- **Tight coupling:** Design Kit is built to be "as close to the React components as possible."
- **Shared terminology:** Uses the same prop names in Figma as in React (`variant`, `color`, `size`, `disabled`).
- **Token mapping:** Local variable collections contain color palettes, breakpoints, shapes, spacing tokens that map to MUI's default theme. Typography and shadow tokens are in local styles.
- **Scale:** ~1,500 unique elements covering Material UI, Joy UI, and MUI X.
- **Sync plugin (experimental):** Material UI Sync plugin attempts to keep Figma and code themes synchronized.
- **Integration tools:** Anima and Quest plugins detect MUI Figma components and generate correct React code with appropriate props.

### 3.3 Ant Design (Figma --> antd)

- **Variable alignment:** Figma variable names match Ant Design React token names exactly.
- **Built with native Figma features:** Variables, Auto Layout, Component Variants, and Properties -- "exactly the same as in the React version."
- **Token taxonomy:** Seed (global), Map (derived), Alias (component-specific) -- directly mapping to `antd` ConfigProvider theme.
- **Omissions:** Some design tokens are intentionally excluded from Figma (e.g., `zIndex`, `motion`) because they lack visual representation.
- **Best results:** Code generation tools perform best when using the official Ant Design Figma library because design elements closely align with `antd` components.

### 3.4 Carbon (Figma --> @carbon/react)

- **Full Code Connect integration:** `@carbon/react` is fully integrated with Figma Code Connect.
- **Prop mapping in Figma:** Maps component props directly within Figma, including nested components (e.g., Button inside Accordion item generates correct React code for both).
- **Rich code output:** Dropdown shows developers how to define items, set initial selection, handle `itemToString` conversion -- all matching Figma configuration.
- **Developer experience:** Developers see real Carbon React code within Figma Dev Mode: `import { Button, Modal } from '@carbon/react'`.

---

## 4. Anti-Patterns That Cause Gaps

### 4.1 Figma Variants That Don't Exist as Code Props

| Anti-pattern | Example | Better approach |
|-------------|---------|-----------------|
| **Documentation-only variants** | `State = "Anatomy"` variant showing labeled parts | Use a separate documentation page, not a variant |
| **Platform variants in one component** | `Platform = iOS / Android / Web` | Separate components per platform or use tokens |
| **Visual-only distinctions** | `Style = "Card" / "Flat"` when code uses `elevation` prop + CSS | Align naming: use `elevation` in both |
| **Figma layout workarounds** | `Layout = "3 items" / "4 items" / "5 items"` | In code, this is just `children.length` -- use slots or instance swap |

### 4.2 Code States Not Represented in Figma

| Missing in Figma | Why it matters |
|-----------------|----------------|
| **readonly + focus** | Figma's single-axis State enum cannot express this combination |
| **disabled + hover** | Users still hover over disabled elements; cursor changes matter |
| **error + focus** | Critical for form validation UX |
| **loading + partial content** | Progressive loading cannot be shown as a single static frame |
| **aria-invalid, aria-expanded** | Accessibility states with no visual representation |
| **Server-side states** | `isSubmitting`, `isValidating` -- ephemeral states absent from design |

### 4.3 Naming Mismatches Between Design and Dev

| Figma Name | Code Name | Problem |
|-----------|-----------|---------|
| `Type` | `variant` | Figma uses visual language, code uses API language |
| `Style` | `appearance` | Same disconnect |
| `Color` | `colorScheme` or `status` | "Color" is too vague in code |
| `Big / Medium / Small` | `lg / md / sm` | Figma spells out, code abbreviates |
| `On / Off` | `true / false` | Figma uses human labels, code uses booleans |
| `Show Icon` | `icon?: ReactNode` | Figma models presence as boolean, code models as optional prop |
| `Button / Link` | `as="button" \| "a"` | Figma creates separate variants, code uses polymorphic prop |

### 4.4 Structural Anti-Patterns

- **Random frame nesting:** Designers use frames for visual convenience; developers need semantic hierarchy. Extra wrapper frames create `<div>` soup in generated code.
- **Component bloat:** Having ~100 icon types x 3 sizes = 300 variants. Better: 3 size components, each with ~100 icon instance-swap options.
- **Variant export naming:** File name becomes concatenation of all variant properties (e.g., `Button-Primary-Large-Disabled-WithIcon.svg`), making programmatic use difficult.
- **Inconsistent naming conventions:** `camelCase` in some components, `PascalCase` in others, `kebab-case` in tokens. Without enforcement, the library becomes unusable.
- **States as variants vs. interactive components:** Using static variants for hover/focus instead of Figma's interactive components (prototype-based states), which bloats the variant count and doesn't show real interaction behavior.

---

## 5. Recommended Alignment Strategy

### 5.1 Naming Convention Contract

```
Component Name:  PascalCase (Button, TextInput, DataTable)
Prop Names:      camelCase, matching code (variant, size, isDisabled)
Variant Values:  lowercase, matching code enum values (primary, secondary, sm, md, lg)
Token Names:     kebab-case, matching CSS custom properties (color-text-primary)
```

### 5.2 Property Classification

Use a shared taxonomy for every prop:

| Category | Definition | Example |
|----------|-----------|---------|
| **Size** | Dimensions, density | `size: sm \| md \| lg` |
| **Variant** | Visual style | `variant: primary \| secondary \| ghost` |
| **State** | User interaction (mutually exclusive) | `hover \| focus \| active \| disabled` |
| **Status** | System condition (coexists with state) | `error \| warning \| success \| info` |
| **Boolean** | On/off toggles | `isLoading`, `isFullWidth`, `hasIcon` |
| **Content** | Text and rich content | `label`, `description`, `children` |
| **Slot** | Composable sub-elements | `icon`, `prefix`, `suffix`, `avatar` |

### 5.3 The Code Connect Bridge

For every component in the design system:

```tsx
// button.figma.tsx
import figma from "@figma/code-connect"
import { Button } from "./Button"

figma.connect(Button, "https://figma.com/file/xxx?node-id=1:23", {
  props: {
    label:    figma.string("Label"),
    variant:  figma.enum("Variant", { Primary: "primary", Secondary: "secondary" }),
    size:     figma.enum("Size", { Small: "sm", Medium: "md", Large: "lg" }),
    disabled: figma.boolean("Disabled"),
    icon:     figma.instance("Icon"),
  },
  example: ({ label, variant, size, disabled, icon }) => (
    <Button variant={variant} size={size} disabled={disabled} icon={icon}>
      {label}
    </Button>
  ),
})
```

---

## Sources

- [Figma Code Connect - React](https://developers.figma.com/docs/code-connect/react/)
- [Figma Component Properties](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties)
- [Nathan Curtis - "Code Only" Props in Figma](https://medium.com/@nathanacurtis/code-only-props-in-figma-854ca0815e7d)
- [Nathan Curtis - The Sorry State of States](https://medium.com/@nathanacurtis/the-sorry-state-of-states-89dd4668737e)
- [Nathan Curtis - Crafting Component API, Together](https://medium.com/eightshapes-llc/crafting-ui-component-api-together-81946d140371)
- [Nathan Curtis - Configuration Collapse](https://medium.com/@nathanacurtis/configuration-collapse-5a1d68b4c672)
- [MUI for Figma](https://mui.com/material-ui/design-resources/material-ui-for-figma/)
- [Ant Design System for Figma](https://www.antforfigma.com)
- [Carbon and Figma Code Connect](https://medium.com/carbondesign/carbon-and-figma-code-connect-redefining-the-design-to-code-experience-836eb3f454fc)
- [Atlassian Design System](https://atlassian.design/components/)
- [Atlassian Figma + MCP Workflow](https://www.atlassian.com/blog/developer/redesigning-homepage-20-minutes-with-rovo-dev)
- [Design Tokens in Practice](https://www.designsystemscollective.com/design-tokens-in-practice-from-figma-variables-to-production-code-fd40aeccd6f5)
- [Figma to Code Workflow with Design Tokens](https://thefrontkit.com/blogs/figma-to-code-workflow-for-design-engineers)
- [Your Design System Works in Figma. Does It Work in Code?](https://uxmag.com/articles/your-design-system-works-in-figma-does-it-work-in-code)
- [Figma Code Connect GitHub](https://github.com/figma/code-connect)
- [Figma Simple Design System (SDS)](https://github.com/figma/sds)
- [Builder.io - Figma Design System Component Mapping](https://www.builder.io/blog/figma-design-system-component-mapping)
