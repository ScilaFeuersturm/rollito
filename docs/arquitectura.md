# Arquitectura: lo que te preguntan en una entrevista

Sección del track Fundamentos (`track: fundamentos`, `modulo: Arquitectura`). Es la única con repaso en audio.

> Las 18 lecciones de este recorrido están maquetadas en `src/content/fundamentos/arquitectura/`.

Todo el código está en Kotlin y sale de `android-samples/kotlin/arquitectura/`. Los ejemplos se verificaron con el compilador de Kotlin y las salidas que aparecen acá son las reales.

## Recorrido propuesto

POO es la base y no entra en una sola lección de 3 a 7 minutos, así que se divide en seis. Los demás temas arrancan con una lección cada uno y se amplían si hace falta.

| # | Tema | Lecciones |
| --- | --- | --- |
| 1 | POO | Clases y objetos · Encapsulamiento · Abstracción e interfaces · Herencia · Polimorfismo · Composición vs. herencia |
| 2 | Arquitectura en capas | Presentación, dominio y datos |
| 3 | MVC | Modelo, vista y controlador |
| 4 | MVP | Vista pasiva y pruebas del presentador |
| 5 | MVVM | Estado observable y eventos de la vista |
| 6 | MVI | Intenciones tipadas y transiciones de estado |
| 7 | Flux / Redux | Acciones, store, reducer y selectores |
| 8 | VIPER | Caso de uso y navegación por separado |
| 9 | Clean Architecture | Incluye la comparación con Onion |
| 10 | Hexagonal | Puertos y adaptadores |
| 11 | Arquitectura modular | Límites y contratos de módulo |
| 12 | Monolito vs. microservicios | Despliegue y fallas parciales |
| 13 | Comparativa | La misma pantalla en MVP, MVVM y VIPER |

## Formato de las lecciones de esta sección

Es el formato del brief (concepto, ejemplo, práctica, tarea y resumen) con una parte más al final: **Cómo contarlo en una entrevista**. Tiene tres partes:

- **La respuesta en 30 segundos.**
- **La pregunta trampa.**
- **Cuándo no la usarías.**

El resumen está escrito para escucharse: frases cortas, sin símbolos de código, porque el lector de voz los pronuncia mal.

---

## Borrador 1 · POO: clases y objetos

**Nivel** junior · **Duración estimada** 4 minutos

### Concepto

Una **clase** es un molde: define qué datos tiene algo y qué puede hacer. Un **objeto** es una cosa concreta hecha con ese molde, con sus propios valores.

Pensalo como una receta de torta y las tortas. La receta dice qué ingredientes lleva y qué pasos seguir, pero no se come. Con la misma receta podés hacer muchas tortas, y si a una le ponés dulce de leche, las otras no cambian.

### Ejemplo

```kotlin
package arquitectura.poo.clases

class Tarea(val titulo: String) {
    var completada = false

    fun completar() {
        completada = true
    }
}

fun main() {
    val compras = Tarea("Comprar yerba")
    val gimnasio = Tarea("Ir al gimnasio")

    compras.completar()

    println("${compras.titulo}: ${compras.completada}")
    println("${gimnasio.titulo}: ${gimnasio.completada}")
}
```

Imprime:

```text
Comprar yerba: true
Ir al gimnasio: false
```

`Tarea` es la clase. `compras` y `gimnasio` son dos objetos distintos: completar uno no toca al otro. Si venís de Java, ojo: en Kotlin no se escribe `new`, se llama a la clase como si fuera una función.

### Práctica

1. **Opción múltiple.** ¿Cuál es la diferencia entre una clase y un objeto?
   - La clase es el molde; el objeto es una instancia concreta creada a partir de ella. ✅
   - Son lo mismo con distinto nombre.
   - El objeto define qué datos va a tener la clase.

   *Explicación:* la clase describe; el objeto existe y tiene sus propios valores.

2. **¿Qué imprime?** En el ejemplo, ¿qué muestra la segunda línea?
   - `Ir al gimnasio: true`
   - `Ir al gimnasio: false` ✅
   - Nada, porque da error.

   *Explicación:* solo se llamó a `completar()` sobre `compras`. Cada objeto guarda su propio estado.

3. **Completar.** `val tarea = ___("Pagar la luz")`. Respuesta: `Tarea`.

   *Explicación:* en Kotlin creás un objeto llamando a la clase, sin `new`.

### Tarea para tu máquina

En un archivo Kotlin, creá una clase `Juego` con `nombre` y `precio` (un `Int`) y un método `aplicarDescuento(porcentaje: Int)` que baje el precio. Creá dos juegos, por ejemplo "Carrera nocturna" a 10000 y "Laberinto" a 6000. Aplicale un 20 % de descuento solo al primero e imprimí los dos.

**Resultado esperado:**

```text
Carrera nocturna: 8000
Laberinto: 6000
```

### Para repasar (se escucha en audio)

- Una clase es un molde: define qué datos y qué comportamiento tienen sus objetos.
- Un objeto es una instancia concreta de una clase, con sus propios valores.
- Cambiar un objeto no cambia a los otros objetos de la misma clase.
- En Kotlin creás un objeto llamando a la clase como si fuera una función, sin la palabra new.

### Cómo contarlo en una entrevista

**En 30 segundos.** "Una clase es la definición: qué datos y qué comportamiento tiene un tipo de cosa. Un objeto es una instancia de esa clase, que vive en memoria con sus propios valores. Puedo crear muchos objetos de la misma clase, y cada uno mantiene su propio estado."

**La pregunta trampa: "Si dos objetos tienen los mismos datos, ¿son iguales?"** Depende. Con una clase común, `==` compara por defecto si son *el mismo objeto*, así que da `false`. Con una `data class`, Kotlin genera `equals` comparando las propiedades del constructor, y da `true`.

```kotlin
package arquitectura.poo.igualdad

class TareaComun(val titulo: String)

data class TareaDeDatos(val titulo: String)

fun main() {
    println(TareaComun("Pagar la luz") == TareaComun("Pagar la luz"))
    println(TareaDeDatos("Pagar la luz") == TareaDeDatos("Pagar la luz"))
}
```

Imprime `false` y después `true`. Si además mencionás que `data class` también genera `hashCode`, `toString` y `copy`, sumás puntos.

**Cuándo no la usarías.** No todo tiene que ser una clase. Si algo no guarda estado, por ejemplo calcular un precio con descuento, en Kotlin alcanza con una función suelta. Envolverla en una clase solo agrega ceremonia.

---

## Borrador 2 · Arquitectura en capas

**Nivel** junior · **Duración estimada** 6 minutos

### Concepto

La arquitectura en capas separa la app en tres partes, cada una con una responsabilidad:

- **Presentación:** muestra cosas y recibe las acciones de la persona.
- **Dominio:** decide las reglas del negocio.
- **Datos:** guarda y trae información (base de datos, API, archivos).

La regla de oro es que cada capa solo habla con la de abajo: presentación → dominio → datos. Nunca al revés.

Pensalo como un restaurante. El mozo (presentación) toma el pedido y lo lleva a la mesa. La cocina (dominio) decide cómo se prepara cada plato y si se puede hacer. El depósito (datos) guarda los ingredientes. El mozo no entra al depósito a buscar papas, y la cocina no atiende mesas.

### Ejemplo

```kotlin
package arquitectura.capas

// Capa de datos: sabe dónde y cómo se guardan las tareas.
class TareaRepositorio {
    private val tareas = mutableListOf("Comprar yerba", "Pagar la luz")

    fun obtenerTodas(): List<String> = tareas.toList()

    fun guardar(titulo: String) {
        tareas.add(titulo)
    }
}

// Capa de dominio: decide las reglas del negocio.
class ServicioDeTareas(private val repositorio: TareaRepositorio) {
    fun agregar(titulo: String): String {
        val limpio = titulo.trim()
        if (limpio.isEmpty()) return "El título no puede estar vacío"
        if (limpio in repositorio.obtenerTodas()) return "Esa tarea ya existe"
        repositorio.guardar(limpio)
        return "Tarea agregada"
    }
}

// Capa de presentación: recibe las acciones y muestra el resultado.
class PantallaDeTareas(private val servicio: ServicioDeTareas) {
    fun alTocarAgregar(texto: String) {
        println(servicio.agregar(texto))
    }
}

fun main() {
    val pantalla = PantallaDeTareas(ServicioDeTareas(TareaRepositorio()))

    pantalla.alTocarAgregar("Llamar al médico")
    pantalla.alTocarAgregar("   ")
    pantalla.alTocarAgregar("Pagar la luz")
}
```

Imprime:

```text
Tarea agregada
El título no puede estar vacío
Esa tarea ya existe
```

La pantalla no sabe que las tareas están en una lista, y el repositorio no sabe qué es un título válido. Cada clase hace una sola cosa.

### Práctica

1. **Opción múltiple.** ¿En qué capa va la regla "no se puede agregar una tarea repetida"?
   - Presentación.
   - Dominio. ✅
   - Datos.

   *Explicación:* es una regla del negocio. En el dominio se puede reusar desde cualquier pantalla y testear sin interfaz.

2. **Ordenar.** Ordená lo que pasa cuando tocás "Agregar":
   1. La pantalla recibe el toque.
   2. El servicio valida el título.
   3. El repositorio guarda la tarea.
   4. La pantalla muestra el resultado.

   *Explicación:* la acción baja de capa en capa y el resultado vuelve hacia arriba.

3. **Encontrar el problema (opción múltiple).** Una pantalla llama directamente al repositorio y valida ella misma que el título no esté vacío. ¿Qué problema tiene?
   - Ninguno: es más corto y funciona igual.
   - La regla queda atada a esa pantalla: no se puede reusar ni testear sola. ✅
   - El repositorio deja de poder guardar tareas.

   *Explicación:* si mañana agregás tareas desde otra pantalla o desde un widget, vas a tener que copiar la validación, y las copias tarde o temprano se desincronizan.

### Tarea para tu máquina

Partí del ejemplo y hacé dos cambios:

1. Una regla nueva: el título puede tener como máximo 50 caracteres. Pensá en qué clase va antes de escribirla.
2. Un método `alTocarListar()` en la pantalla que imprima todas las tareas, cada una precedida por un guion.

Probalo agregando un título de 51 letras y después "Llamar al médico", y listá las tareas.

**Resultado esperado:**

```text
El título puede tener hasta 50 caracteres
Tarea agregada
- Comprar yerba
- Pagar la luz
- Llamar al médico
```

La regla tiene que quedar en `ServicioDeTareas`. Para listar, la pantalla le pide las tareas al servicio, no al repositorio.

### Para repasar (se escucha en audio)

- La arquitectura en capas separa la app en presentación, dominio y datos.
- La presentación muestra y recibe acciones, el dominio decide las reglas y los datos guardan y traen información.
- Cada capa solo habla con la de abajo, nunca al revés.
- Las reglas de negocio van en el dominio, así se reusan y se testean sin pantalla.
- En la arquitectura en capas clásica, el dominio depende de los datos. Clean Architecture invierte esa dependencia.

### Cómo contarlo en una entrevista

**En 30 segundos.** "Separo la app en presentación, dominio y datos, y cada capa solo depende de la de abajo. Las reglas de negocio quedan en el dominio, así puedo cambiar la base de datos o la interfaz sin tocarlas, y testear la lógica sin levantar pantallas."

**La pregunta trampa: "¿Capas y Clean Architecture son lo mismo?"** No. En capas clásica, el dominio depende de la capa de datos: en el ejemplo, `ServicioDeTareas` recibe un `TareaRepositorio` concreto. En Clean, el dominio define una interfaz (`interface TareaRepositorio`) y la capa de datos la implementa. La dependencia se invierte y el dominio no conoce a nadie. Eso es la D de SOLID.

**Otra que suele aparecer: "¿Capas es lo mismo que MVC?"** Tampoco. MVC organiza la capa de presentación. Las capas organizan toda la app.

**Cuándo no la usarías.** En un script o en una app de una sola pantalla sin reglas de negocio, las capas suman archivos y saltos sin beneficio. También ojo con las capas "pasamanos": si el servicio solo reenvía llamadas al repositorio sin decidir nada, es ceremonia y no arquitectura.

---

## Borrador 3 · POO: encapsulamiento

**Nivel** junior · **Duración estimada** 5 minutos · **Antes** Clases y objetos

### Concepto

Encapsular es **esconder el estado interno de un objeto y dejar que se cambie solo a través de operaciones que respetan sus reglas**. Desde afuera se puede pedir, pero no meter la mano.

Pensalo como un cajero automático. No abrís la caja para sacar billetes: pedís "extraer 5000" y el cajero se fija si tenés saldo. Si te dejara agarrar la plata directamente, la regla del saldo no serviría de nada.

### Ejemplo

```kotlin
package arquitectura.poo.encapsulamiento

class Tarea(val titulo: String) {
    var completada = false
        private set

    private val _subtareas = mutableListOf<String>()
    val subtareas: List<String>
        get() = _subtareas.toList()

    fun agregarSubtarea(texto: String) {
        if (completada) {
            println("No se pueden agregar subtareas a una tarea completada")
            return
        }
        _subtareas.add(texto)
    }

    fun completar() {
        completada = true
    }
}

fun main() {
    val mudanza = Tarea("Mudanza")
    mudanza.agregarSubtarea("Embalar libros")
    mudanza.completar()
    mudanza.agregarSubtarea("Desarmar la cama")

    println("Subtareas: ${mudanza.subtareas.size}")
    // mudanza.completada = false  // No compila: el setter es privado.
}
```

Imprime:

```text
No se pueden agregar subtareas a una tarea completada
Subtareas: 1
```

Tres herramientas trabajando juntas:

- `private set` permite leer `completada` desde afuera, pero solo cambiarla desde adentro.
- `_subtareas` es privada: nadie de afuera la toca.
- `subtareas` devuelve una copia de solo lectura.

Así, la regla "no se agregan subtareas a una tarea completada" no se puede saltear.

### Práctica

1. **Opción múltiple.** ¿Qué hace `private set` en una propiedad?
   - La oculta por completo.
   - Se puede leer desde afuera, pero solo modificar desde adentro de la clase. ✅
   - Hace que no se pueda modificar nunca.

   *Explicación:* el getter sigue siendo público. Solo el setter queda privado.

2. **Encontrar el problema (opción múltiple).** Una clase tiene `val subtareas = mutableListOf<String>()` pública. ¿Está protegida?
   - Sí, porque es `val`.
   - No: `val` impide reasignar la lista, pero no cambiar su contenido. ✅
   - Sí, porque las listas de Kotlin son inmutables.

   *Explicación:* `val` es una referencia fija a una lista que sigue siendo mutable. Cualquiera puede hacer `tarea.subtareas.add(...)` y saltearse las reglas.

3. **Completar.** `var completada = false` seguido de `___ set`. Respuesta: `private`.

   *Explicación:* así se puede leer desde afuera, pero solo cambiar con `completar()`.

### Tarea para tu máquina

Creá una clase `Presupuesto` que reciba un monto inicial. Tiene que tener un `saldo` que se lea desde afuera pero no se pueda modificar directamente, y un método `gastar(monto: Int)`. Si el monto supera el saldo, imprime "Saldo insuficiente" y no descuenta nada. Probala con un presupuesto de 1000: gastá 300, después 900, e imprimí el saldo.

**Resultado esperado:**

```text
Saldo insuficiente
Saldo: 700
```

### Para repasar (se escucha en audio)

- Encapsular es esconder el estado interno y permitir cambiarlo solo con operaciones que respetan las reglas.
- Con private set, una propiedad se puede leer desde afuera pero solo modificar desde adentro.
- Que una propiedad sea val no protege su contenido si es una lista mutable.
- Para exponer una colección, devolvé una copia de solo lectura.

### Cómo contarlo en una entrevista

**En 30 segundos.** "Encapsular es proteger el estado de un objeto: los datos quedan privados y solo se modifican a través de métodos que validan las reglas. Así el objeto nunca queda en un estado inválido, y puedo cambiar cómo guarda sus datos por dentro sin romper a quien lo usa."

**La pregunta trampa: "Si expongo la lista como `List` en vez de `MutableList`, ¿ya está encapsulada?"** No del todo. `List` en Kotlin es una *vista* de solo lectura, no una lista inmutable. Si devolvés la misma lista interna, alguien puede castearla y modificarla:

```kotlin
package arquitectura.poo.encapsulamientotrampa

class Tarea {
    private val _subtareas = mutableListOf("Embalar libros")
    val subtareas: List<String>
        get() = _subtareas
}

fun main() {
    val tarea = Tarea()
    (tarea.subtareas as MutableList<String>).add("Algo que nadie validó")
    println(tarea.subtareas)
}
```

Imprime `[Embalar libros, Algo que nadie validó]`. Con `_subtareas.toList()`, quien castea recibe una copia: el cast le falla o modifica la copia, pero la lista interna de la tarea no cambia.

**Cuándo no lo forzarías.** Encapsular no es poner getters y setters a todo: eso es dejar la puerta abierta con más pasos. Y en una `data class` que solo transporta datos (por ejemplo, la respuesta de una API) sin reglas que proteger, propiedades `val` públicas está perfecto.

---

## Borrador 4 · POO: abstracción e interfaces

**Nivel** junior · **Duración estimada** 5 minutos · **Antes** Encapsulamiento

### Concepto

Abstraer es **mostrar qué hace algo y esconder cómo lo hace**. En Kotlin, la herramienta principal es la **interfaz**: un contrato que dice qué funciones existen, sin decir cómo funcionan.

Pensalo como un enchufe. A la pared no le importa si enchufás una heladera o un cargador: solo pide que respetes la forma del enchufe. Y el aparato no sabe si la electricidad viene de una represa o de paneles solares.

### Ejemplo

```kotlin
package arquitectura.poo.abstraccion

interface Notificador {
    fun enviar(mensaje: String)
}

class NotificadorPorEmail(private val direccion: String) : Notificador {
    override fun enviar(mensaje: String) {
        println("Email a $direccion: $mensaje")
    }
}

class NotificadorPush : Notificador {
    override fun enviar(mensaje: String) {
        println("Push: $mensaje")
    }
}

class Recordatorio(private val notificador: Notificador) {
    fun avisarVencimiento(tarea: String) {
        notificador.enviar("Vence hoy: $tarea")
    }
}

fun main() {
    Recordatorio(NotificadorPorEmail("ana@example.com")).avisarVencimiento("Pagar la luz")
    Recordatorio(NotificadorPush()).avisarVencimiento("Pagar la luz")
}
```

Imprime:

```text
Email a ana@example.com: Vence hoy: Pagar la luz
Push: Vence hoy: Pagar la luz
```

`Recordatorio` no sabe si manda emails o notificaciones push. Solo sabe que tiene algo con un método `enviar`.

### Práctica

1. **Opción múltiple.** ¿Qué sabe `Recordatorio` sobre su notificador?
   - Que manda emails.
   - Solo que tiene un método `enviar`. ✅
   - Todo, porque lo crea él mismo.

   *Explicación:* depende de la interfaz, no de una clase concreta. Por eso le sirve cualquier notificador.

2. **Completar.** `class NotificadorSms : ___ {`. Respuesta: `Notificador`.

   *Explicación:* con `:` y el nombre de la interfaz, la clase se compromete a cumplir el contrato.

3. **Opción múltiple.** Querés agregar avisos por WhatsApp. ¿Qué tenés que cambiar en `Recordatorio`?
   - Agregar un `if` para WhatsApp.
   - Nada: creás `NotificadorWhatsApp` y se lo pasás. ✅
   - Copiar la clase y crear `RecordatorioWhatsApp`.

   *Explicación:* agregar un comportamiento nuevo no obliga a tocar el código que ya funciona.

### Tarea para tu máquina

Copiá `Notificador` y `Recordatorio` del ejemplo y creá un `NotificadorFalso` que, en vez de imprimir, guarde cada mensaje en una lista pública `enviados`. Usalo para avisar el vencimiento de "Pagar la luz" y de "Renovar el DNI", y después imprimí cuántos mensajes se guardaron y cuál fue el primero.

**Resultado esperado:**

```text
Mensajes guardados: 2
Vence hoy: Pagar la luz
```

Acabás de escribir un *doble de prueba*: así se testea código que manda notificaciones sin mandar ninguna de verdad.

### Para repasar (se escucha en audio)

- Abstraer es mostrar qué hace algo y esconder cómo lo hace.
- Una interfaz es un contrato: dice qué funciones existen, no cómo funcionan.
- Si una clase depende de una interfaz, le sirve cualquier implementación.
- Agregar una implementación nueva no obliga a tocar el código que la usa.
- Las interfaces permiten reemplazar piezas reales por piezas falsas en los tests.

### Cómo contarlo en una entrevista

**En 30 segundos.** "Abstraer es exponer qué hace un componente y esconder cómo. En Kotlin lo hago con interfaces: el código depende del contrato y no de la implementación, así puedo cambiar la implementación o reemplazarla por una falsa en los tests sin tocar a quien la usa."

**La pregunta trampa: "¿Interfaz o clase abstracta?"** Una clase puede implementar muchas interfaces, pero heredar de una sola clase. Las interfaces de Kotlin pueden tener métodos con implementación por defecto, pero no guardan estado. Una clase abstracta sí puede tener estado y constructor. Regla práctica: interfaz por defecto, y clase abstracta cuando varias clases muy relacionadas comparten estado o una implementación base.

**Cuándo no la usarías.** Una interfaz con una sola implementación que nunca va a cambiar y que no necesitás reemplazar en tests es una indirección de más: un archivo extra para saltar al leer el código. Creala cuando aparezca la segunda implementación o la necesidad de testear.

---

## Borrador 5 · POO: herencia

**Nivel** junior · **Duración estimada** 5 minutos · **Antes** Abstracción e interfaces

### Concepto

Con la herencia, **una clase hija recibe los datos y el comportamiento de una clase padre, y puede especializarlos**. Sirve cuando hay una relación "es un": una tarea con vencimiento *es una* tarea.

Pensalo como los contratos. Un contrato de alquiler *es un* contrato: tiene todas las cláusulas generales (partes, firma, fecha) y agrega las suyas (monto, duración, depósito).

En Kotlin, las clases están **cerradas por defecto**: para poder heredar de una, tiene que estar marcada como `open`, y lo mismo pasa con cada método que se quiera sobrescribir.

### Ejemplo

```kotlin
package arquitectura.poo.herencia

open class Tarea(val titulo: String) {
    open fun describir(): String = titulo
}

class TareaConVencimiento(titulo: String, val vence: String) : Tarea(titulo) {
    override fun describir(): String = "${super.describir()} (vence el $vence)"
}

fun main() {
    val compras = Tarea("Comprar yerba")
    val luz = TareaConVencimiento("Pagar la luz", "10/12")

    println(compras.describir())
    println(luz.describir())
    println(luz.titulo)
}
```

Imprime:

```text
Comprar yerba
Pagar la luz (vence el 10/12)
Pagar la luz
```

`TareaConVencimiento` hereda `titulo` sin declararlo de nuevo, sobrescribe `describir()` con `override` y reutiliza la versión del padre con `super.describir()`.

### Práctica

1. **Opción múltiple.** ¿Por qué `Tarea` necesita `open`?
   - Para que se pueda crear un objeto.
   - Porque en Kotlin las clases son finales por defecto y sin `open` no se puede heredar. ✅
   - Para que sus propiedades sean públicas.

   *Explicación:* Kotlin obliga a decidir a propósito qué clases se pueden extender. Si venís de Java, ahí es al revés.

2. **Completar.** `class TareaUrgente(titulo: String) : Tarea(___)`. Respuesta: `titulo`.

   *Explicación:* la clase hija tiene que pasarle al constructor del padre lo que necesita.

3. **Opción múltiple.** ¿Cuál de estas relaciones justifica usar herencia?
   - Una `TareaConVencimiento` es una `Tarea`. ✅
   - Una `Tarea` tiene un `Notificador`.
   - Una `Pantalla` usa un `Servicio`.

   *Explicación:* la herencia modela "es un". "Tiene un" y "usa un" se resuelven con composición, que viene en la última lección de POO.

### Tarea para tu máquina

A partir del ejemplo, creá una `TareaRecurrente` que reciba cada cuántos días se repite y sobrescriba `describir()` usando `super`. Imprimí la descripción de "Regar las plantas", que se repite cada 3 días.

**Resultado esperado:**

```text
Regar las plantas (cada 3 días)
```

### Para repasar (se escucha en audio)

- Con la herencia, una clase hija recibe los datos y el comportamiento de una clase padre.
- La herencia modela una relación es un: una tarea con vencimiento es una tarea.
- En Kotlin las clases son cerradas por defecto: para heredar, el padre tiene que estar marcado como open.
- Con override la hija cambia un comportamiento, y con super reutiliza la versión del padre.

### Cómo contarlo en una entrevista

**En 30 segundos.** "La herencia permite que una clase extienda a otra: recibe sus datos y comportamiento y puede especializarlos. La uso cuando hay una relación 'es un' real y estable. En Kotlin las clases son finales por defecto, así que heredar es una decisión explícita con `open`."

**La pregunta trampa: "¿Un cuadrado es un rectángulo?"** En geometría sí; en código, muchas veces no. Si `Rectangulo` permite cambiar el ancho y el alto por separado, el código que lo usa espera que poner ancho 5 y alto 4 dé área 20. Un `Cuadrado` que cambia los dos lados a la vez rompe esa expectativa. Una clase hija tiene que poder usarse en cualquier lugar donde se usa al padre sin sorpresas: eso es el principio de sustitución de Liskov, la L de SOLID.

**Otra que suele aparecer: "¿Por qué en Kotlin las clases son finales por defecto?"** Porque una clase que no fue pensada para ser extendida se rompe fácil: un cambio interno en el padre puede romper a todas las hijas (el problema de la "clase base frágil"). Kotlin te obliga a diseñar para la herencia o a prohibirla.

**Cuándo no la usarías.** Para reutilizar código entre clases que no tienen una relación "es un". Tampoco en jerarquías de muchos niveles, donde para entender una clase tenés que leer cinco. En esos casos, composición.

---

## Borrador 6 · POO: polimorfismo

**Nivel** junior · **Duración estimada** 5 minutos · **Antes** Herencia

### Concepto

Polimorfismo es que **el mismo mensaje produzca comportamientos distintos según el objeto que lo recibe**. El código que llama no pregunta "¿de qué tipo sos?": confía en que cada objeto sabe responder.

Pensalo como el botón de play. En una app de música arranca una canción, en una de videos arranca una película, en un podcast sigue desde donde lo dejaste. Vos tocás lo mismo; cada uno sabe qué hacer.

### Ejemplo

```kotlin
package arquitectura.poo.polimorfismo

interface Tarea {
    val titulo: String
    fun estado(): String
}

class TareaSimple(override val titulo: String, private val hecha: Boolean) : Tarea {
    override fun estado() = if (hecha) "hecha" else "pendiente"
}

class TareaConPasos(override val titulo: String, private val hechos: Int, private val total: Int) : Tarea {
    override fun estado() = "$hechos de $total pasos"
}

fun main() {
    val tareas: List<Tarea> = listOf(
        TareaSimple("Comprar yerba", hecha = true),
        TareaConPasos("Mudanza", hechos = 2, total = 5),
    )

    for (tarea in tareas) {
        println("${tarea.titulo}: ${tarea.estado()}")
    }
}
```

Imprime:

```text
Comprar yerba: hecha
Mudanza: 2 de 5 pasos
```

El `for` no tiene ningún `if` ni `when` sobre el tipo. Llama a `estado()` y cada objeto responde a su manera.

### Práctica

1. **¿Qué imprime?** ¿Qué muestra la segunda línea?
   - `Mudanza: pendiente`
   - `Mudanza: 2 de 5 pasos` ✅
   - Da error, porque la lista es de `Tarea`.

   *Explicación:* aunque la lista sea de `Tarea`, se ejecuta el `estado()` del objeto real: un `TareaConPasos`.

2. **Encontrar el problema (opción múltiple).** Cada pantalla de la app tiene un `when (tarea) { is TareaSimple -> ...; is TareaConPasos -> ... }` para mostrar el estado. ¿Qué problema tiene?
   - Ninguno, es lo más claro.
   - Cada tipo de tarea nuevo obliga a encontrar y modificar todos esos `when`. ✅
   - Los `when` no funcionan con interfaces.

   *Explicación:* con polimorfismo, el tipo nuevo trae su propio `estado()` y las pantallas no se tocan.

3. **Completar.** `___ fun estado() = "vencida"`. Respuesta: `override`.

   *Explicación:* `override` indica que estás dando tu versión de una función del contrato.

### Tarea para tu máquina

Agregá al ejemplo una `TareaVencida` que reciba cuántos días pasaron desde que venció y responda `vencida hace N días`. Sumá a la lista "Pagar la luz", vencida hace 3 días, **sin tocar el `for`**.

**Resultado esperado:**

```text
Comprar yerba: hecha
Mudanza: 2 de 5 pasos
Pagar la luz: vencida hace 3 días
```

### Para repasar (se escucha en audio)

- Polimorfismo es que el mismo mensaje produzca comportamientos distintos según el objeto que lo recibe.
- El código que llama no pregunta de qué tipo es cada objeto: confía en que cada uno sabe responder.
- Agregar un tipo nuevo no obliga a modificar el código que recorre la lista.
- Si tenés el mismo when sobre tipos repetido en muchos lugares, probablemente falte polimorfismo.

### Cómo contarlo en una entrevista

**En 30 segundos.** "Polimorfismo es que distintos objetos respondan al mismo mensaje cada uno a su manera. El código trabaja contra una interfaz o una clase base y, en tiempo de ejecución, se llama a la implementación del objeto real. Así agrego tipos nuevos sin tocar el código que los usa."

**La pregunta trampa: "¿La sobrecarga es polimorfismo?"** Técnicamente sí, pero es otro tipo. La sobrecarga son funciones con el mismo nombre y distintos parámetros, y se decide al compilar. La sobrescritura (`override`) se decide al ejecutar, según el objeto real. Cuando en una entrevista de POO preguntan por polimorfismo, casi siempre hablan de la segunda. Distinguirlas suma.

**Cuándo no lo forzarías.** Cuando el conjunto de tipos es cerrado y lo que cambia seguido son las operaciones, una `sealed class` con `when` suele ser mejor: el compilador te avisa si te olvidaste un caso. Es lo típico en los estados de una pantalla (cargando, contenido, error), que vas a ver en MVVM y MVI.

---

## Borrador 7 · POO: composición vs. herencia

**Nivel** semi-senior · **Duración estimada** 6 minutos · **Antes** Polimorfismo

### Concepto

La herencia dice "**es un**". La composición dice "**tiene un**": en vez de heredar comportamiento, un objeto lo recibe armado en piezas y lo usa. Hay un consejo clásico: *preferí la composición sobre la herencia*.

Pensalo como Lego contra una escultura. Con la escultura, si querés cambiar el brazo, rehacés todo. Con Lego, sacás una pieza y ponés otra.

¿Por qué importa? Imaginate tareas que avisan por email, otras por push y otras por los dos. Con herencia necesitás `TareaConEmail`, `TareaConPush` y `TareaConEmailYPush`. Si sumás SMS, son siete combinaciones. Con composición, la tarea *tiene* una lista de notificadores.

### Ejemplo

```kotlin
package arquitectura.poo.composicion

interface Notificador {
    fun enviar(mensaje: String)
}

class PorEmail : Notificador {
    override fun enviar(mensaje: String) = println("Email: $mensaje")
}

class PorPush : Notificador {
    override fun enviar(mensaje: String) = println("Push: $mensaje")
}

class Tarea(val titulo: String, private val notificadores: List<Notificador>) {
    fun completar() {
        notificadores.forEach { it.enviar("Completaste: $titulo") }
    }
}

fun main() {
    Tarea("Pagar la luz", listOf(PorEmail(), PorPush())).completar()
    Tarea("Comprar yerba", listOf(PorPush())).completar()
}
```

Imprime:

```text
Email: Completaste: Pagar la luz
Push: Completaste: Pagar la luz
Push: Completaste: Comprar yerba
```

Una sola clase `Tarea`, y cada tarea elige sus piezas al crearse.

### Práctica

1. **Opción múltiple.** ¿Qué relación describe la composición?
   - Es un.
   - Tiene un. ✅
   - Hereda de.

   *Explicación:* `Tarea` tiene notificadores; no es un notificador.

2. **Opción múltiple.** Necesitás tareas con email, con push y con los dos. Con herencia, ¿cuántas subclases de `Tarea` hacen falta?
   - Una.
   - Tres, y crecen con cada canal nuevo. ✅
   - Ninguna.

   *Explicación:* una por combinación. Con composición no hace falta ninguna: se combinan las piezas.

3. **Completar.** `Tarea("Regar las plantas", listOf(___()))` para que avise solo por push. Respuesta: `PorPush`.

   *Explicación:* elegís el comportamiento al crear el objeto, sin crear clases nuevas.

### Tarea para tu máquina

Agregá un `PorSms` al ejemplo y creá la tarea "Renovar el DNI" con los tres canales. Completala.

**Resultado esperado:**

```text
Email: Completaste: Renovar el DNI
Push: Completaste: Renovar el DNI
SMS: Completaste: Renovar el DNI
```

Fijate que no tocaste `Tarea`: solo sumaste una pieza.

### Para repasar (se escucha en audio)

- La herencia dice es un. La composición dice tiene un.
- Con composición, un objeto recibe su comportamiento en piezas y las usa.
- Combinar comportamientos con herencia multiplica las clases. Con composición, se combinan piezas.
- El consejo clásico es preferir la composición, pero la herencia sigue sirviendo cuando hay una relación es un real.

### Cómo contarlo en una entrevista

**En 30 segundos.** "Prefiero la composición: armo un objeto con piezas que cumplen interfaces, en vez de heredar comportamiento. Es más flexible porque las piezas se combinan y se reemplazan, incluso en los tests, y evita jerarquías rígidas. Uso herencia cuando hay una relación 'es un' real y estable, o cuando el framework la pide."

**La pregunta trampa: "¿Entonces la herencia es mala?"** No. Es la herramienta correcta cuando la relación "es un" es real y estable, y muchas veces el framework la pide: en Android, tu ViewModel hereda de `ViewModel()`. El problema es usarla solo para reutilizar código.

**Otra que suele aparecer: "¿Qué es la delegación con `by` en Kotlin?"** Es composición con ayuda del lenguaje. La clase implementa una interfaz y delega en otro objeto todo lo que no sobrescribe:

```kotlin
package arquitectura.poo.delegacion

interface Notificador {
    val canal: String
    fun enviar(mensaje: String)
}

class PorPush : Notificador {
    override val canal = "push"
    override fun enviar(mensaje: String) = println("Push: $mensaje")
}

// "by base": todo lo que no se sobrescribe acá se delega automáticamente en base.
class ConPrefijo(private val base: Notificador) : Notificador by base {
    override fun enviar(mensaje: String) = base.enviar("[Rollito] $mensaje")
}

fun main() {
    val notificador = ConPrefijo(PorPush())
    println(notificador.canal)
    notificador.enviar("Completaste: Pagar la luz")
}
```

Imprime `push` y después `Push: [Rollito] Completaste: Pagar la luz`. `canal` se delegó solo y `enviar` se decoró. Si nombrás el patrón Decorator, sumás puntos.

**Cuándo no la usarías.** Si hay una relación "es un" clara y estable, o si el framework espera que heredes. Y para dos clases chicas que no van a cambiar, armar interfaces y piezas puede ser más estructura de la que el problema necesita.

---

## Borrador 8 · MVC: modelo, vista y controlador

**Nivel** junior · **Duración estimada** 5 minutos · **Antes** Arquitectura en capas

### Concepto

MVC separa lo que la persona ve, las acciones que puede realizar y los datos con sus reglas. En la pantalla de tareas, la **vista** muestra la lista y los mensajes. El **controlador** recibe la acción de agregar una tarea y coordina la respuesta. El **modelo** guarda las tareas y decide si un título es válido.

### Ejemplo

En esta variante, el controlador le pasa a la vista los datos que tiene que mostrar. La terminal hace de pantalla para que puedas seguir el flujo en Kotlin puro.

```text
Toque en Agregar → Controlador → Modelo valida y guarda
                                      ↓
                  Vista ← Controlador recibe el resultado
```

El código está en [Mvc.kt](../android-samples/kotlin/arquitectura/Mvc.kt). Al ejecutarlo imprime

```text
Tareas: Comprar yerba
Escribí un título
Tareas: Comprar yerba, Pagar la luz
```

### Práctica

1. **Opción múltiple.** ¿Quién decide si se permite guardar un título vacío? Opciones: vista, controlador, modelo. Respuesta: modelo. La regla se puede probar sin abrir la pantalla.
2. **Ordenar.** El controlador recibe el título → el modelo lo valida y guarda → el controlador obtiene la lista → la vista dibuja la lista.
3. **Opción múltiple para encontrar el bug.** La vista intenta editar una tarea directamente. ¿Dónde debería ir el cambio? Opciones: en la vista, en el controlador o en el modelo. Respuesta: en el modelo. La vista envía la acción al controlador y este le pide al modelo que aplique el cambio.

### Tarea para tu máquina

Agregá en el modelo una regla que rechace títulos repetidos después de quitar los espacios de los extremos. Hacé que el controlador distinga un título vacío de uno repetido y que la vista muestre un mensaje para cada caso. Probá con `"Comprar yerba"`, `" "`, `" Comprar yerba "` y `"Pagar la luz"`, en ese orden.

Resultado esperado

```text
Tareas: Comprar yerba
Escribí un título
Esa tarea ya existe
Tareas: Comprar yerba, Pagar la luz
```

### Para repasar (se escucha en audio)

- La vista muestra los datos y los mensajes.
- El controlador recibe la acción y coordina la respuesta.
- El modelo guarda el estado y aplica las reglas.
- En este ejemplo, el controlador pide el nuevo estado y se lo pasa a la vista.

### Cómo contarlo en una entrevista

**En 30 segundos.** Con MVC separo la presentación, el manejo de las acciones y las reglas del modelo. Si alguien agrega una tarea, el controlador recibe el título y le pide al modelo que lo guarde. Con el resultado, la vista muestra la lista actualizada o un mensaje.

**La pregunta trampa.** ¿La vista siempre recibe el estado a través del controlador? Depende de la implementación. En este ejemplo lo recibe del controlador. También hay implementaciones en las que la vista observa al modelo.

**Cuándo elegir otra solución.** Para una pantalla fija sin acciones, un controlador propio puede agregar código sin aportar una responsabilidad clara. Para una pantalla con varias fuentes de estado asíncrono, compararía MVC con una solución que represente explícitamente los estados de carga, contenido y error.

---

## Borrador 9 · MVP: probá el presentador sin abrir la pantalla

**Nivel** semi-senior · **Duración estimada** 6 minutos · **Antes** MVC

### Concepto

En MVP, el **modelo** guarda las tareas y aplica sus reglas. La **vista** recibe las acciones de la persona y muestra el resultado. El **presentador** interpreta esas acciones, conversa con el modelo y le indica a la vista qué mostrar.

Vamos a usar la variante de **vista pasiva**. La vista reenvía el toque en Agregar y espera que el presentador le pida mostrar una lista o un error. El presentador conoce un contrato de la vista, así podés pasarle una pantalla real o una vista de prueba que registre lo que recibió. [Passive View, Martin Fowler](https://martinfowler.com/eaaDev/PassiveScreen.html)

### Ejemplo

```text
Vista → alAgregar(título) → Presentador → Modelo
Vista ← mostrar tareas o error ← Presentador
```

El ejemplo [Mvp.kt](../android-samples/kotlin/arquitectura/Mvp.kt) usa la misma regla y produce la misma salida que el de MVC. En ambos hay una clase que coordina la acción. Acá la vista es reemplazable mediante una interfaz con operaciones concretas de la pantalla.

```text
Tareas: Comprar yerba
Escribí un título
Tareas: Comprar yerba, Pagar la luz
```

### Práctica

1. **Opción múltiple.** ¿Quién rechaza un título vacío? Opciones `VistaTareas`, `PresentadorTareas` y `ModeloTareas`. Respuesta `ModeloTareas`, porque la regla vale desde cualquier pantalla.
2. **Ordenar.** La vista envía el título → el presentador llama al modelo → el modelo acepta o rechaza → el presentador le indica a la vista qué mostrar.
3. **Opción múltiple.** ¿Qué le pasarías al presentador para comprobar que pidió mostrar un error sin abrir una pantalla? Opciones una vista que registra las llamadas, otra lista de tareas o el título ya validado. Respuesta una vista que registra las llamadas.

### Tarea para tu máquina

Implementá una `VistaDePrueba` que guarde las tareas que recibe y cuente cuántas veces se llama a `mostrarTituloVacio`. Pasásela al presentador y probá agregar `"Comprar yerba"` y `" "`. Usá dos llamadas a `check` para verificar el resultado.

**Resultado esperado.** La última lista recibida tiene solo `"Comprar yerba"` y el contador de errores vale uno.

### Para repasar (se escucha en audio)

- La vista envía las acciones de la persona y muestra lo que le indica el presentador.
- El presentador coordina la respuesta y el modelo aplica las reglas.
- Podés reemplazar la vista real por una que registre las llamadas.
- Pausá y explicá qué parte probarías si la pantalla muestra un error al agregar una tarea válida.

### Cómo contarlo en una entrevista

**En 30 segundos.** En MVP uso un presentador para coordinar las acciones de la pantalla con el modelo. En la variante de vista pasiva, el presentador decide qué mostrar y llama a operaciones de la vista. Como la vista cumple un contrato, puedo probar esa coordinación sin abrir la interfaz.

**La pregunta trampa.** ¿Con una interfaz para la vista ya tengo MVP? La interfaz permite reemplazar la vista. También importa quién coordina las acciones y decide qué mostrar. En este ejemplo, esa responsabilidad queda en el presentador.

**Cuándo elegir otra solución.** Una pantalla informativa con pocas interacciones puede resolverse con menos piezas. Si el equipo ya usa pantallas declarativas, compararía las llamadas directas a la vista con un modelo que expone estado observable. En Android, si el presentador conserva una referencia a una vista, hay que considerar cuánto vive esa referencia.

---

## Borrador 10 · MVVM: la pantalla observa el estado

**Nivel** semi-senior · **Duración estimada** 6 minutos · **Antes** MVP

### Concepto

En MVVM, la **vista** dibuja la pantalla y envía las acciones de la persona. El **ViewModel** recibe las acciones y publica el estado que la pantalla necesita. El **modelo** guarda las tareas y aplica las reglas.

Volvé al ejemplo de MVP. El presentador llama a operaciones concretas como mostrar la lista o mostrar un error. En este ejemplo de MVVM, el ViewModel publica un estado que contiene la lista y el error. La vista observa ese estado y decide cómo dibujarlo. Una vista nueva puede leer el estado actual en cuanto empieza a observar.

### Ejemplo

```text
Vista → alAgregar(título) → ViewModel → Modelo
Vista ← observa EstadoTareas ← ViewModel
```

El ejemplo [Mvvm.kt](../android-samples/kotlin/arquitectura/Mvvm.kt) usa Kotlin puro y una suscripción síncrona para mostrar el flujo. En Android, un ViewModel de Jetpack puede exponer el estado con StateFlow y Compose puede observarlo según el ciclo de vida. [Guía de la capa de interfaz de Android](https://developer.android.com/topic/architecture/ui-layer)

Al ejecutar el ejemplo, la vista recibe un estado inicial vacío. El intento inválido conserva la lista y agrega un error. La siguiente acción válida actualiza la lista y limpia el error.

```text
Tareas: (vacía)
Tareas: Comprar yerba
Tareas: Comprar yerba
Escribí un título
Tareas: Comprar yerba, Pagar la luz
```

### Práctica

1. **Opción múltiple.** ¿Qué le da el ViewModel a la vista? Opciones el estado de la pantalla, una vista de consola o una copia del ViewModel. Respuesta el estado de la pantalla.
2. **Ordenar.** La vista envía el título → el ViewModel le pide al modelo que lo guarde → el ViewModel publica el nuevo estado → la vista dibuja la lista y el error si corresponde.
3. **Opción múltiple.** Después de un título vacío, agregás uno válido. ¿Qué recibe la vista? Opciones la lista actualizada sin error, la lista actualizada con el mismo error o la lista vacía. Respuesta la lista actualizada sin error.

### Tarea para tu máquina

En `main`, agregá un observador que guarde cada estado en una lista. Agregá `"Comprar yerba"`, probá con `" "` y después agregá `"Pagar la luz"`. Usá `check` para verificar qué recibió el observador. Cancelá la suscripción, agregá `"Regar las plantas"` y comprobá que el observador no reciba otro estado.

**Resultado esperado.** El observador recibe cuatro estados, incluido el inicial. El tercero conserva `"Comprar yerba"` y trae el error. El último contiene las dos tareas válidas y el error vale `null`. Después de cancelar, la cantidad de estados recibidos sigue siendo cuatro.

### Para repasar (se escucha en audio)

- La vista envía acciones y dibuja el estado que observa.
- El ViewModel prepara el estado de pantalla y el modelo aplica las reglas.
- El estado reúne lo que la vista necesita mostrar en ese momento.
- Pausá y explicá qué debería ver una pantalla que empieza a observar justo después de un intento fallido.

### Cómo contarlo en una entrevista

**En 30 segundos.** En MVVM la vista envía acciones al ViewModel y observa el estado que este expone. El ViewModel usa el modelo para resolver la acción y publica una versión actualizada. Para probar la lógica de presentación, puedo verificar qué estado se produce ante cada acción.

**La pregunta trampa.** ¿Crear una clase que hereda del ViewModel de Jetpack alcanza para usar MVVM? Esa clase ayuda a manejar el ciclo de vida del estado. La separación se ve en el flujo: qué acciones envía la pantalla, qué estado expone el ViewModel y dónde se aplican las reglas del modelo.

**Cuándo elegir otra solución.** Para algo local de una vista, como expandir una sección, el estado puede quedar en esa vista. Vale la pena elevarlo si afecta el contenido de la pantalla o si varias partes lo necesitan.

---

## Borrador 11 · MVI: de la intención al estado

**Nivel** semi-senior · **Duración estimada** 6 minutos · **Antes** MVVM

### Concepto

En MVI, la **vista** muestra el estado. La **intención** traduce una interacción en una acción con significado, como agregar una tarea o descartar un error. El **modelo** procesa esas acciones y produce el estado que vuelve a dibujar la vista. El MVI original de Cycle.js usa flujos reactivos. Acá usamos una variante didáctica que representa cada intención como un tipo de Kotlin y calcula las transiciones con un reducer. [Model-View-Intent en Cycle.js](https://cycle.js.org/model-view-intent.html)

### Ejemplo

```text
Vista → intención tipada → transición en el modelo → nuevo estado → vista
```

En [Mvi.kt](../android-samples/kotlin/arquitectura/Mvi.kt), `reducir(estado, intencion)` devuelve el siguiente estado. La secuencia agrega una tarea, recibe un título vacío, descarta el error y agrega otra tarea. El orden importa.

```text
Tareas: (vacía)
Tareas: Comprar yerba
Tareas: Comprar yerba
Escribí un título
Tareas: Comprar yerba
Tareas: Comprar yerba, Pagar la luz
```

### Práctica

1. **Opción múltiple.** ¿Qué expresa `DescartarError`? Opciones una intención, el estado de la lista o un mensaje para mostrar. Respuesta una intención.
2. **Ordenar.** La vista emite la intención → el reducer recibe la intención y el estado actual → calcula el siguiente estado → la vista dibuja el resultado.
3. **Opción múltiple.** ¿Qué cambia al descartar el error? Opciones solo el error, todas las tareas o el título de la última tarea. Respuesta solo el error.

### Tarea para tu máquina

Agregá la intención `VaciarLista`. Aplicala después de agregar una tarea válida y provocar un error con un título vacío. Usá `check` para verificar que la lista quede vacía y el error pase a `null`. Conservá una referencia al estado anterior y verificá que todavía tenga la tarea y el mensaje de error.

### Para repasar (se escucha en audio)

- La intención le da significado a una acción de la persona.
- El modelo procesa esa acción y produce un estado actualizado.
- La vista dibuja el estado que recibe.
- Pausá y explicá qué cambia cuando se descarta un error.

### Cómo contarlo en una entrevista

**En 30 segundos.** En MVI represento las acciones de la pantalla como intenciones. El modelo procesa esas intenciones y produce el estado que la vista muestra. Si uso un reducer, puedo probar una transición pasando el estado anterior y la intención.

**La pregunta trampa.** ¿Una intención de MVI es un Intent de Android? En este contexto representa una acción con sentido para la pantalla. El Intent de Android es una API de la plataforma con otro propósito.

**Cuándo elegir otra solución.** Para una tarjeta que solo se expande y se contrae, el estado local puede resolver el comportamiento. Modelar las intenciones por separado aporta más cuando hay varias transiciones relacionadas que querés probar.

---

## Borrador 12 · Flux y Redux: del dispatch al estado compartido

**Nivel** semi-senior · **Duración estimada** 6 minutos · **Antes** MVI

### Concepto

Flux propone un flujo unidireccional. Las vistas generan acciones, un dispatcher las distribuye y los stores actualizan los datos que consumen las vistas. En Redux, el **store** mantiene el estado compartido y, al recibir una acción, ejecuta un **reducer** que calcula el siguiente estado. Un **selector** lee o deriva la parte que necesita una vista. [Comparación de arquitecturas de André Staltz](https://staltz.com/unidirectional-user-interface-architectures.html) · [Flujo de datos en Redux](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)

### Ejemplo

```text
Vista → acción → dispatch en el store → reducer → nuevo estado
Vista ← selector ← estado del store
```

[Redux.kt](../android-samples/kotlin/arquitectura/Redux.kt) simula ese flujo en Kotlin puro. La consola lee el estado después de cada paso que quiere mostrar. El ejemplo agrega dos tareas y después despacha un cambio de búsqueda. El selector muestra solo la tarea que coincide con la búsqueda y el store conserva la lista completa.

```text
[Comprar yerba, Pagar la luz]
[Comprar yerba]
```

### Práctica

1. **Opción múltiple.** ¿Quién calcula el nuevo estado? Opciones el selector, el reducer o la vista. Respuesta el reducer.
2. **Ordenar.** Se despacha una acción → el store ejecuta el reducer → guarda el resultado → la vista lee lo que necesita con un selector.
3. **Opción múltiple.** ¿Qué pasa con «Pagar la luz» al buscar «yerba»? Opciones se borra, queda en el store pero no se muestra o cambia de título. Respuesta queda en el store pero no se muestra.

### Tarea para tu máquina

Agregá la acción `BusquedaLimpiada` y manejala en el reducer. Después de buscar `"yerba"`, despachala y verificá con `check` que vuelvan a verse las dos tareas y que la lista guardada conserve su contenido. Probá también una búsqueda que no coincida con ningún título.

### Para repasar (se escucha en audio)

- Una acción cuenta qué pasó en la aplicación.
- El store ejecuta el reducer y guarda el resultado.
- Un selector puede calcular la lista visible a partir del estado.
- Pausá y explicá cómo mostrarías todas las tareas al limpiar una búsqueda.

### Cómo contarlo en una entrevista

**En 30 segundos.** Redux usa un store para el estado compartido. Las vistas despachan acciones y el store usa un reducer para calcular el siguiente estado. Las vistas leen lo que necesitan mediante selectores. Eso permite probar cómo responde el estado a una acción.

**La pregunta trampa.** ¿Todo el estado tiene que pasar por Redux? El estado de una interacción local puede quedarse en el componente. Consideraría el store cuando varias partes necesitan leer o actualizar el mismo dato.

**Cuándo elegir otra solución.** Un formulario aislado y una pantalla con datos propios pueden usar estado local. El costo de sumar un store cobra sentido cuando hay estado compartido y transiciones que el equipo necesita seguir.

---

## Borrador 13 · VIPER: separá el caso de uso de la navegación

**Nivel** semi-senior · **Duración estimada** 7 minutos · **Antes** MVP

### Concepto

Cuando tocás **Agregar**, hay dos decisiones distintas. Primero se determina si la tarea se puede guardar. Si se guardó, la app abre su detalle. VIPER, una arquitectura descrita originalmente para iOS, ayuda a ubicar ambas decisiones al separar cinco responsabilidades. [Architecting iOS Apps with VIPER](https://www.objc.io/issues/13-architecture/viper/)

- **View** muestra el resultado y comunica las acciones de la persona.
- **Interactor** ejecuta el caso de uso, aplica la regla del título y guarda la tarea.
- **Presenter** recibe la acción, interpreta el resultado y coordina qué mostrar o cuándo navegar.
- **Entity** representa la tarea con su identificador y título.
- **Routing** implementa cómo se abre el detalle.

### Ejemplo

En [Viper.kt](../android-samples/kotlin/arquitectura/Viper.kt), el router de consola imprime el destino que se abriría en una app. El interactor devuelve el resultado del caso de uso con el identificador y el título, y conserva la entidad dentro del caso de uso.

```text
Vista → Presentador → Interactor → Entidad
Vista ← Presentador ← resultado del caso de uso
          Presentador → Router → Detalle (si se guardó)
```

```text
Escribí un título
Guardaste: Comprar yerba
Abrir detalle de la tarea 1
```

### Práctica

1. **Opción múltiple.** ¿Dónde se valida el título? Opciones vista, interactor o router. Respuesta interactor.
2. **Ordenar.** La vista reenvía la acción → el presentador invoca el caso de uso → el interactor confirma que se guardó → el presentador pide al router que abra el detalle.
3. **Opción múltiple.** Cambió la forma de abrir el detalle. ¿Qué pieza recibe ese cambio? Opciones entidad, router o interactor. Respuesta router.

### Tarea para tu máquina

Agregá al interactor una regla que rechace títulos repetidos después de quitar espacios. Definí un resultado específico para ese caso y mostrá un mensaje desde la vista. Ejecutá la secuencia `"Comprar yerba"`, `" Comprar yerba "` y `"Pagar la luz"`.

**Resultado esperado.** Se abren los detalles de las tareas uno y dos. El intento repetido muestra un error y no pide navegación.

### Para repasar (se escucha en audio)

- La vista envía acciones y presenta el resultado.
- El interactor ejecuta el caso de uso y trabaja con las entidades.
- El presentador coordina la respuesta y el router realiza la navegación.
- Pausá y explicá por qué el interactor puede probarse sin abrir una pantalla.

### Cómo contarlo en una entrevista

**En 30 segundos.** Con VIPER separo la pantalla, el caso de uso y la navegación. Si alguien agrega una tarea, el presentador invoca al interactor. Cuando el interactor confirma que la guardó, el presentador actualiza la vista y le pide al router que abra el detalle.

**La pregunta trampa.** ¿Quién decide cuándo navegar? En este ejemplo, el presentador toma esa decisión según el resultado. El router sabe cómo abrir el destino.

**Cuándo elegir otra solución.** En una pantalla simple, separar todas estas responsabilidades puede agregar varias piezas con poca lógica. Consideraría VIPER cuando los casos de uso y las transiciones entre pantallas ya justifican poder probarlos por separado.

---

## Borrador 14 · Clean Architecture y Onion

**Nivel** senior · **Duración estimada** 7 minutos · **Antes** Arquitectura en capas

### Concepto

En Clean Architecture el código de los casos de uso depende de reglas y contratos internos. La interfaz, la base de datos y los frameworks quedan afuera y adaptan esos contratos. Onion comparte la dirección de dependencias hacia el dominio. Su explicación pone el modelo de dominio en el centro y la infraestructura en la periferia. Clean distingue explícitamente las reglas de entidades de los casos de uso de la aplicación. [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) · [Onion Architecture](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/)

### Ejemplo

```text
Al compilar: TareasEnMemoria → contrato Tareas ← AgregarTarea → Entidad
Al ejecutar: AgregarTarea → TareasEnMemoria (a través del contrato)
```

En [Clean.kt](../android-samples/kotlin/arquitectura/Clean.kt), el caso de uso recibe un contrato para guardar tareas. El ejemplo reúne las piezas en un archivo. En una app, el punto de entrada conecta las implementaciones externas con los casos de uso. La salida muestra un título rechazado y otro guardado.

```text
false
true
[Comprar yerba]
```

### Práctica

1. ¿Quién define qué necesita el caso de uso para guardar una tarea? Opciones el código interno, la pantalla o la base. Respuesta el código interno.
2. Ordená la ejecución válida. Validar título → construir tarea → guardar a través del contrato → confirmar.
3. Si cambiás el almacenamiento, ¿qué pieza implementás? Opciones un adaptador para el contrato Tareas, una entidad o una pantalla. Respuesta el adaptador.

### Tarea para tu máquina

Creá otra implementación de `Tareas` que registre cuántas veces se llama a `guardar`. Ejecutá el caso de uso con un título vacío y otro válido. Verificá que el registro tenga una sola llamada y que el título recibido esté sin espacios en los extremos.

### Para repasar (se escucha en audio)

- La dirección de una dependencia de código apunta hacia las reglas internas.
- Un caso de uso puede llamar a un adaptador a través de un contrato que conoce.
- Clean y Onion protegen el dominio de decisiones de infraestructura.
- Pausá y explicá qué cambiarías si reemplazás el almacenamiento en memoria por una base.

### Cómo contarlo en una entrevista

**En 30 segundos.** Pongo las reglas de negocio y los casos de uso adentro. Si un caso de uso necesita guardar algo, declara un contrato y la infraestructura proporciona la implementación. Así puedo probar la regla con memoria y usar otra implementación cuando ejecuto la aplicación.

**La pregunta trampa.** ¿Las llamadas siempre van hacia adentro? La regla se refiere a la dependencia del código. En ejecución, el caso de uso puede pedirle a un adaptador externo que guarde datos usando un contrato interno.

**Cuándo elegir otra solución.** Una aplicación pequeña con reglas estables puede resolver el problema con menos límites. El costo de cada contrato se justifica mejor cuando protege una regla o permite reemplazar una dependencia relevante.

---

## Borrador 15 · Hexagonal: puertos y adaptadores

**Nivel** senior · **Duración estimada** 6 minutos · **Antes** Clean Architecture

### Concepto

Un **puerto** describe cómo conversar con la aplicación. Un puerto de entrada ofrece un caso de uso. Un puerto de salida expresa algo que la aplicación necesita del exterior. Un **adaptador** traduce entre ese contrato y una tecnología concreta. [Arquitectura Hexagonal de Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture)

### Ejemplo

```text
Consola → puerto AgregarTarea → ServicioTareas → puerto GuardarTarea → memoria
```

En [Hexagonal.kt](../android-samples/kotlin/arquitectura/Hexagonal.kt), la consola traduce texto a una llamada y el adaptador de memoria guarda el título. Una prueba puede invocar directamente el mismo puerto de entrada.

```text
Escribí un título
Tarea guardada
[Comprar yerba]
```

### Práctica

1. ¿Qué pieza recibe la entrada específica de la terminal? Opciones el adaptador de consola, el puerto de salida o el servicio. Respuesta el adaptador de consola.
2. Ordená el recorrido. Adaptar entrada → invocar puerto → validar título → guardar mediante el puerto de salida.
3. ¿Qué reemplazás para probar sin almacenamiento real? Opciones adaptador de salida, regla del título o puerto de entrada. Respuesta adaptador de salida.

### Tarea para tu máquina

Agregá una entrada por lote que reciba una lista de títulos y llame al mismo puerto de entrada. Pasale un título vacío y dos válidos. El almacenamiento debe recibir los dos válidos en el mismo orden.

### Para repasar (se escucha en audio)

- Un puerto define una conversación de la aplicación con su entorno.
- Un adaptador conecta esa conversación con una tecnología.
- Distintas entradas pueden usar el mismo caso de uso.
- Pausá y nombrá una entrada y una salida que reemplazarías en una prueba.

### Cómo contarlo en una entrevista

**En 30 segundos.** Defino la aplicación mediante puertos de entrada y salida. La consola o una API llaman al mismo puerto de entrada. Si la aplicación necesita guardar algo, un adaptador implementa el puerto de salida.

**La pregunta trampa.** ¿Cuántos lados tiene que tener el hexágono? El dibujo representa el límite de la aplicación. La cantidad de puertos depende de las conversaciones que tenga con el exterior.

**Cuándo elegir otra solución.** Para un script con una entrada fija y poca lógica, crear varios puertos puede agregar trabajo. Es útil si querés que el núcleo funcione con diferentes entradas, salidas o dobles de prueba.

---

## Borrador 16 · Arquitectura modular: diseñá un límite

**Nivel** senior · **Duración estimada** 6 minutos · **Antes** Hexagonal

### Concepto

Un módulo agrupa código que cumple un propósito y expone una API para que otros lo usen. En la app de ejemplo, **Tareas** administra los títulos y **Resumen** muestra cuántos hay. Resumen puede depender del contrato de lectura. El punto de entrada conecta ese contrato a la implementación. [Guía de modularización de Android](https://developer.android.com/topic/modularization)

### Ejemplo

```text
app → módulo tareas
app → módulo resumen → API de lectura
módulo tareas → API de lectura
```

[ArquitecturaModular.kt](../android-samples/kotlin/arquitectura/ArquitecturaModular.kt) reúne las piezas en un archivo para mostrar ese contrato. En un proyecto Gradle, las flechas se vuelven dependencias declaradas entre módulos y se puede controlar qué código queda visible. El ejemplo imprime `Tareas guardadas: 2`.

### Práctica

1. ¿Qué necesita conocer Resumen? Opciones el contrato de lectura, la clase que guarda en memoria o el framework. Respuesta el contrato.
2. ¿Qué cambio puede quedar dentro de Tareas? Opciones guardar en una base manteniendo la API, eliminar el contrato de lectura o cambiar la firma que usa Resumen. Respuesta cambiar la implementación manteniendo la API.
3. ¿Qué harías si Tareas y Resumen se necesitan importar entre sí? Opciones revisar responsabilidades y extraer un contrato común, duplicar la base o agregar otra dependencia circular. Respuesta revisar el límite.

### Tarea para tu máquina

Creá una implementación de `LecturaTareas` que devuelva una lista vacía. Conectala desde `main` y comprobá que Resumen diga `Tareas guardadas: 0` sin modificar esa clase. Dibujá el grafo antes de separarlo en módulos reales.

### Para repasar (se escucha en audio)

- Un módulo tiene un propósito y expone un contrato.
- Un límite útil permite cambiar detalles sin afectar a quienes consumen la API.
- Un grafo de dependencias ayuda a detectar ciclos.
- Pausá y explicá qué necesitaría conocer un módulo que muestra estadísticas.

### Cómo contarlo en una entrevista

**En 30 segundos.** Separo módulos por responsabilidad. Defino qué API publican y qué dependencias permito, y ubico el ensamblado en la aplicación. El resultado tiene valor si puedo cambiar o probar una parte con menos impacto en las demás.

**La pregunta trampa.** ¿Tener muchos módulos garantiza bajo acoplamiento? El grafo y las APIs muestran cuánto saben unos de otros. Un cambio frecuente que toca todos los módulos es una señal para revisar el corte.

**Cuándo elegir otra solución.** En proyectos chicos, un solo módulo con límites claros puede ser suficiente. Separar módulos agrega configuración, decisiones de visibilidad y mantenimiento.

---

## Borrador 17 · Monolito vs. microservicios

**Nivel** senior · **Duración estimada** 7 minutos · **Antes** Arquitectura modular

### Concepto

En un monolito, las capacidades se entregan como una unidad desplegable. Cualquier cantidad de módulos internos puede formar parte de ese despliegue. En una arquitectura de microservicios, se separan capacidades en servicios que pueden desplegarse independientemente. Una llamada remota agrega latencia y fallas parciales. [Microservices, James Lewis y Martin Fowler](https://martinfowler.com/articles/microservices.html)

### Ejemplo

```text
Monolito modular: cliente → [ tareas → resumen ]     un despliegue
Servicios:        cliente → servicio tareas ⇄ servicio resumen
```

En [Microservicios.kt](../android-samples/kotlin/arquitectura/Microservicios.kt) simulamos dos resultados del llamado que guarda una tarea. Si la respuesta se pierde, el cliente queda sin confirmación. Una prueba puede simular cada caso sin levantar servidores.

```text
Tarea confirmada
Guardado sin confirmar
```

### Práctica

1. ¿Dos módulos en el mismo despliegue pueden formar un monolito modular? Opciones sí, solo si usan dos procesos o solo si tienen bases separadas. Respuesta sí.
2. ¿Qué sabe el cliente si se pierde la respuesta? Opciones que guardó, que falló o que falta confirmación. Respuesta falta confirmación.
3. ¿Qué conviene medir antes de separar servicios? Opciones la necesidad de despliegues y escalado independientes, la longitud de los nombres o cuántas carpetas hay. Respuesta despliegue y escalado.

### Tarea para tu máquina

Agregá `RECHAZADA` al simulador y mostrá `Título inválido` para ese resultado. Verificá que rechazo, guardado confirmado y ausencia de respuesta produzcan tres mensajes distintos. Explicá qué identificador reutilizarías si decidís permitir reintentos de la misma operación.

### Para repasar (se escucha en audio)

- Un monolito puede tener módulos y desplegarse como una sola unidad.
- Los servicios ganan autonomía de entrega y agregan comunicación por red.
- Una respuesta perdida deja el resultado sin confirmar.
- Pausá y explicá qué costo operativo aceptarías para desplegar una capacidad por separado.

### Cómo contarlo en una entrevista

**En 30 segundos.** Empezaría por entender qué necesita evolucionar o desplegarse con independencia. Un monolito modular concentra la operación. Los microservicios permiten separar entregas, a cambio de manejar red, observabilidad y consistencia entre servicios.

**La pregunta trampa.** ¿Se puede escalar un monolito? Sí. Puedo desplegar réplicas. Con servicios separados puedo escalar una capacidad específica si ese límite coincide con el cuello de botella.

**Cuándo elegir otra solución.** Para un equipo chico y un dominio que todavía cambia, la separación física puede obligar a coordinar cambios en varios sistemas. Consideraría un servicio cuando hay una necesidad concreta de autonomía y capacidad para operarlo.

---

## Borrador 18 · Una pantalla, tres enfoques: MVP, MVVM y VIPER

**Nivel** senior · **Duración estimada** 7 minutos · **Antes** MVP, MVVM y VIPER

### Concepto

Compará los patrones con el mismo criterio de aceptación. En una pantalla de tareas, tocar Agregar con un título vacío muestra un error. Con un título válido se guarda la tarea. Seguí esas dos acciones en los ejemplos y fijate dónde se expresa el resultado para la pantalla.

### Ejemplo

| Enfoque | Qué hace la acción | Qué observa una prueba |
| --- | --- | --- |
| MVP | El presentador invoca el modelo y llama a la vista con el contenido o el error. | Las llamadas que registra una vista de prueba. |
| MVVM | El ViewModel invoca el modelo y publica un estado con tareas y error. | El estado que recibe un observador. |
| VIPER | El presentador invoca un interactor, interpreta el resultado y actualiza la vista. El ejemplo también navega al detalle tras guardar. | La salida del caso de uso y la decisión de pedir navegación. |

Usá el código ya compilado de [MVP](../android-samples/kotlin/arquitectura/Mvp.kt), [MVVM](../android-samples/kotlin/arquitectura/Mvvm.kt) y [VIPER](../android-samples/kotlin/arquitectura/Viper.kt). La comparación parte de las mismas acciones. Para igualar la salida de la pantalla, la tarea pide dar el mismo tratamiento al guardado en las tres versiones.

### Práctica

1. ¿En qué ejemplo la pantalla observa un estado con lista y error? Opciones MVP, MVVM o VIPER. Respuesta MVVM.
2. ¿Qué componente ejecuta el caso de uso en el ejemplo de VIPER? Opciones vista, interactor o router. Respuesta interactor.
3. Si una vista de prueba registra operaciones como «mostrar error», ¿qué ejemplo ilustra eso? Opciones MVP, MVVM o Modelo de tareas. Respuesta MVP.

### Tarea para tu máquina

Hacé que las tres variantes de consola muestren un mensaje al fallar y la lista actualizada al guardar. Adaptá la vista de MVP, el render de MVVM y el resultado del caso de uso en VIPER. Para igualar el caso base, dejá la navegación de VIPER para una acción separada. Probá con un título vacío y luego con `"Comprar yerba"`.

**Resultado esperado.** Cada ejemplo muestra `Escribí un título` y luego `Tareas: Comprar yerba`. Las tres implementaciones conservan su forma de comunicar el resultado.

### Para repasar (se escucha en audio)

- En el ejemplo de MVP, el presentador llama a la vista.
- En el de MVVM, la pantalla observa el estado que publica el modelo de vista.
- En el de VIPER, el caso de uso y la navegación tienen responsabilidades separadas.
- Pausá y explicá qué observarías al probar un título vacío en cada ejemplo.

### Cómo contarlo en una entrevista

**En 30 segundos.** Para comparar patrones, fijo primero el comportamiento que la persona necesita. Después sigo una acción y veo cómo se actualiza la pantalla, dónde está la regla y qué se puede probar por separado. Los ejemplos de MVP, MVVM y VIPER toman decisiones distintas sobre esos límites.

**La pregunta trampa.** ¿Cuál tiene más clases y por eso escala mejor? La cantidad de clases no mide qué tan fácil es hacer el cambio que importa. Compararía el manejo de estado, la cantidad de reglas, la navegación y cómo trabaja el equipo.

**Cuándo elegir otra solución.** En una UI con una sola acción local, un estado sencillo puede cubrir la necesidad. Introduciría más piezas cuando aparezcan responsabilidades que puedan cambiar o probarse por separado.

---


### Nota técnica

Ahora cada ejemplo empieza con su propio `package` (por ejemplo `package arquitectura.poo.herencia`). Hace falta para que todos compilen juntos en el proyecto Gradle: si no, chocan los nombres repetidos como `Tarea` y `main`. Los ejemplos de las lecciones 1 y 2 también lo muestran ahora.
