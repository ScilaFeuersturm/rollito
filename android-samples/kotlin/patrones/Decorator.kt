package patrones.decorator

fun interface Notificador {
    fun enviar(mensaje: String)
}

class ConRegistro(
    private val base: Notificador,
    private val registrar: (String) -> Unit,
) : Notificador {
    override fun enviar(mensaje: String) {
        base.enviar(mensaje)
        registrar("Aviso enviado")
    }
}

fun main() {
    val email = Notificador { mensaje -> println("Email: $mensaje") }
    val notificador = ConRegistro(email, ::println)
    notificador.enviar("Vence hoy: Pagar la luz")
}
