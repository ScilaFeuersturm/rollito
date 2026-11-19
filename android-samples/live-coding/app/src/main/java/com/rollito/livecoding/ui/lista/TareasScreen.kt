package com.rollito.livecoding.ui.lista

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.ListItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.rollito.livecoding.data.Falla

// Con estado: conoce al ViewModel. Es lo único que hay que adaptar si cambia la fuente.
@Composable
fun TareasScreen(onTareaClick: (Long) -> Unit, viewModel: TareasViewModel = hiltViewModel()) {
    val estado by viewModel.estado.collectAsStateWithLifecycle()
    TareasContent(estado, onReintentar = viewModel::cargar, onTareaClick = onTareaClick)
}

// Sin estado: recibe datos y avisa con callbacks. Se previsualiza y se testea sin ViewModel.
@Composable
fun TareasContent(estado: TareasUiState, onReintentar: () -> Unit, onTareaClick: (Long) -> Unit) {
    when (estado) {
        TareasUiState.Cargando -> Centrado { CircularProgressIndicator() }
        TareasUiState.Vacio -> Centrado { Text("No hay tareas todavía") }
        is TareasUiState.Error -> Centrado {
            Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(12.dp)) {
                Text(mensaje(estado.falla))
                Button(onClick = onReintentar) { Text("Reintentar") }
            }
        }
        is TareasUiState.Contenido -> LazyColumn {
            items(estado.tareas, key = { it.id }) { tarea ->
                ListItem(
                    headlineContent = { Text(tarea.titulo) },
                    supportingContent = { Text(if (tarea.completada) "Completada" else "Pendiente") },
                    modifier = Modifier.clickable { onTareaClick(tarea.id) },
                )
                HorizontalDivider()
            }
        }
    }
}

fun mensaje(falla: Falla): String = when (falla) {
    Falla.SinConexion -> "No hay conexión. Revisá tu red."
    Falla.Timeout -> "El servidor tardó demasiado."
    is Falla.Servidor -> "El servicio no está disponible."
    is Falla.Cliente, Falla.Parseo, Falla.Desconocida -> "Algo salió mal."
}

@Composable
private fun Centrado(contenido: @Composable () -> Unit) {
    Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) { contenido() }
}
