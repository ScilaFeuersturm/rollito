package solid.abiertocerrado

fun describirAntes(titulo: String, formato: String): String = when (formato) {
    "texto" -> "Tarea: $titulo"
    "lista" -> "- $titulo"
    else -> error("Formato desconocido")
}

fun interface FormatoTarea {
    fun describir(titulo: String): String
}

fun mostrar(titulo: String, formato: FormatoTarea) {
    println(formato.describir(titulo))
}

fun main() {
    val titulo = "Comprar yerba"
    println(describirAntes(titulo, "lista"))
    mostrar(titulo, FormatoTarea { "- $it" })
    mostrar(titulo, FormatoTarea { "[ ] $it" })
}
