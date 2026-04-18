# Chip (Filter)

## Overview

El Chip de tipo **filter** es un elemento interactivo de selección múltiple que permite al usuario activar o desactivar categorías, atributos o etiquetas en un grupo de opciones. A diferencia del chip de tipo input (que representa entidades removibles) o display (que es puramente informativo), el filter chip tiene semántica de palanca (toggle): cada chip mantiene un estado seleccionado/no seleccionado independiente que forma parte de un modelo de selección múltiple en el grupo.

El slot `leadingIcon` soporta dos submodos visuales: **icono de categoría** (para filtrar por tipo, atributo o categoría) o **avatar de persona** (para filtrar por participante, asignado o equipo). Cuando el chip entra en estado `selected`, aparece automáticamente el checkmark en la posición de ícono líder, con el icono/avatar posicionado después — este es el patrón M3 y evita depender solo del color como indicador de selección (WCAG 1.4.1).

```
FILTER CHIP — ANATOMÍA
┌────────────────────────────────────────────────────┐
│  [● icono/avatar]  [  Label del filtro  ]  [✓]    │
│   └─ leadingIcon    └─ label (req.)    └─ checkmark │
│      SWAP+BOOL                            BOOL      │
└────────────────────────────────────────────────────┘

ESTADO DEFAULT (sin seleccionar)
┌─────────────────────────────────┐
│  [🏷] Categoría                 │   ← borde outline, fondo surface/default
└─────────────────────────────────┘

ESTADO SELECTED (con icono líder)
┌────────────────────────────────────┐
│  [✓]  [🏷]  Categoría             │   ← checkmark + icono + fondo selected
└────────────────────────────────────┘

ESTADO SELECTED (sin icono líder)
┌──────────────────────────┐
│  [✓]  Categoría           │   ← solo checkmark + fondo selected
└──────────────────────────┘

PANEL DE FILTROS — USO TÍPICO
┌──────────────────────────────────────────────────────────────┐
│  Filtrar por categoría:                                       │
│  ┌─────────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │ [✓][🏷] React   │  │  [🏷] Vue   │  │  [🏷] TypeScript │  │
│  └─────────────────┘  └─────────────┘  └─────────────────┘  │
│  ┌────────────────────┐  ┌─────────────────────────┐         │
│  │ [✓][👤] Pedro Q.   │  │    [👤] Ana López        │         │
│  └────────────────────┘  └─────────────────────────┘         │
└──────────────────────────────────────────────────────────────┘
```

El tipo `filter` tiene un único valor en este scope y por tanto no multiplica el eje de variantes en Figma. Este documento cubre exclusivamente filter chips; los tipos input y display no están documentados aquí.

**Qué puede configurar el diseñador:**

Variantes (cambian la apariencia — generan frames en Figma):

```
Size    → sm | md | lg
Variant → filled | outlined | elevated
State   → default | hover | focus-visible | selected
```

Toggles (muestran/ocultan partes — NO generan variantes adicionales):

```
Show Leading Icon  → booleano (activa el slot leadingIcon)
Leading Icon       → swap (icono de categoría vs. avatar de persona)
Show Checkmark     → booleano (se activa automáticamente en estado selected)
Disabled           → booleano (aplica opacidad 0.4 al componente)
```

### Panel de propiedades en Figma

```
┌───────────────────────────────────────────┐
│  CHIP                                     │
│  ───────────────────────────────────────  │
│  Size         [ sm  ●md  lg ]             │
│  Variant      [ filled ●outlined elev. ]  │
│  State        [ ●default  hover  focus    │
│                  selected ]               │
│  ───────────────────────────────────────  │
│  Show Leading Icon   [ ○ ]                │
│  Leading Icon        [ ⟳ swap ]           │
│  Show Checkmark      [ ○ ]                │
│  Disabled            [ ○ ]                │
│  ───────────────────────────────────────  │
│  ✏️ Label     [ Chip ]                    │
└───────────────────────────────────────────┘
```

---

## When to use (and when not to)

```
¿Está el usuario eligiendo uno o varios valores de un conjunto conocido?
  └─ Sí → ¿El conjunto tiene ≤ 7 opciones?
              └─ Sí → ¿Caben en pantalla sin scroll horizontal excesivo?
                          └─ Sí → Filter Chip ✓
                          └─ No → Dropdown con checkboxes
              └─ No → Dropdown con checkboxes o panel lateral de filtros
  └─ No → ¿Es una etiqueta de estado de solo lectura?
              └─ Sí → Badge / Tag (display-only, no este componente)
              └─ No → ¿El usuario añade y elimina entidades (correos, tags)?
                          └─ Sí → Input Chip (tipo separado, no documentado aquí)
                          └─ No → Evalúa Button, Toggle o Segmented Control
```

**Usa Filter Chip cuando:**

- El usuario necesita filtrar una lista, galería o feed activando una o más categorías simultáneamente (p.ej. "Lenguaje: React, Vue"; "Asignado: Pedro, Ana").
- Las opciones de filtro son pocas (≤ 7) y caben visualmente en una fila o grupo compacto sin requerir scroll horizontal.
- El público objetivo son usuarios técnicos o de negocio familiarizados con interfaces de filtrado (dashboards, herramientas de gestión de proyectos, paneles de administración, apps B2B).
- El estado de filtro activo debe ser visible de un vistazo — los chips seleccionados comunican de forma inmediata qué filtros están aplicados.
- El contenido visual del filtro incluye un identificador de categoría (icono) o de persona (avatar) que mejora el reconocimiento rápido.
- Varios filtros pueden estar activos al mismo tiempo de forma independiente (multi-select puro).

**NO uses Filter Chip cuando:**

- Hay más de 7 opciones de filtro — el usuario no puede evaluar un panel amplio de chips de un vistazo; un dropdown con checkboxes es más manejable.
- Los usuarios no son técnicos o no están familiarizados con el patrón de chip como selector de filtro — la investigación de Polaris/Shopify encontró que los checkboxes son más intuitivos para audiencias generales.
- Solo una opción puede estar activa a la vez — usa Segmented Control (excluyente visual) o radio buttons (contexto de formulario).
- El chip necesita que el usuario lo elimine permanentemente — ese es el patrón del Input Chip, no del Filter Chip.
- El chip solo muestra información de estado sin interacción — usa Badge o Tag (display).
- El clic en el chip debe hacer algo más que un toggle (navegar, abrir un popover, desencadenar una acción) — eso requiere un tipo distinto (action/operational).

---

## Visual variations

### Tamaños

Los tres tamaños mantienen la misma proporción visual y radio de píldora (border-radius: 9999px). Todas las medidas son parte de la escala de foundations.

| Tamaño | Altura | Font size | Icon size | py | px | Gap | Radius |
|--------|--------|-----------|-----------|-----|-----|-----|--------|
| sm | 32px | 12px | 16px | 4px | 8px | 8px | 9999 |
| md | 40px | 14px | 16px | 8px | 12px | 8px | 9999 |
| lg | 48px | 16px | 20px | 12px | 16px | 8px | 9999 |

```
SM  ┌────────────────────┐   h=32  font=12  icon=16
    │  [●]  Label sm     │
    └────────────────────┘

MD  ┌──────────────────────────┐   h=40  font=14  icon=16
    │  [●]  Label medium       │
    └──────────────────────────┘

LG  ┌─────────────────────────────────┐   h=48  font=16  icon=20
    │  [●]   Label large              │
    └─────────────────────────────────┘
```

### Variantes visuales

**Filled** — Superficie sólida con fondo de color interactivo suave en reposo (`surface/default`), más intenso en estado selected (`surface/selected`). Es la variante de mayor legibilidad en fondos blancos o gris claro. Comunica claramente qué chips están activos mediante el contraste de fondo. Recomendada como variante por defecto en paneles de filtro inline.

**Outlined** — Sin fondo relleno en estado default, solo borde (`border/default`). Menor peso visual que el filled; ideal cuando los chips compiten visualmente con otros elementos y se necesita que el estado selected destaque por contraste máximo (borde + fondo `surface/selected` en estado activo). Es el estilo más neutro en contextos de contenido denso o interfaces con muchos elementos visuales.

**Elevated** — Sombra de elevación nivel 1, sin borde. Diseñado específicamente para contextos donde el chip aparece sobre contenido visual no-blanco: mapas con tiles de colores, imágenes de portada, galerías, fondos con gradiente o textura. La sombra comunica que el chip "flota" sobre el plano del contenido subyacente, haciendo su affordance interactiva inmediatamente reconocible. No combina con outlined (señales de profundidad contradictorias — exclusión explícita).

### Estados por variante

**default** — Chip en reposo, no seleccionado. Fondo `chp-surface-default`, borde `chp-border-default` (visible en outlined), sombra nivel 1 (elevated). Checkmark oculto. Icono/avatar visible si `Show Leading Icon = true`.

**hover** — El usuario posiciona el cursor sin hacer clic. Fondo `chp-surface-hover`, borde `chp-border-hover`. Cursor pointer obligatorio. El checkmark mantiene la visibilidad del estado base del chip.

**focus-visible** — El chip recibe foco por navegación de teclado (Tab o Arrow keys dentro del grupo). Anillo de foco `chp-border-focus` de 2px con offset de 2px, color `focus/ring`, border-radius igual al del chip (9999 — píldora completa). Este estado solo es visible cuando se navega con teclado; no aparece en interacción con mouse.

**selected** — El chip ha sido activado (toggle activo). Fondo `chp-surface-selected` (tono de marca suave), checkmark visible, icono/avatar persiste si estaba presente (posicionado después del checkmark). En outlined: borde se intensifica a `chp-border-selected` (color interactivo). En elevated: la sombra persiste, el fondo cambia a selected.

```
FILLED — 4 estados
┌──────────────────┐  ┌──────────────────┐
│  [🏷] Label      │  │▒  [🏷] Label   ▒│   default → hover
└──────────────────┘  └──────────────────┘
                        (surface/hover)

┌──────────────────┐  ┌─────────────────────┐
│  [🏷] Label      │  │  [✓][🏷] Label      │   focus-visible → selected
│  ╔═══════════╗   │  └─────────────────────┘
└──╚═══════════╝───┘   (surface/selected + checkmark)
    (ring 2px/offset 2px)

OUTLINED — borde visible, fondo solo en selected
┌──────────────────┐          ┌─────────────────────┐
│ ┄ [🏷] Label  ┄  │    →     │ ┄ [✓][🏷] Label  ┄  │
└──────────────────┘          └─────────────────────┘
  (borde/default)               (borde/selected + surface/selected)

ELEVATED — sombra persistente, sin borde
┌──────────────────┐          ┌─────────────────────┐
│  [🏷] Label      │░ sombra  │  [✓][🏷] Label      │░ sombra
└──────────────────┘          └─────────────────────┘
  (surface/default)              (surface/selected)
```

### Combinaciones excluidas

- `Elevated × Variant=outlined` — excluida. La sombra y el borde son señales de profundidad contradictorias; solo una aplica.
- `Removable=true` — excluida para filter chips. No representan entidades removibles; son selectores de palanca. El slot `removeButton` existe en el config general pero tiene `defaultVisible=false` y no se expone en el panel de propiedades de este scope.
- `Type=input` y `Type=display` — fuera del scope de este documento.

### Framecount (scope filtrado)

```
3 tamaños × 3 variantes × 4 estados = 36 brutos
− Elevated × outlined × 4 estados  = − 4 excluidos
= 32 frames netos
```

---

## Design decisions

### 1. Scope filter-only: por qué no incluir input ni display

El tipo `filter` (palanca de selección múltiple), el tipo `input` (token removible de entidad) y el tipo `display` (etiqueta de estado de solo lectura) son tres modelos de interacción fundamentalmente distintos con semántica ARIA incompatible: `aria-pressed` para filter, `aria-label="Eliminar [contenido]"` para input, y sin interacción para display.

Fusionar los tres en un componente genérico — como lo hace Base Web mediante detección de callbacks — produce ambigüedad comportamental: ¿es este chip filtrable, removible, o ambos? Esa ambigüedad se propaga a los equipos de implementación, genera inconsistencias ARIA y dificulta el mantenimiento.

Este spec sigue el patrón de Material Design 3, Fluent 2 y Ant Design (CheckableTag separado), que tratan cada tipo como entidad independiente. Para este sistema, el filter chip cubre el caso de uso principal: selección múltiple en paneles de filtro. El tipo input se documenta por separado cuando sea necesario. El tipo display corresponde al componente Badge/Tag.

### 2. Modelo ARIA para multi-select: role=group + aria-pressed por chip

Para selección múltiple, la arquitectura ARIA correcta es:

- **Contenedor:** `role="group"` con `aria-label` descriptivo (p.ej. "Filtrar por lenguaje de programación")
- **Chip individual:** `role="button"` con `aria-pressed="true|false"` para el estado de palanca

Esta combinación es el consenso entre M3, Carbon, Cedar y Orbit. La alternativa (`role="checkbox"` dentro de `role="group"`) también es válida según ARIA APG, pero `aria-pressed` es preferible para filter chips porque el modelo mental del usuario es "presionar para activar un filtro", no "marcar una casilla de formulario". La semántica de checkbox implica envío de formulario con datos; la semántica de button+pressed implica un control de interfaz que cambia inmediatamente el estado visual de la vista.

Spectrum hace el `aria-label` en el contenedor del grupo obligatorio a nivel de runtime (lanza error sin él). Este spec adopta ese estándar: el `aria-label` del grupo no es opcional.

### 3. Slot leadingIcon con patrón BOOL+SWAP para icono y avatar

El slot `leadingIcon` usa el patrón Figma BOOL+SWAP: la propiedad booleana `Show Leading Icon` controla visibilidad del slot, y la propiedad swap `Leading Icon` controla qué instancia se renderiza. Dos opciones de swap cubren el 100% del scope: icono de categoría (símbolo abstracto) o avatar de persona (foto/iniciales).

Este patrón reduce del 80–95% la proliferación de variantes que resultaría de crear frames separados para cada combinación de icono. El icono se usa para categorías y atributos; el avatar para personas. Dentro de un mismo grupo de chips, todos los elementos usan el mismo tipo de contenido líder — no se mezclan iconos y avatares en un mismo grupo.

### 4. Checkmark en estado selected: WCAG 1.4.1 — no solo color

El estado selected no puede comunicarse exclusivamente mediante el cambio de color de fondo. WCAG 1.4.1 (Uso del color) requiere que la información no dependa solo del color; usuarios con daltonismo u otras condiciones visuales deben poder distinguir el estado.

El checkmark `✓` visible en posición líder al entrar en estado selected es el segundo indicador visual obligatorio. Aparece automáticamente — `Show Checkmark` se activa con el estado. Si el chip tiene `Show Leading Icon=true`, el checkmark se posiciona antes del icono/avatar. Esta posición es deliberada: el checkmark es el indicador de estado (tiene precedencia visual), el icono/avatar es el identificador de contenido del filtro.

### 5. Variante elevated: contexto sobre fondos no blancos

La variante `elevated` (shadow-level-1, sin borde) está diseñada para contextos donde el chip aparece sobre contenido visual: mapas con tiles, imágenes de portada, galerías, fondos con gradiente. En esos contextos, un chip outlined se confunde con los bordes del contenido visual, y un chip filled sin sombra pierde la separación de plano necesaria para su legibilidad.

La sombra eleva perceptualmente el chip sobre el plano del contenido, comunicando que es un elemento de interfaz que "flota" — no parte del contenido. Esta variante está excluida en combinación con outlined porque la sombra y el borde son dos señales de separación espacial contradictorias aplicadas simultáneamente.

### 6. Disabled como booleano, no como fila de State

El estado disabled aplica una reducción de opacidad al 40% al componente completo sin cambiar la estructura visual (ni color de fondo, ni borde, ni checkmark, ni icono). Según la regla de clasificación del sistema (global-property-rules, Rule 27): si un estado modifica ≤ 1 propiedad visual, se implementa como booleano en lugar de multiplicar el eje de variantes. Mantiene la matriz de frames manejable (32 frames netos en lugar de 64).

En accesibilidad, se usa `aria-disabled="true"` en lugar del atributo HTML `disabled`, para mantener el chip en el árbol de accesibilidad y en el tab order. Un chip deshabilitado que permanece alcanzable por teclado permite al usuario saber que esa opción de filtro existe pero no está disponible en el contexto actual — patrón "soft-disabled" de M3.

### Combinaciones excluidas

```
Elevated=true × Variant=outlined
→ Señales de profundidad contradictorias: la sombra eleva el plano
  del chip sobre el contenido; el borde outline aplana su jerarquía.
  Solo una señal de separación aplica simultáneamente.

Type=filter × Removable=true
→ Filter chips son selectores de palanca. No representan entidades
  removibles. El botón de remove no tiene semántica funcional
  en el modelo mental ni ARIA del filter chip.
  (removeButton existe en config pero defaultVisible=false.)
```

---

## Behavior

### Comportamientos esenciales para el diseño

**Toggle independiente en grupo:** Cada filter chip dentro del grupo es un toggle independiente. Activar uno no desactiva los demás (a diferencia del Segmented Control). El grupo puede tener 0, 1 o N chips seleccionados simultáneamente — ningún mínimo ni máximo es impuesto por el componente en sí; el sistema consumidor define la lógica de filtrado.

**Checkmark automático en selected:** Al entrar en `State=selected`, la propiedad `Show Checkmark` se activa. El checkmark es parte del estado visual del chip, no una configuración opcional del diseñador. Su visibilidad está ligada al estado, no es un toggle libre.

**Icono líder persiste en selected:** Si `Show Leading Icon=true`, el icono/avatar permanece visible al seleccionar el chip, posicionado después del checkmark. La presencia simultánea de checkmark e icono comunica: "este filtro está activo, y es del tipo [icono]."

**Disabled permanece visible:** Un chip con `Disabled=true` no desaparece — se mantiene visible con opacidad reducida. El usuario puede leer el label del filtro deshabilitado y entender que esa opción existe pero no está disponible en el contexto actual.

**Foco roving tabindex:** Dentro de un grupo de filter chips, el foco navega entre chips con las teclas de flecha. Solo un chip del grupo está en el tabindex activo en un momento dado. Tab/Shift+Tab salta al elemento anterior/siguiente fuera del grupo completo.

### Accesibilidad (ARIA)

| Parte | Role | Atributos | Por qué importa |
|-------|------|-----------|-----------------|
| Contenedor del grupo | `role="group"` | `aria-label="[descripción del filtro]"` | Sin label de grupo, el lector de pantalla anuncia cada chip sin contexto. "React, botón" vs. "Filtrar por lenguaje, React, pulsado" |
| Chip individual | `role="button"` | `aria-pressed="true\|false"` | Comunica el estado de palanca. `true` = seleccionado; `false` = no seleccionado |
| Icono líder | `aria-hidden="true"` | — | Decorativo; el label del chip comunica el filtro. El icono no debe duplicar la información para lectores de pantalla |
| Checkmark | `aria-hidden="true"` | — | El estado ya está comunicado por `aria-pressed`; el checkmark es confirmación visual redundante |
| Chip disabled | `role="button"` | `aria-disabled="true"` (no atributo HTML `disabled`) | `aria-disabled` mantiene el chip en el árbol de accesibilidad y en el tab order; `disabled` HTML lo eliminaría, ocultando al usuario la existencia de esa opción |

### Navegación por teclado

Interacciones primarias (afectan el diseño):

```
Space / Enter   → Toggle el estado del chip (selected ↔ default)
                  Checkmark aparece/desaparece según el nuevo estado

→ / ↓           → Mover foco al siguiente chip del grupo
                  (roving tabindex — actualiza qué chip es el tabbable)

← / ↑           → Mover foco al chip anterior del grupo

Tab             → Salir del grupo de chips al siguiente elemento
                  focusable fuera del grupo

Shift+Tab       → Salir del grupo al elemento anterior fuera del grupo
```

Interacciones secundarias (referencia para desarrollo):

```
Home            → Mover foco al primer chip del grupo
End             → Mover foco al último chip del grupo

Nota dev: El focus ring (2px solid, 2px offset, border-radius 9999)
debe ser visible en todos los chips al recibirfoco por teclado.
No suprimir outline en estilos CSS.

Nota dev: aria-pressed debe actualizarse síncronamente al hacer
toggle — no esperar a un re-render asíncrono.

Nota dev: Si el chip está disabled (aria-disabled="true"),
Space/Enter no hace toggle, pero el chip sigue siendo alcanzable
por teclado y el lector de pantalla anuncia su label y estado disabled.

Nota dev: El grupo completo debe tener un único punto de entrada
Tab. El roving tabindex implementa este comportamiento manteniendo
tabindex="0" en el chip actualmente enfocado y tabindex="-1"
en el resto del grupo.
```

---

## Content guide

### leadingIcon (icono vs. avatar)

El slot `leadingIcon` acepta dos tipos de contenido visual mediante swap:

**Icono de categoría** — Úsalo cuando el chip representa un atributo, tipo o categoría abstracta identificable con un símbolo (p.ej. icono de código para "JavaScript", icono de folder para "Backend", icono de tag para "Bug", icono de calendar para "Esta semana"). El icono debe ser reconocible a 16px (sm/md) o 20px (lg). Evita iconos con más de 2 puntos de detalle a tamaño reducido — pierde legibilidad.

**Avatar de persona** — Úsalo cuando el chip representa a una persona específica: asignado, participante, autor, miembro del equipo. El avatar muestra foto de perfil o iniciales. Tamaño: 16px (sm/md) o 20px (lg), siempre circular. Aporta reconocimiento visual inmediato en equipos donde los participantes son conocidos.

**Regla de consistencia de grupo:** Dentro de un mismo grupo de filter chips, todos los chips deben usar el mismo tipo de leadingIcon — todos iconos de categoría o todos avatares. No mezclar ambos tipos en un mismo grupo; genera inconsistencia visual y dificulta el escaneo del panel de filtros.

### label

- Texto del filtro, conciso y descriptivo. **Máximo 2–3 palabras.**
- Usa el nombre exacto del atributo filtrado, no una descripción con verbo ("React", no "Filtrar por React").
- Capitaliza solo la primera letra (sentence case), excepto nombres propios, acrónimos o marcas registradas.
- Evita artículos al inicio ("el", "la", "los") — incrementan la longitud del chip sin añadir información.
- Si el label es dinámico (viene de API o base de datos), define un `maxWidth` con truncamiento por ellipsis para casos extremos. Truncar es preferible a romper el layout del panel.

Ejemplos correctos: `React`, `Vue.js`, `Ana López`, `Backend`, `Alta prioridad`, `Esta semana`
Ejemplos incorrectos: `Filtrar por React`, `Los proyectos de backend`, `TODOS LOS LENGUAJES DISPONIBLES`

### checkmark

El checkmark no es contenido configurable por el diseñador en producción — es un indicador de estado automático controlado por `Show Checkmark` que se activa al entrar en `State=selected`. No se añade manualmente; emerge del estado del componente.

Su propósito es doble: (1) indicador visual de selección complementario al cambio de color, cumpliendo WCAG 1.4.1, y (2) señal de que el grupo es multi-select (múltiples chips pueden estar seleccionados simultáneamente), en contraste con un Segmented Control donde solo un segmento puede estar activo.

---

## Pre-build checklist

```
FIGMA — Estructura
[ ] Componente creado con variantes: Size (sm/md/lg) × Variant (filled/outlined/elevated)
    × State (default/hover/focus-visible/selected)
[ ] Layer raíz nombrado: _chip-root (target del booleano Disabled)
[ ] Layer de icono líder nombrado: leadingIcon
[ ] Layer de label nombrado: label
[ ] Layer de checkmark nombrado: checkmark
[ ] Layer de removeButton existente pero defaultVisible=false (no expuesto en panel)

FIGMA — Propiedades
[ ] Propiedad de texto "✏️ Label" conectada al layer label
[ ] Propiedad booleana "Show Leading Icon" conectada al layer leadingIcon
[ ] Propiedad swap "Leading Icon" con mínimo 2 opciones: icono genérico + avatar placeholder
[ ] Propiedad booleana "Show Checkmark" conectada al layer checkmark
[ ] Propiedad booleana "Disabled" conectada al layer _chip-root (opacity 0.4)

FIGMA — Exclusiones y framecount
[ ] Combinación Elevated × outlined marcada como excluida en component notes
[ ] Framecount verificado: ~32 frames netos (36 brutos − 4 excluidos)
[ ] Grid: maxCols=4, gap=20px, pad=30px

ACCESIBILIDAD
[ ] Documentado: role="group" en contenedor ChipGroup + aria-label obligatorio
[ ] Documentado: role="button" + aria-pressed en cada chip individual
[ ] Focus ring visible en state=focus-visible: 2px solid, offset 2px, radius=9999
[ ] Estado selected tiene checkmark + cambio de color (no solo color — WCAG 1.4.1)
[ ] Disabled usa aria-disabled="true", no atributo HTML disabled
[ ] leadingIcon y checkmark tienen aria-hidden="true"
[ ] Chips disabled siguen siendo alcanzables por teclado (roving tabindex)

TOKENS
[ ] Prefijo chp- aplicado a todas las variables de Figma del componente
[ ] chp-surface-selected conectado a surface/selected de foundations
[ ] chp-border-focus conectado a focus/ring de foundations
[ ] Spacing tokens por tamaño documentados: chp-px-sm=8, chp-px-md=12, chp-px-lg=16
[ ] chp-shadow-elevated conectado a elevation level 1 de foundations
[ ] chp-opacity-disabled = 0.4

CONTENIDO DE EJEMPLO
[ ] Labels de ejemplo en Figma: máximo 3 palabras, sentence case
[ ] Icono placeholder: tamaño 16px (sm/md), 20px (lg)
[ ] Avatar placeholder: circular, mismo tamaño que icono, iniciales "AB"
```

---

## Related components

```
TAG / BADGE (display-only)
→ Úsalo para etiquetas informativas sin interacción. Sin estado hover,
  sin aria-pressed, sin foco de teclado. Atlassian separa Tag (interactivo)
  de Lozenge (display) como principio arquitectónico; este sistema adopta
  la misma separación. Si el chip no necesita ser clickeable, usa Badge.

SEGMENTED CONTROL
→ Úsalo cuando solo UNA opción puede estar activa a la vez (single-select
  excluyente). El Segmented Control comunica visualmente que los segmentos
  son mutuamente excluyentes, ocupando el espacio completo del control.
  Si necesitas multi-select independiente, Filter Chip es el componente
  correcto. Si necesitas una sola opción activa, Segmented Control es más
  claro semánticamente.

CHECKBOX GROUP (contexto de formulario)
→ Úsalo cuando la selección es parte de un formulario con envío de datos,
  o cuando el público es general y no técnico. La investigación de
  Polaris/Shopify encontró que checkboxes son más familiares para audiencias
  generales. Filter Chip es preferible para interfaces técnicas con filtrado
  inmediato; Checkbox Group es preferible en formularios o para audiencias
  no familiarizadas con el patrón chip.

INPUT CHIP (tokens removibles)
→ Úsalo cuando el usuario añade y elimina entidades representadas como chips:
  destinatarios de correo, tags de un post, participantes de una reunión.
  A diferencia del Filter Chip, el Input Chip usa aria-label="Eliminar
  [contenido]" en el botón de cierre y no usa aria-pressed.
  Son tipos semánticamente distintos, documentados por separado.

DROPDOWN / SELECT CON CHECKBOXES
→ Úsalo cuando hay más de 7 opciones de filtro o el espacio horizontal no
  es suficiente para mostrar todos los chips. Conserva el modelo multi-select
  pero en un espacio comprimido con un trigger visible.
```

---

## Reference: how other systems do it

### Material Design 3 (Google)

Material Design 3 es la referencia de industria para el filter chip. Su taxonomía explícita de cuatro tipos (Assist, Filter, Input, Suggestion) fue diseñada para eliminar la ambigüedad comportamental — no es posible usar accidentalmente un Filter chip como Assist chip porque los props del API son distintos. Para filter chips, M3 establece dos patrones que este documento adopta directamente.

El **checkmark en posición líder al seleccionar**: cuando un filter chip entra en estado selected, un checkmark aparece en el lado izquierdo del label. Si hay un icono líder presente, el checkmark lo precede. Este desplazamiento hace el cambio de estado perceptible sin depender exclusivamente del color (WCAG 1.4.1) y comunica de forma unívoca "este filtro está activo".

La **variante elevated**: M3 introdujo chips con sombra específicamente para el patrón de chips flotando sobre mapas de Google Maps, donde los tiles tienen colores arbitrarios que contaminan visualmente un chip filled o outlined. La sombra de nivel 1 comunica que el chip pertenece a un plano espacial separado del contenido subyacente — exactamente el mismo razonamiento que este spec aplica a la variante elevated.

El patrón **soft-disabled** de M3 — chip focusable pero inerte, permanece en tab order con `aria-disabled="true"` — es el estándar correcto para chips de filtro no disponibles temporalmente. Permite al usuario conocer la existencia de la opción sin poder activarla.

### Mantine

Mantine ofrece la implementación de filter chip panel más clara entre los 24 sistemas analizados. Su arquitectura `Chip` + `Chip.Group` con prop `multiple` es el modelo que ilustra más directamente la separación correcta de responsabilidades: el `Chip.Group` es dueño del estado de selección, del modo (radio/checkbox) y de la semántica ARIA del grupo; el `Chip` individual es pasivo y solo comunica su label y estado.

Un solo prop `multiple` en el contenedor cambia el modelo de selección completo sin modificar los chips individuales — elegancia de API que este spec adopta como principio de diseño. La arquitectura role="group" + aria-label obligatorio en Chip.Group, con role="checkbox" + aria-checked en chips individuales (modo multi-select), es la alternativa ARIA válida al modelo button+aria-pressed. Este spec adopta button+aria-pressed por ser el más extendido, pero el enfoque de contenedor-primero de Mantine es la referencia de diseño de API.

### Carbon (IBM)

Carbon llama al filter chip "variant selectable" dentro de su componente Tag unificado. La decisión de hacer los tags read-only keyboard-unreachable por diseño en contextos de tablas densas es técnicamente correcta: en una tabla con 100 filas y 5 tags de estado por fila, poner 500 chips en el tab order bloquea la navegación para usuarios de teclado. Carbon sacrifica consistencia de API en favor de la experiencia de navegación correcta.

Para este documento, el principio de Carbon se refleja en la exclusión explícita de los tipos display e input del scope. Un filter chip debe estar en el tab order porque el usuario interactúa con él; un chip de solo lectura no debe estarlo en contextos densos. La separación de tipos es precisamente lo que permite esta distinción.

### Spectrum (Adobe)

La arquitectura de Spectrum TagGroup es la más sólida desde el punto de vista de accesibilidad entre los 24 sistemas analizados. La enforced requirement de `aria-label` en el contenedor del grupo — que lanza error en runtime si falta — elimina la falla de accesibilidad más frecuente en implementaciones de chip panels: chips anunciados por lectores de pantalla sin contexto de grupo ("JavaScript, botón" en lugar de "Filtrar por lenguaje, JavaScript, pulsado").

El manejo de overflow `maxRows` + "show more" de Spectrum es la implementación de referencia para filter panels con número variable de chips. Este spec no incluye overflow handling en el scope del filter chip individual, pero la arquitectura de Spectrum es la referencia correcta al diseñar el contenedor `ChipGroup`.

### Atlassian

La separación arquitectónica entre Tag (interactivo: clickable, linkable, removable) y Lozenge (display-only: estado de sistema, no interactivo) es el argumento más sólido en favor del scope filter-only de este documento. En Jira/Confluence coexisten chips interactivos (etiquetas de usuario en issues, que se pueden añadir y eliminar) con lozenges de estado (In Progress, Done, Blocked) que nunca deben ser interactivos.

Fusionarlos en un único componente con prop `interactive` sería un error de arquitectura: el equipo de diseño y desarrollo siempre debe elegir explícitamente el tipo de chip, no inferirlo de un estado booleano. Atlassian resuelve esto con dos componentes distintos. Este spec adopta ese principio de separación arquitectónica.

### Cedar (REI)

Cedar es el único sistema de Tier 2 con un componente de chip interactivo dedicado y certificado WCAG 2.1 AA. CdrChip usa `aria-pressed` nativo para estado de palanca — validando que el modelo button+aria-pressed es correcto no solo para los sistemas de Tier 1 sino también para sistemas de escala media. Cedar soporta tanto single-select (choice chip) como multi-select (filter chip) mediante la configuración del contenedor grupo, con un único componente de chip individual — el mismo enfoque que este spec adopta.

---

## Tokens

**42 tokens** · prefix `chp-` · 3 capas (primitive → semantic → component)

| Token | Variable Figma | Uso |
|-------|----------------|-----|
| `chp-surface-default` | `surface/default` | Fondo del chip en estado default (filled) |
| `chp-surface-hover` | `surface/hover` | Fondo del chip en estado hover (filled) |
| `chp-surface-selected` | `surface/selected` | Fondo del chip en estado selected (filled + outlined) |
| `chp-surface-disabled` | `surface/disabled` | Fondo del chip disabled (filled) |
| `chp-text-default` | `text/primary` | Color del label en estado default y hover |
| `chp-text-selected` | `text/primary` | Color del label en estado selected |
| `chp-text-disabled` | `text/disabled` | Color del label en estado disabled |
| `chp-border-default` | `border/default` | Borde en outlined, estado default |
| `chp-border-hover` | `border/hover` | Borde en outlined, estado hover |
| `chp-border-selected` | `interactive/default` | Borde en outlined, estado selected (color de marca) |
| `chp-border-focus` | `focus/ring` | Anillo de focus-visible (2px, offset 2px) |
| `chp-border-disabled` | `border/disabled` | Borde en outlined, estado disabled |
| `chp-icon-default` | `text/secondary` | Color del icono líder en estado default |
| `chp-icon-selected` | `interactive/default` | Color del icono líder en estado selected |
| `chp-icon-disabled` | `text/disabled` | Color del icono líder en estado disabled |
| `chp-checkmark-color` | `interactive/default` | Color del checkmark en estado selected |
| `chp-shadow-elevated` | `elevation/1` | Sombra del chip en variante elevated |
| `chp-opacity-disabled` | `0.4` | Opacidad global del componente en estado disabled |
| `chp-radius` | `9999` | Border-radius (píldora) — todos los tamaños |
| `chp-focus-ring-width` | `focus/ringWidth` (2px) | Ancho del anillo de focus |
| `chp-focus-ring-offset` | `focus/ringOffset` (2px) | Desplazamiento del anillo de focus desde el borde |
| `chp-h-sm` | `controlHeights/sm` (32px) | Altura del chip tamaño sm |
| `chp-h-md` | `controlHeights/md` (40px) | Altura del chip tamaño md |
| `chp-h-lg` | `controlHeights/lg` (48px) | Altura del chip tamaño lg |
| `chp-font-sm` | `typeScale/sm` (12px) | Tamaño de fuente del label en sm |
| `chp-font-md` | `typeScale/md` (14px) | Tamaño de fuente del label en md |
| `chp-font-lg` | `typeScale/lg` (16px) | Tamaño de fuente del label en lg |
| `chp-lh-sm` | `lineHeights/sm` (16px) | Line-height del label en sm |
| `chp-lh-md` | `lineHeights/md` (20px) | Line-height del label en md |
| `chp-lh-lg` | `lineHeights/lg` (24px) | Line-height del label en lg |
| `chp-icon-size-sm` | `iconSizes/sm` (16px) | Tamaño del icono líder en sm y md |
| `chp-icon-size-lg` | `iconSizes/md` (20px) | Tamaño del icono líder en lg |
| `chp-px-sm` | `spacingScale[2]` (8px) | Padding horizontal en sm |
| `chp-px-md` | `spacingScale[3]` (12px) | Padding horizontal en md |
| `chp-px-lg` | `spacingScale[4]` (16px) | Padding horizontal en lg |
| `chp-py-sm` | `spacingScale[1]` (4px) | Padding vertical en sm |
| `chp-py-md` | `spacingScale[2]` (8px) | Padding vertical en md |
| `chp-py-lg` | `spacingScale[3]` (12px) | Padding vertical en lg |
| `chp-gap-sm` | `spacingScale[2]` (8px) | Gap entre icono/checkmark y label en sm |
| `chp-gap-md` | `spacingScale[2]` (8px) | Gap entre icono/checkmark y label en md |
| `chp-gap-lg` | `spacingScale[2]` (8px) | Gap entre icono/checkmark y label en lg |
| `chp-group-gap` | `spacingScale[2]` (8px) | Gap entre chips dentro del grupo contenedor |

### Spacing specs

```
TAMAÑO SM  (h=32)
├── px=8 ──┤── [icon 16px] ──┤── gap=8 ──┤── [Label 12px/16lh] ──┤── px=8 ──┤
                              py=4 top + py=4 bottom

Ancho mínimo sin icono:   8 + contenido_label + 8   = 16px + label
Ancho mínimo con icono:   8 + 16 + 8 + label + 8   = 40px + label
Ancho selected sin icono: 8 + 16(checkmark) + 8 + label + 8 = 40px + label
Ancho selected con icono: 8 + 16(✓) + 4 + 16(icon) + 8 + label + 8 = 60px + label


TAMAÑO MD  (h=40)
├── px=12 ──┤── [icon 16px] ──┤── gap=8 ──┤── [Label 14px/20lh] ──┤── px=12 ──┤
                               py=8 top + py=8 bottom

Ancho mínimo sin icono:   12 + label + 12            = 24px + label
Ancho mínimo con icono:   12 + 16 + 8 + label + 12  = 48px + label


TAMAÑO LG  (h=48)
├── px=16 ──┤── [icon 20px] ──┤── gap=8 ──┤── [Label 16px/24lh] ──┤── px=16 ──┤
                               py=12 top + py=12 bottom

Ancho mínimo sin icono:   16 + label + 16            = 32px + label
Ancho mínimo con icono:   16 + 20 + 8 + label + 16  = 60px + label


FOCUS RING
Width:        2px solid chp-border-focus
Offset:       2px (espacio entre borde del chip y inicio del ring)
Border-radius del ring: 9999 (sigue la forma de píldora del chip)
Color:        focus/ring  →  rgb(0.25, 0.39, 0.95)


LAYOUT CHECKMARK EN SELECTED (con icono líder)
├─ px ─┤─ checkmark(16/16/20) ─┤─ gap/2 ─┤─ icono(16/16/20) ─┤─ gap ─┤─ label ─┤─ px ─┤
  sm:8    16px                     4px        16px               8px              8px
  md:12   16px                     4px        16px               8px              12px
  lg:16   20px                     4px        20px               8px              16px
```
