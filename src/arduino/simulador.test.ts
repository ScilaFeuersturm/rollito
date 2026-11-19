import { describe, expect, it } from 'vitest'
import { cambios, ejecutar } from './simulador'
import { transpilar } from './transpilar'

const BLINK = `
const int led = 13;

void setup() {
  pinMode(led, OUTPUT);
}

void loop() {
  digitalWrite(led, HIGH);
  delay(500);
  digitalWrite(led, LOW);
  delay(500);
}`

describe('transpilar', () => {
  it('convierte tipos, funciones y delay', () => {
    const { js } = transpilar(BLINK)
    expect(js).toContain('const led = 13')
    expect(js).toContain('async function setup()')
    expect(js).toContain('await delay(500)')
  })

  it('convierte arrays, #define y parámetros con tipo', () => {
    const { js } = transpilar(`#define PAUSA 200
int pines[] = {2, 3, 4};
int doble(int n) { return n * 2; }
void setup() {}
void loop() { int x = doble(pines[0]); }`)
    expect(js).toContain('const PAUSA = 200;')
    expect(js).toContain('let pines = [2, 3, 4]')
    expect(js).toContain('async function doble(n)')
    expect(js).toContain('let x = await doble(pines[0])')
  })

  it('avisa si falta setup o loop, o si se usa una librería que no tiene', () => {
    expect(() => transpilar('void loop() {}')).toThrow('Falta la función setup().')
    expect(() => transpilar('#include <MFRC522.h>\nvoid setup() {}\nvoid loop() {}')).toThrow('El simulador no tiene la librería MFRC522.h')
  })
})

describe('ejecutar', () => {
  it('blink: cambia el pin 13 cada 500 ms', async () => {
    const r = await ejecutar(BLINK, { duracionMs: 2000 })
    expect(r.error).toBeUndefined()
    expect(cambios(r, 13)).toEqual([
      { t: 0, valor: 1 }, { t: 500, valor: 0 }, { t: 1000, valor: 1 }, { t: 1500, valor: 0 },
    ])
  })

  it('lee un botón con INPUT_PULLUP según las entradas simuladas', async () => {
    const codigo = `
void setup() { pinMode(2, INPUT_PULLUP); pinMode(13, OUTPUT); }
void loop() {
  if (digitalRead(2) == LOW) { digitalWrite(13, HIGH); } else { digitalWrite(13, LOW); }
  delay(10);
}`
    const presionado = (pin: number, t: number) => (pin === 2 && t >= 100 && t < 300 ? 0 : 1)
    const r = await ejecutar(codigo, { duracionMs: 500, entradas: { digital: presionado } })
    expect(cambios(r, 13)).toEqual([{ t: 100, valor: 1 }, { t: 300, valor: 0 }])
  })

  it('analogRead y map llevan el potenciómetro a PWM', async () => {
    const codigo = `
void setup() { pinMode(9, OUTPUT); }
void loop() { analogWrite(9, map(analogRead(A0), 0, 1023, 0, 255)); delay(100); }`
    const r = await ejecutar(codigo, { duracionMs: 300, entradas: { analogica: (_, t) => (t < 100 ? 0 : 1023) } })
    expect(r.eventos.filter(e => e.tipo === 'pwm').map(e => (e as { valor: number }).valor)).toEqual([0, 255])
  })

  it('escribe en el monitor serie', async () => {
    const r = await ejecutar(`void setup() { Serial.begin(9600); Serial.println("Hola"); } void loop() { delay(1000); }`, { duracionMs: 100 })
    expect(r.serie).toBe('Hola\n')
  })

  it('advierte lo que en la placa real sería un problema', async () => {
    const r = await ejecutar(`void setup() {} void loop() { digitalWrite(13, HIGH); analogWrite(7, 100); delay(100); }`, { duracionMs: 200 })
    expect(r.advertencias.some(a => a.includes('sin configurarlo con pinMode(13, OUTPUT)'))).toBe(true)
    expect(r.advertencias.some(a => a.includes('El pin 7 no tiene PWM'))).toBe(true)
  })

  it('un loop sin delay termina igual (1 ms por vuelta) y un error se traduce', async () => {
    const sinDelay = await ejecutar(`void setup() { pinMode(13, OUTPUT); } void loop() { digitalWrite(13, HIGH); }`, { duracionMs: 50 })
    expect(sinDelay.error).toBeUndefined()
    expect(sinDelay.tiempoFinal).toBe(50)
    const mal = await ejecutar(`void setup() { pinMode(led, OUTPUT); } void loop() {}`, { duracionMs: 50 })
    expect(mal.error).toBe('No existe "led": revisá que esté declarado y bien escrito (mayúsculas incluidas).')
  })
})
