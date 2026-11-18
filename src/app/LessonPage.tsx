import { useMemo, useState } from 'react'
import { AudioPlayer } from '../components/audio/AudioPlayer'
import { ExerciseCard } from '../components/exercises/ExerciseCard'
import { inline } from '../components/inline'
import { Interview } from '../components/lesson/Interview'
import { hasAudio } from '../content/audio'
import { lessons, nextLesson, type Lesson } from '../content/lessons'
import { xpPerLesson } from '../progress/progress'
import styles from './App.module.css'
import { Link } from './router'
import { homePath, lessonPath } from './routes'

export function LessonPage({ lesson, completed, onComplete }: {
  lesson: Lesson
  completed: boolean
  onComplete: () => void
}) {
  const [solved, setSolved] = useState<number[]>([])
  const { Content } = lesson
  const next = nextLesson(lesson)
  const tracks = useMemo(() => [{ id: lesson.id, title: lesson.titulo, lines: lesson.resumen }], [lesson])

  return <article>
    <Link href={homePath}>← Volver al recorrido</Link>
    <p className={styles.meta}>{lesson.modulo} · {lesson.duracion_min} min</p>
    <h1 tabIndex={-1}>{lesson.titulo}</h1>
    {lesson.prerequisitos.length > 0 && <aside aria-label="Lecciones sugeridas">
      <p>Para repasar antes</p>
      <ul>{lesson.prerequisitos.map(id => <li key={id}>
        <Link href={lessonPath(id)}>{lessons.find(item => item.id === id)?.titulo}</Link>
      </li>)}</ul>
    </aside>}
    <Content />
    <section aria-labelledby="practice">
      <h2 id="practice">Ponelo en práctica</h2>
      {lesson.ejercicios.map((exercise, index) => <ExerciseCard key={index} exercise={exercise}
        onSolved={() => setSolved(previous => previous.includes(index) ? previous : [...previous, index])} />)}
    </section>
    <section className={styles.task} aria-labelledby="task">
      <h2 id="task">Tarea para tu máquina</h2>
      <p>{inline(lesson.tarea_local)}</p>
      <p><strong>Resultado esperado.</strong> {inline(lesson.resultado_esperado)}</p>
      {lesson.salida_esperada && <pre><code>{lesson.salida_esperada}</code></pre>}
    </section>
    <section aria-labelledby="summary">
      <h2 id="summary">Para repasar</h2>
      {hasAudio(lesson) ? <AudioPlayer tracks={tracks} />
        : <ul>{lesson.resumen.map((line, index) => <li key={index}>{inline(line)}</li>)}</ul>}
    </section>
    {lesson.entrevista && <Interview interview={lesson.entrevista} />}
    <div role="status">{completed && <p>Lección completada · +{xpPerLesson} XP</p>}</div>
    {!completed && <>
      <p>{solved.length} de {lesson.ejercicios.length} ejercicios resueltos</p>
      <button className={styles.primary} disabled={solved.length !== lesson.ejercicios.length} onClick={onComplete}>
        Completar lección
      </button>
    </>}
    <nav className={styles.lessonNavigation} aria-label="Continuar el recorrido">
      {next ? <Link className={styles.nextLesson} href={lessonPath(next.id)} rel="next">
        <span><small>Siguiente lección</small><strong>{next.titulo}</strong></span>
        <span aria-hidden="true">→</span>
      </Link> : <Link href={homePath}>← Volver al recorrido</Link>}
    </nav>
  </article>
}
