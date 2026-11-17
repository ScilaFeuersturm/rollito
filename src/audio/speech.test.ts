import { describe, expect, it } from 'vitest'
import { pickVoice, toSegments, toSpeech } from './speech'

describe('toSpeech', () => {
  it('saca backticks y negritas', () => {
    expect(toSpeech('`String?` permite **null**')).toBe('String? permite null')
  })
})

describe('toSegments', () => {
  it('lee el título y después cada línea, en orden', () => {
    const segments = toSegments([
      { id: 'a', title: 'Uno', lines: ['x', 'y'] },
      { id: 'b', title: 'Dos', lines: ['z'] },
    ])
    expect(segments.map(segment => [segment.track, segment.line, segment.text])).toEqual([
      [0, -1, 'Uno'], [0, 0, 'x'], [0, 1, 'y'],
      [1, -1, 'Dos'], [1, 0, 'z'],
    ])
  })
})

describe('pickVoice', () => {
  it('prefiere español rioplatense', () => {
    expect(pickVoice([{ lang: 'es-ES' }, { lang: 'es-AR' }, { lang: 'en-US' }])?.lang).toBe('es-AR')
  })

  it('después prefiere español latinoamericano', () => {
    expect(pickVoice([{ lang: 'es-ES' }, { lang: 'es_MX' }])?.lang).toBe('es_MX')
  })

  it('usa cualquier español si no hay otra', () => {
    expect(pickVoice([{ lang: 'en-US' }, { lang: 'es-ES' }])?.lang).toBe('es-ES')
  })

  it('no devuelve voces en otro idioma', () => {
    expect(pickVoice([{ lang: 'en-US' }])).toBeUndefined()
  })
})
