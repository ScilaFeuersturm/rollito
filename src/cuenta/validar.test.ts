import { describe, expect, it } from 'vitest'
import { validarClave, validarNombre } from './validar'

// Casos elegidos con partición de equivalencia y valores límite (lección de Testing Junior).
describe('validarNombre', () => {
  it('recorta los espacios y acepta de 1 a 60 caracteres', () => {
    expect(validarNombre('  Ana  ')).toBe('Ana')
    expect(validarNombre('A')).toBe('A')
    expect(validarNombre('a'.repeat(60))).toHaveLength(60)
  })

  it('rechaza vacío, solo espacios y más de 60 caracteres', () => {
    expect(() => validarNombre('')).toThrow('nombre-invalido')
    expect(() => validarNombre('   ')).toThrow('nombre-invalido') // el bug: antes llegaba a Firestore
    expect(() => validarNombre('a'.repeat(61))).toThrow('nombre-invalido')
  })
})

describe('validarClave', () => {
  it('acepta desde 8 caracteres y rechaza 7', () => {
    expect(validarClave('12345678')).toBe('12345678')
    expect(() => validarClave('1234567')).toThrow('clave-corta')
  })
})
