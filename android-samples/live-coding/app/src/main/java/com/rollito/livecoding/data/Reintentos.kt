package com.rollito.livecoding.data

import kotlinx.coroutines.delay

// Reintenta solo fallas transitorias (sin conexión, timeout, 5xx), con espera exponencial: 1 s, 2 s, 4 s...
// Un 4xx o un error de parseo no se arreglan reintentando, así que vuelven enseguida.
// Úsalo solo con operaciones idempotentes (un GET, o un POST con clave de idempotencia).
suspend fun <T> conReintentos(
    intentos: Int = 3,
    esperaInicialMs: Long = 1_000,
    bloque: suspend () -> Resultado<T>,
): Resultado<T> {
    var espera = esperaInicialMs
    repeat(intentos - 1) {
        val resultado = bloque()
        if (resultado !is Resultado.Error || !esTransitoria(resultado.falla)) return resultado
        delay(espera)
        espera *= 2
    }
    return bloque()
}

fun esTransitoria(falla: Falla): Boolean = when (falla) {
    Falla.SinConexion, Falla.Timeout, is Falla.Servidor -> true
    is Falla.Cliente, Falla.Parseo, Falla.Desconocida -> false
}
