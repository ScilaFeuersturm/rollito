import { expect, type Locator, type Page } from '@playwright/test'

type Opcion = 'Entrar' | 'Tengo un código' | 'Olvidé mi contraseña'

// Page Object: los tests hablan en términos de la pantalla ("elegir Tengo un código") y los
// detalles de cómo encontrar cada elemento quedan en un solo lugar.
export class CuentaPage {
  readonly codigo: Locator
  readonly nombre: Locator
  readonly mail: Locator
  readonly clave: Locator

  constructor(private readonly page: Page) {
    this.codigo = page.getByLabel('Código de invitación')
    this.nombre = page.getByLabel('Nombre')
    this.mail = page.getByLabel('Mail')
    this.clave = page.getByLabel('Contraseña')
  }

  async abrir() {
    // Firebase no se usa en estos tests: se bloquea para que nada salga a la red real.
    await this.page.route(/googleapis\.com|firebaseapp\.com/, ruta => ruta.abort())
    await this.page.goto('/cuenta/')
    await expect(this.opcion('Entrar')).toBeVisible()
  }

  // Hay dos botones "Entrar" (la opción y el de enviar el formulario): se acota al grupo de opciones.
  // Sin eso, el modo estricto de Playwright falla en vez de adivinar cuál usar.
  opcion(nombre: Opcion) {
    return this.page.getByRole('group', { name: '¿Qué querés hacer?' }).getByRole('button', { name: nombre, exact: true })
  }

  async elegir(nombre: Opcion) {
    await this.opcion(nombre).click()
    await expect(this.opcion(nombre)).toHaveAttribute('aria-pressed', 'true')
  }

  async registrarse(datos: { codigo: string; nombre: string; mail: string; clave: string }) {
    await this.elegir('Tengo un código')
    await this.codigo.fill(datos.codigo)
    await this.nombre.fill(datos.nombre)
    await this.mail.fill(datos.mail)
    await this.clave.fill(datos.clave)
    await this.page.getByRole('button', { name: 'Crear mi cuenta' }).click()
  }

  error() {
    return this.page.getByRole('alert')
  }
}
