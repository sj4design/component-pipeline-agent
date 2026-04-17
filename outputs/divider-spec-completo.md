# Divider

## Descripción general

Divider es el primitivo de separación visual del sistema de diseño: una línea horizontal o vertical que marca una frontera entre secciones o grupos de contenido. Puede ser estructural (comunica una separación semántica — `role="separator"`) o decorativa (`aria-hidden="true"`). Opcionalmente puede contener un label de texto embebido en la línea (horizontal only) para encabezados de sección en formularios densos, siguiendo el patrón Ant Design. No tiene interacción propia — es siempre un elemento pasivo de layout.

```
Horizontal (default):
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  ──────────────────────────────────────────────────────   │  Thickness=sm (1px)
│                                                            │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │  Style=dashed
│                                                            │
│  ──────────── Sección ─────────────────────────────────   │  Con label
│                                                            │
└────────────────────────────────────────────────────────────┘

Vertical:
┌─────────────────────────────────────┐
│  Acción A  │  Acción B  │  Acción C  │
│            ↑            ↑            │
│          1px           1px           │
└─────────────────────────────────────┘
```

**Lo que el diseñador puede configurar:**

Variantes (cambian apariencia — generan variantes Figma):

```
Orientation → horizontal | vertical
Thickness   → sm (1px) | md (2px) | lg (4px)
Style       → solid | dashed
Emphasis    → subtle | default
```

Toggles (muestran/ocultan partes — NO generan variantes extra):

```
👁 Has Label → muestra/oculta el label embebido (solo horizontal)
```

### Panel de propiedades en Figma

```
┌───────────────────────────────────────────┐
│  Divider                                  │
│  ─────────────────────────────────────    │
│  Orientation  [ horizontal       ▼ ]      │
│  Thickness    [ sm (1px)         ▼ ]      │
│  Style        [ solid            ▼ ]      │
│  Emphasis     [ subtle           ▼ ]      │
│  ─────────────────────────────────────    │
│  👁 Has Label  [ off ]                    │
│  ✏️ Label      [ Sección              ]   │
└───────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿Necesito separar visualmente secciones o grupos?
                    │
                    ▼
       ¿El espacio entre elementos no es suficiente?
       ├── Sí → Divider (separación semántica o visual)
       └── No → Solo spacing (Gap en Stack) — sin Divider
                    │
                    ▼
       ¿Necesito indicar el nombre de la sección?
       ├── Sí → Divider + Has Label (horizontal, Ant pattern)
       └── No → Divider sin label
                    │
                    ▼
       ¿Los ítems son inline horizontales?
       ├── Sí → Orientation=vertical (toolbar, nav pills)
       └── No → Orientation=horizontal (default)
```

**Usar Divider cuando:**
- Separar grupos lógicos en un menú dropdown (acciones principales / acciones destructivas)
- Separar secciones en un formulario largo con denominación (Has Label)
- Separar grupos de botones en una toolbar (Orientation=vertical)
- Marcar el final de una sección de card y el inicio de otra
- Separar items de navegación en sidebar

**NO usar Divider cuando:**
- El spacing entre elementos ya comunica la separación — agregar línea duplica la señal
- Se quiere un heading de sección semántico → usar `<h2>` + Typography (Divider con label NO es heading)
- Se necesita separación con color semántico (error/warning) → usar Banner o Alert
- Se está en un contexto de lectura pura (artículo) → whitespace es mejor que líneas

---

## Variaciones visuales

### Orientation

| Orientation | Uso típico | Notas |
|------------|-----------|-------|
| horizontal | Default — secciones en formulario, grupos en menú, secciones de card | Puede tener label embebido |
| vertical   | Separadores en toolbars, nav pills, breadcrumbs, inline action groups | Sin label |

### Thickness

| Thickness | Grosor | Jerarquía visual |
|---------|--------|----------------|
| sm      | 1px    | Separadores sutiles de ítems — formularios, listas, menús |
| md      | 2px    | Separación de secciones medias — entre grupos de card |
| lg      | 4px    | Separación fuerte — entre secciones de página, divisores principales |

### Style

| Style  | Uso |
|-------|-----|
| solid | Default — separación definitiva y clara |
| dashed | Separación suave, temporal, o colapsable — secciones opcionales o expandibles |

### Emphasis

| Emphasis | Color resultante | Uso |
|---------|-----------------|-----|
| subtle  | border/default (#D1D1D8) | Dividers en contextos de bajo contraste, listas densas |
| default | border/hover (#A5A5B3)   | Dividers que deben tener presencia visual clara |

### Label (horizontal only)

- Font: 13px / medium (500) / secondary (#6B7280)
- Background: surface/default (white) — enmascara la línea detrás del texto
- Padding horizontal: 12px (spacing/3) a cada lado del texto
- El label siempre está centrado en la línea horizontal

---

## Decisiones de diseño

**1. 4 propiedades: Orientation + Thickness + Style + Emphasis** — Spectrum tiene 3 sizes (sin style/emphasis); Ant Design tiene text label + dashed; M3 tiene inset variants. Las 4 propiedades cubren los casos enterprise (1px sólido para listas) y los casos marketing (4px para separación de secciones), más el patrón dashed de Ant para secciones opcionales.

**2. Label embebido solo en horizontal (patrón Ant Design)** — Ant es el único T1 con texto label dentro del divider. Es útil para headers de sección en formularios densos (patterns chinos de enterprise, pero también en modals complejos). Vertical con label es un edge case casi inexistente — la exclusión es limpia.

**3. Emphasis subtle/default en vez de colores semánticos** — Atlassian usa un solo token de color (`color.border`) sin configuración. Polaris tiene `borderColor` semántico (critical, etc.) pero un "divider crítico" es un anti-patrón — para errores se usa Banner/Alert. Dos niveles de emphasis cubren "de fondo" vs. "visible" sin abrir la puerta a colores semánticos inapropiados.

**4. NOT a building block** — A diferencia de Icon, Typography o Link, Divider NO es un building block (isBuildingBlock=false). Se usa directamente en layouts, no como sub-componente de otro componente.

### Combinaciones excluidas

```
Orientation=vertical + Has Label=yes → ✗ texto embebido no aplica en separadores verticales
```

---

## Comportamiento

### Esencial para diseño

- **Spacing externo es responsabilidad del parent** — Divider no tiene margin propio. El Stack o layout que lo contiene aplica el gap antes y después. Esto previene doble-spacing.
- **Label en divider NO es heading semántico** — el texto en el label es anunciado por SR como parte del separator, NO como `<h2>`. Para headers de sección navegables, usar Typography + `<h2>`, y agregar un Divider separado si se quiere la línea visual.
- **Vertical requiere altura explícita** — en layouts flexbox, un Divider vertical sin height explícita colapsa a 0. El container parent (Stack horizontal o toolbar) debe darle altura vía `align-items: stretch` o height fijo.
- **Decorativo vs. estructural** — si el Divider está en un menú entre grupos de acciones, es estructural (`role="separator"`). Si es solo visual entre secciones con spacing suficiente, es decorativo (`aria-hidden="true"`). El developer decide en implementación.

### Accesibilidad (ARIA)

| Caso | Role | Atributos | Por qué importa |
|------|------|-----------|----------------|
| Separador estructural (entre grupos semánticos) | `separator` | `role="separator"` + `aria-orientation="horizontal|vertical"` | SR anuncia una separación entre grupos — ayuda a navegar menús y listas |
| Separador decorativo (solo visual) | ninguno | `aria-hidden="true"` | Sin información semántica — SR no anuncia nada; reduce ruido |
| Divider con label | `separator` | `role="separator"` | El texto del label es parte del separator announcement |

### Navegación por teclado

Primary interactions (afectan diseño):

```
Divider no es focusable — sin keyboard interactions.
```

---

## Guía de contenido

**Label en divider:**
- Máximo 2-3 palabras — es un header de sección compacto, no una descripción
- Usar sentence case: "Información personal" (no "INFORMACIÓN PERSONAL")
- El label describe el grupo que empieza después, no el que termina antes
- No usar el label como reemplazo de un `<h2>` semántico — son cosas distintas

**Cuándo usar dashed vs. solid:**
- `solid` para separaciones definitivas y permanentes
- `dashed` para separaciones de contenido colapsable, opcional, o en un estado draft/borrador
- `dashed` también para separaciones en contextos de edición donde la línea puede desaparecer

**Thickness como jerarquía:**
- `sm` (1px) para separación de ítems en listas/menús — máxima densidad
- `md` (2px) para separación de grupos dentro de secciones
- `lg` (4px) para separación de secciones principales — sparingly

---

## Pre-build checklist

```
□ ¿El spacing entre elementos no es ya suficiente separación?
□ ¿Orientation=vertical tiene altura explícita en el parent?
□ ¿Has Label=yes solo en Orientation=horizontal?
□ ¿El label (si existe) es conciso (2-3 palabras)?
□ ¿El label NO reemplaza un <h2> semántico?
□ ¿El Divider estructural tiene role="separator" en implementación?
□ ¿El Divider decorativo tiene aria-hidden="true"?
□ ¿El spacing externo lo maneja el parent (Stack gap) y no el Divider?
□ ¿No se usa para color semántico (error/warning)? → Banner/Alert
```

---

## Componentes relacionados

```
Stack      → el gap del Stack puede reemplazar al Divider en muchos casos
Menu       → usa Divider horizontal sm/subtle para separar grupos de acciones
Sidebar    → usa Divider horizontal para separar secciones de nav
Form       → usa Divider horizontal con Has Label para secciones de formulario
Toolbar    → usa Divider vertical sm para separar grupos de botones
Card       → puede usar Divider horizontal entre secciones internas del card
Table      → las rows tienen border-bottom nativo — no usar Divider en tablas
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | Orientaciones | Thickness | Label | `<hr>` | Decorativo | Diferenciador |
|---------|-------|--------------|----------|-------|--------|-----------|--------------|
| **Material Design 3** | Divider | H + inset variants | Fijo 1dp | No | Sí | aria-hidden doc | Inset alignment para listas |
| **Spectrum (Adobe)** | Divider | H + V | S/M/L (1/2/4px) | No | Sí | No doc | V con aria-orientation correcto |
| **Carbon (IBM)** | Ausente | — | — | — | hr manual | — | Whitespace-first; no componente |
| **Polaris (Shopify)** | Divider | H solo | 025/050/100 | No | Sí | aria-hidden doc | Token-constrained `borderColor`; semantic tokens |
| **Atlassian** | Divider | H solo | Fijo | No | Sí | No doc | Zero-configuration; un solo look |
| **Ant Design** | Divider | H + V | Fijo 1px | Sí (izq/centro/der) | No (`<div>`) | No | Label-in-line; orientationMargin; dashed |
| **Twilio Paste** | Separator | H + V | Token | No | Sí | `decorative` prop | Separador con prop explícita decorative |
| **Lightning (Salesforce)** | Utility CSS | H | CSS | No | — | — | slds-has-divider; no componente |
| **Primer (GitHub)** | Sin componente | — | Box border | No | — | — | Box borderBottom como alternativa |
| **shadcn/ui** | Separator | H + V | CSS | No | No (Radix) | `decorative` prop | Radix Separator; role="none" para decorativo |
| **Radix UI** | Separator | H + V | — | No | `<hr>` basis | `decorative` prop | Primitivo headless; `decorative=true` → role="none" |
| **Chakra UI** | Divider/Separator | H + V | style props | No | Sí | Manual | solid + dashed; v3 renombrado Separator |
| **GOV.UK** | section-break (CSS) | H | Utility classes | No | — | — | Spacing-first; whitespace preferido |
| **Base Web (Uber)** | Divider | H solo | Theme tokens | No | Sí | Override | Horizontal only; override system |
| **Fluent 2** | Divider | H + V | Token | Sí (appearance/alignContent) | No | Manual | Label-in-line para "Or"/"Today" en chat/auth |
| **Gestalt (Pinterest)** | Divider | H solo | Token | No | Sí | Manual | Zero-prop; siempre igual; spacing externo via Box |
| **Mantine** | Divider | H + V | `size` | Sí (labelPosition) | Sí | Manual | solid/dashed/dotted; label con posición |
| **Orbit (Kiwi)** | Separator | H solo | Token | No | Sí | Manual | `spaceAfter` built-in spacing control |
| **Evergreen** | Sin componente | — | Box border | No | — | — | Menu.Divider en Menu only; spacing-first |
| **Nord** | nord-divider | H + V | CSS custom props | No | Sí | Manual | Healthcare; minimal; `vertical` attribute |

**Patrones clave de la industria:**
1. **Label-in-divider** — Solo Ant Design (T1) y Fluent 2/Mantine (T3) lo soportan como primera clase. Útil para formularios densos y flows de autenticación ("O continúa con"). El tradeoff: el texto NO es semántico como heading.
2. **`<hr>` para semántica** — Polaris, Atlassian, Gestalt, Base Web, Mantine, Orbit usan `<hr>` que provee `role="separator"` nativamente. Ant Design usa `<div role="separator">` — equivalente funcionalmente pero menos idiomático.
3. **Decorative prop** — Radix (shadcn) y Paste tienen `decorative` prop explícita para role="none". El resto requiere `aria-hidden` manual. La prop explícita es el patrón más claro.
4. **Whitespace-first** — Carbon, GOV.UK, Evergreen y Cedar no tienen Divider component — argumentan que spacing adecuado es mejor separación. Argumento válido cuando el DS tiene un spacing scale sólido.

---

## Tokens

**8 tokens** · prefijo `div-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `div-sm-thickness` | `border/1` | Thickness sm — 1px |
| `div-md-thickness` | `border/2` | Thickness md — 2px |
| `div-lg-thickness` | `border/4` | Thickness lg — 4px |
| `div-subtle-color` | `border/default` | Emphasis subtle — #D1D1D8 |
| `div-default-color` | `border/hover` | Emphasis default — #A5A5B3 |
| `div-label-bg` | `surface/default` | Background del label — blanco |
| `div-label-fg` | `text/secondary` | Color texto label — #6B7280 |
| `div-label-paddingX` | `spacing/3` | Padding horizontal del label — 12px |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  Horizontal con label:                                   │
│                                                          │
│  ─────────────[   Sección   ]────────────────────────   │
│               ↑←─12px─→↑                                │
│               bg:white · 13px/medium · color:secondary  │
│                                                          │
│  Vertical sm:                                            │
│  [btn A] ─│─ [btn B] ─│─ [btn C]                        │
│            1px          1px                              │
│            height: 24px (height del parent)              │
│                                                          │
│  Frames totales:                                         │
│  Orientation(2) × Thickness(3) × Style(2) × Emphasis(2) │
│  = 48 brutos − 12 exclusiones (vertical+label) = 36     │
└──────────────────────────────────────────────────────────┘
```
