import { describe, expect, it } from 'vitest'
import { hasAudio } from './audio'

describe('hasAudio', () => {
  it('habilita el audio en el módulo Arquitectura de Fundamentos', () => {
    expect(hasAudio({ track: 'fundamentos', modulo: 'Arquitectura' })).toBe(true)
  })

  it('no lo habilita en otros módulos ni tracks', () => {
    expect(hasAudio({ track: 'fundamentos', modulo: 'SOLID' })).toBe(false)
    expect(hasAudio({ track: 'android', modulo: 'Kotlin' })).toBe(false)
  })
})
