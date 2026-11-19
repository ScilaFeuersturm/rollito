# Análisis funcional · Trainee

**Estado:** borradores de las lecciones 1 a 11 para revisar. Todavía no están maquetados. La lección 12 (integradora con Taller Fichín) se escribe cuando esté el contexto del proyecto.

Track pensado para alguien que se suma como analista funcional sin experiencia previa (primer uso real: una persona que se suma a Taller Fichín). Cada lección sigue el formato habitual: concepto con analogía, ejemplo, ejercicios de autoevaluación, tarea práctica, resumen y "cómo contarlo en una entrevista".

**Ejemplo común.** Un estudio contable chico, con seis personas, quiere una app para asignar y seguir las tareas del equipo: vencimientos de impuestos, pedidos de clientes y trámites. Hoy lo manejan con una planilla compartida y mensajes de WhatsApp.

| # | Lección | Min |
| --- | --- | --- |
| F1 | Qué hace un analista funcional | 5 |
| F2 | Relevamiento: entrevistas y preguntas útiles | 6 |
| F3 | Lo que el cliente no dice | 5 |
| F4 | Requerimientos funcionales y no funcionales | 5 |
| F5 | Historias de usuario e INVEST | 6 |
| F6 | Criterios de aceptación con Gherkin | 6 |
| F7 | Casos de uso | 6 |
| F8 | Diagramas: flujo, actividad y BPMN simple | 6 |
| F9 | Prototipos de baja fidelidad | 5 |
| F10 | Priorización con MoSCoW y backlog | 5 |
| F11 | Documentación funcional: qué, para quién y cuánto | 5 |
| F12 | Integrador: publicar un juego nuevo en Taller Fichín | (pendiente) |

---

## F1. Qué hace un analista funcional · Trainee · 5 min

**Concepto.** El analista funcional es el puente entre **lo que el negocio necesita** y **lo que el equipo construye**. Entiende el problema, lo traduce en requerimientos claros y se asegura de que lo construido resuelva lo que hacía falta. No decide cómo se programa: decide, con el cliente, **qué** tiene que hacer el sistema y **por qué**.

Trabaja con todo el equipo:

- **Cliente y usuarios:** releva qué necesitan y valida que lo entendió bien.
- **Devs:** les explica el qué y el porqué, y responde dudas mientras construyen.
- **QA:** acuerda los criterios de aceptación con los que se va a probar.
- **Diseño:** comparte los flujos y las reglas para que la interfaz los refleje.

Pensalo como un traductor en una reunión entre dos países: no habla por ninguno, pero sin él cada uno entiende lo que quiere.

**Ejemplo.** La socia del estudio contable dice: "Queremos una app para que no se nos pasen los vencimientos". El analista no anota "app de vencimientos" y listo. Pregunta quién carga las tareas, quién las hace, qué pasa hoy cuando se pasa un vencimiento, y cómo sabrían que la app funcionó. Con eso escribe historias y criterios que el equipo puede construir y probar.

### Práctica

1. ¿El analista funcional decide qué base de datos usar? **Respuesta.** No. Eso es una decisión técnica del equipo de desarrollo. El analista define qué tiene que hacer el sistema y qué reglas cumplir.
2. ¿Por qué el analista habla con QA antes de que se programe? **Respuesta.** Para acordar desde el principio cómo se va a verificar cada funcionalidad: los criterios de aceptación sirven a la vez para construir y para probar.
3. El cliente pide "un botón para exportar a Excel". ¿Qué pregunta haría primero el analista? **Respuesta.** Para qué lo necesita: qué hace después con ese Excel. A veces la necesidad real es otra, como un reporte que ya podría estar en la app.

### Tarea para tu máquina

Pensá en una app que uses todos los días. Escribí en un documento tres cosas: qué problema le resuelve a quien la usa, quiénes son sus distintos tipos de usuarios y una regla de negocio que se note al usarla (por ejemplo, "no se puede transferir más que el saldo").

**Resultado esperado.** Un documento de media página donde el problema está escrito en términos del usuario, no de la tecnología.

### Resumen

- El analista funcional es el puente entre lo que el negocio necesita y lo que el equipo construye.
- Define qué tiene que hacer el sistema y por qué, no cómo se programa.
- Trabaja con el cliente, los devs, QA y diseño durante todo el proyecto.
- Antes de anotar un pedido, entiende para qué lo necesitan.

### Entrevista

**En 30 segundos.** "El analista funcional entiende el problema del negocio y lo traduce en requerimientos claros para el equipo. Releva con el cliente, escribe historias y criterios de aceptación, acompaña a devs y QA durante el desarrollo y valida que lo construido resuelva la necesidad real."

**Trampa.** ¿El analista tiene que anotar exactamente lo que pide el cliente? **Respuesta.** No: tiene que entender la necesidad detrás del pedido. Muchas veces el cliente propone una solución ("un botón", "un Excel") y el analista descubre el problema real, que puede resolverse mejor.

**Cuándo no.** En un equipo muy chico, el rol puede repartirse entre producto y desarrollo. Lo importante es que alguien haga el trabajo de entender y documentar, aunque no tenga ese título.

---

## F2. Relevamiento: entrevistas y preguntas útiles · Trainee · 6 min

**Concepto.** Relevar es **descubrir cómo funciona hoy el negocio y qué necesita**. La herramienta principal es la entrevista, pero también sirve observar a la gente trabajando y revisar documentos existentes (planillas, formularios, mails).

Buenas prácticas para entrevistar:

- **Preguntas abiertas** ("¿Cómo hacen hoy para…?") en vez de cerradas ("¿Necesitan alertas?").
- **Pedir casos concretos:** "Contame la última vez que se pasó un vencimiento" da más información que "¿Qué problemas tienen?".
- **Preguntar el porqué** varias veces, hasta llegar a la causa (la técnica de los "5 porqués").
- **No proponer soluciones** mientras todavía estás entendiendo el problema.
- **Hablar con distintos roles:** la socia, quien carga las tareas y quien las hace ven problemas distintos.
- **Resumir al final** lo que entendiste, para que te corrijan.

Pensalo como una médica en la consulta: primero pregunta qué te pasa, desde cuándo y qué lo empeora, y recién después receta.

**Ejemplo.** En vez de preguntar "¿Quieren notificaciones?", el analista pregunta "¿Cómo se enteran hoy de que una tarea vence esta semana?". La respuesta ("Mirta revisa la planilla los lunes y avisa por WhatsApp; si Mirta falta, nadie avisa") revela el problema real: el aviso depende de una sola persona.

### Práctica

1. ¿Por qué "¿Necesitan alertas?" es una mala pregunta de relevamiento? **Respuesta.** Es cerrada e induce la respuesta: casi todos dicen que sí. No revela cómo trabajan hoy ni cuál es el problema real.
2. ¿Para qué sirve pedir "la última vez que pasó"? **Respuesta.** Un caso concreto trae detalles reales (quién, cuándo, qué falló) que en una respuesta general se pierden.
3. ¿Por qué entrevistar también a quien hace las tareas, y no solo a la socia? **Respuesta.** Cada rol ve partes distintas del proceso. La socia ve el resultado; quien hace las tareas conoce los pasos, las excepciones y los atajos.

### Tarea para tu máquina

Prepará una guía de entrevista de 8 preguntas para relevar cómo el estudio contable maneja hoy sus tareas. Al menos la mitad tienen que ser abiertas, y una tiene que pedir un caso concreto. Si podés, probala con alguien que maneje tareas en su trabajo.

**Resultado esperado.** Una guía que empieza por el contexto (cómo trabajan hoy), sigue por los problemas con casos concretos y termina con una pregunta de cierre del tipo "¿Qué tendría que pasar para que digan que esto funcionó?".

### Resumen

- Relevar es descubrir cómo funciona hoy el negocio y qué necesita.
- Las preguntas abiertas y los casos concretos revelan más que las preguntas cerradas.
- Preguntar el porqué varias veces lleva a la causa real del problema.
- Mientras estás entendiendo el problema, no propongas soluciones.

### Entrevista

**En 30 segundos.** "Relevo con entrevistas a distintos roles, observación y revisión de documentos. Uso preguntas abiertas, pido casos concretos, pregunto el porqué hasta llegar a la causa y cierro resumiendo lo que entendí para que me corrijan."

**Trampa.** "El cliente ya sabe lo que quiere, ¿para qué relevar tanto?" **Respuesta.** El cliente sabe qué le duele, pero no siempre qué lo resuelve. Además, distintas personas del negocio suelen tener versiones distintas del mismo proceso, y eso solo aparece relevando.

**Cuándo no.** Para un cambio chico y bien entendido, como cambiar un texto o agregar un campo, una conversación corta alcanza. El relevamiento profundo se justifica cuando el proceso es nuevo, complejo o crítico.

---

## F3. Lo que el cliente no dice · Trainee · 5 min

**Concepto.** Lo más peligroso de un relevamiento es lo que **nadie menciona**, porque para el cliente es obvio:

- **Supuestos:** "Obvio que cada uno ve solo sus tareas."
- **Excepciones:** qué pasa si alguien se va de vacaciones, si un cliente cancela o si se carga algo mal.
- **Reglas de negocio implícitas:** "Los vencimientos de AFIP no se pueden reasignar el mismo día."
- **Volúmenes y tiempos:** cuántas tareas por mes, cuándo hay picos.
- **Personas que no estaban en la reunión:** quién más usa o se ve afectado por el sistema.

Las preguntas que más destapan son "¿Y si…?", "¿Siempre es así?", "¿Quién más…?" y "¿Qué pasa cuando sale mal?".

Pensalo como pedirle a alguien que te explique cómo llegar a su casa: te dice las calles, pero se olvida de que el portón está cerrado después de las 20 porque para él es obvio.

**Ejemplo.** El estudio dice "cada tarea tiene un responsable". El analista pregunta "¿Y si el responsable se enferma el día del vencimiento?". Respuesta: "Ah, la toma Mirta, pero solo si es de AFIP; las otras esperan". Apareció una regla de reasignación que nadie había mencionado.

### Práctica

1. ¿Por qué el cliente no menciona sus supuestos? **Respuesta.** Porque para él son tan obvios que no los registra como información. Por eso hay que preguntar activamente por ellos.
2. Dame una pregunta "¿Y si…?" para el flujo "asignar una tarea". **Respuesta.** Por ejemplo: "¿Y si la persona asignada ya tiene diez tareas para ese día?" o "¿Y si se asigna por error a la persona equivocada?".
3. ¿Por qué importa conocer los picos de volumen? **Respuesta.** Porque cambian los requerimientos: en época de vencimientos el sistema y el equipo tienen otra carga, y puede hacer falta priorizar, filtrar o avisar distinto.

### Tarea para tu máquina

Tomá este requerimiento del estudio: "Cuando una tarea vence, el sistema avisa al responsable". Escribí al menos seis preguntas "¿Y si…?" o "¿Siempre…?" que destapen supuestos y excepciones.

**Resultado esperado.** Preguntas que cubren al menos: quién más tiene que enterarse, con cuánta anticipación, qué pasa con tareas ya hechas, ausencias del responsable, feriados y fines de semana, y qué pasa si nadie hace nada después del aviso.

### Resumen

- Lo más peligroso de un relevamiento es lo que nadie menciona porque parece obvio.
- Hay que buscar supuestos, excepciones, reglas implícitas, volúmenes y personas ausentes.
- Las preguntas y si, siempre es así y quién más destapan lo que no se dijo.
- Cada excepción descubierta temprano es un problema menos en producción.

### Entrevista

**En 30 segundos.** "Busco activamente lo que no se dice: supuestos, excepciones y reglas implícitas. Para cada flujo pregunto qué pasa cuando sale mal, si siempre es así y quién más está involucrado. Las excepciones descubiertas en el relevamiento son mucho más baratas que las descubiertas en producción."

**Trampa.** ¿Cómo sabés cuándo dejar de preguntar "¿Y si…?"? **Respuesta.** Cuando las respuestas dejan de cambiar el comportamiento del sistema, o cuando el caso es tan raro que conviene resolverlo a mano. Se prioriza por frecuencia e impacto: no todo caso borde merece funcionalidad.

**Cuándo no.** No hace falta resolver cada excepción en el sistema: a veces la mejor respuesta es "esto se maneja a mano" y dejarlo documentado.

---

## F4. Requerimientos funcionales y no funcionales · Trainee · 5 min

**Concepto.**

- **Requerimiento funcional:** algo que el sistema tiene que **hacer**. "El sistema permite asignar una tarea a un integrante del equipo."
- **Requerimiento no funcional:** **cómo** tiene que hacerlo, o qué cualidad tiene que cumplir: rendimiento, seguridad, usabilidad, disponibilidad, accesibilidad, compatibilidad.

Un requerimiento no funcional tiene que ser **medible**. "Tiene que ser rápido" no se puede verificar. "La lista de tareas carga en menos de 2 segundos con 500 tareas" sí.

Pensalo como pedir una casa: "tiene que tener tres dormitorios" es funcional; "tiene que soportar un terremoto de grado 6" es no funcional.

**Ejemplo.**

- Funcional: "Una tarea vencida aparece marcada en rojo en la lista del responsable."
- No funcional: "Cada persona del estudio solo ve los datos de los clientes que tiene asignados" (seguridad) y "La app se puede usar desde el celular" (compatibilidad).

### Práctica

1. "El sistema envía un mail cuando se asigna una tarea." ¿Funcional o no funcional? **Respuesta.** Funcional: describe algo que el sistema hace.
2. "La app tiene que ser fácil de usar." ¿Qué problema tiene? **Respuesta.** No es medible. Se puede reescribir como "una persona nueva puede asignar su primera tarea en menos de un minuto, sin capacitación".
3. ¿Por qué hay que relevar los no funcionales desde el principio? **Respuesta.** Porque pueden cambiar la arquitectura: no es lo mismo una app para 6 personas que para 600, o una que maneja datos sensibles de clientes.

### Tarea para tu máquina

Para la app del estudio, escribí cinco requerimientos funcionales y tres no funcionales. Cada no funcional tiene que incluir un número o una condición verificable.

**Resultado esperado.** Una lista donde cada no funcional se puede probar con un sí o un no (por ejemplo, "carga en menos de 2 segundos con 500 tareas").

### Resumen

- Un requerimiento funcional describe algo que el sistema tiene que hacer.
- Un requerimiento no funcional describe cómo lo hace o qué cualidad cumple, como rendimiento o seguridad.
- Los no funcionales tienen que ser medibles para poder verificarlos.
- Relevarlos desde el principio evita sorpresas que cambian la arquitectura.

### Entrevista

**En 30 segundos.** "Los funcionales describen qué hace el sistema; los no funcionales, cómo lo hace: rendimiento, seguridad, usabilidad, disponibilidad. Siempre escribo los no funcionales de forma medible, porque si no, no hay forma de saber si se cumplieron."

**Trampa.** ¿La seguridad es un requerimiento funcional o no funcional? **Respuesta.** Depende de cómo se exprese. "Cada persona solo ve los clientes asignados" es una cualidad del sistema (no funcional), pero "el sistema permite que una administradora asigne permisos" es una funcionalidad. Lo importante no es la etiqueta, sino que esté escrito y sea verificable.

**Cuándo no.** No hace falta una lista exhaustiva de no funcionales para un prototipo interno de una semana. Sí hace falta en cuanto hay datos reales, usuarios externos o volumen.

---

## F5. Historias de usuario e INVEST · Trainee · 6 min

**Concepto.** Una historia de usuario describe una funcionalidad **desde el punto de vista de quien la usa**, con este formato:

> Como **[rol]**, quiero **[acción]**, para **[beneficio]**.

El "para" es lo más importante: explica el valor y ayuda a decidir.

Una buena historia cumple **INVEST**:

- **I**ndependiente: se puede construir sin depender de otra.
- **N**egociable: es una conversación, no un contrato cerrado.
- **V**aliosa: aporta algo a alguien.
- **E**stimable: el equipo entiende lo suficiente para estimarla.
- **S**mall (pequeña): entra en una iteración.
- **T**esteable: se puede verificar si está hecha.

Pensalo como un pedido en un bar: "Como turista con frío, quiero algo caliente, para entrar en calor". El mozo puede ofrecerte un café, un té o una sopa: el "para" le deja elegir la mejor opción.

**Ejemplo.** "Como responsable de una tarea, quiero ver mis tareas ordenadas por vencimiento, para atender primero lo más urgente." En cambio, "Como usuario, quiero un sistema de tareas" es demasiado grande: hay que partirla (es una *épica*).

### Práctica

1. ¿Qué parte de la historia ayuda más a decidir cómo resolverla? **Respuesta.** El "para": explica el beneficio, y con eso el equipo puede proponer la mejor solución.
2. "Como usuario, quiero gestionar el estudio." ¿Qué letra de INVEST no cumple? **Respuesta.** Sobre todo la S (no es pequeña) y la E (no se puede estimar). Es una épica que hay que dividir.
3. ¿Por qué "Como desarrollador, quiero migrar la base de datos" no es una buena historia de usuario? **Respuesta.** No describe valor para un usuario del sistema. Es una tarea técnica; si importa, se explica por el beneficio que habilita.

### Tarea para tu máquina

Escribí cinco historias de usuario para la app del estudio, con al menos tres roles distintos (por ejemplo, socia, responsable y administrativa). Revisá cada una contra INVEST y partí las que sean demasiado grandes.

**Resultado esperado.** Cinco historias con rol, acción y beneficio, y al lado de cada una una nota de qué letra de INVEST tuviste que mejorar, si alguna.

### Resumen

- Una historia de usuario describe una funcionalidad desde el punto de vista de quien la usa.
- El formato es como rol, quiero acción, para beneficio.
- El para es lo más importante, porque explica el valor.
- Una buena historia es independiente, negociable, valiosa, estimable, pequeña y testeable.

### Entrevista

**En 30 segundos.** "Escribo historias con rol, acción y beneficio, y las reviso con INVEST. Si una no entra en una iteración, la parto por flujo, por regla o por tipo de usuario. La historia es el disparador de una conversación con el equipo, y se completa con criterios de aceptación."

**Trampa.** ¿Una historia de usuario es la especificación completa? **Respuesta.** No. Es un recordatorio de una conversación. El detalle está en los criterios de aceptación, en los ejemplos y en lo que se habla con el equipo.

**Cuándo no.** Para reglas de negocio complejas o integraciones, una historia sola se queda corta: conviene acompañarla con un caso de uso, un diagrama o una tabla de reglas.

---

## F6. Criterios de aceptación con Gherkin · Trainee · 6 min

**Concepto.** Los **criterios de aceptación** definen cuándo una historia está terminada. Una forma muy usada de escribirlos es **Gherkin**, con escenarios en lenguaje natural:

- **Dado** un contexto inicial.
- **Cuando** ocurre una acción.
- **Entonces** se espera un resultado.
- **Y** / **Pero** para encadenar condiciones.

Cada escenario prueba **un solo comportamiento**, y se escriben también los casos de error, no solo el camino feliz. Como están en lenguaje natural, los entienden el cliente, los devs y QA, y algunas herramientas permiten automatizarlos como tests.

Pensalo como las reglas de un juego de mesa: "Dado que tenés tres cartas iguales, cuando las bajás, entonces sumás diez puntos". No hay discusión posible sobre quién ganó.

**Ejemplo.** Para la historia "ver mis tareas ordenadas por vencimiento":

```gherkin
Escenario: Las tareas vencidas aparecen primero
  Dado que tengo una tarea que venció ayer
  Y una tarea que vence mañana
  Cuando abro mi lista de tareas
  Entonces veo primero la tarea vencida
  Y la tarea vencida aparece marcada como vencida

Escenario: No tengo tareas asignadas
  Dado que no tengo tareas asignadas
  Cuando abro mi lista de tareas
  Entonces veo el mensaje "No tenés tareas pendientes"
```

### Práctica

1. ¿Qué va en el **Dado**? **Respuesta.** El contexto o estado inicial antes de la acción: qué datos existen, quién está usando el sistema.
2. ¿Por qué cada escenario debería probar un solo comportamiento? **Respuesta.** Para que, si falla, se sepa exactamente qué no funciona, y para que se lea fácil.
3. ¿Alcanza con escribir el camino feliz? **Respuesta.** No. Los errores y casos borde (lista vacía, datos inválidos, sin permisos) son donde más bugs aparecen.

### Tarea para tu máquina

Para la historia "Como socia, quiero reasignar una tarea, para cubrir a alguien ausente", escribí tres escenarios en Gherkin: el camino feliz, la reasignación a alguien que no pertenece al estudio, y la reasignación de una tarea ya completada.

**Resultado esperado.** Tres escenarios con Dado, Cuando y Entonces, cada uno con un resultado verificable (por ejemplo, un mensaje concreto o un estado visible).

### Resumen

- Los criterios de aceptación definen cuándo una historia está terminada.
- En Gherkin se escriben con dado un contexto, cuando una acción, entonces un resultado.
- Cada escenario prueba un solo comportamiento.
- Hay que escribir también los casos de error, no solo el camino feliz.

### Entrevista

**En 30 segundos.** "Acompaño cada historia con criterios de aceptación en Gherkin: Dado, Cuando, Entonces, un comportamiento por escenario, incluyendo errores y casos borde. Los acuerdo con QA y devs antes de construir, así todos tienen la misma definición de terminado."

**Trampa.** ¿Gherkin describe la interfaz, como "hago clic en el botón azul"? **Respuesta.** Conviene que no. Los escenarios describen comportamiento ("cuando reasigno la tarea"), no detalles de pantalla, así no se rompen cada vez que cambia el diseño.

**Cuándo no.** Para reglas con muchas combinaciones (por ejemplo, impuestos según tipo de cliente y monto), una tabla de decisión se lee mejor que veinte escenarios casi iguales.

---

## F7. Casos de uso · Trainee · 6 min

**Concepto.** Un caso de uso describe **la interacción entre un actor y el sistema para lograr un objetivo**, paso a paso. Tiene:

- **Actor:** quién inicia la interacción (una persona u otro sistema).
- **Precondiciones:** qué tiene que ser cierto antes de empezar.
- **Flujo principal:** los pasos del camino feliz.
- **Flujos alternativos y de excepción:** qué pasa cuando algo se desvía o falla.
- **Postcondiciones:** cómo queda el sistema al terminar.

Frente a una historia de usuario, un caso de uso es más detallado: sirve cuando el flujo tiene muchos pasos o muchas variantes.

Pensalo como la receta completa de una torta: además de los pasos, dice qué hacer si no levanta o si te falta un ingrediente.

**Ejemplo.** *Caso de uso: Reasignar tarea.*

- **Actor:** Socia.
- **Precondición:** la tarea existe y no está completada.
- **Flujo principal:** 1. La socia abre la tarea. 2. Elige "Reasignar". 3. El sistema muestra el equipo disponible. 4. La socia elige a una persona. 5. El sistema reasigna la tarea y avisa a las dos personas.
- **Alternativo 4a:** la persona elegida está de licencia → el sistema lo advierte y pide confirmar.
- **Postcondición:** la tarea tiene un nuevo responsable y queda registrado el cambio.

### Práctica

1. ¿Qué diferencia hay entre una precondición y el primer paso del flujo? **Respuesta.** La precondición es lo que ya tiene que ser cierto antes de empezar; el primer paso es la primera acción del actor.
2. ¿Para qué sirven los flujos alternativos? **Respuesta.** Para documentar qué pasa cuando algo se desvía del camino feliz, que es donde aparecen las reglas de negocio y los bugs.
3. ¿Cuándo usarías un caso de uso en vez de solo una historia? **Respuesta.** Cuando el flujo tiene muchos pasos, varias variantes o involucra a otros sistemas, y una historia con sus criterios no alcanza para que se entienda.

### Tarea para tu máquina

Escribí el caso de uso "Cargar una tarea nueva" para la app del estudio, con actor, precondiciones, flujo principal de al menos cinco pasos, dos flujos alternativos y postcondiciones.

**Resultado esperado.** Un caso de uso de una página que alguien del equipo podría leer sin preguntarte nada, con los alternativos numerados según el paso en que se desvían (por ejemplo, 3a).

### Resumen

- Un caso de uso describe paso a paso cómo un actor usa el sistema para lograr un objetivo.
- Tiene actor, precondiciones, flujo principal, flujos alternativos y postcondiciones.
- Los flujos alternativos documentan qué pasa cuando algo se desvía o falla.
- Conviene cuando el flujo es largo o tiene muchas variantes.

### Entrevista

**En 30 segundos.** "Un caso de uso describe la interacción entre un actor y el sistema para lograr un objetivo: precondiciones, flujo principal, alternativos y postcondiciones. Lo uso cuando el flujo es complejo y una historia con criterios no alcanza."

**Trampa.** ¿Casos de uso o historias de usuario? **Respuesta.** No compiten. La historia sirve para planificar y priorizar; el caso de uso, para detallar un flujo complejo. En muchos equipos conviven: la historia en el backlog y el caso de uso como anexo.

**Cuándo no.** Para una funcionalidad simple, como cambiar el nombre de una tarea, un caso de uso completo es burocracia: alcanza con la historia y sus criterios.

---

## F8. Diagramas: flujo, actividad y BPMN simple · Trainee · 6 min

**Concepto.** Un diagrama muestra de un vistazo lo que en texto lleva una página. Los más usados:

- **Diagrama de flujo:** pasos y decisiones de un proceso. Rectángulos para pasos, rombos para decisiones, flechas para el orden.
- **Diagrama de actividad (UML):** parecido, con inicio y fin marcados y actividades en paralelo.
- **BPMN simple:** para procesos de negocio con varios participantes. Los elementos básicos son **eventos** (círculos: inicio y fin), **actividades** (rectángulos redondeados), **compuertas** (rombos: decisiones) y **carriles** (una franja por rol, para ver quién hace cada cosa).

Sirven para relevar (se dibujan con el cliente) y para validar (el cliente ve enseguida si falta un paso).

Pensalo como el mapa del subte: no muestra cada calle, pero entendés en dos segundos cómo ir de una estación a otra y dónde combinar.

**Ejemplo.** Proceso actual del estudio en BPMN con tres carriles (Cliente, Administrativa y Contadora):

1. El cliente manda la documentación.
2. La administrativa carga la tarea en la planilla.
3. Compuerta: ¿la documentación está completa?
   - No: la administrativa la pide al cliente y se vuelve al paso 1.
   - Sí: la contadora prepara la presentación.
4. Evento de fin: presentación enviada.

Dibujarlo hace evidente un problema: si la documentación está incompleta, nadie registra cuándo se pidió.

### Práctica

1. ¿Qué elemento de BPMN usás para una decisión? **Respuesta.** Una compuerta, que se dibuja como un rombo.
2. ¿Para qué sirven los carriles? **Respuesta.** Para mostrar qué rol hace cada actividad, y ver los pases de una persona a otra, donde suelen aparecer demoras.
3. ¿Por qué conviene dibujar el proceso actual y no solo el futuro? **Respuesta.** Porque así el cliente valida que entendiste cómo trabaja hoy, y los problemas del proceso se ven antes de diseñar la solución.

### Tarea para tu máquina

Dibujá en papel o con una herramienta gratuita (por ejemplo draw.io o Excalidraw) el proceso actual de "un cliente pide un trámite" en el estudio, con al menos dos carriles, una compuerta y eventos de inicio y fin.

**Resultado esperado.** Un diagrama que alguien que no estuvo en el relevamiento puede seguir de principio a fin, y en el que se nota al menos un punto de demora o de riesgo.

### Resumen

- Un diagrama muestra de un vistazo lo que en texto lleva una página.
- El diagrama de flujo muestra pasos y decisiones, y el de actividad agrega inicio, fin y tareas en paralelo.
- BPMN usa eventos, actividades, compuertas y carriles para procesos con varios participantes.
- Dibujar el proceso actual ayuda a validar lo relevado y a ver los problemas.

### Entrevista

**En 30 segundos.** "Uso diagramas para relevar y validar: flujo o actividad para un proceso simple, y BPMN con carriles cuando participan varios roles. Primero dibujo el proceso actual con el cliente, así los problemas aparecen antes de diseñar el futuro."

**Trampa.** ¿Tenés que saber toda la notación BPMN? **Respuesta.** No para empezar. Con eventos, actividades, compuertas y carriles se modela la mayoría de los procesos de negocio. Lo importante es que el diagrama se entienda, no que use todos los símbolos.

**Cuándo no.** Un diagrama enorme, con cincuenta cajas, no lo lee nadie. Si crece demasiado, conviene partirlo en subprocesos o volver al texto.

---

## F9. Prototipos de baja fidelidad · Trainee · 5 min

**Concepto.** Un prototipo de baja fidelidad es un **boceto simple de las pantallas**: en papel, en una pizarra o con herramientas de wireframes. No tiene colores ni diseño final; muestra **qué información hay en cada pantalla y cómo se pasa de una a otra**.

Sirve para validar el flujo con el cliente **antes** de diseñar y programar, cuando cambiar algo cuesta minutos. Como se ve "sin terminar", la gente se anima a criticarlo, que es justo lo que querés.

Pensalo como la maqueta de cartón que hace un arquitecto: nadie va a vivir ahí, pero sirve para darse cuenta de que la cocina quedó lejos del comedor.

**Ejemplo.** El analista dibuja tres pantallas en papel: la lista de tareas, el detalle y la reasignación. Se las muestra a la contadora y le pide que "use" la app tocando el papel. Al llegar al detalle, ella pregunta: "¿Y dónde veo qué documentación falta?". Ese dato no estaba en ningún requerimiento.

### Práctica

1. ¿Por qué el prototipo no tiene colores ni diseño final? **Respuesta.** Para que la conversación se centre en la información y el flujo, no en la estética, y para que cambiarlo sea barato.
2. ¿Qué validás con un prototipo de baja fidelidad? **Respuesta.** Que el flujo tiene sentido, que la información necesaria está en cada pantalla y que no falta ningún paso.
3. ¿Qué conviene hacer mientras alguien prueba el prototipo? **Respuesta.** Pedirle que piense en voz alta y no explicarle cómo se usa: las dudas que tenga son los problemas del diseño.

### Tarea para tu máquina

Dibujá en papel las pantallas de "cargar una tarea nueva" para la app del estudio, con todos los datos que releves (título, cliente, responsable, vencimiento y lo que haga falta). Mostráselo a alguien y pedile que lo recorra pensando en voz alta.

**Resultado esperado.** Dos o tres pantallas en papel y una lista de las dudas o cambios que surgieron al probarlo.

### Resumen

- Un prototipo de baja fidelidad es un boceto simple de las pantallas, sin diseño final.
- Muestra qué información hay en cada pantalla y cómo se pasa de una a otra.
- Sirve para validar el flujo antes de diseñar y programar, cuando cambiar es barato.
- Al probarlo, pedile a la persona que piense en voz alta y no le expliques cómo se usa.

### Entrevista

**En 30 segundos.** "Uso prototipos de baja fidelidad para validar el flujo y la información antes de diseñar y programar. Los pruebo con usuarios reales pidiéndoles que piensen en voz alta, y lo que descubro se vuelve requerimiento o criterio de aceptación."

**Trampa.** ¿El analista funcional diseña las pantallas? **Respuesta.** No el diseño visual: eso es de diseño UX/UI. El analista puede bocetar el flujo y la información para validar requerimientos, y después trabaja con diseño para que la interfaz final los refleje.

**Cuándo no.** Si el cambio es sobre una pantalla que ya existe y el flujo no cambia, alcanza con describirlo o con una captura anotada.

---

## F10. Priorización con MoSCoW y backlog · Trainee · 5 min

**Concepto.** Nunca hay tiempo para todo, así que hay que **priorizar**. **MoSCoW** clasifica cada requerimiento en:

- **Must have:** imprescindible. Sin esto, la entrega no sirve.
- **Should have:** importante, pero hay forma de arreglarse un tiempo sin esto.
- **Could have:** deseable, si sobra tiempo.
- **Won't have (this time):** acordado que no entra **ahora**.

El **backlog** es la lista ordenada de todo lo pendiente, con lo más valioso arriba. Lo de arriba está detallado y listo para construir; lo de abajo puede ser solo una idea.

Pensalo como armar la valija para un viaje corto: el documento es *must*, el abrigo es *should*, el tercer par de zapatillas es *could*, y la plancha es *won't*.

**Ejemplo.** Para la primera versión de la app del estudio:

- **Must:** cargar tareas, asignarlas y ver la lista ordenada por vencimiento.
- **Should:** aviso por mail dos días antes del vencimiento.
- **Could:** adjuntar archivos a la tarea.
- **Won't:** integración con el sistema de AFIP (queda para una próxima etapa).

### Práctica

1. ¿Qué significa la W de MoSCoW? **Respuesta.** *Won't have this time*: algo que se acordó explícitamente que no entra en esta entrega, aunque quizás entre después.
2. Si todo está marcado como *must*, ¿qué pasa? **Respuesta.** No hay priorización real. Hay que volver a preguntar "si solo pudiéramos entregar una cosa, ¿cuál sería?".
3. ¿Por qué lo de abajo del backlog no necesita estar detallado? **Respuesta.** Porque puede cambiar o descartarse. Se detalla a medida que sube y se acerca el momento de construirlo.

### Tarea para tu máquina

Tomá las cinco historias que escribiste en F5, sumá tres más y clasificalas con MoSCoW. Ordenalas como un backlog y justificá en una línea cada *must*.

**Resultado esperado.** Un backlog de ocho historias ordenadas, con no más de la mitad marcadas como *must*, y al menos una como *won't*.

### Resumen

- Nunca hay tiempo para todo, así que hay que priorizar.
- MoSCoW clasifica en imprescindible, importante, deseable y lo que no entra ahora.
- El backlog es la lista ordenada de todo lo pendiente, con lo más valioso arriba.
- Lo de arriba se detalla, y lo de abajo puede seguir siendo solo una idea.

### Entrevista

**En 30 segundos.** "Priorizo con el cliente usando MoSCoW y mantengo un backlog ordenado por valor. Si todo es *must*, pregunto qué entregaríamos si solo pudiéramos hacer una cosa. Detallo lo que está arriba y dejo lo de abajo liviano, porque puede cambiar."

**Trampa.** ¿Quién decide las prioridades, el analista? **Respuesta.** Las decide el negocio, normalmente el Product Owner o el cliente. El analista aporta información: valor, dependencias, riesgos y lo que el equipo estima, para que la decisión sea informada.

**Cuándo no.** Con dos o tres ítems obvios, clasificarlos con MoSCoW es ceremonia: alcanza con ordenarlos.

---

## F11. Documentación funcional: qué, para quién y cuánto · Trainee · 5 min

**Concepto.** La documentación funcional sirve para que **todos entiendan lo mismo** y para que el conocimiento no dependa de una persona. La pregunta clave antes de escribir es **¿para quién es?**:

- **Cliente:** qué se va a construir y qué no, en su lenguaje.
- **Devs:** reglas de negocio, flujos, casos borde y criterios de aceptación.
- **QA:** criterios y escenarios para probar.
- **Quien se sume al equipo:** el panorama general y un glosario.

Buenas prácticas: escribir **lo justo** (ni un documento de cien páginas que nadie lee, ni nada), mantener **una sola fuente de verdad**, tener un **glosario** con los términos del negocio y **actualizar** cuando algo cambia.

Pensalo como el manual de un electrodoméstico: hay una guía rápida para usarlo, y un manual técnico para el service. Mezclarlos no le sirve a nadie.

**Ejemplo.** Para la app del estudio, el analista mantiene en un solo lugar compartido:

- Un resumen de una página del alcance: qué incluye la primera versión y qué no.
- Un glosario ("vencimiento", "responsable", "reasignación", "documentación pendiente").
- Las historias con sus criterios en el backlog.
- Un diagrama del proceso.
- Una tabla con las reglas de reasignación.

### Práctica

1. ¿Qué pregunta te hacés antes de escribir un documento? **Respuesta.** Para quién es y qué necesita saber esa persona. Eso define el nivel de detalle y el lenguaje.
2. ¿Para qué sirve un glosario? **Respuesta.** Para que todos usen las mismas palabras con el mismo significado. Muchas confusiones vienen de que "cliente" o "vencimiento" significan cosas distintas para cada uno.
3. ¿Qué problema tiene tener la misma regla escrita en tres documentos? **Respuesta.** Cuando la regla cambia, se actualiza en uno y los otros quedan desactualizados: ya no se sabe cuál es la verdad.

### Tarea para tu máquina

Armá un glosario de al menos ocho términos del negocio del estudio contable, con una definición de una línea cada uno, y un resumen de alcance de media página para la socia, sin términos técnicos.

**Resultado esperado.** Un glosario que alguien nuevo puede leer en dos minutos, y un resumen de alcance que la socia entendería sin preguntarte nada.

### Resumen

- La documentación funcional sirve para que todos entiendan lo mismo.
- Antes de escribir, preguntate para quién es y qué necesita saber.
- Hay que escribir lo justo, en una sola fuente de verdad, y actualizarla cuando algo cambia.
- Un glosario evita que la misma palabra signifique cosas distintas para cada persona.

### Entrevista

**En 30 segundos.** "Documento pensando en quién lo va a leer: el cliente, los devs, QA o alguien nuevo. Escribo lo justo, mantengo una sola fuente de verdad con glosario, alcance, historias con criterios y diagramas, y la actualizo cuando algo cambia."

**Trampa.** "En ágil no se documenta, ¿no?" **Respuesta.** El manifiesto ágil valora más el software que funciona que la documentación exhaustiva, pero no dice que no se documente. Se documenta lo que aporta valor, de forma liviana y actualizada.

**Cuándo no.** No documentes lo que el código o la herramienta ya muestran solos y nadie va a consultar: documentación que no se lee se desactualiza y termina confundiendo.

---

## Para revisar

- [ ] ¿El ejemplo del estudio contable te sirve como hilo conductor, o preferís otro negocio?
- [ ] ¿Querés el repaso en audio también en este track (lee solo el resumen, como en Arquitectura)?
- [ ] ¿Sumamos un simulacro de entrevista para analista funcional trainee, como los de Android?
- [ ] Para la lección 12 sigue pendiente el contexto de Taller Fichín: qué es, quién publica un juego y si hay aprobación antes de que aparezca en el sitio.
