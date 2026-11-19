import { ErrorDeCodigo, transpilar } from './transpilar'

// Simulador de un Arduino Uno: pines 0 a 13 y A0 a A5, PWM en 3, 5, 6, 9, 10 y 11.
export const PINES_PWM = [3, 5, 6, 9, 10, 11]
export const HIGH = 1
export const LOW = 0
const A = { A0: 14, A1: 15, A2: 16, A3: 17, A4: 18, A5: 19 }

export type Evento =
  | { t: number; tipo: 'digital'; pin: number; valor: 0 | 1 }
  | { t: number; tipo: 'pwm'; pin: number; valor: number }
  | { t: number; tipo: 'tono'; pin: number; frecuencia: number }
  | { t: number; tipo: 'servo'; pin: number; angulo: number }

export interface Entradas {
  /** Estado eléctrico de un pin de entrada en el instante t (HIGH o LOW). */
  digital?: (pin: number, t: number) => 0 | 1
  /** Lectura analógica (0 a 1023) de A0..A5 en el instante t. */
  analogica?: (pin: number, t: number) => number
}

export interface Resultado {
  eventos: Evento[]
  serie: string
  advertencias: string[]
  error?: string
  tiempoFinal: number
}

type Modo = 'INPUT' | 'OUTPUT' | 'INPUT_PULLUP'

class Detenido extends Error {}

export interface OpcionesEjecucion {
  entradas?: Entradas
  /** Hasta qué tiempo simulado correr (ms). */
  duracionMs: number
  /** Si es 'real', delay() espera de verdad (para ver las luces); si es 'virtual', el tiempo avanza al instante. */
  reloj?: 'virtual' | 'real'
  señal?: AbortSignal
  alCambiar?: (evento: Evento) => void
  alEscribirSerie?: (texto: string) => void
}

export async function ejecutar(codigo: string, opciones: OpcionesEjecucion): Promise<Resultado> {
  const { entradas = {}, duracionMs, reloj = 'virtual', señal, alCambiar, alEscribirSerie } = opciones
  const eventos: Evento[] = []
  const advertencias = new Set<string>()
  const modos = new Map<number, Modo>()
  const salidas = new Map<number, number>()
  let serie = ''
  let serieIniciada = false
  let t = 0
  const inicioReal = Date.now()

  const ahora = () => (reloj === 'real' ? Date.now() - inicioReal : t)
  const avisar = (texto: string) => advertencias.add(texto)
  const registrar = (evento: Evento) => { eventos.push(evento); alCambiar?.(evento) }
  const revisarPin = (pin: number) => {
    if (!Number.isInteger(pin) || pin < 0 || pin > 19) throw new ErrorDeCodigo(`El pin ${pin} no existe en el Arduino Uno (0 a 13 y A0 a A5).`)
    if ((pin === 0 || pin === 1) && serieIniciada) avisar(`Los pines 0 y 1 los usa el puerto serie: si usás Serial, no conectes nada ahí.`)
  }
  const detenerSiCorresponde = () => {
    if (señal?.aborted) throw new Detenido()
    if (ahora() >= duracionMs) throw new Detenido()
  }

  const api = {
    HIGH, LOW, INPUT: 'INPUT', OUTPUT: 'OUTPUT', INPUT_PULLUP: 'INPUT_PULLUP', LED_BUILTIN: 13, ...A, true: true, false: false,
    pinMode(pin: number, modo: Modo) { revisarPin(pin); modos.set(pin, modo) },
    digitalWrite(pin: number, valor: number) {
      revisarPin(pin)
      if (modos.get(pin) !== 'OUTPUT') avisar(`Escribiste en el pin ${pin} sin configurarlo con pinMode(${pin}, OUTPUT). En la placa real el LED se vería muy tenue o no prendería.`)
      const v = valor ? 1 : 0
      // Los pines arrancan en LOW: escribir LOW al principio no es un cambio.
      if ((salidas.get(pin) ?? 0) !== v) { salidas.set(pin, v); registrar({ t: ahora(), tipo: 'digital', pin, valor: v }) }
    },
    digitalRead(pin: number): 0 | 1 {
      revisarPin(pin)
      const modo = modos.get(pin)
      if (modo === 'OUTPUT') avisar(`Leíste el pin ${pin}, que está configurado como OUTPUT.`)
      if (modo === undefined) avisar(`Leíste el pin ${pin} sin configurarlo con pinMode. Sin pull-up, un pin al aire da lecturas al azar.`)
      return entradas.digital ? entradas.digital(pin, ahora()) : (modo === 'INPUT_PULLUP' ? 1 : 0)
    },
    analogWrite(pin: number, valor: number) {
      revisarPin(pin)
      if (!PINES_PWM.includes(pin)) avisar(`El pin ${pin} no tiene PWM: en el Uno, solo 3, 5, 6, 9, 10 y 11 (los marcados con ~).`)
      const v = Math.max(0, Math.min(255, Math.trunc(valor)))
      if (salidas.get(pin) !== v + 1000) { salidas.set(pin, v + 1000); registrar({ t: ahora(), tipo: 'pwm', pin, valor: v }) }
    },
    analogRead(pin: number) {
      if (pin < 14 || pin > 19) avisar(`analogRead(${pin}): las entradas analógicas son A0 a A5.`)
      return Math.max(0, Math.min(1023, Math.round(entradas.analogica ? entradas.analogica(pin, ahora()) : 0)))
    },
    tone(pin: number, frecuencia: number) { revisarPin(pin); registrar({ t: ahora(), tipo: 'tono', pin, frecuencia }) },
    noTone(pin: number) { revisarPin(pin); registrar({ t: ahora(), tipo: 'tono', pin, frecuencia: 0 }) },
    async delay(ms: number) {
      detenerSiCorresponde()
      if (reloj === 'real') await new Promise(resolve => setTimeout(resolve, ms))
      else t += ms
      detenerSiCorresponde()
    },
    millis: () => Math.floor(ahora()),
    map: (x: number, inMin: number, inMax: number, outMin: number, outMax: number) => Math.trunc(((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin),
    constrain: (x: number, min: number, max: number) => Math.max(min, Math.min(max, x)),
    random: (a: number, b?: number) => (b === undefined ? Math.floor(Math.random() * a) : a + Math.floor(Math.random() * (b - a))),
    abs: Math.abs, min: Math.min, max: Math.max,
    Serial: {
      begin() { serieIniciada = true },
      print(valor: unknown) { if (!serieIniciada) avisar('Usaste Serial sin Serial.begin(9600) en setup().'); serie += String(valor); alEscribirSerie?.(String(valor)) },
      println(valor: unknown = '') { api.Serial.print(`${String(valor)}\n`) },
    },
    Servo: class {
      pin = -1
      attach(pin: number) { revisarPin(pin); this.pin = pin; if (!PINES_PWM.includes(pin) && pin !== 9) avisar(`El servo funciona en cualquier pin digital, pero conviene usar uno con ~.`) }
      write(angulo: number) { registrar({ t: ahora(), tipo: 'servo', pin: this.pin, angulo: Math.max(0, Math.min(180, angulo)) }) }
    },
  }

  try {
    const { js } = transpilar(codigo)
    const nombres = Object.keys(api).filter(n => n !== 'true' && n !== 'false')
    const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
    const programa = new AsyncFunction(...nombres, js)
    const { setup, loop } = await programa(...nombres.map(n => (api as Record<string, unknown>)[n]))
    await setup()
    let vueltas = 0
    for (;;) {
      detenerSiCorresponde()
      const antes = ahora()
      await loop()
      vueltas++
      // Un loop sin delay no avanza el reloj virtual: se le cuenta 1 ms por vuelta para que la simulación termine.
      if (reloj === 'virtual' && ahora() === antes) t += 1
      if (reloj === 'real' && vueltas % 200 === 0) await new Promise(resolve => setTimeout(resolve, 0))
    }
  } catch (error) {
    if (!(error instanceof Detenido)) {
      return { eventos, serie, advertencias: [...advertencias], error: traducirError(error), tiempoFinal: ahora() }
    }
  }
  return { eventos, serie, advertencias: [...advertencias], tiempoFinal: ahora() }
}

function traducirError(error: unknown): string {
  if (error instanceof ErrorDeCodigo) return error.message
  if (error instanceof SyntaxError) return `Hay un error de sintaxis: revisá llaves, paréntesis y punto y coma. (${error.message})`
  if (error instanceof ReferenceError) {
    const nombre = /(\w+) is not defined/.exec(error.message)?.[1]
    return nombre ? `No existe "${nombre}": revisá que esté declarado y bien escrito (mayúsculas incluidas).` : error.message
  }
  return error instanceof Error ? error.message : String(error)
}

// ---- Ayudas para verificar desafíos ----

/** Los cambios de un pin digital, en orden: [{ t, valor }]. */
export function cambios(resultado: Resultado, pin: number) {
  return resultado.eventos.filter((e): e is Extract<Evento, { tipo: 'digital' }> => e.tipo === 'digital' && e.pin === pin).map(e => ({ t: e.t, valor: e.valor }))
}

/** Estado de un pin digital en el instante t (según los eventos registrados). */
export function estadoEn(resultado: Resultado, pin: number, t: number): 0 | 1 {
  let valor: 0 | 1 = 0
  for (const e of cambios(resultado, pin)) if (e.t <= t) valor = e.valor
  return valor
}
