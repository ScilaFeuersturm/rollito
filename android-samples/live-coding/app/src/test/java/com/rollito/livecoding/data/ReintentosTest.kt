package com.rollito.livecoding.data

import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.currentTime
import kotlinx.coroutines.test.runTest
import org.junit.Assert.assertEquals
import org.junit.Test

@OptIn(ExperimentalCoroutinesApi::class)
class ReintentosTest {
    @Test fun `una falla transitoria se reintenta con espera exponencial`() = runTest {
        val momentos = mutableListOf<Long>()
        val respuestas = ArrayDeque(listOf(Resultado.Error(Falla.Servidor(503)), Resultado.Error(Falla.Timeout), Resultado.Exito("ok")))
        val resultado = conReintentos { momentos += currentTime; respuestas.removeFirst() }
        assertEquals(Resultado.Exito("ok"), resultado)
        assertEquals(listOf(0L, 1_000L, 3_000L), momentos) // esperó 1 s y después 2 s (tiempo virtual)
    }

    @Test fun `un 4xx no se reintenta`() = runTest {
        var llamadas = 0
        val resultado = conReintentos<String> { llamadas++; Resultado.Error(Falla.Cliente(404)) }
        assertEquals(Resultado.Error(Falla.Cliente(404)), resultado)
        assertEquals(1, llamadas)
    }

    @Test fun `si todos los intentos fallan devuelve la ultima falla`() = runTest {
        var llamadas = 0
        val resultado = conReintentos<String>(intentos = 3) { llamadas++; Resultado.Error(Falla.SinConexion) }
        assertEquals(Resultado.Error(Falla.SinConexion), resultado)
        assertEquals(3, llamadas)
        assertEquals(3_000L, currentTime)
    }
}
