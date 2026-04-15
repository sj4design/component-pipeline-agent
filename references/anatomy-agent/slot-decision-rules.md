# Slot Decision Rules

## Section Index

| § | Section | Lines |
|---|---------|-------|
| 1 | 3-Question Filter | 3–20 |
| 2 | Decision examples | 22–36 |
| 3 | Common mistakes to avoid | 38–73 |
| 4 | Figma construction rule: Slots with states | 75–97 |
| 5 | Inheritance rules | 99–106 |

---

## 3-Question Filter

Apply these questions **in order** to every candidate part of a component.
Stop at the first "Yes" — that determines the classification.

```
Q1: ¿Se puede reemplazar externamente via slot API?
    → Sí → es SLOT propio del componente
    → No  → sigue a Q2

Q2: ¿Siempre aparece dentro de otro slot y no es reemplazable?
    → Sí → es REGIÓN INTERNA del slot padre
    → No  → sigue a Q3

Q3: ¿Cambia por interacción del usuario o datos del sistema?
    → Sí → es ESTADO o VARIANTE → va al Variant Matrix
    → No  → probablemente no es una parte relevante para la anatomía
```

## Decision examples

| Parte candidata     | Q1 | Q2 | Q3 | Clasificación            |
|---------------------|:--:|:--:|:--:|--------------------------|
| header              | ✓  | —  | —  | Slot                     |
| title (dentro de header) | ✗ | ✓ | — | Región interna de header |
| nav-control         | ✗  | ✓  | —  | Región interna de header |
| nav-prev            | ✗  | ✓  | —  | Región de nav-control    |
| day-cell            | ✓  | —  | —  | Slot                     |
| today (estado de day-cell) | ✗ | ✗ | ✓ | Estado → Variant Matrix |
| selected            | ✗  | ✗  | ✓  | Estado → Variant Matrix  |
| disabled            | ✗  | ✗  | ✓  | Estado → Variant Matrix  |
| weekday-labels      | ✗  | ✓  | —  | Región interna de grid   |
| trigger (dentro de input) | ✗ | ✓ | — | Región interna de input |
| range-fill          | ✓  | —  | —  | Slot                     |

## Common mistakes to avoid

### ❌ Making states into slots
States are visual variations of a slot driven by user interaction or system data.
They don't create new swappable regions.

**Wrong:** `today-indicator` as a slot → it's a state of `day-cell`
**Right:** `day-cell` has states: `default, today, selected, disabled, focused`

### ❌ Making regions into slots
If a part always lives inside another part and can't be replaced externally,
it's a region, not a slot.

**Wrong:** `nav-prev` and `nav-next` as separate slots
**Right:** They're regions of `nav-control`, which is a region of `header`

### ❌ Duplicating inherited slots
If Calendar defines `header`, DatePicker inherits it — don't list it again
as a DatePicker slot.

**Right approach:** DatePicker's anatomy shows:
- "Hereda de Calendar: header, grid, day-cell"
- Own slots: label, input, popover-container, error-message

### ❌ Deep nesting confusion
Sometimes a region has sub-regions. This is fine — document the hierarchy:

```
header (slot)
  ├── title (region)
  └── nav-control (region)
       ├── nav-prev (sub-region)
       └── nav-next (sub-region)
```

Only the top-level part (header) is the slot. Everything below is regions.

## Figma construction rule: Slots with states → Component variants

When building in Figma, every slot that has states in the Variant Matrix MUST be implemented as a **component with variants**, not as a styled frame. Composed components MUST use **instances** of these sub-components.

**Decision flow for Figma implementation:**
```
Slot defined in anatomy?
  └── Has states in Variant Matrix?
       ├── YES → Create as Component Set (sub-component)
       │         → Use createInstance() in parent components
       └── NO  → Can be a frame if it has no visual states
            └── But if it REPEATS across multiple parents → still a component
```

**Examples:**
| Slot | Has states? | Repeats? | Figma implementation |
|------|:-----------:|:--------:|---------------------|
| day-cell | ✓ (default, selected, in-range, today) | ✓ (42 cells per calendar) | Component Set with variants |
| nav-button | ✗ (but has direction) | ✓ (2 per calendar header) | Component Set (Direction=prev/next) |
| header | ✗ | ✗ | Frame (unique per component) |
| range-fill | ✓ (via day-cell in-range variant) | ✓ | Absorbed into day-cell Type=in-range |

**Anti-pattern:** Hardcoding `fills = [{ type: 'SOLID', color: blue }]` on a frame that represents a stateful element. This breaks Figma's component model — changes won't propagate, designers can't swap variants, and the design system becomes unmaintainable.

## Inheritance rules

1. A child component inherits ALL slots from its parent
2. Inherited slots are not re-listed in the child's anatomy table
3. The child's table only shows its OWN new slots
4. The inheritance chain is declared at the top: "Hereda de: [Parent]"
5. If a child MODIFIES an inherited slot (adds regions, changes behavior),
   document the modification as a note, not as a new slot
