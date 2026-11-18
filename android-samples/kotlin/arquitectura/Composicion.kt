package arquitectura.poo.composicion

interface Notificador {
    fun enviar(mensaje: String)
}

class PorEmail : Notificador {
    override fun enviar(mensaje: String) = println("Email: $mensaje")
}

class PorPush : Notificador {
    override fun enviar(mensaje: String) = println("Push: $mensaje")
}

class Tarea(val titulo: String, private val notificadores: List<Notificador>) {
    fun completar() {
        notificadores.forEach { it.enviar("Completaste: $titulo") }
    }
}

fun main() {
    Tarea("Pagar la luz", listOf(PorEmail(), PorPush())).completar()
    Tarea("Comprar yerba", listOf(PorPush())).completar()
}
