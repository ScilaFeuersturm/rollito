import styles from './App.module.css'
import { Link } from './router'
import { homePath } from './routes'

type Question = { topic: string; prompt: string; answer: string }

export function InterviewPractice({ area, title, questions }: { area: string; title: string; questions: readonly Question[] }) {

  return <article>
    <Link href={homePath}>← Volver al recorrido</Link>
    <p className={styles.meta}>{area} · {questions.length} preguntas</p>
    <h1 tabIndex={-1}>{title}</h1>
    <p>Respondé en voz alta. Explicá qué harías y por qué antes de abrir la respuesta modelo.</p>
    <ol className={styles.practiceQuestions}>
      {questions.map(question => <li key={question.topic} className={styles.level}>
        <h2>{question.topic}</h2>
        <p>{question.prompt}</p>
        <details>
          <summary>Ver respuesta modelo</summary>
          <p>{question.answer}</p>
        </details>
      </li>)}
    </ol>
  </article>
}
