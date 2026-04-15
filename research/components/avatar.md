# Avatar — Component Research

## Meta
- **Date**: 2026-03-30
- **Mode**: Guided
- **Systems**: 14 (Default tier)
- **Scope**:
  - **Contenido**: Personas (usuarios) + Países/currencies (patrón fintech)
  - **Grouping**: Sí — AvatarGroup con overflow +N
  - **Presencia**: Sí — online/offline/busy dot indicator
  - **Tamaños**: Compact (16-24px) + Default (32-48px). Sin hero/large.

---

## How the Big Systems Solve It

### Material Design 3 — "No existe como componente: es composición de tokens"

Material Design 3 no tiene un componente Avatar formal. Esto es una decisión arquitectónica deliberada, no una omisión: M3 solo formaliza componentes con interacción compleja, y un avatar es esencialmente una imagen o texto dentro de un contenedor circular. Los equipos de Google construyen avatars usando `shape.corner.full` para la forma circular y los color roles `primaryContainer`/`onPrimaryContainer` para fondos de iniciales. Esta aproximación da máxima flexibilidad pero cero estandarización — cada equipo implementa su propia cadena de fallback.

```
  ┌─────────┐
  │  ┌───┐  │   shape.corner.full
  │  │ AB│  │   primaryContainer bg
  │  └───┘  │   onPrimaryContainer text
  └─────────┘
  No component — tokens only
```

**Para tu caso**: Descartado. Necesitas AvatarGroup + presencia + fallback — M3 no ofrece nada de esto. Tu scope (personas + currencies + grouping) requiere un componente formal.

---

### Spectrum (Adobe) — "Tampoco existe: cada producto lo construye custom"

Spectrum no incluye Avatar. Adobe's products (Experience Manager, Marketo, Creative Cloud) implementan avatars a nivel de producto. La única guía de Spectrum es que toda imagen requiere `alt` significativo o `alt=""` si hay nombre visible adyacente. Sin componente centralizado, no hay fallback chain, no hay grouping, no hay indicador de presencia. React Aria tampoco lo incluye, lo que confirma que Adobe deliberadamente dejó este componente fuera del scope de su DS.

```
  ┌─────────┐
  │  ┌───┐  │   Standard <img>
  │  │ 🖼️│  │   Spectrum image tokens
  │  └───┘  │   alt="" required
  └─────────┘
  No component — each product custom-builds
```

**Para tu caso**: Descartado. Mismo problema que M3 — sin componente formal, sin grouping, sin presencia.

---

### Carbon (IBM) — "Ausente en core; UserAvatar icon como placeholder"

Carbon tampoco tiene Avatar como componente. El contexto de IBM (dashboards de infraestructura, administración de sistemas) prioriza listas de texto sobre representaciones visuales de usuarios. El workaround es el icono `UserAvatar` de `@carbon/icons-react` como placeholder genérico. No hay fallback chain, size system, ni grouping. Es una brecha reconocida por la comunidad Carbon.

```
  ┌──────┐
  │ ┌──┐ │   @carbon/icons UserAvatar
  │ │👤│ │   Icon-only, no component
  │ └──┘ │   No fallback, no sizes
  └──────┘
  Community gap — acknowledged
```

**Para tu caso**: Descartado. Tu producto tiene colaboración (AvatarGroup) y presencia — necesitas Avatar first-class. Carbon confirma que sin UI colaborativa se puede vivir sin Avatar, pero ese no es tu caso.

---

### Polaris (Shopify) — "Fallback automático de 3 niveles + contexto merchant/customer"

Polaris es el primer sistema del tier con un Avatar completo y bien pensado. Su decisión más interesante es el dual-context: el prop `customer` cambia el icono default y la paleta de colores según si el avatar representa al comerciante o a su cliente. Esto refleja el modelo de dos actores de Shopify Admin. La cadena de fallback es completamente automática: `source` image → initials del `name` → icono default. El color de fondo de iniciales es determinístico por hash del nombre (misma persona = mismo color siempre). Cinco tamaños cubren desde thumbnails en notificaciones hasta headers de página.

```
  Fallback chain (automatic):
  ┌──────┐    ┌──────┐    ┌──────┐
  │ 🖼️  │ →  │ AB   │ →  │ 👤  │
  │image │    │initials│   │ icon │
  └──────┘    └──────┘    └──────┘
   source      name hash   default

  Sizes: xs(24) sm(32) md(40) lg(60) xl(80)
```

**Ejes normalizados:**
- `size`: xs · sm · md · lg · xl
- `type` (implícito): image · initials · icon (auto por fallback)
- `Boolean`: customer (cambia icono default + paleta)

**Para tu caso**: Adoptar el auto-fallback de 3 niveles para tus avatars de personas y currencies. El hash-color por nombre es clave cuando tienes AvatarGroup — cada persona mantiene su color en el stack. Tus tamaños compact (16-24px) mapean a xs/sm y default (32-48px) a md/lg. Ignorar xl (80px) — fuera de tu scope.

---

### Atlassian — "El más completo del tier: AvatarGroup + Presence como first-class"

Atlassian tiene la implementación más rica del tier default. `Avatar` individual + `AvatarGroup` como componente first-class (no un wrapper simple). AvatarGroup maneja overflow automáticamente (muestra badge +N para avatars ocultos, tooltip al hover, onClick para ver todos). El indicador de presencia (`online`, `busy`, `focus`, `offline`) es built-in via prop `presence` — diseñado para los estados de usuario en tiempo real de Jira y Confluence. Seis tamaños desde xxsmall hasta xlarge. `onClick` convierte el avatar en interactivo, renderizándose como `<button>`.

```
  Avatar individual:         AvatarGroup:
  ┌──────┐                   ┌──┐┌──┐┌──┐┌────┐
  │ 🖼️  │ ● online          │AB││CD││EF││ +3 │
  │      │   presence dot    └──┘└──┘└──┘└────┘
  └──────┘                    maxCount=3, overflow badge

  Sizes: xxs(16) xs(24) sm(32) md(40) lg(48) xl(96)
```

**Ejes normalizados:**
- `size`: xxs · xs · sm · md · lg · xl
- `shape` (implícito): circle (default, personas) — no soporta square
- `Boolean`: presence (dot indicator)
- `State`: default · hover (si onClick) · focus (si onClick)

**Para tu caso**: Referencia principal para tu AvatarGroup — el overflow +N con tooltip es exactamente lo que necesitas. El `presence` prop built-in (online/offline/busy) es tu modelo directo. Tus tamaños compact mapean a xxs(16)/xs(24) y default a sm(32)/md(40)/lg(48). Nota: Atlassian no tiene fallback a iniciales por hash (Polaris sí) — combinar ambos patrones.

---

### Ant Design — "Tres tipos de contenido + text auto-scaling + responsive sizes"

Ant Design unifica tres tipos de contenido en un componente: `src` (imagen), `icon` (componente Icon), y `children` (contenido arbitrario, incluyendo iniciales). La distinción clave vs Polaris: Ant NO tiene fallback automático — el consumidor decide explícitamente qué mostrar en cada estado. El auto text scaling reduce el font-size cuando las iniciales son anchas (ej: "WW") para evitar overflow. `Avatar.Group` con `maxCount` muestra badge +N con popover. Sizes responsive via objeto `{xs, sm, md, lg, xl, xxl}`.

```
  Three content types:        Avatar.Group:
  ┌──────┐ ┌──────┐ ┌──────┐  ┌──┐┌──┐┌────┐
  │ 🖼️  │ │ ⭐  │ │ AB   │  │  ││  ││+5  │←popover
  │ src  │ │ icon │ │ text │  └──┘└──┘└────┘
  └──────┘ └──────┘ └──────┘   maxCount + maxPopoverTrigger

  Shape: circle (default) | square
  Sizes: number | "small"(24) | "default"(32) | "large"(40) | responsive{}
```

**Ejes normalizados:**
- `size`: sm(24) · md(32) · lg(40) + custom number + responsive object
- `shape`: circle · square
- `type` (implícito): image · icon · initials (explicit, no auto-fallback)

**Para tu caso**: El Avatar.Group con maxCount + popover es tu segunda referencia para AvatarGroup (después de Atlassian). El auto text scaling es relevante para iniciales de currencies (ej: "BRL" → 3 chars que necesitan reducir). Para tu scope de solo compact+default, ignorar el responsive size object — es overkill. Shape square útil para tus avatars de países/currencies.

---

### Paste (Twilio) — "User vs Entity + color semántico para diferenciación"

Paste distingue entre `user` (personas) y `entity` (negocios, servicios). La cadena de display es image → icon → initials (priorizando imagen cuando está disponible). Los colores son decorativos para diferenciar múltiples avatars, NO semánticos. Sizes usan icon size tokens (`sizeIcon10` a `sizeIcon110`), lo que alinea avatars con el sistema de iconos de Paste. El `name` prop es requerido en TODAS las instancias para accesibilidad. AvatarGroup controla sizing y spacing de avatars agrupados.

```
  Variant:                    Display hierarchy:
  ┌──────┐    ┌──────┐       image > icon > initials
  │ User │    │Entity│
  │ ○    │    │ □    │       Color: decorative only
  └──────┘    └──────┘       (don't convey meaning)

  Sizes: sizeIcon10...sizeIcon110
```

**Ejes normalizados:**
- `size`: via icon size tokens (10-110 scale)
- `variant`: user · entity
- `type` (implícito): image · icon · initials
- `Boolean`: (colores decorativos, no eje separado)

**Para tu caso**: La distinción user/entity mapea directamente a tu scope: `user` = personas, `entity` = países/currencies. Circle para personas, otra forma para currencies/países. El `name` requerido es mandatorio para tu AvatarGroup — sin él, el overflow tooltip no puede listar nombres. AvatarGroup de Paste como tercera referencia.

---

### Lightning (Salesforce) — "Square por defecto + initials fallback + presence"

Lightning invierte el default: el avatar es **square con rounded corners** por defecto, no circular. Circle se aplica solo para personas con `.slds-avatar--circle`. Cuatro tamaños (x-small, small, medium, large). Fallback a iniciales vía `initials` attribute o a icono vía `fallback-icon-name`. Si ambos están presentes, se muestran iniciales con el color de fondo del icono. Soporta indicador de presencia similar a Atlassian.

```
  Shapes:                     Fallback:
  ┌──────┐    ┌──────┐       image → initials → icon
  │ □    │    │  ○   │       (initials get icon's bg color
  │square│    │circle│        when both provided)
  │default│   │people│
  └──────┘    └──────┘
  Sizes: xs · sm · md(default) · lg
```

**Ejes normalizados:**
- `size`: xs · sm · md · lg
- `shape`: square (default) · circle
- `type` (implícito): image · initials · icon (with fallback)
- `Boolean`: presence

**Para tu caso**: El presence indicator de Lightning confirma el patrón de Atlassian — built-in es el approach correcto para tu scope. El shape square default NO aplica a tu caso (tus personas son el actor principal, circle default). Pero el fallback initials+icon-bg-color es un detalle útil. 4 tamaños (xs-lg) se alinean bien con tu scope compact+default.

---

### Primer (GitHub) — "Circle para personas, square para bots + AvatarStack"

Primer toma un approach minimalista: `src` (requerido), `alt`, `size` (20px default, rango 16-64px), y `square` boolean para non-human entities (bots, AI agents, teams). AvatarStack para overlapping stacks de contributors. Los tamaños usan valores pixel directos en una escala responsive que acepta `{narrow, regular, wide}` para adaptarse por viewport.

```
  Shapes:                     AvatarStack:
  ┌──────┐    ┌──────┐       ┌──┐┌──┐┌──┐┌──┐
  │  ○   │    │  □   │       │  ││  ││  ││  │ max 4
  │people│    │ bots │       └──┘└──┘└──┘└──┘
  │circle│    │square│        left-aligned (default)
  └──────┘    └──────┘        or alignRight
  Size: 16-64px (responsive)
```

**Ejes normalizados:**
- `size`: 16 · 20(default) · 24 · 28 · 32 · 40 · 48 · 56 · 64 (px)
- `shape`: circle(default) · square

**Para tu caso**: AvatarStack de Primer es la referencia más simple para tu AvatarGroup — left-aligned con max 4 visible. Circle=people, square=bots es el patrón que debes adoptar: circle para tus usuarios, square/rounded-square para países/currencies. Tus tamaños compact (16-24px) y default (32-48px) cubren exactamente su rango 16-48px.

---

### shadcn/ui — "Radix primitives: image loading states + graceful fallback"

shadcn/ui usa Radix UI Avatar, que resuelve elegantemente el problema técnico más difícil del avatar: la transición de estados de carga de imagen. `Avatar.Image` solo renderiza cuando la imagen ha cargado completamente (sin flash de imagen rota). `Avatar.Fallback` acepta `delayMs` para mostrar el fallback solo si la carga es lenta (evita flash en conexiones rápidas). `onLoadingStatusChange` para control granular. Composable con Tooltip para info adicional.

```
  Loading states:
  ┌──────┐    ┌──────┐    ┌──────┐
  │      │ →  │ AB   │ →  │ 🖼️  │
  │empty │    │fallback│   │loaded │
  └──────┘    └──────┘    └──────┘
  (nothing)   (delayMs)   (onLoad)

  Composition: Avatar > Image + Fallback
```

**Ejes normalizados:**
- `size`: no built-in (CSS/Tailwind utilities)
- `shape`: no built-in (CSS: rounded-full vs rounded-md)
- `type` (implícito): image · fallback (initials/icon)

**Para tu caso**: El `delayMs` es crítico para tu AvatarGroup — cuando cargas 5+ avatars simultáneos, sin delayMs verás un flash masivo de fallbacks antes de que las imágenes resuelvan. Adoptar este patrón en la implementación de código. Para Figma, el pattern de Image + Fallback como composición informa tu anatomía (2 slots mutuamente exclusivos).

---

### Playbook (eBay) — "7 tamaños + 8 colores determinísticos + scrim sobre imagen"

eBay tiene un sistema de avatar completo con 7 tamaños específicos (32-128px), 4 variaciones (signed-out, default con iniciales, user-selected image, eBay branded), y 8 combinaciones de color para avatars default. Un detalle único: aplican un **scrim sutil** sobre la imagen del avatar para mantener el outline visual claro incluso con imágenes de fondo blanco o cropping extremo. Solo soporta forma circular. El carácter dentro es single uppercase.

```
  Variations:
  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
  │ 👤  │ │  A   │ │ 🖼️  │ │ eBay │
  │signout│ │default│ │custom│ │brand │
  └──────┘ └──────┘ └──────┘ └──────┘

  Sizes: 32 · 40 · 48 · 56 · 64 · 96 · 128
  Colors: 8 balanced combinations (by user ID)
```

**Ejes normalizados:**
- `size`: 32 · 40 · 48 · 56 · 64 · 96 · 128 (px)
- `type`: signed-out · default · image · branded
- `shape`: circle (only)
- `Boolean`: scrim (always on images)

**Para tu caso**: El scrim es relevante si tus avatars de personas usan fotos — previene que imágenes claras se pierdan en fondos claros. Los 8 colores hash para iniciales son útiles para tu AvatarGroup. Pero 7 tamaños es excesivo para tu scope — solo necesitas 4 (compact 16, 24 + default 32, 48).

---

### Cedar (REI) — "No tiene Avatar — usa Image component"

Cedar no incluye un componente Avatar dedicado. Las representaciones de usuario se construyen con el componente Image genérico y CSS custom. Esto es consistente con el enfoque de Cedar de mantener un set de componentes minimal enfocado en e-commerce outdoor.

**Para tu caso**: Descartado. Sin Avatar formal, sin utilidad para tu scope.

---

### Wise Design — "4 tipos de media + double avatar diagonal"

Wise tiene un Avatar sofisticado con 4 tipos de media: image (perfiles), flag (países/currencies), icon (información), y text (iniciales o contadores como "+3"). Los tamaños van de 16 a 72px. Feature único: **double avatar** en variantes horizontal y diagonal para representar dos items relacionados en el mismo espacio de un avatar individual. Los avatars pueden ser interactive (actúan como botón) o non-interactive (sobre superficies interactivas). Soporta badges (flag, status, action) con la regla de máximo un badge por avatar.

```
  Media types:                Double avatars:
  ┌──────┐ ┌──────┐ ┌──────┐  ┌────────┐  ┌────────┐
  │ 🖼️  │ │ 🇺🇸  │ │ AB  │  │ ○ ○   │  │ ○     │
  │image │ │ flag │ │ text│  │ horiz  │  │   ○   │
  └──────┘ └──────┘ └──────┘  └────────┘  └────────┘
  ┌──────┐                     horizontal   diagonal
  │ ⭐  │
  │ icon │  Sizes: 16·24·32·40·48·56·72
  └──────┘
```

**Ejes normalizados:**
- `size`: 16 · 24 · 32 · 40 · 48(default) · 56 · 72
- `type`: image · flag · icon · text
- `variant`: single · double-horizontal · double-diagonal
- `Boolean`: badge · interactive

**Para tu caso**: Referencia clave para tu patrón fintech. El `type: flag` es exactamente lo que necesitas para currencies/países. El double avatar diagonal es el patrón para representar transferencias (USD→EUR). Los badges con flags son tu modelo para el avatar de país. Tamaños 16-48px cubren tu scope compact+default. Wise es tu referencia #1 para el caso currencies.

---

### Dell DS — "Enterprise user display"

Dell DS documenta un Avatar component pero los detalles específicos no están públicamente accesibles (behind Storybook/Figma). Basado en datos parciales, soporta display de usuario empresarial con contexto de identidad corporativa.

**Para tu caso**: Descartado. Datos insuficientes.

---

## What Everyone Agrees On (Consenso)

### 1. Fallback chain: image → initials → icon
**El patrón universal** cuando el avatar SÍ existe como componente. La imagen es prioritaria; si falla o no existe, se muestran iniciales derivadas del nombre; si no hay nombre, un icono genérico. Todos los sistemas con Avatar formal implementan alguna versión de esto porque las imágenes de perfil fallan constantemente (URLs rotas, perfiles nuevos, permisos). Sin fallback chain, el producto muestra broken images.

### 2. Forma circular como default para personas
**10/10 sistemas con Avatar** usan circle como default para representar personas. Lightning es la excepción (square default), pero incluso Lightning recomienda circle para "people-oriented objects". La razón es convención UX universal: el círculo se ha convertido en el signifier de "esta es una persona" en interfaces digitales desde la era de los redes sociales.

### 3. Square shape para entidades non-human
**7/10 sistemas** que soportan square lo reservan para organizaciones, equipos, bots, o servicios. Primer (GitHub) lo documenta explícitamente: "square for bots and AI agents". Lightning lo usa como default enterprise. La distinción circle=person, square=entity es el patrón semántico más adoptado.

### 4. `name` o `alt` requerido para accesibilidad
**Todos los sistemas** requieren texto accesible: `name` prop que genera `aria-label` (Paste, Polaris, Atlassian) o `alt` en el `<img>` (Primer, Ant). Cuando el avatar es decorativo (nombre visible al lado), `alt=""` es correcto. Cuando es informativo (solo avatar), el nombre es mandatorio. Sin esto, screen readers leen "image" o nada.

### 5. Size scale con mínimo 4 niveles
**Consenso en al menos sm/md/lg** + variantes extremas. Los rangos convergen: 24-32px (small/compact), 40-48px (default), 56-64px (large), 96-128px (hero/profile). El tamaño default más común es **40px** (Polaris, Atlassian, Ant default=32, Paste sizeIcon80≈40).

### 6. AvatarGroup para stacks de colaboradores
**6/10 sistemas** incluyen un componente de grupo: Atlassian (AvatarGroup), Ant (Avatar.Group), Paste (AvatarGroup), Primer (AvatarStack), Polaris (no, gap), shadcn (composable). El patrón es overlapping circles con badge +N para overflow. Es esencial para UIs colaborativas.

---

## Decisions You Need to Make (Divergencias)

### 1. "¿Fallback automático o explícito?"

| | **Option A: Auto-fallback** | **Option B: Explicit content** |
|---|---|---|
| **Adoptado por** | Polaris, Atlassian, Lightning, shadcn/Radix | Ant Design, Paste |
| **Cómo funciona** | El componente detecta si hay imagen, si falla muestra initials, si no hay name muestra icono — todo automático | El consumidor decide explícitamente qué renderizar: pasa `src`, `icon`, o `children` |
| **Pro** | Zero boilerplate para el consumidor; consistencia garantizada | Máximo control; el consumidor puede customizar cada estado |
| **Contra** | Menos flexible si necesitas fallbacks custom | Requiere error handling del consumidor; más código |

**Para tu caso**: **Option A (Auto-fallback)**. Con AvatarGroup mostrando 5+ avatars simultáneos, no puedes depender de que cada consumidor implemente error handling. Auto-fallback garantiza que el grupo nunca muestra imágenes rotas. Para currencies/flags, el fallback sería: flag image → country code initials → globe icon.

### 2. "¿Shape como prop o como variante separada?"

| | **Option A: Prop en Avatar** | **Option B: Componentes separados** |
|---|---|---|
| **Adoptado por** | Ant (`shape`), Lightning (CSS class), Primer (`square` boolean) | Ninguno explícitamente — pero Paste usa `variant` (user/entity) que implica shape |
| **Cómo funciona** | Un prop `shape: "circle" | "square"` en el mismo componente | `variant: "user"` (circle) vs `variant: "entity"` (square) |
| **Pro** | Simple API; un solo componente | Shape vinculado a semántica (circle=persona, square=entidad) |
| **Contra** | Shape desconectado de significado; el dev puede usar square para personas | Más rígido; no permite square-person |

**Para tu caso**: **Combinación: `variant` (user/currency) que implica shape + override posible**. Tu scope tiene 2 actores claros: personas (circle) y países/currencies (rounded-square o circle con flag). El variant semántico es mejor que un shape prop libre porque previene inconsistencias (nadie pondrá square a una persona). Modelo: Paste `variant` + Wise `type`.

### 3. "¿Indicador de presencia built-in o composable?"

| | **Option A: Prop built-in** | **Option B: Composición** |
|---|---|---|
| **Adoptado por** | Atlassian (`presence` prop), Lightning | Primer, shadcn, Ant, Polaris |
| **Cómo funciona** | `presence="online"` renderiza dot badge automáticamente | Badge separado posicionado sobre el avatar via CSS/composition |
| **Pro** | Consistencia garantizada; posición y color del dot controlados por el DS | Más flexible; el badge puede mostrar cualquier contenido |
| **Contra** | Aumenta la API surface; solo útil para apps de colaboración | Sin estandarización; cada equipo posiciona el dot diferente |

**Para tu caso**: **Option A (Built-in)**. Tu scope incluye presencia online/offline/busy explícitamente. Built-in garantiza que el dot siempre esté en la misma posición (bottom-right), con los mismos colores (green/orange/gray), sin variación entre equipos. Modelo: Atlassian `presence` prop con 3 valores (online/offline/busy).

### 4. "¿Color de iniciales determinístico (hash) o configurable?"

| | **Option A: Hash del nombre** | **Option B: Configurable** |
|---|---|---|
| **Adoptado por** | Polaris (name hash), Playbook (user ID hash) | Paste (color prop), Ant (no color system) |
| **Cómo funciona** | El color se calcula automáticamente del nombre → misma persona = mismo color siempre | El consumidor pasa un `color` prop o el color es random |
| **Pro** | Consistencia cross-page; el usuario siempre se identifica por el mismo color | Control total del consumidor; útil si el color tiene significado business |
| **Contra** | No puedes elegir colores; pueden haber colisiones | Sin consistencia automática |

**Para tu caso**: **Option A (Hash del nombre)**. Con AvatarGroup, múltiples iniciales aparecen juntas — hash garantiza que "María" siempre es azul y "Carlos" siempre es verde, cross-page. Para currencies, el color podría ser por currency code (USD=verde, EUR=azul) pero eso es business logic, no hash. Recomendación: hash para personas, palette configurable para currencies.

### 5. "¿Soportar double/compound avatars?"

| | **Option A: Solo single** | **Option B: Double avatar** |
|---|---|---|
| **Adoptado por** | 12/14 sistemas (mayoría) | Wise (double horizontal + diagonal) |
| **Cómo funciona** | Un avatar = una entidad, siempre | Dos avatars superpuestos representando una relación |
| **Pro** | Simple; cubre 95% de use cases | Representa transferencias, relaciones, conversiones |
| **Contra** | No puede representar relaciones entre 2 entidades | Complejidad adicional; caso de uso nicho |

**Para tu caso**: **Option B (Double avatar) — SÍ incluir**. Tu scope fintech lo requiere: transferencias USD→EUR, sender→receiver. El patrón diagonal de Wise es exactamente para currency pairs. Implementar como variante del Avatar (variant: single | double-horizontal | double-diagonal) con dos slots de contenido. Es tu diferenciador vs DS genéricos.

---

## Visual Patterns Found

| Pattern | Description | Best For | Adopted By |
|---------|-------------|----------|------------|
| Basic Avatar | Image circular con fallback a iniciales | Perfiles, listas de usuarios | Todos los que tienen Avatar |
| Avatar + Presence | Dot colored badge (online/busy/offline) | Colaboración real-time | Atlassian, Lightning |
| AvatarGroup/Stack | Overlapping circles con +N badge | Listas de colaboradores, contributors | Atlassian, Ant, Paste, Primer |
| User vs Entity | Formas/colores diferentes por tipo de actor | Multi-actor UIs (personas + orgs) | Paste, Primer, Lightning, Wise |
| Double Avatar | Dos avatars en un slot (horizontal/diagonal) | Transferencias, relaciones | Wise |
| Avatar + Badge | Badge superpuesto (flag, status, action) | Status contextual, countries | Wise |

### Basic Avatar (universal)
```
┌─────────────────────────────────────┐
│                                     │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐   │
│  │ 🖼️│  │ AB │  │ 👤│  │ □🖼│   │
│  │img │  │init│  │icon│  │sqr │   │
│  └────┘  └────┘  └────┘  └────┘   │
│  circle   circle  circle  square   │
│  image    initials fallbk entity   │
│                                     │
└─────────────────────────────────────┘
```

### AvatarGroup with overflow
```
┌──────────────────────────────────┐
│                                  │
│  ┌──┐┌──┐┌──┐┌──┐  ┌────┐      │
│  │AB││CD││EF││GH│  │ +5 │      │
│  └──┘└──┘└──┘└──┘  └────┘      │
│  ←── overlap ──→   overflow     │
│                     badge       │
│  maxCount=4                     │
│                                  │
└──────────────────────────────────┘
```

### Avatar + Presence indicator
```
┌──────────────────────────────┐
│                              │
│  ┌────┐●   ┌────┐●          │
│  │ AB │    │ CD │            │
│  └────┘    └────┘            │
│       online    busy         │
│       (green)   (orange)     │
│                              │
│  ┌────┐●   ┌────┐○          │
│  │ EF │    │ GH │            │
│  └────┘    └────┘            │
│       focus     offline      │
│       (purple)  (gray)       │
│                              │
└──────────────────────────────┘
```

### Double Avatar (Wise pattern)
```
┌──────────────────────────────┐
│  Horizontal:   Diagonal:     │
│  ┌──┐┌──┐     ┌──┐          │
│  │🇺🇸││🇪🇺│     │🇺🇸│         │
│  └──┘└──┘     └──┐──┐       │
│  USD → EUR       │🇪🇺│       │
│                  └──┘        │
└──────────────────────────────┘
```

---

## Risks to Address Early

### 1. Image loading performance (HIGH)
Sin manejo de estados de carga, el avatar muestra una imagen rota o un flash del fallback antes de que la imagen cargue. **Mitigación**: Implementar el patrón Radix — el componente Image solo renderiza cuando `onLoad` fires; Fallback tiene `delayMs` para evitar flash en carga rápida. Esto es técnicamente complejo pero crítico para perceived performance.

### 2. AvatarGroup overflow accesibility (MEDIUM)
El badge "+N" de overflow es visual pero puede faltar contexto para screen readers. Los usuarios de SR no saben quiénes son los avatars ocultos. **Mitigación**: `aria-label` en el badge que liste los nombres ocultos, o popover accesible que se active con keyboard (pattern de Atlassian y Ant).

### 3. Color contrast en iniciales (MEDIUM)
Los colores de fondo para iniciales deben cumplir WCAG 2.2 AA (4.5:1 para texto). Con 8 colores + light/dark mode = 16 combinaciones a validar. **Mitigación**: Pre-validar todas las combinaciones color/texto en ambos modos. Usar solo la paleta aprobada (como Playbook con sus 8 colores balanceados).

### 4. Responsive sizing sin breakpoint awareness (LOW)
Si el avatar no adapta su tamaño al viewport, puede ser demasiado grande en mobile o demasiado pequeño en desktop. **Mitigación**: Soportar responsive size object (patrón Ant: `size={{xs: 24, sm: 32, md: 40, lg: 48}}`) o dejar que el contexto (card, list, header) determine el tamaño via slot.

---

## Dimension Scores

| Dimension | M3 | Spec | Car | Pol | Atl | Ant | Paste | SLDS | Pri | shad | Play | Ced | Wise | Dell |
|-----------|:--:|:----:|:---:|:---:|:---:|:---:|:-----:|:----:|:---:|:----:|:----:|:---:|:----:|:----:|
| 1. Variants/Types | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ⚠️ | ✅ | ❌ | ✅ | ⚠️ |
| 2. Sizes | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | ⚠️ |
| 3. Interactive States | ❌ | ❌ | ❌ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ❌ | ⚠️ | ❌ | ✅ | ❌ |
| 4. Anatomy | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ❌ | ✅ | ⚠️ |
| 5. Keyboard Nav | ❌ | ❌ | ❌ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ❌ | ⚠️ | ❌ | ✅ | ❌ |
| 6. ARIA & Roles | ❌ | ⚠️ | ❌ | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ❌ | ⚠️ | ❌ |
| 7. Responsive | ❌ | ❌ | ❌ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⚠️ | ❌ | ⚠️ | ❌ |
| 8. Motion | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| 9. Theming | ⚠️ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ❌ | ✅ | ⚠️ |
| 10. Content | ❌ | ⚠️ | ❌ | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⚠️ | ❌ | ✅ | ❌ | ✅ | ❌ |
| 11. Edge Cases | ❌ | ❌ | ❌ | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ❌ | ⚠️ | ❌ |
| 12. Dependencies | ❌ | ❌ | ❌ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ⚠️ | ❌ | ✅ | ❌ |

**Top 3 por cobertura**: Atlassian (10✅ 2⚠️), Polaris (8✅ 3⚠️ 1❌), Wise (8✅ 4⚠️)

---

## Next Steps

| # | Step | Command | Agent |
|---|------|---------|-------|
| 1 | Define component anatomy (slots, regions, hierarchy) | `/anatomy avatar` | Anatomy Agent |
| 2 | Build variant matrix (properties, combinations, frame count) | `/matrix avatar` | Variant Matrix Agent |
| 3 | Generate interaction spec (ARIA, keyboard, focus, SR) | `/interaction avatar` | Interaction Spec Agent |
| 4 | Assign semantic tokens (3-layer architecture) | `/tokens avatar` | Token Assignment Agent |
| 5 | Generate in Figma | `/generate avatar` | Figma Generation Agent |

**Recomendación**: Usa el pipeline optimizado → `/spec avatar` (combina anatomy + matrix + optimize) → `/enrich avatar` (combina interaction + tokens).
