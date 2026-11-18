package kotlinbasico.extensiones

fun String.tituloVisible(): String = trim().ifEmpty { "Sin título" }

fun main() {
    val titulo = " Comprar yerba "
    println(titulo.tituloVisible())
    println(" ".tituloVisible())
    println("Original: [$titulo]")
}
