import { androidSections, architectureSections, functionalLessons, reactSections, type Lesson } from '../content/lessons'
import type { Progress } from '../progress/progress'
import styles from './App.module.css'
import { Link } from './router'
import { functionalInterviewPath, functionalRepasoPath, interviewPath, lessonPath, practicePath, repasoPath } from './routes'

const androidLessons = androidSections.flatMap(section => section.lessons)

function LessonList({ items, progress }: { items: Lesson[]; progress: Progress }) {
  return <ul className={styles.lessons}>
    {items.map(item => <li key={item.id}>
      <Link href={lessonPath(item.id)}>
        <strong>{item.titulo}</strong>
        <span>{Object.hasOwn(progress, item.id) ? 'Completada · ' : ''}{item.duracion_min} min</span>
      </Link>
    </li>)}
  </ul>
}

export function Home({ progress }: { progress: Progress }) {
  const androidCompleted = androidLessons.filter(item => Object.hasOwn(progress, item.id)).length

  return <>
    <section className={styles.hero}>
      <h1 tabIndex={-1}>Aprendé tecnología paso a paso</h1>
      <p>Elegí qué querés aprender o repasar, con lecciones cortas y ejercicios para practicar.</p>
    </section>
    <section aria-labelledby="learning-paths">
      <h2 id="learning-paths">Rutas de aprendizaje</h2>
      <div className={styles.trackGrid}>
        <section className={styles.trackCard} aria-labelledby="architecture">
          <h3 id="architecture">Arquitectura</h3>
          <p>Recorré POO, SOLID, patrones de diseño y arquitecturas, con preguntas de entrevista y repaso en audio.</p>
          <details>
            <summary>Ver lecciones de Arquitectura</summary>
            <div className={styles.roadmap}>
              {architectureSections.map(section => <section key={section.id} className={styles.level}
                aria-labelledby={`architecture-${section.id}`}>
                <h4 id={`architecture-${section.id}`}>{section.title}</h4>
                <p>{section.topics}</p>
                {section.lessons.length > 0
                  ? <LessonList items={section.lessons} progress={progress} />
                  : <p className={styles.pending}>Lecciones en preparación</p>}
              </section>)}
            </div>
            <p><Link href={repasoPath}>Escuchá el repaso en audio</Link></p>
          </details>
        </section>
        <section className={styles.trackCard} aria-labelledby="android">
          <h3 id="android">Android</h3>
          <p>Aprendé Android moderno de Junior a Senior, desde Kotlin y Compose hasta rendimiento y arquitectura.</p>
          <nav aria-labelledby="android-interviews">
            <h4 id="android-interviews" className={styles.practiceHeading}>Simulacros de entrevista</h4>
            <ul className={styles.practiceLinks}>
              {androidSections.map(level => <li key={level.level}>
                <Link href={interviewPath(level.level)}>{level.title}</Link>
              </li>)}
            </ul>
          </nav>
          <nav aria-labelledby="android-code-practice">
            <h4 id="android-code-practice" className={styles.practiceHeading}>Práctica de código</h4>
            <ul className={styles.practiceLinks}>
              {androidSections.map(level => <li key={level.level}>
                <Link href={practicePath(level.level)}>{level.title}</Link>
              </li>)}
            </ul>
          </nav>
          <details>
            <summary>Ver recorrido de Android</summary>
            <p>{androidCompleted} de {androidLessons.length} {androidLessons.length === 1 ? 'lección disponible completada' : 'lecciones disponibles completadas'}</p>
            <div className={styles.roadmap}>
              {androidSections.map(level => <section className={styles.level} key={level.level} aria-labelledby={level.level}>
                  <h4 id={level.level}>{level.title}</h4>
                  <p>{level.description}</p>
                  <ul className={styles.topics}>
                    {level.topics.map(topic => <li key={topic}>{topic}</li>)}
                  </ul>
                  {level.lessons.length > 0
                    ? <LessonList items={level.lessons} progress={progress} />
                    : <p className={styles.pending}>Lecciones en preparación</p>}
                </section>)}
            </div>
          </details>
        </section>
        <section className={styles.trackCard} aria-labelledby="react">
          <h3 id="react">React</h3>
          <p>Construí interfaces web con componentes, estado y hooks, con ejemplos que podés editar en vivo.</p>
          <details>
            <summary>Ver lecciones de React</summary>
            <div className={styles.roadmap}>
              {reactSections.map(section => <section key={section.level} className={styles.level}
                aria-labelledby={`react-${section.level}`}>
                <h4 id={`react-${section.level}`}>{section.title}</h4>
                <p>{section.description}</p>
                {section.lessons.length > 0
                  ? <LessonList items={section.lessons} progress={progress} />
                  : <p className={styles.pending}>Lecciones en preparación</p>}
              </section>)}
            </div>
          </details>
        </section>
        <section className={styles.trackCard} aria-labelledby="functional-analysis">
          <h3 id="functional-analysis">Análisis funcional</h3>
          <p>Aprendé a relevar necesidades y convertirlas en requisitos, historias de usuario y criterios de aceptación, con repaso en audio.</p>
          <nav aria-labelledby="functional-practice">
            <h4 id="functional-practice" className={styles.practiceHeading}>Para practicar</h4>
            <ul className={styles.practiceLinks}>
              <li><Link href={functionalInterviewPath}>Simulacro de entrevista</Link></li>
              <li><Link href={functionalRepasoPath}>Repaso en audio</Link></li>
            </ul>
          </nav>
          <details>
            <summary>Ver lecciones de Análisis funcional</summary>
            <p>{functionalLessons.filter(item => Object.hasOwn(progress, item.id)).length} de {functionalLessons.length} lecciones completadas</p>
            <LessonList items={functionalLessons} progress={progress} />
          </details>
        </section>
      </div>
    </section>
  </>
}
