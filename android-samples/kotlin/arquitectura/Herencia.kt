package arquitectura.poo.herencia

open class Tarea(val titulo: String) {
    open fun describir(): String = titulo
}

class TareaConVencimiento(titulo: String, val vence: String) : Tarea(titulo) {
    override fun describir(): String = "${super.describir()} (vence el $vence)"
}

fun main() {
    val compras = Tarea("Comprar yerba")
    val luz = TareaConVencimiento("Pagar la luz", "10/12")

    println(compras.describir())
    println(luz.describir())
    println(luz.titulo)
}
