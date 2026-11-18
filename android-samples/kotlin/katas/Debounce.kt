package katas.debounce

data class Evento(val milisegundo: Long, val texto: String)

// Devuelve los textos que se buscarían si cada búsqueda espera `espera` ms sin nuevas teclas.
fun debounce(eventos: List<Evento>, espera: Long): List<String> =
    eventos.filterIndexed { i, evento ->
        val siguiente = eventos.getOrNull(i + 1)
        siguiente == null || siguiente.milisegundo - evento.milisegundo >= espera
    }.map { it.texto }

fun main() {
    val tipeo = listOf(
        Evento(0, "y"), Evento(100, "ye"), Evento(200, "yer"),
        Evento(700, "yerb"), Evento(750, "yerba"),
    )
    println(debounce(tipeo, espera = 300))
}
