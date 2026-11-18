package arquitectura.microservicios

enum class Respuesta { GUARDADA, SIN_RESPUESTA }

class ClienteTareas(private val enviar: (String) -> Respuesta) {
    fun agregar(titulo: String): String = when (enviar(titulo)) {
        Respuesta.GUARDADA -> "Tarea confirmada"
        Respuesta.SIN_RESPUESTA -> "Guardado sin confirmar"
    }
}

fun main() {
    println(ClienteTareas { Respuesta.GUARDADA }.agregar("Comprar yerba"))
    println(ClienteTareas { Respuesta.SIN_RESPUESTA }.agregar("Pagar la luz"))
}
