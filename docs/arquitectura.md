# Arquitectura: lo que te preguntan en una entrevista

Sección del track Fundamentos (`track: fundamentos`, `modulo: Arquitectura`). Es la única con repaso en audio.

> Los borradores 1 y 2 están aprobados y maquetados en `src/content/fundamentos/arquitectura/`. Los borradores 3 a 7 (el resto de POO) esperan revisión.

Todo el código está en Kotlin y sale de `android-samples/kotlin/arquitectura/`. Cada ejemplo se compiló con kotlinc 2.3.10, y las salidas que aparecen acá son las reales.

## Recorrido propuesto

POO es la base y no entra en una sola lección de 3 a 7 minutos, así que se divide en seis. Los demás temas arrancan con una lección cada uno y se amplían si hace falta.

| # | Tema | Lecciones |
| --- | --- | --- |
| 1 | POO | Clases y objetos · Encapsulamiento · Abstracción e interfaces · Herencia · Polimorfismo · Composición vs. herencia |
| 2 | Arquitectura en capas | Presentación, dominio y datos |
| 3 | MVC | — |
| 4 | MVP | — |
| 5 | MVVM | — |
| 6 | MVI | — |
| 7 | Flux / Redux | — |
| 8 | VIPER | — |
| 9 | Clean Architecture | Incluye la comparación con Onion |
| 10 | Hexagonal | Puertos y adaptadores |
| 11 | Arquitectura modular | — |
| 12 | Monolito vs. microservicios | — |

Más adelante va la lección comparativa del brief: la misma pantalla hecha en MVP, MVVM y VIPER.

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

## Para revisar (borradores 3 a 7)

- [ ] ¿Las analogías te funcionan? Cajero automático, enchufe, contratos, botón de play, Lego.
- [ ] Encapsulamiento: ¿la trampa del cast queda clara o es demasiado detalle para junior?
- [ ] Composición la marqué semi-senior. ¿Te parece bien, o todo POO queda en junior?
- [ ] ¿Algo que te hayan preguntado en entrevistas y no esté?

### Nota técnica

Ahora cada ejemplo empieza con su propio `package` (por ejemplo `package arquitectura.poo.herencia`). Hace falta para que todos compilen juntos en el proyecto Gradle: si no, chocan los nombres repetidos como `Tarea` y `main`. Los ejemplos de las lecciones 1 y 2 también lo muestran ahora.
