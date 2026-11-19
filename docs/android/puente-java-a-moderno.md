# Android · Bloque 1: puente de lo que sabías a lo que se usa hoy

**Estado:** publicado. Las tres lecciones están en `src/content/android/` con los nombres de abajo; en el sitio, las tablas se pasaron a listas y las preguntas de cierre, a multiple choice.
**Índice de toda la preparación:** [preparacion-entrevista.md](preparacion-entrevista.md).
**Pitch personal de este bloque:** está en `privado/pitch-actualizacion-android.md`, fuera de Git y del sitio.

| Lección | Nivel | Archivo cuando se publique | Va después de |
| --- | --- | --- | --- |
| P1. De Java y XML a Kotlin y Compose | Junior | `16c-puente-de-java-y-xml-a-kotlin-y-compose.mdx` | 16b Permisos |
| P2. De MVP a MVVM con corrutinas y Flow | Semi Senior | `24c-puente-de-mvp-a-mvvm-con-corrutinas-y-flow.mdx` | 24b Efectos en Compose |
| P3. De Dagger, Gson y Groovy a Hilt, KSP y KTS | Semi Senior | `29c-puente-de-herramientas-hilt-ksp-kts-y-serializacion.mdx` | 29b Gradle KTS |

> **Sobre el código:** los snippets de este bloque usan librerías de Android (Compose, Hilt, Retrofit), así que no pasan por `android-samples/` ni se compilan con `kotlinc`. Están revisados a mano. Para probarlos, las tareas de cada lección se hacen en Android Studio.

---

## Tabla de equivalencias

| Lo que usabas | Lo que se usa hoy | Lección de Rollito que lo profundiza |
| --- | --- | --- |
| `AsyncTask`, `Thread`, `Handler` | Corrutinas (`viewModelScope`, `Dispatchers`) | 15b, 21, 21a |
| Presenter (MVP) | `ViewModel` (MVVM) | 23, 24a |
| Callbacks y listeners | `Flow` | 22, 22a |
| `LiveData` | `StateFlow` | 22b, 23a |
| `findViewById`, ViewBinding y XML | Jetpack Compose | 05, 07, 11 |
| `RecyclerView` + `Adapter` | `LazyColumn` con `key` | 13 |
| Fragments + `FragmentManager` | Navigation Compose | 14, 29a |
| Dagger 2 configurado a mano | Hilt | 27, 27a |
| Gson | Kotlinx Serialization o Moshi | 25a |
| Gradle en Groovy | Gradle Kotlin DSL + version catalogs | 29b |
| kapt | KSP | 29b |
| Java | Kotlin: nulabilidad, data classes, sealed | 01, 02, 18 |

## Por qué cambió cada cosa

**`AsyncTask`, `Thread` y `Handler` → corrutinas.** El problema siempre fue el mismo: no bloquear el hilo principal. `AsyncTask` lo resolvía a medias. Estaba atado a la Activity, se perdía al rotar, dejaba fugas si guardaba una referencia a la vista y cancelarla era manual y poco confiable. Por eso se deprecó en API 30. Las corrutinas cambian el modelo: el código asíncrono se escribe en secuencia, como el sincrónico, y la **concurrencia estructurada** hace que cada tarea viva dentro de un scope. Cuando el scope muere (por ejemplo, `viewModelScope` al limpiarse el ViewModel), se cancela todo lo que lanzó. Antes tenías que cortar el trabajo a mano en `onDestroy`; ahora se corta solo porque el scope muere.

**Presenter → `ViewModel`.** En MVP, el Presenter tenía una referencia a la vista (`attach`/`detach`). Al rotar, la Activity se destruía y había que decidir qué hacer con el Presenter: recrearlo y perder el estado, o retenerlo con trucos como un Fragment retenido o un singleton. El `ViewModel` resuelve justo eso. Lo guarda el `ViewModelStore`, que sobrevive a los cambios de configuración, y **no conoce a la vista**: expone estado y la vista lo observa. Sin referencia a la vista no hay fuga ni `detach`. Ojo: **no** sobrevive a la muerte del proceso. Para eso está `SavedStateHandle`.

**Callbacks y listeners → `Flow`.** Un callback entrega un valor y listo. Si los valores llegan en serie, se encadenan callbacks dentro de callbacks, y desuscribirse queda en tus manos. `Flow` modela una **secuencia de valores en el tiempo** con operadores (`map`, `filter`, `debounce`, `combine`) y respeta la cancelación del scope donde se colecta. Para envolver una API vieja de callbacks está `callbackFlow`.

**`LiveData` → `StateFlow`.** `LiveData` no está deprecado y sigue siendo válido. Pero es una clase de Android: no la podés usar en un módulo de Kotlin puro, tiene pocos operadores y testearla pide reglas especiales. `StateFlow` es Kotlin puro, siempre tiene un valor, se integra con el resto de los `Flow` y se testea con `runTest`. El costo es que no conoce el ciclo de vida, así que lo colectás vos de forma segura: `collectAsStateWithLifecycle()` en Compose o `repeatOnLifecycle` en vistas.

**`findViewById`, ViewBinding y XML → Compose.** En el modelo de vistas, la UI es un árbol de objetos que **mutás**: buscás el `TextView` y le hacés `setText`. Con muchos estados posibles es fácil olvidarse de actualizar algo y que la pantalla quede inconsistente. Compose es **declarativo**: describís cómo se ve la pantalla para un estado dado, y cuando el estado cambia, el framework vuelve a ejecutar (recompone) solo lo que depende de ese estado. Pasás de "cómo cambio la vista" a "qué muestro con este estado".

**`RecyclerView` + `Adapter` → `LazyColumn` con `key`.** El `RecyclerView` pedía un `Adapter`, un `ViewHolder`, `DiffUtil` para animar bien y bastante código repetido. `LazyColumn` compone solo los ítems visibles, igual que el reciclado, pero sin `Adapter`. La `key` cumple el papel de la identidad que antes le dabas a `DiffUtil`: sin `key`, al insertar o reordenar, el estado de un ítem (un `remember`, un checkbox expandido) puede terminar en otro ítem.

**Fragments + `FragmentManager` → Navigation Compose.** Las transacciones de Fragments eran manuales (`replace`, `addToBackStack`), con dos ciclos de vida (el del Fragment y el de su vista) y errores clásicos como `IllegalStateException` al hacer commit después de `onSaveInstanceState`. Navigation centraliza el grafo de pantallas, el back stack y los deep links en un solo lugar. En Compose, cada destino es un composable y tiene su propio ciclo de vida y su `ViewModelStore`.

**Dagger 2 configurado a mano → Hilt.** Dagger genera el grafo en tiempo de compilación, y eso se mantiene. Lo que cambió es el armado: antes escribías vos los componentes, subcomponentes y la inyección en cada Activity. Hilt es Dagger con **componentes predefinidos atados al ciclo de vida de Android** (`SingletonComponent`, `ActivityRetainedComponent`, `ViewModelComponent`…). Con `@AndroidEntryPoint` y `@HiltViewModel` se elimina casi todo ese código repetido. Debajo sigue siendo Dagger.

**Gson → Kotlinx Serialization o Moshi.** Gson usa reflexión y no conoce Kotlin. Para crear un objeto sin constructor sin argumentos, lo instancia **sin llamar al constructor**, así que ignora los valores por defecto y puede meter `null` en un campo `String` no nulable. El error salta después, lejos del parseo. Kotlinx Serialization genera el código en compilación con un plugin del compilador, respeta valores por defecto y nulabilidad y funciona en KMP. Moshi también entiende Kotlin, con generación de código o con su adaptador de reflexión para Kotlin. Gson hoy está en mantenimiento.

**Groovy → Gradle Kotlin DSL + version catalogs.** Los scripts en Groovy son dinámicos: Android Studio casi no podía autocompletar y los errores aparecían al sincronizar. Con Kotlin DSL (`build.gradle.kts`) tenés tipos, autocompletado y navegación al código. El **version catalog** (`gradle/libs.versions.toml`) junta todas las versiones en un solo archivo, así que en un proyecto con muchos módulos se actualiza en un lugar. Las plantillas nuevas de Android Studio ya traen las dos cosas.

**kapt → KSP.** kapt corría los procesadores de anotaciones de Java: para eso generaba *stubs* de Java a partir de tu Kotlin, y ese paso era lento. KSP lee el código Kotlin directamente y suele ser bastante más rápido. Room, Hilt y Moshi ya lo soportan, y kapt está en modo mantenimiento. *Verificá en developer.android.com qué versión mínima de cada librería soporta KSP en tu proyecto.*

**Java → Kotlin.** No es solo sintaxis. La **nulabilidad en el tipo** (`String` vs. `String?`) convierte muchos `NullPointerException` en errores de compilación. Las **data classes** generan `equals`, `hashCode`, `toString` y `copy`, que en Java escribías a mano o con Lombok. Las **sealed classes** permiten modelar estados cerrados (`Cargando`, `Contenido`, `Error`), y el `when` te obliga a cubrir todos. Ahí está la base de cómo se modela el estado de una pantalla hoy.

---

## P1. Pasá de Java y XML a Kotlin y Compose · Junior · 6 min

**Punto de la oferta:** 1 y 3.

**Qué problema resuelve.** Llegás con un modelo mental de vistas que se mutan y de Java con `null` por todos lados. Esta lección conecta cada pieza vieja con la nueva para que el código de Compose no te parezca magia.

**Antes vs. ahora.** Antes: `findViewById` → `textView.setText(tarea.getTitulo())`, un `Adapter` con `ViewHolder` y un `if (tarea != null)` en cada lugar. Ahora: una `data class` con tipos nulables explícitos y una función `@Composable` que recibe la lista y la dibuja.

**El concepto.** En Compose, la UI es una función del estado: `UI = f(estado)`. No guardás referencias a vistas ni las actualizás. Cambiás el estado y Compose recompone lo que lo lee. La lista no tiene `Adapter`: `LazyColumn` compone solo lo visible, y la `key` le da identidad a cada ítem, como antes `DiffUtil`.

```kotlin
data class Tarea(val id: Long, val titulo: String, val nota: String? = null)

@Composable
fun ListaDeTareas(tareas: List<Tarea>, onClick: (Long) -> Unit) {
    LazyColumn {
        items(tareas, key = { it.id }) { tarea ->
            Text(
                text = tarea.titulo,
                modifier = Modifier
                    .clickable { onClick(tarea.id) }
                    .padding(16.dp),
            )
        }
    }
}
```

La función no sabe de dónde vienen las tareas ni qué pasa al tocarlas: recibe datos y avisa con un callback. Es lo mismo que hacías con la vista pasiva de MVP, pero sin interfaz `View`.

**Errores comunes / trampas de entrevista.**
- Pensar que recomponer es redibujar todo. Compose vuelve a ejecutar solo los composables que leen el estado que cambió.
- Olvidar la `key` en listas que se reordenan o reciben inserciones: el estado del ítem queda en la posición y no en el ítem.
- Traducir Java línea por línea y llenar el código de `!!`. Si un valor puede faltar, se modela con `?` y se decide qué mostrar (`?:`).

**Pregunta de entrevista.** "¿Qué diferencia hay entre el sistema de vistas y Compose?"

<details><summary>Ver respuesta</summary>

"Con vistas, la UI es un árbol de objetos que voy mutando: busco el `TextView` y le cambio el texto. Con Compose describo cómo se ve la pantalla para un estado, y cuando el estado cambia, el framework recompone solo lo que depende de él. Se eliminan los errores de pantallas desincronizadas y desaparece el código de `Adapter` y `ViewHolder`. Igual sigo pensando en identidad, con `key` en las listas, y en dónde vive el estado."

</details>

**Mini ejercicio.** En la lista de arriba, la persona marca como favorita la tarea 3 (estado guardado con `remember` dentro del ítem). Después llega una tarea nueva al principio de la lista. ¿Qué pasa con y sin `key`?

<details><summary>Ver solución</summary>

Sin `key`, Compose identifica los ítems por posición: la favorita queda en la posición 3, que ahora es otra tarea. Con `key = { it.id }`, el estado sigue a la tarea con ese `id`, sin importar dónde quede. Mejor todavía: si "favorita" es un dato de negocio, va en el modelo o en el ViewModel y no en un `remember` del ítem.

</details>

**Para maquetar.**
- *Ejercicio extra (autoevaluación):* "¿Qué te da una `data class` que en Java escribías a mano?" → "`equals`, `hashCode`, `toString`, `copy` y la desestructuración (`componentN`)."
- *Tarea para tu máquina:* en Android Studio, creá un proyecto nuevo con la plantilla *Empty Activity* (ya viene con Compose). Pegá `ListaDeTareas` con 5 tareas fijas y un `Toast` en el `onClick`.
- *Resultado esperado:* la lista se ve, hace scroll y al tocar una tarea aparece su `id`.
- *Resumen:* la interfaz es una función del estado · cambiás el estado y no la vista · `LazyColumn` reemplaza al `RecyclerView` y su `Adapter` · la `key` le da identidad a cada ítem · la nulabilidad se expresa en el tipo.
- *Prerrequisitos:* `android-vistas-estado-compose-01`, `android-junior-listas-keys-y-objetos-reciclados-01`.

---

## P2. Pasá de MVP a MVVM con corrutinas y Flow · Semi Senior · 7 min

**Punto de la oferta:** 1, 2, 3, 4 y 7.

**Qué problema resuelve.** En MVP vivías peleando con tres cosas: el Presenter se perdía al rotar, la referencia a la vista causaba fugas y las tareas en segundo plano había que cortarlas a mano. MVVM con `ViewModel`, corrutinas y `StateFlow` resuelve las tres con piezas que ya manejan el ciclo de vida.

**Antes vs. ahora.**

| MVP con Java | MVVM hoy |
| --- | --- |
| `presenter.attach(view)` / `detach()` | La vista observa `estado`; el ViewModel no la conoce |
| `view.showLoading()`, `view.showError()` | Un solo `UiState` sealed con todos los casos |
| `AsyncTask` + cancelar en `onDestroy` | `viewModelScope.launch`, que se cancela solo en `onCleared` |
| Presenter recreado al rotar | `ViewModel` retenido por el `ViewModelStore` |

**El concepto.** El ViewModel **expone estado** y **recibe eventos**. La vista no recibe órdenes como `showLoading()`: dibuja lo que dice el estado. Por eso el estado se modela como un tipo sellado, y la pantalla nunca puede estar "cargando y con error a la vez".

```kotlin
sealed interface TareasUiState {
    data object Cargando : TareasUiState
    data class Contenido(val tareas: List<Tarea>) : TareasUiState
    data class Error(val mensaje: String) : TareasUiState
}

class TareasViewModel(private val repo: TareasRepository) : ViewModel() {
    private val _estado = MutableStateFlow<TareasUiState>(TareasUiState.Cargando)
    val estado: StateFlow<TareasUiState> = _estado.asStateFlow()

    init { cargar() }

    fun cargar() {
        viewModelScope.launch {
            _estado.value = TareasUiState.Cargando
            _estado.value = try {
                TareasUiState.Contenido(repo.obtenerTareas())
            } catch (e: IOException) {
                TareasUiState.Error("No hay conexión")
            }
        }
    }
}
```

En la pantalla: `val estado by viewModel.estado.collectAsStateWithLifecycle()` y un `when (estado)` que dibuja cada caso. `obtenerTareas()` es `suspend`, y el repositorio usa `withContext(Dispatchers.IO)` cuando hace falta. El ViewModel no sabe de hilos.

**Errores comunes / trampas de entrevista.**
- Exponer el `MutableStateFlow` como público: cualquier pantalla podría cambiar el estado. Se expone `StateFlow` con `asStateFlow()`.
- Guardar un `Context` de Activity (o una vista) en el ViewModel: el ViewModel vive más que la Activity y la retiene (fuga). Si necesitás recursos, usá `AndroidViewModel` con el contexto de aplicación o resolvelo en la UI.
- Creer que el ViewModel sobrevive a la muerte del proceso. Sobrevive a la rotación; para el proceso está `SavedStateHandle`.
- *(Extra)* Atrapar `Exception` en una corrutina sin relanzar `CancellationException`. Por eso el ejemplo atrapa solo `IOException`.

**Pregunta de entrevista.** "Venís de MVP. ¿Qué cambia con MVVM?"

<details><summary>Ver respuesta</summary>

"La dirección de la dependencia. En MVP el Presenter le daba órdenes a la vista a través de una interfaz, así que la conocía y había que soltarla en cada rotación. En MVVM el ViewModel expone un estado observable, en general un `StateFlow` con un `UiState` sellado, y la vista lo dibuja. Como no tiene referencia a la vista, sobrevive a la rotación sin fugas, y su `viewModelScope` cancela solo el trabajo pendiente cuando se destruye. Además se testea sin mockear vistas: llamo una función y verifico el estado."

</details>

**Mini ejercicio.** Traducí este Presenter a la idea de MVVM (no hace falta código completo, alcanza con decir qué reemplaza a cada línea):

```java
public void cargar() {
    view.showLoading();
    repo.obtenerTareas(new Callback<List<Tarea>>() {
        public void onSuccess(List<Tarea> t) { view.hideLoading(); view.showTareas(t); }
        public void onError(Throwable e) { view.hideLoading(); view.showError("Error"); }
    });
}
```

<details><summary>Ver solución</summary>

- `view.showLoading()` → `_estado.value = Cargando`.
- El callback → una función `suspend` llamada dentro de `viewModelScope.launch`. Si el repo es viejo y solo tiene callbacks, se envuelve con `suspendCancellableCoroutine`.
- `onSuccess` → `_estado.value = Contenido(t)`, y `onError` → `_estado.value = Error(...)`.
- `hideLoading()` desaparece: como el estado es uno solo, pasar a `Contenido` o `Error` ya implica que no está cargando. Es justo el tipo de bug que MVP permitía, por ejemplo olvidarse un `hideLoading()`.

</details>

**Para maquetar.**
- *Ejercicio extra (autoevaluación):* "¿Qué hace `viewModelScope` cuando se destruye el ViewModel?" → "Cancela todas las corrutinas que lanzó; se dispara en `onCleared()`."
- *Tarea para tu máquina:* en Android Studio, armá `TareasViewModel` con un repositorio falso que espera 1 s (`delay(1000)`) y falla una de cada dos veces. Mostrá los tres estados en Compose con un botón "Reintentar" y rotá el emulador mientras está cargando.
- *Resultado esperado:* al rotar no se reinicia la carga (el `init` no se vuelve a ejecutar) y el botón reintenta.
- *Resumen:* el ViewModel expone estado y no conoce a la vista · un `UiState` sellado evita combinaciones imposibles · `viewModelScope` cancela solo el trabajo pendiente · sobrevive a la rotación, no a la muerte del proceso · se expone `StateFlow`, no `MutableStateFlow`.
- *Prerrequisitos:* `android-semi-senior-fragment-viewmodel-y-restauracion-01`, `android-semi-senior-livedata-vs-stateflow-01`, `android-semi-senior-tipos-sellados-y-estados-de-pantalla-01`.

---

## P3. Pasá de Dagger, Gson y Groovy a Hilt, KSP y KTS · Semi Senior · 6 min

**Punto de la oferta:** 6, 8 y 9.

**Qué problema resuelve.** El proyecto de hoy se configura distinto aunque las ideas sean las mismas: inyección generada en compilación, JSON a objetos, scripts de build. Esta lección te da el mapa para que un `build.gradle.kts` con `ksp(...)` y `@HiltViewModel` no te tome por sorpresa.

**Antes vs. ahora.**

| Antes | Ahora | Qué se mantiene |
| --- | --- | --- |
| `@Component` + `inject(this)` en cada Activity | `@HiltAndroidApp`, `@AndroidEntryPoint`, `@HiltViewModel` | El grafo lo genera Dagger en compilación |
| `@SerializedName` + Gson por reflexión | `@Serializable` (plugin del compilador) | Un DTO separado del modelo de dominio |
| `build.gradle` en Groovy, versiones sueltas | `build.gradle.kts` + `libs.versions.toml` | Los mismos plugins y dependencias |
| `kapt "..."` | `ksp(...)` | El procesador genera código |

**El concepto.** Son tres cambios con la misma lógica: **pasar errores de ejecución a compilación** y **dejar de escribir código repetitivo**. Hilt da componentes ya atados al ciclo de vida. Kotlinx Serialization genera el serializador en compilación y respeta los valores por defecto y la nulabilidad de Kotlin. KTS y el catálogo hacen que el build tenga tipos y un solo lugar para las versiones.

```kotlin
// build.gradle.kts del módulo app
plugins {
    alias(libs.plugins.ksp)
    alias(libs.plugins.hilt)
    alias(libs.plugins.kotlin.serialization)
}
dependencies {
    implementation(libs.hilt.android)
    ksp(libs.hilt.compiler)
}

// Código
@Serializable
data class TareaDto(val id: Long, val titulo: String, val completa: Boolean = false)

@HiltViewModel
class TareasViewModel @Inject constructor(
    private val repo: TareasRepository,
) : ViewModel()
```

Si el JSON no trae `completa`, Kotlinx usa el `false` por defecto. Si no trae `titulo`, que no tiene valor por defecto, falla **al parsear**, con un error claro, y no después con un `NullPointerException` en la UI.

**Errores comunes / trampas de entrevista.**
- Decir "Hilt reemplaza a Dagger". Hilt *es* Dagger, con componentes predefinidos para Android: si sabés Dagger, ya sabés lo que pasa debajo.
- Suponer que Gson respeta los valores por defecto de una data class. No los respeta: crea el objeto sin llamar al constructor.
- Mezclar `kapt` y `ksp` para la misma librería, o dejar kapt "porque anda": el build queda más lento y kapt está en mantenimiento.

**Pregunta de entrevista.** "¿Por qué elegirías Kotlinx Serialization en vez de Gson en un proyecto nuevo?"

<details><summary>Ver respuesta</summary>

"Gson usa reflexión y no conoce Kotlin: puede dejar `null` en un campo no nulable e ignora los valores por defecto, así que el error aparece lejos del parseo. Kotlinx Serialization genera el código en compilación, respeta la nulabilidad y los valores por defecto, no depende de reflexión (mejor con R8) y sirve para KMP. Moshi también es una buena opción si el equipo ya la usa. Gson lo mantendría solo en código existente, migrando de a poco."

</details>

**Mini ejercicio.** Con Gson, esta clase recibe `{"id": 1}`: `data class TareaDto(val id: Long, val titulo: String = "Sin título")`. ¿Cuánto vale `titulo`? ¿Y con Kotlinx Serialization?

<details><summary>Ver solución</summary>

Con Gson vale `null`, aunque el tipo diga `String`. Como la clase no tiene constructor sin argumentos (no todos los parámetros tienen valor por defecto), Gson la instancia sin llamar al constructor, así que no se aplica el valor por defecto. El crash llega cuando alguien use `titulo`. Con Kotlinx Serialization vale `"Sin título"`, porque el serializador generado aplica el valor por defecto.

</details>

**Para maquetar.**
- *Ejercicio extra (autoevaluación):* "¿Por qué KSP es más rápido que kapt?" → "kapt genera stubs de Java para que corran los procesadores de anotaciones de Java; KSP lee el código Kotlin directamente."
- *Tarea para tu máquina:* en Android Studio, abrí `gradle/libs.versions.toml` de un proyecto nuevo y seguí una dependencia desde `[versions]` hasta su uso en `build.gradle.kts` (Ctrl+clic). Después agregá el plugin de Kotlinx Serialization y parseá `{"id":1}` a `TareaDto` en un test unitario.
- *Resultado esperado:* el test pasa con `completa == false`. Si sacás el valor por defecto de `titulo` y el JSON no lo trae, falla con `MissingFieldException`.
- *Resumen:* Hilt es Dagger con componentes atados al ciclo de vida · Kotlinx Serialization respeta los valores por defecto y la nulabilidad · Gson usa reflexión y no conoce Kotlin · KTS y el catálogo dan tipos y un solo lugar para las versiones · KSP reemplaza a kapt y compila más rápido.
- *Prerrequisitos:* `android-semi-senior-dagger-debajo-de-hilt-01`, `android-semi-senior-okhttp-y-serializacion-01`, `android-semi-senior-gradle-kotlin-dsl-y-version-catalogs-01`.
