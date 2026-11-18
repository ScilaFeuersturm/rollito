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
