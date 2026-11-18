package patrones.inyeccion

fun interface Notificador {
    fun enviar(mensaje: String)
}

class Recordatorio(private val notificador: Notificador) {
    fun avisar(tarea: String) {
        notificador.enviar("Vence hoy: $tarea")
    }
}

fun main() {
    val email = Notificador { mensaje -> println("Email: $mensaje") }
    Recordatorio(email).avisar("Pagar la luz")

    val avisos = mutableListOf<String>()
    Recordatorio(Notificador { avisos.add(it) }).avisar("Comprar yerba")
    check(avisos == listOf("Vence hoy: Comprar yerba"))
    println("Avisos registrados: ${avisos.size}")
}
