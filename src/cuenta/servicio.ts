// Todo lo que habla con Firebase. Se importa con import() dinámico, así quien no usa cuenta no lo descarga.
// La seguridad la dan las reglas de firebase/firestore.rules; esta configuración es pública por diseño.
import { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword, EmailAuthProvider, getAuth, onAuthStateChanged, reauthenticateWithCredential,
  sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updatePassword, type User,
} from 'firebase/auth'
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, serverTimestamp, setDoc, writeBatch } from 'firebase/firestore'
import type { Progress } from '../progress/progress'
import { limpiar } from './combinar'

const app = initializeApp({
  apiKey: 'AIzaSyA14lpxBPAxjDA_KjzlgRBa-5lN5D9uLZU',
  authDomain: 'rollito.firebaseapp.com',
  projectId: 'rollito',
  storageBucket: 'rollito.firebasestorage.app',
  messagingSenderId: '456660902333',
  appId: '1:456660902333:web:c85bb47ebf3dbafc4ff2d4',
})
const auth = getAuth(app)
auth.languageCode = 'es'
const db = getFirestore(app)

export const MAX_MIEMBROS = 10

export interface Cuenta {
  uid: string
  email: string
  nombre: string | null
  miembro: boolean
  admin: boolean
}

async function cargarCuenta(user: User): Promise<Cuenta> {
  const base = { uid: user.uid, email: user.email ?? '' }
  try {
    const [ficha, admin] = await Promise.all([getDoc(doc(db, 'miembros', user.uid)), getDoc(doc(db, 'admins', user.uid))])
    return { ...base, nombre: ficha.exists() ? String(ficha.data().nombre) : null, miembro: ficha.exists(), admin: admin.exists() }
  } catch {
    return { ...base, nombre: null, miembro: false, admin: false }
  }
}

export function observarCuenta(alCambiar: (cuenta: Cuenta | null) => void) {
  return onAuthStateChanged(auth, user => {
    if (!user) alCambiar(null)
    else void cargarCuenta(user).then(alCambiar)
  })
}

export async function refrescarCuenta() {
  return auth.currentUser ? cargarCuenta(auth.currentUser) : null
}

export async function entrar(email: string, clave: string) {
  await signInWithEmailAndPassword(auth, email.trim(), clave)
}

const normalizarCodigo = (codigo: string) => codigo.trim().toLowerCase()

// Crea la ficha de miembro y quema la invitación en un solo batch: las reglas exigen las dos cosas juntas.
export async function canjear(nombre: string, codigo: string) {
  const user = auth.currentUser
  if (!user) throw new Error('sin-sesion')
  const id = normalizarCodigo(codigo)
  if (!/^[a-z0-9-]{4,40}$/.test(id)) throw Object.assign(new Error('codigo'), { code: 'permission-denied' })
  const batch = writeBatch(db)
  batch.set(doc(db, 'miembros', user.uid), { nombre: nombre.trim(), email: user.email, invitacion: id, creadoEn: serverTimestamp() })
  batch.update(doc(db, 'invitaciones', id), { usada: true, usadaPor: user.uid, usadaEn: serverTimestamp() })
  await batch.commit()
}

// Si el código no sirve, borramos la cuenta recién creada para no dejar cuentas huérfanas.
export async function registrar(nombre: string, email: string, clave: string, codigo: string) {
  const { user } = await createUserWithEmailAndPassword(auth, email.trim(), clave)
  try {
    await canjear(nombre, codigo)
  } catch (error) {
    await user.delete().catch(() => signOut(auth))
    throw error
  }
}

// Firebase manda el mail y hospeda la página para elegir la contraseña nueva.
export async function recuperar(email: string) {
  await sendPasswordResetEmail(auth, email.trim())
}

// Firebase exige un login reciente para cambiar la contraseña, así que reautenticamos con la actual.
export async function cambiarClave(actual: string, nueva: string) {
  const user = auth.currentUser
  if (!user?.email) throw new Error('sin-sesion')
  await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, actual))
  await updatePassword(user, nueva)
}

export async function salir() {
  await signOut(auth)
}

export async function leerProgreso(uid: string): Promise<Progress> {
  const snapshot = await getDoc(doc(db, 'progreso', uid))
  return snapshot.exists() ? limpiar(snapshot.data().lecciones) : {}
}

export async function guardarProgreso(uid: string, lecciones: Progress) {
  await setDoc(doc(db, 'progreso', uid), { lecciones, actualizado: serverTimestamp() })
}

// ---- Administración (las reglas solo lo permiten a la admin) ----

export interface Miembro { uid: string; nombre: string; email: string }
export interface Invitacion { codigo: string; usada: boolean; usadaPor: string | null }

export async function datosAdmin() {
  const [miembros, progreso, invitaciones] = await Promise.all([
    getDocs(collection(db, 'miembros')),
    getDocs(collection(db, 'progreso')),
    getDocs(collection(db, 'invitaciones')),
  ])
  return {
    miembros: miembros.docs.map((d): Miembro => ({ uid: d.id, nombre: String(d.data().nombre), email: String(d.data().email) })),
    progreso: Object.fromEntries(progreso.docs.map(d => [d.id, limpiar(d.data().lecciones)])) as Record<string, Progress>,
    invitaciones: invitaciones.docs.map((d): Invitacion => ({
      codigo: d.id, usada: d.data().usada === true, usadaPor: typeof d.data().usadaPor === 'string' ? d.data().usadaPor : null,
    })),
  }
}

// 12 caracteres de 31 posibles (~59 bits), sin letras que se confunden. Se descartan los bytes que
// sesgarían el módulo (muestreo por rechazo), así todas las letras son igual de probables.
function codigoAlAzar() {
  const letras = 'abcdefghjkmnpqrstuvwxyz23456789'
  const limite = 256 - (256 % letras.length)
  let texto = ''
  while (texto.length < 12) {
    for (const byte of crypto.getRandomValues(new Uint8Array(16))) {
      if (byte < limite && texto.length < 12) texto += letras[byte % letras.length]
    }
  }
  return `${texto.slice(0, 4)}-${texto.slice(4, 8)}-${texto.slice(8)}`
}

export async function crearInvitacion() {
  const codigo = codigoAlAzar()
  await setDoc(doc(db, 'invitaciones', codigo), { usada: false, creadaEn: serverTimestamp() })
  return codigo
}

export async function borrarInvitacion(codigo: string) {
  await deleteDoc(doc(db, 'invitaciones', codigo))
}

export async function quitarAcceso(uid: string) {
  await deleteDoc(doc(db, 'miembros', uid))
}
