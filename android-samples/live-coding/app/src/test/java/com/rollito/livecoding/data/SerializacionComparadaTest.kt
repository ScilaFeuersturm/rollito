package com.rollito.livecoding.data

import com.google.gson.Gson
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Test

// Respuestas verificadas de la lección 25c de Rollito: el mismo JSON con Kotlinx Serialization, Moshi y Gson.
@Serializable internal data class ConDefault(val id: Long, val titulo: String = "Sin título", val completada: Boolean = false)
@Serializable internal data class SinDefault(val id: Long, val titulo: String)

class SerializacionComparadaTest {
    private val kotlinx = Json
    private val kotlinxFlexible = Json { ignoreUnknownKeys = true; coerceInputValues = true }
    private val moshi = Moshi.Builder().add(KotlinJsonAdapterFactory()).build()
    private val gson = Gson()

    private fun intento(bloque: () -> Any?): String =
        try { bloque().toString() } catch (e: Exception) { "error: ${e::class.simpleName}" }
            .also { println("RESULTADO: $it") }

    private inline fun <reified T : Any> lasTres(json: String) = listOf(
        intento { kotlinx.decodeFromString<T>(json) },
        intento { moshi.adapter(T::class.java).fromJson(json) },
        intento { gson.fromJson(json, T::class.java) },
    )

    @Test fun `1 faltan campos que tienen valor por defecto`() {
        assertEquals(listOf(
            "ConDefault(id=1, titulo=Sin título, completada=false)",
            "ConDefault(id=1, titulo=Sin título, completada=false)",
            "ConDefault(id=1, titulo=null, completada=false)", // Gson: null en un String no nulable
        ), lasTres<ConDefault>("""{"id":1}"""))
    }

    @Test fun `2 falta un campo obligatorio`() {
        assertEquals(listOf(
            "error: MissingFieldException",
            "error: JsonDataException",
            "SinDefault(id=1, titulo=null)", // Gson no avisa: el error aparece más tarde
        ), lasTres<SinDefault>("""{"id":1}"""))
    }

    @Test fun `3 null explicito en un campo no nulable`() {
        val json = """{"id":1,"titulo":null}"""
        assertEquals(listOf(
            "error: JsonDecodingException",
            "error: JsonDataException",
            "ConDefault(id=1, titulo=null, completada=false)",
        ), lasTres<ConDefault>(json))
        // coerceInputValues: un null en un campo no nulable con valor por defecto usa el valor por defecto.
        assertEquals("ConDefault(id=1, titulo=Sin título, completada=false)", intento { kotlinxFlexible.decodeFromString<ConDefault>(json) })
    }

    @Test fun `4 clave que el modelo no conoce`() {
        val json = """{"id":1,"titulo":"a","extra":5}"""
        assertEquals(listOf(
            "error: JsonDecodingException", // Kotlinx es estricto por defecto
            "ConDefault(id=1, titulo=a, completada=false)",
            "ConDefault(id=1, titulo=a, completada=false)",
        ), lasTres<ConDefault>(json))
        assertEquals("ConDefault(id=1, titulo=a, completada=false)", intento { kotlinxFlexible.decodeFromString<ConDefault>(json) })
    }

    @Test fun `5 al serializar, Kotlinx omite los valores por defecto`() {
        val tarea = ConDefault(id = 1)
        assertEquals("""{"id":1}""", kotlinx.encodeToString(ConDefault.serializer(), tarea))
        assertEquals("""{"id":1,"titulo":"Sin título","completada":false}""", moshi.adapter(ConDefault::class.java).toJson(tarea))
        assertEquals("""{"id":1,"titulo":"Sin título","completada":false}""", gson.toJson(tarea))
        assertEquals("""{"id":1,"titulo":"Sin título","completada":false}""",
            Json { encodeDefaults = true }.encodeToString(ConDefault.serializer(), tarea))
    }
}
