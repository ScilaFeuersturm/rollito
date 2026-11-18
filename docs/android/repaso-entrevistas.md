# Android · Lo que faltaba para preparar entrevistas, por nivel

**Estado:** borradores para revisar. Todavía no están maquetados.

Salen de revisar el contenido contra las preguntas más comunes de cada nivel. Hay tres partes:

1. **Lecciones nuevas** con temas que no aparecían o solo aparecían en otro nivel. Son conceptuales, como el resto del recorrido Android.
2. **Simulacros más largos:** 9 preguntas más por nivel, que se suman a las 3 que ya hay (12 en total).
3. **Práctica de código en vivo:** ejercicios de Kotlin como los que se piden en entrevistas, con la solución en `android-samples/kotlin/katas/`. Todas compilan con kotlinc 2.3.10 y las salidas que figuran acá son las reales.

---

# Parte 1 · Lecciones nuevas

| Nivel | Lección | Va después de |
| --- | --- | --- |
| Junior | J1. Clásicos de Kotlin: `val`, `lateinit`, `lazy`, `object` y `companion object` | 04 Extensiones |
| Junior | J2. Componentes de Android, Intents y `Context` | 05 Del XML al árbol de vistas |
| Junior | J3. Ciclo de vida de la Activity y `onSaveInstanceState` | 15 Activity y recreación |
| Junior | J4. Hilo principal, ANR y primeras corrutinas | 15 Activity y recreación |
| Junior | J5. Permisos en tiempo de ejecución | 16 Accesibilidad |
| Semi Senior | S1. Efectos en Compose y state hoisting | 24 UI unidireccional |
| Semi Senior | S2. Operadores de Flow: flujos fríos y calientes | 22 Flow |
| Semi Senior | S3. Excepciones en corrutinas | 21 Corrutinas |
| Semi Senior | S4. LiveData vs. StateFlow | 22 Flow |
| Semi Senior | S5. Servicios, foreground services y notificaciones | 28 Trabajo diferido |
| Semi Senior | S6. Paging 3 y carga de imágenes | 26 Room |
| Senior | Sr1. Fugas de memoria y LeakCanary | 37 Jank y memoria |
| Senior | Sr2. R8, tamaño de la app y App Bundles | 38 Arranque |
| Senior | Sr3. `compileSdk`, `minSdk`, `targetSdk` y feature flags | 41 Entregas |
| Senior | Sr4. Kotlin Multiplatform: cuándo sí y cuándo no | 34 Modularización |
| Senior | Sr5. Liderazgo técnico: code review, decisiones y deuda | 43 Entrevista integradora |

---

## J1. Clásicos de Kotlin: val, lateinit, lazy, object y companion object · Junior · 5 min

**Concepto.**

- **`val` y `var`:** `val` es una referencia que no se puede reasignar, y `var` sí se puede. `const val` es una constante que se conoce al compilar: solo para tipos primitivos y `String`, en el nivel superior o dentro de un `object`.
- **`lateinit var`:** promete que una propiedad no nula se va a inicializar más tarde. Solo sirve para `var` de tipos no primitivos. Si se lee antes de inicializarla, lanza `UninitializedPropertyAccessException`.
- **`by lazy`:** inicializa un `val` la primera vez que se usa. Por defecto es seguro entre hilos.
- **`object`:** declara un singleton.
- **`companion object`:** agrupa miembros que se usan desde la clase, sin una instancia (como los `static` de Java). Es un objeto de verdad, así que puede implementar interfaces.

**Ejemplo.**

- Un `binding` que se crea en `onCreate` puede ser `lateinit var`.
- Un formateador de fechas costoso que no siempre se usa conviene como `val formateador by lazy { ... }`.
- `Tarea.desdeTexto("...")` puede ser una función de fábrica dentro del `companion object`.

### Práctica

1. ¿Se puede usar `lateinit` con un `Int`? **Respuesta.** No: solo con tipos no primitivos. Para un `Int` se usa un valor inicial o `Delegates.notNull()`.
2. ¿Qué diferencia hay entre `lateinit` y `lazy`? **Respuesta.** `lateinit var` se inicializa desde afuera, cuando vos decidís. `val ... by lazy` se inicializa solo, la primera vez que se lee.
3. Una lista declarada con `val`, ¿se puede modificar? **Respuesta.** Si es una `MutableList`, sí: `val` impide reasignar la referencia, no cambiar el contenido.

### Tarea para tu máquina

Escribí una clase con una propiedad `lateinit var` y otra `by lazy` que imprima un mensaje cuando se inicializa. Leé la propiedad `lazy` dos veces, y leé la `lateinit` antes de asignarla.

**Resultado esperado.** El mensaje de `lazy` aparece una sola vez. Leer la `lateinit` sin inicializar lanza `UninitializedPropertyAccessException`.

### Resumen

- Val no se puede reasignar y var sí. Const val es una constante que se conoce al compilar.
- Lateinit promete inicializar más tarde una propiedad no nula, y solo sirve para var de tipos no primitivos.
- By lazy inicializa un val la primera vez que se usa.
- Object declara un singleton, y companion object agrupa los miembros que se usan desde la clase.

### Entrevista

**En 30 segundos.** "Uso `val` por defecto y `var` solo cuando hace falta. `lateinit` es para propiedades que inicializa el framework, como un binding, y `lazy` para valores costosos que tal vez no se usen. `companion object` reemplaza a los `static` de Java, pero es un objeto real."

**Trampa.** ¿`val` hace que un objeto sea inmutable? **Respuesta.** No. Solo impide reasignar la referencia. Si el objeto es mutable, se puede cambiar su contenido.

**Cuándo no.** `lateinit` puede esconder errores de inicialización: si el valor puede faltar de verdad, un tipo nulable (`String?`) lo deja explícito.

---

## J2. Componentes de Android, Intents y Context · Junior · 6 min

**Concepto.** Android tiene cuatro componentes principales:

- **Activity:** una pantalla.
- **Service:** trabajo sin interfaz.
- **BroadcastReceiver:** responde a eventos del sistema o de otras apps.
- **ContentProvider:** comparte datos con otras apps.

Se declaran en el `AndroidManifest.xml` (los receivers también se pueden registrar desde el código).

Un **Intent** es un mensaje para arrancar un componente. Es **explícito** cuando nombra la clase de destino, e **implícito** cuando describe una acción (`ACTION_VIEW`, `ACTION_SEND`) y el sistema elige qué app la atiende.

**`Context`** es el acceso a los recursos y servicios del sistema. El de la Application vive toda la app; el de una Activity, lo que vive esa pantalla.

Un **Fragment** es una porción de interfaz reutilizable, con su propio ciclo de vida, dentro de una Activity.

**Ejemplo.** Para abrir el detalle de una tarea dentro de la app se usa un Intent explícito (o la navegación). Para compartirla por WhatsApp o mail, un Intent implícito con `ACTION_SEND`, y el sistema muestra las apps disponibles.

### Práctica

1. ¿Qué Intent usás para abrir una pantalla de tu propia app? **Respuesta.** Uno explícito, que nombra la clase de destino.
2. ¿Por qué no guardar el `Context` de una Activity en un singleton? **Respuesta.** El singleton vive toda la app y retiene la Activity después de que se destruye: es una fuga de memoria. Si hace falta un contexto de larga vida, se usa el de la Application.
3. ¿Cuáles son los cuatro componentes de Android? **Respuesta.** Activity, Service, BroadcastReceiver y ContentProvider.

### Tarea para tu máquina

En un proyecto, agregá un botón "Compartir" que mande el título de una tarea con un Intent implícito `ACTION_SEND` de tipo `text/plain`.

**Resultado esperado.** Al tocarlo aparece el selector del sistema con las apps que pueden recibir texto.

### Resumen

- Los cuatro componentes de Android son Activity, Service, BroadcastReceiver y ContentProvider.
- Un intent explícito nombra la pantalla de destino, y uno implícito describe una acción para que el sistema elija la app.
- El contexto da acceso a recursos y servicios, y no hay que retener el de una Activity en objetos de larga vida.
- Un Fragment es una parte de interfaz reutilizable, con su propio ciclo de vida, dentro de una Activity.

### Entrevista

**En 30 segundos.** "Android tiene cuatro componentes: Activity, Service, BroadcastReceiver y ContentProvider. Se comunican con Intents, explícitos dentro de la app e implícitos para delegar una acción en otra. Cuido qué `Context` uso: el de la Activity para la UI y el de la Application para lo que vive más."

**Trampa.** ¿Activity o Fragment? **Respuesta.** No compiten: el Fragment vive dentro de una Activity. Hoy, con Compose y Navigation, es común una sola Activity con pantallas composables, y Fragments en apps con vistas XML.

**Cuándo no.** Para algo puramente interno, no hace falta un Intent implícito ni exponer un componente en el manifest: exportar componentes sin necesidad es un riesgo de seguridad.

---

## J3. Ciclo de vida de la Activity y onSaveInstanceState · Junior · 5 min

**Concepto.** Una Activity pasa por estos estados:

- **Al abrirse:** `onCreate` → `onStart` → `onResume`.
- **Al ir al inicio del teléfono:** `onPause` → `onStop`.
- **Al volver:** `onRestart` → `onStart` → `onResume`.
- **Al rotar la pantalla:** se destruye y se recrea (`onPause`, `onStop`, `onDestroy` y de nuevo `onCreate`, `onStart`, `onResume`).

Para que el estado de la UI sobreviva a esa recreación, y también a que el sistema mate el proceso en segundo plano, se guarda en un `Bundle` con `onSaveInstanceState`. En Compose, `rememberSaveable` usa ese mismo mecanismo.

**Ejemplo.** El texto que la persona está escribiendo en el campo "Nueva tarea" se guarda en el `Bundle`. La lista de tareas no: se vuelve a leer del repositorio.

### Práctica

1. ¿Qué callbacks se llaman al abrir una Activity? **Respuesta.** `onCreate`, `onStart` y `onResume`, en ese orden.
2. ¿Guardarías la lista completa de tareas en el `Bundle`? **Respuesta.** No. El `Bundle` es para datos chicos de la UI: si es muy grande, la app puede fallar con `TransactionTooLargeException`. Los datos se recargan de su fuente.
3. ¿Qué hace `rememberSaveable` que no hace `remember`? **Respuesta.** Sobrevive a la recreación de la Activity y a la muerte del proceso, porque guarda el valor en el estado guardado.

### Tarea para tu máquina

Agregá un log en cada callback del ciclo de vida de una Activity. Abrila, mandá la app al fondo, volvé y rotá la pantalla.

**Resultado esperado.** En Logcat ves la secuencia de cada caso, y que al rotar se llama a `onDestroy` y después de nuevo a `onCreate`.

### Resumen

- Al abrirse, una Activity pasa por on create, on start y on resume.
- Al rotar la pantalla, la Activity se destruye y se vuelve a crear.
- El estado chico de la interfaz se guarda en un Bundle con on save instance state.
- En Compose, remember saveable usa ese mismo mecanismo.

### Entrevista

**En 30 segundos.** "La Activity se recrea en cada cambio de configuración. El estado de la pantalla vive en el ViewModel, el estado chico de la UI se guarda con `onSaveInstanceState` o `rememberSaveable` para sobrevivir también a la muerte del proceso, y los datos se recargan desde su fuente."

**Trampa.** ¿`onDestroy` siempre se llama? **Respuesta.** No está garantizado: si el sistema mata el proceso, puede no llamarse. Lo importante se guarda antes, por ejemplo en `onStop`.

**Cuándo no.** No hace falta guardar en el `Bundle` lo que ya vive en el ViewModel y se puede recalcular.

---

## J4. Hilo principal, ANR y primeras corrutinas · Junior · 5 min

**Concepto.** La interfaz se dibuja y responde a los toques en el **hilo principal**. Si lo bloqueás, la app se congela, y si no responde a un toque en unos 5 segundos, el sistema muestra un **ANR** ("La app no responde"). Hacer una llamada de red en el hilo principal directamente lanza `NetworkOnMainThreadException`.

Las **corrutinas** permiten escribir trabajo asincrónico como código secuencial. Una función `suspend` puede pausarse sin bloquear el hilo. Desde un ViewModel se lanza con `viewModelScope.launch`, y el trabajo pesado se mueve con `withContext(Dispatchers.IO)`.

**Ejemplo.** Al abrir la pantalla, el ViewModel lanza una corrutina que trae las tareas de la API. Mientras espera, el hilo principal sigue libre y se ve un indicador de carga.

### Práctica

1. ¿Qué pasa si una consulta pesada a la base corre en el hilo principal? **Respuesta.** La interfaz se congela, y si tarda demasiado aparece un ANR.
2. ¿Qué significa que una función sea `suspend`? **Respuesta.** Que puede pausarse sin bloquear el hilo y seguir después, por ejemplo cuando llega la respuesta de la red.
3. ¿Por qué `viewModelScope`? **Respuesta.** Porque cancela solo sus corrutinas cuando el ViewModel se destruye, y así no queda trabajo huérfano.

### Tarea para tu máquina

En un ViewModel, simulá una carga lenta con `delay(2000)` dentro de `viewModelScope.launch` y mostrá un indicador de carga mientras tanto. Después reemplazalo por `Thread.sleep(2000)` en el hilo principal y compará.

**Resultado esperado.** Con `delay` la UI sigue respondiendo y se ve la carga. Con `Thread.sleep` la pantalla se congela dos segundos.

### Resumen

- La interfaz vive en el hilo principal, y bloquearlo congela la app.
- Si la app no responde en unos cinco segundos, el sistema muestra un error de aplicación que no responde.
- Una función suspend puede pausarse sin bloquear el hilo.
- Desde un ViewModel, las corrutinas se lanzan con view model scope, que las cancela cuando ya no hacen falta.

### Entrevista

**En 30 segundos.** "Nunca bloqueo el hilo principal: la red y la base de datos van en corrutinas lanzadas desde `viewModelScope`, y el trabajo pesado se mueve con `withContext(Dispatchers.IO)`. Así la UI sigue respondiendo y el trabajo se cancela solo si la pantalla se cierra."

**Trampa.** ¿Una corrutina es un hilo? **Respuesta.** No. Muchas corrutinas pueden correr sobre pocos hilos. Suspender una corrutina libera el hilo para otras.

**Cuándo no.** `GlobalScope` no está atado a ningún ciclo de vida, así que el trabajo puede quedar corriendo después de que la pantalla se cerró. Casi nunca es la opción correcta.

---

## J5. Permisos en tiempo de ejecución · Junior · 5 min

**Concepto.** Los permisos **normales** (como `INTERNET`) se conceden al instalar. Los **peligrosos** (cámara, ubicación, contactos) se piden mientras la app está en uso, desde Android 6 (API 23). Desde Android 13 (API 33), mostrar notificaciones también requiere un permiso de ejecución: `POST_NOTIFICATIONS`.

Se piden con `ActivityResultContracts.RequestPermission` (en Compose, a través de `rememberLauncherForActivityResult`). Si la persona ya lo rechazó una vez, `shouldShowRequestPermissionRationale` indica que conviene explicar para qué lo necesitás.

**Ejemplo.** La app pide la cámara recién cuando la persona toca "Adjuntar foto", no al abrirse. Si lo rechaza, la app sigue funcionando y el botón explica cómo habilitarlo.

### Práctica

1. ¿Cuándo conviene pedir el permiso de cámara? **Respuesta.** Cuando la persona usa la función que lo necesita, para que entienda el motivo.
2. ¿Hace falta pedir `INTERNET` mientras la app está en uso? **Respuesta.** No: es un permiso normal y se concede al instalar.
3. ¿Qué cambió en Android 13 con las notificaciones? **Respuesta.** Mostrarlas requiere el permiso `POST_NOTIFICATIONS`, que se pide mientras la app está en uso.

### Tarea para tu máquina

Agregá un botón que pida el permiso de cámara con `rememberLauncherForActivityResult`. Mostrá un mensaje distinto si se concede o se rechaza, y probá rechazarlo dos veces.

**Resultado esperado.** Cada respuesta muestra su mensaje. Después de rechazarlo, la app sigue funcionando y explica cómo habilitarlo desde Ajustes.

### Resumen

- Los permisos normales se conceden al instalar, y los peligrosos se piden mientras la app está en uso.
- Desde Android 13, mostrar notificaciones también requiere permiso.
- Conviene pedir cada permiso en el momento en que se usa la función que lo necesita.
- Si la persona lo rechaza, la app tiene que seguir funcionando.

### Entrevista

**En 30 segundos.** "Pido los permisos peligrosos en contexto, cuando se usa la función, con la Activity Result API. Si la persona los rechaza, la app sigue funcionando y explica cómo habilitarlos, y desde Android 13 trato las notificaciones como un permiso más."

**Trampa.** ¿Pedís todos los permisos al abrir la app? **Respuesta.** No. Sin contexto, la gente los rechaza, y después el sistema puede dejar de mostrar el diálogo. Se pide uno por vez, cuando hace falta.

**Cuándo no.** Si podés evitar el permiso, mejor: el selector de fotos del sistema permite elegir imágenes sin pedir acceso a toda la galería.

---

## S1. Efectos en Compose y state hoisting · Semi Senior · 6 min

**Concepto.** Una función composable se puede ejecutar muchas veces, así que no debería tener efectos secundarios sueltos. Para eso están los **efectos**:

- **`LaunchedEffect(clave)`:** lanza una corrutina al entrar en pantalla, la reinicia si cambia la clave y la cancela al salir.
- **`DisposableEffect`:** registra algo y lo limpia en `onDispose`.
- **`rememberCoroutineScope`:** lanza corrutinas desde un callback, como un clic.
- **`derivedStateOf`:** evita recomponer cuando un valor derivado cambia menos seguido que su origen.

**State hoisting** es subir el estado: el composable recibe `valor` y `alCambiar`, en vez de guardarlo adentro. Así queda sin estado, reutilizable y fácil de probar.

**Ejemplo.** `LaunchedEffect(tareaId)` carga el detalle cada vez que cambia el id. Un botón "Volver arriba" usa `derivedStateOf { estadoLista.firstVisibleItemIndex > 0 }` para recomponer solo cuando cambia de visible a oculto, no en cada píxel de scroll.

### Práctica

1. ¿Qué efecto usás para lanzar una animación de scroll al tocar un botón? **Respuesta.** `rememberCoroutineScope`, porque se lanza desde un callback y no al entrar en pantalla.
2. ¿Qué pasa si la clave de un `LaunchedEffect` cambia? **Respuesta.** Se cancela la corrutina anterior y arranca una nueva.
3. ¿Qué ganás con un `CampoTitulo(valor, alCambiar)` en vez de uno con estado propio? **Respuesta.** Se reutiliza, se prueba fácil y el dueño del estado decide qué pasa con cada cambio.

### Tarea para tu máquina

Armá una lista larga con un botón "Volver arriba" que aparezca solo cuando el primer elemento ya no se ve. Calculá la visibilidad con `derivedStateOf` y hacé el scroll con `rememberCoroutineScope`.

**Resultado esperado.** El botón aparece y desaparece en el punto justo, y al tocarlo la lista vuelve al principio con animación.

### Resumen

- Un composable puede ejecutarse muchas veces, así que no debería tener efectos secundarios sueltos.
- Launched effect lanza una corrutina atada a una clave, y disposable effect limpia lo que se registra.
- Derived state of evita recomposiciones cuando un valor derivado cambia menos que su origen.
- Subir el estado deja composables sin estado, reutilizables y fáciles de probar.

### Entrevista

**En 30 segundos.** "Mantengo los composables sin efectos sueltos: uso `LaunchedEffect` con claves explícitas, `DisposableEffect` para lo que hay que limpiar y `rememberCoroutineScope` para acciones del usuario. Subo el estado al dueño correcto y uso `derivedStateOf` cuando un valor cambia mucho menos que su origen."

**Trampa.** ¿`LaunchedEffect(Unit)` es lo mismo que `onCreate`? **Respuesta.** Se parece, pero corre cuando el composable entra en la composición, que puede pasar muchas veces (por ejemplo, al volver de otra pantalla de la navegación). Lo que tiene que pasar una sola vez va en el ViewModel.

**Cuándo no.** `derivedStateOf` tiene un costo propio: si el valor derivado cambia tan seguido como su origen, no ahorra nada.

---

## S2. Operadores de Flow: flujos fríos y calientes · Semi Senior · 6 min

**Concepto.**

- **Flujo frío** (`flow { }`): se ejecuta de nuevo para cada recolector, y solo cuando alguien recolecta.
- **Flujo caliente** (`StateFlow` y `SharedFlow`): existe aunque nadie lo escuche. `stateIn` y `shareIn` convierten un frío en caliente.

Operadores clave:

- **`map` y `filter`:** transforman o filtran cada valor.
- **`combine`:** emite con el último valor de cada flujo cada vez que cualquiera cambia.
- **`flatMapLatest`:** cancela el flujo anterior cuando llega un valor nuevo.
- **`debounce`:** espera una pausa antes de emitir.
- **`distinctUntilChanged`:** saltea valores repetidos.
- **`catch`:** atrapa errores de lo que viene antes en la cadena.

**Ejemplo.** El buscador de tareas hace `consulta.debounce(300).distinctUntilChanged().flatMapLatest { repo.buscar(it) }`: espera que la persona deje de tipear, no repite búsquedas iguales y cancela la búsqueda vieja si llega una nueva. El filtro y la lista se juntan con `combine`.

### Práctica

1. ¿Qué operador cancela la búsqueda anterior cuando llega una consulta nueva? **Respuesta.** `flatMapLatest`.
2. Dos personas recolectan un `flow { }` que llama a la API. ¿Cuántas llamadas hay? **Respuesta.** Dos, porque es frío. Para compartir una sola llamada se convierte con `stateIn` o `shareIn`.
3. ¿Qué diferencia hay entre `combine` y `zip`? **Respuesta.** `combine` emite cada vez que cualquiera cambia, con el último valor del otro. `zip` empareja los valores de a uno.

### Tarea para tu máquina

En la JVM, con kotlinx-coroutines, emití "y", "ye", "yer" con 100 ms entre cada uno, una pausa de 500 ms, y "yerba". Aplicale `debounce(300)` e imprimí lo que llega.

**Resultado esperado.** Se imprimen solo "yer" y "yerba". Es el mismo comportamiento que la kata de debounce de la Parte 3.

### Resumen

- Un flujo frío se ejecuta de nuevo para cada recolector, y uno caliente existe aunque nadie lo escuche.
- State in y share in convierten un flujo frío en caliente, para compartir el trabajo.
- Flat map latest cancela el trabajo anterior cuando llega un valor nuevo.
- Combine junta el último valor de varios flujos, y debounce espera una pausa antes de emitir.

### Entrevista

**En 30 segundos.** "Distingo flujos fríos y calientes: los repositorios exponen flujos fríos y el ViewModel los convierte en `StateFlow` con `stateIn`. Para búsquedas uso `debounce`, `distinctUntilChanged` y `flatMapLatest`, y para juntar filtros con datos, `combine`."

**Trampa.** ¿Hace falta `distinctUntilChanged` después de un `StateFlow`? **Respuesta.** No: `StateFlow` ya ignora un valor igual al actual.

**Cuándo no.** Una cadena de diez operadores que nadie entiende es peor que dos pasos con nombre: conviene extraer funciones o propiedades intermedias.

---

## S3. Excepciones en corrutinas · Semi Senior · 6 min

**Concepto.** En la concurrencia estructurada, una corrutina hija que falla cancela a su padre y a sus hermanas, porque así funciona un `Job` común. Con **`SupervisorJob`** o **`supervisorScope`**, la falla de una hija no cancela a las demás (`viewModelScope` ya usa un `SupervisorJob`).

Además:

- **`CoroutineExceptionHandler`:** solo atrapa excepciones de corrutinas raíz lanzadas con `launch`. Con `async`, la excepción aparece al llamar a `await()`.
- **`CancellationException`:** nunca hay que tragarla. Si la atrapás, relanzala: así funciona la cancelación.

**Ejemplo.** La pantalla de inicio carga tareas y estadísticas en paralelo dentro de un `supervisorScope`. Si fallan las estadísticas, las tareas se muestran igual y la tarjeta de estadísticas muestra su propio error.

### Práctica

1. En un `coroutineScope`, falla una de tres corrutinas hijas. ¿Qué pasa con las otras? **Respuesta.** Se cancelan, y la excepción sube al padre.
2. ¿Qué tiene de peligroso un `runCatching` alrededor de una función `suspend`? **Respuesta.** También atrapa la `CancellationException`, así que la corrutina puede seguir corriendo cuando debería haberse cancelado.
3. ¿Dónde atrapás la excepción de un `async`? **Respuesta.** Al llamar a `await()`, con un `try/catch`.

### Tarea para tu máquina

En la JVM, lanzá dos corrutinas dentro de `coroutineScope`: una falla a los 100 ms y la otra imprime a los 500 ms. Repetilo con `supervisorScope` (envolviendo la que falla en un `try/catch` o usando un handler).

**Resultado esperado.** Con `coroutineScope`, la segunda no llega a imprimir. Con `supervisorScope`, imprime aunque la primera falló.

### Resumen

- En un scope común, una corrutina hija que falla cancela a su padre y a sus hermanas.
- Con supervisor job o supervisor scope, la falla de una hija no afecta a las otras.
- El manejador de excepciones solo atrapa las corrutinas raíz lanzadas con launch.
- La excepción de cancelación nunca se traga: si la atrapás, la relanzás.

### Entrevista

**En 30 segundos.** "Con concurrencia estructurada, una falla en una hija cancela al resto, salvo que use un `supervisorScope` para tareas independientes. Atrapo errores donde puedo responder a ellos, nunca trago `CancellationException`, y uso `CoroutineExceptionHandler` como última red en corrutinas raíz."

**Trampa.** ¿Un `CoroutineExceptionHandler` en un `async` atrapa la excepción? **Respuesta.** No. `async` guarda la excepción en el `Deferred` y la lanza al llamar a `await()`.

**Cuándo no.** Si las tareas en paralelo dependen unas de otras y todas tienen que salir bien, la cancelación en cascada del scope común es justo lo que querés: un supervisor ahí escondería el problema.

---

## S4. LiveData vs. StateFlow · Semi Senior · 5 min

**Concepto.**

- **LiveData:** es de Android y respeta el ciclo de vida sola: `observe(owner)` deja de notificar cuando la pantalla no se ve. Se actualiza con `setValue` (en el hilo principal) o `postValue`.
- **StateFlow:** es de Kotlin y no depende de Android, así que se testea en la JVM pura. Exige un valor inicial, ignora valores repetidos y tiene todos los operadores de Flow. Para respetar el ciclo de vida se recolecta con `collectAsStateWithLifecycle` o `repeatOnLifecycle`.

**Ejemplo.** Un ViewModel viejo expone `LiveData<List<Tarea>>`. Al migrar a Compose y corrutinas, pasa a exponer un `StateFlow<EstadoTareas>`, armado con `combine` y `stateIn` a partir del repositorio, y la UI lo recolecta respetando el ciclo de vida.

### Práctica

1. ¿Cuál de los dos se puede testear sin Android? **Respuesta.** StateFlow: es Kotlin puro.
2. ¿Por qué LiveData no necesita `repeatOnLifecycle`? **Respuesta.** Porque `observe` ya está atado al ciclo de vida de quien observa.
3. ¿Usarías un estado para mostrar un mensaje una sola vez, por ejemplo "Tarea guardada"? **Respuesta.** Hay que tener cuidado: un estado se vuelve a mostrar al recrear la pantalla. Lo recomendado es modelarlo en el estado y marcarlo como consumido cuando se muestra.

### Tarea para tu máquina

Tomá un ViewModel con `MutableLiveData` y migralo a `MutableStateFlow` con su valor inicial. En la UI, reemplazá `observe` por `collectAsStateWithLifecycle`.

**Resultado esperado.** La pantalla se comporta igual, y podés escribir un test de JVM para el ViewModel sin `InstantTaskExecutorRule`.

### Resumen

- LiveData es de Android y respeta el ciclo de vida sola.
- StateFlow es de Kotlin, exige un valor inicial y tiene todos los operadores de Flow.
- Para que StateFlow respete el ciclo de vida, la interfaz lo recolecta con collect as state with lifecycle.
- En proyectos nuevos con corrutinas se suele elegir StateFlow.

### Entrevista

**En 30 segundos.** "En proyectos nuevos uso StateFlow: es Kotlin puro, se testea en la JVM y tiene los operadores de Flow. Lo recolecto respetando el ciclo de vida. LiveData sigue siendo válido en código existente, y migro de a una pantalla cuando conviene."

**Trampa.** ¿`SingleLiveEvent` es una buena forma de mandar eventos? **Respuesta.** Es un parche conocido con problemas (eventos perdidos o duplicados con varios observadores). Hoy se recomienda modelar el evento en el estado y marcarlo como consumido.

**Cuándo no.** Migrar una app grande que funciona bien con LiveData solo por moda no aporta valor. Se migra cuando se toca la pantalla.

---

## S5. Servicios, foreground services y notificaciones · Semi Senior · 6 min

**Concepto.** Un **Service** hace trabajo sin interfaz. Desde Android 8 (API 26), el sistema limita fuerte los servicios en segundo plano. Para trabajo que la persona está esperando (reproducir música, una descarga que sigue en curso), se usa un **foreground service**, que muestra una notificación fija. Desde Android 14 (API 34), además, tiene que declarar su `foregroundServiceType`.

Para trabajo que se puede postergar pero tiene que terminarse (sincronizar, subir un archivo), lo indicado es **WorkManager**.

Las notificaciones necesitan un **canal** desde Android 8, y el permiso `POST_NOTIFICATIONS` desde Android 13.

**Ejemplo.** Subir las fotos adjuntas a las tareas va con WorkManager, con restricción de red y reintentos. Un cronómetro de concentración que la persona ve correr en la notificación es un foreground service.

### Práctica

1. Sincronizar las tareas una vez por día: ¿Service o WorkManager? **Respuesta.** WorkManager: es diferible, sobrevive a reinicios y respeta las restricciones del sistema.
2. ¿Qué exige un foreground service? **Respuesta.** Una notificación visible y, desde Android 14, declarar su tipo.
3. ¿Qué pasa con una notificación sin canal en Android 8 o superior? **Respuesta.** No se muestra.

### Tarea para tu máquina

Creá un canal de notificaciones y mostrá una notificación al completar una tarea. Pedí `POST_NOTIFICATIONS` si el dispositivo es Android 13 o superior.

**Resultado esperado.** La notificación aparece. En Ajustes de la app se ve el canal con el nombre que le diste, y la persona puede silenciarlo por separado.

### Resumen

- Un servicio hace trabajo sin interfaz, y desde Android 8 los de segundo plano están muy limitados.
- Un foreground service muestra una notificación fija y, desde Android 14, declara su tipo.
- WorkManager es para trabajo que se puede postergar pero tiene que terminarse.
- Las notificaciones necesitan un canal, y desde Android 13 también un permiso.

### Entrevista

**En 30 segundos.** "Elijo según quién espera el trabajo: si la persona lo está viendo, foreground service con su tipo declarado; si se puede postergar pero tiene que terminarse, WorkManager. Las notificaciones van con canales pensados para que la persona controle qué recibe."

**Trampa.** ¿WorkManager sirve para un trabajo exacto a las 9:00? **Respuesta.** No garantiza la hora exacta: el sistema puede agrupar o demorar el trabajo para cuidar la batería. Para algo exacto, como una alarma, se usa `AlarmManager`, con sus restricciones.

**Cuándo no.** Un foreground service para algo que puede esperar molesta a la persona con una notificación fija y gasta batería: va en WorkManager.

---

## S6. Paging 3 y carga de imágenes · Semi Senior · 6 min

**Concepto.**

- **Paging 3** carga listas grandes de a páginas. Un `PagingSource` sabe cargar una página a partir de una clave, y un `Pager` expone un `Flow<PagingData>`. En el ViewModel se hace `cachedIn(viewModelScope)`, y en Compose se recolecta con `collectAsLazyPagingItems()`. Para combinar red y base local, está `RemoteMediator`.
- **Imágenes:** una librería como **Coil** (Kotlin y corrutinas, con `AsyncImage` para Compose) o Glide resuelve la caché en memoria y en disco, cancela las cargas de elementos que salen de pantalla y reduce la imagen al tamaño en que se muestra.

**Ejemplo.** El historial de 10.000 tareas completadas se carga de a 30 a medida que la persona hace scroll. Las fotos adjuntas se cargan con Coil al tamaño de la miniatura, no a la resolución original.

### Práctica

1. ¿Por qué no traer las 10.000 tareas de una vez? **Respuesta.** Por memoria, red y tiempo de carga: se ven pocas por vez.
2. ¿Para qué sirve `cachedIn(viewModelScope)`? **Respuesta.** Para que las páginas cargadas sobrevivan a la recreación de la pantalla y no se vuelvan a pedir.
3. ¿Qué pasa si cargás una foto de 4000 px en una miniatura de 64 dp sin reducirla? **Respuesta.** Ocupa mucha memoria sin necesidad y puede provocar trabas o un `OutOfMemoryError`.

### Tarea para tu máquina

Implementá un `PagingSource` que devuelva números de a 20, con una demora simulada, y mostralo en una `LazyColumn` con un indicador de "cargando más" al final.

**Resultado esperado.** Al hacer scroll se cargan páginas nuevas y se ve el indicador mientras llegan.

### Resumen

- Paging carga listas grandes de a páginas, a medida que hace falta.
- Un paging source carga una página, y cached in conserva las páginas al recrear la pantalla.
- Una librería de imágenes resuelve la caché, cancela cargas y reduce cada imagen a su tamaño en pantalla.
- Cargar imágenes a resolución completa en miniaturas gasta memoria y puede trabar la lista.

### Entrevista

**En 30 segundos.** "Para listas grandes uso Paging 3, con `cachedIn` en el ViewModel y `RemoteMediator` si combino red y base local. Las imágenes las carga Coil, que cachea, cancela lo que sale de pantalla y reduce cada imagen al tamaño en que se muestra."

**Trampa.** ¿Paging resuelve que la lista se trabe al hacer scroll? **Respuesta.** No necesariamente. Resuelve cuántos datos se cargan, no lo caro que es cada fila. Si cada elemento recompone de más o carga imágenes enormes, se sigue trabando.

**Cuándo no.** Para una lista de 50 elementos, Paging suma complejidad (estados de carga, tests) sin beneficio: alcanza con cargar todo.

---

## Sr1. Fugas de memoria y LeakCanary · Senior · 6 min

**Concepto.** Hay una fuga cuando un objeto sigue referenciado después de que terminó su ciclo de vida y el recolector no puede liberarlo. Las causas típicas en Android:

- Un singleton o un campo estático que guarda una Activity, o su `Context`.
- Listeners que no se desregistran.
- Clases internas o lambdas que retienen la Activity.
- Corrutinas lanzadas en `GlobalScope` que capturan vistas.
- El binding de un Fragment que no se libera en `onDestroyView`.

**LeakCanary**, en builds de debug, vigila Activities, Fragments y ViewModels destruidos y, si siguen vivos, muestra la cadena de referencias que los retiene.

**Ejemplo.** Un `GestorDeSincronizacion` singleton recibe un listener de la pantalla de tareas y nunca lo suelta. Cada vez que se abre y se cierra la pantalla, queda una Activity vieja en memoria. LeakCanary muestra la cadena: singleton → lista de listeners → lambda → Activity.

### Práctica

1. ¿Por qué guardar una Activity en un singleton es una fuga? **Respuesta.** El singleton vive toda la app y no deja que se libere la Activity destruida, con todas sus vistas.
2. ¿Qué tiene que hacer un Fragment con su binding en `onDestroyView`? **Respuesta.** Ponerlo en `null`, porque la vista se destruye pero el Fragment puede seguir vivo.
3. ¿Qué muestra LeakCanary? **Respuesta.** La cadena de referencias que retiene el objeto que debería haberse liberado.

### Tarea para tu máquina

Agregá LeakCanary como dependencia de debug a un proyecto. Provocá una fuga guardando la Activity en un `object`, rotá la pantalla y leé el reporte.

**Resultado esperado.** LeakCanary avisa con una notificación y muestra la cadena desde el `object` hasta la Activity. Al quitar la referencia, la fuga desaparece.

### Resumen

- Hay una fuga cuando un objeto sigue referenciado después de que terminó su ciclo de vida.
- Las causas típicas son singletons que guardan una Activity, listeners sin desregistrar y bindings que no se liberan.
- LeakCanary detecta en debug los objetos que no se liberaron y muestra quién los retiene.
- Atar el trabajo y las referencias al ciclo de vida correcto evita la mayoría de las fugas.

### Entrevista

**En 30 segundos.** "Prevengo fugas atando cada referencia y cada corrutina al ciclo de vida correcto: nada de Activities en singletons, listeners que se desregistran y bindings liberados en `onDestroyView`. Uso LeakCanary en debug y el profiler de memoria para confirmar con un heap dump."

**Trampa.** ¿Con un recolector de basura puede haber fugas? **Respuesta.** Sí. El recolector solo libera lo que no está referenciado. Si algo de larga vida apunta a un objeto, ese objeto no se libera.

**Cuándo no.** LeakCanary no va en el build de producción: es una herramienta de debug y agrega costo.

---

## Sr2. R8, tamaño de la app y App Bundles · Senior · 5 min

**Concepto.** **R8** hace tres cosas en el build de release: elimina el código que no se usa (shrinking), acorta los nombres (ofuscación) y optimiza. Con `isShrinkResources = true` también elimina los recursos sin usar (requiere `isMinifyEnabled = true`). Lo que se usa por reflexión necesita **reglas keep**, o R8 lo borra o lo renombra.

El **Android App Bundle** (`.aab`) permite que Google Play genere APKs a medida de cada dispositivo (densidad, ABI e idioma), así cada persona descarga menos. Es obligatorio para apps nuevas en Play desde agosto de 2021.

**Ejemplo.** Después de activar R8, la app en release falla al parsear una respuesta: una clase que se lee por reflexión quedó renombrada. Se arregla con una regla keep (o usando una librería de serialización sin reflexión).

### Práctica

1. ¿Por qué una app puede andar en debug y fallar en release con R8? **Respuesta.** Porque R8 eliminó o renombró código que se usa por reflexión y no tenía regla keep.
2. ¿Qué ventaja tiene subir un App Bundle en vez de un APK universal? **Respuesta.** Play arma APKs a medida de cada dispositivo, y la descarga es más chica.
3. ¿Qué necesitás para leer los stack traces de una app ofuscada? **Respuesta.** El archivo de mapping de ese build.

### Tarea para tu máquina

En un proyecto, activá `isMinifyEnabled` y `isShrinkResources` en release. Compará el tamaño del APK con el analizador de Android Studio (Build → Analyze APK).

**Resultado esperado.** El APK de release es más chico. En el analizador se ven los nombres de clases ofuscados y menos recursos.

### Resumen

- R8 elimina código sin usar, acorta nombres y optimiza el build de release.
- Lo que se usa por reflexión necesita reglas keep para que R8 no lo rompa.
- El App Bundle permite que Google Play arme APKs a medida de cada dispositivo.
- Para leer los errores de una app ofuscada hace falta el archivo de mapping de ese build.

### Entrevista

**En 30 segundos.** "En release activo R8 con shrinking de recursos, mantengo reglas keep mínimas y prefiero librerías sin reflexión. Publico App Bundles, subo el mapping de cada versión y vigilo el tamaño de la app como una métrica más."

**Trampa.** ¿R8 hace que la app sea segura contra la ingeniería inversa? **Respuesta.** No. La ofuscación la hace más difícil, pero no imposible. Los secretos no pueden vivir en el APK.

**Cuándo no.** En debug no conviene activar R8: el build tarda más y depurar se vuelve incómodo. Lo que sí conviene es probar el build de release antes de publicar.

---

## Sr3. compileSdk, minSdk, targetSdk y feature flags · Senior · 5 min

**Concepto.**

- **`compileSdk`:** contra qué versión de las APIs compilás. Define qué APIs podés usar en el código.
- **`minSdk`:** la versión más vieja en la que se puede instalar la app.
- **`targetSdk`:** con qué comportamiento del sistema declarás que fue probada la app. Al subirlo se activan cambios de comportamiento nuevos, y Google Play exige mantenerlo actualizado.

Para usar una API más nueva que el `minSdk`, se chequea `Build.VERSION.SDK_INT` o se usa una librería de compatibilidad de AndroidX.

Los **feature flags** permiten activar o desactivar una función sin publicar otra versión: sirven para entregas graduales, pruebas A/B y apagar algo que falla.

**Ejemplo.** El color dinámico se activa solo si `SDK_INT >= 31`. Una pantalla nueva de estadísticas sale apagada detrás de un flag y se prende para el 10 % de las personas.

### Práctica

1. ¿Qué cambia al subir el `targetSdk`? **Respuesta.** Se activan los cambios de comportamiento de esa versión del sistema, así que hay que probar la app de nuevo.
2. ¿Qué pasa si llamás a una API de Android 12 en un dispositivo con Android 10? **Respuesta.** La app falla en ejecución. Hay que chequear la versión o usar una alternativa de compatibilidad.
3. ¿Para qué sirve un feature flag remoto? **Respuesta.** Para apagar una función que falla, o liberarla de a poco, sin esperar una versión nueva.

### Tarea para tu máquina

Mirá el `build.gradle.kts` de un proyecto y anotá sus tres valores de SDK. Agregá una función que use una API más nueva que el `minSdk` y protegela con un chequeo de versión.

**Resultado esperado.** El proyecto compila y lint no marca la llamada nueva como insegura.

### Resumen

- Compile SDK define qué APIs podés usar al compilar.
- Min SDK es la versión más vieja en la que se puede instalar la app.
- Target SDK define con qué comportamiento del sistema corre la app, y Google Play exige mantenerlo actualizado.
- Los feature flags permiten activar o apagar funciones sin publicar otra versión.

### Entrevista

**En 30 segundos.** "Compilo contra la última versión, elijo `minSdk` según los datos de dispositivos de las personas usuarias y subo `targetSdk` cada año, revisando los cambios de comportamiento. Las funciones riesgosas salen detrás de feature flags, con entrega gradual y forma de apagarlas."

**Trampa.** ¿`targetSdk` y `compileSdk` son lo mismo? **Respuesta.** No. `compileSdk` afecta el build: qué APIs ves. `targetSdk` afecta la ejecución: qué comportamientos nuevos del sistema aceptás.

**Cuándo no.** Los flags que nunca se borran se vuelven deuda: código muerto y combinaciones imposibles de probar. Cada flag necesita una fecha para limpiarlo.

---

## Sr4. Kotlin Multiplatform: cuándo sí y cuándo no · Senior · 5 min

**Concepto.** **Kotlin Multiplatform (KMP)** permite compartir código entre Android, iOS y otras plataformas. Lo típico es compartir la lógica de negocio, los modelos, la red (con Ktor) y la persistencia, y dejar la interfaz nativa en cada plataforma. Con `expect` y `actual` se declara algo en común y se implementa por plataforma. **Compose Multiplatform** permite compartir también la interfaz.

**Ejemplo.** Las reglas de validación de tareas y el cliente de la API viven en un módulo compartido. Android usa Compose e iOS usa SwiftUI, y las dos llaman al mismo código Kotlin.

### Práctica

1. ¿Qué se comparte primero en un proyecto KMP? **Respuesta.** La lógica de negocio, los modelos y la capa de datos: es lo que más se duplica y lo que menos depende de la plataforma.
2. ¿Para qué sirven `expect` y `actual`? **Respuesta.** Para declarar una API en común e implementarla distinto en cada plataforma.
3. ¿Qué hace falta del equipo de iOS para que KMP funcione? **Respuesta.** Que acepte consumir y mantener código Kotlin. Sin ese acuerdo, el código compartido termina abandonado.

### Tarea para tu máquina

Creá un proyecto de ejemplo con el asistente de Kotlin Multiplatform y mové una función de validación al módulo compartido. Llamala desde Android.

**Resultado esperado.** La app Android usa la función del módulo compartido, y el mismo módulo compila también para el target de iOS (o el de JVM).

### Resumen

- Kotlin Multiplatform permite compartir código entre Android, iOS y otras plataformas.
- Lo típico es compartir la lógica, los modelos y los datos, y dejar la interfaz nativa.
- Con expect y actual se declara algo en común y se implementa en cada plataforma.
- Funciona si los dos equipos aceptan mantener el código compartido.

### Entrevista

**En 30 segundos.** "Usaría KMP para compartir la lógica de negocio y la capa de datos entre Android e iOS, empezando por un módulo chico y de bajo riesgo. Lo decido con el equipo de iOS, porque el costo real está en el tooling, el build y quién mantiene el código compartido."

**Trampa.** ¿KMP es lo mismo que Flutter o React Native? **Respuesta.** No. KMP comparte lógica escrita en Kotlin y permite mantener la interfaz nativa. Flutter y React Native comparten la interfaz con su propio motor de render o puente.

**Cuándo no.** Si solo hay app Android, o si el equipo de iOS no se suma, compartir código suma complejidad sin beneficio.

---

## Sr5. Liderazgo técnico: code review, decisiones y deuda · Senior · 6 min

**Concepto.** En Senior se evalúa cómo hacés crecer al equipo y al código, no solo lo que programás:

- **Code review:** revisar diseño, legibilidad, errores y tests, con un tono que enseña. Los PRs tienen que ser chicos.
- **Decisiones técnicas:** registrarlas, por ejemplo en ADRs (*Architecture Decision Records*), con el contexto, las opciones y los trade-offs.
- **Deuda técnica:** hacerla visible y negociarla con producto en términos de impacto.
- **Mentoría:** acompañar a otras personas del equipo.

En entrevistas de comportamiento se responde con el formato **STAR**: Situación, Tarea, Acción y Resultado.

**Ejemplo.** "Situación: el build tardaba 12 minutos. Tarea: bajarlo sin frenar las entregas. Acción: medí con Build Analyzer, separé dos módulos y propuse un ADR para pasar de `api` a `implementation`. Resultado: el build bajó a 5 minutos y el equipo adoptó el ADR como estándar."

### Práctica

1. ¿Qué mirás primero en un code review? **Respuesta.** Que el cambio resuelva el problema correcto y que el diseño sea razonable. Los detalles de estilo los resuelve el lint.
2. ¿Cómo negociás tiempo para la deuda técnica con producto? **Respuesta.** Con impacto concreto: bugs, tiempo de entrega o riesgo. Y proponiendo pagarla de a poco, junto al trabajo de producto.
3. ¿Qué tiene un ADR? **Respuesta.** El contexto, la decisión, las alternativas consideradas y sus consecuencias.

### Tarea para tu máquina

Escribí un ADR de una página sobre una decisión de Rollito, por ejemplo "prerender estático en vez de SPA", con contexto, opciones, decisión y consecuencias. Prepará también una historia STAR de un problema técnico que hayas resuelto.

**Resultado esperado.** Un documento que alguien nuevo en el equipo pueda leer para entender por qué se tomó la decisión, y una historia que puedas contar en dos minutos.

### Resumen

- En senior se evalúa cómo hacés crecer al equipo y al código, no solo lo que programás.
- Un buen code review mira primero si el diseño resuelve el problema correcto, y enseña con el tono.
- Las decisiones técnicas se registran con su contexto, sus opciones y sus consecuencias.
- En las preguntas de comportamiento se responde con situación, tarea, acción y resultado.

### Entrevista

**En 30 segundos.** "Mi rol es que el equipo entregue bien sostenidamente: reviso PRs enfocándome en el diseño, documento las decisiones importantes con su contexto, hago visible la deuda técnica con impacto concreto y acompaño a quienes recién empiezan."

**Trampa.** "Contame de un desacuerdo técnico con alguien del equipo." **Respuesta.** Elegí un caso real y mostrá cómo lo resolvieron con datos o con una prueba acotada, no por jerarquía. Contá qué aprendiste, aunque no se haya hecho lo que vos proponías.

**Cuándo no.** Un ADR para cada decisión menor es burocracia. Se registran las decisiones difíciles de revertir o que afectan a varios equipos.

---

# Parte 2 · Simulacros: 9 preguntas más por nivel

Se suman a las 3 de cada nivel que ya están en `src/content/android/interview-practice.ts`.

## Junior

1. **¿Qué diferencia hay entre `val` y `var`?** `val` no se puede reasignar y `var` sí. Uso `val` por defecto.
2. **¿`lateinit` o `lazy`?** `lateinit var` para algo que se inicializa desde afuera más tarde, como un binding. `val ... by lazy` para algo que se calcula la primera vez que se usa.
3. **¿Qué es una data class y qué genera?** Una clase pensada para guardar datos: genera `equals`, `hashCode`, `toString`, `copy` y las funciones `componentN` a partir de las propiedades del constructor.
4. **¿Cuáles son los callbacks del ciclo de vida de una Activity?** `onCreate`, `onStart`, `onResume`, `onPause`, `onStop` y `onDestroy` (y `onRestart` al volver). Al rotar, la Activity se destruye y se recrea.
5. **¿Qué diferencia hay entre un Intent explícito y uno implícito?** El explícito nombra la clase de destino. El implícito describe una acción y el sistema elige la app.
6. **¿Por qué no se hacen llamadas de red en el hilo principal?** Porque bloquearían la interfaz. Android lo impide con `NetworkOnMainThreadException`, y si la app no responde aparece un ANR.
7. **¿Qué es un ViewModel?** Un objeto que guarda el estado de la pantalla y sobrevive a los cambios de configuración. Se destruye cuando la pantalla se cierra de verdad.
8. **¿Qué diferencia hay entre `minSdk` y `targetSdk`?** `minSdk` es la versión más vieja donde se puede instalar la app. `targetSdk` es con qué comportamiento del sistema declarás que corre.
9. **¿Para qué sirve la `key` en una `LazyColumn`?** Para que Compose identifique cada elemento aunque cambie de posición, y conserve su estado al reordenar o borrar.

## Semi Senior

1. **¿Qué diferencia hay entre `StateFlow` y `SharedFlow`?** `StateFlow` siempre tiene un valor actual y lo entrega al suscribirse. `SharedFlow` emite eventos y se puede configurar cuántos repite.
2. **¿Qué hace `flatMapLatest` y cuándo lo usás?** Cancela el flujo anterior cuando llega un valor nuevo. Es ideal para una búsqueda mientras la persona tipea.
3. **¿Qué pasa cuando una corrutina hija falla?** En un scope común cancela a su padre y a sus hermanas. Con `supervisorScope`, no afecta a las demás.
4. **¿Por qué `collectAsStateWithLifecycle` y no `collectAsState`?** Porque deja de recolectar cuando la app está en segundo plano y no gasta recursos en una pantalla que no se ve.
5. **¿Qué es la muerte del proceso y cómo la manejás?** El sistema mata la app en segundo plano para liberar memoria. El ViewModel se pierde, así que lo necesario se guarda en `SavedStateHandle` o en persistencia.
6. **¿`@Binds` o `@Provides`?** `@Binds` para atar una interfaz a una implementación que ya se puede inyectar. `@Provides` para construir objetos de terceros.
7. **¿Cómo testeás un ViewModel que usa `viewModelScope`?** Con `runTest`, reemplazando `Dispatchers.Main` con `Dispatchers.setMain` y usando un fake del repositorio.
8. **¿WorkManager o foreground service?** WorkManager para trabajo que se puede postergar pero tiene que terminarse. Foreground service para trabajo que la persona está viendo en el momento.
9. **¿Cómo manejás un 401 en la capa de red?** Con un `Authenticator` de OkHttp que renueva el token y reintenta una vez. Si la renovación falla, se cierra la sesión.

## Senior

1. **¿Cómo diseñarías una app de tareas que funcione sin conexión?** Con la base local como fuente de verdad, una cola de cambios pendientes, sincronización con WorkManager, una estrategia de conflictos y estados de sincronización visibles.
2. **¿Cómo modularizarías una app grande?** Por funcionalidad y por capa (`feature`, `core` y `data`), con dependencias en una sola dirección, `implementation` por defecto y convention plugins para el build.
3. **¿Cómo encontrarías una fuga de memoria reportada en producción?** La reproduciría en debug con LeakCanary, confirmaría con un heap dump del profiler y buscaría la cadena de referencias hasta el objeto de larga vida que la retiene.
4. **¿Qué medís para saber si el arranque es lento?** El tiempo hasta el primer frame y hasta que la pantalla es usable, en dispositivos de gama baja, con Macrobenchmark. Lo mejoro con Baseline Profiles.
5. **¿Qué hace R8 y qué puede romper?** Elimina código sin usar, ofusca y optimiza. Puede romper lo que se usa por reflexión si no tiene reglas keep.
6. **Una versión nueva duplicó los crashes. ¿Qué hacés?** Freno la entrega gradual, apago la función con un feature flag si es posible, analizo el crash en Crashlytics con el mapping y publico un arreglo.
7. **¿Cuándo propondrías Kotlin Multiplatform?** Cuando hay lógica de negocio duplicada entre Android e iOS y el equipo de iOS se suma. Empezaría por un módulo chico.
8. **¿Cómo decidís entre dos arquitecturas propuestas por el equipo?** Con criterios explícitos: complejidad, testeabilidad y costo de cambio. Hago una prueba acotada si hace falta, y dejo la decisión registrada en un ADR.
9. **Contame de un desacuerdo técnico.** Respondé con STAR: la situación, qué estaba en juego, cómo lo resolvieron con datos y qué aprendiste.

---

# Parte 3 · Práctica de código en vivo

Ejercicios de Kotlin como los que se piden en entrevistas. Cada uno tiene enunciado, ejemplo, pista y solución. En la app, la solución quedaría oculta hasta que la quieras ver. El código está en `android-samples/kotlin/katas/`, compila y las salidas son las reales.

Consejo para todas: antes de escribir, contá en voz alta cómo lo pensás y qué casos borde ves (lista vacía, texto vacío, repetidos). En una entrevista, explicar cómo lo pensás pesa tanto como el resultado.

## Junior

### 1. Contar palabras

**Enunciado.** Dado un texto, devolvé cuántas veces aparece cada palabra, sin distinguir mayúsculas e ignorando la puntuación.

**Ejemplo.** `contarPalabras("Mate, mate y más mate.")` → `{mate=3, y=1, más=1}`

**Pista.** `split` con una expresión regular, y después `groupingBy { it }.eachCount()`.

```kotlin
package katas.contarpalabras

fun contarPalabras(texto: String): Map<String, Int> =
    texto.lowercase()
        .split(Regex("[^\\p{L}\\p{N}]+"))
        .filter { it.isNotEmpty() }
        .groupingBy { it }
        .eachCount()
```

### 2. Palíndromo

**Enunciado.** Decidí si un texto se lee igual al derecho y al revés, ignorando espacios, signos y mayúsculas.

**Ejemplo.** `"Anita lava la tina"` → `true`. `"Rollito"` → `false`.

**Pista.** Limpiá el texto con `filter { it.isLetterOrDigit() }` y compará con `reversed()`.

```kotlin
package katas.palindromo

fun esPalindromo(texto: String): Boolean {
    val limpio = texto.lowercase().filter { it.isLetterOrDigit() }
    return limpio == limpio.reversed()
}
```

### 3. Primer carácter no repetido

**Enunciado.** Devolvé el primer carácter que aparece una sola vez, o `null` si no hay ninguno.

**Ejemplo.** `"android"` → `a`. `"aabb"` → `null`.

**Pista.** Contá primero y recorré después: dos pasadas, O(n).

```kotlin
package katas.primernorepetido

fun primerNoRepetido(texto: String): Char? {
    val cantidades = texto.groupingBy { it }.eachCount()
    return texto.firstOrNull { cantidades[it] == 1 }
}
```

### 4. Resumen de tareas

**Enunciado.** Dada una lista de tareas, devolvé cuántas están hechas, cuántas pendientes y los títulos de las pendientes urgentes (vencen en un día o menos), de la más urgente a la menos urgente.

**Ejemplo.** Con cuatro tareas de ejemplo → `Hechas: 1, pendientes: 3, urgentes: [Llamar al médico, Pagar la luz]`

**Pista.** `partition`, `filter`, `sortedBy` y `map`.

```kotlin
package katas.tareasporestado

data class Tarea(val titulo: String, val completada: Boolean, val venceEnDias: Int)

fun resumen(tareas: List<Tarea>): String {
    val (hechas, pendientes) = tareas.partition { it.completada }
    val urgentes = pendientes.filter { it.venceEnDias <= 1 }.sortedBy { it.venceEnDias }.map { it.titulo }
    return "Hechas: ${hechas.size}, pendientes: ${pendientes.size}, urgentes: $urgentes"
}
```

## Semi Senior

### 5. Dos números que suman un objetivo

**Enunciado.** Dada una lista y un número objetivo, devolvé los índices de dos elementos que sumen el objetivo, o `null`.

**Ejemplo.** `[2, 7, 11, 15]` con objetivo `9` → `(0, 1)`. `[1, 2, 3]` con objetivo `7` → `null`.

**Pista.** Con dos bucles es O(n²). Con un mapa de "valor visto → índice" es O(n).

```kotlin
package katas.dosquesuman

fun dosQueSuman(numeros: List<Int>, objetivo: Int): Pair<Int, Int>? {
    val vistos = mutableMapOf<Int, Int>() // valor -> índice
    numeros.forEachIndexed { indice, numero ->
        vistos[objetivo - numero]?.let { return it to indice }
        vistos[numero] = indice
    }
    return null
}
```

### 6. Paréntesis balanceados

**Enunciado.** Decidí si los paréntesis, corchetes y llaves de un texto están bien balanceados.

**Ejemplo.** `"{[()()]}"` → `true`. `"([)]"` → `false`. `"(("` → `false`.

**Pista.** Una pila: apilás al abrir y, al cerrar, el tope tiene que ser la apertura correspondiente.

```kotlin
package katas.parentesis

fun estaBalanceado(texto: String): Boolean {
    val pares = mapOf(')' to '(', ']' to '[', '}' to '{')
    val pila = ArrayDeque<Char>()
    for (c in texto) {
        when (c) {
            '(', '[', '{' -> pila.addLast(c)
            ')', ']', '}' -> if (pila.removeLastOrNull() != pares[c]) return false
        }
    }
    return pila.isEmpty()
}
```

### 7. Debounce de un buscador

**Enunciado.** Dada una lista de eventos de tipeo (milisegundo y texto), devolvé qué búsquedas se harían si cada una espera `espera` ms sin teclas nuevas. Es la lógica del operador `debounce` de Flow, sin corrutinas.

**Ejemplo.** "y" (0), "ye" (100), "yer" (200), "yerb" (700) y "yerba" (750) con espera de 300 → `[yer, yerba]`

**Pista.** Un evento se emite si el siguiente llega después de la espera, o si no hay siguiente.

```kotlin
package katas.debounce

data class Evento(val milisegundo: Long, val texto: String)

fun debounce(eventos: List<Evento>, espera: Long): List<String> =
    eventos.filterIndexed { i, evento ->
        val siguiente = eventos.getOrNull(i + 1)
        siguiente == null || siguiente.milisegundo - evento.milisegundo >= espera
    }.map { it.texto }
```

## Senior

En Senior el código en vivo suele combinarse con preguntas de diseño: la Parte 2 y la lección integradora 43 cubren esa parte.

### 8. Caché LRU

**Enunciado.** Implementá una caché de capacidad fija que, al llenarse, descarte el elemento usado hace más tiempo (*least recently used*). Leer un elemento cuenta como uso.

**Ejemplo.** Con capacidad 2: guardás `a` y `b`, leés `a` y guardás `c` → quedan `[a, c]` (se descartó `b`).

**Pista.** `LinkedHashMap` con `accessOrder = true` mantiene el orden de uso. `removeEldestEntry` decide cuándo descartar. Si te piden hacerlo sin `LinkedHashMap`: un mapa más una lista doblemente enlazada, todo en O(1).

```kotlin
package katas.cachelru

class CacheLru<K, V>(private val capacidad: Int) {
    // accessOrder = true: cada lectura mueve la entrada al final (la más reciente).
    private val mapa = object : LinkedHashMap<K, V>(capacidad, 0.75f, true) {
        override fun removeEldestEntry(eldest: MutableMap.MutableEntry<K, V>?) = size > capacidad
    }

    fun get(clave: K): V? = mapa[clave]

    fun put(clave: K, valor: V) {
        mapa[clave] = valor
    }

    override fun toString() = mapa.keys.toString()
}
```

---

## Para revisar

- [ ] ¿Te sirve la ubicación por nivel? Por ejemplo, J4 (corrutinas básicas) queda en Junior, y S4 (LiveData vs. StateFlow) en Semi Senior.
- [ ] ¿Querés más ejercicios de código, o más de algún tipo en particular (strings, listas, mapas)?
- [ ] Para la práctica de código propongo una página por nivel ("Práctica de código") con enunciado, ejemplo, pista y la solución oculta hasta que la quieras ver. ¿Te va así?
