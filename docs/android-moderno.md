# Android moderno de Junior a Senior

El primer recorrido usa una lista de tareas como ejemplo común. Arranca con Kotlin y una pantalla de Compose, y termina con una separación clara entre eventos, estado y UI. La misma app puede crecer para practicar persistencia, errores, pruebas y decisiones de arquitectura.

## Puente inicial en 12 bloques

| Nivel | Bloque | Resultado |
| --- | --- | --- |
| Junior | 1. Ausencia de datos en Kotlin | Mostrás un nombre alternativo si el dato falta. |
| Junior | 2. Data classes, colecciones y extensiones | Modelás una tarea, filtrás una lista y preparás títulos para mostrar. Se reparte en tres lecciones. |
| Junior | 3. Cómo funciona una vista | Seguís una tarjeta desde el XML hasta el dibujo y explicás cómo se actualiza con estado en Compose. |
| Junior | 4. Eventos y estado | Actualizás un contador con una acción del usuario. |
| Junior | 5. Listas y elementos con identidad | Mostrás tareas y preservás su identidad al reordenar. |
| Junior | 6. Navegación entre lista y detalle | Abrís una tarea a partir de su identificador. |
| Semi Senior | 7. De Presenter a ViewModel | Separás el comportamiento de una pantalla del código que la dibuja. |
| Semi Senior | 8. Estado con StateFlow | Representás carga, contenido y error. |
| Semi Senior | 9. Flujo unidireccional | Seguís un evento desde el botón hasta el nuevo estado. |
| Semi Senior | 10. Corrutinas y cancelación | Cancelás una búsqueda anterior cuando empieza otra. |
| Semi Senior | 11. Repositorio y errores | Mostrás un error recuperable y permitís reintentar. |
| Semi Senior | 12. Pruebas del estado de pantalla | Verificás el resultado de una acción sin abrir la interfaz. |

Después del puente, el nivel Semi Senior profundiza en Retrofit, Room e inyección de dependencias. El tramo Senior propone comparar límites entre módulos, medir recomposición y arranque, probar flujos de UI, automatizar entregas y justificar decisiones de seguridad y mantenimiento.

## Cobertura para entrevistas por nivel

Los niveles sirven para organizar la preparación. Cada empresa puede repartir las responsabilidades de otra manera. Cada bloque se divide en lecciones breves, con práctica en Kotlin o Android, una pregunta de entrevista y un ejemplo que permita justificar la respuesta.

| Nivel | Kotlin | Android y entrevistas |
| --- | --- | --- |
| Junior | Variables y tipos, inferencia, null safety, operadores, control de flujo, funciones y parámetros, clases, constructores, visibilidad, interfaces, data classes, igualdad, colecciones, lambdas, extensiones y excepciones básicas. | Ciclo de vida de Activity y Fragment, puente Java/XML a Kotlin/Compose, layouts, listas y keys, estado local, formularios, navegación, recursos y accesibilidad. Practicá leer código, predecir la salida y explicar una decisión básica. |
| Semi Senior | Genéricos y varianza, sealed classes e interfaces, funciones de orden superior, scope functions, delegación, colecciones vs. secuencias, corrutinas, cancelación, concurrencia estructurada, Flow, StateFlow y SharedFlow. | ViewModel, estado y eventos, recreación y muerte del proceso, MVVM/MVI, Retrofit y HTTP, Room y migraciones, repositorios y caché, Hilt, navegación y deep links, trabajo en segundo plano, pruebas unitarias y de integración. Practicá diagnosticar errores y defender límites entre capas. |
| Senior | Interoperabilidad Java, contratos y diseño de APIs, inline y reified, concurrencia y sincronización, memoria, asignaciones, mediciones y compatibilidad de bibliotecas. | Modularización y Gradle, límites de Clean Architecture, estrategia de datos offline y sincronización, recomposición y estabilidad, arranque y Baseline Profiles, ANR y profiling, pruebas UI y de rendimiento, CI/CD y rollbacks, observabilidad, seguridad, privacidad y migraciones. Practicá diseñar un sistema, medir un problema y defender trade-offs con datos. |

## Vistas e interfaces para entrevistas

| Nivel | Qué practicar | Pregunta para probarte |
| --- | --- | --- |
| Junior | Jerarquía de View y ViewGroup, inflación, ViewBinding, medida y dibujo, tamaños y restricciones, componentes de Compose, modificadores, estado local, eventos, listas, navegación, foco y accesibilidad. | Si cambia el largo del título, ¿qué pasos determinan cuánto espacio ocupa y cómo aparece? |
| Semi Senior | Ciclo de vida de Fragment y de su vista, suscripciones ligadas a la vista, estado que sobrevive a recreaciones, listas con identidad, gestos, semántica, interoperabilidad XML y Compose, pruebas de UI. | ¿Por qué una suscripción que actualiza el binding debería vivir lo mismo que la vista del Fragment? |
| Senior | Fases de Compose, recomposición y estabilidad, medición de jank, sobrecarga de layout y dibujo, rendimiento de listas, layouts adaptativos y estrategia de migración incremental. | Si una lista se traba al hacer scroll, ¿qué medirías para separar el costo de composición, layout y dibujo? |

## Recorrido completo en la vista previa local

Las 85 lecciones de Android están publicadas. Para preparar entrevistas también hay simulacros (12 preguntas por nivel) y práctica de código en vivo por nivel; ver [repaso-entrevistas.md](android/repaso-entrevistas.md). Las guías por nivel reúnen las fichas de las últimas 36 lecciones y sus respuestas. Las siete iniciales se describen más abajo.

- [Junior](android/junior.md) · 9 lecciones adicionales.
- [Semi Senior](android/semi-senior.md) · 14 lecciones.
- [Temas de búsquedas laborales](android/temas-nuevos.md) · 13 lecciones (2 Junior y 11 Semi Senior), intercaladas en el recorrido.
- [Senior](android/senior.md) · 13 lecciones.
- [Preparación para la entrevista](android/preparacion-entrevista.md) · índice de los 12 bloques: qué está en borrador, qué está publicado y qué está en `privado/`.

## Lección disponible · Ausencia de datos en Kotlin

**Duración estimada** 4 minutos.

### Concepto

El nombre de una persona puede venir vacío, o el dato puede faltar por completo. Kotlin te permite expresar la segunda situación en el tipo. Un `String` contiene texto. Un `String?` permite que el valor sea `null`. Cuando lo vas a usar, podés decidir qué mostrar si falta.

### Ejemplo

```kotlin
fun main() {
    val nombre: String? = null
    val nombreVisible = nombre ?: "Invitado"
    println("Hola, $nombreVisible")
}
```

El operador `?:` usa el valor de la izquierda si está presente. Cuando es `null`, usa el valor de la derecha. El programa imprime `Hola, Invitado`.

### Práctica

1. Elegí el tipo de un nombre que puede faltar. Opciones `String`, `String?` e `Int`. Respuesta `String?`.
2. Completá el operador en `val visible = nombre ___ "Invitado"`. Respuesta `?:`.
3. Si `nombre` vale `"Ana"`, elegí qué imprime ese programa. Respuesta `Hola, Ana`. El valor alternativo se usa cuando el dato es `null`.

### Para repasar

- `String?` permite representar un dato ausente.
- `?:` elige un valor alternativo cuando el dato es `null`.
- Una cadena vacía es un valor distinto de `null`.

### Tarea para tu máquina

En un archivo de Kotlin, escribí una función `nombreVisible` que reciba un `String?` y devuelva un `String`. Probala con `null`, `"Ana"` y `""`. El resultado esperado es `"Invitado"`, `"Ana"` y `""`, respectivamente.

## Lección 2 · Data classes: copiá una tarea sin perder sus datos

**Nivel** Junior · **Duración estimada** 5 minutos · **Antes** Ausencia de datos en Kotlin

### Concepto y ejemplo

Una `data class` sirve para representar datos como el identificador, el título y el estado de una tarea. Kotlin genera operaciones como igualdad y copia a partir de las propiedades del constructor principal. En [DataClasses.kt](../android-samples/kotlin/fundamentos/DataClasses.kt), `copy` crea otra tarea con el estado actualizado y conserva su identificador. [Data classes en Kotlin](https://kotlinlang.org/docs/data-classes.html)

```text
false
true
true
true
```

### Práctica

1. ¿Qué devuelve `original.completada` después de copiar? `false`, porque se modificó el valor de la copia.
2. Completá `original.copy(___ = true)`. Respuesta `completada`.
3. ¿Dos tareas con el mismo identificador y distinto estado son iguales según el `equals` generado? En este ejemplo, el estado también participa de la comparación.

### Tarea para tu máquina

Hacé una copia que cambie el título a `"Comprar café"` y conserve el identificador. Usá `check` para comprobar que la original conserva su título y que la copia tiene el nuevo.

### Para repasar

- Una data class genera operaciones a partir de las propiedades del constructor principal.
- La copia permite cambiar valores puntuales y conservar el resto.
- Igualdad de valores e identidad de negocio pueden representar cosas distintas.

### Entrevista

**En 30 segundos.** Uso una data class para datos que quiero comparar por valores y copiar con cambios puntuales. La igualdad generada toma las propiedades del constructor principal.

**Pregunta trampa.** ¿Copy duplica las colecciones internas? La copia es superficial. Si dos instancias reciben la misma lista mutable, ambas referencian esa lista.

**Cuándo simplificar.** Para una clase que prioriza comportamiento, identidad o invariantes complejas, evaluá si una clase común expresa mejor el contrato.

## Lección 3 · Colecciones: filtrá tareas y quedate con sus títulos

**Nivel** Junior · **Duración estimada** 5 minutos · **Antes** Data classes

### Concepto y ejemplo

Una lambda describe qué hacer con cada elemento. En [Colecciones.kt](../android-samples/kotlin/fundamentos/Colecciones.kt), `filter` conserva las tareas pendientes y `map` transforma cada tarea en su título. La pantalla recibe una lista de textos. [Transformaciones de colecciones en Kotlin](https://kotlinlang.org/docs/collection-transformations.html)

```text
[Pagar la luz, Regar las plantas]
Total: 3
```

### Práctica

1. ¿Con qué operación seleccionás elementos? Respuesta `filter`.
2. Ordená el flujo. Leer tareas → filtrar las pendientes → extraer títulos → mostrar.
3. ¿Qué tipo tiene el resultado? Respuesta `List<String>`.

### Tarea para tu máquina

Extraé los títulos de las tareas completadas y verificá que el resultado sea `listOf("Comprar yerba")`. Probá también una lista vacía. La lista de entrada tiene que conservar sus tres elementos cuando uses los datos del ejemplo.

### Para repasar

- Filter decide qué elementos quedan.
- Map convierte cada elemento que recibe.
- Podés encadenar las operaciones cuando el segundo paso usa el resultado del primero.

### Entrevista

**En 30 segundos.** Uso filter para elegir elementos y map para transformar su representación. En este caso filtro las tareas pendientes y convierto cada una en el título que necesita la vista.

**Pregunta trampa.** ¿Una lista de solo lectura siempre es inmutable? La interfaz limita las operaciones disponibles por esa referencia. Una referencia mutable al mismo objeto todavía puede modificarlo.

**Cuándo simplificar.** Si la transformación tiene varios pasos con reglas distintas, ponerle nombre a un paso intermedio puede hacer más claro el flujo.

## Lección 4 · Funciones de extensión: limpiá títulos antes de mostrarlos

**Nivel** Junior · **Duración estimada** 5 minutos · **Antes** Ausencia de datos en Kotlin

### Concepto y ejemplo

Una extensión agrega una forma de llamar a una función sobre un tipo existente. En [Extensiones.kt](../android-samples/kotlin/fundamentos/Extensiones.kt), `String.tituloVisible()` usa el texto receptor, quita espacios de los extremos y ofrece un título alternativo cuando el resultado queda vacío. [Funciones de extensión en Kotlin](https://kotlinlang.org/docs/extensions.html)

```text
Comprar yerba
Sin título
Original: [ Comprar yerba ]
```

### Práctica

1. ¿Cuál es el receptor de esta extensión? Respuesta `String`.
2. Completá `fun ___.tituloVisible(): String`. Respuesta `String`.
3. ¿Qué muestra una cadena con espacios únicamente? Respuesta `Sin título`.

### Tarea para tu máquina

Agregá una extensión para un receptor `String?` con el nombre `tituloVisibleOAlternativo`. Verificá tres casos con `check`: título válido con espacios, cadena vacía y valor `null`. Los últimos dos deben devolver `Sin título`.

### Para repasar

- Una extensión se llama como una operación del tipo receptor.
- Dentro de la extensión podés trabajar con el valor que recibió la llamada.
- Un receptor nullable permite hacer explícito el caso en que falta el dato.

### Entrevista

**En 30 segundos.** Una extensión permite escribir una operación cómoda para un tipo existente. Sirve para transformaciones locales, como preparar texto para mostrar. Kotlin resuelve qué extensión usar según el tipo declarado del receptor.

**Pregunta trampa.** ¿Una extensión puede sobrescribir un método del tipo receptor? Si un miembro y una extensión son aplicables y tienen la misma firma, Kotlin elige el miembro.

**Cuándo simplificar.** Si la operación depende de varias piezas del negocio y el receptor es un argumento más, una función común puede expresar mejor esa relación.

## Lección 5 · Del XML al árbol de vistas

**Nivel** Junior · **Duración estimada** 5 minutos · **Antes** Funciones de extensión

### Concepto y ejemplo

En Android clásico, un XML de layout describe una jerarquía. Al inflarlo, Android crea los objetos `View` y `ViewGroup` que la componen. El contenedor organiza a sus hijos. Una vista como `TextView` muestra texto y una como `Button` puede recibir un toque. ViewBinding da acceso tipado a las vistas del layout que tienen un identificador. [Layouts con Views](https://developer.android.com/develop/ui/views/layout/declaring-layout) · [ViewBinding](https://developer.android.com/topic/libraries/view-binding)

Pensá en una fila de la app de tareas. El XML describe qué piezas tiene. La fila concreta recibe después el título que corresponde a esa tarea.

```text
Recurso XML de una fila
  ↓ inflación
Contenedor de la fila
  ├─ View de texto → Comprar yerba
  └─ Botón → Completar
```

### Práctica

1. ¿Qué produce la inflación? Opciones un árbol de objetos, una imagen o el texto XML. Respuesta un árbol de objetos.
2. Ordená el flujo. Elegir el recurso → inflar la fila → asignar el título → mostrar la fila.
3. ¿Qué pieza agrupa el texto y el botón? Opciones ViewGroup, el título o el listener. Respuesta ViewGroup.

### Tarea para tu máquina

En una pantalla de práctica con Views, armá una fila con texto y un botón. Activá ViewBinding, actualizá el texto desde Kotlin y abrí el Layout Inspector para comparar la jerarquía en ejecución con el XML.

**Resultado esperado.** El inspector muestra un contenedor con los dos hijos. El texto que ves en ejecución es el valor que asignaste desde Kotlin.

### Para repasar

- El XML describe la jerarquía de una pantalla.
- Inflar crea objetos de vista durante la ejecución.
- ViewBinding permite acceder a las vistas identificadas desde Kotlin.

### Entrevista

**En 30 segundos.** Un layout XML describe qué vistas existen y cómo se anidan. Inflarlo crea las instancias. A partir de ahí puedo asignar datos y eventos, y Android mide, ubica y dibuja la jerarquía.

**Pregunta trampa.** ¿Inflar una fila define el título final de cada tarea? La inflación crea la estructura y aplica los valores del recurso. El código que enlaza los datos de la tarea puede actualizar ese texto después.

**Cuándo elegir otra opción.** Si la pantalla nueva pertenece a una app Compose, una función composable puede describirla. Si estás migrando una app grande, una pantalla existente puede seguir usando Views mientras migrás otra.

## Lección 6 · Cómo una vista ocupa espacio: medir, ubicar y dibujar

**Nivel** Junior · **Duración estimada** 6 minutos · **Antes** Del XML al árbol de vistas

### Concepto y ejemplo

El padre comunica restricciones de tamaño. En la medición se calcula cuánto puede ocupar cada pieza. En el layout se decide su posición. En el dibujo se produce lo que aparece en pantalla. En Compose también hay un paso de layout que incluye medir y ubicar. Además, el orden de los modificadores influye en las restricciones y en cómo se ve el resultado. [Ciclo de dibujo de Views](https://developer.android.com/guide/topics/ui/how-android-draws) · [Restricciones y orden de modificadores en Compose](https://developer.android.com/develop/ui/compose/layouts/constraints-modifiers)

En una fila de tareas, el texto y el botón comparten el ancho disponible. Cuando el título necesita más líneas, la fila puede crecer en alto si sus restricciones se lo permiten.

```text
El padre informa cuánto espacio hay
  → Medir: calcular tamaño del texto, botón y fila
  → Ubicar: decidir dónde queda cada pieza
  → Dibujar: mostrar texto y botón
```

### Práctica

1. ¿Dónde se decide la posición del botón? Opciones medición, layout o dibujo. Respuesta layout.
2. Ordená las fases. Medir → ubicar → dibujar.
3. Si cambia el ancho disponible, ¿qué hace falta resolver otra vez? Respuesta el tamaño y la posición que correspondan a las nuevas restricciones.

### Tarea para tu máquina

Probá la fila anterior con un título corto y uno largo. Permití que el texto use varias líneas y cambiale el ancho disponible usando una vista previa o el emulador. Observá el tamaño de la fila en el inspector.

**Resultado esperado.** Cuando el ancho es menor, el título largo se reparte en más líneas y la fila se hace más alta si el padre admite ese alto.

### Para repasar

- Las restricciones del padre influyen en el tamaño de cada hijo.
- Medir resuelve tamaño y ubicar resuelve posición.
- Dibujar hace visible el resultado de esas decisiones.

### Entrevista

**En 30 segundos.** El padre comunica restricciones. Primero se resuelve el tamaño, después la posición y al final el dibujo. Si un cambio afecta el tamaño, puede requerir otra medición y otro layout.

**Pregunta trampa.** ¿Cambiar el color obliga a medir de nuevo? Si el cambio afecta solo cómo se pinta, alcanza con actualizar el dibujo. Un cambio de texto, tamaño o restricciones puede requerir layout.

**Cuándo simplificar.** Para acomodar una fila común, empezá con los contenedores existentes. Considerá un layout propio si necesitás un comportamiento de medición o ubicación que esos contenedores no cubren.

## Lección 7 · De actualizar un TextView a describir una pantalla con estado

**Nivel** Junior · **Duración estimada** 6 minutos · **Antes** Del XML al árbol de vistas

### Concepto y ejemplo

Con Views podés actualizar un objeto existente, por ejemplo asignar el texto de una etiqueta. En Compose, una función composable describe qué se muestra para los datos que recibe. Cuando cambia un estado observable leído por esa parte de la interfaz, Compose puede reejecutar las funciones que dependen de ese estado para actualizar lo que corresponde. [Modelo mental de Compose](https://developer.android.com/develop/ui/compose/mental-model)

La misma fila de tareas puede recibir un título y un estado inicial pendiente. El botón comunica la acción al dueño del estado. A partir del nuevo estado, la etiqueta pasa a mostrar `Completada`.

```text
Estado inicial → la vista muestra Pendiente
Toque → evento → nuevo estado → la vista muestra Completada
```

### Práctica

1. ¿En qué dirección viaja el estado? Opciones de quien lo mantiene hacia la vista, del botón hacia el texto o de la vista a la base. Respuesta hacia la vista.
2. Ordená el flujo. Toque → evento → actualización del estado → pantalla actualizada.
3. ¿En qué caso puede alcanzar con estado local? Respuesta expandir o contraer una sección que solo usa esa pantalla.

### Tarea para tu máquina

En un proyecto Compose, armá una fila que reciba si la tarea está completada y una función que se llame al tocar el botón. En la pantalla que la contiene, mantené un estado observable y pasalo a la fila. Probá el cambio desde el emulador.

**Resultado esperado.** La fila empieza mostrando `Pendiente`. Al tocar el botón, la pantalla cambia el estado y la fila muestra `Completada`.

### Para repasar

- La interfaz describe el resultado a partir del estado.
- Un toque puede convertirse en un evento para quien mantiene el estado.
- Compose actualiza las partes que dependen de los valores que cambian.

### Entrevista

**En 30 segundos.** Con Compose describo la pantalla para un estado dado. La UI comunica las acciones y quien mantiene el estado decide la actualización. Compose puede reejecutar las partes que leyeron el estado cambiado.

**Pregunta trampa.** ¿Un cambio de estado vuelve a dibujar toda la pantalla? Compose puede limitar el trabajo a las partes afectadas. Recomposición, layout y dibujo son fases distintas.

**Cuándo elevar el estado.** Si otra parte de la pantalla necesita el mismo dato o lo puede cambiar, ubicalo en un dueño común y pasá a cada componente los valores y eventos que necesita.

## Temas agregados desde requisitos de búsquedas laborales

Temas que suelen pedir las búsquedas de Android, ubicados por nivel. Algunos ya tenían lección y se amplían. Para los que no tenían, quedan planificadas lecciones nuevas, que pasan por borrador antes de maquetarse.

| Tema pedido | Nivel | Dónde se cubre |
| --- | --- | --- |
| Kotlin con MVVM y Repository, nociones de Clean y separación de capas | Semi Senior | Amplía 24 y 26. **Nueva:** MVVM, Repository y casos de uso, nociones de Clean en Android. |
| Ciclo de vida de Android y ViewModel | Junior → Semi Senior | 15 (Activity) y 23 (Fragment y ViewModel). **Nueva:** ciclo de vida y colección segura de StateFlow en Compose (`collectAsStateWithLifecycle`, `repeatOnLifecycle`). |
| Jetpack Compose y Material Design 3, estado con StateFlow | Junior | **Nueva:** Material 3 en Compose: tema, colores, tipografía y componentes. El estado con StateFlow va en la lección de ciclo de vida. |
| Coroutines y Flow (StateFlow y SharedFlow) | Semi Senior | Ya cubierto en 21 y 22. |
| Navigation, deep links y back stack | Junior → Semi Senior | 14 y 29. **Nueva:** Navigation Compose y back stack (`popUpTo`, `launchSingleTop`, volver con resultado). |
| APIs REST con Retrofit y OkHttp, serialización (Kotlinx Serialization, Moshi) | Semi Senior | 25. **Nueva:** OkHttp y serialización: interceptores, timeouts y JSON. |
| Estados de carga y error, fallos de red, tratamiento seguro de datos | Semi Senior | 18, 24 y 25 (carga y errores). **Nueva:** datos sensibles: tokens, almacenamiento seguro y logs. Senior profundiza en 42. |
| Inyección de dependencias con Hilt o Dagger, scopes y ciclo de vida | Semi Senior | 27. **Nueva:** Dagger debajo de Hilt: componentes, `@Provides` vs. `@Binds` y scopes. |
| Gradle con Kotlin DSL y modularización | Semi Senior → Senior | **Nueva (Semi Senior):** Gradle con Kotlin DSL y version catalogs. La modularización sigue en 34 (Senior). |
| Tests unitarios y de UI: JUnit, MockK o Mockito, Espresso, Compose Testing | Semi Senior | 30 y 40. **Nuevas:** tests unitarios con JUnit y MockK (y la diferencia con Mockito), y tests de UI con Compose Testing y Espresso. |
| Git, PRs e integración continua | Junior → Semi Senior | **Nuevas:** Git y pull requests en equipo (Junior), y qué corre la CI en cada PR (Semi Senior). |
| Firebase Crashlytics u otras herramientas de monitoreo | Semi Senior → Senior | **Nueva (Semi Senior):** Crashlytics: crashes, no fatales y logs sin datos personales. Senior sigue en 41. |

En total: 13 lecciones nuevas (2 Junior y 11 Semi Senior), ya maquetadas e intercaladas junto a la lección que amplían (archivos `11a-`, `16a-`, `23a-`, `24a-`, `25a-`, `25b-`, `27a-`, `29a-`, `29b-` y `30a-` a `30d-`).
