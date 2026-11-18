package arquitectura.modular

interface LecturaTareas {
    fun titulos(): List<String>
}

class Resumen(private val tareas: LecturaTareas) {
    fun mostrar(): String = "Tareas guardadas: ${tareas.titulos().size}"
}

class TareasEnMemoria(private val guardadas: List<String>) : LecturaTareas {
    override fun titulos(): List<String> = guardadas.toList()
}

fun main() {
    val tareas = TareasEnMemoria(listOf("Comprar yerba", "Pagar la luz"))
    println(Resumen(tareas).mostrar())
}
