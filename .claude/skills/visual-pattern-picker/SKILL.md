---
name: visual-pattern-picker
description: Use when a guided flow needs to ask the user to choose between visually distinct patterns or layouts (not simple yes/no or short labels) — renders an interactive visual picker (wireframe icons showing each pattern + a plain-language description + which design systems/sources use it) via the visualize widget tool, with automatic fallback to AskUserQuestion when that tool isn't connected.
---

# Visual Pattern Picker

Renders a scope question as a list of clickable rows — wireframe icon, title, description, systems — instead of plain text options, for questions where seeing the shape of each option matters more than reading its label alone (component archetypes, layout patterns, use-case variants).

## When to use

- The question is about a **visual pattern**, not a boolean or a short label (e.g. "¿qué patrón de calendario necesitas?", "¿para qué se usa este popover?")
- Each option has a genuinely different visual shape (not just a color or a number)
- You have (or can derive) which reference design systems use each pattern — this becomes part of the row's subtitle

Do NOT use this for simple boolean/enum questions (sizes, on/off toggles, single-word categories) — use `AskUserQuestion` directly, it's faster and cheaper in tokens.

## Availability check

Before using this skill, confirm `mcp__visualize__show_widget` is reachable (check the deferred-tools listing, or try `ToolSearch` with query `"select:mcp__visualize__show_widget"`). If it is not available in this session/client:

**Fall back to `AskUserQuestion`** with the same options (label + description text only, no wireframe). Never block the guided flow on this skill being available — it's a visual enhancement, not a requirement.

## Building the widget

1. Call `mcp__visualize__read_me` with `modules: ["elicitation"]` once per session if you haven't already (loads the `.elicit-*` CSS contract).
2. Use the standard elicitation form shell (header with the fixed File icon, `.elicit-body`, `.elicit-footer` with Skip/Continue) — see the elicitation module for the exact byte-for-byte header SVG.
3. **Layout: a vertical list of full-width rows, icon on the left.** Not a grid of centered tiles — once a real description is included (required, see below), centered tiles waste width and squeeze text into narrow columns. A left-icon row scales cleanly regardless of option count (3, 4, 6+) with zero grid-width math, since it's a plain vertical stack (`display:flex; flex-direction:column; gap:10px` on the container).
4. Each row (`.elicit-pill`) has FOUR required pieces — an icon-only option with just a system badge is not enough context to decide (this was flagged in review):
   1. The bare SVG wireframe (no circular/chip background) — see **Wireframe rules** below
   2. The option label (14px, weight 500)
   3. A description of when/why to use this pattern (12px, `var(--text-secondary)`) — see **Description rules** below
   4. A muted subtitle naming the systems that use this pattern (10px, `var(--text-muted)`)

### Reference row (copy this structure)

```html
<div class="elicit-pills" data-name="use_case" data-multi="false" style="display:flex; flex-direction:column; gap:10px;">
  <button type="button" class="elicit-pill" data-value="contextual-help"
    style="width:100%; border-radius:12px; padding:12px 16px; display:flex; align-items:center; gap:16px; text-align:left; box-shadow:0 1px 2px rgba(0,0,0,0.04)">
    <svg width="62" height="52" viewBox="0 0 48 40" fill="none" stroke="currentColor" stroke-width="1.5" style="flex-shrink:0">
      <circle cx="24" cy="7" r="6"/>
      <text x="24" y="10.5" font-size="9" text-anchor="middle" fill="currentColor" stroke="none" font-family="sans-serif" font-weight="bold">?</text>
      <path d="M20 21 l4 -4 l4 4"/>
      <rect x="6" y="21" width="36" height="15" rx="2"/>
      <line x1="10" y1="27" x2="38" y2="27"/>
      <line x1="10" y1="31" x2="26" y2="31"/>
    </svg>
    <span style="display:flex; flex-direction:column; gap:2px">
      <span style="font-size:14px; font-weight:500">Ayuda contextual</span>
      <span style="font-size:12px; color:var(--text-secondary); line-height:1.4">Cuando un campo o función necesita una breve explicación sin ocupar espacio permanente en la pantalla — el usuario hace clic en el ? y aparece la explicación, sin interrumpir el resto del formulario (ej. explicar qué hace una opción técnica de configuración)</span>
      <span style="font-size:10px; color:var(--text-muted)">Spectrum · Carbon</span>
    </span>
  </button>
  <!-- more rows… -->
</div>
```

### Alternate layout (rare): grid of tiles with no description

Only when a picker is genuinely icon-only with no meaningful description text (uncommon — most pattern questions carry a `description` already, so default to the list above). If you do need it, use CSS Grid, never `flex`:

```css
display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:12px;
```

| # options | Behavior |
|---|---|
| 2–3 | Each grows to fill the row evenly — wider tiles, no dead space |
| 4 | Fills the row exactly |
| 5+ | As many as fit at ≥140px share the row; the rest wrap to a new row at the same column width — a lone leftover tile does NOT stretch to fill the whole row |

Never use `display:flex` with `flex: 1 1 140px` for this — a single item left over on the last row grows to fill the entire row width, which looks broken. Grid `auto-fit` avoids that because column tracks are shared across all rows.

## Description rules

Write each description as a plain-language explanation of what happens and when to use it — not a jargon dump, and not a restatement of the label ("icono de ayuda" is not a description of "ayuda contextual", it's the same word twice). If `hints/[comp].json`'s description leans on unexplained shorthand ("non-modal", "focus trap", "tooltips ricos"), rewrite it in plain terms instead of copying it verbatim.

**Test:** could someone who's never seen this component's spec understand **when to reach for this option** from the description alone? If not, rewrite it.

**Structure every description the same way**, so no option in the question reads thinner than its siblings:
1. **When** — the situation that calls for this pattern ("cuando un campo necesita...", "antes de una acción destructiva...")
2. **What happens** — the actual behavior triggered (opens without blocking, asks for confirmation, traps focus, etc.)
3. **Example** — one concrete, named scenario in parentheses

e.g. "Cuando un campo o función necesita una breve explicación sin ocupar espacio permanente en la pantalla — el usuario hace clic en el ? y aparece la explicación, sin interrumpir el resto del formulario (ej. explicar qué hace una opción técnica de configuración)."

## Wireframe rules

A wireframe that could be mistaken for a different option in the same question has failed. Before finalizing any icon set, check all of the following:

1. **Icons/triggers need an actual glyph, not a bare shape.** A plain circle reads as nothing; a circle with `<text fill="currentColor" stroke="none">?</text>` inside reads as "help icon". Use `fill` (never `stroke`) for character glyphs — stroke-only text renders illegibly thin at this scale. Size it to read clearly: a `?` needs `font-size` ≥ 8–9 inside a circle of radius ≥ 6 — radius 4 / font-size 6 is too small to register as a symbol.
2. **Each option needs at least one element the others don't have.** If "form" and "confirmation" both render as an empty box + 2 buttons, they're indistinguishable — a form needs visible input-line rectangles (2 stacked) that a plain confirmation dialog doesn't have; a confirmation needs the horizontal divider line above its buttons that a plain content box doesn't have. Sketch the row of options mentally first: if you can't describe in one sentence what makes wireframe A different from wireframe B, add a distinguishing element instead of writing similar-looking boxes.
3. **Simple strokes only** (`stroke="currentColor"`, `stroke-width="1.5"`, `fill="none"` on shapes) — only glyphs/text get `fill` instead of `stroke`.
4. **Grow the `viewBox`, don't cram.** If a wireframe needs more internal room, grow the `viewBox` itself (e.g. `0 0 48 46` instead of `0 0 48 36`) and scale the rendered `width`/`height` to the same aspect ratio (`62×59` for `48×46`, vs `62×47` for `48×36`) — never shrink gaps below the minimums to fit a box that's too small.

### Minimum spacing (viewBox units, `48`-wide canvas)

| Gap | Minimum |
|---|---|
| Between two stacked fields (inputs, text lines) | 4 |
| Between adjacent footer buttons | 4 |
| Between the last content element (divider, last input) and the buttons below it | 5–6 |
| Between the buttons and the container's bottom edge (bottom padding) | 5–6 |
| Between a trigger icon and the content box it connects to (before any connector/arrow) | 4 |
| Container's own edge margins (left/right/top padding before content starts) | 4 |

### Alignment: buttons and fields share one inset — dividers don't

Every non-divider element inside a container (input fields, text lines, footer buttons) sits at the *same* left/right inset from the container edges. If fields run from `x8` to `x40` inside a box spanning `x4` to `x44` (a 4-unit inset), the rightmost button's right edge lands at `x40` too — it does not stretch out to the box's own edge at `x44`. A row of buttons is right-aligned as a group to that shared inset.

The one exception is a **divider line** separating content from a footer — that spans the full container width edge-to-edge (`x4` to `x44`), since it's meant to visually cut across the whole box.

## Sourcing wireframes and system attribution

- Wireframe shape: base it on the ASCII wireframes already present in `research/components/[comp].md`, redrawn as line-art SVG per the rules above.
- System attribution subtitle: pull from the research doc's **Property/Slot Consensus** tables or **Per-System Narratives** (e.g. `research/components/popover.md` → "Property Consensus" table lists which systems support each property/pattern). If no research.md exists yet (fast-mode component), check `component-research-agent/references/systems/compiled/[comp].md` instead.

## Mapping the answer back to the config

The `data-value` on each row MUST match the corresponding option's `value` field in `hints/[comp].json` exactly — this is what lets the guided flow filter `config.json` the same way it would from an `AskUserQuestion` answer, no extra translation step needed.

The submitted answer arrives as a chat message in the form:
```
Popover details — Use case: Confirmación inline
```
Match the label back to its `data-value`/hints.json option id before filtering the config.

## Scope

One skill invocation = one visual question (or a small handful of related ones in the same form). Don't cram all 9 guided questions from `hints.json` into a single mega-form — keep the property/boolean questions in `AskUserQuestion` as today, and reserve this skill for the 1-2 questions per component that are genuinely about pattern shape.
