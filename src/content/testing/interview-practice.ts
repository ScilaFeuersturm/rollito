// Simulacros de entrevista de Testing por nivel (12 preguntas cada uno).

type Question = { topic: string; prompt: string; answer: string }
export type TestingLevel = 'junior' | 'semi-senior' | 'senior'

const preguntas = (lista: [string, string][]): Question[] =>
  lista.map(([prompt, answer], i) => ({ topic: `Pregunta ${i + 1}`, prompt, answer }))

export const testingInterview: Record<TestingLevel, readonly Question[]> = {
  junior: preguntas([
    ['¿Qué diferencia hay entre un error, un defecto y una falla?', 'El error lo comete una persona; el defecto es lo que queda en el código; la falla es lo que se ve cuando ese defecto se ejecuta.'],
    ['¿Qué diferencia hay entre verificar y validar?', 'Verificar es comprobar que se construyó bien (según la especificación); validar, que se construyó lo correcto (que resuelve la necesidad).'],
    ['¿Se puede probar todo? ¿Cómo elegís qué probar?', 'No: las combinaciones son prácticamente infinitas. Elijo casos con técnicas (particiones, límites, tablas de decisión) y priorizo por riesgo.'],
    ['Un campo acepta de 1 a 100. ¿Qué valores probás?', 'Particiones: menor a 1, de 1 a 100, mayor a 100, vacío y no numérico. Límites: 0, 1, 100 y 101.'],
    ['¿Para qué sirve una tabla de decisión?', 'Para listar todas las combinaciones de condiciones con su resultado esperado, así no se escapa ninguna y se preguntan las que nadie definió.'],
    ['¿Qué partes tiene un caso de prueba?', 'ID y título, precondiciones, datos, pasos y un resultado esperado observable.'],
    ['¿Qué es el testing exploratorio?', 'Aprender, diseñar y ejecutar pruebas al mismo tiempo, con un charter, un tiempo acotado y notas de lo probado y lo encontrado.'],
    ['¿Qué tiene un buen reporte de bug?', 'Un título que dice dónde, qué y cuándo; pasos para reproducirlo; esperado contra obtenido; evidencia; entorno; severidad y prioridad.'],
    ['¿Qué diferencia hay entre severidad y prioridad?', 'La severidad es el impacto técnico; la prioridad, la urgencia para el negocio. Un error de ortografía en la portada puede tener severidad baja y prioridad alta.'],
    ['¿Qué diferencia hay entre smoke, sanity y regresión?', 'Smoke: pocas pruebas del camino principal para ver si la versión está viva. Sanity: enfocado en la zona de un cambio. Regresión: que lo que andaba siga andando.'],
    ['¿Qué probás de distinto en una app móvil?', 'Rotación, segundo plano y muerte del proceso, interrupciones, red que se corta o es lenta, permisos negados, distintos dispositivos, fuente grande y lectores de pantalla.'],
    ['¿Cuándo se deja de probar?', 'Cuando se cumplen los criterios de salida acordados en el plan: los casos críticos pasan, no hay bugs graves abiertos y el riesgo restante está aceptado.'],
  ]),
  'semi-senior': preguntas([
    ['¿Qué es la pirámide de testing?', 'Muchos tests unitarios rápidos, menos de integración y pocos E2E para los caminos críticos. Evita una CI lenta y frágil.'],
    ['¿Qué conviene automatizar primero?', 'Lo que se repite y tiene riesgo: la regresión del camino principal y la lógica crítica. No lo que cambia todos los días.'],
    ['¿Qué verificás en un test de API?', 'Códigos de estado, forma de la respuesta, tiempos y sobre todo casos negativos: sin autenticación, sin permisos, datos inválidos, recursos inexistentes.'],
    ['¿Qué localizadores preferís en Playwright y por qué?', 'getByRole con el nombre accesible, después getByLabel y getByText; test ids como último recurso. No dependen del CSS y siguen a la accesibilidad.'],
    ['¿Qué es el modo estricto de Playwright?', 'Si un localizador encuentra varios elementos y le pedís una acción, falla en vez de elegir uno: obliga a localizar sin ambigüedad.'],
    ['¿Por qué no usar esperas fijas?', 'Porque son lentas cuando la app es rápida e insuficientes cuando es lenta. Se esperan condiciones, con aserciones web-first que reintentan.'],
    ['¿Qué es el Page Object Model?', 'Una clase por pantalla con los localizadores y acciones de negocio: los tests se leen como casos y un cambio de la pantalla se arregla en un solo lugar.'],
    ['¿Cómo manejás los datos de prueba?', 'Cada test prepara sus datos y no depende del orden, nada toca producción, y la red externa se simula o se usa un emulador.'],
    ['¿Qué es un test inestable y qué hacés con uno?', 'Uno que pasa o falla sin que cambie el código. Lo investigo con la traza, lo arreglo y, si no se puede enseguida, lo pongo en cuarentena con responsable.'],
    ['¿Espresso, Maestro o Appium?', 'Espresso y Compose Testing dentro de la app Android, rápidos; Maestro para flujos simples en YAML en Android e iOS; Appium desde afuera, más flexible y más lento.'],
    ['¿Qué corre la CI en cada PR?', 'De lo más rápido a lo más lento: lint y tipos, tests unitarios, build y E2E. Si algo falla, no se mergea, y se guardan el reporte y las trazas.'],
    ['¿Simular la red en los E2E no les quita valor?', 'Les quita la integración real: por eso se combinan pocos E2E contra un entorno de prueba real con muchos con red simulada para los estados difíciles.'],
  ]),
  senior: preguntas([
    ['¿Qué es shift-left?', 'Mover la calidad al principio: QA en el refinamiento, criterios de aceptación antes de programar y tests en cada PR. Un error temprano es mucho más barato.'],
    ['¿Cómo armás una estrategia de testing?', 'A partir de los riesgos del producto: para cada uno, qué niveles y tipos de prueba lo cubren, qué se automatiza, quién es responsable y cómo se decide liberar.'],
    ['¿Qué resuelve el contract testing?', 'Que un cambio en una API rompa a sus consumidores sin enterarse. Los consumidores registran qué necesitan y el proveedor lo verifica en su CI.'],
    ['¿Carga o estrés?', 'Carga: el uso esperado contra objetivos. Estrés: subir hasta romper para conocer el límite. Los objetivos se miden en percentiles, no en promedios.'],
    ['¿Por qué percentiles y no promedios?', 'Porque el promedio esconde a quienes la pasan mal: un p95 dice cuánto tarda el 5% más lento.'],
    ['¿Qué pruebas de seguridad hace todo QA?', 'Control de acceso (ids ajenos, sin sesión, sin permisos), entradas con HTML o scripts, mensajes de error que no revelen información y sesiones que se cierren.'],
    ['¿Cómo probás accesibilidad?', 'Axe en la CI para lo que se detecta con reglas, y a mano con teclado, lector de pantalla y zoom para lo demás, con WCAG AA como referencia.'],
    ['¿La cobertura mide la calidad de los tests?', 'No: mide qué se ejecutó. El mutation testing mide si los tests detectan cambios en el código; los valores límite matan muchos mutantes.'],
    ['¿Qué es testing en producción?', 'Reducir el riesgo de lo que se escapa: feature flags, liberación gradual, monitoreo, tests sintéticos y rollback rápido. Complementa, no reemplaza, al testing previo.'],
    ['¿Qué métricas de calidad usás?', 'Defectos que escapan a producción y su severidad, tiempo para detectarlos y arreglarlos, estabilidad de la CI. Evito métricas que se inflan, como bugs reportados.'],
    ['Quedan bugs abiertos el día de la entrega. ¿Quién decide?', 'El negocio, informado por QA sobre el riesgo, a quién afecta y cómo mitigarlo. QA asesora sobre el riesgo; no es el guardián que decide solo.'],
    ['¿Cómo hacés que la calidad sea de todo el equipo?', 'Criterios de aceptación escritos juntos, tests en cada PR con la CI bloqueando, y revisiones de incidentes sin culpables que mejoran el proceso.'],
  ]),
}
