package kotlinbasico.dataclasses

data class Tarea(
    val id: Int,
    val titulo: String,
    val completada: Boolean = false,
)

fun main() {
    val original = Tarea(1, "Comprar yerba")
    val actualizada = original.copy(completada = true)

    println(original.completada)
    println(actualizada.completada)
    println(actualizada == Tarea(1, "Comprar yerba", completada = true))
    println(original.id == actualizada.id)
}
