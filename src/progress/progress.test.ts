import { describe, expect, it } from 'vitest'
import { localDay, streak } from './progress'

// Los meses de Date van de 0 a 11: new Date(2026, 10, 17) es el 17 de noviembre.
const hoy = new Date(2026, 10, 17, 10)

describe('localDay', () => {
  it('usa el calendario local con ceros a la izquierda', () => {
    expect(localDay(new Date(2026, 0, 5, 23, 59))).toBe('2026-01-05')
  })
})

describe('streak', () => {
  it('es cero sin lecciones', () => {
    expect(streak({}, hoy)).toBe(0)
  })

  it('cuenta días consecutivos hasta hoy', () => {
    expect(streak({ a: '2026-11-15', b: '2026-11-16', c: '2026-11-17' }, hoy)).toBe(3)
  })

  it('sigue vigente si la última lección fue ayer', () => {
    expect(streak({ a: '2026-11-15', b: '2026-11-16' }, hoy)).toBe(2)
  })

  it('se corta si faltó un día', () => {
    expect(streak({ a: '2026-11-14', b: '2026-11-15' }, hoy)).toBe(0)
  })

  it('cuenta una sola vez varias lecciones del mismo día', () => {
    expect(streak({ a: '2026-11-17', b: '2026-11-17' }, hoy)).toBe(1)
  })

  it('cruza el cambio de mes', () => {
    expect(streak({ a: '2026-10-31', b: '2026-11-01' }, new Date(2026, 10, 1))).toBe(2)
  })
})
