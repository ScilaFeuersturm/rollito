package trainee.dataenumsealed

// data class: genera equals, hashCode, toString y copy (lo más parecido a un struct de Swift).
data class Tarea(val id: Int, val titulo: String, val hecha: Boolean = false)

// enum class: un conjunto fijo de valores.
enum class Prioridad(val etiqueta: String) {
    ALTA("Alta"), MEDIA("Media"), BAJA("Baja")
}

// sealed: un conjunto fijo de tipos, cada uno con sus datos (como un enum con valores asociados en Swift).
sealed interface Estado {
    data object Cargando : Estado
    data class Listo(val tareas: List<Tarea>) : Estado
    data class Error(val mensaje: String) : Estado
}

fun describir(estado: Estado): String = when (estado) { // when exhaustivo: sin else
    Estado.Cargando -> "Cargando…"
    is Estado.Listo -> "${estado.tareas.size} tareas"
    is Estado.Error -> "Error: ${estado.mensaje}"
}

fun main() {
    val a = Tarea(1, "Yerba")
    val b = Tarea(1, "Yerba")
    println(a == b)                           // true: compara contenido
    println(a === b)                          // false: no es el mismo objeto
    println(a)
    println(a.copy(hecha = true))

    println(Prioridad.ALTA.etiqueta)
    println(Prioridad.entries.map { it.name })

    println(describir(Estado.Cargando))
    println(describir(Estado.Listo(listOf(a))))
    println(describir(Estado.Error("Sin conexión")))
}
