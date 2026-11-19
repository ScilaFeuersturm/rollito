import { Fragment } from 'react'

/**
 * Da formato a textos cortos del frontmatter: `así` se muestra como <code> y **así** como <strong>.
 * Dentro del código no se interpreta nada.
 */
export function inline(text: string) {
  return text.split(/(`[^`]+`)/).map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 1) return <code key={index}>{part.slice(1, -1)}</code>
    return <Fragment key={index}>{part.split(/(\*\*[^*]+\*\*)/).map((piece, inner) =>
      piece.startsWith('**') && piece.endsWith('**') && piece.length > 4
        ? <strong key={inner}>{piece.slice(2, -2)}</strong>
        : piece)}</Fragment>
  })
}
