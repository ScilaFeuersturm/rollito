import { describe, expect, it } from 'vitest'
import { descifrar } from '../src/privado/cifrado'
import { cifrar } from './cifrar-privado.js'

const docs = [{ archivo: 'pitch.md', markdown: '# Pitch\n\nHola' }]

describe('contenido privado', () => {
  it('se descifra con las mismas credenciales (el usuario no distingue mayúsculas)', async () => {
    const sobre = await cifrar(docs, 'priscila', 'abcd-efgh', 1000)
    expect(await descifrar(sobre, ' Priscila ', 'abcd-efgh')).toEqual(docs)
  })

  it('falla con una contraseña incorrecta y no deja el texto a la vista', async () => {
    const sobre = await cifrar(docs, 'priscila', 'abcd-efgh', 1000)
    expect(JSON.stringify(sobre)).not.toContain('Pitch')
    await expect(descifrar(sobre, 'priscila', 'otra')).rejects.toThrow()
  })
})
