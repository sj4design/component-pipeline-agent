# Token Architecture — 3-Layer System

> Consensus from 6 Tier 1 design systems.

## The 3 layers

```
┌────────────────────────────────────────────────────┐
│ LAYER 3 · Component tokens                          │
│ Component-specific. Reference semantic tokens.      │
│ e.g., --datepicker-input-border-focus               │
│     value: {color.border.interactive.focus}          │
├────────────────────────────────────────────────────┤
│ LAYER 2 · Semantic tokens                           │
│ Usage intent. Reference primitives.                 │
│ e.g., --color-border-interactive-focus              │
│     value: {color.blue.500}                         │
├────────────────────────────────────────────────────┤
│ LAYER 1 · Primitive tokens                          │
│ Raw values. No usage context.                       │
│ e.g., --color-blue-500                              │
│     value: #3B82F6                                  │
└────────────────────────────────────────────────────┘
```

## How Tier 1 systems implement it

| System | Primitives | Semantic | Component | Tooling |
|--------|:----------:|:--------:|:---------:|---------|
| Spectrum (Adobe) | ✓ | ✓ | ✓ | Style Dictionary + Figma Variables |
| Material Design 3 | ✓ (ref) | ✓ (sys) | ✓ (comp) | Material Theme Builder |
| Carbon (IBM) | ✓ | ✓ | ✓ | Sass + Token Studio |
| Atlassian DS | ✓ | ✓ | partial | Figma Variables + CSS |
| Ant Design | ✓ (seed) | ✓ (map) | ✓ (alias) | ConfigProvider |
| Fluent UI | ✓ (global) | ✓ (alias) | partial | Griffel + tokens |

**Conclusion**: 3 layers is the standard. Difference between systems is naming and tooling, not architecture.

## Layer rules for the agent

```
Component tokens → ALWAYS reference semantic tokens (never raw values)
Semantic tokens  → Reference primitives (or raw values if no primitive layer)
Primitive tokens → Raw values (hex, px, rem, ms)

When user has:
  3 layers → map component tokens to their semantic layer
  2 layers → identify which is missing, propose it
  1 layer  → propose the other two
  0 layers → propose all three with placeholders
```

## Theme support via layers

```
Primitive tokens change per theme → semantic tokens inherit automatically
  Light theme: --color-blue-500 = #3B82F6
  Dark theme:  --color-blue-500 = #60A5FA

Semantic tokens are theme-agnostic names:
  --color-bg-primary = {color.neutral.50}  (resolves per theme)

Component tokens never change between themes:
  --dp-input-bg = var(--color-bg-primary)  (always the same reference)
```

---
_Source: Spectrum, M3, Carbon, Atlassian, Ant Design, Fluent UI documentation_
