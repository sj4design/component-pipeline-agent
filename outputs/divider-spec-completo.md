# Divider

## Overview

El Divider es el primitivo de separación visual del sistema. Traza una línea horizontal o vertical para delimitar secciones de contenido, separar acciones en toolbars, marcar transiciones cronológicas en feeds, o dividir zonas en formularios densos. Es el componente más simple del sistema de diseño — sin estados interactivos, sin jerarquía de sub-componentes — pero con decisiones arquitectónicas que determinan su accesibilidad y su rol semántico.

```
Horizontal, Thickness=sm, Style=solid, Emphasis=default:
──────────────────────────────────────────────────────

Horizontal con label (Has Label=on), orientación center:
──────────────────────────── O ────────────────────────────

Horizontal con label, orientación left:
──── Información de envío ─────────────────────────────────

Vertical (en toolbar de acciones):
Edit  │  Duplicar  │  Eliminar

Horizontal, Style=dashed (sección opcional):
- - - - - - - - - - - - - - - - - - - - - -

Horizontal, Thickness=lg (separación fuerte de sección):
══════════════════════════════════════════════════════════
```

**What the designer can configure:**

Variants (change appearance — generate Figma variants):

```
Divider
  Orientation: horizontal | vertical
  Thickness:   sm | md | lg
  Style:       solid | dashed
  Emphasis:    subtle | default
```

Toggles (show/hide parts — do NOT generate extra variants):

```
Divider
  👁 Has Label  → label (texto embebido en la línea)
```

### Figma properties panel

```
╔══════════════════════════════════════════╗
║  Divider                                 ║
╠══════════════════════════════════════════╣
║  Orientation  ▾  horizontal / vertical   ║
║  Thickness    ▾  sm / md / lg            ║
║  Style        ▾  solid / dashed          ║
║  Emphasis     ▾  subtle / default        ║
║  ─────────────────────────────────────── ║
║  👁 Has Label   [ off ●── ]              ║
║  ─────────────────────────────────────── ║
║  ✏️ Label   "Sección"                    ║
╚══════════════════════════════════════════╝
```

---

## When to use (and when not to)

```
¿Necesitas separar contenido visualmente?
                │
                ▼
¿Es solo un grupo de acciones inline?
  Sí → Orientation=vertical
  No
    │
    ▼
¿Hay una etiqueta de sección?
  Sí, exploratoria → Has Label=on  ("Or", "Hoy", "Información de envío")
  Sí, de navegación → <h2> o <h3> + Divider separados (no el label del Divider)
  No → Divider sin label

¿Ya tienes whitespace suficiente para comunicar la separación?
  Sí → No uses Divider (sigue el principio Carbon/GOV.UK)
  No → Usa Divider
```

**Usa Divider cuando:**
- Necesitas marcar un corte temático claro entre dos bloques de contenido del mismo nivel jerárquico (secciones de un formulario, grupos de opciones en un menú, áreas de un panel).
- Separas acciones inline en un toolbar o grupo de botones — `Orientation=vertical`.
- Marcas transiciones temporales en un feed o lista cronológica ("Hoy", "Ayer", "Hace 7 días") — `Has Label=on`.
- Implementas el patrón "Or" en pantallas de autenticación — `Has Label=on` centrado.
- La separación por whitespace solo no es suficiente debido a densidad de contenido o complejidad visual.

**Do NOT usa Divider cuando:**
- Ya tienes whitespace suficiente entre secciones — el Divider añadiría ruido visual innecesario (principio Carbon/GOV.UK).
- La etiqueta necesita ser un punto de navegación para lectores de pantalla → usa un elemento heading real (`<h2>`, `<h3>`) más el Divider como elemento decorativo separado.
- Quieres separar items en una lista con muchos elementos → el whitespace entre items es más limpio; los dividers entre cada item de lista crean sobrecarga visual.
- Intentas comunicar jerarquía semántica (título de sección con peso visual) → eso es responsabilidad de la tipografía, no del Divider.

---

## Visual variations

### Thickness

| Valor | Grosor | Uso típico |
|-------|--------|-----------|
| sm | 1px | Standard — la mayoría de separaciones de contenido |
| md | 2px | Separaciones de mayor jerarquía, Emphasis=default en layouts complejos |
| lg | 4px | Separaciones estructurales fuertes, equivalente a border de sección |

### Style

**Solid:** Línea continua. Uso por defecto. Marca separaciones definitivas y estructurales.

**Dashed:** Línea discontinua. Indica separaciones opcionales, colapsables o de menor permanencia. Útil para: secciones expandibles, contenido opcional en formularios, límites de "área experimental" en UIs de developer.

### Emphasis

| Valor | Color | Uso |
|-------|-------|-----|
| subtle | `border/default` (#D0D0D9, RGB 0.88/0.89/0.90) | Separaciones de bajo impacto, listas, áreas de contenido relacionado |
| default | `border/hover` (#A6A6B2, RGB 0.65/0.65/0.70) | Separaciones estructurales más visibles, secciones de formulario |

### Label embebido (Has Label=on)

Solo disponible en `Orientation=horizontal`. El texto se renderiza centrado en la línea (por defecto), dividiendo el trazo en dos segmentos iguales. El label usa:
- `fontSize: 13px`
- `fontWeight: 500` (medium)
- `lineHeight: 18px`
- `paddingX: 12px` (espacio entre el texto y los extremos de la línea)
- `bg: white` (el fondo del label cubre la línea debajo)
- `color: text/secondary` (#6B727E)

**Casos de uso del label:**
- "O" / "Or" — pantallas de autenticación (login con email vs. login con Google)
- "Hoy" / "Ayer" — separadores cronológicos en feeds de mensajes/actividad
- "Información de envío" / "Datos de pago" — headers de sección en formularios de checkout
- "Opciones avanzadas" — separación antes de contenido colapsable

### Exclusión: Orientation=vertical + Has Label

Los dividers verticales con texto embebido no están documentados por ninguno de los 16 sistemas con implementación dedicada. El texto embebido solo tiene sentido en horizontal donde la línea tiene espacio para flanquear el texto. Esta combinación está excluida del config.

---

## Design decisions

### 1. 4 properties: Orientation + Thickness + Style + Emphasis

**Por qué:** Los cinco sistemas de mayor referencia (Spectrum, Ant Design, Mantine, Fluent 2, Polaris) convergen en estas cuatro dimensiones cuando se unifican. Spectrum provee 3 tamaños de thickness (S/M/L = 1/2/4px); Ant Design provee dashed + orientation; Mantine agrega emphasis via `variant`; M3 provee la escala full-width/inset. Las 4 properties × sus valores = 36 frames netos, cubriendo todos los casos enterprise + minimal.

**Tradeoff:** No incluimos dotted (solo Mantine lo tiene) ni colores semánticos variables (Polaris tiene `border-critical`). Para el scope de este componente, solid + dashed cubre el 99% de los casos; dotted es una adición de muy bajo valor.

### 2. Label embebido solo en horizontal (patrón Ant Design, único en T1)

**Por qué:** Ant Design es el único sistema T1 con texto dentro del divider. El patrón es genuinamente útil para formularios densos de enterprise donde los "section headers" son labels de bajo impacto (no navegables por heading) que simplemente agrupan visualmente. Fluent 2 y Mantine también lo implementan en T3. La exclusión de vertical+label está basada en la ausencia de este caso en todos los sistemas revisados.

**Tradeoff:** El label del Divider no es un landmark de navegación para lectores de pantalla — lo que limita su uso a separaciones puramente visuales. La documentación debe ser explícita: para secciones que los usuarios de SR necesitan navegar por headings, usar `<h2>/<h3>` reales.

### 3. Emphasis subtle/default en vez de colores semánticos múltiples

**Por qué:** Atlassian usa un único token `color.border` sin configuración. Polaris permite tokens semánticos (`border-critical`) pero es un edge case (un divider de error es un anti-pattern — usa Banner o Alert). Dos valores de Emphasis simplifican el API vs. exponer colores arbitrarios, manteniendo coherencia con el resto del sistema.

**Tradeoff:** No se puede hacer un "divider de warning" o "divider de success". Esto es intencional — el Divider no comunica estado semántico de error/success; eso pertenece a los componentes de feedback (Alert, Banner, InlineAlert).

### Combinaciones excluidas

```
Orientation=vertical + Has Label=on
  → El texto embebido solo funciona en horizontal (línea con espacio
    para flanquear texto a ambos lados). Ningún sistema implementa
    divider vertical con texto embebido.
```

---

## Behavior

### Essential for design

El Divider es un componente estático sin estados interactivos. Los únicos "comportamientos" relevantes para el diseñador son:

**Semántico vs. decorativo:** Esta es la distinción más importante del Divider. Un Divider semántico (`role="separator"`) marca un corte temático real — los lectores de pantalla lo anuncian. Un Divider decorativo (`aria-hidden="true"`) es solo visual — los lectores de pantalla lo ignoran. La implementación del developer determina esto; el diseñador debe comunicar la intención en las anotaciones del frame.

**Divider vertical necesita altura explícita:** En layouts flex o grid, un `<hr>` vertical tiene altura cero por defecto. El developer debe agregar `align-self: stretch` o una altura explícita. El diseñador debe asegurarse de que el frame de Figma refleje la altura real del contenedor padre.

**Whitespace antes y después del label:** El label del Divider tiene `paddingX: 12px` entre el texto y los extremos de la línea. El componente siempre centra el label (o lo alinea según la lógica de diseño). El fondo blanco del label cubre la línea debajo para crear el efecto de "texto cortando la línea".

### Accessibility (ARIA)

| Part | Role | Attributes | Why it matters |
|------|------|------------|----------------|
| Divider semántico | `<hr>` (implicit `role="separator"`) | `aria-orientation="vertical"` si vertical | Anuncia corte temático al SR |
| Divider decorativo | `<hr>` o `<div>` | `aria-hidden="true"` | Sin contaminación del SR para separaciones puramente visuales |
| Divider vertical | `<hr>` o `<span>` | `aria-orientation="vertical"` | `<hr>` por defecto es horizontal; necesita override |
| Label embebido | texto plano en `<hr>` o separator | — | SR lee el label como parte del separator; no es `role="heading"` |

**Nota crítica:** El label del Divider NO sirve como heading de navegación. Los lectores de pantalla que navegan por headings (H) no aterrizarán en el label de un Divider. Para secciones que el usuario de SR necesita navegar, usar `<h2>/<h3>` reales con el Divider como elemento adicional puramente visual.

### Keyboard navigation

Primary interactions (affect design):

```
No focusable — el Divider no tiene interacción de teclado.
```

Secondary interactions (dev reference):

```
N/A — sin interacción de teclado en ningún escenario.
Cualquier elemento enfocable dentro del label (hipotético) seguiría
el flujo de Tab natural; el Divider no intercepta el foco.
```

**Focus management:** Ninguno. El Divider es transparente al foco de teclado.

---

## Content guide

### slot: label (opcional, solo Orientation=horizontal)

El texto embebido en la línea. Mantenerlo extremadamente corto — máximo 3–4 palabras. Es texto de apoyo visual, no un título formal. El color `text/secondary` y `fontWeight: 500` lo distinguen del contenido adyacente sin dominarlo.

**Buenas prácticas para el label:**
- "O" / "Or" — simple, en una letra/palabra para autenticación
- "Hoy", "Ayer", "Esta semana" — temporal, en feeds/actividad
- "Opciones avanzadas" — para secciones colapsables en formularios
- "Información de facturación" — separación de zonas en checkout (máximo 3 palabras)

**No usar el label para:**
- Títulos largos de sección (más de 4 palabras → usa `<h3>`)
- Instrucciones o descripciones
- Mensajes de estado o feedback

---

## Pre-build checklist

```
[ ] Divider: 36 frames netos (48 gross - 12 exclusiones vertical+label)
      - Orientation(2) × Thickness(3) × Style(2) × Emphasis(2) = 48
      - Exclusión: Orientation=vertical + Has Label=on = 12 frames eliminados
[ ] Tokens aplicados:
      - subtle color → div/subtle/color (border/default) #D0D0D9
      - default color → div/default/color (border/hover) #A6A6B2
      - label bg → div/label/bg (surface/default) white
      - label fg → div/label/fg (text/secondary) #6B727E
      - label fontSize → div/label/fontSize (type/sm) 13px
      - label paddingX → div/label/paddingX (spacing/3) 12px
[ ] Thickness sm=1px, md=2px, lg=4px correctamente aplicados
[ ] Style=dashed: stroke pattern visible en Figma (stroke dash 4px gap 4px)
[ ] Has Label=on: texto centrado, bg blanco cubriendo la línea
[ ] Has Label=off: línea sin interrupción
[ ] Orientation=vertical + Has Label: combinación NO existe (excluida)
[ ] Orientation=vertical: altura predeterminada de 24px en el componente Figma
    (con nota: el developer debe aplicar align-self:stretch o altura explícita)
[ ] Nota de accesibilidad: semántico vs. decorativo documentado
[ ] Nota: label NO es heading de navegación — SR no lo anuncia como <h2>/<h3>
[ ] Auto-layout: horizontal usa fill-container en ancho; vertical usa fixed width 1/2/4px + fill en alto
```

---

## Related components

```
Heading / Typography   → para secciones con heading de navegación real (<h2>, <h3>)
Stack                  → contenedor con gap; whitespace como alternativa al Divider
Menu                   → tiene Divider interno entre grupos de opciones
List                   → tiene Divider opcional entre items de lista
Alert / Banner         → para comunicar estados semánticos (no usar Divider con color)
Sidebar / Panel        → contextos frecuentes de Divider vertical
```

---

## Reference: how other systems do it

### Ant Design Divider — el más rico en T1 con labels embebidos

Ant Design es el único Tier 1 con texto dentro del divider. El prop `children` embebe texto en la regla, dividiendo la línea a ambos lados. `orientation` posiciona el texto en left/center/right dentro de la regla. `orientationMargin` establece distancia en píxeles/porcentaje desde el borde del contenedor. `type="vertical"` renderiza un separador inline para grupos de acciones ("Editar | Eliminar | Ver"). `dashed` crea línea discontinua para secciones opcionales/expandibles.

El labeled divider llena una necesidad real de producto: formularios enterprise densos necesitan separadores visuales que también etiquetan el contenido debajo. En vez de un elemento heading + un Divider independiente, el labeled divider combina ambos. El prop `plain` controla si el label tiene peso de heading (`font-weight: semibold`) o peso normal. La accesibilidad tiene una brecha: renderiza `<div role="separator">` (no `<hr>`), y el label NO lleva `role="heading"` — los usuarios de SR que navegan por headings no encontrarán las etiquetas de sección del Divider.

### Fluent 2 Divider — label-in-line con high-contrast mode

Fluent 2 es el standout de T3 para label-in-line. El prop `alignContent` posiciona el label (left/center/right/start/end). Los `appearance` variants (subtle/strong/brand) controlan el peso visual. El soporte de high-contrast token garantiza que el Divider cumple los requisitos de accesibilidad de Windows. Como Ant Design, Fluent 2 reconoce que los separadores "Or" en autenticación y los "Today" en historial de chat son necesidades de producto de primera clase — y los implementa con tokens de contraste alto que Ant Design no tiene.

### Mantine Divider — la implementación más completa en T3

Mantine combina soporte de label (`labelPosition: left/center/right`), ambas orientaciones, tres variantes de estilo (solid/dashed/dotted), control de thickness via `size`, e integración de color tokens. Es la implementación más completa en T3. La variante dotted es única — ningún otro sistema la tiene. Los dividers verticales en Mantine necesitan altura explícita en flex/grid layouts, y Mantine documenta que los dividers verticales de toolbar pueden ameritar `role="none"` para evitar anuncios superfluos del SR.

### Spectrum Divider — escala de tres tamaños con vertical de primera clase

Spectrum provee una escala de tamaños (S=1px, M=2px, L=4px) para variación de thickness y soporte explícito de `orientation`. Los dividers verticales son de primera clase — importantes para los separadores de grupos de botones en toolbars de Adobe. El `aria-orientation="vertical"` se setea automáticamente para coincidir con el prop `orientation`. Deliberadamente omite soporte de texto label (los labels son elementos Heading, no contenido de divider — frontera de responsabilidad clara).

### Material Design 3 — variante inset para alineación con listas

M3 tiene tres variantes geométricas (full-width, inset, middle-inset) que resuelven el problema específico de dividers en listas: el inset alinea el divider con el texto del item de lista, preservando la jerarquía visual de la columna de ícono/avatar. El token `outline-variant` se adapta automáticamente a light/dark mode. Los dividers de lista se controlan via el toggle `divider` del componente List — no se colocan manualmente Dividers entre items.

### Polaris Divider — `<hr>` semántico con colores token-constrained

Polaris renderiza `<hr>` con `borderColor` aceptando tokens de border de Polaris (incluyendo `border-critical` para dividers de sección de error). Esta es la semántica HTML correcta con color contextual significativo — un divider crítico señala un significado diferente que uno estándar, y el vocabulario de tokens lo hace explícito. Los colores constrained por tokens previenen colores de divider arbitrarios mientras habilitan elecciones semánticas con significado.

### Atlassian Divider — cero configuración para consistencia absoluta

El Divider de Atlassian no tiene props de configuración más allá de `testId`. Un único tratamiento visual usando el token `color.border`, horizontal only, elemento `<hr>`. Cada producto Atlassian (Jira, Confluence, Bitbucket) usa exactamente el mismo divider. La gobernanza de diseño se impone eliminando las opciones. El tradeoff: no es posible ninguna separación jerárquica (sección mayor vs. separador menor de item).

### GOV.UK y Carbon — el argumento para no tener un Divider component

GOV.UK y Carbon/Evergreen comparten una filosofía: líneas de divider explícitas son frecuentemente innecesarias cuando el whitespace y la estructura HTML semántica comunican el agrupamiento claramente. GOV.UK usa `govuk-section-break` como una clase utilitaria, no un componente. Carbon documenta que necesitar un divider indica whitespace insuficiente, no una decisión de diseño. Este es el argumento más sólido para design systems que quieren minimizar ornamentación decorativa: el Divider debe ser la última herramienta de separación, no la primera.

### Radix UI Separator — `decorative` prop como patrón de a11y más limpio

El prop `decorative` de Radix es el patrón de accesibilidad más limpio entre todos los sistemas. `decorative={true}` aplica `role="none"` al separator — es puramente visual. `decorative={false}` (default) aplica `role="separator"` — marca un límite semántico de contenido. Esta elección binaria explícita elimina la ambigüedad del `aria-hidden` opcional que los developers podrían olvidar configurar. shadcn/ui's Separator está construido sobre este primitivo, convirtiéndolo en la referencia de T2 para este patrón.

---

## Tokens

**8 tokens** · prefix `div-` · 3 layers (primitive → semantic → component)

| Token | Figma Variable | Usage |
|-------|---------------|-------|
| div/sm/thickness | border/1 | Grosor Thickness=sm (1px) |
| div/md/thickness | border/2 | Grosor Thickness=md (2px) |
| div/lg/thickness | border/4 | Grosor Thickness=lg (4px) |
| div/subtle/color | border/default | Color Emphasis=subtle (#D0D0D9) |
| div/default/color | border/hover | Color Emphasis=default (#A6A6B2) |
| div/label/bg | surface/default | Fondo del label (white, cubre la línea) |
| div/label/fg | text/secondary | Color del texto del label |
| div/label/fontSize | type/sm | Font size del label (13px) |
| div/label/paddingX | spacing/3 | Padding horizontal del label (12px) |

### Spacing specs

```
Thickness sm:  1px  (border-bottom/right: 1px solid)
Thickness md:  2px  (border-bottom/right: 2px solid)
Thickness lg:  4px  (border-bottom/right: 4px solid)

Label:
  fontSize=13px  fontWeight=500  lineHeight=18px
  paddingX=12px  bg=surface/default  color=text/secondary
  (fondo cubre la línea, crea efecto "texto cortando la regla")

Horizontal:  width=100% (fill container)  height=thickness
Vertical:    width=thickness  height=auto (align-self:stretch en flex)
             → en Figma: componente con height=24px de default + nota de implementación

Style=dashed:  stroke-dasharray: 4px  stroke-dashgap: 4px
               (en Figma: stroke tipo "dashed" con gap 4px)

Separación recomendada antes y después del Divider:
  spacing/4 (16px) para separaciones de sección
  spacing/3 (12px) para separaciones de menor jerarquía
  spacing/2 (8px) para separaciones de items de lista
```
