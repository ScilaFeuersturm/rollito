import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { CuentaPage } from './paginas/CuentaPage'

test.describe('landing pública', () => {
  test('explica que es para el equipo y lleva a entrar', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Rollito', level: 1 })).toBeVisible()
    await expect(page.getByText('limitada al equipo de Taller Fichín')).toBeVisible()
    await expect(page.getByText('pedile acceso a Aramis')).toBeVisible()
    await page.getByRole('link', { name: 'Entrar' }).first().click()
    await expect(page).toHaveURL(/\/cuenta\/$/)
  })

  test('no tiene problemas de accesibilidad detectables automáticamente', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('limitada al equipo de Taller Fichín')).toBeVisible()
    const resultado = await new AxeBuilder({ page }).analyze()
    expect(resultado.violations.map(v => `${v.id}: ${v.help}`)).toEqual([])
  })
})

test('una lección sin sesión muestra acceso restringido y vuelve después de entrar', async ({ page }) => {
  await page.goto('/lecciones/testing-junior-reportar-un-bug-01/')
  await expect(page.getByRole('heading', { name: 'Acceso restringido' })).toBeVisible()
  await page.getByRole('link', { name: 'Entrar' }).last().click()
  await expect(page).toHaveURL(/\/cuenta\/\?volver=%2Flecciones%2Ftesting-junior-reportar-un-bug-01%2F$/)
})

test.describe('pantalla de cuenta', () => {
  test('las opciones son botones y muestran los campos de cada una', async ({ page }) => {
    const cuenta = new CuentaPage(page)
    await cuenta.abrir()
    await expect(cuenta.opcion('Entrar')).toHaveAttribute('aria-pressed', 'true')

    await cuenta.elegir('Tengo un código')
    await expect(cuenta.codigo).toBeVisible()
    await expect(cuenta.nombre).toBeVisible()

    await cuenta.elegir('Olvidé mi contraseña')
    await expect(cuenta.mail).toBeVisible()
    await expect(cuenta.clave).toHaveCount(0)
  })

  // Regresión del bug real: un nombre hecho solo de espacios mostraba un error sobre el código.
  test('un nombre hecho solo de espacios muestra el error del nombre', async ({ page }) => {
    const cuenta = new CuentaPage(page)
    await cuenta.abrir()
    await cuenta.registrarse({ codigo: 'abcd-efgh-jkmn', nombre: '   ', mail: 'prueba@ejemplo.com', clave: 'una-clave-larga' })
    await expect(cuenta.error()).toHaveText('Escribí tu nombre (de 1 a 60 caracteres).')
  })
})

test('una dirección inventada muestra la página de no encontrado', async ({ page }) => {
  await page.goto('/esto-no-existe/')
  await expect(page.getByRole('heading', { name: 'No encontramos esa página' })).toBeVisible()
})
