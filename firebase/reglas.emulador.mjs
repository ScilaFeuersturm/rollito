// Tests de las reglas de Firestore contra el emulador oficial. Correr con: npm run test:reglas
// (necesita Java 21+; el script usa node:test, no Vitest, porque depende del emulador).
import { readFileSync } from 'node:fs'
import { after, before, beforeEach, describe, it } from 'node:test'
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing'
import { collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc, writeBatch } from 'firebase/firestore'

let env

before(async () => {
  env = await initializeTestEnvironment({
    projectId: 'demo-rollito',
    firestore: { rules: readFileSync('firebase/firestore.rules', 'utf8'), host: '127.0.0.1', port: 8080 },
  })
})
after(() => env.cleanup())

// Estado inicial: la admin (que también es miembro) y dos invitaciones sin usar.
beforeEach(async () => {
  await env.clearFirestore()
  await env.withSecurityRulesDisabled(async ctx => {
    const db = ctx.firestore()
    await setDoc(doc(db, 'admins/admin'), {})
    await setDoc(doc(db, 'miembros/admin'), { nombre: 'Admin', email: 'admin@ejemplo.com', invitacion: 'inicial', creadoEn: new Date() })
    await setDoc(doc(db, 'invitaciones/codigo-1'), { usada: false, creadaEn: new Date() })
    await setDoc(doc(db, 'invitaciones/codigo-2'), { usada: false, creadaEn: new Date() })
  })
})

const como = (uid, email = `${uid}@ejemplo.com`) => env.authenticatedContext(uid, { email }).firestore()
const anonimo = () => env.unauthenticatedContext().firestore()

function canjear(db, uid, codigo, { email = `${uid}@ejemplo.com`, conFicha = true, conInvitacion = true } = {}) {
  const batch = writeBatch(db)
  if (conFicha) batch.set(doc(db, `miembros/${uid}`), { nombre: 'Ana', email, invitacion: codigo, creadoEn: serverTimestamp() })
  if (conInvitacion) batch.update(doc(db, `invitaciones/${codigo}`), { usada: true, usadaPor: uid, usadaEn: serverTimestamp() })
  return batch.commit()
}

const progreso = (lecciones = { 'leccion-1': '2026-11-19' }) => ({ lecciones, actualizado: serverTimestamp() })

describe('canje de invitaciones', () => {
  it('con un código válido se crea la ficha y la invitación queda usada', async () => {
    await assertSucceeds(canjear(como('ana'), 'ana', 'codigo-1'))
  })

  it('un código ya usado no sirve para otra persona', async () => {
    await assertSucceeds(canjear(como('ana'), 'ana', 'codigo-1'))
    await assertFails(canjear(como('beto'), 'beto', 'codigo-1'))
  })

  it('un código inexistente no sirve', async () => {
    await assertFails(canjear(como('ana'), 'ana', 'inventado'))
  })

  it('no se puede crear la ficha sin marcar la invitación', async () => {
    await assertFails(canjear(como('ana'), 'ana', 'codigo-1', { conInvitacion: false }))
  })

  it('no se puede quemar una invitación sin crear la ficha', async () => {
    await assertFails(canjear(como('ana'), 'ana', 'codigo-1', { conFicha: false }))
  })

  it('no se puede crear la ficha de otra persona', async () => {
    const db = como('ana')
    const batch = writeBatch(db)
    batch.set(doc(db, 'miembros/beto'), { nombre: 'Beto', email: 'ana@ejemplo.com', invitacion: 'codigo-1', creadoEn: serverTimestamp() })
    batch.update(doc(db, 'invitaciones/codigo-1'), { usada: true, usadaPor: 'ana', usadaEn: serverTimestamp() })
    await assertFails(batch.commit())
  })

  it('el email de la ficha tiene que ser el de la cuenta', async () => {
    await assertFails(canjear(como('ana'), 'ana', 'codigo-1', { email: 'otra@ejemplo.com' }))
  })

  it('un miembro no puede canjear un segundo código', async () => {
    await assertSucceeds(canjear(como('ana'), 'ana', 'codigo-1'))
    await assertFails(canjear(como('ana'), 'ana', 'codigo-2'))
  })

  it('sin cuenta no se puede canjear', async () => {
    await assertFails(canjear(anonimo(), 'ana', 'codigo-1'))
  })
})

describe('progreso', () => {
  it('un miembro escribe y lee su propio progreso', async () => {
    const db = como('admin', 'admin@ejemplo.com')
    await assertSucceeds(setDoc(doc(db, 'progreso/admin'), progreso()))
    await assertSucceeds(getDoc(doc(db, 'progreso/admin')))
  })

  it('nadie escribe ni lee el progreso de otra persona (salvo la admin, que lo lee)', async () => {
    await assertSucceeds(canjear(como('ana'), 'ana', 'codigo-1'))
    await assertSucceeds(setDoc(doc(como('ana'), 'progreso/ana'), progreso()))
    await assertSucceeds(canjear(como('beto'), 'beto', 'codigo-2'))
    await assertFails(setDoc(doc(como('beto'), 'progreso/ana'), progreso()))
    await assertFails(getDoc(doc(como('beto'), 'progreso/ana')))
    await assertSucceeds(getDoc(doc(como('admin', 'admin@ejemplo.com'), 'progreso/ana')))
  })

  it('una cuenta sin invitación no puede guardar progreso', async () => {
    await assertFails(setDoc(doc(como('intruso'), 'progreso/intruso'), progreso()))
  })

  it('sin cuenta no se lee nada', async () => {
    await assertFails(getDoc(doc(anonimo(), 'progreso/admin')))
    await assertFails(getDocs(collection(anonimo(), 'miembros')))
  })

  it('no se pueden agregar campos extra al progreso', async () => {
    const db = como('admin', 'admin@ejemplo.com')
    await assertFails(setDoc(doc(db, 'progreso/admin'), { ...progreso(), esAdmin: true }))
  })

  it('cuando la admin quita el acceso, la persona ya no puede guardar progreso', async () => {
    await assertSucceeds(canjear(como('ana'), 'ana', 'codigo-1'))
    await assertSucceeds(deleteDoc(doc(como('admin', 'admin@ejemplo.com'), 'miembros/ana')))
    await assertFails(setDoc(doc(como('ana'), 'progreso/ana'), progreso()))
  })
})

describe('administración', () => {
  it('la admin lista miembros, progreso e invitaciones, y crea invitaciones', async () => {
    const db = como('admin', 'admin@ejemplo.com')
    await assertSucceeds(getDocs(collection(db, 'miembros')))
    await assertSucceeds(getDocs(collection(db, 'progreso')))
    await assertSucceeds(getDocs(collection(db, 'invitaciones')))
    await assertSucceeds(setDoc(doc(db, 'invitaciones/nuevo'), { usada: false, creadaEn: serverTimestamp() }))
  })

  it('un miembro común no lista miembros ni crea o lee invitaciones', async () => {
    await assertSucceeds(canjear(como('ana'), 'ana', 'codigo-1'))
    const db = como('ana')
    await assertFails(getDocs(collection(db, 'miembros')))
    await assertFails(getDocs(collection(db, 'invitaciones')))
    await assertFails(getDoc(doc(db, 'invitaciones/codigo-2')))
    await assertFails(setDoc(doc(db, 'invitaciones/mio'), { usada: false, creadaEn: serverTimestamp() }))
  })

  it('nadie se puede nombrar admin desde la app', async () => {
    await assertFails(setDoc(doc(como('ana'), 'admins/ana'), {}))
    await assertFails(setDoc(doc(como('admin', 'admin@ejemplo.com'), 'admins/ana'), {}))
  })

  it('cada persona puede consultar solo si ella misma es admin', async () => {
    await assertSucceeds(getDoc(doc(como('ana'), 'admins/ana')))
    await assertFails(getDoc(doc(como('ana'), 'admins/admin')))
  })

  it('no se puede reactivar una invitación usada', async () => {
    await assertSucceeds(canjear(como('ana'), 'ana', 'codigo-1'))
    await assertFails(updateDoc(doc(como('ana'), 'invitaciones/codigo-1'), { usada: false }))
  })
})
