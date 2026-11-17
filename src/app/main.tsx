import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ExerciseCard } from '../components/exercises/ExerciseCard'
import { androidRoadmap } from '../content/android/roadmap'
import { lessons } from '../content/lessons'
import { localDay, readProgress, saveProgress, streak, xpPerLesson, type Progress } from '../progress/progress'
import '../styles/global.css'
import styles from './App.module.css'

function App() {
  const [route, setRoute] = useState(() => location.hash.slice(1))
  const [progress, setProgress] = useState(readProgress)
  const [storageWarning, setStorageWarning] = useState(false)
  const lesson = lessons.find(item => item.id === route)
  const completed = lessons.filter(item => Object.hasOwn(progress, item.id)).length

  useEffect(() => {
    function syncRoute() {
      setRoute(location.hash.slice(1))
    }
    addEventListener('hashchange', syncRoute)
    return () => removeEventListener('hashchange', syncRoute)
  }, [])

  useEffect(() => {
    document.title = lesson ? `${lesson.titulo} · Rollito` : 'Rollito · Aprendé programación'
    if (location.hash) document.querySelector('h1')?.focus()
  }, [lesson, route])

  function complete(id: string) {
    const latest = { ...readProgress(), ...progress }
    if (Object.hasOwn(latest, id)) return
    const next: Progress = { ...latest, [id]: localDay() }
    setProgress(next)
    setStorageWarning(!saveProgress(next))
  }

  return <>
    <header className={styles.header}>
      <div className={styles.bar}>
        <a className={styles.brand} href="#inicio">Rollito<span aria-hidden="true">.</span></a>
        <div className={styles.stats} aria-label="Tu progreso">
          <span>{completed * xpPerLesson} XP</span>
          <span>Racha · {streak(progress)} {streak(progress) === 1 ? 'día' : 'días'}</span>
        </div>
      </div>
    </header>
    <main className={styles.main}>
      {storageWarning && <p role="status">El navegador no pudo guardar tu progreso. Se conserva mientras esta página siga abierta.</p>}
      {lesson ? <Lesson key={lesson.id} lesson={lesson} completed={Object.hasOwn(progress, lesson.id)}
        onComplete={() => complete(lesson.id)} /> : <>
        <section className={styles.hero}>
          <h1 tabIndex={-1}>{route && route !== 'inicio' ? 'No encontramos esa lección' : 'Aprendé programación paso a paso'}</h1>
          <p>Aprendé Android moderno de Junior a Senior, con ejercicios que podés llevar a tu propia máquina.</p>
        </section>
        <section aria-labelledby="track">
          <h2 id="track">Android moderno</h2>
          <p>{completed} de {lessons.length} {lessons.length === 1 ? 'lección disponible completada' : 'lecciones disponibles completadas'}</p>
          <div className={styles.roadmap}>
            {androidRoadmap.map(level => {
              const available = lessons.filter(item => item.track === 'android' && item.nivel === level.level)
              return <section className={styles.level} key={level.level} aria-labelledby={level.level}>
                <h3 id={level.level}>{level.title}</h3>
                <p>{level.description}</p>
                <ul className={styles.topics}>
                  {level.topics.map(topic => <li key={topic}>{topic}</li>)}
                </ul>
                {available.length > 0 ? <ul className={styles.lessons}>
                  {available.map(item => <li key={item.id}>
                    <a href={`#${item.id}`}>
                      <strong>{item.titulo}</strong>
                      <span>{Object.hasOwn(progress, item.id) ? 'Completada · ' : ''}{item.duracion_min} min</span>
                    </a>
                  </li>)}
                </ul> : <p className={styles.pending}>Lecciones en preparación</p>}
              </section>
            })}
          </div>
        </section>
      </>}
    </main>
  </>
}

function Lesson({ lesson, completed, onComplete }: {
  lesson: typeof lessons[number]
  completed: boolean
  onComplete: () => void
}) {
  const [solved, setSolved] = useState<number[]>([])
  const { Content } = lesson

  return <article>
    <a href="#inicio">← Volver al recorrido</a>
    <p className={styles.meta}>{lesson.modulo} · {lesson.duracion_min} min</p>
    <h1 tabIndex={-1}>{lesson.titulo}</h1>
    {lesson.prerequisitos.length > 0 && <aside aria-label="Lecciones sugeridas">
      <p>Para repasar antes</p>
      <ul>{lesson.prerequisitos.map(id => <li key={id}>
        <a href={`#${id}`}>{lessons.find(item => item.id === id)?.titulo}</a>
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
      <p>{lesson.tarea_local}</p>
      <p><strong>Resultado esperado.</strong> {lesson.resultado_esperado}</p>
    </section>
    <div role="status">{completed && <p>Lección completada · +{xpPerLesson} XP</p>}</div>
    {!completed && <>
      <p>{solved.length} de {lesson.ejercicios.length} ejercicios resueltos</p>
      <button className={styles.primary} disabled={solved.length !== lesson.ejercicios.length} onClick={onComplete}>
        Completar lección
      </button>
    </>}
  </article>
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
