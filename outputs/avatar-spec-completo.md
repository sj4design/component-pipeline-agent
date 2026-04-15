# Avatar

## Overview

El Avatar es una representacion visual de un usuario o entidad. Muestra una imagen, iniciales derivadas del nombre, o un icono fallback — en ese orden de prioridad. Siempre circular para personas. Es un componente no interactivo por defecto.

```
  .Avatar (sub-componente):
  ┌──────────┐    ┌──────────┐    ┌──────────┐
  │   🖼️    │    │    AB    │    │    👤    │
  │  image   │    │ initials │    │ fallback │
  └──────────┘    └──────────┘    └──────────┘
       ↑               ↑               ↑
    prioridad 1    prioridad 2    prioridad 3

  AvatarGroup:
  ┌──┐┌──┐┌──┐┌────┐
  │AB││CD││EF││ +3 │
  └──┘└──┘└──┘└────┘
   overlap negativo   overflow badge
```

Tiene dos piezas: **.Avatar** (sub-componente individual) y **AvatarGroup** (grupo con overlap y overflow). .Avatar tiene 3 tipos de contenido mutuamente exclusivos y 5 tamanos. AvatarGroup apila avatars con gap negativo y muestra "+N" cuando excede el limite visible.

**Que puede configurar el disenador:**

Variantes (cambian la apariencia — generan variantes en Figma):

```
  .Avatar:
  Tamano        xs · sm · md · lg · xl              24 / 32 / 40 / 48 / 64px
  Contenido     image · initials · fallback         Foto / letras / icono generico

  AvatarGroup:
  Tamano        sm · md · lg                        32 / 40 / 48px
```

Toggles (muestran u ocultan partes — NO generan variantes extra):

```
  AvatarGroup:
  ☑ Overflow        Badge "+N" para avatars ocultos                texto editable
```

### Panel de propiedades en Figma

```
┌─ .Avatar ────────────────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌────────────────┐ ┌──────────────┐ │
│  │ Size      ▼ md │ │ Content ▼ …  │ │
│  └────────────────┘ └──────────────┘ │
│                                      │
│  Text Properties                     │
│  ✏️ Initials  [ AB             ]     │
│                                      │
└──────────────────────────────────────┘

┌─ AvatarGroup ────────────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌─────────────────────────────────┐ │
│  │ Size                     ▼ md  │ │
│  └─────────────────────────────────┘ │
│                                      │
│  Boolean Properties                  │
│  ☑ Overflow                          │
│                                      │
│  Text Properties                     │
│  ✏️ Overflow  [ +3             ]     │
│                                      │
└──────────────────────────────────────┘
```

---

## Cuando usar (y cuando no)

```
  ¿Necesitas representar visualmente a un usuario o entidad?
  │
  ├─ Persona identificable (foto o nombre) → usa Avatar ✓
  │
  ├─ Grupo de personas → usa AvatarGroup ✓
  │
  ├─ Icono de una accion o estado → usa Icon o Badge
  │
  ├─ Logo de empresa o marca → usa Image con aspect ratio controlado
  │
  └─ Foto de producto → usa Image/Thumbnail
```

**Usa Avatar cuando:**
- Necesitas mostrar quien es un usuario (perfil, comentarios, asignaciones)
- Tienes un grupo de colaboradores con overlap visual
- El contexto requiere fallback automatico si la foto no esta disponible

**NO uses Avatar cuando:**
- Es un logo de marca → usa Image con ratio controlado
- Es un icono funcional → usa Icon
- Es una foto de producto → usa Thumbnail
- Necesitas forma cuadrada para entidades no-humanas → considera un badge o icono

---

## Variaciones visuales

### Contenido

```
  image                    initials                   fallback
  ┌──────────┐             ┌──────────┐              ┌──────────┐
  │          │             │          │              │          │
  │   🖼️    │             │    AB    │              │    👤    │
  │          │             │          │              │          │
  └──────────┘             └──────────┘              └──────────┘
  Foto del usuario         Iniciales del nombre      Icono generico
  Prioridad 1              Hash del nombre = color   Cuando no hay nombre
```

### Tamanos

```
  xs (24px)    ┌──┐    notificaciones, inline en texto, listas densas
               └──┘    font 10px · icon 12px

  sm (32px)    ┌───┐   listas, comentarios, chips
               └───┘   font 12px · icon 16px

  md (40px)    ┌────┐  formularios, cards, headers de seccion
               └────┘  font 14px · icon 20px

  lg (48px)    ┌─────┐ perfiles, headers de pagina
               └─────┘ font 16px · icon 24px

  xl (64px)    ┌──────┐ perfil principal, modales de usuario
               └──────┘ font 20px · icon 32px
```

### AvatarGroup

```
  Sin overflow:                  Con overflow:
  ┌──┐┌──┐┌──┐                  ┌──┐┌──┐┌──┐┌────┐
  │AB││CD││EF│                  │AB││CD││EF││ +3 │
  └──┘└──┘└──┘                  └──┘└──┘└──┘└────┘
  gap negativo (-8/-10/-12px)    badge "+N" con fondo neutro
  borde blanco entre avatars     tooltip al hover con nombres
```

---

## Decisiones de diseno

### 1. Fallback chain automatico de 3 niveles

Polaris formalizo la cadena: image → initials (del nombre) → icono default. El color de fondo de iniciales es determinista por hash del nombre — misma persona = mismo color siempre. Esto es critico para AvatarGroup donde cada persona debe mantener su color en el stack. shadcn/Radix agrega un detalle: `delayMs` para mostrar fallback solo si la imagen tarda, evitando flash de iniciales en conexiones rapidas.

### 2. .Avatar como sub-componente, AvatarGroup como componente principal

El Avatar individual es un building block — no se usa solo en muchos contextos, se usa dentro de AvatarGroup, cards, listas. Marcarlo como sub-componente (.Avatar con punto) refleja su naturaleza de pieza reutilizable. AvatarGroup es el componente publicado que los disenadores instancian directamente.

### 3. Cinco tamanos con rango xs-xl

Atlassian define 6 tamanos (xxs a xl), Polaris 5 (xs a xl), Ant Design 3 (small/default/large). Nosotros: 5 tamanos (xs a xl) — xs(24) para contextos densos como notificaciones, xl(64) para perfiles. Cubre el rango completo sin ser excesivo.

### 4. Borde blanco en AvatarGroup

Cuando los avatars se superponen, un borde blanco de 2px entre ellos crea separacion visual clara. Sin borde, los avatars se funden visualmente. 12/14 sistemas con AvatarGroup usan este patron. El borde es blanco (fondo de pagina), no gris — se integra con la superficie.

### Combinaciones excluidas

```
  (ninguna — todas las combinaciones de Size x Content son validas)
```

---

## Comportamiento

### Lo esencial para disenar

1. **Fallback es automatico.** Si la imagen falla, se muestran iniciales. Si no hay nombre, icono generico. El disenador elige el Content variant para prototipar; el codigo maneja la cadena.

2. **AvatarGroup tiene limite visible.** MaxCount define cuantos avatars se muestran antes del badge "+N". El badge usa tooltip al hover para mostrar los nombres ocultos.

3. **Avatar no es interactivo por defecto.** No recibe foco, no tiene hover. Si necesita ser clickeable (perfil, asignacion), se convierte en `button` con `aria-label` del nombre.

4. **Borde blanco en overlap.** AvatarGroup usa gap negativo + borde blanco 2px para separar avatars superpuestos visualmente.

5. **Hash de color determinista.** Las iniciales siempre tienen el mismo color para la misma persona. Esto crea consistencia visual en toda la app.

### Accesibilidad (ARIA)

| Parte | Rol | Atributos | Por que importa |
|-------|-----|-----------|-----------------|
| Avatar (informativo) | `img` | `aria-label="[nombre]"` | SR anuncia a quien representa |
| Avatar (decorativo) | `presentation` | `aria-hidden="true"` | SR ignora avatars redundantes |
| AvatarGroup | `group` | `aria-label="Colaboradores"` | SR anuncia el grupo como conjunto |
| Overflow badge | — | `aria-label="y N mas"` | SR anuncia cuantos usuarios ocultos hay |

### Navegacion por teclado

Interacciones principales (afectan el diseno):

```
  N/A — Avatar no es interactivo por defecto
  Si es clickeable → Tab para focus, Enter para activar
```

Interacciones secundarias (referencia para dev):

```
  aria-label="[nombre]"    en avatars informativos
  aria-hidden="true"       en avatars decorativos
```

---

## Guia de contenido

**Iniciales:** Maximo 2 caracteres. Extraer primera letra del nombre + primera letra del apellido. "Juan Perez" → "JP".

**aria-label:** Usar el nombre completo. "Juan Perez" — no "JP" ni "avatar".

**Overflow badge:** Formato "+N". "+3" significa "y 3 personas mas". El tooltip lista los nombres: "Maria, Carlos, Ana".

**Imagen:** Relacion de aspecto 1:1. La imagen se recorta automaticamente con `object-fit: cover`. Preferir fotos con el rostro centrado.

---

## Checklist antes de construir

```
  ☐ ¿Que contenido tendra?
    └─ Foto disponible → Content = image
    └─ Solo nombre → Content = initials
    └─ Sin info → Content = fallback

  ☐ ¿Que tamano necesitas?
    └─ xs = inline denso · sm = listas · md = cards · lg = headers · xl = perfil

  ☐ ¿Es un grupo?
    └─ Si si → usa AvatarGroup con maxCount
    └─ ¿Cuantos visibles antes de "+N"?

  ☐ ¿Es clickeable?
    └─ Si si → necesita aria-label, role="button", focus ring

  ☐ ¿El aria-label tiene el nombre completo?
    └─ "Juan Perez", no "JP" ni "user avatar"
```

---

## Relacion con otros componentes

```
  Badge          Status indicator (online/offline) superpuesto al avatar
  Tooltip        Muestra nombre completo en hover
  Card           Avatar en header de card de usuario/perfil
  List           Avatar leading en list items
  Tag/Chip       Avatar como leading element en chips de usuario
```

---

## Referencia: como lo hacen otros sistemas

**Fallback chain:** Polaris (image → initials con hash color → icono default), shadcn/Radix (delayMs para evitar flash).

**AvatarGroup:** Atlassian (overflow automatico con tooltip, presencia built-in), Ant Design (maxCount + popover), Primer (AvatarStack con alignRight).

**Sin Avatar formal:** M3 (composicion de tokens), Spectrum (cada producto custom), Carbon (solo icono UserAvatar).

**Wise (fintech):** 4 tipos de media (image/flag/icon/text), double avatar diagonal para transferencias.

**Consenso universal:** Circular para personas, fallback chain automatico, borde blanco en overlap.

---

## Tokens

**14 tokens** · prefijo `avt-` / `avg-` · 3 capas (primitivo → semantico → componente)

| Token | Figma Variable | Uso |
|-------|---------------|-----|
| `--avt-bg` | `bg/surface/tertiary` | Fondo de iniciales/fallback |
| `--avt-fg` | `text/onColor` | Color de iniciales/icono |
| `--avt-border` | `bg/surface/default` | Borde blanco en overlap |
| `--avt-border-width` | `2px` | Grosor del borde de overlap |
| `--avt-focus-ring` | `border/focus` | Ring de foco si es clickeable |
| `--avg-overflow-bg` | `bg/surface/secondary` | Fondo del badge "+N" |
| `--avg-overflow-fg` | `text/secondary` | Color del texto "+N" |

### Specs de spacing

```
  ┌─ .Avatar ──────────────────────────────────────────┐
  │                                                     │
  │  Circular container — 1:1 aspect ratio              │
  │  ┌────────────┐                                     │
  │  │            │  image: object-fit cover             │
  │  │  content   │  initials: centrado vertical+horiz  │
  │  │            │  fallback: icono centrado            │
  │  └────────────┘                                     │
  │                                                     │
  └─────────────────────────────────────────────────────┘

  ┌─ AvatarGroup ──────────────────────────────────────┐
  │                                                     │
  │  [avt1][avt2][avt3][+N]                            │
  │   ←gap→                                            │
  │                                                     │
  └─────────────────────────────────────────────────────┘

  tamanos:           xs=24 · sm=32 · md=40 · lg=48 · xl=64
  radius:            9999 (circle)
  gap AvatarGroup:   sm=-8 · md=-10 · lg=-12 (overlap negativo)
  borde overlap:     2px blanco
  font iniciales:    xs=10 · sm=12 · md=14 · lg=16 · xl=20
  icon fallback:     xs=12 · sm=16 · md=20 · lg=24 · xl=32
```
