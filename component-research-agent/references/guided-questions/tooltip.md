---
component: tooltip
questions: 4
---

# Guided Questions — Tooltip

---

## Pregunta 1: Tipo de contenido del tooltip
**(elige UNA opción)**

¿Qué información muestra el tooltip?

1. **Texto simple** — una línea de texto que nombra o describe el elemento (ej: label de un ícono, nombre de un shortcut de teclado)
2. **Texto con formato** — varias líneas, negrita, código inline, listas cortas (ej: descripción de una funcionalidad con ejemplo)
3. **Contenido rico** — imágenes, links clickeables, botones de acción dentro del tooltip (ej: preview de usuario, card expandida, menú contextual)
4. No estoy seguro — muéstrame cómo los sistemas diferencian Tooltip de Popover

**Nota adaptativa:** Si eliges 3 (contenido rico con links o acciones), el componente correcto probablemente es un **Popover**, no un Tooltip. La diferencia fundamental: los tooltips no pueden tener elementos interactivos (WCAG 2.1 §1.4.13). El research cubrirá esta distinción y cuándo usar cada uno.

---

## Pregunta 2: Trigger del tooltip
**(puedes elegir VARIAS, sepáralas con coma)**

¿Qué interacciones del usuario hacen aparecer el tooltip?

1. **Hover** — aparece al posicionar el cursor sobre el elemento (el comportamiento más común en desktop)
2. **Focus** — aparece cuando el elemento recibe focus de teclado o tab (requerido para accesibilidad)
3. **Click / persistente** — aparece al hacer click y permanece visible hasta otro click o acción del usuario (ej: información contextual que el usuario quiere leer con calma)
4. **Touch (mobile)** — en dispositivos táctiles, aparece con un tap sostenido (long press) o un tap simple
5. No estoy seguro — muéstrame las implicaciones de accesibilidad de cada trigger (hover-only es problemático para a11y)

**Nota adaptativa:** Si eliges 3 (click/persistente), el research mostrará por qué esto convierte el tooltip en un popover semántico, con implicaciones de ARIA diferentes (`role="tooltip"` vs `role="dialog"`).

---

## Pregunta 3: Delay y timing
**(elige UNA opción)**

¿El tooltip aparece inmediatamente o con retraso?

1. **Instantáneo** — aparece sin delay al hacer hover/focus (ej: labels de toolbars donde la velocidad importa)
2. **Delay corto (200–400ms)** — pequeño retraso para evitar tooltips accidentales al mover el cursor (el comportamiento más común)
3. **Delay configurable** — el delay debe ser ajustable porque se usa en múltiples contextos con necesidades distintas
4. No estoy seguro — muéstrame los valores de delay estándar en los design systems y la lógica detrás de ellos

**Nota adaptativa:** Si en Pregunta 2 elegiste solo "Click / persistente", el delay no aplica — los tooltips por click aparecen inmediatamente al activarse.

---

## Pregunta 4: Posicionamiento
**(puedes elegir VARIAS, sepáralas con coma)**

¿Dónde se posiciona el tooltip relativo al elemento trigger?

1. **Arriba** — por encima del elemento (evita tapar contenido debajo)
2. **Abajo** — debajo del elemento
3. **Izquierda / Derecha** — a los lados (ej: sidebars, elementos en los bordes de la pantalla)
4. **Auto-detección inteligente** — el tooltip detecta el espacio disponible y se posiciona donde quepa (flip automático)
5. **Siempre en una posición fija** — el diseño siempre deja espacio para el tooltip en un lado específico

**Nota adaptativa:** La opción 4 (auto-detección) es la respuesta correcta para la mayoría de los casos de uso — el research explicará cómo cada sistema implementa el flip automático y los casos edge (ej: tooltip en un modal scrolleable).
