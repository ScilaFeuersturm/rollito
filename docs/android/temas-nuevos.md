# Android · Lecciones nuevas desde requisitos de búsquedas laborales

**Estado:** borradores para revisar. Todavía no están maquetados.

Son conceptuales, como el resto del recorrido Android: explican la idea con escenarios y nombran las APIs que suelen aparecer en entrevistas, sin mostrar código de librerías. La práctica con las herramientas reales va en la tarea para tu máquina. El plan completo y qué lección existente amplía cada una están en [android-moderno.md](../android-moderno.md#temas-agregados-desde-requisitos-de-búsquedas-laborales).

| # | Nivel | Lección |
| --- | --- | --- |
| A | Junior | Material Design 3 en Compose |
| B | Junior | Git y pull requests en equipo |
| C | Semi Senior | Ciclo de vida y StateFlow en Compose |
| D | Semi Senior | MVVM, Repository y casos de uso |
| E | Semi Senior | Navigation Compose y back stack |
| F | Semi Senior | OkHttp y serialización |
| G | Semi Senior | Datos sensibles: tokens, almacenamiento y logs |
| H | Semi Senior | Dagger debajo de Hilt |
| I | Semi Senior | Gradle con Kotlin DSL y version catalogs |
| J | Semi Senior | Tests unitarios con JUnit y MockK |
| K | Semi Senior | Tests de UI con Compose Testing y Espresso |
| L | Semi Senior | Qué corre la CI en cada PR |
| M | Semi Senior | Crashlytics y monitoreo |

---

## A. Material Design 3 en Compose · Junior · 5 min

**Concepto.** Material 3 es el sistema de diseño de Google. En Compose se aplica con `MaterialTheme`, que recibe un `colorScheme`, una `typography` y unas `shapes`. Los componentes (`Button`, `Card`, `TopAppBar`, `Scaffold`) leen el tema solos. La clave es usar **roles de color** (`primary`, `onPrimary`, `surface`, `onSurface`, `error`) en vez de colores fijos: `onPrimary` es "el color del texto que va sobre `primary`".

**Ejemplo.** La tarjeta de una tarea usa `surface` de fondo y `onSurface` para el título. Al pasar a modo oscuro, el tema cambia de `lightColorScheme()` a `darkColorScheme()` y la tarjeta se adapta sin tocar su código. Desde Android 12 (API 31) se puede usar color dinámico (`dynamicLightColorScheme(context)`), que toma la paleta del fondo de pantalla.

### Práctica

1. Un botón tiene fondo `primary`. ¿Qué rol usás para su texto? **Respuesta esperada.** `onPrimary`.
2. ¿Qué pasa con un texto pintado con un color fijo cuando la persona activa el modo oscuro? **Respuesta esperada.** No cambia, y puede quedar ilegible sobre el fondo oscuro.
3. ¿Desde qué versión de Android hay color dinámico? **Respuesta esperada.** Android 12 (API 31). En versiones anteriores hace falta un esquema propio de respaldo.

### Tarea para tu máquina

Creá un proyecto nuevo de Compose en Android Studio (la plantilla ya trae un `Theme.kt` con Material 3). Armá una tarjeta de tarea con `Card`, título y botón "Completar" usando solo colores del tema. Cambiá el modo oscuro del emulador.

**Resultado esperado.** La tarjeta cambia de colores sola y el texto se sigue leyendo bien en los dos modos.

### Resumen

- Material 3 se aplica con MaterialTheme, que define colores, tipografía y formas.
- Los componentes usan roles de color, como primary y on primary, en vez de colores fijos.
- Usar roles hace que el modo oscuro funcione sin cambiar cada pantalla.
- Desde Android 12 se puede usar color dinámico, tomado del fondo de pantalla.

### Repaso para entrevista

**En 30 segundos.** "Defino el tema una vez con `MaterialTheme` y en los componentes uso roles de color y estilos tipográficos del tema, nunca valores fijos. Así el modo oscuro, el color dinámico y un cambio de marca se resuelven en un solo lugar."

**Pregunta trampa.** ¿Qué diferencia hay entre `primary` y `onPrimary`? **Respuesta.** `primary` es el color de fondo de los elementos destacados; `onPrimary` es el color del contenido que va encima, elegido para que tenga contraste.

**Cuándo no.** Si la app tiene una identidad visual muy propia, conviene un tema personalizado sobre Material 3, en vez de pelearse con los valores por defecto componente por componente.

---

## B. Git y pull requests en equipo · Junior · 5 min

**Concepto.** En un equipo nadie trabaja directo sobre `main`. Cada cambio va en una **rama**, con **commits** chicos que cuentan qué cambió y por qué, y se integra con un **pull request (PR)**: alguien lo revisa, la CI corre los chequeos y recién después se mergea.

**Ejemplo.** Para el botón "Completar tarea", creás la rama `feature/completar-tarea`. Hacés tres commits: el modelo, la pantalla y el test. Abrís un PR con qué cambia y cómo probarlo. Te piden un ajuste, sumás un commit y, cuando la revisión y la CI dan el visto bueno, se mergea.

### Práctica

1. ¿Por qué conviene un PR chico en vez de uno de 2000 líneas? **Respuesta esperada.** Se revisa mejor, se encuentran más errores y, si algo falla, se revierte fácil.
2. ¿Qué tiene que contar un buen mensaje de commit? **Respuesta esperada.** Qué cambió y por qué. El cómo ya está en el código.
3. Mientras trabajabas, alguien cambió en `main` las mismas líneas que vos. ¿Qué pasa? **Respuesta esperada.** Hay un conflicto: Git no puede decidir solo, así que lo resolvés a mano y volvés a correr los tests.

### Tarea para tu máquina

En un repo de prueba, creá una rama, hacé dos commits y mergeala en `main`. Después generá un conflicto a propósito: cambiá la misma línea en dos ramas y resolvelo.

**Resultado esperado.** `git log --oneline --graph` muestra la rama integrada y el archivo final tiene la versión que elegiste al resolver el conflicto.

### Resumen

- Cada cambio va en su propia rama, nunca directo en main.
- Los commits chicos cuentan qué cambió y por qué.
- Un pull request permite revisar el cambio y correr los chequeos antes de integrarlo.
- Un conflicto aparece cuando dos ramas cambian las mismas líneas y se resuelve a mano.

### Repaso para entrevista

**En 30 segundos.** "Trabajo en ramas cortas, con commits chicos y descriptivos, y abro PRs fáciles de revisar, que cuentan qué cambia y cómo probarlo. No se mergea sin revisión y sin la CI en verde."

**Pregunta trampa.** ¿`merge` o `rebase`? **Respuesta.** `merge` conserva la historia tal como pasó y agrega un commit de merge. `rebase` reescribe tus commits encima de `main` y deja una historia lineal. Regla de oro: no hagas rebase de una rama que ya usa otra persona, porque le reescribís la historia.

**Cuándo no.** Para un proyecto personal de un día, abrir PRs contra vos misma puede ser ceremonia. Igual conviene practicar el hábito.

---

## C. Ciclo de vida y StateFlow en Compose · Semi Senior · 6 min

**Concepto.** Una Activity pasa por `onCreate`, `onStart`, `onResume`, `onPause`, `onStop` y `onDestroy`. El **ViewModel** sobrevive a los cambios de configuración (como rotar la pantalla) y se destruye recién cuando su dueño termina de verdad (ahí se llama a `onCleared`). La UI tiene que **observar el estado solo mientras se ve**: en Compose, con `collectAsStateWithLifecycle()`, que por defecto deja de recolectar por debajo de `STARTED`. En vistas XML se hace lo mismo con `repeatOnLifecycle(Lifecycle.State.STARTED)`.

**Ejemplo.** La pantalla de tareas expone un `StateFlow<EstadoTareas>` desde el ViewModel. La persona va al inicio del teléfono: con `collectAsStateWithLifecycle()` la recolección se pausa y no se hace trabajo para una pantalla que nadie ve. Al volver, se retoma con el último estado. Si rota la pantalla, el ViewModel es el mismo y no se vuelve a cargar nada.

### Práctica

1. ¿Qué pasa con el ViewModel al rotar la pantalla? **Respuesta esperada.** Sobrevive: la Activity se recrea, pero recibe el mismo ViewModel.
2. ¿Y si el sistema mata el proceso porque la app quedó en segundo plano? **Respuesta esperada.** El ViewModel se pierde. Lo que tenga que sobrevivir va en `SavedStateHandle` o en persistencia.
3. ¿Qué diferencia hay entre `collectAsState()` y `collectAsStateWithLifecycle()`? **Respuesta esperada.** El primero sigue recolectando aunque la app esté en segundo plano; el segundo respeta el ciclo de vida.

### Tarea para tu máquina

En un proyecto con un ViewModel que expone un contador como `StateFlow` que suma uno por segundo, agregá un log en cada emisión. Recolectalo primero con `collectAsState()` y después con `collectAsStateWithLifecycle()`, y mandá la app al fondo en cada caso.

**Resultado esperado.** Con `collectAsState()` el log sigue apareciendo con la app en segundo plano. Con `collectAsStateWithLifecycle()` se corta y vuelve al abrir la app. Si el flujo se construye con `stateIn(..., SharingStarted.WhileSubscribed(5000), ...)`, además se frena el productor unos segundos después.

### Resumen

- El ViewModel sobrevive a rotar la pantalla, pero no a que el sistema mate el proceso.
- Lo que tiene que sobrevivir a la muerte del proceso va en SavedStateHandle o en persistencia.
- La interfaz debería observar el estado solo mientras se ve.
- En Compose eso se logra con collect as state with lifecycle.

### Repaso para entrevista

**En 30 segundos.** "El ViewModel guarda el estado de la pantalla y sobrevive a los cambios de configuración. La UI lo observa con `collectAsStateWithLifecycle`, así no trabaja en segundo plano, y lo que tiene que sobrevivir a la muerte del proceso va a `SavedStateHandle`."

**Pregunta trampa.** ¿El ViewModel sobrevive a todo? **Respuesta.** No. Sobrevive a la recreación por configuración, pero no a la muerte del proceso ni a que la persona cierre la pantalla.

**Cuándo no.** Un estado puramente visual y efímero, como si un menú está desplegado, puede quedarse en `remember` o `rememberSaveable` dentro del composable, sin pasar por el ViewModel.

---

## D. MVVM, Repository y casos de uso · Semi Senior · 6 min

**Concepto.** En Android, MVVM se arma así: la **UI** (Compose) muestra estado y manda eventos; el **ViewModel** transforma eventos en estado; el **Repository** decide de dónde salen los datos (red, base local, caché). Las nociones de Clean suman una capa de **dominio**: casos de uso con las reglas de negocio y modelos propios, en Kotlin puro, sin dependencias de Android. Las flechas apuntan hacia el dominio.

**Ejemplo.** `CompletarTareaUseCase` valida que la tarea no esté ya completada y le pide al `TareaRepository` (una interfaz del dominio) que la guarde. La implementación del repositorio vive en la capa de datos y traduce el DTO de la API (`TareaDto`) al modelo de dominio (`Tarea`). El ViewModel solo llama al caso de uso y actualiza el estado.

### Práctica

1. ¿Dónde va la regla "no se puede completar una tarea vencida hace más de un mes"? **Respuesta esperada.** En un caso de uso del dominio, no en el ViewModel ni en la UI.
2. ¿Por qué traducir `TareaDto` a `Tarea`? **Respuesta esperada.** Para que un cambio en la API no se propague a toda la app.
3. ¿Quién define la interfaz `TareaRepository` en Clean? **Respuesta esperada.** El dominio. La capa de datos la implementa.

### Tarea para tu máquina

En papel o en un proyecto, dibujá los módulos o paquetes de una pantalla de tareas (`ui`, `domain`, `data`) y las flechas de dependencia. Verificá que `domain` no importe nada de `android.*` ni de Retrofit.

**Resultado esperado.** Todas las flechas apuntan hacia `domain`, y el dominio se puede testear con JUnit puro, sin emulador.

### Resumen

- En MVVM la interfaz muestra el estado, el ViewModel lo produce y el repositorio decide de dónde vienen los datos.
- Clean suma una capa de dominio con casos de uso y modelos propios, en Kotlin puro.
- El dominio define las interfaces y la capa de datos las implementa.
- Traducir los modelos de la API a modelos de dominio protege a la app de los cambios externos.

### Repaso para entrevista

**En 30 segundos.** "Uso MVVM con repositorios: la UI observa un estado del ViewModel y el repositorio abstrae las fuentes de datos. Cuando la lógica de negocio crece, sumo casos de uso en un dominio sin dependencias de Android, que define las interfaces que implementa la capa de datos."

**Pregunta trampa.** ¿Siempre hacen falta casos de uso? **Respuesta.** No. Un caso de uso que solo reenvía la llamada al repositorio es ceremonia. Suman cuando hay reglas, combinan varios repositorios o se reusan entre pantallas.

**Cuándo no.** En una app chica o en un prototipo, ViewModel más repositorio alcanza. El dominio completo se justifica cuando la lógica crece o hay varios equipos.

---

## E. Navigation Compose y back stack · Semi Senior · 5 min

**Concepto.** Navigation Compose maneja las pantallas con un `NavHost` y un `NavController`. Cada `navigate()` apila un destino en el **back stack** y "atrás" lo desapila. Las opciones de navegación controlan esa pila: `popUpTo(destino) { inclusive = true }` saca destinos, y `launchSingleTop = true` evita apilar la misma pantalla dos veces. Desde Navigation 2.8 las rutas pueden ser **tipadas**, con clases `@Serializable` en vez de strings.

**Ejemplo.** Después del login, navegás a la lista con `popUpTo(Login) { inclusive = true }`: si la persona aprieta "atrás", sale de la app en vez de volver al login. Si toca dos veces rápido una tarea, `launchSingleTop` evita abrir dos detalles. Para devolver un resultado del detalle a la lista, se escribe en el `savedStateHandle` de la entrada anterior (`previousBackStackEntry`).

### Práctica

1. Después del login, ¿por qué "atrás" no debería volver a la pantalla de login? **Respuesta esperada.** Porque la sesión ya empezó. Se saca el login de la pila con `popUpTo` e `inclusive = true`.
2. ¿Qué evita `launchSingleTop`? **Respuesta esperada.** Tener dos copias seguidas del mismo destino en la pila.
3. ¿Qué ganás con rutas tipadas en vez de strings? **Respuesta esperada.** El compilador verifica los argumentos, sin errores de tipeo ni conversiones a mano.

### Tarea para tu máquina

Armá tres pantallas (Login, Lista y Detalle). Después del login, navegá a la Lista sacando el Login de la pila. Desde el Detalle, devolvé "tarea completada" a la Lista y mostralo en un mensaje.

**Resultado esperado.** Desde la Lista, "atrás" cierra la app. Al volver del Detalle, la Lista muestra el mensaje con el resultado.

### Resumen

- Navigation Compose usa un NavHost y un NavController para moverse entre pantallas.
- Cada navegación apila un destino y atrás lo desapila.
- Pop up to saca destinos de la pila, y launch single top evita duplicados.
- Las rutas tipadas permiten que el compilador verifique los argumentos.

### Repaso para entrevista

**En 30 segundos.** "Navego con un `NavHost` y controlo el back stack a propósito: saco el login con `popUpTo`, evito duplicados con `launchSingleTop` y uso rutas tipadas. Los deep links entran al mismo grafo, así que validan argumentos igual que la navegación interna."

**Pregunta trampa.** ¿Pasarías un objeto `Tarea` completo como argumento de navegación? **Respuesta.** No. Se pasa el id y la pantalla de destino lo carga desde el repositorio. Los argumentos tienen que ser chicos, y el dato tiene que tener una sola fuente de verdad.

**Cuándo no.** En una app de una o dos pantallas, mostrar y ocultar contenido con estado puede ser más simple que un grafo de navegación.

---

## F. OkHttp y serialización · Semi Senior · 6 min

**Concepto.** Retrofit define la API como una interfaz, pero por debajo las llamadas las hace **OkHttp**. En OkHttp se configuran los **timeouts** (conexión, lectura y escritura) y los **interceptores**, que ven pasar cada pedido y respuesta: agregar el header de autorización, loguear o medir. El JSON se convierte a objetos con una librería de **serialización**. Las dos más usadas en Kotlin son **Kotlinx Serialization** (plugin del compilador, sin reflexión, multiplataforma) y **Moshi** (con generación de código por KSP o con reflexión).

**Ejemplo.** Un interceptor agrega `Authorization: Bearer <token>` a todos los pedidos. Si la API responde 401, un `Authenticator` de OkHttp renueva el token y reintenta una vez. El `TareaDto` está marcado como `@Serializable`, y si la API agrega un campo nuevo, la configuración `ignoreUnknownKeys = true` evita que la app se rompa.

### Práctica

1. ¿Dónde agregarías el header de autorización a todos los pedidos? **Respuesta esperada.** En un interceptor de OkHttp, no en cada método de la interfaz de Retrofit.
2. La API agrega un campo que la app no conoce. Con Kotlinx Serialization en su configuración por defecto, ¿qué pasa? **Respuesta esperada.** Falla al decodificar. Con `ignoreUnknownKeys = true`, lo ignora.
3. ¿Por qué no conviene `HttpLoggingInterceptor` con nivel `BODY` en producción? **Respuesta esperada.** Puede loguear tokens y datos personales, y además es lento.

### Tarea para tu máquina

Con Retrofit y OkHttp, consumí una API pública de prueba (por ejemplo JSONPlaceholder). Agregá un interceptor que loguee método, URL y tiempo de respuesta, y configurá un timeout de lectura de 10 segundos.

**Resultado esperado.** En Logcat aparece una línea por pedido con método, URL y milisegundos, y los datos se muestran en la pantalla.

### Resumen

- Retrofit define la API como interfaz, y OkHttp es el que hace las llamadas de verdad.
- Los interceptores ven pasar cada pedido y respuesta, y sirven para headers, logs y métricas.
- Kotlinx Serialization y Moshi convierten el JSON en objetos de Kotlin.
- Hay que configurar timeouts y decidir qué pasa cuando la API manda campos desconocidos.

### Repaso para entrevista

**En 30 segundos.** "Retrofit arma la API y OkHttp ejecuta: ahí configuro timeouts, un interceptor de autenticación y un `Authenticator` para renovar el token cuando llega un 401. Para el JSON uso Kotlinx Serialization, que respeta la nulabilidad y los valores por defecto de Kotlin."

**Pregunta trampa.** ¿Por qué no Gson en un proyecto Kotlin nuevo? **Respuesta.** Gson no conoce la nulabilidad de Kotlin: puede dejar `null` en una propiedad no nula y no respeta los valores por defecto del constructor. El error aparece después, lejos de donde se originó.

**Cuándo no.** Para uno o dos pedidos simples, sumar Retrofit puede ser de más: alcanza con un cliente HTTP liviano. En un proyecto con varios endpoints, Retrofit se paga solo.

---

## G. Datos sensibles: tokens, almacenamiento y logs · Semi Senior · 5 min

**Concepto.** El tratamiento seguro de datos tiene tres frentes:

- **Qué guardás y dónde.** Los tokens van cifrados, con claves del **Android Keystore**, y nunca en texto plano.
- **Qué logueás.** Nada de tokens, contraseñas ni datos personales en Logcat ni en reportes de errores.
- **Cómo viaja.** Solo HTTPS. Desde Android 9 (API 28), el tráfico sin cifrar está bloqueado por defecto.

Además, conviene revisar qué entra en los backups automáticos.

**Ejemplo.** El token de sesión se guarda cifrado con una clave del Keystore. El interceptor de logs oculta el header `Authorization` (`redactHeader("Authorization")`). Los reportes de errores llevan un id interno, nunca el email.

### Práctica

1. ¿Dónde guardarías un token de sesión? **Respuesta esperada.** Cifrado con una clave del Android Keystore, no en SharedPreferences en texto plano.
2. Un `Log.d` imprime la respuesta completa del login. ¿Qué problema hay? **Respuesta esperada.** Puede exponer el token y datos personales a cualquiera con acceso a los logs del dispositivo.
3. ¿Qué pasa por defecto si la app intenta una conexión `http://` en Android 9 o superior? **Respuesta esperada.** Se bloquea, salvo que la configuración de seguridad de red lo permita explícitamente.

### Tarea para tu máquina

Revisá un proyecto tuyo: buscá `Log.` y verificá qué imprime cada uno. Fijate también qué guarda en SharedPreferences o DataStore y si alguno de esos datos es sensible.

**Resultado esperado.** Una lista de cada dato sensible encontrado, con su arreglo: eliminar el log, ocultar el valor o cifrar el almacenamiento.

### Resumen

- Los tokens y datos sensibles se guardan cifrados, con claves del Android Keystore.
- Los logs y los reportes de errores nunca llevan tokens, contraseñas ni datos personales.
- Los datos viajan solo por HTTPS, y desde Android 9 el tráfico sin cifrar está bloqueado por defecto.
- Conviene revisar qué entra en los backups automáticos de la app.

### Repaso para entrevista

**En 30 segundos.** "Guardo los secretos cifrados con claves del Keystore, no logueo datos sensibles y oculto el header de autorización en los logs de red. El tráfico va solo por HTTPS, y en los reportes de errores identifico a la persona con un id interno, nunca con datos personales."

**Pregunta trampa.** ¿Poner una API key en el código o en `BuildConfig` la protege? **Respuesta.** No. Se puede extraer descompilando el APK. Las claves realmente secretas tienen que quedar en un backend propio que haga de intermediario.

**Cuándo no.** Cifrar datos que no son sensibles, como una preferencia de modo oscuro, suma complejidad sin beneficio.

---

## H. Dagger debajo de Hilt · Semi Senior · 6 min

**Concepto.** Hilt está construido sobre **Dagger** y le agrega componentes predefinidos, atados al ciclo de vida de Android. En Dagger se arman a mano:

- **`@Component`:** el grafo de dependencias.
- **`@Module`:** las recetas.
- **`@Provides`:** cómo construir algo que no es tuyo, como un cliente de OkHttp.
- **`@Binds`:** qué implementación usar para una interfaz. Es abstracto y más eficiente.
- **`@Inject constructor`:** las clases propias.

Hilt ya trae `SingletonComponent`, `ActivityRetainedComponent`, `ViewModelComponent`, `ActivityComponent` y `FragmentComponent`, con sus scopes: `@Singleton`, `@ActivityRetainedScoped`, `@ViewModelScoped`, `@ActivityScoped` y `@FragmentScoped`.

**Ejemplo.** El cliente de OkHttp se crea con `@Provides` en un módulo instalado en `SingletonComponent` y lleva `@Singleton`: hay uno solo en toda la app. El `TareaRepository` (interfaz) se conecta a `TareaRepositoryImpl` con `@Binds`. Un objeto que guarda el borrador de un formulario va con `@ViewModelScoped`: vive lo que vive ese ViewModel.

### Práctica

1. ¿Cuándo usás `@Binds` y cuándo `@Provides`? **Respuesta esperada.** `@Binds` para atar una interfaz a una implementación que ya se puede inyectar. `@Provides` cuando tenés que construir el objeto vos, por ejemplo con un builder.
2. Sin anotación de scope, ¿cuántas instancias se crean? **Respuesta esperada.** Una nueva cada vez que se inyecta.
3. ¿Qué problema tiene marcar todo como `@Singleton`? **Respuesta esperada.** Los objetos viven toda la app: ocupan memoria y pueden arrastrar estado viejo entre pantallas.

### Tarea para tu máquina

En un proyecto con Hilt, inyectá en dos ViewModels distintos una clase sin scope y otra con `@Singleton`, y logueá el `hashCode()` de cada una.

**Resultado esperado.** La clase sin scope muestra dos `hashCode` distintos. La `@Singleton` muestra el mismo en los dos ViewModels.

### Resumen

- Hilt está construido sobre Dagger y trae componentes atados al ciclo de vida de Android.
- Provides construye objetos que no son tuyos, y Binds conecta una interfaz con su implementación.
- Sin scope, cada inyección crea una instancia nueva.
- El scope tiene que coincidir con cuánto debe vivir el objeto, ni más ni menos.

### Repaso para entrevista

**En 30 segundos.** "Hilt es Dagger con componentes estándar de Android. Inyecto por constructor, uso `@Binds` para interfaces y `@Provides` para objetos de terceros, y elijo el scope según cuánto tiene que vivir cada objeto, sin hacer todo singleton."

**Pregunta trampa.** ¿Hilt o Dagger? **Respuesta.** Para una app Android, Hilt: menos código repetitivo y componentes que ya siguen el ciclo de vida. Dagger puro tiene sentido en módulos Kotlin sin Android o cuando hace falta un grafo muy personalizado. Por debajo, el grafo se resuelve igual, al compilar.

**Cuándo no.** En una app chica o en un ejemplo, la inyección manual por constructor es más simple y explícita.

---

## I. Gradle con Kotlin DSL y version catalogs · Semi Senior · 5 min

**Concepto.** El build de Android se escribe en archivos `.gradle.kts` (Kotlin DSL): `settings.gradle.kts` declara los módulos y cada `build.gradle.kts` configura un módulo. Las versiones se centralizan en un **version catalog** (`gradle/libs.versions.toml`, con secciones `[versions]`, `[libraries]` y `[plugins]`) y se usan con accesos tipados como `implementation(libs.retrofit)` o `alias(libs.plugins.android.application)`.

**Ejemplo.** Para actualizar Retrofit cambiás una sola línea del catálogo, y todos los módulos que lo usan pasan a la versión nueva. Un error de tipeo en `libs.retrofti` lo marca el IDE antes de compilar.

### Práctica

1. ¿Qué ventaja tiene Kotlin DSL sobre Groovy? **Respuesta esperada.** Autocompletado, verificación de tipos y navegación en el IDE.
2. ¿Para qué sirve el version catalog? **Respuesta esperada.** Para definir cada dependencia y su versión en un solo lugar, compartido por todos los módulos.
3. ¿Qué diferencia hay entre `implementation` y `api`? **Respuesta esperada.** Con `api`, la dependencia queda visible para los módulos que dependen del tuyo. Con `implementation` queda oculta, lo que aísla los módulos y recompila menos.

### Tarea para tu máquina

En un proyecto nuevo de Android Studio (ya viene con Kotlin DSL y catálogo), agregá una librería pasando por el catálogo: la versión en `[versions]`, la librería en `[libraries]` y el `implementation(libs....)` en el módulo. Sincronizá y compilá.

**Resultado esperado.** El proyecto compila y la dependencia aparece en el catálogo, no escrita a mano en el `build.gradle.kts`.

### Resumen

- El build se escribe en Kotlin, en archivos punto gradle punto kts, con autocompletado y verificación de tipos.
- El version catalog centraliza dependencias y versiones en un solo archivo.
- Con implementation la dependencia queda oculta para otros módulos, y con api queda expuesta.
- Preferir implementation aísla los módulos y hace que el build recompile menos.

### Repaso para entrevista

**En 30 segundos.** "Uso Kotlin DSL con version catalog: las versiones viven en un solo archivo y los módulos las referencian de forma tipada. Uso `implementation` por defecto y `api` solo cuando un módulo expone tipos de esa dependencia en su interfaz pública."

**Pregunta trampa.** ¿Por qué el build se puso lento al cambiar una clase de un módulo base? **Respuesta.** Si ese módulo se expone con `api` o muchos módulos dependen de él, un cambio en su interfaz obliga a recompilar a todos. Revisar `api` contra `implementation` y los límites entre módulos suele ser lo primero.

**Cuándo no.** En un proyecto de un solo módulo, la lógica de build compartida (convention plugins) es de más. Esa parte va en la lección Senior de modularización.

---

## J. Tests unitarios con JUnit y MockK · Semi Senior · 6 min

**Concepto.** Un test unitario verifica una pieza aislada en la JVM, sin emulador: se escribe con **JUnit** (`@Test` y aserciones) y las dependencias se reemplazan por **dobles**. **MockK** es la librería de mocks pensada para Kotlin:

- `mockk<T>()` crea el doble.
- `every { ... } returns ...` define respuestas.
- `coEvery` y `coVerify` son las versiones para funciones `suspend`.
- `verify { ... }` comprueba que hubo una llamada.

Para corrutinas se usa `runTest`, de kotlinx-coroutines-test. Si el ViewModel usa `viewModelScope`, se reemplaza el dispatcher principal con `Dispatchers.setMain`.

**Ejemplo.** Para testear el ViewModel de tareas, el repositorio es un mock. Con `coEvery { repo.obtenerTareas() } throws IOException()`, el test verifica que el estado termine en `Error`, sin red ni base de datos.

### Práctica

1. ¿Qué usás para definir la respuesta de una función `suspend` con MockK? **Respuesta esperada.** `coEvery`.
2. ¿Por qué un ViewModel con `viewModelScope` necesita `Dispatchers.setMain` en un test de JVM? **Respuesta esperada.** Porque `viewModelScope` usa `Dispatchers.Main`, que en la JVM no existe sin Android.
3. ¿Mock o fake para el repositorio? **Respuesta esperada.** Un fake (una implementación simple en memoria) suele dar tests más legibles y menos frágiles. El mock sirve para verificar interacciones puntuales.

### Tarea para tu máquina

Escribí dos tests para un ViewModel que carga tareas: uno donde el repositorio devuelve una lista y el estado termina en `Contenido`, y otro donde lanza una excepción y termina en `Error`. Usá MockK y `runTest`.

**Resultado esperado.** `./gradlew testDebugUnitTest` corre los dos tests en verde y sin emulador.

### Resumen

- Un test unitario verifica una pieza aislada en la JVM, sin emulador.
- MockK crea dobles en Kotlin, y co every y co verify sirven para funciones suspend.
- Run test permite testear corrutinas, y set main reemplaza el dispatcher principal.
- Un fake en memoria suele dar tests más claros que muchos mocks.

### Repaso para entrevista

**En 30 segundos.** "Testeo ViewModels y casos de uso en la JVM con JUnit, `runTest` y dobles. Prefiero fakes para repositorios y uso MockK cuando necesito verificar una interacción o simular un error puntual."

**Pregunta trampa.** ¿MockK o Mockito? **Respuesta.** MockK nació para Kotlin: maneja funciones `suspend`, `object` y extensiones de forma nativa. Mockito viene de Java. Las clases de Kotlin son `final` por defecto, y Mockito necesita el mock maker inline para poder mockearlas (desde Mockito 5 viene activado por defecto). Ambos sirven; en proyectos Kotlin se suele elegir MockK.

**Cuándo no.** Un test que mockea todo y solo verifica que se llamaron métodos queda atado a la implementación: se rompe al refactorizar sin que haya un bug. Testeá resultados, no llamadas.

---

## K. Tests de UI con Compose Testing y Espresso · Semi Senior · 6 min

**Concepto.**

- **Compose Testing** busca elementos en el árbol de semántica: crea la pantalla con `createComposeRule()`, la encuentra con `onNodeWithText` u `onNodeWithTag`, actúa con `performClick()` y comprueba con `assertIsDisplayed()`. Espera sola a que la UI termine de recomponerse.
- **Espresso** es lo mismo para vistas XML: `onView(withId(...)).perform(click()).check(matches(isDisplayed()))`.

Los dos suelen correr como tests instrumentados (en `androidTest`, sobre un emulador o dispositivo).

**Ejemplo.** Un test escribe un título en el campo, toca "Agregar" y comprueba que la tarea aparece en la lista. Otro deja el campo vacío y comprueba que se ve el mensaje de error. Para encontrar un elemento sin texto se le pone `Modifier.testTag("lista-tareas")`.

### Práctica

1. ¿Cómo encontrás en un test de Compose un elemento que no tiene texto? **Respuesta esperada.** Con un `testTag` y `onNodeWithTag`, o por su descripción de accesibilidad.
2. ¿Por qué en Compose Testing no hace falta poner esperas a mano? **Respuesta esperada.** Porque la regla se sincroniza con Compose y espera a que la UI quede estable antes de verificar.
3. ¿Qué testearías con un test de UI y qué con uno unitario? **Respuesta esperada.** En UI, que el flujo funcione de punta a punta: lo que se ve y las interacciones. Las reglas de negocio van en tests unitarios, que son más rápidos.

### Tarea para tu máquina

Escribí un test con `createComposeRule()` para una pantalla con un campo, un botón "Agregar" y una lista: agregá una tarea y verificá que aparezca, y probá el caso del campo vacío.

**Resultado esperado.** `./gradlew connectedDebugAndroidTest` (con un emulador abierto) corre los dos tests en verde.

### Resumen

- Compose Testing busca elementos en el árbol de semántica, por texto o por test tag.
- Espresso hace lo mismo para pantallas hechas con vistas XML.
- Los tests de Compose esperan solos a que la interfaz quede estable.
- Los tests de UI verifican flujos completos, y las reglas de negocio se testean con tests unitarios.

### Repaso para entrevista

**En 30 segundos.** "Con Compose Testing verifico los flujos críticos tal como los ve la persona, buscando por texto o por semántica, y con Espresso las pantallas que siguen en XML. Las reglas van en tests unitarios. Los de UI son pocos, porque son más lentos y más caros de mantener."

**Pregunta trampa.** ¿Buscarías los elementos por texto o por test tag? **Respuesta.** Por texto o semántica cuando se puede, porque además prueba lo que ve la persona y la accesibilidad. El test tag queda para elementos sin texto. Ojo: buscar por texto se rompe si cambia la traducción, así que conviene usar los recursos de strings.

**Cuándo no.** Para validar una regla de negocio, un test de UI es lento e inestable: va en un test unitario.

---

## L. Qué corre la CI en cada PR · Semi Senior · 5 min

**Concepto.** La integración continua corre chequeos automáticos en cada PR, antes de mergear: compilar, correr lint y correr los tests. En GitHub se configura con un workflow de **GitHub Actions** que se dispara con `pull_request`. Con **protección de rama**, `main` no acepta merges si los chequeos fallan.

**Ejemplo.** El workflow de la app corre `./gradlew lintDebug testDebugUnitTest assembleDebug` en cada PR. Los tests instrumentados son más lentos y necesitan emulador, así que corren en un subconjunto, de noche o antes de cada versión. La caché de Gradle evita descargar todo en cada corrida.

### Práctica

1. ¿Qué chequeos mínimos correrías en cada PR de Android? **Respuesta esperada.** Compilar, lint y tests unitarios.
2. ¿Por qué no correr todos los tests de UI en cada PR? **Respuesta esperada.** Son lentos, necesitan emulador y pueden ser inestables. Se corren en un subconjunto o con menos frecuencia.
3. ¿Qué evita la protección de rama? **Respuesta esperada.** Que se mergee a `main` código con chequeos en rojo o sin revisión.

### Tarea para tu máquina

En un repo tuyo de GitHub, creá un workflow en `.github/workflows/` que en cada `pull_request` corra los tests unitarios con Gradle. Abrí un PR con un test que falle a propósito y después arreglalo.

**Resultado esperado.** El PR muestra el chequeo en rojo con el test que falla y, después del arreglo, en verde.

### Resumen

- La integración continua corre chequeos automáticos en cada pull request, antes de integrar el cambio.
- Lo mínimo en Android es compilar, correr lint y correr los tests unitarios.
- Los tests de interfaz son más lentos y suelen correr en un subconjunto o con menos frecuencia.
- La protección de rama impide integrar código con chequeos en rojo.

### Repaso para entrevista

**En 30 segundos.** "Cada PR corre compilación, lint y tests unitarios en GitHub Actions, con caché de Gradle, y la rama principal está protegida. Los tests instrumentados corren en un subconjunto o en una corrida nocturna, para que el PR tenga respuesta en pocos minutos."

**Pregunta trampa.** Un test falla a veces y a veces no. ¿Lo reintentás hasta que pase? **Respuesta.** No: un test inestable le quita confianza a toda la CI. Se aísla, se marca para investigar y se arregla la causa (esperas, datos compartidos, orden entre tests).

**Cuándo no.** Una CI que tarda 40 minutos por PR frena al equipo. Si pasa eso, hay que paralelizar o mover lo más lento fuera del camino del PR.

---

## M. Crashlytics y monitoreo · Semi Senior · 5 min

**Concepto.** Firebase Crashlytics junta los **cierres inesperados** (crashes) de las personas usuarias con su stack trace, versión y dispositivo. Además se pueden registrar **errores no fatales**, como una excepción capturada que igual afecta a la persona, con `recordException`, y sumar contexto con `log` (migas de pan) y `setCustomKey`. Si la app se ofusca con R8, hay que subir el archivo de mapping (el plugin de Gradle de Crashlytics lo hace) para que los stack traces se lean. Otras herramientas: Sentry, y Android vitals en Play Console para ANRs y crashes.

**Ejemplo.** Al sincronizar tareas falla el parseo de una respuesta. La app lo atrapa y muestra un error amable, pero lo registra con `recordException`, más una clave con la pantalla y la versión de la API. En el panel ves cuántas personas afecta y desde qué versión.

### Práctica

1. Una excepción se atrapa y no cierra la app, pero la persona no puede sincronizar. ¿La registrás? **Respuesta esperada.** Sí, como error no fatal con `recordException`.
2. ¿Por qué los stack traces aparecen con nombres como `a.b.c`? **Respuesta esperada.** Porque la app se ofuscó con R8 y falta subir el archivo de mapping.
3. ¿Usarías el email de la persona como `setUserId`? **Respuesta esperada.** No. Es un dato personal: se usa un id interno anónimo.

### Tarea para tu máquina

Agregá Crashlytics a un proyecto de prueba siguiendo la guía de Firebase. Forzá un crash con un botón de prueba y registrá un error no fatal con una clave personalizada.

**Resultado esperado.** En la consola de Firebase aparecen el crash y el error no fatal, con la clave que agregaste. Puede tardar unos minutos y el crash se envía la próxima vez que se abre la app.

### Resumen

- Crashlytics junta los cierres inesperados con su stack trace, versión y dispositivo.
- Los errores atrapados que igual afectan a la persona se registran como no fatales.
- Con R8 hay que subir el archivo de mapping para que los errores se lean.
- Los reportes usan un id interno, nunca datos personales.

### Repaso para entrevista

**En 30 segundos.** "Monitoreo con Crashlytics los crashes y los errores no fatales importantes, con claves de contexto y logs que no llevan datos personales. Sigo el porcentaje de personas sin crashes por versión, y lo cruzo con Android vitals para los ANRs."

**Pregunta trampa.** ¿Alcanza con mirar la cantidad de crashes? **Respuesta.** No. Importa a cuántas personas afecta y en qué versión empezó. Un crash que afecta a pocas personas en un flujo de pago puede ser más urgente que uno masivo en una pantalla secundaria.

**Cuándo no.** Registrar cada excepción menor como no fatal llena el panel de ruido y esconde lo importante. Se registra lo que afecta a la persona o lo que no debería pasar.

---

## Para revisar

- [ ] ¿Te sirve el nivel asignado? Material 3 y Git quedaron en Junior y el resto en Semi Senior.
- [ ] Faltan temas de tus capturas: la primera imagen está cortada a la izquierda y entre las dos imágenes parece haber al menos un punto más. ¿Me pasás los que no se ven?
- [x] Datos sensibles: no se recomienda `EncryptedSharedPreferences`. Lo verifiqué en la referencia oficial: todas las APIs de `androidx.security:security-crypto` están deprecadas desde la versión 1.1.0. La alternativa más citada es DataStore cifrado con Tink y claves del Android Keystore; antes de maquetar, conviene revisar la guía de seguridad vigente.
