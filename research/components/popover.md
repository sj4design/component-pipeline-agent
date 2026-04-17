# Popover — Research
_Compiled from: Spectrum, Carbon, Polaris, Atlassian, Ant Design (Material Design 3 = absent)_

---

## Systems Without the Component

| System | Status | Workaround |
|--------|--------|-----------|
| Material Design 3 | Absent by design | Dialog / Menu / Bottom Sheet |

---

## Per-System Narratives

### Spectrum
Spectrum's Popover is a floating container anchored to a trigger, wrapping Dialog content with an optional visual arrow. It inherits Dialog's focus-trap by default, making all popovers accessible modal overlays. Supports 20 placement positions (top/bottom/left/right × start/center/end + auto variants) with `shouldFlip` for viewport-aware repositioning. `ContextualHelp` is a pre-built zero-config variant for "?" help triggers on form fields.

| Decision | Rationale |
|----------|-----------|
| Focus trap by default | Forces a11y compliance — no escape hatch for inaccessible non-modal popovers |
| 20 placements | Complex enterprise layouts overflow viewport without fine-grained placement control |
| ContextualHelp shortcut | Reduces friction for the most common popover use case (inline field help) |
| Origin-aware animation | Cognitive continuity — animation direction matches where the popover originates |

### Carbon
Carbon separates Popover (low-level primitive with no trigger behavior) from Toggletip (click-triggered accessible overlay). Popover is composed into other patterns; Toggletip is the ready-to-use component that correctly maps `role="tooltip"` for read-only content and `role="dialog"` when interactive content is present. A `highContrast` prop enables a dark background for use on dark surfaces. A 4-column max-width prevents popovers from becoming mini-modals.

| Decision | Rationale |
|----------|-----------|
| Popover/Toggletip split | Explicitly models hover≠click distinction; prevents semantic errors |
| highContrast boolean | Dark surface support without a full separate component |
| 4-column max-width guideline | Forces teams to use modals for long-form content |
| autoAlign | Viewport overflow prevention without manual placement management |

### Polaris
Polaris Popover is the system's universal overlay container — used for dropdowns, action menus, color pickers, date pickers, and all floating anchored content. The `autofocusTarget` prop gives explicit control over focus management: `"container"` for modal popovers, `"first-node"` for forms, `"none"` for informational non-modal overlays. `preferredPosition: "mostSpace"` auto-selects the side with the most viewport room. `preventCloseOnChildOverlayClick` enables nested overlay patterns.

| Decision | Rationale |
|----------|-----------|
| Universal container | Single API surface vs. separate Dropdown, Menu, Popover components |
| autofocusTarget enum | Explicit focus intent declaration vs. implicit heuristics |
| sectioned boolean | Automatic padding applied to content sections without manual styling |
| preventCloseOnChildOverlayClick | Required for date pickers and color pickers embedded in forms |

### Atlassian
Atlassian's Popup replaces the deprecated InlineDialog, using portal-based rendering to avoid z-index and overflow clipping in Jira's deeply nested layouts. Controlled-only (`isOpen` + `onClose` required) — consistent with Atlassian's controlled component philosophy. An optional blanket can make the popup semi-modal. Placement uses Popper.js strings. A z-index tier system prevents layering conflicts across Jira panels.

| Decision | Rationale |
|----------|-----------|
| Portal rendering | Jira's nested stacking contexts break in-place overlays — portals sidestep this |
| Controlled-only | Forces explicit state management; prevents hidden state bugs in complex UIs |
| Z-index tier system | Token-based tiers prevent Popup from accidentally rendering under modals or above banners |
| shouldRenderToParent escape hatch | Opt-out from portal when overflow:visible is needed |

### Ant Design
Ant Design builds a three-level overlay hierarchy: Tooltip (text-only) → Popover (title + content slots) → Popconfirm (confirmation dialog). Each inherits placement, trigger, and animation from the base. Default trigger is `hover` — common in Chinese enterprise UIs but creates a keyboard accessibility gap. `title` and `content` are distinct slots enabling structured info cards.

| Decision | Rationale |
|----------|-----------|
| Three-level inheritance | Learning curve reduced — all three share placement/trigger/animation API |
| hover default | Enterprise admin users primarily mouse-driven; hover shows info without click |
| title + content slots | Structured layout for enterprise info cards without custom markup |
| getContainer | Consumer controls portal target for complex app shells |

---

## Pipeline Hints

**Archetype:** `anchored-floating-container` — rich content overlay (text, actions, forms) positioned relative to a trigger element. Richer than Tooltip (interactive content, deliberate trigger), lighter than Modal (no backdrop, optional focus trap, anchored position).

**Slot Consensus:**
| Slot | Type | Rule | Justification |
|------|------|------|---------------|
| trigger | SLOT | External, replaceable | Any element can be a trigger — button, icon, text |
| content | SLOT | Consumer-provided body | Arbitrary content; not constrained by component |
| title | REGION | Optional heading | Always inside parent; changes by hasTitle boolean |
| footer | REGION | Optional action area | Always inside parent; changes by hasFooter boolean |

**Property Consensus:**
| Property | Values | Systems | Notes |
|----------|--------|---------|-------|
| placement | top\|bottom\|left\|right (+ start/end variants) | 5/5 | Figma maps to arrow direction |
| size | sm\|md\|lg | 3/5 (Polaris, Carbon, Spectrum) | Controls max-width, not height |
| trigger type | click\|hover\|focus | 3/5 (Ant, Polaris, Carbon) | click is safe default |
| shouldFlip | boolean | 4/5 | Universal viewport-overflow protection |
| arrow | boolean toggle | 3/5 | Does NOT multiply frames |
| modal/focusTrap | boolean | 3/5 | Changes ARIA role + focus behavior |

**Booleans:** `hasArrow`, `hasTitle`, `hasFooter`, `hasClose`, `shouldFlip`, `modal`

**States:** open / closed (behavioral, not Figma frame states)

**Exclusions:**
- hover trigger + no focus trigger = inaccessible (Ant Design gap)
- size=sm + complex footer with 2+ buttons = overflow risk

**Building Block Candidates:**
- `ContextualHelp` — pre-built help trigger + popover (Spectrum pattern)
- `Popconfirm` — confirmation dialog built on popover (Ant Design pattern)

**A11y Consensus:**
- Interactive content → `role="dialog"`, `aria-labelledby` → title id
- Read-only content → `role="tooltip"` with `aria-describedby` on trigger
- `aria-expanded` on trigger element
- `aria-controls` → popover id
- Escape: close + return focus to trigger
- Focus moves into popover on open (when modal=true)
- Non-modal: Tab exits popover naturally

---

## Consensus

1. **4 core placements (top/bottom/left/right)** — all 5 systems with popover implement these; start/end variants for alignment are secondary. WHY: predictable spatial relationship with trigger; 4 arrow directions in Figma.
2. **shouldFlip/autoAlign is universal** (4/5) — viewport overflow prevention reduces placement errors. WHY: enterprise UIs have many fixed/sticky elements that constrain available space.
3. **Arrow is a boolean toggle, not a variant** (3/5) — binary on/off, no structural change. WHY: global-property-rules: binary visual modifier = boolean.
4. **Portal rendering is expected** (5/5 implicitly) — all systems render outside DOM for z-index safety. WHY: application shells with sticky headers and complex stacking contexts require portal rendering.
5. **Escape closes + returns focus to trigger** (5/5) — WCAG 2.5.3 focus management requirement. WHY: keyboard users must be able to close and resume their flow.
6. **Click is the accessible default trigger** (4/5) — hover-only is inaccessible; click works for all input types. WHY: Ant's hover default is an a11y gap; click requires intentional user action.

---

## Divergences

1. **Modal vs. non-modal default** — Spectrum forces focus trap for all popovers. Polaris makes it explicit via `autofocusTarget`. Carbon separates into Popover (primitive) + Toggletip. **Q: Should popover be modal by default?** Option A: Always modal — safer a11y (Spectrum). Option B: Non-modal default, modal as opt-in — more flexible, but requires consumer a11y discipline (Polaris).

2. **How many placement values?** — Spectrum: 20. Ant Design: 12. Tooltip (in this system): 4. **Q: How many placements?** Option A: 4 cardinal directions only — simpler, matches Tooltip. Option B: 12 (+ start/end variants) — needed for complex layouts where alignment matters.

3. **Semantic/color variants** — 0/5 systems have semantic color variants on the popover container itself. Carbon has `highContrast`. Polaris is style-neutral. **Q: Do we need variant prop?** Option A: No variant — popover is style-neutral; put semantic content (Alert, Banner) inside. Option B: Info/warning/error/success variants — useful for inline status popovers in enterprise forms.

4. **Pre-built patterns vs. primitives** — Spectrum has ContextualHelp. Carbon has Toggletip. Ant has Popconfirm. **Q: Ship pre-built patterns alongside the primitive?** Option A: Ship popover primitive only — let consumers compose. Option B: Ship ContextualHelp BB (help trigger + popover) immediately.

5. **Controlled vs. uncontrolled** — Atlassian is controlled-only. All others support both. **Q: Require isOpen prop?** Option A: Controlled + uncontrolled (default) — developer convenience. Option B: Controlled only — Atlassian's rationale (explicit state, no hidden bugs).

---

## Visual Patterns

**Default (bottom placement — arrow points up toward trigger):**
```
       [Trigger Button]
             ▲
  ┌──────────────────────┐
  │  Title (optional)    │
  │──────────────────────│
  │  Content area        │
  │  (text, actions,     │
  │   forms...)          │
  │──────────────────────│
  │  [Cancel] [Confirm]  │ ← footer (optional)
  └──────────────────────┘
```

**Top placement (arrow points down):**
```
  ┌──────────────────────┐
  │  Title (optional)    │
  │──────────────────────│
  │  Content area        │
  └──────────────────────┘
             ▼
       [Trigger Button]
```

**Right placement (arrow points left):**
```
  [Trigger] ◄ ┌──────────────────────┐
               │  Content area        │
               └──────────────────────┘
```

**ContextualHelp pattern:**
```
  Label text  [?]
               ▲
  ┌────────────────────┐
  │  Help title        │
  │────────────────────│
  │  Explanation text  │
  │  with more detail. │
  └────────────────────┘
```

---

## Risks

1. **[HIGH] Hover-only trigger creates WCAG 2.1 1.4.13 violation** — if trigger=hover is supported without mandatory focus supplement, keyboard and touch users cannot access popover content. Mitigation: Default to click; if hover is supported, require focus as co-trigger.

2. **[MEDIUM] Focus management complexity** — modal popovers need focus trap + return-focus logic; non-modal popovers need Tab-exits behavior. Wrong implementation leaks focus outside popover (modal) or traps it (non-modal). Mitigation: Clear `modal` prop with documented behavior contract per value.

3. **[MEDIUM] Arrow position breaks after flip** — if shouldFlip=true and the popover flips from bottom to top, the arrow must reorient. Static arrow in one direction will point the wrong way after flip. Mitigation: Arrow direction must be driven by actual computed placement, not the preferred placement prop.

4. **[LOW] Z-index collisions in enterprise app shells** — Zoom's main app shell has sticky headers, sidebars, and modals. Popover z-index tier must be above sticky elements but below modals. Mitigation: Use Atlassian's z-index tier system; ensure portal rendering is default.
