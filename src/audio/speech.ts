// Funciones puras del repaso en audio: no tocan el navegador, así se pueden testear.

export interface Track {
  id: string
  title: string
  lines: string[]
}

/** Una frase que se lee en voz alta. `line` es -1 para el título del track. */
export interface Segment {
  track: number
  line: number
  text: string
}

/** Saca el marcado que no tiene sentido leer en voz alta (backticks, negritas). */
export function toSpeech(text: string) {
  return text.replace(/[`*]/g, '').replace(/\s+/g, ' ').trim()
}

/**
 * Parte los tracks en frases cortas. Chrome corta las locuciones largas a los ~15 segundos,
 * y además así podemos resaltar la frase que se está leyendo.
 */
export function toSegments(tracks: Track[]): Segment[] {
  return tracks.flatMap((track, trackIndex) => [
    { track: trackIndex, line: -1, text: toSpeech(track.title) },
    ...track.lines.map((line, lineIndex) => ({ track: trackIndex, line: lineIndex, text: toSpeech(line) })),
  ])
}

const preferredLangs = ['es-ar', 'es-419', 'es-us', 'es-mx']

/** Elige la voz más cercana al español rioplatense entre las que tiene el dispositivo. */
export function pickVoice<V extends { lang: string }>(voices: V[]): V | undefined {
  const lang = (voice: V) => voice.lang.replace('_', '-').toLowerCase()
  for (const preferred of preferredLangs) {
    const match = voices.find(voice => lang(voice) === preferred)
    if (match) return match
  }
  return voices.find(voice => lang(voice).startsWith('es'))
}
