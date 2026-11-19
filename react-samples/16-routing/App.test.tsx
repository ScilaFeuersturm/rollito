// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import App from './App'

afterEach(cleanup)

it('navega de la lista al detalle y vuelve', () => {
  render(<App />)
  fireEvent.click(screen.getByRole('link', { name: 'Pagar la luz' }))
  expect(screen.getByRole('heading', { name: 'Pagar la luz' })).toBeTruthy()
  fireEvent.click(screen.getByRole('link', { name: 'Volver' }))
  expect(screen.getAllByRole('link')).toHaveLength(2)
})
