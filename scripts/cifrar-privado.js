// Cifra los .md de privado/ (que no se suben a Git) en public/privado.json (que sí se sube).
// Uso: npm run privado. Las credenciales se leen de privado/.credenciales; si no existe, se generan.
// Los parámetros tienen que coincidir con src/privado/cifrado.ts.
import { randomInt, webcrypto } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const { subtle } = webcrypto
export const ITERACIONES = 600_000

const secreto = (usuario, clave) => `${usuario.trim().toLowerCase()}\n${clave}`
const aBase64 = bytes => Buffer.from(bytes).toString('base64')

export async function cifrar(docs, usuario, clave, iteraciones = ITERACIONES) {
  const salt = webcrypto.getRandomValues(new Uint8Array(16))
  const iv = webcrypto.getRandomValues(new Uint8Array(12))
  const material = await subtle.importKey('raw', new TextEncoder().encode(secreto(usuario, clave)), 'PBKDF2', false, ['deriveKey'])
  const key = await subtle.deriveKey({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: iteraciones }, material, { name: 'AES-GCM', length: 256 }, false, ['encrypt'])
  const datos = await subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(JSON.stringify(docs)))
  return { v: 1, iteraciones, salt: aBase64(salt), iv: aBase64(iv), datos: aBase64(new Uint8Array(datos)) }
}

// Sin caracteres que se confunden (0/o, 1/l/i) para que se tipee fácil en el celular. ~80 bits.
function claveAlAzar() {
  const letras = 'abcdefghjkmnpqrstuvwxyz23456789'
  return Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => letras[randomInt(letras.length)]).join('')).join('-')
}

async function credenciales(archivo) {
  if (!existsSync(archivo)) {
    await writeFile(archivo, `usuario=priscila\nclave=${claveAlAzar()}\n`)
    console.log(`Generé credenciales nuevas en ${archivo}`)
  }
  const valores = Object.fromEntries((await readFile(archivo, 'utf8')).split(/\r?\n/).filter(Boolean).map(linea => {
    const i = linea.indexOf('=')
    return [linea.slice(0, i).trim(), linea.slice(i + 1).trim()]
  }))
  if (!valores.usuario || !valores.clave) throw new Error(`${archivo} tiene que tener las líneas usuario=... y clave=...`)
  return valores
}

async function main() {
  const carpeta = resolve('privado')
  if (!existsSync(carpeta)) throw new Error('No existe la carpeta privado/.')
  const { usuario, clave } = await credenciales(join(carpeta, '.credenciales'))
  const archivos = (await readdir(carpeta)).filter(nombre => nombre.endsWith('.md') && nombre !== 'README.md').sort()
  const docs = await Promise.all(archivos.map(async archivo => ({ archivo, markdown: await readFile(join(carpeta, archivo), 'utf8') })))
  await mkdir(resolve('public'), { recursive: true })
  await writeFile(resolve('public/privado.json'), JSON.stringify(await cifrar(docs, usuario, clave)) + '\n')
  console.log(`Cifré ${docs.length} archivo(s) en public/privado.json: ${archivos.join(', ')}`)
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main()
