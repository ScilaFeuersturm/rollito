package arquitectura.poo.abstraccion

interface Notificador {
    fun enviar(mensaje: String)
}

class NotificadorPorEmail(private val direccion: String) : Notificador {
    override fun enviar(mensaje: String) {
        println("Email a $direccion: $mensaje")
    }
}

class NotificadorPush : Notificador {
    override fun enviar(mensaje: String) {
        println("Push: $mensaje")
    }
}

class Recordatorio(private val notificador: Notificador) {
    fun avisarVencimiento(tarea: String) {
        notificador.enviar("Vence hoy: $tarea")
    }
}

fun main() {
    Recordatorio(NotificadorPorEmail("ana@example.com")).avisarVencimiento("Pagar la luz")
    Recordatorio(NotificadorPush()).avisarVencimiento("Pagar la luz")
}
