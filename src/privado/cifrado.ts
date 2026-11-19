// Contenido privado cifrado. El sitio es estático, así que no hay servidor que pida contraseña:
// el contenido se publica cifrado (public/privado.json) y se descifra en el navegador.
// scripts/cifrar-privado.js usa estos mismos parámetros para cifrar; si cambian acá, cambian allá.

export interface DocPrivado {
  archivo: string
  markdown: string
}

export interface Sobre {
  v: 1
  iteraciones: number
  salt: string
  iv: string
  datos: string
}

const desdeBase64 = (texto: string) => Uint8Array.from(atob(texto), c => c.charCodeAt(0))

// El usuario no distingue mayúsculas ni espacios alrededor; la contraseña sí.
export const secreto = (usuario: string, clave: string) => `${usuario.trim().toLowerCase()}\n${clave}`

async function derivarClave(usuario: string, clave: string, salt: Uint8Array<ArrayBuffer>, iteraciones: number) {
  const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(secreto(usuario, clave)), 'PBKDF2', false, ['deriveKey'])
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: iteraciones },
    material,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt'],
  )
}

// Con usuario o contraseña incorrectos, AES-GCM no puede verificar los datos y la promesa se rechaza.
export async function descifrar(sobre: Sobre, usuario: string, clave: string): Promise<DocPrivado[]> {
  if (sobre.v !== 1) throw new Error('Versión de contenido privado desconocida.')
  const key = await derivarClave(usuario, clave, desdeBase64(sobre.salt), sobre.iteraciones)
  const plano = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: desdeBase64(sobre.iv) }, key, desdeBase64(sobre.datos))
  return JSON.parse(new TextDecoder().decode(plano)) as DocPrivado[]
}
