package trainee.funciones

// Parámetros con tipo, tipo de retorno después de los dos puntos.
fun sumar(a: Int, b: Int): Int {
    return a + b
}

// Función de una sola expresión: el tipo de retorno se infiere.
fun duplicar(n: Int) = n * 2

// Valores por defecto y argumentos con nombre (en Swift serían los labels).
fun saludar(nombre: String, saludo: String = "Hola", exclamacion: Boolean = false): String {
    val final = if (exclamacion) "!" else "."
    return "$saludo, $nombre$final"
}

// Sin valor de retorno: Unit (como Void en Swift); no hace falta escribirlo.
fun imprimirSeparador() {
    println("---")
}

fun main() {
    println(sumar(2, 3))
    println(duplicar(21))
    println(saludar("Ana"))
    println(saludar("Ana", exclamacion = true))
    println(saludar(saludo = "Buen día", nombre = "Beto"))
    imprimirSeparador()
}
