package patrones.singleton

object PoliticaTitulos {
    const val maximo = 50

    fun esValido(titulo: String): Boolean = titulo.trim().length in 1..maximo
}

fun main() {
    val politicaDelFormulario = PoliticaTitulos
    val politicaDeImportacion = PoliticaTitulos

    println("Misma instancia: ${politicaDelFormulario === politicaDeImportacion}")
    println("Título válido: ${politicaDelFormulario.esValido("Comprar yerba")}")
    println("Título vacío válido: ${politicaDeImportacion.esValido(" ")}")
}
