package katas.contarvocales

private val vocales = setOf('a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú', 'ü')

fun contarVocales(texto: String): Int = texto.lowercase().count { it in vocales }

fun main() {
    println(contarVocales("Rollito"))
    println(contarVocales("Programación en Kotlin"))
    println(contarVocales("xyz"))
}
