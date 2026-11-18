package katas.palindromo

fun esPalindromo(texto: String): Boolean {
    val limpio = texto.lowercase().filter { it.isLetterOrDigit() }
    return limpio == limpio.reversed()
}

fun main() {
    println(esPalindromo("Anita lava la tina"))
    println(esPalindromo("Rollito"))
}
