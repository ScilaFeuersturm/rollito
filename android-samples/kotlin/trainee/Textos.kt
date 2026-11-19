package trainee.textos

fun main() {
    val nombre = "Ana"
    val tareas = 3

    println("Hola, $nombre")                         // string template, como "\(nombre)" en Swift
    println("Tenés ${tareas + 1} tareas mañana")     // con llaves, cualquier expresión
    println("${nombre.uppercase()} tiene ${nombre.length} letras")

    val texto = """
        Lista:
        - Comprar yerba
        - Pagar la luz
    """.trimIndent()                                 // texto de varias líneas
    println(texto)

    val a = "hola"
    val b = "HOLA".lowercase()
    println(a == b)                                  // == compara contenido (como equals)
    println(a.equals("HOLA", ignoreCase = true))
}
