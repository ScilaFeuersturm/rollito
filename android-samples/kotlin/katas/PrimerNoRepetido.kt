package katas.primernorepetido

fun primerNoRepetido(texto: String): Char? {
    val cantidades = texto.groupingBy { it }.eachCount()
    return texto.firstOrNull { cantidades[it] == 1 }
}

fun main() {
    println(primerNoRepetido("android"))
    println(primerNoRepetido("aabb"))
}
