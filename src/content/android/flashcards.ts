// Bloque 8 de la preparación: ronda relámpago de 60 preguntas cortas, repartidas entre los 14 puntos
// de una búsqueda Android típica. Respuestas de una o dos líneas. Las marcadas como "verificado"
// salen de los tests de android-samples (live-coding y corrutinas).

type Flashcard = { topic: string; prompt: string; answer: string }

const punto = (n: number, tema: string) => (prompt: string, answer: string): Flashcard => ({ topic: `${n} · ${tema}`, prompt, answer })

const arq = punto(1, 'MVVM, Repository y Clean')
const vida = punto(2, 'Ciclo de vida y ViewModel')
const compose = punto(3, 'Compose, Material 3 y StateFlow')
const corr = punto(4, 'Corrutinas y Flow')
const nav = punto(5, 'Navegación')
const red = punto(6, 'Retrofit, OkHttp y serialización')
const errores = punto(7, 'Carga, errores y datos seguros')
const hilt = punto(8, 'Hilt y Dagger')
const gradle = punto(9, 'Gradle y modularización')
const tests = punto(10, 'Tests')
const git = punto(11, 'Git, PRs y CI')
const monitoreo = punto(12, 'Crashlytics y monitoreo')
const ia = punto(13, 'IA con revisión crítica')
const ingles = punto(14, 'Inglés técnico')

export const flashcards: readonly Flashcard[] = [
  arq('¿Qué responsabilidad tiene el Repository?', 'Ser la única fuente de datos para el resto de la app: decide de dónde vienen (red, base, caché) y traduce DTO y errores técnicos a modelos y fallas del dominio.'),
  arq('¿El ViewModel puede conocer a Retrofit?', 'No debería. Conoce una interfaz de repositorio; así se testea con un mock y la fuente de datos puede cambiar sin tocarlo.'),
  arq('¿Cuándo agregás un caso de uso?', 'Cuando hay lógica de negocio que combina repositorios o se reutiliza en varias pantallas. Si solo delega en el repositorio, es una capa de más.'),
  arq('En Clean Architecture, ¿hacia dónde apuntan las dependencias?', 'Hacia adentro: la UI y los datos dependen del dominio, y el dominio no depende de nada de Android ni de librerías.'),
  arq('Trampa: ¿MVVM obliga a usar casos de uso?', 'No. MVVM separa vista, ViewModel y modelo; los casos de uso son de Clean Architecture y se suman cuando aportan.'),

  vida('¿Por qué el ViewModel sobrevive a la rotación?', 'Porque lo guarda el ViewModelStore, que se retiene durante los cambios de configuración. Se limpia (onCleared) cuando la pantalla se va de verdad.'),
  vida('Trampa: ¿el ViewModel sobrevive a la muerte del proceso?', 'No. Para eso está SavedStateHandle (datos chicos) o la persistencia (Room, DataStore).'),
  vida('¿Qué pasa si guardás un Context de Activity en un ViewModel?', 'Una fuga de memoria: el ViewModel vive más que la Activity y la retiene después de la rotación.'),
  vida('¿Qué diferencia hay entre onStop y onDestroy?', 'onStop: la Activity deja de verse (por ejemplo, la app va a segundo plano). onDestroy: la Activity se destruye, por terminar o por un cambio de configuración.'),
  vida('En un Fragment, ¿qué lifecycleOwner usás para actualizar el binding?', 'viewLifecycleOwner: la vista del Fragment puede destruirse y recrearse mientras el Fragment sigue vivo.'),

  compose('Trampa: ¿remember sobrevive a la rotación?', 'No. remember sobrevive a la recomposición; para la rotación hace falta rememberSaveable o guardar el estado en el ViewModel.'),
  compose('¿collectAsState o collectAsStateWithLifecycle?', 'collectAsStateWithLifecycle: deja de colectar cuando la app no se ve. collectAsState sigue colectando en segundo plano.'),
  compose('¿Qué es state hoisting?', 'Subir el estado al llamador: el composable recibe el valor y un callback, así queda sin estado, reutilizable y fácil de testear.'),
  compose('¿Para qué sirve la key en un LazyColumn?', 'Le da identidad estable a cada ítem: si la lista cambia, el estado de cada fila sigue a su ítem y no a la posición.'),
  compose('¿Qué es onPrimary en Material 3?', 'El color del contenido que va sobre primary, elegido para que tenga contraste. Se usan roles de color, no colores fijos.'),

  corr('¿launch o async?', 'launch para trabajo sin resultado (devuelve un Job); async cuando necesitás un resultado, sobre todo en paralelo (devuelve un Deferred y se lee con await).'),
  corr('Trampa: ¿withContext corre en paralelo?', 'No. Suspende hasta que termina el bloque, devuelve su valor y vuelve al contexto original.'),
  corr('¿Por qué no usar GlobalScope?', 'Porque la corrutina no tiene dueño: no se cancela con la pantalla y rompe la concurrencia estructurada.'),
  corr('¿Qué diferencia hay entre StateFlow y SharedFlow?', 'StateFlow siempre tiene un valor y se lo da a cada colector nuevo; SharedFlow no necesita valor inicial y se configura cuántos valores repite.'),
  corr('¿Para qué sirve WhileSubscribed(5000) en stateIn?', 'Mantiene la fuente activa 5 segundos después de que se va el último colector: no se reinicia al rotar, pero se detiene si la app queda en segundo plano.'),
  corr('Trampa: con runBlocking, se imprime A, se hace launch { B }, y se imprime C. ¿En qué orden sale?', 'A, C, B (verificado). launch encola la corrutina; corre cuando el hilo queda libre.'),

  nav('¿Qué hace popUpTo con inclusive = true?', 'Saca del back stack todo lo que está arriba del destino y también al destino. Se usa al terminar el login.'),
  nav('¿Para qué sirve launchSingleTop?', 'Para no apilar el mismo destino si ya está arriba, por ejemplo ante un doble toque.'),
  nav('¿Qué es el back stack sintético de un deep link?', 'Cuando el link abre la app en una tarea nueva, Navigation pone el destino inicial abajo del destino del link, para que Atrás no cierre la app (verificado).'),
  nav('Trampa: hay dos Detalle en el back stack. ¿A cuál vuelve popBackStack<Detalle>()?', 'Al más reciente, el de más arriba (verificado).'),

  red('¿Por qué las funciones de Retrofit son suspend?', 'Retrofit las ejecuta fuera del hilo principal y suspende hasta la respuesta: no hacen falta callbacks ni cambiar de dispatcher.'),
  red('¿Interceptor o Authenticator para refrescar un token?', 'Authenticator: OkHttp lo llama solo ante un 401 y reintenta con el pedido que devuelve. El interceptor solo agrega el header.'),
  red('Trampa: con Gson, falta un campo String obligatorio en el JSON. ¿Qué pasa?', 'Gson deja null en el campo no nulable sin avisar; el error aparece más tarde (verificado). Kotlinx y Moshi fallan en el parseo.'),
  red('¿Qué hace ignoreUnknownKeys en Kotlinx Serialization?', 'Evita que falle el parseo si el JSON trae campos que el modelo no conoce. Por defecto, Kotlinx es estricto.'),
  red('¿Por qué un solo OkHttpClient en toda la app?', 'Para compartir el pool de conexiones y el caché. Si hace falta otra configuración, se deriva con newBuilder().'),

  errores('¿Qué fallas se reintentan y cuáles no?', 'Se reintentan las transitorias (sin conexión, timeout, 5xx) con espera exponencial. Un 4xx o un error de parseo no.'),
  errores('Trampa: ¿qué tiene de malo catch (e: Exception) en una corrutina?', 'También atrapa CancellationException y rompe la cancelación. Hay que relanzarla.'),
  errores('¿Dónde no tiene que aparecer nunca un token?', 'En logs, en texto plano en disco ni en el código. Se guarda cifrado con una clave del Android Keystore.'),
  errores('¿Por qué un estado Vacío aparte y no una lista vacía en Contenido?', 'Porque se muestra distinto y, al estar en el tipo, el when obliga a contemplarlo.'),

  hilt('¿@Provides o @Binds?', '@Binds vincula una interfaz con una implementación que ya tiene @Inject constructor; @Provides construye con código, por ejemplo clases de librerías.'),
  hilt('¿Para qué sirve un @Qualifier?', 'Para distinguir dos bindings del mismo tipo, por ejemplo dos OkHttpClient. Sin él, Dagger falla con DuplicateBindings (verificado).'),
  hilt('Trampa: un @Singleton recibe algo @ActivityScoped. ¿Qué pasa?', 'No compila: IncompatiblyScopedBindings (verificado). Un scope largo no puede depender de uno corto.'),
  hilt('Trampa: un módulo en SingletonComponent provee algo sin @Singleton. ¿Cuántas instancias hay?', 'Una nueva en cada pedido. El componente dice desde dónde se inyecta; el scope, cuántas instancias hay.'),
  hilt('¿Qué componente de Hilt sobrevive a la rotación además de SingletonComponent?', 'ActivityRetainedComponent y ViewModelComponent. ActivityComponent se recrea al rotar.'),

  gradle('¿Qué es un version catalog?', 'El archivo gradle/libs.versions.toml, que centraliza versiones y dependencias: se actualizan en un solo lugar para todos los módulos.'),
  gradle('¿Por qué KSP y no kapt?', 'KSP lee el código Kotlin directamente; kapt genera stubs de Java y es más lento. kapt está en mantenimiento.'),
  gradle('¿Qué diferencia hay entre implementation y api?', 'Con implementation, la dependencia no se expone a quienes dependen de tu módulo; con api, sí. implementation acelera la compilación incremental.'),
  gradle('Trampa: ¿compileSdk y targetSdk son lo mismo?', 'No. compileSdk es contra qué API compilás (lo pueden exigir las librerías); targetSdk es qué comportamientos nuevos del sistema aceptás.'),

  tests('¿Para qué sirve Dispatchers.setMain en un test?', 'viewModelScope usa Dispatchers.Main, que no existe en la JVM: se reemplaza por un dispatcher de test y se restaura con resetMain.'),
  tests('¿coEvery o every en MockK?', 'coEvery para funciones suspend; every para funciones comunes.'),
  tests('¿Qué diferencia hay entre StandardTestDispatcher y UnconfinedTestDispatcher?', 'Standard encola las corrutinas hasta que avanzás (advanceUntilIdle); Unconfined las corre enseguida. Con Standard podés ver estados intermedios.'),
  tests('¿Dónde corre un test de Compose?', 'En src/androidTest, en un emulador o dispositivo; o en src/test con Robolectric, en la JVM. La API es la misma.'),
  tests('Trampa: el test generado junto con el código pasa. ¿Ya está?', 'No necesariamente: puede verificar lo que el código hace y no lo que pide el requisito. Revisá los casos borde.'),

  git('¿Qué tiene que contar un buen mensaje de commit?', 'Qué cambió y por qué. El cómo ya está en el código.'),
  git('¿Por qué PRs chicos?', 'Se revisan mejor, se encuentran más errores y, si algo falla, se revierte fácil.'),
  git('¿Qué corre la CI en cada PR?', 'Como mínimo: build, lint y tests unitarios. Si falla, no se mergea.'),

  monitoreo('¿Qué diferencia hay entre un crash y un error no fatal en Crashlytics?', 'El crash cierra la app y se reporta solo; el no fatal es una excepción que atrapaste y reportás vos con recordException.'),
  monitoreo('¿Qué no se manda nunca en los logs de Crashlytics?', 'Datos personales ni credenciales: mails, documentos, tokens. Se usan identificadores anónimos.'),
  monitoreo('¿Qué es la tasa de usuarios sin crashes?', 'El porcentaje de usuarios que no tuvieron ningún crash en un período: el indicador principal de estabilidad de una versión.'),

  ia('¿Qué revisás siempre en código generado por IA?', 'Que haga lo pedido, ciclo de vida, hilos, manejo de errores, seguridad (secretos, logs) y que las APIs existan y estén vigentes.'),
  ia('¿Qué no pegás nunca en un asistente?', 'Secretos, datos personales de clientes, información interna y código propietario si la política no lo permite.'),
  ia('Pegaste un token de producción en un chat de IA. ¿Qué hacés?', 'Avisás según el procedimiento de la empresa y rotás el token: hay que darlo por filtrado.'),

  ingles('Explain StateFlow in one sentence.', '"StateFlow is an observable state holder that always has a current value and emits updates to its collectors."'),
  ingles('How would you say "no entendí bien la pregunta" in an interview?', '"Just to make sure I understood, are you asking about…?" Repreguntar para confirmar suena profesional.'),
  ingles('How do you buy time to think?', '"Let me think out loud for a second." Pensar en voz alta también muestra cómo razonás.'),
]
