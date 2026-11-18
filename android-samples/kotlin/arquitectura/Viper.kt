package arquitectura.viper

data class Tarea(val id: Int, val titulo: String)

sealed interface ResultadoAgregar {
    data class Guardada(val id: Int, val titulo: String) : ResultadoAgregar
    data object TituloVacio : ResultadoAgregar
}

class InteractorTareas {
    private val tareas = mutableListOf<Tarea>()

    fun agregar(titulo: String): ResultadoAgregar {
        val limpio = titulo.trim()
        if (limpio.isEmpty()) return ResultadoAgregar.TituloVacio

        val tarea = Tarea(tareas.size + 1, limpio)
        tareas.add(tarea)
        return ResultadoAgregar.Guardada(tarea.id, tarea.titulo)
    }
}

class VistaTareas {
    fun mostrarConfirmacion(titulo: String) = println("Guardaste: $titulo")
    fun mostrarError() = println("Escribí un título")
}

class RouterTareas {
    fun abrirDetalle(id: Int) = println("Abrir detalle de la tarea $id")
}

class PresentadorTareas(
    private val vista: VistaTareas,
    private val interactor: InteractorTareas,
    private val router: RouterTareas,
) {
    fun alAgregar(titulo: String) {
        when (val resultado = interactor.agregar(titulo)) {
            is ResultadoAgregar.Guardada -> {
                vista.mostrarConfirmacion(resultado.titulo)
                router.abrirDetalle(resultado.id)
            }
            ResultadoAgregar.TituloVacio -> vista.mostrarError()
        }
    }
}

fun main() {
    val presentador = PresentadorTareas(VistaTareas(), InteractorTareas(), RouterTareas())
    presentador.alAgregar(" ")
    presentador.alAgregar("Comprar yerba")
}
