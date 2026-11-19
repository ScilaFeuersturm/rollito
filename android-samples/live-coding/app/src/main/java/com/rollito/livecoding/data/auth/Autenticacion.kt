package com.rollito.livecoding.data.auth

import okhttp3.Authenticator
import okhttp3.Interceptor
import okhttp3.Request
import okhttp3.Response
import okhttp3.Route

// Solución verificada del code review 3 (lección 30i) y ejemplo de la lección 25e de Rollito.
// La app de ejemplo no la usa porque JSONPlaceholder no pide token; los tests están en AutenticacionTest.

interface Sesion {
    /** El token vigente, o null si no hay sesión. */
    val token: String?

    /** Pide un token nuevo al backend (llamada bloqueante). Devuelve null si el refresh falla. */
    fun refrescar(): String?
}

// El interceptor solo agrega el header. No reintenta ni refresca: eso es trabajo del Authenticator.
class AuthInterceptor(private val sesion: Sesion) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val token = sesion.token ?: return chain.proceed(chain.request())
        return chain.proceed(chain.request().newBuilder().header("Authorization", "Bearer $token").build())
    }
}

// OkHttp llama al Authenticator solo ante un 401, cierra la respuesta anterior y reintenta con el pedido que devolvemos.
class TokenAuthenticator(private val sesion: Sesion) : Authenticator {
    private val candado = Any()

    override fun authenticate(route: Route?, response: Response): Request? {
        if (intentos(response) >= 2) return null // ya reintentamos con un token nuevo y volvió 401: nos rendimos
        val usado = response.request.header("Authorization")?.removePrefix("Bearer ")

        // Si llegan varios 401 a la vez, uno solo refresca; los demás reutilizan el token nuevo.
        val nuevo = synchronized(candado) {
            val actual = sesion.token
            if (actual != null && actual != usado) actual else sesion.refrescar()
        } ?: return null // el refresh falló: no reintentamos con "Bearer null"; la app cierra la sesión

        return response.request.newBuilder().header("Authorization", "Bearer $nuevo").build()
    }

    private fun intentos(response: Response): Int {
        var total = 1
        var anterior = response.priorResponse
        while (anterior != null) { total++; anterior = anterior.priorResponse }
        return total
    }
}
