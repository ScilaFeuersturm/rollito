import { describe, expect, it } from 'vitest'
import { hasAudio } from './audio'

describe('hasAudio', () => {
  it('habilita el audio en Arquitectura, SOLID y Patrones de diseño de Fundamentos', () => {
    for (const modulo of ['Arquitectura', 'SOLID', 'Patrones de diseño']) {
      expect(hasAudio({ track: 'fundamentos', modulo })).toBe(true)
    }
  })

  it('no lo habilita en otros módulos ni tracks', () => {
    expect(hasAudio({ track: 'fundamentos', modulo: 'Pseudocódigo' })).toBe(false)
    expect(hasAudio({ track: 'android', modulo: 'Kotlin' })).toBe(false)
  })
})
