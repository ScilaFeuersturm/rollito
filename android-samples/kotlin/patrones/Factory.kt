package patrones.factory

enum class Canal { EMAIL, PUSH }

fun interface Notificador {
    fun enviar(mensaje: String)
}

class PorEmail : Notificador {
    override fun enviar(mensaje: String) = println("Email: $mensaje")
}

class PorPush : Notificador {
    override fun enviar(mensaje: String) = println("Push: $mensaje")
}

fun crearNotificador(canal: Canal): Notificador = when (canal) {
    Canal.EMAIL -> PorEmail()
    Canal.PUSH -> PorPush()
}

fun main() {
    val mensaje = "Vence hoy: Pagar la luz"
    crearNotificador(Canal.EMAIL).enviar(mensaje)
    crearNotificador(Canal.PUSH).enviar(mensaje)
}
