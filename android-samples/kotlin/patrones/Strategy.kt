package patrones.strategy

data class Tarea(val titulo: String, val diasRestantes: Int)

fun interface OrdenTareas {
    fun ordenar(tareas: List<Tarea>): List<Tarea>
}

val porTitulo = OrdenTareas { tareas -> tareas.sortedBy { it.titulo } }
val porVencimiento = OrdenTareas { tareas -> tareas.sortedBy { it.diasRestantes } }

class PantallaTareas(private val tareas: List<Tarea>) {
    fun mostrar(orden: OrdenTareas): String =
        orden.ordenar(tareas).joinToString { it.titulo }
}

fun main() {
    val pantalla = PantallaTareas(listOf(Tarea("Comprar yerba", 3), Tarea("Pagar la luz", 1)))
    println(pantalla.mostrar(porTitulo))
    println(pantalla.mostrar(porVencimiento))
}
