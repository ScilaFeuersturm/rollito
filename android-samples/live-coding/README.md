# Live coding guiado

Solución del ejercicio clásico de entrevista: *lista desde una API REST, con loading, error con reintento y estado vacío; al tocar un ítem, ir al detalle.* La explican paso a paso las lecciones `30j` a `30r` de Rollito (módulo "Live coding guiado").

## Cómo abrirlo

En Android Studio: **File → Open** y elegí esta carpeta (`android-samples/live-coding`). La primera sincronización descarga las dependencias.

- Correr la app: botón Run, con un emulador con internet. Usa la API pública `https://jsonplaceholder.typicode.com/todos`.
- Tests (ViewModel y Compose, en la JVM con Robolectric): `./gradlew :app:testDebugUnitTest`.
- Deep link: `adb shell am start -W -a android.intent.action.VIEW -d "rollito://tareas/7"`.

## Dónde está cada paso

| Paso | Archivo |
| --- | --- |
| 1. Modelo y DTO | `domain/Tarea.kt`, `data/remote/TareaDto.kt` |
| 2. Retrofit y OkHttp | `data/remote/TareasApi.kt`, `di/Modulos.kt` |
| 3. Repository y fallas | `data/Resultado.kt`, `data/TareasRepository.kt` |
| 4. ViewModel | `ui/lista/TareasViewModel.kt` |
| 5. Pantalla | `ui/lista/TareasScreen.kt` |
| 6. Hilt | `di/Modulos.kt`, `App.kt` |
| 7. Navegación y deep link | `ui/Navegacion.kt`, `ui/detalle/DetalleScreen.kt`, `AndroidManifest.xml` |
| 8. Tests | `app/src/test/.../TareasViewModelTest.kt`, `TareasContentTest.kt` |

## Versiones

Verificadas en noviembre de 2026: AGP 9.2.1, Gradle 9.8.1, Kotlin 2.4.21, KSP 2.3.14, Hilt 2.60.1, Compose BOM 2026.09.00, Navigation 2.10.2, Retrofit 3.0.0, Kotlinx Serialization 1.13.0. `compileSdk` es 37 porque lo piden las librerías; `targetSdk` sigue en 36. Las versiones están en `gradle/libs.versions.toml`.
