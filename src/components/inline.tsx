/** Muestra un texto con fragmentos entre backticks (`así`) como <code>. */
export function inline(text: string) {
  return text.split(/(`[^`]+`)/).map((part, index) =>
    part.startsWith('`') && part.endsWith('`') && part.length > 1 ? <code key={index}>{part.slice(1, -1)}</code> : part)
}
