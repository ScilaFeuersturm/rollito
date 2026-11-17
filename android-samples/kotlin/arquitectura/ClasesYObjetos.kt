class Tarea(val titulo: String) {
    var completada = false

    fun completar() {
        completada = true
    }
}

fun main() {
    val compras = Tarea("Comprar yerba")
    val gimnasio = Tarea("Ir al gimnasio")

    compras.completar()

    println("${compras.titulo}: ${compras.completada}")
    println("${gimnasio.titulo}: ${gimnasio.completada}")
}
