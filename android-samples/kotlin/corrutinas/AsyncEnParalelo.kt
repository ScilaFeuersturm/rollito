package corrutinas.asyncenparalelo

import kotlinx.coroutines.async
import kotlinx.coroutines.delay
import kotlinx.coroutines.runBlocking

suspend fun pedir(nombre: String, ms: Long): String {
    delay(ms)
    println("terminó $nombre")
    return nombre
}

fun main() = runBlocking {
    val inicio = System.currentTimeMillis()
    val perfil = async { pedir("perfil", 300) }
    val pedidos = async { pedir("pedidos", 100) }
    println("${perfil.await()} + ${pedidos.await()}")
    val ms = System.currentTimeMillis() - inicio
    println(if (ms < 400) "tardó menos de 400 ms" else "tardó 400 ms o más")
}
