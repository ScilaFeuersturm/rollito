package trainee.coleccionesylambdas

data class Tarea(val titulo: String, val horas: Int, val hecha: Boolean)

fun main() {
    val soloLectura = listOf("Yerba", "Luz")         // List: no se puede modificar
    val modificable = mutableListOf("Yerba")         // MutableList: sí
    modificable.add("Luz")
    println(soloLectura == modificable)              // compara contenido: true

    val tareas = listOf(
        Tarea("Comprar yerba", 1, true),
        Tarea("Pagar la luz", 2, false),
        Tarea("Estudiar Kotlin", 3, false),
    )

    // Lambdas: { parámetro -> cuerpo }. Si hay un solo parámetro, se llama `it` (como $0 en Swift).
    val pendientes = tareas.filter { !it.hecha }
    println(pendientes.map { it.titulo })
    println(tareas.sumOf { it.horas })
    println(tareas.any { it.horas > 2 })
    println(tareas.first { it.hecha }.titulo)
    println(tareas.sortedByDescending { it.horas }.map { it.titulo })

    val porEstado = tareas.groupBy { if (it.hecha) "hechas" else "pendientes" }
    println(porEstado.mapValues { (_, lista) -> lista.size })

    val capitales = mapOf("Argentina" to "Buenos Aires", "Uruguay" to "Montevideo") // Map
    println(capitales["Argentina"])
    println(capitales["Chile"])                      // si la clave no está: null

    val sumar = { a: Int, b: Int -> a + b }          // una lambda guardada en una variable
    println(sumar(2, 3))
}
