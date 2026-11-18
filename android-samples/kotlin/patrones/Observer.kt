package patrones.observer

class ListaTareas {
    private var tareas = emptyList<String>()
    private val observadores = mutableMapOf<Int, (List<String>) -> Unit>()
    private var siguienteId = 0

    fun observar(observador: (List<String>) -> Unit): () -> Unit {
        val id = siguienteId++
        observadores[id] = observador
        return { observadores.remove(id) }
    }

    fun agregar(titulo: String) {
        tareas = tareas + titulo
        val estado = tareas
        observadores.values.toList().forEach { it(estado) }
    }
}

fun main() {
    val lista = ListaTareas()
    val dejarDeObservar = lista.observar { tareas ->
        println("Pantalla: ${tareas.joinToString()}")
    }
    lista.agregar("Comprar yerba")
    dejarDeObservar()
    lista.agregar("Pagar la luz")
    println("Segunda tarea guardada")
}
