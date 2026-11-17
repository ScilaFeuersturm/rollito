# Arquitectura: lo que te preguntan en una entrevista

Sección del track Fundamentos (`track: fundamentos`, `modulo: Arquitectura`). Es la única con repaso en audio.

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

## Para revisar

- [ ] ¿Las analogías (receta y tortas, restaurante) te funcionan?
- [ ] ¿El nivel de detalle de la parte de entrevista está bien, o lo querés más corto?
- [ ] ¿El audio lee solo el resumen, o también la respuesta de 30 segundos?
- [ ] ¿Uso el ejemplo de tareas en toda la sección, como en el track Android, o voy cambiando de ejemplo?
