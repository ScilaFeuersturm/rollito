package com.rollito.livecoding.ui.lista

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.v2.createComposeRule
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import com.rollito.livecoding.data.Falla
import com.rollito.livecoding.domain.Tarea
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

// Con Robolectric corre en la JVM. El mismo test, sin @RunWith, va en src/androidTest y corre en un emulador.
@RunWith(RobolectricTestRunner::class)
class TareasContentTest {
    @get:Rule val compose = createComposeRule()

    @Test
    fun `el error muestra el mensaje y el botón reintentar avisa`() {
        var reintentos = 0
        compose.setContent {
            TareasContent(TareasUiState.Error(Falla.SinConexion), onReintentar = { reintentos++ }, onTareaClick = {})
        }

        compose.onNodeWithText("No hay conexión. Revisá tu red.").assertIsDisplayed()
        compose.onNodeWithText("Reintentar").performClick()

        assertEquals(1, reintentos)
    }

    @Test
    fun `tocar una tarea avisa su id`() {
        var tocada: Long? = null
        compose.setContent {
            TareasContent(
                TareasUiState.Contenido(listOf(Tarea(7, "Comprar yerba", completada = false))),
                onReintentar = {},
                onTareaClick = { tocada = it },
            )
        }

        compose.onNodeWithText("Comprar yerba").performClick()

        assertTrue(tocada == 7L)
    }
}
