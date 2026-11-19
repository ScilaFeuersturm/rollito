// Validaciones de la cuenta que corren antes de llamar a Firebase. El atributo HTML (`required`,
// `minLength`) no alcanza: `required` acepta un nombre hecho solo de espacios, y cualquiera puede
// saltearse el formulario. Las reglas de Firestore validan de nuevo del lado del servidor.

export const LARGO_MINIMO_CLAVE = 8
export const LARGO_MAXIMO_NOMBRE = 60

export class ErrorDeValidacion extends Error {
  constructor(readonly code: 'nombre-invalido' | 'clave-corta') { super(code) }
}

export function validarNombre(nombre: string): string {
  const limpio = nombre.trim()
  if (limpio.length === 0 || limpio.length > LARGO_MAXIMO_NOMBRE) throw new ErrorDeValidacion('nombre-invalido')
  return limpio
}

export function validarClave(clave: string): string {
  if (clave.length < LARGO_MINIMO_CLAVE) throw new ErrorDeValidacion('clave-corta')
  return clave
}
