package arquitectura.poo.igualdad

class TareaComun(val titulo: String)

data class TareaDeDatos(val titulo: String)

fun main() {
    println(TareaComun("Pagar la luz") == TareaComun("Pagar la luz"))
    println(TareaDeDatos("Pagar la luz") == TareaDeDatos("Pagar la luz"))
}
