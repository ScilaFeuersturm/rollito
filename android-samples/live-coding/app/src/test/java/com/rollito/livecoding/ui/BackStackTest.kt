package com.rollito.livecoding.ui

import android.content.Intent
import android.net.Uri
import androidx.compose.material3.Text
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.test.junit4.v2.createComposeRule
import androidx.navigation.NavGraph
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.ComposeNavigator
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navDeepLink
import androidx.navigation.testing.TestNavHostController
import kotlinx.serialization.Serializable
import org.junit.Assert.assertEquals
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

// Respuestas verificadas de los ejercicios "dibujá el back stack" de la lección 29d de Rollito.
@Serializable internal data object Login
@Serializable internal data object Inicio
@Serializable internal data object Buscar
@Serializable internal data object Perfil
@Serializable internal data class Detalle(val id: Long)

@RunWith(RobolectricTestRunner::class)
class BackStackTest {
    @get:Rule val compose = createComposeRule()
    private lateinit var nav: TestNavHostController

    private fun grafo(inicio: Any = Inicio) {
        compose.setContent {
            nav = TestNavHostController(LocalContext.current).apply { navigatorProvider.addNavigator(ComposeNavigator()) }
            NavHost(nav, startDestination = inicio) {
                composable<Login> { Text("Login") }
                composable<Inicio> { Text("Inicio") }
                composable<Buscar> { Text("Buscar") }
                composable<Perfil> { Text("Perfil") }
                composable<Detalle>(deepLinks = listOf(navDeepLink<Detalle>(basePath = "rollito://tareas"))) { Text("Detalle") }
            }
        }
        compose.waitForIdle()
    }

    // El back stack como texto: "Inicio > Detalle(1)". Se omite el NavGraph raíz.
    private fun pila(): String = nav.currentBackStack.value
        .filter { it.destination !is NavGraph }
        .joinToString(" > ") { entrada ->
            val nombre = entrada.destination.route!!.substringAfterLast('.').substringBefore('/')
            // Navigation también le pasa los argumentos del deep link a los destinos del back stack
            // sintético, así que el id se muestra solo en Detalle.
            if (nombre == "Detalle") "$nombre(${entrada.arguments!!.getLong("id")})" else nombre
        }

    private fun haciendo(acciones: TestNavHostController.() -> Unit): String {
        compose.runOnUiThread { nav.acciones() }
        compose.waitForIdle()
        return pila().also { println("BACKSTACK: $it") }
    }

    private fun TestNavHostController.irATab(tab: Any, guardar: Boolean) = navigate(tab) {
        popUpTo(graph.findStartDestination().id) { saveState = guardar }
        launchSingleTop = true
        restoreState = guardar
    }

    @Test fun `1 navigate apila aunque el destino se repita`() {
        grafo()
        assertEquals("Inicio > Detalle(1) > Detalle(2) > Detalle(2)",
            haciendo { navigate(Detalle(1)); navigate(Detalle(2)); navigate(Detalle(2)) })
    }

    @Test fun `2 launchSingleTop evita duplicar el tope`() {
        grafo()
        assertEquals("Inicio > Detalle(1) > Detalle(2)",
            haciendo { navigate(Detalle(1)); navigate(Detalle(2)); navigate(Detalle(2)) { launchSingleTop = true } })
    }

    @Test fun `3 login con popUpTo inclusive saca el login`() {
        grafo(inicio = Login)
        assertEquals("Inicio", haciendo { navigate(Inicio) { popUpTo<Login> { inclusive = true } } })
    }

    @Test fun `4 popUpTo sin inclusive deja el destino`() {
        grafo(inicio = Login)
        assertEquals("Login > Inicio", haciendo { navigate(Inicio) { popUpTo<Login>() } })
    }

    @Test fun `5 popUpTo Inicio desde lo profundo`() {
        grafo()
        assertEquals("Inicio > Perfil",
            haciendo { navigate(Detalle(1)); navigate(Detalle(2)); navigate(Perfil) { popUpTo<Inicio>() } })
    }

    @Test fun `6 bottom nav con saveState y restoreState recupera el detalle`() {
        grafo()
        assertEquals("Inicio > Detalle(1)",
            haciendo { navigate(Detalle(1)); irATab(Buscar, guardar = true); irATab(Inicio, guardar = true) })
    }

    @Test fun `7 bottom nav sin saveState pierde el detalle`() {
        grafo()
        assertEquals("Inicio",
            haciendo { navigate(Detalle(1)); irATab(Buscar, guardar = false); irATab(Inicio, guardar = false) })
    }

    @Test fun `8 al cambiar de tab no se apilan las tabs`() {
        grafo()
        assertEquals("Inicio > Perfil",
            haciendo { irATab(Buscar, guardar = true); irATab(Perfil, guardar = true) })
    }

    @Test fun `9 deep link en tarea nueva arma el back stack sintetico`() {
        grafo()
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse("rollito://tareas/7"))
            .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK)
        assertEquals("Inicio > Detalle(7)", haciendo { navigate(Perfil); handleDeepLink(intent) })
    }

    // Trampa: vuelve hasta el Detalle MÁS RECIENTE del back stack, no hasta el primero.
    @Test fun `10 popBackStack hasta un destino vuelve al mas reciente`() {
        grafo()
        assertEquals("Inicio > Detalle(1) > Detalle(2)", haciendo {
            navigate(Detalle(1)); navigate(Detalle(2)); navigate(Perfil)
            popBackStack<Detalle>(inclusive = false)
        })
    }
}
