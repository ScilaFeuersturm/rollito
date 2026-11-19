import { describe, expect, it } from 'vitest'
import { combinar, iguales, limpiar } from './combinar'

describe('combinar progreso', () => {
  it('une las lecciones de los dos lados', () => {
    expect(combinar({ a: '2026-11-01' }, { b: '2026-11-02' })).toEqual({ a: '2026-11-01', b: '2026-11-02' })
  })

  it('si una lección está en los dos, queda la fecha más vieja', () => {
    expect(combinar({ a: '2026-11-05' }, { a: '2026-11-01' })).toEqual({ a: '2026-11-01' })
    expect(combinar({ a: '2026-11-01' }, { a: '2026-11-05' })).toEqual({ a: '2026-11-01' })
  })

  it('compara progresos', () => {
    expect(iguales({ a: '2026-11-01' }, { a: '2026-11-01' })).toBe(true)
    expect(iguales({ a: '2026-11-01' }, { a: '2026-11-02' })).toBe(false)
    expect(iguales({ a: '2026-11-01' }, {})).toBe(false)
  })

  it('descarta datos con formato inválido', () => {
    expect(limpiar({ a: '2026-11-01', b: 3, c: 'ayer' })).toEqual({ a: '2026-11-01' })
    expect(limpiar(null)).toEqual({})
    expect(limpiar(['2026-11-01'])).toEqual({})
  })
})
