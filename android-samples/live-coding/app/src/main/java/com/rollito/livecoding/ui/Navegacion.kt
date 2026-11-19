package com.rollito.livecoding.ui

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navDeepLink
import com.rollito.livecoding.ui.detalle.DetalleScreen
import com.rollito.livecoding.ui.lista.TareasScreen
import kotlinx.serialization.Serializable

// Rutas type-safe: el compilador controla el tipo de cada argumento.
@Serializable
data object Lista

@Serializable
data class Detalle(val id: Long)

const val DEEP_LINK_BASE = "rollito://tareas"

@Composable
fun AppNavHost() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = Lista) {
        composable<Lista> {
            TareasScreen(onTareaClick = { id -> navController.navigate(Detalle(id)) })
        }
        // rollito://tareas/7 abre el detalle de la tarea 7.
        composable<Detalle>(deepLinks = listOf(navDeepLink<Detalle>(basePath = DEEP_LINK_BASE))) {
            DetalleScreen()
        }
    }
}
