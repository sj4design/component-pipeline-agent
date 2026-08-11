# Popover → Link Field token binding (proof of concept)

Date: 2026-08-10

## Context

The pipeline's `outputs/[comp]-config.json` files (e.g. `outputs/popover-config.json`) express color as generic semantic tokens (`surface/default`, `border/focus`, `status/warning/bg`, etc.) rather than hardcoded values or a specific design system's variable names. This layer exists so any design system can consume the spec — but today nothing actually connects that generic layer to a real design system's variables, and non-color foundations (spacing, radius, typography) are hardcoded from the pipeline's own generic `foundations.json`, not from any target system.

This spec defines a one-off proof of concept: take the already-built `outputs/popover-config.json` and use it to generate a real Popover component inside a specific external Figma file, with spacing/radius/typography/color resolved from that file's own variables and foundations — not the pipeline's generic ones.

## Goal

Prove that a pipeline-generated `config.json` can be turned into an actual Figma component bound to a *different, pre-existing* design system's real variables, without modifying the source config or requiring that system to pre-adopt the pipeline's token names.

## Target design system

Figma file **"🚧 [Link] FieldIQ app - Design System"** (fileKey `zp7q6XxtgVLwT7CUbMPXef`), reachable now via the Figma Desktop Bridge (confirmed connected — see `figma_list_open_files`). It has its own variables, foundations, and existing components.

Output location: the **"test" section**, node-id `141452:1500`, inside that file.

## Scope

**In scope:**
- Read Link Field's real variables/foundations (color, spacing, radius) and text styles (typography).
- Reconcile Popover's semantic needs against those real values, at the **semantic tier only** (`surface/default`, `border/focus`, `status/warning/bg`, etc.) — Link Field does not need Popover-specific component tokens (`pop/bg`, `pop/border`); that naming is internal to the pipeline's own token architecture.
- Generate a **representative subset**: 5 frames (one per `Variant`: default/info/warning/error/success), with `Placement=bottom` and `Size=md` fixed — not the full 60-frame matrix.
- Bind resolved values to the generated Figma nodes via Figma's Variables API (`setBoundVariable`) where a match exists.
- Produce a final text report: what mapped, what was ambiguous (and how it was resolved), what's missing entirely.

**Explicitly out of scope for this pass:**
- The other 68 pipeline components.
- Persisting a reusable "binding profile" for Link Field — this mapping is ad-hoc and discarded after this test.
- Any modification to `outputs/popover-config.json` — it stays generic/portable.
- Generating all 60 Placement×Size×Variant combinations.
- Code Connect or any code-side binding — Figma only.

## Data flow

```
Phase 1 — Discover (read Link Field)
  - Enumerate its variable collections: color/semantic variables, spacing scale, radius scale
  - Enumerate its text styles: typography (size/weight/line-height)
  - Read-only, no mutation

Phase 2 — Reconcile (Popover needs vs. Link Field reality)
  For each of Popover's semantic needs at size=md:
    - Color: surface/default, border/default, text/primary, text/secondary, border/focus,
      status/{info,warning,error,success}/{bg,border,fg}
    - Spacing: padding (16px generic) / gap (12px generic)
    - Radius: radius/md (8px generic)
    - Typography: title (14/600/20lh) and body (14/400/20lh)
  Resolution rules:
    - Exact/clear match in Link Field → use it
    - Ambiguous (2+ plausible candidates) → pause, ask the user interactively which to use
    - No equivalent exists at all → do NOT block generation. Fall back to the pipeline's
      generic value for that one property, and record an action-note flagging the gap
      (e.g. "Falta token semántico equivalente a status/warning/bg en Link Field —
      sugerido: crear uno con valor aproximado #FFF7EB").

Phase 3 — Generate (write to Figma)
  - Create a container frame inside the "test" section (node-id 141452:1500)
  - Create 5 Popover frames (one per Variant), structured per
    outputs/popover-config.json's slots (title, content, footer, close, arrow)
  - Apply resolved values via setBoundVariable for everything that mapped;
    properties that fell back to generic values are left as literal values,
    visually/comment-flagged as provisional
  - Emit the final report (mapped / ambiguous+resolution / missing) as a chat message,
    not a file
```

## Error handling

- **Desktop Bridge disconnects mid-generation** → stop immediately, report which frames were created before the cut. No automatic retry.
- **A resolved value can't be bound** (type mismatch, e.g. text style vs. color variable) → that single property stays as a literal value + gets an action-note; does not abort the rest of the component.
- **Unexpected Figma-side failure mid-generation** (corrupted node, API error) → stop and report current state; ask how to proceed rather than attempting automatic repair.

## Success criteria

- 5 Popover variant frames exist in Link Field's "test" section, visually correct per `outputs/popover-config.json`'s anatomy.
- Every property that had a real Link Field equivalent is bound to that real variable (verifiable by inspecting the node's bound variables in Figma).
- A final report lists: what mapped to what, what was asked/resolved interactively, and what's missing in Link Field (as action notes, not created unilaterally).
- `outputs/popover-config.json` is unchanged on disk.
