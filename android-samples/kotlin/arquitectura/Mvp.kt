package arquitectura.mvp

class ModeloTareas {
    private val tareas = mutableListOf<String>()

    fun agregar(titulo: String): Boolean {
        if (titulo.isBlank()) return false
        tareas.add(titulo.trim())
        return true
    }

    fun listar(): List<String> = tareas.toList()
}

interface VistaTareas {
    fun mostrarTareas(tareas: List<String>)
    fun mostrarTituloVacio()
}

class PresentadorTareas(
    private val modelo: ModeloTareas,
    private val vista: VistaTareas,
) {
    fun alAgregar(titulo: String) {
        if (modelo.agregar(titulo)) {
            vista.mostrarTareas(modelo.listar())
        } else {
            vista.mostrarTituloVacio()
        }
    }
}

class VistaConsola : VistaTareas {
    override fun mostrarTareas(tareas: List<String>) {
        println("Tareas: ${tareas.joinToString()}")
    }

    override fun mostrarTituloVacio() {
        println("Escribí un título")
    }
}

fun main() {
    val presentador = PresentadorTareas(ModeloTareas(), VistaConsola())
    presentador.alAgregar("Comprar yerba")
    presentador.alAgregar(" ")
    presentador.alAgregar("Pagar la luz")
}
