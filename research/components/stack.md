---
component: stack
date: 2026-04-17
mode: --max
systems: 24
scope: all
---

# Stack — Research (--max mode)

## Sistemas sin componente dedicado

| System | Reason | Workaround |
|--------|--------|------------|
| Material Design 3 | No native M3 Stack in official spec; MUI layer provides it as community extension | MUI Stack (community); CSS flexbox directly |
| Salesforce Lightning | Grid-first layout (lightning-layout); no stack primitive in component library | lightning-layout with multiple-rows + horizontal-align attributes |
| GOV.UK | Layout via CSS grid classes; government page layouts are grid-first, not flexbox-first | govuk-grid-row + govuk-grid-column-* CSS classes |
| Base Web (Uber) | Block component with display="flex" serves as the primitive; no dedicated Stack | `<Block display="flex" flexDirection="column" gridGap="scale400">` |
| Fluent 2 (Microsoft) | Stack existed in v8 but was intentionally removed in v9; teams recommended to use native CSS | Native CSS flexbox/grid; Fluent v9 considers Stack redundant with modern CSS |
| Evergreen (Segment) | Pane component with flex props as layout primitive | `<Pane display="flex" flexDirection="column" gap={8}>` |
| shadcn/ui | CSS-first philosophy; Tailwind utility classes replace abstracted layout components | `flex flex-col gap-4` Tailwind classes; no component boundary |
| REI Cedar | Grid-based layout system (CdrGrid/CdrRow/CdrCol); no flexbox stack primitive | CdrGrid for multi-column; CSS flexbox directly |

---

## How Systems Solve It

### MUI / Material Design 3

MUI's `Stack` is a convenience wrapper around CSS flexbox for one-dimensional layout. It handles direction (row/column), spacing via the theme scale, and dividers between children. The key differentiator is `divider` prop: it accepts a React element (usually `<Divider />`) and inserts it automatically between every child — solving the common "separator except after the last item" CSS problem. Responsive direction is supported via object/array syntax. Stack is polymorphic via `component` prop. The `useFlexGap` boolean switches from negative-margin-based spacing to native CSS `gap` — the modern approach that works correctly with wrapping children.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| `divider` prop inserts element between children | Eliminates "border-bottom on all but last" CSS hack; most ergonomic divider API in T1 | H | Use if your stacks frequently need dividers between items |
| `useFlexGap` for native CSS gap | Native gap works correctly with wrapping; negative-margin-based spacing breaks with `flexWrap` | H | Enable by default in modern apps |
| Responsive direction via object syntax | `direction={{ xs: 'column', sm: 'row' }}` — mobile-first stacking | M | Standard responsive pattern |
| Polymorphic `component` prop | Render as `nav`, `ul`, or any semantic element | M | Required for semantic HTML when stack is a list or nav |

**Notable API**: `direction` (with responsive object); `spacing`; `divider` (ReactNode); `useFlexGap`; `component` (polymorphic)

**Accessibility**: No ARIA behavior; purely visual layout. Polymorphic `component` prop enables semantic element choice.

---

### Spectrum (Adobe)

Spectrum's `Flex` is a typed wrapper over CSS flexbox that exposes every standard flexbox property as a first-class prop. Unlike other systems that add opinions on top of flexbox, Spectrum's approach is near-zero abstraction: developers who know CSS flexbox have zero learning curve. All `gap`, `rowGap`, and `columnGap` props use `DimensionValue` tokens (`"size-100"`, `"size-200"`), ensuring spacing always aligns to the 4px grid. No divider support. No polymorphic element. A single `Flex` component with `direction="column"` replaces Stack; `direction="row"` replaces Inline — fewer names to learn but less semantic clarity.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Full flexbox property parity | Teams familiar with CSS flexbox have zero learning curve; no abstraction gap | M | Good for developer-centric DS with strong CSS expectations |
| DimensionValue typed spacing | Spacing always on the 4px grid; off-scale values rejected | H | Strongest spacing enforcement mechanism in T1 |
| Single component handles all axes | Less API surface; fewer names to learn | M | Trade-off: less semantic than separate Stack/Inline |
| UNSAFE_className escape hatch | Explicit escape valve for needed customization | L | Document when escape hatches are appropriate |

**Notable API**: `direction`; `wrap`; `gap`; `rowGap`; `columnGap`; `justifyContent`; `alignItems`; `alignContent`; `UNSAFE_className`; `UNSAFE_style`

**Accessibility**: No ARIA behavior; purely visual layout. Semantic element is consumer's responsibility.

---

### Carbon (IBM)

Carbon's `Stack` is intentionally minimal — direction and gap are its only concerns. The `gap` prop accepts integer indices (1–13) mapping directly to Carbon's 2px-based spacing scale, making off-scale spacing impossible without escaping to CSS. The `orientation` prop uses `"vertical"` / `"horizontal"` over CSS flexbox `direction` terminology — more semantic, less familiar to CSS-native developers. No wrap, no alignment props, no divider. Carbon's FlexGrid and Grid handle anything more complex.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Gap as spacing-scale index (1–13) | Impossible to use off-scale spacing without CSS override | H | Strongest spacing constraint enforcement in T1; trade-off is inflexibility |
| `orientation` over `direction` | Semantic naming; less tied to CSS implementation details | L | Controversial — CSS devs expect `direction` |
| Minimal API (no align/justify) | Does one thing — spacing in one direction | M | Forces teams to use FlexGrid for anything complex |

**Notable API**: `orientation` (vertical|horizontal); `gap` (1–13, Carbon spacing scale index)

**Accessibility**: No ARIA behavior; layout utility only.

---

### Polaris (Shopify)

Polaris's most distinctive architectural choice: two separate components rather than one with a direction prop. `InlineStack` handles horizontal layout; `BlockStack` handles vertical layout. The naming follows CSS logical properties (`inline` = horizontal in LTR, `block` = vertical), making RTL support implicit — no direction-dependent assumptions in the component names. Each component has a focused API with only the props relevant to its axis (wrap only exists on InlineStack since vertical wrapping is rare). Responsive `gap` via objects is supported.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Two components (InlineStack / BlockStack) | Each has focused API; no unused props; `wrap` only makes sense on InlineStack | M | Prevents "what does alignItems mean in column mode?" confusion |
| Logical property naming (inline/block) | RTL support implicit; no direction-dependent assumptions | H | Future-proof for internationalized apps |
| Responsive gap via objects | `gap={{ xs: '200', md: '400' }}` — breakpoint-aware spacing | M | Standard responsive pattern |

**Notable API**: `BlockStack`: `gap`, `align`, `inlineAlign`; `InlineStack`: `gap`, `align`, `blockAlign`, `wrap`; both support responsive `gap` objects

**Accessibility**: No ARIA behavior. Documentation emphasizes using semantic elements as children.

---

### Atlassian

Atlassian's three-tier progressive disclosure architecture is the most thoughtful layout system in the research set. `Stack` (vertical) and `Inline` (horizontal) are constrained wrappers for common cases; `Flex` is the full-flexbox escape hatch. All three support the `as` prop for polymorphic rendering. Stack has a `separator` prop for dividers. Inline has a `spread` prop (shorthand for `justifyContent="space-between"`) — naming a common pattern explicitly. The three-tier approach gives developers an obvious escalation path: use Stack/Inline first, drop to Flex when needed.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Three-tier architecture (Stack → Inline → Flex) | Progressive disclosure: common cases are simple; complex cases use full flexbox | H | Best conceptual model for a layout system |
| `separator` on Stack | Common divider pattern acknowledged as first-class | M | Copy this pattern |
| `spread` on Inline | Names the most common horizontal distribution pattern explicitly | M | Reduces "how do I distribute children evenly?" questions |
| `as` prop on all three | Polymorphic semantic element rendering | H | Required for a11y when layout container needs semantics |

**Notable API**: Stack: `space`, `alignInline`, `alignBlock`, `separator`, `grow`; Inline: `space`, `alignInline`, `alignBlock`, `spread`, `shouldWrap`; Flex: full flexbox; all support `as`

**Accessibility**: No ARIA behavior; `as` prop enables semantic elements; documentation recommends semantic children.

---

### Ant Design

Ant Design has two overlapping layout primitives: `Space` (the original, widely used) and `Flex` (added in v5, recommended for new code). Space provides `split` prop for dividers; `Space.Compact` is a unique pattern — it removes gaps and merges borders between children, creating grouped button/input controls that appear as a single visual unit. Flex is a thin flexbox wrapper. Both coexist without deprecation, creating migration complexity. Flex's use of a `vertical` boolean instead of a `direction` prop is a notable API inconsistency.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| `Space.Compact` for merged-border groups | Grouped buttons/inputs appearing as one visual unit; unique pattern | H | Most useful for button groups, select+input combos |
| `split` on Space | Clean divider insertion; equivalent to MUI divider / Atlassian separator | M | Confirmed cross-system pattern |
| Space + Flex coexistence | Migration burden; unclear which to use for new code | H | Avoid this pattern — choose one and document migration |

**Notable API**: Space: `direction`, `size` (small/middle/large or number), `wrap`, `split`, `align`; Space.Compact: `direction`, `size`, `block`; Flex: `vertical`, `gap`, `wrap`, `justify`, `align`

**Accessibility**: No ARIA behavior. No polymorphic element on Space; Flex supports `component` prop.

---

### Tier 2 Systems

| System | Name | Key Differentiation |
|--------|------|---------------------|
| Twilio Paste | Stack / Inline | Separate vertical/horizontal; token-based spacing; orientation prop |
| Salesforce Lightning | lightning-layout | Grid-based; no stack primitive |
| GitHub Primer | Stack | Single component with `direction`, `gap`, `align`, `justify`, `wrap`, `padding`; responsive object syntax |
| shadcn/ui | — | No component; Tailwind utilities |
| Playbook | FlexItem / Flex | `orientation`, `spacing`, `justify` with Playbook tokens |
| REI Cedar | CdrGrid/CdrRow/CdrCol | Grid-based; no stack |
| Wise Design | Stack | Minimal; direction + spacing |
| Dell Design System | Stack / Flex | Density-aware spacing (compact/comfortable/spacious) |

---

### Tier 3 Systems

| System | Name | Key Differentiation |
|--------|------|---------------------|
| Radix UI | Flex | Headless; typed flexbox props; responsive prop objects; `as` polymorphism |
| Chakra UI | Stack / VStack / HStack | Three named variants; `divider` prop; responsive direction |
| GOV.UK | — | Grid classes only; no flexbox stack |
| Base Web | Block (with flex) | No dedicated Stack; Block as general-purpose layout primitive |
| Fluent 2 | Stack (v8) → removed in v9 | Intentionally removed; native CSS recommended |
| Gestalt | Flex / Box | `direction`, `gap` constrained to Gestalt spacing scale |
| Mantine | Stack / Group / Flex | Stack (vertical), Group (horizontal + alignment + `grow`), Flex (full) |
| Orbit | Stack | Five named breakpoint props for responsive direction + spacing |
| Evergreen | Pane (flex props) | No dedicated Stack; Pane as layout primitive |
| Nord | nord-stack | Web component; `direction`, `gap`, `wrap`, `align-items`, `justify-content` as HTML attributes |

---

## Pipeline Hints

### Archetype Recommendation

**Archetype: Layout primitive (presentational)**

Stack is a pure layout utility with no interactivity, no ARIA semantics, and no content of its own. It is a thin wrapper over CSS flexbox that enforces spacing tokens and provides a semantic naming layer. The correct archetype is a single-element container with token-constrained spacing props. The key architectural decision is whether to use one component (Spectrum/MUI pattern) or two (Polaris InlineStack/BlockStack pattern). The two-component pattern is architecturally sounder for RTL support and focused APIs, but the one-component pattern is simpler to learn.

---

### Slot Consensus

| Slot | Consensus | Notes |
|------|-----------|-------|
| children | 24/24 | Layout children — the items being stacked |
| divider/separator | 6/18 systems with component | MUI `divider`, Atlassian `separator`, Ant Design `split`, Chakra `StackDivider`; common enough to include |

---

### Property Consensus

| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| direction / orientation | row, column, row-reverse, column-reverse | 15/18 | Polaris uses inline/block naming; Carbon uses orientation |
| gap / spacing / space | token values (scale indices, CSS vars, or named tokens) | 18/18 | All systems constrain to design tokens |
| wrap | boolean or `wrap`/`nowrap`/`wrap-reverse` | 10/18 | Only on horizontal stacks in split-component systems |
| align / alignItems | flex-start, center, flex-end, stretch, baseline | 13/18 | Naming varies; most expose the CSS value |
| justify / justifyContent | flex-start, center, flex-end, space-between, space-around | 12/18 | Naming varies |
| as / component | any HTML element string or React component | 10/18 | Required for semantic rendering |

---

### Boolean Properties

| Property | Default | Adopters |
|----------|---------|---------|
| wrap / shouldWrap | false | Polaris, Atlassian Inline |
| grow | false | Atlassian Stack |
| spread | false | Atlassian Inline (space-between shorthand) |
| useFlexGap | false | MUI (enables native CSS gap) |
| vertical | false | Ant Design Flex (unusual — `direction` is standard) |

---

### State Coverage

Stack has no interactive states. Visual states are purely structural.

| Variant | Adopters | Notes |
|---------|---------|-------|
| Vertical (default) | All | Column direction |
| Horizontal | All | Row direction |
| With dividers | MUI, Atlassian, Ant Design, Chakra | Separator between children |
| Responsive direction | MUI, Primer, Orbit, Radix, Chakra | Direction changes at breakpoints |
| Compact/grouped | Ant Design Space.Compact | Merged borders, no gaps |
| Dense | Dell | Density-aware spacing (compact/comfortable/spacious) |

---

### Exclusion Patterns

- Stack is NOT a grid; do NOT use for two-dimensional layouts — use Grid for that
- Stack has NO ARIA semantics; do NOT add roles or aria attributes to the Stack container itself
- Stack is NOT polymorphic by default; ensure `as` prop is available for semantic rendering
- Do NOT allow arbitrary pixel spacing values — constrain all gap props to design tokens
- Fluent 2's removal of Stack in v9 is a valid data point: evaluate whether a Stack component is needed at all vs. native CSS with token-based utility classes

---

### Building Block Candidates

- **InlineStack** (horizontal): `direction="row"` with `wrap` and `gap`; optimized for peer-element grouping
- **BlockStack** (vertical): `direction="column"` with `gap`; optimized for content stacking
- **Stack.Compact** (Ant Design pattern): merged-border variant for grouped controls (button groups, input+select combos)
- **StackDivider** / **Separator**: the element inserted between stack children; should be composable separately

---

### Enum / Configuration Properties

| Property | Values | Notes |
|----------|--------|-------|
| direction | `row`, `column`, `row-reverse`, `column-reverse` | MUI/Spectrum naming |
| orientation | `vertical`, `horizontal` | Carbon naming |
| gap / spacing / space | token values — varies by system | Always constrain to tokens |
| align | `start`, `center`, `end`, `stretch`, `baseline` | CSS logical property naming preferred |
| justify | `start`, `center`, `end`, `space-between`, `space-around`, `space-evenly` | |

---

### A11y Consensus

| Topic | Consensus |
|-------|-----------|
| Role | None — Stack is purely visual |
| ARIA attributes | None — no ARIA on Stack container |
| Semantic rendering | Use `as` / `component` prop to render as `nav`, `ul`, `section`, etc. when content requires it |
| Children semantics | Consumer's responsibility; Stack itself provides no semantic structure |
| Focus management | N/A — Stack is non-interactive |
| APG Pattern | None — layout primitive with no ARIA pattern |

---

## What Everyone Agrees On

1. **Stack is a purely visual layout utility** — no ARIA semantics, no roles, no keyboard behavior. Consistent across all 24 systems.
2. **Spacing must be constrained to design tokens** — every system uses token indices, named tokens, or a DimensionValue type to prevent arbitrary pixel spacing. Off-scale spacing is the primary quality problem Stack solves.
3. **One-dimensional only** — Stack handles a single axis; two-dimensional layouts use Grid. No system conflates these concerns in Stack.
4. **Semantic element rendering requires a polymorphic prop** — `as` / `component` / `is` prop is the cross-system consensus for enabling semantic HTML when the stack's layout context has meaning (nav, ul, section).
5. **Dividers between children are a common enough pattern** — MUI, Atlassian, Ant Design, and Chakra all ship divider support. The "border-bottom on all but last" problem is universally acknowledged.
6. **Native CSS gap over negative-margin spacing** — MUI's `useFlexGap` is the only explicit switch, but the trend across T3 systems is toward native CSS gap as the default implementation. Negative margins cause layout bugs with wrapping.

---

## Where They Disagree

### 1. One component vs. two components (direction as prop vs. separate names)
**Option A (One)**: `<Stack direction="column">` / `<Stack direction="row">` — MUI, Spectrum Flex, Carbon, Radix  
**Option B (Two)**: `<BlockStack>` + `<InlineStack>` — Polaris; `<Stack>` + `<Inline>` — Atlassian, Paste; `<VStack>` + `<HStack>` — Chakra

- Adopters A: MUI, Spectrum, Carbon, Radix, Orbit, Gestalt  
- Adopters B: Polaris, Atlassian, Paste, Chakra, Mantine (Stack + Group)  
- Upside A: Single import, simple mental model  
- Downside A: `alignItems` means different things in row vs. column — confusing  
- Upside B: Focused API per axis; `wrap` only where it makes sense; clearer alignment semantics  
- Downside B: Two imports; which to use is an additional decision  
- Para tu caso: Two-component pattern is architecturally cleaner, especially for RTL. Polaris's logical property naming (InlineStack/BlockStack) is future-proof.

### 2. Token constraint method: named tokens vs. scale indices vs. enum sizes
**Option A (Named tokens)**: `gap="size-200"` — Spectrum  
**Option B (Scale indices)**: `gap={3}` — Carbon (1–13 mapping)  
**Option C (Semantic sizes)**: `gap="sm"` or `gap={4}` — MUI/Chakra/most

- Adopters A: Spectrum, Gestalt, Nord  
- Adopters B: Carbon  
- Adopters C: MUI, Polaris, Atlassian, Primer, most T3  
- Upside A: Maximum token fidelity; explicit DS vocabulary  
- Upside B: Enforced on-scale; impossible to go off-scale  
- Upside C: Most familiar; flexible  
- Para tu caso: Named tokens are most explicit; scale indices are most enforced; semantic sizes are most accessible to new developers.

### 3. Whether to include a Stack component at all
**Option A (Include)**: Dedicate Stack component — most systems  
**Option B (Exclude)**: Remove in favor of native CSS — Fluent 2 v9, shadcn/ui, GOV.UK, Base Web, Evergreen

- Adopters A: MUI, Spectrum, Carbon, Polaris, Atlassian, Ant Design, Chakra, Paste, Primer, Mantine, Orbit, Nord  
- Adopters B: Fluent 2 v9, shadcn/ui, GOV.UK, Base Web, Evergreen  
- Upside A: Token enforcement; DX ergonomics; consistent spacing  
- Downside A: Abstraction cost; maintenance burden; learned CSS knowledge less transferable  
- Upside B: Modern CSS gap is native; no abstraction needed; developers keep CSS skills  
- Downside B: Spacing consistency harder to enforce without component boundary  
- Para tu caso: Fluent 2's removal is the strongest anti-Stack argument and worth reading. Stack is most valuable when you need to enforce spacing tokens at the component level.

### 4. Divider support built-in vs. consumer composition
**Option A (Built-in)**: `divider={<Separator />}` — MUI, Atlassian, Ant Design, Chakra  
**Option B (Manual)**: Team places `<Divider />` between items themselves — Carbon, Spectrum, Polaris

- Adopters A: MUI, Atlassian (separator on Stack), Ant Design, Chakra, Radix's community  
- Adopters B: Carbon, Spectrum, Polaris, most T3  
- Upside A: Solves "last-child border" problem ergonomically; consistent spacing  
- Downside A: Adds complexity to the component  
- Upside B: Simple component; maximum flexibility  
- Para tu caso: Include `separator` / `divider` prop — it appears in 4 major systems and solves a common CSS problem.

### 5. Responsive direction switching
**Option A (Prop-level)**: `direction={{ xs: 'column', sm: 'row' }}` — MUI, Primer, Radix, Orbit  
**Option B (CSS breakpoints)**: Media queries in CSS; no responsive props — Spectrum, Carbon, GOV.UK  
**Option C (Conditional render)**: Conditionally render BlockStack vs. InlineStack — Polaris

- Adopters A: MUI, Primer, Radix, Chakra, Orbit  
- Adopters B: Spectrum, Carbon, Atlassian Flex  
- Adopters C: Polaris  
- Upside A: Co-located responsive logic; props-level breakpoints are React-idiomatic  
- Downside A: Complexity in prop types; breakpoints may not align with DS breakpoint system  
- Para tu caso: Responsive direction is a high-value feature for stacks used in card layouts; implement if your breakpoint system is token-based.

---

## Visual Patterns Found

| Pattern | Description | Best For | Adopted By |
|---------|-------------|----------|------------|
| Vertical stack (default) | Children arranged top-to-bottom with uniform gap | Content stacking, form fields, sidebar nav | All |
| Horizontal inline | Children arranged left-to-right with uniform gap | Button groups, tags, icon+label combos | All |
| Divider stack | Separator element between each child | Lists with visual separation, settings sections | MUI, Atlassian, Ant Design, Chakra |
| Compact / merged border | No gap; borders merged between children | Button groups, input+select combos | Ant Design Space.Compact |
| Responsive flip | Column on mobile, row on desktop | Card grids, stat rows, navigation items | MUI, Primer, Orbit, Chakra |
| Spread inline | Children distributed with space-between | Toolbar items, header left/right | Atlassian Inline `spread` |

### ASCII Wireframes

**BlockStack (vertical)**
```
┌─────────────────────┐
│  ┌───────────────┐  │
│  │   Item 1      │  │
│  └───────────────┘  │
│  ├───────────────┤  │  ← gap (token)
│  ┌───────────────┐  │
│  │   Item 2      │  │
│  └───────────────┘  │
│  ├───────────────┤  │
│  ┌───────────────┐  │
│  │   Item 3      │  │
│  └───────────────┘  │
└─────────────────────┘
```

**InlineStack (horizontal)**
```
┌──────────────────────────────────────┐
│  ┌────────┐  ┌────────┐  ┌────────┐ │
│  │ Item 1 │  │ Item 2 │  │ Item 3 │ │
│  └────────┘  └────────┘  └────────┘ │
└──────────────────────────────────────┘
```

**Stack with Dividers**
```
┌─────────────────────┐
│  ┌───────────────┐  │
│  │   Item 1      │  │
│  └───────────────┘  │
│  ─────────────────  │  ← divider/separator
│  ┌───────────────┐  │
│  │   Item 2      │  │
│  └───────────────┘  │
│  ─────────────────  │
│  ┌───────────────┐  │
│  │   Item 3      │  │
│  └───────────────┘  │
└─────────────────────┘
```

**Space.Compact (merged borders)**
```
┌────────────────────────────────────────┐
│  ┌──────────┬──────────┬────────────┐  │
│  │  Button1 │  Button2 │  Button3   │  │
│  └──────────┴──────────┴────────────┘  │
└────────────────────────────────────────┘
(no gaps; shared borders; appears as single unit)
```

**Responsive flip pattern**
```
Mobile (column):          Desktop (row):
┌─────────────────┐       ┌──────┐ ┌──────┐ ┌──────┐
│ ┌─────────────┐ │       │Stat 1│ │Stat 2│ │Stat 3│
│ │   Stat 1    │ │       └──────┘ └──────┘ └──────┘
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │   Stat 2    │ │
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │   Stat 3    │ │
│ └─────────────┘ │
└─────────────────┘
```

---

## Risks to Consider

### 1. Spacing token enforcement weakens with arbitrary values — HIGH
The core value of a Stack component over `display: flex` is that spacing must be from the design system scale. If `gap` accepts arbitrary numbers or strings (pixels, rems), teams bypass the token system and introduce inconsistency. Once arbitrary spacing is allowed, the component's primary benefit is lost.

**Mitigation**: Type the `gap` prop as `SpacingToken` (union of allowed token values). Reject arbitrary pixel values at the TypeScript level. If a value is not on the scale, the developer must use the design token — force the conversation.

### 2. Fluent 2's Stack removal may be the right call — MEDIUM
Microsoft's decision to remove Stack in Fluent v9 is a strong signal that a dedicated Stack component may not be worth the maintenance cost in modern applications. CSS gap is now universally supported; CSS custom properties can enforce spacing tokens; utility classes (Tailwind-style) can replace the component entirely. The anti-Stack position is not fringe — it has a legitimate architectural argument.

**Mitigation**: Evaluate whether Stack primarily solves token enforcement (in which case CSS custom property tokens may suffice) or provides meaningful DX ergonomics. If the answer is DX ergonomics, invest in the component. If it's purely token enforcement, consider a CSS-first approach with token utilities.

### 3. Semantic rendering is frequently forgotten — MEDIUM
Stack renders as `<div>` by default everywhere. When a vertical stack is a navigation list, that `<div>` breaks screen reader navigation. The `as` / `component` prop must exist but teams routinely forget to use it when building navs, lists, and sections.

**Mitigation**: Provide the `as` / `component` prop. Add linting rules (custom ESLint) or documentation that flags stacks used as navigations, lists, or sections without semantic element override.

### 4. Alignment semantics in single direction vs. cross-axis naming — LOW
`alignItems` and `justifyContent` mean different things depending on whether `direction="column"` or `direction="row"`. This is a fundamental flexbox ambiguity that confuses developers regularly — "do I want `align` or `justify` to center my items vertically?" The two-component pattern (BlockStack + InlineStack) avoids this by providing axis-specific alignment prop names.

**Mitigation**: Document the alignment semantics clearly with interactive examples. If using two components, name the alignment props relative to the axis (main-axis / cross-axis) rather than using flexbox vocabulary directly.

---

## Next Steps

1. **Choose architecture**: One Stack component with `direction` prop vs. two (BlockStack + InlineStack). Polaris's two-component logical-property approach is recommended for RTL-ready, focused APIs.
2. **Type the `gap` prop strictly**: Union type of allowed token values; no arbitrary pixel values. This is the primary value proposition of the component.
3. **Add `as` / `component` polymorphic prop**: Essential for semantic HTML. Default to `div`; document when to override.
4. **Include `separator` / `divider` prop**: Cross-system consensus (4 major systems); solves a real CSS problem.
5. **Add responsive `gap` object syntax**: High-value for card layouts and KPI strips that change column count at breakpoints.
6. **Evaluate whether to include Stack at all**: Read Fluent 2's removal rationale before committing to a Stack component. If your DS has strong token-based utility classes, Stack may be redundant.
