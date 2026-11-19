import { useEffect, useRef, useState } from 'react'
import { desafios } from './desafios'
import { ejecutar, type Evento } from './simulador'
import styles from './ArduinoSim.module.css'

const claveSuperado = (id: string) => `rollito.arduino.${id}`
function leerSuperado(id: string) { try { return localStorage.getItem(claveSuperado(id)) === '1' } catch { return false } }
function guardarSuperado(id: string) { try { localStorage.setItem(claveSuperado(id), '1') } catch { /* sin almacenamiento */ } }

type Revision = { ok: boolean; problemas: string[]; advertencias: string[] }

// Simulador de un desafío: editor, placa con componentes interactivos, monitor serie y comprobación automática.
export function ArduinoSim({ desafio: id }: { desafio: string }) {
  const desafio = desafios[id]
  const [codigo, setCodigo] = useState(desafio.codigoInicial)
  const [corriendo, setCorriendo] = useState(false)
  const [salidas, setSalidas] = useState<Record<number, number>>({}) // pin → brillo de 0 a 255
  const [tonos, setTonos] = useState<Record<number, number>>({})
  const [serie, setSerie] = useState('')
  const [revision, setRevision] = useState<Revision | null>(null)
  const [superado, setSuperado] = useState(false)
  const [presionados, setPresionados] = useState<Record<number, boolean>>({})
  const [pote, setPote] = useState(512)
  const entradas = useRef({ presionados, pote })
  const control = useRef<AbortController | null>(null)
  entradas.current = { presionados, pote }

  useEffect(() => setSuperado(leerSuperado(id)), [id])
  useEffect(() => () => control.current?.abort(), [])

  function reiniciarPlaca() { setSalidas({}); setTonos({}); setSerie('') }

  async function correr() {
    control.current?.abort()
    const ac = new AbortController()
    control.current = ac
    reiniciarPlaca()
    setRevision(null)
    setCorriendo(true)
    const r = await ejecutar(codigo, {
      duracionMs: 10 * 60 * 1000,
      reloj: 'real',
      señal: ac.signal,
      entradas: {
        digital: pin => (entradas.current.presionados[pin] ? 0 : 1), // botones con pull-up: presionado = LOW
        analogica: () => entradas.current.pote,
      },
      alCambiar: (e: Evento) => {
        if (e.tipo === 'digital') setSalidas(s => ({ ...s, [e.pin]: e.valor ? 255 : 0 }))
        if (e.tipo === 'pwm') setSalidas(s => ({ ...s, [e.pin]: e.valor }))
        if (e.tipo === 'tono') setTonos(s => ({ ...s, [e.pin]: e.frecuencia }))
      },
      alEscribirSerie: texto => setSerie(s => (s + texto).slice(-4000)),
    })
    if (control.current === ac) {
      setCorriendo(false)
      if (r.error || r.advertencias.length) setRevision({ ok: false, problemas: r.error ? [r.error] : [], advertencias: r.advertencias })
    }
  }

  function detener() { control.current?.abort(); setCorriendo(false) }

  async function comprobar() {
    detener()
    const r = await ejecutar(codigo, { duracionMs: desafio.duracionMs, entradas: desafio.entradas })
    const problemas = r.error ? [r.error] : desafio.verificar(r)
    const ok = problemas.length === 0
    setRevision({ ok, problemas, advertencias: r.advertencias })
    if (ok) { guardarSuperado(id); setSuperado(true) }
  }

  function verSolucion() {
    if (codigo !== desafio.codigoInicial && !confirm('¿Reemplazar tu código por la solución?')) return
    detener(); setCodigo(desafio.solucion); setRevision(null)
  }

  return <section className={styles.sim} aria-label={`Simulador: ${desafio.titulo}`}>
    <div className={styles.cabecera}>
      <h3>🔌 Desafío: {desafio.titulo}</h3>
      {superado && <span className={styles.superado}>✓ Superado</span>}
    </div>
    <p>{desafio.enunciado}</p>
    <details className={styles.circuito}>
      <summary>Cómo se arma en la placa real (sin quemar nada)</summary>
      <ul>{desafio.circuito.map(paso => <li key={paso}>{paso}</li>)}</ul>
    </details>

    <label htmlFor={`codigo-${id}`}><strong>Tu código</strong></label>
    <textarea id={`codigo-${id}`} className={styles.editor} value={codigo} spellCheck={false} autoCapitalize="off" autoCorrect="off"
      onChange={evento => setCodigo(evento.target.value)} />

    <div className={styles.acciones}>
      {corriendo
        ? <button type="button" className={styles.principal} onClick={detener}>■ Detener</button>
        : <button type="button" className={styles.principal} onClick={() => void correr()}>▶ Ejecutar</button>}
      <button type="button" onClick={() => void comprobar()}>✔ Comprobar desafío</button>
      <button type="button" onClick={verSolucion}>Ver solución</button>
      <button type="button" onClick={() => { detener(); setCodigo(desafio.codigoInicial); setRevision(null); reiniciarPlaca() }}>Reiniciar</button>
    </div>

    {desafio.componentes.length > 0 && <div className={styles.placa} aria-label="Placa simulada">
      {desafio.componentes.map(c => {
        if (c.tipo === 'led') {
          const brillo = salidas[c.pin] ?? 0
          return <div key={c.nombre} className={styles.componente}>
            <span className={`${styles.led} ${styles[c.color]}`} style={{ opacity: 0.12 + (brillo / 255) * 0.88 }}
              role="img" aria-label={`${c.nombre}: ${brillo ? `prendido${brillo < 255 ? ` al ${Math.round((brillo / 255) * 100)}%` : ''}` : 'apagado'}`} />
            <span>{c.nombre}</span>
          </div>
        }
        if (c.tipo === 'boton') {
          const apretar = (valor: boolean) => setPresionados(p => ({ ...p, [c.pin]: valor }))
          return <div key={c.nombre} className={styles.componente}>
            <button type="button" className={styles.pulsador} aria-pressed={!!presionados[c.pin]}
              onPointerDown={() => apretar(true)} onPointerUp={() => apretar(false)} onPointerLeave={() => apretar(false)}
              onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); apretar(true) } }}
              onKeyUp={e => { if (e.key === ' ' || e.key === 'Enter') apretar(false) }}>
              {presionados[c.pin] ? '●' : '○'}
            </button>
            <span>{c.nombre} (mantené apretado)</span>
          </div>
        }
        if (c.tipo === 'pote') {
          return <div key={c.nombre} className={styles.componente}>
            <input type="range" min={0} max={1023} value={pote} aria-label={c.nombre} onChange={e => setPote(Number(e.target.value))} />
            <span>{c.nombre}: {pote}</span>
          </div>
        }
        const frecuencia = tonos[c.pin] ?? 0
        return <div key={c.nombre} className={styles.componente}>
          <span className={styles.buzzer} aria-hidden="true">{frecuencia ? '🔊' : '🔈'}</span>
          <span role="status">{c.nombre}: {frecuencia ? `${frecuencia} Hz` : 'callado'}</span>
        </div>
      })}
    </div>}

    <div className={styles.serie} aria-label="Monitor serie" aria-live="polite">{serie || 'Monitor serie (9600 baudios)'}</div>

    {revision && <div role="status" style={{ marginTop: '.75rem', display: 'grid', gap: '.5rem' }}>
      {revision.ok && <p className={styles.ok}>🎉 ¡Desafío superado! Ya lo podés probar en la placa real.</p>}
      {revision.problemas.length > 0 && <div className={styles.problemas}><strong>Todavía no:</strong><ul>{revision.problemas.map(p => <li key={p}>{p}</li>)}</ul></div>}
      {revision.advertencias.length > 0 && <div className={styles.advertencias}><strong>⚠ En la placa real:</strong><ul>{revision.advertencias.map(a => <li key={a}>{a}</li>)}</ul></div>}
    </div>}
  </section>
}
