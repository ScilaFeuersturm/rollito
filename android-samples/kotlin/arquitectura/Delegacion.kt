package arquitectura.poo.delegacion

interface Notificador {
    val canal: String
    fun enviar(mensaje: String)
}

class PorPush : Notificador {
    override val canal = "push"
    override fun enviar(mensaje: String) = println("Push: $mensaje")
}

// "by base": todo lo que no se sobrescribe acá se delega automáticamente en base.
class ConPrefijo(private val base: Notificador) : Notificador by base {
    override fun enviar(mensaje: String) = base.enviar("[Rollito] $mensaje")
}

fun main() {
    val notificador = ConPrefijo(PorPush())
    println(notificador.canal)
    notificador.enviar("Completaste: Pagar la luz")
}
