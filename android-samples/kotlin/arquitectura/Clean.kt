package arquitectura.clean

data class Tarea(val titulo: String)

interface Tareas {
    fun guardar(tarea: Tarea)
}

class AgregarTarea(private val tareas: Tareas) {
    fun ejecutar(titulo: String): Boolean {
        val limpio = titulo.trim()
        if (limpio.isEmpty()) return false
        tareas.guardar(Tarea(limpio))
        return true
    }
}

class TareasEnMemoria : Tareas {
    private val guardadas = mutableListOf<Tarea>()

    override fun guardar(tarea: Tarea) {
        guardadas.add(tarea)
    }

    fun titulos(): List<String> = guardadas.map { it.titulo }
}

fun main() {
    val memoria = TareasEnMemoria()
    val agregar = AgregarTarea(memoria)
    println(agregar.ejecutar(" "))
    println(agregar.ejecutar("Comprar yerba"))
    println(memoria.titulos())
}
