import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { inline } from './inline'

const html = (text: string) => renderToStaticMarkup(<>{inline(text)}</>)

describe('inline', () => {
  it('muestra el código entre backticks', () => {
    expect(html('usá `val` siempre')).toBe('usá <code>val</code> siempre')
  })

  it('muestra las negritas', () => {
    expect(html('¿Qué va en el **Dado**?')).toBe('¿Qué va en el <strong>Dado</strong>?')
  })

  it('no interpreta asteriscos dentro del código', () => {
    expect(html('`a ** b` y **c**')).toBe('<code>a ** b</code> y <strong>c</strong>')
  })
})
