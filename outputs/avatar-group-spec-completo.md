# AvatarGroup

## Descripción general

AvatarGroup es el primitivo de representación de colecciones de usuarios del sistema de diseño: agrupa múltiples instancias de Avatar en una disposición de overlap horizontal (stack) o grid, con un badge de overflow "+N" cuando el conteo supera el máximo visible. Comunica de un vistazo "estas son las personas involucradas en X" — participantes de una reunión, colaboradores de un documento, miembros de un equipo. A diferencia de Avatar individual, AvatarGroup gestiona la consistencia de tamaño entre todos sus elementos, el control de cuántos mostrar, y la presencia de un anillo de separación visual (BorderRing) entre avatares superpuestos.

```
Appearance=stack (horizontal overlap, Size=md):
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  [PQ] [AM] [JR] [KL] +3                                     │  avatars: 40px
│  ↑ 2px ring blanco   ↑ overflow badge                       │  overlap: -10px
│  entre avatares                                             │  borderRing: white
│                                                              │
└──────────────────────────────────────────────────────────────┘

Sizes (4):
┌──────────────────────────────────────────────────────────────┐
│  xs: [P][A][J] +2    24px ov:-6px  (mobile compact)         │
│  sm: [PQ][AM][JR]+2  32px ov:-8px  (listas, cards)          │
│  md: [PQ][AM][JR]+3  40px ov:-10px (default)                │
│  lg: [PQ][AM][JR]+3  48px ov:-12px (perfiles, equipos)      │
└──────────────────────────────────────────────────────────────┘

Appearance=grid (sin overlap):
┌──────────────────────────────────────────────────────────────┐
│  [PQ] [AM] [JR] [KL]                                        │
│  [ML] [RG] [+3 ]                                            │  gap: 4px
└──────────────────────────────────────────────────────────────┘

BorderRing=white / BorderRing=none:
│  Con ring: [PQ]──[AM] (2px blanco separa)                   │
│  Sin ring: [PQ][AM] (se funden en overlap)                  │
```

**Lo que el diseñador puede configurar:**

Variantes (cambian apariencia — generan variantes Figma):

```
Size       → xs | sm | md | lg
MaxVisible → 3 | 4 | 5 | 6
Appearance → stack | grid
BorderRing → none | white
```

Toggles:

```
👁 Show Overflow → muestra/oculta el badge "+N"
```

Texto editable:

```
✏️ Overflow Count → "+3"
```

### Panel de propiedades en Figma

```
┌────────────────────────────────────────────┐
│  AvatarGroup                               │
│  ────────────────────────────────────────  │
│  Size        [ md         ▼ ]              │
│  MaxVisible  [ 4          ▼ ]              │
│  Appearance  [ stack      ▼ ]              │
│  BorderRing  [ white      ▼ ]              │
│  ────────────────────────────────────────  │
│  👁 Show Overflow  [ on ]                  │
│  ✏️ Overflow Count  [ +3              ]    │
└────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿Necesito mostrar un grupo de personas asociadas a algo?
                    │
                    ▼
       ¿Cuántas personas hay en total?
       ├── 1-2 personas → Avatar(es) individuales (sin grupo)
       ├── 3-6 → AvatarGroup con MaxVisible=total o MaxVisible<total + overflow
       └── 7+ → AvatarGroup con MaxVisible=3-6 + overflow badge
                    │
                    ▼
       ¿Cuánto espacio hay disponible?
       ├── Espacio compacto (card, inline) → Size=xs o sm
       ├── Espacio estándar               → Size=md
       └── Panel grande, perfil de equipo → Size=lg
                    │
                    ▼
       ¿Hay más de 8 personas y necesito mostrarlas todas?
       ├── Sí → Appearance=grid (sin overflow)
       └── No → Appearance=stack + overflow badge
```

**Usar AvatarGroup cuando:**
- Participantes de una reunión en un card de evento del calendario
- Colaboradores de un documento en la barra de herramientas
- Miembros de un equipo o workspace en una página de settings
- Asignados a una tarea o ticket (máximo visible 3-4)
- Lista de "quién vio esto" en un feed de actividad

**NO usar AvatarGroup cuando:**
- Solo hay 1-2 personas → usar Avatar individual(es) directamente
- Se necesita lista completa de usuarios → usar una List o DataGrid de personas
- Se necesitan acciones por usuario → usar una lista de Avatar + nombre + acciones
- La cantidad de personas supera el propósito visual → usar un contador simple ("12 miembros")

---

## Variaciones visuales

### Size

| Size | AvatarSize | Overlap | OverflowFontSize | BorderWidth | Uso |
|------|-----------|---------|-----------------|------------|-----|
| xs   | 24px      | -6px    | 10px            | 1px        | Mobile, listas muy compactas |
| sm   | 32px      | -8px    | 11px            | 2px        | Cards, tablas, inline |
| md   | 40px      | -10px   | 12px            | 2px        | Default — la mayoría de casos |
| lg   | 48px      | -12px   | 14px            | 2px        | Páginas de perfil, panels de equipo |

### MaxVisible

| MaxVisible | Valor | Cuándo usar |
|-----------|-------|------------|
| 3 | 3 avatares | Mobile, espacios muy compactos |
| 4 | 4 avatares | Estándar para cards y toolbars |
| 5 | 5 avatares | Panels medianos, dashboards |
| 6 | 6 avatares | Desktop con espacio disponible |

*MaxVisible es discreta en Figma porque el render dinámico no es posible. El developer calcula el overflow a partir del conteo real.*

### Appearance

| Appearance | Dirección | Overlap | Cuándo usar |
|-----------|----------|---------|------------|
| stack | Horizontal | Sí (negative margin) | Default — compact, toolbar, card |
| grid | Grid (wrap) | No (gap: 4px) | >8 personas que necesitan ser mostradas individualmente |

### BorderRing

| BorderRing | Color | Cuándo usar |
|-----------|-------|------------|
| none | transparente | Fondos que no sean blancos/claros; sin overlap visual |
| white | #FFFFFF (2px) | Fondos blancos o claros — separa visualmente los avatares superpuestos |

---

## Decisiones de diseño

**1. MaxVisible como property discreta (3/4/5/6)** — Figma no puede renderizar conteos dinámicos. Los 4 valores cubren los casos típicos: 3 para mobile/compacto, 6 para desktop con espacio. El overflow badge muestra el conteo calculado en runtime. Atlassian usa exactamente este patrón con su prop `maxCount`.

**2. BorderRing=white como property explícita** — El anillo blanco de 2px (Atlassian pattern) previene que los avatares se fundan en overlap. Sin él, los bordes de los avatares se mezclan creando confusión visual. La decisión de hacerlo propiedad explícita (en lugar de siempre activado) es para fondos no blancos donde el anillo blanco se vería incorrecto. `BorderRing=none` para fondos de color, oscuros, o imágenes de fondo.

**3. Appearance=stack|grid** — Stack (horizontal overlap) es el patrón universal para hasta 6 avatares. Grid es para escenarios donde hay más personas y se quiere mostrar todas sin truncar — panels de equipo extensos, listas de colaboradores en Confluence. Atlassian `appearance="grid"` inspiró esta distinción.

**4. Size enforcement (todos los avatares del mismo tamaño)** — AvatarGroup establece el Size y todos los Avatar hijos lo heredan. Mezclar tamaños en un grupo crea caos visual. Spectrum, Ant Design, y Atlassian enforcan esta regla en su implementación.

**5. Overflow badge es slot con popover opcional** — El badge "+3" en Figma es un slot de texto editable. En implementación, puede activar un popover con la lista completa de avatares al hacer hover/click. Modelado como slot permite implementaciones custom del trigger; el contenido del popover es runtime behavior.

### Combinaciones excluidas

```
(ninguna — todas las combinaciones de Size × MaxVisible × Appearance × BorderRing son válidas)
```

---

## Comportamiento

### Esencial para diseño

- **Overlap direction: el último avatar (RTL) aparece encima** — en Appearance=stack, el avatar más a la derecha del stack tiene mayor z-index (aparece "encima" de los otros). Esto sigue el patrón de Atlassian donde los avatares más recientes/relevantes son los que se ven completos.
- **BorderRing en fondos no blancos** — usar BorderRing=none o cambiar el color del ring vía tokens cuando el fondo del contenedor no es blanco. El ring blanco sobre fondo azul o negro genera contraste correcto, pero puede verse extraño en fondos de color medio.
- **Overflow badge clickeable (implementación)** — el developer implementa un popover/tooltip al hacer click en "+N" que lista todos los usuarios no visibles. En Figma, Show Overflow=on muestra el badge como elemento estático.
- **Tooltip por avatar** — en implementación, cada avatar individual tiene un tooltip con el nombre completo del usuario al hacer hover. Fundamental para accesibilidad en grupos donde los avatares se ven parcialmente.
- **Consistencia visual** — todos los Avatar en el grupo deben tener el mismo estado y la misma presencia (con/sin imagen, mismo size). El developer puede variar los sources (fotos vs. iniciales) pero los tamaños son uniformes.

### Accesibilidad (ARIA)

| Parte | Implementación | Por qué importa |
|-------|---------------|----------------|
| Container | `role="group"` + `aria-label="[propósito]"` | SR anuncia el grupo: "Miembros del equipo, grupo de 7 personas" |
| Avatar individual | `aria-label="[nombre]"` | SR anuncia cada avatar por nombre al navegar |
| Overflow badge | `aria-label="[N] más"` + popover opcional | SR anuncia cuántos no son visibles |
| Tooltip hover | Tooltip con nombre completo | Users con low vision o que no reconocen la foto |
| Overflow popover | Lista accesible de todos los usuarios | SR puede navegar la lista completa vía teclado |
| Navigable avatar | `tabindex="0"` (si es interactivo) | Avatares clickeables deben ser navegables |

### Navegación por teclado

```
Tab         → navega hacia el AvatarGroup y entre avatares (si son interactivos)
Tab         → desde el último avatar, llega al overflow badge
Enter/Space → en overflow badge: abre popover con lista completa
Escape      → cierra el popover de overflow

Avatares NO interactivos: el grupo tiene tabindex="0" como unidad.
Avatares interactivos (con perfil link): cada uno tiene tabindex.
```

---

## Guía de contenido

**aria-label del container:**
- Contexto + tipo: "Participantes de la reunión", "Miembros del equipo de diseño", "Colaboradores del documento"
- No usar "Grupo de avatares" — describe el propósito, no el componente

**Overflow badge:**
- El texto "+N" debe corresponder al número real de usuarios no visibles
- aria-label: "[N] personas más" o "[N] participantes más" — siempre con "personas/miembros/participantes"
- El developer calcula N = totalUsers - MaxVisible

**Tooltip por avatar:**
- Nombre completo: "Pedro Quinones" no "PQ"
- Si el contexto lo requiere: nombre + rol: "Pedro Quinones — Product Designer"

**MaxVisible según contexto:**
- `3` para cards compactos con poco espacio (inline en tabla, evento en calendario)
- `4` para cards estándar (card de proyecto, card de tarea)
- `5-6` para panels dedicados (página de equipo, configuración de workspace)

---

## Pre-build checklist

```
□ ¿Container tiene role="group" + aria-label descriptivo?
□ ¿Cada avatar tiene aria-label con el nombre del usuario?
□ ¿Overflow badge tiene aria-label "[N] personas más"?
□ ¿Tooltips de hover implementados por avatar?
□ ¿Todos los avatares del grupo tienen el mismo Size?
□ ¿BorderRing=white solo en fondos blancos/claros?
□ ¿Overflow badge abre popover con lista completa al activarse?
□ ¿El popover de overflow es navegable por teclado?
□ ¿MaxVisible apropiado para el espacio disponible?
□ ¿Appearance=grid solo cuando se quiere mostrar >6 sin overflow?
```

---

## Componentes relacionados

```
Avatar       → componente individual que AvatarGroup compone; hereda Size del grupo
Badge        → overflow badge ("+3") usa el mismo design que Badge/count/neutral
Tooltip      → tooltip de hover por avatar individual
Popover      → contenedor del listado completo al hacer click en overflow
Card         → usa AvatarGroup para participantes o colaboradores
Table        → columna de "Asignados" puede usar AvatarGroup/xs o sm
Navbar       → puede mostrar AvatarGroup de usuarios activos en una sesión
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | Sizes | MaxVisible | Appearance | BorderRing | Overflow | Diferenciador |
|---------|-------|-------|-----------|-----------|-----------|---------|--------------|
| **Material Design 3** | Sin componente | — | — | — | — | — | Patrón manual con CircleAvatars + CSS |
| **Spectrum (Adobe)** | AvatarGroup | S/M/L | maxAvatars | stack only | No prop (CSS) | +N | avatarMaxCount; size enforcement |
| **Carbon (IBM)** | Sin componente | — | — | — | — | — | OverflowMenu para grupos de avatares |
| **Polaris (Shopify)** | AvatarGroup | sm/md | Sin prop | stack only | No | +N | No maxCount prop — limita automáticamente |
| **Atlassian** | AvatarGroup | xs/sm/md/lg/xl | maxCount | stack + grid | borderColor prop | +N (tooltip list) | appearance prop; onAvatarClick; tooltip built-in |
| **Ant Design** | Avatar.Group | sm/default/lg | maxCount | stack only | No | +N popover | maxPopoverTrigger; maxStyle (custom overflow style) |
| **Twilio Paste** | AvatarGroup | No size | No | stack only | No | — | Minimal; sin overflow; composición pura |
| **Lightning** | Avatar stacking | — | — | stack | Yes (outline) | — | Manual CSS overlap; sin componente |
| **Primer (GitHub)** | AvatarStack | xs/sm/md/lg | — | stack only | No | count | disableExpand; small=3 avatars max |
| **shadcn/ui** | Sin componente | — | — | — | — | — | Composición manual con Avatar |
| **Chakra UI** | AvatarGroup | — | max | stack only | borderColor | +N | max prop; spacing prop para overlap |
| **Fluent 2** | AvatarGroup | tiny-huge | maxAvatarsDisplayed | stack only | No | +N | layout prop (spread/stack); size enforcement |
| **Gestalt (Pinterest)** | AvatarGroup | — | — | stack only | No | — | Minimal; sin overflow prop |
| **Mantine** | AvatarGroup | — | No (manual) | stack only | No | manual | Spacing prop; sin overflow built-in |
| **Orbit (Kiwi)** | Sin componente | — | — | — | — | — | Domain-specific; no AvatarGroup |
| **Evergreen** | Sin componente | — | — | — | — | — | Composición manual |
| **Nord** | Sin componente | — | — | — | — | — | Healthcare; Avatar individual solo |

**Patrones clave de la industria:**
1. **Atlassian como referencia T1 más completa** — Atlassian es el único T1 con `appearance`, `maxCount`, `onAvatarClick`, `borderColor`, y tooltip built-in. Para Zoom con contextos colaborativos intensivos, Atlassian es el modelo más relevante.
2. **BorderRing como prop explícita** — Solo Chakra UI y Atlassian lo exponen como prop (borderColor). El resto lo hardcodea o deja a CSS. La decisión de hacerlo propiedad discreta (none/white) cubre el 95% de casos sin sobrecomplicar.
3. **Grid appearance** — Solo Atlassian tiene `appearance="grid"`. Para panels de equipo con >8 personas, la alternativa al overflow es mostrar todas en grid. Valiosa para Zoom workspaces con equipos grandes.
4. **Overflow con popover** — Atlassian y Ant Design tienen popover built-in al hacer click en "+N". Polaris y Primer son más simples (solo el badge). El popover es la best practice de accesibilidad — permite al SR acceder a la lista completa.

---

## Tokens

**10 tokens** · prefijo `avg-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `avg-xs-avatar` | `sizing/24` | Tamaño avatar Size=xs — 24px |
| `avg-sm-avatar` | `sizing/32` | Tamaño avatar Size=sm — 32px |
| `avg-md-avatar` | `sizing/40` | Tamaño avatar Size=md — 40px |
| `avg-lg-avatar` | `sizing/48` | Tamaño avatar Size=lg — 48px |
| `avg-border-white` | `surface/default` | Color del BorderRing=white — #FFFFFF |
| `avg-overflow-bg` | `surface/pressed` | Background del badge "+N" |
| `avg-overflow-fg` | `text/primary` | Foreground del badge "+N" |
| `avg-overflow-fontWeight` | `type/weight-semibold` | Font weight del "+N" — 600 |
| `avg-grid-gap` | `spacing/1` | Gap entre avatares en Appearance=grid — 4px |
| `avg-overlap-scale` | `sizing/negativeQuarter` | Base del negative margin de overlap |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  Overlap (negative margin) por Size:                     │
│  xs: -6px · sm: -8px · md: -10px · lg: -12px           │
│                                                          │
│  BorderRing width por Size:                              │
│  xs: 1px · sm: 2px · md: 2px · lg: 2px                 │
│                                                          │
│  Overflow badge:                                         │
│  bg: surface/pressed · fg: text/primary · weight: 600   │
│  Mismo size que los avatares del grupo                   │
│                                                          │
│  Grid gap: 4px entre avatares                           │
│                                                          │
│  Frames totales:                                         │
│  Size(4) × MaxVisible(4) × Appearance(2) × BorderRing(2)│
│  = 64 frames                                            │
└──────────────────────────────────────────────────────────┘
```
