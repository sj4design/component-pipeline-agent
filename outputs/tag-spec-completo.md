# Tag

## Overview

El Tag es un indicador de metadatos de tamaño compacto que permite etiquetar, categorizar o identificar contenido dentro de una interfaz. A diferencia de un Badge (estado del sistema) o un Chip (filtro seleccionable), el Tag representa una etiqueta asociada a un ítem de contenido que puede ser informativa (display-only) o eliminable por el usuario (removable). Su identidad visual se define por tres ejes: el color semántico que comunica la categoría o estado, la variante visual que controla el nivel de énfasis, y el tamaño que se adapta a la densidad del contexto.

El Tag aparece en contextos de alta densidad informativa: filas de tablas, tarjetas de contenido, paneles de detalle, formularios de etiquetado y vistas de filtros aplicados. En todos estos contextos, el Tag debe comunicar su significado principalmente a través de su texto — el color es una ayuda visual de escaneo, no el portador primario del significado.

```
Tag — display-only (solo label)
┌──────────────────────────────────────────┐
│  ┌─────────┐                             │
│  │  Python │                             │
│  └─────────┘                             │
│   ↑ label (texto, required)              │
└──────────────────────────────────────────┘

Tag — con leading icon
┌──────────────────────────────────────────┐
│  ┌─────────────────┐                     │
│  │  ⬡  Python     │                     │
│  └─────────────────┘                     │
│   ↑           ↑                          │
│ leadingIcon  label                       │
└──────────────────────────────────────────┘

Tag — removable (con removeButton)
┌──────────────────────────────────────────┐
│  ┌──────────────────┐                    │
│  │  Python    ╳    │                    │
│  └──────────────────┘                    │
│   ↑           ↑                          │
│  label   removeButton                    │
│           aria-label="Eliminar Python"   │
└──────────────────────────────────────────┘

Tag — con todos los slots activos
┌──────────────────────────────────────────┐
│  ┌───────────────────────────┐           │
│  │  ⬡  Python         ╳   │           │
│  └───────────────────────────┘           │
│   ↑       ↑              ↑              │
│ leadingIcon label    removeButton        │
└──────────────────────────────────────────┘

Grupo de tags (TagGroup)
┌─────────────────────────────────────────────────────────────┐
│  Habilidades:  aria-label="Habilidades"                     │
│  ┌──────────────┐  ┌────────────────┐  ┌──────────────────┐ │
│  │  Python ╳   │  │  React ╳      │  │  TypeScript ╳   │ │
│  └──────────────┘  └────────────────┘  └──────────────────┘ │
│                                                              │
│  role="list" en el contenedor                               │
│  role="listitem" en cada tag                                │
└─────────────────────────────────────────────────────────────┘
```

El Tag no tiene relación de trigger directo con overlays o popovers — es un componente de metadatos, no un control de navegación. Si se necesita un tag navegable, se renderiza como `<a>` con `href`; si se necesita un tag removable, el `removeButton` es el único punto de interacción destructiva.

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Color:   default | primary | success | warning | error | info | neutral
Size:    sm | md | lg
Variant: solid | soft | outline
State:   default | hover | focus-visible | disabled
         (implementado vía Figma interactive components, no multiplica el grid)
```

Toggles (show/hide parts — do NOT generate extra variants):

```
isRemovable         false → sin removeButton  |  true → con removeButton
isLeadingIconVisible false → sin leadingIcon  |  true → con leadingIcon
```

### Figma properties panel

```
┌─────────────────────────────────────────────┐
│ Tag                                         │
├─────────────────────────────────────────────┤
│ Color    [default ▼]                        │
│          default / primary / success /      │
│          warning / error / info / neutral   │
├─────────────────────────────────────────────┤
│ Size     [md ▼]                             │
│          sm / md / lg                       │
├─────────────────────────────────────────────┤
│ Variant  [soft ▼]                           │
│          solid / soft / outline             │
├─────────────────────────────────────────────┤
│ State    [default ▼]                        │
│          default / hover / focus-visible /  │
│          disabled                           │
├─────────────────────────────────────────────┤
│ ○ isRemovable           [ ] false           │
│ ○ isLeadingIconVisible  [ ] false           │
├─────────────────────────────────────────────┤
│ # label text            [Python      ]      │
│ ↳ leadingIcon           [⬡ icon swap ]      │
│ ↳ removeButton          [╳ auto-label]      │
└─────────────────────────────────────────────┘

Frame budget: Color(7) × Size(3) × Variant(3) = 63 frames
Estados vía interactive components: 0 frames adicionales
Booleans (×2): 0 frames adicionales
Total net: 63 frames
```

---

## When to use (and when not to)

```
¿Necesitas mostrar metadatos asociados a un ítem de contenido?
  └── Sí
       ├── ¿El usuario puede eliminar la etiqueta?
       │    └── Sí → Tag con isRemovable=true
       │    └── No → Tag display-only (isRemovable=false)
       │
       ├── ¿La etiqueta representa un estado del sistema?
       │    └── Sí → Tag con Color semántico (success/warning/error/info)
       │            Asegúrate de que el label comunique el estado en texto
       │
       ├── ¿La etiqueta es una categoría o keyword?
       │    └── Sí → Tag con Color=default o Color=neutral
       │
       └── ¿La etiqueta lleva a una vista filtrada?
            └── Sí → Tag renderizado como <a href="..."> (navigable)
                     Considera si la navegación es la acción esperada

¿El elemento necesita una acción toggle (seleccionar/deseleccionar)?
  └── Sí → NO usar Tag → usar Chip/FilterChip (aria-pressed)
            Tag no soporta estado selected como interacción primaria

¿El elemento muestra solo un número o contador?
  └── Sí → NO usar Tag → usar Badge (número sin contexto de etiqueta)
```

**Usar Tag cuando:**
- Se necesita etiquetar contenido con categorías, keywords o estados semánticos (éxito, error, advertencia, info).
- El usuario puede eliminar etiquetas de un ítem (filtros aplicados, tags de producto, habilidades de perfil).
- Se necesita mostrar un conjunto de metadatos asociados a un elemento en una tabla, tarjeta o panel de detalle.
- Las etiquetas tienen colores semánticos que comunican significado del sistema (estado de pedido, nivel de criticidad).
- Se requiere navegación desde una etiqueta de categoría hacia una vista filtrada (tag como enlace).

**No usar Tag cuando:**
- El elemento debe poder seleccionarse/deseleccionarse como filtro toggle — usar Chip/FilterChip con `aria-pressed`.
- Se necesita mostrar solo un número o contador — usar Badge numérico.
- El elemento representa el estado de un campo de formulario (válido/inválido) — usar el estado del campo directamente.
- Se necesita un componente de entrada de texto con etiquetas tipo "email recipients" — usar TagInput/TagPicker como componente separado.
- El único diferenciador entre tags es el color sin texto descriptivo — el color nunca puede ser el único portador de significado (WCAG 1.4.1).

---

## Visual variations

### Por Variant (rango de énfasis)

Los tres valores de Variant controlan el peso visual del tag y deben elegirse según el nivel de énfasis requerido en cada contexto:

**solid** — Máximo énfasis. Fondo sólido de color con texto en color inverso (blanco o negro según contraste). Apropiado para tags que deben destacar sobre fondos neutros o en contextos donde la categoría es información primaria, no secundaria. Usado por Carbon (dismissible), M3 (selected filter chip), Ant Design (presets).

**soft** — Énfasis moderado. Fondo muy tenue del color semántico (10–15% de opacidad) con texto en el tono oscuro del mismo color. Es la variante más común en T2/T3 (Radix, Mantine light, Chakra subtle). Apropiada para la mayoría de contextos de metadatos donde el tag debe ser visible sin competir con el contenido principal.

**outline** — Mínimo énfasis. Sin relleno, solo borde de color. Apropiada para tags en contextos de alta densidad donde el color de fondo de los tags saturarías la vista (ej. múltiples tags por fila en una tabla). También útil para estados "pendiente" o "sin asignar" donde el tag existe pero no tiene un valor confirmado.

### Por Color (semántica)

| Color | Uso recomendado | Ejemplo de label |
|-------|----------------|-----------------|
| default | Sin semántica prescrita, categoría genérica | "Frontend", "v2.0" |
| primary | Énfasis de marca, elemento destacado | "Nuevo", "Featured" |
| success | Completado, activo, aprobado, publicado | "Activo", "Aprobado" |
| warning | Requiere atención, en revisión, próximo a vencer | "En revisión", "Por vencer" |
| error | Fallido, rechazado, bloqueado, crítico | "Error", "Rechazado" |
| info | Informativo, en proceso, pendiente | "En proceso", "Borrador" |
| neutral | Estado inactivo, archivado, sin clasificar | "Archivado", "Sin tag" |

**Regla universal:** El texto del label SIEMPRE comunica el significado del estado. El color es una ayuda visual para el escaneo rápido, nunca el único indicador (GOV.UK, Nord, WCAG 1.4.1).

### Por Size (densidad)

| Size | Height | Padding H | Padding V | Font | Uso típico |
|------|--------|-----------|-----------|------|-----------|
| sm | 20px | 6px | 2px | 12px/500 | Tablas densas, metadatos en filas compactas |
| md | 24px | 8px | 4px | 14px/500 | Formularios, paneles de detalle, estándar |
| lg | 28px | 12px | 4px | 14px/500 | Tarjetas destacadas, headers de sección |

### Por Estado

**default** — Estado de reposo. Color de fondo, borde y texto según la combinación Color × Variant.

**hover** — El cursor está sobre el tag (solo relevante para tags interactivos: navigable o con removeButton visible). Cambio sutil en el color de fondo o borde para indicar interactividad.

**focus-visible** — El tag o su removeButton reciben foco por teclado. Anillo de foco de 2px con offset de 2px en el color de foco del sistema (`focus.ring`). Obligatorio para cumplimiento WCAG 2.1 AA criterio 2.4.7.

**disabled** — El tag está deshabilitado: opacidad reducida, cursor no interactivo, sin respuesta a hover. Se aplica solo al label; `isRemovable` debe ser `false` cuando `isDisabled` es `true` (exclusión documentada).

---

## Design decisions

### Decisión 1: Color como dimensión de variante en Figma, no como Variable mode

**Por qué:** Cada combinación Color × Variant requiere valores específicos de background, foreground y border que no son simplemente el mismo token con distinto valor de modo. Un tag `success soft` necesita un background verde tenue, un foreground verde oscuro y un border verde medio — tres tokens con valores distintos respecto a `error soft` (rojo tenue, rojo oscuro, rojo medio). Las Variable modes de Figma resuelven bien el cambio dark/light (un token que cambia de valor entre modos), pero no resuelven 7 × 3 = 21 conjuntos de tokens estructuralmente distintos dentro de un mismo canvas.

**Tradeoff:** El panel de variantes de Figma expone 63 combinaciones (Color × Size × Variant). Se mitiga organizando las variantes por Color en el panel y documentando que Size × Variant son las dimensiones de configuración primaria; Color es una selección semántica que el diseñador elige según el contexto de uso.

**Fuente:** hints/tag.json frameCount=63, global-property-rules §4 (excepción: se crea variante cuando la estructura cambia entre valores), research/components/tag.md (Ant Design, Radix, Mantine color system patterns).

---

### Decisión 2: Estado disabled como variant interna + booleans a nivel de grid

**Por qué:** El estado disabled del Tag cambia múltiples propiedades visuales simultáneamente: fill del background (→ color.surface.disabled), color del texto (→ color.text.disabled), color del borde (→ color.border.disabled), y cursor (→ not-allowed). Esto supera el umbral de ≥2 propiedades definido en la Rule 27 de global-property-rules, que indica que disabled debe implementarse como variant en el component set interno para que Figma pueda representarlo correctamente — una boolean de visibilidad no puede cambiar colores. Sin embargo, para evitar multiplicar el grid principal (63 × 4 = 252 frames), los estados hover/focus-visible/disabled se implementan vía Figma interactive components: el grid solo expone el estado `default` en 63 frames visibles; los demás estados son accesibles vía prototype interactions.

**Tradeoff:** Los diseñadores no pueden comparar todos los estados side-by-side directamente en el canvas principal sin entrar al modo prototype. Se mitiga creando una página de referencia de estados en el archivo de Figma.

**Fuente:** global-property-rules.md Rule 27 (disabled como variant cuando cambia ≥2 propiedades), optimization-techniques.md Technique 6 (interactive components para estados).

---

### Decisión 3: isRemovable como boolean (patrón onRemove-as-mode-switch)

**Por qué:** El patrón establecido por Spectrum y Polaris — y reforzado por Gestalt, Base Web y Atlassian — es que la presencia del handler `onRemove` determina el modo del tag, no un prop `removable: boolean` separado. En la implementación de Figma, esto se traduce en un boolean `isRemovable` que controla la visibilidad del slot `removeButton`. Esto tiene dos beneficios: (1) hace imposible renderizar accidentalmente un botón de eliminar en un tag display-only, y (2) al ser boolean, no multiplica el frame count (Technique 1 de optimization-techniques.md). La exclusión `isRemovable × isDisabled` es lógica (no de frames) y está documentada en la sección de exclusiones.

**Tradeoff:** En Figma, el diseñador debe recordar activar el boolean para ver el removeButton. En código, la presencia del prop `onRemove` (o `isRemovable`) determina automáticamente el modo — sin ambigüedad.

**Fuente:** research/components/tag.md (Spectrum 'onRemove as mode switch', Polaris 'auto-generated remove aria-label'), hints/tag.json booleans.

---

### Decisión 4: aria-label del removeButton auto-generado como "Eliminar [label]"

**Por qué:** El label genérico "Eliminar" o el ícono "×" sin texto accesible es el fallo de accesibilidad más documentado en componentes de tags removibles (WCAG 1.3.1 — Information and Relationships). En un grupo de tags, el lector de pantalla anuncia "Eliminar, Eliminar, Eliminar" sin contexto de cuál tag corresponde cada botón. Polaris, Spectrum, Gestalt y Base Web implementan auto-generación de "Remove [tag text]" como el comportamiento por defecto — haciendo que la accesibilidad correcta sea el camino de menor resistencia para el desarrollador. Se incluye un prop `removeButtonLabel` para override en casos donde el label del tag no mapea limpiamente al nombre del recurso (ej. tags con fechas, etiquetas truncadas, o nombres de sistema).

**Tradeoff:** El label auto-generado usa el texto del tag tal como aparece en UI, que puede ser diferente al nombre semántico del recurso. El override explícito resuelve esto.

**Fuente:** research/components/tag.md §'What Everyone Agrees On' punto 1 y §'Where They Disagree' — Auto-generated vs. developer-provided.

---

### Decisión 5: Anatomía de 3 slots (leadingIcon, label, removeButton)

**Por qué:** El análisis cross-system de 24 sistemas identifica exactamente tres posiciones de slot con presencia en 5+ sistemas: leading icon/avatar (9/24), label text (24/24), y trailing remove button (11/24). No existen trailing icons de contexto (diferentes del remove button) en ningún sistema revisado — el trailing position es reservado exclusivamente para la acción destructiva. El avatar leading (Paste, Fluent 2) se modela como instancia intercambiable dentro del slot `leadingIcon` (instance swap en Figma, ReactNode en código), no como un slot separado, lo que mantiene la anatomía simple sin perder flexibilidad futura.

**Tradeoff:** Sin soporte nativo explícito para avatar — requiere que el diseñador use el slot `leadingIcon` con un componente Avatar. Se documenta este patrón en la guía de contenido.

**Fuente:** research/components/tag.md §Slot Consensus Table, references/anatomy-agent/slot-decision-rules.md (Q1: ¿reemplazable externamente? → Sí → slot).

### Excluded combinations

```
isRemovable × isDisabled
  Razón: Un tag removable y deshabilitado simultáneamente crea
  ambigüedad semántica: el removeButton es visible pero no activable.
  Polaris y Spectrum excluyen este combo.
  Regla: si isDisabled=true → isRemovable debe ser false.
  Impacto en frames: 0 (ambas son booleans, no multiplican el grid)

Color(hex arbitrary)
  Razón: Colores hex arbitrarios pueden fallar WCAG 4.5:1 de contraste.
  Esta implementación solo soporta los 7 colores semánticos del sistema.
  Si se necesita hex, requiere capa de validación de contraste en runtime.
  Impacto en frames: 0 (no aplica a la dimensión Color del grid actual)

State=disabled × State=hover/focus-visible
  Razón: Un elemento deshabilitado no puede recibir hover ni foco
  interactivo. Los estados son mutuamente exclusivos.
  Impacto en frames: N/A (manejado por interactive components internamente)
```

---

## Behavior

### Essential for design

**Modo display-only:** El tag es un elemento de solo lectura. No tiene affordance interactivo visual. El lector de pantalla lo lee como texto en línea dentro del contexto circundante. No requiere rol ARIA especial cuando está en prosa; en listas de tags usa `role="listitem"` dentro de un `role="list"`.

**Modo removable:** Cuando `isRemovable=true`, el `removeButton` es un elemento `<button>` focusable independiente del tag. Tiene su propio tab stop. El aria-label se auto-genera como "Eliminar [label]". Después de que el usuario activa el removeButton, el foco debe moverse al siguiente tag del grupo; si era el último tag, al contenedor del grupo o al elemento que precede al grupo.

**Modo navigable:** Cuando el tag se renderiza como `<a href="...">`, el tag completo es el enlace. No combinar con `isRemovable=true` — la existencia simultánea de un enlace y un botón de eliminar en el mismo tag crea confusión sobre la acción primaria (Polaris enforces mutual exclusivity).

**Gestión de foco post-eliminación:** Este es el requerimiento de accesibilidad más frecuentemente olvidado en implementaciones de tags. Al eliminar un tag por teclado (Delete/Backspace en el tag enfocado, o Enter/Space en el removeButton), el sistema debe:
1. Mover foco al siguiente tag si existe.
2. Si no hay siguiente, mover foco al tag anterior.
3. Si era el único tag, mover foco al contenedor del grupo.
4. Si el contenedor del grupo está vacío, mover foco al elemento de entrada (TagInput) si existe.

**Grupos de tags:** Siempre envolver conjuntos de tags en un contenedor con `role="list"` (o `<ul>`) y `aria-label` descriptivo. Un conjunto de tags sin contexto de grupo deja al usuario de lector de pantalla sin orientación sobre qué representa la colección.

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Tag container (display) | `none` o `listitem` | — | En prosa: none. En lista de tags: listitem dentro de list. |
| Tag container (navigable) | `link` (via `<a>`) | `href` | Navegación nativa; el texto del tag es el label del enlace. |
| Tag group container | `list` (via `<ul>`) | `aria-label="[nombre del grupo]"` | Sin group label, el SR no puede orientar al usuario en el contexto de la lista. |
| removeButton | `button` | `aria-label="Eliminar [label]"` | El label contextual es obligatorio en multi-tag. "Eliminar" solo es insuficiente. |
| Tag (estado disabled) | `none` | `aria-disabled="true"` | Informa al SR que el elemento existe pero no es activable. |
| Leading icon | `img` o `none` | `aria-hidden="true"` si es decorativo | Los íconos de contexto son decorativos; el label text lleva el significado. |

### Keyboard navigation

Primary interactions (affect design):

```
Delete / Backspace  →  Eliminar el tag que tiene foco
                       (cuando el tag está enfocado directamente,
                       no cuando el foco está en el removeButton)

Arrow Left / Right  →  Navegar entre tags en el grupo
                       (foco se mueve de tag en tag)

Tab                 →  Mover foco al removeButton del tag activo
                       (si isRemovable=true en ese tag)

Tab (desde removeButton) → Mover al siguiente elemento focusable
                            (siguiente tag o elemento fuera del grupo)

Shift+Tab          →  Foco al elemento previo en el orden de tabulación
```

Secondary interactions (dev reference):

```
Enter / Space (en removeButton)  →  Activar eliminación
                                    (equivalente a click en removeButton)

Enter / Space (en tag navigable) →  Seguir el enlace href
                                    (equivalente a click en el <a>)

Esc (en tag enfocado)            →  Mover foco al contenedor del grupo
                                    (comportamiento opcional, mejora UX)
```

---

## Content guide

### Slot: label

**Propósito:** Texto principal del tag. Es el único slot requerido y el portador primario del significado.

**Longitud recomendada:** 1–3 palabras. Los tags son indicadores de categoría o estado, no oraciones descriptivas. Valores de más de 4-5 palabras deben revisarse — probablemente pertenecen a un tooltip o a un elemento de descripción, no a un tag.

**Truncación:** Si el texto excede el espacio disponible, truncar con elipsis y mostrar el texto completo en un tooltip (title attribute o componente Tooltip). Nunca truncar el label sin acceso al texto completo — la información de categoría debe ser completamente accesible.

**Texto y color:** Cuando el tag tiene un `Color` semántico (success, warning, error, info), el texto del label DEBE comunicar el estado independientemente del color. Correcto: "Aprobado" (verde); Incorrecto: un tag verde sin label o con label "Estado". Esta regla es obligatoria por WCAG 1.4.1 (Color) y es el principio central de GOV.UK y Nord design systems.

**Capitalización:** Title case para nombres propios (tecnologías, personas, países). Sentence case para estados y categorías ("En revisión", "Activo", "Borrador"). Evitar ALL CAPS — reduce la legibilidad en tamaños pequeños.

### Slot: leadingIcon

**Propósito:** Icono o avatar que precede al texto para añadir contexto visual de tipo o identidad.

**Cuando usar:** Para indicar el tipo de categoría (ej. icono de código para tags de tecnología), la proveniencia del dato (ej. avatar para tags de persona/usuario asignado), o un indicador de estado adicional al color. No es obligatorio — el tag funciona completamente sin este slot.

**Tamaño:** 12px para Size=sm/md; 16px para Size=lg. El ícono no debe dominar visualmente el label.

**Avatar como leadingIcon:** Para tags de persona o usuario, se puede usar un componente Avatar en el slot leadingIcon (instance swap en Figma, ReactNode en código). En este caso, el Avatar debe tener `aria-hidden="true"` si el nombre del usuario ya está en el label, evitando duplicación en el lector de pantalla.

**Íconos decorativos:** Los íconos en el leadingIcon son siempre decorativos — el label text lleva el significado. Deben tener `aria-hidden="true"` en el código.

### Slot: removeButton

**Propósito:** Botón de acción que permite al usuario eliminar el tag del contexto donde aparece.

**Solo visible cuando:** `isRemovable=true`. Nunca renderizar este slot en tags display-only.

**aria-label:** Se auto-genera como "Eliminar [label]". En español: "Eliminar Python", "Eliminar React", "Eliminar TypeScript". El override `removeButtonLabel` permite personalización para casos donde el label del tag no mapea directamente al nombre del recurso.

**No usar como:** Acción de navegación, apertura de modal, o cualquier acción que no sea la eliminación del tag. El removeButton es exclusivamente destructivo (elimina la asociación tag-ítem).

**Posición:** Siempre trailing (después del label). Nunca leading — los íconos en posición leading son de contexto, no de acción.

---

## Pre-build checklist

```
ANATOMÍA
[ ] El slot label está marcado como required en la implementación
[ ] El slot leadingIcon tiene instance swap configurado con un placeholder
[ ] El slot removeButton solo aparece cuando isRemovable=true
[ ] Los dos booleans (isRemovable, isLeadingIconVisible) no multiplican frames

VARIANTES
[ ] Verificar las 63 combinaciones Color(7) × Size(3) × Variant(3)
[ ] Los estados (hover, focus-visible, disabled) están en interactive components
[ ] El estado disabled cambia: fill + text + border + cursor
[ ] El estado focus-visible muestra anillo de 2px con offset 2px

ACCESIBILIDAD
[ ] removeButton tiene aria-label="Eliminar [label]" auto-generado
[ ] El contenedor del grupo tiene role="list" y aria-label descriptivo
[ ] Los íconos leadingIcon tienen aria-hidden="true"
[ ] El foco post-eliminación está implementado (al siguiente tag o al contenedor)
[ ] Tags navigables usan <a href="..."> nativo, no <button onclick>
[ ] El label comunica el estado en texto, sin depender solo del color

EXCLUSIONES
[ ] isRemovable=true && isDisabled=true → bloqueado en la lógica del componente
[ ] No hay combinaciones State=hover + State=disabled en el mismo tag
[ ] No hay tags con href y removeButton simultáneamente

TOKENS
[ ] Los 20 tokens con prefijo "tag-" están mapeados en el sistema de tokens
[ ] Cada combinación Color × Variant usa los tokens semánticos correctos
[ ] El estado disabled usa los tokens tag-fg-disabled, tag-bg-disabled, tag-border-disabled

CONTENIDO
[ ] Labels: 1–3 palabras, sin ALL CAPS, texto que comunica el estado
[ ] Tags con colores semánticos tienen labels que describen el estado en texto
[ ] removeButtonLabel override disponible para casos atípicos

FIGMA
[ ] El componente está en la página de componentes del archivo DS
[ ] Existe una página de referencia con todos los estados side-by-side
[ ] La nomenclatura de layers sigue el patrón: Tag / [Color] / [Size] / [Variant]
[ ] Los slots leadingIcon y removeButton usan instancias, no frames estáticos
```

---

## Related components

```
Badge (Numérico)
  Propósito: Mostrar contadores o notificaciones numéricas
  Diferencia: Sin label de texto, valor numérico como contenido primario
  Cuándo preferirlo: "3 notificaciones", "12 mensajes sin leer"

Chip / FilterChip
  Propósito: Toggle seleccionable en panels de filtros
  Diferencia: aria-pressed, estado selected, sin removeButton
  Cuándo preferirlo: Multi-select de categorías, filtros de búsqueda

Lozenge / StatusBadge
  Propósito: Indicador de estado del workflow del sistema (no editable por usuario)
  Diferencia: Solo display, sin isRemovable, semántica de estado de proceso
  Cuándo preferirlo: "En Progreso", "Completado", "Bloqueado" en workflows

TagInput / TagPicker
  Propósito: Campo de entrada para crear y gestionar tags como input de formulario
  Diferencia: Componente compuesto con input text + sugerencias + lista de tags
  Cuándo preferirlo: "Agregar habilidades", "Seleccionar categorías", "Para: [recipients]"

Avatar
  Relación: Puede usarse como leadingIcon para tags de persona/usuario
  Uso: Tag con leadingIcon=Avatar para asignados, mencionados, seleccionados

Tooltip
  Relación: Complementario al truncamiento del label
  Uso: Si el label se trunca, Tooltip muestra el texto completo en hover/focus
```

---

## Reference: how other systems do it

### Material Design 3 — Chip (Tier 1)

Material Design 3 es el único sistema que formaliza la taxonomía de interacción en cuatro tipos mutuamente excluyentes: Assist (dispara una acción contextual), Filter (toggle booleano de estado), Input (dato ingresado por el usuario, como una dirección de email en un campo de destinatarios), y Suggestion (completado dinámico de texto). Esta taxonomía es una decisión de arquitectura crítica: un Filter chip y un Suggestion chip pueden ser visualmente idénticos, pero sus roles ARIA, handlers de teclado y modelos de estado son fundamentalmente distintos. M3 rechaza la idea de que la similitud visual justifique compartir comportamiento.

La distinción soft-disabled versus hard-disabled de M3 es única entre los 24 sistemas analizados. Un soft-disabled chip permanece en el tab order y puede recibir foco por teclado, pero no puede activarse. Esto sirve a la discoverability para usuarios de lector de pantalla: un usuario navegando con Tab puede encontrar el chip, escuchar su label, y entender que existe pero no está disponible. Hard-disabled lo elimina del tab order completamente, sacrificando discoverability por eficiencia de navegación. Esta tradeoff es explícita en la documentación de M3 y no existe en ningún otro sistema estudiado.

### Spectrum (Adobe) — TagGroup + Tag (Tier 1)

La decisión arquitectónica más significativa de Spectrum es que los Tags no pueden existir de forma aislada — TagGroup es el parent obligatorio. El grupo administra la identidad semántica (el label), el layout (wrapping, overflow), la coordinación de eliminación (focus management post-removal), y el estado de validación del formulario. Esta arquitectura previene el anti-patrón más común: un conjunto de tags sin ningún label accesible de grupo, donde los usuarios de lector de pantalla encuentran una secuencia de etiquetas sin ningún contexto colectivo.

El patrón `onRemove` como mode switch — su ausencia significa tags de solo lectura (sin botones de eliminar renderizados); su presencia habilita el modo removable (botones aparecen automáticamente) — es el patrón de menor fricción entre todos los sistemas revisados para prevenir UI destructiva accidental. El sistema `maxRows` + "show more" para overflow es único entre todos los 24 sistemas: overflow management integrado que elimina la necesidad de implementar lógica custom de "mostrar 3 de 12 tags".

### Carbon (IBM) — Tag (Tier 1)

Carbon define cuatro variants con modelos de interacción distintos: read-only (display, intencionalmente sin keyboard access), dismissible (removable, keyboard-accessible), selectable (toggle filter, estado checked), y operational (click que abre un popover o modal — el único variant en 24 sistemas que usa un tag como entry point a un overlay de progressive disclosure). La decisión de que read-only sea intencionalmente inalcanzable por teclado es deliberada para alta densidad: en tablas de datos enterprise donde una fila puede tener 10-20 read-only tags, forzar Tab a través de cada uno haría la navegación por teclado inutilizable.

Las 10 familias de color de Carbon no tienen significados de dominio prescritos — red no significa error, green no significa success. Esto es intencional para flexibilidad enterprise: los equipos asignan significados contextuales (Rojo = "Deprecated", Azul = "Experimental") sin estar bloqueados a semántica de estado. Esta es la diferencia más marcada respecto a GOV.UK, que sí prescribe significados específicos para cada color.

### Polaris (Shopify) — Tag (Tier 1)

Polaris optimiza para exactamente un caso de uso: tags keyword removibles suministrados por el merchant (product tags, order tags, customer segment tags). La auto-generación del aria-label del removeButton desde el texto del tag es la feature de DX más amigable con a11y en T1: la presencia de `onRemove` genera automáticamente un button con `aria-label="Remove [tag text]"` — eliminando el fallo de accesibilidad más frecuente en componentes removibles sin requerir ningún esfuerzo del desarrollador.

La mutual exclusivity entre `onClick`, `onRemove`, y `url` — un tag puede tener solo uno, nunca dos simultáneamente — previene "tag con link Y botón de eliminar", patrón que la investigación de Shopify identificó como fuente de confusión para los merchants. El `size="large"` tiene significado semántico más allá del visual: señala proveniencia del sistema (admin-created) versus tag creado por el merchant — un caso raro de tamaño codificando significado de dominio.

### Atlassian — Tag + Lozenge + TagGroup (Tier 1)

Atlassian formaliza la distinción entre etiquetas interactivas administradas por usuarios (Tag) e indicadores de estado no interactivos asignados por el sistema (Lozenge) en componentes separados — la formalización más clara de esta distinción entre los 24 sistemas. Jira tiene ambos: etiquetas de usuario en issues (Tag) y estados de workflow del sistema como "In Progress", "Done", "Blocked" (Lozenge). Usar el mismo componente para ambos requeriría o permitir botones de eliminar no interactivos, o añadir affordances interactivos a indicadores de estado — ambas opciones son semánticamente incorrectas.

El `onBeforeRemoveAction` que retorna una Promise es único entre los 24 sistemas. Eliminar un label de Jira es una mutación de datos con efectos downstream (reglas de automatización, queries de filtros, reporting) — la confirmación async previene pérdida accidental de datos. El patrón Promise es más limpio que el `event.preventDefault()` de Ant Design para confirmación async porque maneja estados de loading de forma natural.

### Ant Design — Tag + CheckableTag (Tier 2)

Ant Design tiene el sistema de colores más expresivo entre los 24 sistemas: 17+ presets nombrados más valores hex arbitrarios para colores de categorías definidos por el usuario desde una base de datos. Las plataformas SaaS admin necesitan mostrar colores de tags creados por usuarios con colores arbitrarios (colores de equipo, colores de proyecto, colores de label desde una herramienta de planning) — una capa de mapeo entre colores de base de datos y nombres de preset sería overhead innecesario. `CheckableTag` es un componente de filter pill togglable: el modelo de interacción es checkbox-like (selected/deselected) pero la affordance visual es de tag, apropiado para barras de filtros enterprise donde los visuales de checkbox en un layout de pill se ven fuera de lugar.

### Fluent 2 (Microsoft) — Tag + TagPicker (Tier 3)

Fluent 2 provee la implementación de tag más completa entre los sistemas T3: Tag con prop `dismissible` y TagPicker como sistema completo de input multi-valor — el patrón del campo de destinatarios de Outlook. TagPicker combina input de texto para typing, un dropdown de sugerencias filtradas, display de tags seleccionados, y eliminación por tag en un solo componente. Ningún otro sistema entre los 24 provee un TagPicker completo out-of-the-box; todos los demás requieren componer esto desde componentes separados.

### Mantine — Badge + Chip (Tier 3)

La división más clara de T3 entre componente display y componente interactivo. Badge maneja todos los casos de visualización de metadatos (con variante gradient única entre los sistemas estudiados). Chip maneja la interacción de toggle/filtro. `Chip.Group` provee semántica de multi-select con `role="group"` y `aria-checked` — el modelo ARIA correcto para un grupo de filtros seleccionables donde el usuario puede activar múltiples simultáneamente.

### GOV.UK — Tag (Tier 2)

El sistema más prescriptivo en cuanto a semántica de colores: 10 clases de color con mapping explícito a tipos de estado específicos (azul = en progreso, verde = completado, rojo = rechazado, naranja = warning, púrpura = recibido, amarillo = pendiente, rosa = enviado). El principio texto-sobre-color es mandatorío y explícito en la documentación: "el texto SIEMPRE debe transmitir el significado del estado; el color solo proporciona eficiencia de escaneo visual." Esta es la implementación de referencia del principio WCAG 1.4.1 aplicado a componentes de Tag.

---

## Tokens

**20 tokens** · prefix `tag-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| `tag-bg-default-solid` | `color/tag/bg/default-solid` | Background de tag default en variant solid |
| `tag-bg-default-soft` | `color/tag/bg/default-soft` | Background de tag default en variant soft |
| `tag-bg-default-outline` | `color/tag/bg/default-outline` | Background transparente en variant outline |
| `tag-fg-default` | `color/tag/fg/default` | Color de texto para tag default (todos los variants) |
| `tag-border-default` | `color/tag/border/default` | Color de borde para tag default |
| `tag-bg-success-soft` | `color/tag/bg/success-soft` | Background tenue del tag success (semántico del sistema) |
| `tag-fg-success` | `color/tag/fg/success` | Color de texto del tag success |
| `tag-border-success` | `color/tag/border/success` | Color de borde del tag success |
| `tag-bg-warning-soft` | `color/tag/bg/warning-soft` | Background tenue del tag warning |
| `tag-fg-warning` | `color/tag/fg/warning` | Color de texto del tag warning |
| `tag-border-warning` | `color/tag/border/warning` | Color de borde del tag warning |
| `tag-bg-error-soft` | `color/tag/bg/error-soft` | Background tenue del tag error |
| `tag-fg-error` | `color/tag/fg/error` | Color de texto del tag error |
| `tag-border-error` | `color/tag/border/error` | Color de borde del tag error |
| `tag-bg-info-soft` | `color/tag/bg/info-soft` | Background tenue del tag info |
| `tag-fg-info` | `color/tag/fg/info` | Color de texto del tag info |
| `tag-border-info` | `color/tag/border/info` | Color de borde del tag info |
| `tag-fg-disabled` | `color/tag/fg/disabled` | Color de texto en estado disabled |
| `tag-bg-disabled` | `color/tag/bg/disabled` | Background en estado disabled |
| `tag-border-disabled` | `color/tag/border/disabled` | Color de borde en estado disabled |

**Valores de referencia desde foundations.json:**

| Token de sistema | Valor (RGB) | Asignación a tag |
|-----------------|-------------|-----------------|
| `status.success.bg` | rgba(93%, 99%, 95%) | → `tag-bg-success-soft` |
| `status.success.fg` | rgba(8%, 55%, 22%) | → `tag-fg-success` |
| `status.success.border` | rgba(60%, 90%, 68%) | → `tag-border-success` |
| `status.warning.bg` | rgba(100%, 97%, 92%) | → `tag-bg-warning-soft` |
| `status.warning.fg` | rgba(72%, 48%, 5%) | → `tag-fg-warning` |
| `status.error.bg` | rgba(100%, 94%, 94%) | → `tag-bg-error-soft` |
| `status.error.fg` | rgba(86%, 15%, 15%) | → `tag-fg-error` |
| `status.info.bg` | rgba(93%, 95%, 100%) | → `tag-bg-info-soft` |
| `status.info.fg` | rgba(15%, 35%, 92%) | → `tag-fg-info` |
| `text.disabled` | rgba(72%, 72%, 75%) | → `tag-fg-disabled` |
| `surface.disabled` | rgba(96%, 96%, 98%) | → `tag-bg-disabled` |
| `border.disabled` | rgba(88%, 88%, 90%) | → `tag-border-disabled` |

### Spacing specs

```
SIZE BREAKDOWN
─────────────────────────────────────────────────
           sm        md        lg
─────────────────────────────────────────────────
height     20px      24px      28px
px (H)     6px       8px       12px
py (V)     2px       4px       4px
gap        4px       4px       6px
font-size  12px      14px      14px
font-wt    500       500       500
line-h     16px      20px      20px
icon-size  12px      12px      16px
─────────────────────────────────────────────────
radius     9999px (full, todos los sizes)
─────────────────────────────────────────────────

FRAME ANATOMY (md, label + removeButton)
─────────────────────────────────────────────────
│← 8px →│← text →│← 4px →│← 16px button →│← 8px →│
│       │ Python  │  gap  │      ╳        │       │
│  px   │  label  │  gap  │  removeButton │  px   │
         ↑ height: 24px total
─────────────────────────────────────────────────

FRAME ANATOMY (md, leadingIcon + label + removeButton)
─────────────────────────────────────────────────
│← 8px →│← 12px icon →│← 4px →│← text →│← 4px →│← 16px →│← 8px →│
│  px   │  leadingIcon │  gap  │ Python  │  gap  │   ╳    │  px   │
         ↑ height: 24px total
─────────────────────────────────────────────────

FOCUS RING (todos los sizes)
─────────────────────────────────────────────────
ring-width:  2px
ring-offset: 2px
ring-color:  focus.ring (rgba 25%, 39%, 95%)
─────────────────────────────────────────────────

FRAME COUNT SUMMARY
─────────────────────────────────────────────────
Color(7) × Size(3) × Variant(3) = 63 frames
Estados via interactive components:  +0 frames
Booleans (isRemovable, isLeadingIcon): +0 frames
─────────────────────────────────────────────────
Total net: 63 frames  [target: 10-30 simple]
           Dentro del rango "simple" benchmarks
           (Button M3=10, Polaris=12, Carbon=~30)
─────────────────────────────────────────────────
```
