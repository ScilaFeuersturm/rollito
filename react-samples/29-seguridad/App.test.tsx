// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import App, { linkSeguro } from './App'

afterEach(() => { cleanup(); vi.restoreAllMocks() })

it('el texto se escapa, el HTML se sanitiza y los links se validan', () => {
  render(<App />)
  expect(screen.getByTestId('texto').textContent).toContain('<img src="x" onerror="alert(1)">')
  const html = screen.getByTestId('html')
  expect(html.querySelector('b')?.textContent).toBe('equipo')
  expect(html.innerHTML).not.toContain('onerror')
  expect(screen.getByRole('link', { name: 'Perfil' }).getAttribute('href')).toBe('#')
  expect(linkSeguro('https://rollito.onrender.com')).toBe('https://rollito.onrender.com')
  expect(linkSeguro('data:text/html,hola')).toBe('#')
})

it('qué hace React 19 con un href javascript: sin validar', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
  render(<a href={'javascript:alert(1)'}>Peligroso</a>)
  const href = screen.getByRole('link', { name: 'Peligroso' }).getAttribute('href') ?? ''
  // React 19 lo reemplaza por una URL que solo lanza un error: no ejecuta el código del atacante.
  expect(href).toBe("javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')")
})
