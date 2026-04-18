# Bottom Sheet — Component Research

**Date:** 2026-04-17
**Mode:** Max (all 24 systems, all patterns)
**Systems analyzed:** 24
**Systems with true bottom sheet:** 2 — M3 (definitive spec), shadcn/ui via Vaul
**Systems with "bottom drawer" (CSS-positioned, no gestures):** 6 — Ant, Chakra, Base Web, Fluent 2, Mantine, Wise
**Systems with partial coverage:** 2 — Gestalt (Sheet: responsive), Spectrum (Tray: bottom Dialog, no gestures)
**CRITICAL DISTINCTION:** "Bottom drawer" (CSS-positioned overlay from bottom edge) ≠ "Bottom sheet" (gesture-driven progressive disclosure with drag handle + snap points + nested scrolling)

---

## Sistemas sin componente dedicado

| Sistema | Razón | Workaround |
|---------|-------|------------|
| Carbon (IBM) | Enterprise desktop; no mobile-native patterns | `Modal` o `Tearsheet` (right-side) |
| Polaris | Mobile = full-screen modal; Sheet deprecated por UX philosophy | Full-screen `Modal` en mobile |
| Atlassian | Móvil nativo usa UISheetPresentationController (iOS) / BottomSheetBehavior (Android) | Native platform components |
| Twilio Paste | Desktop-first enterprise; Mobile = full-screen Modal | Full-screen `Modal` en mobile |
| Lightning | No componente web; Docked Utility Bar = diferente patrón | Native mobile SDK |
| GitHub Primer | No Bottom Sheet; ActionSheet = lista de acciones (no content sheet) | `Dialog` fullscreen en mobile |
| Playbook | Sin componente — Drawer es side panel | Sin workaround documented |
| REI Cedar | Desktop e-commerce; Modal sirve todas las necesidades de overlay | `Modal` |
| Dell | Enterprise desktop-focused | `Modal` / `Drawer` |
| Radix UI | No built-in; comunidad usa Vaul como pairing estándar | Radix `Dialog` + Vaul library |
| GOV.UK | Progressive enhancement — JavaScript-dependent gestures incompatibles con modelo de servicios | Full-page navigation |
| Orbit | Drawer solo right-anchored (travel filters) | `Drawer` side panel |
| Evergreen | B2B SaaS; `SideSheet` solo right-anchored | `SideSheet` |
| Nord | Overlays evitados por seguridad clínica — risk de obscurecer datos de paciente | `Modal` + page navigation |

---

## How Systems Solve It

### Material Design 3 — "La especificación de referencia: Standard + Modal + detents + nested scrolling"

M3 es la única fuente de verdad para la especificación completa de bottom sheet en el corpus. Define dos variantes fundamentalmente distintas: **Standard** (no-modal, coexiste con el contenido de la página — permite interacción en el fondo) y **Modal** (scrim overlay, bloquea interacción en el fondo). Esta distinción no es trivial — un mapa con un bottom sheet de resultados de búsqueda necesita Standard (el usuario puede interactuar con el mapa mientras lee resultados); un form de edición necesita Modal (el usuario debe completar o descartar antes de continuar).

Los **snap points (detents)** son el corazón del componente: tres posiciones de descanso (collapsed/peek, half-expanded, fully-expanded) que crean el patrón de "revelación progresiva" característico. El **drag handle** es el affordance visual principal para esta interacción. El **contrato de nested scrolling** resuelve la ambigüedad más difícil del componente: el sheet se expande hasta su snap máximo antes de que el contenido interno comience a scroll — elimina el problema de "¿estoy scrolleando el sheet o el contenido?".

**Design Decisions:**
- **Standard vs. Modal distinction:** → Standard permite interacción simultánea con contenido detrás (mapa, lista); Modal bloquea con scrim para workflows que requieren resolución → la decisión de cuál usar define el modelo mental del usuario → **Para tu caso:** documentar explícitamente cuándo usar cada uno; Standard para "información adicional mientras continúas", Modal para "acción requerida antes de continuar"
- **Tres snap points (collapsed/half/full):** → la revelación progresiva reduce cognitive load; el usuario ve un "peek" y decide si necesita más antes de expandir completamente → `skipPartiallyExpanded` para casos donde el half-height no agrega valor → **Para tu caso:** definir los snap points en píxeles o porcentajes antes de implementar; los defaults de M3 son 56dp (peek), 50% viewport (half), 100% viewport (full)
- **Nested scrolling contract:** → el problema crítico de cualquier bottom sheet es si el scroll del usuario scrollea el sheet o el contenido dentro → M3 resuelve: el sheet SIEMPRE se expande primero; solo cuando está al máximo, el contenido scroll → **Para tu caso:** implementar este contrato es lo más difícil técnicamente pero lo más importante para la UX
- **Swipe-to-dismiss (Modal only):** → swipe hacia abajo más allá del snap lowest cierra el sheet → Standard persiste (no se puede swipe-dismiss un no-modal) → **Para tu caso:** WCAG 2.5.1 requiere alternativa a gestos; implementar close button visible siempre

**Notable API:** `BottomSheet(sheetState: collapsed|partiallyExpanded|expanded, skipPartiallyExpanded: boolean, sheetPeekHeight: Dp, dragHandle composable)`, `ModalBottomSheet` vs `BottomSheet`

**Accessibility:** Modal: `role="dialog"` + `aria-modal` + focus trap + Escape = close. Standard: no focus trap (non-modal). Drag handle tiene `role="slider"` semantics. Sin keyboard alternative para snap points en la spec — las implementaciones deben agregar botones Expand/Collapse.

**Gap:** Web implementation guidance ausente — M3 es Android/Compose-first. Web teams deben implementar desde scratch o usar Vaul.

---

### shadcn/ui (Vaul) — "La implementación web de referencia: gestures + snap points + background scaling"

shadcn/ui's Drawer, construido sobre [Vaul](https://vaul.emilkowal.ski/) de Emil Kowalski, es la implementación más completa de bottom sheet para web en todo el corpus. Es el único sistema web (no Android/iOS) que ofrece: drag handle, snap points configurable (`snapPoints={["148px", "355px", 1]}`), swipe-to-dismiss con spring animation, nested scrolling, y el característico `shouldScaleBackground` — el efecto de iOS donde el contenido de fondo se escala hacia atrás visualmente cuando el sheet sube, creando sensación de profundidad nativa.

**Design Decisions:**
- **`snapPoints` como array configurable:** → `["148px", "355px", 1]` define tres detents en pixels absolutos y/o porcentaje del viewport → más flexible que los tres detents fijos de M3 → **Para tu caso:** exponer como prop `snapPoints: (string | number)[]` siguiendo la API de Vaul
- **`shouldScaleBackground`:** → el background scaling effect es la señal visual más reconocible de la "natividad" de un bottom sheet en iOS → crea ilusión de profundidad sin un scrim puro → **Para tu caso:** opt-in por default (algunos backgrounds no escalan bien); boolean prop
- **`fadeFromIndex`:** → el scrim opacity comienza a transicionar solo cuando el sheet pasa del snap point N — en el peek state no hay scrim; en el expanded state sí → **Para tu caso:** por defecto `fadeFromIndex=1` (scrim aparece al pasar del primer snap point); configurable
- **Vaul library (external dependency):** → shadcn/ui no reinventa la rueda; Vaul es el standard de facto para bottom sheets en el ecosistema React/web → **Para tu caso:** considerar Vaul como dependency directa en lugar de reimplementar gestos

**Notable Props:** `snapPoints: (string | number)[]`, `activeSnapPoint`, `fadeFromIndex: number`, `shouldScaleBackground: boolean`, `dismissible: boolean`, `nested: boolean` (para bottom sheets anidados)

**Accessibility:** `role="dialog"` via Dialog primitive. `aria-labelledby` para título. Escape cierra. Focus management en open/close.

---

### Gestalt (Pinterest) — "Sheet responsive: bottom en mobile, side en desktop"

Gestalt `Sheet` es el único componente del corpus que unifica bottom sheet (mobile) y side panel (desktop) en un solo componente que responde automáticamente al viewport. En mobile viewports (el contexto dominante de Pinterest), Sheet sube desde el bottom con soporte de partial-height "peek". En desktop, el mismo Sheet render como right-side panel. Esta dualidad resuelve el problema "¿qué hago con el bottom sheet en desktop?" sin conditional rendering o dos componentes. `accessibilityLabel` es required — el equipo de Gestalt fuerza el accessible name al nivel del API, no como best-practice documentation.

**Design Decisions:**
- **Responsive unificado (bottom ↔ side):** → en mobile la sheet sube desde abajo; en desktop aparece desde la derecha → el consumer no necesita conditional rendering → **Para tu caso:** si el producto tiene tanto mobile-web como desktop, este enfoque reduce drásticamente la complejidad de implementación
- **`accessibilityLabel` required prop:** → fuerza al developer a dar un nombre accesible al sheet → without accessible name, el `role="dialog"` no es descriptivo → **Para tu caso:** hacer required el accessible name en el API (no solo en documentación)
- **Partial-height "peek" support:** → el peek state es el primer snap point — el sheet muestra un slice del contenido antes de expandirse completamente → **Para tu caso:** el peek height debe ser significativo (mostrar al menos el handle + un título) para que el usuario entienda qué esperar al expandir

**Notable Props:** `accessibilityLabel: string` (required), responsive behavior (bottom on mobile, side on desktop), partial-height peek support, dismiss button

**Accessibility:** `role="dialog"`. Focus trap. Escape to close. `accessibilityLabel` mandatory.

---

### Spectrum — "Tray: bottom Dialog sin gestures"

Spectrum Tray es un Dialog posicionado en bottom de viewport en mobile. Sin drag handle, sin snap points, sin swipe-to-dismiss. Es una "bottom drawer modal", no un true bottom sheet. Hereda toda la a11y de Dialog: `role="dialog"`, `aria-modal`, focus trap, Escape to close.

---

### Ant Design — "Drawer con placement="bottom": bottom drawer enterprise"

`Drawer placement="bottom"` en Ant Design crea un overlay panel que surge desde el bottom edge. `height` prop controla el tamaño. `mask={false}` crea un non-blocking bottom panel (simula el Standard variant de M3 sin gestos). Sin snap points, sin drag handle. Útil para dashboards enterprise que necesitan un panel bottom rápido sin mobile-native behavior.

---

### Chakra UI — "Drawer placement="bottom" + size variants"

Chakra Drawer `placement="bottom"` con variantes de size (xs a full). Hereda la accesibilidad completa de Drawer. Sin gestos. La opción más accesible del conjunto "bottom drawer" por su sólida implementación de focus management.

---

### Fluent 2 — "Bottom Drawer inline (push-aside) para paneles persistentes"

Fluent 2 `Drawer position="bottom" type="inline"` crea un panel que empuja el contenido hacia arriba en lugar de superponerlo — el único sistema con este patrón. Útil para: media controls, chat input, filtros persistentes que deben coexistir con contenido scrolleable sin bloquear.

---

### Mantine — "Drawer position="bottom" con sub-componentes"

Mantine ofrece `Drawer.Root`, `Drawer.Content`, `Drawer.Header`, `Drawer.Body` — la API más composable del conjunto "bottom drawer". `position="bottom"`. Sin gestos. `withOverlay` toggle.

---

### Base Web — "Drawer anchor="bottom" con overrides"

Base Web Drawer `anchor="bottom"` con el override system de Base Web para customización profunda de estructura y estilos. Sin snap points ni drag handle.

---

## Pipeline Hints

**Archetype recommendation:** `composite-overlay`
Rationale: Bottom Sheet es un overlay compuesto con múltiples sub-componentes (drag handle, content area, footer actions) y behavior de overlay (scrim, focus trap en modal variant). composite-overlay captura ambas características.

**Slot consensus:** (true bottom sheets + bottom drawers, 8+ sistemas)
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| drag-handle | visual | no | 3/8 | M3 (composable), shadcn/Vaul (visual), Gestalt (visual); omitido en "bottom drawers" |
| header/title | text | no | 7/8 | Título del sheet; recomendado para accesibilidad (aria-labelledby) |
| content/body | container | yes | 8/8 | Contenido principal del sheet; scrolleable cuando el sheet está at max snap |
| footer/actions | container | no | 5/8 | Action buttons; fixed al bottom del sheet durante scroll del body |
| close-button | icon-action | no | 6/8 | Visible dismiss affordance (requerida como alternativa a swipe-to-dismiss) |
| scrim/overlay | visual | no | 5/8 | Background overlay para Modal variant; ausente en Standard |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| isOpen/isVisible | state | boolean | 8/8 | Controlled open state |
| variant | variant | modal/standard/inline | 3/8 | M3 (Standard/Modal), Ant (`mask`), Fluent 2 (`type`) |
| snapPoints | variant | array of heights | 2/8 | M3 implícito (3 detents), shadcn/Vaul explicit array |
| height | variant | px / % / "full" | 6/8 | Fixed height para bottom drawers; snap-based para true bottom sheets |
| isDismissible | boolean | true/false | 5/8 | Swipe-to-dismiss o close button; algunas implementaciones non-dismissible |
| shouldScaleBackground | boolean | true/false | 1/8 | shadcn/Vaul iOS-style background scaling |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| isModal | 4/8 | true | Modal (scrim + focus trap) vs. Standard (no scrim, no trap) |
| hasDragHandle | 3/8 | true | Visual drag affordance; critical for true bottom sheets |
| isDismissible | 5/8 | true | Whether swipe-down / close button dismisses |
| shouldScaleBackground | 1/8 | false | iOS background scaling (shadcn/Vaul) |
| hasSafeArea | 1/8 | false | Bottom safe-area padding; needed on mobile web |
| skipPartiallyExpanded | 1/8 | false | M3: skip half-expanded snap point |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| closed | 8/8 | sheet off-screen (translateY 100%) | No DOM impact in some implementations; others keep in DOM |
| peek/collapsed | 3/8 | sheet at first snap point; partial content visible | M3, shadcn/Vaul, Gestalt |
| half-expanded | 2/8 | sheet at 50% viewport height | M3 (partiallyExpanded), shadcn/Vaul (second snap) |
| fully-expanded | 5/8 | sheet at max height; internal content scrollable | All true bottom sheets |
| dragging | 2/8 | sheet follows pointer/touch position; spring resistance at boundaries | M3, shadcn/Vaul |
| dismissing | 3/8 | sheet animates downward out of viewport | On swipe-to-dismiss or close |
| focus-trapped | 5/8 | focus confined to sheet content; background aria-hidden | Modal variant only |

**Exclusion patterns found:**
- Standard (non-modal) × focus trap — Standard bottom sheets do NOT trap focus; this is fundamental to their "coexist with background" nature
- Modal × no close button — Modal bottom sheets must always have a visible dismiss control (WCAG 2.5.1 — gesture alternatives); swipe-to-dismiss alone is insufficient

**Building block candidates:**
- drag-handle → `.BottomSheetHandle` — M3, shadcn/Vaul formalize as composable/sub-component
- footer-actions → `.BottomSheetFooter` — 5/8 sistemas con footer fixo separado del body scrolleable

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| snapPoints | ["Ndp", "M%", 1] | 2/8 | M3 (3 implicit), shadcn/Vaul (explicit array) |
| activeSnapPoint | collapsed, partial, expanded | 2/8 | Controlled snap position |
| scrimOpacity | 0-1 / fade-from-index | 1/8 | shadcn/Vaul fadeFromIndex; M3 fixed scrim |
| backdropStyle | scrim, scale, none | 2/8 | M3 scrim; shadcn shouldScaleBackground |

**A11y consensus:**
- Primary role: `role="dialog"` + `aria-modal="true"` para TODAS las variantes de bottom sheet (modal y standard) — semánticamente es un dialog independientemente de su posición o behavior
- Required ARIA: `aria-labelledby` apuntando al título del sheet (o `aria-label` si sin título visible)
- Focus: Modal variant → focus trap + focus move a sheet on open + return to trigger on close. Standard variant → NO focus trap (usuario puede tab entre sheet y background)
- Keyboard: Escape cierra. Drag handle: debe ser focusable con `role="slider"` + Arrow keys para expand/collapse (WCAG 2.5.1 — gesture alternative required)
- Background: `aria-hidden="true"` en contenido de fondo cuando Modal variant está open
- Close button: SIEMPRE visible como alternativa a swipe-to-dismiss (WCAG 2.5.1)
- Safe area: `padding-bottom: env(safe-area-inset-bottom)` en mobile web
- Gestalt: `accessibilityLabel` required es el modelo a seguir — forzar accessible name en el API

---

## Type Taxonomy

**Classification rule:**
| Shell overlap | Decision | Figma strategy |
|---------------|----------|----------------|
| ≥ 70% | Template | Same component set |
| 40–70% | Extension | Same component set + property |
| < 40% | Separate | Own component set |

**Types found:**
| Type | Shell % | Decision | Key differentiator | Systems |
|------|---------|----------|--------------------|---------|
| Modal bottom sheet (full gesture) | 100% | Template | Scrim + focus trap + snap points + drag handle | M3, shadcn/Vaul |
| Standard bottom sheet (non-modal) | 80% | Template | No scrim, no focus trap, Standard coexists with background | M3 |
| Bottom drawer (CSS-positioned, no gestures) | 60% | Extension | Overlay from bottom edge, fixed height, no snap points | Ant, Chakra, Base Web, Fluent 2, Mantine |
| Inline bottom panel (push-aside) | 40% | Extension | Pushes content up instead of overlaying | Fluent 2 inline type |
| Responsive sheet (bottom ↔ side) | 70% | Template | Automatically bottom on mobile, side on desktop | Gestalt |
| Action sheet (action list only) | 20% | Separate | Bottom-positioned list of actions; no drag, no content area | Primer ActionSheet |
| Persistent bottom utility bar | 10% | Separate | Always visible, minimizable, not dismissible | Salesforce Docked Utility Bar |
| NOT a bottom sheet — Drawer (right-side) | 0% | Not-a-sheet | Right-anchored; different interaction axis | Atlassian, Orbit, Evergreen |
| NOT a bottom sheet — Toast | 0% | Not-a-sheet | Ephemeral, auto-dismiss, no content area | All toast systems |

---

## What Everyone Agrees On

1. **Bottom sheet = dialog semantics:** Every system that implements any form of bottom overlay uses `role="dialog"`. Position doesn't change the semantic role.

2. **Escape key closes:** Universal across all implementations — Modal and non-modal variants.

3. **Close button required as gesture alternative:** All systems with swipe-to-dismiss also provide a visible close button. WCAG 2.5.1 requires non-gesture alternatives.

4. **Focus moves into sheet on open:** The dialog focus contract applies universally — when a modal bottom sheet opens, focus moves inside.

5. **Fixed height ("full") = essentially a modal:** When a bottom sheet expands to 100% viewport height, it is functionally identical to a full-screen modal. Most systems that lack a bottom sheet use full-screen modal on mobile viewports instead.

---

## Where They Disagree

**¿True bottom sheet con gestures o bottom drawer sin gestures?**
- **Option A: True bottom sheet** (M3, shadcn/Vaul) — drag handle + snap points + swipe-to-dismiss + nested scrolling; native feel; complejo de implementar; requiere gesture library
- **Option B: Bottom drawer** (Chakra, Ant, Base Web, Mantine, Fluent 2) — `position="bottom"` CSS; sin gestos; fácil de implementar; se siente como un modal posicionado, no como una sheet nativa
- **Para tu caso:** Si el producto es mobile-first o PWA, true bottom sheet vale la complejidad; para desktop-primary con mobile responsive, bottom drawer es suficiente

**¿Standard (non-modal) o solo Modal?**
- **Option A: Ambos Standard + Modal** (M3) — Standard para "información adicional mientras continúas" (mapa + resultados); Modal para "acción requerida antes de continuar"
- **Option B: Solo Modal** (todos los demás) — una sola semántica de overlay; más simple de implementar y documentar
- **Para tu caso:** Implementar ambos si existen casos de uso de coexistencia con contenido de fondo (mapas, feeds); Modal-only si todos los casos requieren resolución antes de continuar

**¿Snap points explícitos o fixed height?**
- **Option A: Snap points configurables** (M3 implícito, shadcn/Vaul `snapPoints` array) — revelación progresiva; UX nativa; complejo
- **Option B: Fixed height** (Chakra, Ant, Base Web, Mantine) — altura determinada al abrir; no drag-to-resize; más predecible
- **Para tu caso:** Si el contenido varía en cantidad, snap points dan mejor UX; si el contenido es predecible en tamaño, fixed height es más simple

**¿Responsive unificado (bottom + side) o componentes separados?**
- **Option A: Responsive unificado** (Gestalt Sheet) — un componente, dos presentaciones; menos componentes; más simple para el consumer
- **Option B: Componentes separados** (la mayoría) — `BottomSheet` para mobile, `Drawer/SidePanel` para desktop; APIs optimizadas por contexto
- **Para tu caso:** Unificado reduce complejidad si ambas presentaciones comparten la misma lógica de contenido; separados si mobile y desktop tienen comportamientos fundamentalmente distintos

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Peek → expand → full | Tres snap points de revelación progresiva | Resultados de búsqueda, filtros, action panels | M3, shadcn/Vaul |
| Full-height modal sheet | Sheet que cubre 100% viewport | Rich forms, detail views | M3, todos los bottom drawers |
| Non-modal coexistent | Coexiste con contenido de fondo (mapa, feed) | Geo/map apps, content browsing | M3 Standard variant |
| Inline bottom push | Empuja contenido arriba en lugar de superponer | Persistent media controls, chat input | Fluent 2 |
| Responsive sheet | Bottom en mobile, side en desktop | Filtros, settings, detail panels | Gestalt |

**Snap points pattern (M3/Vaul):**
```
┌─────────────────────┐   ┌─────────────────────┐   ┌─────────────────────┐
│                     │   │                     │   │ ──── handle ────    │
│   (page content)    │   │   (page content)    │   │ Title               │
│                     │   │ ──── handle ────    │   │ ──────────────────  │
│ ──── handle ────    │   │ Title               │   │ Content item 1      │
│ Title               │   │ ──────────────────  │   │ Content item 2      │
└─────────────────────┘   │ Content item 1      │   │ Content item 3      │
      PEEK (56dp)          └─────────────────────┘   └─────────────────────┘
                               HALF-EXPANDED              FULLY EXPANDED
                               (50% viewport)              (100% / max)
```

**Non-modal Standard (M3):**
```
┌─────────────────────────────┐
│                             │
│    🗺️ MAP (interactive)      │
│                             │
│ ── handle ──────────────── │
│ Search Results (3 found)   │
│ ─────────────────────────  │
│ 📍 Café Central - 200m     │
│ 📍 Library - 450m          │
└─────────────────────────────┘
  (user can tap map AND read results simultaneously)
```

**iOS-style background scaling (shadcn/Vaul `shouldScaleBackground`):**
```
┌─────────────────────┐
│ ┌───────────────┐   │  ← Background scales + rounds corners
│ │  Page content │   │
│ │    (scaled)   │   │
│ └───────────────┘   │
│ ──── handle ────    │
│ Sheet content       │
└─────────────────────┘
```

---

## Risks to Consider

**Risk 1: Nested scrolling mal implementado** (HIGH)
El error más común en bottom sheets: el sheet scroll se activa antes de que el sheet esté completamente expandido, causando que el usuario intente scrollear el contenido pero en cambio scrollee el sheet (o viceversa). La frustración es máxima.
**Mitigation:** Implementar el contrato de M3: el sheet SIEMPRE se expande al máximo snap point antes de activar el scroll interno del contenido. Touch velocity < threshold = snap; threshold = scroll content.

**Risk 2: Swipe-to-dismiss como única forma de cerrar** (HIGH)
Implementar swipe-to-dismiss sin close button visible viola WCAG 2.5.1 (Pointer Gestures — must have non-pointer alternative). Users with motor disabilities, keyboard users, y algunos screen reader users no pueden swipe.
**Mitigation:** Close button visible siempre que `isDismissible=true`. El drag handle también debe tener keyboard semantics (Arrow keys).

**Risk 3: Modal bottom sheet sin focus trap** (HIGH)
Un modal bottom sheet que no trapa el focus permite que usuarios de teclado naveguen al contenido oscurecido por el scrim — invisible visualmente pero accesible por teclado.
**Mitigation:** `aria-hidden="true"` en el contenido de fondo. Focus trap en el sheet. Retorno del focus al trigger element al cerrar.

**Risk 4: Conflict con virtual keyboard en mobile** (MEDIUM)
Cuando el bottom sheet contiene un input y el usuario lo enfoca, el keyboard virtual sube y puede tapar el sheet o el input. En iOS, el behavior es especialmente unpredictable con position:fixed.
**Mitigation:** Usar `env(keyboard-inset-height)` CSS variable cuando disponible; considerar `resize: "none"` en el sheet height para evitar reflows; testear en iOS Safari específicamente.

**Risk 5: Bottom sheet sobre bottom nav** (MEDIUM)
Si el producto tiene Bottom Nav + Bottom Sheet, el sheet debe superponer el Bottom Nav (z-index mayor). Sin coordinar z-index, el bottom nav aparece sobre el sheet.
**Mitigation:** Sistema de z-index layers: bottom-nav (z: 100), bottom-sheet (z: 200), bottom-sheet-scrim (z: 150).

---

## Dimension Scores

| Sistema | Gesture Completeness | A11y | Flexibility | Snap Points | Nested Scroll | Total |
|---------|---------------------|------|-------------|-------------|---------------|-------|
| Material Design 3 | 10 | 8 | 8 | 10 | 10 | **46/50** |
| shadcn/ui (Vaul) | 9 | 8 | 9 | 9 | 8 | **43/50** |
| Gestalt (responsive) | 7 | 9 | 8 | 5 | 5 | **34/50** |
| Chakra (bottom drawer) | 4 | 9 | 8 | 1 | 1 | **23/50** |
| Mantine (bottom drawer) | 4 | 8 | 8 | 1 | 1 | **22/50** |
| Fluent 2 (inline) | 4 | 8 | 7 | 1 | 1 | **21/50** |
| Ant (bottom drawer) | 4 | 6 | 8 | 1 | 1 | **20/50** |
| Base Web (bottom drawer) | 4 | 8 | 7 | 1 | 1 | **21/50** |

---

## Next Steps

1. **`/spec bottom-sheet`** — Generate config.json with anatomy (drag handle, snap points, modal vs. standard variant, footer actions)
2. **`/enrich bottom-sheet`** — Add a11y (dialog semantics, focus trap, keyboard gesture alternatives, WCAG 2.5.1)
3. **`/build bottom-sheet`** — Full pipeline in one command using this research as cache
4. **`/build bottom-sheet --max`** — Use pre-generated config without scope questions
5. **`/research bottom-sheet --fresh`** — Re-run research from scratch (bypasses this cache)

**Key spec decisions to make:**
- True bottom sheet with gestures (requires Vaul or custom gesture library) vs. simple bottom drawer?
- Standard (non-modal) + Modal variants, or Modal only?
- Snap points: configurable array vs. fixed 3-detent system (collapsed/half/full)?
- Responsive unification with side panel (Gestalt model) or separate components?
- Background scaling (iOS `shouldScaleBackground`) opt-in?
