package arquitectura.mvc

class ModeloTareas {
    private val tareas = mutableListOf<String>()

    fun agregar(titulo: String): Boolean {
        if (titulo.isBlank()) return false
        tareas.add(titulo.trim())
        return true
    }

    fun listar(): List<String> = tareas.toList()
}

class VistaTareas {
    fun mostrar(tareas: List<String>) {
        println("Tareas: ${tareas.joinToString()}")
    }

    fun mostrarError() {
        println("Escribí un título")
    }
}

class ControladorTareas(
    private val modelo: ModeloTareas,
    private val vista: VistaTareas,
) {
    fun alAgregar(titulo: String) {
        if (modelo.agregar(titulo)) {
            vista.mostrar(modelo.listar())
        } else {
            vista.mostrarError()
        }
    }
}

fun main() {
    val controlador = ControladorTareas(ModeloTareas(), VistaTareas())
    controlador.alAgregar("Comprar yerba")
    controlador.alAgregar(" ")
    controlador.alAgregar("Pagar la luz")
}
