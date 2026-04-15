# Modal — Component Research

## Meta
- **Fecha**: 2026-03-30
- **Modo**: Guided
- **Sistemas analizados**: 14 (default)
- **Scope**: Multi-propósito (confirmaciones, formularios, contenido rico) · 4 tamaños (sm, md, lg, fullscreen) · Cierre con X + Escape (sin overlay dismiss) · Footer variable (0 a N acciones)

---

## Cómo lo Resuelven los Grandes Sistemas

### Material Design 3 — "Solo dos tamaños, y a propósito"

M3 toma una posición radical: solo existen Basic Dialog y Full-screen Dialog. No hay medium. No hay large. Google argumenta que si tu contenido no cabe en un Basic (small), entonces es lo suficientemente complejo para justificar una pantalla completa. Esta decisión binaria elimina la ambigüedad de "¿es medium o large?" que genera inconsistencia en ecosistemas masivos como el de Google. El Full-screen dialog tiene una top app bar con ícono de cierre y acción primaria — abandona por completo el patrón de footer con botones.

**Decisiones que importan:**

- **Qué decidieron**: Solo Basic + Full-screen, sin tamaños intermedios.
  **Por qué**: Con cientos de productos (Maps, Gmail, Drive), cada equipo elegía "medium" de forma diferente. Eliminar la ambigüedad fuerza a clasificar el contenido upfront: simple → Basic, complejo → Full-screen.
  **Impacto**: HIGH — afecta la arquitectura del componente.
  **Para tu caso**: Tu scope requiere 4 tamaños, así que el modelo M3 es demasiado restrictivo. Pero su principio de "clasificación obligatoria del contenido" es valioso — puedes definir cuándo usar cada tamaño en tu documentation.

- **Qué decidieron**: Máximo 2 botones de acción en el Basic dialog.
  **Por qué**: Research interno de Google mostró que 3+ opciones causan parálisis de decisión en modals, porque el usuario ya fue interrumpido de su flujo principal.
  **Impacto**: MEDIUM — afecta el diseño del footer.
  **Para tu caso**: Tu footer es variable, pero considera establecer 2 como default y 3+ como excepción documentada.

- **Qué decidieron**: Ícono opcional encima del título (slot único de M3).
  **Por qué**: Para modals de confirmación donde el ícono refuerza la severidad (delete, warning).
  **Impacto**: LOW — slot opcional.
  **Para tu caso**: Buen candidato para un slot boolean con ícono.

**Props notables**: `icon` (slot encima del título), `supportingText` (slot para explicación del "por qué" de la acción).
**Accesibilidad**: role="dialog" + aria-modal="true"; aria-labelledby + aria-describedby; focus trap; foco regresa al trigger; background recibe aria-hidden.

---

### Spectrum (Adobe) — "El dialog no sabe dónde vive"

Spectrum implementa la separación más radical del mercado: Dialog es un componente de contenido puro que no sabe si está dentro de un Modal, un Popover o un Tray. El contenedor (Modal/Popover/Tray) se decide en DialogTrigger, no en Dialog. Esto significa que el mismo contenido de "Confirmar eliminación" se puede renderizar como modal en desktop y como tray (bottom sheet) en mobile sin cambiar una línea de código del dialog. AlertDialog es un componente separado con restricciones más estrictas — siempre requiere acción explícita.

**Decisiones que importan:**

- **Qué decidieron**: Separar Dialog (contenido) de Modal/Popover/Tray (contenedor).
  **Por qué**: Los productos de Adobe (Lightroom, Analytics, Express) necesitan el mismo dialog en contextos muy diferentes. Un formulario de "export settings" es modal en desktop y tray en tablet. Si el dialog conoce su contenedor, cada producto reescribe la lógica de presentación.
  **Impacto**: HIGH — define la arquitectura completa.
  **Para tu caso**: Excelente pattern si tu DS necesita adaptación mobile. Pero si tu modal siempre es modal (no necesita ser popover o tray), la composabilidad agrega complejidad sin beneficio.

- **Qué decidieron**: `isDismissable` y `isKeyboardDismissDisabled` son props independientes.
  **Por qué**: Hay casos donde el overlay dismiss debe estar deshabilitado pero Escape sí debe funcionar (formulario con datos unsaved), y viceversa (contenido crítico donde Escape accidental sería destructivo).
  **Impacto**: HIGH — tu scope dice sin overlay dismiss pero con Escape.
  **Para tu caso**: Spectrum valida exactamente tu combinación. Necesitas control granular de cada método de cierre.

- **Qué decidieron**: `mobileType` en DialogTrigger cambia automáticamente el contenedor.
  **Por qué**: Elimina la necesidad de media queries en cada consumer.
  **Impacto**: MEDIUM — solo si necesitas adaptación mobile.
  **Para tu caso**: Evalúa si fullscreen es tu adaptación mobile o si necesitas tray/sheet.

**Props notables**: `type` en DialogTrigger (modal|popover|tray|fullscreen); `mobileType` para rendering adaptativo.
**Accesibilidad**: AlertDialog usa role="alertdialog" (anuncios más agresivos); aria-modal + aria-labelledby; focus trap + retorno al trigger.

---

### Carbon (IBM) — "Cada modal tiene un tipo semántico, y el tipo define el comportamiento"

Carbon clasifica modals en tres tipos semánticos: Passive (informativo, se cierra con click fuera), Transactional (requiere decisión, NO se cierra con click fuera) y Danger (destructivo, botón primario rojo, copia explícita de la acción destructiva). Esta clasificación no es un color ni un prop cosmético — es el tipo semántico que determina el modelo de interacción completo. Un Passive modal permite overlay dismiss; un Transactional no. Un Danger modal reemplaza el componente Button del footer por una versión destructiva. Carbon también ofrece 4 tamaños fijos (xs/sm/md/lg) que coinciden exactamente con tu scope.

**Decisiones que importan:**

- **Qué decidieron**: Tipo semántico (passive/transactional/danger) que drive el modelo de interacción.
  **Por qué**: IBM tiene cientos de productos enterprise donde los desarrolladores necesitan reglas claras sobre cuándo un modal es interruptivo. Sin tipado semántico, cada equipo decide ad-hoc si el overlay dismiss está activo.
  **Impacto**: HIGH — el tipo controla overlay dismiss, footer layout, y visual treatment.
  **Para tu caso**: Excelente encaje. Tu scope de "sin overlay dismiss" sugiere modals transaccionales. El tipado semántico alinea diseño y desarrollo automáticamente.

- **Qué decidieron**: 4 tamaños fijos (xs/sm/md/lg), sin sizing arbitrario.
  **Por qué**: Previene que cada producto defina anchos custom. Con 4 tamaños fijos, todos los modals de IBM se ven consistentes.
  **Impacto**: HIGH — coincide exactamente con tu scope de 4 tamaños.
  **Para tu caso**: Adopta este pattern. 4 tamaños fijos (sm≈400px, md≈560px, lg≈800px, fullscreen) eliminan ambigüedad.

- **Qué decidieron**: Danger variant es un tipo semántico, no un color.
  **Por qué**: Un botón rojo no es suficiente para comunicar destrucción. Carbon reemplaza el componente Button entero y fuerza copia explícita ("Delete 15 items permanently").
  **Impacto**: MEDIUM — relevante si tu DS tiene acciones destructivas.
  **Para tu caso**: Considera un variant `danger` que cambie el footer button a destructive.

**Props notables**: `danger` (boolean, cambia el modelo completo); `hasScrollingContent` (scroll containment); `preventCloseOnClickOutside`.
**Accesibilidad**: Auto-foco al primer elemento interactivo (input en formularios, botón primario otherwise); focus trap; Escape cierra.

---

### Atlassian — "El contenido define la altura, nosotros definimos el ancho"

Atlassian diseñó su modal alrededor de la realidad de Jira: un modal puede contener desde una confirmación de 2 líneas hasta un formulario de creación de issue con 20 campos. Por eso la altura es content-driven (crece hasta que el body hace scroll) y el ancho es predefinido (small/medium/large/x-large o px numérico). La arquitectura usa sub-componentes composables (ModalHeader, ModalBody, ModalFooter, ModalTitle) que dan flexibilidad total al footer. Auto-fullscreen debajo de 480px elimina la decisión responsive de cada developer.

**Decisiones que importan:**

- **Qué decidieron**: Ancho predefinido + altura content-driven.
  **Por qué**: Jira maneja contenido desde "¿Eliminar sprint?" (2 líneas) hasta "Crear epic" (20 campos + attachments). Altura fija forzaría scroll innecesario en modals pequeños o overflow en grandes.
  **Impacto**: HIGH — define cómo el modal escala con contenido.
  **Para tu caso**: Excelente para multi-propósito. Tus 4 tamaños definen el ancho; la altura se adapta.

- **Qué decidieron**: Sub-componentes composables (ModalHeader/Body/Footer/Title).
  **Por qué**: No todos los modals necesitan footer (contenido informativo). No todos necesitan título (preview de imagen). La composabilidad permite ensamblar solo las partes necesarias.
  **Impacto**: HIGH — encaja perfectamente con tu footer variable.
  **Para tu caso**: Tu footer variable requiere exactamente esto. El footer es un sub-componente opcional, no un prop.

- **Qué decidieron**: Auto-fullscreen debajo de 480px viewport.
  **Por qué**: Elimina la decisión responsive de cada developer. Cada product team en Atlassian no necesita pensar en "¿cómo se ve mi medium modal en mobile?".
  **Impacto**: MEDIUM — simplifica responsive.
  **Para tu caso**: Tu scope incluye fullscreen — considera auto-fullscreen en breakpoints small como default.

**Props notables**: `width` (preset strings o numeric px); `shouldScrollInViewport`; `shouldCloseOnEscapePress`; `shouldCloseOnOverlayClick`.
**Accesibilidad**: role="dialog" + aria-modal + aria-labelledby; label prop fallback si no hay título visual; inert background; foco retorna al elemento previo.

---

### Ant Design — "Declarativo para el diseñador, imperativo para el developer"

Ant Design ofrece dos APIs para el mismo componente: JSX declarativo (`<Modal>`) para el diseñador/developer que construye la UI, y métodos estáticos imperativos (`Modal.confirm()`, `Modal.info()`, `Modal.error()`) para el developer que necesita un confirmation dialog sin state management. El hook `useModal()` resuelve el problema histórico de los métodos estáticos: al estar fuera del React tree, perdían acceso a theme, i18n, y Context. Footer configurable con `footer={null}` convierte el Modal en un contenedor overlay genérico.

**Decisiones que importan:**

- **Qué decidieron**: API dual (JSX declarativo + métodos estáticos imperativos).
  **Por qué**: El 70% de los modals en enterprise son confirmaciones simples. Montar state + UI para "¿Estás seguro?" es friction innecesaria. Pero los métodos estáticos rompen React Context.
  **Impacto**: MEDIUM — decisión de API que afecta DX.
  **Para tu caso**: Como Figma component, solo te importa la forma visual. Pero documenta ambos patterns para los devs.

- **Qué decidieron**: `footer={null}` elimina el footer completamente.
  **Por qué**: Permite usar Modal como contenedor overlay genérico para cualquier contenido custom.
  **Impacto**: HIGH — soporta tu footer variable (incluyendo "sin footer").
  **Para tu caso**: Confirma que necesitas `hasFooter` como boolean toggle.

- **Qué decidieron**: `destroyOnClose` desmonta children al cerrar.
  **Por qué**: Sin esto, formularios dentro del modal mantienen state stale. En Ant Design, `destroyOnClose` es el default para forms.
  **Impacto**: LOW — comportamiento de código, no visual.

**Props notables**: `destroyOnClose`; `maskClosable` (overlay dismiss, default true); `getContainer` (para micro-frontends); `afterClose` (callback post-animación); `footer={null}` (elimina footer).
**Accesibilidad**: role="dialog" + aria-modal + aria-labelledby; los modals estáticos tienen ARIA más débil que el componente JSX.

---

### shadcn/ui — "Dialog y AlertDialog son componentes diferentes, no props"

shadcn/ui (basado en Radix) hace una separación explícita: Dialog es para contenido no-crítico (dismissible, overlay click cierra) y AlertDialog es para acciones irreversibles (no dismissible, requiere acción explícita, role="alertdialog"). No son props de un mismo componente — son dos componentes con APIs distintas. La arquitectura compound component (DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription) da composabilidad total con accesibilidad built-in.

**Decisiones que importan:**

- **Qué decidieron**: Dialog ≠ AlertDialog como componentes separados.
  **Por qué**: La semántica ARIA es diferente (role="dialog" vs role="alertdialog"). Un alertdialog anuncia más agresivamente al screen reader. Mezclarlos en un prop diluye la distinción semántica.
  **Impacto**: HIGH — define si tienes 1 o 2 componentes.
  **Para tu caso**: Considerando que tu cierre es X+Escape (sin overlay), tu modal se parece más a Dialog. Pero para confirmaciones destructivas, AlertDialog es el pattern correcto.

- **Qué decidieron**: Compound components con slots libres.
  **Por qué**: No todos los modals necesitan DialogHeader. No todos necesitan DialogFooter. La composabilidad permite montar solo lo necesario sin props como `hideHeader`.
  **Impacto**: HIGH — encaja con tu footer variable.
  **Para tu caso**: El pattern compound component es ideal para multi-propósito. Cada caso monta las partes que necesita.

**Props notables**: Hereda de Radix — `onOpenChange`, `modal` (boolean, focus trap on/off), `defaultOpen`.
**Accesibilidad**: Radix maneja automáticamente: aria-labelledby, aria-describedby, focus trap, focus return, inert background. AlertDialog previene cierre accidental.

---

### Sistemas con implementación estándar (shallow)

| Sistema | Enfoque | Takeaway para tu caso |
|---------|---------|----------------------|
| **Polaris** | Deprecado → App Bridge. Strict 2-button max, loading prop para async | Loading state es buena idea para formularios async |
| **Paste (Twilio)** | Reakit Dialog, 3 tamaños, non-dismissible para confirm destructivos | `non-dismissible` valida tu pattern de sin overlay dismiss |
| **Lightning (Salesforce)** | 3 tamaños (L/M/S), tagline bajo título, footer actions | Tagline es buen slot para descripción secundaria |
| **Primer (GitHub)** | Headless Dialog v2, render slots (renderHeader/Body/Footer) | Render slots = máxima flexibilidad para developers |
| **Playbook (eBay)** | Dual React/Rails, flows de venta | Nada nuevo vs los deep dive |
| **Cedar (REI)** | Vue, overlay + fullscreen variants | Confirma que overlay vs fullscreen son los dos extremos |
| **Wise** | Confirmations financieras, security-sensitive | En fintech, overlay dismiss siempre off (tu pattern) |
| **Dell** | Enterprise IT confirmations | Pattern estándar enterprise |

---

## Lo que Todos Coinciden

**1. Focus trap es obligatorio**: Los 14 sistemas implementan focus trap dentro del modal. Tab cicla entre los elementos interactivos del modal sin escapar al fondo. Esto no es negociable — sin focus trap, un usuario de teclado pierde el contexto de dónde está. WCAG 2.4.3 lo requiere explícitamente para dialogs modales.

**2. role="dialog" + aria-modal="true" + aria-labelledby**: El trío de ARIA es idéntico en todos los sistemas. El role indica al screen reader que es un dialog. aria-modal indica que el fondo es inerte. aria-labelledby conecta el título como nombre accesible. Sin estos tres atributos, el modal es invisible para screen readers.

**3. El foco regresa al trigger al cerrar**: Cuando el modal se cierra, el foco vuelve al elemento que lo abrió. Todos los sistemas implementan esto. La alternativa — dejar el foco en un lugar indefinido — desorientaría al usuario de teclado por completo.

**4. Layout de 3 zonas (Header/Body/Footer)**: Todos los sistemas organizan el contenido en header (título + close), body (contenido scrolleable), footer (acciones). Aunque la implementación varía (props vs sub-componentes), la estructura visual es universal porque el usuario mental model de "título arriba, acciones abajo" es cultural.

**5. Escape cierra el modal (con excepciones documentadas)**: 13 de 14 sistemas usan Escape para cerrar como default. La excepción: alertdialogs o modals bloqueantes donde Escape se deshabilita explícitamente. Esto es tan esperado que NO tener Escape → frustra al usuario de teclado.

**6. Scrim/overlay bloquea interacción con el fondo**: Todos usan una capa semi-transparente que previene interacción con la página detrás. La opacidad varía (M3 es prescriptivo, otros dejan al DS definir) pero la funcionalidad es universal.

---

## Decisiones que Debes Tomar

### 1. "¿Cuántos tamaños necesitas realmente?"

**Opción A: 4 tamaños fijos (sm/md/lg/fullscreen)** — adoptado por Carbon, Atlassian, tu scope
Qué significa: Cada tamaño tiene un ancho predefinido (ej: 400/560/800/100%). No hay sizing custom.
Pro: Consistencia garantizada. Cualquier modal en tu DS se ve predecible.
Contra: Un caso edge (ej: 650px) no encaja limpiamente en ningún tamaño.

**Opción B: Binary (Basic + Full-screen)** — adoptado por M3
Qué significa: Solo dos opciones. Si no cabe en small, es full-screen.
Pro: Cero ambigüedad. Decisión instantánea.
Contra: Demasiado restrictivo para multi-propósito. Un formulario de 5 campos no justifica fullscreen.

**Para tu caso**: Opción A. Tu scope multi-propósito + 4 tamaños ya lo define. Pero documenta cuándo usar cada uno.

### 2. "¿Necesitas separar Dialog de AlertDialog?"

**Opción A: Un solo componente con props** — adoptado por Carbon (danger prop), Paste (non-dismissible), Atlassian
Qué significa: `<Modal danger>` o `<Modal dismissable={false}>` controla el comportamiento.
Pro: Un solo componente que aprender. Menos surface area en tu DS.
Contra: Fácil olvidar el prop danger en una confirmación destructiva.

**Opción B: Dos componentes separados** — adoptado por shadcn/ui, Spectrum (AlertDialog)
Qué significa: `<Dialog>` y `<AlertDialog>` son componentes distintos con roles ARIA diferentes.
Pro: role="alertdialog" anuncia más agresivamente. Imposible usar el componente wrong por accidente.
Contra: Dos componentes que mantener, documentar, y que developers deben elegir.

**Para tu caso**: Tu scope dice sin overlay dismiss para todos los modals, lo que se parece más al patrón de Dialog estándar. Pero para confirmaciones destructivas, evalúa si necesitas un AlertDialog separado o un variant `danger`.

### 3. "¿El footer es un prop o un sub-componente?"

**Opción A: Footer como prop** — adoptado por Polaris (`primaryAction`/`secondaryActions`), Carbon
Qué significa: Pasas la configuración del footer como objeto: `{ primaryAction: { content: 'Save' } }`.
Pro: API estricta que previene footer inconsistentes. Fácil de enforcar con types.
Contra: Difícil agregar acciones custom (ej: checkbox "no mostrar de nuevo").

**Opción B: Footer como sub-componente** — adoptado por Atlassian, shadcn/ui, Spectrum
Qué significa: `<ModalFooter>` es un slot donde pones lo que quieras.
Pro: Flexibilidad total — 0, 1, 2, o N acciones. Custom content posible.
Contra: Sin enforcement, cada developer diseña un footer distinto.

**Para tu caso**: Opción B. Tu footer variable (0 a N acciones) requiere la flexibilidad de sub-componentes. Pero en Figma, necesitas un slot `footer` con defaults sensatos.

### 4. "¿Cómo manejas el scroll en el body?"

**Opción A: Body scrollea internamente** — adoptado por Carbon, Atlassian, Spectrum
Qué significa: El modal tiene altura máxima. Si el contenido excede, solo el body scrollea. Header y footer permanecen fijos.
Pro: Las acciones siempre están visibles (no se pierden abajo del fold).
Contra: El usuario puede no notar que hay contenido scrolleable.

**Opción B: Modal completo scrollea en viewport** — adoptado por Atlassian (`shouldScrollInViewport`)
Qué significa: El modal crece con su contenido. Si es demasiado alto, la página detrás del modal scrollea.
Pro: Más natural para contenido largo (formularios extensos).
Contra: Footer desaparece del viewport si el contenido es largo.

**Para tu caso**: Opción A como default. Body scroll interno mantiene el footer visible. Pero ofrece Opción B como prop para casos edge (formularios muy largos).

### 5. "¿Adaptas automáticamente a mobile?"

**Opción A: Auto-fullscreen bajo cierto viewport** — adoptado por Atlassian (<480px)
Qué significa: Un modal medium en desktop se convierte en fullscreen en mobile automáticamente.
Pro: Cero decisiones responsive para el developer.
Contra: Pierde el contexto de "estoy en un modal" que da el overlay.

**Opción B: Cambiar a bottom sheet/tray** — adoptado por Spectrum (mobileType)
Qué significa: En mobile, el modal se renderiza como sheet desde abajo.
Pro: Pattern nativo mobile (iOS action sheets, Android bottom sheets).
Contra: Implementación compleja, comportamiento distinto.

**Opción C: Sin adaptación automática** — adoptado por Carbon, Ant Design
Qué significa: El modal se ve igual en mobile, solo más estrecho.
Pro: Comportamiento predecible.
Contra: Modals estrechos en mobile pueden ser difíciles de usar.

**Para tu caso**: Opción A. Ya tienes fullscreen en tu scope — auto-fullscreen bajo breakpoint sm es el path de menor fricción.

---

## Patrones Visuales

| Patrón | Descripción | Mejor para | Adoptado por |
|--------|-------------|-----------|-------------|
| Basic Dialog | Header + body + footer en overlay centrado | Confirmaciones, formularios cortos | M3, Polaris, Paste |
| Full-screen Dialog | Ocupa toda la pantalla con top app bar | Workflows complejos, mobile | M3, Atlassian, Cedar |
| Composable Dialog | Sub-componentes ensamblables (Header/Body/Footer opcionales) | Multi-propósito, DS flexibles | Atlassian, shadcn/ui, Spectrum |
| Typed Dialog | Passive/Transactional/Danger con comportamiento derivado del tipo | Enterprise, acciones destructivas | Carbon |

```
┌──────── Basic Dialog ────────┐
│ ┌──────────────────────── X │
│ │ Title                     │
│ ├───────────────────────────│
│ │                           │
│ │  Body content here        │
│ │  (scrolls if needed)      │
│ │                           │
│ ├───────────────────────────│
│ │         [Cancel] [Confirm]│
│ └───────────────────────────│
└─────────────────────────────┘
```

```
┌──────── Full-screen Dialog ─────┐
│ X  Title              [Action]  │
├─────────────────────────────────│
│                                 │
│   Extended content area         │
│   (full viewport height)        │
│   Forms, tables, wizards        │
│                                 │
│                                 │
│                                 │
└─────────────────────────────────┘
```

```
┌──── Composable (variable footer) ────┐
│ ┌──────────────────────────────── X │
│ │ Title                             │
│ │ Description / subtitle            │
│ ├───────────────────────────────────│
│ │                                   │
│ │  Body (slots libres)              │
│ │                                   │
│ ├───────────────────────────────────│
│ │ □ Don't show again   [Cancel] [OK]│  ← footer flexible
│ └───────────────────────────────────│
└─────────────────────────────────────┘
```

```
┌──── Danger Dialog (Carbon) ────┐
│ ┌───────────────────────── X │
│ │ ⚠ Delete 15 items?        │
│ ├────────────────────────────│
│ │ This action is permanent.  │
│ │ Type "DELETE" to confirm.  │
│ │ ┌────────────────────────┐ │
│ │ │                        │ │
│ │ └────────────────────────┘ │
│ ├────────────────────────────│
│ │         [Cancel] [DELETE]  │  ← botón destructive
│ └────────────────────────────│
└──────────────────────────────┘
```

---

## Riesgos a Considerar

**1. Overlay dismiss OFF puede frustrar usuarios casuales** (MEDIUM) — Tu scope dice sin overlay dismiss. Esto es correcto para modals transaccionales, pero para modals informativos (preview, detalles), el usuario espera poder cerrar clickeando fuera. Mitigación: ofrece `dismissable` como prop configurable, con default OFF.

**2. Footer variable sin guidelines genera inconsistencia** (HIGH) — Si cada developer decide cuántas acciones poner en el footer, terminas con modals de 4 botones. Mitigación: documenta patterns por caso (confirmación=2, formulario=2-3, info=1) y usa un lint visual en Figma.

**3. Fullscreen en desktop puede sentirse heavy** (MEDIUM) — Fullscreen tiene sentido en mobile pero en desktop con monitor 27" puede sentirse como "otra página" y perder el contexto de modal. Mitigación: define fullscreen como max-width (ej: 1200px) o como comportamiento solo mobile (auto-fullscreen).

**4. Scroll invisible en body** (MEDIUM) — Si el body tiene scroll pero no hay indicador visual, el usuario puede creer que el contenido termina donde se ve. Mitigación: shadow o fade en el borde inferior del body cuando hay más contenido.

---

## Dimension Scores

| Dimensión | M3 | Spectrum | Carbon | Polaris | Atlassian | Ant | Paste | Lightning | Primer | shadcn | Playbook | Cedar | Wise | Dell |
|-----------|:--:|:-------:|:------:|:-------:|:---------:|:---:|:-----:|:---------:|:------:|:------:|:--------:|:-----:|:----:|:----:|
| Sizes | 2 | 3 | 5 | 2 | 5 | 4 | 3 | 3 | 3 | 3 | 2 | 3 | 2 | 2 |
| Footer flexibility | 2 | 5 | 4 | 2 | 5 | 5 | 3 | 3 | 4 | 5 | 2 | 3 | 2 | 2 |
| Composability | 2 | 5 | 3 | 2 | 5 | 4 | 3 | 3 | 4 | 5 | 2 | 3 | 2 | 2 |
| Dismiss control | 3 | 5 | 5 | 3 | 5 | 4 | 4 | 3 | 3 | 4 | 2 | 3 | 3 | 2 |
| Mobile adaptation | 3 | 5 | 2 | 3 | 5 | 2 | 2 | 3 | 3 | 2 | 2 | 3 | 2 | 2 |
| A11y depth | 5 | 5 | 4 | 4 | 5 | 3 | 4 | 4 | 4 | 5 | 3 | 4 | 3 | 3 |
| Semantic typing | 3 | 4 | 5 | 3 | 2 | 3 | 4 | 3 | 3 | 4 | 2 | 2 | 3 | 2 |

Escala: 1 (ausente) → 5 (líder en esta dimensión)

---

## Próximos Pasos

| # | Paso | Comando | Agente |
|---|------|---------|--------|
| 1 | Definir anatomía del modal | `/spec modal` | Spec Agent |
| 2 | Construir variant matrix | (incluido en /spec) | Spec Agent |
| 3 | Asignar tokens | `/enrich modal` | Enrich Agent |
| 4 | Escribir interaction spec | (incluido en /enrich) | Enrich Agent |
| 5 | Generar en Figma | `/generate modal` | Generation Agent |
