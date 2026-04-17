# Stat

## Descripción general

Stat es el componente de display de métricas KPI del sistema de diseño: muestra un valor numérico destacado con su label descriptivo, unidad opcional, indicador de tendencia (trend up/down/neutral), ícono contextual, descripción comparativa, y sparkline opcional. Es el bloque fundamental de dashboards, analytics, y vistas de resumen — el "número grande" que comunica el estado de una métrica de un vistazo. Existe en 3 sizes (sm/md/lg con valor desde 20 a 40px), 3 layouts (stacked/horizontal/card), y 4 estados de trend (none/up/down/neutral). Es display-only: no tiene interacción propia.

```
Layout=card, Size=md, Trend=up:
┌──────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Total Revenue                    [📈]                 │  │  label: 13px/400
│  │  $42,350                                               │  │  value: 28px/600
│  │  USD                                                   │  │  unit: 12px/400
│  │  ┌──────────┐  vs last month                          │  │  trend: 11px
│  │  │ ↑ +12.5% │                                         │  │
│  │  └──────────┘                                         │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘

Layout=stacked (sin card):
┌──────────────────────────────────────────┐
│  Active Users        ← label: secondary  │
│  1,234               ← value: 28px/600   │
│  ↑ +5.2%             ← trend: success    │
└──────────────────────────────────────────┘

Layout=horizontal:
┌──────────────────────────────────────────┐
│  [📊]  Active Users     1,234   ↑ +5.2%  │
│  ← icon ← label →← value → ← trend →    │
└──────────────────────────────────────────┘

Trend variants (color + ícono):
┌──────────────────────────────────────────┐
│  up:      [↑ +12.5%] — success/verde     │
│  down:    [↓ -3.2%]  — error/rojo        │
│  neutral: [— 0.0%]   — secondary/gris    │
│  none:    (sin indicador de trend)       │
└──────────────────────────────────────────┘
```

**Lo que el diseñador puede configurar:**

Variantes (cambian apariencia — generan variantes Figma):

```
Size    → sm | md | lg
Trend   → none | up | down | neutral
Layout  → stacked | horizontal | card
Emphasis → default | prominent
```

Toggles:

```
👁 Has Icon        → muestra/oculta el ícono contextual
👁 Has Trend       → muestra/oculta el indicador de trend
👁 Has Description → muestra/oculta el texto "vs last month"
👁 Has Sparkline   → muestra/oculta el mini-chart de tendencia
👁 Has Unit        → muestra/oculta la unidad (USD, %, users)
```

Textos editables:

```
✏️ Label       → "Total Revenue"
✏️ Value       → "$42,350"
✏️ Unit        → "USD"
✏️ Description → "vs last month"
✏️ Trend Delta → "+12.5%"
```

Slot intercambiable:

```
🔄 Icon → "icon/trending-up" (default)
```

### Panel de propiedades en Figma

```
┌────────────────────────────────────────────────────────────────┐
│  Stat                                                          │
│  ────────────────────────────────────────────────────────────  │
│  Size     [ md              ▼ ]                                │
│  Trend    [ up              ▼ ]                                │
│  Layout   [ stacked         ▼ ]                                │
│  Emphasis [ default         ▼ ]                                │
│  ────────────────────────────────────────────────────────────  │
│  👁 Has Icon         [ off ]                                   │
│  👁 Has Trend        [ on ]                                    │
│  👁 Has Description  [ off ]                                   │
│  👁 Has Sparkline    [ off ]                                   │
│  👁 Has Unit         [ off ]                                   │
│  ✏️ Label         [ Total Revenue                         ]    │
│  ✏️ Value         [ $42,350                               ]    │
│  ✏️ Unit          [ USD                                   ]    │
│  ✏️ Description   [ vs last month                         ]    │
│  ✏️ Trend Delta   [ +12.5%                                ]    │
│  🔄 Icon          [ icon/trending-up                  ↗ ]     │
└────────────────────────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿Necesito mostrar un KPI o métrica numérica de forma prominente?
                    │
                    ▼
       ¿El número va dentro de una card/panel independiente?
       ├── Sí → Layout=card (con fondo, borde, padding)
       └── No → Layout=stacked o horizontal (sin card)
                    │
                    ▼
       ¿Hay un comparativo de tendencia (vs período anterior)?
       ├── Sí → Trend=up|down|neutral + Has Description
       └── No → Trend=none
                    │
                    ▼
       ¿El número es muy grande o es el hero del dashboard?
       ├── Sí → Size=lg + Emphasis=prominent
       └── No → Size=sm o md
```

**Usar Stat cuando:**
- Dashboard con métricas clave en la parte superior (ingresos, usuarios activos, conversión)
- Card de resumen con un KPI + trend en un grid de stats (4 Stat en Grid 4 columnas)
- Inline metric en una tabla de comparación (Layout=horizontal)
- Resumen de actividad en una página de perfil ("Meetings this month: 23")
- Widget de analytics en un sidebar o panel

**NO usar Stat cuando:**
- El valor necesita interacción (clickeable para drill-down) → usar Stat wrapeado en un link/button
- Se necesita un gráfico completo → usar Chart component
- El número es parte de una tabla de datos → usar DataGrid/Table (no Stat)
- El contexto es un formulario con un número calculado → usar Typography
- La métrica tiene múltiples sub-métricas complejas → usar un Card custom

---

## Variaciones visuales

### Size

| Size | LabelFont | ValueFont | LineHeight | IconSize | TrendFont | Padding | Gap |
|------|----------|----------|-----------|---------|----------|---------|-----|
| sm   | 12px/400 | 20px/600 | 28px | 16px | 11px | 12px | 4px |
| md   | 13px/400 | 28px/600 | 36px | 20px | 12px | 16px | 6px |
| lg   | 14px/400 | 40px/600 | 48px | 24px | 13px | 24px | 8px |

### Trend

| Trend   | Ícono | Foreground | Background | Significado |
|---------|-------|-----------|-----------|------------|
| none    | —     | —          | —          | Sin comparativo |
| up      | arrow-up | success/fg (verde) | success/bg (verde claro) | Métrica mejora vs período anterior |
| down    | arrow-down | error/fg (rojo) | error/bg (rojo claro) | Métrica empeora |
| neutral | minus | text/secondary (gris) | surface/pressed (gris claro) | Sin cambio significativo |

### Layout

| Layout | Dirección | Card | Icon position | Cuándo usar |
|--------|----------|------|--------------|------------|
| stacked | column | No | top-right | Grids de KPIs, paneles de métricas |
| horizontal | row | No | leading | Listas inline de stats, tablas de comparación |
| card | column | Sí (bg + border + radius) | top-right | Widgets independientes elevados |

### Emphasis

| Emphasis | ValueSize | Efecto visual | Cuándo usar |
|---------|----------|--------------|------------|
| default | size normal (20/28/40px) | Estándar | La mayoría de Stat |
| prominent | 1.5x más grande | Valor más bold, más espaciado | El stat más importante del dashboard |

---

## Decisiones de diseño

**1. Stat standalone (no sub-components)** — Stat es single-purpose (display KPI). Agregar sub-components (StatLabel, StatValue, StatTrend) over-engineeriza sin beneficio real. Los slots de texto editable y los toggles cubren todas las variaciones sin necesidad de composición explícita en Figma.

**2. Trend como property semántica (no solo color)** — up/down/neutral no son solo colores — cambian el ícono, el aria-label descriptivo, y la semántica del dato. Un boolean "isPositive" no captura "neutral" ni permite el caso where trend=none. Property discreta con 4 valores es más expresiva.

**3. 3 Layouts (stacked/horizontal/card)** — Stacked para grids de dashboards (el más común); horizontal para summaries inline o tablas de comparación; card para widgets elevados independientes. Los 3 cubren los contextos reales de Zoom analytics sin generar una API compleja.

**4. Sparkline como slot opcional** — El mini trend chart (últimos N días) agrega valor contextual sin requerir un componente de charting completo. Es decorativo (aria-hidden) con alternativa textual accesible. Para dashboards de Zoom que ya muestran tendencias, el sparkline elimina la necesidad de un chart separado en el Stat card.

**5. Emphasis=prominent** — En un dashboard con múltiples stats, uno suele ser el "número héroe" (revenue total, usuarios activos globales). Emphasis=prominent hace ese valor 1.5x más grande que el default, con más peso visual, sin crear un componente separado.

### Combinaciones excluidas

```
Trend=none + Has Description visible → ✗ description ("vs last month") necesita contexto de trend
Layout=horizontal + Has Sparkline    → ✗ horizontal no tiene espacio para sparkline vertical
```

---

## Comportamiento

### Esencial para diseño

- **Stat es display-only** — no tiene interacción propia. Para stats clickeables (que llevan a un drill-down), el developer envuelve el Stat en un `<a>` o `<button>`. En Figma, modelar el estado hover del wrapper por separado si es necesario.
- **Value como elemento visual hero** — el valor es el texto más grande del Stat. La jerarquía visual es: Value (grande, bold) → Label (pequeño, secundario) → Trend/Description (smallest). Esta jerarquía es fundamental para el "vistazo rápido" del KPI.
- **Trend badge — no el valor en sí** — el trend muestra el *delta* del período ("+12.5%", "-3.2%"), no el valor anterior. El designer edita ✏️ Trend Delta con el porcentaje de cambio.
- **Sparkline es decorativo en Figma** — el sparkline es un placeholder visual (forma abstracta que sugiere tendencia). La implementación usa una librería de micro-charts. En Figma se modela como línea o shape simple.
- **Layout=card aplica padding** — a diferencia de stacked/horizontal que flotan sin contenedor visual, card agrega bg=surface/default, border=border/default, radius=8px, y el padding especificado por Size.

### Accesibilidad (ARIA)

| Parte | Implementación | Por qué importa |
|-------|---------------|----------------|
| Container | `role="group"` + `aria-labelledby="[label-id]"` | SR agrupa: "Total Revenue, grupo" |
| Label | `id="[label-id]"` + texto visible | Ancla del aria-labelledby del container |
| Value + Unit | `<strong>` con `aria-label="$42,350 dólares"` | SR lee el valor con contexto de unidad |
| Trend | `aria-label="aumento de 12.5% respecto al mes anterior"` | SR describe la tendencia completa |
| Sparkline | `aria-hidden="true"` + texto alternativo visible | Decorativo; texto desc cubre el significado |
| Reading order | label → value → unit → trend → description | SR lee en el orden semántico correcto |

### Navegación por teclado

```
Stat no es focusable (display-only).

Excepción: Stat envuelto en <a> o <button>:
→ Tab/Shift+Tab → enfoca el elemento
→ Enter/Space   → activa el link/button
→ El aria-label del wrapper describe la acción
```

---

## Guía de contenido

**Label:**
- Nombre de la métrica, conciso: "Total Revenue", "Active Users", "Conversion Rate"
- Usar title case para métricas de dashboard
- Máximo 3-4 palabras — el label compite con el valor en espacio

**Value:**
- El número formateado: "$42,350", "1,234", "87.3%", "4.5h"
- Incluir separadores de miles: "1,234" no "1234"
- Para porcentajes, incluir el símbolo: "87.3%" no "87.3"
- El slot ✏️ Unit es para la unidad aparte del valor: "USD", "users", "sessions"

**Trend Delta:**
- Siempre con signo y porcentaje: "+12.5%", "-3.2%", "0.0%"
- Para Trend=up: siempre positivo ("+")
- Para Trend=down: siempre negativo ("-")
- Para Trend=neutral: "0.0%" o "≈0%"

**Description:**
- Contexto del período de comparación: "vs last month", "vs Q1 2024", "últimos 30 días"
- Siempre en relación al trend — no mostrar sin Trend activo
- Máximo 4-5 palabras

**Emphasis=prominent:**
- Solo UN stat por vista debería ser prominent — el más importante
- No usar prominent para 3+ stats en el mismo view

---

## Pre-build checklist

```
□ ¿Container tiene role="group" + aria-labelledby?
□ ¿Value tiene aria-label que incluye la unidad ("$42,350 dólares")?
□ ¿Trend tiene aria-label descriptivo ("aumento de 12.5% vs mes anterior")?
□ ¿Sparkline tiene aria-hidden="true" + alternativa textual?
□ ¿Reading order es correcto: label → value → unit → trend → description?
□ ¿Has Description solo cuando Trend está activo?
□ ¿Has Sparkline=off en Layout=horizontal?
□ ¿Solo UN stat usa Emphasis=prominent por vista?
□ ¿Value formateado con separadores de miles?
□ ¿Stat no focusable (a menos que esté wrapeado en link/button)?
```

---

## Componentes relacionados

```
Grid       → 4 Stat en Grid de 4 columnas es el patrón estándar de dashboard KPIs
Card       → Layout=card usa los mismos tokens de surface, border y radius que Card
Chart      → para datos con series temporales completas (no solo sparkline)
DataGrid   → para tablas de datos con múltiples métricas por fila
Badge      → para estado categórico junto a un KPI (no para el valor numérico)
Typography → para números simples sin el contexto de KPI (label + trend)
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Nombre | Sizes | Layouts | Trend | Sparkline | Tokens | Diferenciador |
|---------|-------|-------|---------|-------|-----------|--------|--------------|
| **Material Design 3** | Sin componente | — | — | — | — | — | Cards + Typography manualmente |
| **Spectrum (Adobe)** | Sin componente | — | — | — | — | — | Composición con IllustratedMessage + Text |
| **Carbon (IBM)** | Metric Tile | Fijo | tile | — | No | — | Metric Tile es simple; sin trend ni sparkline |
| **Polaris (Shopify)** | DataCard | — | — | trendIndicator | No | — | LegacyCard + KeyMetric; trendIndicator prop |
| **Atlassian** | Sin componente | — | — | — | — | — | Composición con Box + Text |
| **Ant Design** | Statistic | — | inline | — | No | — | value + prefix/suffix; formatter prop |
| **Twilio Paste** | Sin componente | — | — | — | — | — | Manual |
| **Lightning** | Sin componente | — | — | — | — | — | MetricCard en AppExchange patterns |
| **Primer (GitHub)** | Sin componente | — | — | — | — | — | Manual con Text |
| **shadcn/ui** | Sin componente | — | — | — | — | — | Composición con Card + Typography |
| **Chakra UI** | Stat | — | — | StatArrow | No | — | StatGroup, StatLabel, StatNumber, StatHelpText, StatArrow |
| **Fluent 2** | Sin componente | — | — | — | — | — | Manual composición |
| **Gestalt (Pinterest)** | Sin componente | — | — | — | — | — | Manual |
| **Mantine** | StatRing (extension) | — | — | — | No | — | Ring progress + label; no standard Stat |
| **Orbit (Kiwi)** | Sin componente | — | — | — | — | — | Domain-specific |
| **Evergreen** | Sin componente | — | — | — | — | — | Manual |
| **Nord** | Sin componente | — | — | — | — | — | Healthcare |

**Patrones clave de la industria:**
1. **Stat component es poco frecuente en T1** — Solo Chakra UI tiene un Stat component explícito en T1 (con StatGroup, StatLabel, StatNumber, StatArrow). Carbon tiene Metric Tile (básico). El resto usa composición manual. La decisión de incluirlo es pragmática — Zoom es un producto de analytics y dashboards.
2. **Chakra UI StatArrow como patrón** — Chakra es la referencia más completa: StatArrow con type="increase"/"decrease" y colores semánticos. La extensión a 4 valores de Trend (up/down/neutral/none) añade el caso "sin cambio".
3. **Ant Design Statistic** — Ant tiene un componente Statistic simple pero sin trend, sin layouts, y sin sizes. Útil como baseline para el API de Value + Label + formatter.
4. **Sparkline es universal en BI tools** — Aunque ningún DS de componentes genéricos tiene sparkline como componente, todos los dashboards de analytics modernos (Grafana, Looker, Metabase) los incluyen. Modelarlo como slot opcional en Stat es la decisión correcta.

---

## Tokens

**20 tokens** · prefijo `st-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `st-label-fg` | `text/secondary` | Color del label |
| `st-label-fontSize-sm` | `type/xs` | Label sm — 12px |
| `st-label-fontSize-md` | `type/sm` | Label md — 13px |
| `st-label-fontSize-lg` | `type/md` | Label lg — 14px |
| `st-value-fg` | `text/primary` | Color del valor |
| `st-value-fontSize-sm` | `type/heading-sm` | Value sm — 20px |
| `st-value-fontSize-md` | `type/heading-md` | Value md — 28px |
| `st-value-fontSize-lg` | `type/heading-lg` | Value lg — 40px |
| `st-value-fontWeight` | `type/weight-semibold` | Value — 600 |
| `st-trend-up-fg` | `status/success/fg` | Trend up — verde |
| `st-trend-up-bg` | `status/success/bg` | Trend up bg |
| `st-trend-down-fg` | `status/error/fg` | Trend down — rojo |
| `st-trend-down-bg` | `status/error/bg` | Trend down bg |
| `st-trend-neutral-fg` | `text/secondary` | Trend neutral — gris |
| `st-trend-neutral-bg` | `surface/pressed` | Trend neutral bg |
| `st-description-fg` | `text/subtlest` | Color de description |
| `st-card-bg` | `surface/default` | Background Layout=card |
| `st-card-border` | `border/default` | Border Layout=card |
| `st-card-radius` | `radius/md` | Border radius card — 8px |
| `st-unit-fg` | `text/secondary` | Color de la unidad |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  Size=sm:  padding 12px · gap 4px  · value 20px/600     │
│  Size=md:  padding 16px · gap 6px  · value 28px/600     │
│  Size=lg:  padding 24px · gap 8px  · value 40px/600     │
│                                                          │
│  Trend badge:                                            │
│  [icon 16px] [delta text] — pill: px:6 py:2 radius:full │
│                                                          │
│  Layout=card: bg + 1px border + radius:8px + padding    │
│                                                          │
│  Frames totales:                                         │
│  Size(3) × Trend(4) × Layout(3) × Emphasis(2) = 72      │
│  − 12 exclusiones = 60 frames                           │
└──────────────────────────────────────────────────────────┘
```
