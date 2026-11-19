package trainee.variables

const val MAXIMO_DE_TAREAS = 100 // constante de compilación: solo tipos básicos y String, en el nivel superior o en un object

fun main() {
    val titulo = "Comprar yerba"   // val: no se puede reasignar (como let en Swift)
    var pendientes = 3              // var: se puede reasignar
    pendientes = pendientes - 1

    val precio: Double = 1500.50    // tipo explícito
    val cantidad = 2                // tipo inferido: Int
    val total = precio * cantidad   // Double
    val hecha = false               // Boolean
    val inicial = 'C'               // Char, con comillas simples

    println(titulo)
    println(pendientes)
    println(total)
    println(hecha)
    println(inicial)
    println(MAXIMO_DE_TAREAS)
    println(cantidad / 3)           // división entera entre Int
    println(cantidad / 3.0)         // con un Double, división con decimales
}
