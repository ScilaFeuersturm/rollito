package com.rollito.livecoding.data.auth

import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit
import java.util.concurrent.atomic.AtomicInteger
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.mockwebserver.Dispatcher
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import okhttp3.mockwebserver.RecordedRequest
import org.junit.After
import org.junit.Assert.assertEquals
import org.junit.Before
import org.junit.Test

class AutenticacionTest {
    private val servidor = MockWebServer()

    // Sesión falsa: empieza con un token vencido y cuenta cuántas veces se refresca.
    private class SesionFalsa(var refreshFunciona: Boolean = true) : Sesion {
        val refrescos = AtomicInteger()
        @Volatile override var token: String? = "vencido"
        override fun refrescar(): String? {
            refrescos.incrementAndGet()
            Thread.sleep(50) // simula la llamada al backend
            token = if (refreshFunciona) "nuevo-${refrescos.get()}" else null
            return token
        }
    }

    // El servidor acepta cualquier token que no sea "vencido".
    @Before fun setUp() {
        servidor.dispatcher = object : Dispatcher() {
            override fun dispatch(request: RecordedRequest) =
                if (request.getHeader("Authorization") == "Bearer vencido" || request.getHeader("Authorization") == null)
                    MockResponse().setResponseCode(401)
                else MockResponse().setBody("ok")
        }
        servidor.start()
    }

    @After fun tearDown() = servidor.shutdown()

    private fun cliente(sesion: Sesion) = OkHttpClient.Builder()
        .addInterceptor(AuthInterceptor(sesion))
        .authenticator(TokenAuthenticator(sesion))
        .build()

    private fun pedir(cliente: OkHttpClient) =
        cliente.newCall(Request.Builder().url(servidor.url("/perfil")).build()).execute().use { it.code }

    @Test fun `un 401 refresca el token y reintenta una vez`() {
        val sesion = SesionFalsa()
        assertEquals(200, pedir(cliente(sesion)))
        assertEquals(1, sesion.refrescos.get())
        assertEquals("Bearer vencido", servidor.takeRequest().getHeader("Authorization"))
        assertEquals("Bearer nuevo-1", servidor.takeRequest().getHeader("Authorization"))
    }

    @Test fun `si el refresh falla no reintenta con Bearer null`() {
        val sesion = SesionFalsa(refreshFunciona = false)
        assertEquals(401, pedir(cliente(sesion)))
        assertEquals(1, servidor.requestCount) // un solo pedido: no hubo reintento
    }

    @Test fun `diez 401 simultaneos hacen un solo refresh`() {
        val sesion = SesionFalsa()
        val cliente = cliente(sesion)
        val hilos = Executors.newFixedThreadPool(10)
        val codigos = (1..10).map { hilos.submit<Int> { pedir(cliente) } }.map { it.get(10, TimeUnit.SECONDS) }
        hilos.shutdown()
        assertEquals(List(10) { 200 }, codigos)
        assertEquals(1, sesion.refrescos.get())
    }
}
