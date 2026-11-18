# Android Junior · Guía de lecciones

Después de las siete lecciones disponibles. Practicá leer el código y predecir el comportamiento visible.

**Contenido** 9 lecciones incorporadas a la vista previa local. Los ejemplos Android se describen como escenarios de práctica.

## 8. Tipos, condiciones y funciones

**Concepto.** Una función declara qué recibe y qué devuelve. Usá condiciones para elegir un resultado y tipos para que cada llamada lleve los datos correctos.

**Ejemplo.** Una regla de prioridad devuelve Alta si quedan dos días o menos, y Normal para los demás.

### Práctica

1. ¿Qué tipo devuelve la regla? **Respuesta esperada.** Texto, porque la regla entrega una etiqueta.
2. ¿Qué devuelve con dos días? **Respuesta esperada.** Alta, porque el límite está incluido.

### Tarea para tu máquina

Implementá la regla en Kotlin y comprobá con check los casos uno, dos y tres.

**Resultado esperado.** Alta, Alta, Normal.

### Repaso para entrevista

**Pregunta.** ¿Cuándo conviene un enum para la prioridad?

**Respuesta.** Cuando existe un conjunto cerrado de opciones y querés impedir valores arbitrarios.

## 9. Identidad con listas, conjuntos y mapas

**Concepto.** Elegí una colección según la operación principal. Una lista conserva posiciones, un conjunto representa elementos únicos y un mapa vincula claves con valores.

**Ejemplo.** Si llegan los identificadores 2, 2 y 5, una lista conserva los tres datos y un conjunto queda con 2 y 5.

### Práctica

1. ¿Qué usarías para saber si ya viste un identificador? **Respuesta esperada.** Un conjunto.
2. ¿Qué usarías para buscar títulos por identificador? **Respuesta esperada.** Un mapa de identificador a título.

### Tarea para tu máquina

Creá un mapa de tareas y buscá un identificador presente y uno ausente.

**Resultado esperado.** La primera búsqueda devuelve el título y la segunda devuelve null.

### Repaso para entrevista

**Pregunta.** ¿Un mapa ordena sus claves automáticamente?

**Respuesta.** Depende de la implementación. Buscá una garantía explícita si la presentación depende del orden.

## 10. Recursos, densidad y escalado de texto

**Concepto.** Usá dp para tamaños de diseño, sp para texto y recursos de cadenas para lo que se traduce. Probá distintos tamaños de fuente y pantallas.

**Ejemplo.** Una fila con alto fijo de 32 dp puede recortar el título cuando la persona agranda el texto.

### Práctica

1. ¿Qué unidad usarías para definir el tamaño de la tipografía? **Respuesta esperada.** sp.
2. ¿Dónde guardarías la etiqueta «Completar» para traducirla? **Respuesta esperada.** En recursos de cadenas.

### Tarea para tu máquina

Probá una fila con el tamaño de fuente del sistema aumentado. Ajustá el alto para que dependa del contenido.

**Resultado esperado.** El título y el botón siguen completos y legibles.

### Repaso para entrevista

**Pregunta.** ¿Por qué no fijar el texto en píxeles?

**Respuesta.** El tamaño físico y las preferencias de escala cambian entre dispositivos y personas.

## 11. Layout con Row, Column y modificadores

**Concepto.** Row y Column ordenan hijos en ejes distintos. El orden de los modificadores modifica la forma en que cada uno envuelve al siguiente.

**Ejemplo.** En un botón de prueba, intercambiar el orden de padding y clickable cambia si el espacio agregado puede recibir el toque.

### Práctica

1. ¿Qué usarías para ubicar título y botón uno al lado del otro? **Respuesta esperada.** Row.
2. ¿Por qué importa el orden de modificadores? **Respuesta esperada.** Porque cada modificador recibe el resultado que envuelve y puede cambiar tamaño o interacción.

### Tarea para tu máquina

Armá dos filas con los mismos modificadores en distinto orden y tocá los bordes.

**Resultado esperado.** Podés identificar cuál de los espacios responde y explicar por qué.

### Repaso para entrevista

**Pregunta.** ¿El padding siempre queda dentro del área que responde al toque?

**Respuesta.** Depende de su posición respecto del modificador que maneja la interacción.

## 12. Eventos, formularios y validación

**Concepto.** La interfaz comunica cambios de texto y toques. Quien mantiene el estado decide qué valores mostrar, cuándo habilitar un botón y cómo informar errores.

**Ejemplo.** Escribir espacios mantiene deshabilitado Agregar. Escribir «Llamar al médico» habilita el botón.

### Práctica

1. ¿Quién debería decidir si un envío cumple una regla compartida? **Respuesta esperada.** La capa que posee esa regla.
2. ¿Qué dato necesita la vista para habilitar el botón? **Respuesta esperada.** El resultado de la validación o el estado que lo representa.

### Tarea para tu máquina

Armá un campo y un botón. Probá cadena vacía, espacios y un título válido.

**Resultado esperado.** Solo el título válido habilita el envío.

### Repaso para entrevista

**Pregunta.** ¿Deshabilitar un botón reemplaza la validación del caso de uso?

**Respuesta.** La interfaz ayuda al usuario. El caso de uso sigue protegiendo la regla desde cualquier entrada.

## 13. Listas, keys y objetos reciclados

**Concepto.** Separá la identidad de un elemento de su posición. En una lista que cambia, una clave estable permite asociar el estado de cada fila al elemento correcto.

**Ejemplo.** La tarea 5 pasa de la fila dos a la primera. Su identificador sigue siendo 5.

### Práctica

1. ¿Qué clave elegirías al ordenar tareas? **Respuesta esperada.** El identificador estable.
2. ¿Cuándo la posición deja de identificar a una tarea? **Respuesta esperada.** Cuando se inserta, borra o reordena la lista.

### Tarea para tu máquina

Expandí una fila y reordená la lista en una demo. Compará una clave de posición con una de identificador.

**Resultado esperado.** Con la clave estable, la expansión sigue a la misma tarea.

### Repaso para entrevista

**Pregunta.** ¿RecyclerView y LazyColumn conservan todas las filas como vistas activas?

**Respuesta.** Ambos evitan trabajar con toda la lista de una sola vez, aunque RecyclerView recicla objetos View y Compose administra contenido bajo demanda.

## 14. Navegación de lista a detalle

**Concepto.** La ruta puede llevar el identificador de la tarea. El detalle obtiene los datos con esa clave y los representa según el estado actual.

**Ejemplo.** Desde la lista abrís la tarea 5. Si el dato ya no existe, el detalle muestra que no se encontró.

### Práctica

1. ¿Cuál es el dato mínimo para abrir un detalle? **Respuesta esperada.** El identificador de la tarea.
2. ¿Qué respuesta necesita la UI si el identificador no existe? **Respuesta esperada.** Un estado visible de elemento ausente.

### Tarea para tu máquina

Conectá lista y detalle, y probá un identificador válido y uno que no esté.

**Resultado esperado.** El primero muestra la tarea. El segundo muestra el estado ausente y permite volver.

### Repaso para entrevista

**Pregunta.** ¿Por qué preferir un id antes que pasar el objeto completo?

**Respuesta.** Reduce datos duplicados y permite que el detalle consulte la fuente actual.

## 15. Activity, recreación y estado local

**Concepto.** Cuando una Activity se recrea, sus objetos de interfaz se construyen de nuevo. Elegí qué estado es temporal y qué dato tiene que sobrevivir al cambio.

**Ejemplo.** Al rotar, se puede recuperar el texto del formulario. Las tareas guardadas se leen de su fuente.

### Práctica

1. ¿Qué debería pasar con el foco o el borrador? **Respuesta esperada.** Depende del requisito de experiencia.
2. ¿Dónde esperás guardar la lista duradera? **Respuesta esperada.** En almacenamiento persistente.

### Tarea para tu máquina

Girá la pantalla con un texto sin enviar y anotá qué datos quedan. Hacé que el borrador sobreviva a la recreación.

**Resultado esperado.** El formulario recupera el texto y no duplica ninguna tarea.

### Repaso para entrevista

**Pregunta.** ¿Una rotación es equivalente a perder el proceso?

**Respuesta.** La recreación por configuración y la pérdida de proceso tienen alcances distintos. Probá ambas de forma separada.

## 16. Accesibilidad y foco

**Concepto.** La interfaz necesita nombres y estados que se puedan entender con lector de pantalla y entradas distintas al toque. La semántica también permite comprobar el comportamiento en tests.

**Ejemplo.** Un ícono de borrar sin etiqueta deja ambiguo qué tarea se elimina.

### Práctica

1. ¿Qué nombre le darías al botón de borrar de la fila? **Respuesta esperada.** Uno que diga la acción y, si hace falta, qué tarea afecta.
2. ¿Qué observarías además de que el botón se vea? **Respuesta esperada.** Orden de foco, etiqueta y estado anunciado.

### Tarea para tu máquina

Recorré la pantalla con TalkBack y sin mirar. Completá una tarea y volvé a la lista.

**Resultado esperado.** Podés identificar la tarea, ejecutar la acción y escuchar el cambio.

### Repaso para entrevista

**Pregunta.** ¿Todo ícono necesita una descripción propia?

**Respuesta.** Un ícono decorativo puede quedar fuera del foco si el control que lo contiene ya explica la acción.

## Referencias

- [Android Developers · Primeros pasos](https://developer.android.com/get-started/overview)
- [Android Developers · Layout y modificadores](https://developer.android.com/develop/ui/compose/layouts/constraints-modifiers)
