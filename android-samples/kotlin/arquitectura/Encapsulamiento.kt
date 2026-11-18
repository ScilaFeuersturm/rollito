package arquitectura.poo.encapsulamiento

class Tarea(val titulo: String) {
    var completada = false
        private set

    private val _subtareas = mutableListOf<String>()
    val subtareas: List<String>
        get() = _subtareas.toList()

    fun agregarSubtarea(texto: String) {
        if (completada) {
            println("No se pueden agregar subtareas a una tarea completada")
            return
        }
        _subtareas.add(texto)
    }

    fun completar() {
        completada = true
    }
}

fun main() {
    val mudanza = Tarea("Mudanza")
    mudanza.agregarSubtarea("Embalar libros")
    mudanza.completar()
    mudanza.agregarSubtarea("Desarmar la cama")

    println("Subtareas: ${mudanza.subtareas.size}")
    // mudanza.completada = false  // No compila: el setter es privado.
}
