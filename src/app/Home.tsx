import { androidRoadmap } from '../content/android/roadmap'
import { lessons } from '../content/lessons'
import type { Progress } from '../progress/progress'
import styles from './App.module.css'
import { Link } from './router'
import { lessonPath } from './routes'

export function Home({ progress }: { progress: Progress }) {
  const completed = lessons.filter(item => Object.hasOwn(progress, item.id)).length

  return <>
    <section className={styles.hero}>
      <h1 tabIndex={-1}>Aprendé programación paso a paso</h1>
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
                <Link href={lessonPath(item.id)}>
                  <strong>{item.titulo}</strong>
                  <span>{Object.hasOwn(progress, item.id) ? 'Completada · ' : ''}{item.duracion_min} min</span>
                </Link>
              </li>)}
            </ul> : <p className={styles.pending}>Lecciones en preparación</p>}
          </section>
        })}
      </div>
    </section>
  </>
}
