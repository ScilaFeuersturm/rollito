package katas.tareasporestado

data class Tarea(val titulo: String, val completada: Boolean, val venceEnDias: Int)

fun resumen(tareas: List<Tarea>): String {
    val (hechas, pendientes) = tareas.partition { it.completada }
    val urgentes = pendientes.filter { it.venceEnDias <= 1 }.sortedBy { it.venceEnDias }.map { it.titulo }
    return "Hechas: ${hechas.size}, pendientes: ${pendientes.size}, urgentes: $urgentes"
}

fun main() {
    val tareas = listOf(
        Tarea("Comprar yerba", completada = true, venceEnDias = 0),
        Tarea("Pagar la luz", completada = false, venceEnDias = 1),
        Tarea("Renovar el DNI", completada = false, venceEnDias = 30),
        Tarea("Llamar al médico", completada = false, venceEnDias = 0),
    )
    println(resumen(tareas))
}
