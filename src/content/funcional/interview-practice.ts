// Simulacro de entrevista para Analista Funcional Trainee. Sale de las lecciones F1 a F11.
export const functionalInterview = [
  {
    topic: 'El rol',
    prompt: '¿Qué hace un analista funcional y con quién trabaja?',
    answer: 'Es el puente entre lo que el negocio necesita y lo que el equipo construye. Releva con el cliente, traduce la necesidad en historias, reglas y criterios de aceptación, acompaña a devs, QA y diseño durante el desarrollo y valida que lo construido resuelva el problema real. Define el qué y el porqué, no cómo se programa.',
  },
  {
    topic: 'Funcionales y no funcionales',
    prompt: '¿Qué diferencia hay entre un requerimiento funcional y uno no funcional? Dame un ejemplo de cada uno.',
    answer: 'El funcional describe algo que el sistema hace: «el sistema permite reasignar una tarea». El no funcional describe cómo lo hace o qué cualidad cumple, y tiene que ser medible: «la lista de tareas carga en menos de 2 segundos con 500 tareas».',
  },
  {
    topic: 'Preparar un relevamiento',
    prompt: 'Mañana tenés la primera entrevista con un cliente nuevo. ¿Cómo la preparás y cómo la llevás?',
    answer: 'Reviso lo que ya exista (planillas, formularios, mails) y armo una guía con preguntas abiertas: cómo trabajan hoy, qué problemas tienen, pidiendo casos concretos («contame la última vez que…»). En la entrevista no propongo soluciones, pregunto el porqué hasta llegar a la causa y cierro resumiendo lo que entendí para que me corrijan. Después planifico hablar con otros roles.',
  },
  {
    topic: 'Un pedido con solución incluida',
    prompt: 'El cliente te pide «un botón para exportar a Excel». ¿Qué hacés?',
    answer: 'Antes de anotarlo, pregunto para qué lo necesita: qué hace después con ese Excel, quién lo usa y cada cuánto. Muchas veces la necesidad real es un reporte o un filtro que se puede resolver mejor dentro del sistema. Si después de entenderlo el Excel sigue siendo lo mejor, lo escribo como historia con su beneficio.',
  },
  {
    topic: 'Historias e INVEST',
    prompt: '¿Qué es una historia de usuario y cómo sabés si está bien escrita?',
    answer: 'Describe una funcionalidad desde el punto de vista de quien la usa: «Como rol, quiero acción, para beneficio». La reviso con INVEST: independiente, negociable, valiosa, estimable, pequeña y testeable. Si es demasiado grande, es una épica y la parto. Se completa con criterios de aceptación.',
  },
  {
    topic: 'Gherkin',
    prompt: 'Escribí en voz alta un criterio de aceptación para un inicio de sesión con contraseña incorrecta.',
    answer: 'Escenario: contraseña incorrecta. Dado que tengo una cuenta con el mail ana@example.com, cuando ingreso ese mail con una contraseña incorrecta, entonces veo el mensaje «El mail o la contraseña no son correctos» y sigo sin sesión iniciada. Un comportamiento por escenario, y sin detalles de pantalla como colores o botones.',
  },
  {
    topic: 'Casos de uso o historias',
    prompt: '¿Cuándo escribirías un caso de uso en vez de solo una historia de usuario?',
    answer: 'Cuando el flujo tiene muchos pasos, varias variantes o involucra a otros sistemas, y la historia con sus criterios no alcanza para que se entienda. El caso de uso detalla actor, precondiciones, flujo principal, alternativos y postcondiciones. No compiten: la historia queda en el backlog y el caso de uso la acompaña.',
  },
  {
    topic: 'BPMN',
    prompt: '¿Qué es BPMN y qué elementos básicos usarías para modelar un proceso?',
    answer: 'Es una notación para modelar procesos de negocio. Con cuatro elementos se cubre la mayoría: eventos de inicio y fin (círculos), actividades (rectángulos redondeados), compuertas para decisiones (rombos) y carriles para mostrar qué rol hace cada cosa. Primero dibujo el proceso actual con el cliente, así los problemas aparecen antes de diseñar el futuro.',
  },
  {
    topic: 'Priorizar cuando todo es urgente',
    prompt: 'El cliente dice que todo es prioritario. ¿Cómo avanzás?',
    answer: 'Propongo clasificar con MoSCoW: imprescindible, importante, deseable y lo que no entra ahora. Si todo queda como imprescindible, pregunto qué entregaríamos si solo pudiéramos hacer una cosa, y aporto información de valor, dependencias y esfuerzo. La decisión final es del negocio, no mía.',
  },
  {
    topic: 'Versiones contradictorias',
    prompt: 'Dos áreas del cliente te describen el mismo proceso de forma distinta. ¿Qué hacés?',
    answer: 'Documento las dos versiones, idealmente con un diagrama, y las junto en una misma reunión para que vean las diferencias. Si sigue el desacuerdo, lo llevo a quien es dueño del proceso para que decida. No elijo yo una versión en silencio, porque la diferencia suele esconder una regla de negocio importante.',
  },
  {
    topic: 'Validar lo que entendiste',
    prompt: '¿Cómo te asegurás de haber entendido bien un requerimiento antes de que se programe?',
    answer: 'Lo resumo con mis palabras y le pido al cliente que me corrija, uso ejemplos concretos y criterios de aceptación, y si hay pantallas, un prototipo de baja fidelidad que la persona recorra pensando en voz alta. También lo reviso con devs y QA, que suelen detectar huecos.',
  },
  {
    topic: 'Una historia que no se puede estimar',
    prompt: 'Un dev te dice que una historia «no se puede estimar». ¿Qué hacés?',
    answer: 'Averiguo por qué: puede faltar información (aclaro dudas con el cliente y completo criterios), ser demasiado grande (la parto en historias más chicas) o tener una incertidumbre técnica (el equipo puede hacer una investigación acotada antes de estimar). En todos los casos, la historia no está lista para construir todavía.',
  },
] as const
