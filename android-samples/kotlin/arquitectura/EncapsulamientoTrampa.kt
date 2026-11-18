package arquitectura.poo.encapsulamientotrampa

class Tarea {
    private val _subtareas = mutableListOf("Embalar libros")
    val subtareas: List<String>
        get() = _subtareas
}

fun main() {
    val tarea = Tarea()
    (tarea.subtareas as MutableList<String>).add("Algo que nadie validó")
    println(tarea.subtareas)
}
