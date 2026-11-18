# Android moderno de Junior a Senior

El primer recorrido usa una lista de tareas como ejemplo común. Arranca con Kotlin y una pantalla de Compose, y termina con una separación clara entre eventos, estado y UI. La misma app puede crecer para practicar persistencia, errores, pruebas y decisiones de arquitectura.

## Puente inicial en 12 bloques

| Nivel | Bloque | Resultado |
| --- | --- | --- |
| Junior | 1. Ausencia de datos en Kotlin | Mostrás un nombre alternativo si el dato falta. |
| Junior | 2. Data classes, colecciones y extensiones | Modelás una tarea, filtrás una lista y preparás títulos para mostrar. Se reparte en tres lecciones. |
| Junior | 3. De XML a Compose | Dibujás una tarjeta a partir de sus datos. |
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

## Borrador 2 · Data classes: copiá una tarea sin perder sus datos

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

## Borrador 3 · Colecciones: filtrá tareas y quedate con sus títulos

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

## Borrador 4 · Funciones de extensión: limpiá títulos antes de mostrarlos

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
