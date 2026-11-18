package kotlinbasico.colecciones

data class Tarea(val titulo: String, val completada: Boolean)

fun main() {
    val tareas = listOf(
        Tarea("Comprar yerba", true),
        Tarea("Pagar la luz", false),
        Tarea("Regar las plantas", false),
    )
    val titulosPendientes = tareas
        .filter { tarea -> !tarea.completada }
        .map { tarea -> tarea.titulo }

    println(titulosPendientes)
    println("Total: ${tareas.size}")
}
