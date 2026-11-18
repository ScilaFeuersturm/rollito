import { inline } from '../components/inline'
import { katas, katasIntro } from '../content/android/katas'
import type { androidRoadmap } from '../content/android/roadmap'
import styles from './App.module.css'
import { Link } from './router'
import { homePath, interviewPath } from './routes'

export function CodePractice({ level }: { level: (typeof androidRoadmap)[number] }) {
  const items = katas[level.level]
  const intro = katasIntro[level.level]

  return <article>
    <Link href={homePath}>← Volver al recorrido</Link>
    <p className={styles.meta}>Android · {items.length} {items.length === 1 ? 'ejercicio' : 'ejercicios'}</p>
    <h1 tabIndex={-1}>Práctica de código {level.title}</h1>
    <p>Ejercicios de Kotlin como los de una entrevista en vivo. Antes de escribir, contá en voz alta cómo lo pensás y qué casos borde ves (lista vacía, texto vacío, repetidos): explicar cómo lo pensás pesa tanto como el resultado.</p>
    {intro && <p>{inline(intro)}</p>}
    <ol className={styles.practiceQuestions}>
      {items.map(kata => <li key={kata.titulo} className={styles.level}>
        <h2>{kata.titulo}</h2>
        <p>{inline(kata.enunciado)}</p>
        <p><strong>Ejemplo.</strong> {inline(kata.ejemplo)}</p>
        <details>
          <summary>Ver pista</summary>
          <p>{inline(kata.pista)}</p>
        </details>
        <details>
          <summary>Ver solución</summary>
          <pre><code className="language-kotlin">{kata.codigo}</code></pre>
        </details>
      </li>)}
    </ol>
    <p><Link href={interviewPath(level.level)}>Seguí con el simulacro de entrevista {level.title} →</Link></p>
  </article>
}
