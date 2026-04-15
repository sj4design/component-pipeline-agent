# Drawer — Component Research

**Fecha:** 2026-04-10
**Modo:** --max (todas las variantes, todos los patrones)
**Sistemas analizados:** 24 (todos)
**Scope:** Panel lateral overlay (right/left/bottom/top)

---

## Sistemas sin componente dedicado

| Sistema | Razon | Workaround |
|---------|-------|------------|
| Spectrum (Adobe) | Drawer = Dialog posicionado. Toda overlay con contenido interactivo DEBE ser Dialog | ModalOverlay + Dialog con CSS `position: fixed; inset-inline-end: 0; height: 100%` |
| Carbon (IBM) | Aplicaciones enterprise IBM usan navegacion full-page, no drawers | UI Shell Right Panel para paneles contextuales; Modal con CSS custom para otros casos |
| Polaris (Shopify) | Sheet deprecado por filosofia: "fomentaba capas de complejidad en vez de mejorar la UI existente" | Modal o Popover segun el caso |
| Primer (GitHub) | Sin Drawer dedicado; overlays se manejan via Dialog generico | Dialog overlay + AnchoredOverlay para paneles anclados |
| Cedar (REI) | No presente en el sistema | Modal para contenido overlay |
| GOV.UK | Modelo de navegacion lineal por paginas; no hay overlays laterales en el patron gubernamental | Navegacion pagina a pagina |
| Nord (Nordhealth) | Overlays que ocultan datos clinicos son riesgo de seguridad del paciente | Modal y navegacion por pagina |

---

## How Systems Solve It

### Material Design 3 -- "Taxonomia semantica: Side Sheet vs Navigation Drawer"

M3 hace la distincion mas clara del ecosistema: Side Sheets son para contenido suplementario (detalles, filtros, herramientas) y Navigation Drawers son para navegacion de la app. Son componentes completamente diferentes con roles semanticos distintos. Los Side Sheets vienen en dos variantes: Standard (persistente, empuja el contenido principal) y Modal (overlay con scrim que cierra al hacer click fuera). Para mobile, M3 recomienda Bottom Sheet en vez de Side Sheet porque los paneles laterales no funcionan en anchos de pantalla reducidos. Esta separacion refleja la filosofia de Google de que la navegacion de la app y el contenido auxiliar son preocupaciones fundamentalmente diferentes.

**Design Decisions:**
| Que | Por que | Impacto | Para tu caso |
|-----|---------|---------|--------------|
| Side Sheet vs Navigation Drawer como componentes separados | El contenido auxiliar (filtros, detalles) y la navegacion de app tienen roles semanticos diferentes; mezclarlos genera confusion de ARIA | HIGH | Si tu drawer combina navegacion y contenido, considera dos componentes |
| Standard (push) vs Modal (overlay) como variantes | Push mantiene el contexto del contenido principal visible; Modal bloquea para tareas enfocadas | HIGH | Decide si necesitas modo push (inline) o solo overlay |
| Bottom Sheet para mobile | Side panels consumen demasiado ancho en pantallas < 768px; bottom sheet aprovecha el eje vertical | MED | Si tu app es mobile-first, agrega posicion bottom |

**Notable Props:** `SideSheet` con `show/hide` para Standard; `ModalSideSheet` para overlay; `NavigationDrawer` como componente separado
**Accessibility:** Modal Side Sheet usa `role="dialog"` con `aria-modal` y `aria-labelledby`; foco atrapado dentro; Escape cierra. Standard (persistente) NO atrapa foco.

---

### Ant Design -- "El drawer mas completo: 4 direcciones, no-blocking, nesting"

Ant Design tiene la implementacion de Drawer mas rica en funcionalidad entre los 24 sistemas. Soporta cuatro direcciones (top/right/bottom/left), modo no-blocking con `mask={false}` donde el contenido principal sigue siendo interactivo, nesting documentado de multiples drawers con la prop `push` que desplaza visualmente al drawer padre para comunicar la profundidad del stack, y un `dragger` affordance para apertura/cierre tactil. El header tiene un slot `extra` para acciones junto al titulo. Esta versatilidad refleja las necesidades de los dashboards enterprise complejos de Alibaba donde multiples paneles de filtros y detalles coexisten.

**Design Decisions:**
| Que | Por que | Impacto | Para tu caso |
|-----|---------|---------|--------------|
| 4 direcciones (top/right/bottom/left) | Dashboards enterprise necesitan paneles en cualquier borde; bottom drawer funciona como bottom sheet movil | HIGH | Incluye al menos left/right; top/bottom son nice-to-have |
| `mask={false}` modo no-blocking | Paneles de filtros persistentes deben permitir interaccion con contenido principal | HIGH | Boolean overlay/backdrop para controlar bloqueo |
| `push` para nesting | Multiples drawers necesitan comunicar profundidad; empujar el padre revela el stack | MED | Si tu app tiene drawers anidados, el patron push es critico |
| `extra` slot en header | Acciones como "Save" o iconos de herramientas van junto al titulo sin ocupar footer | MED | Slot para acciones de header ademas del close button |

**Notable Props:** `placement: "top"|"right"|"bottom"|"left"`; `mask: boolean`; `push: boolean|{distance}`; `extra` header slot; `destroyOnClose`
**Accessibility:** `role="dialog"` con `aria-modal` cuando mask esta activo; Escape cierra; foco atrapado cuando es blocking. Cuando `mask={false}`, drawer no es modal y NO atrapa foco.

---

### Atlassian -- "Left-only con 5 anchos semanticos"

El Drawer de Atlassian abre exclusivamente desde la izquierda. Cinco anchos con nombres semanticos (narrow, medium, wide, extended, full) cubren todos los casos de Jira y Confluence. El z-index 600 lo coloca por encima del contenido pero debajo de los modals (z-index 700), previniendo conflictos de capas en los layouts complejos de Jira con multiples paneles. El componente esta marcado para futura deprecacion en favor de un approach mas flexible de overlays, aunque sin timeline definido.

**Design Decisions:**
| Que | Por que | Impacto | Para tu caso |
|-----|---------|---------|--------------|
| Solo direccion izquierda | La jerarquia de informacion de Atlassian coloca la navegacion a la izquierda; drawers emergen del mismo lado | HIGH | Si tu app es solo LTR, left+right cubre el 95% de casos |
| 5 anchos semanticos | Nombres como "narrow" para help panels y "extended" para vistas detalladas dan contexto de uso | MED | Mapea a sm/md/lg/xl o usa anchos semanticos |
| Z-index 600 (debajo de Modal) | En sistemas complejos con multiples overlays, el drawer no debe bloquear modals | MED | Define z-index hierarchy: drawer < modal |

**Notable Props:** `width: "narrow"|"medium"|"wide"|"extended"|"full"`; `onClose`; `isOpen: boolean`; `overrides`
**Accessibility:** `role="dialog"` con `aria-modal`; foco al primer elemento focusable al abrir; Escape cierra y devuelve foco al trigger; scroll lock en body.

---

### Twilio Paste -- "SidePanel con opcion no-modal"

Paste implementa un SidePanel anclado a la derecha con opcion de comportamiento no-modal. El enfoque es pragmatico para la consola de Twilio: paneles contextuales que pueden o no bloquear el contenido principal segun la tarea. Focus trap completo en modo modal, libre en no-modal.

**Design Decisions:**
| Que | Por que | Impacto | Para tu caso |
|-----|---------|---------|--------------|
| Right-anchored por defecto | Consola de Twilio fluye izquierda-a-derecha; detalles contextuales a la derecha | MED | Confirma que right es tu posicion por defecto |
| Non-modal option | Paneles de referencia deben permitir copiar datos del contenido principal | HIGH | Boolean para modal/non-modal |

**Notable Props:** Side panel con focus trap; right-anchored
**Accessibility:** `role="dialog"` + `aria-modal="true"` en modal; focus trap; Escape cierra; `prefers-reduced-motion` respetado.

---

### Lightning (Salesforce) -- "Panel + Docked Utility Bar"

Lightning no tiene un Drawer generico sino un Panel para detalles de registros (right panel) y un Docked Utility Bar — una barra persistente en la parte inferior con paneles minimizables (Notes, Recent Items, Open CTI). El Docked Utility Bar es unico en los 24 sistemas: cubre el caso de herramientas persistentes que se minimizan/maximizan sin ser un drawer tradicional.

**Design Decisions:**
| Que | Por que | Impacto | Para tu caso |
|-----|---------|---------|--------------|
| Panel para detalles de registro | En CRM, detalles del registro actual a la derecha es el patron dominante | MED | Si tu caso es detalle de registro, el right panel es suficiente |
| Docked Utility Bar (bottom) | Herramientas persistentes (telefono, notas) necesitan estar siempre accesibles sin ocupar espacio principal | LOW | Unico; solo relevante para apps tipo CRM con herramientas persistentes |

**Accessibility:** ARIA propio del panel de Lightning; focus management en el panel.

---

### shadcn/ui -- "Sheet (Dialog lateral) + Drawer (Vaul bottom sheet)"

shadcn/ui hace una distincion clave: Sheet es un Dialog variant que se desliza desde cualquier lado (top/right/bottom/left), mientras Drawer (basado en la libreria Vaul) es especificamente un bottom sheet mobile con drag handle y snap points. Sheet hereda toda la a11y de Dialog (focus trap, Escape, aria-modal). Drawer/Vaul proporciona gestos nativos de arrastre, puntos de snap (parcialmente abierto, completamente abierto), y animacion spring.

**Design Decisions:**
| Que | Por que | Impacto | Para tu caso |
|-----|---------|---------|--------------|
| Sheet vs Drawer como componentes separados | Side panel (Dialog posicionado) y bottom sheet mobile (gestos nativos) son interacciones fundamentalmente diferentes | HIGH | Si necesitas bottom sheet con drag, es un componente separado |
| Sheet hereda de Dialog | Un drawer ES un dialog posicionado; reusar Dialog garantiza a11y correcta sin duplicar logica | HIGH | Basa tu drawer en tu Dialog existente |

**Accessibility:** Sheet: `role="dialog"`, `aria-modal`, focus trap, Escape cierra. Drawer/Vaul: drag handle accesible, snap points.

---

### Chakra UI -- "Drawer dedicado con placement + sizes"

Chakra UI tiene un Drawer dedicado con prop `placement` (top/right/bottom/left) y variantes de size desde xs hasta full. Comparte infraestructura con Modal (mismo sistema de overlay y focus trap). Sizes mapeados a anchos fijos: xs=256px, sm=320px, md=480px, lg=640px, xl=768px, full=100vw.

**Design Decisions:**
| Que | Por que | Impacto | Para tu caso |
|-----|---------|---------|--------------|
| Sizes con valores fijos | Anchos predeterminados evitan inconsistencia entre equipos | HIGH | Define anchos fijos por size, no porcentajes |
| 4 direcciones | Flexibilidad completa para cualquier layout | HIGH | Incluye al menos left/right; bottom para mobile |

**Notable Props:** `placement: "top"|"right"|"bottom"|"left"`; `size: "xs"|"sm"|"md"|"lg"|"xl"|"full"`
**Accessibility:** Comparte Modal a11y: `role="dialog"`, `aria-modal`, focus trap, Escape.

---

### Base Web -- "Drawer con anchors + overrides"

Base Web tiene Drawer con `anchor` prop (left/right/top/bottom), capa compartida con Modal, y sistema Overrides para personalizar todos los elementos estructurales. No tiene sub-componentes de header/footer built-in — el contenido es libre.

**Design Decisions:**
| Que | Por que | Impacto | Para tu caso |
|-----|---------|---------|--------------|
| Sin header/footer estructurados | Contenido libre da flexibilidad pero pierde consistencia | MED | Siempre incluir header/footer como sub-componentes |
| Overrides system | Cada elemento interno es personalizable via API | LOW | Util para enterprise, no necesario en Figma |

**Accessibility:** Capa Modal compartida: `role="dialog"`, `aria-modal`, focus trap.

---

### Fluent 2 -- "Overlay vs Inline: el patron mas distintivo"

Fluent 2 tiene la distincion mas significativa entre los 24 sistemas: `type="overlay"` (drawer tradicional con scrim) vs `type="inline"` (empuja el contenido principal creando un split-panel sin overlay). `modalType` controla la intensidad del focus trap. `position="start|end"` soporta RTL nativamente. El tipo inline alimenta la sidebar persistente de Teams y el panel de archivos de Office — contextos donde panel y contenido principal deben ser simultaneamente visibles e interactivos.

**Design Decisions:**
| Que | Por que | Impacto | Para tu caso |
|-----|---------|---------|--------------|
| Overlay vs Inline como type | Un drawer que empuja contenido (inline) es fundamentalmente diferente en layout y foco que uno que superpone (overlay) | HIGH | Si necesitas modo push/inline, es un type, no un boolean |
| `position="start\|end"` para RTL | Hardcodear "left"/"right" rompe en RTL; "start"/"end" son direction-agnostic | MED | Si tu app soporta RTL, usa start/end en vez de left/right |
| `modalType` para intensidad de focus | No-modal (foco libre), modal (trap), alert (confirmar cierre) | MED | Tres niveles de bloqueo son enterprise; modal/non-modal cubre la mayoria |

**Notable Props:** `type: "overlay"|"inline"`; `position: "start"|"end"`; `modalType: "modal"|"non-modal"|"alert"`
**Accessibility:** Overlay: `role="dialog"`, `aria-modal`, focus trap. Inline: `role="complementary"`, sin focus trap (contenido lateral navegable).

---

### Gestalt (Pinterest) -- "Sheet responsive: bottom en mobile, side en desktop"

Gestalt llama al componente "Sheet" (no "Drawer"). Su caracteristica mas destacada: en mobile se comporta como bottom sheet, en desktop como side panel — una sola componente que maneja el problema de dos plataformas. `accessibilityLabel` es requerido (no opcional). En mobile (Pinterest's plataforma dominante), un drawer lateral consume demasiado ancho; un bottom sheet aprovecha el eje vertical.

**Design Decisions:**
| Que | Por que | Impacto | Para tu caso |
|-----|---------|---------|--------------|
| Responsive: bottom (mobile) / side (desktop) | Un drawer lateral no funciona en < 768px; bottom sheet es el patron nativo mobile | HIGH | Considera responsive behavior si tu app es mobile-first |
| `accessibilityLabel` required | Fuerza a los devs a nombrar el drawer para screen readers | HIGH | Siempre requerir label accesible |

**Accessibility:** `role="dialog"`, `aria-modal`, `accessibilityLabel` obligatorio.

---

### Mantine -- "Composable con sub-componentes"

Mantine usa sub-componentes composables: `Drawer.Root`, `Drawer.Content`, `Drawer.Header`, `Drawer.Body`. `withOverlay` y `trapFocus` son props explicitas que el dev controla directamente. Cuatro direcciones. Esta composicion da control granular pero requiere que el dev ensamble correctamente.

**Design Decisions:**
| Que | Por que | Impacto | Para tu caso |
|-----|---------|---------|--------------|
| Sub-componentes composables | Flexibilidad para drawers con estructura personalizada | MED | En Figma, modelar header/body/footer como slots/BBs |
| `withOverlay` y `trapFocus` como props explicitas | Separar overlay visual de focus trap permite drawers no-modal con overlay visual o modal sin overlay | MED | Interesante pero complejo; simplificar a modal vs non-modal |

**Accessibility:** `role="dialog"`, focus trap configurable, Escape cierra.

---

### Orbit (Kiwi.com) -- "Right-anchored para filtros de viaje"

Orbit tiene un Drawer anclado a la derecha optimizado para filtros de viaje. `fixedFooter` fija botones de accion en la parte inferior (Apply/Reset filtros). En mobile, el drawer se expande a pantalla completa. `title` para texto del header.

**Design Decisions:**
| Que | Por que | Impacto | Para tu caso |
|-----|---------|---------|--------------|
| `fixedFooter` para acciones | Botones Apply/Reset deben ser siempre visibles sin importar el scroll | HIGH | Footer fijo es critico si el drawer tiene scroll largo |
| Full-screen en mobile | En pantalla pequena, un drawer parcial pierde contexto | MED | Considerar full-screen como size en mobile |

**Accessibility:** `role="dialog"`, focus trap, Escape cierra.

---

### Evergreen -- "SideSheet con ancho flexible"

Evergreen lo llama "SideSheet" con prop `width` flexible para variar la densidad de detalle: 400px para status views hasta 800px para schema editors. Right-anchored. Patron "over-list" para B2B — el panel de detalle se abre sobre una lista de items.

**Design Decisions:**
| Que | Por que | Impacto | Para tu caso |
|-----|---------|---------|--------------|
| Width flexible (no sizes discretos) | Cada caso de uso B2B tiene necesidades de ancho diferentes | MED | Sizes discretos (sm/md/lg) son mejores para consistencia |

**Accessibility:** `role="dialog"`, focus management.

---

### Wise -- "Bottom sheet mobile-first"

Wise tiene un Drawer especificamente orientado a mobile como bottom sheet para acciones. Refleja el uso mobile-dominant de Wise para transferencias.

---

### Dell / Playbook -- "Enterprise side panel"

Ambos tienen implementaciones basicas de drawer lateral para aplicaciones enterprise. Sin features distintivos mas alla del patron basico overlay + panel.

---

## Pipeline Hints

**Archetype recommendation:** container
Rationale: Un drawer es un panel con regiones estructuradas (header/body/footer), contenido flexible, y posicionamiento de borde — encaja en el patron container como Modal y Card.

**Slot consensus:**
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| header | container | no | 18/24 | Region superior con titulo + acciones. BB candidate: .DrawerHeader |
| title | text | yes | 20/24 | Titulo principal del drawer. Ligado a `aria-labelledby` |
| close-button | icon-action | no | 20/24 | Boton X para cerrar. Siempre visible por defecto |
| header-actions / extra | container | no | 6/24 | Acciones adicionales en header (Ant `extra`, iconos de herramientas) |
| body | container | yes | 22/24 | Contenido principal scrollable. BB candidate: .DrawerBody |
| footer | container | no | 14/24 | Acciones principales (Apply, Cancel, Save). BB candidate: .DrawerFooter |
| overlay / backdrop | visual | no | 20/24 | Scrim/mask detras del drawer. Boolean para mostrar/ocultar |
| divider-header | divider | no | 10/24 | Separador entre header y body |
| divider-footer | divider | no | 8/24 | Separador entre body y footer |
| drag-handle | visual | no | 3/24 | Affordance tactil para arrastrar (Vaul, Ant dragger). Solo bottom drawer |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| Size | variant | sm/md/lg/xl/full | 16/24 | Chakra: xs-full. Atlassian: narrow/medium/wide/extended/full. Consenso: sm/md/lg |
| Position | variant | left/right/top/bottom | 14/24 | Ant, Chakra, Base Web, Mantine, shadcn: 4 dirs. M3, Atlassian: limitado |
| State | state | default (solo default para el panel en si) | 24/24 | El drawer no tiene hover/focus propios; sus hijos internos si |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| hasHeader | 18/24 | true | Controla visibilidad del header region |
| hasFooter | 14/24 | false | Controla visibilidad del footer con acciones |
| hasCloseButton | 20/24 | true | Boton X en header. Complementa Escape |
| hasOverlay | 20/24 | true | Scrim/mask detras. `mask` en Ant, `withOverlay` en Mantine |
| isOpen | 22/24 | false | Estado abierto/cerrado (runtime, no Figma variant) |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default (open) | 24/24 | Panel visible, overlay activo | Estado mostrado en Figma |
| closed | 24/24 | Panel oculto | No se modela en Figma (es la ausencia) |

Nota: El drawer en si no tiene estados interactivos (hover/focus/pressed). Los estados aplican a sus elementos internos (close button, footer buttons, contenido). Por eso State no multiplica frames en el drawer shell.

**Exclusion patterns found:**
- El drawer no tiene estados interactivos propios, asi que no hay exclusiones de state x state
- Position=top/bottom con Size semantico puede causar confusion (ancho vs alto) — considerar que Size aplica al eje perpendicular a la apertura

**Building block candidates:**
- header -> `.DrawerHeader` -- 18/24 sistemas tienen header estructurado (titulo + close button + acciones opcionales). Composicion: titulo (text) + close-button (icon-action) + extra actions (container)
- body -> `.DrawerBody` -- 22/24 sistemas tienen body scrollable. Contenido libre (formularios, listas, detalles). Placeholder text en Figma.
- footer -> `.DrawerFooter` -- 14/24 sistemas tienen footer con botones de accion. Composicion tipica: Cancel + Primary action buttons.

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| drawerType | overlay/inline | 3/24 | Fluent 2 es el referente. Overlay = default, inline = push-aside |
| modalType | modal/non-modal | 8/24 | Modal: focus trap + overlay. Non-modal: sin trap, contenido principal interactivo |

**A11y consensus:**
- Primary role: `dialog` (modal drawer) o `complementary` (non-modal/inline) — 20/24 consensus para `dialog`
- Required ARIA: `aria-modal="true"` (solo modal), `aria-labelledby` (apunta al titulo del drawer)
- Keyboard: Escape cierra, Tab cicla dentro (modal), focus al primer focusable al abrir
- Focus: trap (modal) / linear (non-modal)
- APG pattern: Dialog (Modal)
- Background: `aria-hidden="true"` en contenido detras del drawer modal
- Return focus: al elemento trigger al cerrar

---

### Type Taxonomy

**Classification rule:**
| Shell overlap | Decision | Figma strategy |
|---------------|----------|----------------|
| >= 70% | Template — same Base component, configured with booleans | Same component set, different boolean combos |
| 40-70% | Extension — shared shell + `contentType` prop or extra slots | Same component set with additional variant property |
| < 40% | Separate component — different section in library | Own component set |
| Different semantics | NOT this component — belongs elsewhere | Different component entirely |

**Types found:**

| Type | Shell % | Decision | Key differentiator | Systems |
|------|---------|----------|--------------------|---------|
| Standard Side Drawer (right) | 100% | Template (base) | Panel derecho overlay con header/body/footer | Ant, Chakra, Base Web, Mantine, Orbit, Evergreen, Dell, Playbook |
| Left Navigation Drawer | 90% | Template | Position=left, contenido de navegacion | M3, Atlassian, Ant, Chakra, Mantine |
| Bottom Sheet (modal) | 75% | Template | Position=bottom, height en vez de width para Size | Ant, Chakra, shadcn (Sheet), Gestalt, Wise |
| Top Panel | 70% | Template | Position=top, raro, notificaciones/alertas | Ant, Chakra, Base Web, Mantine |
| Non-modal Side Panel | 80% | Extension | Sin overlay, sin focus trap, contenido principal interactivo | Ant (mask=false), Fluent 2 (type=inline), Paste (non-modal) |
| Inline/Push Drawer | 60% | Extension | Empuja el contenido principal, no overlay. Layout diferente | Fluent 2 (type=inline), M3 (Standard Side Sheet) |
| Nested/Stacked Drawer | 85% | Template | Mismo shell, push visual del padre | Ant (push prop) |
| Full-screen Drawer | 90% | Template | Size=full, mobile responsive | Chakra (size=full), Orbit (mobile) |
| Responsive Sheet (bottom mobile / side desktop) | 70% | Extension | Cambia layout segun breakpoint | Gestalt |
| Bottom Sheet with Snap Points | 40% | Separate | Drag handle, snap points, spring animation. Diferente interaccion | shadcn Drawer (Vaul) |
| Navigation Drawer (app-level) | 30% | NOT a Drawer | Navegacion persistente de la app, no un overlay contextual | M3 NavigationDrawer, separate component |
| Docked Utility Bar | 15% | NOT a Drawer | Barra bottom persistente con paneles minimizables | Lightning Docked Utility Bar |

---

### What Everyone Agrees On

1. **Un drawer ES un dialog posicionado en un borde**: Todos los sistemas que implementan drawer usan `role="dialog"` con `aria-modal`. Esto no es casual — un drawer es semanticamente un dialogo modal con CSS de posicionamiento.

2. **Escape cierra el drawer**: 20/20 sistemas con drawer implementan Escape como cierre. Es el patron de cierre mas universal despues del boton X.

3. **Focus trap en drawers modales**: Cuando el drawer tiene overlay/scrim, el foco DEBE estar atrapado dentro del panel. Esto previene que usuarios de teclado interactuen con contenido oculto.

4. **Return focus al trigger al cerrar**: Despues de cerrar, el foco vuelve al elemento que abrio el drawer. Sin esto, el foco se pierde en `<body>`.

5. **Header con titulo + close button es la estructura minima**: 18/24 sistemas tienen esta estructura. El titulo da contexto al contenido; el close button es el affordance visual de cierre mas descubrible.

6. **El body es scrollable, el header/footer son fijos**: 16/24 sistemas fijan header y footer mientras el body hace scroll. Esto mantiene acciones y contexto siempre visibles.

7. **Overlay/scrim detras del drawer modal**: 20/24 sistemas muestran un scrim oscuro detras. Comunica que el contenido principal esta inactivo.

---

### Where They Disagree

1. **"Cuantas direcciones soportar?"**
   - **Option A: Solo left/right** (M3, Atlassian, Paste, Orbit, Evergreen) -- Argumento: drawers laterales cubren el 95% de los casos; top/bottom son bottom sheets, un patron diferente. Upside: API simple. Downside: bottom drawer requiere componente separado.
   - **Option B: 4 direcciones** (Ant, Chakra, Base Web, Mantine, shadcn, Fluent 2) -- Argumento: un solo componente flexible; bottom drawer = bottom sheet sin libreria extra. Upside: cobertura completa. Downside: top/bottom cambian el eje del size (width vs height).
   - **Para tu caso**: Left/right como Position variant, bottom/top opcionales via boolean o segundo level de variante.

2. **"Size: nombres semanticos o genericos?"**
   - **Option A: Semanticos** (Atlassian: narrow/medium/wide/extended/full) -- Comunican intencion de uso. Downside: mas dificil de mapear a tokens.
   - **Option B: Genericos** (Chakra: xs/sm/md/lg/xl/full; Ant: px values) -- Consistentes con el resto del sistema. Downside: no comunican cuando usar cada uno.
   - **Para tu caso**: sm/md/lg es consistente con el patrón del DS. xl y full opcionales.

3. **"Modal vs Non-modal: boolean o type?"**
   - **Option A: Boolean** (Ant: `mask`, Mantine: `withOverlay` + `trapFocus`) -- Simple toggle. Downside: dos props separadas (overlay visual vs focus trap) pueden desalinearse.
   - **Option B: Type/modalType** (Fluent 2: `modalType="modal"|"non-modal"|"alert"`) -- Un solo prop controla ambos comportamientos. Downside: menos granular.
   - **Para tu caso**: Boolean `hasOverlay` es mas practico para Figma (controla visibilidad del scrim). Modal vs non-modal es comportamiento runtime.

4. **"Inline/push drawer: mismo componente o separado?"**
   - **Option A: Mismo componente con type** (Fluent 2: `type="overlay"|"inline"`) -- Un componente, dos layouts. Downside: layout completamente diferente.
   - **Option B: Componente separado** (M3: Side Sheet Standard vs Modal) -- Roles semanticos y layout distintos justifican separacion. Downside: mas componentes.
   - **Para tu caso**: Inline/push tiene < 40% overlap en layout. Si lo necesitas, es un componente separado o una extension.

5. **"Footer: fijo o scrollable?"**
   - **Option A: Fijo** (Orbit: `fixedFooter`, mayoria) -- Acciones siempre visibles. Downside: reduce el area visible del body.
   - **Option B: Scrollable** (Base Web, Mantine sin fixed) -- Mas espacio para contenido. Downside: usuario puede no ver las acciones sin scrollear.
   - **Para tu caso**: Footer fijo. Acciones deben ser siempre accesibles.

---

### Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Right side panel | Panel derecho con header/body/footer sobre overlay | Detalles, filtros, configuracion | Ant, Chakra, Orbit, Evergreen, Paste |
| Left navigation drawer | Panel izquierdo para navegacion de app | Navigation, menus | M3, Atlassian |
| Bottom sheet | Panel inferior, height variable | Mobile, acciones rapidas | Ant, shadcn, Gestalt, Wise |
| Full-screen drawer | Panel que ocupa toda la pantalla | Mobile, formularios complejos | Chakra, Orbit |
| Inline/push panel | Panel que empuja contenido, sin overlay | Paneles persistentes, split-view | Fluent 2, M3 Standard |

```
Right Side Panel:
┌───────────────────────────┐
│         MAIN CONTENT      │┌────────────────┐
│                           ││ [X]  Title     │
│    ░░░░░░░░░░░░░░░░      ││────────────────│
│    ░░░ OVERLAY ░░░░      ││                │
│    ░░░░░░░░░░░░░░░░      ││     BODY       │
│                           ││   (scrollable) │
│                           ││────────────────│
│                           ││ [Cancel] [Save]│
└───────────────────────────┘└────────────────┘

Left Navigation Drawer:
┌────────────────┐┌───────────────────────────┐
│ Title     [X]  ││         MAIN CONTENT      │
│────────────────││                           │
│ ▶ Nav Item 1   ││    ░░░░░░░░░░░░░░░░      │
│ ▶ Nav Item 2   ││    ░░░ OVERLAY ░░░░      │
│ ▶ Nav Item 3   ││    ░░░░░░░░░░░░░░░░      │
│ ▶ Nav Item 4   ││                           │
│                ││                           │
└────────────────┘└───────────────────────────┘

Bottom Sheet:
┌───────────────────────────┐
│         MAIN CONTENT      │
│                           │
│    ░░░░░░░░░░░░░░░░      │
│    ░░░ OVERLAY ░░░░      │
├───────────────────────────┤
│ ── drag handle ──         │
│ Title                [X]  │
│───────────────────────────│
│         BODY              │
│───────────────────────────│
│    [Cancel]  [Confirm]    │
└───────────────────────────┘
```

---

### Risks to Consider

1. **Focus trap mal implementado en non-modal** (HIGH) -- Si el drawer tiene overlay visible pero NO atrapa foco, usuarios de screen reader pueden "escapar" al contenido principal que esta visualmente bloqueado. Mitigacion: overlay visible = focus trap siempre. Non-modal = sin overlay.

2. **Body scroll leaking al body principal** (HIGH) -- Sin scroll lock en el `<body>`, el scroll del drawer puede pasar al contenido principal. Mitigacion: `overflow: hidden` en body cuando drawer modal esta abierto; implementar en el componente.

3. **Z-index conflicts con otros overlays** (MEDIUM) -- Si el drawer y un modal se abren simultaneamente, el z-index debe estar bien definido. Mitigacion: z-index tier system: drawer < modal < toast.

4. **Top/bottom drawers confunden el eje del Size** (MEDIUM) -- Size=sm en un right drawer es ancho, pero en un bottom drawer es alto. Mitigacion: documentar que Size controla la dimension perpendicular a la direccion de apertura.

5. **Missing return focus al cerrar** (HIGH) -- Sin return focus, el foco se pierde al cerrar el drawer. Usuarios de teclado quedan desorientados. Mitigacion: siempre `returnFocusOnClose` al trigger element.

---

### Next Steps

```
/spec drawer      --> outputs/drawer-config.json
/enrich drawer    --> outputs/drawer-enriched.md + updated config.json
/generate drawer  --> Figma components
/figma-qa         --> Audit + auto-fix
```

O usa `/build drawer` para ejecutar todo el pipeline en un comando.
