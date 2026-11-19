package trainee.controldeflujo

fun describir(pendientes: Int): String = when {
    pendientes == 0 -> "Nada pendiente"
    pendientes in 1..3 -> "Pocas tareas"   // rango inclusivo: 1, 2 y 3
    else -> "Muchas tareas"
}

fun prioridad(codigo: Char): String = when (codigo) {
    'A' -> "Alta"
    'M', 'm' -> "Media"                     // varios valores en una rama
    else -> "Baja"
}

fun main() {
    val horas = 15
    val momento = if (horas < 12) "mañana" else "tarde" // if es una expresión: devuelve un valor
    println(momento)

    println(describir(0))
    println(describir(2))
    println(describir(10))
    println(prioridad('m'))

    for (i in 1..3) print("$i ")             // 1 2 3
    println()
    for (i in 0 until 3) print("$i ")        // 0 1 2 (sin el 3)
    println()
    for (i in 10 downTo 0 step 5) print("$i ") // 10 5 0
    println()

    val tareas = listOf("Yerba", "Luz")
    for ((indice, tarea) in tareas.withIndex()) println("$indice: $tarea")

    var intentos = 0
    while (intentos < 2) intentos++
    println("Intentos: $intentos")
}
