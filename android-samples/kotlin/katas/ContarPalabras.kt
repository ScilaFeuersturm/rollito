package katas.contarpalabras

fun contarPalabras(texto: String): Map<String, Int> =
    texto.lowercase()
        .split(Regex("[^\\p{L}\\p{N}]+"))
        .filter { it.isNotEmpty() }
        .groupingBy { it }
        .eachCount()

fun main() {
    println(contarPalabras("Mate, mate y más mate."))
}
