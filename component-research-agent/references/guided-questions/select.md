---
component: select
questions: 4
---

# Guided Questions — Select

---

## Pregunta 1: Tipo de selección
**(elige UNA opción)**

¿Cuántas opciones puede seleccionar el usuario?

1. **Una sola opción** — el usuario elige un ítem de la lista y el campo muestra esa selección (ej: país, categoría, estado del pedido)
2. **Múltiples opciones con tags** — el usuario puede elegir varios ítems que aparecen como chips/tags dentro del campo (ej: asignar etiquetas, seleccionar múltiples categorías)
3. **Múltiples opciones con checkboxes** — el dropdown muestra checkboxes junto a cada opción, el usuario marca las que quiere (ej: filtros de búsqueda, selección de permisos)
4. **Ambos en distintos contextos** — el componente debe soportar single y multi-select según el campo
5. No estoy seguro — muéstrame cómo los sistemas diferencian Select de MultiSelect y cuándo usar cada uno

---

## Pregunta 2: Búsqueda y filtrado de opciones
**(elige UNA opción)**

¿El usuario puede buscar o filtrar dentro de las opciones?

1. **No** — dropdown puro, el usuario solo desplaza la lista (ej: listas cortas de 5-10 opciones)
2. **Sí, con búsqueda** — hay un campo de texto dentro del dropdown para filtrar opciones (ej: selector de país con 200 opciones)
3. **Sí, con creación** — el usuario puede escribir y si no encuentra la opción, puede crearla (ej: etiquetas, categorías, invitar usuarios por email)
4. No estoy seguro — muéstrame las implicaciones de UX de cada variante (la distinción entre Select y Combobox es importante)

**Nota adaptativa:** Si eliges 2 o 3, el componente técnicamente es un **Combobox** (no un Select puro). El research cubrirá cómo los sistemas distintos nombran y estructuran este componente.

---

## Pregunta 3: Origen de las opciones
**(elige UNA opción)**

¿De dónde vienen las opciones de la lista?

1. **Estáticas** — las opciones están definidas en el código y son siempre las mismas (ej: lista de países, estados de un proceso)
2. **Dinámicas al escribir (async)** — las opciones se cargan desde una API mientras el usuario escribe (ej: búsqueda de usuarios, búsqueda de productos)
3. **Pre-cargadas pero actualizables** — las opciones se cargan una vez al montar el componente desde una API (ej: lista de proyectos, lista de equipos)
4. **Paginadas** — hay demasiadas opciones para cargarlas todas, se paginan conforme el usuario hace scroll (ej: catálogo de 10,000 productos)
5. No estoy seguro — muéstrame cómo los sistemas manejan el estado de carga en selects

**Nota adaptativa:** Si en Pregunta 2 elegiste "No" (dropdown puro sin búsqueda), las opciones 2 y 4 (async / paginado) raramente aplican — el research lo aclarará.

---

## Pregunta 4: Estructura visual de las opciones
**(puedes elegir VARIAS, sepáralas con coma)**

¿Las opciones de la lista tienen estructura visual especial?

1. **Lista plana simple** — solo texto, sin jerarquía (ej: lista de colores, lista de tamaños)
2. **Agrupadas por categoría** — las opciones están organizadas bajo headers de grupo (ej: países por continente, fuentes por familia)
3. **Con ícono o avatar** — cada opción lleva un ícono o imagen a la izquierda (ej: selector de usuarios con avatar, selector de tipo con ícono)
4. **Con descripción secundaria** — cada opción tiene un subtexto explicativo debajo del label principal (ej: selector de plan con precio, selector de rol con descripción de permisos)
5. **Con badge o status** — cada opción tiene una etiqueta de estado (ej: "Nuevo", "Beta", "Deshabilitado")
6. **Lista plana estándar** — sin estructura especial, opciones simples de texto
7. No estoy seguro — muéstrame las variantes de opciones más comunes
