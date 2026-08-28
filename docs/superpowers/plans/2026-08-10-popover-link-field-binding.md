# Popover → Link Field Token Binding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate 5 real Popover variant frames inside the Figma file "🚧 [Link] FieldIQ app - Design System" (fileKey `zp7q6XxtgVLwT7CUbMPXef`), with color/spacing/radius/typography resolved from that file's own variables and text styles instead of the pipeline's generic `foundations.json`.

**Architecture:** Three phases — discover Link Field's real tokens (read-only), reconcile them against Popover's semantic needs (asking the user on ambiguity, logging gaps as action notes), then generate the frames and bind resolved variables via Figma's Variables API. No code is written; this is pure Figma-side automation via the connected Figma MCP tools (Desktop Bridge).

**Tech Stack:** Figma Desktop Bridge (`mcp__figma-console__*` tools) and the official Figma MCP (`mcp__Figma__*` tools), driven from this session. Source of truth for the spec: `outputs/popover-config.json`.

**Spec:** `docs/superpowers/specs/2026-08-10-popover-link-field-binding-design.md`

---

## Fixed inputs (do not re-derive — use these exact values)

From `outputs/popover-config.json`, `sizes.md`:
- `maxW: 320`, `padding: 16`, `gap: 12`, `radius: 8`
- `titleSize: 14`, `titleWeight: 600`, `titleLineHeight: 20`
- `bodySize: 14`, `bodyWeight: 400`, `bodyLineHeight: 20`
- `footerGap: 12`, `arrowSize: 8`, `offset: 8`

From `outputs/popover-config.json`, `variantStyles` (5 variants — default/info/warning/error/success), each needs:
- `bg`, `border`, `accentFg` (null for default), `iconName` (null for default)

Semantic color needs (from `variableBindings`), independent of variant:
- `surface/default` (pop/bg, pop/arrow-bg)
- `border/default` (pop/border, pop/divider)
- `text/primary` (pop/title-color)
- `text/secondary` (pop/body-color, pop/close-color)
- `border/focus` (focus/ring)
- Per variant: `status/{variant}/bg`, `status/{variant}/border`, `status/{variant}/fg` (skip for `default`, which uses `surface/default` + `border/default` instead — it has no status color)

Anatomy (from `family[0].slots`): `title` (text, boolText), `content` (container, required), `footer` (container, bool), `close` (icon-action, bool), `arrow` (shape, always visible per this build's scope — no boolean).

Target location: Figma file `zp7q6XxtgVLwT7CUbMPXef`, section node-id `141452:1500` (the "test" section).

---

### Task 1: Confirm connection and load Figma tool schemas

**Files:** None (tooling setup only).

- [ ] **Step 1: Confirm Link Field is still connected**

Call `mcp__figma-console__figma_list_open_files`. Confirm the response includes a file with `fileKey: "zp7q6XxtgVLwT7CUbMPXef"`. If it's missing, stop and tell the user to reopen the file with the Desktop Bridge plugin running — do not proceed on a guess.

- [ ] **Step 2: Load the Figma tool schemas needed for reading and writing**

Call `ToolSearch` with query: `"select:mcp__figma-console__figma_get_variables,mcp__figma-console__figma_get_library_variables,mcp__figma-console__figma_get_text_styles,mcp__figma-console__figma_execute,mcp__figma-console__figma_navigate,mcp__figma-console__figma_get_selection,mcp__Figma__get_variable_defs,mcp__Figma__get_metadata,mcp__Figma__get_screenshot"`

Confirm each tool's schema returns (no `InputValidationError` on later calls). If a named tool doesn't exist in the search results, note its absence and use `mcp__figma-console__figma_execute` (raw plugin-API JavaScript) as the fallback for that specific operation — it is the most general-purpose tool available and can call `figma.variables.getLocalVariablesAsync()` / `figma.variables.getLocalVariableCollectionsAsync()` / `figma.getLocalTextStylesAsync()` directly.

- [ ] **Step 3: Lock the target file**

Call `mcp__figma-console__figma_navigate` (or the equivalent target-lock parameter on whichever tool provides it) with the Link Field file URL and `lock: true`, so subsequent calls in this plan can't silently drift to the other connected file ("🚧 FieldIQ screens"). If no explicit lock exists, pass `fileKeys: ["zp7q6XxtgVLwT7CUbMPXef"]` explicitly on every subsequent `figma-console` call instead of relying on "active file" defaults.

---

### Task 2: Discover Link Field's real color variables

**Files:** None (read-only).

- [ ] **Step 1: Enumerate variable collections and their variables**

Call `mcp__figma-console__figma_get_variables` (or, if unavailable, `mcp__figma-console__figma_execute` with):

```js
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const result = [];
for (const c of collections) {
  const vars = await Promise.all(c.variableIds.map(id => figma.variables.getVariableByIdAsync(id)));
  result.push({
    collection: c.name,
    modes: c.modes.map(m => m.name),
    variables: vars.map(v => ({ name: v.name, id: v.id, resolvedType: v.resolvedType }))
  });
}
return result;
```

- [ ] **Step 2: Print the full list to the conversation**

Show the collection names and every variable name found (grouped by collection) as plain text — this is the raw material for Task 3's matching. Do not filter or summarize yet; the reconciliation step needs the full list.

- [ ] **Step 3: If a library (not local) holds the real variables, also check the library**

If Task 2 Step 1 returns few or no color variables, the real tokens likely live in a separate published library. Call `mcp__figma-console__figma_get_library_variables` (or `mcp__Figma__get_variable_defs`) to check for library-sourced variables used on the page containing node `141452:1500`. Merge these into the same list from Step 2.

---

### Task 3: Discover Link Field's spacing, radius, and typography

**Files:** None (read-only).

- [ ] **Step 1: Check whether spacing/radius are variables or hardcoded in existing components**

Re-run the Task 2 Step 1 query's `resolvedType` filter for `FLOAT` variables (spacing/radius are typically number variables, colors are `COLOR`). List any variable whose name suggests spacing or radius (e.g. contains "spacing", "space", "radius", "gap", "padding").

- [ ] **Step 2: Enumerate text styles for typography**

Call `mcp__figma-console__figma_get_text_styles` (or, via `figma_execute`):

```js
const styles = await figma.getLocalTextStylesAsync();
return styles.map(s => ({
  name: s.name, fontSize: s.fontSize, fontName: s.fontName,
  lineHeight: s.lineHeight, letterSpacing: s.letterSpacing
}));
```

- [ ] **Step 3: Print both lists to the conversation**

Same as Task 2 Step 2 — show the raw list before matching anything.

---

### Task 4: Reconcile — build the resolved mapping table

**Files:** None (in-memory only for this pass — no binding profile is persisted, per the spec).

- [ ] **Step 1: Match each semantic color need against Task 2's list**

For each of: `surface/default`, `border/default`, `text/primary`, `text/secondary`, `border/focus`, and per-variant `status/{info,warning,error,success}/{bg,border,fg}` — find the Link Field variable whose name/purpose matches. Build a table: `{ semanticName, popoverValue (from config.json), linkFieldVariableId, linkFieldVariableName, matchConfidence }`.

- [ ] **Step 2: Match spacing/radius/typography against Task 3's lists**

Match `padding=16`, `gap=12`, `radius=8`, title/body type styles against the nearest Link Field spacing/radius variable and text style. Exact numeric equality is not required — pick the nearest named step in their scale (e.g. their "space-4" if it equals 16px) and record it in the same table shape as Step 1.

- [ ] **Step 3: Resolve ambiguous matches interactively**

For any row with 2+ plausible candidates, stop and use `AskUserQuestion` — one question per ambiguous semantic need, showing the candidate names/values as options. Do not guess. Update the table with the chosen variable.

- [ ] **Step 4: Log missing matches as action notes**

For any row with zero plausible candidates in Link Field, do not block. Add an entry to an `actionNotes` list: `"Falta token semántico equivalente a {semanticName} en Link Field — usando valor genérico {popoverValue} como fallback."` Leave that row's `linkFieldVariableId` as `null` in the table — Task 5 will use the literal `popoverValue` for these.

- [ ] **Step 5: Print the final resolved table and action notes**

Show the complete table (resolved + fallback rows) and the `actionNotes` list before moving to generation, so the user can sanity-check the mapping before anything gets created in Figma.

---

### Task 5: Build the frame structure (layout only, no bindings yet)

**Files:** None (Figma-side only).

- [ ] **Step 1: Create the container frame in the "test" section**

Via `mcp__figma-console__figma_execute`:

```js
const testSection = await figma.getNodeByIdAsync("141452:1500");
const container = figma.createFrame();
container.name = "Popover — Link Field binding test";
container.layoutMode = "HORIZONTAL";
container.itemSpacing = 40;
container.primaryAxisSizingMode = "AUTO";
container.counterAxisSizingMode = "AUTO";
container.fills = [];
testSection.appendChild(container);
return container.id;
```

Record the returned `container.id` — every subsequent step targets children of this frame.

- [ ] **Step 2: Create one frame per variant with the anatomy structure**

For each of the 5 variants (`default`, `info`, `warning`, `error`, `success`), create a frame (width `320` = `maxW` for md) containing, top to bottom: an `arrow` shape (8×8, per `arrowSize`), a `title` text node ("Popover title", 14/600/20), a `content` placeholder rectangle, a `footer` placeholder rectangle, and a `close` icon placeholder (small square) — using `padding: 16`, `itemSpacing: 12` (gap), `cornerRadius: 8` on the outer frame, per the fixed inputs above. Use literal pixel/hex values at this step — no variable binding yet, that's Task 6.

- [ ] **Step 3: Screenshot and verify structure**

Call `mcp__Figma__get_screenshot` with the container's node ID. Confirm all 5 frames are present, in a row, each showing title/content/footer/close/arrow in the right position before proceeding. If a frame is missing a slot or misaligned, fix it now — don't bind variables to a broken structure.

---

### Task 6: Bind resolved variables

**Files:** None (Figma-side only).

- [ ] **Step 1: Bind color variables per frame**

For each of the 5 frames, for each color property (fill on the frame = `bg`, stroke = `border`, title text fill = `text/primary`, body text fill = `text/secondary`, accent icon fill = variant's `fg`), call (via `figma_execute`):

```js
const node = await figma.getNodeByIdAsync(nodeId);
const variable = await figma.variables.getVariableByIdAsync(linkFieldVariableId);
node.fills = [figma.variables.setBoundVariableForPaint(node.fills[0], "color", variable)];
```

(Adjust the exact binding call to whichever property is being set — fills use `setBoundVariableForPaint`, plain numeric/string properties use `node.setBoundVariable(field, variable)`.) Skip this for any row where Task 4 Step 4 recorded `linkFieldVariableId: null` — those keep their literal fallback value, already set in Task 5.

- [ ] **Step 2: Bind spacing/radius/typography variables**

Same pattern for `padding`, `itemSpacing` (gap), `cornerRadius`, and text style application (`node.setTextStyleIdAsync(styleId)` for the matched text style), wherever Task 4 found a real Link Field match.

- [ ] **Step 3: Verify bindings actually took**

For at least one frame, call `figma_execute`:

```js
const node = await figma.getNodeByIdAsync(nodeId);
return node.boundVariables;
```

Confirm the expected properties appear in `boundVariables` (not just that the call didn't error). This is the actual proof the binding worked, not just visual similarity.

- [ ] **Step 4: Screenshot the final result**

Call `mcp__Figma__get_screenshot` again on the container. Visually confirm nothing broke (colors should now reflect Link Field's actual values, which may look different from the pipeline's generic ones — that's expected and correct).

---

### Task 7: Final report and cleanup check

**Files:** None.

- [ ] **Step 1: Confirm `outputs/popover-config.json` is untouched**

Run: `git diff --stat outputs/popover-config.json`
Expected: no output (file unchanged by this plan). If it shows changes, something in this plan touched it in error — investigate before reporting success.

- [ ] **Step 2: Present the final report to the user**

In chat (not a file, per the spec), present:
- The full resolved mapping table from Task 4 Step 5
- The `actionNotes` list (gaps in Link Field)
- A link/reference to the created frames (node IDs and the container name) so the user can open them directly in Figma
- Confirmation that `outputs/popover-config.json` is unchanged

---

## Self-review notes

- Every task has a concrete tool call or code snippet — no "add appropriate handling" placeholders.
- Task 1 explicitly handles the case where a named `figma-console` tool doesn't exist by falling back to `figma_execute`, since exact tool availability wasn't verified before this plan was written.
- Ambiguity resolution (Task 4 Step 3) and missing-token handling (Task 4 Step 4) match the spec's error-handling section exactly.
- No task persists a binding profile file, matching the spec's explicit scope exclusion.
- Task 7 Step 1 is the concrete check for the spec's "config.json stays unchanged" success criterion.
