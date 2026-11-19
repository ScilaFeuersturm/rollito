import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

// Verifica los ejemplos del nivel Trainee de React (HTML y CSS) en un navegador real.
const carpeta = join(process.cwd(), 'react-samples', 'trainee')

async function abrir(page: Page, ejemplo: string) {
  let html = readFileSync(join(carpeta, ejemplo, 'index.html'), 'utf8')
  const rutaCss = join(carpeta, ejemplo, 'styles.css')
  if (existsSync(rutaCss)) html = html.replace('<link rel="stylesheet" href="styles.css" />', `<style>${readFileSync(rutaCss, 'utf8')}</style>`)
  await page.setContent(html)
}

const caja = async (page: Page, selector: string) => (await page.locator(selector).boundingBox())!
const color = (page: Page, selector: string) => page.locator(selector).evaluate(el => getComputedStyle(el).color)

const ejemplos = ['01-estructura', '02-semantica', '03-links-imagenes-y-listas', '04-formularios', '05-selectores-y-cascada',
  '06-modelo-de-caja', '07-flexbox', '08-grid', '09-responsive', '10-colores-variables-y-estados']

for (const ejemplo of ejemplos) {
  test(`${ejemplo}: sin problemas de accesibilidad detectables (incluido el contraste)`, async ({ page }) => {
    await abrir(page, ejemplo)
    const resultado = await new AxeBuilder({ page }).analyze()
    expect(resultado.violations.map(v => `${v.id}: ${v.help}`)).toEqual([])
  })
}

test('01: estructura básica', async ({ page }) => {
  await abrir(page, '01-estructura')
  await expect(page).toHaveTitle('Mis tareas')
  await expect(page.locator('html')).toHaveAttribute('lang', 'es')
  await expect(page.locator('meta[name="viewport"]')).toHaveAttribute('content', 'width=device-width, initial-scale=1')
})

test('02: las etiquetas semánticas crean landmarks', async ({ page }) => {
  await abrir(page, '02-semantica')
  for (const rol of ['banner', 'navigation', 'main', 'contentinfo'] as const) await expect(page.getByRole(rol)).toHaveCount(1)
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  await expect(page.getByRole('button', { name: 'Completar' })).toBeVisible()
})

test('03: imagen con alt y listas', async ({ page }) => {
  await abrir(page, '03-links-imagenes-y-listas')
  await expect(page.getByRole('img', { name: 'Un mate visto desde arriba' })).toBeVisible()
  await expect(page.getByRole('list').nth(1).getByRole('listitem')).toHaveCount(3)
  await expect(page.getByRole('link', { name: 'el artículo sobre el mate' })).toBeVisible()
})

test('04: cada campo tiene su label', async ({ page }) => {
  await abrir(page, '04-formularios')
  await expect(page.getByLabel('Título')).toHaveAttribute('required', '')
  await expect(page.getByLabel('Prioridad')).toHaveValue('media')
  await page.getByText('Es urgente').click() // tocar el texto marca el checkbox
  await expect(page.getByLabel('Es urgente')).toBeChecked()
})

test('05: gana el selector más específico', async ({ page }) => {
  await abrir(page, '05-selectores-y-cascada')
  expect(await color(page, 'main > p:first-of-type')).toBe('rgb(60, 60, 60)')     // p
  expect(await color(page, '.tarea p:first-child')).toBe('rgb(83, 52, 148)')     // .tarea p
  expect(await color(page, '.tarea .vencida')).toBe('rgb(83, 52, 148)')          // .tarea p le gana a .vencida
  expect(await color(page, '#destacado')).toBe('rgb(20, 110, 60)')               // el id gana
})

test('06: content-box suma padding y borde; border-box no', async ({ page }) => {
  await abrir(page, '06-modelo-de-caja')
  expect((await caja(page, '.contenido')).width).toBe(244)
  expect((await caja(page, '.borde')).width).toBe(200)
})

test('07: flexbox alinea en fila y centra', async ({ page }) => {
  await abrir(page, '07-flexbox')
  const links = page.getByRole('navigation').getByRole('link')
  const [a, b] = [(await links.nth(0).boundingBox())!, (await links.nth(1).boundingBox())!]
  expect(a.y).toBe(b.y)          // en la misma fila
  expect(b.x).toBeGreaterThan(a.x)
  expect((await caja(page, '.logo')).x).toBeLessThan(a.x) // logo a la izquierda del menú
  const contenedor = await caja(page, '.centrado')
  const mensaje = await caja(page, '.mensaje')
  expect(Math.abs((mensaje.x + mensaje.width / 2) - (contenedor.x + contenedor.width / 2))).toBeLessThan(1)
  expect(Math.abs((mensaje.y + mensaje.height / 2) - (contenedor.y + contenedor.height / 2))).toBeLessThan(1)
})

test('08: grid de tres columnas, la cuarta ocupa dos', async ({ page }) => {
  await abrir(page, '08-grid')
  const tarjetas = page.locator('.tarjeta')
  const cajas = await Promise.all([0, 1, 2, 3].map(async i => (await tarjetas.nth(i).boundingBox())!))
  expect(cajas[0].y).toBe(cajas[1].y)
  expect(cajas[1].y).toBe(cajas[2].y)
  expect(cajas[3].y).toBeGreaterThan(cajas[0].y)                          // segunda fila
  expect(Math.round(cajas[3].width)).toBe(Math.round(cajas[0].width * 2 + 12)) // dos columnas más el gap
})

test('09: en el celular, una debajo de la otra; desde 700px, en fila', async ({ page }) => {
  await abrir(page, '09-responsive')
  const tarjetas = page.locator('.tarjeta')
  const [a, b] = [(await tarjetas.nth(0).boundingBox())!, (await tarjetas.nth(1).boundingBox())!]
  if (page.viewportSize()!.width >= 700) {
    expect(a.y).toBe(b.y)
    expect(b.x).toBeGreaterThan(a.x)
  } else {
    expect(a.x).toBe(b.x)
    expect(b.y).toBeGreaterThan(a.y)
  }
})

test('10: variables, hover y foco visible', async ({ page, isMobile }) => {
  await abrir(page, '10-colores-variables-y-estados')
  const boton = page.getByRole('button', { name: 'Guardar' })
  const fondo = () => boton.evaluate(el => getComputedStyle(el).backgroundColor)
  expect(await fondo()).toBe('rgb(83, 52, 148)')  // var(--acento)
  if (!isMobile) {
    await boton.hover()
    expect(await fondo()).toBe('rgb(61, 37, 112)') // var(--acento-oscuro)
    await page.mouse.move(0, 0)
  }
  await page.keyboard.press('Tab')
  await expect(boton).toBeFocused()
  expect(await boton.evaluate(el => getComputedStyle(el).outlineStyle)).toBe('solid')
})

// Katas Trainee de React (HTML y CSS)
async function abrirKata(page: Page, archivo: string) {
  await page.setContent(readFileSync(join(carpeta, 'katas', archivo), 'utf8'))
}

for (const kata of ['formulario-de-contacto.html', 'centrar-una-tarjeta.html', 'galeria-responsive.html']) {
  test(`kata ${kata}: sin problemas de accesibilidad`, async ({ page }) => {
    await abrirKata(page, kata)
    const resultado = await new AxeBuilder({ page }).analyze()
    expect(resultado.violations.map(v => `${v.id}: ${v.help}`)).toEqual([])
  })
}

test('kata formulario: cada campo tiene label', async ({ page }) => {
  await abrirKata(page, 'formulario-de-contacto.html')
  for (const label of ['Nombre', 'Mail', 'Mensaje']) await expect(page.getByLabel(label)).toHaveAttribute('required', '')
})

test('kata centrar: la tarjeta queda en el centro de la pantalla', async ({ page }) => {
  await abrirKata(page, 'centrar-una-tarjeta.html')
  const vista = page.viewportSize()!
  const t = (await page.locator('.tarjeta').boundingBox())!
  expect(Math.abs(t.x + t.width / 2 - vista.width / 2)).toBeLessThan(1)
  expect(Math.abs(t.y + t.height / 2 - vista.height / 2)).toBeLessThan(1)
})

test('kata galería: las columnas se adaptan al ancho', async ({ page }) => {
  await abrirKata(page, 'galeria-responsive.html')
  const items = page.locator('.galeria li')
  const tops = await Promise.all([0, 1, 2, 3, 4, 5].map(async i => (await items.nth(i).boundingBox())!.y))
  const porFila = tops.filter(y => y === tops[0]).length
  if (page.viewportSize()!.width >= 1000) expect(porFila).toBeGreaterThanOrEqual(5)
  else expect(porFila).toBeLessThanOrEqual(2)
})
