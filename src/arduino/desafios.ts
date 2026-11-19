import { cambios, estadoEn, type Entradas, type Evento, type Resultado } from './simulador'

export type Componente =
  | { tipo: 'led'; pin: number; color: 'rojo' | 'amarillo' | 'verde' | 'azul'; nombre: string }
  | { tipo: 'boton'; pin: number; nombre: string }
  | { tipo: 'pote'; pin: number; nombre: string }
  | { tipo: 'buzzer'; pin: number; nombre: string }

export interface Desafio {
  id: string
  titulo: string
  enunciado: string
  /** Cómo se arma en la placa real, con los valores seguros. */
  circuito: string[]
  componentes: Componente[]
  codigoInicial: string
  solucion: string
  duracionMs: number
  /** Entradas automáticas para comprobar el desafío (botones presionados, potenciómetro). */
  entradas?: Entradas
  verificar: (r: Resultado) => string[] // lista de problemas; vacía si está bien
}

const PULLUP = 'Botón entre el pin y GND, con pinMode(…, INPUT_PULLUP): sin resistencia externa. Presionado se lee LOW.'
const LED_220 = (pin: number, color: string) => `LED ${color}: pata larga (ánodo) al pin ${pin} a través de una resistencia de 220 Ω; pata corta (cátodo) a GND.`

function muestrear(r: Resultado, pin: number, tiempos: number[], esperado: (t: number) => 0 | 1, nombre: string) {
  const fallas = tiempos.filter(t => estadoEn(r, pin, t) !== esperado(t))
  return fallas.length ? [`El ${nombre} no está como debería en t = ${fallas[0]} ms (debería estar ${esperado(fallas[0]) ? 'prendido' : 'apagado'}).`] : []
}

const pwm = (r: Resultado, pin: number) => r.eventos.filter((e): e is Extract<Evento, { tipo: 'pwm' }> => e.tipo === 'pwm' && e.pin === pin)
const pwmEn = (r: Resultado, pin: number, t: number) => { let v = 0; for (const e of pwm(r, pin)) if (e.t <= t) v = e.valor; return v }
const tonoEn = (r: Resultado, pin: number, t: number) => {
  let f = 0
  for (const e of r.eventos) if (e.tipo === 'tono' && e.pin === pin && e.t <= t) f = e.frecuencia
  return f
}

export const desafios: Record<string, Desafio> = {
  parpadeo: {
    id: 'parpadeo',
    titulo: 'Hacé titilar el LED',
    enunciado: 'Hacé que el LED del pin 13 se prenda medio segundo y se apague medio segundo, para siempre.',
    circuito: ['El Uno ya trae un LED conectado al pin 13 (marcado "L" en la placa): no hace falta conectar nada.', 'Si usás un LED externo: ' + LED_220(13, 'cualquiera')],
    componentes: [{ tipo: 'led', pin: 13, color: 'amarillo', nombre: 'LED del pin 13' }],
    codigoInicial: `void setup() {
  // Configurá el pin 13 como salida
}

void loop() {
  // Prendé, esperá, apagá, esperá
}`,
    solucion: `const int led = 13;

void setup() {
  pinMode(led, OUTPUT);
}

void loop() {
  digitalWrite(led, HIGH);
  delay(500);
  digitalWrite(led, LOW);
  delay(500);
}`,
    duracionMs: 3000,
    verificar: r => {
      const c = cambios(r, 13)
      if (c.length < 4) return ['El LED del pin 13 tiene que prenderse y apagarse varias veces: revisá pinMode, digitalWrite y delay.']
      return muestrear(r, 13, [250, 750, 1250, 1750, 2250, 2750], t => (Math.floor(t / 500) % 2 === 0 ? 1 : 0), 'LED')
    },
  },

  semaforo: {
    id: 'semaforo',
    titulo: 'Armá un semáforo',
    enunciado: 'Rojo 3 segundos, verde 3 segundos y amarillo 1 segundo, y vuelve a empezar. Nunca puede haber dos luces prendidas a la vez.',
    circuito: [LED_220(12, 'rojo'), LED_220(11, 'amarillo'), LED_220(10, 'verde'), 'Cada LED con su propia resistencia: no compartas una para los tres.'],
    componentes: [
      { tipo: 'led', pin: 12, color: 'rojo', nombre: 'Rojo (pin 12)' },
      { tipo: 'led', pin: 11, color: 'amarillo', nombre: 'Amarillo (pin 11)' },
      { tipo: 'led', pin: 10, color: 'verde', nombre: 'Verde (pin 10)' },
    ],
    codigoInicial: `const int rojo = 12;
const int amarillo = 11;
const int verde = 10;

void setup() {
  // Los tres pines como salida
}

void loop() {
  // Rojo 3 s, verde 3 s, amarillo 1 s
}`,
    solucion: `const int rojo = 12;
const int amarillo = 11;
const int verde = 10;

void encender(int pin, int ms) {
  digitalWrite(pin, HIGH);
  delay(ms);
  digitalWrite(pin, LOW);
}

void setup() {
  pinMode(rojo, OUTPUT);
  pinMode(amarillo, OUTPUT);
  pinMode(verde, OUTPUT);
}

void loop() {
  encender(rojo, 3000);
  encender(verde, 3000);
  encender(amarillo, 1000);
}`,
    duracionMs: 14500,
    verificar: r => {
      const tiempos = [500, 2500, 3500, 5500, 6500, 7500, 9500, 10500, 12500, 13500]
      const esperado = (t: number) => { const f = t % 7000; return f < 3000 ? 12 : f < 6000 ? 10 : 11 }
      for (const t of tiempos) {
        const prendidos = [12, 11, 10].filter(p => estadoEn(r, p, t))
        if (prendidos.length > 1) return [`En t = ${t} ms hay ${prendidos.length} luces prendidas a la vez.`]
        if (prendidos[0] !== esperado(t)) return [`En t = ${t} ms debería estar prendida la luz del pin ${esperado(t)}.`]
      }
      return []
    },
  },

  serie: {
    id: 'serie',
    titulo: 'Hablá por el monitor serie',
    enunciado: 'Mostrá en el monitor serie "Hola, Taller Fichín" una vez al empezar, y después un contador que suba de a uno cada segundo: 1, 2, 3…',
    circuito: ['No hace falta conectar nada: el monitor serie usa el mismo cable USB. Abrilo en el IDE con la velocidad en 9600.'],
    componentes: [],
    codigoInicial: `int contador = 0;

void setup() {
  // Iniciá el puerto serie y saludá
}

void loop() {
  // Sumá uno, mostralo y esperá un segundo
}`,
    solucion: `int contador = 0;

void setup() {
  Serial.begin(9600);
  Serial.println("Hola, Taller Fichín");
}

void loop() {
  contador++;
  Serial.println(contador);
  delay(1000);
}`,
    duracionMs: 3500,
    verificar: r => {
      const lineas = r.serie.split('\n').filter(Boolean)
      if (lineas[0] !== 'Hola, Taller Fichín') return ['La primera línea tiene que ser exactamente "Hola, Taller Fichín" (¿falta Serial.begin(9600)?).']
      if (lineas.slice(1, 4).join(',') !== '1,2,3') return [`Después del saludo tiene que venir 1, 2, 3… y llegó: ${lineas.slice(1, 4).join(', ') || 'nada'}.`]
      return []
    },
  },

  boton: {
    id: 'boton',
    titulo: 'Prendé el LED con un botón',
    enunciado: 'Mientras el botón del pin 2 esté presionado, el LED del pin 13 se prende; cuando lo soltás, se apaga. Usá INPUT_PULLUP.',
    circuito: [PULLUP, 'LED: el del pin 13 de la placa, o uno externo con su resistencia de 220 Ω.'],
    componentes: [{ tipo: 'boton', pin: 2, nombre: 'Botón (pin 2)' }, { tipo: 'led', pin: 13, color: 'rojo', nombre: 'LED del pin 13' }],
    codigoInicial: `const int boton = 2;
const int led = 13;

void setup() {
  // Botón con INPUT_PULLUP, LED como salida
}

void loop() {
  // Con INPUT_PULLUP, presionado se lee LOW
}`,
    solucion: `const int boton = 2;
const int led = 13;

void setup() {
  pinMode(boton, INPUT_PULLUP);
  pinMode(led, OUTPUT);
}

void loop() {
  if (digitalRead(boton) == LOW) {
    digitalWrite(led, HIGH);
  } else {
    digitalWrite(led, LOW);
  }
}`,
    duracionMs: 3000,
    entradas: { digital: (pin, t) => (pin === 2 && ((t >= 500 && t < 1500) || (t >= 2000 && t < 2500)) ? 0 : 1) },
    verificar: r => muestrear(r, 13, [200, 800, 1400, 1700, 2200, 2800], t => ((t >= 500 && t < 1500) || (t >= 2000 && t < 2500) ? 1 : 0), 'LED'),
  },

  potenciometro: {
    id: 'potenciometro',
    titulo: 'Regulá el brillo con un potenciómetro',
    enunciado: 'Leé el potenciómetro en A0 (0 a 1023) y usalo para regular el brillo del LED del pin 9 (0 a 255).',
    circuito: ['Potenciómetro: patas de los extremos a 5V y GND, pata del medio a A0.', LED_220(9, 'azul'), 'El pin 9 tiene ~: admite PWM.'],
    componentes: [{ tipo: 'pote', pin: 14, nombre: 'Potenciómetro (A0)' }, { tipo: 'led', pin: 9, color: 'azul', nombre: 'LED del pin 9' }],
    codigoInicial: `const int led = 9;

void setup() {
  pinMode(led, OUTPUT);
}

void loop() {
  // Leé A0, convertí 0..1023 a 0..255 con map() y escribilo con analogWrite
}`,
    solucion: `const int led = 9;

void setup() {
  pinMode(led, OUTPUT);
}

void loop() {
  int lectura = analogRead(A0);
  int brillo = map(lectura, 0, 1023, 0, 255);
  analogWrite(led, brillo);
  delay(20);
}`,
    duracionMs: 2000,
    entradas: { analogica: (pin, t) => (pin === 14 ? (t < 500 ? 0 : t < 1000 ? 512 : t < 1500 ? 1023 : 256) : 0) },
    verificar: r => {
      const esperado: [number, number][] = [[400, 0], [900, 127], [1400, 255], [1900, 63]]
      for (const [t, v] of esperado) {
        const real = pwmEn(r, 9, t)
        if (Math.abs(real - v) > 3) return [`Con el potenciómetro en ese punto, el brillo debería ser cerca de ${v} y es ${real} (t = ${t} ms).`]
      }
      return []
    },
  },

  fade: {
    id: 'fade',
    titulo: 'Hacé respirar al LED',
    enunciado: 'Hacé que el LED del pin 9 suba de apagado (0) a máximo brillo (255) y vuelva a bajar, una y otra vez, con analogWrite.',
    circuito: [LED_220(9, 'verde'), 'Solo los pines con ~ (3, 5, 6, 9, 10 y 11) regulan el brillo.'],
    componentes: [{ tipo: 'led', pin: 9, color: 'verde', nombre: 'LED del pin 9' }],
    codigoInicial: `const int led = 9;

void setup() {
  pinMode(led, OUTPUT);
}

void loop() {
  // Un for que sube de 0 a 255 y otro que baja
}`,
    solucion: `const int led = 9;

void setup() {
  pinMode(led, OUTPUT);
}

void loop() {
  for (int brillo = 0; brillo <= 255; brillo += 5) {
    analogWrite(led, brillo);
    delay(10);
  }
  for (int brillo = 255; brillo >= 0; brillo -= 5) {
    analogWrite(led, brillo);
    delay(10);
  }
}`,
    duracionMs: 2500,
    verificar: r => {
      const valores = pwm(r, 9).map(e => e.valor)
      if (valores.length < 20) return ['El brillo del pin 9 tiene que cambiar muchas veces: usá analogWrite dentro de un for.']
      if (Math.max(...valores) < 250 || Math.min(...valores) > 5) return ['El brillo tiene que llegar cerca de 255 y bajar cerca de 0.']
      const subidas = valores.slice(1).filter((v, i) => v > valores[i]).length
      const bajadas = valores.slice(1).filter((v, i) => v < valores[i]).length
      if (subidas < 10 || bajadas < 10) return ['El brillo tiene que subir y también bajar, de a poco.']
      if (r.advertencias.some(a => a.includes('no tiene PWM'))) return ['Usá un pin con PWM (~).']
      return []
    },
  },

  alarma: {
    id: 'alarma',
    titulo: 'Armá una alarma con el buzzer',
    enunciado: 'Mientras el botón del pin 2 esté presionado, el buzzer del pin 8 suena a 1000 Hz; al soltarlo, se calla.',
    circuito: [PULLUP, 'Buzzer pasivo: una pata al pin 8 y la otra a GND (si tiene marcado +, ese va al pin). Con un buzzer activo, digitalWrite alcanza, pero no se puede elegir la frecuencia.'],
    componentes: [{ tipo: 'boton', pin: 2, nombre: 'Botón (pin 2)' }, { tipo: 'buzzer', pin: 8, nombre: 'Buzzer (pin 8)' }],
    codigoInicial: `const int boton = 2;
const int buzzer = 8;

void setup() {
  pinMode(boton, INPUT_PULLUP);
}

void loop() {
  // tone(buzzer, 1000) mientras esté presionado; noTone(buzzer) si no
}`,
    solucion: `const int boton = 2;
const int buzzer = 8;

void setup() {
  pinMode(boton, INPUT_PULLUP);
}

void loop() {
  if (digitalRead(boton) == LOW) {
    tone(buzzer, 1000);
  } else {
    noTone(buzzer);
  }
  delay(10);
}`,
    duracionMs: 2000,
    entradas: { digital: (pin, t) => (pin === 2 && t >= 500 && t < 1200 ? 0 : 1) },
    verificar: r => {
      for (const [t, f] of [[300, 0], [800, 1000], [1500, 0]] as const) {
        const real = tonoEn(r, 8, t)
        if (real !== f) return [`En t = ${t} ms el buzzer debería estar ${f ? 'sonando a 1000 Hz' : 'callado'} y está ${real ? `sonando a ${real} Hz` : 'callado'}.`]
      }
      return []
    },
  },

  peatonal: {
    id: 'peatonal',
    titulo: 'Proyecto final: semáforo con botón peatonal',
    enunciado: 'El semáforo de autos está en verde (pin 10). Cuando alguien presiona el botón (pin 2): amarillo 1 segundo (pin 11), rojo 3 segundos (pin 12) y vuelve a verde.',
    circuito: [LED_220(12, 'rojo'), LED_220(11, 'amarillo'), LED_220(10, 'verde'), PULLUP],
    componentes: [
      { tipo: 'led', pin: 12, color: 'rojo', nombre: 'Rojo (pin 12)' },
      { tipo: 'led', pin: 11, color: 'amarillo', nombre: 'Amarillo (pin 11)' },
      { tipo: 'led', pin: 10, color: 'verde', nombre: 'Verde (pin 10)' },
      { tipo: 'boton', pin: 2, nombre: 'Botón peatonal (pin 2)' },
    ],
    codigoInicial: `const int rojo = 12;
const int amarillo = 11;
const int verde = 10;
const int boton = 2;

void setup() {
  // Configurá los pines y empezá en verde
}

void loop() {
  // Si se presiona el botón: amarillo 1 s, rojo 3 s y de nuevo verde
}`,
    solucion: `const int rojo = 12;
const int amarillo = 11;
const int verde = 10;
const int boton = 2;

void setup() {
  pinMode(rojo, OUTPUT);
  pinMode(amarillo, OUTPUT);
  pinMode(verde, OUTPUT);
  pinMode(boton, INPUT_PULLUP);
  digitalWrite(verde, HIGH);
}

void loop() {
  if (digitalRead(boton) == LOW) {
    digitalWrite(verde, LOW);
    digitalWrite(amarillo, HIGH);
    delay(1000);
    digitalWrite(amarillo, LOW);
    digitalWrite(rojo, HIGH);
    delay(3000);
    digitalWrite(rojo, LOW);
    digitalWrite(verde, HIGH);
  }
  delay(10);
}`,
    duracionMs: 7000,
    entradas: { digital: (pin, t) => (pin === 2 && t >= 1000 && t < 1200 ? 0 : 1) },
    verificar: r => {
      const esperado: [number, number][] = [[500, 10], [1500, 11], [2500, 12], [4500, 12], [5500, 10], [6800, 10]]
      for (const [t, pin] of esperado) {
        const prendidos = [12, 11, 10].filter(p => estadoEn(r, p, t))
        if (prendidos.length !== 1 || prendidos[0] !== pin) return [`En t = ${t} ms debería estar prendida solo la luz del pin ${pin} (el botón se presionó en t = 1000 ms).`]
      }
      return []
    },
  },
}
