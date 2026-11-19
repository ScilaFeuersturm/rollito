// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('cada tarjeta muestra sus props y usa el valor por defecto', () => {
  render(<App />)
  const [luz, dni] = screen.getAllByRole('article')
  expect(luz.textContent).toBe('Pagar la luzVence hoy')
  expect(luz.className).toBe('tarjeta urgente')
  expect(dni.textContent).toBe('Renovar el DNIVence en 30 días')
  expect(dni.className).toBe('tarjeta')
})
