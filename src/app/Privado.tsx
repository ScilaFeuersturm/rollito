import { useState, type FormEvent, type ReactNode } from 'react'
import { inline } from '../components/inline'
import { descifrar, type DocPrivado, type Sobre } from '../privado/cifrado'
import styles from './App.module.css'

export function Privado() {
  const [docs, setDocs] = useState<DocPrivado[] | null>(null)
  const [error, setError] = useState('')
  const [abriendo, setAbriendo] = useState(false)

  async function entrar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setAbriendo(true)
    setError('')
    try {
      const respuesta = await fetch('/privado.json', { cache: 'no-store' })
      if (!respuesta.ok) {
        setError('Todavía no hay contenido privado publicado.')
        return
      }
      const sobre = await respuesta.json() as Sobre
      setDocs(await descifrar(sobre, String(form.get('usuario')), String(form.get('clave'))))
    } catch {
      setError('Usuario o contraseña incorrectos.')
    } finally {
      setAbriendo(false)
    }
  }

  if (docs) return <section>
    <h1 tabIndex={-1}>Material privado</h1>
    <p><button type="button" className={styles.primary} onClick={() => setDocs(null)}>Cerrar</button></p>
    {docs.map(doc => <article key={doc.archivo} className={styles.task}><Markdown text={doc.markdown} /></article>)}
  </section>

  return <section className={styles.hero}>
    <h1 tabIndex={-1}>Material privado</h1>
    <p>Pitches y respuestas personales para entrevistas. El contenido está cifrado y se abre en tu navegador.</p>
    <form className={styles.form} onSubmit={entrar}>
      <label>Usuario
        <input name="usuario" autoComplete="username" autoCapitalize="none" spellCheck={false} required />
      </label>
      <label>Contraseña
        <input name="clave" type="password" autoComplete="current-password" required />
      </label>
      <button className={styles.primary} disabled={abriendo}>{abriendo ? 'Abriendo…' : 'Entrar'}</button>
    </form>
    {error && <p role="alert">{error}</p>}
  </section>
}

// Markdown mínimo para estos archivos: títulos, citas, listas, tablas, separadores y párrafos.
// Arma elementos de React (nada de HTML crudo); el formato en línea lo resuelve inline().
export function Markdown({ text }: { text: string }) {
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  const blocks: ReactNode[] = []
  let i = 0
  const take = (test: (line: string) => boolean) => {
    const group: string[] = []
    while (i < lines.length && test(lines[i])) group.push(lines[i++])
    return group
  }
  while (i < lines.length) {
    const line = lines[i]
    const key = blocks.length
    const heading = /^(#{1,3}) (.*)$/.exec(line)
    if (!line.trim()) { i++; continue }
    if (heading) {
      const content = inline(heading[2])
      blocks.push(heading[1].length === 1 ? <h2 key={key}>{content}</h2> : heading[1].length === 2 ? <h3 key={key}>{content}</h3> : <h4 key={key}>{content}</h4>)
      i++
    } else if (/^-{3,}$/.test(line.trim())) {
      blocks.push(<hr key={key} />)
      i++
    } else if (line.startsWith('>')) {
      const quote = take(l => l.startsWith('>')).map(l => l.replace(/^> ?/, ''))
      blocks.push(<blockquote key={key}>{paragraphs(quote)}</blockquote>)
    } else if (/^\s*([-*]|\d+\.) /.test(line)) {
      const ordered = /^\s*\d+\./.test(line)
      const items = take(l => /^\s*([-*]|\d+\.) /.test(l)).map((l, n) => <li key={n}>{inline(l.replace(/^\s*([-*]|\d+\.) /, ''))}</li>)
      blocks.push(ordered ? <ol key={key}>{items}</ol> : <ul key={key}>{items}</ul>)
    } else if (line.startsWith('|')) {
      const rows = take(l => l.startsWith('|')).filter(l => !/^\|[\s|:-]+\|$/.test(l))
        .map(l => l.replace(/^\||\|$/g, '').split('|').map(cell => cell.trim()))
      blocks.push(<table key={key}><tbody>{rows.map((row, r) =>
        <tr key={r}>{row.map((cell, c) => r === 0 ? <th key={c}>{inline(cell)}</th> : <td key={c}>{inline(cell)}</td>)}</tr>)}</tbody></table>)
    } else {
      // La primera línea siempre entra, así una línea rara (por ejemplo "#sin-espacio") no traba el bucle.
      const paragraph = [lines[i++], ...take(l => !!l.trim() && !/^(#{1,3} |>|\||-{3,}$|\s*([-*]|\d+\.) )/.test(l))]
      blocks.push(<p key={key}>{inline(paragraph.join(' '))}</p>)
    }
  }
  return <>{blocks}</>
}

function paragraphs(lines: string[]) {
  return lines.join('\n').split(/\n\s*\n/).filter(p => p.trim()).map((p, n) => <p key={n}>{inline(p.replace(/\n/g, ' '))}</p>)
}
