package arquitectura.mvi

sealed interface Intencion {
    data class Agregar(val titulo: String) : Intencion
    data object DescartarError : Intencion
}

data class EstadoTareas(
    val tareas: List<String> = emptyList(),
    val error: String? = null,
)

fun reducir(estado: EstadoTareas, intencion: Intencion): EstadoTareas =
    when (intencion) {
        is Intencion.Agregar -> {
            val titulo = intencion.titulo.trim()
            if (titulo.isEmpty()) estado.copy(error = "Escribí un título")
            else estado.copy(tareas = estado.tareas + titulo, error = null)
        }
        Intencion.DescartarError -> estado.copy(error = null)
    }

fun mostrar(estado: EstadoTareas) {
    println("Tareas: ${estado.tareas.joinToString().ifEmpty { "(vacía)" }}")
    estado.error?.let { println(it) }
}

fun main() {
    val intenciones = listOf(
        Intencion.Agregar("Comprar yerba"),
        Intencion.Agregar(" "),
        Intencion.DescartarError,
        Intencion.Agregar("Pagar la luz"),
    )
    intenciones.runningFold(EstadoTareas(), ::reducir).forEach(::mostrar)
}
