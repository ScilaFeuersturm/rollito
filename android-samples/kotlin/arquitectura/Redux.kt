package arquitectura.redux

sealed interface Accion {
    data class TareaAgregada(val titulo: String) : Accion
    data class BusquedaCambiada(val texto: String) : Accion
}

data class Estado(
    val tareas: List<String> = emptyList(),
    val busqueda: String = "",
)

fun reducir(estado: Estado, accion: Accion): Estado = when (accion) {
    is Accion.TareaAgregada -> estado.copy(tareas = estado.tareas + accion.titulo)
    is Accion.BusquedaCambiada -> estado.copy(busqueda = accion.texto.trim())
}

class Store {
    var estado = Estado()
        private set

    fun dispatch(accion: Accion) {
        estado = reducir(estado, accion)
    }
}

fun tareasVisibles(estado: Estado): List<String> =
    estado.tareas.filter { it.contains(estado.busqueda, ignoreCase = true) }

fun main() {
    val store = Store()
    store.dispatch(Accion.TareaAgregada("Comprar yerba"))
    store.dispatch(Accion.TareaAgregada("Pagar la luz"))
    println(tareasVisibles(store.estado))
    store.dispatch(Accion.BusquedaCambiada("yerba"))
    println(tareasVisibles(store.estado))
}
