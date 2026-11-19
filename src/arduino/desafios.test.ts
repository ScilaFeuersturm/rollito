import { describe, expect, it } from 'vitest'
import { desafios } from './desafios'
import { ejecutar } from './simulador'

const correr = (id: string, codigo: string) => {
  const d = desafios[id]
  return ejecutar(codigo, { duracionMs: d.duracionMs, entradas: d.entradas })
}

describe.each(Object.values(desafios))('desafío $id', desafio => {
  it('la solución pasa, sin errores ni advertencias', async () => {
    const r = await correr(desafio.id, desafio.solucion)
    expect(r.error).toBeUndefined()
    expect(r.advertencias).toEqual([])
    expect(desafio.verificar(r)).toEqual([])
  })

  it('el código inicial no pasa (hay que completarlo)', async () => {
    const r = await correr(desafio.id, desafio.codigoInicial)
    expect(desafio.verificar(r).length).toBeGreaterThan(0)
  })
})

describe('errores típicos que el verificador detecta', () => {
  it('blink sin el segundo delay: el LED queda prendido casi siempre', async () => {
    const r = await correr('parpadeo', `void setup() { pinMode(13, OUTPUT); }
void loop() { digitalWrite(13, HIGH); delay(500); digitalWrite(13, LOW); }`)
    expect(desafios.parpadeo.verificar(r).length).toBeGreaterThan(0)
  })

  it('semáforo que deja el rojo prendido al pasar a verde', async () => {
    const r = await correr('semaforo', `void setup() { pinMode(12, OUTPUT); pinMode(11, OUTPUT); pinMode(10, OUTPUT); }
void loop() { digitalWrite(12, HIGH); delay(3000); digitalWrite(10, HIGH); delay(3000); digitalWrite(10, LOW); digitalWrite(12, LOW); digitalWrite(11, HIGH); delay(1000); digitalWrite(11, LOW); }`)
    expect(desafios.semaforo.verificar(r)[0]).toContain('luces prendidas a la vez')
  })

  it('botón leído al revés (sin tener en cuenta que con pull-up presionado es LOW)', async () => {
    const r = await correr('boton', `void setup() { pinMode(2, INPUT_PULLUP); pinMode(13, OUTPUT); }
void loop() { if (digitalRead(2) == HIGH) { digitalWrite(13, HIGH); } else { digitalWrite(13, LOW); } }`)
    expect(desafios.boton.verificar(r).length).toBeGreaterThan(0)
  })

  it('fade en un pin sin PWM', async () => {
    const r = await correr('fade', desafios.fade.solucion.replace('const int led = 9;', 'const int led = 7;'))
    expect(r.advertencias.some(a => a.includes('El pin 7 no tiene PWM'))).toBe(true)
  })
})
