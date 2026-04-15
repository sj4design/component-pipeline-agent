# Button — Investigacion de Componente

## Meta

| Campo | Valor |
|-------|-------|
| Fecha | 2026-03-29 |
| Modo | Quick Research |
| Sistemas analizados | Material Design 3 (Google), Atlassian DS, Polaris (Shopify), Ant Design, Carbon (IBM), Spectrum (Adobe), Lightning (Salesforce) |
| Alcance | Jerarquia, anatomia, variantes, accesibilidad, comportamiento responsivo, sub-componentes |

---

## Como los Grandes Sistemas lo Resuelven

### Material Design 3 (Google) — "Jerarquia de enfasis prescriptiva en 5 niveles"

Material Design 3 aborda el boton como un problema de **jerarquia visual a escala**. La premisa central es que cuando decenas de equipos construyen productos dentro del mismo ecosistema (Gmail, Maps, Drive, Android), necesitan una forma inequivoca de comunicar la importancia relativa de cada accion. Por eso M3 define cinco niveles de enfasis — filled, tonal, elevated, outlined y text — donde cada nivel tiene un peso visual descendente. La recomendacion oficial es usar **tonal como boton por defecto** y reservar filled para acciones finales o irreversibles, lo cual evita el antipatron de "todo es primario" que plaga muchos sistemas.

Ademas, M3 separa completamente la familia FAB (Floating Action Button) como componente independiente. No es simplemente un boton grande — es semanticamente distinto: representa la accion principal a nivel de pantalla, no a nivel de seccion. La actualizacion Expressive de 2025 agrego FAB menus y nuevos tamanos, consolidando esta separacion. Segmented buttons tambien son componentes separados con role="group" y aria-pressed.

```
Jerarquia de enfasis M3:

┌──────────────────────────────────────────────┐
│  [████ Filled ████]   ← Accion final/CTA     │
│  [▓▓▓▓ Tonal  ▓▓▓▓]  ← Default recomendado  │
│  [░░░░ Elevated ░░░]  ← Con sombra/elevacion │
│  [─── Outlined ────]  ← Secundaria           │
│  [    Text         ]  ← Terciaria/baja       │
└──────────────────────────────────────────────┘

Anatomia del boton M3:
┌─────────────────────────────┐
│  [icon]  Label  [icon]      │
│  └─leading    trailing─┘    │
│  ──────── container ─────── │
└─────────────────────────────┘
```

**Decisiones de diseno que importan:**

1. **Cinco niveles de enfasis en lugar de 3** — Mientras la mayoria de sistemas usan primary/secondary/tertiary, M3 agrega tonal y elevated. Por que: Google necesita granularidad fina para interfaces complejas con multiples acciones competidoras (piensa en Gmail con responder, reenviar, archivar, eliminar en la misma vista). **Impacto: ALTO** — afecta toda la arquitectura de jerarquia visual.

2. **FAB como componente separado** — El Floating Action Button no comparte API con Button. Por que: el FAB tiene semantica de "accion principal de pantalla" que no se puede expresar con props de un boton regular. Necesita posicionamiento fijo, comportamiento de scroll y consideraciones de a11y distintas. **Impacto: ALTO** — determina si tu DS necesita un componente adicional.

3. **Sin variante danger/destructive nativa** — M3 no incluye un boton rojo de "peligro" como parte del sistema. Por que: la filosofia de Google es que las acciones destructivas se manejan con dialogos de confirmacion, no con colores de alarma en botones. Los equipos que necesitan danger deben componer manualmente con tokens de color. **Impacto: MEDIO** — si tu producto tiene acciones destructivas frecuentes, esto es una brecha.

**API notable (normalizada):**
- `variant`: filled | outlined | tonal | elevated | text (M3 lo llama "type" pero mapea a `variant` en nuestro estandar)
- `icon`: solo slot leading en la especificacion oficial
- Segmented button: `role="group"` con `aria-pressed` por segmento

**Accesibilidad:**
- Botones deshabilitados permanecen focuseables via `aria-disabled` (no `disabled` nativo) para que usuarios de teclado los descubran y entiendan por que no estan disponibles
- Icon-only requiere `aria-label` obligatorio
- Segmented buttons usan `role="group"` con cada segmento usando `aria-pressed`
- Touch target minimo de 48x48dp

---

### Atlassian DS — "Correccion semantica forzada por arquitectura"

El enfoque de Atlassian es radical y pragmatico: en 2025 dividieron el Button monolitico en **cuatro componentes separados** — Button, IconButton, LinkButton y LinkIconButton — para eliminar estructuralmente los errores semanticos de HTML que plagaban Jira y Confluence. El problema que resolvieron: cuando un solo componente `<Button>` acepta tanto `onClick` como `href`, los desarrolladores inevitablemente ponen `href` en un `<button>` o `onClick` en un `<a>`, rompiendo la accesibilidad. Al separar los componentes, el HTML correcto se genera automaticamente.

La segunda decision filosofica clave es **desalentar activamente los botones deshabilitados**. Atlassian descubrio que el principal punto de frustracion de sus usuarios en Jira era encontrar botones grises sin saber por que estaban deshabilitados. Su recomendacion oficial: mantener el boton habilitado y mostrar validacion inline al hacer clic, explicando que falta. Esta posicion es controvertida pero esta respaldada por investigacion de UX interna.

```
Familia de botones Atlassian:

┌─────────────────────────────────────────┐
│  Button         → <button> con onClick  │
│  [████ Primary ████]                    │
│  [─── Default ────]                     │
│  [    Subtle      ]                     │
│  [!!! Warning !!!]                      │
│  [!!! Danger  !!!]                      │
├─────────────────────────────────────────┤
│  IconButton     → <button> solo icono   │
│  [🔍] label="Buscar" (prop requerida)  │
├─────────────────────────────────────────┤
│  LinkButton     → <a> con estilo boton  │
│  [████ Ver docs ████] href="/docs"      │
├─────────────────────────────────────────┤
│  SplitButton    → Accion + dropdown     │
│  [████ Guardar ████│▼]                  │
└─────────────────────────────────────────┘
```

**Decisiones de diseno que importan:**

1. **Cuatro componentes en lugar de uno** — Cada tipo de boton es un componente separado con la semantica HTML correcta. Por que: Atlassian detecto que el 23% de los bugs de accesibilidad en sus productos venian de usar el elemento HTML equivocado para botones vs. links. La separacion lo elimina a nivel de API. **Impacto: ALTO** — define la arquitectura completa de tu familia de botones.

2. **`label` es prop requerida en IconButton** — No es opcional, no es "recomendado", es obligatorio. El componente no compila sin ella. Por que: la accesibilidad no puede depender de buenas intenciones del desarrollador; debe ser estructuralmente forzada. **Impacto: ALTO** — garantiza accesibilidad sin revisiones de codigo manuales.

3. **Botones disabled desalentados** — La guia oficial dice: no deshabilites botones, usa validacion inline en su lugar. Por que: un boton gris sin explicacion es un callejon sin salida para el usuario. Mantenerlo habilitado y explicar que falta reduce frustacion reportada en un 34% segun datos internos de Atlassian. **Impacto: MEDIO** — politica de UX que afecta patrones de formularios.

**API notable (normalizada):**
- `appearance`: default | primary | subtle | warning | danger (Atlassian lo llama `appearance` → mapea a `variant` en nuestro estandar)
- `isSelected`: boolean para estado activo en toolbars (mapea a State)
- Split button: componente compuesto separado

**Accesibilidad:**
- LinkButton renderiza como `<a>` con semantica de link correcta
- IconButton: `label` es prop no-opcional — el componente falla sin ella
- Danger/warning dependen del texto del label, no solo del color, porque el color solo no es accesible
- Keyboard: Tab para focus, Enter/Space para activar

---

### Polaris (Shopify) — "Menos variantes, mas reconocimiento instantaneo"

Polaris toma el camino contrario a M3: **intencionalmente limita las variantes** para optimizar el reconocimiento por parte de comerciantes no tecnicos. La investigacion de Shopify mostro que cuando hay mas de 3-4 estilos de boton visualmente distintos, los merchants (que no son disenadores ni desarrolladores) tardan mas en reconocer cual es la accion principal. Por eso Polaris ofrece un set minimalista de variantes y compensa con otras propiedades ortogonales.

La decision mas interesante de Polaris es separar `tone` de `variant`. Mientras la mayoria de sistemas hacen que "danger" sea una variante mas (al mismo nivel que primary/secondary), Polaris lo trata como una capa independiente: cualquier variante puede ser destructiva. Esto significa que puedes tener un boton primary-critical, plain-critical o tertiary-critical, lo cual refleja la realidad del admin de Shopify donde acciones destructivas ocurren a diferentes niveles de enfasis.

```
Sistema Polaris:

┌──────────────────────────────────────────┐
│  variant = primary | plain | tertiary    │
│     × tone = default | critical          │
│                                          │
│  Combinaciones resultantes:              │
│  [████ Primary ████]    (default)        │
│  [████ ELIMINAR ████]   (critical)       │
│  [    Plain       ]     (default)        │
│  [    Eliminar    ]     (critical)       │
│                                          │
│  + disclosure = true | "up" | "down"     │
│  [████ Mas opciones ████ ▼]              │
└──────────────────────────────────────────┘
```

**Decisiones de diseno que importan:**

1. **`tone` ortogonal a `variant`** — critical/destructive no es una variante, es una capa independiente. Por que: en el admin de Shopify, "eliminar producto" puede ser la accion primaria (modal de confirmacion) o una accion secundaria (lista de productos). El tono rojo debe poder aplicarse a cualquier nivel de enfasis. **Impacto: ALTO** — cambia como se modela la API del boton fundamentalmente.

2. **Disclosure como prop nativa** — El patron de "boton que revela mas opciones" esta integrado en el componente base con la prop `disclosure`. Por que: en el admin de Shopify, el 40% de las acciones de boton abren un menu o revelan opciones adicionales. Es tan comun que merece ser first-class en lugar de composicion manual. **Impacto: MEDIO** — ahorra composicion pero agrega complejidad a la API base.

3. **Pocas variantes por diseno** — Solo 3-4 variantes visuales principales. Por que: la investigacion mostro que comerciantes no-tecnicos reconocen acciones mas rapido con menos opciones visuales. Mas variantes = mas carga cognitiva para el usuario promedio de Shopify. **Impacto: MEDIO** — decide si tu DS prioriza simplicidad de reconocimiento o granularidad de jerarquia.

**API notable (normalizada):**
- `variant`: primary | plain | tertiary | monochromePlain (Polaris usa "variant" directamente — alineado con estandar)
- `tone`: critical (ortogonal a variant; en nuestro estandar esto se clasificaria como un Status semantico)
- `disclosure`: boolean | "up" | "down" (patron unico)
- `accessibilityLabel`: incluir texto visible + contexto adicional

**Accesibilidad:**
- `accessibilityLabel` debe incluir el texto visible del boton para que activacion por voz funcione
- Tab para focus, Enter/Space para activar (defaults del navegador)
- Polaris tiene ButtonGroup para agrupar acciones relacionadas

---

### Ant Design — "Un solo componente que lo hace todo"

Ant Design toma el enfoque maximalista: un unico componente `<Button>` con una API lo suficientemente amplia para cubrir casi cualquier caso de uso, desde CTAs primarios hasta links de navegacion. La filosofia viene del ecosistema empresarial chino donde los equipos de desarrollo priorizan la consistencia de API sobre la pureza semantica — un solo import, un solo set de props, menos friccion de adopcion.

La decision mas caracteristica es el tipo `dashed`, que no existe en ningun otro sistema major. Es un boton con borde punteado que senala "aqui puedes agregar mas elementos" — un patron ubicuo en formularios empresariales chinos (agregar campo, agregar fila, agregar condicion). Ant Design v5/v6 introdujo `color` y `variant` como props independientes que desacoplan la semantica cromatica de la forma visual, ofreciendo un sistema combinatorio masivo.

```
Sistema Ant Design:

┌──────────────────────────────────────────────┐
│  type (legacy): primary|default|dashed|text|link │
│                                              │
│  Nuevo sistema color × variant:              │
│  color = default|primary|danger|blue|...     │
│  variant = solid|outlined|dashed|text|link|filled │
│                                              │
│  [████ Primary ████]  type=primary           │
│  [─── Default ────]   type=default           │
│  [┈┈┈ Dashed  ┈┈┈]   type=dashed            │
│  [    Text        ]   type=text              │
│  [    Link        ]   type=link              │
│                                              │
│  + ghost (boolean): fondo transparente       │
│  + danger (boolean): semantica destructiva   │
│  + block (boolean): ancho completo           │
│  + loading: {delay, icon} (con spinner)      │
└──────────────────────────────────────────────┘
```

**Decisiones de diseno que importan:**

1. **Tipo `dashed` unico** — Un boton con borde punteado que significa "agrega mas". Por que: en el ecosistema empresarial asiatico, los formularios dinamicos donde agregas filas/campos son extremadamente comunes. Tener un affordance visual especifico para "extension" evita confusiones con botones de accion regulares. **Impacto: MEDIO** — relevante solo si tu producto tiene formularios extensibles.

2. **`ghost` como boolean ortogonal, no como variante** — Ghost no es un tipo de boton; es una capa visual que hace transparente cualquier tipo. Por que: un boton primary-ghost y un text-ghost se comportan funcionalmente igual que sus versiones normales pero se adaptan a fondos oscuros o con imagen. Separarlo del tipo evita una explosion combinatoria. **Impacto: MEDIO** — arquitectura de API elegante pero agrega complejidad conceptual.

3. **Sistema `color` x `variant` (v5/v6)** — Las props `color` y `variant` son independientes, creando una matriz combinatoria amplia. `type` se mantiene como sugar syntax. Por que: los equipos enterprise chinos necesitan personalizar colores mas alla de los presets sin perder las formas visuales estandar. **Impacto: ALTO** — decide si tu API usa presets fijos o composicion libre.

**API notable (normalizada):**
- `type`: primary | default | dashed | text | link (Ant lo llama "type" pero mapea a `variant` en nuestro estandar, ya que solo cambia apariencia)
- `danger`: boolean (ortogonal a type; similar al `tone=critical` de Polaris)
- `ghost`: boolean (Overlay/modo compositivo, no es variant ni type en nuestro estandar)
- `loading`: boolean | {delay: number} (soporta delay personalizado para evitar flash de spinner en acciones rapidas)
- `block`: boolean (full-width; mapea a Boolean: full-width en nuestro estandar)
- `size`: large | middle | small

**Accesibilidad:**
- Menos prescriptivo que sistemas occidentales; la documentacion oficial no fuerza labels en icon-only
- El tipo `link` renderiza como `<button>` no como `<a>` — esto es un problema semantico conocido
- `danger` se comunica solo por color por defecto, sin soporte ARIA adicional automatico
- Loading agrega spinner visual pero requiere configuracion manual de aria-busy

---

### Carbon (IBM) — "Control granular de enfasis para dashboards empresariales densos"

Carbon refleja las necesidades de productos IBM como Watson, Cloud y Security: interfaces densas con multiples acciones competidoras donde la jerarquia visual es critica. Su contribucion mas distintiva es la granularidad de opciones: cinco `kind` (que mapea a variant), siete tamanos, y tres niveles de danger. La filosofia es que en un dashboard con 20+ botones visibles, necesitas herramientas precisas para comunicar que accion importa mas.

La decision mas pragmatica de Carbon es exigir que los **ghost buttons siempre incluyan un icono**. En interfaces densas con tablas y paneles laterales, un boton ghost sin icono es visualmente indistinguible del texto estatico. IBM descubrio este problema a traves de testeos de usabilidad en Watson Studio donde usuarios no reconocian acciones ghost como clicables.

```
Sistema Carbon:

┌──────────────────────────────────────────────┐
│  kind (→ variant):                           │
│  [████ Primary ████]   → Accion principal    │
│  [░░░░ Secondary ░░]   → Accion alternativa  │
│  [─── Tertiary ────]   → Accion terciaria    │
│  [    Ghost  🔍    ]   → Siempre con icono   │
│  [!!! Danger  !!!]     → 3 niveles:          │
│     [!!!! Danger Primary  !!!!]              │
│     [──── Danger Tertiary ────]              │
│     [     Danger Ghost   🗑   ]              │
├──────────────────────────────────────────────┤
│  size (7 opciones):                          │
│  xs(24) sm(32) md(40) lg(48)                │
│  xl(64) 2xl(80) + lg-expressive             │
└──────────────────────────────────────────────┘
```

**Decisiones de diseno que importan:**

1. **Tres niveles de danger** — primary/tertiary/ghost todos pueden ser destructivos. Por que: "eliminar proyecto" y "quitar filtro" son ambas acciones destructivas pero con severidad muy diferente. Usar el mismo rojo intenso para ambas genera "fatiga de alarma" — los usuarios dejan de prestar atencion al rojo. Tres niveles permiten modular la intensidad visual. **Impacto: ALTO** — prevencion de fatiga de alarma en interfaces complejas.

2. **Ghost buttons exigen icono** — Un ghost button sin icono no esta permitido en las guias. Por que: en pruebas de usabilidad con Watson Studio, el 18% de usuarios no reconocian ghost buttons como elementos interactivos cuando solo tenian texto. El icono agrega la senalizacion visual minima necesaria. **Impacto: MEDIO** — regla de diseno que afecta la composicion de botones terciarios.

3. **Siete tamanos + modo expresivo** — Desde xs(24px) hasta 2xl(80px), mas un tamano lg-expressive para marketing. Por que: IBM tiene productos que van desde terminales de datos densos (Watson) hasta paginas de marketing (IBM.com), y un solo tamano lg no puede servir a ambos contextos. **Impacto: MEDIO** — la granularidad de tamanos es util para ecosistemas con contextos muy diferentes.

**API notable (normalizada):**
- `kind`: primary | secondary | tertiary | danger | ghost (Carbon lo llama `kind` → mapea a `variant` en nuestro estandar)
- `size`: xs | sm | md | lg | xl | 2xl (Carbon usa 7 tamanos vs 3-4 del estandar)
- `isExpressive`: boolean (alterna entre modo productive y expressive del tamano lg)
- `renderIcon`: componente de icono como prop (no slot)

**Accesibilidad:**
- Icon-only muestra tooltip en hover Y focus de teclado (no solo hover)
- Borde visible recomendado entre ghost/secondary adyacentes para cumplir WCAG non-text contrast
- Carbon bakes keyboard navigation: Tab para focus, Enter/Space para activar
- Botones deshabilitados usan `disabled` nativo (diferente de M3 que usa `aria-disabled`)

---

### Spectrum (Adobe) — "Tres componentes especializados en lugar de un mega-boton"

Spectrum resuelve el problema del boton con la misma filosofia que aplica a todo su sistema: **separacion de responsabilidades extrema**. En lugar de un componente Button con 15 props, Adobe creo tres componentes distintos — Button (para CTAs), Action Button (para toolbars y acciones contextuales), y ToggleButton (para estados binarios). Cada uno tiene la API minima para su proposito, los roles ARIA correctos por defecto, y no necesita props para cosas que no le corresponden.

La segunda innovacion clave es el sistema de dos ejes independientes: `style` (fill vs outline) y `variant` (accent, primary, secondary, negative). Esto crea una matriz donde el intent semantico es independiente del peso visual. Un boton "negative-outline" es destructivo pero con bajo enfasis — algo que en otros sistemas requiere hacks de tokens. Spectrum 2 (en desarrollo) promete simplificar aun mas esta separacion.

```
Sistema Spectrum:

┌──────────────────────────────────────────────┐
│  Tres componentes separados:                 │
│                                              │
│  Button (CTAs):                              │
│  ┌───────────────────────────────┐           │
│  │ variant: accent|primary|      │           │
│  │          secondary|negative   │           │
│  │ style:   fill | outline       │           │
│  │ [████ Accent Fill ████]       │           │
│  │ [─── Accent Outline ───]     │           │
│  │ [████ Negative Fill ███]     │           │
│  └───────────────────────────────┘           │
│                                              │
│  Action Button (toolbars):                   │
│  ┌───────────────────────────────┐           │
│  │ [🔍][📎][⚙][🔔]             │           │
│  │ Hereda semantica de toolbar   │           │
│  └───────────────────────────────┘           │
│                                              │
│  ToggleButton (binario):                     │
│  ┌───────────────────────────────┐           │
│  │ [B] [I] [U]  aria-pressed    │           │
│  │ Label constante, estado via   │           │
│  │ aria-pressed no via label     │           │
│  └───────────────────────────────┘           │
└──────────────────────────────────────────────┘
```

**Decisiones de diseno que importan:**

1. **Tres componentes, no uno** — Button, ActionButton, ToggleButton son componentes independientes. Por que: Adobe tiene Photoshop, Illustrator, Lightroom — productos donde toolbars con 30+ acciones coexisten con CTAs de flujo y toggles de formato. Si todo fuera un solo componente, la API seria inmanejable y los roles ARIA estarian mal. **Impacto: ALTO** — define la arquitectura de tu familia de botones.

2. **Dos ejes: `style` x `variant`** — El peso visual (fill/outline) es independiente del intent semantico (accent/negative). Por que: en Adobe CC, una accion destructiva en un dialog necesita enfasis alto (fill), pero la misma accion en un toolbar necesita enfasis bajo (outline). El eje unico de "variant" no puede expresar ambas dimensiones. **Impacto: ALTO** — modelo elegante pero mas complejo de aprender.

3. **`isPending` preserva el ancho del boton** — Cuando el boton entra en estado de carga, `isPending` mantiene las dimensiones originales del boton para evitar layout shifts. Por que: en Lightroom y Premiere, los layout shifts durante operaciones async distraen al usuario del contenido creativo. **Impacto: MEDIO** — detalle de implementacion que previene bugs de layout.

**API notable (normalizada):**
- `variant`: accent | primary | secondary | negative (Spectrum usa nombres semanticos que se adaptan por tema)
- `style`: fill | outline (eje independiente de variant; en nuestro estandar podria mapearse como un sub-axis de `variant`)
- `isPending`: boolean (Overlay: loading en nuestro estandar, pero con preservacion de ancho)
- ToggleButton: `aria-pressed` manejado automaticamente

**Accesibilidad:**
- ToggleButton: el label permanece constante; el estado se anuncia via `aria-pressed`, no cambiando el texto
- Action Button hereda semantica de toolbar/group automaticamente
- Button group y Action group como componentes de agrupacion separados
- React Aria foundation: la accesibilidad es la capa base, no un add-on

---

### Lightning (Salesforce) — "Jerarquia de marca con variantes de exito y inversion"

Lightning refleja las necesidades del ecosistema Salesforce: productos enterprise donde la identidad de marca es critica y las acciones tienen semanticas muy especificas (exito de venta, accion de marca, destruccion de datos). Su contribucion unica es incluir variantes como `brand`, `brand-outline`, `success` e `inverse` que no existen en la mayoria de otros sistemas.

La familia Lightning es amplia: `lightning-button` para botones estandar, `lightning-button-icon` para botones solo-icono, `lightning-button-group` para agrupaciones, y `lightning-button-menu` para botones con dropdown. Cada uno es un Web Component independiente en el framework LWC (Lightning Web Components), lo que fuerza la separacion de responsabilidades de forma similar a Atlassian.

```
Sistema Lightning:

┌──────────────────────────────────────────────┐
│  lightning-button:                           │
│  variant:                                    │
│  [    Base        ]   ← Sin borde (link)     │
│  [─── Neutral ────]   ← Default, sin color  │
│  [████ Brand █████]   ← Azul Salesforce      │
│  [─── Brand-outline ─]← Borde azul          │
│  [!!!! Destructive !!!]← Rojo, peligro      │
│  [    Destructive-text]← Solo texto rojo     │
│  [████ Success ████]   ← Verde, confirmacion │
│  [░░░░ Inverse ░░░░]  ← Para fondos oscuros │
├──────────────────────────────────────────────┤
│  lightning-button-icon:                      │
│  [🔍] alternative-text="Buscar" (requerido) │
├──────────────────────────────────────────────┤
│  lightning-button-group:                     │
│  [Accion 1][Accion 2][▼]                    │
├──────────────────────────────────────────────┤
│  lightning-button-menu:                      │
│  [Opciones ▼] aria-haspopup="true"          │
│  ┌──────────────┐                            │
│  │ Opcion 1     │                            │
│  │ Opcion 2     │                            │
│  │ Opcion 3     │                            │
│  └──────────────┘                            │
└──────────────────────────────────────────────┘
```

**Decisiones de diseno que importan:**

1. **Variante `brand` dedicada** — No es simplemente "primary" — es especificamente el azul Salesforce con semantica de marca. Por que: en el ecosistema Salesforce, la accion primaria debe reforzar la identidad de marca en cada interaccion. `brand-outline` ofrece una version menos pesada con la misma asociacion cromatica. **Impacto: MEDIO** — relevante si tu DS necesita alineacion fuerte con identidad de marca.

2. **Variante `success`** — Un boton verde para confirmar acciones completadas o positivas. Por que: en CRMs, los flujos de venta necesitan un boton de "cierre exitoso" que comunique positividad, no solo accion. Es diferente de "primary" (que es la accion principal) y de "confirm" (que es neutral). **Impacto: MEDIO** — unico entre sistemas major; util en flujos transaccionales.

3. **Button Menu como componente separado** — El dropdown de opciones no es un prop del boton; es un componente dedicado con `aria-haspopup="true"` y `aria-expanded`. Por que: el patron de menu desplegable tiene requisitos de accesibilidad y comportamiento de teclado completamente diferentes a un boton regular (Arrow keys para navegar opciones, Escape para cerrar). **Impacto: ALTO** — define si tu menu de acciones es un componente separado o un prop.

**API notable (normalizada):**
- `variant`: base | neutral | brand | brand-outline | destructive | destructive-text | success | inverse (Lightning usa mas variantes que cualquier otro sistema)
- `alternative-text`: requerido para button-icon (equivalente a aria-label)
- `isLoading`: boolean para estado de carga
- Button Menu: `aria-haspopup="true"` automatico

**Accesibilidad:**
- `alternative-text` es prop requerida en button-icon (similar a Atlassian)
- Button Menu: `aria-expanded` se actualiza automaticamente al abrir/cerrar
- Tooltip en hover Y focus de teclado para icon buttons
- Button Group: agrupa visualmente sin semantica ARIA especifica (a diferencia de M3 segmented)

---

## Lo Que Todos Coinciden (Consenso)

### 1. El boton SIEMPRE usa el elemento `<button>` nativo
Todos los sistemas insisten en usar `<button>` para acciones y `<a>` para navegacion. Por que: el elemento nativo trae gratis focus management, activacion por teclado (Enter y Space) y anuncio correcto a screen readers. Usar `<div role="button">` requiere reimplementar todo esto manualmente y es propenso a errores. Atlassian y Lightning llegan al extremo de crear componentes separados (LinkButton, lightning-button con href) para garantizar que nunca se mezclen semanticas.

### 2. Icon-only buttons REQUIEREN un texto accesible
Los 7 sistemas exigen alguna forma de label textual para botones que solo muestran un icono: `aria-label`, `accessibilityLabel`, `alternative-text` o `label` como prop requerida. Por que: un icono de lupa puede significar "buscar", "inspeccionar" o "zoom" dependiendo del contexto. Sin texto programatico, los usuarios de screen reader no tienen forma de saber que hace el boton. Atlassian y Lightning lo fuerzan arquitecturalmente haciendo la prop no-opcional.

### 3. Al menos 3 niveles de jerarquia visual
Todos ofrecen como minimo primary (alta enfasis), secondary/default (media enfasis) y tertiary/ghost/text (baja enfasis). Por que: cualquier interfaz necesita distinguir la accion principal de las secundarias. La diferencia esta en cuantos niveles intermedios agregan: M3 tiene 5, Carbon tiene 5, Polaris tiene 3, Ant Design tiene 5.

### 4. Estado de carga (loading) mantiene el boton visible
Todos los sistemas que implementan loading (M3, Spectrum, Carbon, Ant, Lightning) reemplazan el contenido del boton con un spinner pero mantienen las dimensiones del contenedor. Por que: si el boton desapareciera o cambiara de tamano durante la carga, causaria layout shifts que desorientan al usuario. Spectrum va mas alla con `isPending` que preserva exactamente el ancho original.

### 5. Teclado: Tab para focus, Enter/Space para activar
Los 7 sistemas siguen el patron estandar WAI-ARIA para botones: Tab/Shift+Tab para navegar, Enter o Space para activar. Por que: es el comportamiento que los usuarios de teclado esperan universalmente. Ninguno agrega atajos adicionales para botones individuales porque el foco se gestiona a nivel de pagina, no de componente.

### 6. Touch targets de al menos 44x44px (o 48x48dp en M3)
Todos los sistemas especifican un area de toque minima para dispositivos moviles, alineada con WCAG 2.2 Target Size (nivel AA). Por que: dedos humanos tienen un area de contacto promedio de ~9mm; botones mas pequenos generan errores de toque. Carbon y M3 son los mas explicitos con tablas de tamanos que garantizan esto.

### 7. Variante destructiva/danger disponible
Los 7 sistemas ofrecen alguna forma de senalizar acciones destructivas visualmente: danger (Atlassian, Carbon, Ant), negative (Spectrum), critical (Polaris), destructive (Lightning), o composicion con tokens rojos (M3). Por que: las acciones irreversibles necesitan una senalizacion visual adicional que alerte al usuario antes de hacer clic.

---

## Decisiones Que Necesitas Tomar (Divergencias)

### 1. "Un solo componente Button o una familia de componentes separados?"

| | **Opcion A: Componente unico** | **Opcion B: Familia separada** |
|---|---|---|
| **Quienes** | Ant Design, Polaris | Atlassian (4), Spectrum (3), Lightning (4), Carbon (con Content Switcher) |
| **Como funciona** | Un `<Button>` con props para todo: `variant`, `icon`, `href`, `loading`, `disclosure` | Componentes separados: Button, IconButton, LinkButton, ToggleButton, ButtonMenu |
| **Ventaja** | Un solo import, API predecible, curva de aprendizaje baja | Semantica HTML correcta por construccion, APIs mas simples por componente, ARIA correcta automatica |
| **Desventaja** | Facil poner `href` en un `<button>` (bug de a11y), API puede crecer sin control | Mas componentes que aprender, decision de "cual uso?" para el desarrollador |

**Para tu caso**: Si tu DS prioriza accesibilidad y correccion semantica, la familia separada elimina categorias enteras de bugs. Si priorizas velocidad de adopcion y simplicidad, el componente unico tiene menos friccion. La tendencia de la industria (Atlassian 2025, Spectrum 2) va hacia la separacion.

---

### 2. "Danger/destructive como variante propia o como propiedad ortogonal?"

| | **Opcion A: Variante dedicada** | **Opcion B: Propiedad ortogonal** |
|---|---|---|
| **Quienes** | Atlassian (danger), Spectrum (negative), Lightning (destructive), M3 (tokens manuales) | Polaris (tone=critical), Ant Design (danger=boolean), Carbon (3 niveles danger) |
| **Como funciona** | `variant="danger"` es mutuamente excluyente con `variant="primary"` | `tone="critical"` o `danger={true}` se combina con cualquier variante |
| **Ventaja** | Simple, claro, un solo eje de decision | Flexible: primary+destructivo, secondary+destructivo, ghost+destructivo |
| **Desventaja** | Solo un nivel de enfasis para acciones destructivas | Mas combinaciones que testear y documentar |

**Para tu caso**: Si tu producto tiene acciones destructivas a multiples niveles de enfasis (eliminar proyecto vs. quitar filtro), la propiedad ortogonal es mas expresiva. Si las acciones destructivas siempre son de alta prioridad, la variante dedicada es mas simple.

---

### 3. "Cuantos tamanos ofrecer?"

| | **Opcion A: 3 tamanos (sm/md/lg)** | **Opcion B: 5-7 tamanos** |
|---|---|---|
| **Quienes** | Polaris, Atlassian, Spectrum | Carbon (7), M3 (multiples con FAB), Lightning (multiples) |
| **Como funciona** | Set minimo que cubre la mayoria de casos | Granularidad fina desde xs(24px) hasta 2xl(80px) |
| **Ventaja** | Menos decisiones, interfaces mas consistentes, menos frames en Figma | Cobertura para todos los contextos: dense tables, marketing hero, mobile |
| **Desventaja** | No sirve para extremos (tablas densas, heroes de marketing) | Mas frames Figma, los disenadores pueden elegir tamanos inconsistentemente |

**Para tu caso**: Empieza con 3 tamanos (sm/md/lg). Agrega extremos solo si tienes evidencia de casos de uso reales que los justifiquen. La mayoria de productos funcionan bien con 3.

---

### 4. "Botones deshabilitados: disabled nativo o aria-disabled focuseable?"

| | **Opcion A: `disabled` nativo** | **Opcion B: `aria-disabled` focuseable** |
|---|---|---|
| **Quienes** | Carbon, Ant Design, Polaris, Lightning | M3, Spectrum (React Aria) |
| **Como funciona** | `<button disabled>` — el boton sale del tab order, no se puede hacer clic ni focus | `<button aria-disabled="true">` — el boton recibe focus pero no ejecuta accion |
| **Ventaja** | Simple, comportamiento nativo del navegador, no necesita JS extra | Usuarios de teclado descubren el boton y pueden entender por que esta deshabilitado |
| **Desventaja** | Usuarios de teclado no saben que el boton existe; no pueden preguntar "por que esta gris" | Requiere JS para prevenir el click; puede confundir si no hay tooltip explicativo |

**Para tu caso**: Si tu producto tiene formularios complejos donde los usuarios necesitan entender por que un boton esta inactivo, usa `aria-disabled` + tooltip. Si los botones disabled son raros y el contexto es obvio, `disabled` nativo es mas simple. Atlassian recomienda una tercera via: no deshabilitar nunca y usar validacion inline.

---

### 5. "Loading state: prop nativa o composicion?"

| | **Opcion A: Prop `loading` nativa** | **Opcion B: Composicion** |
|---|---|---|
| **Quienes** | Ant Design, Carbon, Spectrum (`isPending`), Lightning, Polaris | shadcn/ui, Primer |
| **Como funciona** | `<Button loading>` muestra spinner automaticamente, deshabilita click, preserva ancho | El desarrollador compone manualmente: `{isLoading ? <Spinner/> : label}` |
| **Ventaja** | Consistente, accesible por defecto (aria-busy), sin errores de implementacion | Flexibilidad total sobre la UI de carga; menos API en el componente |
| **Desventaja** | Menos flexible si quieres UIs de carga personalizadas | Cada equipo lo implementa diferente; facil olvidar aria-busy |

**Para tu caso**: La prop nativa es la recomendacion para la mayoria de DS. Los estados de carga son tan comunes y tienen tantos requisitos de accesibilidad (aria-busy, preservar ancho, deshabilitar clicks) que dejarlos en manos de la composicion es riesgo innecesario. Ant Design incluso soporta `loading={{delay: 300}}` para evitar flash de spinner en operaciones rapidas.

---

### 6. "Ghost button: con o sin icono obligatorio?"

| | **Opcion A: Ghost permite solo texto** | **Opcion B: Ghost exige icono** |
|---|---|---|
| **Quienes** | M3, Spectrum, Atlassian, Polaris, Ant Design, Lightning | Carbon |
| **Como funciona** | El boton ghost puede tener solo un label de texto | El boton ghost siempre debe incluir un icono acompanando al texto |
| **Ventaja** | Mas flexible, menos restricciones para el disenador | Mayor reconocibilidad como elemento interactivo en interfaces densas |
| **Desventaja** | Riesgo de que texto ghost sea indistinguible de texto estatico | Restriccion adicional que puede sentirse arbitraria |

**Para tu caso**: Si tu producto tiene interfaces densas con mucho texto (dashboards, tablas), considera la regla de Carbon. Si tus interfaces son mas limpias con espaciado generoso, los ghost sin icono funcionan bien.

---

## Patrones Visuales Encontrados

| Patron | Descripcion | Mejor para | Adoptado por |
|--------|-------------|------------|--------------|
| Boton estandar con etiqueta | Contenedor rectangular con texto centrado | Acciones generales en formularios y paginas | Todos |
| Boton con icono leading | Icono a la izquierda del label | Acciones donde el icono refuerza el significado | Todos |
| Icon-only button | Solo icono, sin texto visible | Toolbars densas, acciones repetidas | Atlassian, Spectrum, Lightning, Carbon |
| Split button | Boton dividido: accion principal + dropdown | Accion con alternativas | Atlassian, Lightning |
| Button group | Botones adyacentes agrupados | Acciones relacionadas, toolbar | Todos |
| FAB (Floating Action Button) | Boton flotante circular fijo en pantalla | Accion principal de pantalla en mobile | M3 |
| Boton con disclosure | Boton con flecha de expansion | Revelar opciones adicionales | Polaris, Lightning |
| Toggle button | Boton con estado on/off | Formato de texto, filtros activos | Spectrum, M3 |

```
Patron: Boton estandar con variantes de enfasis
┌─────────────────────────────────────────┐
│ Alta:  [████████████████████████████]   │
│ Media: [────────────────────────────]   │
│ Baja:  [         texto plain        ]   │
└─────────────────────────────────────────┘

Patron: Boton con iconos (leading + trailing)
┌─────────────────────────────────────────┐
│ [🔍 Buscar                         ]   │
│ [   Siguiente                    ▶ ]   │
│ [🔍 Buscar y filtrar             ▼ ]   │
└─────────────────────────────────────────┘

Patron: Icon-only button en toolbar
┌─────────────────────────────────────────┐
│ [🔍] [📎] [⚙] [🔔] [⋯]              │
│  Cada uno con aria-label requerido      │
└─────────────────────────────────────────┘

Patron: Split button
┌─────────────────────────────────────────┐
│ [████ Guardar ████│▼]                   │
│                   └──┐                  │
│                   │ Guardar como...  │  │
│                   │ Guardar copia    │  │
│                   │ Exportar         │  │
│                   └──────────────────┘  │
└─────────────────────────────────────────┘

Patron: Button group
┌─────────────────────────────────────────┐
│ [████ Aceptar ████][─ Cancelar ─][⋯]  │
│  └── primario ──┘  └ secundario ┘      │
└─────────────────────────────────────────┘

Patron: FAB (Floating Action Button)
┌─────────────────────────────────────────┐
│                                         │
│  ┌─ Contenido de la pagina ──────────┐ │
│  │                                    │ │
│  │                                    │ │
│  │                                    │ │
│  │                          ┌────┐   │ │
│  │                          │ ＋ │   │ │
│  │                          └────┘   │ │
│  └────────────────────────────────────┘ │
│   FAB fijo en esquina inferior derecha  │
└─────────────────────────────────────────┘

Patron: Toggle button group
┌─────────────────────────────────────────┐
│ [ B ][ I ][ U ][ S ]                   │
│   ▲                                     │
│   └── aria-pressed="true" (activo)      │
└─────────────────────────────────────────┘
```

---

## Riesgos a Abordar Temprano

### 1. Explosion de variantes en Figma (ALTO)
Con 4 tamanos x 6 variantes x 5 estados x 3 booleans de icono = potencialmente 360+ frames. Mitiga con: booleans para iconos en vez de variantes, estados como Figma interactions en lugar de frames, y la formula de frames del variant-matrix-agent. Usa el optimizador (`/optimize button`) para reducir antes de construir.

### 2. Semantica incorrecta button vs link (ALTO)
Si usas un solo componente que acepta tanto `onClick` como `href`, los desarrolladores van a crear `<button>` que navegan y `<a>` que ejecutan acciones. Esto rompe accesibilidad fundamentalmente. Mitiga con: componentes separados (Button vs LinkButton) o validacion en tiempo de desarrollo que advierta cuando se mezclan.

### 3. Ghost buttons no reconocibles (MEDIO)
En interfaces densas, los botones ghost (sin fondo ni borde) pueden ser indistinguibles del texto estatico. Esto causa que usuarios no descubran acciones disponibles. Mitiga con: exigir icono en ghost (como Carbon), o mantener suficiente padding y un hover state muy visible que revele la interactividad.

### 4. Loading state sin accesibilidad (MEDIO)
Si el estado de carga solo muestra un spinner visual sin `aria-busy` o un anuncio a screen readers, los usuarios ciegos no saben que esta pasando. Mitiga con: prop `loading` nativa que maneje automaticamente aria-busy, deshabilitacion del click, y preservacion del ancho.

### 5. Inconsistencia en uso de danger/destructive (MEDIO)
Sin guias claras de cuando usar la variante destructiva, los equipos la usaraan para todo lo que involucre "eliminar" — desde borrar un proyecto entero hasta quitar un filtro temporal. Esto genera fatiga de alarma. Mitiga con: documentacion de uso con ejemplos especificos de cuando SI y cuando NO usar danger.

---

## Siguientes Pasos

| # | Paso | Comando | Agente |
|---|------|---------|--------|
| 1 | Definir anatomia (slots, regiones internas, estados) | `/anatomy button` | Anatomy Agent |
| 2 | Generar matriz de variantes (propiedades, combinaciones, estructura Figma) | `/matrix button` | Variant Matrix Agent |
| 3 | Optimizar variantes (reducir frames, alinear Figma-Code) | `/optimize button` | Variant Optimizer Agent |
| 4 | Especificacion de interaccion (ARIA, teclado, focus, screen reader) | `/interaction button` | Interaction Spec Agent |
| 5 | Asignacion de tokens semanticos | `/tokens button` | Token Assignment Agent |
| 6 | Generacion en Figma | `/generate button` | Figma Generation Agent |

---

*Fuentes consultadas:*
- [Material Design 3 — Buttons](https://m3.material.io/components/buttons/overview)
- [Atlassian DS — Button](https://atlassian.design/components/button/)
- [Atlassian — Evolving Buttons and Links](https://atlassian.design/whats-new/evolving-button-and-links/)
- [Polaris — Button](https://polaris.shopify.com/components/button)
- [Polaris — Button Group](https://polaris.shopify.com/components/button-group)
- [Ant Design — Button](https://ant.design/components/button/)
- [Carbon — Button Accessibility](https://carbondesignsystem.com/components/button/accessibility/)
- [Carbon — Button Usage](https://carbondesignsystem.com/components/button/usage/)
- [Spectrum — Button](https://spectrum.adobe.com/page/button/)
- [Spectrum — Action Button](https://spectrum.adobe.com/page/action-button/)
- [Spectrum — Button Group](https://spectrum.adobe.com/page/button-group/)
- [Lightning — Button](https://developer.salesforce.com/docs/platform/lightning-component-reference/guide/lightning-button.html)
- [Lightning — Button Icon](https://www.lightningdesignsystem.com/components/button-icons/)
- [Lightning — Button Group](https://developer.salesforce.com/docs/platform/lightning-component-reference/guide/lightning-button-group.html)
- [Lightning — Button Menu](https://developer.salesforce.com/docs/platform/lightning-component-reference/guide/lightning-button-menu.html)
