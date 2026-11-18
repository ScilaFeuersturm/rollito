package arquitectura.mvvm

class ModeloTareas {
    private val tareas = mutableListOf<String>()

    fun agregar(titulo: String): Boolean {
        if (titulo.isBlank()) return false
        tareas.add(titulo.trim())
        return true
    }

    fun listar(): List<String> = tareas.toList()
}

data class EstadoTareas(
    val tareas: List<String> = emptyList(),
    val error: String? = null,
)

class TareasViewModel(private val modelo: ModeloTareas) {
    private var estado = EstadoTareas(tareas = modelo.listar())
    private val observadores = mutableListOf<(EstadoTareas) -> Unit>()

    fun observar(observador: (EstadoTareas) -> Unit): () -> Unit {
        observadores.add(observador)
        observador(estado)
        return { observadores.remove(observador) }
    }

    fun alAgregar(titulo: String) {
        val guardada = modelo.agregar(titulo)
        estado = EstadoTareas(
            tareas = modelo.listar(),
            error = if (guardada) null else "Escribí un título",
        )
        observadores.toList().forEach { it(estado) }
    }
}

fun mostrar(estado: EstadoTareas) {
    val lista = estado.tareas.joinToString().ifEmpty { "(vacía)" }
    println("Tareas: $lista")
    estado.error?.let { println(it) }
}

fun main() {
    val viewModel = TareasViewModel(ModeloTareas())
    val dejarDeObservar = viewModel.observar(::mostrar)
    viewModel.alAgregar("Comprar yerba")
    viewModel.alAgregar(" ")
    viewModel.alAgregar("Pagar la luz")
    dejarDeObservar()
}
