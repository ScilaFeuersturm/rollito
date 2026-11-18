package patrones.repository

data class Tarea(val titulo: String)

interface RepositorioTareas {
    fun guardar(tarea: Tarea)
    fun listar(): List<Tarea>
}

class TareasEnMemoria : RepositorioTareas {
    private val tareas = mutableListOf<Tarea>()

    override fun guardar(tarea: Tarea) {
        tareas.add(tarea)
    }

    override fun listar(): List<Tarea> = tareas.toList()
}

class MostrarTareas(private val repositorio: RepositorioTareas) {
    fun ejecutar(): String = repositorio.listar().joinToString { it.titulo }
}

fun main() {
    val repositorio = TareasEnMemoria()
    repositorio.guardar(Tarea("Comprar yerba"))
    repositorio.guardar(Tarea("Pagar la luz"))
    println(MostrarTareas(repositorio).ejecutar())
}
