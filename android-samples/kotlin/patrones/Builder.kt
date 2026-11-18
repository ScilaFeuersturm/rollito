package patrones.builder

class Tarea private constructor(
    val titulo: String,
    val etiqueta: String?,
    val diasRestantes: Int?,
) {
    class Builder(private val titulo: String) {
        private var etiqueta: String? = null
        private var diasRestantes: Int? = null

        fun conEtiqueta(valor: String) = apply { etiqueta = valor }

        fun venceEn(dias: Int) = apply { diasRestantes = dias }

        fun construir(): Tarea {
            val limpio = titulo.trim()
            val vencimiento = diasRestantes
            require(limpio.isNotEmpty()) { "Escribí un título" }
            require(vencimiento == null || vencimiento >= 0) { "El vencimiento tiene que ser cero o mayor" }
            return Tarea(limpio, etiqueta, vencimiento)
        }
    }
}

fun main() {
    val tarea = Tarea.Builder("Comprar yerba").conEtiqueta("Compras").venceEn(3).construir()
    println("${tarea.titulo} · ${tarea.etiqueta} · faltan ${tarea.diasRestantes} días")
}
