package solid.responsabilidad

data class Tarea(val titulo: String, val completada: Boolean)

class InformeAntes {
    fun generar(tareas: List<Tarea>): String =
        "Completadas: ${tareas.count { it.completada }} de ${tareas.size}"
}

data class Totales(val completadas: Int, val total: Int)

fun calcularTotales(tareas: List<Tarea>): Totales =
    Totales(tareas.count { it.completada }, tareas.size)

fun formatearInforme(totales: Totales): String =
    "Completadas: ${totales.completadas} de ${totales.total}"

fun main() {
    val tareas = listOf(Tarea("Comprar yerba", true), Tarea("Pagar la luz", false))
    println(InformeAntes().generar(tareas))
    println(formatearInforme(calcularTotales(tareas)))
}
