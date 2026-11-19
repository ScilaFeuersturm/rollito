import { inline } from '../components/inline'
import styles from './App.module.css'
import { Link } from './router'
import { homePath } from './routes'

export type Kata = { titulo: string; enunciado: string; ejemplo?: string; pista: string; codigo: string }

type Props = {
  area: string
  titulo: string
  descripcion: string
  intro?: string
  items: readonly Kata[]
  lenguaje: 'kotlin' | 'tsx' | 'html'
  siguiente?: { href: string; texto: string }
}

// Práctica de código en vivo, para cualquier track: enunciado, pista y solución escondidas.
export function CodePractice({ area, titulo, descripcion, intro, items, lenguaje, siguiente }: Props) {
  return <article>
    <Link href={homePath}>← Volver al recorrido</Link>
    <p className={styles.meta}>{area} · {items.length} {items.length === 1 ? 'ejercicio' : 'ejercicios'}</p>
    <h1 tabIndex={-1}>{titulo}</h1>
    <p>{descripcion} Antes de escribir, contá en voz alta cómo lo pensás y qué casos borde ves: explicar cómo lo pensás pesa tanto como el resultado.</p>
    {intro && <p>{inline(intro)}</p>}
    <ol className={styles.practiceQuestions}>
      {items.map(kata => <li key={kata.titulo} className={styles.level}>
        <h2>{kata.titulo}</h2>
        <p>{inline(kata.enunciado)}</p>
        {kata.ejemplo && <p><strong>Ejemplo.</strong> {inline(kata.ejemplo)}</p>}
        <details>
          <summary>Ver pista</summary>
          <p>{inline(kata.pista)}</p>
        </details>
        <details>
          <summary>Ver solución</summary>
          <pre><code className={`language-${lenguaje}`}>{kata.codigo}</code></pre>
        </details>
      </li>)}
    </ol>
    {siguiente && <p><Link href={siguiente.href}>{siguiente.texto} →</Link></p>}
  </article>
}
