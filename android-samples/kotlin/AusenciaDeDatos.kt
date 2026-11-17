fun main() {
    val nombre: String? = null
    val nombreVisible = nombre ?: "Invitado"
    println("Hola, $nombreVisible")
}
